import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';
import { openPanels } from './helpers';

// E2E for the desarrollo self-assessment (issue #12), against `/practica/si`
// (has desarrollo questions).

test('los 3 botones aparecen y ninguno está activo por defecto', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const first = page.locator('[data-dq]').first();
  const buttons = first.locator('[data-dq-self]');
  await expect(buttons).toHaveCount(3);
  for (const btn of await buttons.all()) {
    await expect(btn).toHaveAttribute('aria-pressed', 'false');
  }
});

test('pulsar un botón lo marca activo y desmarca los otros dos', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const first = page.locator('[data-dq]').first();
  await first.locator('[data-dq-self="sabia"]').click();

  await expect(first.locator('[data-dq-self="sabia"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(first.locator('[data-dq-self="medias"]')).toHaveAttribute('aria-pressed', 'false');
  await expect(first.locator('[data-dq-self="no"]')).toHaveAttribute('aria-pressed', 'false');
});

test('la autoevaluación persiste tras recargar', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const first = page.locator('[data-dq]').first();
  await first.locator('[data-dq-self="medias"]').click();

  await page.reload();

  await expect(
    page.locator('[data-dq]').first().locator('[data-dq-self="medias"]'),
  ).toHaveAttribute('aria-pressed', 'true');
});

test('el resumen de conteos aparece y se actualiza al autoevaluar', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const summary = page.locator('[data-dev-stats-summary]');
  await expect(summary).toContainText('Aún no has autoevaluado');

  const cards = page.locator('[data-dq]');
  await cards.nth(0).locator('[data-dq-self="sabia"]').click();
  await cards.nth(1).locator('[data-dq-self="no"]').click();

  await expect(summary).toContainText('Sabías: 1');
  await expect(summary).toContainText('A medias: 0');
  await expect(summary).toContainText('No sabías: 1');
});

test('the review-order toggle moves an unknown question to the front, and restores order when turned off', async ({
  page,
}) => {
  await page.goto(`${BASE}/practica/si`);

  const cards = page.locator('[data-dq]');
  const firstId = await cards.nth(0).getAttribute('id');
  const laterId = await cards.nth(4).getAttribute('id');

  await cards.nth(0).locator('[data-dq-self="sabia"]').click();
  await cards.nth(4).locator('[data-dq-self="no"]').click();

  await openPanels(page);
  await page.locator('[data-dev-review-toggle]').check();

  await expect(cards.first()).toHaveAttribute('id', laterId!);

  await page.locator('[data-dev-review-toggle]').uncheck();

  await expect(cards.first()).toHaveAttribute('id', firstId!);
});
