# 2026-06-20 — Adversarial review #2: the cross-repo audit **as landed on `main`**

**Driver:** `/adversarial-review` of the whole 2026-06-20 audit workstream *after* it merged —
target `commit bf4d4cb..550b32c` (the recon archive `526af8a` + audit `2207977` + adversarial
fixes `b55fe19` + the #34 fix `966274e` + merges of PR #35/#37). **Refute-mode** — re-attack
everything this session shipped, now that it's in `main`. Distinct from the sibling
`…-adversarial-review.md`, which reviewed PR #35 *before* merge.

**Method:** 3-voice panel on one noise-filtered payload — Claude (blind-first), codex
(gpt-5.5 @ xhigh), gemini (Gemini 3.1 Pro @ High via Antigravity `agy`). **gemini returned
`unparsed`** (ran, emitted non-JSON → 0 usable findings); surfaced as a *voice failure*, so the
effective panel = **2 voices**. Tool-grounding FIRST (objective): PyPI JSON, `gh` issue titles,
`git ls-files`, the cited run file. No separate external `--refute` pass — gemini was flaky this
run and every surviving finding was already tool-grounded or 2/2-corroborated, so the orchestrator
refuted the pool inline (skeptical default) instead of paying for another 2-model round.

## Findings (tiered)

| Tier | Sev | Corrob | How verified | Location | Problem |
|---|---|---|---|---|---|
| **Consensus** | warning | 2/2 (gemini⊘) | diff + live `projects.json` | `projects.json` research-agent | Badge `prototype` + whats_next "now **archived**", but `summary`/`description_long` were present-tense **active** ("It's the querying layer… how I turn the KB into vetted answers"). Self-contradictory on the live `/work` card. |
| **Consensus** | suggestion | 2/2 (gemini⊘) | recon doc text | recon doc `:19` | "**7 of 9** share the spine" doesn't match its own enumeration (5 on spine + main *anchored*), wobbles vs "8 properties" elsewhere, and cuts against the audit's hub↔scaffold-bifurcation thesis. |
| **Verified** | suggestion | codex (obj.) | `git ls-files` | `…-adversarial-review.md:41` | Cites a `~/.cache/…` run file **not committed** → unreproducible provenance from another checkout (also pre-existing in `…-typescript-foundation-review.md:73` — a standing convention). |
| **Verified** | suggestion | codex (obj.) | file compare | `CURRENT_WORK.md:11` | "Last shipped (2026-06-19)" went stale — the newest `CHANGELOG.md` entry is now 2026-06-20 (this PR). Label/feature ambiguity. |
| **Individual** | suggestion | codex (obj.) | dated-log rule | `…-cross-repo-health-audit.md` #34 block | Session log still says research-agent "is in-progress" while merged data is `prototype` (#34/#37 fixed it) — dated snapshot, but could misdirect future context. |
| **False-positive** | — | tool-refuted | run file `gemini … ok, 3 findings, 171s` | (Claude blind) | "audit doc's 3-voice/3-3 claim may overstate — gemini was down" — REFUTED: gemini *did* run in the PR #35 pass and independently caught the enum bug. |
| **False-positive** | — | tool-refuted | PyPI `version: 2.3.0` | (Claude blind) | "temporalcv v2.3.0 pinned in copy" — the version is correct (PyPI latest = 2.3.0); only a generic "don't pin" style note survives. |

Kept as **Individual/noise**: identical `16.98/14.06` contrast across guides/dlai/claude-books
(real — shared scaffold token, not 3 coincident measurements); CHANGELOG "8 others open" (a
volatile count, but dated-log exempt).

## Dispositions

- **Fixed → PR #38** (the one Consensus item worth acting on): re-tensed research-agent
  `summary` ("A **prototype** LangGraph research agent…") + `description_long` (past tense; dropped
  the present-tense "It's the querying layer / how I turn the KB into vetted answers"; added "The
  repo is now archived.") so badge ⇄ whats_next ⇄ prose agree. `npm run build` green (Zod-validated).
- **Deferred (codex, real but a feature):** a first-class `archived` status in the schema/badge/
  legend — current enum is `released/in-progress/prototype/planned`. Not required for the fix.
- **Report-only (dated-doc / convention judgment, no change):** the recon "7 of 9" count; the
  `~/.cache` provenance convention; the "Last shipped" relabel; the #34 dated-log block.

## Meta

- **gemini is flaky, not down.** It parsed cleanly in the PR #35 run (3 findings) and came back
  `unparsed` here — same day, same `agy` backend. A `non-ok`/`unparsed` voice is surfaced as a
  failure and the panel degrades to Claude+Codex; it is never reported as "found nothing". (The
  stale "Gemini CLI DOWN" pickup-note was corrected to match.)
- The blind author-voice produced two **false positives** that tool-grounding killed (the gemini
  and temporalcv worries) — the expected weakness of self-review, and why the external voice +
  objective grounding carry the verdict.

## Reference
- Reviewed range: `bf4d4cb..550b32c`. Sibling (pre-merge) review: `…-cross-repo-health-audit-adversarial-review.md`.
- Audit: `2026-06-20--cross-repo-health-audit.md`; verification review: `…-review.md`.
- Remediation: PR #38 (`fix/research-agent-prose-archived`). Run file: `~/.cache/adversarial-review/brandon-behring.dev/main-20260620-174757.md` (machine-local — see the Verified provenance finding above).
