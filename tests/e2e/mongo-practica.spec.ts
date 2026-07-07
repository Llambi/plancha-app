import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for the MongoDB validator's query quiz keyboard accessibility (issue
// #41): the options were plain <div onclick>, with no keyboard support. This
// covers the "Test de consultas" block specifically (not the JSON validator
// blocks above it, issue #44).

test.describe('MongoDB validator: query quiz', () => {
  test('each option is a radio input grouped by question', async ({ page }) => {
    await page.goto(`${BASE}/practica/mongodb`);

    const firstQuestionOpts = page.locator('#opts-0-0 input[type="radio"]');
    await expect(firstQuestionOpts).toHaveCount(4);
    const names = await firstQuestionOpts.evaluateAll((els) =>
      (els as HTMLInputElement[]).map((el) => el.name),
    );
    expect(new Set(names).size).toBe(1); // all four options share one group name
  });

  test('an option can be selected with keyboard only (Tab + Space)', async ({ page }) => {
    await page.goto(`${BASE}/practica/mongodb`);

    const target = page.locator('#opt-0-0-2 input[type="radio"]');
    await target.focus();
    await page.keyboard.press('Space');

    await expect(target).toBeChecked();
  });

  test('after grading, the options of a graded question become disabled', async ({ page }) => {
    await page.goto(`${BASE}/practica/mongodb`);

    const option = page.locator('#opt-0-0-2 input[type="radio"]');
    await option.focus();
    await page.keyboard.press('Space');

    await page.getByRole('button', { name: 'Corregir test' }).click();

    await expect(page.locator('#opts-0-0 input[type="radio"]').first()).toBeDisabled();
    await expect(option).toBeChecked();
  });
});
