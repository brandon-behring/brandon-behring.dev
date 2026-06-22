import { readFileSync } from 'node:fs';
import path from 'node:path';

// Routes derived from the same source data the site builds from (#36), so a new
// cluster is auto-covered — no hardcoded cluster list to rot. cwd is the repo
// root when `npm run test:e2e` runs.
const read = <T>(rel: string): T =>
  JSON.parse(readFileSync(path.join(process.cwd(), rel), 'utf-8')) as T;

type Cluster = { slug: string };
type Project = { cluster: string; draft?: boolean };

const clusters = read<Cluster[]>('src/data/clusters.json');
const projects = read<Project[]>('src/data/projects.json');

// Mirror portfolio.ts `visibleClusters`: a cluster is visible iff it has >=1
// non-draft project.
const clusterRoutes = clusters
  .filter((c) => projects.some((p) => p.cluster === c.slug && !p.draft))
  .map((c) => `/work/${c.slug}/`);

// Static routes are file-based (src/pages/*), not in the data model — listed
// explicitly. (404 excluded: not a navigable 200 route.)
const staticRoutes = [
  '/',
  '/work/',
  '/lab/',
  '/research/',
  '/publications/',
  '/how-this-was-made/',
  '/lab/research-graph/',
  '/lab/why-discretization-matters/',
];

export const ALL_ROUTES = [...staticRoutes, ...clusterRoutes];
