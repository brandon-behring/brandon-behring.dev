# brandon-behring.dev

Personal portfolio site for Brandon Behring. Applied Mathematician who builds and learns.

**Live**: https://brandon-behring.dev/

## Stack

- Astro 6 (static output)
- No JavaScript frameworks — vanilla Astro + CSS
- Deployed to Cloudflare Workers (Static Assets)

## Develop

```bash
npm install
npm run dev      # localhost:4321
npm run build    # → dist/
npm run preview  # serves dist/
```

## Content updates

Projects live in `src/data/projects.json`, grouped by `cluster` (visibility logic in `src/data/portfolio.ts`). Set `draft: true` to hide an entry until it's ready; the homepage shows the `now`-section clusters. See [`docs/DOC-CONVENTIONS.md`](docs/DOC-CONVENTIONS.md).

The hero / bio / contact sections are in `src/pages/index.astro`. Update those directly when bio language changes.

## Deploy

GitHub Actions workflow auto-deploys to Cloudflare Workers (Static Assets) on push to `main`. Requires repo secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Subdomain convention

This repo owns the root `brandon-behring.dev` (this portfolio site). Every other deployed project lives at its own subdomain under the same root.

```
brandon-behring.dev                       → this portfolio (root / apex)
<project-slug>.brandon-behring.dev        → each deployed project
```

This section is the **canonical source of truth** for the convention; other repos cross-reference it. Last revised 2026-05-25.

### Slug-naming rule

1. **Default (mechanical)**: the slug is the repo name normalized to kebab-case. Underscores become hyphens; otherwise no transformation.
   - `ssm-foundations` → `ssm-foundations.brandon-behring.dev`
   - `book-template-astro` → `book-template-astro.brandon-behring.dev`
   - `post_transformers` → would be `post-transformers.brandon-behring.dev` (if ever deployed as such)
2. **Exception (semantic suffix)**: when a repo holds multiple deployable artifacts and the mechanical slug would be ambiguous, append a hyphenated artifact-type suffix.
   - `post_transformers` repo holds both research code and a book → the book deploys to `post-transformers-guide.brandon-behring.dev`. The research site, if separately deployed, would be `post-transformers.brandon-behring.dev`.
   - Suffix vocabulary: `-guide`, `-docs`, `-book`, `-demo` as needed.

### Cloudflare wiring (per subdomain)

For each new project that already has a Cloudflare Workers / Pages deploy:

1. Dashboard → **Workers & Pages** → select the project → **Settings** → **Domains**.
2. Click **Add** → **Custom Domain**.
3. Enter `<slug>.brandon-behring.dev` — **not** the bare apex `brandon-behring.dev`. The apex is owned by this portfolio.
4. Cloudflare auto-creates the DNS record (the zone is already owned by this account) and provisions TLS (~1 minute).

**Conflict gotcha**: if the dashboard returns `"Hostname 'brandon-behring.dev' already in use by other custom domain"`, you tried to attach the bare apex. Use a subdomain instead — see the slug rule above.

### Registry

Live subdomain assignments + deploy status are tracked on the
[Work Tracker board #1](https://github.com/users/brandon-behring/projects/1) and in each
project's own repo — **not snapshotted here** (it rots; see
[`docs/DOC-CONVENTIONS.md`](docs/DOC-CONVENTIONS.md)). The slug-naming *rule* above is the
durable, architectural part; per-project deploy status is not.

### Subdomain vs subpath

Default to **subdomain** per project. Subpaths under `brandon-behring.dev/` are reserved for the portfolio's own pages; sharing the root with project artifacts would require Worker routing logic and is avoided.
