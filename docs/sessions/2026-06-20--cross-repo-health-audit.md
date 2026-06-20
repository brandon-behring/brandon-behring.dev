# 2026-06-20 — Cross-repo health/consistency audit + live verification

**Session**: examine all the work in this repo, its dependencies, and the statuses of all
relevant repos. Scoped via `/exploring-options` into a **health/consistency audit** (do
docs/claims/couplings actually agree?) with **live verification** of the deployed family,
remediated pragmatically (fix trivial inline, issue the rest) and shipped as one PR bundled
onto the parked `526af8a` visual recon.

**Method**: ground truth only — `git` / `gh` / the project board / the workflow files +
Playwright/curl on live sites. 3 read-only consistency agents (projects.json·docs·cross-repo
surface) + direct live verification. No reliance on doc snapshots.

---

## Headline

The portfolio is in **good health**. The 2026-06-19 visual recon was followed through fully
into tracked issues (1 fixed, 8 open) — **nothing fell through**. The "point, don't copy"
doc discipline holds; the roadmap-drift vector is gone; the board reconciler invariant is
machine-held and green. The only genuinely new drift was a stale version string and two
status mismatches in `projects.json`/docs. The dominant *standing* theme is the **hub↔scaffold
brand bifurcation** (identity spine, #30), re-confirmed live.

## Reconciler / board health (verified)

- **Invariant holds**: `comm -23 (open-tracked URLs) (board URLs)` = **empty**. 86 open
  `tracked` issues (both accounts) all present on the board (180 items after this session).
- **Cron healthy**: last **8/8 scheduled runs `success`** (through 2026-06-20 19:58Z).
- **Board has close→Done automation**: closing #13 auto-moved its card Todo→Done (0 stale-Todo
  cards observed pre-session corroborates this).

## Live verification — core public properties

| Property | HTTP | On-brand / notes |
|---|---|---|
| `brandon-behring.dev` (hub) | 200 | A7 brand reference: warm cream, Fraunces, editorial |
| `ssm-foundations.…` | 200 | scaffold spine (blue `#3B6FA0`/Roboto); **`/favicon.svg` 404s**; H1 = bare repo slug |
| `dml.…` | 200 | scaffold spine; light-body contrast + mobile overflow tracked → dml#46 |
| `claude-books.…` | 200 | **off-brand purple FIXED** (claude-books#27, today) → now scaffold spine |
| `guides.…` + `/ai-engineering/` | 200 | scaffold/guides-family brand |
| `guides.…/experimentation/` | **404** | not yet deployed — repo desc says "Phase 1" target; aspirational, not drift |
| `study-notes.…` (DLAI) | **000** | down — consistent with #32 launch-pending / dlai#1 404s |

**Brand finding**: the family is visually **bifurcated** — hub (warm/Fraunces) vs the
scaffold book+guide family (blue `#3B6FA0`/Roboto). That divergence *is* the identity-spine
issue (#30). Screenshots: `assets/2026-06-20-audit/audit-0{1,2,3}-*.png` (hub ref · claude-books
post-fix · ssm).

## Findings → dispositions

### Fixed inline (this PR)
- `src/data/projects.json:41` — `temporalcv v1.0.0` → **v2.3.0** (PyPI latest; was stale by a major+).
- `CHANGELOG.md` — indexed the previously-unlisted 2026-06-19 cross-property recon + this audit.
- `CURRENT_WORK.md` — header refreshed; #13 note → "closed"; Next-candidates now point at the
  cross-property recon cluster (#29/#30/#31) + the hub↔scaffold split.

### Issue filed
- **#34** — `projects.json` status accuracy: `research-agent` is `in-progress` but the repo is
  **archived** (the active copy is on the `brandonmbehring-dev` account → ties to #5);
  `causal-inference-mastery` is `released`+`featured` with **no release/package/site** (confirm
  intended semantics or demote). Needs judgment → issue, not auto-fix.

### Enriched existing umbrella issues (concrete punch-lists, no duplication)
- **#2 (hygiene)** — topics 0/13; homepageUrl missing 10/13 (incl. live-site repos
  ssm-foundations · double_ml_time_series · claude-books); `guides-ai-engineering` homepage is the
  `*.workers.dev` preview not the production path; claude-books empty description; research-kb
  missing `CITATION.cff`.
- **#30 (identity spine)** — hub↔scaffold bifurcation (live); ssm `/favicon.svg` 404; ssm H1 =
  bare slug; claude-books#27 fixed the purple outlier so the *remaining* gap is exactly this.

### Verified clean / compliant (no action)
- Docs internal consistency: links resolve; frozen snapshots in `website-decision-map.md`
  properly bannered; **roadmap no longer snapshots per-project status** (defers to board).
- `CHANGELOG.md:32` `book-scaffold-astro v4.8.0` — **left as-is**: a dated historical entry
  (version at ship time), compliant by the same dated-snapshot principle as the frozen blocks.
- All 9 recon findings tracked: claude-books#27 (FIXED) · ssm#48 · dml#46 · scaffold#161 ·
  math-guides#1 · dlai#1 · #29 · #30 · #31.

### Reported-only (cross-repo, out of scope to fix here)
- **Account split (#5)** current state: of 7 overlapping pairs, `brandon-behring` is canonical
  for 5; `research-kb` + `temporalcv` are actively dual-pushed (minutes apart); `research-agent`
  is inverted (bb copy archived, dev copy active).
- `dlai-study-notes` repo **description claims "Live at study-notes.…"** while the subdomain is
  down — projects.json itself is correct (no `site_url`); the repo description is aspirational.
  Self-resolves on the #32 launch.
- Upstream bugs `rl_and_control#4`, `dlai-study-notes#1` — reported, not fixed.

## Housekeeping (folded in)
- Closed **#13** (board reconciler tracking issue) — invariant + cron verified; card auto-Done.
- Pruned 3 merged `[gone]` local branches (ts-hints-reconcile · claude-books-card-live ·
  citation-graph-keyboard-selection).

## Corrections to prior assumptions (for the record)
- `projects.json` has **23** top-level entries, not 31 (the higher count included nested
  `external_context` links).
- The "roadmap drifts from projects.json" pattern is **resolved** — roadmap now defers to the board.
- The account-split note that the dev account is the PyPI/CFF anchor looks **stale**: temporalcv's
  published PyPI Homepage/Repository point at `brandon-behring/temporalcv`, the more-recently-pushed
  copy. (Flagged for #5, not acted on.)

## Out of scope
- `/lab` demo deep-dive (deferred to a separate session). Full ~60-repo fleet sweep.
- Auto-merging the PR (left to Brandon; docs-only → deploy-safe on merge).
