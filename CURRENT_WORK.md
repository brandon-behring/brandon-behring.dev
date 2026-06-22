# CURRENT_WORK.md — 30-Second Context Switch

**Last Updated**: 2026-06-22 | **Session**: #33 token SSOT — document + decide (bb.dev slice)

---

## Right Now

**Nothing active on the site** — it's live and current. Recommended next pickup:
[#36](https://github.com/brandon-behring/brandon-behring.dev/issues/36) (reusable Playwright eval harness)
or [#2](https://github.com/brandon-behring/brandon-behring.dev/issues/2) (portfolio hygiene) — both bb.dev-only
(#30(b) is blocked on cross-repo deps); see the forward sequence under **Next**.

**Last shipped** (2026-06-22): **[#33](https://github.com/brandon-behring/brandon-behring.dev/issues/33)
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

1. [#36](https://github.com/brandon-behring/brandon-behring.dev/issues/36) — reusable Playwright
   eval harness (bb.dev-only). **Next pickup.**
2. [#2](https://github.com/brandon-behring/brandon-behring.dev/issues/2) — portfolio hygiene (batch; bb.dev-only).
3. [#30](https://github.com/brandon-behring/brandon-behring.dev/issues/30) — identity spine **(b)**: shared
   wordmark / glyph favicon / OG — **blocked** on the cross-repo token package + book-scaffold-astro#164 +
   the handbook index flip; revisit when those land. *(verify ssm `favicon.svg` 404 at pickup.)* **(a)** shipped 2026-06-22.

*Brandon-driven / cross-repo:* [#32](https://github.com/brandon-behring/brandon-behring.dev/issues/32)
DLAI launch (P2; on the v4.26 + wave1 branches) ·
[#31](https://github.com/brandon-behring/brandon-behring.dev/issues/31) inline demos in guides.
*Board / parked:* [#5](https://github.com/brandon-behring/brandon-behring.dev/issues/5) account-split —
**direction decided 2026-06-22** (consolidate onto brandon-behring); remaining = dev-account dupe sweep (board) ·
[#1](https://github.com/brandon-behring/brandon-behring.dev/issues/1) synthesis-map (blocked on `synthesis-kb` scaffold).

**Resolved 2026-06-22** (→ [`docs/roadmap.md`](docs/roadmap.md) "Resolved decisions"): hub structure →
**a thin `/research` hub** (live; resolves A2) · account split → **consolidate onto `brandon-behring`**
(temporalcv done; dev-account dupe sweep = board #5). SSM-viz **deferred** to a 2026-07-01 dated check.
Token SSOT (#33) → **canonical = the LaTeX `.sty`**; this site keeps controlled duplication of the one
shared hue, cross-repo shared-tokens package **deferred** (tracked in #33) → [`docs/design-tokens.md`](docs/design-tokens.md).

**Standing** (from [`docs/roadmap.md`](docs/roadmap.md)): the **SSM visualizer** (→ 2026-07-01 dated
check; explainer not distributed). Live cross-repo backlog → the [board](https://github.com/users/brandon-behring/projects/1).

**Note**: [#13](https://github.com/brandon-behring/brandon-behring.dev/issues/13)
(board cron reconciler) — **closed 2026-06-20**: the cross-repo health audit verified the
reconciler invariant (live detail → the audit session log).
