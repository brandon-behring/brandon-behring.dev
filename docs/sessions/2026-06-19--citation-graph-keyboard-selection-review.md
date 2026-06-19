# Independent review — citation-graph keyboard selection (issue #25)

**Date:** 2026-06-19
**Driver:** Resolve #25 — the node-selection / incident-edge-highlight interaction (added in #23) was
pointer-tap only; the Cytoscape canvas (`role="application"`) has no per-node tab stops, so keyboard
users couldn't invoke it (WCAG **2.1.1**). Direction chosen by user: **Search + Enter selection** — the
existing search box becomes the keyboard gesture that fires the same `renderDetail()` + `emphasizeNode()`
a tap does. Branch `fix/citation-graph-keyboard-selection`.

## Method

Verification-mode `independent-review`: 2 fresh-context `independent-reviewer` shards over the uncommitted
diff (`src/components/CitationGraph.astro` only), cold-read with checklists only (intended conclusions
withheld). Shard 1 = diff correctness; Shard 2 = a11y / WCAG 2.1.1. Reviewer reasoning consumed as
verdicts only. Behavior verified at model level via Playwright (`#cy._cyreg.cy`, real `page.keyboard`,
both schemes via `emulateMedia`) + `cy.png()` visuals (canvas renders blank headless; rendered into an
`<img>` to screenshot). Both shards returned **FAIL**; fixes applied and re-verified below.

## Findings

| # | Shard | Item | Verdict | Resolution |
|---|---|---|---|---|
| 1 | correctness | Enter handler selects best match + fires renderDetail/emphasizeNode (happy path) | PASS | live-verified (unique, collision, arxiv, 0-match, empty) |
| 2 | correctness | **`bestMatch` returns `null` if every match has an empty label → `renderDetail(null)` throws** | **FAIL** | **fixed** — `return best ?? matches[0]` (kept `\|\| Infinity` so empty labels still never *win*) |
| 3 | correctness | `matchNodes`/`applyFilter` refactor behavior-preserving for the live search | PASS | confirmed: live filter 6 highlight / 113 dim, no `.sel`, status cleared |
| 4 | correctness | empty-Enter calls `applyFilter('')` before the `!q` guard (panel/canvas split) | DRIFT | **adjudicated no-change** — consistent with existing search↔panel independence (the live-input empty path behaves identically); the reviewer's reorder would trade it for a sub-200 ms stale-highlight race |
| 5 | correctness | function-declaration hoisting of `setStatus`/`matchNodes`/… referenced earlier | DRIFT (latent) | **no-change** — correct JS; every call site is an event handler that runs after `init()` completes |
| 6 | correctness | Cytoscape 3.x API (`cy.collection`, `closedNeighborhood`, `[0]`, `.filter`, `.contains`) | PASS | verified against installed `cytoscape@3.x` source |
| 7 | a11y | **no visible focus ring on `#paper-search` (`outline:none`, global `:focus-visible` is links-only) — the keyboard entry point is invisible (WCAG 2.4.7)** | **FAIL** | **fixed** — added `#paper-search:focus-visible` accent ring (matches Base.astro / `.pill`); live-verified `outline: 2px solid rgb(59,111,160)` on Tab focus |
| 8 | a11y | stale `#search-status` text after Escape / close / background-tap | DRIFT | **fixed** — `setStatus('')` added to all three dismiss paths (verified `status === ''` after Escape) |
| 9 | a11y | `role="status"` + `aria-live="polite"` redundant (role implies polite) | DRIFT | **fixed** — dropped explicit `aria-live`, kept `role="status"` |
| 10 | a11y | hint "highlights its **citations**" overclaims (emphasis = all connected, in + out) | DRIFT | **fixed** — "highlights its **connected papers**" |
| 11 | a11y | reachability claim depends on unique titles/arxiv_ids | DRIFT | **verified** against rendered data: all 119 nodes have **unique titles** (0 dup-title groups, 0 empty labels) → claim holds; comment kept |
| 12 | a11y | detail-panel `aria-live` may double-announce with `#search-status` | DRIFT | **no-change** — benign/helpful overlap; panel live region is pre-existing (#22/#23) and serves pointer users |
| 13 | a11y | selection not color-only (panel opens, 3 px border, status text, 2 px edges) — WCAG 1.4.1 | PASS | — |
| 14 | a11y | no regressions to skip-link / reduced-motion / `.visually-hidden` | PASS | — |

## Edits applied (all in `src/components/CitationGraph.astro`)

- **Keyboard selection (the feature):** `aria-describedby` hint + `#search-status` `role="status"` live
  region; extracted `matchNodes(q)` + `applyFilter(q)` (shared by the live filter and the keyboard path);
  added the Enter `keydown` handler (best-match select → `renderDetail` + `emphasizeNode` + fit to
  `closedNeighborhood`, with 0 / 1 / N status announcements); `bestMatch(matches, q)` (exact title/label
  equality wins, else shortest label, stable). Updated the tap-handler comment to point at the search path.
- **Review fixes:** `bestMatch` null fallback (#2); `#paper-search:focus-visible` accent ring (#7);
  `setStatus('')` in the canvas-tap / close-button / Escape dismiss paths (#8); dropped redundant
  `aria-live` (#9); hint copy "citations" → "connected papers" (#10).

## Edits NOT applied

- **Empty-Enter reorder (#4)** — current behavior is consistent with the existing search↔panel
  independence; reorder would add a stale-highlight race. Documented.
- **Hoist function declarations (#5)** — correct as written; no defect.
- **Remove detail-panel `aria-live` (#12)** — pre-existing, benign.
- **Arrow-key match cycling (#11 alt)** — that is the combobox/listbox model the user declined; out of
  scope by decision. Reachability is guaranteed by unique titles + the "refine" status hint.

## Open follow-ups

- None blocking. Optional future enhancement (if ever desired): a results listbox / arrow-key cycling to
  browse colliding matches without retyping — would supersede the search+Enter path. Not filed (the
  current fix closes 2.1.1).

## Reference

- Issue: #25 (resolved: node selection + incident edges now keyboard-operable via search + Enter; every
  node reachable — all 119 titles unique). WCAG 2.1.1 closed; 2.4.7 focus-ring gap fixed in passing.
- Verification: keyboard-only (`page.keyboard` Tab→type→Enter, no pointer) both schemes; incident/sel =
  scheme accent (light `rgb(59,111,160)` ≈5:1 / dark `rgb(127,176,221)` ≈8:1); 0 console errors.
