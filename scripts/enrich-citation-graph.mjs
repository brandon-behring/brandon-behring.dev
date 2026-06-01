#!/usr/bin/env node
/**
 * Enrich src/data/rl_citation_graph.json with real bibliographic metadata.
 *
 * Why: the graph was generated from research-kb, which auto-ingested the RL
 * papers *by filename* (`metadata_source: "filename"`), so every arXiv node
 * carried `title = "<arxiv-id>"`, `year = <arxiv-prefix>` (e.g. 1312), and
 * `authors = []`. That made node labels, the detail panel, and search useless.
 *
 * Fix (hybrid, per Track 1.5 decision 6): for the 84 arXiv nodes, pull the
 * title / authors / year from the **arXiv API** so each title matches the paper
 * the node actually links to (arxiv.org/abs/<id>). The curated `key_finding`
 * is preserved untouched as the annotation. The 4 junk non-arXiv nodes
 * (filename-derived titles) get hand-curated metadata below.
 *
 * Offline fallback if the API rate-limits: ~/Claude/rl_and_control/references/
 * paper_index.md (the curated overlay that already 100%-covers these IDs).
 *
 * Re-run after any future densification: `node scripts/enrich-citation-graph.mjs`
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { homedir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GRAPH_PATH = resolve(__dirname, '../src/data/rl_citation_graph.json');
const PAPER_INDEX_PATH = resolve(homedir(), 'Claude/rl_and_control/references/paper_index.md');

const ARXIV_ENDPOINT = 'https://export.arxiv.org/api/query';
const BATCH_SIZE = 25;
const REQ_GAP_MS = 3500; // arXiv asks for ≤1 request / 3s

// Hand-curated overrides, keyed by node id. Applied BEFORE arXiv enrichment and
// override only the fields present (partial overrides allowed). `arxiv_id: null`
// clears a wrong/absent arXiv id so the detail panel links via `url`/`doi` instead.
const MANUAL = {
  // 4 non-arXiv nodes whose titles were filename-junk.
  'source:uuid:9ff4349b-11de-47b4-a3b7-19adc04d0970': {
    title: 'A New Approach to Linear Filtering and Prediction Problems',
    authors: ['R. E. Kalman'],
    year: 1960,
  },
  'source:uuid:036ec0aa-4a4f-498a-ba75-b3c24f2255ea': {
    title: 'Contributions to the Theory of Optimal Control',
    authors: ['R. E. Kalman'],
    year: 1960,
  },
  'source:uuid:1780be3f-c5f0-457f-8b7d-b23bec517cf1': {
    title: 'Q-learning',
    authors: ['Christopher J. C. H. Watkins', 'Peter Dayan'],
    year: 1992,
  },
  'source:uuid:485af9e5-7f42-4b8c-b9f1-fa5b6b790b13': {
    title: 'Policy Gradient Methods for Reinforcement Learning with Function Approximation',
    authors: ['Richard S. Sutton', 'David McAllester', 'Satinder P. Singh', 'Yishay Mansour'],
    year: 2000,
  },
  // CORRECTION: the source bibliography (paper_index.md) mis-assigned arXiv id
  // 1406.2199 to DPG. That id is actually "Two-Stream Convolutional Networks…"
  // (a video paper); the DPG paper (Silver et al., ICML 2014) has no arXiv id.
  // Clear the wrong id and link the proceedings instead.
  'source:arxiv:1406.2199': {
    title: 'Deterministic Policy Gradient Algorithms',
    authors: ['David Silver', 'Guy Lever', 'Nicolas Heess', 'Thomas Degris', 'Daan Wierstra', 'Martin Riedmiller'],
    year: 2014,
    arxiv_id: null,
    url: 'https://proceedings.mlr.press/v32/silver14.html',
  },
  // Textbook nodes with incomplete metadata (partial overrides).
  'source:uuid:34bc15ba-66aa-46f9-80b5-f4d38b3cde1f': {
    title: 'Reinforcement Learning: An Introduction (2nd ed.)',
    authors: ['Richard S. Sutton', 'Andrew G. Barto'],
    year: 2018,
  },
  'source:uuid:fb0b20ac-254d-4ae4-98cf-a270ed15a5a5': {
    authors: ['Dimitri P. Bertsekas'],
  },
  'source:uuid:fd904023-8bdf-4112-97e1-2d22eb087254': {
    year: 2017,
  },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

const normWs = (s) => decodeEntities(s).replace(/\s+/g, ' ').trim();
const surname = (name) => normWs(name).split(' ').filter(Boolean).pop() || name;

function shortLabel(authors, year) {
  const y = year ?? '';
  if (!authors || authors.length === 0) return String(y || '?');
  if (authors.length === 1) return `${surname(authors[0])} ${y}`.trim();
  if (authors.length === 2) return `${surname(authors[0])} & ${surname(authors[1])} ${y}`.trim();
  return `${surname(authors[0])} et al. ${y}`.trim();
}

/** Parse the arXiv Atom feed → Map<arxivId, {title, authors[], year}>. Maps by
 *  each entry's own <id> (entry order is NOT guaranteed to match the request). */
function parseAtom(xml) {
  const out = new Map();
  const entries = xml.split('<entry>').slice(1); // drop the feed header
  for (const raw of entries) {
    const entry = raw.split('</entry>')[0];
    const idM = entry.match(/<id>\s*https?:\/\/arxiv\.org\/abs\/([^<\s]+)\s*<\/id>/);
    if (!idM) continue;
    const arxivId = idM[1].replace(/v\d+$/, '');
    const titleM = entry.match(/<title>([\s\S]*?)<\/title>/);
    const title = titleM ? normWs(titleM[1]) : null;
    if (!title || /^error$/i.test(title)) continue; // withdrawn / not found
    const authors = [...entry.matchAll(/<author>[\s\S]*?<name>([\s\S]*?)<\/name>[\s\S]*?<\/author>/g)]
      .map((m) => normWs(m[1]));
    const pubM = entry.match(/<published>(\d{4})-/);
    const year = pubM ? Number(pubM[1]) : null;
    out.set(arxivId, { title, authors, year });
  }
  return out;
}

async function fetchArxivBatch(ids) {
  const url = `${ARXIV_ENDPOINT}?id_list=${ids.join(',')}&max_results=${ids.length}`;
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': 'brandon-behring.dev graph enrichment' } });
    const text = await res.text();
    if (res.ok && /<entry>/.test(text) && !/rate exceeded/i.test(text)) return parseAtom(text);
    const backoff = 5000 * (attempt + 1);
    console.warn(`  arXiv batch retry ${attempt + 1} (status ${res.status}); waiting ${backoff}ms`);
    await sleep(backoff);
  }
  return new Map();
}

/** Fallback: parse curated titles/years from paper_index.md keyed by arXiv id. */
async function loadPaperIndex() {
  const map = new Map();
  try {
    const md = await readFile(PAPER_INDEX_PATH, 'utf8');
    for (const line of md.split('\n')) {
      const m = line.match(/\[\s*(\d{4}\.\d{4,5})\s*\]\([^)]*\)\s*\|\s*([^|]+?)\s*\|[^|]*\|\s*(\d{4})/);
      if (m) map.set(m[1], { title: normWs(m[2]), year: Number(m[3]) });
    }
  } catch {
    console.warn(`  (paper_index.md fallback not available at ${PAPER_INDEX_PATH})`);
  }
  return map;
}

async function main() {
  const graph = JSON.parse(await readFile(GRAPH_PATH, 'utf8'));
  const arxivNodes = graph.nodes.filter((n) => n.data?.arxiv_id);
  const ids = [...new Set(arxivNodes.map((n) => n.data.arxiv_id))];
  console.log(`Enriching ${arxivNodes.length} arXiv nodes (${ids.length} unique) + ${Object.keys(MANUAL).length} manual non-arXiv nodes…`);

  const meta = new Map();
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE);
    console.log(`  arXiv batch ${i / BATCH_SIZE + 1}: ${batch.length} ids`);
    const got = await fetchArxivBatch(batch);
    for (const [k, v] of got) meta.set(k, v);
    if (i + BATCH_SIZE < ids.length) await sleep(REQ_GAP_MS);
  }

  const missing = ids.filter((id) => !meta.has(id));
  if (missing.length) {
    console.warn(`  ${missing.length} ids missing from arXiv; trying paper_index.md fallback…`);
    const fallback = await loadPaperIndex();
    for (const id of missing) if (fallback.has(id)) meta.set(id, { ...fallback.get(id), authors: [] });
  }

  let enriched = 0, manual = 0, stillMissing = [];
  for (const n of graph.nodes) {
    if (MANUAL[n.id]) {
      const m = MANUAL[n.id];
      if ('title' in m) n.data.title = m.title;
      if ('authors' in m) n.data.authors = m.authors;
      if ('year' in m) n.data.year = m.year;
      if ('url' in m) n.data.url = m.url;
      if ('doi' in m) n.data.doi = m.doi;
      if ('arxiv_id' in m) {
        if (m.arxiv_id) n.data.arxiv_id = m.arxiv_id;
        else delete n.data.arxiv_id;
      }
      n.label = shortLabel(n.data.authors, n.data.year);
      manual++;
    } else if (n.data?.arxiv_id && meta.has(n.data.arxiv_id)) {
      const m = meta.get(n.data.arxiv_id);
      n.data.title = m.title;
      if (m.authors?.length) n.data.authors = m.authors;
      if (m.year) n.data.year = m.year;
      n.label = shortLabel(m.authors, m.year ?? n.data.year);
      enriched++;
    } else if (n.data?.arxiv_id) {
      stillMissing.push(n.data.arxiv_id);
    }
  }

  await writeFile(GRAPH_PATH, JSON.stringify(graph, null, 2) + '\n');
  console.log(`Done: ${enriched} via arXiv, ${manual} manual. ${stillMissing.length} unresolved${stillMissing.length ? ': ' + stillMissing.join(', ') : ''}.`);
  if (stillMissing.length) process.exitCode = 1;
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
