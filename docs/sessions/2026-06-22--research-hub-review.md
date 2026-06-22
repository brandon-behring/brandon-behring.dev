# Independent review — `/research` hub (feat/research-hub)

**Date:** 2026-06-22
**Driver:** ambient `independent-review` before committing the new public `/research` page (built
this session as the resolution of the hub-structure decision; roadmap Track A → A8). Adversarial /
claim-safety focus — new public-facing page on a job-seeking portfolio.

## Method
`independent-review` skill, 2 parallel cold-read `independent-reviewer` shards (intent withheld):
- **Shard A** — hostile editor + claim-safety auditor: `src/pages/research/index.astro` copy vs
  `docs/website-decision-map.md` claim-safety notes + consistency with `src/data/projects.json`.
- **Shard B** — hostile QA / front-end: link resolution (internal routes + external `curl`), nav
  integration, homepage edit, `astro check`/build risk.

Both returned **FAIL**. Orchestrator adjudicated the objective findings against ground truth.

## Findings (after adjudication)

| Shard | Sev | Finding | Adjudication | Fix |
|---|---|---|---|---|
| A | blocker | "each substantive **artifact** carries a decision log and an independent audit" overclaims — `/how-this-was-made/` only claims "each substantive **project**"; not every linked book/demo has an in-repo audit | CONFIRMED | **Applied** — "substantive projects carry … where the work warrants it" |
| A | fix | "**reference-quality** causal implementations" — `projects.json` hedges ("the *intent* is reference-quality") | CONFIRMED | **Applied** — "causal implementations … built toward reference quality" |
| A | info | `research_toolkit` is in-progress; "back the citations" slightly strong | CONFIRMED | **Applied** — "(in development)" |
| A | info | dml link lacks an in-progress qualifier (Thread 1 has one) | minor; dml has "10 chapters live" | not applied (blurb carries framing; status lives on `/work`) |
| B | fix | homepage `.research-link` class had **no CSS rule** (sibling `.proof-link` is sans/0.9rem) → wrong font | CONFIRMED (grep) | **Applied** — added the rule |
| B | info | nav order: Research placed after Publications; reviewer + author lean before | judgment | kept approved order (after Publications); easy later tweak |
| A/B | PASS | SSM synthesis-not-invention framing · prompt-injection PoC-not-production framing · no vanity metrics · no scope-leak (post_transformers not surfaced) · all 7 links resolve (ssm-foundations / dml / OOD study `curl` 200; internal routes confirmed) · nav well-formed + active-state · Base import/props/tokens/fulcrum-rule global | CONFIRMED | none |

## Edits applied
Three objective fixes (claim-safety ×2 + the CSS bug) above. `npm run build` green after; `/research`
re-verified (0px page overflow, 3 threads, 7 links, nav active).

## Edits NOT applied
dml in-progress qualifier (optional); nav reorder (kept approved order — judgment, reversible).

## Open follow-ups
- Optional: move the Research nav item before Publications if the discovery-entry-point reading wins.
- The dev-account public-duplicate sweep (account-split execution) remains board work (#5).

## Reference
Reviewed: `feat/research-hub` — `src/pages/research/index.astro` (new) + `Header.astro` nav +
`index.astro` homepage link. Tasks #39 (Shard A), #40 (Shard B).

## Post-review updates (2026-06-22)
- **Nav reorder** (PR #43): Research now precedes Publications — the "Open follow-ups" item above, applied.
- **Second adversarial review** of the full shipped state (PRs #41/#42/#43) caught a **misplaced link** —
  `/lab/research-graph/` sat under the "Sequence models" thread but is RL/control papers → moved to a new
  **"Reinforcement learning & control"** thread. Plus doc corrections (decision count 3→2; dropped PyPI
  version snapshots per DOC-CONVENTIONS; named the full **8-repo** account-split sweep). The high-stakes
  temporalcv-consolidation claim **verified TRUE** (PyPI + repo + CFF all → brandon-behring).
