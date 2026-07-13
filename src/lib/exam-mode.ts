/**
 * Exam mode — pure, testable core, no DOM.
 *
 * A seeded PRNG lets the DOM wiring (in the práctica page) vary the review
 * order/subset on each real run, while unit tests use a fixed seed for
 * deterministic assertions. `shuffle` reorders questions between them; it
 * never touches the `options` inside a question (that would invalidate the
 * `correct` indices — see the content constitution).
 */

/** Seeded PRNG (mulberry32): same seed -> same sequence of values in [0, 1). */
export function createRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher–Yates shuffle. Does not mutate the input. */
export function shuffle<T>(items: T[], rng: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Picks `n` distinct items at random, `n` clamped to `[0, items.length]`.
 * Preserves the original relative order of the chosen items (selection only,
 * no reordering — `buildExamOrder` applies `shuffle` on top when asked).
 */
export function pickSubset<T>(items: T[], n: number, rng: () => number): T[] {
  const clamped = Math.max(0, Math.min(n, items.length));
  const indices = shuffle(
    items.map((_, i) => i),
    rng,
  )
    .slice(0, clamped)
    .sort((a, b) => a - b);
  return indices.map((i) => items[i]);
}

/** Options for `buildExamOrder`: `subsetSize: null` means "all items". */
export interface ExamOrderOptions {
  shuffle: boolean;
  subsetSize: number | null;
}

/** Combines subset selection and shuffling into the final review order. */
export function buildExamOrder<T>(items: T[], options: ExamOrderOptions, rng: () => number): T[] {
  const subset = options.subsetSize == null ? items : pickSubset(items, options.subsetSize, rng);
  return options.shuffle ? shuffle(subset, rng) : subset;
}

const EXAM_CONFIG_PREFIX = 'plancha:exam:';

/** Persisted exam-mode settings for an asignatura (not the in-progress run). */
export interface ExamConfig {
  shuffle: boolean;
  /** null means "all questions" (no subset limit). */
  subsetSize: number | null;
  timed: boolean;
  minutes: number;
}

/**
 * One-line summary of a saved exam config, for the collapsed panel. Lists only
 * the active options (`barajado`, `N preguntas`, `M min`); empty when there is
 * no saved config or nothing is enabled.
 */
export function formatExamConfigSummary(config: ExamConfig | null): string {
  if (!config) return '';
  const parts: string[] = [];
  if (config.shuffle) parts.push('barajado');
  if (config.subsetSize != null) parts.push(`${config.subsetSize} preguntas`);
  if (config.timed) parts.push(`${config.minutes} min`);
  return parts.join(' · ');
}

/** `localStorage` key for an asignatura's exam-mode config. */
export function examConfigKeyFor(asignatura: string): string {
  return `${EXAM_CONFIG_PREFIX}${asignatura}`;
}

export function serializeExamConfig(config: ExamConfig): string {
  return JSON.stringify(config);
}

/** Defensive parse: `null` on invalid JSON, non-object, or an incomplete shape. */
export function parseExamConfig(raw: string | null): ExamConfig | null {
  if (!raw) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof value !== 'object' || value === null) return null;
  const v = value as Record<string, unknown>;
  if (typeof v.shuffle !== 'boolean') return null;
  if (typeof v.timed !== 'boolean') return null;
  if (typeof v.minutes !== 'number') return null;
  if (v.subsetSize !== null && typeof v.subsetSize !== 'number') return null;
  return {
    shuffle: v.shuffle,
    subsetSize: (v.subsetSize as number | null) ?? null,
    timed: v.timed,
    minutes: v.minutes,
  };
}

/**
 * A reproducible simulacro: the seed plus the config that produced its order
 * (see `buildExamOrder`/`createRng`). Shared as URL search params so opening
 * the same URL — in any browser — reproduces the exact same run (issue #54).
 */
export interface SharedExamState {
  seed: number;
  shuffle: boolean;
  subsetSize: number | null;
  timed: boolean;
  minutes: number;
}

/** Encodes a shared exam state as URL search params. */
export function serializeSharedExam(state: SharedExamState): URLSearchParams {
  const params = new URLSearchParams();
  params.set('exam', String(state.seed));
  if (state.shuffle) params.set('shuffle', '1');
  if (state.subsetSize != null) params.set('subset', String(state.subsetSize));
  if (state.timed) {
    params.set('timed', '1');
    params.set('min', String(state.minutes));
  }
  return params;
}

/** Defensive parse: `null` when there's no `exam` param or its seed isn't a finite number. */
export function parseSharedExam(params: URLSearchParams): SharedExamState | null {
  const rawSeed = params.get('exam');
  if (rawSeed === null) return null;
  const seed = Number(rawSeed);
  if (!Number.isFinite(seed)) return null;
  const rawSubset = params.get('subset');
  const subsetSize =
    rawSubset !== null && Number.isFinite(Number(rawSubset)) ? Number(rawSubset) : null;
  const timed = params.get('timed') === '1';
  const rawMinutes = Number(params.get('min'));
  return {
    seed,
    shuffle: params.get('shuffle') === '1',
    subsetSize,
    timed,
    minutes: timed && Number.isFinite(rawMinutes) ? rawMinutes : 20,
  };
}
