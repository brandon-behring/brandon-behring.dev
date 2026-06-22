# Design tokens & cross-property identity

How the Warm-Tol palette is sourced and shared across the property family, what's
*deliberately* shared vs. per-property, and where the accent is hand-synced. The
decision record for issue #33 (the bb.dev slice).

## Canonical source

The Warm-Tol palette originates in the LaTeX book **`claude-best-practices.sty`** (its
`\definecolor` block). That file is authoritative; the Astro properties re-encode it.
Mirrored here for reference — the **first five** are the `.sty`'s `\definecolor` base
(cross-check those if they drift); **WarmCrimson is scaffold-added** and has no `.sty` entry:

| Hue | Hex | Origin | Role (in the book) |
|---|---|---|---|
| WarmBlue | `#3B6FA0` | `.sty` | structural — headings, links, info |
| WarmRose | `#C06858` | `.sty` | attention — warnings, alerts |
| WarmGreen | `#4A7E3F` | `.sty` | positive — tips, practitioner |
| WarmPlum | `#8A4E82` | `.sty` | authority — official, exercises |
| WarmGold | `#C09840` | `.sty` | insight — convergence, reasoning |
| WarmCrimson | `#A03838` | scaffold | pitfall — deeper red, distinct from WarmRose (not in the `.sty`) |

## Who encodes it, and how

- **`claude-best-practices.sty`** — origin (LaTeX `\definecolor`).
- **`book-scaffold-astro`** (`package/styles/tokens.css`) — re-encodes the palette as a
  named `--warm-*` layer + tints + semantic roles. Published to npm and consumed by the
  books via semver pin, with **zero per-book token overrides** (inherit-only).
- **`brandon-behring.dev`** (this repo, `src/styles/tokens.css`) — **standalone; NOT a
  scaffold consumer.** It uses only `--color-accent #3b6fa0` (= WarmBlue) from the shared
  palette; its status palette and neutrals are its own. Because it doesn't consume the
  scaffold, it cannot *inherit* tokens — it re-encodes the one hue it shares.

## The identity decision (federated, thin-core)

Bind only the genuine shared core; keep per-property freedom for everything else. (Issue
#30's "MEDIUM": *thin shared identity + dense cross-linking + thick per-property
presentation freedom*.) This is the standard federated-design-system posture — centralize a
small core, allow local expression.

| Layer | Shared? | Notes |
|---|---|---|
| Brand hue (WarmBlue `#3B6FA0`) | **shared** | the one cross-property constant; the seed for the #30(b) wordmark/favicon/OG pass |
| Wordmark / favicon / OG template | **to be shared** | #30(b), after the scaffold-side deps land |
| Type family | per-property | site = Fraunces display + system sans; book spine = Roboto + Source Code Pro |
| Status palette (`--status-*`) | site-only | StatusBadge + CitationGraph; *not* the book's `--warm-*` callout hues |
| Callouts / Shiki / diagram / sidenote layout | scaffold-only | the book spine |
| Elevation (`--elevation-card`) | site-only | |
| `--radius-sm` | divergent (intentional) | **4px (site)** vs 2px (scaffold) — kept per per-property freedom |

## Accent hand-sync registry

`--color-accent` (`#3b6fa0` light / `#7fb0dd` dark) is duplicated in **three** places that
can't all read the CSS cascade. **When the accent changes, update all three:**

1. `src/styles/tokens.css` — `--color-accent` + its dark-scheme override.
2. `src/components/CitationGraph.astro` — `paletteFor()` returns hardcoded hex (the Cytoscape
   canvas can't read CSS custom properties).
3. `src/components/EigenSlider.astro` — component-local `--es-zoh` (the canvas reads it via
   `getComputedStyle`; an *unregistered* custom property won't reliably resolve a nested
   `var()`, so the hex is held locally and documented as synced).

De-duplicating these into one shared JS constant is possible but **deferred** — the copies have
genuine per-context rendering reasons (canvas vs. cascade), so it's arguably necessary
duplication rather than debt (#33).

## Single-source status & the deferred path

- **Today**: the `.sty` is the documented canonical source; this site keeps *controlled
  duplication* of the one hue it shares. This is deliberate, not debt — the shared surface is
  ~one value and the maintainer is solo, so a cross-repo token package would be premature
  coupling (Rule of Three / "the wrong abstraction"; the polyrepo coordination tax across
  site + scaffold + `.sty` would exceed the benefit).
- **Eventual** (deferred → tracked in #33): a shared `@brandon_m_behring/design-tokens`
  package (W3C DTCG JSON + Style Dictionary) emitting CSS for the site + scaffold and LaTeX
  for the book would be the textbook SSOT. It is gated on an npm publish + scaffold adoption,
  and the figure half waits on the scaffold-side `--fig-*` tokens (`book-scaffold-astro#164`).

## Pruned (2026-06-22, #33)

`--text-*` (type scale, 0 uses) and `--space-*` (spacing scale, one use with a literal
fallback) were unused scaffolding left from the A7 refactor — they read as a wired system but
weren't. Pruned to keep `tokens.css` honest; re-derive a scale here if one is ever wired in.
