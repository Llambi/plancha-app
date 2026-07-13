/**
 * Self-assessment and draft answers for desarrollo questions — pure, testable
 * core, no DOM.
 *
 * Models a 3-state self-assessment per question ("sabia" | "medias" | "no")
 * plus the free-text draft the user is writing, and their (de)serialization
 * to `localStorage` under a key namespaced by asignatura
 * (`plancha:desarrollo:<asignatura>`). `parse` is defensive: invalid data
 * returns `null` instead of throwing; a missing `drafts` field (states
 * persisted before drafts existed) defaults to `{}`. DOM wiring
 * (reading/writing storage, painting the buttons, filling the textarea) lives
 * in `DesarrolloQuestion.astro`'s `<script>`; this is only the logic tested
 * in isolation.
 */

const STORAGE_PREFIX = 'plancha:desarrollo:';

export type SelfAssessment = 'sabia' | 'medias' | 'no';

/** Persisted self-assessment state for an asignatura's desarrollo questions. */
export interface DesarrolloProgressState {
  /** article id ("d-<id>") -> self-assessment. */
  answers: Record<string, SelfAssessment>;
  /** article id ("d-<id>") -> draft text typed by the user. */
  drafts: Record<string, string>;
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
  const drafts = typeof v.drafts === 'object' && v.drafts !== null ? v.drafts : {};
  return {
    answers: v.answers as Record<string, SelfAssessment>,
    drafts: drafts as Record<string, string>,
  };
}

/** Drops entries whose id no longer exists in the current content. */
function pruneById<T>(record: Record<string, T>, validIds: string[]): Record<string, T> {
  const valid = new Set(validIds);
  const out: Record<string, T> = {};
  for (const [id, value] of Object.entries(record)) {
    if (valid.has(id)) out[id] = value;
  }
  return out;
}

/** Drops self-assessments whose id no longer exists in the current content. */
export function pruneAnswers(
  answers: Record<string, SelfAssessment>,
  validIds: string[],
): Record<string, SelfAssessment> {
  return pruneById(answers, validIds);
}

/** Drops draft answers whose id no longer exists in the current content. */
export function pruneDrafts(
  drafts: Record<string, string>,
  validIds: string[],
): Record<string, string> {
  return pruneById(drafts, validIds);
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

/**
 * Compact one-line self-assessment for the collapsed panel; empty when nothing
 * has been self-assessed yet.
 */
export function formatDevChip(summary: DesarrolloSummary | null): string {
  if (!summary || summary.answered === 0) return '';
  return `Sabías ${summary.sabia} · A medias ${summary.medias} · No ${summary.no}`;
}

const REVIEW_RANK: Record<SelfAssessment | 'unassessed', number> = {
  no: 0,
  medias: 1,
  unassessed: 2,
  sabia: 3,
};

/**
 * Orders items to review what's least known first: "no" (didn't know it) <
 * "medias" (partially) < never assessed < "sabia" (already knew it). Stable
 * within each group — items with no other distinguishing data (e.g. no
 * "last reviewed" timestamp is kept) keep their original relative order.
 * Generic over `T` so it can sort DOM elements or plain ids alike; `idOf`
 * extracts the key looked up in `answers`.
 */
export function buildReviewOrder<T>(
  items: T[],
  idOf: (item: T) => string,
  answers: Record<string, SelfAssessment>,
): T[] {
  return [...items].sort(
    (a, b) =>
      REVIEW_RANK[answers[idOf(a)] ?? 'unassessed'] - REVIEW_RANK[answers[idOf(b)] ?? 'unassessed'],
  );
}
