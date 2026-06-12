# 2026-06-11 — Board #1 cron reconciler (bb.dev#13)

**Driver**: the open-`tracked`-⇒-board invariant broke for the **seventh** time. Count:
5× in 48h pre-#13 (the issue's own driver), a 6th on 06-11 during the work-so-far review
(5 fresh issues re-boarded), and a **7th found live during this session's planning** —
`brandonmbehring-dev/claude-best-practices#2` open + `tracked` but absent from
[board #1](https://github.com/users/brandon-behring/projects/1) (comm-diff: 62 open
tracked vs 111 board items, diff = exactly that one). Manual reconciliation cannot hold
it; per-repo auto-add (#8) structurally cannot either (one repo per workflow,
plan-capped, not retroactive). [#13](https://github.com/brandon-behring/brandon-behring.dev/issues/13)
designed the durable fix; this session shipped it.

## What shipped

[`.github/workflows/board-reconciler.yml`](../../.github/workflows/board-reconciler.yml) —
a scheduled Action (every 6h + manual dispatch) that comm-diffs open `tracked` issues
across **both** GitHub accounts against board #1 and `gh project item-add`s whatever is
missing. Add-only. Plus CURRENT_WORK/CHANGELOG bumps.

## Decisions (via `/exploring-options`, all 7 locked 2026-06-11)

| # | Decision | Choice | Why |
|---|----------|--------|-----|
| 1 | Host repo | **brandon-behring.dev** | Issue #13/#8 locality; public workflow = process-as-artifact. Logs show issue URLs only (repos already named on the portfolio), never titles. |
| 2 | Owner scope | **Both accounts** | The one missing item lives in `brandonmbehring-dev` — single-owner search misses it permanently. Limitation: the PAT sees only what `brandon-behring` can access — dev-account private repos without collaborator access stay invisible (fine today; `claude-best-practices` is public). |
| 3 | Cadence | **Every 6h** (`17 */6 * * *`) | Issue's own design; worst-case 6h gap ≪ the multi-day windows in which breaks were actually noticed. Minute offset because GitHub delays/drops top-of-hour crons. |
| 4 | PAT expiration | **1 year** (rotate ~2027-06-11) | Failure mode is loud (sentinel + expiry emails), so long lifetime carries little silent risk. |
| 5 | Failure alerting | **Default GitHub failure email** | Zero extra code; keeps the PAT read-only on repos. |
| 6 | Scope | **Add-only** | Reverse drift (board rows for closed issues) is out of scope per #13; new issue if it ever bites. |
| 7 | #8 fate | **Close as superseded** after first green run | Auto-add demoted to optional latency optimization, per #13's own acceptance wording. |

## Hardening baked in (live evidence from this session)

- **`LC_ALL=C` everywhere** — the comm-diff failed live on locale collation during planning.
- **Empty-search sentinel** — a dead/expired PAT would otherwise no-op silently forever;
  0 open tracked issues across 20+ repos is implausible → hard fail.
- **1000-item truncation guard** on `item-list` (board at 111 today).
- **`permissions: {}`** + no checkout — the job touches only the PAT; nothing for
  `GITHUB_TOKEN` to leak, no third-party actions.
- Script body dry-run locally before commit: 62 open / 111 board / missing =
  `claude-best-practices#2` exactly — the first real run doubles as the live acceptance test.

## Independent review (gate pass, 1 cold-read shard)

Initial verdict **FAIL** → both findings addressed:

| Severity | Finding | Disposition |
|----------|---------|-------------|
| blocker | CHANGELOG linked this session doc before it existed | Fixed — this file. |
| drift | "broke 7×" unsupported by any committed artifact (sources recorded 6) | Confirmed true with hard evidence (the live comm-diff above); 7th break now documented here, which both edited docs link to. |

13 further checks passed (gh CLI flags live-verified against v2.93.0, `set -euo pipefail`
failure paths incl. unset-secret confirmed loud, no token-leak/injection vector, cadence +
links + issue refs accurate). Reviewer `not_reviewed`: PAT existence (secrets are
write-only), rate-limit behavior at scale, `item-add` duplicate semantics (moot — the
comm-diff prevents re-adds; the API call is also idempotent).

**Post-gate correction (2026-06-12)**: the plan specified a *fine-grained* PAT — wrong.
User-owned Projects v2 have **no fine-grained PAT permission** (the "Projects" permission
exists for *organizations* only — confirmed against both the live PAT-creation UI and
[GitHub's permission catalog](https://docs.github.com/en/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens)).
The token is therefore a **classic PAT with `repo` + `project` scopes** — broader than
designed (classic has no read-only private-repo scope), accepted because the tighter
split (project-only token for board writes) cannot resolve private-repo issue URLs at
`item-add`. This sat in the gate reviewer's `not_reviewed` list, not its passed checks.

## Acceptance (issue #13)

Board diff stays 0 with **zero manual reconciliation** through ~2026-06-18. First
dispatch must board `claude-best-practices#2`; a second dispatch must report "diff 0"
(idempotency). The per-session manual comm-diff ritual ends at first green run.

## Follow-ups

- #13 stays OPEN in observation until ~06-18; PAT rotation due ~2027-06-11 (noted in #13).
- Account-split (#5) unresolved — the two-owner search is the workaround, and any future
  *private* dev-account tracked issue will be invisible to the reconciler until then.
