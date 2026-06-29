import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for the per-question reveal button on the test practice (issue #5), against
// the built site served under the BASE subpath (/plancha-app). The first `si`
// question (q1) is single, with `correct:[0]` and an `explicacion`.

test('revelar muestra la opción correcta + explicación y se oculta a los 5 s', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const question = page.locator('[data-tq]').first();
  const revealBtn = question.locator('[data-reveal-trigger]');
  const correctOpt = question.locator('.tq-opt').first(); // q1 → correct index 0
  const explanation = question.locator('.tq-exp');

  // Initial state: neither highlight nor explanation visible.
  await expect(correctOpt).not.toHaveClass(/revealed/);
  await expect(explanation).toBeHidden();

  // On click: correct option highlighted + explanation visible (criterion 1).
  await revealBtn.click();
  await expect(correctOpt).toHaveClass(/revealed/);
  await expect(explanation).toBeVisible();

  // After 5 s it hides on its own (criterion 2).
  await expect(correctOpt).not.toHaveClass(/revealed/, { timeout: 7000 });
  await expect(explanation).toBeHidden();
});

test('tras corregir en bloque, el botón de revelar por pregunta desaparece', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const revealBtn = page.locator('[data-tq] [data-reveal-trigger]').first();
  await expect(revealBtn).toBeVisible();

  await page.locator('[data-grade-trigger]').click();

  // Once graded the answer is permanent, so the reveal button is redundant (criterion 4).
  await expect(revealBtn).toBeHidden();
});
