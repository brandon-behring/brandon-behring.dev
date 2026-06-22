# Independent review — scaffold v4.25.3 CSS (PR #171)

**Date:** 2026-06-21
**Driver:** pre-merge cold review of `book-scaffold-astro` PR #171 (v4.25.3 responsive-reading CSS), at Brandon's request ("independent review of 1"). #170 (the doc) already had a 5-voice adversarial pass; this targets the un-reviewed CSS.

## Method

`independent-review` skill (orchestrator consumes verdicts only). Two cold-read `independent-reviewer` shards, parallel, artifact + checklist only (no conclusion leaked):
- **Shard A** — CSS correctness / responsive / dark-mode / regression (`package/styles/{chapter,tokens,typography}.css`).
- **Shard B** — version + CHANGELOG accuracy/drift + the `--measure-code` claim.

Both shards returned **FAIL**. Orchestrator then adjudicated the decisive *objective* findings against ground truth (`layout.css` grid; file existence; arithmetic).

## Findings (after adjudication)

| ID | Sev | Adjudication | Finding | Fix |
|----|-----|--------------|---------|-----|
| B1 | High | **CONFIRMED** | `docs/responsive-reading.md` is referenced in the CHANGELOG + all three CSS comments, but is **absent on `release/v4.25.3`** — it lives only on the `#170` branch. | **Merge #170 before #171** (cleanest; no code change). CHANGELOG already says "Lands via #170" (honest); the bare CSS comments are the dangling refs. |
| A1 | **High** | ✅ **CONFIRMED on render — my geometry adjudication was WRONG** | Reviewer: break-out width is `100vw`-relative while `margin-left:50%` is `.prose`-relative → overflow under a left sidebar. Render-measure (research-portfolio, sidebar + wide code): **8px horizontal page scroll at 1024px** (`<pre>` right edge 1016 > usable 1009); clean at 1280/1440. My static analysis claimed the fixed-48rem cap saved it — it missed that the pre is centered on the sidebar-*offset* `.prose`, and the scrollbar gutter shrinks usable width. The render caught what the analysis didn't. | **FIXED in #171 (`2cc11a9`)**: container-bounded `max-width: --measure-code; margin-inline: auto`. Re-measured: 0 page overflow at 768/1024/1280/1440; break-out + in-block scroll preserved. Gating `layout-overflow.spec.ts` + `wide-code` fixture (CI: 82 passed). |
| A2 | High→**Refuted as stated** | The 100vw-*width* mechanism was inactive — but the scrollbar still mattered | Reviewer: `100vw` width includes the scrollbar → overflow. The arithmetic holds (`100vw − 2rem` is narrower than content) AND `min()` resolved to the fixed 48rem here, so the 100vw branch never set the width. **But** the scrollbar gutter *did* contribute to A1's overflow — by shrinking usable width against the mispositioned (sidebar-centered) pre, not by inflating the width. Lesson: the right mechanism (A1), not the one named (A2). | Subsumed by the A1 fix. |
| B2 | Med | Valid nit | `--measure-code: 48rem` comment "fits ~80 mono chars @14px". Actual: 768px − 32px padding ≈ 736px / 8.4px ≈ **~88 chars**. "~80" is *conservative* (80-char lines fit comfortably), not wrong. | Optional reword: "comfortably fits 80-char lines (≈88 max @14px)". |
| A3 | Med | Accepted low-risk | `background-attachment: local` correct per spec; historical Firefox/Safari quirks. | Spot-check Firefox/Safari; fallback is `::before/::after` overlay. |
| A5 | Low | Intentional | Phone font shrinks at 40rem, tables scroll at 48rem — different breakpoints. Cascade is correct. | Per design doc (phone 40rem vs tablet 48rem). Optional clarifying comment. |
| A6 | Low | Accepted | `display:block` on `<table>` degrades `<caption>`/`<colgroup>` semantics; standard scroll pattern otherwise. | Fine unless books use caption/colgroup. |
| A7 | Low | Doc-note | `:not(.wide):not(.column-page)` matches the class on the `<pre>` itself, not a wrapper. | Document: put `.wide`/`.column-page` on the `<pre>`. |

## Edits applied
Post-review — after **render-confirming A1** (Brandon greenlit a durable guard + the fix). All in #171 (`2cc11a9`), CI assert run 82 passed:
- **A1** — container-bounded break-out (`max-width: --measure-code; margin-inline: auto`) + gating `gallery/tests/fixtures/layout-overflow.spec.ts` + non-snapshotted `wide-code` fixture chapter. 0 page overflow at 768/1024/1280/1440 (MCP-measured + CI).
- **B2** — `--measure-code` comment reworded (~80 → fits 80 comfortably, ≈88 max @14px).
- **A5** — comment noting the deliberate 40rem (phone) vs 48rem (table) breakpoints.
- **CHANGELOG** — describes the shipped container-bounded behavior + the guard.

**Process note:** A1 is the second case (after the S4=ZOH explainer) where verification-style reasoning *passed* a claim that an adversarial/empirical check then falsified. Here my own geometry adjudication refuted the reviewer; a render proved the reviewer right. Reinforces [[verify-rendered-reality-not-notes]] — for layout/overflow, *measure the render*, don't trust the arithmetic.

## Edits NOT applied
All proposed fixes above — pending Brandon's call.

## Open follow-ups
1. **Merge order: #170 → #171** (resolves B1).
2. **Render-check the sidebar/guide layout** at ≥1024px to close A1 (geometry says OK; not previously rendered).
3. Optional: B2 comment reword; A5 clarifying comment.

## Reference
- Reviewed: `book-scaffold-astro` PR #171, branch `release/v4.25.3`, worktree `/tmp/scaffold-v4253`.
- Ground truth: `package/styles/layout.css` (grid), `git ls-tree origin/docs/responsive-reading` (file presence).
- Tasks #21 (Shard A), #22 (Shard B).
