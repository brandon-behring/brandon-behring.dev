# Email signature

Professional Gmail signature for Brandon Behring. Text-only (no images), all CSS
inline, accent `#4477AA` (the site design token in `src/layouts/Base.astro`).
Not part of the site build — lives in `docs/`, never published.

## Files

| File | Purpose |
|---|---|
| `signature.html` | Full signature for **new mail** (Variant C: accent name + hairline). |
| `signature-reply.html` | Minimal signature for **replies/forwards**. |
| `signature.txt` | Plain-text fallback (plain-text compose / clients that strip HTML). |
| `style-variants.html` | Scratch: the 3 styles rendered light + dark (selection aid). |
| `signature-variants.png` | Screenshot of the above. |

Rendered preview of the chosen style: `signature-variants.png` (bottom-left = Variant C).

## What it looks like

```
Brandon Behring, Ph.D.
Applied mathematician · AI systems & evaluation
brandon-behring.dev · LinkedIn · GitHub · Hugging Face · Credly
```
Reply: `Brandon Behring, Ph.D. · brandon-behring.dev · LinkedIn`

## Install in Gmail

Gmail's signature box takes **rendered rich text**, not raw HTML source.

1. Open `signature.html` in a browser.
2. Select-All (`Cmd/Ctrl-A`) → Copy (`Cmd/Ctrl-C`).
3. Gmail → ⚙ → **See all settings** → **General** → **Signature** →
   **+ Create new** → name it (e.g. "full") → paste into the box.
4. Repeat steps 1–3 with `signature-reply.html` as a second signature (e.g. "reply").
5. **Signature defaults:** *For new emails* → "full"; *On reply/forward* → "reply".
6. **Save changes** (bottom of the page).
7. Send yourself a test email **and** a test reply; confirm every link works.

## Notes

- **Links** (verified):
  - `brandon-behring.dev` → <https://brandon-behring.dev/>
  - LinkedIn → <https://www.linkedin.com/in/brandon-behring/>
  - GitHub → <https://github.com/brandon-behring> (portfolio account, not `-dev`)
  - Hugging Face → <https://huggingface.co/BBehring>
  - Credly → <https://www.credly.com/users/brandon-behring> (public, 16 badges; verified 2026-06-04)
- **Hugging Face handle wart:** the link is `BBehring`, inconsistent with your
  `brandon-behring` handle everywhere else. Optional cleanup: rename the HF
  username, then update the href here.
- **Dark mode:** the accent-blue name (Variant C) stays legible on both light and
  dark backgrounds. Variants A/B (dark name) can vanish in worst-case dark clients —
  that's why C was chosen. See `signature-variants.png`.
- **PhD divergence from the site is intentional:** the website omits "Ph.D." by
  strategy; a signature is a credential channel where it belongs.

## Optional upgrades

- **`temporalcv` (PyPI):** to add a "ships software" signal, append a link —
  `<a href="https://pypi.org/project/temporalcv/" style="color:#4477AA;text-decoration:none;">PyPI</a>`
  (its repo lives under the `brandonmbehring-dev` account, so this surfaces the
  account split — opt-in).
- **Credly badge image:** to show the visual badge instead of a text link, swap
  the Credly `<a>` for the embeddable badge `<img>` (accepts image-blocking /
  attachment tradeoffs; needs the specific badge embed URL).

## Updating

Edit the relevant `*.html`, re-render to check
(`python3 -m http.server` in this dir, open in a browser), then re-copy/re-paste
into Gmail. The `style-variants.html` file regenerates the comparison.
