import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for the per-question erase button on test questions (issue #59): a
// single click must not clear anything (requires confirmation, since it can
// discard a picked answer); a second click within the confirmation window
// does clear it, and the clear persists across reloads. The button is hidden
// once the question is graded (no "un-grading").

test('a single click does not clear the answer (requires confirmation)', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const question = page.locator('[data-tq]').first();
  await question.locator('.tq-opt').first().locator('input').check();
  await question.locator('[data-erase-trigger]').click();

  await expect(question.locator('.tq-opt').first().locator('input')).toBeChecked();
});

test('a second click within the confirmation window clears the answer, and it stays cleared after reload', async ({
  page,
}) => {
  await page.goto(`${BASE}/practica/si`);

  const question = page.locator('[data-tq]').first();
  const option = question.locator('.tq-opt').first().locator('input');
  await option.check();

  const eraseBtn = question.locator('[data-erase-trigger]');
  await eraseBtn.click();
  await eraseBtn.click();

  await expect(option).not.toBeChecked();

  await page.reload();
  await expect(
    page.locator('[data-tq]').first().locator('.tq-opt').first().locator('input'),
  ).not.toBeChecked();
});

test('the erase button is hidden once the question is graded', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const question = page.locator('[data-tq]').first();
  await expect(question.locator('[data-erase-trigger]')).toBeVisible();

  await page.locator('[data-grade-trigger]').click();

  await expect(question.locator('[data-erase-trigger]')).toBeHidden();
});
