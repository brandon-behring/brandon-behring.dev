# Issue #29 — main-site polish — independent review (2026-06-22)

**Driver:** Ship [#29](https://github.com/brandon-behring/brandon-behring.dev/issues/29) (P3 main-site
polish) — the **inline-code chip** + **work cluster-page width** items (the dark-mode gold CTA was
pre-settled = *keep, intentional*). Ambient independent review before commit, per `.claude/CLAUDE.md`.

**Method:** Two cold-read `independent-reviewer` shards (intent withheld), fanned out in parallel on the
uncommitted branch `polish/issue-29-main-site`. Orchestrator consumed **verdicts only**.

- **diff/correctness** — the CSS diff (`tokens.css`, `Base.astro`, `work/[slug].astro`): AA contrast both
  schemes; `:not(pre) > code` regression; dark-scheme correctness after removing the `@media` override;
  `.cluster-page` scoping vs the global `.prose`; build.
- **drift** — `CURRENT_WORK.md` + `CHANGELOG.md` vs reality (per `docs/DOC-CONVENTIONS.md`): cross-repo
  snapshot rot; internal consistency (#29-done / #17-next); claim accuracy; links; dates.

## Findings

| # | Shard | Verdict | Finding | Disposition |
|---|---|---|---|---|
| 1 | diff | PASS | Light chip contrast `#1a1a1a` on `#f4f1ea` = **15.43:1** ✓ AA | — |
| 2 | diff | PASS | Dark chip contrast `#f1efe9` on `#2b2720` = **12.92:1** ✓ AA | — |
| 3 | diff | PASS | `:not(pre) > code` — no `<pre>`/fenced blocks in `src/`; a no-op today, defensive future guard | — |
| 4 | diff | PASS | Scheme flips via `prefers-color-scheme` only (no `data-theme`); old `rgba` override fully removed; dark tokens present | — |
| 5 | diff | PASS | `.cluster-page` scoped (no `is:global`); global `.prose` untouched; no child depended on `.prose` beyond width/centering | — |
| 6 | diff | PASS | Build green — `astro check` 0 errors, 17 pages | — |
| 7 | drift | **FAIL (blocker)** | CHANGELOG linked a session log that didn't exist yet | **Fixed** — this file created (the record step), link now resolves |
| 8 | drift | PASS | No cross-repo snapshot rot; #29 removed + #17 promoted + renumbered 1–4; one "Next pickup"; doc claims match the diff; contrast citations (~15 / ~13) accurate; dates correct | — |

Both reviewers independently computed identical contrast ratios — **no conflicts**.

## Edits applied (post-review)
- Created this session log → resolves finding #7 (the CHANGELOG `→ [session](…)` link resolves).

## Edits NOT applied
- None. The CSS shard passed clean; review produced no code changes.

## Not reviewed / accepted
- #29 still **OPEN** on GitHub at review time — expected (pre-merge; DOC-CONVENTIONS permits shipped-tense
  on a PR branch). Closed after merge.
- Live-deploy reflection — verified separately via Playwright: local preview measured the chip at 15.43:1
  light (bordered, both schemes via built CSS) and the work column 538 → **800px**; re-checked on prod
  post-deploy.

## Reference
- Branch `polish/issue-29-main-site`; files `src/styles/tokens.css`, `src/layouts/Base.astro`,
  `src/pages/work/[slug].astro`, `CURRENT_WORK.md`, `CHANGELOG.md`.
- Process-as-artifact: mirrors `docs/sessions/2026-05-25--projects-audit.md`.
