# Session 2026-06-09/10 — portfolio audit · board reconciliation · Node-24 sweep · A4 densification

> Dated session log (rot-allowed). Live state: [board #1](https://github.com/users/brandon-behring/projects/1).
> Plan: `~/.claude/plans/do-an-audit-of-quirky-fiddle.md`. Scope set interactively
> (/exploring-options, 8 questions + 2 earlier ones — decisions table below).

## Why

Brandon asked for an audit of all work so far + a roadmap refinement. The audit ran
against live ground truth (board, `gh` issue states, deployed site, sibling-repo
commits) per `[[verify-rendered-reality-not-notes]]`, then the session executed what
the audit surfaced.

## Audit findings (verified 2026-06-09)

**Healthy** — deployed site == HEAD `ce94332` (CI deploy success 06-04); all key pages
200; sitemap 13 URLs; roster 23 entries / 4 draft / 19 visible matches live;
"Sequence Models & RL" live on `/work/future/`; trio docs internally consistent
through 06-04; CHANGELOG complete; no open PRs; A4 graph = pure consumer (site copy
byte-equivalent to `rl_and_control/exports/`).

**Drift found**

1. **Roadmap #1 (A4) gate stale + miscited.** Roadmap said densification was *gated on
   corpus acquisition* (citing `research-kb#21`, which is actually the metadata-quality
   backfill). Reality: 7 control textbooks were ingested into research-kb on 06-03
   (`rl_and_control 9f952d8→4b02cb8`) but **never re-exported** — site + export both
   still the 06-02 95-node/51-edge JSON. Deeper: `paper_index.md` (the graph's
   membership source) held **27 `[needed]` rows** — the real densification frontier.
2. **Board #1 incomplete as "canonical":** 20 Todo items vs 47 open `tracked` issues —
   27 missing, including `bb.dev#5` (account split), `ssm-foundations#14` (live-verified:
   landing still renders the scaffold-template subtitle), and `double_ml_time_series#6`
   (**account-wide Node-20→24 Actions bump, deadline 2026-06-16**).
3. **Orphaned session log:** `2026-06-02--next-session-handoff.md` written but never
   committed (its 06-01 predecessor is committed) — hole in the process-as-artifact chain.
4. **Roadmap omission:** the account-split decision (`bb.dev#5`) appeared on no planning
   surface despite affecting where the site's repo links / PyPI / CFF anchors point.
5. Minor: `ssm-foundations` repo has no homepage URL set (inside `bb.dev#2` scope);
   roster blurbs aged but none false; `book-template-astro` deploy failing since 05-19
   (wrangler "Not logged in" — the un-migrated CF-Pages pipeline, already on the infra
   backlog).

## Decisions (Brandon, via AskUserQuestion + /exploring-options)

| # | Decision | Choice |
|---|---|---|
| 0a | Board reconciliation | Bulk-add ALL missing tracked issues |
| 0b | A4 this session | Continue into it |
| 1 | A4 scope | **Full densification push** (acquire corpus first) |
| 2 | Acquisition bound | **`paper_index.md` candidates** (index = membership truth) |
| 3 | Node-24 deadline | **Bump everything today** |
| 4 | Next 1–3 after | Densify round 2 · SSM explainer · A6 (slot 1 phrased site-side) |
| 5 | Account split | Roadmap Open-decisions pointer + board |
| 6 | Orphan handoff | Commit + superseded banner |
| 7 | Ship shape | 1 bb.dev PR + direct-to-main bumps |
| 8 | Roster | Minimal touch (only the line today falsifies) |

## Track 1 — Board reconciliation (done 2026-06-09)

27 open `tracked` issues added to board #1 via `gh project item-add` (anthropic-research#1,
book-scaffold-astro#80/#83/#122, bb.dev#5, claude-books#1/#10, dml#6, guides#1,
guides-tooling#4, interview_prep_series#25, ir-eval#11/#12, julia_archive_audit#1/#3/#4/#5,
ssm-foundations#1/#4/#14, temporalcv#9/#10/#11/#17/#21/#23/#25). Invariant
**"open `tracked` issue ⇒ on the board"** verified restored (empty diff). `dml#6`
labeled P1 (deadline-bearing).

## Track 2 — Node-24 account-wide sweep (done 2026-06-10; dml#6 CLOSED)

- Swept all 92 non-archived repos' workflows: **209 stale pins across 34 repos** (the
  issue had guessed "a dozen-ish candidates").
- Every bump target's `runs.using` verified node24 before applying: checkout v4/v5→v6 ·
  setup-python v5→v6 · setup-node v4→v6 · upload-artifact v4/v6→v7 · download-artifact
  v4/v7→v8 · cache v4→v5 · upload-pages-artifact v3→v5 · deploy-pages v4→v5 ·
  github-script v7/v8→v9 · codeql v3→v4 · wrangler-action v3→v4 · codecov v4→v5 ·
  gh-release v1→v2 · setup-uv v3/v4→v8.1.0.
- 34 direct-to-main commits pushed; **0 bump regressions** (21 repos green; 13 red were
  all pre-existing or time-drift — full triage in the dml#6 closing comment).
- Reusable-workflow callers needed nothing: deploy-workflows' floating `v1` tag already
  points at its own node24 bump commit (`0cf3b05`).
- No node24 major exists yet for `julia-actions/setup-julia@v2` (and `softprops@v2` is
  node20) — they ride the 06-16 forced switch; revisit on breakage.

## Track 3 — A4 full densification (research-kb → rl_and_control → site)

**Frontier:** 27 `[needed]` rows in `paper_index.md`. Acquisition (4 parallel agents +
retries, legitimate-free-sources-only rule):

- **20 of 27 acquired**: 2 already sat in `fixtures/papers/arxiv/` un-ingested
  (2201.08117, 1910.12047); 5 found as arXiv preprints and moved to the arXiv lane with
  index rows rewritten to arXiv links (Gros&Zanon→1904.04152, Zanon&Gros→1906.04005,
  Kordabad→2210.04302, Parsi→2211.16300, HIL-SERL→2410.21845); 13 non-arXiv classics
  downloaded from author pages / institutional repositories / publisher OA (Baird '95,
  Tsitsiklis–Van Roy '97, Sutton Dyna '91, DGKF '89 CaltechAUTHORS scan, Ernst '09 ORBi,
  Annaswamy '23 AnnualReviews-OA, Mayne 2000 CiteSeerX, Katayama '23 T&F-OA*, Heirung '17
  NTNU, Wang PIRL '24 Wiley-OA, Grüne '13 + Grüne '19 author page, LeCun JEPA '22
  OpenReview). *Katayama row resolved to the Advanced-Robotics survey (Katayama/Murooka/
  Tazaki) — the index's "Katayama & Ohtsuka" attribution was loose; KB carries true authors.
- **7 unobtainable → not dropped silently**: Zames '81, Bar-Shalom & Tse '74, Feldbaum
  '61, Mayne 2014 became **metadata-only anchor stubs** (`sources add-manual` + role
  `anchor.rl_optimal_control`, the Bellman/Pontryagin precedent) so existing papers'
  citations to them can become edges; Bellman '57 + Pontryagin '62 were already stubs;
  Wang 2026 survey skipped entirely (nothing cites a 2026 survey; a stub would be an
  isolated node).
- **Ingestion**: GPU Docling OOMed against the resident embed-server (silent-quality
  trap: "successful" sources with 1–6 chunks) → deleted the 7 degraded sources, re-ran
  the whole batch CPU-only (healthy chunk counts), arXiv lane via `make sync-to-kb`.
- **Pipeline**: GROBID citation extraction for new sources → `build_citation_graph.py
  --skip-pagerank --rebuild-unmatched` (re-matches existing papers' dangling citations
  against the new anchors — txn-safe since research-kb#16) → `make graph-export` →
  overrides curation for new-node labels.

**Result: 95 nodes / 51 edges → 119 nodes / 460 edges** (9× the edges — the
`--rebuild-unmatched` re-match converted existing papers' dangling citations to the new
anchors into edges; Mayne-2000 alone drew 8 inbound). Isolated nodes: 8 of 119 — 4
long-standing (DPG is isolated *by design*: its overlay deliberately clears the
mis-assigned arXiv id 1406.2199; plus Howard/Pontryagin/Bonassi), 2 new stubs awaiting
future corpus (Zames, Feldbaum), 2 new papers without in-set matches (DGKF's OCR text,
Wang & Wu). Bonus fixes en route: the export's junk-title gate caught two old
filename-junk sources (2201.08117 → real Miki-et-al metadata; 1910.12047 → Lin et al.,
also mis-attributed "Cai" in the index); `_surname()` now keeps nobiliary particles
("Tsitsiklis & **Van Roy** 1997", "**van** Hasselt et al.") with tests (31 pass).
rl_and_control commit `13eca95`. Site copy refreshed (`src/data/rl_citation_graph.json`),
built, model-verified on prod after deploy (sync-evaluate `cy` model per
`[[lab-graph-headless-render-gotcha]]`).

## Track 4 — Docs refresh (this repo)

- `docs/roadmap.md`: Next 1–3 → Densify round 2 (site-side loop) · SSM explainer · A6;
  A4 Track-A entry updated; account-split added to Open decisions; miscited gate fixed.
- `CURRENT_WORK.md` + `CHANGELOG.md` refreshed; this log indexed.
- `projects.json`: minimal touch — only the rl-and-control graph sentence.
- 06-02 handoff committed with a superseded banner.

## Independent review (gate) — and the invariant breaking in real time

The pre-commit review (3 fresh-context shards; see
[`2026-06-10--audit-densify-review.md`](2026-06-10--audit-densify-review.md)) caught the
board invariant **already re-broken mid-session**: two new `tracked` issues
(`double_ml_time_series#7` — HAC SEs understated; `temporalcv#32` — silent fold-drop)
were filed concurrently during this session and weren't on the board. Re-added; and the
durable fix is now tracked as
[`bb.dev#8`](https://github.com/brandon-behring/brandon-behring.dev/issues/8) — GitHub
Projects' built-in auto-add workflow (filter `label:tracked`), which is UI-configurable
only. Manual reconciliation demonstrably cannot hold the invariant.

## Follow-ups (not lost)

- Embeddings for the new sources are deferred (`no_embed` two-phase workflow) — backfill
  via `research-kb scripts/backfill_embeddings.py` next time the GPU is free.
- research-kb "Documentation Sync" workflow red since 06-08 (pre-existing, untouched).
- Julia repos' `Check formatting` drift (AnnuityCore/Data) — formatter version drift,
  surfaced by the first CI runs since March; cosmetic, per-repo fix when touched next.
