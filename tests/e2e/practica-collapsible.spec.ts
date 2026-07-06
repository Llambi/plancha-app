import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for issue #32: the stats / exam / self-assessment panels are collapsible
// (<details>) and collapsed by default, so question 1 sits higher on the page.
// `/practica/si` is the only page with the three panels (test stats, exam mode
// and desarrollo self-assessment).

const SI = `${BASE}/practica/si`;

test('the three panels are <details> collapsed by default', async ({ page }) => {
  await page.goto(SI);

  for (const sel of ['[data-stats]', '[data-exam-panel]', '[data-dev-stats]']) {
    const panel = page.locator(sel);
    await expect(panel).toHaveJSProperty('tagName', 'DETAILS');
    await expect(panel).not.toHaveAttribute('open', '');
  }

  // A control inside a collapsed panel is not visible.
  await expect(page.locator('[data-exam-start]')).not.toBeVisible();
  await expect(page.locator('[data-failed-toggle]')).not.toBeVisible();
});

test('clicking a panel summary expands it and reveals its controls', async ({ page }) => {
  await page.goto(SI);

  await page.locator('[data-exam-panel] > summary').click();
  await expect(page.locator('[data-exam-panel]')).toHaveJSProperty('open', true);
  await expect(page.locator('[data-exam-start]')).toBeVisible();
});

test('a panel summary is keyboard-operable', async ({ page }) => {
  await page.goto(SI);

  const summary = page.locator('[data-stats] > summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-stats]')).toHaveJSProperty('open', true);
  await expect(page.locator('[data-failed-toggle]')).toBeVisible();
});

test('question 1 sits higher with the panels collapsed than expanded', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(SI);

  const firstQ = page.locator('[data-tq]').first();
  const collapsedY = (await firstQ.boundingBox())!.y;

  // Expand every panel and re-measure.
  await page
    .locator('[data-stats], [data-exam-panel], [data-dev-stats]')
    .evaluateAll((els) => els.forEach((el) => ((el as HTMLDetailsElement).open = true)));
  const expandedY = (await firstQ.boundingBox())!.y;

  expect(collapsedY).toBeLessThan(expandedY);
});
