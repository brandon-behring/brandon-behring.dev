# Portfolio Candidates Discovery Session (2026-05-28)

A discovery-and-recommendation pass triggered by two requests:

1. "Look through all my remotes and work on this computer for things
   that should be considered for my website."
2. "Double check remotes for everything on git and see if there is
   anything there I mentioned earlier but also needs to be cloned
   locally if not there."

Follow-on to the same-day `2026-05-28--backlog-audit.md` (which
refreshed the strategic-impact ranking + GitHub hygiene). The audit
asked *what's the next move within the current backlog*; this session
asks *what should expand the backlog before next moves are chosen*.

## Scope

- **In scope**: cross-account GitHub repo inventory
  (`brandon-behring` + `brandonmbehring-dev`), local `~/Claude/` walk,
  cluster-placement recommendations against the Phase 5 plan, clone
  gap closure for repos Brandon explicitly mentioned + portfolio-
  relevant fresh repos
- **Out of scope**: `src/data/projects.json` edits (Brandon decides
  placements after reviewing cloned repos per Q1 hedge); cluster page
  authoring; `~/.claude/plans/i-want-to-look-streamed-pebble.md` edits
  (per Q4 deferral); ~25 older private archives not cloned
  (case-by-case); the F1+F2 cosmetic fixes; the 33 job-application
  dirs; the 145 frozen `course_learning` subdirs

## Output deliverables

1. This file — full audit-trail of the discovery + cluster
   recommendations + ambiguity outcomes
2. `docs/roadmap.md` — one-bullet pointer in "Discovered work surfaced
   2026-05-28" subsection
3. 8 local clones at `~/Claude/<reponame>/`:
   `mathematical-guides{,-transformers,-reinforcement-learning}`,
   `claude-books`, `guides`, `prompt-injection-detection-prototype`,
   `ir-eval`, `guides-experimentation`

## Method

Two parallel `Explore` agents:

- **Agent 1**: enumerated all repos on `brandon-behring` (21 PUB) +
  `brandonmbehring-dev` (20 PUB) via `gh api`; cross-referenced
  against the 9 currently-featured projects in `src/data/projects.json`
- **Agent 2**: walked `~/Claude/` (83 top-level entries); identified
  orphans (no git remote), unpushed work, hubs, frozen course sources

Then direct remote-vs-local verification (via `gh api user/repos` with
authenticated `/user` endpoint for full private visibility): 83 primary
account repos total (vs the 21 PUB that `users/<name>/repos` exposes).

Then 8-repo clone via `/usr/bin/git clone` (the `gh repo clone` flow
errored — see gotchas) and per-repo local analysis (README + CLAUDE.md
+ top-level `ls` + targeted reads of `wrangler.toml` /
`astro.config.mjs`).

## Decisions from the 2026-05-28 `/exploring-options` round (Q1–Q6)

| # | Decision | Outcome |
|---|---|---|
| Q1 | Cluster card count on homepage | **Option 3 (tier — 3 lead + new clusters folded)** — leaning; Brandon deferred final commitment until after the clone + analysis. **OPEN.** |
| Q2 | Clone scope | **Option 2 (5 mentioned + 3 portfolio-relevant fresh = 8 total)** |
| Q3 | Post-clone analysis depth | **Option 2 (quick + per-repo cluster-fit grounding)** |
| Q4 | Update canonical Phase 5 plan | **Option 3 (don't touch; Brandon updates after reviewing cloned repos)** |
| Q5 | Commit strategy | **Option 2 (two commits: audit → clones → discovery)** |
| Q6 | Session log structure | **Option 1 (full 11-section audit-trail)** |

## Currently featured baseline

9 projects across 4 cluster slugs in `src/data/projects.json`:

- `causal-methods` (3): `causal_inference_mastery`, `double_ml_time_series`, `temporalcv`
- `ai-evaluation` (3): `prompt-injection-detector`, `eval-toolkit`, `prompt-injection-portfolio`
- `course-notes` (1): `dlai-study-notes` (no repo URL yet — Phase 3 deploy candidate)
- `future` (2): `rl_and_control`, `ssm-foundations`

Homepage renders 3 lead cluster cards (Causal Methods / AI Evaluation /
Course Notes) + a "Future direction" section. The `future` cluster is
the de-facto staging area for in-progress work.

## Recommended cluster additions

Confidence rubric (made explicit since the rating drives placement
calls):

- **HIGH** = deployed (or shipping as a CLI), clear README framing,
  active recent commits, and clear portfolio narrative fit
- **MEDIUM** = strong work but missing one of: deployment-state /
  clear framing / clear cluster home
- **LOW** = reference-quality or dormant or unclear fit; surface only
  if Brandon picks the matching narrative

Cluster placements assume **Q1 = Option 3 (tier)** framing: the 3
existing lead cards stay; new clusters get compact tiles or fold into
Future direction. New cluster slugs still get full `/work/{slug}`
pages.

### Phase 5 cluster: `tools` (HOT)

- **`book-scaffold-astro`** (PUB, v4.6.0 npm) — **HIGH**. npm package
  powering DML + ssm + guides + claude-books + mathematical-guides.
  Local read confirms scaffold maturity (test count 222+, dogfood loop
  established). Anchor candidate for the cluster.
- **`deploy-workflows`** (PUB, `@v1` + `@v2` tagged) — **HIGH**.
  Reusable GitHub Actions workflow; 3 consumers pinned (already
  documented in roadmap.md Cross-repo coordination).
- **`runpod-deploy`** (PUB, 3 open issues) — **MEDIUM**. Config-driven
  RunPod orchestration. Fits the "infra-I-built-to-go-faster" cluster
  pattern but less central than book-scaffold / deploy-workflows.

### Phase 5 cluster: `books-and-guides` (HOT, mixed deploy states)

- **`guides`** (PUB, live at `guides.brandon-behring.dev`) — **HIGH**.
  Anchor. Hub repo for the interview-prep / DS-MLE-AI-Eng audience.
  Architecture A per the design doc: per-guide self-contained sibling
  repos with own companion Python package, capstone, ADRs, independent
  release cadence. Already deployed via Cloudflare Pages dashboard;
  Phase 1 deliverable is subroute proxy to pilot guides.
- **`guides-experimentation`** (PUB, Phase 0b) — **MEDIUM**. First
  pilot guide (A/B testing, sample size, CUPED, sequential testing).
  Repo skeleton + v0.2 schema extension + 00-introduction stub +
  capstone deferral ADR. Phase 1 (Q3–Q4 2026) target for full
  16-chapter MDX. Will deploy to `guides.brandon-behring.dev/experimentation/`
  via hub subroute proxy. Feature as "Pilot — in development".
- **`book-template-astro`** (PUB) — **MEDIUM**. "Agentic Coding:
  Principles and Practices" — Astro/MDX book on agentic coding;
  substantive long-form work using book-scaffold.
- **`claude-books`** (PRV, Phase 0 handbook) — **LOW (defer until v1.0)**.
  Workspace with 4 planned members (handbook, architect-reference,
  field-guide, glossary). Handbook is rewrite of `claude-best-practices`
  v2.9 (LaTeX, being sunset); field-guide is rewrite of
  `claude-code-field-guide`. Not portfolio-ready until handbook ships
  v1.0. **Implies the `claude-best-practices` LaTeX repo is on a
  defined sunset path**, not orphan legacy — important for portfolio
  narrative.

### Phase 5 cluster: `pricing-decision-systems` (DORMANT flagship)

- **`annuity-pricing`** (PUB, primary; also on secondary) — **HIGH**.
  Flagship. Dormant ~40d; needs `site_url` + screenshots to be
  portfolio-ready. The Phase 9 plan in the canonical coordinated plan
  covers expansion; this audit doesn't pre-empt that.
- **`AnnuityCore.jl` / `AnnuityProducts.jl` / `AnnuityData.jl`**
  (secondary-account Julia stack) — **MEDIUM**. Siblings; Phase 9.5
  Julia registration gates discoverability per coordinated plan.
- **`insurance-ai-toolkit`** (PUB, 9 open issues, active) — **MEDIUM**.
  VM-21 + lapse modeling.
- **`TemporalValidation.jl`** (secondary, dormant) — **LOW** unless
  surfacing the cross-domain Julia angle.

### NEW cluster: `research-infrastructure` (per audit Q2)

This is the 4th new cluster from this round's Q2 decision — Brandon's
Q1 hedge defers its homepage prominence.

- **`research-kb`** (PUB, 5 open issues) — **HIGH**. Anchor. Hybrid
  search KB (BM25 + vector + graph + citation) with 22 MCP tools;
  matcher unblock landed 2026-05-25 (`6fcf97f`). Feeds the
  `/lab/research-graph/` demo on `brandon-behring.dev`.
- **`research-agent`** (PUB) — **HIGH**. LangGraph multi-agent
  research QA pipeline on top of research-kb.
- **`research_toolkit`** (PUB, 7 open issues) — **MEDIUM**. Skill
  collection for systematic research workflows in Claude Code. Could
  live in `tools` instead; recommendation: this cluster, to keep
  `tools` focused on deploy-shaped utilities.

**Strategic flag**: positions Brandon as "research-infrastructure
builder" — a distinct identity signal from the locked Phase 2
"build-to-learn engineer" framing. Worth a strategic check against
`docs/website-decision-map.md` before going live with this cluster as
a homepage tile.

### Existing cluster expansion: `ai-evaluation` (RECENT)

- **`ir-eval`** (PUB, CLI/Python package) — **HIGH**. Statistical
  retrieval evaluation framework with golden-set metrics, paired
  stats, bootstrap CIs, drift detection. CI/CD focus ("ranx is for
  papers; ir-eval is for CI/CD pipelines"). Not a deployed web
  product — a library product. Direct feature-table comparison vs
  RAGAS / DeepEval / ranx in README.
- **`prompt-injection-detection-prototype`** (PUB) — **HIGH**.
  Methodology-focused OOD-generalization study. Deployed docs at
  `brandon-behring.github.io/prompt-injection-detection-prototype/`.
  CI passing. WRITEUP_PAPER.md (IMRAD) + WRITEUP_NARRATIVE.md.
  Concrete bottom-line finding: cross-family generalization fails
  even for the best in-house detector (0.364 pooled-OOD AUPRC vs
  0.374 random floor; LoRA + TF-IDF land *below* the 0.5 AUROC floor
  on cross-family slate). **This is a SIBLING of, not a replacement
  for, the already-featured `prompt-injection-detector`** — different
  question, different artifact shape. See "Ambiguity resolution
  outcomes" below.
- **`llm-eval`** (PUB) — **MEDIUM**. LLM/judge calibration + drift on
  judge outputs. Pairs with ir-eval.

### Existing cluster expansion: `causal-methods` (LOW priority)

- **`TemporalCrossValidation.jl`** (secondary, dormant) — **LOW**.
  Julia companion to the already-featured `temporalcv`. Only feature
  if you want to surface the secondary-account Julia stack
  cross-domain.

## Ambiguity resolution outcomes

The 4 ambiguities flagged in the prior plan's session log are now
resolved with local-repo evidence:

1. **`prompt-injection-detection-prototype` vs `prompt-injection-detector`**:
   **RESOLVED — they are SIBLINGS (different artifacts).** The
   detector (already featured) is a DeBERTa-LoRA PoC focused on
   detection methodology with bootstrap CIs on lift. The prototype is
   a cross-family OOD-generalization study with a paper-shaped
   artifact (Quarto, WRITEUP_PAPER.md + WRITEUP_NARRATIVE.md), CI
   green, deployed docs. Bottom line: the prototype is the "do
   detectors generalize?" follow-up question, not a rewrite. Both
   belong in `ai-evaluation` cluster.
2. **`mathematical-guides` family deploy intent**:
   **RESOLVED — deploy-configured, not yet deployed.** Hub
   `wrangler.toml` confirms Cloudflare Pages config; comment notes
   target is `mathematical.brandon-behring.dev` (still flagged as
   "open item: confirm/adjust"). Hub README: status "hub scaffolded".
   Siblings are skeletons deploying to `/transformers/` and
   `/reinforcement-learning/` subroutes under the hub. Placement
   question (audit Q4 from prior session) **still hedged** — local
   evidence confirms deploy-intent but doesn't resolve homepage
   strategy.
3. **`claude-books/handbook` sunsets `claude-best-practices`**:
   **RESOLVED — yes, on a deliberate sunset path.** claude-books
   README: "rewrite of `claude-best-practices` (LaTeX, v2.9 sunset)"
   and explicitly: "The LaTeX repos are drafts, not sources of
   truth — each is archived on GitHub when its successor ships
   v1.0." So `claude-best-practices` ≠ legacy orphan; it's queued for
   archive once `claude-books/handbook` ships v1.0. Implication: do
   NOT feature `claude-best-practices` on the website; cite
   `claude-books/handbook` as the successor when it ships.
4. **`ir-eval` deployment + framing**:
   **RESOLVED — ships as a CLI/Python package, not a deployed
   webapp.** Framing: "Statistical retrieval evaluation framework
   with golden-set metrics and drift detection." Positioning vs ranx
   ("ranx for papers, ir-eval for CI/CD pipelines"). Feature
   comparison table vs RAGAS, DeepEval, ranx. Confidence HIGH for
   ai-evaluation cluster.

Outstanding ambiguities NOT resolved by this pass:

- **`mathematical-guides` family placement on the website** — local
  evidence is now richer, but homepage strategy still depends on Q1
  cluster-card-count decision
- **`TemporalValidation.jl` ↔ local `TemporalValidation` directory**
  naming mismatch (primary remote is `TemporalValidation.jl` per
  `gh api`, but local dir is `TemporalValidation` without `.jl`).
  Could be the same repo cloned with stripped suffix, or different
  artifact. Not blocking; flagged for case-by-case investigation.
- **`post-transformers` (hyphenated)** vs `post_transformers`
  (underscored) — separate private remotes. Not blocking; the
  underscored version is the active research repo per memory.

## Clone gap analysis

### Cloned in this pass (8)

| Repo | Visibility | Last pushed | Local at |
|---|---|---|---|
| `mathematical-guides` | PRV | 2026-05-28 | `~/Claude/mathematical-guides/` |
| `mathematical-guides-transformers` | PRV | 2026-05-28 | `~/Claude/mathematical-guides-transformers/` |
| `mathematical-guides-reinforcement-learning` | PRV | 2026-05-28 | `~/Claude/mathematical-guides-reinforcement-learning/` |
| `claude-books` | PRV | 2026-05-28 | `~/Claude/claude-books/` |
| `guides` | PUB | 2026-05-25 | `~/Claude/guides/` |
| `prompt-injection-detection-prototype` | PUB | 2026-05-27 | `~/Claude/prompt-injection-detection-prototype/` |
| `ir-eval` | PUB | 2026-05-01 | `~/Claude/ir-eval/` |
| `guides-experimentation` | PUB | 2026-05-24 | `~/Claude/guides-experimentation/` |

### Remote-only repos still NOT local (~22)

Primary account, all PRIVATE unless noted. Mostly older actuarial,
elasticity, and iteration archives — not blocking for portfolio:

- `causal-inference-educational` (2026-04-01)
- `post-transformers` (2026-03-24, hyphenated; separate from
  `post_transformers`)
- `rila-price-elasticity`, `RefSnap_prototype`, `presentation-tools`,
  `oscar_health_case_study` (all 2026-03-09)
- `myga-rate-response`, `myga-forecasting-v4`, `myga-forecasting-julia`,
  `myga-elasticity` (all 2026-03-09; `myga-elasticity-v2` IS local)
- `glider-practice`, `flashcard-generator`, `fia-price-elasticity`,
  `engineering-patterns`, `concentrate-exercise`,
  `concentrate-ai-submission`, `concentrate-ai-brandonb`, `cfa_learning`,
  `causal_crew` (all 2026-03-09)
- `annuity-price-elasticity-v3`, `annuity-price-elasticity-v2`,
  `annuity_forecasting`, `AIC_python`, `agile_claude_templates`,
  `agentic_ai_portfolio`, `ActuarialTools` (all 2026-03-09)

Plus the secondary-account mirrors (mostly redundant) and a few
secondary-only repos (`engineering-patterns`, `concentrate-exercise`,
`causal_crew`, `actuarial_tools`).

Recommendation: leave these uncloned. Case-by-case when Phase 9
expansion (annuity cluster) or a specific narrative need triggers.

## Local-only finds (narrative candidates, not direct projects.json
adds)

These don't fit projects.json directly but are notable for the
portfolio narrative — blog posts, methodology pages, or "evidence of
discipline" framing.

### The 22 `research-*` dogfooding orphans

A pattern Brandon's been running: each substantive research subject
gets its own local dogfooding sandbox to validate `research_toolkit`
+ `research-agent` claims before shipping. Examples surfaced:

- `research_agent_capabilities_scaling` (2026-05-20) — QA on agent
  emergent capabilities; cross-family claim synthesis
- `research_pi_attacks_defenses` (2026-05-08) — 40–60 verified primary
  sources across 6 sub-areas (direct injection, indirect, optimization-
  based, defenses, training-time alignment, threat models)
- `research_causal_inference_ml` (2026-05-20) — slow-moving subject
  validation
- `research_calibration_methods_dogfood_2026-05-08`, `research_encoder_lora`,
  `research_eval_drift`, `research_ood_methodology`, `research_peft`,
  `research_rlhf`, `research_pi_benchmarks`, `research_pi_datasets`,
  `research_corpus_inventory`, `research_corpus_inventory_datasets`,
  `research_detector_architectures`, `research_problem_framing`,
  `research_reference_detectors`, `research_reference_detectors_datasets`,
  `research_rlhf_datasets`, `research_time_series_anomaly`,
  `research_toolkit_design`, `research_browser_agent_pi_bench`,
  `research_cache`

**Portfolio value**: invisible QA discipline proving public claims
(research-kb / research_toolkit). Don't feature individually; cite
collectively in a methodology page under the `research-infrastructure`
cluster — something like "how validation works on
research-infra" — once that cluster ships.

### `lever_of_archimedes` ([HUB])

Production hub coordinating ~80 local projects (RAG context
aggregation, health monitoring, shared patterns: NEVER FAIL SILENTLY,
fail-fast, immutability-by-default). Likely too internal to feature
directly; the *patterns* abstract into a public "workspace patterns"
guide or blog post candidate. The PRV remote was created
2026-05-25 — confirmation that this is no longer purely local.

### `audit-templates/audit-prompt.md` ([DOSSIER])

Single 13KB artifact (2026-05-24): polished cross-LLM independent
review prompt designed to catch subtle bugs by leveraging different
LLM reasoning traces and corpora. Atomic — single blog post or tool
guide candidate.

### Local `prompt-injection-classifier` PoC ([ORPHAN])

Local-only structured PoC (2026-05-08) for binary prompt-injection
detection. Already migrated patterns to `eval-toolkit v0.7.0`.
Inspect `git diff` for ship-readiness; if nothing's left, retire.

## Skip list

Confirmed noise / not portfolio-worthy:

- 33 `~/Claude/job_applications/*` dirs — career logistics
- 145 `~/course_learning/` subdirs — frozen LaTeX sources serving as
  source material for public books (e.g., `transformer_mathematics`
  feeds `mathematical-guides-transformers`)
- Secondary-account mirrors of primary repos (`causal_inference_mastery`,
  `research-kb`, `research-agent`, `temporalcv`, `llm-eval`, `ir-eval`,
  `insurance-ai-toolkit`) — primary is canonical
- Prompt-injection iteration branches (`prompt-injection-v3`, `v4`,
  `v5`, `sdd`, `prompt-injection-clean`) — only final versions go
  public
- Profile-README repo (`brandonmbehring-dev/brandonmbehring-dev`)
- Forks (none confirmed in this scan; flagged for review case-by-case)

## Gotchas

1. **`gh repo clone` errors silently in this shell environment**:
   "warning: templates not found in /usr/share/git-core/templates" +
   "git: 'remote-https' is not a git command" + exit 128. The snap-
   bundled gh ships its own git binary that lacks `remote-https`
   helper. Workaround: use system `/usr/bin/git clone` with the HTTPS
   URL — the credential helper at `~/.gitconfig` still routes to
   `gh auth git-credential`, so authentication works transparently
   for private repos.
2. **`gh repo view --json` returns exit 1 silently** (carried from
   the prior audit's gotchas). `gh api repos/<...>` works.
3. **`gh api users/<name>/repos` only exposes PUBLIC repos** (21 on
   primary account); private requires the authenticated `/user/repos`
   endpoint or appropriate token scope. The first agent pass under-
   counted; the direct verification surfaced 83 primary repos total
   (62 private archived/iteration repos).
4. **Secondary-account auth-switch** preserved (active account
   restored to `brandon-behring` after enumeration).
5. **Related-Books hook surfaced book references as expected
   noise**: Bertsekas RL/Optimal Control (2019), Hunt & Thomas
   *Pragmatic Programmer* (2019), Koller & Friedman PGM (2009),
   "Looks Good to Me" — all reading sources, not repos. No action.
6. **Naming mismatches worth eventually disambiguating**:
   - Remote `TemporalValidation.jl` vs local `TemporalValidation` (no
     `.jl` suffix)
   - Remote `post-transformers` (hyphenated, 2026-03-24, PRV) vs
     local + remote `post_transformers` (underscored, active research)
   - Remote `myga-elasticity` (PRV) vs local + remote
     `myga-elasticity-v2`
   - Remote `claude-best-practices` (PRV) vs local
     `claude-best-practices` (same — already covered by
     claude-books sunset plan)
7. **`gh repo view --json` brokenness is consistent in this snap
   environment** — flagged previously, encountered again. The
   workaround pattern (`gh api ... | jq`) is reliable.

## Next actions

For Brandon to resolve before `src/data/projects.json` updates:

- **Decide Q1 cluster-card count** on homepage (3 lead + tier vs grow
  to 7 vs other) — analysis is now grounded in local repo content
- **Resolve `mathematical-guides` family placement** (supplement
  under `guides`? own subdomain `mathematical.brandon-behring.dev` per
  the wrangler.toml note? own cluster? defer?) — placement Q from prior
  audit Q4 still hedged; local evidence confirms deploy-intent
- **Update canonical Phase 5 plan** at
  `~/.claude/plans/i-want-to-look-streamed-pebble.md` per audit Q4
  deferral — at minimum, add the 4th `research-infrastructure`
  cluster + the discovered claude-best-practices sunset path
- **Update `src/data/projects.json`** with the HIGH-confidence
  additions matching the cluster decisions: `book-scaffold-astro`,
  `deploy-workflows`, `guides`, `annuity-pricing`, `research-kb`,
  `research-agent`, `ir-eval`, `prompt-injection-detection-prototype`
- **`prompt-injection-detection-prototype` projects.json entry** —
  now disambiguated as a sibling of the existing
  `prompt-injection-detector`; needs its own slug + summary; suggested
  framing: "OOD-generalization methodology study; cross-family failure
  finding"
- **Confirm `mathematical.brandon-behring.dev` subdomain** if going
  with hub deployment (wrangler.toml comment flags it as open)
- **`TemporalValidation.jl` ↔ local `TemporalValidation` naming
  mismatch** — single `ls` + `git remote -v` check to confirm same
  repo vs different artifact

For follow-up sessions (not blocking):

- Inspect the local `prompt-injection-classifier` PoC for ship-ready
  changes vs already-migrated-to-eval-toolkit; retire if nothing left
- Sketch a `research-infrastructure` cluster page that cites the 22
  `research-*` dogfooding orphans collectively (no individual featuring)
- Decide whether `claude-best-practices` link in projects.json (if any)
  redirects to `claude-books/handbook` once it ships v1.0
- Run `git remote -v` on the cloned 8 to confirm origin URLs point to
  the canonical `brandon-behring/` remotes (vs any accidental
  brandonmbehring-dev fork)

## What this archive deliberately drops

- Per-repo `gh api` raw JSON output — synthesized into the cluster
  groupings + clone-gap table
- The 22 `research-*` dogfooding dir contents (only the pattern matters;
  individual READMEs aren't load-bearing for portfolio decisions)
- Full `course_learning` enumeration (145 dirs — the pattern matters,
  not the detail)
- Verbatim chat exchange from the 6-question `/exploring-options`
  round (decisions are above; the full back-and-forth lives in
  conversation history + `~/.claude/plans/examine-the-backlog-and-snappy-castle.md`)
- The discovery agents' raw output (synthesized into "Recommended
  cluster additions" + "Local-only finds" + "Skip list")
- Per-repo line-by-line README detail — top-30-line characterization
  is enough for placement decisions; full audits live with each repo's
  own session logs
