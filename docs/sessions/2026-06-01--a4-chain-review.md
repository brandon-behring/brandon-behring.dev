# Independent review — A4 clean-pipeline chain (2026-06-01)

**Driver:** Pre-commit review of the A4 chain (research-kb#16 + #20 → re-export →
site refresh) across three repos, before committing/pushing.

**Method:** 3 cold-read `independent-reviewer` shards, fanned out in parallel,
each given only the artifact + a neutral checklist (intended conclusion withheld).
Orchestrator surfaced verdicts + FAIL/DRIFT findings only.

## Findings

| # | Shard | Verdict | Finding | Severity |
|---|-------|---------|---------|----------|
| A | research-kb#16 transactional rebuild | PASS (7/7) | DELETE+INSERTs atomic; matcher's separate read-conn safe; sanity-ratio + mode-validation correct; CLI rolls back + exits 1 | — |
| B1 | research-kb#20 arXiv fetcher | FAIL | `fetch_arxiv_metadata` doesn't verify returned `<id>` == requested id, nor validate id chars → a malformed/file-sourced id could silently return a different paper | fix |
| B2 | research-kb#20 update_core_metadata | DRIFT | `authors=[]` overwrites authors with `{}` (COALESCE), contra docstring "None leaves unchanged" | fix |
| B3 | research-kb#20 ingest fallback | DRIFT | arXiv fetch returning None for a valid-looking id falls through to filename-junk with no log (network errors do log) | info |
| C | site enrich/caption/data | PASS (6/6) | all 95 nodes labeled; 8/8 MANUAL ids present; DPG override clears arxiv_id; no dead code; 95/51, 0 junk, all edges resolve | — |
| C-note | site caption | PASS | caption may underlap detail panel at 640–900px *when panel open* (hidden by default) — cosmetic | info |

No data corruption occurred this run (ids were regex-clean from controlled sources;
arXiv returns spot-checked correct). B1/B3 harden the deferred corpus-wide backfill.

## Edits applied (all 3, user-approved)
- **B1**: `fetch_arxiv_metadata` rejects non-numeric ids before any request,
  URL-encodes the id, and returns `None` if the arXiv entry's id (version-stripped)
  doesn't match the requested id — can no longer accept a different paper (+2 tests).
- **B2**: `update_core_metadata` normalizes `authors=[]` → `None` (no clobber) (+1 test).
- **B3**: `get_metadata_for_pdf` logs `arxiv_fetch_returned_none` before the
  filename-junk fallback.
Re-validated: 15 unit/integration tests pass; black + ruff clean.

## Edits NOT applied
- **C-note** (caption may underlap the detail panel at 640–900px *when the panel is
  open*): cosmetic, panel hidden by default — left as-is.

## Open follow-ups
- Corpus-wide `backfill_filename_metadata` over all `metadata_source='filename'`
  rows (~253 corpus-wide; this run did the ~84 RL subset). → research-kb tracked issue.
- Eliminate `enrich-citation-graph.mjs` by folding MANUAL overrides into
  `paper_index.md` overlay. → brandon-behring.dev tracked issue.

## Reference
- Plan: `~/.claude/plans/use-the-following-handoff-joyful-wigderson.md`
- Issues: research-kb#16, research-kb#20
