# Session 2026-06-10 — SSM explainer: "Why discretization matters"

> Dated session log (rot-allowed). Live state: [board #1](https://github.com/users/brandon-behring/projects/1).
> Plan: `~/.claude/plans/do-an-audit-of-quirky-fiddle.md` (overwritten from the shipped
> audit plan). Scope settled via /exploring-options — 9 questions, after Brandon rejected
> a 2-question plan and invoked the full exploration.

## Why

Post-audit (see [`2026-06-09--audit-densify-node24.md`](2026-06-09--audit-densify-node24.md)),
Brandon picked roadmap Next-1-3 #2: the SSM explainer — the flagship-demo-shaped artifact
whose framing was locked 2026-05-28 ("explainer first; visualizer style deferred until the
explainer ships and reception is observable").

## Decisions (Brandon, 2026-06-10, via AskUserQuestion + /exploring-options)

| # | Decision | Choice |
|---|---|---|
| 0a | Math rendering | KaTeX build-time (remark-math + rehype-katex; MDX; zero client JS) |
| 0b | Interactivity | 3 figures + one Δ-slider (vanilla-JS canvas; NOT the deferred visualizer) |
| 1 | Title + slug | "Why discretization matters", `/lab/why-discretization-matters/`; SSM signal in subtitle |
| 2 | Lead | Mamba-3 news hook; Euler-failure demo as beat three |
| 3 | Audience | Numerics-naive ML practitioner + 2 collapsible numerics asides |
| 4 | Length | ~1,500–1,900 words (Distill-style short essay) |
| 5 | Slider | ZOH e^{λΔ} vs forward-Euler 1+λΔ only — one stability contrast |
| 6 | Figures | **Regenerate light + dark variants** (Brandon overrode the copy-as-is recommendation) |
| 7 | Links | Inline deep links + "Sources & going deeper" end box; primary-source verification |
| 8 | Discovery | projects.json `external_context` + homepage Live-now pill (no /lab nav — hub decision stays deferred) |
| 9 | Ship | One PR, fully staged, **paused for Brandon's editorial read before merge** |

## Claim verification (pre-flight)

- **Mamba-3 primary source** (arXiv [2603.15569](https://arxiv.org/abs/2603.15569) +
  [OpenReview](https://openreview.net/forum?id=HwCvaJOiCj)): authors are
  **Lahoti, Li, Chen, Wang, Bick, Kolter, Dao, Gu** — the planned "Gu & Dao" attribution
  was wrong (they're senior authors; Lahoti et al. is correct) and the planned
  "ICLR 2026 **Oral**" claim could not be confirmed from the primary source → the page
  says "ICLR 2026" only. The paper's own term is "**trapezoidal discretization** /
  Generalized Trapezoidal Rule" (the book's ch. 10 develops it as exponential-trapezoidal;
  prose follows the paper, links the book).
- **ssm-foundations deep links**: chapters 4/5/7/8/9/10 + section anchors
  (`#43-zero-order-hold-zoh` etc.) all curl-verified 200 on the live book.
- Dahlquist barrier stated precisely (A-stable **linear multistep** ⇒ order ≤ 2;
  explicit methods can't be A-stable at all) — the loose "no explicit RK is A-stable
  above order 2" phrasing from exploration notes was corrected.

## Build record

- `astro.config.mjs`: added the **missing `mdx()` integration** (package dep existed,
  integration was never registered) + `remark-math`/`rehype-katex` markdown pipeline.
- `src/layouts/ProseArticle.astro` (new): MDX-frontmatter → `Base` props; `.prose`
  article column; KaTeX CSS; figure/details/sources styling via `:global()`.
- `src/pages/lab/why-discretization-matters.mdx` (new): ~1,600 words, five beats
  (Mamba-3 hook → SSM=ODE → stability geometry → accuracy ladder → per-token
  integrators), 2 numerics asides (Dahlquist; augmented exponential), inline deep links,
  sources box.
- `src/components/EigenSlider.astro` (new, no deps): canvas, 6 LHP modes
  (4 real + 1 oscillatory pair), Δ ∈ [0.01, 1.5]; ZOH stays in-disk ∀Δ, Euler escapes
  (2/6 diverge at default Δ=0.4 → 4/6 at Δ=1.5). Keyboard range input, `aria-live`
  status, dark-mode palette via CSS vars, scope-fenced to two methods.
- **Figures regenerated light + dark** (decision 6): companion scripts copied to
  `/tmp/ssm-figs` (ssm-foundations repo untouched), run on its `.venv` with palette
  monkey-patching (dark = site `#1a1a1a` bg + Tol-light colors) → 6 PNGs under
  `public/figures/ssm-explainer/`, served via `<picture media="(prefers-color-scheme: dark)">`.
  The regeneration run reproduced the captions' empirical slopes (ZOH 1.00,
  bilinear 2.00, exp-trap 2.00).
- Integration: `projects.json` ssm-foundations entry gains the explainer
  `external_context` link (renders on `/work/future/`); homepage **Live now** pill added
  beside the book's pill (the established surface for live artifacts — chosen over a
  prose sentence in About).

## Verification (local, pre-PR)

- Build green; `/lab/why-discretization-matters/` emits 54 KaTeX spans, **zero** raw
  `$$`, KaTeX CSS + 19 woff2 fonts bundled.
- Playwright on preview: full-page render checked; slider interaction verified
  (Δ 0.40 → "2 of 6 modes diverge", Δ 1.50 → "4 of 6" — matches the analytic
  thresholds); `/work/future/` shows the explainer link; homepage pill present.
- Board hygiene rode along: 8 concurrently-filed `tracked` eval-toolkit issues
  (#96–#103) re-boarded; invariant diff empty. (Fourth manual reconciliation —
  bb.dev#8's UI auto-add click remains the durable fix.)

## Ship state

Per decision 9 this PR is **deliberately not merged in-session**: it stages fully
verified and waits for Brandon's editorial read of the prose. CHANGELOG carries the
line dated 2026-06-10 under ship-at-merge semantics.

## Follow-ups

- Visualizer style (stability-region vs symplectic) — roadmap Open decision #2,
  re-trigger once explainer reception is observable.
- `/lab` hub-structure decision re-triggers at 2+ entries beyond research-graph
  (explainer is the 1st beyond — not yet).
- OG image for the explainer (generic site image used) — fold into the
  per-project OG-images batch (`ASSETS-NEEDED.md`).
