# 2026-06-24 — #32 DLAI study-notes launch + hub surfacing

**Driver:** `brandon-behring.dev#32` — launch the DeepLearning.AI study-notes corpus at
`study-notes.brandon-behring.dev` and surface it on the bb.dev hub. Closes #32.

## What shipped

1. **Scaffold `@brandon_m_behring/book-scaffold-astro@4.26.0`** (+ `create-book`) published to npm via
   OIDC (after a codex-verified lockfile-orphan fix + a `publish.yml` guard — see prior session).
2. **dlai** bumped to `^4.26.0`, PR #2 squash-merged to `main` (`0d7a1b0`).
3. **Cloudflare Workers Builds** (Git-connected) connected by Brandon → first deploy green →
   custom domain `study-notes.brandon-behring.dev` bound. **NOT** Pages (CF disabled Pages-creation on
   this account 2026-06-11); matches `guides` / `ssm-foundations`.
4. **This PR** (`feat/32-dlai-hub-surfacing`) — the bb.dev hub surfacing.

## Pre-bind verification gate (Step 2, decision #8)

Cold-verified on the live `workers.dev` URL **before** the domain bind:

- **Routes / dlai#1** — every route 200, deep chapter routes serve rendered content (119 KaTeX spans
  sampled), negative control 404. **dlai#1 resolved → closed** with 200-proof. The 3 validator
  "may not resolve" link warnings are **false positives** (`/finetuning-rl-intro/`,
  `/evaluating-ai-agents/` both 200 live).
- **DLAI policy compliance** — no verbatim transcripts; questions original ("never derived from
  course quizzes"); CC-BY-NC + per-course instructor attribution + a resolving takedown contact
  (`mailto:brandon.m.behring@gmail.com`) on `/about`. **One judgment item surfaced** (book-level vs
  per-chapter-page attribution); Brandon chose to bind (attribution present + one click away via
  breadcrumb).

## Step-9 review (decision #10: independent-review + full 3-voice adversarial)

**Method:** 2 cold `independent-reviewer` agents (claim/diff · drift+consistency-refute, intent
withheld) + adversarial refute pass (Claude hostile lens · agy/Gemini). Live site + repo used as
ground truth. **Coverage caveat (no silent caps):** the codex voice did not complete in this
environment (2 attempts — a ~6-min no-output hang, then SIGTERM on a bounded retry), so the external
adversarial slot is the agy/Gemini voice alone. agy independently surfaced the CC-BY-NC + .tex
findings (net-new beyond the Claude voices), so the external slot produced real signal — but the
3rd-voice cross-check codex normally provides is absent this run.

### Findings + adjudication

| # | Severity | Finding | Source | Disposition |
|---|---|---|---|---|
| F4 | HIGH | "Anki .apkg deck export" / "Anki decks" / "Anki-carded" — the `.apkg` export is a **STUB** (card-extractor writes JSON; all `.apkg` URLs 404; only interactive web flashcards exist) | claim/diff + agy + Claude | **FIXED** → "spaced-recall flashcards" / "flashcard-backed" (×4 surfaces) |
| F-link | HIGH | CHANGELOG + CURRENT_WORK referenced this session log before it existed (dead link) | drift | **FIXED** → this file |
| CC | HIGH | "Every course is attributed... **under CC-BY-NC**" can read as licensing DLAI's copyrighted course | agy | **FIXED** → "Each course's notes are released under CC-BY-NC, attributed to the DeepLearning.AI instructor" (license on the notes, course attributed — mirrors live `/about`) |
| Gold | MED | "Gold-tier DeepLearning.AI courses" leaks an **author-private** curation label as if a DLAI-published rating | Claude + agy | **FIXED** → "a curated set of DeepLearning.AI short courses" |
| tex | MED | "per-course .tex → MDX" implies DLAI ships LaTeX (it doesn't) | agy | **FIXED** → "hand-authored in LaTeX, converted to MDX" |
| 3→4 | MED | `portfolio.ts:116` comment "3 live works" + decision-map:381 "3 flagship pages" stale after the 4th flagship | self + drift | **FIXED** → 4 |
| Doc-X | HIGH | decision-map:406 cell said "flagship" while sitting under the **"Support The Lead"** heading (intra-doc contradiction) | drift | **FIXED** → strikethrough + "Superseded 2026-06-24" framing (in-section, coherent) |
| Vanity | LOW | "actively expanding" ×2 = momentum copy vs anti-vanity discipline | Claude | **FIXED** → trimmed to "Live." + forward-look once in `whats_next` |
| Audit | MED | "audit-during-conversion quality pass" borrows the "auditable" brand without a linked artifact | Claude | **FIXED** → substantiated ("each chapter carries a provenance + audit trail") + summary softened to "quality-review pass" |
| Words | LOW | "practice problems" (flagship) vs "practice questions" (canonical + live site) | Claude | **FIXED** → "practice questions" everywhere |

### Surfaced to Brandon (judgment — not self-adjudicated; he made decision #7)

- **Flagship weight (2 voices: Claude H1/H2 + agy):** promoting derivative course-NOTES to a co-equal
  homepage flagship next to 3 original-research flagships risks diluting the "applied-math rigor /
  original research" signal, and reverses the decision-map's own prior "do not let it read as the main
  identity." Brandon decided this deliberately (decision #7, via `/exploring-options`, knowingly
  overriding the doc). Re-flagged here for awareness; alternative was "supporting evidence," or
  flagshipping `book-scaffold-astro` (the reusable system) instead of its sample output.
- **Homepage card attribution (Claude H4):** the 1-line flagship blurb carries no CC-BY-NC/attribution
  while the live site is scrupulous; the `/work` detail + live site both carry full attribution, and the
  blurb parallels the other 3 flagships (no license text). Left clean; Brandon's call.

### Not in scope (pre-existing, noted)

- `visual-design-options-report.md:74` "homepage still leads with '…study notes corpus'" — stale hero
  description predating the 2026-06-23 identity ratification; a separate doc-hygiene follow-up.

## Verification

- `npm run build` — 0 errors / 0 warnings, 17 pages; `corpusIndex` (throws without a live `site_url`)
  passes.
- `npm run test:e2e` — **46 passed** (smoke routes + the 3 canvas demos, light + dark).
- Render-verified: dlai as 4th homepage flagship + `/work/books-and-guides/` corpus row + cluster-page
  `corpusBackHref` back-link; live links resolve to `study-notes.brandon-behring.dev`.

## Reference

`#32`, `dlai-study-notes#1` (closed), PR `feat/32-dlai-hub-surfacing`.
Manual launch runbook (transient): `docs/dlai-launch-manual-steps.md`. Prior publish-fix narrative:
the #32 handoff memory.
