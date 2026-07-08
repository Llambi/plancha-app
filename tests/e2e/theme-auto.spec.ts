import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for the 3-state theme toggle (issue #49): light -> dark -> auto -> light.
// "Auto" follows `prefers-color-scheme`, including live changes while the
// page stays open, and is the default when nothing is stored yet.

test('with no stored preference, the theme follows the system and the toggle starts in "auto"', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto(`${BASE}/`);

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme-pref', 'auto');
});

test('one click always advances the cycle by exactly one step (light -> dark -> auto -> light)', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto(`${BASE}/`);

  const toggle = page.locator('.site-theme-toggle').first();
  const pref = () => page.locator('html').getAttribute('data-theme-pref');

  expect(await pref()).toBe('auto');
  await toggle.click();
  expect(await pref()).toBe('light');
  await toggle.click();
  expect(await pref()).toBe('dark');
  await toggle.click();
  expect(await pref()).toBe('auto');
});

test('in "auto" mode, a live system color-scheme change updates the theme without a click', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto(`${BASE}/`);

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
