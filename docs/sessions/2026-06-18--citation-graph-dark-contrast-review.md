# Independent review — citation-graph dark-mode contrast (issue #22)

**Date:** 2026-06-18
**Driver:** Fix #22 — `/lab/research-graph/` rendered light-only foreground colors on the
dark canvas (node labels, detail-panel badges). Branch `fix/citation-graph-dark-contrast`.

## Method

Verification-mode `independent-review`: 2 fresh-context `independent-reviewer` shards over the
uncommitted diff (`src/components/CitationGraph.astro`, `src/styles/tokens.css`), cold-read with
checklists only (intended conclusions withheld). Shard 1 = diff correctness; Shard 2 = a11y/contrast
+ token consistency. Reviewer reasoning was consumed as verdicts only.

A material discovery preceded the review and reshaped the fix: Playwright (real `page` via the
Playwright MCP, `emulateMedia` for both schemes) showed the detail-panel's **injected** content
(`innerHTML`) never carried Astro's scope attribute, so `#detail-panel h2[data-astro-cid]` /
`.badge-ingested[data-astro-cid]` **never matched** — the panel content (incl. badges) had been
rendering unstyled since the component was written. The issue's "badges fail dark contrast" was a
code-read, not rendered reality (a `verify-rendered-reality-not-notes` case). Per user call, fixed
the whole panel, not just badges.

## Findings

| # | Shard | Item | Verdict | Resolution |
|---|---|---|---|---|
| 1 | correctness | `cy.style().fromJson(...).update()` validity (Cytoscape 3.33.4) | PASS | — |
| 2 | correctness | `.dim`/`.highlight` classes survive stylesheet rebuild | PASS | — |
| 3 | correctness | `paletteFor`/`buildStyle` refactor behavior-preserving | PASS | — |
| 4 | correctness | `:global()` matches injected descendants, no leak; template elems stay scoped | PASS | verified via before/after build output |
| 5 | correctness | no syntax/TS/dead-code issues | PASS | — |
| 6 | a11y | node label `#f1efe9` on `#15140f` | PASS | 16.0:1 |
| 7 | a11y | highlight border `#7fb0dd` (graphical) | PASS | 8.0:1 |
| 8 | a11y | 4 dark badges (released/progress/prototype/thesis) on composited bg | PASS | 7.0–7.8:1 |
| 9 | a11y | `--status-thesis-*` token structurally consistent (light + dark, bg/fg/border) | PASS | — |
| 10 | a11y | light values byte-identical to prior hardcoded hex (no regression) | PASS | exact match |
| 11 | a11y | **dark edge `#6b665b` @ 0.6 opacity = 1.93:1** | **FAIL** | **fixed** → `#9b9690` (3.04:1) |
| 12 | a11y | pre-existing light edge `#bbb` @ 0.6 = 1.41:1 | (out of scope) | filed as **#23** |

## Edits applied

- **Scheme-aware canvas palette** (`CitationGraph.astro`): `paletteFor(dark)` + `buildStyle(p)`;
  node label, highlight border, node border, edges now per-scheme; re-themed on `matchMedia` `change`
  via `cy.style().fromJson(...).update()` (classes preserved). Light values byte-identical.
- **Whole detail panel** (`CitationGraph.astro`): injected content (`h2`/`.meta`/`.authors`/`.finding`/
  `.link` + `.badge*`) anchored on scoped `#detail-panel` with `:global()` descendants so it actually
  renders; badges moved onto shared `--status-*` tokens.
- **New `--status-thesis-*` token** (`tokens.css`): light = old hardcoded `.badge-thesis` hex; dark
  variant added (mirrors `prototype`).
- **Dark edge AA fix** (finding 11): `#6b665b` → `#9b9690` (3.04:1), per "follow standard practice" —
  fix-what-you-touch to the bar; light left unchanged.

## Edits NOT applied

- Light-mode edge contrast (finding 12) — pre-existing, would change light-mode appearance materially
  (~460 busier edges) and wants a decide-by-seeing pass. Tracked separately as **#23**.
- Optional light `nodeBorder` `#ffffff` → `#faf9f7` exact-moat tweak — no a11y impact; skipped.

## Open follow-ups

- **#23** — light-mode edge contrast (pre-existing, P3).

## Reference

- Issue: #22. Follow-up: #23.
- Verification: model-level reads via `#cy._cyreg.cy` (headless renders the Cytoscape canvas blank);
  panel screenshots (DOM renders headless) confirmed pill rendering both schemes.
