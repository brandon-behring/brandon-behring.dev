# 2026-06-23 — Long-term-plan audit + forward review

**Type:** methodology + internal-consistency audit (project-level), then a forward strategic review.
**Trigger:** Brandon — *"review and audit the whole long term plan for brandon-behring.dev and double
check everything — don't assume documentation is accurate and test your assumptions and claims."*
**Method:** `/methodology-audit` judgment layer run read-only (its Context Guard forbids the deep
script in plan mode) — 3 fresh-context verification shards (live-site · GitHub+git · cross-doc) +
an added claim-safety / stub-check sweep, every contested finding ground-verified against the
artifact (`curl` / `gh` / `git` / Playwright / source reads). Deep multi-voice corroboration (R5,
codex+gemini) run post-approval — result appended at the end.

## Scope — the "long-term plan" = 6 artifacts

`docs/roadmap.md` · `CURRENT_WORK.md` · `CHANGELOG.md` · `docs/website-decision-map.md`
(strategy, mostly frozen-by-design) · `docs/DOC-CONVENTIONS.md` · and the out-of-repo cross-repo
plan `~/.claude/plans/i-want-to-look-streamed-pebble.md`.

## Verdict

**🟢 GREEN — in-repo docs + live site.** **🟡 YELLOW — the out-of-repo coordinated plan** (28 days
stale + self-contradictory). The drift Brandon worried about is largely absent in-repo; the two
shard "CRITICAL"s both dissolved under grounding. One real in-repo finding the *first* pass missed
and the deeper re-score caught: the documented **identity** had drifted from the live hero.

## What verified TRUE (claim → ground truth)

| Claim (doc) | Ground truth | ✔ |
|---|---|---|
| All main routes 200 + render | `/`,`/work/`,`/work/<slug>`,`/work/books-and-guides/`,`/lab/`,`/lab/research-graph/`,`/lab/why-discretization-matters/`,`/research/`,`/publications/`,`/how-this-was-made/` | ✔ |
| research-graph "119 / 460" | live `__cyGraph` = 119/460; committed `rl_citation_graph.json` = 119/460 (exact, both ends) | ✔ |
| `/research` = threads + RL (PR #44) | 4 thread cards incl. "Reinforcement learning & control" + "how it's backed" | ✔ |
| corpus index = 5 properties | exactly 5 (incl. ssm-foundations + dml tagged) | ✔ |
| Issues #13/#36 closed; #1/#2/#5/#30/#31/#32/#33 open | `gh` confirms every state; #2/#30/#33 not "bb.dev-only" labeled | ✔ |
| PRs #28, #41–#51 merged | all `MERGED` | ✔ |
| Lever #38/#39/#40 merged; `property_recon.py` + audit doc on master; 61 tests | all MERGED; both files 200; "61 passed" | ✔ |
| temporalcv consolidated + CITATION.cff; dupe still on dev acct | both confirmed (sweep unfinished = #5) | ✔ |
| CITATION.cff on research-kb / ir-eval / dlai-study-notes | all 200; dlai-study-notes public | ✔ |
| #2 metadata batch (homepage URLs + topics) | ssm-foundations, claude-books, brandon-behring.dev, double_ml_time_series all correct | ✔ |
| content-collections (`src/content.config.ts` Zod + `portfolio.ts` `getCollection()` + `visibleClusters`) | code confirms | ✔ |
| decision-map `:493` / `:398` line refs · sitemap · RSS | resolve; `/sitemap-index.xml` 200, `/rss.xml` 200 | ✔ |
| No broken internal doc links | every relative link in the 5 in-repo docs resolves | ✔ |

## Expanded sweep — claim-safety + stub-check (live)

- **Claim-safety: 🟢 all 6 decision-map checklist items CLEAN.** Prompt-injection = "methodology
  PoC / research study", "deployment out of scope"; `/publications/` = exactly 5 papers (no
  inflation); no vendor/proprietary/private facts; maturity labels correct.
- **Stub-check: 🟢 siblings are REAL content and exceed their snapshots** — `ssm-foundations` **17
  ch** (frozen doc said 6), `dml` **10 ch** (memory baseline 1), `claude-books` **3 books / 48+ ch**
  (plan said "Phase-0 outline"). The ALPHA-stub foot-gun is not present now.

## Debunked (shard false-positives — grounding caught these)

- **"`dml` repo missing → #2 PARTIAL"** — FALSE: repo is `double_ml_time_series`; `dml` is the
  subdomain; metadata present + correct → #2 fully TRUE.
- **"Rosetta table confused / unlabeled"** — FALSE: `roadmap.md` table columns are labeled
  `Site | Portfolio | State` and the Phase-2 collision is explained.
- **"CRITICAL: docs say 7-item nav, reality 8"** — OVER-STATED → NOTE: the "7-item" mentions are
  historical A7-milestone records; A8 records the +Research entry (7→8); `Header.astro` is the
  8-item SSOT. (The shards' "Work·Lab·Research·Publications" 4-item phrasing came from agent memory;
  separately `website_thoughts.md` *did* carry an obsolete "Home, Work, About, Contact" nav snapshot —
  the pre-redesign state, now marked superseded via R4. So no *current* repo doc misstates the nav.)

## Findings acted on

| Sev | Finding | Fix |
|---|---|---|
| YELLOW | Coordinated plan 28-days stale + self-contradictory (`~/.claude/plans/i-want-to-look-streamed-pebble.md`) | **R1** archive-with-pointer header (direct, out-of-repo) |
| NOTE→fix | Documented **identity** drifted: roadmap A1 + decision-map "Decisions Locked" said "Framing 4 / build-to-learn" but the live hero is *"Applied-math rigor for auditable AI"* | **R7** ratify the live identity in both docs (re-score: ~37/40 vs ~30/40) — no site change |
| NOTE | roadmap "Resolved decisions" omitted token-SSOT (#33) | **R2** add the #33 bullet |
| NOTE | roadmap inline "8 overlapping repos" snapshot | **R3** snapshot-tag ("8 as of 2026-06-22; live → #5") |
| NOTE | `website_thoughts.md` unmarked as superseded | **R4** superseded header |
| — | `CURRENT_WORK` said "backlog exhausted / await direction" (now false) | **R8** refresh to the forward program |

**Not changed (verified correct):** the site, all routes/demos/subdomains, every GitHub claim,
`CHANGELOG.md` (its "7-item nav" is a correct historical record), the Rosetta table, #2.

## Forward review (Brandon-directed, /exploring-options)

The audit established the site is mature + honest, so forward work is optional, not catch-up.
Decisions:

- **F-A identity** — re-scored against the live hero; **ratified** *"Applied-math rigor for
  auditable AI"* (a rigor/auditability-led bridge; the auditability lead is distinctive and
  evidence-backed). Captured as R7. No hero change.
- **F-B SSM stability-region visualizer** → [#52](https://github.com/brandon-behring/brandon-behring.dev/issues/52):
  `StabilityRegion.astro` as a new section in the explainer; full interactive canvas (DeltaNet vs
  Longhorn); **ch12-grounded** (`ssm-foundations` ch12 tested impls) + **adversarial-reviewed** +
  Playwright model-seam. Resolves the deferred SSM-viz decision (style = stability-region).
- **F-C dlai launch** → #32: verified to collapse to a **deploy task** (repo already public;
  `deploy-workflows@v2` exists with `apt-packages`) + a CF-dashboard bind (Brandon) + a bb.dev
  `projects.json` entry. The month-old plan's "sensitivity review" gate is moot.

## R5 — deep multi-voice corroboration (codex + gemini)

`methodology_audit.py . --depth deep` — **both voices OK**: codex (gpt-5.5 @ xhigh, 281s) +
gemini (3.1 Pro High, 178s); 18 raised → 17 tiered judgments. Run against the *working tree*
(my uncommitted edits included).

- **Corroborated the 🟢 in-repo verdict:** no `confirmed`/`disputed` finding contradicted any row
  in §"What verified TRUE"; the identity question came back `confirmed`-critical, independently
  validating the F-A finding that the lead needed ratifying (R7 did it).
- **Surfaced 4 real drift items my 3 shards missed — all fixed in this PR:**
  - **N1** (`roadmap.md` A1, my own draft edit): "3 visible clusters" was stale — `clusters.json`
    has **8** clusters and the homepage renders a curated `landingFlagships` roster, not 3 clusters.
    Rewrote A1 to describe the real structure (caught the error before commit).
  - **N2** (`src/data/projects.json` book-scaffold-astro `whats_next`): framed the **shipped**
    Phase 6a Provenance component (v4.8.0) as *upcoming* — a **user-facing** stale claim (renders on
    the project card) that `2026-05-30--drift-review.md` identified but parked "awaiting decision"
    ~24 days ago. Rewrote to past-tense + a real next. *(The one rendered-data-file change in this PR.)*
  - **N3** (`roadmap.md:18`, the lone `disputed`): "as of 2026-06-22 the lead is #29" — #29 shipped;
    also self-violated the "don't duplicate the issue sequence" rule in the same sentence. Dropped.
  - **N4** (`README.md:24`): "homepage shows the `now`-section clusters" — obsolete; the homepage
    uses the curated `landingFlagships` roster. Corrected.
- **Not actioned (by design):** the remaining `suggestion`s were dated session-logs' internal
  `path:line` citations going stale (expected for historical records) or context describing the
  draft/hook mechanisms — no live claim affected.

**Net:** R5 confirmed the headline verdict and earned its cost by catching 4 drift items (1 in my
own draft, 1 user-facing) the shard pass didn't. Final state after N1–N4: the in-repo docs + the
one rendered claim are now consistent with the live site.

## Independent review (pre-commit gate)

Two cold `independent-reviewer` shards over the remediation diff + this log (conclusions withheld).

- **Shard A — claims + diff: PASS.** All 5 spot-claims verified TRUE against ground truth: live hero
  = "Applied-math rigor for auditable AI" (`index.astro:26`, verbatim); `clusters.json` = 8 +
  homepage uses `landingFlagships`; Phase 6a shipped at **v4.8.0** (CHANGELOG + npm + the v4.8.0 tag
  message); #29 CLOSED; research-graph **119/460** exact; `projects.json` valid; links resolve. One
  *info* note: `/research` is a 307→`/research/` trailing-slash redirect (canonical URL is 200) —
  standard, left as-is.
- **Shard B — cross-doc consistency: FAIL → fixed.** Caught a real inconsistency I introduced:
  `roadmap.md` still listed "SSM visualizer style" as the open decision deferred to 2026-07-01, while
  CURRENT_WORK + this log + #52 had it resolved. **Fixed** — roadmap Current-focus + Resolved +
  Open-decisions now record it decided (stability-region → #52). Re-verified: #52/#32 OPEN with
  matching titles; the R3 "8 as of 2026-06-22; live → #5" + projects.json "v4.8.0" snapshots are
  DOC-CONVENTIONS-compliant (dated + pointered); no residual "build-to-learn / 3 clusters / backlog
  exhausted" as a current claim.
- **Coverage gaps (not_reviewed):** live demo-seam re-execution; npm-publish of v4.8.0 (Shard B did
  confirm it); the out-of-repo coordinated-plan archive header (R1, outside `git diff`); sibling
  chapter-counts. These were covered earlier in the audit (live-site + GitHub shards) or are R1's
  direct out-of-repo edit.

## Adversarial review (PR #53 — 3-voice: Claude + codex + gemini)

Refute-mode review of the #53 diff, run because verify-mode (the independent-review above) structurally
misses cross-doc consistency issues. Voices OK: codex (gpt-5.5 @ xhigh, 5 findings) + gemini (3.1 Pro,
2) + blind Claude (5). Every finding **tool-grounded** by reading the source of truth. It caught **5
real issues the prior two layers missed** — the strongest argument for the extra pass.

**Verified → fixed (5):**
- *[codex warning] README draft+flagship footgun* — `draft: true` on a `FLAGSHIP_PROJECT_SLUGS` slug
  throws `landingFlagships: unknown project slug` at build (`portfolio.ts:143`). Added the invariant to README.
- *[codex warning] roadmap Current-focus cited #52* — violated the section's own "not a single tracked
  issue" rule. Removed the SSM-viz bullet from Current-focus (decision lives in Resolved-decisions + #52).
- *[codex warning] A1 vs A3 contradiction* — A1 said "curated flagship roster", A3 still said
  "Now-clusters lead". Reconciled A3.
- *[gemini warning] Debunked nav mis-attribution* — this log claimed the 4-item nav was "agent memory,
  not a repo doc", but `website_thoughts.md` carried "Home, Work, About, Contact" (now superseded via R4).
  Corrected the wording above.
- *[codex+Claude suggestion] `/research` is 307→`/research/`* — the routes row said plain 200; switched
  to the canonical trailing-slash URL.

**False-positive → dropped (1):** *[gemini warning] "token-SSOT added to standing work, not Resolved
decisions"* — REFUTED: `roadmap.md:53` is under "Resolved decisions (2026-06-22)"; gemini misread the
diff's hunk-context header.

**Minor (Claude) → 2 applied:** CURRENT_WORK double-"1." lists → bullets; website_thoughts "8 items"
snapshot → "grown past those four". Left as-is: two dated Resolved-decisions sections (fine); doc emoji;
CHANGELOG out-of-repo-archive wording (transparent + acknowledged in not_reviewed).

## Pre-merge cold sweeps (Brandon's "anything before we merge?" gate)

The gate fired twice more and earned it both times — each found drift the diff-scoped reviews couldn't:

- **Whole-file consistency sweep** (the adversarial pass was diff-scoped, so it never saw *unchanged*
  lines): caught 2 SSM-viz contradictions in `CURRENT_WORK.md`'s tail ("Resolved 2026-06-22" + "Standing"
  still read deferred/2026-07-01 while the Forward program said decided→#52) + a `roadmap` "identity =
  build-to-learn" pointer → fixed.
- **Cold cumulative-diff refute pass** (the post-adversarial *fixes* had only been self-swept): caught the
  `website-decision-map.md` "Portfolio Cluster Audit" frozen banner still reading "now **closed** (Framing 4
  / build-to-learn locked)" — a present-tense residual contradicting the ratified "Decisions Locked" 75
  lines above (the earlier adversarial gemini had hand-waved it "frozen = fine"). → fixed; the §"Debunked"
  "no residual build-to-learn" claim is now accurate.
- **Cold review of PR #54** (no prior independent eyes): caught a footgun ("escalate **to**
  /adversarial-review" read as *instead of* independent-review, but adversarial-review doesn't write the
  pre-commit marker → gate stays blocked) + a dangling "that session log" reference → fixed in #54.

Lesson reinforced: the layer that reviews the *fixes* (and the *unchanged* siblings) is where
self-introduced drift hides — six layers in, the cold cumulative read still found one.
