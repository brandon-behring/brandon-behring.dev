# Roster curation — independent review (2026-06-04)

**Driver:** Brandon — "review the website presentation, polish what's viewable,
backlog the rest." Implemented on branch `polish-roster-curation`.

**Method:** 3 fresh-context `independent-reviewer` shards (cold read, intended
conclusion withheld), fanned out in parallel over the working-tree change:

- **A** — diff correctness + draft-filter coverage (`git diff` + `portfolio.ts`)
- **B** — rendered-output leak audit (`dist/**/*.html` + `rss.xml`)
- **C** — content consistency (`projects.json` + `clusters.json`)

## Findings

| Shard | Verdict | Finding | Disposition |
|---|---|---|---|
| A | FAIL → fixed | `ProjectSection.astro` redeclared `whats_next` as required, diverging from the canonical `portfolio.ts` type (no runtime impact — field is guarded) | **Fixed** — import shared `type Project`, deleted the local interface |
| A | info | `rel="noopener"` on the internal `/lab` name-link is harmless/unnecessary | Accepted as-is (single shared `<a>` template) |
| B | PASS | "prompt-injection PoC/-detector" appear only as *prose* in visible siblings; no section/id/link leak | none |
| B | PASS | all `artifact-link` hrefs non-empty/non-`#`; no `/screenshots/`; no hollow clusters; forward heading not duplicated | none |
| C | PASS | cluster descriptions match visible membership; no live link to a hidden sibling; orders sane; JSON valid; hygiene applied | none |

No conflicts between reviewers. `not_reviewed` items (build, `/lab` route validity,
compact path) are all confirmed green by the local build + `dist` checks.

## Edits applied (this review)
- `src/components/ProjectSection.astro` — replaced the local `Project` /
  `ExternalContext` interfaces with `import { type Project } from '../data/portfolio'`.
  Rebuild clean (14 pages).

## Edits NOT applied
- `rel="noopener"` on the internal `/lab/research-graph/` name link — harmless; not
  worth a conditional in the shared link template.

## Open follow-ups (post-merge, cross-repo `tracked` issues)
- `ssm-foundations` live sidebar still shows the template subtitle "A scaffold-astro book".
- `brandonmbehring-dev` account split: ~20 public repos overlap `brandon-behring`
  (some public-on-dev / private-here) — a visitor can find two identities.
- Memory fix: the "prompt-injection-portfolio supersedes prototype" note is **inverted**
  — the repo *extends* the prototype.
- (Deliberately deferred) off-site public eval repos left uncatalogued: `ir-eval`
  (deployed), `llm-eval`, `guides-tooling`.

## Reference
- Plan: `~/.claude/plans/i-want-to-review-graceful-gray.md`
- Reviewers: 3× `independent-reviewer` — 2 PASS, 1 FAIL (fixed).
