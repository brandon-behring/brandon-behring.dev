import { getCollection } from 'astro:content';

/**
 * Typed accessors over the project/cluster/demo content collections (roadmap A6).
 * This is the single source of truth for "what is publicly visible": every page,
 * the RSS feed, and the nav read from here rather than touching the collections
 * directly, so a `draft` entry is filtered out everywhere at once and the
 * cluster/section helpers stay in one place. The raw JSON in `src/data/` remains
 * the editing surface; `src/content.config.ts` validates it at build time.
 */

export interface ExternalContext {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  /** Source-file position; used only to keep the RSS feed in a stable order. */
  srcOrder?: number;
  title: string;
  cluster: string;
  order: number;
  status: string;
  summary: string;
  description_long: string;
  whats_next?: string;
  stack?: string[];
  repo_url?: string;
  site_url?: string;
  external_context?: ExternalContext[];
  metrics?: string[];
  visual?: string | null;
  featured?: boolean;
  /** When true, the project is backlogged: hidden from every surface until ready. */
  draft?: boolean;
}

export interface Cluster {
  slug: string;
  name: string;
  section: string;
  order: number;
  description: string;
  expanding?: boolean;
}

/** An interactive demo in the Lab gallery, linked to the work it came from. */
export interface Demo {
  slug: string;
  title: string;
  blurb: string;
  href: string;
  sourceWork: { collection: string; id: string };
  thumbnail?: string | null;
}

/** A curated card on the homepage "Selected work" section. */
export interface Flagship {
  kind: 'project' | 'demo';
  title: string;
  blurb: string;
  href: string;
  /** Project status badge (projects only). */
  status?: string;
  /** The deeper work a demo was extracted from (demos only). */
  source?: { title: string; href: string | null };
  thumbnail?: string | null;
}

// Load + flatten the typed collections once (top-level await runs at module init).
const allProjects: Project[] = (await getCollection('projects'))
  .map((e) => e.data as Project)
  .sort((a, b) => (a.srcOrder ?? 0) - (b.srcOrder ?? 0));
const allClusters: Cluster[] = (await getCollection('clusters')).map((e) => e.data as Cluster);
const allDemos: Demo[] = (await getCollection('demos')).map((e) => e.data as Demo);

/** Every non-draft project. The backlog is the collection minus this set. */
export const visibleProjects: Project[] = allProjects.filter((p) => !p.draft);

/** Visible projects in a cluster, ordered. */
export function projectsForCluster(slug: string): Project[] {
  return visibleProjects
    .filter((p) => p.cluster === slug)
    .sort((a, b) => a.order - b.order);
}

/**
 * Best public destination for a project's name link: live site › public repo.
 * Returns null when nothing is publicly reachable (render as plain text) —
 * external-context companions belong in the Related section, not the name
 * link, so a click never lands on a different artifact than the title names.
 */
export function projectHref(p: Project): string | null {
  return p.site_url || p.repo_url || null;
}

/**
 * A cluster is visible iff it has at least one non-draft project. Defensive: a
 * no-op for the current roster, but it guarantees no hollow cluster card or
 * near-empty `/work/<slug>` page if every project in a cluster is ever drafted.
 */
export const visibleClusters: Cluster[] = allClusters.filter(
  (c) => projectsForCluster(c.slug).length > 0,
);

/** Visible clusters in a section (`now` | `tier` | `future`), ordered. */
export function clustersInSection(section: string): Cluster[] {
  return visibleClusters
    .filter((c) => c.section === section)
    .sort((a, b) => a.order - b.order);
}

// --- Homepage "Selected work" curation (Phase B consumes this) ----------------
// Explicit, ordered roster — deliberately decoupled from the `featured` flag
// (which still drives /work): 3 live works + the 2 interactive demos.
const FLAGSHIP_PROJECT_SLUGS = [
  'ssm-foundations',
  'double-ml-time-series',
  'prompt-injection-detection-prototype',
];
const FLAGSHIP_DEMO_SLUGS = ['research-graph', 'why-discretization-matters'];

// Curated one-line blurbs for the landing cards — deliberately short and
// vanity-metric-free, kept separate from the longer /work summaries.
const FLAGSHIP_BLURBS: Record<string, string> = {
  'double-ml-time-series':
    'Double machine learning extended to time series — cross-fitting that respects time ordering, with a live web edition.',
  'ssm-foundations':
    'A foundations book bridging numerical analysis and dynamical systems to modern sequence models — live and in progress.',
  'prompt-injection-detection-prototype':
    'A research study: do prompt-injection detectors generalize to attack families they were never trained on?',
};

function projectBySlug(slug: string): Project | null {
  // visibleProjects (not allProjects): a draft-flagged curated slug must not publish
  return visibleProjects.find((p) => p.slug === slug) ?? null;
}

export const landingFlagships: Flagship[] = [
  ...FLAGSHIP_PROJECT_SLUGS.map((slug): Flagship => {
    const p = projectBySlug(slug);
    if (!p) throw new Error(`landingFlagships: unknown project slug "${slug}"`);
    return {
      kind: 'project',
      title: p.title,
      blurb: FLAGSHIP_BLURBS[slug] ?? p.summary,
      href: projectHref(p) ?? '#',
      status: p.status,
    };
  }),
  ...FLAGSHIP_DEMO_SLUGS.map((slug): Flagship => {
    const d = allDemos.find((x) => x.slug === slug);
    if (!d) throw new Error(`landingFlagships: unknown demo slug "${slug}"`);
    const src = projectBySlug(d.sourceWork.id);
    return {
      kind: 'demo',
      title: d.title,
      blurb: d.blurb,
      href: d.href,
      source: { title: src?.title ?? '', href: src ? (projectHref(src) ?? `/work/${src.cluster}/`) : null },
      thumbnail: d.thumbnail ?? null,
    };
  }),
];

// --- "The full corpus" index (#30a) -------------------------------------------
// A scannable, cross-cluster list of the LIVE book/guide properties, surfaced on
// the existing /work/books-and-guides/ page (no new route, per decision-map:493).
// Curated like landingFlagships: explicit slugs + short, vanity-free copy. Two of
// these live in other clusters (ssm-foundations → course-notes, double-ml-time-series
// → causal-methods), so that cluster page can't enumerate them; this index binds
// them in, and corpusBackHref() adds the reciprocal link from their cluster pages.

export interface CorpusEntry {
  slug: string;
  title: string;
  /** Live deployed site (never a repo fallback — the corpus is reachable properties). */
  href: string;
  blurb: string;
  homeClusterName: string;
  homeClusterSlug: string;
  /** True when the home cluster is books-and-guides (then no "in: …" tag is shown). */
  isHome: boolean;
}

const CORPUS_HOME_CLUSTER = 'books-and-guides';
const CORPUS_HOME_HREF = '/work/books-and-guides/';

// Ordered released-first. Display title + one-liner override the repo-slug-ish raw
// project titles; copy is deliberately count-free (anti-vanity-metrics).
const CORPUS_ENTRIES: { slug: string; title: string; blurb: string }[] = [
  {
    slug: 'guides-ai-engineering',
    title: 'AI Engineering guide',
    blurb: 'Evaluation, LLM application engineering, and production systems.',
  },
  {
    slug: 'guides',
    title: 'Guides hub',
    blurb: 'Practitioner interview-prep guides for data, ML, and AI engineering.',
  },
  {
    slug: 'claude-books',
    title: 'claude-books',
    blurb: 'A series on Claude Code and agentic coding — architecture, design, practice.',
  },
  {
    slug: 'ssm-foundations',
    title: 'ssm-foundations',
    blurb: 'Numerical analysis and dynamical systems behind modern sequence models.',
  },
  {
    slug: 'double-ml-time-series',
    title: 'Double ML (time series)',
    blurb: 'Double machine learning for time series — cross-fitting that respects time order.',
  },
];

function clusterName(slug: string): string {
  return allClusters.find((c) => c.slug === slug)?.name ?? slug;
}

export const corpusIndex: CorpusEntry[] = CORPUS_ENTRIES.map((entry) => {
  const p = projectBySlug(entry.slug);
  if (!p) throw new Error(`corpusIndex: unknown or draft project slug "${entry.slug}"`);
  if (!p.site_url) throw new Error(`corpusIndex: project "${entry.slug}" has no live site_url`);
  return {
    slug: entry.slug,
    title: entry.title,
    href: p.site_url,
    blurb: entry.blurb,
    homeClusterName: clusterName(p.cluster),
    homeClusterSlug: p.cluster,
    isHome: p.cluster === CORPUS_HOME_CLUSTER,
  };
});

const corpusSlugSet = new Set(CORPUS_ENTRIES.map((e) => e.slug));

/**
 * Reciprocal back-link for a corpus member rendered on a NON-home cluster page
 * (ssm-foundations, double-ml-time-series); null otherwise, so ProjectSection
 * shows the link only where it binds back to the corpus index.
 */
export function corpusBackHref(p: Project): string | null {
  return corpusSlugSet.has(p.slug) && p.cluster !== CORPUS_HOME_CLUSTER ? CORPUS_HOME_HREF : null;
}
