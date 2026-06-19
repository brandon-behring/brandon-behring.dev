# Independent review — citation-graph edge connectivity (issue #23)

**Date:** 2026-06-18
**Driver:** Resolve #23 — light-mode ambient edges are faint (~1.41:1, below WCAG 1.4.11). Direction
chosen via /exploring-options: **keep ambient edges faint; surface connectivity on demand** — tapping a
node highlights its incident edges in the accent (≥3:1 both schemes). Branch
`fix/citation-graph-edge-connectivity`.

## Method

Verification-mode `independent-review`: 2 fresh-context `independent-reviewer` shards over the
uncommitted diff (`src/components/CitationGraph.astro` only), cold-read with checklists only. Shard 1 =
diff correctness; Shard 2 = a11y / WCAG-1.4.11 intent. Reviewer reasoning consumed as verdicts only.
Behavior verified at model level via Playwright (`#cy._cyreg.cy`, `emulateMedia` both schemes) +
`cy.png()` visuals (canvas renders blank headless; forced a synchronous `animate:false` layout so the
preview wasn't a hairball).

## Findings

| # | Shard | Item | Verdict | Resolution |
|---|---|---|---|---|
| 1 | correctness | new style rules valid (Cytoscape 3.33.4); `connectedEdges`/`neighborhood('node')`/multi-class `removeClass` | PASS | — |
| 2 | correctness | `.incident`/`.sel` override `.dim` by source order (placed after) | PASS | confirmed in source + live (dimmed-but-incident edge → opacity 1) |
| 3 | correctness | all close/reset paths clear emphasis; classes compose with search/pill; no double-binding | PASS | — |
| 4 | correctness | **`node.neighbor` (text-opacity only) → dimmed-then-tapped neighbor = label on a "ghost" dot** | **DRIFT** | **fixed** — neighbor now restores `background-opacity` (per-`_ingested`) + `border-opacity` |
| 5 | a11y | incident accent at opacity 1 ≥3:1 both schemes | PASS | light 5.03:1, dark 8.04:1 |
| 6 | a11y | faint-ambient + on-demand reveal satisfies 1.4.11 *intent* for dense graph | PASS | edges not sole channel; reveal is established technique |
| 7 | a11y | strictly additive; no new regression | PASS | — |
| 8 | a11y | **highlight is pointer-only; canvas has no per-node tab stops (keyboard gap)** | **DRIFT** (deferred) | pre-existing 2.1.1 constraint → documented in-code + filed **#25** |

## Edits applied (all in `src/components/CitationGraph.astro`)

- **On-demand connectivity:** new `buildStyle` rules `node.sel` / `node.neighbor` / `edge.incident`
  (placed after the `.dim` rules so emphasis wins by source order); helpers `clearEmphasis()` +
  `emphasizeNode()`; wired into node-tap (emphasize + detail) and cleared on background-tap / close /
  Escape / section-pill / search-reset. Ambient edges unchanged → **light mode byte-identical**.
- **Ghost-neighbor fix (finding 4):** `node.neighbor` also sets `background-opacity` (mirrors the base
  `_ingested ? 1 : 0.45`) + `border-opacity: 1`, so a filtered-then-tapped neighbor renders as a real
  node, not a label on an invisible dot. Live-verified in the search-then-tap combined state.
- **Keyboard limitation (finding 8):** documented in a code comment referencing #25.

## Edits NOT applied

- Full keyboard graph traversal (finding 8) — beyond a contrast follow-up; the canvas has no per-node
  tab stops (a 2.1.1 concern). Search remains the keyboard route to find nodes. Tracked as **#25**.

## Open follow-ups

- **#25** — keyboard access to node selection / edge connectivity (P3).

## Reference

- Issue: #23 (resolved by-design: 1.4.11 intent met via on-demand high-contrast reveal). Follow-up: #25.
- Decision direction: keep faint ambient (chosen over an ambient color bump, which would darken ~460
  edges into a busy mesh).
