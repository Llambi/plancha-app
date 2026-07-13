import { describe, it, expect } from 'vitest';
import {
  createRng,
  shuffle,
  pickSubset,
  buildExamOrder,
  examConfigKeyFor,
  serializeExamConfig,
  parseExamConfig,
  formatExamConfigSummary,
  serializeSharedExam,
  parseSharedExam,
  type ExamConfig,
  type SharedExamState,
} from '../../src/lib/exam-mode';

describe('formatExamConfigSummary()', () => {
  it('is empty for a null config or all options off', () => {
    expect(formatExamConfigSummary(null)).toBe('');
    expect(
      formatExamConfigSummary({ shuffle: false, subsetSize: null, timed: false, minutes: 20 }),
    ).toBe('');
  });

  it('lists only the active options, in order', () => {
    expect(
      formatExamConfigSummary({ shuffle: true, subsetSize: 5, timed: true, minutes: 15 }),
    ).toBe('barajado · 5 preguntas · 15 min');
    expect(
      formatExamConfigSummary({ shuffle: false, subsetSize: null, timed: true, minutes: 20 }),
    ).toBe('20 min');
    expect(
      formatExamConfigSummary({ shuffle: true, subsetSize: null, timed: false, minutes: 20 }),
    ).toBe('barajado');
  });
});

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

describe('pickSubset()', () => {
  it('returns exactly n distinct elements from the input', () => {
    const items = Array.from({ length: 20 }, (_, i) => i);
    const picked = pickSubset(items, 5, createRng(7));
    expect(picked).toHaveLength(5);
    expect(new Set(picked).size).toBe(5);
    for (const p of picked) expect(items).toContain(p);
  });

  it('clamps n to [0, total]', () => {
    const items = [1, 2, 3];
    expect(pickSubset(items, -2, createRng(1))).toHaveLength(0);
    expect(pickSubset(items, 99, createRng(1))).toHaveLength(3);
  });

  it('is deterministic for the same seed', () => {
    const items = Array.from({ length: 20 }, (_, i) => i);
    const a = pickSubset(items, 6, createRng(7));
    const b = pickSubset(items, 6, createRng(7));
    expect(a).toEqual(b);
  });
});

describe('buildExamOrder()', () => {
  it('with shuffle: false keeps the original relative order of the chosen subset', () => {
    const items = Array.from({ length: 20 }, (_, i) => i);
    const order = buildExamOrder(items, { shuffle: false, subsetSize: 6 }, createRng(7));
    const sorted = [...order].sort((a, b) => a - b);
    expect(order).toEqual(sorted);
  });

  it('with subsetSize: null keeps all items', () => {
    const items = Array.from({ length: 5 }, (_, i) => i);
    const order = buildExamOrder(items, { shuffle: false, subsetSize: null }, createRng(7));
    expect(order).toEqual(items);
  });

  it('with shuffle: true and a subset returns that many distinct items', () => {
    const items = Array.from({ length: 20 }, (_, i) => i);
    const order = buildExamOrder(items, { shuffle: true, subsetSize: 6 }, createRng(7));
    expect(order).toHaveLength(6);
    expect(new Set(order).size).toBe(6);
    for (const p of order) expect(items).toContain(p);
  });
});

const sampleConfig: ExamConfig = { shuffle: true, subsetSize: 10, timed: true, minutes: 20 };

describe('examConfigKeyFor()', () => {
  it('namespaces the key by asignatura', () => {
    expect(examConfigKeyFor('si')).toBe('plancha:exam:si');
    expect(examConfigKeyFor('dar')).toBe('plancha:exam:dar');
  });
});

describe('serializeExamConfig()/parseExamConfig()', () => {
  it('round-trips a config', () => {
    expect(parseExamConfig(serializeExamConfig(sampleConfig))).toEqual(sampleConfig);
  });

  it('round-trips subsetSize: null', () => {
    const config: ExamConfig = { ...sampleConfig, subsetSize: null };
    expect(parseExamConfig(serializeExamConfig(config))).toEqual(config);
  });

  it('returns null for null/empty input', () => {
    expect(parseExamConfig(null)).toBeNull();
    expect(parseExamConfig('')).toBeNull();
  });

  it('returns null for invalid JSON', () => {
    expect(parseExamConfig('{not json')).toBeNull();
  });

  it('returns null when the value is not an object', () => {
    expect(parseExamConfig('42')).toBeNull();
    expect(parseExamConfig('null')).toBeNull();
  });

  it('returns null when the shape is incomplete', () => {
    expect(parseExamConfig(JSON.stringify({ shuffle: true, timed: true }))).toBeNull(); // no minutes
    expect(
      parseExamConfig(JSON.stringify({ shuffle: true, subsetSize: null, minutes: 20 })),
    ).toBeNull(); // no timed
  });
});

describe('serializeSharedExam()/parseSharedExam()', () => {
  const sampleShared: SharedExamState = {
    seed: 123456789,
    shuffle: true,
    subsetSize: 5,
    timed: true,
    minutes: 15,
  };

  it('round-trips a shared exam state', () => {
    expect(parseSharedExam(serializeSharedExam(sampleShared))).toEqual(sampleShared);
  });

  it('round-trips subsetSize: null and shuffle/timed: false', () => {
    const state: SharedExamState = {
      seed: 1,
      shuffle: false,
      subsetSize: null,
      timed: false,
      minutes: 20,
    };
    expect(parseSharedExam(serializeSharedExam(state))).toEqual(state);
  });

  it('returns null when there is no "exam" param', () => {
    expect(parseSharedExam(new URLSearchParams('tipo=practica'))).toBeNull();
  });

  it('returns null when the seed is not a finite number', () => {
    expect(parseSharedExam(new URLSearchParams('exam=not-a-number'))).toBeNull();
  });

  it('defaults shuffle/timed to false and subsetSize to null when absent', () => {
    expect(parseSharedExam(new URLSearchParams('exam=42'))).toEqual({
      seed: 42,
      shuffle: false,
      subsetSize: null,
      timed: false,
      minutes: 20,
    });
  });
});
