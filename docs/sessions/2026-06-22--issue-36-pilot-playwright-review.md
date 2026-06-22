# 2026-06-22 — Issue #36 pilot: bb.dev Playwright verify-suite — independent review

**Driver:** Ship the **bb.dev pilot** of `#36`. Research reframed #36 as a *cross-property* tool
that belongs in lever (sibling to `adversarial_review.py`), not bb.dev; the chosen **2 → 1** order
builds the bb.dev pilot first — the repo's first regression safety, and a proving ground for the
risky capture (the Cytoscape headless gotcha is bb.dev `/lab`-only). Decisions were fixed over a
three-round `/exploring-options` pass (runner = Node `@playwright/test`; target = local build+preview;
contrast = hand-rolled ratio helper; chromium light+dark; scope = smoke+demos+contrast; demo
assertion via `window.__cyGraph`/`window.__esReady` seams; routes from `portfolio.ts` data; CI =
PR-gate `test.yml`; content invariants out of scope).

**Change set:** `playwright.config.ts`, `e2e/{routes,smoke,demos,contrast}.ts(.spec)`,
`.github/workflows/test.yml`, behavior-neutral test seams in `CitationGraph.astro` +
`EigenSlider.astro`, `package.json` (devDep + `test:e2e`), `.gitignore`, `.claude/CLAUDE.md`,
`CHANGELOG.md` + `CURRENT_WORK.md`.

**Method:** Two cold-read `independent-reviewer` shards (intent withheld), parallel, verdict-only:
**diff/correctness** (the code + specs + config + workflow; the reviewer re-ran the suite) and
**drift** (`CHANGELOG.md` + `CURRENT_WORK.md`).

**Findings:**

| Shard | Verdict | Notes |
|---|---|---|
| diff/correctness | **PASS** (substance) → fixed | Both seams behavior-neutral; specs are real (no stubs) with selectors matching the components; **WCAG math verified** (black/white = 21:1); `routes.ts` mirrors `visibleClusters` (8 clusters, no miss/dupe); config + workflow sound; **suite re-run green 42/42**; build passes. Two DRIFT nits fixed (below). |
| drift | **PASS** (substance) → fixed | Docs agree; **#36 not closed** (`gh` = OPEN; only the pilot shipped, step-2 lever harness open); the "#36 = bb.dev-only" mislabel corrected (Next shows step-2 = a lever session); forward sequence consistent (#2 next; #30(b) blocked); no snapshot rot. One blocker = the not-yet-written session log (this file). |

**Edits applied as a result:**
1. CHANGELOG + CURRENT_WORK: "routes derived from `portfolio.ts` data" → "routes **mirror**
   `portfolio.ts`'s `visibleClusters`, read from `clusters.json`+`projects.json`" (the helper mirrors
   the logic, it doesn't import portfolio.ts — accuracy fix).
2. This session log (resolves the forward-referenced CHANGELOG link — same ordering as prior slices).

**Edits NOT applied (declined, with rationale):**
- *Add a `push: main` trigger to `test.yml`* — the diff reviewer flagged the asymmetry with
  `deploy.yml`, but **PR-gate is the deliberated Q4 decision**: every change reaches `main` via a
  squash-merged PR that was already tested, so re-running on push would only double-run. Added a
  clarifying comment to `test.yml` so the intent is explicit (not an oversight).

**Coverage gaps (reviewer `not_reviewed`):** CI-mode behavior (workers:1, retries:2) was code-reviewed
only (local run verified); live CI wiring confirmed post-merge. No substantive gap.

**Reference:** plan `~/.claude/plans/i-want-to-examine-stateless-hellman.md` · issue
[#36](https://github.com/brandon-behring/brandon-behring.dev/issues/36) · `e2e/` + `playwright.config.ts`.
