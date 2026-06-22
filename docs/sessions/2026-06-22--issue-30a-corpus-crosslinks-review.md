# 2026-06-22 — Issue #30(a) corpus index + hub cross-links — independent review

**Driver:** Ship the bb.dev slice of `#30` ("Identity spine: bind the corpus") — (a)
cross-links + corpus index. `#30` spans three properties; only the hub is editable here,
so element 1 (the book→hub "part of brandon-behring.dev ↗" affordance, scaffold/book repos)
and element 3 (shared wordmark / glyph favicon / OG template, blocked on `#33`) are deferred
and **#30 stays OPEN**. Change set: a new `src/components/CorpusIndex.astro` "full corpus"
strip on `/work/books-and-guides/` (the 5 live properties, incl. the two stranded in other
clusters — ssm-foundations in course-notes, dml in causal-methods), a `corpusIndex` accessor
+ `corpusBackHref` helper in `src/data/portfolio.ts`, a reciprocal back-link in
`src/components/ProjectSection.astro`, the conditional render in `src/pages/work/[slug].astro`,
and four reciprocity cross-links (`publications.astro`, `work/index.astro`, `lab/index.astro`,
`why-discretization-matters.mdx`), plus `CHANGELOG.md` + `CURRENT_WORK.md`.

**Method:** Two cold-read `independent-reviewer` shards (intent withheld), fanned out in
parallel and consumed verdict-only:

- **diff/correctness** — the code diff + the new component + the rendered `dist/`.
- **drift** — `CHANGELOG.md` + `CURRENT_WORK.md`.

Orchestrator grounding (independent of the shards): `npm run build` green (`astro check` +
build, 17 pages); live `curl` of all 5 corpus URLs → `200`; rendered `dist/` spot-checks
(strip present on books-and-guides only; back-link on ssm/dml only); `decision-map:491-493`
(no new route) read directly; design fixed over the approved plan (Full index + bind ·
clean page-level cross-links).

**Findings:**

| Shard | Verdict | Notes |
|---|---|---|
| diff/correctness | **PASS** (7/7 substantive) | 5 external corpus URLs `200`; internal routes exist; title↔URL not swapped; `corpusBackHref` renders the back-link only on ssm-foundations + dml (absent on the home cluster + all unrelated projects); the strip renders on books-and-guides **only** (0/7 other clusters); copy count-free / no "textbook"/invention claim; `rel="noopener"` on externals, no `target="_blank"`, internal links plain; `&amp;` escaped; build-safe. |
| drift | **PASS** (5/6 substantive) | CHANGELOG ↔ CURRENT_WORK agree; **#30 not** presented as closed (stays open for (b); `gh issue view 30` = OPEN); no cross-repo snapshot rot in added lines; forward sequence self-consistent (#33 in Right Now + Next rank-1 + the pickup marker); Next list 1–3 with no gaps/dupes. |

**Sole FAIL (both shards, same item):** the CHANGELOG entry linked this session log
(`docs/sessions/2026-06-22--issue-30a-corpus-crosslinks-review.md`) before it existed — a
dangling reference at review time. **Resolved by this file**, written as the skill's record
step *before* commit, so the link resolves by commit time. No code/doc change was needed
beyond creating this log.

**Edits applied as a result:** none to code/docs — both shards PASS on substance; the only
finding was the not-yet-written log, which this file is.

**Edits NOT applied / out of scope:** element 1 (book→hub affordance — scaffold/book repos);
element 3 (shared wordmark / glyph favicon / OG — blocked on `#33`) = #30(b); the scaffold-side
reciprocal links *from* each book; live/prod deploy verification (done post-merge, not in the
read-only review).

**Coverage gaps (reviewer `not_reviewed`):** the diff reviewer inspected the pre-built `dist/`
rather than re-running the build (the orchestrator ran `npm run build` green this session);
live/deployed verification deferred to post-merge. No gap left uncovered.

**Reference:** plan `~/.claude/plans/i-want-to-examine-stateless-hellman.md` · issue
[#30](https://github.com/brandon-behring/brandon-behring.dev/issues/30) ·
`docs/website-decision-map.md:491-493`.
