# Changelog

Shipped history for **brandon-behring.dev**, newest first. One line per milestone →
its session log holds the detail (nothing duplicated here). Format loosely follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

Forward plan → [`docs/roadmap.md`](docs/roadmap.md) · live cross-repo status →
[Work Tracker board #1](https://github.com/users/brandon-behring/projects/1) ·
why it's split this way → [`docs/DOC-CONVENTIONS.md`](docs/DOC-CONVENTIONS.md).

---

## 2026

- **2026-06-22** — `/research` hub + roadmap to a strategic layer: new `/research` lens (sequence-models · causal/temporal · AI-eval threads — links out, no project re-description) resolving the hub-structure decision; `roadmap.md` now delegates the tactical sequence to `CURRENT_WORK`/board; 3 open decisions resolved (hub → /research · account split → consolidate onto `brandon-behring` · SSM-viz → 2026-07-01 dated check) → [session](docs/sessions/2026-06-22--research-hub-review.md)
- **2026-06-20** — Cross-repo health/consistency audit + live verification of the deployed family: confirmed every 2026-06-19 recon finding is tracked (claude-books hub off-brand fixed → [claude-books#27](https://github.com/brandon-behring/claude-books/issues/27); 8 others open), fixed `projects.json`/doc drift, enriched [#2](https://github.com/brandon-behring/brandon-behring.dev/issues/2)/[#30](https://github.com/brandon-behring/brandon-behring.dev/issues/30) with concrete punch-lists, closed [#13](https://github.com/brandon-behring/brandon-behring.dev/issues/13) → [session](docs/sessions/2026-06-20--cross-repo-health-audit.md)
- **2026-06-19** — Cross-property visual/quality recon: 8 deployed properties × viewport/scheme matrix → 9 improvement issues filed across the family (#29–#31 here · claude-books#27 · ssm#48 · dml#46 · scaffold#161 · math-guides#1 · dlai#1) → [session](docs/sessions/2026-06-19--cross-property-visual-recon.md)
- **2026-06-19** — TypeScript foundation: added the repo's first `tsconfig.json` (`astro/tsconfigs/strict`) + folded `astro check` into `npm run build` so type errors fail CI; fixed the surfaced issues to 0 errors (content-collection parser type, Zod `url()` migration, `is:inline` on JSON-LD / the graph data island). Type-safety for the interactive demos → [session](docs/sessions/2026-06-19--typescript-foundation-review.md)
- **2026-06-19** — Lab citation-graph keyboard access ([#25](https://github.com/brandon-behring/brandon-behring.dev/issues/25)): search-box **Enter** selects a node → same detail panel + incident-edge highlight as a tap; `aria-live` status; closes the canvas WCAG 2.1.1 gap (+ a 2.4.7 focus-ring fix) → [session](docs/sessions/2026-06-19--citation-graph-keyboard-selection-review.md)
- **2026-06-18** — Lab citation-graph edge connectivity ([#23](https://github.com/brandon-behring/brandon-behring.dev/issues/23)): on-demand incident-edge highlight on selection, faint ambient kept (WCAG 1.4.11 *intent*, light byte-identical) → [session](docs/sessions/2026-06-18--citation-graph-edge-connectivity-review.md)
- **2026-06-18** — Lab citation-graph dark-mode contrast ([#22](https://github.com/brandon-behring/brandon-behring.dev/issues/22)): scheme-aware Cytoscape palette + fixed an innerHTML detail-panel styling bug → [session](docs/sessions/2026-06-18--citation-graph-dark-contrast-review.md)
- **2026-06-18** — A7 editorial redesign: new hero/narrative + self-hosted Fraunces + warm palette + design-token system (`src/styles/tokens.css`), `/lab/` demos-gallery index, A6 content-collections (`src/content.config.ts`), 7-item nav → [session](docs/sessions/2026-06-18--a7-redesign-review.md)
- **2026-06-11** — Board #1 cron reconciler ([`board-reconciler.yml`](.github/workflows/board-reconciler.yml)): the open-`tracked`-⇒-board invariant (broke 7× manually) is now machine-held every 6h across both accounts; auto-add (#8) demoted to latency optimization → [session](docs/sessions/2026-06-11--board-reconciler.md)
- **2026-06-11** — Work-so-far adversarial review (methodology-audit `--depth deep` + 3 hostile live-reality shards): 6 stale `projects.json` claims corrected, regressed DPG citation misattribution hotfixed (upstream → `rl_and_control#4`), lab cross-links added, roadmap Next-1-3 re-prioritized → [session](docs/sessions/2026-06-11--work-so-far-adversarial-review.md)
- **2026-06-10** — SSM explainer live: `/lab/why-discretization-matters/` ("Why discretization matters" — ZOH, stability regions, Mamba-3's integrator swap; KaTeX build-time math + Δ-slider + light/dark regenerated figures) → [session](docs/sessions/2026-06-10--ssm-explainer.md)
- **2026-06-10** — A4 densification round 2: `/lab/research-graph/` 95 nodes / 51 edges → **119 / 460** (corpus push: 20 acquisitions + 4 anchor stubs + citation re-match) → [session](docs/sessions/2026-06-09--audit-densify-node24.md)
- **2026-06-10** — Node-24 Actions sweep: 209 pins across 34 repos bumped, 0 regressions, `dml#6` closed ahead of the 06-16 deadline → [session](docs/sessions/2026-06-09--audit-densify-node24.md)
- **2026-06-09** — Portfolio audit: board #1 reconciled (every open `tracked` issue on it, +27), roadmap drift fixed + refreshed → [session](docs/sessions/2026-06-09--audit-densify-node24.md)
- **2026-06-04** — Roster curation: draft-hide mechanism (19 of 23 visible), `ssm-foundations` → "Sequence Models & RL" cluster, clickable project names, screenshots dropped → [session](docs/sessions/2026-06-04--roster-curation-review.md) · [PR review](docs/sessions/2026-06-04--pr4-independent-review.md)
- **2026-06-04** — Professional Gmail email signature → [`docs/email-signature/`](docs/email-signature/) · [session](docs/sessions/2026-06-04--email-signature-review.md)
- **2026-06-01** — Track 1.6 polish & hygiene: 4-state status model, security headers, SEO/JSON-LD, Home↔Work de-dup → [session](docs/sessions/2026-06-01--polish-sweep-review.md)
- **2026-06-01** — Track 1.5 credibility funnel + `/publications/` page → [session](docs/sessions/2026-06-01--track1.5-credibility.md)
- **2026-06-01** — A4 citation-graph chain: `/lab/research-graph/` reproducibly KB-sourced → [session](docs/sessions/2026-06-01--a4-chain-review.md)
- **2026-06-01** — Roadmap drift reconciliation; Work Tracker board #1 made authoritative → [session](docs/sessions/2026-06-01--roadmap-examination.md)
- **2026-05-28** — Phase 6a: Provenance / "How this was made" component (`book-scaffold-astro` v4.8.0) → [session](docs/sessions/2026-05-28--phase-6a.md)
- **2026-05-28** — Phase 5: 4 tier clusters + sitemap / RSS / favicon → [session](docs/sessions/2026-05-28--phase-5-prep.md)
- **2026-05-28** — Ambiguity resolution: 4 strategic decisions locked → [session](docs/sessions/2026-05-28--ambiguity-resolution.md)
- **2026-05-24** — A4 first demo live: `/lab/research-graph/` citation graph → [session](docs/sessions/2026-05-24--deploy-verification.md)
- **2026-05** — Phase 2: lead identity locked + homepage restructured → [session](docs/sessions/2026-05-22--phase-1.md)
- **2026-05** — Phase 1: site live + reusable deploy workflow extracted → [session](docs/sessions/2026-05-22--phase-1.md)
