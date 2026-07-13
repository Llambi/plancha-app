import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for exporting/importing the user's progress as a JSON backup (issue #56).

test('exporting downloads a JSON file with the saved "plancha:" progress', async ({ page }) => {
  await page.goto(`${BASE}/`);
  await page.evaluate(() => {
    localStorage.setItem(
      'plancha:stats:si',
      JSON.stringify({ questions: { 'q-q1': { attempts: 1, wrong: 0, lastWrong: false } } }),
    );
    localStorage.setItem('site-theme', 'dark');
  });

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('[data-export-progress]').click(),
  ]);

  const path = await download.path();
  const fs = await import('node:fs/promises');
  const content = JSON.parse(await fs.readFile(path!, 'utf-8'));

  expect(content.version).toBe(1);
  expect(content.data['plancha:stats:si']).toBe(
    JSON.stringify({ questions: { 'q-q1': { attempts: 1, wrong: 0, lastWrong: false } } }),
  );
  expect(content.data['site-theme']).toBeUndefined();
});

test('importing a valid backup restores its keys into localStorage', async ({ page }) => {
  await page.goto(`${BASE}/`);

  const backup = {
    version: 1,
    exportedAt: '2026-07-13T00:00:00.000Z',
    data: {
      'plancha:stats:si': JSON.stringify({
        questions: { 'q-q1': { attempts: 1, wrong: 1, lastWrong: true } },
      }),
    },
  };

  await page.locator('[data-import-progress]').setInputFiles({
    name: 'plancha-progreso.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(backup)),
  });

  await expect(page.locator('[data-backup-status]')).toContainText('importado');
  const restored = await page.evaluate(() => localStorage.getItem('plancha:stats:si'));
  expect(restored).toBe(backup.data['plancha:stats:si']);
});

test('importing an invalid file reports the error without crashing the page', async ({ page }) => {
  await page.goto(`${BASE}/`);

  await page.locator('[data-import-progress]').setInputFiles({
    name: 'not-a-backup.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({ hello: 'world' })),
  });

  await expect(page.locator('[data-backup-status]')).toContainText('válido');
  await expect(page.locator('.hero h1')).toBeVisible();
});
