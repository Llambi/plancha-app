import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for the per-subject accumulated-progress badge on the home (issue #50).
// Uses /practica/si to seed `plancha:stats:si` the same way practica-stats.spec.ts
// does: q1 is single with correct index 0, so checking index 0 grades it right.

test('a subject with no saved stats shows no progress badge on its home card', async ({ page }) => {
  await page.goto(`${BASE}/`);

  const card = page.locator('a.doc-card[href$="/practica/si"]');
  await expect(card.locator('.doc-progress')).toBeHidden();
});

test('a subject with saved stats shows the accumulated accuracy on its home card', async ({
  page,
}) => {
  await page.goto(`${BASE}/practica/si`);
  await page.locator('[data-tq]').first().locator('input').first().check();
  await page.locator('[data-grade-trigger]').click();

  await page.goto(`${BASE}/`);

  const card = page.locator('a.doc-card[href$="/practica/si"]');
  await expect(card.locator('.doc-progress')).toBeVisible();
  await expect(card.locator('.doc-progress')).toHaveText('Acumulado: 100%');
});

test('the MongoDB practice card never shows a progress badge', async ({ page }) => {
  await page.goto(`${BASE}/`);

  const card = page.locator('a.doc-card[href$="/practica/mongodb"]');
  await expect(card.locator('.doc-progress')).toBeHidden();
});
