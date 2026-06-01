# Independent review — Track 1.6 polish & hygiene sweep (2026-06-01)

**Driver**: pre-commit ambient review of the Track 1.6 sweep on branch
`track-1.6-polish` (status taxonomy, jargon scrub, security headers, SEO/JSON-LD,
Home↔Work de-dup).

**Method**: 3 fresh-context `independent-reviewer` subagents, cold-read, in
parallel — each given one artifact slice + a checklist, withholding the intended
conclusion. Shards: (A) overclaim/content in `projects.json`, (B) Astro code
correctness, (C) security headers / SEO / JSON-LD claims. Verdicts only surfaced;
reasoning chains suppressed.

## Findings

| # | Shard | Finding | Verdict | Resolution |
|---|---|---|---|---|
| 1 | A | `book-scaffold-astro` "npm-published" flagged as false (unscoped name 404s) | FAIL | **False positive** — published as `@brandon_m_behring/book-scaffold-astro@4.11.0`. No change. |
| 2 | A | `annuity-pricing` = `released` but copy said "Dormant at reference quality"; no PyPI release | FAIL (real) | Verified true state: configured Python package (pyproject/tests/docs) **not yet on PyPI**. → **`in-progress`**; `whats_next` rewritten; PyPI-publish added to follow-ups. |
| 3 | A | `research-kb` = `released` but local-only infra ("not a product"), active expansion | DRIFT (real) | → **`in-progress`** (matches the active-expansion `whats_next`; still powers the live `/lab/research-graph` demo). |
| 4 | A | exactly 4 status values; jargon (D1-D29 / Round 8 / Decision Y) gone; reworded `whats_next` read well | PASS | — |
| 5 | B | dark-mode badge: only text lightened, pill background/border tint (rgba 0.15) faint on `#1a1a1a` | DRIFT (info) | **Fixed** — dark-mode bg 0.22 / border 0.55 overrides added for released/in-progress/prototype. |
| 6 | B | de-dup clean (no `tierClusters`/`futureProjects`/`.more-work`/`.tier-grid`/`.future`), signposts present, JSON-LD objects valid, `work-future-heading` anchor exists, all imports used | PASS | — |
| 7 | C | `_headers`/`robots.txt` untracked → live site has no headers | FAIL | **Expected pre-deploy state** — resolved by committing + deploying (this sweep). |
| 8 | C | CSP sound: Cytoscape bundle has no `eval` (`script-src 'self'` OK); `style-src 'unsafe-inline'` needed for Astro inline styles; CF-analytics domains allowlisted; base-uri/form-action/frame-ancestors/object-src present; no wildcard/unsafe-eval | PASS | — |
| 9 | C | HSTS (no preload), nosniff, Referrer-Policy, Permissions-Policy sane; robots.txt sitemap URL correct; JSON-LD has no `jobTitle`, `sameAs` canonical | PASS | — |

## Edits applied (post-review)
- `projects.json`: `annuity-pricing` `released → in-progress` + honest `whats_next`; `research-kb` `released → in-progress`. New distribution: **4 released / 16 in-progress / 2 prototype / 1 planned**.
- `StatusBadge.astro`: dark-mode background + border overrides for the three colored variants.

## Edits NOT applied
- `book-scaffold-astro` summary "npm-published" — left as-is (verified accurate, scoped package).
- Base.astro Cloudflare-Analytics HTML comment (reviewer noted the live page shows no beacon) — pre-existing, out of sweep scope; see follow-ups.

## Open follow-ups
- **annuity-pricing → PyPI**: publish the configured package so it earns `released` (roadmap + tracked issue filed against `annuity-pricing`).
- **Verify CF Web Analytics** is actually enabled in the Cloudflare dashboard; the reviewer found no beacon on the live page. CSP allowlist is forward-compatible/harmless either way. Reconcile the `Base.astro` analytics comment with reality.
- (Out of scope, noted) reviewer flagged `@astrojs/mdx` may be absent from `astro.config.mjs` integrations — no `.mdx` routes exist today, so non-breaking.

## Reference
- Plan: `~/.claude/plans/use-the-following-sto-fluffy-forest.md`
- Prior review logs: `docs/sessions/2026-05-30--drift-review.md`, `docs/sessions/2026-05-31--track1-review.md`
