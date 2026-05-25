# Roadmap

> Forward-looking plan for `brandon-behring.dev` and the infrastructure
> directly supporting it. Adjacent projects appear as **showcase inputs** —
> things the site can potentially feature — not as parallel planning tracks.
> See `docs/website-decision-map.md` for identity strategy and
> [`deploy-workflows/README.md`](https://github.com/brandon-behring/deploy-workflows#phase-2-roadmap)
> for infra Phase 2 detail.

Last refined: 2026-05-23 (Phase 2 lead-identity + homepage restructure).

## What just shipped (Phase 1, May 2026)

- Site live at <https://brandon-behring.dev> (Cloudflare Workers Static Assets).
- Reusable deploy workflow extracted: [`brandon-behring/deploy-workflows`](https://github.com/brandon-behring/deploy-workflows).
- Portfolio's deploy is a 10-line caller of the reusable workflow.
- Setup walkthrough captured in `docs/cloudflare-setup.md` (local working note).

## What just shipped (Phase 2, May 2026)

- **Lead identity locked**: Framing 4 (Learning systems / research-infrastructure
  builder), broadened to absorb AI Evaluation. Spine: *build-to-learn*.
- **Homepage restructured**: hero + 3 cluster cards (Causal Methods,
  AI Evaluation, Course Notes) + Future direction section + multi-thread
  About paragraph. No past background on homepage.
- **Route structure**: `/work/{slug}` for 3 cluster pages (resolves A5).
  Each cluster page uses per-project sections with description, status,
  links, "what's next," and external references.
- **Header nav** added (Home / Work / About / Contact); cluster pages
  cross-link to siblings.
- **Technical specs locked**: WCAG 2.2 AA target, Cloudflare Web Analytics
  (token to add post-deploy), one static OG image (asset pending),
  3 → 2 → 1 column responsive cluster grid.

## Next 1–3 (pick one to start, in order)

1. **A4 first demo: RL + control citation graph via research-kb** (~4–6 hr, **multi-session**, spans 2 projects).
   - **Data source picked**: `rl_and_control/references/paper_index.md` — 135 papers, 18 thematic sections, status-tracked, with key findings per paper. Plus 12 method-family dossiers.
   - **Pattern picked**: Path C — extend research-kb with a `graph export` CLI subcommand; ingest the ~50 already-downloaded papers; export Cytoscape JSON; render in `/lab/research-graph/` on brandon-behring.dev as a Cytoscape.js Astro island.
   - **research-kb work** (~2–3 hr): new `graph export` subcommand in `packages/cli/src/research_kb_cli/commands/graph.py`; JSON formatter in `packages/storage/src/research_kb_storage/graph_queries.py`; ingest `[downloaded]`-status papers; tests.
   - **brandon-behring.dev work** (~2–3 hr): new `/lab/research-graph/` route (informally answers `/lab` route question); Cytoscape.js island; thematic coloring; click-to-detail; mobile + reduced-motion.
   - Why first: validates the research-kb → brandon-behring.dev data pipeline. Reusable for future graphs (causal DAG, post-transformer operator-family map).
2. **Provide visual assets** (~30–60 min, no code).
   - Capture per-project screenshots (see `public/ASSETS-NEEDED.md`).
   - Generate the OG image (1200 × 630 PNG).
   - Add the Cloudflare Web Analytics token to `src/layouts/Base.astro`.
   - Why second: lower priority than demo but closes Phase 2's intent.
3. **Migrate `post_transformers/guides/web` to the reusable workflow (B1)**
   (mechanical, ~30 min). Validates `deploy-workflows` with a 2nd consumer;
   unlocks `@v1` tag pinning.

Skip ahead, mix, or replace any of these — they're the *most-leveraged*
next moves, not a forced sequence.

## Decisions Locked (Phase 2)

| # | Decision | Choice |
|---|---|---|
| A1 | Lead identity | Framing 4 broadened — *build-to-learn engineer*, 3 visible clusters (Causal Methods, AI Evaluation, Course Notes) + Future direction. |
| A5 | Route structure | `/work/{slug}` for cluster pages. |
| — | Time horizon ordering | Now > Future > Past. Past not on homepage. |
| — | Cluster card density | Rich text + Visual (badges + screenshots + icons) + Link to /work/{slug}. **No metric callouts.** |
| — | Cluster pages | Per-project sections (description, visual, status badge, links, "what's next", external references). |
| — | Accessibility | WCAG 2.2 AA target. |
| — | Analytics | Cloudflare Web Analytics (token-driven; placeholder in code). |
| — | OG image | Single static PNG (asset pending; meta tags in place). |
| — | Responsive grid | 3 cols ≥1024px → 2 cols ≥768px → 1 col mobile. |
| — | Header nav | Home / Work / About / Contact on every page; cluster sibling links on each `/work/{slug}`. |

See `~/.claude/plans/i-want-to-think-wobbly-stroustrup.md` for the full
27-decision history of this session.

## Track A — Identity & Content (drives Tracks B & C)

Per `docs/website-decision-map.md` §"Open Decisions For Later". Listed in
dependency order:

- [x] **A1. Lead-identity scoring.** ✅ Locked Phase 2: Framing 4
  broadened — *build-to-learn engineer* with 3 visible clusters.
  Rubric replaced by preference-driven exploration.
- [~] **A2. `post_transformers` positioning.** Partially resolved:
  lives in the homepage Future direction section. Open question: dedicated
  /research page eventually?
- [~] **A3. Homepage balance.** Partially resolved: Now-clusters dominate,
  Future section follows, Past removed from homepage entirely.
- [~] **A4. First demo to build.** Phase 1 shipped 2026-05-24: live at
  `/lab/research-graph/` — interactive citation graph of 135 RL+control
  papers via Cytoscape.js + fcose, fed by new `research-kb graph export`
  CLI + `rl_and_control/scripts/build_graph_export.py` merge pipeline.
  Edges currently sparse (pending full citation extraction; backfill of
  `arxiv_id` metadata done 2026-05-24); structural pipeline working.
  Deploy verified live 2026-05-24 (see
  `docs/sessions/2026-05-24--deploy-verification.md`); two cosmetic
  follow-ups surfaced: F1 `/favicon.svg` 404 and F2 Cytoscape `hsl()`
  color rejection (per-domain node colors silently fall back to default).
- [x] **A5. Route structure.** ✅ Locked Phase 2: `/work/{slug}` for
  3 cluster pages. `/research`, `/notes`, `/lab` deferred until needed.
- [ ] **A6. Content collections migration.** Move `src/data/projects.json`
  to Astro content collections. Independent; cheap; do anytime.
- [~] **A7. Visual approach.** Partially resolved: minimal editorial
  with status badges + planned screenshots + responsive grid. Full
  visual identity (dossier vs lab notebook etc.) still open.

Content-related open issue:
- [`brandon-behring.dev#1`](https://github.com/brandon-behring/brandon-behring.dev/issues/1)
  *Personal synthesis map integration (consumer of synthesis-kb export)* —
  cross-cuts Tracks A and C; depends on research-kb's synthesis-kb export
  format.

## Track B — Infrastructure (Phase 2 from `deploy-workflows`)

The reusable workflow is published; consumers are the migration backlog.
Authoritative detail lives at
[`deploy-workflows/README.md`](https://github.com/brandon-behring/deploy-workflows#phase-2-roadmap).

- [ ] **B1. Migrate `post_transformers/guides/web`** — currently manual
  deploys. Mechanical 10-line workflow + secrets. *(See `Next` #2.)*
- [ ] **B2. Migrate `dlai-study-notes`** — currently on Cloudflare Pages.
  Higher-risk because of the documented 2–5 s domain switchover. Do
  during low-traffic window. Worker name: `brandon-behring-study-notes`.
- [ ] **B3. Migrate `book-template-astro`** — currently Pages. Same
  pattern as B2 but no live audience; safer order is B1 → B3 → B2.
- [ ] **B4. Tag `deploy-workflows@v1`** — only after a 2nd consumer
  exists (after B1). Then bump callers from `@main` to `@v1`.
- [ ] **B5. Optional: GitHub Organization** — `brandon-behring-org`
  (free), transfer deploy repos, convert per-repo secrets to org
  secrets. Single highest-leverage simplification once you have 3+
  consuming sites.
- [ ] **B6. Optional: `astro-cf-template`** — GitHub template repo with
  pre-wired `wrangler.jsonc` + caller workflow. "Use this template" →
  ready-to-deploy new site.
- [ ] **B7. Optional: Custom-domain API automation** — add `custom-domain`
  input to the reusable workflow; eliminates the one-click dashboard step.

## Track C — Showcase Inputs (adjacent active work)

Other repos that affect *what* this site can show or what story it can
tell. Not planned here; status snapshot to inform Track A decisions.

### Already featured in `src/data/projects.json`

- **`prompt_injection_detector`** — DeBERTa-LoRA PoC.
  - Status: V2 methodology complete; DECISIONS.md being finalized
    (D1–D29 recorded); PoC framing (not production) is the safe story.
  - Showcase value: high — concrete artifact + metrics + clear caveats.
  - Open: time-bounded finalization, then archive.
- **`dlai-study-notes`** — live at study-notes.brandon-behring.dev.
  - Status: live on Pages; pending Workers migration (B2).
  - Showcase value: existing flagship; ~10 books planned.
- **`causal_inference_mastery`** — Julia/Python.
  - Status: dormant (last commit ~74 days ago). 10 open issues
    (mostly reference-quality follow-ups).
  - Showcase value: methodological depth proof; safe to point at.
- **`bayesian-cold-start`** — hierarchical Bayes tutorial.
  - Status: dormant (~74 days). Reference-quality.
  - Showcase value: actuarial/insurance domain bridge.

### Active but not yet featured (candidates per identity outcome)

- **`post_transformers`** — SSMs / Mamba / Hyena guide.
  - Status: 6 of 21 chapters live at
    `post-transformers-guide.brandon-m-behring.workers.dev`.
  - Showcase value: future-facing identity signal. Largest content
    surface among Track-C repos.
  - Blocked by: open issue [`#51`](https://github.com/brandon-behring/post_transformers/issues/51)
    *v0.34.0 eval-toolkit BREAKING* — eval-toolkit version bump needed
    to keep CI green.
- **`book-scaffold-astro`** — npm package powering the books.
  - Status: v3.5.x; 10 open issues (mix of bugs + features); recent
    pivot from template-clone to npm-package model.
  - Showcase value: "publishing system" cluster — tooling-for-tooling
    risk per the strategy memo; needs a clear "why this matters" story.
- **`eval-toolkit`** — PyPI binary-classification eval harness.
  - Status: pre-v1.0; in Round 8 of audit; Decision Y.2 is the stop-gate
    for cutting v1.0.
  - Showcase value: evaluation-methodology cluster; complements
    `prompt_injection_detector`.
- **`research-kb`** — hybrid (BM25 + vector + graph + citation) search
  over a personal research corpus; 22 MCP tools.
  - Status: actively developed; 5 open issues
    ([#1](https://github.com/brandon-behring/research-kb/issues/1),
    [#8](https://github.com/brandon-behring/research-kb/issues/8),
    [#9](https://github.com/brandon-behring/research-kb/issues/9),
    [#10](https://github.com/brandon-behring/research-kb/issues/10),
    [#13](https://github.com/brandon-behring/research-kb/issues/13)).
  - Showcase value: research-infrastructure cluster. Niche audience;
    explainer required.
- **`research-agent`** — LangGraph multi-agent research QA on top of
  research-kb; 7-node pipeline.
  - Status: active; ~5 open issues.
  - Showcase value: pairs with research-kb as the "agent-assisted research"
    story.

## How the tracks interact

- **Track A → everything.** No identity locked = visual/route/demo
  decisions all stall. Score the rubric first.
- **Track B unblocks Track C visibility.** Once `post_transformers` and
  `dlai-study-notes` are on the same deploy pattern + on
  `brandon-behring.dev` subdomains, they become natural homepage links.
- **Track C constrains Track A.** What's *actually* showable (mature
  artifacts, public-safe, current) decides which identity framings are
  defensible.

## Out of scope here

- `causal_inference_mastery`, `bayesian-cold-start`, `prompt-injection-v*`
  experimental forks, `interview_prep_series`, `annuity-*`,
  `julia_archive_audit`, and ~40 other dormant or non-portfolio repos.
  Showcased only if Track A picks an identity that calls for them.

## Cross-references

- Authoritative strategy: `docs/website-decision-map.md`.
- Authoritative infra: <https://github.com/brandon-behring/deploy-workflows#phase-2-roadmap>.
- Live site: <https://brandon-behring.dev>.
- Setup walkthrough (Cloudflare credentials): `docs/cloudflare-setup.md`
  (currently a local working note; commit if it proves useful for sibling
  sites).
