import { test, expect } from '@playwright/test';

// The gotcha-proving core: the interactive demos render to a canvas that is
// BLANK in headless Chromium, so we assert the underlying model/draw state via
// the #36 test seams (window.__cyGraph / window.__esReady), not a screenshot.

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

test('eigenslider: canvas draws + status reflects the default Δ', async ({ page }) => {
  await page.goto('/lab/why-discretization-matters/', { waitUntil: 'load' });
  await page.waitForFunction(() => (window as any).__esReady === true);

  await expect(page.locator('#es-canvas')).toBeVisible();
  await expect(page.locator('#es-delta')).toHaveValue('0.4');
  await expect(page.locator('#es-status')).toContainText('Δ = 0.40');

  const nonBlank = await page.evaluate(() => {
    const c = document.querySelector('#es-canvas') as HTMLCanvasElement | null;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return false;
    const { data } = ctx.getImageData(0, 0, c.width, c.height);
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] !== 0) return true; // any non-transparent pixel ⇒ something drew
    }
    return false;
  });
  expect(nonBlank, 'eigenslider canvas drew non-transparent pixels').toBe(true);
});
