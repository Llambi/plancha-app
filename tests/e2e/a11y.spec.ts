import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { BASE } from '../../src/data/site';

// Automated accessibility checks (issue #58): one test per page type, so a
// regression like the manually-found issues #40-#46 would fail CI instead of
// needing another manual pass. Each test asserts axe-core finds zero
// violations.

const pages: { label: string; path: string }[] = [
  { label: 'home', path: '/' },
  { label: 'práctica', path: '/practica/si' },
  { label: 'esquemas', path: '/esquemas/si' },
  { label: 'guía paginada', path: '/guia/soa' },
  { label: 'buscador', path: '/buscar' },
  { label: 'validador de MongoDB', path: '/practica/mongodb' },
];

for (const { label, path } of pages) {
  test(`${label} (${path}) has no accessibility violations`, async ({ page }) => {
    await page.goto(`${BASE}${path}`);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}
