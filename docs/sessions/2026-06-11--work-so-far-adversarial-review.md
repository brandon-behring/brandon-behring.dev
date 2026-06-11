# Work-so-far adversarial review + roadmap re-prioritization — 2026-06-11

**Ask**: independently review all work shipped so far; refine the future roadmap.
**Scope** (Brandon, via `/exploring-options`, 12 decisions over 2 rounds): hub claims
vs reality · full adversarial mode · hybrid vehicle (methodology-audit deep + an
independent-review gate) · two-front wave 1 · 3 non-overlapping shards · ranking
signed off post-findings · distribution-anchored visualizer gate · `/lab/` index as
ranking candidate · dated in-place decision-map corrections · one PR + CHANGELOG line.

## Method

**Front A — methodology-audit `--depth deep`** (`lever_of_archimedes` engine):
50 docs scanned, mechanical link/citation layer + codex/gemini multi-voice judgment
(codex timed out on the raise pass but participated in refutation; gemini ok).
Traffic light: **RED** (1 critical, independently corroborated).

**Front B — 3 fresh-context refute-mode shards** (`independent-reviewer` agents,
parallel; checklists named coverage areas only): hostile fact-checker (curl, routes
derived from the live sitemap) · hostile hiring-manager (rendered-site read) ·
hostile board/process auditor (gh). All three returned **FAIL**.

**Adjudication**: every objective attack confirmed/refuted with hard evidence
(curl, gh, PyPI/npm registries, the research-kb MCP `stats` endpoint); judgment
findings passed to Brandon raw.

## What held (the narrative is true)

- Every CHANGELOG entry since 2026-06-01 traced to a merged PR or main commit;
  zero open PRs; ship-at-merge semantics never abused.
- All 14 sitemap routes 200. Explainer renders 179 KaTeX spans, zero raw `$$`;
  slider markup present; CSP vs served resources: no conflict.
- All 6 publications resolve and attribute to Brandon Behring (arXiv/PubMed
  cross-checks where publishers bot-block).
- Draft gate leaks nothing into HTML, RSS, or sitemap. Site passes its own
  claim-safety checklist (decision-map §checklist).
- dml, ssm-foundations, and the OOD-study deployments all live.

## Confirmed findings → disposition

| # | Severity | Finding | Evidence | Disposition |
|---|---|---|---|---|
| B1 | critical | DPG node misattribution **regressed**: `source:arxiv:1406.2199` (Simonyan–Zisserman two-stream CNN paper) as the id for Silver et al. 2014; the 06-01 manual fix was clobbered by the 06-10 `--rebuild-unmatched` re-export. Data-layer only (correct PMLR url renders; no `arxiv_id` field, so no wrong clickable link). Both audit voices + repo + production verified. | `src/data/rl_citation_graph.json:77`, live page, session log 06-01 | Hotfixed → `source:uuid:aa2dfe22…` (node has 0 edges; safe rename). Upstream override-persistence bug filed: [`rl_and_control#4`](https://github.com/brandon-behring/rl_and_control/issues/4) (boarded). A4 standing item now gates on it. |
| B2 | blocker | Board invariant broken a **6th time**: 5 open `tracked` issues (all created 06-11) off board #1. True board total 105 items (56 Todo / 49 Done) at shard-run time — a prior "624" reading was a tooling artifact. (111 after the in-session re-boards + `rl_and_control#4`.) | shard comm-diff + spot-check | 5 issues re-boarded in-session. CURRENT_WORK Next now points at the durable fix ([#13](https://github.com/brandon-behring/brandon-behring.dev/issues/13) cron reconciler). |
| F1 | fix | dml copy: "Chapter 1 live; remaining in progress" — **all 10 chapters live** (each 27–68K chars rendered). Found independently by two shards. | curl all 10 chapter URLs | projects.json summary + whats_next corrected |
| F2 | fix | `/lab/research-graph/` meta description "~135 papers" vs 119 actual | `research-graph.astro:9` vs production JSON | "~120 papers" |
| F3 | fix | "npm-published" without the scoped name — unscoped `book-scaffold-astro` 404s on npm; real package `@brandon_m_behring/book-scaffold-astro` v4.23.0 | npm registry | scoped name added to summary + description |
| F4 | fix | eval-toolkit "toward a v1.0 cut (PyPI publish)" — already on PyPI at **v1.10.0** | PyPI JSON API | status → released; copy corrected |
| F5 | fix | temporalcv "Future: package as installable modules" — already on PyPI at v1.0.0 | PyPI | whats_next corrected |
| F6 | fix | research-kb "478 sources / 236K chunks, focused on causal inference" — live stats: **3,475 sources / 1.75M chunks**, multi-domain (a 7× undersell) | research-kb MCP `stats` | "3,400+ sources / 1.7M chunks" multi-domain wording |
| F7 | fix | CIM badge "in progress" vs prose "currently dormant" | rendered /work/causal-methods/ | status → released; "Development paused at reference quality" |
| F8 | fix | CURRENT_WORK stale: "#8 still needs the one-time UI setup" — setup was done 06-11 and **failed its live test**; #13 is the durable fix | issues #8/#13 bodies | CURRENT_WORK rewritten |
| F9 | fix | decision-map "Lead identity: intentionally undecided" under *Decisions Locked* — locked 2026-05-28 (Framing 4) | roadmap A1, ambiguity-resolution log | dated in-place correction |
| F10 | info | CHANGELOG email-signature entry linked the artifact dir, not its session log | DOC-CONVENTIONS | session link appended |
| F11 | info | 05-30 backlog-hygiene log: "20 projects / 6 clusters" — was 23 / 8 (gemini-confirmed) | projects.json at that date | dated correction blockquote added |

**Mechanical layer**: 13 low-confidence broken `path:line` citations in historical
session logs — all notational/cross-repo per the audit's edge-case policy; no action.

**Refuted/declined**: the board-auditor's suggestion to de-snapshot
`research-kb#8/#10/#23` issue pointers in the roadmap (low-confidence) — adjudicated
as acceptable: DOC-CONVENTIONS bars *status* snapshots, not issue *pointers*, and all
three verified open today.

## Judgment findings (passed raw; Brandon accepted all three)

- **J1**: "AI **safety** evaluation" cluster copy reads as alignment/dangerous-capability
  evals; the work is adversarial robustness + eval methodology → reworded.
- **J2**: rl_and_control's title link landed on the graph demo, not the project →
  `projectHref` no longer falls through to `external_context` (title renders plain
  when nothing publicly reachable; companions stay in Related).
- **J3**: zero in-lab cross-links between the two lab artifacts → one provenance link
  each way (graph ↔ explainer); structural fix = `/lab/` index (Next-1-3 #1).

## Roadmap re-prioritization (signed off)

**New Next 1–3**: 1. `/lab/` index page · 2. A6 content-collections (the six stale
claims are the evidence for a typed schema) · 3. SSM visualizer, gate rewritten
**distribution-anchored** (re-trigger 2 weeks after first distribution; converts to a
dated check 2026-07-01). **A4 demoted to a standing item** — corpus frontier mostly
consumed (20/27 acquired, 7 unobtainable → permanent stubs) and further densification
before `rl_and_control#4` lands would re-clobber curation. Board automation (#13)
stays off this doc (cross-repo) and leads CURRENT_WORK's Next.

## Gate review (pre-commit, verify mode)

Two fresh-context shards over this PR's own diff: **gate-diff PASS** (21 findings,
18 OK; every changed claim re-verified against PyPI/npm/gh/curl) · **gate-consistency
PASS** (11 findings, 10 OK; cross-doc story + issue refs + CHANGELOG chain verified).
Three non-OK findings, all applied: eval-toolkit's "v1.10.x" had **already rotted**
(v1.11.0 released the same day — version pin dropped entirely), the B2 board count
gained a point-in-time parenthetical (105 → 111 = the 5 re-boards + `#4`), and the
decision-map's "Current Baseline" section got the frozen-banner its cluster audit
already had. One OK-with-note: `rl_and_control#4` links 404 for non-owners (private
repo — internal docs only, accepted).

## Meta

- One exploration agent false-positived a "critical 404" by guessing the explainer's
  slug — shard checklists therefore mandated deriving routes from the sitemap. The
  lesson generalizes: reviewers verify URLs they constructed, not URLs that exist.
- The review's strongest pattern: **the site under-claims as often as it over-claims**
  (research-kb 7× under; dml 9 chapters under). Staleness, not embellishment, is the
  failure mode — which is what the A6 schema migration and the #13 reconciler both
  structurally address.
