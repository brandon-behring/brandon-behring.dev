# Independent review — TypeScript foundation (tsconfig + CI type-check)

**Date:** 2026-06-19
**Driver:** The "loose-ends" fcose hint turned out to be a symptom: the site **uses** TypeScript
everywhere (every `.astro` frontmatter, the `CitationGraph`/`EigenSlider` `<script>` islands,
`content.config.ts`) but had **no `tsconfig.json`**, so nothing type-*checked*. With interactive demos
coming (more TS islands, where type-safety catches real bugs), the user chose — via `/exploring-options`
— to adopt a real TS foundation rather than paper over the hint. Folded into the held PR #28 (which
already carried the `is:inline` data-island fix + the docs reconciliation).

**Decisions:** strictness **`strict`** (measured: same cleanup cost as `base` — 1 error — but real
safety; `strictest` added +1 error for marginal gain); CI = **fold `astro check` into `npm run build`**
(no cross-repo workflow edit — the reusable deploy runs `npm run build`).

## Method

`independent-review`, one fresh-context shard, cold-read over the uncommitted TS-foundation diff
(`tsconfig.json`, `package.json`, `package-lock.json`, `src/content.config.ts`, `src/layouts/Base.astro`)
plus the already-committed `src/env.d.ts`. The reviewer independently ran `astro check`, inspected the
lockfile integrity, live-tested `z.url()` equivalence, and read the `file()` loader's `ParserOutput`
type. A pre-review measurement step ran `astro check` at base/strict/strictest to size the cleanup
(decide-by-seeing). Runtime confirmed via Playwright on `/lab/research-graph/` (model reads).

## Findings — verdict PASS (8/8 PASS·NIT, no FAIL/DRIFT)

| # | Item | Verdict | Evidence |
|---|---|---|---|
| 1 | `tsconfig.json` valid, `extends astro/tsconfigs/strict`, sensible `include`/`exclude` | PASS | preset exists; `.astro/types.d.ts` + src included, `dist` excluded; no unintended files |
| 2 | build gate sound: `@astrojs/check` in devDeps **and** lockfile (matching integrity), `typescript` present | PASS | `npm ci` will install it; type error blocks build |
| 3 | `byIndex` cast (`Array<Record<string, unknown>>`) behavior-preserving + satisfies `ParserOutput` | PASS | runtime identical; other parsers untouched |
| 4 | `z.url()` migration validates equivalently (zod v4.4.3 via `astro/zod`) | PASS | live-tested valid/invalid; build validated `projects.json` |
| 5 | `is:inline` on the two JSON-LD scripts — correct (was actually a correctness fix, not just cosmetic) | PASS | astro check 0 after |
| 6 | `src/env.d.ts` now resolves cytoscape-fcose (TS7016 gone) with the tsconfig | PASS | reference path correct; 0 errors |
| 7 | `astro check` → **0 errors / 0 warnings / 0 hints** (24 files) | PASS | reviewer-run |
| 8 | no new type error / broken import from enabling strict | PASS | 24 files clean |

## Edits applied

- **`tsconfig.json`** (new): `extends astro/tsconfigs/strict`, `include [".astro/types.d.ts", "**/*"]`,
  `exclude ["dist"]`.
- **`package.json`**: `@astrojs/check@^0.9.9` devDep; `"build": "astro check && astro build"`; added
  `"check": "astro check"`.
- **`src/content.config.ts`**: `byIndex` cast → `Array<Record<string, unknown>>` (fixes the lone
  type error — publications parser now satisfies `ParserOutput`); `z.string().url()` → `z.url()` ×2.
- **`src/layouts/Base.astro`**: `is:inline` on both `application/ld+json` scripts.
- **`src/env.d.ts`**: unchanged (committed earlier) — now *effective* given the tsconfig.

## Edits NOT applied

- `strictest` (rejected: +1 error + ongoing index/optional-access friction in demo code, marginal gain).
- `@types/cytoscape-fcose` (the ambient `env.d.ts` declaration suffices; the import only feeds
  `cytoscape.use()`).

## Verification

`astro check` 0/0/0 (24 files); `npm run build` (now check-gated) green; both islands run — Playwright on
`/lab/research-graph/` shows 119 nodes, keyboard-select (Atari → 31 incident edges) works, 0 console
errors; CitationGraph bundle hash byte-identical to the #25 build (runtime unchanged by the tsconfig).

## Adversarial review (post, on PR #28)

A `/adversarial-review` pass (2-voice — Claude + Codex; **Gemini down**, `IneligibleTierError`) over the
full PR diff, tool-grounded. Outcome: **no blockers.**

- **Refuted by grounding:** "build gate breaks CI" (the reusable workflow runs plain `npm ci` → devDeps,
  incl. `@astrojs/check`, *are* installed; Codex independently refuted too) · `z.url()` regression (26
  real project URLs, **0** `z.url()` vs `z.string().url()` mismatches).
- **Inert / mitigated (not introduced here):** `</script>` not escaped in the data island's
  `set:html` JSON — but the data has **0** `<` chars, prod CSP is `script-src 'self'`, and `set:html`
  predates this diff (`is:inline` is escaping-neutral). Logged as optional future hardening.
- **Applied (the one actionable finding):** `src/env.d.ts` reference `../.astro/types.d.ts` →
  `astro/client` (the former is redundant with the tsconfig `include` and dangles on a fresh clone
  before `astro sync`). `astro check` re-confirmed 0/0/0. Run saved under `~/.cache/adversarial-review/`.

## Reference

- Folded into PR #28 (combined: TS foundation + `is:inline` + docs reconciliation). Books are separate
  repos — untouched. Strictness can be ratcheted later.
