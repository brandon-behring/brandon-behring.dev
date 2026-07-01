# 2026-07-01 — Constellation audit: hub + upstream + downstream (deep-adversarial)

**Session**: "audit this repo and examine all upstream and downstream work." Scoped with
Brandon into a **deep-adversarial, full-constellation audit**: the hub (docs + live site),
upstream (deploy-workflows, book-scaffold-astro, npm deps), downstream (all live properties,
sibling repos, Work Tracker board #1, the `brandonmbehring-dev` second account) — outputs =
this report + tracked issues + one doc-drift remediation PR. Audit only; no queued work
executed.

**Method**: ground truth only — `gh` / `git` / npm / curl / real-browser Playwright / the
project board; 9 read-only shard agents + direct verification; `methodology-audit --depth deep`
(mechanical + judgment + external voice); a fresh `property-recon` capture (7 properties × 4
viewports × 2 schemes) diffed against the 2026-06-22 baseline; the in-repo e2e suite; the
Cloudflare RUM export (2026-05-25→06-24) as performance evidence. Every RED/YELLOW finding
below survived an adversarial refute pass (§6) or was cut.

---

## Headline

**Operationally green, documentationally yellow.** Every deploy pipeline is green on
`deploy-workflows@v2.0.2` (or its commit), all live surfaces return 200 (one console error
across 56 recon captures — the ssm favicon 404, tracked below), visual recon shows
**0 regressions and 16 contrast improvements** since 06-22, the
board invariant holds exactly (96 open tracked = 96 Todo), analytics is alive fleet-wide, and
both 2026 paper citations verify to the letter. The drift is all in the *paper trail*: the
hub's 30-second-resume misdirects (its top "Next" item shipped a week ago), the hub actively
denies a live property (`rl-and-control-guide` is deployed + healthy while `projects.json`
claims "Local-only"), the upstream README would `startup_failure` anyone who copies its own
example, and the deep-standardization tracker's body shows 0/13 boxes checked while its
comments record two completed phases.

**Overall: 🟡 YELLOW** — no critical live defect; documentation/process drift concentrated in
exactly the places the queued Phase-2 docs rewrite + this PR's fixes address.

## Per-surface verdicts

| Surface | Verdict | Evidence (spot) | Disposition |
|---|---|---|---|
| Hub docs (trio + decision-map) | 🟡 | CURRENT_WORK.md:13,88-90 vs merged #58 / closed #52; CHANGELOG missing `2756a4e`; decision-map:487-505 vs roadmap.md:63 (all pre-PR refs @ `2756a4e`) | fixed in PR |
| Hub live site | 🟢 | 14/14 URLs 200; e2e **46/46**; recon 0 regressions; 20/20 GitHub links | none |
| Hub data (`projects.json`) | 🟡 | :125 "Local-only" contradicted by live rl-and-control-guide; dead `visual` field + ~516 KB unreferenced screenshots | issues |
| Upstream: deploy-workflows | 🟡 | pins all current (6/6 effective v2.0.2) BUT README 3/5 load-bearing sections false; #4 body 0/13 checked; `v1` tag → v2-line commit; tags-without-Releases | comment on #4 (docs rewrite already queued) |
| Upstream: book-scaffold-astro | 🟡 | 4.26.0 latest (npm) but tag **not on main**; consumers: dlai current, ssm/dml/claude-books @4.25.2, **rl @4.11.0**; CLS mechanics live in published layout | issue (CLS) + rl issue + open decision (main≠npm) |
| Deps (bb.dev) | 🟡 | 13 vulns (6 high; astro+wrangler direct); plain `npm audit fix` clears 8/13, the @astrojs/check chain (5) needs a breaking `--force`; Astro 7 / MDX 7 majors available | issue |
| Live properties (9 surfaces) | 🟡 | all 200, hard 404s, sitemaps OK; dml#46 HIGHs **verified fixed live** (16.9:1; overflow-x ships) — but security headers (CSP/HSTS/&c.) exist on only **2 of 7** Workers properties (hub + study-notes; the ≤4.25.2 scaffold consumers + guides have none), and plain `http://` serves content with **no HTTPS redirect** zone-wide (green-attack findings) | issues (headers, zone defaults, favicons, 404 body) |
| Work Tracker board | 🟢 | invariant exact (96=96, full-sweep); ONE stale In-Progress (eval-toolkit#103, closed 19 days); 113 Done unarchived (54%); reconciler single-owner gap | issue (hygiene bundle) |
| Second account | 🟡 | 17 exact-name dupes fully classified (5 identical · 9 bb-ahead · 1 dev-ahead · 2 **diverged**); research-kb's dev copy took a push 2026-06-29 (**still live**); 9 of 17 are public-on-dev/**private-on-bb**; research-agent consolidation inverted (bb copy archived) | comment on #5 |
| Analytics / observability | 🟢 | beacon live in real browser, token `86559bb2…` on apex + study-notes; RUM flowing | none (methodology note §8) |
| Performance (RUM) | 🟢* | LCP P75 1,370 ms good; poor-tail element **no longer exists** (pre-A7 homepage); CLS 0.274 traced to scaffold sidebar layout | scaffold CLS issue |
| Content claims (2026 citations) | 🟢 | Mamba-3 arXiv:2603.15569 + OpenReview HwCvaJOiCj — **both verified** (ICLR 2026 Oral; verbatim quote checks) | none |

## Method + evidence runs

- **methodology-audit**: mechanical = 24 findings (23 suggestion + 1 warning), **all inside
  dated `docs/sessions/` logs**, zero in the live trio. Deep layer: **gemini OK (194 s),
  codex TIMEOUT at 300 s → degraded to 1 external voice** (recorded, per protocol; codex
  non-functional in this environment since ≥2026-06-24). 3 deep findings, all `confirmed`,
  all inside dated logs; the bundle's machinery flipped its light to RED on one `critical` —
  **downgraded in the judgment layer with git evidence**: the "3,400+ sources / 1.7M chunks"
  wording the 06-11 log records was really applied (`4588218`) and then deliberately removed
  in the 06-18 A7 editorial pass (`d15d197`, the documented anti-vanity-metrics discipline).
  A dated log recording a superseded state is chronology, not contradiction. The two deep
  warnings (06-19 recon log 7-of-9 self-count; 06-01 track1.5 reframe claim) are likewise
  frozen-log internals — footnoted, not actioned. Adjusted hub-docs verdict: **YELLOW**.
  Bundle: scratchpad `methodology-mechanical.json` / `methodology-deep.json`.
- **property-recon**: 56/56 captures OK; **1 console error** across the matrix (ssm
  mobile/light: the `/favicon.svg` 404 → the ssm favicon issue below; initially summarized as
  "0" — corrected by the green-attack refuter recomputing from the raw JSON); diff vs 2026-06-22 (48-capture
  baseline `20260622T210854Z`): **0 regressions · 0 drift · 16 improvements** (dark heading
  contrast 1.18 → 7.84 on claude-books/dml/guides/ssm — the scaffold ≥4.25.3 fix propagated) ·
  +8 study-notes captures (new). Supplementary rl-and-control capture: 8/8 OK, dark heading
  7.84 (AA) despite scaffold 4.11.0. NOTE: the recon default config predates study-notes and
  rl-and-control-guide — both added ad hoc for this audit.
- **e2e**: 46/46 pass (18.7 s) — suite grew from 42 with #56's stability-region specs.
- **deps**: `npm outdated` — astro 6.3.5 (wanted 6.4.8, latest **7.0.5**), @astrojs/mdx 5.0.6
  (latest **7.0.1**), wrangler 4.93.1→4.106.0, TS 6.0.3 exists. `npm audit`: 13 vulns
  (1 low / 6 moderate / 6 high); prod-only view: 4 (2 high, vite chain); `astro` and `wrangler`
  are direct-dep highs. `npm audit fix --dry-run`: **8/13 clear plain**; the @astrojs/check
  chain (5) only via `--force` (breaking 0.9.9→0.9.2 downgrade) — the raw `fixAvailable: true`
  flag conflates the two (refuter-corrected).
- **Real-browser beacon check**: apex + study-notes load `static.cloudflareinsights.com/beacon.min.js`
  (token `86559bb26c0d485990aa24abc0a5ec4d`) — zone auto-injection healthy; curl never sees it
  (edge injection is request-conditional) → §8.
- **Board**: single 210-item fetch (no truncation), GraphQL full-sweep of item↔issue state.
- **Citations**: arXiv abs + HTML, ICLR virtual site, co-author page (OpenReview itself
  bot-gated; triangulated).

## Findings → dispositions

### Fixed in this PR (trivial doc drift only; line refs cite the PRE-PR state at `2756a4e`)
1. `CURRENT_WORK.md` — "Right Now" narrated PR #58 as in-flight (merged 2026-06-24, `d6d9eeb`);
   forward-item-1 said "build #52" (shipped 2026-06-23 in PR #56, `d2f4d96`; #52 closed); the
   2026-07-01 SSM-viz dated check (moot — resolved by shipping); dlai pipeline said "Workers
   Builds" (migrated to Actions + worker `brandon-behring-study-notes`, 2026-06-24).
2. `CHANGELOG.md` — missing entry for HEAD `2756a4e` (@v2.0.2 pin + `pull-requests: write`);
   + this audit's line. The frozen 06-24 dlai entry gains a dated bracket-annotation (pipeline
   migrated to Actions later that day) rather than a rewrite — freeze respected, contradiction
   closed.
3. `docs/website-decision-map.md` §"Open Decisions For Later" — **all 6** remaining unstruck
   decisions had grounded resolutions and are now struck with dates (identity framing → ratified
   2026-06-23 · post_transformers positioning → A2 2026-06-22 · homepage balance → A7/A3
   2026-06-18 · first demo → A4 2026-06-10 · content-collections → A6 2026-06-18 · visual
   approach → A7 2026-06-18), plus a "None open as of 2026-07-01" header note; the section had
   contradicted `roadmap.md:63` "None open". (Audit initially scoped 3; grounding against
   roadmap A1–A8 showed all 6 were resolved.)
4. `.gitignore` — the untracked 202 KB Cloudflare RUM PDF in root (evidence artifact; sibling
   audit tarball was already ignored). Pattern is the email-free glob `/Analytics*Cloudflare.pdf`
   — the literal filename embeds the account email (codex refute-pass catch).

### Issues filed
- **(book-scaffold-astro#187) book-scaffold-astro — RUM CLS 0.274 (poor) in the sidebar chapter layout** (P2).
  Element `div.layout-with-sidebar > main.layout-main > article.prose` (10 counts, Cloudflare
  RUM 05-25→06-24). Live mechanics in the published package: Roboto Variable
  `font-display: swap` with no metric-matched fallback/preload (`package/layouts/Base.astro:41`,
  `tokens.css:67`); KaTeX `font-display: block` reflow; `Figure.astro:64` `<img>` fallback
  without dimensions. Dedupe: no existing CLS/perf issue (full 23-issue sweep); related-only
  #169 (KaTeX baseline), #160 (analytics injection).
- **(#59) brandon-behring.dev — surface rl-and-control-guide (live but denied)** (P2).
  `rl-and-control-guide.brandon-behring.dev` = 200, Actions @v2.0.2, recon-clean — but zero
  hub links and `projects.json:125` claims "Local-only; publishing surface … planned".
  Curation call on placement (cluster/corpus/flagship) is Brandon's; the false claim is not.
- **(#60) brandon-behring.dev — dead `visual` pipeline** (P3). `content.config.ts:53`
  defines `visual`; 4 entries carry it; **no component renders it** (post-A7); ~516 KB of
  unreferenced `public/screenshots/*.png` ship in every deploy. Prune or re-wire (the RUM LCP
  poor-tail was this asset, on the pre-A7 homepage).
- **(#61) brandon-behring.dev — deps currency + audit** (P3). Plain `npm audit fix`
  (in-range) clears **8 of 13** vulns (astro→6.4.8, wrangler→4.106.0, esbuild, js-yaml, undici,
  vite, ws, miniflare); the remaining 5 (the `@astrojs/check`→`yaml-language-server`→
  `volar-service-yaml`→`yaml` chain) need `npm audit fix --force`, which **downgrades
  @astrojs/check 0.9.9→0.9.2 as a breaking change** — evaluate separately. Astro 7 / MDX 7
  majors = separate decision. (Original "all 13 in-range" claim refuted by the R1 refuter via
  `npm audit fix --dry-run`.)
- **(rl_and_control#6) rl_and_control — property hygiene: favicon.svg 404 + scaffold 4.11.0→4.26.x** (P3).
  HTML references `/favicon.svg` (404); lockfile 15 minors behind (recon-clean today, but
  pre-dates the 4.25.3 contrast fix line — passes by luck of its vintage, and misses a month of
  scaffold fixes).
- **(ssm-foundations#50) ssm-foundations — favicon.svg 404** (P3). Found 2026-06-20 (audit), noted in
  CURRENT_WORK:104 as a pickup check, confirmed still 404 today — 11 days as a known broken
  reference tracked only inside a blocked strategic issue (#30). Per-repo one-file fix.
- **(deploy-workflows#5) deploy-workflows — standardize `not_found_handling` (empty-body 404s fleet-wide)**
  (P3). All 7 Workers properties return **0-byte** 404s while a styled 404 page exists and
  builds (`/404.html` → 200). One wrangler.jsonc key per consumer; the pattern home is the
  reusable's docs.
- **(#62) brandon-behring.dev — board hygiene follow-on to #13** (P3). eval-toolkit#103
  stuck In-Progress 19 days post-close (only status drift in 210 items); 113-item (54%) Done
  pile with no archive automation; reconciler searches `--owner brandon-behring` only (a future
  second-account tracked issue would be invisible).
- **(book-scaffold-astro#188) book-scaffold-astro — ship a default `public/_headers` (security headers missing
  on 5 of 7 Workers properties)** (P2). CSP/HSTS/permissions-policy/referrer-policy/
  x-content-type-options present on the hub + study-notes only. Mechanism confirmed: headers
  come from a per-repo `public/_headers` file — the hub's dates to 2026-06-01 (Track 1.6);
  **dlai hand-rolled one at launch** ("mirrors brandon-behring.dev house style, adapted for a
  book-scaffold-astro consumer" — CSP allowances for the scaffold's inline scripts + Pagefind
  WASM already worked out). ssm/dml/claude-books/rl never got one; guides (non-scaffold) also
  bare. dlai's file is the ready adapted template — scaffold should ship it as a default (or
  each consumer copies it). A green-attack refuter finding this audit's own health matrix missed.
- **(#63) brandon-behring.dev — zone-level web defaults: HTTPS redirect + www** (P3).
  Plain `http://` returns 200 content (no redirect; HSTS only where headers ship) — enable
  Cloudflare "Always Use HTTPS" or an edge rule; and `www.brandon-behring.dev` is NXDOMAIN
  (no CNAME) — add a redirect record or record apex-only as a decision. CF-dashboard-side;
  Brandon-run.

### Existing issues enriched (comments, no new filings)
- **deploy-workflows#4** — body checkboxes 0/13 vs two completed phases in comments; README
  quantified stale (3/5 load-bearing sections false today: the caller example pins `@v1` with a
  permissions block that lacks `pull-requests: write` — the requirement **introduced in
  v2.0.2**, so the example as literally pinned still runs, but anyone updating its ref to the
  current `@v2`/`@v2.0.2` — where all 6 real consumers live — hits `startup_failure` [refuter-
  sharpened nuance]; versioning section claims "@v1 current / 3 consumers" vs 6 consumers on
  v2.0.2/@v2 and 0 on @v1; Phase-2 roadmap lists dlai as "currently Cloudflare Pages" [it
  shipped 06-24] + `post_transformers` [descoped] + omits the actually-queued guides pair);
  `v1` floating tag points at v2.0.1's commit (`0cf3b05`), not v1.0.1's — convention break,
  impact nil (0 consumers); tags have no GitHub Releases. All = inputs to the queued docs
  rewrite, not new work.
- **brandon-behring.dev#5** — full 17-pair divergence table (compare-API-grounded, zero
  UNKNOWNs): 5 IDENTICAL · 9 BB-AHEAD · 1 DEV-AHEAD (concentrate-exercise holds a dev-only
  2026-05-28 "pre-desktop-transfer" WIP commit — salvage before sweep) · 2 DIVERGED
  (research-kb, llm-eval). Reconciles roadmap's "8": that was the *both-sides-public* subset;
  the other 9 are **public-on-dev / private-on-bb** — in-scope and more sensitive, no
  out-of-scope excuse. research-kb's dev copy is **actively re-diverging** (a checkout still
  pushes to dev — 2026-06-29, 36 min after bb's own push); llm-eval's dev tip is verbatim the
  lever#17 mis-wired-remote example; research-agent's consolidation is **inverted** (bb copy
  archived, dev copy live). Sweep order: 14 safe now (dev ⊆ bb); hold research-kb / llm-eval /
  concentrate-exercise until remotes reconcile via lever#17.
- **double_ml_time_series#46** — both HIGH defects verified fixed on live (`overflow-x:auto`
  confirmed in served HTML; body contrast ≈16.9:1 **computed from the served token values**
  `#1A1A19`/`#FDFCF9`, not browser-measured); remaining = LOW tail (sidebar placeholder, Part
  labels) → suggest downgrade/close-after-retest.
- **brandon-behring.dev#30** — favicon 404 evidence refreshed (ssm still, + rl-and-control-guide
  same class); per-repo quick fixes split out (rl_and_control#6/F) so they stop waiting on the blocked
  shared-wordmark work.

### Reported-only (Brandon decisions — see §7)
- book-scaffold-astro: npm-latest v4.26.0 not an ancestor of `main` (38 files, +1034/−586 on
  `feat/v4.26-book-aware-nav`) — deliberate WIP or release-hygiene gap?
- ssm/dml/claude-books scaffold ^4.25.2 → 4.26.0 bump wave: Brandon-driven per propagation
  protocol (`git status` first; WIP + stash on some clones).
- `projects.json` `status` fields: 6/7 live properties say "in-progress" — curated-by-design
  (DOC-CONVENTIONS:50), but "released" exists for only 1 live property; freshness policy is a
  curation call.
- guides + guides-ai-engineering pre-migration (Workers Builds; last builds 06-14/06-21) —
  already queued as deploy-workflows#4 Phase 1b; NOT re-filed.
- dml on floating `@v2` — already deferred in #4; resolves to v2.0.2's commit today.

### Verified clean (no action)
- Consumer-pin matrix: 6/6 callers effectively v2.0.2; zero `@main`/stray refs account-wide.
- Board reconciler invariant: exact (96=96), zero closed-issue Todos, zero reverse anomalies.
- Both 2026 citations (title/8 authors/venue/Oral/verbatim quote).
- dml#46 HIGH remediations live; claude-books dark-heading contrast fixed fleet-wide (recon).
- Hub e2e 46/46; all first-party surfaces 200; hard 404 status codes everywhere; analytics
  beacon + token fleet-wide; workers.dev preview canonicalizes to apex.

### Refuted during the audit's own verification (kept as method lessons, §8)
- "Sitewide analytics beacon outage" — curl artifact; real browser shows the beacon.
- "LCP poor-tail = current image perf problem" — the offending element left the site in the
  06-18 A7 redesign; reframed as dead-asset hygiene (#60).

## Adversarial refute pass (§6)

**Five independent families** reviewed the staged report + diff: Claude-blind (payload-only,
5 findings) · codex `gpt-5.5 @ xhigh` via `adversarial_review.py --uncommitted` (5) · gemini
`3.1 Pro (High)` same engine (4) · cold refuter R1 (re-derive every 🟡/RED + PR claim from
primary evidence; 68 tool calls incl. a live e2e re-run + a scaffold clone re-diff) · cold
refuter R2 (green-attack: assume every 🟢 hides a miss). Voice health: codex OK here (it had
timed out at 300 s inside methodology-audit's deep engine earlier — both statuses recorded).
Tool-grounding: `git check-ignore`, `git log -S`, `npm audit fix --dry-run`, live curl/DNS,
grep — per the no-exec default (docs-only diff; `--ground-exec` not used).

**Pool: 20 merged findings** (voice-labelled details in the run artifacts). Tally:

| Tier | n | Findings (→ outcome) |
|---|---|---|
| Verified (tool/execution-confirmed) | 9 | §6-empty-vs-headline (→ this section); TBD tokens unfiled at review time (→ filed + backfilled before commit); **#61 "all in-range" FALSE** (→ rewritten: 8/13 plain, 5 need breaking `--force`); .gitignore embedded the account email (→ email-free glob); report said "3" decision strikes vs 6 in the diff (→ corrected); recon "0 console errors" FALSE — 1 (ssm favicon) (→ corrected); security headers missing on 5/7 properties (→ new issue); no HTTP→HTTPS redirect + www NXDOMAIN (→ new issue); "/lab gallery" wording overclaimed embed-only demos (→ reworded) |
| Majority (≥1 other family) | 3 | pre-PR line refs ambiguous after the diff rewrites the files (→ `@2756a4e` qualifier); frozen 06-24 CHANGELOG entry contradicted the fix (→ dated bracket-annotation, freeze respected); `pull-requests: write` claim needed the v2.0.2-only nuance (→ sharpened here + in the #4 comment) |
| Individual (kept, author-only) | 5 | #57 attribution wording (→ fixed); all-struck section readability (→ "None open" note); dml 16.9:1 is token-computed not browser-measured (→ qualified); CHANGELOG entry vague on counts (→ backfilled); multi-line `~~strikes~~` GFM risk (→ joined to single lines) |
| Declined with rationale | 2 | CURRENT_WORK snapshot numbers (dated audit results are exactly what a session-granular resume holds); `·` separator cosmetics (house style) |
| False-positive (cut) | 1 | "@v1 README example would startup_fail today" as originally phrased — R1 showed v1's target commit doesn't require the permission; the substance (stale README) stands, the mechanism was version-specific |
| Disputed (→ Brandon) | 0 | — |

Pre-pass self-refutations (already in §Refuted-during-audit): the curl-based "beacon outage"
and the "current LCP image perf problem" — both killed by better instruments before this pass.

**Net effect**: 2 findings materially rewritten (#61, #4-comment nuance), 2 new issues added
(headers, zone defaults), 6 wording/evidence corrections, 1 verdict downgrade
(live properties 🟢→🟡). No surviving finding lacks primary evidence.

**Final gate (independent-review skill, post-filing)**: two fresh cold shards over the
finished diff. Diff shard **PASS 8/8** (all 10 filed issues + 4 comments verified live with
matching titles/dates; SHAs, links, tally arithmetic, markdown all clean). Consistency-refute
shard **PASS** with 2 DRIFT + 1 nit, fixes applied: decision-map "None open" note no longer
asserts date-parity with roadmap's 2026-06-23 stamp; CURRENT_WORK's inline sweep counts
trimmed to a pure pointer (point-don't-copy); CHANGELOG's bare "#5" disambiguated to bb.dev#5.
Per the audit's one-report discipline, this section is the review record (the skill's separate
`-review.md` session log is folded here).

## Open decisions for Brandon (§7)
1. **rl-and-control-guide placement** — surface it where (cluster page, corpus index, flagship,
   or deliberately unlisted)? (#59 carries the fix once decided; the stale "Local-only" copy
   should change regardless.)
2. **Scaffold main vs npm-latest** — merge `feat/v4.26-book-aware-nav` or keep publishing from
   the branch?
3. **Board Done-archive** — archive the 113 closed cards (board scale is 54% dead weight)?
4. **Astro 7 / MDX 7 majors** — schedule or defer (in-range fixes are #61 regardless).
5. **The RUM PDF's permanent home** — it stays gitignored-in-root as of this PR; keep, move to
   `docs/sessions/assets/`, or delete after this report?
6. **Stale local branches** — 4 squash-merged branches listed in the PR body for deletion.

## Corrections to prior assumptions (§8)
- **curl cannot verify Cloudflare edge-injected content** — the Web Analytics beacon is
  auto-injected per-request for real browsers only. Method rule: beacon/injection checks need
  Playwright, not curl. (This audit's own explorer produced the false positive.)
- **RUM debug elements can outlive the DOM that produced them** — always check the element
  still exists before filing a perf issue (the `div.project-visual` LCP offender was two
  redesigns old).
- **`gh search code` is unreliable on this account** (1 of 7 real consumers found) — enumerate
  per-repo workflow files instead.
- CURRENT_WORK:104's "verify ssm favicon.svg 404 at pickup" was correct and is now tracked
  properly (ssm-foundations#50).

## Housekeeping / out of scope (§9)
- The 4 stale local branches (squash-merged #53/#54/#56/#58) — deletion commands in the PR body
  (not a commit).
- `website_thoughts.md` (37 KB root) + `docs/visual-design-options-report.md` sit outside the
  DOC-CONVENTIONS trio; historical inputs, left as-is (noted for a future docs sweep).
- `.ruff_cache/` stray in an Astro repo — ignorable transient.
- 24 broken `path:line` citations in dated session logs — frozen artifacts by policy; one
  placeholder link `[session](…)` in the 06-22 #29 log (warning-tier) left frozen too.
- Dependabot piles elsewhere (ir-eval 10, temporalcv 6) — their repos' concern; visible on the
  board.

## Reference (§10)
- Evidence bundle: scratchpad (`audit-start-git-state.txt`, `methodology-*.json`,
  `recon-20260701/`, `recon-rl/`, `e2e-20260701.log`, `board-raw.json`,
  `board-todo-index.txt`, `second-account-divergence.md`).
- Prior audits: `2026-06-20--cross-repo-health-audit.md`, `2026-06-23--longterm-plan-audit.md`.
- RUM export: the gitignored PDF in repo root (2026-05-25→06-24).
