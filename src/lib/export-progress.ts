/**
 * Progress backup — pure, testable core, no DOM (issue #56).
 *
 * Every module that persists user progress namespaces its `localStorage` keys
 * under the `plancha:` prefix (`practica-progress.ts`, `practica-stats.ts`,
 * `desarrollo-progress.ts`, `exam-mode.ts`, `minimap.ts`). Rather than
 * enumerating each module's schema, the export covers that whole prefix
 * verbatim — new `plancha:`-namespaced keys are covered automatically. Reading
 * `localStorage`, triggering the download and applying an imported file is
 * DOM wiring that lives in `src/pages/index.astro`.
 */

const EXPORT_PREFIX = 'plancha:';

/** A `localStorage` key this backup covers. */
export function isExportableKey(key: string): boolean {
  return key.startsWith(EXPORT_PREFIX);
}

/** A full progress backup: raw `localStorage` values, keyed as they're stored. */
export interface ProgressExport {
  version: 1;
  exportedAt: string;
  data: Record<string, string>;
}

/** Builds an export from a snapshot of `localStorage` entries, keeping only exportable keys. */
export function buildProgressExport(
  entries: Record<string, string>,
  exportedAt: string,
): ProgressExport {
  const data: Record<string, string> = {};
  for (const [key, value] of Object.entries(entries)) {
    if (isExportableKey(key)) data[key] = value;
  }
  return { version: 1, exportedAt, data };
}

export function serializeProgressExport(state: ProgressExport): string {
  return JSON.stringify(state, null, 2);
}

/** Defensive parse: `null` on invalid JSON, wrong version, or an incomplete/malformed shape. */
export function parseProgressExport(raw: string): ProgressExport | null {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof value !== 'object' || value === null) return null;
  const v = value as Record<string, unknown>;
  if (v.version !== 1) return null;
  if (typeof v.exportedAt !== 'string') return null;
  if (typeof v.data !== 'object' || v.data === null) return null;
  const entries = Object.entries(v.data as Record<string, unknown>);
  if (entries.some(([, val]) => typeof val !== 'string')) return null;
  return {
    version: 1,
    exportedAt: v.exportedAt,
    data: Object.fromEntries(entries) as Record<string, string>,
  };
}
