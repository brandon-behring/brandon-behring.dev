# Cross-Property Visual / Quality Recon — 2026-06-19

Audit of the portfolio + every connected book/guide for (a) working, (b) visual coherence, (c)
desktop/mobile/iPad rendering → improvement issues filed to the relevant repos. Process-as-artifact
record of the reasoning behind the 9 issues filed this session.

**Method (layered spiral):** research → recon → deeper research → evidence-grounded posture → issues.
Value-judgments (identity/priority/taste) were deliberately deferred until evidence was in hand.

**Coverage:** 214 screenshots, 20 page-sets, 8 properties × viewport matrix {390 / 768 / 820 / 1024 /
1280} × {light, dark}. Serial Playwright capture (computed tokens + WCAG contrast + console errors per
page) → 5 parallel fresh-context reviewers reading the static screenshots. Curated screenshots in
[`assets/2026-06-19-recon/`](./assets/2026-06-19-recon/).

---

## Headline

The ecosystem is **coherent — a 4/5 judgment** (7 of 9 properties share the spine; 2 outliers), not broken — a short list of concrete fixes, not a redesign. The
intended "anchored-but-independent" system is real: **ssm · dml · guides · dlai + claude-books'
sub-books** share a visibly systematic spine (#3B6FA0 italic-serif title, Roboto body, search+dark
cluster, shared footer); the main site is anchored to them via the accent. Two things break the spine,
and only one is worth fixing: the **claude-books hub landing** (off-brand) and **pinj** (Quarto — accept).

Three prior-audit findings corroborated **resolved** this session (scaffold#91 closure + live sample + curl — not a fresh axe re-audit): sidebar contrast 3.63:1; the
how-this-was-made dead links → 200; duplicate `<main>` → single `<main>` everywhere.

## Cross-property consistency matrix

| Property | Body font | Accent | Dark mode | Body contrast | Scaffold (declared) | Verdict |
|---|---|---|---|---|---|---|
| main site | serif (Fraunces/Georgia) | #3B6FA0 (CTA/links) | yes | ~15:1 ✅ | n/a | on-brand (editorial — intentional) |
| ssm | Roboto | **#3B6FA0 ✅** | yes+toggle | 5.36/6.55 ✅ | 4.23 | **core family** |
| dml | Roboto | **#3B6FA0 ✅** | yes+toggle | **3.86 light ⚠️** | scaffold | core family (2 defects) |
| guides | Roboto | **#3B6FA0 ✅** | yes+toggle | 16.98/14.06 ✅ | 4.25.1 | **core family** |
| dlai (local) | Roboto | **#3B6FA0 ✅** | yes+toggle | 16.98/14.06 ✅ | 4.25.0 | core family (1 build defect) |
| claude-books sub-books | Roboto | scaffold | yes | 16.98/14.06 ✅ | scaffold | on-scaffold ✅ |
| claude-books **HUB** | system-ui ⚠️ | **#5a4fcf purple ⚠️** | bg-only, no toggle | n/a | hand-rolled | **off-brand outlier** |
| pinj (Quarto) | Source Sans Pro | #2761E3 | none ⚠️ | 11.51 ✅ | Quarto | off-brand (tool) — accept |
| math-guides | BROKEN (500/TypeError) | — | — | — | 4.2 | **build failure** |

## Defect catalogue

**Broken / floor:** math-guides family doesn't build (`@fontsource-variable/roboto/index.css` on
scaffold 4.2) · dml code blocks overflow horizontally (page-scroll on 390) · dlai chapter route 404
(stale preview build; mid-rebuild). **A11y:** dml light body text 3.86:1 < 4.5 AA. **Visual:**
claude-books hub off-brand (system fonts + purple accent + no toggle — the series front door) · ssm
~55 raster figures don't theme-switch (white plate in dark; dml uses inline SVG). **Polish (main
site):** dark-mode CTA warm-gold (confirm `--color-accent-warm` intent) · inline-code chip · work-page
whitespace. **Accept:** pinj Quarto (tool difference, self-consistent); serif-site/sans-books split
(intentional); scaffold version drift (visually invisible).

---

## Posture decisions (Layers 1 + 3, evidence-backed)

1. **Identity → MEDIUM "anchored-but-independent":** thin shared identity + dense cross-linking, thick
   per-property presentation freedom. Bind identity tokens (wordmark/accent/favicon/OG) + bidirectional
   cross-links; never bind presentation; never lock-step redeploys across repos. *(Ehrenberg-Bass
   distinctive assets; Aaker branded-house; NN/g wayfinding. Exemplar: Josh Comeau ⇄ css-for-js.dev.)*
2. **claude-books → fold into the family** (member, not sub-brand): same author/scaffold/format/
   audience; folding is a deletion of bespoke code. Rule: sub-brand only if distinct-audience AND
   don't-want-equity-transfer AND budget-for-a-2nd-polished-system; else fold.
3. **Priority → Severity × Live-Prominence** (not floor-first vs first-impression — for a ~50ms
   thin-slicing hiring-manager audience they're the same axis). Live audience-facing beats pre-launch
   regardless of raw severity; scaffold fixes earn a dogfood multiplier. *(Lindgaard 50ms; Fogg
   prominence-interpretation; Ambady thin-slice; RICE.)*
4. **Figures → static-Tufte default; interactive demos a deliberate, criteria-gated FEATURE** (not
   "never" — the /lab demos are a strength). Demo gate (all four): manipulation IS the insight ·
   learner-facing · self-contained/no-backend/bounded (anti-Distill) · reusable concept. Unify figure
   grammar via the scaffold's existing inline-SVG + `--diagram-*` theming + Okabe-Ito `--series-*` tokens.

### Prioritized work-order
1. dml body contrast 3.86→≥4.5 (live, AA, ~free) · 2. dml mobile code overflow · 3. claude-books hub
fold-in (front door) · 4. main-site polish · 5. math-guides scaffold build (promote iff in scaffold) ·
6. dlai 404 (pre-launch) · 7. ssm figures theme-switch.

## Issues filed (all `tracked` → Work Tracker #1)
- dml [#46](https://github.com/brandon-behring/double_ml_time_series/issues/46) `P1`
- claude-books [#27](https://github.com/brandon-behring/claude-books/issues/27) `P2`
- book-scaffold-astro [#161](https://github.com/brandon-behring/book-scaffold-astro/issues/161) `P1` (dogfood keystone)
- ssm-foundations [#48](https://github.com/brandon-behring/ssm-foundations/issues/48) `P2`
- mathematical-guides [#1](https://github.com/brandon-behring/mathematical-guides/issues/1) `P2`
- dlai-study-notes [#1](https://github.com/brandon-behring/dlai-study-notes/issues/1) `P2`
- brandon-behring.dev [#29](https://github.com/brandon-behring/brandon-behring.dev/issues/29) `P3` (polish) ·
  [#30](https://github.com/brandon-behring/brandon-behring.dev/issues/30) `P2` (identity spine) ·
  [#31](https://github.com/brandon-behring/brandon-behring.dev/issues/31) `P3` (demos)

## Recon caveats
Findings measured on live/sampled state 2026-06-19; mid-flight repos (dlai especially) noted in their
issues. claude-books hub accent read as #5a4fcf (source) / #0000EE (an earlier capture) — off-brand
either way. ssm figure count is ~55 corpus-wide (recon sampled 3 on one chapter). The **Scaffold (declared)**
column is the `package.json` range read at recon time (e.g. `^4.23.0` shown as 4.23), **not** the
lockfile-resolved version — resolved versions were not pinned this session and differ for some repos
(guides/dlai lockfiles resolve lower).
