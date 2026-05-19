# brandon-behring.dev

Personal portfolio site for Brandon Behring. Applied Mathematician who builds and learns.

**Live**: https://brandon-behring.dev/

## Stack

- Astro 6 (static output)
- No JavaScript frameworks — vanilla Astro + CSS
- Deployed to Cloudflare Pages

## Develop

```bash
npm install
npm run dev      # localhost:4321
npm run build    # → dist/
npm run preview  # serves dist/
```

## Content updates

Featured projects live in `src/data/projects.json`. Set `featured: true` and an `order` integer to surface on the homepage; other projects can live in the file for future "all projects" page expansion.

The hero / bio / contact sections are in `src/pages/index.astro`. Update those directly when bio language changes.

## Deploy

GitHub Actions workflow auto-deploys to Cloudflare Pages on push to `main`. Requires repo secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Subdomains (future)

This repo only owns the root `brandon-behring.dev`. Other properties live at subdomains in separate repos:

- `study-notes.brandon-behring.dev` → `brandon-behring/dlai-study-notes`
- (future) `<book-slug>-notes.brandon-behring.dev` → separate book repos
