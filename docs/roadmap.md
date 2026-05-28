# Roadmap

> Forward-looking plan for `brandon-behring.dev` and the infrastructure
> directly supporting it. Adjacent projects appear as **showcase inputs** —
> things the site can potentially feature — not as parallel planning tracks.
> See `docs/website-decision-map.md` for identity strategy and
> [`deploy-workflows/README.md`](https://github.com/brandon-behring/deploy-workflows#phase-2-roadmap)
> for infra Phase 2 detail.

Last refined: 2026-05-28 (backlog audit; ranking refreshed to strategic-impact / craft-signal lens).

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

## What just shipped (Phase 2 follow-on, May 24–27, 2026)

- **A4 first demo live** (2026-05-24): `/lab/research-graph/` —
  135 RL+control papers via new `research-kb graph export` CLI +
  Cytoscape.js + fcose. Graph currently sparse (3 edges across 84
  nodes); densification is Next-1-3 item #2 below. See
  `docs/sessions/2026-05-24--deploy-verification.md`.
- **`deploy-workflows@v1` + `@v2` tagged** (2026-05-26): 3 consumers
  pinned to `@v1` (brandon-behring.dev, DML, ssm-foundations); DML
  adopted `@v2` with `enable-pr-previews: true`.
- **v4.6 dogfood sprint complete** (2026-05-27):
  `book-scaffold-astro` v4.6.0 published to npm; DML + ssm bumped +
  migrated `ci:validate` → `prevalidate` (recipe 19); scaffold issues
  #76 (SEO parity) + #77 (validator UX) closed. Apex sitemap gap is
  out-of-scaffold-scope and queued in "Quick wins backlog" below.
- **Subdomain consumers live**: `dml.brandon-behring.dev` (DML),
  `ssm-foundations.brandon-behring.dev` (ssm-foundations).
- **Non-blocking cosmetic regressions still open**: F1 `/favicon.svg`
  404, F2 Cytoscape `hsl()` color rejection (logged, own commit per
  2026-05-28 audit Q3 — see "Quick wins backlog").

## Next 1–3 (pick one to start, in order — strategic-impact / craft-signal lens)

Ranking lens picked in 2026-05-28 audit Q1: *craft signal* —
process-as-artifact pattern visible across consumer chapters. See
`docs/sessions/2026-05-28--backlog-audit.md` for the full decision
chain.

1. **Phase 6a — `book-scaffold-astro` v5 Provenance + Audit component.**
   Reusable Astro component reading provenance frontmatter (`ai_tools`,
   `prompts_archive`, `decisions_log`, `audit_history`,
   `citation_backstop`). Surfaces process-as-artifact on every chapter
   of every consumer book (DML, ssm, dlai, guides, claude-books).
   Spec: `~/.claude/plans/i-want-to-look-streamed-pebble.md:391-424`.
   **Sequencing gate**: Phase 4 (guides paradigm migration) Steps 2-5
   cannot advance until 6a ships + verifies on one consumer.
2. **A4 graph densification.** Densify `/lab/research-graph/` with
   pre-arXiv classics + textbooks; reuses Cytoscape + fcose
   infrastructure. research-kb matcher unblock landed 2026-05-25
   (commit `6fcf97f`, issue #14 closed). ~4–6 hr multi-session.
   **Pre-flight risk**: `research-kb#16` (`--full-rebuild` not
   transactional) — handle before running full rebuild.
3. **Phase 5 — Portfolio cluster additions.** Three new cluster cards
   on `brandon-behring.dev` homepage: `tools`, `books-and-guides`,
   `pricing-decision-systems`. ~1–2 hr. **Open question to flag
   inline**: `tools` cluster name is generic (per
   `~/.claude/plans/i-want-to-look-streamed-pebble.md` open question
   N7) — rename gate before going live. **Note**: `mathematical-guides`
   family explicitly NOT added as a link entry pending placement
   decision (see "Strategic decisions still open" below).

**Parked candidate** (slot #4 if a slot opens): SSM stability flagship
demo. Blocked on its own framing question (stability regions /
symplectic / discretization-matters per
`docs/visual-design-options-report.md:492`) — would benefit from its
own `/exploring-options` round before committing.

Skip ahead, mix, or replace — the ranking is strategic-impact by
craft-signal lens, not a forced sequence.

## Quick wins backlog (parallel-track fill for short open sessions)

- **Apex sitemap** via `@astrojs/sitemap` (~15 min; closes the apex row
  of the issue #76 grep table — see pickup memory)
- **RSS feed** via `@astrojs/rss` (~30 min)
- **CITATION.cff burst** across academic repos (ssm, dlai, eval-toolkit,
  ...; ~5 min/repo)
- **OG image authoring** for DML + ssm (Option D from pickup memory;
  ~10–30 min each)
- **B1 — `post_transformers/guides/web` reusable-workflow migration**
  (~30 min; was Next-1-3 #3 pre-audit)
- **Visual assets** — per-project screenshots + OG image for portfolio
  homepage (~30–60 min; was Next-1-3 #2 pre-audit; see
  `docs/ASSETS-NEEDED.md`)
- **Phase 4 (guides) paradigm migration Step 1 only** (~1–2 hr; Steps
  2–5 blocked on Phase 6a)
- **F1 favicon 404 + F2 Cytoscape `hsl()` color rejection fixes**
  (~30 min combined; **own commit** per 2026-05-28 audit Q3)

## Cross-repo coordination (state as of 2026-05-28)

| Repo | Current state | Notes |
|---|---|---|
| `book-scaffold-astro` | v4.6.0 shipped | v5 (Phase 6a Provenance) is next major; see Next-1-3 #1 |
| `deploy-workflows` | `@v1` + `@v2` tagged | OIDC migration on future-track (cloudflare/wrangler-action#402) → `@v3` |
| `double_ml_time_series` (DML) | Live at `dml.brandon-behring.dev`; on `@v2` | OG image pending (Option D) |
| `ssm-foundations` | Live at `ssm-foundations.brandon-behring.dev`; on `@v2` | OG image pending; **5 new audit-burst issues from 2026-05-27** (#1, #3, #4, #5, #6) labeled in 2026-05-28 audit |
| `dlai-study-notes` | Phase 3 deploy candidate | `site_url` unset until shipped |
| `guides` | Phase 4 paradigm migration ready | Provenance opt-in gated on Phase 6a + cross-consumer verify; stale scaffold-bump issue `#2` references pre-v4.6 |
| `claude-books` | Workspace with 4 planned members; handbook in Phase 0 | Stale scaffold-bump issues `#2`–`#4` reference pre-v4.6 |
| `post_transformers` | GitHub-only upstream research | `#51` BREAKING blocker labeled P2 in 2026-05-28 audit |
| `research-kb` | Matcher unblock landed 2026-05-25 | `#16` (`--full-rebuild` data-loss risk) labeled P2 in 2026-05-28 audit |
| `mathematical-guides` family | **NEW** (discovered 2026-05-28) — hub + transformers sibling + RL sibling | All private; all pushed 2026-05-28; hub has `wrangler.toml` (deploy-intent); placement open (see "Strategic decisions still open") |

## Strategic decisions still open

Consolidates unresolved questions from `docs/website-decision-map.md`
"Open Decisions For Later" + `docs/visual-design-options-report.md`
Q&A. Top 4 flagged; rest live in those source documents.

1. **`mathematical-guides` family placement** (NEW 2026-05-28). Options
   surfaced by 2026-05-28 audit Q4: supplement under existing `guides`
   (Option 1), own subdomain like `math.brandon-behring.dev`
   (Option 2), own portfolio cluster (Option 3), defer everything
   (Option 4). Leaning Option 1 per the family's own README
   ("supplements (does not replace) the practical `guides` family") but
   not committed.
2. **SSM flagship-demo framing** — stability regions / symplectic
   integration / "why discretization matters for sequence models"
   (per `docs/visual-design-options-report.md:492`). Gates Phase 5+
   SSM-demo work; parked Next-1-3 slot #4 candidate.
3. **Long-term hub structure** — `/research`, `/lab`, `/notes`, or
   hybrid? `/work/{slug}` and `/lab` both exist with one entry each
   (per `docs/visual-design-options-report.md:500`).
4. **Applied insurance/stats positioning** — homepage proof strip, or
   only on deeper pages? (per
   `docs/visual-design-options-report.md:498`)

See `docs/website-decision-map.md` §"Open Decisions For Later" and
`docs/visual-design-options-report.md` Q&A § for the full list.

## Discovered work surfaced 2026-05-28

Items not currently tracked in the right places; half handled by
2026-05-28 audit hygiene actions, half deferred.

- **`mathematical-guides` family** (3 repos, ~400KB combined source,
  all active 2026-05-28) — NOT in
  `~/.claude/plans/i-want-to-look-streamed-pebble.md`. Placement open
  per "Strategic decisions still open" #1.
- **8+ stale scaffold-bump adoption issues** on `guides` +
  `claude-books` (`guides#2` v4.0 BREAKING; `claude-books#2/#3/#4`
  v4.0/v4.1/v4.3 adoption) all pre-v4.6 — **triage decision (2026-05-28
  audit)**: leave for the natural next-bump cycle on those consumers;
  not part of this audit pass.
- **`post_transformers#51`** BREAKING blocker (`eval-toolkit`
  `mde_from_ci(paired=...)` → `(ci=...)` rename) — labeled P2 by audit
  hygiene; gates ssm pin bump.
- **`research-kb#16`** (`--full-rebuild` not transactional →
  crash-mid-rebuild = data loss) — labeled P2 by audit hygiene;
  pre-flight for Next-1-3 #2.
- **Work Tracker (#1) stale items**: `eval-toolkit#71` +
  `eval-toolkit#73` showed "In Progress" but closed 2026-05-26 —
  reconciliation attempted by audit hygiene (see session log for
  outcome).
- **`ssm-foundations` audit burst** (#1, #3, #4, #5, #6 from 2026-05-27
  standards audit) — labeled `audit-followup` by audit hygiene; further
  triage on Brandon's judgment.
- **`brandonmbehring-dev` secondary remote** on DML — noted in memory;
  resolve before pre-Phase-9 transfer window (per
  `[[brandonmbehring-dev-second-account]]` memory).
- **Distributed ML Patterns** (surfaced via Related-Books hook):
  investigated, no portfolio repo, almost certainly a research-kb
  reference. **Treated as noise**, no action.

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
