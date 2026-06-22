# 2026-06-22 — Issue #17 guides-link surfacing — independent review

**Driver:** Ship `#17` (the bb.dev half) — surface the already-live guides hub from the
portfolio. Change set: one home About-section CTA → `https://guides.brandon-behring.dev`
(`src/pages/index.astro`), plus `CHANGELOG.md` + `CURRENT_WORK.md` updates. The hub-Worker
path-proxy half stays infra → board.

**Method:** Two cold-read `independent-reviewer` shards (intent withheld), fanned out in
parallel and consumed verdict-only:

- **diff/correctness** — the `src/pages/index.astro` diff.
- **drift** — `CHANGELOG.md` + `CURRENT_WORK.md`.

Orchestrator grounding (independent of the shards): live `curl` of every guides URL (hub,
`/ai-engineering/`, `claude-books` → all `200`); `docs/website-decision-map.md:398` (guides =
"Good secondary CTA") and `:491-493` (the resolved "**not** `/notes`; books/guides reach via
the corpus index, #30") read directly; the design fixed over three `/exploring-options` rounds
(copy = descriptive lead-in + CTA · order = research → guides → publications · open-mode = same
tab, `rel="noopener"`, no offsite icon).

**Findings:**

| Shard | Verdict | Notes |
|---|---|---|
| diff/correctness | **PASS** (7/7) | `href` valid + reachable (`200`); `rel="noopener"`; no `target="_blank"` — matches the page's prose-link convention (only `CitationGraph.astro` uses `_blank`, a data-viz context); copy count-free, no "textbook"/invention claim; well-formed HTML, `&` encoded `&amp;`; `.guides-link` scoped style defined; renders in `dist/index.html`. |
| drift | **PASS** (6/6) | no cross-repo snapshot rot in added lines; `CURRENT_WORK` self-consistent (Right Now = #30, Next rank-1 = #30, Last shipped = #17); "Next" renumbered 1–3 with no gaps/dupes; session-log path follows `docs/sessions/<date>--<topic>-review.md`; CHANGELOG ↔ CURRENT_WORK describe the same ship without contradiction. |

**Edits applied as a result:** none — both shards PASS with no proposed fixes.

**Edits NOT applied / out of scope:** claude-books surfacing (separate surface, its own
folding-in work); a nav item / flagship card / `/guides` route (all explored and ruled out —
the route contradicts the locked `:493` decision and is #30's corpus-index job); the
hub-Worker path-proxy (infra → board).

**Coverage gaps (reviewer `not_reviewed`):** the drift reviewer did not re-read
`decision-map:398/:493` (verified by the orchestrator earlier this session) and did not
live-check the URL (covered by the diff shard's `curl` → `200`). No gap left uncovered.

**Reference:** plan `~/.claude/plans/i-want-to-examine-stateless-hellman.md` · issue
[#17](https://github.com/brandon-behring/brandon-behring.dev/issues/17) ·
`docs/website-decision-map.md:398` + `:491-493`.
