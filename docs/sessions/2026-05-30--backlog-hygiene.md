# Session 2026-05-30 — Backlog hygiene (roadmap + memory + phase numbering)

## What this was

"Examine the backlog" → examination surfaced **drift**, not new direction. The
roadmap's top sections were current (2026-05-28), but its reference tables,
quick-wins block, and a cross-doc taxonomy had decayed. This session reconciled
`docs/roadmap.md` + memory against the live sources, and disambiguated a
phase-numbering collision between the two planning docs.

## Findings (examination)

1. **Three `book-scaffold-astro` versions in one doc** — `roadmap.md` cited
   v4.8.0 (`:88`, correct), v4.6.0 (`:126`), and v3.5.x (`:343`, most stale).
2. **Shipped work listed as TODO** — quick-wins still listed apex sitemap, RSS,
   and the F1 favicon / F2 `hsl()` fixes, all live (`package.json:19-20`,
   `src/pages/rss.xml.js`, `public/favicon.*`, roadmap `:52-55`).
3. **Citation graph mis-stated** — `roadmap.md` said "sparse (3 edges / 84
   nodes)"; the committed `src/data/rl_citation_graph.json` is **95 nodes / 51
   edges** (densified 2026-05-25 via matcher unblock `6fcf97f`, issue #14).
4. **Stale Track C status** — `book-scaffold-astro` "v3.5.x / 10 open issues";
   `research-kb` issue list `#1,#8,#9,#10,#13` (live: `#9,#10,#13,#16`).
5. **B4 unchecked** though `@v1`/`@v2` were tagged 2026-05-26.
6. **Phase-number collision** — `roadmap.md` Phase 2 = homepage; coordinated
   plan Phase 2 = the *deprecated* post_transformers migration.
7. **Stale memory index hooks** — `MEMORY.md:5` said `research-kb#14` *blocks*
   A4 (it's resolved); `MEMORY.md:12` said "Next: Phase 6a" (6a shipped). The
   underlying memory *files* were already current — only the index lagged.

**Root cause:** `roadmap.md` hand-duplicates per-project status that lives
authoritatively in `src/data/projects.json` (20 projects / 6 clusters, current)
and live GitHub issues. Copies rot; originals don't.

## Decisions (`/exploring-options`, Q1–Q8)

| Q | Decision | Why |
|---|---|---|
| Q1 Scope | All verified drift in roadmap + memory (not site copy) | Same edit class as Track B/C, near-zero marginal cost; site copy is a different risk class |
| Q2 Track C | Trim + `projects.json` pointer | Patching values just resets the rot clock; remove the rot surface |
| Q3 Prevention | Reconcile-date line + durable memory guard | Anti-rot discipline; cheap |
| Q4 Breadth | + reconcile phase numbering | The collision misbriefs harder than in-doc staleness |
| Q5 Method | Namespace + Rosetta table (no renumber) | Renumbering orphans session-log/commit references — breaks the audit trail |
| Q6 Artifact | Write this session log | Established pattern; preserves the "why" |
| Q7 Issues | None | `.claude/CLAUDE.md` "keep build/config minimal" — a doc-lint cuts against it; memory guard is right-sized |
| Q8 Commit | Single in-repo commit, propose & wait | roadmap + log are one logical unit; per `git.md` never commit without consent |

## Changes

**In-repo (`docs/roadmap.md`):** graph count 84/3→95/51 + Next-1-3 xref (R1);
removed shipped quick-wins (R2–R4); Phase 4 Steps 2–5 marked unblocked (R5);
apex-sitemap "What shipped" clause (R6); cross-repo table book-scaffold
v4.6.0→v4.8.0 (R7); B4 `[ ]`→`[x]` (R8); B1 stale xref (R9); **Track C trimmed
to a `projects.json` pointer + showcase judgments** (R12); reconcile-date +
namespace pointer (R13/R15); new **"Phase numbering: site ↔ portfolio" Rosetta
table** (R14).

**Out-of-repo (recorded here for the audit trail; not in the git commit):**
- `~/.claude/plans/i-want-to-look-streamed-pebble.md` — "portfolio Phase N"
  namespace note + back-reference to the Rosetta table (P1).
- `MEMORY.md:5` `#14` hook → resolved (M1); `MEMORY.md:12` pickup hook → Phase 6a
  shipped (M2); new `roadmap-drifts-from-projects-json.md` drift-guard + index
  line (M3).

## Verification

`npm run build` green; `grep` for stale strings (`v3.5`, `v4.6`, `84 nodes`,
`3 edges`, `@astrojs/(sitemap|rss).*min`) in `roadmap.md` returns nothing;
lab-page prose spot-checked for hardcoded counts.

## Not done (out of scope per Q1/Q7)

- `projects.json:155` book-scaffold `whats_next` (shipped 6a as future) — site copy.
- `ai-eval-portfolio-supersedes-prototype` memory — strategy judgment, flagged only.
- Doc-lint/automation for drift — declined (keep build/config minimal).
