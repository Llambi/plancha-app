import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for practice stats and the «solo mis fallos» filter (issue #10), against the
// built site under the BASE subpath. Uses /practica/si; q1 is single with correct
// index 0, so checking index 1 fails it.

test('grading records stats and the panel shows both accuracies', async ({ page }) => {
  await page.goto(`${BASE}/practica/si`);

  const summary = page.locator('[data-stats-summary]');
  await expect(summary).toContainText('Aún no has corregido');

  // Answer q1 correctly (index 0) and grade.
  await page.locator('[data-tq]').first().locator('input').first().check();
  await page.locator('[data-grade-trigger]').click();

  await expect(summary).toContainText('Respondidas: 1 de');
  await expect(summary).toContainText('Acierto último intento: 100%');
  await expect(summary).toContainText('Acumulado: 100%');
});
