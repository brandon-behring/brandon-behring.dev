# Review — #55 harden canvas demos (EigenSlider + StabilityRegion)

**Date:** 2026-06-23
**Branch:** `feat/55-harden-canvas-demos` (off `main` @ `d2f4d96`)
**Driver:** [#55](https://github.com/brandon-behring/brandon-behring.dev/issues/55) —
harden both canvas demos against five items the #52 adversarial pass surfaced
(inherited from the shipped EigenSlider / latent for multi-instance). Plan:
`~/.claude/plans/52-build-clever-feigenbaum.md`.

## Change under review

Three files (no `tokens.css` / `projects.json` / MDX change — palette unchanged):

- `src/components/EigenSlider.astro`, `src/components/StabilityRegion.astro` — fixes #1–#4:
  1. **Palette cache** — `getComputedStyle` reads hoisted into `readPalette()`, run once at
     init (not per-frame in `draw()`); refreshed only on a scheme flip.
  2. **matchMedia guard** — scheme listener registered AFTER first draw + the `__ready` seam,
     feature-detected (`addEventListener` else `addListener`).
  3. **Status decouple** — visible `<output aria-live="off">` updates on `input` (tracks the
     drag live); hidden `<span class="sr-only" aria-live="polite">` updates on `change`
     (settled announcement only). `.sr-only` copied from `ClusterCard.astro:170-180`.
  4. **Unique ids** — `uid = crypto.randomUUID().slice(0,8)` suffixes every `id`/`for`.
- `e2e/demos.spec.ts` — fix #5: red/blue hue-presence probe (both series drew) + all selectors
  switched to structural (`.eigen-slider …` / `.stability-region …`); plus a split-dispatch
  decouple test and a scheme-flip survival test.

## Method

`independent-review` skill — 3 cold `independent-reviewer` shards (artifact + checklist only,
conclusions withheld). Build + `npm run test:e2e` (46/46, light + dark) run before review.

## Findings

| # | Shard | Verdict | Finding | Disposition |
|---|-------|---------|---------|-------------|
| 1 | diff-correctness (palette cache + matchMedia) | **PASS** | 0 findings. Confirmed: `draw()` consumes cached `palette` (no per-frame `cssVar`); scheme-flip reassigns `palette` and `draw()` re-reads the outer binding (no stale snapshot); `readPalette` keys == `draw` consumers (5/5, 8/8); listener after seam + feature-detected; math/geometry untouched. | — |
| 2 | a11y decouple + unique ids | **PASS** | 0 findings. Visible `aria-live="off"` on input + hidden polite on change; announcer empty at load; `.sr-only` exact-matches ClusterCard in both; every id uid-suffixed with consistent `for`↔`id`; script resolves structurally. | — |
| 3a | consistency-refute | WARN | Flip test's hue assertions are **vacuous for proving recolor** — both palettes have red+blue, so pre-flip pixels pass even if the handler never fired. Comment overclaimed "must refresh its cached palette." | **Fixed** — comment now claims only no-throw + not-blanked; recolor correctness noted as covered by the light+dark load runs + shard-1 trace. Test renamed `…survive a color-scheme flip (no throw, stay rendered)`. |
| 3b | consistency-refute | WARN | SR `toBeEmpty()` assertion is sound, but the comment's "a both-events dispatch could not" framing is overstated. | **Fixed** — comment tightened to "the input-only path never calls announce(), so the announcer stays empty." |
| 3c | consistency-refute (`not_reviewed`) | note | EigenSlider's `announce()` path had **zero test coverage** (only SR was decouple-tested). | **Fixed** — added a minimal ES input-only→empty / change→announced assertion. |

Both components passed cold (2× PASS, 0 findings); the refute shard found only **test-quality**
issues (overclaiming comments + a coverage asymmetry), all fixed. Re-ran `npm run test:e2e` →
**46/46** after the fixes.

## Edits applied

- `e2e/demos.spec.ts`: honest flip-test comment + rename (3a); tightened SR decouple comment
  (3b); added EigenSlider decouple assertions (3c).

## Edits NOT applied (adjudicated)

- (Initially declined a genuine palette-swap assertion in the flip test — **REVERSED** in the
  adversarial round below, which independently corroborated 3a and showed the load runs do NOT
  cover palette VALUES either. The `__esPalette`/`__srPalette` seams were added.)

## Adversarial review (3-voice → effective 2-voice)

`/adversarial-review --uncommitted` (lever `adversarial_review.py`, run on the code-only diff —
the session log was held out so it couldn't anchor the voices). **codex** (gpt-5.5 @ xhigh)
returned 4 findings; **agy** (Gemini 3.1 Pro) **timed out** (`Error: timed out waiting for
response`) — surfaced as a voice failure, not "clean", so this was effectively codex + Claude.

| # | codex conf | Tier | Finding | Disposition |
|---|-----------|------|---------|-------------|
| F1 | 92% | **Verified** (codex + indep. shard 3a) | Flip test vacuous — the hue probe proves "not blanked", not "recolored"; the light/dark load runs only assert hue *classes*, not palette VALUES, so the matchMedia/refresh path was untested. | **Fixed properly.** Added `__esPalette`/`__srPalette` seams; the flip test now asserts the cached palette VALUE swaps light→dark. A probe found `emulateMedia` updates `matchMedia.matches` + `getComputedStyle` but does NOT dispatch the MQL `change` event → the test dispatches it (after a `getComputedStyle` settle-read); it still fails if `onScheme` were unregistered. |
| F2/F3 | 68% ×2 | Individual (codex) | `change` handler only called `announce()` — a `change` without a preceding `input` would leave the visible output/canvas stale while the announcer reports the new value. | **Fixed.** `change → draw(); updateStatus(); announce();` on both demos. Decouple intact (input still never announces; verified by the split-dispatch tests). |
| F4 | 46% | Individual (codex) | `window.matchMedia` itself unguarded — a stripped webview would still throw. | **Fixed.** Wrapped in `if (typeof window.matchMedia === 'function')` on both. |

Re-ran `npm run test:e2e` → **46/46** after the fixes (the flip test now genuinely exercises
`onScheme`). No second adversarial pass (fixes are small, defensive, and test-covered; agy was
flaky). Privacy: the diff went to OpenAI (codex); Brandon's portfolio code is public.

## Open follow-ups

- None blocking. **Do not self-merge** — PR opened for Brandon's review.

## Reference

- Plan: `~/.claude/plans/52-build-clever-feigenbaum.md`
- #52 (predecessor) review: `docs/sessions/2026-06-23--issue-52-stability-region-review.md`
