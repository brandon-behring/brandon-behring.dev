import clustersData from './clusters.json';
import projectsData from './projects.json';

/**
 * Typed accessors over the raw project/cluster JSON. This is the single source of
 * truth for "what is publicly visible": every page, the RSS feed, and the nav read
 * from here rather than importing the JSON directly, so a `draft` entry is filtered
 * out everywhere at once (and the cluster/section helpers stay in one place instead
 * of being copy-pasted across pages).
 */

export interface ExternalContext {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
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

const allProjects = projectsData as Project[];
const allClusters = clustersData as Cluster[];

/** Every non-draft project. The backlog is `projectsData` minus this set. */
export const visibleProjects: Project[] = allProjects.filter((p) => !p.draft);

/** Visible projects in a cluster, ordered. */
export function projectsForCluster(slug: string): Project[] {
  return visibleProjects
    .filter((p) => p.cluster === slug)
    .sort((a, b) => a.order - b.order);
}

/**
 * Best public destination for a project's name link:
 * live site › public repo › first external-context companion with a url.
 * Returns null when nothing is publicly reachable (render as plain text).
 */
export function projectHref(p: Project): string | null {
  return p.site_url || p.repo_url || (p.external_context?.find((e) => e.url)?.url ?? null);
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
