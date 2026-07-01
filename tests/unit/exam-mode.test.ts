import { describe, it, expect } from 'vitest';
import { createRng, shuffle } from '../../src/lib/exam-mode';

describe('createRng()', () => {
  it('produces the same sequence for the same seed', () => {
    const rngA = createRng(42);
    const rngB = createRng(42);
    const seqA = Array.from({ length: 5 }, () => rngA());
    const seqB = Array.from({ length: 5 }, () => rngB());
    expect(seqA).toEqual(seqB);
  });

  it('produces values in [0, 1)', () => {
    const rng = createRng(1);
    for (let i = 0; i < 20; i++) {
      const v = rng();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

describe('shuffle()', () => {
  it('is deterministic for the same seed', () => {
    const items = Array.from({ length: 20 }, (_, i) => i);
    const a = shuffle(items, createRng(7));
    const b = shuffle(items, createRng(7));
    expect(a).toEqual(b);
  });

  it('is a permutation: same size and same elements', () => {
    const items = Array.from({ length: 20 }, (_, i) => i);
    const shuffled = shuffle(items, createRng(7));
    expect(shuffled).toHaveLength(items.length);
    expect([...shuffled].sort((x, y) => x - y)).toEqual(items);
  });

  it('does not mutate the input array', () => {
    const items = [1, 2, 3, 4, 5];
    const copy = [...items];
    shuffle(items, createRng(3));
    expect(items).toEqual(copy);
  });

  it('produces a different order for a different seed (large enough sample)', () => {
    const items = Array.from({ length: 20 }, (_, i) => i);
    const a = shuffle(items, createRng(7));
    const b = shuffle(items, createRng(99));
    expect(a).not.toEqual(b);
  });
});
