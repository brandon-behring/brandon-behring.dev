# 2026-06-23 — Issue #52 StabilityRegion visualizer: review

**Driver.** Pre-merge review gate for #52 — new `src/components/StabilityRegion.astro`
(interactive DeltaNet-vs-Longhorn stability-region canvas) + a new section in
`src/pages/lab/why-discretization-matters.mdx` + a new `e2e/demos.spec.ts` spec +
hand-sync notes in `src/styles/tokens.css` / `docs/design-tokens.md`. Public-facing and
math-claim-bearing → both review tiers run.

## Method
- **`independent-review`** → 3 fresh-context `independent-reviewer` shards (artifact +
  checklist only, no author intent): **A** math/formula correctness vs
  `ssm-foundations/companions/ch12/jax/stability.py`; **B** prose claims / links /
  a11y / dark-mode parity; **C** open-ended consistency-refute. Orchestrator-added: WCAG
  contrast computed on the on-canvas label colours (closed shard B's `not_reviewed` gap).
- **`/adversarial-review`** (lever `adversarial_review.py --uncommitted`) → 2 external
  voices: **codex** (gpt-5.5 @ xhigh) + **gemini** (Gemini 3.1 Pro via `agy`), refute-mode.
  Each finding grounded against ground truth (grep for Astro View Transitions; EigenSlider
  parity). Run artifact:
  `~/.cache/adversarial-review/brandon-behring.dev/feat-52-stability-region-visualizer-20260623-144323.md`.

## Findings + disposition

| # | Source | Severity | Finding | Disposition |
|---|---|---|---|---|
| A1–A6 | indep-math | PASS | ρ formulas, boundary = 2, complement identity, verdict strings + e2e (em-dash/‖k‖² byte-verified), `px`/`py` transforms — all match `stability.py` | — none |
| B-C3 / C-F2 | indep ×2 | **blocker** | "never reaches even half the explicit boundary" is false for the radius (ρ_LH = 0.67 at the default ‖k‖²=0.5); the ch12 fact is about the *effective write* β^eff‖k‖² < 1 | **FIXED** — re-attributed to β^eff‖k‖² = 1 − ρ |
| C-F1 | indep | fix | ρ_LH "< 1 for every key" vs the component's correct "(marginal)" at ‖k‖²=0 (ρ=1, no write) | **FIXED** — "every *nonzero* key" |
| contrast | orchestrator | fix | light-mode DeltaNet **label** #bb5566 = 4.33:1 < AA 4.5 (canvas text; the contrast suite can't see it) | **FIXED** — label ink `#b04a5b` (5.02:1); curve/dot keep #bb5566 (clears the 3:1 graphical bar) |
| F3 | indep | fix | page `description` named only ZOH/bilinear/trapezoidal, now covers DeltaNet/Longhorn | **FIXED** — extended description |
| F5 | indep | info | `dateLabel` "8 minute read" stale after the new section | **FIXED** — "10 minute read" |
| F4 | indep | fix | `projects.json` said DeltaNet/SSM chapters "being written" but ch12 is live (200) | **FIXED** — dropped the cross-repo chapter snapshot, defer to the book site (CLAUDE.md SSOT) |
| F6 | indep | judgment | heading broke the page's "X is Y" register | **FIXED** (Brandon) — "Operator stability is the same dichotomy" |
| adv ×7 | codex+gemini | warn/sugg | **0 #52-specific defects** — every finding is a pattern inherited verbatim from the shipped `EigenSlider.astro` (getComputedStyle/frame, matchMedia, status-on-change, hardcoded IDs) or a refuted non-issue (SPA-unmount / `astro:page-load` — site is plain MPA, no View Transitions, grep-confirmed) | **DEFERRED → #55** (harden BOTH demos in a dedicated PR; Brandon's call) |

## Edits applied
All `FIXED` rows above — in `src/components/StabilityRegion.astro` (label ink token),
`src/pages/lab/why-discretization-matters.mdx` (half-boundary rewrite, nonzero-key,
description, read-time, heading, dropped "1–11" count + ch12 Sources link), and
`src/data/projects.json` (dropped the chapter-status snapshot). Re-verified: `npm run build`
clean, `npm run test:e2e` 44/44 (light + dark).

## Edits NOT applied (deferred)
The 5 adversarial hardening items (cache `getComputedStyle`; guard `matchMedia`; decouple
the visible status from the announcement; unique per-instance IDs; stronger red/blue pixel
probe) → tracked in **#55**, to be applied to BOTH `EigenSlider.astro` + `StabilityRegion.astro`
in a separate PR off `main` after #52 merges, with its own `independent-review` +
`/adversarial-review` gate.

## Open follow-ups
- **#55** — harden both canvas demos (the deferred adversarial items).
- Real-browser **visual layout** of the new canvas not eyeball-verified (headless renders the
  on-page canvas blank — matches EigenSlider; correctness established via structural parity +
  e2e non-blank `getImageData` + the behavioural UNSTABLE verdict assertion). Confirm on the
  deploy preview.

## Reference
Plan `~/.claude/plans/52-build-clever-feigenbaum.md`; adversarial run artifact (above);
ground truth `ssm-foundations/companions/ch12/jax/stability.py` (+ `tests/test_stability.py`,
pinned < 1e-12).
