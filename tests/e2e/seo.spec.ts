import { test, expect } from '@playwright/test';
import { BASE, SITE } from '../../src/data/site';

// E2E for SEO metadata (issue #13): favicon, Open Graph/Twitter meta tags and
// sitemap, against the built site served under BASE (/plancha-app).

test('el favicon es real (no data:,) y responde 200', async ({ page }) => {
  await page.goto(`${BASE}/`);

  const icon = page.locator('link[rel="icon"]');
  const href = await icon.getAttribute('href');
  expect(href).toBe(`${BASE}/favicon.svg`);
  expect(href).not.toBe('data:,');

  const res = await page.request.get(href!);
  expect(res.status()).toBe(200);
});

test('la home emite meta tags Open Graph y Twitter Card', async ({ page }) => {
  await page.goto(`${BASE}/`);

  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    new RegExp(`^${SITE}${BASE}/`),
  );

  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', /.+/);
  await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', /.+/);
});
