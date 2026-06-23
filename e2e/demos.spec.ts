import { test, expect } from '@playwright/test';

// The gotcha-proving core: the Cytoscape research-graph renders to a canvas that
// is BLANK in headless Chromium (rAF throttle), so we assert its model via the
// #36 seam (window.__cyGraph), not a screenshot. The 2D slider canvases DO
// rasterize headless, so we gate on the __esReady / __srReady draw seams + the
// live status text, then read their pixels directly (a hue probe proving BOTH
// series drew, not merely that something is non-transparent).

test('citation graph: model builds (blank headless canvas, intact model)', async ({ page }) => {
  await page.goto('/lab/research-graph/', { waitUntil: 'load' });
  await expect(page.locator('#cy')).toBeVisible();
  await expect(page.locator('#paper-search')).toBeVisible();

  const embedded = await page.evaluate(() => {
    const el = document.getElementById('citation-graph-data');
    const data = JSON.parse(el?.textContent || '{}');
    return (data.nodes || []).length as number;
  });
  expect(embedded, 'embedded graph nodes').toBeGreaterThan(0);

  // Read the live cy model via the test seam (synchronous evaluate).
  await expect
    .poll(() => page.evaluate(() => (window as any).__cyGraph?.nodes().length ?? 0))
    .toBeGreaterThan(0);
  const counts = await page.evaluate(() => {
    const cy = (window as any).__cyGraph;
    return { nodes: cy.nodes().length as number, edges: cy.edges().length as number };
  });
  expect(counts.edges, 'rendered edges').toBeGreaterThan(0);
  expect(counts.nodes, 'rendered nodes == embedded nodes').toBe(embedded);
});

test('eigenslider: canvas draws both series + status reflects the default Δ', async ({ page }) => {
  await page.goto('/lab/why-discretization-matters/', { waitUntil: 'load' });
  await page.waitForFunction(() => (window as any).__esReady === true);

  // Structural selectors (one instance per page) so the per-instance ids stay free.
  await expect(page.locator('.eigen-slider canvas')).toBeVisible();
  await expect(page.locator('.eigen-slider input[type="range"]')).toHaveValue('0.4');
  await expect(page.locator('.eigen-slider output')).toContainText('Δ = 0.40');

  // Hue probe: BOTH series drew — ZOH blue (#3b6fa0) and forward-Euler red (#bb5566).
  const hue = await page.evaluate(() => {
    const c = document.querySelector('.eigen-slider canvas') as HTMLCanvasElement | null;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return { red: 0, blue: 0 };
    const { data } = ctx.getImageData(0, 0, c.width, c.height);
    let red = 0;
    let blue = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (data[i + 3] === 0) continue;
      if (r - Math.max(g, b) >= 20) red++;
      if (b - Math.max(r, g) >= 20) blue++;
    }
    return { red, blue };
  });
  expect(hue.red, 'forward-Euler red pixels drew').toBeGreaterThan(0);
  expect(hue.blue, 'ZOH blue pixels drew').toBeGreaterThan(0);

  // a11y decouple (same mechanism as the stability-region check): the input-only
  // path never calls announce(), so the polite region is empty mid-drag, then
  // announces the settled verdict on change.
  const esSlider = page.locator('.eigen-slider input[type="range"]');
  await esSlider.evaluate((el) => {
    const input = el as HTMLInputElement;
    input.value = '1.2';
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await expect(page.locator('.eigen-slider output')).toContainText('Δ = 1.20');
  await expect(page.locator('.eigen-slider .sr-only')).toBeEmpty();
  await esSlider.evaluate((el) => {
    (el as HTMLInputElement).dispatchEvent(new Event('change', { bubbles: true }));
  });
  await expect(page.locator('.eigen-slider .sr-only')).toContainText('Δ = 1.20');
});

test('stability region: canvas draws both series + verdict reflects the explicit/implicit dichotomy', async ({ page }) => {
  await page.goto('/lab/why-discretization-matters/', { waitUntil: 'load' });
  await page.waitForFunction(() => (window as any).__srReady === true);

  // Structural selectors (one instance per page) so the per-instance ids stay free.
  await expect(page.locator('.stability-region canvas')).toBeVisible();
  await expect(page.locator('.stability-region input[type="range"]')).toHaveValue('0.5');
  await expect(page.locator('.stability-region output')).toContainText('‖k‖² = 0.50');
  await expect(page.locator('.stability-region output')).toContainText('DeltaNet ρ = 0.50');

  // Hue probe: BOTH series drew — Longhorn blue (#3b6fa0) and DeltaNet red (#bb5566).
  const hue = await page.evaluate(() => {
    const c = document.querySelector('.stability-region canvas') as HTMLCanvasElement | null;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return { red: 0, blue: 0 };
    const { data } = ctx.getImageData(0, 0, c.width, c.height);
    let red = 0;
    let blue = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (data[i + 3] === 0) continue;
      if (r - Math.max(g, b) >= 20) red++;
      if (b - Math.max(r, g) >= 20) blue++;
    }
    return { red, blue };
  });
  expect(hue.red, 'DeltaNet red pixels drew').toBeGreaterThan(0);
  expect(hue.blue, 'Longhorn blue pixels drew').toBeGreaterThan(0);

  // Behavioural seam: cross the boundary ||k||^2 = 2 with an INPUT event ONLY. The
  // explicit operator goes unstable while the implicit one never does — and the
  // visible <output> reflects it live (input cadence). The input-only path never
  // calls announce(), so the polite announcer stays empty until the drag settles;
  // this split dispatch is what exercises the a11y decouple (#55).
  const slider = page.locator('.stability-region input[type="range"]');
  await slider.evaluate((el) => {
    const input = el as HTMLInputElement;
    input.value = '2.5';
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await expect(page.locator('.stability-region output')).toContainText('DeltaNet ρ = 1.50 — UNSTABLE');
  await expect(page.locator('.stability-region output')).toContainText('Longhorn ρ = 0.29 (stable)');
  await expect(page.locator('.stability-region .sr-only')).toBeEmpty(); // not announced mid-drag

  // Settle the drag (change): now the polite region announces the verdict, once.
  await slider.evaluate((el) => {
    (el as HTMLInputElement).dispatchEvent(new Event('change', { bubbles: true }));
  });
  await expect(page.locator('.stability-region .sr-only')).toContainText('DeltaNet ρ = 1.50 — UNSTABLE');
});

test('canvas demos refresh their cached palette on a color-scheme flip', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto('/lab/why-discretization-matters/', { waitUntil: 'load' });
  await page.waitForFunction(
    () => (window as any).__esReady === true && (window as any).__srReady === true
  );

  // Drive a real scheme change and prove the cached palette REFRESHED. NB:
  // page.emulateMedia() flips matchMedia().matches + getComputedStyle but does NOT
  // dispatch the MQL 'change' event, so we dispatch it ourselves — that is exactly
  // what a real OS theme flip fires and what onScheme listens for. We then read each
  // demo's cached palette via the #55 seam (a hue probe alone can't tell "recolored"
  // from "stale"); if onScheme weren't registered, the dispatch would be a no-op and
  // the seam would stay light — so this still verifies the production wiring.
  const setScheme = async (scheme: 'light' | 'dark') => {
    await page.emulateMedia({ colorScheme: scheme });
    // emulateMedia lands the style recompute a task later — force it to settle via
    // a getComputedStyle read (a synchronous style flush) BEFORE firing 'change',
    // so the handler's own readPalette() sees the new scheme, not the old one.
    await page.evaluate(() =>
      getComputedStyle(document.querySelector('.eigen-slider') as Element).getPropertyValue(
        '--es-zoh'
      )
    );
    await page.evaluate(() =>
      window.matchMedia('(prefers-color-scheme: dark)').dispatchEvent(new Event('change'))
    );
    return page.evaluate(() => ({
      es: (window as any).__esPalette?.().zoh as string | undefined,
      sr: (window as any).__srPalette?.().longhorn as string | undefined,
    }));
  };

  const light = await setScheme('light');
  const dark = await setScheme('dark');

  expect(light.es, 'EigenSlider palette seam present').toBeTruthy();
  expect(light.sr, 'StabilityRegion palette seam present').toBeTruthy();
  expect(dark.es, 'EigenSlider palette refreshed light->dark').not.toBe(light.es);
  expect(dark.sr, 'StabilityRegion palette refreshed light->dark').not.toBe(light.sr);

  // ...and the redraw on flip is feature-detected + registered AFTER first paint,
  // so it can't throw and blank the canvas: both series still render, no pageerror.
  for (const sel of ['.eigen-slider canvas', '.stability-region canvas']) {
    const hue = await page.evaluate((s) => {
      const c = document.querySelector(s) as HTMLCanvasElement | null;
      const ctx = c?.getContext('2d');
      if (!c || !ctx) return { red: 0, blue: 0 };
      const { data } = ctx.getImageData(0, 0, c.width, c.height);
      let red = 0;
      let blue = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (data[i + 3] === 0) continue;
        if (r - Math.max(g, b) >= 20) red++;
        if (b - Math.max(r, g) >= 20) blue++;
      }
      return { red, blue };
    }, sel);
    expect(hue.red, `${sel}: red series still drawn after flip`).toBeGreaterThan(0);
    expect(hue.blue, `${sel}: blue series still drawn after flip`).toBeGreaterThan(0);
  }
  expect(errors, 'no page errors during the scheme flip').toEqual([]);
});
