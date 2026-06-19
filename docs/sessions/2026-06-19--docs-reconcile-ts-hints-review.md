# Independent review — docs reconciliation + TS/Astro hint cleanup

**Date:** 2026-06-19
**Driver:** Loose-ends housekeeping after the citation-graph a11y trilogy (#22/#23/#25) + A7 shipped:
**(A)** clear two pre-existing editor hints renumbered by the #25 diff (cytoscape-fcose TS7016; the JSON
data-island `is:inline` notice); **(B)** reconcile the three context docs (`CHANGELOG.md`,
`CURRENT_WORK.md`, `docs/roadmap.md`) that still described the site as pre-A7. Decisions taken via
`/exploring-options`: ambient `src/env.d.ts` (no dep) · one combined PR · roadmap A7 → `[x]` (scope
noted) · #13 flag-only. Branch `chore/ts-hints-and-docs-reconcile`.

## Method

Verification-mode `independent-review`: 2 fresh-context shards, cold-read, checklists only. **Shard A =
docs-drift** (docs vs `projects.json` + live `gh issue list` + the point-don't-copy convention). **Shard
B = diff-correctness** (`env.d.ts` + `is:inline` + CHANGELOG link/date integrity). Reviewer reasoning
consumed as verdicts only. Build confirmed green; data-island + processed client bundle confirmed intact
in `dist/` after `is:inline`.

## Findings

| # | Shard | Item | Verdict | Resolution |
|---|---|---|---|---|
| 1 | drift | A7/#22/#23/#25 + A6/`/lab` "shipped" claims accurate (PRs merged, issues closed) | PASS | cross-checked `git log` + `gh` |
| 2 | drift | no NEW cross-repo snapshot introduced (point-don't-copy) | PASS | only this repo's own #13/#22/#23/#25 referenced |
| 3 | drift | `CURRENT_WORK.md` current; #13 "OK to close" is advisory, not a false closure claim | PASS | #13 still OPEN; phrasing safe |
| 4 | drift | **roadmap Open Decision #1 body still cited "Next-1-3 #1 (`/lab/` index)"** — removed by the rewrite | **DRIFT** | **fixed** — body now reads `/lab/` shipped in A7, points to Next-1–3 #2 |
| 5 | diff | `src/env.d.ts` valid; silences TS7016; `.astro/types.d.ts` ref path correct; build-neutral (type-only) | PASS | — |
| 6 | diff | `is:inline` only on the data island; the imports `<script>` stays processed/bundled | PASS | confirmed 1× `is:inline`; `dist/` bundle ref intact |
| 7 | diff | **CHANGELOG dated #22/#23 `2026-06-19`; merge commits + session files are `2026-06-18`** (EDT 20:27 / 21:09) | **DRIFT** | **fixed** — #22/#23 → `2026-06-18` (#25 stays 06-19; order unchanged) |
| 8 | both | all 4 new CHANGELOG session-log links resolve; markdown well-formed | PASS | files exist on disk |
| — | drift (self-caught) | **Open Decision #2 cited "Next-1-3 #3"** for the visualizer, which the rewrite moved to #1 | **DRIFT** | **fixed** — → "Next-1–3 #1" |

## Edits applied (post-review)

- CHANGELOG `#22`/`#23` dates `2026-06-19` → `2026-06-18` (match merge commits + session filenames;
  newest-first order preserved: #25 06-19 → #23/#22/A7 06-18).
- roadmap Open Decision #1 body — dropped the stale `Next-1-3 #1 (/lab index)` reference; now states the
  `/lab/` index shipped in A7 and points to the live Next-1–3 #2 (hub taxonomy).
- roadmap Open Decision #2 — `see Next-1-3 #3` → `#1` (visualizer moved #3→#1 in the rewrite).

## Edits NOT applied

- Renaming the #22/#23 session-log files to 06-19 (the reviewer's alternative) — the files are correctly
  dated 06-18 (authored + merged that local day); fixing the CHANGELOG dates is the right direction.
- Live HTTP/Playwright re-verification of the graph — the client bundle is byte-identical to the #25
  build (already prod-verified); `is:inline` is behavior-neutral, `env.d.ts` build-neutral. Build green +
  `dist/` data-island intact suffices.

## Open follow-ups

- **#13** (board cron reconciler) — observation window elapsed; OK to close (flagged in CURRENT_WORK, not
  done here — separate board action).

## Reference

- Scope: TS/Astro hint cleanup (`src/env.d.ts`, `CitationGraph.astro` `is:inline`) + docs reconcile
  (`CHANGELOG.md`, `CURRENT_WORK.md`, `docs/roadmap.md`). Conventions: `docs/DOC-CONVENTIONS.md`.
