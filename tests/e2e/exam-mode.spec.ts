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

test('un subconjunto de N deja exactamente N preguntas visibles y el minimap las excluye', async ({
  page,
}) => {
  await page.goto(`${BASE}/practica/si`);
  const totalDevs = await page.locator('[data-dq]').count();

  await page.locator('[data-exam-subset-toggle]').check();
  await page.locator('[data-exam-subset-n]').fill('3');
  await page.locator('[data-exam-start]').click();

  await expect(page.locator('[data-tq]:not([hidden])')).toHaveCount(3);
  await expect(page.locator('.mm-tick')).toHaveCount(3 + totalDevs);
});

test('activar el modo examen desactiva el filtro «solo mis fallos» y viceversa', async ({
  page,
}) => {
  await page.goto(`${BASE}/practica/si`);

  // Empezar el simulacro desmarca «solo mis fallos» si estaba activo.
  await page.locator('[data-failed-toggle]').check();
  await page.locator('[data-exam-start]').click();
  await expect(page.locator('[data-failed-toggle]')).not.toBeChecked();

  // Y, al revés: activar «solo mis fallos» mientras el simulacro está activo
  // lo da por terminado (vuelven los botones a su estado inicial).
  await page.locator('[data-failed-toggle]').check();
  await expect(page.locator('[data-exam-start]')).toBeVisible();
  await expect(page.locator('[data-exam-exit]')).toBeHidden();
});

test('el cronómetro muestra cuenta atrás y corrige automáticamente al agotarse', async ({
  page,
}) => {
  await page.goto(`${BASE}/practica/si`);

  await page.locator('[data-exam-timed]').check();
  await page.locator('[data-exam-minutes]').fill('0.02'); // ~1.2 s, solo para el test
  await page.locator('[data-exam-start]').click();

  await expect(page.locator('[data-exam-timer]')).not.toHaveText('');
  await expect(page.locator('[data-tq]').first()).toHaveClass(/graded/, { timeout: 5000 });
});

test('la configuración del panel persiste entre recargas de página', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  await page.locator('[data-exam-shuffle]').check();
  await page.locator('[data-exam-subset-toggle]').check();
  await page.locator('[data-exam-subset-n]').fill('5');
  await page.locator('[data-exam-timed]').check();
  await page.locator('[data-exam-minutes]').fill('15');

  await page.reload();

  await expect(page.locator('[data-exam-shuffle]')).toBeChecked();
  await expect(page.locator('[data-exam-subset-toggle]')).toBeChecked();
  await expect(page.locator('[data-exam-subset-n]')).toHaveValue('5');
  await expect(page.locator('[data-exam-timed]')).toBeChecked();
  await expect(page.locator('[data-exam-minutes]')).toHaveValue('15');
  // Restaurar la config no arranca el simulacro por sí sola.
  await expect(page.locator('[data-exam-start]')).toBeVisible();
  await expect(page.locator('[data-exam-exit]')).toBeHidden();
});
