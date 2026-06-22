import { test, expect, type Page } from '@playwright/test';

// WCAG 2.x relative-luminance contrast ratio. Inputs are CSS color strings
// ('rgb(r, g, b)' / 'rgba(...)') from getComputedStyle. This is the contrast
// MEASUREMENT primitive the lever harness will reuse (#36) — it returns the
// ratio, not a pass/fail, so runs are diff-able over time.
function srgbToLin(c: number): number {
  const x = c / 255;
  return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
function luminance([r, g, b]: number[]): number {
  return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
}
function parseRGB(s: string): number[] {
  const m = s.match(/(\d+(?:\.\d+)?)/g);
  if (!m || m.length < 3) throw new Error(`unparseable color: ${s}`);
  return [Number(m[0]), Number(m[1]), Number(m[2])];
}
function contrastRatio(fg: string, bg: string): number {
  const l1 = luminance(parseRGB(fg));
  const l2 = luminance(parseRGB(bg));
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

// An element's text color + its effective background (first opaque ancestor).
async function colorPair(page: Page, selector: string): Promise<{ fg: string; bg: string }> {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) throw new Error(`not found: ${sel}`);
    const fg = getComputedStyle(el).color;
    let node: Element | null = el;
    let bg = 'rgba(0, 0, 0, 0)';
    while (node) {
      const c = getComputedStyle(node).backgroundColor;
      if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') {
        bg = c;
        break;
      }
      node = node.parentElement;
    }
    return { fg, bg };
  }, selector);
}

// Representative pairs that always render on the homepage (text / muted / accent).
// Each runs under both the light and dark projects (colorScheme), so the ratio is
// re-measured per scheme. 4.5:1 = WCAG AA for normal text (conservative for the
// large subtitle).
const PAIRS = [
  { name: 'subtitle (text on bg)', selector: '.subtitle' },
  { name: 'muted cred-band', selector: '.cred-band' },
  { name: 'accent prose link', selector: '.research-link a' },
];

for (const p of PAIRS) {
  test(`contrast AA: ${p.name}`, async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    const { fg, bg } = await colorPair(page, p.selector);
    const ratio = contrastRatio(fg, bg);
    expect(ratio, `${p.name}: ${fg} on ${bg} = ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5);
  });
}
