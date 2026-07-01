/**
 * Self-assessment for desarrollo questions — pure, testable core, no DOM.
 *
 * Models a 3-state self-assessment per question ("sabia" | "medias" | "no")
 * and its (de)serialization to `localStorage` under a key namespaced by
 * asignatura (`plancha:desarrollo:<asignatura>`). `parse` is defensive:
 * invalid data returns `null` instead of throwing. DOM wiring (reading/writing
 * storage, painting the buttons) lives in `DesarrolloQuestion.astro`'s
 * `<script>`; this is only the logic tested in isolation.
 */

const STORAGE_PREFIX = 'plancha:desarrollo:';

export type SelfAssessment = 'sabia' | 'medias' | 'no';

/** Persisted self-assessment state for an asignatura's desarrollo questions. */
export interface DesarrolloProgressState {
  /** article id ("d-<id>") -> self-assessment. */
  answers: Record<string, SelfAssessment>;
}

/** Counts derived from a state, for the summary panel. */
export interface DesarrolloSummary {
  sabia: number;
  medias: number;
  no: number;
  answered: number;
}

/** `localStorage` key for an asignatura's self-assessment state. */
export function keyFor(asignatura: string): string {
  return `${STORAGE_PREFIX}${asignatura}`;
}

export function serialize(state: DesarrolloProgressState): string {
  return JSON.stringify(state);
}

/** Defensive parse: `null` on invalid JSON, non-object, or an incomplete shape. */
export function parse(raw: string | null): DesarrolloProgressState | null {
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
  return { answers: v.answers as Record<string, SelfAssessment> };
}

/** Drops self-assessments whose id no longer exists in the current content. */
export function pruneAnswers(
  answers: Record<string, SelfAssessment>,
  validIds: string[],
): Record<string, SelfAssessment> {
  const valid = new Set(validIds);
  const out: Record<string, SelfAssessment> = {};
  for (const [id, assessment] of Object.entries(answers)) {
    if (valid.has(id)) out[id] = assessment;
  }
  return out;
}

export function summarize(state: DesarrolloProgressState): DesarrolloSummary {
  const values = Object.values(state.answers);
  return {
    sabia: values.filter((v) => v === 'sabia').length,
    medias: values.filter((v) => v === 'medias').length,
    no: values.filter((v) => v === 'no').length,
    answered: values.length,
  };
}
