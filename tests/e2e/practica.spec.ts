import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E del botón de revelar por pregunta en la práctica de test (issue #5),
// sobre el sitio construido y servido bajo la subruta BASE (/plancha-app).
// La primera pregunta de `si` (q1) es single, con `correct:[0]` y `explicacion`.

test('revelar muestra la opción correcta + explicación y se oculta a los 5 s', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const question = page.locator('[data-tq]').first();
  const revealBtn = question.locator('[data-reveal-trigger]');
  const correctOpt = question.locator('.tq-opt').first(); // q1 → correct index 0
  const explanation = question.locator('.tq-exp');

  // Estado inicial: ni resaltado ni explicación visibles.
  await expect(correctOpt).not.toHaveClass(/revealed/);
  await expect(explanation).toBeHidden();

  // Al pulsar: opción correcta resaltada + explicación visible (criterio 1).
  await revealBtn.click();
  await expect(correctOpt).toHaveClass(/revealed/);
  await expect(explanation).toBeVisible();

  // Tras 5 s se oculta solo (criterio 2).
  await expect(correctOpt).not.toHaveClass(/revealed/, { timeout: 7000 });
  await expect(explanation).toBeHidden();
});

test('tras corregir en bloque, el botón de revelar por pregunta desaparece', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const revealBtn = page.locator('[data-tq] [data-reveal-trigger]').first();
  await expect(revealBtn).toBeVisible();

  await page.locator('[data-grade-trigger]').click();

  // Ya corregido: la solución es permanente, el botón de revelar sobra (criterio 4).
  await expect(revealBtn).toBeHidden();
});
