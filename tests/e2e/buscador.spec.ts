import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// e2e del buscador global. Viewport por defecto de Playwright (1280px) => la barra
// de búsqueda de la topbar está visible (no el modo móvil colapsado).

async function buscar(page: import('@playwright/test').Page, q: string) {
  await page.goto(`${BASE}/`);
  const input = page.locator('.sb-input');
  await input.click();
  await input.fill(q);
  await expect(page.locator('.sb-opt').first()).toBeVisible();
  return input;
}

test('la topbar muestra resultados dinámicos y la leyenda de teclado', async ({ page }) => {
  await buscar(page, 'socket');
  expect(await page.locator('.sb-opt').count()).toBeGreaterThan(0);
  await expect(page.locator('.sb-legend')).toBeVisible();
  // Cada resultado muestra asignatura + tipo.
  await expect(page.locator('.sb-opt').first().locator('.sb-opt-meta')).toBeVisible();
});

test('flechas + Enter navegan al deep-link del resultado', async ({ page }) => {
  await buscar(page, 'socket');
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('.sb-opt[aria-selected="true"]')).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#/); // navegó a un ancla (deep-link)
});

test('Enter sin selección lleva a /buscar con resultados agrupados', async ({ page }) => {
  await buscar(page, 'protocolo');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/buscar\?q=protocolo/);
  await expect(page.locator('.bp-group').first()).toBeVisible();
  await expect(page.locator('.bp-item').first()).toBeVisible();
});

test('click en un resultado navega a esa opción', async ({ page }) => {
  await buscar(page, 'socket');
  await page.locator('.sb-opt').first().click();
  await expect(page).toHaveURL(/\/(guia|practica|esquemas)\//);
});
