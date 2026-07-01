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
