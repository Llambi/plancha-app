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
