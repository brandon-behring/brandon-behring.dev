# Handoff — clean session pickup (2026-06-02)

> **⚠ HISTORICAL — superseded 2026-06-09.** Everything below (board counts, open-issue
> sets, "decide track A/B/C/D") is a dated snapshot, kept for the audit trail. It was
> superseded by [`2026-06-09--audit-densify-node24.md`](2026-06-09--audit-densify-node24.md);
> for live state read the [board](https://github.com/users/brandon-behring/projects/1).

> For a fresh session. Read this, then **re-query board #1 with `gh`** (it works now — see
> below) before deciding. Don't re-derive status from `roadmap.md`. Verify is-it-done/live
> via `gh`/`curl`/Playwright, not notes (`[[verify-rendered-reality-not-notes]]`).
> **Supersedes `2026-06-01--next-session-handoff.md`** — its two recommendations (clear
> insurance#11, then A4-1a) are now both shipped.

## TL;DR — what's true right now (verified 2026-06-02)
- **`gh` WORKS again** — just use it. Static binary at `~/.local/bin/gh` (v2.93.0), shadowing
  the broken snap. See `[[gh-snap-broken-in-sandbox]]` (renamed in spirit to "FIXED").
- The **A4 demo is a literal pure consumer** (`/lab/research-graph/`, prod 200): the curation
  overlay lives in `rl_and_control` and the exporter emits it; the post-export enrich script
  is gone. `insurance-ai-toolkit#11` is closed. The portfolio site is in good shape.
- **17 open items on board #1.** The single highest-priority open work (the only P1 + two of
  three P2s) is in **`research_toolkit`** — a *non-portfolio* repo/workstream. Decide whether
  that's "our" backlog or a separate track.

## Shipped 2026-06-01 → 06-02 (all deployed + verified)
- **A4 *1a* overlay consolidation** — folded the 8 curation overrides + short-label recompute
  into `rl_and_control/references/graph_overrides.json` + `build_graph_export.py`
  (`load_overrides`/`short_label`/`apply_overrides_and_labels`); **deleted**
  `brandon-behring.dev/scripts/enrich-citation-graph.mjs`. JS→Python port proven faithful
  (fidelity pre-check + regen both 0 rendered-field diffs; only edge `weight` 1→1.0 + metadata
  changed). Commits `rl_and_control e15b5b0` (Closes #1) + `brandon-behring.dev e993fab`
  (Closes #3); 29 tests, 2 cold review shards PASS, prod model-verified (95n/51e, DPG correct).
- **insurance-ai-toolkit#11** — dead Streamlit "Live Demo" link reframed to "Web UI (run
  locally)"; commit `478d966` (Closes #11).
- **`gh` fixed** — diagnosed (snap healthy; `snap-confine` can't get a systemd user scope in the
  Bash exec context → *any* snap CLI fails silently here) + installed the static binary. Memory
  `[[gh-snap-broken-in-sandbox]]` flipped to FIXED with the re-fix recipe.

## The backlog (board #1 — authoritative; re-query to refresh)
`gh project item-list 1 --owner brandon-behring --format json --limit 200`
— 24 Done / **17 Todo**. The Todo set, by priority:

- **P1 (1):** `research_toolkit#22` — `/dataset-synthesize`: mark candidate / dogfood pending.
- **P2 (3):** `research-kb#13` (ingest Rust pedagogical sources) · `research_toolkit#23`
  (skill-registry parity: `/dataset-synthesize` not installed) · `research_toolkit#24`
  (`/dossier-audit` promises a sub-agent spawn it doesn't do).
- **P3 (10):** `brandon-behring.dev#1` (synthesis-map integration) · `brandon-behring.dev#2`
  (portfolio-wide hygiene: repo homepages/topics, CITATION.cff, OG images) ·
  `annuity-pricing#11` (publish to PyPI → flips it to "released" on the site) ·
  `causal_inference_mastery#12` + `eval-toolkit#88` (decision-log ADR sets) · `research-kb#21`
  (corpus-wide metadata backfill) · `research_toolkit#21/#25/#26/#27` (skill polish/packaging).
- **Unprioritized (3):** `research-kb#8` + `#10` (vol23 corpus acquisition) · `research-kb#9`
  *(bug)* corpus-wide equation-extraction gap (Docling drops LaTeX math).

By workstream: **portfolio site** (`bb.dev#1/#2` + the gated A4-1b) · **research-kb corpus**
(`#8 #9 #10 #13 #21`) · **research_toolkit skills** (`#21–#27`, holds the P1+2×P2) ·
**decision-log rollout** (`causal#12` + `eval#88`).

## The decision to think through (surface to Brandon)
The portfolio is healthy and its remaining items are all P3. The **genuinely highest-priority
open work is in `research_toolkit`** — but that's a separate track from the portfolio site
we've been driving. So the fork is *which track*:
- **A. Portfolio polish** — `bb.dev#2` (hygiene, touches many repos) and/or `bb.dev#1`
  (synthesis map). Low-risk P3 wins on the surface we own.
- **B. A4 *1b* densification** (the visible-craft payoff) — add pre-arXiv classics/textbooks so
  the graph is visibly denser. Tooling is done; **bottleneck = corpus acquisition** (PDFs +
  `sources add-manual` for books → re-extract → `--rebuild-unmatched` (now crash-safe) →
  re-export). Note: `rl_and_control` is being actively co-worked on RL/control textbooks right
  now (see gotchas) — coordinate before touching `paper_index.md`.
- **C. research_toolkit cluster** — clear the actual P1/P2s (`#22/#23/#24`). Highest priority by
  label, but a different repo and likely a different mental context.
- **D. Decision-log rollout** — `causal#12` + `eval#88` (mechanical, repeatable).
My lean: **ask which track**, because A/B (portfolio) and C (toolkit) are genuinely different
work; don't assume the portfolio just because that's what the last few sessions did.

## Standing principles & gotchas (don't relearn these)
- **board #1 is truth**; `gh` works now, so query it directly. `roadmap.md` lags.
- **`gh` is fixed but env-specific** (`~/.local/bin/gh`); if it ever regresses, the REST-API +
  token (`~/snap/gh/640/.config/gh/hosts.yml`) is the fallback. `[[gh-snap-broken-in-sandbox]]`.
- **Don't use `set -u` in this env's bash** — the shell-snapshot's unset `ZSH_VERSION` makes it
  fatal mid-script (silently skipped a checksum verify once). `set -e`+`pipefail` are fine.
- **`rl_and_control` has an ACTIVE concurrent worker** (SSM/control guide — Week 13 LQR/LQG,
  `guides/web/*`, `ch11-state-space.mdx`, `python-control` dep). It commits independently. If you
  touch that repo, **scope your `git add` to your own files** and don't disturb its tree.
- **Ambient review gate** before any `brandon-behring.dev` commit: run the `independent-review`
  skill (writes `.claude/.last-review`); the PreToolUse hook blocks `git commit` otherwise. It
  keys on `git commit` literal + bb.dev's marker — cross-repo `git -C <other> commit` isn't gated.
- **Headless render gotcha** for `/lab/research-graph/`: Cytoscape canvas reads blank in headless
  Playwright; verify the **model** via `document.getElementById('cy')._cyreg.cy` with a
  **synchronous** `evaluate` (the MCP browser context drops on async). `[[lab-graph-headless-render-gotcha]]`.
- **A4 spans 3 repos**: research-kb (sources+edges) → rl_and_control (`build_graph_export.py` +
  `references/graph_overrides.json` overlay) → brandon-behring.dev (consumes the committed JSON).
  Re-export recipe: `rl_and_control/scripts/README.md`. DB containers (research-kb postgres+grobid)
  must be up for a re-export.

## Concrete first moves
1. `gh project item-list 1 --owner brandon-behring --format json --limit 200` — refresh the live
   open set (and `gh issue list --repo … --state open` to spot-check).
2. Surface the A/B/C/D track fork to Brandon — don't assume the portfolio.
3. If B (A4-1b): coordinate with the concurrent rl_and_control work, then corpus-acquire →
   re-extract → `--rebuild-unmatched` → `make graph-export` → cp → review → commit → deploy.
4. Verify any live-site change with the headless gotcha in mind (cy model, not screenshot).

## References
- Board: https://github.com/users/brandon-behring/projects/1
- Strategy: `docs/website-decision-map.md`; roadmap: `docs/roadmap.md` (lags — reconcile, don't trust)
- This arc's plan: `~/.claude/plans/use-the-following-handoff-joyful-wigderson.md` (now holds the
  gh-fix plan; the A4-1a plan was overwritten — see the commits/logs instead)
- Session logs: `docs/sessions/2026-06-01--a4-1a-review.md` (A4-1a review) + this file.
- Memory: `next-session-pickup`, `gh-snap-broken-in-sandbox`, `verify-rendered-reality-not-notes`,
  `lab-graph-headless-render-gotcha`, `feedback_plan_surface_decisions`.
