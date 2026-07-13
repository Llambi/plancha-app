/**
 * Cross-subject failed-questions review — pure, testable core, no DOM.
 *
 * Matches ids of questions failed on their last attempt (per asignatura,
 * already computed with `failedIds()` from `practica-stats.ts`) against the
 * search index records (`search-index.json` / `search.ts`) to get their text
 * and deep-link without rebuilding the content. The `localStorage` scan and
 * index `fetch` live in `src/pages/repaso.astro`.
 */
import type { SearchRecord } from './search';

export interface RepasoGroup {
  asignatura: string;
  asignaturaNombre: string;
  sigla: string;
  accent: string;
  items: SearchRecord[];
}

/**
 * Groups, per asignatura, the failed questions that have a matching record in
 * the search index. `failedByAsignatura` maps asignatura code -> ids with the
 * `failedIds()` format (`"q-<id>"`, same as the question's anchor). Subjects
 * with no failures, or whose failures match no record, don't appear in the
 * result.
 */
export function buildRepasoGroups(
  records: SearchRecord[],
  failedByAsignatura: Record<string, string[]>,
): RepasoGroup[] {
  const groups: RepasoGroup[] = [];
  for (const [asignatura, failedIds] of Object.entries(failedByAsignatura)) {
    if (failedIds.length === 0) continue;
    const wanted = new Set(failedIds.map((id) => `test-${asignatura}-${id.replace(/^q-/, '')}`));
    const items = records.filter(
      (r) => r.tipo === 'practica' && r.asignatura === asignatura && wanted.has(r.id),
    );
    if (items.length === 0) continue;
    const first = items[0];
    groups.push({
      asignatura,
      asignaturaNombre: first.asignaturaNombre,
      sigla: first.sigla,
      accent: first.accent,
      items,
    });
  }
  return groups;
}
