# Doc-convention restructure — independent review (2026-06-04)

**Driver:** Brandon — "don't let stale cross-repo info confuse loaded context." Restructure
this hub's docs to the portfolio's `CURRENT_WORK` + `ROADMAP` + `CHANGELOG` trio +
point-don't-copy. Branch `docs-hub-convention`.

**Method:** 3 fresh-context `independent-reviewer` shards, cold read, parallel:

- **A** — drift/convention self-test (do the context docs snapshot cross-repo facts?)
- **B** — link + claim integrity
- **C** — completeness (did the roadmap purge lose site-forward work?)

## Findings

| Shard | Verdict | Finding | Disposition |
|---|---|---|---|
| A | FAIL → fixed | `decision-map.md` cluster-audit kept concrete cross-repo evidence counts; my caveat *warned* but didn't *remove* them ("copy with a warning" ≠ "point, don't copy") | **Fixed** — reframed the audit as a **closed, frozen scoring artifact** (do-not-read-as-current); in-scope (no analysis rewrite) |
| A | LOW → fixed | roadmap phase table "pending (cross-repo → board)" — "pending" is a mild status snapshot | **Fixed** — dropped "pending" → "cross-repo → board" |
| A | info | `CURRENT_WORK.md` honest (describes the in-flight restructure + clear post-merge next step) | none |
| B | PASS | all 12 CHANGELOG→session links + cross-links resolve; `DOC-CONVENTIONS.md` accurate; no dangling refs | none |
| C | PASS | every site-forward item preserved (Next-1-3 / open-decisions / Track A); cross-repo → board; shipped → CHANGELOG | none |

No conflicts. The drift shard **self-test worked as designed** — it caught the author's own
residual snapshot.

## Edits applied (this review)
- `docs/website-decision-map.md` — caveat strengthened to "frozen scoring artifact — do not read as current."
- `docs/roadmap.md` — phase table "pending (cross-repo → board)" → "cross-repo → board".

## Edits NOT applied
- A full de-rot of decision-map's analysis (replacing every evidence count with a pointer)
  — out of the approved plan's scope (decision-map = caveat + judgments, no analysis rewrite).
  The frozen-artifact framing resolves the confused-context risk without the rewrite.

## Open follow-ups
- Optional later: convert the decision-map cluster-audit evidence to pointers (or move to a
  dated session log) — fully eliminates the snapshots; a separate task.
- Portfolio-wide doc-convention standardization (the ~32-repo casing/location inconsistency)
  — noted in `docs/DOC-CONVENTIONS.md`, out of scope (spoke-only).

## Reference
- Plan: `~/.claude/plans/i-want-to-review-graceful-gray.md`
- Reviewers: 3× `independent-reviewer` (A/B/C) — 2 PASS + 1 FAIL (fixed).
