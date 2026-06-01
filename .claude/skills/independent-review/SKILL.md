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

- **Drift review** — `docs/roadmap.md` per-project status vs `src/data/projects.json`
  vs live `gh issue list`. Checklist: does every status/claim in roadmap match
  projects.json and open issues?
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
