import { defineCollection, reference } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Typed content collections (roadmap A6). The raw JSON in `src/data/` stays the
 * editing surface; these schemas validate it at build time, so a bad status, a
 * missing field, or a stale enum becomes a BUILD ERROR instead of silent drift.
 * `portfolio.ts` reads these via `getCollection()` and keeps its sync export surface.
 */

const projectStatus = z.enum(['released', 'in-progress', 'prototype', 'planned']);
const clusterSection = z.enum(['now', 'tier', 'future']);

const externalContext = z.object({
  label: z.string(),
  url: z.string(),
});

// projects.json / clusters.json / demos.json are arrays keyed by `slug`; the
// file() loader wants an object keyed by id, so map array -> { [slug]: entry }.
const bySlug = (text: string) =>
  Object.fromEntries(
    (JSON.parse(text) as Array<{ slug: string }>).map((e) => [e.slug, e]),
  );

// Projects additionally carry their source-file position. getCollection() returns
// entries sorted by id (alphabetical); stamping the original index lets portfolio.ts
// restore file order so the RSS feed (which reads visibleProjects directly) stays
// stable. Pages don't need it — they all re-sort by `.order`.
const bySlugWithOrder = (text: string) =>
  Object.fromEntries(
    (JSON.parse(text) as Array<{ slug: string }>).map((e, i) => [e.slug, { ...e, srcOrder: i }]),
  );

const projects = defineCollection({
  loader: file('src/data/projects.json', { parser: bySlugWithOrder }),
  schema: z.object({
    slug: z.string(),
    srcOrder: z.number(),
    title: z.string(),
    cluster: z.string(),
    order: z.number(),
    status: projectStatus,
    summary: z.string(),
    description_long: z.string(),
    whats_next: z.string().optional(),
    stack: z.array(z.string()).optional(),
    repo_url: z.string().url().optional(),
    site_url: z.string().url().optional(),
    external_context: z.array(externalContext).optional(),
    metrics: z.array(z.string()).optional(),
    visual: z.string().nullable().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
  }),
});

const clusters = defineCollection({
  loader: file('src/data/clusters.json', { parser: bySlug }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    section: clusterSection,
    order: z.number(),
    description: z.string(),
    expanding: z.boolean().optional(),
  }),
});

// Interactive demos — a curated gallery decoupled from page routing. Each demo
// links back to the deeper work it was extracted from (reference -> projects).
const demos = defineCollection({
  loader: file('src/data/demos.json', { parser: bySlug }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    blurb: z.string(),
    href: z.string(),
    sourceWork: reference('projects'),
    thumbnail: z.string().nullable().optional(),
  }),
});

// Peer-reviewed publications — no natural slug, so key by array index.
const byIndex = (text: string) =>
  Object.fromEntries((JSON.parse(text) as unknown[]).map((e, i) => [String(i), e]));

const publications = defineCollection({
  loader: file('src/data/publications.json', { parser: byIndex }),
  schema: z.object({
    authors: z.array(z.string()),
    year: z.number(),
    title: z.string(),
    venue: z.string(),
    doi: z.string().optional(),
    arxiv: z.string().optional(),
    type: z.enum(['article', 'dissertation']),
    url: z.string().optional(),
    note: z.string().optional(),
  }),
});

export const collections = { projects, clusters, demos, publications };
