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
  // Exact match: catches a double-BASE regression (e.g. ".../plancha-app/plancha-app").
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    `${SITE}${BASE}`,
  );

  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', /.+/);
  await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', /.+/);
});

test('la home emite og:image/twitter:image con una imagen PNG real', async ({ page }) => {
  await page.goto(`${BASE}/`);

  const ogImage = page.locator('meta[property="og:image"]');
  const content = await ogImage.getAttribute('content');
  expect(content).toBe(`${SITE}${BASE}/og-image.png`);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', content!);

  const res = await page.request.get(`${BASE}/og-image.png`);
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toBe('image/png');
});

test('el sitemap se genera bajo el subpath y referencia URLs con BASE', async ({ page }) => {
  const res = await page.request.get(`${BASE}/sitemap-index.xml`);
  expect(res.status()).toBe(200);

  const body = await res.text();
  // The index references the per-page sitemap by its full production URL
  // (SITE + BASE); it's fetched here relative to the local preview server.
  expect(body).toContain(`${SITE}${BASE}/sitemap-0.xml`);

  const sitemapRes = await page.request.get(`${BASE}/sitemap-0.xml`);
  expect(sitemapRes.status()).toBe(200);
  const sitemapBody = await sitemapRes.text();
  expect(sitemapBody).toContain(`${SITE}${BASE}/`);
});
