import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for practice progress persistence (issue #8), against the built site served
// under the BASE subpath (/plancha-app). Uses /practica/si; q1 is single with
// correct index 0.

test('marked options survive a reload (autosave)', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const firstOption = page.locator('[data-tq]').first().locator('input').first();
  await firstOption.check();

  await page.reload();

  await expect(page.locator('[data-tq]').first().locator('input').first()).toBeChecked();
});

test('graded state and score survive a reload', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  // Answer the first question correctly (q1 → index 0) and grade.
  const question = page.locator('[data-tq]').first();
  await question.locator('input').first().check();
  await page.locator('[data-grade-trigger]').click();

  await expect(question.locator('.tq-opt').first()).toHaveClass(/correct/);
  await expect(page.locator('.score')).toContainText('Aciertos:');

  await page.reload();

  // Corrected highlight and score restored without re-grading.
  await expect(page.locator('[data-tq]').first().locator('.tq-opt').first()).toHaveClass(/correct/);
  await expect(page.locator('.score')).toContainText('Aciertos:');
});

test('resetting clears progress', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  await page.locator('[data-tq]').first().locator('input').first().check();
  await page.locator('[data-grade-trigger]').click();
  await expect(page.locator('.score')).toContainText('Aciertos:');

  await page.locator('[data-reset-trigger]').click();
  await page.reload();

  // Nothing marked, no score after reset.
  await expect(page.locator('[data-tq]').first().locator('input').first()).not.toBeChecked();
  await expect(page.locator('.score')).toHaveText('');
});
