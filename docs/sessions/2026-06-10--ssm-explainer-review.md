# Independent review — SSM explainer PR (2026-06-10)

**Driver**: pre-commit gate for branch `lab-ssm-explainer` (new explainer page
`/lab/why-discretization-matters/` + KaTeX pipeline + EigenSlider + figures +
integration + trio-doc updates). Session: [`2026-06-10--ssm-explainer.md`](2026-06-10--ssm-explainer.md).

**Method**: 3 fresh-context `independent-reviewer` shards, cold-read (no author
reasoning), verdicts-only distillation per the `independent-review` skill.

## Findings

| Shard | Scope | Verdict | Notes |
|---|---|---|---|
| A | Essay factual/mathematical claims + slider math | **PASS** (15/15) | Author list + abstract phrases verified against the arXiv page and paper PDF; ZOH/Euler/bilinear/Dahlquist/φ-function statements verified analytically; slider divergence counts (2/6 at Δ=0.4, 4/6 at Δ=1.5) match analytic thresholds; canvas bounds hold across the full Δ range; no invention claims; no "Oral". |
| B | Links + assets | **PASS** (21/21) | Every external URL 200 (6 chapter pages, arXiv, OpenReview, companions dir); all 3 section anchors exist in rendered HTML; 6 PNGs present with exact name/dimension matches; alt text verified against the actual rendered images; built HTML has 41 katex spans, 0 raw `$$`, balanced figure markup. |
| C | Code + docs consistency | **FAIL → 1 DRIFT** | All code findings OK (config diff, frontmatter→props mapping, slider JS math + transforms + a11y, JSON validity, pill structure, no-snapshot rule, roadmap restructure, session-log spot-checks 3/3). One DRIFT below. |

**DRIFT (shard C):** `CHANGELOG.md` ("SSM explainer **live**") and `docs/roadmap.md`
("shipped 2026-06-10") are in shipped tense while the page 404s on prod — the PR is
deliberately held for Brandon's editorial read — and the ship-at-merge convention this
phrasing relies on was **documented nowhere** (DOC-CONVENTIONS had no such rule; only the
session log explained it). A CHANGELOG reader on the branch would hit a 404.

## Edits applied

- **Shard C proposed fix, Option A**: added a "Ship-at-merge semantics" paragraph to
  `docs/DOC-CONVENTIONS.md` — CHANGELOG/roadmap entries may be pre-loaded on a PR branch
  in shipped tense; `CURRENT_WORK.md` is authoritative for "is it actually live?".
  Chosen over Option B (strip the shipped-tense lines until merge) because ship-at-merge
  phrasing is Brandon's established precedent
  ([`2026-06-10--audit-densify-review.md`](2026-06-10--audit-densify-review.md), where
  the analogous fix was deliberately NOT applied) — the real gap was that the convention
  was undocumented, which Option A closes.

## Edits NOT applied

- **Shard C Option B** (defer CHANGELOG line + revert roadmap phrasing until merge) —
  conflicts with the established ship-at-merge precedent; the branch-only visibility
  window is short and Brandon (the only branch reader) knows the state.
- **Shard A caveat** (not a finding): the essay attributes "second order, A-stable,
  Dahlquist bound" to the (generalized) trapezoidal rule; A-stability is classical for
  the trapezoidal family but the paper's own stability analysis of its generalized
  variant wasn't separately verified. Left as-is — the properties are attributed to the
  rule family, which is the correct classical statement.

## Coverage gaps (reviewers' `not_reviewed`, aggregated)

- Dark-variant PNG visual content (light variants + one dark verified by the author
  in-session; shard B viewed light only).
- Live prod render (page not yet deployed — expected; post-merge verification is
  Phase 5.3 of the plan).
- Board membership of the 8 re-boarded eval-toolkit issues (issue existence + label
  verified; item-list membership was verified by the author pre-review).

## Reference

- Tasks: #15 (shard A), #16 (shard B), #17 (shard C) — `/check-delegated` for drill-down.
- Marker: `.claude/.last-review` written at the timestamp below.
