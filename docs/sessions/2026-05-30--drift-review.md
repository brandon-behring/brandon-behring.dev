# Drift Review — roadmap.md ↔ projects.json ↔ GitHub issues (2026-05-30)

Driver: first run of the new **independent-review** environment (MVP). A
fresh-context `independent-reviewer` subagent was given only the artifact + a
checklist (no author reasoning) and asked to find drift between the three
sources of truth. This log records its verdict; it is the demonstration artifact
for the ambient-review machinery (`.claude/agents/independent-reviewer.md` +
`.claude/skills/independent-review/` + the pre-commit hook). Plan:
`~/.claude/plans/i-want-to-improve-functional-owl.md`.

## Method

Reviewer (read-only: Read/Grep/Glob/Bash) cross-checked, item by item:
`docs/roadmap.md` status claims vs `src/data/projects.json` `status`/prose vs
live `gh issue view` across named repos + `curl -sSI` on site URLs. Returned a
single JSON verdict; the orchestrator surfaced only verdicts + proposed fixes
(advise-only — nothing applied this round).

## Findings table

| # | claim | verdict | sev | measured |
|---|---|---|---|---|
| 1 | eval-toolkit `pre-v1` / "Round 8 / cutting v1.0" | **FAIL** | fix | live issues show v1.0.1 already shipped (#76 closed), audit past Round 9 |
| 2 | book-scaffold-astro `whats_next` frames Phase 6a Provenance as upcoming | **DRIFT** | fix | shipped as v4.8.0 (commit `cc83194`); roadmap already marks it shipped |
| 3 | roadmap "20 projects across 6 clusters" | DRIFT | info | actually 23 entries across 8 clusters |
| 4 | roadmap issue-state refs (#14/#16/#76/#77/#80/#51/#71/#73) | OK | info | all verified against `gh issue view` |
| 5 | brandon-behring.dev#1 cited open | OK | info | confirmed OPEN |
| 6 | site_url liveness (ssm-foundations, PoC docs) | OK | info | both HTTP 200 |
| 7 | dlai-study-notes status across sources | OK | info | consistent (deploy is next) |
| 8 | source-asymmetry (post_transformers etc.) | OK | info | by-design per roadmap:316-321; not drift |

## Edits applied this round

None. Reviewers **advise + propose fixes only**; the user decides what to apply.

## Edits deliberately NOT applied (proposed fixes, awaiting decision)

- **eval-toolkit** (`projects.json:70,73`): `status: "pre-v1"` → `"v1"`/`"released"`;
  rewrite `whats_next` to drop "Round 8 / cutting v1.0" (v1.0.1 shipped), e.g.
  "v1.0.1 shipped; audit reached Round 9. Next: publish to PyPI."
- **book-scaffold-astro** (`projects.json:155`): `whats_next` → past tense —
  "Phase 6a Provenance/audit component shipped in v4.8.0… Next: v5.x multibook
  routing + AnkiCard CLI (#80)."
- **roadmap.md:318**: "20 projects across 6 clusters" → "23 across 8" (or drop the
  hard count — the line disclaims being a live registry).

## Open follow-ups

| Follow-up | Notes |
|---|---|
| prompt-injection-detector open-issue check | UNKNOWN — `gh` search/GraphQL network-blocked in sandbox; only single-issue REST reads worked |
| Exhaustive per-repo open-issue enumeration | search API blocked; only roadmap-referenced issue numbers were probed |
| Apply the 3 proposed fixes | user decision |

## Reference

- Reviewer: fresh-context subagent, inlined `independent-reviewer` contract
  (the registered agent type loads next session — see plan verification notes).
- Distillation: orchestrator consumed only the JSON verdict, not the reviewer's
  reasoning/transcripts.
