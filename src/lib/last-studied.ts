/**
 * Last-studied indicator — pure, testable core, no DOM.
 *
 * Stamps `plancha:last-studied:<asignatura>` (an ISO timestamp) whenever the
 * user grades a test or self-assesses a desarrollo question in
 * `/practica/<asignatura>` (see that page's `tq:graded`/
 * `desarrollo:stats-updated` listeners). `formatLastStudied` turns that
 * timestamp into a relative Spanish string for the home card, taking `now`
 * as a parameter (like `createRng(seed)` in `exam-mode.ts`) so it's
 * deterministic and testable without mocking the system clock.
 */

const PREFIX = 'plancha:last-studied:';

/** `localStorage` key for an asignatura's last-studied timestamp. */
export function keyFor(asignatura: string): string {
  return `${PREFIX}${asignatura}`;
}

const MINUTE = 60_000;
const HOUR = 3_600_000;
const DAY = 86_400_000;
const MONTH = DAY * 30;
const YEAR = DAY * 365;

function plural(n: number, singular: string, pluralForm = `${singular}s`): string {
  return `Estudiado hace ${n} ${n === 1 ? singular : pluralForm}`;
}

/**
 * Relative "Estudiado hace …" string from a saved ISO timestamp, as of `now`
 * (epoch ms). Empty for a missing/invalid timestamp, or a `now` before it.
 */
export function formatLastStudied(savedAt: string | null, now: number): string {
  if (!savedAt) return '';
  const then = Date.parse(savedAt);
  if (Number.isNaN(then) || now < then) return '';
  const diffMs = now - then;
  if (diffMs < MINUTE) return 'Estudiado hace un momento';
  if (diffMs < HOUR) return plural(Math.floor(diffMs / MINUTE), 'minuto');
  if (diffMs < DAY) return plural(Math.floor(diffMs / HOUR), 'hora');
  if (diffMs < MONTH) return plural(Math.floor(diffMs / DAY), 'día');
  if (diffMs < YEAR) return plural(Math.floor(diffMs / MONTH), 'mes', 'meses');
  return plural(Math.floor(diffMs / YEAR), 'año');
}
