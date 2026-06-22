# 2026-06-22 — Issue #2 portfolio hygiene: repo-metadata batch

**Driver:** The doable-now slice of `#2` ("portfolio-wide hygiene") — GitHub repo metadata
(homepage / topics / description) across the public repos, applied via `gh repo edit`. `#2` is
cross-repo (GitHub settings + `CITATION.cff` files in other repos + OG images on other sites), so
this batch made **zero changes to the bb.dev site code** — this doc + the CHANGELOG/CURRENT_WORK
records are the only bb.dev-repo footprint. (Note: #2, like #33 and #36, was labeled "bb.dev-only"
in the forward sequence but is actually cross-repo — the bb.dev *code* backlog is now thin.)

**Method:** Pulled current metadata for all public repos (`gh repo list --json …`), proposed exact
homepage/topics/description values, got sign-off (outward-facing), applied via `gh repo edit`, then
re-queried to verify each landed. Homepage URLs were curl-verified `200` before being set.

**Applied (13 repos, all verified):**
- **Homepage URLs** (factual, `200`): `brandon-behring.dev`, `ssm-foundations`,
  `double_ml_time_series` (→ `dml.brandon-behring.dev`), `claude-books`; **fixed**
  `guides-ai-engineering` (raw `*.workers.dev` preview → `guides.brandon-behring.dev/ai-engineering/`).
- **Topics** (was 0): 11 portfolio-relevant repos — brandon-behring.dev · ssm-foundations ·
  double_ml_time_series · claude-books · research-kb · eval-toolkit · temporalcv ·
  causal_inference_mastery · book-scaffold-astro · ir-eval · deploy-workflows.
- **Descriptions**: filled `claude-books`' empty description; **claim-safety fix** on
  `dlai-study-notes` — it advertised "Live at study-notes.brandon-behring.dev" (does not resolve) →
  "web edition pending".

**Remaining (#2 stays OPEN):** topics on the remaining/utility repos + `guides-tooling`'s empty
description (purpose unclear); `CITATION.cff` in research-kb + the academic repos (per-repo PRs);
OG images for the dml + ssm book sites (per-repo design). The `aisuite` fork was skipped.

**Review:** doc-only bb.dev change (the metadata edits were verified live on GitHub at apply time);
a single **drift** `independent-reviewer` shard over CHANGELOG + CURRENT_WORK + this log.

**Reference:** issue [#2](https://github.com/brandon-behring/brandon-behring.dev/issues/2) ·
the 2026-06-20 cross-repo audit (`docs/sessions/2026-06-20--cross-repo-health-audit.md`).
