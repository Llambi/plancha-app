import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// Smoke e2e sobre el sitio construido y servido bajo la subruta BASE (/plancha-app).
// baseURL = origin; navegamos con rutas absolutas a partir de BASE.

test('la home carga y muestra el listado', async ({ page }) => {
  await page.goto(`${BASE}/`);
  await expect(page).toHaveTitle(/PlanchaAPP/i);
  await expect(page.locator('body')).toBeVisible();
});

test('el toggle de tema persiste en localStorage', async ({ page }) => {
  await page.goto(`${BASE}/`);
  const toggle = page.locator('.site-theme-toggle').first();
  await expect(toggle).toBeVisible();
  await toggle.click();
  const theme = await page.evaluate(() => localStorage.getItem('site-theme'));
  expect(theme).toBeTruthy();
});

test('el toggle de tema avanza un paso exacto en /practica/mongodb (issue #49)', async ({
  page,
}) => {
  // With the 3-state cycle (light/dark/auto, issue #49), the *resolved*
  // data-theme doesn't necessarily change on every click (e.g. auto -> light
  // when the system is already light) — the regression this guards against
  // (issue #36, a duplicated listener) is better caught by asserting the
  // *preference* advances by exactly one step, not zero or two.
  await page.goto(`${BASE}/practica/mongodb`);
  const before = await page.evaluate(() =>
    document.documentElement.getAttribute('data-theme-pref'),
  );
  await page.locator('.site-theme-toggle').first().click();
  const after = await page.evaluate(() => document.documentElement.getAttribute('data-theme-pref'));
  const ORDER = ['light', 'dark', 'auto'];
  const expected = ORDER[(ORDER.indexOf(before ?? 'auto') + 1) % ORDER.length];
  expect(after).toBe(expected);
});
