# Roadmap-examination review (2026-06-01)

**Driver**: gate the uncommitted roadmap reconciliation (`docs/roadmap.md`
restructure + new `docs/sessions/2026-06-01--roadmap-examination.md`) before commit,
per the ambient `independent-review` convention. 3 fresh-context reviewers,
conclusions withheld so they cold-read.

## Method

3 shards via `independent-reviewer` agents in parallel; each prompt carried only the
artifact + a neutral checklist (no intended conclusion):
- **A — drift**: roadmap claims vs live `src/data/projects.json` / `gh` / `curl`.
- **B — consistency**: roadmap "Remaining work" tier-index vs the session-doc tier map;
  closed-as-open check.
- **C — hygiene**: markdown / links / overclaim / lossy-deletion on the diff.

## Findings

| # | Shard | Finding | Verdict | Disposition |
|---|---|---|---|---|
| 1 | A | 12/13 factual claims (23/8 taxonomy, 1.5b live, every cited issue state, LICENSE/CFF presence) match ground truth | PASS | — |
| 2 | A | "11 boarded / board→37" not falsifiable read-only | UNKNOWN | non-issue — board independently verified |
| 3 | B | `book-scaffold-astro#80` in session-doc Tier 3 but missing from roadmap Tier-3 index | INCONSISTENT | **fixed** — added to index |
| 4 | B | `research_toolkit#21/#26/#27` open orphans in neither doc **and not boarded** | INCONSISTENT | **fixed** — boarded (`tracked`/P3) + listed in both docs |
| 5 | C | `§"Remaining work — all tiers"` pointer missing the `(index)` suffix | minor | **fixed** |
| 6 | C | `[[cloudflare-account]]` memory says B5 "deferred" (roadmap now DEPRECATED) | stale | **fixed** (+ corrected a stale `-post-transformers-guide` sibling example in the same file) |

No reviewer conflicts. Reviewers advised only; all dispositions chosen by Brandon
("apply all 4").

## Edits applied
- `roadmap.md` Tier-2 index += `research_toolkit#21/#26/#27`; Tier-3 index += `book-scaffold-astro#80 (v5.x)`; `§` pointer suffix corrected.
- `2026-06-01--roadmap-examination.md` Tier-2 += #21/#26/#27 (noted boarded this pass).
- Board #1: +3 (`research_toolkit#21/#26/#27`, `tracked`/P3) → **40 total** (was 37).
- Memory `cloudflare-account.md`: B5 deferred→**deprecated**; stale sibling example corrected.

## Edits NOT applied
- None deferred. Reviewer A's UNKNOWN needs no edit (board verified at 40).

## Open follow-ups
- **Coverage gap (A)**: not every Tier issue state was individually re-checked (spot-checked
  the A4 pair + all flagged issues). Low risk — the board is now the live registry.
- **`temporalcv` CFF `repository-code`** points to the `brandonmbehring-dev` account, not
  canonical `brandon-behring` — flagged in the examination doc; left for Brandon (intersects
  the pending second-account decision, `[[brandonmbehring-dev-second-account]]`).

## Reference
- Examination + full map: `docs/sessions/2026-06-01--roadmap-examination.md`.
- Plan: `~/.claude/plans/examine-the-full-roadmap-tidy-unicorn.md`.
