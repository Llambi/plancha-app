import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { BASE } from '../../src/data/site';

// Automated accessibility checks (issue #58): one test per page type, so a
// regression like the manually-found issues #40-#46 would fail CI instead of
// needing another manual pass. Each test asserts axe-core finds zero
// *unexpected* violations — known ones are filtered out per rule and per
// page (never the whole rule/category sitewide), each tracked by its own
// follow-up issue for a real fix.

const pages: { label: string; path: string }[] = [
  { label: 'home', path: '/' },
  { label: 'práctica', path: '/practica/si' },
  { label: 'esquemas', path: '/esquemas/si' },
  { label: 'guía paginada', path: '/guia/soa' },
  { label: 'buscador', path: '/buscar' },
  { label: 'validador de MongoDB', path: '/practica/mongodb' },
];

interface KnownException {
  ruleId: string;
  /** Follow-up issue tracking the real fix for this exception. */
  issue: number;
}

// issue #77: topbar content (.site-brand/.site-doc-title/.site-home) isn't
// wrapped in a landmark — same root cause on every page.
const topbarLandmark: KnownException = { ruleId: 'region', issue: 77 };

const knownExceptions: Record<string, KnownException[]> = {
  '/': [topbarLandmark],
  '/practica/si': [topbarLandmark],
  '/esquemas/si': [topbarLandmark],
  '/buscar': [topbarLandmark],
  '/guia/soa': [
    topbarLandmark,
    // issue #78: .soa-chip-badge / .key-box .box-label fall short of 4.5:1.
    { ruleId: 'color-contrast', issue: 78 },
  ],
  '/practica/mongodb': [
    topbarLandmark,
    // issue #78: .eyebrow / .pct badges fall short of 4.5:1.
    { ruleId: 'color-contrast', issue: 78 },
    // issue #79: .coll.card h3 skips a heading level.
    { ruleId: 'heading-order', issue: 79 },
  ],
};

function filterKnownViolations(
  violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations'],
  known: KnownException[],
) {
  const knownIds = new Set(known.map((k) => k.ruleId));
  return violations.filter((v) => !knownIds.has(v.id));
}

for (const { label, path } of pages) {
  test(`${label} (${path}) has no unexpected accessibility violations`, async ({ page }) => {
    await page.goto(`${BASE}${path}`);
    const results = await new AxeBuilder({ page }).analyze();
    const unexpected = filterKnownViolations(results.violations, knownExceptions[path] ?? []);
    expect(unexpected, JSON.stringify(unexpected, null, 2)).toEqual([]);
  });
}
