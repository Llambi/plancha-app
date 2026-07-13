import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for the cross-subject failed-questions review page (issue #51). Uses
// /practica/si: q1 is single with correct index 0, so checking index 1 fails it,
// the same pattern as practica-stats.spec.ts.

test('with no saved stats, the review page shows the empty state', async ({ page }) => {
  await page.goto(`${BASE}/repaso`);

  await expect(page.locator('[data-repaso-empty]')).toBeVisible();
  await expect(page.locator('[data-repaso-groups]')).toBeEmpty();
});

test('a question failed on its last attempt is listed under its subject with a deep-link', async ({
  page,
}) => {
  await page.goto(`${BASE}/practica/si`);
  await page.locator('[data-tq]').first().locator('input').nth(1).check();
  await page.locator('[data-grade-trigger]').click();

  await page.goto(`${BASE}/repaso`);

  await expect(page.locator('[data-repaso-empty]')).toBeHidden();
  const group = page.locator('[data-repaso-group]', { hasText: 'Sistemas Inteligentes' });
  await expect(group).toBeVisible();
  const link = group.locator('a', { hasText: '¿Cuándo se dice que un agente es racional?' });
  await expect(link).toHaveAttribute('href', `${BASE}/practica/si#q-q1`);
});

test('the home links to the review page', async ({ page }) => {
  await page.goto(`${BASE}/`);

  await expect(page.locator(`a[href="${BASE}/repaso"]`)).toBeVisible();
});
