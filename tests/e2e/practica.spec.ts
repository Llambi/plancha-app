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

test('mientras el ratón está sobre la explicación revelada, no se oculta pasados los 5s (issue #42)', async ({
  page,
}) => {
  await page.goto(`${BASE}/practica/si`);

  const question = page.locator('[data-tq]').first();
  const revealBtn = question.locator('[data-reveal-trigger]');
  const explanation = question.locator('.tq-exp');

  await revealBtn.click();
  await expect(explanation).toBeVisible();

  await explanation.hover();
  await page.waitForTimeout(6000);
  await expect(explanation).toBeVisible(); // still visible: mouse is over it

  // Move the mouse away from both the explanation and the button: a fresh
  // 5s countdown starts from this point.
  await page.locator('h1').first().hover();
  await expect(explanation).toBeHidden({ timeout: 7000 });
});

test('con el foco de teclado en el botón «Ver respuesta», no se oculta pasados los 5s (issue #42)', async ({
  page,
}) => {
  await page.goto(`${BASE}/practica/si`);

  const question = page.locator('[data-tq]').first();
  const revealBtn = question.locator('[data-reveal-trigger]');
  const explanation = question.locator('.tq-exp');

  await revealBtn.focus();
  await page.keyboard.press('Enter'); // native keyboard activation keeps focus on the button
  await expect(explanation).toBeVisible();

  await page.waitForTimeout(6000);
  await expect(explanation).toBeVisible(); // still visible: focus is on the button
});

test('el nombre accesible de una pregunta no incluye el botón «Fijar pregunta» (issue #45)', async ({
  page,
}) => {
  await page.goto(`${BASE}/practica/si`);

  // q1 is `type: single` with no `apariciones`, so `.tq-q` is just the
  // enunciado — an exact match fails if the pin button (or the number) is
  // still part of the fieldset's accessible name.
  const firstQuestion = page.locator('[data-tq]').first();
  await expect(firstQuestion).toHaveAccessibleName('¿Cuándo se dice que un agente es racional?');
});

test('tras corregir en bloque, el botón de revelar por pregunta desaparece', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const revealBtn = page.locator('[data-tq] [data-reveal-trigger]').first();
  await expect(revealBtn).toBeVisible();

  await page.locator('[data-grade-trigger]').click();

  // Once graded the answer is permanent, so the reveal button is redundant (criterion 4).
  await expect(revealBtn).toBeHidden();
});
