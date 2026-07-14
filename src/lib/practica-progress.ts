/**
 * Persistencia de progreso de práctica — núcleo puro y testeable, sin DOM.
 *
 * Modela el estado del test de una asignatura (opciones marcadas por pregunta y,
 * si se corrigió, la puntuación) y su (de)serialización a `localStorage` bajo una
 * clave namespaced por asignatura (`plancha:practica:<asignatura>`). `parse` es
 * defensivo: ante datos inválidos devuelve `null` en vez de lanzar. El cableado
 * con el DOM (leer/escribir storage, repintar) vive en el `<script>` de
 * `TestQuestion.astro`; aquí solo está la lógica que se testea en aislamiento.
 */

const STORAGE_PREFIX = 'plancha:practica:';

/** Estado persistido del test de una asignatura. */
export interface ProgressState {
  /** id de fieldset ("q-<id>") -> índices de opción marcados. */
  answers: Record<string, number[]>;
  /** true si el usuario ya pulsó «Corregir». */
  graded: boolean;
  /** Aciertos; solo significativo si `graded`. */
  score: number;
  /** Total de preguntas; solo significativo si `graded`. */
  total: number;
}

/** Clave de `localStorage` para una asignatura. */
export function keyFor(asignatura: string): string {
  return `${STORAGE_PREFIX}${asignatura}`;
}

export function serialize(state: ProgressState): string {
  return JSON.stringify(state);
}

/** Parse defensivo: `null` ante JSON inválido, no-objeto o forma incompleta. */
export function parse(raw: string | null): ProgressState | null {
  if (!raw) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof value !== 'object' || value === null) return null;
  const v = value as Record<string, unknown>;
  if (typeof v.answers !== 'object' || v.answers === null) return null;
  if (typeof v.graded !== 'boolean') return null;
  return {
    answers: v.answers as Record<string, number[]>,
    graded: v.graded,
    score: typeof v.score === 'number' ? v.score : 0,
    total: typeof v.total === 'number' ? v.total : 0,
  };
}

/** Descarta respuestas cuyo id ya no existe en el contenido vigente. */
export function pruneAnswers(
  answers: Record<string, number[]>,
  validIds: string[],
): Record<string, number[]> {
  const valid = new Set(validIds);
  const out: Record<string, number[]> = {};
  for (const [id, picked] of Object.entries(answers)) {
    if (valid.has(id)) out[id] = picked;
  }
  return out;
}

/**
 * Removes a single question's answer, leaving every other question and
 * `graded`/`score`/`total` untouched (issue #59 — the per-question erase
 * button is only available before grading, so there's nothing to recompute).
 */
export function clearAnswer(state: ProgressState, questionId: string): ProgressState {
  const { [questionId]: _removed, ...answers } = state.answers;
  return { ...state, answers };
}
