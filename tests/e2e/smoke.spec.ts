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
