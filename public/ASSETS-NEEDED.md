# Assets needed

The site currently runs without these assets — placeholders render where
images would be. Provide these to complete the visual design.

## 1. Open Graph image (social previews)

- **Path**: `/public/og-image.png`
- **Size**: 1200 × 630 px (PNG, < 1MB)
- **Content**: Brandon Behring + "Building applied causal methods, AI evaluation tooling, and a study notes corpus."
- **Where it's used**: `<meta property="og:image">` and `<meta name="twitter:image">` in `src/layouts/Base.astro`.
- **Tools**: Figma / Canva / [og-image generators](https://www.opengraph.xyz/); or `vercel/satori` at build time.

## 2. Per-project screenshots

- **Path**: `/public/screenshots/<slug>.png` (or `.webp`)
- **Size**: 1600 × 900 px (16:9), < 200KB each (use WebP or compressed PNG)
- **Used by**: `<ProjectSection>` on `/work/{cluster}` pages
- **Set in**: `src/data/projects.json`, `visual` field per project — currently `null`. Replace with `/screenshots/<slug>.png` once captured.

### Capture sources

| Project slug | Capture from |
|---|---|
| `dlai-study-notes` | <https://study-notes.brandon-behring.dev> (homepage or one notes page) |
| `post-transformers` | <https://post-transformers-guide.brandon-m-behring.workers.dev> |
| `prompt-injection-detector` | repo README figure or eval results plot |
| `eval-toolkit` | repo README or test output |
| `prompt-injection-portfolio` | repo README or field-log page |
| `causal-inference-mastery` | notebook output, validation chart, or repo README |
| `double-ml-time-series` | manuscript figure or notebook result |
| `temporal-validation` | diagram of walk-forward splits with purging |
| `rl-and-control` | placeholder until repo is public |

## 3. Mini-icons / logos per artifact (optional, per the plan)

- **Path**: `/public/icons/<name>.svg`
- **Recommended source**: [Simple Icons](https://simpleicons.org/) for tech logos (Julia, Python, TypeScript, JAX, PyTorch, Astro), or custom SVGs for per-repo identity.
- **Where they'd plug in**: `<ClusterCard>` artifact bullets — currently uses a small "▪" bullet; can be swapped for an icon component.

## 4. Cloudflare Web Analytics token

- **Where**: `src/layouts/Base.astro` — `data-cf-beacon='{"token": "TOKEN_PLACEHOLDER"}'`.
- **How to get it**: Cloudflare dashboard → Analytics & Logs → Web Analytics → Add a site → copy the token from the beacon snippet.
- **Replace**: `TOKEN_PLACEHOLDER` with the real token.

## Notes

- All references to missing assets are guarded — the site renders cleanly without them (placeholders show where images would be).
- The `og-image.png` is the most visible gap if you ever share the URL on social.
