# Track 1.6 — polish & hygiene sweep (2026-06-01)

**Driver**: clear the contrarian audit's remaining P2/P3 tail after Track 1.5a/1.5b.
Self-contained plan: `~/.claude/plans/use-the-following-sto-fluffy-forest.md`.
Shipped as one reviewed commit (`62c1323`) → merged to `main` → auto-deployed →
verified live.

## Decisions

Process round (3 questions): full ship + verify · honest/strict status mapping ·
file all cross-repo items as tracked issues.

Design round (`/exploring-options`, 5 questions):
1. Status vocabulary → **`released` / `in progress` / `prototype` / `planned`**
   ("released" fits packages *and* studies without the brag).
2. CSP → **keep Cloudflare Web Analytics, allowlisted** (`static.cloudflareinsights.com`
   + `cloudflareinsights.com`) rather than a pristine `'self'`-only policy.
3. HSTS → **no `preload`** (reversible; doesn't lock future subdomains).
4. JSON-LD → **+ factual `alumniOf`** (NJIT + NYU) for entity-resolution /
   namesake disambiguation; no `jobTitle`.
5. Home → **curated lead + two one-line signposts** (full de-dup).

Mid-execution correction (verify-rendered-reality): NYU wasn't on the site, but
Brandon confirmed **Master's + postdoc at NYU** → `alumniOf` legitimately keeps both.

## What shipped

- **Status taxonomy**: `projects.json` 7 → 4 states; `StatusBadge.astro` rewritten
  with per-status color pills (light + dark mode); 4-chip legend on `/work/`.
  Final mix after cold review: **4 released / 16 in-progress / 2 prototype / 1 planned**.
- **Jargon scrub**: two `whats_next` fields rewritten (no internal decision/round codes).
- **`public/_headers`**: CSP + HSTS (no preload) + nosniff + Referrer-Policy +
  Permissions-Policy.
- **`public/robots.txt`** + Person/WebSite JSON-LD in `Base.astro`.
- **Home↔Work de-dup**: dropped the tier grid + future list from `index.astro`;
  added "See all work →" + "Where this is going →"; `/work/` is the canonical catalog.

## Review (gate)

`independent-review` — 3 cold reviewers (content / code / headers-SEO). Verdicts +
the 2 applied overclaim downgrades (`annuity-pricing`, `research-kb` → in-progress)
and the dark-mode badge fix are in `docs/sessions/2026-06-01--polish-sweep-review.md`.
One flagged "overclaim" (`book-scaffold-astro` "npm-published") was a false positive —
it's published scoped as `@brandon_m_behring/book-scaffold-astro@4.11.0`.

## Verification (live)

- `npm run build` clean (14 routes); `jq` → exactly the 4 statuses.
- `wrangler dev` (real CF runtime) parsed `_headers`; curl confirmed all 5 headers.
- Playwright on the **live** site: 0 CSP console errors on `/`, `/work/`,
  `/lab/research-graph/`, `/publications/`; Cytoscape lab graph renders under
  `script-src 'self'`; dark-mode badges legible; JSON-LD (Person + WebSite) parses.
- `curl` live: 5 security headers present, `robots.txt` sitemap line present.

## Follow-ups (filed as `tracked` issues)

book-scaffold-astro#91 (a11y) · deploy-workflows#2 (LICENSE) ·
prompt-injection-portfolio#3 (path scrub) · insurance-ai-toolkit#11 (dead demo) ·
annuity-pricing#11 (**PyPI publish → then it earns "released"**) ·
brandon-behring.dev#2 (homepage/topics + CITATION.cff + OG images).

Carry-over (not this sweep): A4 graph densification blocked on the research-kb
metadata-extraction issue; verify Cloudflare Web Analytics is actually enabled
(reviewer found no beacon on the live page; CSP allowlist is harmless either way).
