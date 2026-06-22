# Independent review (round 2) — scaffold v4.25.3 shipped + recovery

**Date:** 2026-06-22
**Driver:** Brandon — "independent review it all again" after a session with two corrected mistakes (A1 dismissed → fixed; consumer-propagation entanglement → backed out). Adversarial cold-read of the full *shipped + recovered* state.

**Method:** `independent-review` skill, 3 parallel cold-read `independent-reviewer` shards (attack-mode): (A) scaffold v4.25.3 on `origin/main`, (B) consumer-recovery integrity (3 guide repos), (C) published npm artifact. Orchestrator adjudicated objective findings against ground truth.

## Findings (after adjudication)

| Shard | Class | Finding | Adjudication | Fix |
|---|---|---|---|---|
| **C** npm | ✅ **PASS** | published 4.25.3 contains the A1 fix (container-bounded; **no** `100vw`/`translateX`); version is `latest`; `--measure-code: 48rem` | **CONFIRMED — the fix actually shipped** | none |
| **A** main | doc gap | CHANGELOG `[4.25.3]` omits the equation-overflow check (#172, merged after the release commit) | CONFIRMED (grep empty) | add a Tests bullet for #172 |
| **A** main | doc gap | `docs/responsive-reading.md` "Status & backlog" marks 3 **shipped** items (code / equation / tables) as 🔲 PLANNED | CONFIRMED (Nav/Prose correctly still 🔲) | flip the 3 to ✅ (v4.25.x) |
| **B** recovery | residue (mine) | `guides` + `guides-ai-engineering` local `wave1/scaffold-align` have a dangling upstream (`[gone]`) | CONFIRMED — I created it (pushed `wave1` → deleted `origin/wave1`) | `git branch --unset-upstream` on each |
| **B** recovery | imperfection (mine) | `guides` + `guides-experimentation`: pin `^4.25.1` (your WIP) vs lockfile reverted to baseline (4.24.0 / 4.2.0) | CONFIRMED — my backout reverted the lock to baseline, not your WIP's 4.25.1; transient, self-heals on `npm install` | leave for your wave1 `npm install` (it's your WIP) |
| **B** recovery | ❌ REFUTED | "stash@{0} is stranded orphan work — drop it" | **PRE-EXISTING (yours:** "wave1 pre-rebase: superseded…"); I never ran `git stash` → not my residue, not mine to drop | none (your call) |
| **B** recovery | ❌ REFUTED | "all 3 repos should be on `main`, not `wave1`" | `wave1/scaffold-align` is your **as-found** working branch | none |
| **B** recovery | expected | dangling reflog commits (my reset-away 4.25.3 bumps) | normal git; unreachable; expire via gc | optional `git gc` |
| **C** npm | pre-existing | `CHANGELOG.md` not in the tarball; `CLAUDE.md` changelog a bit behind | **not** a v4.25.3 regression (CHANGELOG was never in `files`) | optional |

## Edits applied
None (report-only).

## Edits NOT applied
All proposed fixes above — pending Brandon's pick.

## Open follow-ups
1. **2 doc fixes on `main`** — CHANGELOG #172 Tests bullet + `responsive-reading.md` 🔲→✅ for the 3 shipped items.
2. **Unset the dangling upstream** on `guides` + `guides-ai-engineering` (pure residue I created).
3. **Brandon finishes wave1** — `npm install` reconciles the pin/lock in `guides` + `guides-experimentation`.
4. Optional / pre-existing: CHANGELOG-in-tarball, `CLAUDE.md` per-patch entry.

## Reference
Reviewed: this session's shipped #170/#171/#172 + the consumer-recovery. Tasks #27/#28/#29.
Headline: **the shipped fix is correct** (verified in the published tarball); residual items are minor docs + my recovery residue.
