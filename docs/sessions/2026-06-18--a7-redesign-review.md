# A7 redesign — independent review (2026-06-18)

Branch: `feat/site-redesign-a7`. Roadmap slot **A7** (visual identity / full editorial direction).

## Reviewers
Three fresh-context Claude auditors (visual/UX · accessibility/semantics · copy/consistency) + **Codex**
(gpt-5.5) on the rendered copy. Gemini CLI was unavailable (free-tier `IneligibleTierError`). Cold-read of
the rendered redesign (live preview + built HTML + screenshots), no author reasoning. Findings deduped +
prioritized P1/P2/P3; the user elected to apply **all three tiers**.

## Findings applied
- **P1** — softened the audit overclaim ("Every artifact…" → "Substantive artifacts… key claims trace to
  source"); fixed near-invisible **dark-mode cards** (`--color-surface` → `#232019` + stronger border);
  purged residual "student" framing + bare vanity counts from `projects.json` detail bodies
  ("Working through", "3,400+ sources", "17/28/21/135/12" counts); renamed cluster **Causal Methods →
  Causal Inference**; added hamburger `<summary>` `:focus-visible`; homepage chip "in‑progress" → "in progress".
- **P2** — dropped the duplicate-name hero eyebrow; fulcrum dividers 4→2; equal-height flag cards;
  full-width mobile CTAs; `/lab/research-graph/` visually-hidden `<h1>` + `Esc`-to-close; de-duped the
  Methodology link; expanded OOD on first use; sentence-case `<title>`.
- **P3** — lab back-links both link (cluster-page fallback); de-underlined footer links; cluster
  `<header>`→`<div>` (dup banner); tone slips ("real evals", "paper-shaped", "next-generation");
  "Menu" label visually-hidden. (Reported inline-code spacing was a text-strip artifact, not real.)

## Verified
Build green · Phase 0 + tokens **zero-diff** · canvas QA (graph 119 nodes/460 edges + `Esc`; EigenSlider
`--es-zoh` synced) · AA contrast (light ~4.9:1, dark ~8.9:1) · content-truth greps clean · cleanup done
(`/design-preview` + `/og-preview` removed, scratch screenshots removed, `og-image.png` ships, sitemap clean).

## Parked (deliberate, user calls)
Demo thumbnails · per-project OG rollout (samples shown) · `/research`-vs-`/notes` hub taxonomy.
