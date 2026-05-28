# Ambiguity Resolution Session (2026-05-28)

A `/exploring-options` follow-on to the same-day backlog audit +
portfolio candidates discovery (commits `f3a0150` + `4a886fb`).
Closed 4 of the 6 open ambiguities catalogued in
`~/.claude/plans/examine-the-backlog-and-snappy-castle.md` —
homepage shape + identity (bundled), `mathematical-guides`
placement, insurance/stats positioning, and SSM flagship-demo
framing. The 5th (long-term hub structure) is deferred-by-plan
until a `/lab` or `/notes` pull develops.

Brandon's continuation cue: *"I want to next prepare for
addressing any ambiguities in the roadmap."*

## Scope

- **In scope**: 4 sequenced `/exploring-options` rounds (Q6+Q1
  bundled, Q2, Q5, Q3) per the recommended sequence in the
  ambiguity-resolution prep plan; session log + roadmap.md updates
  capturing decisions
- **Out of scope**: Q4 long-term hub structure (deferred per
  plan); any `src/data/projects.json` edits (Phase 5 work, own
  commit); any cluster page authoring; any
  `~/.claude/plans/i-want-to-look-streamed-pebble.md` updates
  (Phase 5 work, own commit); F1+F2 cosmetic regressions (own
  commit per prior audit Q3); the explainer build itself (Round 4
  decided the framing; build is its own multi-week effort)

## Output deliverables

1. This file — full audit-trail of the 4 rounds + the deferred 5th
2. `docs/roadmap.md` — updated "Strategic decisions still open"
   subsection (resolved items removed; partially-resolved updated);
   updated Phase 2 follow-on "What just shipped" subsection;
   updated `mathematical-guides` row in Cross-repo coordination
3. New "Phase 2 follow-on decisions (Q1-Q6, 2026-05-28)" subsection
   in `docs/roadmap.md` capturing the 5 locked decisions in
   table form

## Method

Followed the ambiguity-resolution prep plan at
`~/.claude/plans/examine-the-backlog-and-snappy-castle.md`:

- 6 ambiguities catalogued upfront (4 explicit in roadmap.md, 1
  deferred from discovery round, 1 fresh strategic flag from
  discovery session log)
- Dependency map: Q6 ↔ Q1 tightly coupled; Q2 + Q5 grounded by Q1
  outcome; Q3 + Q4 fully decoupled
- Recommended sequence: Round 1 (Q6+Q1 bundled) → Round 2 (Q2) →
  Round 3 (Q5) → Round 4 (Q3) → Round 5 (Q4 deferred)
- Each round followed Brandon's established `/exploring-options`
  pattern: state ambiguity → 2-4 options with concrete tradeoffs
  → pre-existing context → recommendation with reasoning →
  Brandon picks or hedges → acknowledge + log

## Round 1 — Q6 + Q1 bundled (identity reconfirm + cluster shape)

**Bundling rationale**: Q6 alone is essentially a yes/no on
identity framing — doesn't merit its own round. The coupled
decision is "what clusters become lead cards?" with Q6 as the
identity precondition. Bundling keeps the homepage shape +
identity question as one unit.

### Q1 of 2 — Identity framing (Q6 from prep plan)

**Stake**: adding `research-kb` + `research-agent` (+ optionally
`research_toolkit`) as a 4th cluster surfaces
"research-infrastructure builder" as a distinct identity signal —
different from the locked Phase 2 "build-to-learn engineer"
framing.

**Options offered**:

1. Keep "build-to-learn" framing; research-infrastructure becomes
   secondary
2. Adopt "research-infrastructure builder" framing; cluster
   becomes a LEAD card; existing 3 reshuffled
3. Re-score lead-story rubric with discovery evidence as fresh
   input
4. Hybrid — keep build-to-learn as hero but feature research-
   infrastructure as a 4th lead card

**Decision**: Option 1 (keep build-to-learn framing).

**Reasoning**: Phase 2 framing — "build-to-learn engineer
broadened to absorb AI Evaluation" — already accommodates
`research-kb` + `research-agent` as build-to-learn tools. The 22
`research-*` dogfooding orphans validate the build-to-learn
pattern, not a research-infrastructure-product pattern. Phase 2
was a recent expensive decision; reversing it after one discovery
round risked identity churn for marginal hiring-signal gain.

### Q2 of 2 — Cluster card count (Q1 from prep plan)

**Stake**: shapes Phase 5 — whether new clusters become lead
cards, tile cards, or fold into the Future strip. Cascades into
`src/data/projects.json` add ordering and `/work/{slug}` page
creation.

**Options offered**:

1. 3 lead + tier (existing 3 leads preserved; 4 new clusters as
   tier tiles in Future strip)
2. 7 cards (3 existing + 4 new full-weight)
3. 5 lead (3 existing + 2 highest-confidence new)
4. Other shape

**Decision**: Option 1 (3 lead + tier).

**Reasoning**: consistent with Brandon's earlier leaning
("probably 3 but we can decide after the pull and analysis").
Consistent with Q1 outcome (build-to-learn stays;
research-infrastructure stays secondary). The 3-column responsive
grid locked in Phase 2 (`docs/roadmap.md:33`) is built for 3
cards; 7 cards would force a 4+3 or 3+3+1 row pattern that breaks
visual rhythm. Tier tiles still on homepage (Future strip);
cheap reversal cost if a tier cluster proves stronger than
expected.

**Tier strip occupants** (from prior discovery): `tools`,
`books-and-guides`, `pricing-decision-systems`,
`research-infrastructure` (4 tiles).

## Round 2 — Q2 (`mathematical-guides` placement)

**Stake**: where 3 new private repos (hub + transformers + RL
siblings, all pushed 2026-05-28, all skeletons or scaffolded)
appear in the portfolio. Hub `wrangler.toml` already targets
`mathematical.brandon-behring.dev` — question is portfolio
placement, not whether to deploy.

**Options offered**:

1. Listed under `books-and-guides` cluster as a sub-entry
   (deployment to `mathematical.brandon-behring.dev` proceeds
   independently)
2. Own subdomain only; NO portfolio mention until siblings have
   ≥1 published chapter
3. Own `formal-math` cluster tier tile (5th tier tile)
4. Defer everything (no deploy yet either)

**Decision**: Option 1 (sub-entry under `books-and-guides`).

**Reasoning**: Brandon's earlier leaning + repo README framing
("supplements (does not replace) the practical `guides` family")
align. Round 1 outcome (3 lead + 4 tier candidates) leaves
`books-and-guides` cluster room for mathematical-guides as a
sub-entry. Deployment decoupled from portfolio placement —
`mathematical.brandon-behring.dev` still happens via the
existing `wrangler.toml`. Cheap reversal: if family matures and
warrants own cluster later, promotion is one
`src/data/projects.json` edit + one cluster page.

Option 3 (own `formal-math` cluster tile) was the closest
alternative — Definition-Theorem-Proof IS a distinct craft
signal — but starting conservative with promotion-later is safer
than starting visible with demotion-later.

## Round 3 — Q5 (insurance/stats positioning)

**Stake**: how much past insurance / actuarial work appears on
homepage. Phase 2 locked "No past background on homepage" but
didn't resolve subtler proof-strip questions. Round 1 placed
`pricing-decision-systems` in the tier strip — homepage already
has insurance signal at tier weight.

**Options offered**:

1. Homepage proof strip (badges/icons summarizing insurance
   expertise above/below cluster cards)
2. Deeper pages only (current Phase 2 lock)
3. Hybrid — short About paragraph referencing insurance
   background; no homepage proof strip
4. Defer until Phase 5 ships + tier tiles visible

**Decision**: Option 2 (deeper pages only) with a nuance.

**Brandon's clarification**: *"I don't want it to be highlighted
on my homepage — other than how much I like risk analysis.
Examples can appear in my demos and guides."*

**Interpretation**: Option 2 fully — no proof strip; Phase 2 lock
preserved. The risk-analysis nuance is a topical-interest
framing (not past-proof framing), surfaced naturally via the
existing multi-thread About paragraph or hero sub-line if it
fits cleanly. Insurance examples surface through:

- `/work/pricing-decision-systems` cluster page
  (annuity-pricing + insurance-ai-toolkit + similar)
- Demos that happen to use insurance datasets / case studies
- Guides that include insurance examples (e.g.,
  `guides-experimentation` if it adds an insurance case study)

**Reasoning**: Phase 2 lock preserved. Round 1's build-to-learn
confirmation made a proof strip directly tension with hero
positioning. `pricing-decision-systems` tier tile already
provides homepage-level insurance signal at the appropriate
weight; adding a proof strip duplicates that AND foregrounds the
past-proof angle Phase 2 deliberately de-emphasized. The
risk-analysis topical framing (Brandon's nuance) keeps the
signal alive without past-background framing — it's a present
interest, not a past credential.

## Round 4 — Q3 (SSM flagship-demo framing)

**Stake**: gates the SSM demo build currently parked as Next-1-3
slot #4 candidate. Determines which demo style ships once A4
densification + Phase 5 land. Three framings draw from existing
`post-transformers` + `ssm-foundations` content but tell
different stories.

**Options offered**:

1. Stability-region visualizer (explicit vs implicit; DeltaNet
   vs Longhorn)
2. Symplectic integration / energy preservation visualizer
3. "Why discretization matters for sequence models" explainer
   (story-shaped, not visualizer-shaped)
4. Sequenced — explainer first, then a visualizer (visualizer
   style TBD)

**Decision**: Option 3 (explainer first; visualizer style
deferred until explainer ships).

**Reasoning**: smallest single commitment that ships a flagship-
demo-shaped artifact (~1-2 weeks part-time). Highest impact-
per-hour per `docs/visual-design-options-report.md` lead-story
analysis — the explainer is explicitly flagged as a "strong
lead-story candidate." Demonstrates writing/synthesis craft
which aligns with the build-to-learn framing Round 1
reconfirmed. Matches Brandon's "ship small, expand if it works"
pattern. The explainer naturally introduces what BOTH visualizer
types (Option 1 + Option 2) would explore — so visualizer-style
decision can be deferred until explainer's reception is
observable.

Option 4 (sequenced commit to both) was the runner-up — strongest
craft-signal density — but defers the visualizer-style decision
anyway and adds upfront commitment to a visualizer that may not
pay off until the explainer establishes context. Option 3 is
Option 4 minus the upfront visualizer commitment.

## Round 5 — Q4 (long-term hub structure) [DEFERRED PER PLAN]

**Stake**: where multi-entry content lives. `/work/{slug}`
exists (3 cluster pages); `/lab/` exists (1 entry: research-
graph). Adding more routes is reversible but architecturally
informs how future content fits.

**Status**: not run this session per the prep plan's recommended
sequence. Q4 is genuinely defer-friendly; revisit only when
`/lab` or `/notes` pull develops (currently 1 entry on `/lab`,
zero pull on `/notes`).

**Re-trigger conditions**:

- `/lab` accumulates 2+ entries beyond `research-graph` (e.g.,
  the SSM explainer from Q3 ships)
- An entry's natural home is clearly NOT `/work/{slug}` AND not
  `/lab/` (a blog-shaped post would pull `/notes`)
- An identity-driven need (e.g., a `/research` index page if
  research-infrastructure cluster shifts to lead)

## Cumulative decision summary

| Round | ID | Decision | Status |
|---|---|---|---|
| 1 | Q6 | Keep "build-to-learn" framing | LOCKED |
| 1 | Q1 | 3 lead cards + 4 tier tiles in Future strip | LOCKED |
| 2 | Q2 | `mathematical-guides` family as sub-entry under `books-and-guides` cluster; deploy to `mathematical.brandon-behring.dev` independent | LOCKED |
| 3 | Q5 | Deeper pages only (no homepage proof strip); risk-analysis topical framing OK; insurance examples in demos/guides | LOCKED |
| 4 | Q3 | Explainer first ("Why discretization matters for sequence models"); visualizer style TBD | PARTIALLY LOCKED (explainer locked; visualizer style deferred) |
| 5 | Q4 | Long-term hub structure | DEFERRED per plan |

## Downstream commitments unlocked

The 4 fully/partially locked decisions unblock:

1. **Phase 5 cluster work** (`src/data/projects.json` updates + 4
   new tier `/work/{slug}` pages):
   - `/work/tools` (anchor: `book-scaffold-astro` + `deploy-workflows`)
   - `/work/books-and-guides` (anchor: `guides` + `claude-books`
     + `book-template-astro`; sub-entry: mathematical-guides family)
   - `/work/pricing-decision-systems` (anchor: `annuity-pricing`)
   - `/work/research-infrastructure` (anchor: `research-kb` +
     `research-agent`; sub-entry: 22 dogfooding orphans
     collectively via methodology page)
2. **`mathematical-guides` deploy** to
   `mathematical.brandon-behring.dev` per `wrangler.toml` hint
   (independent of portfolio update)
3. **SSM explainer build** — "Why discretization matters for
   sequence models" — when SSM slot opens in Next-1-3
4. **Update canonical Phase 5 plan** at
   `~/.claude/plans/i-want-to-look-streamed-pebble.md` to reflect
   the 4-tier cluster shape + sub-entry placement for
   mathematical-guides + research-infrastructure as the 4th
   tier cluster

## Open items remaining

- **Q4 long-term hub structure** (deferred per plan; re-trigger
  conditions above)
- **Q3 visualizer style** (deferred until explainer ships;
  Brandon decides after observing explainer reception)
- **Cluster ordering within tier strip** — not asked this round;
  may matter if visitor analytics show one tile draws
  disproportionate attention. Default ordering: alphabetical by
  cluster slug or HIGH-confidence-first
- **About paragraph content review** — Round 3 nuance ("how much
  I like risk analysis") may need a one-sentence addition to
  the existing multi-thread About paragraph. Verify current
  About content first; if absent, add cleanly
- **Phase 5 cluster naming** (the `tools` cluster's name remains
  flagged as generic per
  `~/.claude/plans/i-want-to-look-streamed-pebble.md` open
  question N7 — rename gate before going live)

## Gotchas

1. **Q5 was a clean Option 2 with a nuance, not Option 3
   (hybrid)**. Brandon's free-text answer added the risk-analysis
   topical framing as a permission, not as a homepage-element
   decision. Treating it as Option 3 would have committed to an
   About-paragraph edit that wasn't requested. The right read:
   Option 2 stays; risk-analysis becomes a topical surface area
   for natural About/cluster integration, not a structural
   commitment.
2. **Round 1 bundled Q6 + Q1 was efficient** (1-2 questions vs 4
   atomized rounds). Worth doing for coupled decisions where one
   is essentially a precondition for the other. Atomizing
   subsequent rounds (Q2 / Q5 / Q3) maintained the
   atomize-rounds principle for genuinely independent decisions.
3. **Q4 deferral was clean** — the prep plan explicitly marked
   Q4 as defer-friendly with re-trigger conditions, so skipping
   Round 5 wasn't a forgetting; it was the plan executing.
4. **Brandon's pattern held**: short numeric answers ("1", "1",
   "3") for clear-cut recommendations; free-text expansion
   ("don't want it highlighted... other than how much I like
   risk analysis") only when the canned options didn't quite fit.
   Free-text hedges are real answers per
   `[[working-style-thorough-exploration]]` memory.

## What this archive deliberately drops

- The pre-Round-1 "all 6 ambiguities" framings — those live in
  `~/.claude/plans/examine-the-backlog-and-snappy-castle.md` as
  the prep plan and don't need re-archiving here
- Detailed candidate-option pros/cons that weren't picked — kept
  brief in the rounds; full versions in the prep plan
- The verbatim round-by-round chat — the decisions + reasoning
  are above; conversation history holds the full back-and-forth
- Discussion of the SSM visualizer-style choice (deferred until
  explainer ships) — when that decision is reopened, it gets its
  own round
