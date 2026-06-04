# Doc conventions (brandon-behring.dev)

How documentation works in this repo, and why. The goal: **nothing that loads as
session context should carry a fact that rots.** (This is the failure mode named in
`lever_of_archimedes/.../PROMPT_TO_CONTEXT_PARADIGM.md`: *Context Confusion — multiple /
contradictory sources → inconsistent behaviour.*)

## The trio (what the rest of the portfolio already runs)

A survey of ~32 repos in this portfolio found a 3-file convention at three granularities:

| File | Granularity | Holds |
|---|---|---|
| [`CURRENT_WORK.md`](../CURRENT_WORK.md) (root) | session | "Right now" 30-second resume + next step |
| [`docs/roadmap.md`](roadmap.md) | phase-arc | the **site's** forward plan |
| [`CHANGELOG.md`](../CHANGELOG.md) (root) | release | shipped history, newest-first → session logs |

Detail lives in dated [`docs/sessions/`](sessions/) logs; `CHANGELOG.md` only **indexes**
them (one line each, no copied detail).

## This repo is a HUB, not a project

Most repos in the portfolio are *projects* — one codebase advancing through phases.
`brandon-behring.dev` is the portfolio **hub**: its job is to point at sibling repos. So:

- **Cross-repo coordination does NOT live here.** Versions, release status, open-issue
  numbers, infra-migration tracks, the tiered backlog → the
  [Work Tracker board #1](https://github.com/users/brandon-behring/projects/1) (the
  canonical cross-repo roadmap) + each repo's own files & live issues.
- `docs/roadmap.md` plans only the **site itself** (identity/content, site Next-1-3).

## The one rule: point, don't copy

Don't snapshot another repo's state here — it rots the moment it's copied, and this
repo's docs load as agent context. Write a **pointer** to the live source, never a copy:

| Question | Single source of truth |
|---|---|
| What's active right now? | `CURRENT_WORK.md` |
| Live cross-repo status / backlog? | Work Tracker board #1 |
| A repo's version / open issues? | that repo + its live issues |
| What shipped, when? | `CHANGELOG.md` → `docs/sessions/` |
| The site's forward plan? | `docs/roadmap.md` |
| Identity / strategy? | `docs/website-decision-map.md` |
| What the site renders? | `src/data/projects.json` (curated snapshot, **not** a live mirror) |

**Enforcement:** the `independent-review` skill's *drift* shard flags any context doc that
asserts a stale cross-repo fact instead of pointing to its source.

> Naming/location is inconsistent across the wider portfolio (root vs `docs/`;
> `CHANGELOG.md` vs `docs/changelog.md`; `CURRENT_WORK` vs `CURRENT_STATUS`). This repo
> uses root `CURRENT_WORK.md` + `CHANGELOG.md` (GitHub-standard) + `docs/roadmap.md`.
> Standardizing the rest of the portfolio is deliberately out of scope.
