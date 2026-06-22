# CURRENT_WORK.md — 30-Second Context Switch

**Last Updated**: 2026-06-22 | **Session**: organize & refine remaining tasks (post scaffold-v4.25.3)

---

## Right Now

**Nothing active on the site** — it's live and current. Recommended next pickup is
[#29](https://github.com/brandon-behring/brandon-behring.dev/issues/29) (main-site polish); see
the refined forward sequence under **Next**. (The scaffold **v4.25.3** thread shipped + closed —
its review logs are this session's `docs/sessions/2026-06-21/06-22` files.)

**Last shipped** (2026-06-19): the **lab citation-graph accessibility trilogy** —
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

1. [#29](https://github.com/brandon-behring/brandon-behring.dev/issues/29) — main-site polish
   (CTA intent · inline-code chips · work-page gutter). Front door + thread root. **Next pickup.**
2. [#17](https://github.com/brandon-behring/brandon-behring.dev/issues/17) — link
   guides.brandon-behring.dev from the portfolio (the bb.dev half; the path-proxy half is infra → board).
3. [#30](https://github.com/brandon-behring/brandon-behring.dev/issues/30) — identity spine:
   **(a)** cross-links / orphan-rescue first (independent, highest-value), then **(b)** shared
   wordmark/favicon/OG after #33. *(verify ssm `favicon.svg` 404 at pickup.)*
4. [#33](https://github.com/brandon-behring/brandon-behring.dev/issues/33) — style SSOT:
   single-source the Warm-Tol palette + share `--fig-*` (site → scaffold → books); foundational for #30b.
5. [#36](https://github.com/brandon-behring/brandon-behring.dev/issues/36) — reusable Playwright
   eval harness · [#2](https://github.com/brandon-behring/brandon-behring.dev/issues/2) — portfolio hygiene (batch).

*Brandon-driven / cross-repo:* [#32](https://github.com/brandon-behring/brandon-behring.dev/issues/32)
DLAI launch (P2; on the v4.26 + wave1 branches) ·
[#31](https://github.com/brandon-behring/brandon-behring.dev/issues/31) inline demos in guides.
*Parked:* [#5](https://github.com/brandon-behring/brandon-behring.dev/issues/5) account-split decision
(roadmap Open-decision #3) · [#1](https://github.com/brandon-behring/brandon-behring.dev/issues/1)
synthesis-map (blocked on `synthesis-kb` scaffold).

**Standing** (separate from the issue backlog, from [`docs/roadmap.md`](docs/roadmap.md)): the
**SSM visualizer** (gated → 2026-07-01 dated check) and the `/research`-vs-`/notes` hub-structure
decision (roadmap Open decision #1). Live cross-repo backlog → the [board](https://github.com/users/brandon-behring/projects/1).

**Note**: [#13](https://github.com/brandon-behring/brandon-behring.dev/issues/13)
(board cron reconciler) — **closed 2026-06-20**: the cross-repo health audit verified the
reconciler invariant (live detail → the audit session log).
