import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for distinguishing paginated guides from esquemas on the home page
// (issue #30). SOA is the only subject with a `guia/` (paginated guide).

test('the guide card shows the "Guía" badge, not "Esquemas"', async ({ page }) => {
  await page.goto(`${BASE}/`);

  const guideCard = page.locator('.doc-card', { hasText: 'Guía de estudio' });
  await expect(guideCard.locator('.doc-type')).toHaveText('Guía');
});

test('the "Esquemas" filter no longer includes the guide card', async ({ page }) => {
  await page.goto(`${BASE}/`);

  await page.locator('.filter-btn', { hasText: 'Esquemas' }).click();
  await expect(page.locator('.doc-card', { hasText: 'Guía de estudio' })).toBeHidden();
});

test('a "Guías" filter isolates the guide card(s)', async ({ page }) => {
  await page.goto(`${BASE}/`);

  const guiaFilter = page.locator('.filter-btn', { hasText: 'Guías' });
  await expect(guiaFilter).toBeVisible();
  await guiaFilter.click();

  const visibleCards = page.locator('.doc-card:not([hidden])');
  await expect(visibleCards).toHaveCount(1);
  await expect(visibleCards.first()).toContainText('Guía de estudio');
});

test('the "Práctica" filter keeps showing the same cards as before', async ({ page }) => {
  await page.goto(`${BASE}/`);

  const totalPractica = await page.locator('.doc-card[data-tipo="practica"]').count();
  await page.locator('.filter-btn', { hasText: 'Práctica' }).click();
  await expect(page.locator('.doc-card:not([hidden])')).toHaveCount(totalPractica);
});

// Issue #46: the whole card is already a link, so the trailing "Abrir →"
// hint adds nothing and only makes the accessible name longer/noisier.
test('a card\'s accessible name excludes the decorative "Abrir →" hint', async ({ page }) => {
  await page.goto(`${BASE}/`);

  const card = page.locator('.doc-card', { hasText: 'Guía de estudio' });
  await expect(card).not.toHaveAccessibleName(/Abrir/);
  await expect(card).toHaveAccessibleName(/Guía de estudio/);
});
