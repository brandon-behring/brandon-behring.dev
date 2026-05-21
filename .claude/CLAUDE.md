# brandon-behring.dev

Personal portfolio site. Live at https://brandon-behring.dev.

## Stack
- Astro 6 (`astro` + `@astrojs/mdx`)
- Node ≥22.12 (see `package.json:engines`)
- TypeScript 5.7

## Layout
- `src/` — site source (pages, layouts, components, content)
- `public/` — static assets served at root
- `dist/` — build output (gitignored)
- `.astro/` — Astro cache (gitignored)
- `.github/workflows/` — GitHub Actions deploy pipeline

## Common commands
- `npm run dev` — local dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the built site locally

## Deploy
Pushing to `main` triggers `.github/workflows/` to build and deploy. No manual deploy step.

## Conventions
- Content is the primary work product — keep build/config minimal
- Prefer Astro components over MDX unless mixing prose + components
- No backend; everything is static at build time
