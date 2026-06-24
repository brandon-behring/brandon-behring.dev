# Portfolio Website Decision Map

Status: planning memo  
Audience: Brandon Behring and future implementers  
Primary near-term goal: technical hiring  
Long-term goal: expandable research and personal hub

This document maps the decisions needed before redesigning
`brandon-behring.dev`. It is intentionally not a final design spec. The site
should not lock into a past-facing identity too early. It should show credible
past proof, current artifacts, and future research direction without making the
homepage feel like several unrelated portfolios.

## Current Baseline

> **Frozen at planning time (pre-2026-05-28 identity lock; banner added
> 2026-06-11).** "Current" below describes the site as it stood when this memo
> was written. Live site shape → <https://brandon-behring.dev> +
> `src/data/projects.json`.

The current site is a small Astro static portfolio:

- Stack: Astro static site with project data in `src/data/projects.json`.
- Shape: one homepage with hero, about, selected work, and contact.
- Current public positioning: applied mathematician; AI safety evaluation, LLM
  systems, causal inference, probability, statistics, and risk.
- Current project surface: Prompt Injection Detector, DLAI Study Notes Corpus,
  Applied Causal Inference, and Bayesian Cold-Start.
- Good default constraint: keep the site fast, readable, and maintainable before
  adding interactive demos.

## Decisions Locked

- Writing voice: technical memo, evidence-heavy but readable.
- Primary near-term goal: technical hiring.
- Long-term goal: expandable research and public hub.
- Lead identity: **ratified 2026-06-23 — *Applied-math rigor for auditable AI*** (a
  rigor/auditability-led bridge; the live hero — see the 2026-06-23 audit re-score in
  [`sessions/2026-06-23--longterm-plan-audit.md`](sessions/2026-06-23--longterm-plan-audit.md)).
  This **supersedes** the 2026-05-28 *Framing 4 / build-to-learn* lock (decided in
  [`sessions/2026-05-28--ambiguity-resolution.md`](sessions/2026-05-28--ambiguity-resolution.md);
  itself superseding the original "intentionally undecided"), which the site outgrew at the A7 redesign.
- Portfolio organization: narrative clusters, not a repo-by-repo catalog.
- Demo posture: interactive demos are worth considering, but project pages
  should be the first home for demos.
- `post_transformers` positioning: future-facing research signal, especially the
  math-to-AI bridge. **Resolved 2026-06-22:** its public surface is `ssm-foundations` (homed on the
  `/research` hub); `post_transformers` itself stays GitHub-only. See roadmap A2.

## Time Horizons

| Horizon | What it proves | Examples | Risk if overweighted |
|---|---|---|---|
| Past proof | Real production judgment, applied math, stakeholder translation, actuarial/insurance depth | production modeling, underwriting automation, annuity pricing, temporal validation, causal methods | Site can read as only insurance or only past work |
| Present artifacts | Shipping discipline, public code, evaluation rigor, learning systems | prompt-injection evaluation, DLAI notes, `eval-toolkit`, `book-scaffold-astro`, `research-kb` | Site can feel like a pile of projects without a thesis |
| Future direction | Where the work is going next | post-transformers, math-to-AI research, AI evaluation methodology, research infrastructure | Site can sound aspirational if not anchored in artifacts |

The homepage should eventually combine all three, but the first redesign should
avoid choosing a final identity before the cluster audit is complete.

## Past Evidence vs Future Direction

Use this table to evaluate candidate identity framings. The final site can blend
them, but each framing has different tradeoffs.

| Framing | Highlights | Hides or weakens | Best audience | Supporting pieces | Main risk |
|---|---|---|---|---|---|
| Applied mathematician who builds AI systems | Mathematical depth, production modeling, probability, causal/statistical rigor, modern AI systems | May understate research ambition if examples skew insurance-heavy | Staff IC, applied scientist, ML engineer, technical hiring manager | production models, causal/time-series repos, prompt-injection evaluation, post-transformers | Sounds broad unless the homepage gives concrete evidence fast |
| AI evaluation and safety methodology builder | Prompt-injection work, `eval-toolkit`, confidence intervals, calibration, leakage checks, stopping rules | Can hide actuarial, math, and publishing-system breadth | AI safety teams, eval teams, LLM platform teams | prompt-injection detector/showcase/portfolio, `eval-toolkit` | Can imply security-product claims if caveats are sloppy |
| Research engineer translating math into modern AI architectures | Future-facing identity, numerical analysis, dynamical systems, SSMs, Mamba, DeltaNet, linear attention | May underplay production business judgment | AI research engineering, frontier-model infrastructure, applied research roles | `post_transformers`, JAX/Julia experiments, notebooks, benchmarks, guide | Needs careful explanation for visitors who do not know SSMs |
| Learning systems and research-infrastructure builder | DLAI notes, book scaffold, research-kb, public guides, tooling, reusable workflows | Can look like tooling for tooling's sake | Developer education, research tooling, platform teams | `dlai-study-notes`, `book-scaffold-astro`, `research-kb`, `claude-books` | Needs a clear "why this matters" story |
| Insurance/applied modeling expert expanding into AI research | Domain credibility, production maturity, actuarial/math edge, real business constraints | Can pigeonhole the site into insurance roles | Insurtech, actuarial modeling, applied ML, financial services | Bayesian cold-start, insurance AI toolkit, annuity repos, causal/time-series work | Must avoid proprietary details and avoid making the whole site feel backward-looking |

Working rule: the site should show "where I am going" without pretending the
future work has the same maturity as past production work.

## Content Architecture Options

| Option | Description | Pros | Cons | When to choose |
|---|---|---|---|---|
| Bridge narrative | One umbrella story: applied math rigor turned into AI evaluation, learning systems, and research infrastructure | Avoids siloing, strong for hiring, lets past and future reinforce each other | Harder copywriting; weak if the hero sentence gets too abstract | Best default for the next redesign |
| Three pathways | Homepage routes visitors into AI safety, math/research, and learning systems | Clear visitor choice, lets each path keep its own voice | Can feel like three separate people if the shared thesis is weak | Use if project pages become deep enough to justify tracks |
| Role-based pages | Separate pages for hiring, research, and personal/project browsing | Lets each audience get the right density | More maintenance and possible duplication | Use later if the site gets real traffic from different audiences |
| Signature work lead | Lead with one unusually deep artifact, likely `post_transformers` or prompt-injection evaluation | Memorable, distinctive, coherent | Can overfit to one audience and hide breadth | Use if one project becomes clearly strongest by the scoring rubric |

## What I Can Show, What I Should Lead With, Where I Am Going

| Category | Purpose | Candidate content | Homepage treatment |
|---|---|---|---|
| What I can show | Inventory of credible artifacts | repos, guides, figures, notebooks, PDFs, tests, demos, published packages | Do not show everything; cluster it |
| What I should lead with now | Technical hiring signal | 3 to 5 strongest clusters with concrete evidence | Above-the-fold thesis plus selected proof cards |
| Where I am going | Future research identity | post-transformers, AI evaluation methodology, research-kb, long-form technical guides | A visible but grounded "current direction" section |

## Showcase positioning (durable — not status)

Timeless positioning guidance (relocated from roadmap Track C, 2026-06-04). These are
*judgments*, not live state — for current per-repo status/versions go to the
[board](https://github.com/users/brandon-behring/projects/1) + each repo.

- **`book-scaffold-astro` / publishing infra** — carries a *tooling-for-tooling* risk:
  needs a clear "why this matters" story, not just "I built a scaffold."
- **`research-kb` / `research-agent`** — research-infrastructure: niche audience, an
  explainer is required for it to read as a strength. research-kb feeds `/lab/research-graph/`.
- **`causal_inference_mastery`** — dormant but reference-quality; methodological-depth +
  actuarial-bridge proof, safe to cite.

## Portfolio Cluster Audit

> **⚠ Frozen scoring artifact — do not read the counts below as current.** This cluster
> audit was the *input* to the identity-scoring decision, then **closed** (Framing 4 /
> build-to-learn locked; see
> [`sessions/2026-05-28--ambiguity-resolution.md`](sessions/2026-05-28--ambiguity-resolution.md)) —
> **since superseded 2026-06-23** → *Applied-math rigor for auditable AI* (see "Decisions Locked" above).
> Every evidence count, version, and status below is **frozen at scoring time and not
> maintained** — treat this like a dated session log, not live context. For current state,
> go to the repos + the [board](https://github.com/users/brandon-behring/projects/1). Per
> [`DOC-CONVENTIONS.md`](DOC-CONVENTIONS.md), nothing below is a pointer to current truth.

Score clusters on capability signal, evidence strength, future relevance, demo
potential, maturity, maintenance cost, and privacy risk. Do not choose the final
homepage lead until this audit is complete.

### 1. Post-Transformer / Mathematical AI Research

Positioning: future-facing signature research signal.

Capability signal:

- Translates numerical analysis and dynamical systems into modern AI
  architecture questions.
- Connects discretization, stability, Lyapunov exponents, online learning, and
  structured sequence models.
- Shows ability to learn frontier-adjacent AI architecture material in a
  rigorous, artifact-producing way.

Evidence strength:

- Published public guide with 6 current chapters out of a 21-week curriculum.
- Public chapters cover JAX primitives, Flax training, S4/HiPPO, S4D, Hyena,
  and Delta-rule/online learning.
- Includes notebooks, SVG figures, JAX experiments, Julia tests, benchmark
  baselines, research dossier, and a status snapshot.
- Local status snapshot reports 339 Python/JAX tests, Julia tests, a 147-page
  guide PDF, 10 architecture families, and 163 dossier entries.

Future relevance:

- Very high. This is the clearest signal that the site is not only about past
  insurance or actuarial work.
- Best used to communicate: "I bring applied math and numerical analysis to AI
  systems that are normally discussed empirically."

Demo options:

| Demo | Tag | What it would show | Pros | Roadblocks |
|---|---|---|---|---|
| Operator-family map | assemble from current artifacts | SSMs, Mamba, Hyena, DeltaNet, xLSTM, RWKV, Titans, hybrids, and how they relate | Makes a niche field legible fast | Needs careful simplification |
| Stability-region visualizer | requires new build | explicit vs implicit update intuition, DeltaNet vs Longhorn stability | Distinctive math-to-AI demo | Needs UI and equation hygiene |
| Benchmark explorer | assemble from current artifacts | operator timing/memory baselines by shape and hardware | Concrete engineering proof | Avoid overclaiming benchmark generality |
| Figure gallery | exists now | existing SVG figures from chapters | Low maintenance, visual | Gallery alone may lack narrative |
| Notebook path | exists now | rendered notebooks by week | Shows real artifacts | Notebook UX can be heavy |
| "Why numerical analysis matters for SSMs" explainer | requires new build | one short interactive or illustrated page connecting integrators, stability, and sequence models | Strong lead-story candidate | Requires sharp writing |

Claim-safety notes:

- Do not present the guide as a finished textbook.
- Do not imply original invention of the architectures.
- Emphasize the distinctive synthesis and implementation angle: math-to-AI
  translation, not ownership of the underlying model families.

### 2. AI Safety and Evaluation

Positioning: evaluation methodology and statistical discipline for LLM safety.

Capability signal:

- Builds empirical evaluation workflows with baselines, confidence intervals,
  calibration, OOD slices, and anti-overengineering gates.
- Strong fit for AI safety, evaluation, and ML platform teams.

Evidence strength:

- Prompt-injection detector methodology PoC.
- Prompt-injection classifier showcase with DeBERTa-LoRA, baseline ladder,
  locked holdout, calibration artifacts, and model card.
- `eval-toolkit` as a reusable binary-classification evaluation harness.
- Prompt-injection portfolio as a broader, pre-alpha field log and future work
  surface.

Future relevance:

- High. Evaluation discipline connects directly to AI safety, AI product risk,
  and rigorous applied ML.

Demo options:

| Demo | Tag | What it would show | Pros | Roadblocks |
|---|---|---|---|---|
| Threshold simulator | requires new build | tradeoff between recall, false positives, and operating policy | Lets visitors reason with the model | Must avoid production-security framing |
| PR-AUC ladder | assemble from current artifacts | heuristic to LR to frozen encoder to LoRA lift | Clear methodology story | Needs caveats around dataset scope |
| Calibration view | assemble from current artifacts | reliability, ECE, temperature scaling | Shows statistical maturity | May be too technical without explanation |
| OOD slice explorer | requires new build | where models fail under distribution shift | Strong safety-eval story | Needs careful data/privacy review |
| Stopping-rule walkthrough | requires new build | when to add complexity and when to stop | Distinctive engineering judgment | Needs concise copy |

Claim-safety notes:

- Say "methodology proof-of-concept" or "showcase," not production detector.
- Do not imply broad prompt-injection protection.
- Avoid leaderboard framing unless the comparison protocol is explicit.
- Keep dual-use concerns visible for broader prompt-injection portfolio work.

### 3. Learning and Publishing Systems

Positioning: build-to-learn infrastructure and technical publishing systems.

Capability signal:

- Converts learning into durable, searchable, reproducible artifacts.
- Shows product taste for technical documentation, books, search, citations,
  math rendering, and reusable scaffolds.

Evidence strength:

- DLAI Study Notes: Astro/MDX corpus, Pagefind search, KaTeX, bibliography,
  Anki extraction, downloadable deck artifacts.
- `book-scaffold-astro`: npm package for long-form technical books with
  profile-aware pedagogy, citations, search, figures, and CLI tooling.
- `claude-books`: multi-book home (Architect's Reference, Agentic Systems Design,
  Glossary) on the scaffold; folds in the `book-template-astro` Agentic Coding book.

Future relevance:

- Medium to high. This supports the research-hub direction and gives the site
  a durable content system.

Demo options:

| Demo | Tag | What it would show | Pros | Roadblocks |
|---|---|---|---|---|
| Live book preview | exists now | published study notes or guide pages | Low effort, real artifact | Sends visitor away |
| Search demo | assemble from current artifacts | Pagefind corpus search | Shows product utility | Needs enough corpus content |
| TeX-to-MDX-to-Anki pipeline | assemble from current artifacts | source conversion through book output and deck extraction | Strong systems story | Needs diagram/screenshots |
| Scaffold consumer map | requires new build | how one package powers multiple books | Good package/product story | May be too meta for homepage |

Claim-safety notes:

- DLAI notes should be framed as personal notes and synthesis, not course
  replacement material.
- Respect content policy boundaries: no lab answers, quizzes, transcripts, or
  course-substitution framing.

### 4. Research Infrastructure

Positioning: tools for literature search, research memory, and agent-assisted
research workflows.

Capability signal:

- Builds infrastructure around research retrieval and knowledge organization.
- Bridges search, vector retrieval, graph search, citations, MCP tools, APIs,
  and dashboards.

Evidence strength:

- `research-kb` combines BM25, vector search, citation authority, and graph
  traversal, with CLI/API/dashboard/MCP interfaces.
- Related research-agent/tooling repos can support the broader narrative after
  maturity review.

Future relevance:

- High if the site evolves into a research hub.
- Medium for immediate hiring unless presented through concrete workflows.

Demo options:

| Demo | Tag | What it would show | Pros | Roadblocks |
|---|---|---|---|---|
| Hybrid search architecture | assemble from current artifacts | BM25, vector, citation, graph signals | Makes system design legible | Could get visually dense |
| Graph/citation search demo | requires new build | literature exploration through concepts/citations | Memorable research-tool demo | Needs running service or static replay |
| MCP tool map | assemble from current artifacts | tools available to Claude Code / agents | Shows agentic workflow maturity | Audience may not know MCP |
| Research workflow case study | requires new build | how a paper becomes searchable knowledge | Strong narrative | Needs sanitized example |

Claim-safety notes:

- Separate current enabled behavior from planned graph features.
- Avoid implying a production SaaS if the system is personal/research infra.

### 5. Causal, Temporal, and Statistical Methods

Positioning: statistical depth and validation discipline.

Capability signal:

- Shows ability to implement, validate, and explain causal inference, temporal
  validation, and Double ML methods.
- Strong complement to AI evaluation work.

Evidence strength:

- `causal_inference_mastery`: large dual-language causal methods codebase with
  tests and validation architecture.
- `double_ml_time_series`: companion code and manuscript-style material for
  temporal partially linear DML, cross-fitting, HAC inference, and synthetic
  examples.
- `TemporalValidation` / `temporalcv`: temporal validation utilities and
  methodology lineage.

Future relevance:

- Medium to high. Useful as the statistical spine behind AI evaluation and
  production modeling.

Demo options:

| Demo | Tag | What it would show | Pros | Roadblocks |
|---|---|---|---|---|
| Temporal CV visualizer | requires new build | gaps, purging, walk-forward splits, leakage prevention | Easy to understand visually | Needs careful edge cases |
| DML synthetic walkthrough | assemble from current artifacts | treatment effect estimation with temporal controls | Shows applied stats rigor | Can get too technical |
| Validation architecture map | assemble from current artifacts | known-answer, Monte Carlo, cross-language, reference checks | Strong engineering quality signal | Needs claim maturity review |
| Method map | requires new build | causal/statistical methods organized by use case | Useful hub content | Broad scope |

Claim-safety notes:

- Do not overclaim production readiness for research/demo repos.
- For professional price-elasticity stories, say DoubleML where appropriate.
  It is acceptable to say IV/PSM were tried and rejected if explaining the
  method-selection process.

### 6. Actuarial / Insurance AI Applications

Positioning: applied domain expertise and production-adjacent business value.

Capability signal:

- Combines actuarial/insurance domain understanding with ML, Bayesian modeling,
  simulation, and agentic workflow prototypes.
- Provides strong past-proof credibility, but should not dominate the site's
  future-facing identity.

Evidence strength:

- `bayesian-cold-start`: hierarchical Bayes tutorial for mortality pricing,
  shrinkage, calibration, credibility bridge, and production considerations.
- `insurance_ai_toolkit`: agentic AI workflow prototype for annuity product
  lifecycle tasks, with public Streamlit demo and offline fixtures.
- Annuity repos and professional stories can support public-safe case studies
  if de-identified.

Future relevance:

- Medium. Important proof of applied judgment, but the site should avoid making
  insurance the only frame.

Demo options:

| Demo | Tag | What it would show | Pros | Roadblocks |
|---|---|---|---|---|
| Cold-start shrinkage explainer | exists now / assemble from current artifacts | pooled vs unpooled vs hierarchical model behavior | Strong visual and intuitive | Needs careful actuarial framing |
| Credibility bridge | exists now / assemble from current artifacts | connection between credibility theory and hierarchical Bayes | Distinctive domain/math bridge | Niche unless explained clearly |
| Synthetic pricing case study | synthetic/private-safe only | de-identified pricing or mortality modeling workflow | Uses domain strength safely | Must avoid proprietary details |
| Public Streamlit/tool links | exists now | insurance AI toolkit workflow | Easy live artifact | Risk of pigeonholing if overprominent |

Claim-safety notes:

- Keep professional work public-safe and de-identified.
- Do not include compensation, commute, family, referral, or other private
  career details.
- Do not overstate tenure, credential counts, cloud certification counts, or
  interview-prep-only stories.
- Avoid vendor names from professional work; use generic descriptors such as
  "third-party risk scoring vendor."

## Visual Presentation Matrix

| Visual approach | Best for | Pros | Cons | Roadblocks | Good default use |
|---|---|---|---|---|---|
| Editorial evidence dossier | Technical hiring and serious project review | Clear, credible, strong for case studies | Can feel text-heavy | Needs excellent information design | Strong candidate for v1 redesign |
| Research lab / technical notebook | post-transformers, research-kb, long-form artifacts | Matches research identity and future direction | Can look unfinished if maturity varies | Needs status labels | Good for project pages |
| Evidence dashboard / signal board | prompt-injection evaluation and metrics-heavy work | Makes metrics scannable | Can over-index on numbers | Requires visual caveats | Good section pattern, not whole site |
| Case-study magazine | polished project stories | Memorable and visual | Higher design overhead | Needs screenshots/diagrams | Good for ~4 flagship pages |
| Academic minimal | math, writing, citations, low maintenance | Fast, credible, durable | Can undersell engineering craft | Needs visual assets to avoid plainness | Safe baseline |
| Dark technical portfolio | AI/security atmosphere | Distinctive if executed well | Common, contrast risk, can feel performative | Requires accessibility review | Use sparingly, not as default assumption |
| Interactive demo lab | hands-on proof of ideas | Visitors experience the ideas directly | More maintenance and QA | Performance, accessibility, demo data | Long-term layer after project pages |

Visual decision rule: choose a style only after selecting the lead story. A
post-transformers-led site should look different from an AI-eval-led site or an
applied-math-led site.

## Demo Pattern Matrix

| Demo type | Best for | Pros | Cons | Tag guidance |
|---|---|---|---|---|
| Static proof card | Homepage selected work | Fast, durable, low risk | Less memorable | Use for all homepage projects |
| Case-study page | Deep flagship work | Explains context, decisions, tradeoffs | Requires strong writing | Default home for demos |
| Embedded mini-tool | Thresholds, stability, temporal CV | Interactive and memorable | More code and QA | Build only for top clusters |
| Artifact gallery | Figures, notebooks, decks, PDFs | Shows real output quickly | Can feel scattered | Use as supporting section |
| Pipeline walkthrough | DLAI, book scaffold, research-kb | Shows systems thinking | Needs diagrams | Strong for publishing/infrastructure |
| Notebook preview | post-transformers, Bayesian work, causal methods | Shows reproducible learning | Heavy UX | Use with summary cards |
| Synthetic sandbox | professional/private work | Safe public demonstration | Must be clearly labeled synthetic | Required for proprietary domains |
| External live artifact | guides, Streamlit, subdomains, docs | Low duplication | Sends visitor away | Good secondary CTA |

## Lead Story Scoring Rubric

Use a 1 to 5 score for each candidate lead story. Do not pick the homepage
identity until the top candidates are scored.

| Criterion | Question |
|---|---|
| Visitor clarity | Can a first-time visitor understand the story in 60 seconds? |
| Distinctiveness | Is this meaningfully different from common developer portfolios? |
| Evidence quality | Are there public artifacts, metrics, demos, docs, or code to back it up? |
| Future relevance | Does this point toward the work Brandon wants next, not just past work? |
| Hiring relevance | Would a hiring manager or technical reviewer care quickly? |
| Demo potential | Can the idea be shown, not only described? |
| Maintenance cost | Can the site keep this current without constant rewriting? |
| Claim safety | Can this be said publicly without proprietary, privacy, or overclaim risk? |

Candidate lead stories to score:

- Applied mathematician building AI evaluation and research systems.
- AI safety/evaluation methodology builder.
- Research engineer bringing numerical analysis to post-transformer models.
- Learning-system and research-infrastructure builder.
- Applied modeling expert expanding from insurance into AI research.

## Suggested First Redesign Shape

This is not the final identity. It is a conservative structure that keeps
options open.

1. Hero: one bridge sentence that combines applied math, AI systems, and
   evaluation/research artifacts without naming every domain.
2. Proof strip: three time horizons: past proof, present artifacts, future
   direction.
3. Selected clusters: 3 to 5 narrative clusters, each with one proof card and
   one path to deeper detail.
4. Project pages: start with post-transformers, prompt-injection evaluation,
   and DLAI/book-scaffold because they have the clearest public artifacts.
5. Demos: embed demos inside project pages first; add a separate lab only if
   there are at least 3 maintained interactive demos.
6. Professional section: public-safe applied modeling context, not the dominant
   homepage identity.

## Privacy and Claim-Safety Checklist

Before publishing public copy:

- Avoid private facts: compensation, family, commute, referrals, relocation
  limits, and job-search constraints.
- Avoid proprietary details from professional work.
- Avoid vendor names from professional projects.
- Do not overstate Prudential tenure; use verified timeframes only if needed.
- Do not inflate credential totals or cloud certification counts.
- Do not include banned fictional stories or interview-prep-only claims.
- Label synthetic demos as synthetic.
- Label unfinished research artifacts with status or maturity.
- For prompt-injection work, state scope and limitations.
- For DLAI notes, preserve policy/compliance boundaries.

## Source Links for Future Implementation

Design and portfolio examples:

- [SiteBuilderReport: Software Engineer Portfolios](https://www.sitebuilderreport.com/inspiration/software-engineer-portfolios)
- [Creative Bloq: Design Portfolio Examples](https://www.creativebloq.com/portfolios/examples-712368)
- [Nielsen Norman Group: User Experience Careers report](https://media.nngroup.com/media/reports/free/UserExperienceCareers_2nd_Edition.pdf)

SEO and structured data:

- [Google Search Central: ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Google Search Central: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

Astro and content architecture:

- [Astro docs: Content collections](https://docs.astro.build/en/guides/content-collections/)

Performance and accessibility:

- [web.dev: Web performance](https://web.dev/performance)
- [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

Implementation implication: any interactive demo should have a non-interactive
fallback, keyboard support, responsive layout, and a reduced-motion path.

## Open Decisions For Later

- Which identity framing wins the lead-story scoring rubric?
- Does `post_transformers` become the lead story, a flagship project, or a
  research-direction section?
- How much of the homepage should be future-facing versus proof-of-work?
- Which demo deserves to be built first?
- ~~Should the site eventually add `/work`, `/research`, `/notes`, or `/lab` routes?~~
  **Resolved 2026-06-22:** `/work` + `/lab` + `/publications` shipped; **add a thin `/research`**
  hub (a research-threads lens); **not** `/notes` (books/guides reach via the corpus index, #30).
- ~~How should design tokens be single-sourced across the property family (#33)?~~
  **Resolved 2026-06-22:** the LaTeX `.sty` is the canonical Warm-Tol source; this site keeps
  *controlled duplication* of the one shared hue (it's standalone, not a scaffold consumer), with
  per-property freedom otherwise. A cross-repo shared-tokens package is the eventual SSOT but is
  premature now (one shared hue, solo maintainer) → deferred (tracked in #33). See
  [`docs/design-tokens.md`](design-tokens.md).
- Should project content live in Astro content collections rather than
  `src/data/projects.json`?
- Which visual approach best fits the chosen lead story?
