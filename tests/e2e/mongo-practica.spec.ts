import { test, expect } from '@playwright/test';
import { BASE } from '../../src/data/site';

// E2E for the MongoDB validator's query quiz keyboard accessibility (issue
// #41): the options were plain <div onclick>, with no keyboard support. This
// covers the "Test de consultas" block specifically (not the JSON validator
// blocks above it, issue #44).

test.describe('MongoDB validator: query quiz', () => {
  test('each option is a radio input grouped by question', async ({ page }) => {
    await page.goto(`${BASE}/practica/mongodb`);

    const firstQuestionOpts = page.locator('#opts-0-0 input[type="radio"]');
    await expect(firstQuestionOpts).toHaveCount(4);
    const names = await firstQuestionOpts.evaluateAll((els) =>
      (els as HTMLInputElement[]).map((el) => el.name),
    );
    expect(new Set(names).size).toBe(1); // all four options share one group name
  });

  test('an option can be selected with keyboard only (Tab + Space)', async ({ page }) => {
    await page.goto(`${BASE}/practica/mongodb`);

    const target = page.locator('#opt-0-0-2 input[type="radio"]');
    await target.focus();
    await page.keyboard.press('Space');

    await expect(target).toBeChecked();
  });

  test('after grading, the options of a graded question become disabled', async ({ page }) => {
    await page.goto(`${BASE}/practica/mongodb`);

    const option = page.locator('#opt-0-0-2 input[type="radio"]');
    await option.focus();
    await page.keyboard.press('Space');

    await page.getByRole('button', { name: 'Corregir test' }).click();

    await expect(page.locator('#opts-0-0 input[type="radio"]').first()).toBeDisabled();
    await expect(option).toBeChecked();
  });
});

// E2E for the JSON validator textareas (issue #44): they only had a
// `placeholder`, which isn't an accessible substitute for a label and
// disappears once the user types.

test.describe('MongoDB validator: collection JSON textareas', () => {
  test('each collection textarea has a distinct, stable accessible name', async ({ page }) => {
    await page.goto(`${BASE}/practica/mongodb`);

    // Exercise 1 (default) has two collections: peliculas and clientes.
    const textareas = page.locator('.coll textarea');
    await expect(textareas).toHaveCount(2);
    await expect(textareas.nth(0)).toHaveAccessibleName(/db\.peliculas/);
    await expect(textareas.nth(1)).toHaveAccessibleName(/db\.clientes/);

    // Typing into it (which clears/changes the placeholder-visible state)
    // must not change the accessible name.
    await textareas.nth(0).fill('[{"a":1}]');
    await expect(textareas.nth(0)).toHaveAccessibleName(/db\.peliculas/);
  });
});

// E2E for the collection card heading level (issue #79): the page only had
// an <h1> (exercise title) and an <h3> per collection card, skipping a level.

test.describe('MongoDB validator: collection card heading order', () => {
  test('each collection card exposes an h2 with the collection name', async ({ page }) => {
    await page.goto(`${BASE}/practica/mongodb`);

    const headings = page.locator('.coll').getByRole('heading', { level: 2 });
    await expect(headings).toHaveCount(2);
    await expect(headings.nth(0)).toContainText('db.peliculas');
    await expect(headings.nth(1)).toContainText('db.clientes');
  });
});
