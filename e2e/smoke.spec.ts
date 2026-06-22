import { test, expect } from '@playwright/test';
import { ALL_ROUTES } from './routes';

// Known-benign console-error / failed-response noise to ignore. Empty to start;
// add an entry (with a reason) only once a run proves a message is truly benign.
const CONSOLE_ALLOW: RegExp[] = [];
const RESPONSE_ALLOW: RegExp[] = [];

for (const route of ALL_ROUTES) {
  test(`smoke: ${route}`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedResponses: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error' && !CONSOLE_ALLOW.some((re) => re.test(msg.text()))) {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => consoleErrors.push(`pageerror: ${err.message}`));
    page.on('response', (res) => {
      if (res.status() >= 400 && !RESPONSE_ALLOW.some((re) => re.test(res.url()))) {
        failedResponses.push(`${res.status()} ${res.url()}`);
      }
    });

    const resp = await page.goto(route, { waitUntil: 'load' });
    expect(resp?.status(), `HTTP status for ${route}`).toBe(200);

    // Basic render: the site header + a top-level heading exist.
    await expect(page.locator('header.site-header')).toBeVisible();
    await expect(page.locator('h1').first()).toBeVisible();

    expect(consoleErrors, `console errors on ${route}`).toEqual([]);
    expect(failedResponses, `failed sub-resource responses on ${route}`).toEqual([]);
  });
}
