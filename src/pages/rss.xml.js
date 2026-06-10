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

// Lab essays/explainers (MDX with a pubDate in frontmatter) are feed items too.
// research-graph (.astro, app-shaped) is intentionally not globbed.
const labPages = import.meta.glob('./lab/*.mdx', { eager: true });
const labItems = Object.entries(labPages)
  .filter(([, mod]) => mod.frontmatter?.pubDate)
  .map(([path, mod]) => ({
    title: mod.frontmatter.heading ?? mod.frontmatter.title,
    description: mod.frontmatter.description,
    link: path.replace('./', '/').replace(/\.mdx$/, '/'),
    pubDate: new Date(mod.frontmatter.pubDate),
  }));

export function GET(context) {
  return rss({
    title: 'Brandon Behring — new work',
    description: 'New work: projects, guides, tooling, and research artifacts.',
    site: context.site,
    items: [
      ...labItems,
      ...visibleProjects.map((p) => ({
        title: p.title,
        description: p.summary,
        link: projectLink(p),
      })),
    ],
  });
}
