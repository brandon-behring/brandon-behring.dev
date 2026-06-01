# Roadmap

> Forward-looking plan for `brandon-behring.dev` and the infrastructure
> directly supporting it. Adjacent projects appear as **showcase inputs** —
> things the site can potentially feature — not as parallel planning tracks.
> See `docs/website-decision-map.md` for identity strategy and
> [`deploy-workflows/README.md`](https://github.com/brandon-behring/deploy-workflows#phase-2-roadmap)
> for infra Phase 2 detail.

Last reconciled against live sources: 2026-06-01 (full-portfolio examination + tracking-drift reconciliation — Work Tracker board #1 made authoritative, 11 orphan issues boarded; see `docs/sessions/2026-06-01--roadmap-examination.md`). Prior: 2026-05-30 (backlog hygiene; `docs/sessions/2026-05-30--backlog-hygiene.md`).

**Phase numbers here are _site_ phases.** The coordinated multi-repo plan uses its own _portfolio_ numbering — aligned on Phases 3/4/5/6a but **colliding on Phase 2** — see §"Phase numbering: site ↔ portfolio" near the end.

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

## What just shipped (Phase 2 follow-on, May 24–28, 2026)

- **A4 first demo live** (2026-05-24): `/lab/research-graph/` —
  135 RL+control papers via new `research-kb graph export` CLI +
  Cytoscape.js + fcose. Initial deploy was sparse (3 edges across 84
  nodes); **densified 2026-05-25 to 95 nodes / 51 edges** via the
  research-kb matcher unblock (`6fcf97f`). Further densification
  (pre-arXiv classics + textbooks) is Next-1-3 item #1 below. See
  `docs/sessions/2026-05-24--deploy-verification.md`.
- **`deploy-workflows@v1` + `@v2` tagged** (2026-05-26): 3 consumers
  pinned to `@v1` (brandon-behring.dev, DML, ssm-foundations); DML
  adopted `@v2` with `enable-pr-previews: true`.
- **v4.6 dogfood sprint complete** (2026-05-27):
  `book-scaffold-astro` v4.6.0 published to npm; DML + ssm bumped +
  migrated `ci:validate` → `prevalidate` (recipe 19); scaffold issues
  #76 (SEO parity) + #77 (validator UX) closed. Apex sitemap
  subsequently shipped (`@astrojs/sitemap` in `astro.config.mjs`).
- **Subdomain consumers live**: `dml.brandon-behring.dev` (DML),
  `ssm-foundations.brandon-behring.dev` (ssm-foundations).
- **Cosmetic regressions resolved (2026-05-28, Phase 5)**: F1
  `/favicon.ico` 404 fixed (multi-size `.ico` added); F2 Cytoscape
  `hsl()` rejection was already fixed in a prior session
  (`CitationGraph.astro` `hslToHex`) — verified, no change needed.
- **Ambiguity-resolution session** (2026-05-28): 4 of 6 strategic
  ambiguities locked via 4 sequenced `/exploring-options` rounds.
  See `docs/sessions/2026-05-28--ambiguity-resolution.md`. Locked:
  identity reconfirmed as build-to-learn; homepage cluster shape (3
  lead + 4 tier tiles); `mathematical-guides` as sub-entry under
  `books-and-guides`; insurance positioning stays off homepage; SSM
  flagship-demo framing as the "Why discretization matters" explainer
  (visualizer style TBD post-ship). Deferred: long-term hub
  structure (defer-friendly until pull develops).

## What just shipped (Track 1.5 — credibility/funnel, 2026-06-01)

Audit-driven reprioritization in response to the contrarian audit
`brandon_behring_dev_audit_2026-06-01`. Three `/exploring-options` rounds +
a read-only de-risking pass. See
`docs/sessions/2026-06-01--track1.5-credibility.md` and
`~/.claude/plans/i-want-to-examine-adaptive-wilkinson.md`.

- **Credibility page de-bricked**: the 3 dead links on `/how-this-was-made/`
  fixed (branch `main`→`master`; dead private `DECISIONS.md` examples →
  the public `prompt-injection-detection-prototype/decisions` ADR log);
  page now promoted into the top nav.
- **Inverted bucket fixed**: `published-research` → **"Books & Guides"**
  (name + slug); `ssm-foundations` moved in as the lead so the bucket holds
  a real live book. Hero **"Live now" strip** foregrounds the 4 usable
  surfaces.
- **Lab graph data repaired**: titles/years/authors now real and accurate
  to each linked arXiv ID (`scripts/enrich-citation-graph.mjs`); search works.
- **Funnel**: GitHub profile README added (bio/blog = user-run step).
- **Publications shipped (1.5b)**: peer-reviewed Publications page live at
  `/publications/` (commit `c599101`); linked from the funnel.

## What just shipped (Track 1.6 — polish & hygiene, 2026-06-01)

Cleared the audit's P2/P3 tail. One reviewed commit (`62c1323`), deployed +
verified live. Two `/exploring-options` rounds locked the design choices; gated
by `independent-review` (3 cold reviewers) — see
`docs/sessions/2026-06-01--polish-sweep-review.md`.

- **Honest status model**: 7 ad-hoc statuses → 4 (`released`/`in-progress`/
  `prototype`/`planned`) with color badges + a `/work/` legend. "released"
  reserved for items with a real tag/package/live URL (4: temporalcv,
  `@brandon_m_behring/book-scaffold-astro`, deploy-workflows, the OOD study).
  Cold review caught 2 overclaims → `annuity-pricing` + `research-kb`
  downgraded to `in-progress`.
- **Jargon scrub**: internal notation (decision-log codes, audit-round numbers)
  removed from public `whats_next` copy.
- **Security headers** (`public/_headers`): CSP (`script-src 'self'` + CF
  Analytics allowlist), HSTS (no preload), nosniff, Referrer-Policy,
  Permissions-Policy — verified live (curl + Playwright; 0 CSP console errors,
  lab graph renders).
- **SEO**: `public/robots.txt` + Person/WebSite JSON-LD (factual `alumniOf`
  NJIT + NYU; no `jobTitle`).
- **Home↔Work de-dup**: homepage is a curated lead (hero · live-now · 3
  now-cards · "See all work →" + "Where this is going →" signposts); `/work/`
  is the single full catalog.
- **Cross-repo backlog**: filed as issues but the 2026-06-01 audit found them
  *orphaned* (un-boarded + unlabeled); boarded with `tracked` in that session's
  hygiene pass. book-scaffold-astro#91 (a11y) · deploy-workflows#2 (LICENSE,
  **closed 2026-06-01**) · insurance-ai-toolkit#11 (dead README demo) ·
  annuity-pricing#11 (PyPI publish → then it earns "released") ·
  brandon-behring.dev#2 (homepage/topics + CITATION.cff + OG images).
  (`prompt-injection-portfolio#3` path-scrub has since closed and is dropped.)

## Next 1–3 (pick one to start, in order — strategic-impact / craft-signal lens)

Ranking lens picked in 2026-05-28 audit Q1: *craft signal* —
process-as-artifact pattern visible across consumer chapters. See
`docs/sessions/2026-05-28--backlog-audit.md` for the full decision
chain.

1. **A4 graph densification.** Densify `/lab/research-graph/` with
   pre-arXiv classics + textbooks; reuses Cytoscape + fcose
   infrastructure. research-kb matcher unblock landed 2026-05-25
   (commit `6fcf97f`, issue #14 closed). ~4–6 hr multi-session.
   **Pre-flight risk**: `research-kb#16` (`--full-rebuild` not
   transactional) — handle before running full rebuild.
   **BLOCKED (2026-06-01)**: research-kb stores filename-derived junk
   metadata (`title = arxiv_id`, `authors = []`) for these papers, so
   densifying *from* it imports more junk. The live graph's data was
   repaired out-of-band via the arXiv API in Track 1.5; a clean
   densification needs **`research-kb#20`** (filename→junk metadata)
   resolved first.
2. **Phase 4 (guides paradigm migration) Steps 2–5 — UNBLOCKED 2026-05-28**
   by Phase 6a shipping. Plus the follow-on **provenance backfills** for the
   other consumers (DML, dlai-study-notes, guides, claude-books) once each
   bumps to scaffold v4.8.0 — tracked as GH issues (`tracked` label).
3. ~~Phase 6a — `book-scaffold-astro` Provenance + Audit component.~~
   **✓ SHIPPED 2026-05-28 as v4.8.0** (not "v5" — additive optional field +
   new component = MINOR per the repo's own semver). Per-chapter "How this
   was made" block auto-rendered on every chapter of every consumer (covers
   both `Chapter.astro` + `Base.astro` paths via a route-layer insert);
   opt-out fallback; `.strict`/`.refine` hardened (fail-loud, no silent data
   loss). Verified on ssm-foundations ch01 (real `audits/`-sourced trail) +
   ch07 fallback; suite 234→275; both npm packages at 4.8.0. PR #81 (merged).
   ~~Phase 5 (4 tier clusters + sitemap/RSS/favicon)~~ also ✓ SHIPPED
   2026-05-28 — see `docs/sessions/2026-05-28--phase-5-prep.md`.

**Parked candidate** (slot #4 if a slot opens): SSM flagship demo —
"Why discretization matters for sequence models" explainer (framing
locked 2026-05-28 ambiguity-resolution Q3). Visualizer style
(stability-region vs symplectic) deferred until explainer ships and
reception is observable.

Skip ahead, mix, or replace — the ranking is strategic-impact by
craft-signal lens, not a forced sequence.

## Quick wins backlog (parallel-track fill for short open sessions)

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
  2–5 unblocked — full migration is Next-1-3 #2)

(Shipped + removed from this list 2026-05-30: apex sitemap, RSS feed,
F1 favicon 404, F2 Cytoscape `hsl()` — all live; see "Phase 5" above.)

## Remaining work — all tiers (index)

Full map + evidence: `docs/sessions/2026-06-01--roadmap-examination.md`. **Live
status = [Work Tracker board #1](https://github.com/users/brandon-behring/projects/1)** —
this index is issue pointers only, deliberately status-free so it can't rot.

- **Tier 1 — site-coupled**: A4 densification (`research-kb#20` → `#16`) ·
  `brandon-behring.dev#2` (homepage/topics + CITATION.cff + OG) · `#1` (synthesis
  map) · `insurance-ai-toolkit#11` (dead demo) · A6 content-collections · A7
  visual identity · SSM explainer (parked).
- **Tier 2 — research infra**: `research-kb` #20/#16/#13/#8/#9/#10 ·
  `research_toolkit` #21/#22 (P1)/#23/#24/#25/#26/#27.
- **Tier 3 — released-gating + hygiene**: `annuity-pricing#11` (PyPI) ·
  `book-scaffold-astro` #90/#91/#80 (v5.x) · `eval-toolkit#88` · `causal_inference_mastery#12` ·
  `ssm-foundations` #1/#3/#4/#5/#6 · `post_transformers#51` · `rl_and_control#1`.
  (`deploy-workflows#2` LICENSE — done 2026-06-01.)
- **Tier 4 — deferred (trigger-gated)**: Phases 3, 4, 6c–e, 7, 8, 9, 9.5,
  8.5/OIDC; Track B6/B7. (B5 deprecated.)
- **Tier 5 — open decisions**: hub structure · SSM visualizer style ·
  `brandonmbehring-dev` second-account resolution.

## Cross-repo coordination (snapshot 2026-06-01)

> Live status = the [Work Tracker board #1](https://github.com/users/brandon-behring/projects/1)
> + `src/data/projects.json`. This table is a dated snapshot of judgments/blockers
> that live nowhere else — not a registry.

| Repo | Current state | Notes |
|---|---|---|
| `book-scaffold-astro` | v4.8.0 shipped | Phase 6a Provenance shipped (v4.8.0 — additive MINOR, not "v5"); v5.x candidate is `#80` (multibook routing + AnkiCard CLI) |
| `deploy-workflows` | `@v1` + `@v2` tagged; **MIT LICENSE added 2026-06-01** (#2 closed) | OIDC → `@v3` gated on cloudflare/wrangler-action#402 |
| `double_ml_time_series` (DML) | Live at `dml.brandon-behring.dev`; on `@v2` | OG image pending (Option D) |
| `ssm-foundations` | Live; on `@v2`; **CITATION.cff added 2026-06-01** | OG image pending; 5 audit-burst issues (#1, #3, #4, #5, #6) from 2026-05-27 standards audit |
| `dlai-study-notes` | Phase 3 deploy candidate | `site_url` unset until shipped |
| `guides` | Phase 4 paradigm migration ready | Provenance opt-in gated on Phase 6a + cross-consumer verify; stale scaffold-bump issue `#2` references pre-v4.6 |
| `claude-books` | Workspace with 4 planned members; handbook in Phase 0 | Stale scaffold-bump issues `#2`–`#4` reference pre-v4.6 |
| `post_transformers` | GitHub-only upstream research | `#51` BREAKING blocker labeled P2 in 2026-05-28 audit |
| `research-kb` | Powers `/lab/research-graph/` | `#20` (junk metadata — A4 blocker) + `#16` (P2 `--full-rebuild` data-loss risk) boarded `tracked` 2026-06-01 |
| `mathematical-guides` family | hub + transformers sibling + RL sibling (all private; all pushed 2026-05-28; all skeletons or scaffolded) | Placement locked 2026-05-28 ambiguity-resolution Q2: sub-entry under `books-and-guides` cluster page. Deployment to `mathematical.brandon-behring.dev` proceeds independently via existing `wrangler.toml`. |

## Strategic decisions still open

Consolidates unresolved questions. 4 of the prior 6 strategic
ambiguities locked 2026-05-28 (see
`docs/sessions/2026-05-28--ambiguity-resolution.md`); 2 remain.

1. **Long-term hub structure** — `/research`, `/lab`, `/notes`, or
   hybrid? `/work/{slug}` and `/lab` both exist with one entry each
   (per `docs/visual-design-options-report.md:500`). Deferred-by-plan
   in the 2026-05-28 ambiguity-resolution session; re-trigger when
   `/lab` accumulates 2+ entries beyond `research-graph` OR when an
   entry's natural home is clearly neither `/work/{slug}` nor `/lab/`.
2. **SSM flagship-demo visualizer style** (post-explainer).
   2026-05-28 ambiguity-resolution Q3 locked the explainer framing
   ("Why discretization matters for sequence models"). Visualizer
   style (stability-region vs symplectic) deferred until explainer
   ships and reception is observable.

Resolved 2026-05-28 (locked in
`docs/sessions/2026-05-28--ambiguity-resolution.md`): identity
reconfirmed as build-to-learn (Q6); cluster card count = 3 lead +
4 tier tiles (Q1); `mathematical-guides` placement = sub-entry
under `books-and-guides` (Q2); insurance/stats positioning = deeper
pages only (Q5); SSM explainer framing (Q3).

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
- **Portfolio-candidate inventory + clone gap** (2026-05-28, separate
  follow-on after the backlog audit): cross-account GitHub + local-only
  work survey produced cluster-placement recommendations for Phase 5
  plus a proposed 4th cluster (`research-infrastructure` anchoring
  `research-kb` + `research-agent`). 8 missing-from-local repos cloned
  to `~/Claude/<name>/`. 4 ambiguities flagged in the prior audit's
  session log now resolved with local-repo evidence (notably:
  `prompt-injection-detection-prototype` is a SIBLING of, not a
  replacement for, the featured `prompt-injection-detector`; and
  `claude-books/handbook` puts `claude-best-practices` on a defined
  sunset path rather than orphan-legacy). See
  `docs/sessions/2026-05-28--portfolio-candidates.md`.

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

## Decisions Locked (Phase 2 follow-on, 2026-05-28)

Closed via 4 sequenced `/exploring-options` rounds. See
`docs/sessions/2026-05-28--ambiguity-resolution.md` for full
audit-trail + reasoning per decision.

| # | Decision | Choice |
|---|---|---|
| Q6 | Identity reconfirm | Build-to-learn framing preserved; research-infrastructure stays as secondary (tier) cluster, not lead identity shift. |
| Q1 | Homepage cluster shape | 3 lead cards (causal-methods / ai-evaluation / course-notes) preserved + 4 tier tiles in Future strip (`tools`, `books-and-guides`, `pricing-decision-systems`, `research-infrastructure`). |
| Q2 | `mathematical-guides` placement | Sub-entry under `books-and-guides` cluster page. Deployment to `mathematical.brandon-behring.dev` proceeds independently via existing `wrangler.toml`. |
| Q5 | Insurance/stats positioning | Deeper pages only (Phase 2 lock preserved); no homepage proof strip. Risk-analysis topical framing OK in About; insurance examples surface naturally in demos + cluster pages. |
| Q3 | SSM flagship-demo framing | Explainer first ("Why discretization matters for sequence models"); visualizer style (stability-region vs symplectic) deferred until explainer ships. |

See `~/.claude/plans/examine-the-backlog-and-snappy-castle.md` for the
prep plan that catalogued the 6 ambiguities and recommended the
resolution sequence.

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
- [~] **A4. First demo to build.** Live at `/lab/research-graph/` —
  interactive citation graph (Cytoscape.js + fcose) fed by `research-kb graph
  export` + `rl_and_control/scripts/build_graph_export.py`. **Densified
  2026-05-25 to 95 nodes / 51 edges**; titles/years/authors repaired to real
  arXiv data in Track 1.5 (`scripts/enrich-citation-graph.mjs`). Cosmetic
  follow-ups F1 (favicon) + F2 (Cytoscape `hsl()`) resolved 2026-05-28.
  **Clean densification remaining** is blocked on `research-kb#20` (junk
  metadata) → `#16` (transactional rebuild).
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
  deploys. Mechanical 10-line workflow + secrets. *(Also in Quick wins.)*
- [ ] **B2. Migrate `dlai-study-notes`** — currently on Cloudflare Pages.
  Higher-risk because of the documented 2–5 s domain switchover. Do
  during low-traffic window. Worker name: `brandon-behring-study-notes`.
- [ ] **B3. Migrate `book-template-astro`** — currently Pages. Same
  pattern as B2 but no live audience; safer order is B1 → B3 → B2.
- [x] **B4. Tag `deploy-workflows@v1`** — ✅ done (2026-05-26): `@v1` +
  `@v2` tagged; 3 consumers (brandon-behring.dev, DML, ssm) pinned to `@v1`.
- [x] **B5. ~~GitHub Organization~~ — DEPRECATED** (scrapped 2026-05-26):
  solo-dev convention favors personal-account-as-namespace; URL stability +
  migration/redirect risk outweigh the ~2 min saved on unified org secrets.
  See `[[cloudflare-account]]`.
- [ ] **B6. Optional: `astro-cf-template`** — GitHub template repo with
  pre-wired `wrangler.jsonc` + caller workflow. "Use this template" →
  ready-to-deploy new site.
- [ ] **B7. Optional: Custom-domain API automation** — add `custom-domain`
  input to the reusable workflow; eliminates the one-click dashboard step.

## Track C — Showcase Inputs (adjacent active work)

Other repos that affect *what* this site can show or what story it can
tell. Not planned here; informs Track A decisions.

> **Per-project status — clusters, versions, open-issue counts, the
> featured flag — is authoritative in `src/data/projects.json`** (23
> projects across 8 clusters as of 2026-06-01) **plus live GitHub issues.**
> This section is a *strategy snapshot* (showcase judgments + blockers that
> live nowhere else), **not a live registry** — don't trust counts/versions
> here; reconcile against those sources (and §"Remaining work — all tiers (index)" +
> the board). See `[[roadmap-drifts-from-projects-json]]`.

**Showcase judgments not captured in `projects.json`:**

- **`prompt_injection_detector`** — high showcase value: concrete artifact +
  metrics + clear PoC caveats. Path: finalize, then archive.
- **`post_transformers`** — future-facing identity signal, largest content
  surface. **Blocked by `post_transformers#51`** (eval-toolkit BREAKING;
  gates the ssm pin bump).
- **`book-scaffold-astro`** — "publishing system" cluster carries a
  *tooling-for-tooling* risk (per the strategy memo); needs a clear
  "why this matters" story, not just "I built a scaffold."
- **`research-kb` / `research-agent`** — research-infrastructure cluster;
  niche audience, explainer required. research-kb feeds `/lab/research-graph/`.
- **`eval-toolkit`** — evaluation-methodology cluster; complements
  `prompt_injection_detector`. Pre-v1.0 (Decision Y.2 is the v1.0 stop-gate).
- **`causal_inference_mastery` / `bayesian-cold-start`** — dormant but
  reference-quality; methodological-depth + actuarial-bridge proof, safe to cite.

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

## Phase numbering: site ↔ portfolio

Two planning docs use overlapping phase numbers for different work. This
doc (`roadmap.md`) numbers **site** phases; the coordinated multi-repo plan
(`~/.claude/plans/i-want-to-look-streamed-pebble.md`) numbers **portfolio**
phases. They align on most labels but **collide on Phase 2** — disambiguate
via this table, don't assume the numbers match.

| Site (this doc) | Portfolio (coordinated plan) | State |
|---|---|---|
| Phase 1 — site live + deploy workflow | Phase 1a–1e (deploy infra) + 1.5 (`/how-this-was-made`) | shipped |
| **Phase 2 — identity lock + homepage** | *no equivalent* — portfolio **Phase 2 = DEPRECATED** post_transformers migration | ⚠ collision |
| Phase 3 — dlai deploy | Phase 3 — dlai deploy | aligned, pending |
| Phase 4 — guides migration | Phase 4 — guides migration | aligned |
| Phase 5 — tier clusters | Phase 5 — tier clusters + quick wins | aligned, shipped |
| Phase 6a — Provenance component | Phase 6a — Provenance component | aligned, shipped |
| — | Phase 6-pre / 6b–6e / 7 / 8 / 9 / 9.5 | portfolio-only (scaffold / infra / future) |

No renumbering: session logs and commits reference these labels by name; the
namespace + this table disambiguate without breaking that history.

## Cross-references

- Authoritative strategy: `docs/website-decision-map.md`.
- Authoritative infra: <https://github.com/brandon-behring/deploy-workflows#phase-2-roadmap>.
- Live site: <https://brandon-behring.dev>.
- Setup walkthrough (Cloudflare credentials): `docs/cloudflare-setup.md`
  (currently a local working note; commit if it proves useful for sibling
  sites).
