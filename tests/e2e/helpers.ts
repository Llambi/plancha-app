import type { Page } from '@playwright/test';

/**
 * Expand the collapsible practica panels (stats / exam / self-assessment).
 * Since #32 they are `<details>` collapsed by default, so tests that interact
 * with their controls must open them first.
 */
export async function openPanels(page: Page): Promise<void> {
  await page
    .locator('[data-stats], [data-exam-panel], [data-dev-stats]')
    .evaluateAll((els) => els.forEach((el) => ((el as HTMLDetailsElement).open = true)));
}
