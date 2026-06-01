#!/usr/bin/env node
/**
 * Normalize src/data/rl_citation_graph.json after a fresh research-kb export.
 *
 * Post research-kb#20, the KB supplies real title/authors/year for every arXiv
 * node (papers are ingested via the arXiv API, not by filename), so this script
 * NO LONGER fetches anything from the network. It now does only the two things
 * the KB pipeline cannot:
 *
 *   1. Apply hand-curated MANUAL overrides for non-arXiv / textbook nodes the KB
 *      can't canonicalize (Kalman x2, Watkins Q-learning, Sutton & Barto,
 *      Bertsekas) plus the DPG correction — arXiv 1406.2199 is actually a
 *      different paper ("Two-Stream Convolutional Networks"); the DPG paper
 *      (Silver et al., ICML 2014) has no arXiv id.
 *   2. Recompute each node's short display label ("Mnih et al. 2015") from the
 *      now-correct node.data.authors/year. (The KB export emits the *full* title
 *      as the label; the graph renders the short author-year form.)
 *
 * Folding these MANUAL overrides into rl_and_control/references/paper_index.md so
 * build_graph_export.py emits them — eliminating this script entirely — is tracked
 * as a follow-up. Until then this is the thin, no-network curation overlay.
 *
 * Run after a re-export: `node scripts/enrich-citation-graph.mjs`
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GRAPH_PATH = resolve(__dirname, '../src/data/rl_citation_graph.json');

// Hand-curated overrides, keyed by node id. Partial overrides allowed.
// `arxiv_id: null` clears a wrong/absent arXiv id so the detail panel links via
// `url`/`doi` instead. These are the only metadata research-kb can't supply.
const MANUAL = {
  // Non-arXiv classics whose KB titles are filename-derived junk.
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
  // CORRECTION: paper_index.md mis-assigned arXiv id 1406.2199 to DPG. That id is
  // actually "Two-Stream Convolutional Networks…" (a video paper); the DPG paper
  // (Silver et al., ICML 2014) has no arXiv id. Clear the id; link the proceedings.
  'source:arxiv:1406.2199': {
    title: 'Deterministic Policy Gradient Algorithms',
    authors: ['David Silver', 'Guy Lever', 'Nicolas Heess', 'Thomas Degris', 'Daan Wierstra', 'Martin Riedmiller'],
    year: 2014,
    arxiv_id: null,
    url: 'https://proceedings.mlr.press/v32/silver14.html',
  },
  // Textbook nodes with incomplete KB metadata (partial overrides).
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

const normWs = (s) => decodeEntities(String(s)).replace(/\s+/g, ' ').trim();
const surname = (name) => normWs(name).split(' ').filter(Boolean).pop() || name;

function shortLabel(authors, year) {
  const y = year ?? '';
  if (!authors || authors.length === 0) return String(y || '?');
  if (authors.length === 1) return `${surname(authors[0])} ${y}`.trim();
  if (authors.length === 2) return `${surname(authors[0])} & ${surname(authors[1])} ${y}`.trim();
  return `${surname(authors[0])} et al. ${y}`.trim();
}

async function main() {
  const graph = JSON.parse(await readFile(GRAPH_PATH, 'utf8'));
  let manual = 0;
  const junkTitle = /^(arxiv:)?\d{4}\.\d{4,5}$/i; // residual filename-junk detector

  const stillJunk = [];
  for (const n of graph.nodes) {
    n.data = n.data || {};
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
      manual++;
    }
    // Recompute the short display label from the (KB-provided or overridden) data.
    n.label = shortLabel(n.data.authors, n.data.year);
    if (n.data.title && junkTitle.test(String(n.data.title).trim())) {
      stillJunk.push(n.data.arxiv_id || n.id);
    }
  }

  await writeFile(GRAPH_PATH, JSON.stringify(graph, null, 2) + '\n');
  console.log(
    `Done: ${manual} manual overrides applied, ${graph.nodes.length} labels recomputed (no network).`,
  );
  if (stillJunk.length) {
    console.warn(
      `  ⚠ ${stillJunk.length} node(s) still carry filename-junk titles ` +
        `(not covered by the research-kb#20 subset backfill): ${stillJunk.join(', ')}`,
    );
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
