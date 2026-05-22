# Roadmap

> Forward-looking plan for `brandon-behring.dev` and the infrastructure
> directly supporting it. Adjacent projects appear as **showcase inputs** —
> things the site can potentially feature — not as parallel planning tracks.
> See `docs/website-decision-map.md` for identity strategy and
> [`deploy-workflows/README.md`](https://github.com/brandon-behring/deploy-workflows#phase-2-roadmap)
> for infra Phase 2 detail.

Last refined: 2026-05-22.

## What just shipped (Phase 1, May 2026)

- Site live at <https://brandon-behring.dev> (Cloudflare Workers Static Assets).
- Reusable deploy workflow extracted: [`brandon-behring/deploy-workflows`](https://github.com/brandon-behring/deploy-workflows).
- Portfolio's deploy is a 10-line caller of the reusable workflow.
- Setup walkthrough captured in `docs/cloudflare-setup.md` (local working note).

## Next 1–3 (pick one to start, in order)

1. **Score the lead-identity rubric** (decision-heavy, ~1 hr).
   - Walk the rubric in `docs/website-decision-map.md` §"Lead Story Scoring
     Rubric" against the 5 candidate framings. Lock the winner.
   - Unblocks: route structure, visual approach, demo selection, homepage
     hero rewrite. The most upstream open decision.
2. **Migrate `post_transformers/guides/web` to the reusable workflow**
   (mechanical, ~30 min).
   - Add `.github/workflows/deploy.yml` (10-line caller), set its two
     secrets, rename Worker to `brandon-behring-post-transformers-guide`,
     bind `post-transformers-guide.brandon-behring.dev`.
   - Why second: validates `deploy-workflows` with a 2nd consumer. Once
     two consumers exist, the Phase 1 plan's deferred tag-pinning (`@v1`
     instead of `@main`) becomes warranted — small follow-up commit.
3. **Pick the first demo** (depends on item 1's identity outcome).
   - From `docs/website-decision-map.md` §"Demo Pattern Matrix" — choose
     one cluster's demo to build, scoped to one weekend.

Skip ahead, mix, or replace any of these — they're the *most-leveraged*
next moves, not a forced sequence.

## Track A — Identity & Content (drives Tracks B & C)

Per `docs/website-decision-map.md` §"Open Decisions For Later". Listed in
dependency order:

- [ ] **A1. Lead-identity scoring.** Run the 5 candidate framings
  through the 8-criterion rubric. Pick a winner. *(See `Next` #1.)*
- [ ] **A2. `post_transformers` positioning.** Lead story, flagship
  project, or research-direction section?
- [ ] **A3. Homepage balance.** How much future-facing vs past proof.
- [ ] **A4. First demo to build.** Embedded mini-tool, case study, or
  artifact gallery. Depends on A1.
- [ ] **A5. Route structure.** Add `/work`, `/research`, `/notes`,
  `/lab` — yes/no/which. Depends on A1.
- [ ] **A6. Content collections migration.** Move `src/data/projects.json`
  to Astro content collections. Independent; cheap; do anytime.
- [ ] **A7. Visual approach.** Editorial dossier / lab notebook / etc.
  Depends on A1.

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
