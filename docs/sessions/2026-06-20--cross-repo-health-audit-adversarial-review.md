# 2026-06-20 — Adversarial review: cross-repo health audit (PR #35)

**Driver:** `/adversarial-review` of PR #35 (the cross-repo health audit + the parked 2026-06-19
visual recon), **refute-mode** — attack the audit's factual claims + inline edits for anything
overstated, stale-on-arrival, or inconsistent.

**Method:** 3 voices on the same noise-filtered payload — Claude (blind-first), codex
(gpt-5.5 @ xhigh), gemini (Gemini 3.1 Pro @ High) — then **tool-grounding** of checkable findings
against primary sources (the recon doc's own "Issues filed" list, `gh` issue titles, PyPI JSON).
Consensus by refutation + grounding, not line-matching.

## Findings (tiered)

| Tier | Sev | Corrob | How verified | Location | Problem |
|---|---|---|---|---|---|
| **Verified** | warning | 3/3 | recon doc "Issues filed" = #29/#30/#31 + 6 remote; #32/#33 separate (gh titles) | `CHANGELOG.md` | "9 issues (#29–#33 here…)" listed 10, pulled in non-recon #32/#33, **omitted claude-books#27** |
| **Verified** | warning | 3/3 | #31 = inline demos, #33 = style-SSOT (gh) | `CURRENT_WORK.md` + audit doc | `#33` mislabeled a recon issue → should be **#31** |
| **Majority** | warning | 2/3 (codex+Claude) | CLAUDE.md "don't-snapshot" rule | `CURRENT_WORK.md` #13 note | restated **volatile** reconciler health (empty diff; 8/8 runs) in a *live* doc |
| Individual | suggestion | 1/3 (gemini) | — | review doc | verification shards missed the cross-file count error (accurate meta) |
| Individual | suggestion | 1/3 (codex) | — | recon doc | "8 properties" vs "9 surfaces" terminology |
| Individual | suggestion | 1/3 (Claude) | — | `CURRENT_WORK.md` | dropped "demo thumbnails" parked item |
| **False-positive** | — | tool-refuted | PyPI `project_urls.Homepage` = `brandon-behring/temporalcv` | audit doc | "PyPI claim unverified" worry — grounding **confirmed the doc was correct** |

## Dispositions
- **Fixed (follow-up commit):** CHANGELOG enumeration → `#29–#31 here · claude-books#27 · …`
  (= the 9 the recon filed); `CURRENT_WORK.md` + audit doc `#33`→`#31` (`#33` kept as *related*
  style-SSOT, not a recon issue); `CURRENT_WORK.md` #13 note de-snapshotted (points to the audit
  session log instead of restating live counts).
- **Recorded, not changed:** the false-positive (PyPI claim was right); "8 vs 9 surfaces"
  wording (dated recon doc, acceptable); "demo thumbnails" (low value — fold into #29/#31 later).

## Meta
Verification mode (`independent-review`) confirmed each issue *exists* but missed the
**enumeration/attribution** error; refute-mode caught it on the first pass. Root cause: the
"#29–#33 cluster" framing was **inherited from a fan-out subagent** and reused without
re-checking it against the primary source (the recon doc). Reinforces the adversarial-review-mode
rule: inherited claims (even from your own prior agents) are not primary sources.

## Reference
- Audit: `2026-06-20--cross-repo-health-audit.md`; verification review: `…-review.md`.
- Run file: `~/.cache/adversarial-review/brandon-behring.dev/docs-visual-recon-2026-06-19-20260620-164720.md`.
