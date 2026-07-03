import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for the topbar not growing when `docTitle` is present (issue #31).
// `/practica/mongodb` has the longest docTitle on the site ("MongoDB · Práctica").

test("a topbar height doesn't grow on mobile because of a long docTitle", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });

  await page.goto(`${BASE}/`);
  const baselineHeight = await page.locator('.site-topbar').evaluate((el) => el.clientHeight);

  await page.goto(`${BASE}/practica/mongodb`);
  const docTitleHeight = await page.locator('.site-topbar').evaluate((el) => el.clientHeight);

  expect(docTitleHeight).toBe(baselineHeight);
});

test('on mobile, search, "Inicio" and the theme toggle keep their size and stay visible', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/practica/mongodb`);

  await expect(page.locator('.sb-toggle')).toBeVisible();
  await expect(page.locator('.site-home')).toBeVisible();

  const toggle = page.locator('.site-theme-toggle');
  await expect(toggle).toBeVisible();
  await expect(toggle).toBeEnabled();
  // Regression guard: before the fix, the long docTitle squeezed this
  // button well below its CSS `width: 40px` (down to ~17px).
  const box = await toggle.boundingBox();
  expect(box?.width).toBeGreaterThan(35);
});

test('desktop topbar height is unaffected', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });

  await page.goto(`${BASE}/`);
  const baselineHeight = await page.locator('.site-topbar').evaluate((el) => el.clientHeight);

  await page.goto(`${BASE}/practica/mongodb`);
  const docTitleHeight = await page.locator('.site-topbar').evaluate((el) => el.clientHeight);

  expect(docTitleHeight).toBe(baselineHeight);
});
