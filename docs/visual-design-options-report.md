# Visual Design Options Report

Status: recommendation memo  
Date: 2026-05-27  
Audience: Brandon Behring and future implementers  
Optimization order: first demo priority, second portfolio lead, third content architecture

## Executive Recommendation

Lead the site with **SSM / post-transformer research plus traceable research
artifacts**. The strongest identity is not "general portfolio", "course notes",
or "insurance-to-AI". It is:

> A research engineer who turns mathematical and statistical rigor into
> inspectable AI research artifacts: guides, demos, evaluations, graphs, and
> reusable tooling.

The recommended visual direction is an **editorial research dossier with
embedded live artifacts**. It should feel like a technical research notebook
that has been edited for hiring review: evidence-rich, visually structured,
calm, precise, and demonstrably built.

Do not make the site primarily:

- A repo catalog. The project count is high enough that undifferentiated lists
  will dilute the strongest story.
- A dark AI/security landing page. That would look generic and would weaken the
  math/research signal.
- A pure academic homepage. That would undersell the build quality, demos, and
  infrastructure work.
- An insurance/applied-statistics portfolio. That work is valuable proof, but it
  should not define the next role target.

The best near-term move is to build one flagship SSM demo and use the existing
research graph as the proof that the site can host serious interactive
artifacts. The homepage should then point visitors toward three evidence
streams:

1. **Future-facing research**: SSM foundations, post-transformer notes, RL +
   control, numerical methods.
2. **Evaluation rigor**: `eval-toolkit`, prompt-injection methodology, temporal
   validation, calibration, leakage checks.
3. **Research infrastructure**: research graph, `research-kb`, publishing
   scaffold, notebook/book pipelines.

## Current-State Audit

The current site is already heading in the right direction: it is fast, static,
readable, and organized around clusters rather than individual repositories.
The implementation in `src/pages/index.astro` has a clear hero, cluster cards,
a future-direction section, an about section, and contact links. The global
layout in `src/layouts/Base.astro` gives the site a restrained editorial base:
serif body text, sans headings, a simple blue accent, max-width constraints,
dark-mode support, skip link, and reduced-motion handling.

The current visual issue is not bad taste; it is **insufficient hierarchy and
insufficient proof density**.

### Strengths

| Area | Current strength | Why it matters |
|---|---|---|
| Performance posture | Astro static site on Cloudflare Workers Static Assets | Good default for a portfolio with demos and documentation. |
| Editorial baseline | 65ch prose, wide layout wrapper, restrained type system | Credible for technical reading. |
| Information architecture | `/work/{slug}` cluster pages | Better than dumping every repo onto the homepage. |
| Status discipline | Project status badges and "what's next" fields | Helps distinguish finished, in-progress, and future work. |
| First lab artifact | `/lab/research-graph/` Cytoscape demo | Proves the site can host nontrivial interactive work. |
| Claim safety | Existing docs repeatedly flag caveats, synthetic data, status, and privacy | Necessary for eval/security and professional-domain material. |

### Weaknesses

| Area | Current issue | Recommendation |
|---|---|---|
| Lead identity | Homepage still leads with "applied causal methods, AI evaluation tooling, and a study notes corpus" | Replace with a research-engineering bridge once the report is implemented as site copy. |
| Visual proof | Cluster cards still show generic screenshot placeholders | Replace placeholders with actual project visuals, diagrams, or artifact thumbnails. |
| Flagship clarity | SSM work lives in future direction, not as the central visual signal | Promote SSM/research graph into the primary visual narrative. |
| Hierarchy | All cluster cards have similar weight | Use one flagship area plus secondary proof lanes. |
| External perception | Course notes can read as student work unless framed as a publishing/research system | Tie notes to `book-scaffold-astro`, reproducibility, search, citations, and artifact production. |
| Asset gaps | `og-image.png` and many project screenshots are still missing per `docs/ASSETS-NEEDED.md` | Treat visual asset capture as a required polish task, not optional decoration. |

### What To Fix First

1. Create one strong above-the-fold visual: SSM / research graph / numerical
   methods, not generic cards.
2. Replace card placeholders with concrete artifacts.
3. Add an evidence strip: live demo, published guide, PyPI/package, tests/docs,
   notebook/book pipeline.
4. Give every major project one of three maturity labels: shipped, active, or
   concept.
5. Keep the site quiet and information-dense; avoid decorative visual effects
   that do not carry evidence.

## Options Matrix

Scores use this scale: 5 = excellent fit, 3 = useful but secondary, 1 = weak
fit for the stated goal.

| Option | Demo priority | Portfolio lead | Content architecture | Pros | Cons | Use when |
|---|---:|---:|---:|---|---|---|
| SSM / numerical-methods flagship | 5 | 5 | 5 | Most distinctive; fits Research Engineer target; connects math, AI architecture, notebooks, and future work | Some work is still in-progress; needs visuals to avoid abstraction | Use as the main spine. |
| Research graph / research infrastructure | 5 | 4 | 5 | Makes "traceability" visible; proves infrastructure; pairs naturally with SSM reading/research workflows | Can get dense; live service choices matter | Use as the companion proof system. |
| AI evaluation methodology | 4 | 4 | 4 | Strong hiring relevance; concrete metrics, calibration, leakage checks, baseline ladders | Crowded space; prompt-injection framing needs caveats | Use as secondary proof of rigor. |
| Publishing / guide platform | 3 | 3 | 5 | Shows sustained output and reusable tooling; supports every other artifact | Can look too meta if it leads | Use as infrastructure behind the public research hub. |
| Causal / temporal / Bayesian methods | 3 | 3 | 3 | Strong applied-science credibility; visually explainable; backs up eval rigor | Less future-facing than SSM; some work older or domain-specific | Use as selective proof. |
| Insurance / applied AI demos | 2 | 2 | 2 | Concrete live artifacts and business context | Can pigeonhole the site; proprietary/claim-safety constraints | Keep as proof for targeted contexts. |
| RL + control guide | 3 | 3 | 4 | Bridges control, RL, SSM world models, and the existing graph | Earlier-stage than SSM foundations | Use as future-facing adjacent research. |
| Backend/GPU/deployment tooling | 2 | 2 | 3 | Shows serious compute and deployment reproducibility | Enabling layer, not a headline | Mention where it supports demos. |
| JD-gap demo backlog | 1 | 1 | 1 | Can fill specific role gaps | Opportunistic and story-diluting | Keep off the main site unless targeting a specific job. |

## Ranked Visual Style Directions

### 1. Editorial Research Dossier With Embedded Demos

This is the recommended direction.

**Look:** quiet typography, strong section rhythm, evidence cards, annotated
figures, compact diagrams, status labels, and one or two carefully framed
interactive artifacts.

**Best internal fit:** SSM foundations, post-transformers, research graph,
`eval-toolkit`, prompt-injection methodology, `research-kb`.

**External references:**

- [Distill](https://distill.pub/) for interactive machine-learning
  explanations and research articles.
- [Anthropic research posts](https://www.anthropic.com/research/engineering-challenges-interpretability)
  for the bridge between research questions and engineering bottlenecks.
- [Red Blob Games](https://www.redblobgames.com/) for small interactive
  diagrams that make hard concepts explorable.

**Pros:** highest credibility; strong for hiring; supports math, code, and
writing; avoids generic portfolio tropes.

**Cons:** requires tight editing. If every project gets the same weight, the
page will feel text-heavy.

**Page implications:**

- Homepage starts with a thesis plus one flagship visual.
- Project pages become case-study dossiers.
- Demos appear inside project pages first, not as an empty `/lab` gallery.
- Every claim links to an artifact: live page, repo, notebook, package, graph,
  screenshot, or manuscript.

### 2. Technical Lab Notebook

**Look:** notebook-like sections, margin notes, equations, code snippets,
figures, status blocks, "experiment log" panels.

**Best internal fit:** `ssm-foundations`, `post_transformers`, `rl_and_control`,
Bayesian cold-start, DML/time-series work.

**External references:**

- [Observable](https://observablehq.com/) for reactive, interactive data
  notebooks.
- [JupyterLite](https://jupyterlite.readthedocs.io/) for browser-based notebook
  execution when the computation is light enough.

**Pros:** authentic to the material; excellent for guides and notebooks; makes
learning-by-building visible.

**Cons:** can look unfinished if status labels are weak; less immediately
legible to hiring managers than a dossier-style page.

**Use as:** the style for deeper research pages and book subdomains, not the
entire homepage.

### 3. Interactive Explainer Lab

**Look:** full-width interactive diagrams, short explanatory copy, sliders,
small controls, hover states, non-interactive fallbacks.

**Best internal fit:** SSM stability visualizer, temporal CV visualizer,
threshold/calibration simulator, Bayesian shrinkage explainer.

**External references:**

- [Red Blob Games](https://www.redblobgames.com/) for algorithmic interactives
  with direct manipulation.
- [Distill](https://distill.pub/) for technical explanations where interaction
  carries the argument.

**Pros:** most memorable; lets visitors experience the ideas directly; ideal
for demo priority.

**Cons:** highest QA cost; accessibility and mobile behavior must be designed,
not patched later.

**Use as:** a layer inside selected flagship pages after at least one demo has a
clear thesis and testable inputs.

### 4. Evidence Dashboard / Signal Board

**Look:** compact metrics panels, benchmark tables, confidence intervals,
calibration plots, split diagrams, method ladders.

**Best internal fit:** `eval-toolkit`, prompt-injection PoC,
temporal-validation, causal methods.

**External references:**

- [OpenAI Evals](https://github.com/openai/evals) as a reference for public eval
  framing and registries.
- [Observable](https://observablehq.com/) for compact data-app patterns.

**Pros:** very strong for evaluation and safety audiences; makes rigor
scannable.

**Cons:** can over-index on metrics; not ideal as the whole-site visual style.

**Use as:** a section pattern for evaluation projects.

### 5. Academic Minimal

**Look:** clean typography, citations, simple diagrams, restrained navigation,
few cards, little decorative UI.

**Best internal fit:** `ssm-foundations`, long-form guides, DML manuscript,
Bayesian tutorial.

**Pros:** durable, credible, low maintenance.

**Cons:** undersells engineering craft unless paired with demos/screenshots.

**Use as:** the baseline for long-form pages and subdomains.

### 6. Productized Research System

**Look:** system diagrams, pipeline maps, command examples, package cards,
API/tool surfaces, architecture views.

**Best internal fit:** `book-scaffold-astro`, `research-kb`, `research-agent`,
`runpod-deploy`, Cloudflare deployment pattern.

**Pros:** proves that the work ships as reusable systems, not just prose.

**Cons:** can feel like tooling for tooling's sake if it leads.

**Use as:** supporting proof behind the research/dossier narrative.

### 7. Domain Case-Study Portfolio

**Look:** de-identified applied case studies, synthetic sandboxes, before/after
modeling decisions, business constraints, validation notes.

**Best internal fit:** Bayesian cold-start, insurance AI toolkit, temporal CV,
professional applied modeling stories.

**Pros:** shows business judgment and production maturity.

**Cons:** pulls the identity toward insurance/applied modeling.

**Use as:** selective proof, not the homepage lead.

## Demo Strategy

The site should prioritize **small, durable, static-first demos** before adding
dynamic backends. A demo should exist only when it makes an idea clearer than a
screenshot or prose explanation would.

### Demo Priority Ranking

| Rank | Demo | Why it comes here | Recommended hosting |
|---:|---|---|---|
| 1 | SSM stability / geometric integrator explorer | Best flagship; uniquely combines numerical analysis and modern sequence models | Static Astro island with client-side JS. |
| 2 | Research graph / citation traceability demo | Already partly shipped; proves research workflow and infrastructure | Existing `/lab/research-graph/`, then embed a focused version in an SSM page. |
| 3 | Evaluation threshold/calibration/OOD simulator | Clear hiring signal for eval and safety teams | Static client demo using bundled sample data. |
| 4 | Temporal leakage visualizer | Simple, intuitive, and supports applied-statistics credibility | Static client demo. |
| 5 | Bayesian shrinkage explainer | Strong visual applied-science proof | Static or notebook-derived mini-tool. |

### What Counts As Demo-Ready

A demo is ready for the public site when it has:

- A one-sentence thesis.
- Synthetic or public-safe data.
- A non-interactive fallback image or explanation.
- Mobile layout.
- Keyboard-accessible controls.
- Reduced-motion behavior where relevant.
- Clear status: prototype, maintained, archived, or concept.

### Backend And Notebook Guidance

Keep the main site static until a demo proves that it needs runtime state,
private data, long-running computation, or authentication.

Use this hosting ladder:

| Need | Recommended approach | Notes |
|---|---|---|
| Static article, diagram, or small simulator | Astro page or island under `brandon-behring.dev` | Best default. |
| Static notebook-style execution | JupyterLite | Works well for lightweight Python/browser demos; no app server required. |
| Reproducible heavier notebook | Binder or Colab button | Good for public notebooks, but the user leaves the site. |
| Notebook converted to an app | Voila, Streamlit, Gradio, Panel, or custom Astro UI | Use when controls/results matter more than showing notebook cells. |
| Small API | Cloudflare Worker route such as `/api/*` | Cloudflare supports static assets plus Worker logic and selective `run_worker_first`. |
| Heavy Python/JAX/GPU computation | Separate backend or hosted artifact, linked from the site | Keep this off the main static Worker unless the demo truly requires it. |

Practical default:

- `brandon-behring.dev/work/...` for polished case-study pages.
- `brandon-behring.dev/lab/...` only for maintained public demos.
- `notebooks.brandon-behring.dev` or per-project subdomains for live notebook
  environments.
- `api.brandon-behring.dev` or `/api/*` only after a concrete demo requires a
  backend.

Relevant platform references:

- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
  for static assets plus optional Worker logic.
- [JupyterLite](https://jupyterlite.readthedocs.io/) for browser-based
  interactive computing on static hosts.
- [Binder](https://mybinder.readthedocs.io/) for shareable custom computing
  environments.
- [Voila](https://voila.readthedocs.io/en/latest/) for turning notebooks into
  standalone apps.

## Recommended Roadmap

### Phase 1: Polish The Existing Proof

Goal: make the current site feel intentional before adding more surface area.

1. Replace placeholder screenshot boxes on cluster cards.
2. Generate `public/og-image.png`.
3. Add or update screenshots for `ssm-foundations`, research graph,
   `eval-toolkit`, prompt-injection, temporal CV, and Bayesian cold-start.
4. Add explicit maturity language to any project that is local-only,
   in-progress, or pre-alpha.
5. Update homepage copy so SSM/research engineering is visible earlier.

### Phase 2: Build The Flagship Demo

Goal: produce one demo that justifies the recommended identity.

Build an SSM / geometric integration interactive explainer:

- Core question: why do discretization, stability, and structure preservation
  matter for modern sequence models?
- Inputs: method family, step size or discretization parameter, simple system
  regime, optional architecture mapping.
- Outputs: stability region, qualitative trajectory behavior, short
  architecture interpretation.
- Data: synthetic or analytic; no backend.
- Page home: SSM-focused project/case-study page, with a route under `/lab/`
  only if it remains maintained.

### Phase 3: Reframe The Homepage

Goal: make the site readable in 60 seconds.

Recommended homepage structure:

1. Thesis hero: research engineering from mathematical rigor to inspectable AI
   artifacts.
2. Flagship visual: SSM/graph artifact, not a generic headshot or card grid.
3. Evidence strip: live graph, SSM foundations, eval toolkit, publishing
   scaffold, applied-methods proof.
4. Three lanes:
   - Research direction: SSMs, RL/control, numerical methods.
   - Evaluation rigor: prompt-injection, `eval-toolkit`, temporal validation.
   - Research systems: graph, search, publishing, notebooks.
5. Selective applied proof: Bayesian/causal/insurance material below the main
   identity, framed as evidence of applied judgment.

### Phase 4: Deepen Project Pages

Goal: turn project pages from descriptions into evidence dossiers.

Each flagship page should include:

- What problem this addresses.
- What artifact exists.
- What is finished versus in progress.
- One visual proof element.
- One "technical judgment" section explaining a design tradeoff.
- Links to repo, live artifact, notebook, package, or paper.
- Claim-safety notes where needed.

### Phase 5: Add A Real Lab Only After Three Maintained Demos

Do not promote `/lab` as a major navigation item until it contains at least
three maintained demos. Until then, demos should be embedded in project pages
and cross-linked from the homepage.

## Artifact Positioning Guidance

### Lead Now

| Artifact family | Treatment |
|---|---|
| `ssm-foundations` | Flagship future-facing research artifact. Show chapter progress honestly. |
| `post_transformers` | Source research repo and deeper pipeline behind SSM foundations. |
| `/lab/research-graph/` | Proof of traceability and interactive research infrastructure. |
| `eval-toolkit` | Secondary proof that methodology becomes reusable code. |
| Prompt-injection PoC/submission | Evaluation case study with strong caveats. |

### Support The Lead

| Artifact family | Treatment |
|---|---|
| `book-scaffold-astro` | Infrastructure that makes research publishing repeatable. |
| DLAI notes | Example of the publishing system; do not let it read as the main identity. |
| `research-kb` / `research-agent` | Research-infrastructure proof; explain through workflows, not tool count. |
| `temporalcv` | Applied rigor and leakage-prevention proof. |
| Bayesian cold-start | Selective applied-science case study. |

### Keep Lower On The Site

| Artifact family | Treatment |
|---|---|
| Insurance AI toolkit | Link as an applied prototype, not the top story. |
| MYGA/professional-style work | Use only when synthetic, sanitized, and role-relevant. |
| JD-gap demo ideas | Keep as private backlog unless a specific job target needs them. |
| GPU/deployment tooling | Mention as supporting infrastructure for reproducible compute. |

## Concrete Visual System Recommendations

### Typography

Keep the current editorial base but make hierarchy sharper:

- Use larger, more decisive section headings for primary story sections.
- Keep prose widths narrow.
- Use compact sans-serif metadata for status, stack, links, and evidence tags.
- Avoid oversized marketing copy; this is a technical review surface.

### Color

Keep a restrained base, but introduce a slightly richer categorical palette:

- Blue for research/infrastructure.
- Teal or green for evaluation/validation.
- Amber for in-progress/future status.
- Neutral gray for archive/reference material.

Do not turn the site into a one-color blue/slate theme. The current accent is
credible, but evidence categories need enough contrast to scan.

### Layout

Use fewer equal-weight cards. Prefer:

- One flagship module.
- Two or three supporting proof lanes.
- Repeated project cards only lower on the page.
- Case-study sections with diagrams and evidence tables.

### Imagery

Use real artifacts rather than decorative illustrations:

- SSM stability plots.
- Citation graph screenshots.
- Calibration/reliability plots.
- Temporal split diagrams.
- Book/scaffold screenshots.
- Notebook output figures.

### Interaction

Interactive controls should look like technical instruments:

- Sliders for numeric parameters.
- Segmented controls for model/method family.
- Toggles for assumptions or display layers.
- Tooltip help for unfamiliar math terms.
- Static fallback images for every major interactive.

## Claim-Safety And Polish Rules

- Label unfinished research clearly.
- Label synthetic demos clearly.
- Do not present prompt-injection work as production defense.
- Do not let private/professional domain work become the main homepage story.
- Do not imply that course notes replace original course material.
- Do not overstate benchmark generality without protocol details.
- Prefer "artifact", "demo", "case study", "methodology PoC", "guide", and
  "research infrastructure" over broad product claims.
- Keep links live and public; remove or label links that would 404 for public
  visitors.

## Questions For Brandon

These are not blockers for the report. They are the decisions that would shape
the next site implementation.

1. Should the hero explicitly use the phrase "research engineer", or should it
   imply that through artifact selection?
2. Should the first SSM demo be framed around stability regions, symplectic
   integration, or the broader "why numerical analysis matters for SSMs" story?
3. How much in-progress research should be visible above the fold?
4. Should the research graph represent only public artifacts, or should it also
   show sanitized traces of private/local research workflows?
5. Should applied insurance/statistics appear as a homepage proof strip item, or
   only on deeper project pages?
6. Is the long-term public hub closer to `/research`, `/lab`, `/notes`, or a
   hybrid structure with all three?
7. Are you willing to maintain one small backend if a demo needs it, or should
   all first-generation demos remain static/client-only?

## Source Inventory

Internal sources used:

- `docs/website-decision-map.md`
- `docs/roadmap.md`
- `docs/ASSETS-NEEDED.md`
- `src/pages/index.astro`
- `src/layouts/Base.astro`
- `src/data/projects.json`
- `src/data/clusters.json`
- `post_transformers/notes/niche_decision_2026_05_24.md`
- `post_transformers/notes/niche_portfolio_2026_05_20.md`
- `post_transformers/notes/project_ideas.md`
- `rl_and_control/notes/project_ideas.md`
- `research-kb/README.md`
- `research-agent/README.md`
- `eval-toolkit/README.md`
- `book-scaffold-astro/README.md`
- `temporalcv/README.md`
- `bayesian-cold-start/README.md`
- `insurance_ai_toolkit/README.md`
- `runpod-deploy/README.md`

External references used:

- [Distill](https://distill.pub/)
- [Red Blob Games](https://www.redblobgames.com/)
- [Observable](https://observablehq.com/)
- [Anthropic: The engineering challenges of scaling interpretability](https://www.anthropic.com/research/engineering-challenges-interpretability)
- [OpenAI Evals](https://github.com/openai/evals)
- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [JupyterLite](https://jupyterlite.readthedocs.io/)
- [Binder](https://mybinder.readthedocs.io/)
- [Voila](https://voila.readthedocs.io/en/latest/)
