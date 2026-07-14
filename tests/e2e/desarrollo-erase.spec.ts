import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for the per-question erase button on desarrollo questions (issue #59):
// clears both the draft text and the self-assessment together, requiring the
// same confirmation as the test-question button.

test('a single click does not clear anything (requires confirmation)', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const question = page.locator('[data-dq]').first();
  await question.locator('.dq-text').fill('mi borrador');
  await question.locator('[data-dq-self="sabia"]').click();
  await question.locator('[data-erase-trigger]').click();

  await expect(question.locator('.dq-text')).toHaveValue('mi borrador');
  await expect(question.locator('[data-dq-self="sabia"]')).toHaveAttribute('aria-pressed', 'true');
});

test('a second click clears the draft and the self-assessment, and both stay cleared after reload', async ({
  page,
}) => {
  await page.goto(`${BASE}/practica/si`);

  const question = page.locator('[data-dq]').first();
  await question.locator('.dq-text').fill('mi borrador');
  await question.locator('[data-dq-self="sabia"]').click();

  const eraseBtn = question.locator('[data-erase-trigger]');
  await eraseBtn.click();
  await eraseBtn.click();

  await expect(question.locator('.dq-text')).toHaveValue('');
  await expect(question.locator('[data-dq-self="sabia"]')).toHaveAttribute('aria-pressed', 'false');

  await page.reload();
  const reloaded = page.locator('[data-dq]').first();
  await expect(reloaded.locator('.dq-text')).toHaveValue('');
  await expect(reloaded.locator('[data-dq-self="sabia"]')).toHaveAttribute('aria-pressed', 'false');
});
