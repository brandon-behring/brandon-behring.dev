# Independent review — explainer remediation diff (2026-06-10)

**Driver**: pre-commit gate for the remediation commit on `lab-ssm-explainer`
(fixes from the [adversarial review](2026-06-10--ssm-explainer-adversarial-review.md)).
**Method**: 2 fresh-context `independent-reviewer` shards, verification-mode, cold-read.

## Findings

| Shard | Scope | Verdict | Notes |
|---|---|---|---|
| 1 | Rewritten factual sentences vs primaries (S4/Mamba-1/Mamba-3 papers, companion scripts) | **FAIL → 1 DRIFT, fixed** | 12/13 PASS (S4-bilinear, both Mamba-3 terms, complex-state independence, holistic attribution, Van Loan split, Radau rtol 1e-11 matches the companion's `solve_ivp` call, all banned phrases absent). DRIFT: "Mamba settled on ZOH" — Mamba-3 §3.1.1/fn 3 documents the released Mamba-1/2 implementation as *exponential-Euler* (same e^{AΔ} state map, Euler input). |
| 2 | Remediation code diff (slider, layout, RSS, SKILL §4b, frontmatter, log) | **PASS** (9/10 + 1 info) | Slider math/DPR/event-split/scoped-lookups all verified (counts 2/6 and 4/6 recomputed); RSS item valid XML with correct link/pubDate, 19 project items intact; build green, no page regressions; SKILL §4b consistent. Info-DRIFT: the log's em-dash figure was counting-method-sensitive. |

## Edits applied

- Beat 2: "settled on discretizations built around the exact exponential e^{AΔ} — the
  ZOH and its close cousins"; stability beat: "(bilinear for S4, the e^{AΔ} family for
  Mamba)"; kicker: "(the paper pins its predecessors' rule down as *exponential-Euler*:
  exact exponential for the state, Euler for the input)" — all three sourced from
  Mamba-3 §3.1.1/footnote 3, and the last strengthens the kicker's
  "first-order bottleneck" claim.
- Adversarial log: em-dash claim made method-insensitive ("≈2.0 → ≈1.0 per 100 words").

## Edits NOT applied

- Reviewer's longer parenthetical explaining the reported-vs-implemented ZOH history —
  the lighter "close cousins" + kicker parenthetical carries the accuracy without a
  history digression.

## Coverage gaps

Van Loan 1978 / Al-Mohy & Higham 2011 primary PDFs unfetchable (attribution rests on
the companion docstrings + standard practice); KaTeX visual quality (markup-level only);
runtime multi-monitor DPR change (pre-existing, out of checklist).

## Reference

Tasks #26/#27; marker `.claude/.last-review` re-written for this commit.
