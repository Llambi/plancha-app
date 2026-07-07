import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';
import { openPanels } from './helpers';

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

  test('the pin button exposes its state via aria-pressed', async ({ page }) => {
    await page.goto(`${BASE}/practica/si`);

    const pinBtn = page.locator('.tq').first().locator('[data-mm-pin]');
    await expect(pinBtn).toHaveAttribute('aria-pressed', 'false');
    await pinBtn.click();
    await expect(pinBtn).toHaveAttribute('aria-pressed', 'true');
    await pinBtn.click();
    await expect(pinBtn).toHaveAttribute('aria-pressed', 'false');

    await pinBtn.click();
    await page.reload();
    await expect(page.locator('.tq').first().locator('[data-mm-pin]')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  test('clicking a tick scrolls the page to its card', async ({ page }) => {
    await page.goto(`${BASE}/practica/si`);

    await expect(page.locator('.mm-tick').last()).toBeVisible();
    const before = await page.evaluate(() => window.scrollY);
    await page.locator('.mm-tick').last().click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before);
  });

  test('rail ticks and drawer rows are keyboard-operable', async ({ page }) => {
    await page.goto(`${BASE}/practica/si`);

    const tick = page.locator('.mm-tick').last();
    await expect(tick).toHaveAttribute('role', 'button');
    await expect(tick).toHaveAttribute('aria-label', /.+/);
    const before = await page.evaluate(() => window.scrollY);
    await tick.focus();
    await page.keyboard.press('Enter');
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before);

    await page.setViewportSize({ width: 414, height: 860 });
    await page.locator('.mm-fab').click();
    const row = page.locator('.mm-lrow').last();
    await expect(row).toHaveAttribute('role', 'button');
    await row.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-mm]')).not.toHaveClass(/mm-open/);
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

  test('grading colors the rail ticks and drawer rows to match the actual result, leaving unanswered questions uncolored', async ({
    page,
  }) => {
    await page.goto(`${BASE}/practica/si`);

    const firstQuestion = page.locator('.tq').nth(0);
    const firstCorrect = JSON.parse((await firstQuestion.getAttribute('data-correct')) ?? '[]');
    await firstQuestion.locator(`input[value="${firstCorrect[0]}"]`).check();

    const secondQuestion = page.locator('.tq').nth(1);
    const secondCorrect = JSON.parse((await secondQuestion.getAttribute('data-correct')) ?? '[]');
    const wrongValue = [0, 1, 2, 3].find((v) => !secondCorrect.includes(v));
    await secondQuestion.locator(`input[value="${wrongValue}"]`).check();

    await page.locator('[data-grade-trigger]').click();

    // Third question onward stay unanswered: graded, but not counted as failures.
    await expect(page.locator('.mm-tick.ok')).toHaveCount(1);
    await expect(page.locator('.mm-tick.bad')).toHaveCount(1);
  });

  test('the «Solo mis fallos» filter hides filtered-out questions from the rail', async ({
    page,
  }) => {
    await page.goto(`${BASE}/practica/si`);
    await openPanels(page);

    const totalTests = await page.locator('[data-tq]').count();
    const totalDevs = await page.locator('[data-dq]').count();

    const firstQuestion = page.locator('.tq').nth(0);
    const correct = JSON.parse((await firstQuestion.getAttribute('data-correct')) ?? '[]');
    const wrongValue = [0, 1, 2, 3].find((v) => !correct.includes(v));
    await firstQuestion.locator(`input[value="${wrongValue}"]`).check();
    await page.locator('[data-grade-trigger]').click();

    // Only the failed question (+ desarrollo, untouched by this filter) stays.
    await page.locator('[data-failed-toggle]').check();
    await expect(page.locator('.mm-tick')).toHaveCount(1 + totalDevs);

    await page.locator('[data-failed-toggle]').uncheck();
    await expect(page.locator('.mm-tick')).toHaveCount(totalTests + totalDevs);
  });

  test('opening the drawer moves focus in, Tab traps it, and Escape closes it and restores focus', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 414, height: 860 });
    await page.goto(`${BASE}/practica/si`);

    await page.locator('.mm-fab').click();
    await expect(page.locator('.mm-drawer')).toBeVisible();
    expect(await page.evaluate(() => !!document.activeElement?.closest('.mm-drawer'))).toBe(true);

    // Tab-trap: focusing the last focusable in the drawer, Tab wraps to the first.
    await page.evaluate(() => {
      const drawer = document.querySelector('.mm-drawer')!;
      const focusables = drawer.querySelectorAll<HTMLElement>('[tabindex], button');
      focusables[focusables.length - 1].focus();
    });
    await page.keyboard.press('Tab');
    expect(
      await page.evaluate(() => {
        const drawer = document.querySelector('.mm-drawer')!;
        const focusables = drawer.querySelectorAll<HTMLElement>('[tabindex], button');
        return document.activeElement === focusables[0];
      }),
    ).toBe(true);

    await page.keyboard.press('Escape');
    await expect(page.locator('[data-mm]')).not.toHaveClass(/mm-open/);
    expect(await page.evaluate(() => document.activeElement?.classList.contains('mm-fab'))).toBe(
      true,
    );
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

  test('the FAB never covers a tema filter chip, even when chips wrap to several rows', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE}/practica/si`);

    const overlapping = await page.evaluate(() => {
      const fab = document.querySelector('.mm-fab')!.getBoundingClientRect();
      const chips = Array.from(document.querySelectorAll<HTMLElement>('.filter-btn'));
      const intersects = (a: DOMRect, b: DOMRect) =>
        !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
      return chips
        .filter((c) => intersects(fab, c.getBoundingClientRect()))
        .map((c) => c.textContent);
    });

    expect(overlapping).toEqual([]);
  });

  test('the FAB still opens the drawer after being repositioned to clear the filter chips', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE}/practica/si`);

    await page.locator('.mm-fab').click();
    await expect(page.locator('.mm-drawer')).toBeVisible();
  });

  test('the FAB is a compact icon button rather than a large labeled pill (issue #40)', async ({
    page,
  }) => {
    // On a page densely packed with cards (only ~1rem apart), repositioning a
    // *larger* FAB to dodge whatever card rests under it can just move the
    // overlap onto a different card instead of clearing it — there's rarely a
    // truly free gap to slot it into. Shrinking it to a small icon button
    // reduces the overlap footprint instead of chasing an unreachable "never
    // overlaps anything" guarantee.
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE}/practica/si`);

    const box = await page.locator('.mm-fab').boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(48);
    expect(box!.height).toBeLessThanOrEqual(48);

    // No visible "Mapa" label text — the accessible name still comes from
    // aria-label, but nothing beyond the icon (and, once something is
    // pinned, the small count badge) is rendered.
    const visibleText = (await page.locator('.mm-fab').innerText()).trim();
    expect(visibleText).toBe('');
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

  test('the rail no longer shows the "mapa" literal, but stays identifiable via aria-label', async ({
    page,
  }) => {
    await page.goto(`${BASE}/esquemas/si`);

    await expect(page.locator('.mm-rail')).toBeVisible();
    const beforeContent = await page
      .locator('.mm-rail')
      .evaluate((el) => getComputedStyle(el, '::before').content);
    expect(beforeContent === 'none' || beforeContent === '""').toBe(true);
    await expect(page.locator('.mm-rail')).toHaveAttribute('aria-label', 'Minimapa de navegación');
  });
});
