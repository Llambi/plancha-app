import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for the per-subject "last studied" indicator on the home (issue #57).

test('a subject with no interaction shows no last-studied indicator', async ({ page }) => {
  await page.goto(`${BASE}/`);

  const card = page.locator('a.doc-card[href$="/practica/si"]');
  await expect(card.locator('.doc-studied')).toBeHidden();
});

test('grading a test question stamps and shows the indicator', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);
  await page.locator('[data-tq]').first().locator('input').first().check();
  await page.locator('[data-grade-trigger]').click();

  await page.goto(`${BASE}/`);

  const card = page.locator('a.doc-card[href$="/practica/si"]');
  await expect(card.locator('.doc-studied')).toBeVisible();
  await expect(card.locator('.doc-studied')).toHaveText('Estudiado hace un momento');
});

test('self-assessing a desarrollo question stamps and shows the indicator', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);
  await page.locator('[data-dq]').first().locator('[data-dq-self="sabia"]').click();

  await page.goto(`${BASE}/`);

  const card = page.locator('a.doc-card[href$="/practica/si"]');
  await expect(card.locator('.doc-studied')).toBeVisible();
  await expect(card.locator('.doc-studied')).toHaveText('Estudiado hace un momento');
});
