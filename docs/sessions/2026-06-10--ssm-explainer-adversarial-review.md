# Adversarial independent review — PR #10 (SSM explainer), refute-mode (2026-06-10)

**Driver**: Brandon requested an adversarial pass on staged PR #10 (branch
`lab-ssm-explainer`, `82c3ed7`) as input to his editorial read. Unlike the morning
verification-mode gate review ([`2026-06-10--ssm-explainer-review.md`](2026-06-10--ssm-explainer-review.md)),
reviewers were prompted to REFUTE — find reasons NOT to ship.

**Method**: 4 fresh-context `independent-reviewer` shards (hostile numerical analyst /
hostile ML researcher / hostile front-end+a11y engineer / hostile editor+process auditor),
cold-read, refute-mode. Objective findings adjudicated by the orchestrator with primary-
source evidence (ar5iv/arXiv fetches, dist inspection, computations); judgment findings
passed to Brandon RAW (decision: evidence-adjudication). Fix policy: **report-only** —
nothing applied, PR untouched, this log left uncommitted until Brandon picks fixes.

## Verdicts

| Shard | Verdict | Confirmed after adjudication |
|---|---|---|
| 1 — numerical analyst | ATTACKS-FOUND (7) | 5 confirmed · 1 refuted · 1 judgment |
| 2 — ML researcher | **SHIP-BLOCKERS-FOUND** (7) | 6 confirmed (1 blocker) · 1 judgment |
| 3 — front-end/a11y | ATTACKS-FOUND (9) | 6 objective confirmed · 3 judgment |
| 4 — editor + process | ATTACKS-FOUND (9) | 2 objective confirmed · 7 judgment (raw) |

## CONFIRMED — content (adjudicated against primary sources)

1. **BLOCKER — S4 did not use ZOH.** Essay: "S4 … answers with the zero-order hold …
   Ā = e^{AΔ}". S4 paper (arXiv 2111.00396 §2.3, fetched): "we follow prior work in
   using the **bilinear** method", Ā = (I−Δ/2·A)⁻¹(I+Δ/2·A); **ZOH is not mentioned
   anywhere in the paper** (ZOH is the Mamba-line default; Mamba-1 eq. 4). The stability
   beat's attribution inherits the error. *Upstream root: ssm-foundations ch08 states the
   same wrong claim publicly ("An S4 layer is the zero-order-hold discretization…").*
   Proposed essay fix: introduce ZOH as the modern/Mamba default and correct the history
   in one parenthetical that foreshadows bilinear's beat-4 entrance.
2. **Lax equivalence misapplied** (major): "the Lax equivalence framework" invoked for
   ODE discretization; Lax–Richtmyer is the PDE/finite-difference statement (the ODE
   analogue is Dahlquist's equivalence theorem). Fix: drop the name — "the equivalence
   theorems tying consistency and stability to convergence". *(Book ch04 §4.2 uses the
   Lax framing too — book-side scope note recommended.)*
3. **"Sitting exactly at the Dahlquist bound"** (major): the barrier is a constant-step
   LMM theorem; Mamba-3's rule is variable-step (per-token Δ). Fix: "…second order while
   keeping A-stability — exactly the ceiling Dahlquist's barrier sets in the classical
   constant-step theory."
4. **Van Loan misattribution** (major): the augmented-block-matrix identity is Van Loan
   1978 (IEEE TAC 23(3)); Al-Mohy & Higham 2011 is the modern φ-function computation.
   Fix: cite both in their proper roles. *(Book ch04 companion docstring shares the
   A-M&H-only attribution.)*
5. **Naming bridge missing** (minor, was major pre-adjudication): kicker says
   "generalized trapezoidal rule", caption says exponential-trapezoidal — the Mamba-3
   paper (fetched) uses BOTH ("generalized trapezoidal rule" inside the
   "Exponential-Trapezoidal (Mamba-3)" method), so both are faithful but the essay never
   connects them. Fix: one connective clause in the kicker.
6. **Complex state is independent, not "paired"** (minor): paper §3.2.2 shows the complex
   state composes with either discretization. Fix: "combines it with a second,
   independent upgrade".
7. **"Better numerics bought memory" over-attributes** (minor): paper attributes the
   half-state-size result holistically ("Together with architectural refinements…"), no
   per-contribution decomposition. Fix: system-level attribution, numerics as ingredient.
8. **Optional hedges** (minor): "A-stable" label applied to ZOH-as-exact-map (one-clause
   hedge: the label is earned trivially); modal argument's diagonalizability gloss
   (parenthetical); HiPPO eigenvalue claim vs S4's later parameterization fix ("is built
   to place"). Caption: name the reference solver (Radau, rtol 1e-11).

## CONFIRMED — implementation

9. **Canvas blurry on retina** (major): fixed 560×560 buffer, no devicePixelRatio
   scaling, CSS stretches to layout width. Fix: scale buffer by DPR in init.
10. **aria-live spam** (major): status `<output aria-live=polite>` updates on every
    `input` event (up to 149 announcements per drag). Fix: redraw on `input`, announce on
    `change` (or debounce).
11. **No `:focus-visible` on the range input** (minor) — site styles links only. 1-rule fix.
12. **`<figcaption><p>` margin** (nit): MDX wraps captions in `<p>`; dist confirms ×3;
    1-rule reset.
13. **Generic OG image** (minor): flagship page shares `/og-image.png`; 3-line fix
    (frontmatter `ogImage` + ProseArticle pass-through; eigenvalue figure is card-shaped).
14. **Not in RSS** (minor/decision): `rss.xml.js` sources projects only; dist/rss.xml has
    0 mentions. Conscious choice or gap — Brandon's call.
15. Nits: duplicate-ID unsafety if EigenSlider is ever used twice on a page; no-JS shows
    a dead slider (add a `<noscript>` note or static fallback); 149-keystroke traversal
    (judgment).

## REFUTED (attack does not stand)

- "Trapezoidal is the *unique* A-stable order-2 LMM, so 'smallest error constant' is
  vacuous" — wrong: multiple A-stable order-2 LMMs exist; minimizing the error constant
  is the actual content of the barrier's final clause (Dahlquist 1963; Hairer–Wanner II).
  Essay text stands.

## JUDGMENT — passed raw to Brandon (not adjudicated; counts verified)

- Em-dash density **29 per ~1,436 prose words (2.02/100w)** — at AI-tell levels; shard 4
  proposes rewriting 8–10 dash glosses (target ≤1.0).
- "X is not Y. It is Z." construction ×2–3 — keep one (the thesis), rewrite the rest.
- Stock phrases: "quietly steering" (subtitle), "load-bearing" ×2, "the drama starts".
- Heading parallelism breaks at the 4th section ("Per-token integrators").
- Hook promises three axes (stability/memory/accuracy); memory never gets a developed
  section — cut it from the list or add one bridging sentence.
- "For the numerics reader:" aside labels — possibly condescending; alt: "More precision:".
- First-person ("my … book") vs the homepage's impersonal register.
- CHANGELOG branch-reader hits a 404 on the "live" line — optional parenthetical
  "(staged; merges on sign-off)" vs the documented ship-at-merge convention.
- Subtitle/meta-description share 5 significant words; ZOH-grouped-with-Euler caption
  could note ZOH's error is forced-term-only.

## Cross-repo flags (recommend tracked issues, not part of PR #10)

- **ssm-foundations**: ch08 "S4 = ZOH" misattribution (live, contradicted by the S4
  paper); ch04 Lax-framing scope note; ch04 companion Al-Mohy/Van-Loan attribution.

## Coverage gaps (aggregated `not_reviewed`)

Dark-PNG visual content (one variant author-checked only); live-browser confirmation of
DPR blur and screen-reader behavior (mechanisms conclusive from source); S4D's exact
discretization (essay fix avoids relying on it); Dahlquist 1963 primary text (verified
via Hairer–Wanner); KaTeX font FCP impact.

## Status → remediated (same day)

Brandon picked: **confirmed + editorial picks** (em-dash density roughly halved,
≈2.0 → ≈1.0 per 100 words, one
"is not / It is" kept, stock phrases replaced, heading parallelism restored, memory-axis
bridge, "More precision:" labels, Radau named) · **keep first-person** · **add explainer
to RSS** · **file the ssm-foundations issue now** (book fix = own session).

**Applied** (commit on `lab-ssm-explainer`, post-dating this log's findings): all
confirmed content fixes (S4-bilinear blocker, Lax drop, Dahlquist-bound rephrase,
Van Loan attribution, exp-trap naming bridge, complex-state independence, system-level
payoff attribution, A-stable/diagonalizability/HiPPO hedges, captions) + implementation
fixes (DPR scaling, announce-on-change, focus-visible, scoped lookups, noscript,
figcaption margin, ogImage, RSS glob). **Deliberately NOT applied**: register change
(first-person kept), step granularity, CHANGELOG parenthetical (documented ship-at-merge
convention stands), no-JS static image (noscript note only), research-graph RSS entry.
Process improvement: adversarial mode codified in
`.claude/skills/independent-review/SKILL.md` §4b. Cross-repo: tracked ssm-foundations
issue filed for ch08 S4=ZOH + ch04 Lax framing + companion Van Loan attribution.
PR #10 remains **unmerged**, awaiting Brandon's editorial read.
