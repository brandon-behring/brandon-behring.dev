import rss from '@astrojs/rss';
import { visibleProjects, visibleClusters } from '../data/portfolio';

// Every visible cluster has a generated /work/{slug} page.
const pagedClusters = new Set(visibleClusters.map((c) => c.slug));

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
    items: visibleProjects.map((p) => ({
      title: p.title,
      description: p.summary,
      link: projectLink(p),
    })),
  });
}
