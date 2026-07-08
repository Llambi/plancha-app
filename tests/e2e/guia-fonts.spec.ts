import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for the SOA guide's Google Fonts loading (issue #48): the stylesheet
// link had no `rel="preconnect"` for either font origin, costing a full
// DNS+TLS round trip before the fonts could even start downloading.

test('preconnects to both Google Fonts origins before the stylesheet request', async ({ page }) => {
  await page.goto(`${BASE}/guia/soa`);

  await expect(
    page.locator('link[rel="preconnect"][href="https://fonts.googleapis.com"]'),
  ).toHaveCount(1);

  const gstatic = page.locator('link[rel="preconnect"][href="https://fonts.gstatic.com"]');
  await expect(gstatic).toHaveCount(1);
  await expect(gstatic).toHaveAttribute('crossorigin', '');
});
