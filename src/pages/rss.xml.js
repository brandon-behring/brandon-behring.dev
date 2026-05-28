import rss from '@astrojs/rss';
import clustersData from '../data/clusters.json';
import projectsData from '../data/projects.json';

// Clusters that have a generated /work/{slug} page (now + tier).
const pagedClusters = new Set(
  clustersData
    .filter((c) => c.section === 'now' || c.section === 'tier')
    .map((c) => c.slug)
);

/**
 * Resolve a stable, non-404 link for a project:
 *   live site → its /work cluster page → repo → home.
 * (No URL fragment: @astrojs/rss trailing-slash normalization mangles
 * fragments, so we link to the cluster page rather than the anchor.)
 */
function projectLink(p) {
  if (p.site_url) return p.site_url;
  if (pagedClusters.has(p.cluster)) return `/work/${p.cluster}/`;
  if (p.repo_url) return p.repo_url;
  return '/';
}

export function GET(context) {
  return rss({
    title: 'Brandon Behring — new work',
    description: 'New work: projects, guides, tooling, and research artifacts.',
    site: context.site,
    items: projectsData.map((p) => ({
      title: p.title,
      description: p.summary,
      link: projectLink(p),
    })),
  });
}
