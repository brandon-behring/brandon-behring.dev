# 2026-06-16 — Books & Guides surfacing: independent review

**Driver:** Phase-1 portfolio-honesty edits — surface the live AI-engineering
guide, fix the stale `guides` hub entry, remove the undeployed "Agentic Coding"
(`book-template-astro`) card, and stage a hidden `claude-books` family entry.
Full decision record: `~/.claude/plans/what-can-we-do-wobbly-seal.md`.

**Method:** `independent-review` skill, 2 cold reviewers (no author conclusions):
1. diff + link/misattribution (URLs resolve? name-link matches title? draft hides links?)
2. drift + claim-copy vs ground truth (snapshot rot; claude-books claims vs the actual
   repos; reachability; cluster-description consistency).

## Findings

| # | Shard | Verdict | Finding | Resolution |
|---|---|---|---|---|
| — | diff+link | **PASS** | all URLs 200; no misattribution; `claude-books` draft carries no link; JSON valid | — |
| ④ | both | DRIFT/FAIL | `clusters.json` books-and-guides desc referenced "Claude Code / agentic-coding books" but none are visible (claude-books hidden, Agentic Coding removed) | **Fixed** — desc now matches visible roster ("AI engineering the first shipped sub-guide") |
| ① | drift | FAIL (blocker) | claude-books copy said surfaces are "at v1.0"; per claude-books' own ROADMAP, v1.0 = *published*, none deployed | **Fixed** — "content-complete, pre-deployment" |
| ② | drift | FAIL (blocker) | "Agentic Coding book folds in" stated as fact, but no repo records it + `book-template-astro` SUNDOWN names a different successor | **Fixed** — reframed "planned to fold in" |
| ③ | drift | DRIFT | "successor … which it retires (claude-best-practices, field-guide)" — claude-best-practices' named successor is `book-template-astro` | **Fixed** — softened to "consolidates… handbook content migrates here; field-guide's mission folds into Agentic Systems Design" |

## Edits applied
- `src/data/clusters.json` — books-and-guides description matches visible roster (④).
- `src/data/projects.json` — claude-books summary/description_long/whats_next: v1.0→content-complete,
  fold-in→planned, lineage softened (①②③). (Entry stays `draft: true`.)

## Edits NOT applied
- None deferred from the findings. Reviewer coverage gaps (`not_reviewed`):
  guides-hub index 4th-module text (separate deployed repo, out of scope); existence of
  the AI-eng companion mini-libraries (not URL-checked); `claude-books.brandon-behring.dev`
  DNS (not yet provisioned — "deploys soon" is intent). Orchestrator closed one gap:
  grep confirmed **no dangling references in `src/` routing** to the removed
  `book-template-astro` slug (project slugs aren't individually routed).

## Open follow-ups
- Committed next step (own session): fold Agentic Coding into claude-books, apex+subroute
  deploy of the content-complete surfaces, archive `claude-best-practices` +
  `claude-code-field-guide`, then flip the claude-books family card live (add `site_url`).
- Flagged: open-source the claude-books repo when ready → add `repo_url`.

## Adversarial review (2026-06-16, 3-voice: Claude + codex + gemini, on PR #18)

Refutation + tool-grounding (not line-matching). 13 raw findings → consensus:

- **Verified (tool-confirmed), fixed in follow-up commit:**
  - "companion mini-libraries **for each module**" overclaimed — 4 libs
    (mini_eval/rag/agent/prod) map to 3 modules; "Working with AI" has none →
    reworded to "with companion mini-libraries."
  - This log's "no dangling references" overstated coverage (only `src/` routing
    was grepped) → scoped above.
- **Verified but pre-existing / outside this PR (TODO):** current docs still treat
  `book-template-astro` as a live, own-subdomain artifact — `README.md:49`,
  `docs/roadmap.md:81`, `docs/website-decision-map.md:68,224`. Stale vs the
  fold-into-claude-books decision; reconcile when the repo is sunset (deploy session).
- **Majority (not applied, defensible):** guides `whats_next` "first shipped
  sub-guide" vs experimentation "the pilot/first companion" reads slightly tense.
- **Disputed → context-resolved:** claude-books "apex + subroutes" copy contradicts
  the claude-books repo roadmap (per-subdomain) — but the copy reflects *this
  session's* superseding decision (#140 fixed); the roadmap is the stale side.
- **False-positive (tool-refuted):** draft-flag dropped (draft:true present);
  `status:"released"` invalid (7× in dataset, build passes); "Astro 6" tag fracture
  (pre-existing 4×); trailing-slash/live-claim (both URLs 200); "data science, ML"
  implies nonexistent guides (refuted by codex + gemini).

## Reference
- Plan: `~/.claude/plans/what-can-we-do-wobbly-seal.md`
- Format mirror: `docs/sessions/2026-05-25--projects-audit.md`
