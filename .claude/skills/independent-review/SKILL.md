---
name: independent-review
description: Fan out fresh-context independent-reviewer subagents over an artifact and surface ONLY their distilled verdicts + proposed fixes. Use PROACTIVELY before committing substantive content/code changes, and whenever the user asks to "review", "audit", "verify the claims", "check for drift", or "independently check" something. This is the ambient review the pre-commit hook expects — running it writes the review marker that clears the commit gate.
effort: medium
argument-hint: [artifact-or-scope to review]
allowed-tools: Agent, TaskCreate, TaskUpdate, TaskList, Read, Grep, Glob, Bash, Write
---

# Independent Review — fan out, collect verdicts only

**Scope**: ${ARGUMENTS:-the current uncommitted changes (git diff) plus any
cross-source consistency the change touches}

You are the **orchestrator**. Your objectivity depends on consuming only the
reviewers' distilled verdicts — never their reasoning. Follow this exactly.

## 1. Decide the review shards (narrow slices)

Break the scope into independent review jobs. Each job = one artifact + one
checklist. Keep it to **1–4 reviewers**. Typical shards:

- **Drift review** — context docs (`CURRENT_WORK.md`, `docs/roadmap.md`,
  `docs/website-decision-map.md`, `.claude/CLAUDE.md`) vs reality. Checklist: does any
  doc **snapshot a cross-repo fact** (a version, release status, or open-issue-number)
  instead of pointing to the board / the repo? Is `CURRENT_WORK.md` current (no
  left-behind "in progress" after merge)? Do `docs/roadmap.md` claims match
  `src/data/projects.json` + live `gh issue list`? (See `docs/DOC-CONVENTIONS.md`.)
- **Diff review** — the `git diff`. Checklist: correctness, false claims,
  broken links/refs introduced, overclaim in copy.
- **Claim/link review** — external claims in changed `projects.json` entries.

## 2. Create durable task records FIRST (mandatory)

Before launching anything, `TaskCreate` one task per shard (subject + the exact
checklist). This is the contract `/check-delegated` reads; without it the work
is invisible after compaction. `TaskUpdate` each to `in_progress` as you launch.

## 3. Fan out — isolation IN

Launch the reviewers with the **`independent-reviewer`** agent, all in ONE
message (parallel). For each, the prompt contains ONLY:

- the artifact (or how to obtain it read-only), and
- the checklist for that shard.

**Withhold the intended conclusion and any "we know this is fine" context.** The
reviewer must cold-read. (Mechanical link/status shards may use a `haiku`
reviewer once `claim-verifier` exists; for now use `independent-reviewer`.)

## 4. Collect — distillation OUT

Each reviewer returns a single JSON verdict. **Surface to the user only:**

- the per-shard `verdict` (PASS/FAIL) and counts,
- every finding that is `FAIL`/`DRIFT`/`UNKNOWN`, with its `proposed_fix`,
- **conflicts** between reviewers (same item, different verdicts),
- each reviewer's `not_reviewed` (so coverage gaps are visible).

**Never** echo a reviewer's deliberation, nor paste raw `gh`/`git`/`curl`
transcripts. That suppression is the objectivity mechanism. You may verify a
decisive finding yourself before acting on it — but report the verdict, not the
reasoning chain.

## 4b. Adversarial mode (refute-mode)

When the user asks for an **adversarial** / refute-mode review (or the artifact
is a public-facing flagship where verification has already passed once), switch
the shard prompts from *verify* to *attack*:

- Each reviewer plays a **hostile, perspective-diverse lens** (e.g. pedantic
  domain expert · hostile researcher checking history against primary sources ·
  hostile front-end/a11y engineer · hostile editor suspecting AI prose + process
  auditor). Its job is to find reasons the artifact should NOT ship; uncertain
  attacks are INCLUDED, not dropped.
- Checklists still name coverage areas only — never the expected answer.
- **Adjudication**: the orchestrator confirms/refutes each *objective* attack
  with hard evidence only (fetch the primary source, compute, inspect the build)
  and records the evidence; *judgment* findings (voice, taste, emphasis) pass to
  the user RAW — never self-adjudicated by the artifact's author.
- Default to **report-only**: verdict table + proposed fixes; apply nothing
  until the user picks.

Why this exists: verification-mode confirms what a checklist names and so
structurally misses wrong-but-unchecked claims (a claim inherited from a
sibling artifact passed 15/15 verification and fell in one adversarial pass —
see `docs/sessions/2026-06-10--ssm-explainer-adversarial-review.md`). Claims
inherited from your own prior artifacts must be re-verified against *primary*
sources — the sibling artifact is not a primary source.

## 5. Authority boundary

Reviewers **advise + propose fixes only**. Present the proposed fixes; the user
decides what to apply. Do **not** auto-apply (low-risk mechanical fixes
included) unless the user says so.

## 6. Record + clear the gate

- `TaskUpdate` each task to `completed`.
- Write a session log `docs/sessions/<YYYY-MM-DD>--<topic>-review.md` mirroring
  `docs/sessions/2026-05-25--projects-audit.md` (Driver → Method → Findings table
  → Edits applied → Edits NOT applied → Open follow-ups → Reference).
- Write the marker so the pre-commit hook clears:
  `printf '%s\n' "$(date -u +%FT%TZ)" > .claude/.last-review`
- Point the user at `/check-delegated` for the full per-task drill-down.
