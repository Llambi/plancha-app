/**
 * Estadísticas de práctica — núcleo puro y testeable, sin DOM.
 *
 * Acumula, por asignatura y pregunta, el resultado de cada corrección (intentos,
 * fallos y si el último intento fue fallo) bajo una clave independiente del
 * progreso de respuestas (`plancha:stats:<asignatura>`), para poder reiniciarla por
 * separado. A partir de esos contadores deriva el resumen: nº de respondidas, dos
 * porcentajes de acierto (último intento vs acumulado, para ver la mejora) y el
 * ranking de preguntas más falladas. `parseStats` es defensivo (null ante datos
 * inválidos). El cableado con el DOM vive en los scripts de `TestQuestion.astro` y
 * `practica/[asignatura].astro`.
 */

const STATS_PREFIX = 'plancha:stats:';

/** Contadores acumulados de una pregunta. */
export interface QuestionStat {
  /** Veces corregida (respondida). */
  attempts: number;
  /** Veces fallada (acumulado) — ranking de «más falladas». */
  wrong: number;
  /** true si la última corrección fue fallo — filtro «solo mis fallos». */
  lastWrong: boolean;
}

/** Estadísticas persistidas del test de una asignatura. */
export interface StatsState {
  /** id de fieldset ("q-<id>") -> contadores. */
  questions: Record<string, QuestionStat>;
}

/** Resumen derivado para el panel. */
export interface StatsSummary {
  /** Nº de preguntas respondidas (con al menos un intento). */
  answered: number;
  /** Acierto del último intento de cada pregunta (dominio actual), en [0, 1]. */
  accuracyLast: number;
  /** Acierto sobre todos los intentos (esfuerzo total), en [0, 1]. */
  accuracyAll: number;
  /** Preguntas más falladas, ordenadas por `wrong` descendente. */
  mostFailed: { id: string; wrong: number }[];
}

/** Clave de `localStorage` para las estadísticas de una asignatura. */
export function statsKeyFor(asignatura: string): string {
  return `${STATS_PREFIX}${asignatura}`;
}

export function serializeStats(state: StatsState): string {
  return JSON.stringify(state);
}

/** Parse defensivo: `null` ante JSON inválido, no-objeto o forma incompleta. */
export function parseStats(raw: string | null): StatsState | null {
  if (!raw) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof value !== 'object' || value === null) return null;
  const v = value as Record<string, unknown>;
  if (typeof v.questions !== 'object' || v.questions === null) return null;
  return { questions: v.questions as Record<string, QuestionStat> };
}

/**
 * Acumula los resultados de una corrección. `outcomes` mapea id de pregunta a si
 * se acertó. Devuelve un estado nuevo (no muta el de entrada).
 */
export function recordGrading(state: StatsState, outcomes: Record<string, boolean>): StatsState {
  const questions = { ...state.questions };
  for (const [id, correct] of Object.entries(outcomes)) {
    const prev = questions[id] ?? { attempts: 0, wrong: 0, lastWrong: false };
    questions[id] = {
      attempts: prev.attempts + 1,
      wrong: prev.wrong + (correct ? 0 : 1),
      lastWrong: !correct,
    };
  }
  return { questions };
}

export function summarize(state: StatsState): StatsSummary {
  const entries = Object.entries(state.questions);
  let attempts = 0;
  let wrong = 0;
  let lastRight = 0;
  for (const [, s] of entries) {
    attempts += s.attempts;
    wrong += s.wrong;
    if (!s.lastWrong) lastRight++;
  }
  const answered = entries.length;
  const mostFailed = entries
    .filter(([, s]) => s.wrong > 0)
    .map(([id, s]) => ({ id, wrong: s.wrong }))
    .sort((a, b) => b.wrong - a.wrong);
  return {
    answered,
    accuracyLast: answered ? lastRight / answered : 0,
    accuracyAll: attempts ? (attempts - wrong) / attempts : 0,
    mostFailed,
  };
}

/**
 * Compact one-line stats for the collapsed panel («Acumulado: N%»); empty when
 * nothing has been answered yet.
 */
export function formatStatsChip(summary: StatsSummary | null): string {
  if (!summary || summary.answered === 0) return '';
  return `Acumulado: ${Math.round(summary.accuracyAll * 100)}%`;
}

/** Ids cuyo último intento fue fallo (conjunto del filtro «solo mis fallos»). */
export function failedIds(state: StatsState): string[] {
  return Object.entries(state.questions)
    .filter(([, s]) => s.lastWrong)
    .map(([id]) => id);
}

/** Descarta estadísticas de ids que ya no existen en el contenido vigente. */
export function pruneStats(state: StatsState, validIds: string[]): StatsState {
  const valid = new Set(validIds);
  const questions: Record<string, QuestionStat> = {};
  for (const [id, s] of Object.entries(state.questions)) {
    if (valid.has(id)) questions[id] = s;
  }
  return { questions };
}
