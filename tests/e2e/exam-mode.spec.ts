import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for exam mode (issue #9): shuffle, N-question subset and timed simulacro
// over the existing test bank. `si` has a sizeable test bank (88 questions);
// `cl` only has desarrollo content, so it must not show the panel.

function questionIds(page: import('@playwright/test').Page) {
  return page.locator('[data-tq]').evaluateAll((els) => els.map((el) => el.id));
}

test('el panel de modo examen aparece cuando hay preguntas de test', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);
  await expect(page.locator('[data-exam-panel]')).toBeVisible();
});

test('no aparece el panel de modo examen si la asignatura no tiene test', async ({ page }) => {
  await page.goto(`${BASE}/practica/cl`);
  await expect(page.locator('[data-exam-panel]')).toHaveCount(0);
});

test('empezar y salir del modo examen restaura el conjunto y orden original', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const before = await questionIds(page);

  await page.locator('[data-exam-start]').click();
  await expect(page.locator('[data-exam-start]')).toBeHidden();
  await expect(page.locator('[data-exam-exit]')).toBeVisible();

  await page.locator('[data-exam-exit]').click();
  await expect(page.locator('[data-exam-exit]')).toBeHidden();
  await expect(page.locator('[data-exam-start]')).toBeVisible();

  const after = await questionIds(page);
  expect(after).toEqual(before);
});

test('barajar conserva el mismo conjunto de preguntas pero cambia el orden', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const before = await questionIds(page);

  await page.locator('[data-exam-shuffle]').check();
  await page.locator('[data-exam-start]').click();

  const after = await questionIds(page);
  // Invariante: mismo conjunto (sin pérdidas ni duplicados).
  expect([...after].sort()).toEqual([...before].sort());
  // Con 88 preguntas, la probabilidad de que el barajado devuelva el mismo
  // orden es prácticamente nula — sirve como señal de que sí se ha barajado.
  expect(after).not.toEqual(before);
});
