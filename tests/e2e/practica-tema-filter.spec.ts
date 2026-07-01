import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for the topic filter (issue #11): `/practica/si` has 10 temas (T1..T10)
// on all 88 test questions; `cl` has no test bank at all.

test('el filtro por tema aparece con «Todos» + un botón por cada tema', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const group = page.locator('[data-tema-filters]');
  await expect(group).toBeVisible();
  await expect(group.locator('[data-tema-filter="all"]')).toBeVisible();
  // 10 temas distintos (T1..T10) + el botón «Todos».
  await expect(group.locator('[data-tema-filter]')).toHaveCount(11);
});

test('no aparece el filtro por tema si la asignatura no tiene test', async ({ page }) => {
  await page.goto(`${BASE}/practica/cl`);
  await expect(page.locator('[data-tema-filters]')).toHaveCount(0);
});

test('elegir un tema deja visibles solo esas preguntas y el minimap las excluye', async ({
  page,
}) => {
  await page.goto(`${BASE}/practica/si`);
  const totalDevs = await page.locator('[data-dq]').count();

  await page.locator('[data-tema-filter="T1"]').click();

  // T1 tiene 8 preguntas en el banco de SI.
  await expect(page.locator('[data-tq]:not([hidden])')).toHaveCount(8);
  await expect(page.locator('.mm-tick')).toHaveCount(8 + totalDevs);
  await expect(page.locator('[data-tema-filter="T1"]')).toHaveAttribute('aria-pressed', 'true');

  // Volver a «Todos» restaura el banco completo.
  await page.locator('[data-tema-filter="all"]').click();
  await expect(page.locator('[data-tq]:not([hidden])')).toHaveCount(88);
});

test('corregir con un tema activo puntúa solo sobre las preguntas visibles', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  await page.locator('[data-tema-filter="T1"]').click();
  await page.locator('[data-grade-trigger]').click();

  await expect(page.locator('.score')).toHaveText('Aciertos: 0 / 8');
});
