import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for draft answer persistence in desarrollo questions (issue #28),
// against `/practica/si` (has desarrollo questions).

test('el borrador escrito en el textarea persiste tras recargar', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const first = page.locator('[data-dq]').first();
  const textarea = first.locator('.dq-text');
  await textarea.fill('Mi respuesta de prueba');
  await textarea.blur();

  await page.reload();

  await expect(page.locator('[data-dq]').first().locator('.dq-text')).toHaveValue(
    'Mi respuesta de prueba',
  );
});

test('borrar el texto y recargar no deja un borrador obsoleto', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const first = page.locator('[data-dq]').first();
  const textarea = first.locator('.dq-text');
  await textarea.fill('Texto que luego se borra');
  await textarea.blur();
  await textarea.fill('');
  await textarea.blur();

  await page.reload();

  await expect(page.locator('[data-dq]').first().locator('.dq-text')).toHaveValue('');
});

test('cada pregunta de desarrollo mantiene su propio borrador', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const cards = page.locator('[data-dq]');
  await cards.nth(0).locator('.dq-text').fill('Respuesta a la primera pregunta');
  await cards.nth(0).locator('.dq-text').blur();
  await cards.nth(1).locator('.dq-text').fill('Respuesta a la segunda pregunta');
  await cards.nth(1).locator('.dq-text').blur();

  await page.reload();

  await expect(page.locator('[data-dq]').nth(0).locator('.dq-text')).toHaveValue(
    'Respuesta a la primera pregunta',
  );
  await expect(page.locator('[data-dq]').nth(1).locator('.dq-text')).toHaveValue(
    'Respuesta a la segunda pregunta',
  );
});
