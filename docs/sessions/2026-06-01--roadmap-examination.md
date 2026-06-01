# Roadmap examination + tracking-drift reconciliation (2026-06-01)

**Driver**: Brandon — *"examine the full roadmap … and what work needs to be done
here and on other repos to finish."* Scope chosen: **full coordinated portfolio**.
Deliverable: this map + a tracking-drift reconciliation (not feature execution).
Plan: `~/.claude/plans/examine-the-full-roadmap-tidy-unicorn.md`.

## Decisions (3 × `/exploring-options`)

- **Scope / next step**: full portfolio · *map + reconcile drift* (not a burn-down).
- **Reconciliation how**: full additive board hygiene · dated session doc (this) ·
  `roadmap.md` deeper restructure (a **tier-index of issue numbers + pointers**, not
  a status registry — the board owns status) · accepted P2/P3 triage.
- **Forward path**: "finished" = **open / iterative** (no fixed bar, **no milestone**) ·
  this session also lands the zero-risk quick wins · advisory next focus = the A4 chain.

## What I found (ground truth, not notes)

Triangulated docs vs `projects.json` vs live `gh`/`curl` (`[[verify-rendered-reality-not-notes]]`):

- **Site is healthy.** `npm run build` → 14 routes. Security headers, `robots.txt`,
  `/sitemap-0.xml` (13 URLs), `/rss.xml` all live. `/publications/` live → **Track 1.5b
  shipped** (the roadmap still called it "staged"). No broken links; project data honest.
- **Taxonomy = 23 projects / 8 clusters** (`src/data/projects.json`): 16 in-progress ·
  4 released · 2 prototype · 1 planned. Released = `temporalcv`, prompt-injection OOD
  study, `book-scaffold-astro`, `deploy-workflows`.
- **Tracking was the real drift.** Work Tracker board (#1) held **26 items / 9 open**,
  but **11 real open issues were orphaned** (open, no `tracked` label, off-board) —
  including the actual A4 blocker `research-kb#20`. Meanwhile `roadmap.md` listed
  `prompt-injection-portfolio#3` as live backlog — already **closed**. So the board
  *undercounted* and the docs *overcounted*; neither alone was trustworthy.

## The map — remaining work, full portfolio

Tiers 1–3 are actionable; Tier 4 is trigger-gated (documented, not executed); Tier 5 is
open decisions. Status is owned by the board + `projects.json`, not this snapshot.

### Tier 1 — site-coupled / near-term
| Item | State | Note |
|---|---|---|
| A4 `/lab/research-graph/` densification | blocked | `research-kb#20` (junk metadata) → `#16` (txn rebuild, P2) → re-run `graph export` + `build_graph_export.py`. Live data already repaired out-of-band (Track 1.5). |
| `brandon-behring.dev#2` | open | repo homepage+topics, CITATION.cff, OG images |
| `insurance-ai-toolkit#11` | open | dead Streamlit "live demo" link (credibility) |
| A6 content-collections migration | open | `projects.json` → Astro content collections; cheap, unblocked |
| A7 visual identity / screenshots / homepage OG | partial | minimal-editorial chosen; full identity open (`docs/ASSETS-NEEDED.md`) |
| `brandon-behring.dev#1` | open | synthesis-map; gated on research-kb synthesis-kb export |
| SSM flagship demo ("Why discretization matters") | parked | explainer framing locked 2026-05-28; visualizer style deferred |

### Tier 2 — tracked board work (research infrastructure)
- `research-kb`: **#20** (junk metadata — A4 blocker), #16 (P2 txn rebuild), #13 (P2 Rust sources), #8/#10 (vol23 corpus), #9 (Docling LaTeX gap).
- `research_toolkit`: #21 (P3 post-merge polish), **#22 (P1** `/dataset-synthesize` dogfood/silent-failure), #23 (P2 registry parity), #24 (P2 `/dossier-audit` allowed-tools), #25 (P3 missing migrate script), #26/#27 (P3 packaging + evidence-ledger validator). *(#21/#26/#27 boarded in this session's review pass.)*

### Tier 3 — released-gating + hygiene
- `annuity-pricing#11` — PyPI publish → earns *released*.
- `deploy-workflows#2` — **DONE this session** (MIT LICENSE).
- `book-scaffold-astro` — #90 (decision-log convention), #91 (a11y); + v4.8.0 rollout, v5.x #80.
- `eval-toolkit#88`, `causal_inference_mastery#12` — decision-log (ADR) parity.
- `ssm-foundations` — #1/#3/#4/#5/#6 standards-audit follow-ups (P2–P3).
- `post_transformers#51` (P2) — eval-toolkit BREAKING rename; gates ssm pin bump (repo stays GitHub-only).
- `rl_and_control#1` — placeholder metadata + wrong arXiv id (feeds the lab graph; sibling of `research-kb#20`).

### Tier 4 — deferred future phases (trigger-gated; from the coordinated plan)
Phase 3 dlai deploy · Phase 4 guides deploy · Phase 6c context-hygiene checklist ·
Phase 6d CITATION.cff burst · Phase 7 scaffold-v5 reconciliation + provenance backfills ·
Phase 8 claude-books · Phase 9 annuity cluster expansion · Phase 9.5 Julia registry
(gated "Julia cleanup complete") · Phase 8.5/OIDC `deploy-workflows@v3` (gated
`wrangler-action#402`) · Track B leftovers (B5 GitHub Org = **deprecated**, B6
`astro-cf-template`, B7 custom-domain API).

### Tier 5 — open strategic decisions
1. Long-term hub structure (`/research` vs `/lab` vs `/notes`) — defer-trigger: `/lab` gains 2+ entries.
2. SSM demo visualizer style (stability-region vs symplectic) — post-explainer.
3. `brandonmbehring-dev` second account (`[[brandonmbehring-dev-second-account]]`) — its `annuity-pricing` mirror has 22 independent untracked issues; resolve before any Phase-9 transfer. **See the temporalcv flag below.**

## What shipped (this session)

- **Board hygiene (full additive)** — labeled `tracked` + P2/P3 and added all 11 orphans
  to board #1. Board **26 → 37**. Purely additive; nothing closed/edited.

  | issue | priority | | issue | priority |
  |---|---|---|---|---|
  | `research-kb#20` | P2 | | `book-scaffold-astro#90` | P3 |
  | `insurance-ai-toolkit#11` | P2 | | `annuity-pricing#11` | P3 |
  | `deploy-workflows#2` | P2 | | `eval-toolkit#88` | P3 |
  | `book-scaffold-astro#91` | P2 | | `causal_inference_mastery#12` | P3 |
  | | | | `rl_and_control#1` | P3 |
  | | | | `brandon-behring.dev#1` / `#2` | P3 |

- **Quick wins** — `deploy-workflows` **MIT LICENSE** → `#2` closed (commit `7488329`);
  **`ssm-foundations/CITATION.cff`** added (no `orcid`/`doi`).
- **CFF reality-adjustment** — 4 of the 5 planned CFF repos *already had* one. Inspected:
  `eval-toolkit` / `causal_inference_mastery` / `prompt-injection-detection-prototype`
  = clean (correct author, real reference DOIs only, no ORCID). **`temporalcv` flagged**
  (see below) — not auto-fixed.
- **`roadmap.md`** — deeper restructure: drift-fixes (date, 1.5b shipped, 23/8, A4 blocker
  named, B5 deprecated, closed `#3` removed) + refreshed the two stale sections (A4 desc;
  the "state as of 2026-05-28" cross-repo table) + a tier-index "Remaining work" section
  pointing at the board + this doc + pruned the rotting Track C snapshot to judgments-only.

## Verification (live)

- Board #1 = **37** (was 26); all 11 orphans present + labeled.
- `deploy-workflows/LICENSE` exists; `#2` **CLOSED**.
- `ssm-foundations/CITATION.cff`: required keys present; **no `orcid`, no `doi`**.
- `roadmap.md`: Track C = 23/8 (matches `projects.json`); no `prompt-injection-portfolio#3`.
- `npm run build` clean (14 routes; doc-only edits).

## Open flags / next

- **`temporalcv` CFF `repository-code`** points to `github.com/brandonmbehring-dev/temporalcv`
  (the secondary account), not canonical `brandon-behring/temporalcv`. A citation-correctness
  bug, but it touches the *pending* second-account decision — left for Brandon to direct
  (fix to `brandon-behring`, or confirm the secondary is intentional).
- **Advisory next session**: the **A4 chain** — `research-kb#20` (metadata extraction) →
  `#16` (transactional rebuild) → re-export the citation graph. Highest site-visibility.
