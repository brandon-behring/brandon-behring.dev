# Backlog Audit Session (2026-05-28)

A backlog-and-all-potential-work audit triggered by
`/exploring-options`. Refreshed `docs/roadmap.md` and the
`next-session-pickup.md` memory to reconcile three fragmented sources:
local roadmap, the coordinated portfolio plan at
`~/.claude/plans/i-want-to-look-streamed-pebble.md`, and 20 open GitHub
issues across 6 repos + 11 Work Tracker items.

## Scope

- **In scope**: brandon-behring.dev local roadmap, coordinated
  portfolio plan, GitHub tracked issues across coupled repos, the
  newly-discovered `mathematical-guides` family
- **Out of scope**: research_toolkit / eval-toolkit / research-kb
  internal work (touched only where it intersects portfolio demos
  or the dogfood loop), F1+F2 cosmetic fixes, structural changes to
  `i-want-to-look-streamed-pebble.md` or `website-decision-map.md`
- **Priority lens (audit Q1)**: highest strategic impact, interpreted
  as *craft signal* — process-as-artifact visible across consumer
  chapters. See Q1 below.

## Output deliverables

1. `docs/roadmap.md` — refreshed Status; replaced Next 1–3 with new
   strategic-impact ranking; appended Quick wins backlog, Cross-repo
   coordination, Strategic decisions still open, Discovered work
   surfaced 2026-05-28
2. `docs/sessions/2026-05-28--backlog-audit.md` (this file) — decision
   chain + discovery summary
3. `~/.claude/projects/-home-brandon-behring-Claude-brandon-behring-dev/memory/next-session-pickup.md`
   — in-place refresh; state + ranked next moves + quick wins + hygiene
   done; under 200 words
4. GitHub hygiene operations — see "Hygiene actions executed" below

## Discovery summary

Three parallel `Explore` agents surfaced the picture before the
question round. Findings condensed; full detail in `roadmap.md`
appended subsections.

- **Local roadmap**: Phase 2 shipped 2026-05-24; Tracks A/B/C still
  open with 6 unresolved decision-map questions + 7 unresolved
  visual-design-options-report questions
- **Coordinated portfolio plan** (`i-want-to-look-streamed-pebble.md`):
  v4.6 dogfood sprint complete 2026-05-27; next candidates were Phase 3
  (dlai deploy), Phase 5 (portfolio clusters), Phase 6 quick wins
  (RSS / apex sitemap / CITATION.cff), Phase 6a (book-scaffold v5
  Provenance). Phase 2 (post_transformers public release) DEPRECATED.
  Phases 8, 9, 9.5 deferred indefinitely.
- **GitHub**: 20 open issues across 6 primary repos + 11 Work Tracker
  items (2 stale: `eval-toolkit#71` + `#73` shown "In Progress" but
  closed 2026-05-26). Notable unlabeled blocker: `post_transformers#51`
  (BREAKING `eval-toolkit` rename, 10d old). Fresh data-loss risk:
  `research-kb#16` (`--full-rebuild` not transactional).

## Q1 — What does "highest strategic impact" mean?

The first plan draft ranked three different items at the top, each
representing a different definition of "strategic impact" — bundled
into one list, they masked a real choice.

**Options offered:**

1. Craft signal — process-as-artifact visible across consumer chapters
   → top item: Phase 6a (book-scaffold v5 Provenance + Audit component)
2. Visible interactive proof → top item: A4 graph densification or SSM
   stability demo
3. Surface area — more hidden work visible via portfolio clusters →
   top item: Phase 5 cluster additions
4. Identity sharpening — resolve open strategic questions first → top
   item: a `/exploring-options` round on the 13 unresolved decision-map
   / visual-design questions

**Decision**: Option 1 (craft signal).

**Reasoning**: structural move; every other option is tactical work
that runs faster once Phase 6a exists. The
`process-as-artifact-pattern.md` memory and the Phase 1.5
`/how-this-was-made` page both point to this as the real differentiator.
Cleanest downstream unlock: Phase 4 Steps 2–5 across all consumers gate
on 6a shipping.

## Q2 — The "visible demo" slot: A4 vs SSM

Both can claim craft signal; both compete for "the thing on the
homepage a visitor plays with."

**Options offered:**

1. A4 graph densification only (~4–6 hr, reuses live infrastructure)
2. SSM stability flagship demo only (multi-week, from scratch)
3. Both, sequenced A4 → SSM
4. Neither — push both to backlog

**Decision**: Option 3 (both, sequenced), with A4 as slot #2 and
**Phase 5 as slot #3**; SSM **parked as candidate behind its own
framing `/exploring-options` round** before committing.

**Reasoning**: A4 is the smallest commitment that produces a real
result — the research-kb matcher is freshly unblocked (commit `6fcf97f`,
2026-05-25) and you should exercise it while the change is recent. SSM
is structurally bigger and has an unresolved framing question
(stability regions / symplectic / discretization-matters per
`visual-design-options-report.md:492`) that itself deserves its own
round.

## Q3 — Disposition of discovered hygiene work

Six items not on any list: `post_transformers#51` unlabeled blocker,
Work Tracker stale `eval-toolkit#71+#73`, `ssm-foundations` audit burst
(#1, #3–#6 unlabeled), `research-kb#16` data-loss risk, `brandonmbehring-dev`
remote, F1+F2 cosmetic regressions.

**Options offered:**

1. Surface only in roadmap text — no GitHub state changes
2. Surface + trivial GitHub housekeeping — label #51, label #16,
   reconcile Work Tracker stale
3. Surface + full hygiene pass — also triage ssm audit burst, F1+F2
   cosmetic fixes
4. Spawn a separate "discovered work" follow-up plan

**Decision**: "2/3" — between Options 2 and 3. Trivial GitHub
housekeeping + the material items from Option 3 (ssm triage,
brandonmbehring-dev remote note) but NOT F1+F2 cosmetic fixes (their
own commit).

**Reasoning**: labeling is mechanical and removes ambiguity from
artifacts; reconciling stale Work Tracker entries is 30 seconds; and
labeling `research-kb#16` as a data-loss risk BEFORE A4 enrichment
touches `--full-rebuild` is harm-prevention. F1+F2 are real code
changes that deserve their own commit and don't belong in a
backlog-audit plan.

## Q4 — `mathematical-guides` family placement

In the same message as the Q3 answer, the user dropped five repo URLs:
`mathematical-guides{,-transformers,-reinforcement-learning}` (all
NEW — created 2026-05-27, all private, all pushed today),
`claude-books`, `guides`. Investigating these added an entirely new
ecosystem to the audit scope.

**Options offered:**

1. Fold into Phase 5 cluster card (`mathematical-guides` as link entry
   in "books-and-guides" with "in-scaffolding" status)
2. New Phase 4.5 between Phase 4 (guides migration) and Phase 5 — deploy
   hub to e.g. `math.brandon-behring.dev`
3. Separate "formal-math" cluster distinct from "books-and-guides"
4. Acknowledge in roadmap, defer everything

**Decision**: **Hedge**. User: "not sure yet — it may be more of a
supplement to existing guides but haven't fully decided."

**Reasoning** (treating the hedge as an open strategic decision rather
than forcing a Phase commitment): the
`mathematical-guides` README itself frames the family as "A formal
lens that **supplements (does not replace)** the practical `guides`
family" — the hedge matches the repo's own stated framing. Surfaces as
a tracked open question in `roadmap.md` "Strategic decisions still
open" #1 instead of being committed to a Phase. Phase 5 cluster scope
stays as originally planned (guides + claude-books in books-and-guides
cluster); math-guides NOT added as link entry until placement decided.

## Q5 — Session log entry?

**Options offered:**

1. Write this file (Convention from `2026-05-22--phase-1.md`)
2. Skip — two-file audit (roadmap + memory)
3. Append a brief "Recent decisions" note to roadmap.md instead

**Decision**: Option 1.

**Reasoning**: the deferral on `mathematical-guides` placement
specifically benefits from a session log entry — it's a decision
*not yet made* with reasoning attached, exactly the genre
`2026-05-22--phase-1.md` captures. Roadmap.md stays terse and
forward-looking; the session log absorbs the historical narrative.

## Q6 — Memory file approach

**Options offered:**

1. Update `next-session-pickup.md` in place (stable pointer)
2. Create new `backlog-audit-2026-05-28.md` memory; demote pickup
3. Keep pickup as-is, add a parallel "current-state" memory
4. Split: refresh pickup + add separate `discovered-hygiene-2026-05-28.md`

**Decision**: Option 1.

**Reasoning**: pickup is named for its function (always-loaded latest
pickup), not for the sprint it last covered. Refreshing in place is the
design intent — meant to be transient state. Memory system guidance
("Do not write duplicate memories. First check if there is an existing
memory you can update before writing a new one.") explicitly favors
this.

## Q7 — `roadmap.md` Next 1–3 structure

**Options offered:**

1. Replace existing Next 1–3 with new ranking (demoted items implicitly
   drop)
2. Append "Backlog ranked 2026-05-28" subsection, preserve old Next 1–3
3. Replace + add "Quick wins backlog" subsection for demoted items
4. Replace + don't preserve old items

**Decision**: Option 3.

**Reasoning**: strategic-impact ranking and quick-wins backlog serve
different purposes — strategic items deserve focus and sequencing;
quick wins are parallel-track fill. Folding both into one list either
dilutes the ranking or hides the parallel work.

## Discovered ecosystem: `mathematical-guides` family

| Repo | Created | Pushed | Lang | Size | Open issues | Description |
|---|---|---|---|---|---|---|
| `mathematical-guides` | 2026-05-27 | 2026-05-28 | MDX | 145KB | 0 | Hub for the formal / D-T-P guide family |
| `mathematical-guides-transformers` | 2026-05-27 | 2026-05-28 | MDX | 163KB | 0 | Formal D-T-P treatment of transformer architecture (attention/softmax/scaling) |
| `mathematical-guides-reinforcement-learning` | 2026-05-27 | 2026-05-28 | MDX | 97KB | 0 | Formal D-T-P treatment of RL (MDPs, value functions, Bellman) |

**Key signals**:

- All three private; all pushed 2026-05-28
- Hub has `wrangler.toml` → deploy-intent
- Both siblings have an **interim paged.js PDF script** → upstream
  proposal in flight for `book-scaffold pdf` target (dogfood loop
  signal; v4.7+ backlog candidate)
- Style guide v0.2 (8 dossier-cited refinements from v0.1, landed today)
- Audience explicitly different from `guides`: "mathematically mature"
  vs DS/MLE/AI-Eng interview prep
- Source content: ported from frozen LaTeX under
  `~/course_learning/{transformer_mathematics,coursera_rl_specialization}`

**No "transformers" overlap to disambiguate**: `post_transformers` is
SSM research; `ssm-foundations` is the SSMs book (public);
`mathematical-guides-transformers` is the transformer-architecture book
(private). Different topics; no portfolio narrative conflict.

## Gotchas

1. **`gh repo view --json` returns exit code 1 silently** in this
   shell environment (snap install of gh, `gh version` unreadable from
   `2>&1` capture). Workaround: `gh api repos/OWNER/REPO | jq …` —
   `--jq` flag via gh also intermittently fails; piping to external
   `jq` works reliably.
2. **Parallel `Bash` calls cancel on first non-zero exit** — running
   8 `gh api` queries in parallel meant one silent failure cascaded
   into 7 "Cancelled" errors. Probe single calls first.
3. **Related-Books hook surfaces research-kb references**, not
   portfolio items: the hook produced "Distributed Machine Learning
   Patterns" / "Unknown_2025_..._NOISBN" entries. No matching repo
   in `brandon-behring/*` or local `~/Claude/`. Treating as
   research-kb reference / PDF source ingest, not a project signal.

## Hygiene actions executed

Operations against `brandon-behring/*` repos via `gh`:

1. **Labeled `post_transformers#51` as P2** — BREAKING `eval-toolkit`
   `mde_from_ci(paired=...)` → `(ci=...)` rename; gates ssm pin bump
2. **Labeled `research-kb#16` as P2** — `--full-rebuild` not
   transactional; data-loss risk; pre-flight for A4 enrichment
3. **Reconciled Work Tracker (#1) stale items** — `eval-toolkit#71` +
   `eval-toolkit#73` showed "In Progress" but closed 2026-05-26;
   updated project status to Done
4. **Triaged `ssm-foundations` audit burst** — labeled #1, #3, #4, #5,
   #6 with `audit-followup`; case-by-case P2/P3 per content
5. **Noted `brandonmbehring-dev` remote disposition** in the
   `[[brandonmbehring-dev-second-account]]` memory — confirms DML's
   remote tracks that account; resolve before pre-Phase-9 transfer

## Next moves (matches `roadmap.md` Next 1–3)

1. Phase 6a — `book-scaffold-astro` v5 Provenance + Audit component
2. A4 graph densification (pre-flight `research-kb#16` before
   `--full-rebuild`)
3. Phase 5 — portfolio cluster additions
   (`tools` / `books-and-guides` / `pricing-decision-systems`); flag
   `tools` rename before going live

**Parked candidate** (slot #4 if a slot opens): SSM flagship demo,
behind its own framing `/exploring-options` round.

## Open questions forwarded

Forwarded to `docs/website-decision-map.md` scope:

- `mathematical-guides` family placement (Q4 hedge — leaning
  supplement-to-`guides` per repo README; not committed)
- SSM flagship-demo framing (stability regions / symplectic /
  discretization-matters)
- Long-term hub structure (`/research`, `/lab`, `/notes`, or hybrid)
- Applied insurance/stats positioning (homepage proof strip vs deeper
  pages only)

## What this archive deliberately drops

- The verbatim chat exchange (~7 questions × options × reasoning) —
  the decisions and reasoning are above; the full back-and-forth is in
  the conversation history and `~/.claude/plans/examine-the-backlog-and-snappy-castle.md`
- The discovery agents' raw output — the synthesis is in
  `roadmap.md` "Cross-repo coordination" + this file's "Discovery
  summary"
- Per-repo command logs — gotchas section captures the lessons
