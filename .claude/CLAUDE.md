# brandon-behring.dev

Personal portfolio site. Live at <https://brandon-behring.dev> (Cloudflare
Workers Static Assets).

## Where to start (if you're picking this up fresh)

This is the portfolio **hub** — read live state from the board, not from a snapshot in
these docs (see [`docs/DOC-CONVENTIONS.md`](../docs/DOC-CONVENTIONS.md)).

1. **[`CURRENT_WORK.md`](../CURRENT_WORK.md)** — the 30-second resume: what's active right now.
2. **[Work Tracker board #1](https://github.com/users/brandon-behring/projects/1)** —
   live cross-repo status + backlog (the canonical source; not snapshotted here).
3. **[`docs/roadmap.md`](../docs/roadmap.md)** — the *site's* forward plan (site work only).
4. **[`CHANGELOG.md`](../CHANGELOG.md)** — what shipped, when → its session log.
5. **[`docs/website-decision-map.md`](../docs/website-decision-map.md)** — strategy memo
   (identity framings, cluster audit). All Track A (Identity & Content) decisions defer here.
6. **[`docs/sessions/`](../docs/sessions/)** — historical decision logs. Infra (Track B)
   defers to [`deploy-workflows/README.md`](https://github.com/brandon-behring/deploy-workflows#phase-2-roadmap).

## Stack

- Astro 6 (`astro` + `@astrojs/mdx`)
- Node ≥22.12 (see `package.json:engines`)
- TypeScript 5.7
- Wrangler 4.x (devDep, for IDE schema autocomplete + local CF runtime preview)

## Layout

- `src/` — pages, layouts, components, data
- `public/` — static assets served at root
- `dist/` — Astro build output (gitignored)
- `.astro/` — Astro cache (gitignored)
- `.wrangler/` — wrangler local state (gitignored)
- `.github/workflows/deploy.yml` — 10-line caller of the reusable workflow
- `wrangler.jsonc` — Cloudflare Worker config (Static Assets)
- `CURRENT_WORK.md` / `CHANGELOG.md` — 30-sec resume + shipped-history index (root)
- `docs/` — `roadmap.md` (site forward plan), `website-decision-map.md` (strategy),
  `DOC-CONVENTIONS.md` (how docs work here), `cloudflare-setup.md`, session logs
  (`sessions/`)

## Common commands

- `npm run dev` — Astro dev server (Vite, HMR)
- `npm run build` — production build to `dist/`
- `npm run preview` — preview built site locally (Vite preview)
- `npm run dev:cf` — local preview using the actual Cloudflare Workers
  runtime (`wrangler dev`)
- `npm run deploy` — manual one-off deploy (needs `CLOUDFLARE_API_TOKEN`
  / `CLOUDFLARE_ACCOUNT_ID` in env; CI handles this normally)

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which calls the
reusable workflow at
[`brandon-behring/deploy-workflows`](https://github.com/brandon-behring/deploy-workflows)
with `secrets: inherit`. That workflow runs `npm ci` + `npm run build` +
`wrangler deploy`. No manual step.

- Worker name: `brandon-behring`
- Workers.dev preview URL: <https://brandon-behring.brandon-m-behring.workers.dev>
- Production: <https://brandon-behring.dev> (custom domain bound in CF dashboard)
- Account subdomain: `brandon-m-behring` (note middle initial)

## Conventions

- Content is the primary work product — keep build/config minimal.
- Prefer Astro components over MDX unless mixing prose + components.
- No backend; everything is static at build time.
- **Single source of truth — don't snapshot cross-repo state here.** Other repos'
  versions, release status, and open-issue numbers rot when copied in (and these docs
  load as agent context) — point to the
  [board](https://github.com/users/brandon-behring/projects/1) / the repo, never copy.
  Doc structure: [`docs/DOC-CONVENTIONS.md`](../docs/DOC-CONVENTIONS.md).
- Worker naming convention: **person-prefixed flat** (this Worker is
  `brandon-behring`; future sibling Workers under this account follow
  `brandon-behring-<site>`).

## Independent review (ambient)

- **Before committing substantive content/code changes, run the
  `independent-review` skill.** It fans out fresh-context `independent-reviewer`
  subagents that verify claims cold (no author reasoning), and surfaces only
  verdicts + proposed fixes — you decide what to apply. Reviewers **advise**;
  they never write.
- A `PreToolUse` hook (`.claude/hooks/pre-commit-review.sh`) backstops this: a
  `git commit` is blocked once if no fresh review marker (`.claude/.last-review`)
  exists. Running the skill writes the marker and clears the gate. You never
  invoke a reviewer by name — the skill + hook make it ambient.
- The skill records each run as `docs/sessions/<date>--<topic>-review.md`
  (process-as-artifact). See `~/.claude/plans/i-want-to-improve-functional-owl.md`
  for the full design.

## Known foot-guns

- **`gh secret set NAME`** — the secret value goes to stdin at the
  interactive prompt; the argument after `gh secret set` is the *name*,
  not the value. Pasting the value where the name belongs creates a
  secret whose name leaks the credential.
- **Cross-repo reusable-workflow callers need an explicit `permissions:`
  block.** The default `GITHUB_TOKEN` permissions can be too narrow to
  satisfy the reusable workflow's declared minimums, producing
  `startup_failure` with the unhelpful message "This run likely failed
  because of a workflow file issue." See the existing
  `.github/workflows/deploy.yml` for the required block.
- **Astro 6 strips HTML comments** at build time. Use hidden elements
  with `data-*` attributes if you need a marker that survives to the
  rendered HTML.
- **Cloudflare's Workers Builds wizard** in the dashboard is a different
  paradigm (CF-owned builds) from our Actions-owned-build setup. Don't
  click "Deploy" in that wizard — it would create a competing pipeline.
