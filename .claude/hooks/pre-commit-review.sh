#!/usr/bin/env bash
# PreToolUse(Bash) backstop for the ambient independent-review workflow.
#
# Blocks a `git commit` ONCE if no fresh review marker exists, so the
# independent-review skill is run before substantive changes ship. A shell
# hook cannot spawn a subagent; it injects the trigger (exit 2 -> stderr is
# fed back to Claude), and the orchestrator then runs the skill, which writes
# the marker and clears this gate on the re-commit.
#
# Freshness rule: .claude/.last-review must exist AND be newer than every
# tracked source file under src/ and docs/. If anything is newer (or the
# marker is absent), the review is stale -> block.
#
# Registered as a PreToolUse matcher on "Bash" in .claude/settings.local.json.

set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
MARKER="${PROJECT_DIR}/.claude/.last-review"

# Read the hook payload from stdin and extract the Bash command.
payload="$(cat)"
command="$(printf '%s' "$payload" | sed -n 's/.*"command"[[:space:]]*:[[:space:]]*"\(.*\)".*/\1/p')"

# Only gate `git commit`. Everything else passes untouched.
case "$command" in
  *"git commit"*) ;;
  *) exit 0 ;;
esac

# Allow commit-internal no-ops and amends of the marker itself to pass through
# is unnecessary; we simply check freshness.

is_stale=0
if [[ ! -f "$MARKER" ]]; then
  is_stale=1
else
  # Any tracked source newer than the marker => stale.
  newer="$(find "${PROJECT_DIR}/src" "${PROJECT_DIR}/docs" -type f -newer "$MARKER" 2>/dev/null | head -n1 || true)"
  [[ -n "$newer" ]] && is_stale=1
fi

if [[ "$is_stale" -eq 1 ]]; then
  cat >&2 <<'MSG'
[independent-review] Commit gated: no fresh review for the current changes.

Run the `independent-review` skill before committing — it fans out fresh-context
reviewers, surfaces verdicts + proposed fixes (you decide what to apply), and
writes the .claude/.last-review marker that clears this gate. Then re-commit.

(One-off override if you must skip: `touch .claude/.last-review` — but that
records no review.)
MSG
  exit 2
fi

exit 0
