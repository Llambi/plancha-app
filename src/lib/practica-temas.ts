/**
 * Topic filter — pure, testable core, no DOM. Derives the distinct `tema`
 * values shown by the filter buttons in `/practica/<asignatura>` directly
 * from the test bank, sorted naturally so "Tema 2" precedes "Tema 10".
 */

/** Distinct, naturally-sorted temas. Empty temas/undefined are ignored. */
export function uniqueTemas(temas: (string | undefined)[]): string[] {
  const distinct = new Set(temas.filter((t): t is string => Boolean(t)));
  return Array.from(distinct).sort((a, b) => a.localeCompare(b, 'es', { numeric: true }));
}
