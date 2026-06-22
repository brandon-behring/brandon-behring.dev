# Roadmap — brandon-behring.dev (the site)

> **Forward plan for the *site itself*.** This repo is the portfolio **hub**, so
> cross-repo work is not planned here — it lives on the board.
>
> - **Right now** → [`../CURRENT_WORK.md`](../CURRENT_WORK.md)
> - **Live cross-repo status + backlog** → [Work Tracker board #1](https://github.com/users/brandon-behring/projects/1) (the canonical cross-repo roadmap)
> - **What shipped, when** → [`../CHANGELOG.md`](../CHANGELOG.md)
> - **Identity / strategy** → [`website-decision-map.md`](website-decision-map.md)
> - **Why docs are split this way** → [`DOC-CONVENTIONS.md`](DOC-CONVENTIONS.md)
>
> This doc is the **strategic** layer — themes, decisions, gates. The tactical,
> issue-by-issue sequence is **not** duplicated here (it rots); it lives in
> [`../CURRENT_WORK.md`](../CURRENT_WORK.md) "Next" + the board.

## Current focus

The live, ordered backlog is **[`../CURRENT_WORK.md`](../CURRENT_WORK.md) "Next" + the
[board](https://github.com/users/brandon-behring/projects/1)** — the single source for the
issue-by-issue sequence (as of 2026-06-22 the lead is #29, main-site polish). This section
names only **strategic / standing** site work that isn't a single tracked issue:

- **`/research` hub** (NEW — decided 2026-06-22) — a thin section tying the research threads
  together (sequence models & numerical foundations · causal/temporal inference · AI evaluation)
  and linking out to the artifacts. Resolves **A2**. See Track A → A8.
- **SSM visualizer** — **dated check: 2026-07-01.** The explainer
  (`/lab/why-discretization-matters/`) shipped 2026-06-10 but was not distributed, so the
  "2 weeks after distribution" trigger never started; revisit on the date. Style = the one
  remaining open decision below.
- **A4 graph-refresh loop** (standing) — corpus growth is **board work**
  (`research-kb#8/#10/#23` + `[needed]` rows in `rl_and_control/references/paper_index.md`); the
  site's job is to **re-verify the rendered graph** on `/lab/research-graph/` after each corpus
  update (re-export → curate `graph_overrides.json` → verify). The upstream override-persistence
  fix ([`rl_and_control#4`](https://github.com/brandon-behring/rl_and_control/issues/4))
  *improves* this loop but does **not** block site re-verification.

**Parked (user calls):** deeper visual identity beyond A7's baseline · per-project OG images
(see [`ASSETS-NEEDED.md`](ASSETS-NEEDED.md)) · demo thumbnails.

## Resolved decisions (2026-06-22)

- **Hub structure** (open since 2026-05-28) → **add a thin `/research` hub**; keep `/work` +
  `/lab` + `/publications`, and reach books/guides via the corpus index (#30). **Not** `/notes`.
  Rationale: the decision-map's bridge-narrative / anti-silo lock + a solo-maintainer's route
  budget. Closes **A2** (post_transformers's public surface = `ssm-foundations`, now homed on `/research`).
- **Account split** (issue #5) → **consolidate onto `brandon-behring`** as the single public
  identity. `temporalcv` is already there (PyPI 2.3.0 + canonical repo + `CITATION.cff` all point
  to brandon-behring, verified 2026-06-22); the remaining work is sweeping the stale public
  duplicates on `brandonmbehring-dev` (first: the stale `temporalcv` mirror) — **board work
  ([#5](https://github.com/brandon-behring/brandon-behring.dev/issues/5)); does not delete the dev account.**

## Open decisions (site)

1. **SSM visualizer style** (stability-region vs symplectic) — deferred to the visualizer's
   **2026-07-01 dated check** (see Current focus); decide if/when it's built.

Earlier resolved decisions live in the dated session logs (e.g.
[`sessions/2026-05-28--ambiguity-resolution.md`](sessions/2026-05-28--ambiguity-resolution.md):
identity = build-to-learn; homepage cluster shape; insurance positioning) and in
`website-decision-map.md` — not re-tabulated here.

## Track A — Identity & Content (the site)

Per `website-decision-map.md` §"Open Decisions For Later". Site-facing; strategy defers
to the decision map.

- [x] **A1. Lead identity** — Framing 4, *build-to-learn engineer*, 3 visible clusters.
- [~] **A2. `post_transformers` positioning** — resolved 2026-06-22: its public surface is `ssm-foundations`, now homed on the new `/research` hub (the dedicated page the hub-structure decision settled). `post_transformers` itself stays GitHub-only.
- [~] **A3. Homepage balance** — Now-clusters lead, future section follows, past off the homepage.
- [x] **A4. First demo** — live at `/lab/research-graph/`, KB-sourced + densified (2026-06-10). Ongoing growth = the standing graph-refresh loop (above) → the board's corpus queue.
- [x] **A5. Route structure** — `/work/{slug}` cluster pages.
- [x] **A6. Content-collections migration** — shipped in A7 (2026-06-18): `src/content.config.ts` Zod schemas validate `src/data/*.json` at build time; `portfolio.ts` reads via `getCollection()`, same export surface.
- [x] **A7. Visual approach** — editorial redesign shipped (2026-06-18): self-hosted Fraunces display + design-token system (`src/styles/tokens.css`), warm palette, `/lab/` demos gallery, 7-item nav. Deeper visual identity beyond this baseline isn't a current slot.
- [~] **A8. `/research` hub** — thin lens page (decided 2026-06-22; building this session): research statement + 3 threads (sequence models & numerical foundations · causal/temporal inference · AI evaluation) + "how it's backed" + links out; nav entry + homepage "Research →" link.

Open content issue: [`brandon-behring.dev#1`](https://github.com/brandon-behring/brandon-behring.dev/issues/1) (synthesis-map integration) — tracked on the board.

## Infrastructure & cross-repo work → board

Deploy-pattern migrations (`post_transformers`, `dlai-study-notes`, `claude-books`),
the reusable-workflow backlog, the tiered cross-repo backlog, and all other cross-repo
coordination live on the
[Work Tracker board #1](https://github.com/users/brandon-behring/projects/1) +
[`deploy-workflows/README.md`](https://github.com/brandon-behring/deploy-workflows#phase-2-roadmap).
Not planned here.

## Phase numbering: site ↔ portfolio

This doc numbers **site** phases; the coordinated multi-repo plan numbers **portfolio**
phases. They align on most labels but **collide on Phase 2** — disambiguate here, don't
assume the numbers match.

| Site (this doc) | Portfolio (coordinated plan) | State |
|---|---|---|
| Phase 1 — site live + deploy workflow | Phase 1a–1e + 1.5 | shipped |
| **Phase 2 — identity lock + homepage** | *no equivalent* (portfolio Phase 2 = DEPRECATED) | ⚠ collision |
| Phase 3 — dlai deploy | Phase 3 | cross-repo → board |
| Phase 4 — guides migration | Phase 4 | cross-repo → board |
| Phase 5 — tier clusters | Phase 5 | shipped |
| Phase 6a — Provenance component | Phase 6a | shipped |

Shipped phases are indexed in [`../CHANGELOG.md`](../CHANGELOG.md) → their session logs.

## Cross-references

- Strategy: [`website-decision-map.md`](website-decision-map.md)
- Infra: <https://github.com/brandon-behring/deploy-workflows#phase-2-roadmap>
- Live site: <https://brandon-behring.dev>
- Doc conventions: [`DOC-CONVENTIONS.md`](DOC-CONVENTIONS.md)
