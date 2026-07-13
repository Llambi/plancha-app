/**
 * Núcleo puro y testeable del repaso transversal (issue #51): cruza los ids de
 * preguntas falladas en su último intento (por asignatura, ya calculados con
 * `failedIds()` de `practica-stats.ts`) con los registros del índice de
 * búsqueda (`search-index.json` / `search.ts`) para obtener texto y deep-link
 * sin reconstruir el contenido. El wiring con `localStorage` y el `fetch` del
 * índice vive en `src/pages/repaso.astro`.
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
 * Agrupa por asignatura las preguntas falladas que tienen un registro
 * correspondiente en el índice de búsqueda. `failedByAsignatura` mapea código
 * de asignatura -> ids con el formato de `failedIds()` (`"q-<id>"`, igual que
 * el anchor de la pregunta). Asignaturas sin fallos o cuyos fallos no casan con
 * ningún registro no aparecen en el resultado.
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
