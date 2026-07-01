import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for the minimap navigation rail + pins (issue: minimap de navegación),
// against the built site served under the BASE subpath. `si` has both a
// práctica page (test + desarrollo cards) and an esquemas page (outline
// trees), so it covers both rail flavors (ticks vs. hierarchical).

test.describe('práctica: rail + pins', () => {
  test('pinning a card highlights it and the matching tick, and survives reload', async ({
    page,
  }) => {
    await page.goto(`${BASE}/practica/si`);

    const firstCard = page.locator('.tq').first();
    await firstCard.locator('[data-mm-pin]').click();
    await expect(firstCard).toHaveClass(/pinned/);
    await expect(page.locator('.mm-tick.pinned')).toHaveCount(1);

    await page.reload();
    await expect(page.locator('.tq').first()).toHaveClass(/pinned/);
    await expect(page.locator('.mm-tick.pinned')).toHaveCount(1);
  });

  test('clicking a tick scrolls the page to its card', async ({ page }) => {
    await page.goto(`${BASE}/practica/si`);

    await expect(page.locator('.mm-tick').last()).toBeVisible();
    const before = await page.evaluate(() => window.scrollY);
    await page.locator('.mm-tick').last().click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before);
  });

  test('n/p jumps between pinned cards, but typing n/p in a textarea does not navigate', async ({
    page,
  }) => {
    await page.goto(`${BASE}/practica/si`);

    await page.locator('.tq').nth(2).locator('[data-mm-pin]').click();
    await page.evaluate(() => window.scrollTo(0, 0));

    await page.keyboard.press('n');
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

    // Focusing the textarea scrolls it into view first; what matters is that
    // typing afterwards doesn't move the page any further.
    const textarea = page.locator('.dq-text').first();
    await textarea.click();
    const afterFocus = await page.evaluate(() => window.scrollY);
    await textarea.pressSequentially('n p');
    await expect(textarea).toHaveValue('n p');
    expect(await page.evaluate(() => window.scrollY)).toBe(afterFocus);
  });

  test('grading colors the rail ticks and drawer rows to match the actual result', async ({
    page,
  }) => {
    await page.goto(`${BASE}/practica/si`);

    const firstQuestion = page.locator('.tq').first();
    const correct = JSON.parse((await firstQuestion.getAttribute('data-correct')) ?? '[]');
    await firstQuestion.locator(`input[value="${correct[0]}"]`).check();
    await page.locator('[data-grade-trigger]').click();

    await expect(page.locator('.mm-tick.ok')).toHaveCount(1);
    const total = await page.locator('[data-tq]').count();
    await expect(page.locator('.mm-tick.bad')).toHaveCount(total - 1);
  });

  test('mobile: the "Mapa" button opens a drawer listing every card, with pins on top', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 414, height: 860 });
    await page.goto(`${BASE}/practica/si`);

    await expect(page.locator('.mm-rail')).toBeHidden();
    await page.locator('.tq').first().locator('[data-mm-pin]').click();

    await page.locator('.mm-fab').click();
    await expect(page.locator('.mm-drawer')).toBeVisible();
    await expect(page.locator('.mm-prow')).toHaveCount(1);

    const total = await page.locator('[data-tq], [data-dq]').count();
    await expect(page.locator('.mm-lrow')).toHaveCount(total);

    // The drawer slides off-screen via `transform` (not `display:none`), so
    // assert against the open/close state it's driven by, not raw visibility.
    await page.locator('.mm-lrow').nth(1).click();
    await expect(page.locator('[data-mm]')).not.toHaveClass(/mm-open/);
  });
});

test.describe('esquemas: hierarchical rail', () => {
  test('the outline gets one anchor per tema and per top-level branch', async ({ page }) => {
    await page.goto(`${BASE}/esquemas/si`);

    const temaCount = await page.locator('.esq').count();
    await expect(page.locator('.mm-tick.lvl0')).toHaveCount(temaCount);
    await expect(page.locator('.mm-tick.lvl1').first()).toBeVisible();
  });

  test('pinning a sub-branch highlights it without affecting its siblings', async ({ page }) => {
    await page.goto(`${BASE}/esquemas/si`);

    const branches = page.locator('.esq-tree li.mm-anchor');
    await branches.first().locator('[data-mm-pin]').click();
    await expect(branches.first()).toHaveClass(/pinned/);
    await expect(branches.nth(1)).not.toHaveClass(/pinned/);
  });
});
