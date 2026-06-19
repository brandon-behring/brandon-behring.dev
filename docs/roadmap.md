# Roadmap — brandon-behring.dev (the site)

> **Forward plan for the *site itself*.** This repo is the portfolio **hub**, so
> cross-repo work is not planned here — it lives on the board.
>
> - **Right now** → [`../CURRENT_WORK.md`](../CURRENT_WORK.md)
> - **Live cross-repo status + backlog** → [Work Tracker board #1](https://github.com/users/brandon-behring/projects/1) (the canonical cross-repo roadmap)
> - **What shipped, when** → [`../CHANGELOG.md`](../CHANGELOG.md)
> - **Identity / strategy** → [`website-decision-map.md`](website-decision-map.md)
> - **Why docs are split this way** → [`DOC-CONVENTIONS.md`](DOC-CONVENTIONS.md)

## Next 1–3 (site work — pick one)

Ranking lens: craft-signal + what the 2026-06-11 work-so-far review surfaced
([session](sessions/2026-06-11--work-so-far-adversarial-review.md)). Skip, mix,
or replace — not a forced sequence.

> The previous top two — the `/lab/` index and A6 content-collections — **both shipped
> in the A7 redesign** (2026-06-18); see Track A below + [`../CHANGELOG.md`](../CHANGELOG.md).

1. **SSM visualizer** — gated on the explainer's reception: re-trigger **2 weeks
   after the explainer is first distributed** (LinkedIn/newsletter/etc.; signal =
   Cloudflare Web Analytics referrers + views). If not distributed by **2026-07-01**,
   this converts to a pure dated check. Style question is Open decision #2 below.
2. **`/research`-vs-`/notes` hub structure** — Open decision #1 below; the shipped
   `/lab/` index is a partial answer that keeps the broader hub taxonomy open.

**Standing (not a slot):** A4 graph-refresh loop — rerun (re-export → curate
`graph_overrides.json` → verify rendered on `/lab/research-graph/`) whenever the
corpus advances **and** after the override-persistence bug is fixed upstream
([`rl_and_control#4`](https://github.com/brandon-behring/rl_and_control/issues/4):
the 06-10 re-export clobbered a 06-01 manual citation correction). Corpus growth
itself is board work (`research-kb#8/#10/#23` + the remaining `[needed]` rows in
`rl_and_control/references/paper_index.md`); recipe in
`rl_and_control/scripts/README.md` (private repo).

**Also (parked):** deeper visual identity beyond A7's shipped editorial baseline ·
per-project OG images (see [`ASSETS-NEEDED.md`](ASSETS-NEEDED.md)) · demo thumbnails.

## Open decisions (site)

1. **Long-term hub structure** — `/research`, `/lab`, `/notes`, or hybrid? The `/lab/`
   index shipped in A7 (2026-06-18) as a partial answer; the broader taxonomy
   (`/research` vs `/notes`) stays open — see Next-1–3 #2. (Deferred 2026-05-28;
   partially addressed 2026-06-18.)
2. **SSM visualizer style** (stability-region vs symplectic) — decide when the
   visualizer's gate fires (2 weeks after the explainer is first distributed, or
   2026-07-01, whichever comes first — see Next-1–3 #1).
3. **Account split** (`brandon-behring` vs `brandonmbehring-dev`) — decides which org
   the site's repo links, PyPI provenance, and CITATION.cff anchors point at. Tracked:
   [`brandon-behring.dev#5`](https://github.com/brandon-behring/brandon-behring.dev/issues/5).
   Resolve before any repo consolidation or transfer.

Resolved site decisions live in the dated session logs (e.g.
[`sessions/2026-05-28--ambiguity-resolution.md`](sessions/2026-05-28--ambiguity-resolution.md):
identity = build-to-learn; homepage cluster shape; `mathematical-guides` placement;
insurance positioning; SSM explainer framing) and in `website-decision-map.md` — not
re-tabulated here.

## Track A — Identity & Content (the site)

Per `website-decision-map.md` §"Open Decisions For Later". Site-facing; strategy defers
to the decision map.

- [x] **A1. Lead identity** — Framing 4, *build-to-learn engineer*, 3 visible clusters.
- [~] **A2. `post_transformers` positioning** — surfaces in the homepage "where this is going"; a dedicated `/research` page is part of the open hub-structure question.
- [~] **A3. Homepage balance** — Now-clusters lead, future section follows, past off the homepage.
- [x] **A4. First demo** — live at `/lab/research-graph/`, KB-sourced + densified (2026-06-10). Ongoing growth = the standing graph-refresh loop (above) → the board's corpus queue.
- [x] **A5. Route structure** — `/work/{slug}` cluster pages.
- [x] **A6. Content-collections migration** — shipped in A7 (2026-06-18): `src/content.config.ts` Zod schemas validate `src/data/*.json` at build time; `portfolio.ts` reads via `getCollection()`, same export surface.
- [x] **A7. Visual approach** — editorial redesign shipped (2026-06-18): self-hosted Fraunces display + design-token system (`src/styles/tokens.css`), warm palette, `/lab/` demos gallery, 7-item nav. Deeper visual identity beyond this baseline isn't a current slot.

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
