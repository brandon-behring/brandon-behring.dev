# Projects.json Audit (2026-05-25)

Driver: the visual-assets task surfaced that the `dlai-study-notes` URL didn't resolve. That triggered a wider audit — *the screenshot work is really an audit; screenshots are the artifact that proves a site is real*. This session expanded the scope to check every projects.json entry's `site_url`, `repo_url`, and `status` claim against reality.

## Method

For each of the 9 entries in `src/data/projects.json`:

- `curl -sSI <site_url>` for the HTTP code (or NXDOMAIN if DNS fails).
- `gh repo view <owner/repo>` for repo existence (and public/private).
- Compare status claim against measured state; flag mismatches.

Repository names without a clear GH match got name-variant checks (hyphens vs underscores) before being declared missing.

## Findings table

| # | slug | status claim | site | repo | verdict |
|---|---|---|---|---|---|
| 1 | causal-inference-mastery | reference | (none) | OK (public) | OK |
| 2 | double-ml-time-series | manuscript | (none) | OK (private) | OK |
| 3 | temporal-validation | reference | (none) | OK (public) | OK |
| 4 | prompt-injection-detector | PoC | (none) | **404 (typo)** | URL typo: underscores → hyphens |
| 5 | eval-toolkit | pre-v1 | (none) | OK (public) | OK |
| 6 | prompt-injection-portfolio | pre-alpha | (none) | OK (public) | OK |
| 7 | dlai-study-notes | **live** | **NXDOMAIN** | **404 (missing)** | status BROKEN; site doesn't exist; repo never pushed |
| 8 | rl-and-control | in-progress | (none) | (none) | OK (local-only by design) |
| 9 | ssm-foundations | in-progress | **HTTP=200** | OK (public) | OK; could upgrade status |

## Edits applied this round

### Entry #4 — prompt-injection-detector (URL typo fix)

`repo_url` had underscores: `https://github.com/brandon-behring/prompt_injection_detector`. Real repo is at `https://github.com/brandon-behring/prompt-injection-detector` (hyphens, **private**). Updated to the correct URL. A non-authenticated visitor clicking will still get a 404 since the repo is private — that's a separate question (make public vs add private-badge UX) deferred to a later session.

### Entry #7 — dlai-study-notes (broken-claim cleanup)

The most consequential edit:
- `status: "live"` → `"in-progress"`
- `site_url: "https://study-notes.brandon-behring.dev"` → `""` (DNS NXDOMAIN — broken link)
- `repo_url: "https://github.com/brandon-behring/dlai-study-notes"` → `""` (repo never pushed; tried 5 name variants — none exist)
- `description_long` softened: "Live corpus" → "In-progress corpus"; added "Currently local-only — publishing surface pending."
- `whats_next` updated: added "Deploy to a public URL is the immediate-next step."

Net: the Course Notes cluster card on the homepage no longer advertises a broken "View live" link, and the project description accurately reflects what's true (local-only as of 2026-05-25 with healthy commit activity but no remote).

### Visual fields wired (Phase 3 of this audit)

Playwright captured 1600×900 viewport screenshots of the 2 confirmed-live sites:
- `public/screenshots/ssm-foundations.png` (99 KB) → wired into `ssm-foundations.visual`
- `public/screenshots/rl-and-control.png` (137 KB; this is `/lab/research-graph/` since the lab page IS the visible artifact for rl-and-control) → wired into `rl-and-control.visual`

The cluster pages now render real screenshots where the empty "Screenshot" placeholders used to be (verified via local `npm run build` → 6 pages clean).

## Edits deliberately NOT applied

- **ssm-foundations status upgrade**. Audit flagged "site live; status may be upgraded" — but only 6 of 17 chapters are shipped, so "in-progress" is still accurate. Left as-is. Upgrade when the bulk of chapters land.
- **prompt-injection-detector repo public/private decision**. Repo exists at the corrected URL but is private. Public visitors clicking will 404. Options for a later pass: (a) make the repo public, (b) add a "private repo" UX indicator in `<ProjectSection>`, or (c) blank the `repo_url` for now. No call this round.
- **dlai-study-notes deployment work**. The bigger question — push to GH, set up Workers Static Assets, bind a subdomain — is still open. This audit just aligned the claim with reality.

## Open follow-ups

| Follow-up | Cost | Notes |
|---|---|---|
| dlai-study-notes deployment | 1-2 hr | Push the local repo to GH; bootstrap wrangler + GH Actions; bind subdomain |
| prompt-injection-detector private-repo UX | 15 min | Decide visibility or add UI affordance |
| ssm-foundations status upgrade trigger | n/a | When chapter count hits some threshold (e.g., 12/17), flip to a "live" or "shipping" status |
| Audit other projects for less-obvious drift | 30 min | E.g., are the `whats_next` claims still accurate? do `description_long` paragraphs reflect current state? Not done this round. |

## Reference

- Prior commits this session: A4 enrichment chain ending at `0619fc7`.
- The screenshot capture step: Playwright MCP @ 1600×900 viewport.
- Build verification: `npm run build` → 6 pages clean, screenshots present in `dist/screenshots/`.
- ProjectSection consumer: `src/components/ProjectSection.astro:37` renders `<img src={project.visual}>` when `visual` is non-null.
