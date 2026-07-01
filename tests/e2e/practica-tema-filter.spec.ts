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
