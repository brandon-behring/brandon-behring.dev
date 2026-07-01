# CURRENT_WORK.md — 30-Second Context Switch

**Last Updated**: 2026-07-01 | **Session**: constellation audit (hub + upstream + downstream)

---

## Right Now

**Constellation audit complete (2026-07-01, 🟡 operationally green / paper-trail drift — fixed in this PR).**
Deep-adversarial audit of the hub + `deploy-workflows` + `book-scaffold-astro` + all 9 live surfaces +
board #1 + the second account: every deploy green on `@v2.0.2`, 14/14 live URLs 200, e2e **46/46**,
property-recon **0 regressions / 16 contrast improvements** since 06-22, board invariant exact (96=96),
analytics beacon browser-verified fleet-wide, both 2026 citations verified (ICLR Oral). Headline findings:
**`rl-and-control-guide.brandon-behring.dev` is live but the hub still said "Local-only"** (surfacing →
[#59](https://github.com/brandon-behring/brandon-behring.dev/issues/59)), **scaffold sidebar CLS 0.274**
(RUM-confirmed, mechanics located → scaffold#187), and **research-kb's second-account copy is actively
re-diverging** (sweep order → #5 comment). 10 issues filed (#59–#63 here · scaffold#187/#188 ·
deploy-workflows#5 · ssm#50 · rl#6) + 4 enriched (deploy-workflows#4, #5, dml#46, #30). Doc drift
fixed here (this file, CHANGELOG, decision-map, .gitignore). Detail →
[`docs/sessions/2026-07-01--constellation-audit.md`](docs/sessions/2026-07-01--constellation-audit.md).

**Before it — dlai / study-notes LAUNCHED (2026-06-24, #32).** The DeepLearning.AI study-notes corpus is **live** at
[`study-notes.brandon-behring.dev`](https://study-notes.brandon-behring.dev) — launched on Cloudflare
Workers Builds, then **migrated same day to GitHub Actions** (`deploy-workflows@v2.0.2`, worker renamed
`brandon-behring-study-notes`; [deploy-workflows#4](https://github.com/brandon-behring/deploy-workflows/issues/4)
Phase 1a), custom domain bound, deep routes 200 → closed `dlai-study-notes#1`. Scaffold
`@brandon_m_behring/book-scaffold-astro@4.26.0` published to npm (OIDC) en route; dlai bumped `^4.26.0` (PR #2).
PR #58 (merged 2026-06-24, `d6d9eeb`) surfaced it on bb.dev: a **4th homepage flagship** + a
`/work/books-and-guides/` corpus member. Before it (2026-06-23):

**Long-term-plan audit complete (2026-06-23, 🟢).** The site + in-repo docs verify TRUE end-to-end
(routes, demos, GitHub, cross-repo, claim-safety all clean; the sibling books *exceed* their
snapshots). One real fix: the documented identity had drifted from the live hero → **ratified**
*"Applied-math rigor for auditable AI"* (roadmap A1 + decision-map; no site change). The earlier
"bb.dev-code backlog exhausted / await direction" is superseded by a **forward program** — see
**Next**. Audit detail →
[`docs/sessions/2026-06-23--longterm-plan-audit.md`](docs/sessions/2026-06-23--longterm-plan-audit.md).

**Last shipped** (2026-06-23): **[#36](https://github.com/brandon-behring/brandon-behring.dev/issues/36)
closed** — the cross-property recon harness shipped in **lever** (`scripts/property_recon.py`): the
capture engine + a run-over-run **diff** (CI-gateable on regressions) + 4-round-review hardening (61 tests
+ [audit doc](https://github.com/brandon-behring/lever_of_archimedes/blob/master/docs/audits/property-recon-deep-review-2026-06-23.md));
completes the capture→diff arc the bb.dev pilot proved out. Before it (2026-06-22):
**[#2](https://github.com/brandon-behring/brandon-behring.dev/issues/2)
portfolio hygiene — repo-metadata batch** — cross-repo GitHub settings via `gh repo edit` (no site change):
homepage URLs on the live-site repos (ssm-foundations, dml, claude-books, brandon-behring.dev) + fixed
guides-ai-engineering's wrong preview URL; topics on 11 portfolio repos (was 0); filled claude-books'
description + a claim-safety fix on dlai-study-notes (dropped a non-resolving "live" URL). **#2 stays open**
for CITATION.cff + OG + remaining-repo topics. Before it (2026-06-22):
**[#36](https://github.com/brandon-behring/brandon-behring.dev/issues/36)
pilot — Playwright verify-suite** — the repo's first automated tests (`@playwright/test`, chromium
light+dark, 42 passing): smoke (every route 200 + console/response-clean + render; routes mirror
`portfolio.ts`'s `visibleClusters`, read from `clusters.json`+`projects.json`), the two interactive
demos (Cytoscape model via a `window.__cyGraph` seam — blank
headless canvas, intact model — + EigenSlider canvas non-blank), WCAG contrast (hand-rolled ratio
helper, AA both schemes); wired to CI (`test.yml`, on PRs). Regression safety + proves the capture for
the cross-property lever harness (**#36 step 2** — shipped 2026-06-23; #36 closed). Before it (2026-06-22):
**[#33](https://github.com/brandon-behring/brandon-behring.dev/issues/33)
token SSOT (bb.dev doc/decision slice)** — documented the design-token source-of-truth: the canonical
Warm-Tol palette lives in the LaTeX `.sty`; this standalone site keeps *controlled duplication* of the one
shared hue (`#3B6FA0`) with per-property freedom otherwise. New [`docs/design-tokens.md`](docs/design-tokens.md)
(provenance + cross-property map + accent hand-sync registry + the deferred shared-package path), a
decision-map resolved entry, `--radius-sm` documented as an intentional divergence, and the dead
`--text-*`/`--space-*` scaffolding pruned (zero visual diff). The cross-repo shared-tokens package stays
**deferred** (premature for one hue + a solo maintainer; Rule of Three); **#33 stays open** for it. Before
it (2026-06-22): **[#30(a)](https://github.com/brandon-behring/brandon-behring.dev/issues/30)
identity spine (bb.dev slice)** — `/work/books-and-guides/` now opens with a scannable **"full corpus"**
index of the 5 live book/guide properties (incl. ssm-foundations & dml, which live in other clusters —
each tagged with its home cluster and reciprocally back-linked), and the hub's one-way nav gaps close
(`/publications/`, `/work/`, `/lab/`, and the discretization explainer now link into the research/lab
spine). No new route (per `:493`); **#30 stays open** for (b) shared wordmark/favicon/OG (blocked on
#33) + the scaffold-side book→hub affordance. Before it (2026-06-22):
**[#17](https://github.com/brandon-behring/brandon-behring.dev/issues/17) guides surfaced (bb.dev half)** —
a home About-section CTA links the live guides hub (`guides.brandon-behring.dev`), a "secondary CTA" per
`decision-map:398` (nav item / flagship / `/guides` route ruled out). Before it (2026-06-22):
**[#29](https://github.com/brandon-behring/brandon-behring.dev/issues/29)
main-site polish** — inline-code chips → a defined token-based warm chip (bordered, scheme-correct via
`--color-code-*`; AA-verified both schemes, ~15:1 / ~13:1; drops the hardcoded rgba dark hack) + work
cluster detail pages widened from the 65ch reading column to an ~800px content column (new
`--max-width-content`); dark-mode gold CTA confirmed **intentional** (kept). Before it (2026-06-22): the
**`/research` hub** (a research-threads lens; resolves A2) + a **roadmap refactor** into a strategic layer
+ **2 strategic decisions resolved** (hub → /research · account split → consolidate onto `brandon-behring`)
+ SSM-viz **deferred** to a 2026-07-01 dated check. Before it (2026-06-19): the **lab
citation-graph accessibility trilogy** —
[#22](https://github.com/brandon-behring/brandon-behring.dev/issues/22) (dark-mode
contrast), [#23](https://github.com/brandon-behring/brandon-behring.dev/issues/23)
(on-demand edge connectivity), and
[#25](https://github.com/brandon-behring/brandon-behring.dev/issues/25) (keyboard node
selection via search-box Enter) — all merged, deployed, and prod-verified. Before it
(2026-06-18): the **A7 editorial redesign** (new hero/narrative, self-hosted Fraunces +
design tokens, `/lab/` demos-gallery index, A6 content-collections, 7-item nav). Detail
→ [`CHANGELOG.md`](CHANGELOG.md) → session logs.

Also 2026-06-19: a **TypeScript foundation** — the repo's first `tsconfig.json` (strict)
with `astro check` folded into the build, so type errors now fail CI. Enables type-safe
interactive demos; bundled with the docs reconciliation in
[PR #28](https://github.com/brandon-behring/brandon-behring.dev/pull/28).

**Next** — refined 2026-06-22 (forward sequence, lens = *quick-wins → identity*; per-item
rationale lives in the organize-pass comment on each issue):

**Forward program (defined 2026-06-23 audit + review):**

1. [#52](https://github.com/brandon-behring/brandon-behring.dev/issues/52) — **SSM stability-region
   visualizer ✅ DONE (2026-06-23)**: shipped in PR #56 (`d2f4d96`, `StabilityRegion.astro`, embedded in
   the discretization explainer; #52 closed), hardened with the other canvas demos in #57, e2e specs
   added (46-spec suite). Resolves the deferred SSM-viz decision — the 2026-07-01 dated check is moot
   (shipped early).
2. [#32](https://github.com/brandon-behring/brandon-behring.dev/issues/32) — **dlai / study-notes
   launch ✅ DONE (2026-06-24)**: live at `study-notes.brandon-behring.dev` (GitHub Actions `@v2.0.2`,
   worker `brandon-behring-study-notes` — launched on Workers Builds, migrated same day); scaffold
   `4.26.0` published; hub surfacing (4th flagship + corpus) shipped in PR #58; `dlai-study-notes#1` closed.
3. *Identity:* **ratified** *"Applied-math rigor for auditable AI"* (docs updated; hero already shipped).

Other tracked items (cross-repo, blocked, or Brandon-driven):

- [#2](https://github.com/brandon-behring/brandon-behring.dev/issues/2) — portfolio hygiene: **metadata
   batch shipped** 2026-06-22; **stays open** for CITATION.cff (research-kb + academic repos) + OG images
   (dml/ssm) + remaining-repo topics — per-repo file work (leaves bb.dev).
- [#30](https://github.com/brandon-behring/brandon-behring.dev/issues/30) — identity spine **(b)**: shared
   wordmark / glyph favicon / OG — **blocked** on the cross-repo token package + book-scaffold-astro#164 +
   the handbook index flip. *(ssm `favicon.svg` confirmed still 404 at the 2026-07-01 audit —
   per-repo quick fixes split out to ssm-foundations + rl_and_control issues so they stop waiting
   on this blocked issue.)* **(a)** shipped 2026-06-22.

*Brandon-driven / cross-repo:*
[#31](https://github.com/brandon-behring/brandon-behring.dev/issues/31) inline demos in guides.
*Board / parked:* [#5](https://github.com/brandon-behring/brandon-behring.dev/issues/5) account-split —
**direction decided 2026-06-22** (consolidate onto brandon-behring); remaining = dev-account dupe sweep
(full divergence table + sweep order → the 2026-07-01 audit comment on #5) ·
[#1](https://github.com/brandon-behring/brandon-behring.dev/issues/1) synthesis-map (blocked on `synthesis-kb` scaffold).

**Resolved 2026-06-22** (→ [`docs/roadmap.md`](docs/roadmap.md) "Resolved decisions"): hub structure →
**a thin `/research` hub** (live; resolves A2) · account split → **consolidate onto `brandon-behring`**
(temporalcv done; dev-account dupe sweep = board #5). SSM-viz **decided 2026-06-23**: build it (stability-region) → [#52](https://github.com/brandon-behring/brandon-behring.dev/issues/52).
Token SSOT (#33) → **canonical = the LaTeX `.sty`**; this site keeps controlled duplication of the one
shared hue, cross-repo shared-tokens package **deferred** (tracked in #33) → [`docs/design-tokens.md`](docs/design-tokens.md).

**Standing** (from [`docs/roadmap.md`](docs/roadmap.md)): the **A4 graph-refresh loop** — re-verify
`/lab/research-graph/` after each corpus update. Live cross-repo backlog → the [board](https://github.com/users/brandon-behring/projects/1).

**Note**: [#13](https://github.com/brandon-behring/brandon-behring.dev/issues/13)
(board cron reconciler) — **closed 2026-06-20**: the cross-repo health audit verified the
reconciler invariant (live detail → the audit session log).
