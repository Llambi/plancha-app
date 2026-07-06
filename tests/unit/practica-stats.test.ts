import { describe, it, expect } from 'vitest';
import {
  statsKeyFor,
  serializeStats,
  parseStats,
  recordGrading,
  summarize,
  failedIds,
  pruneStats,
  formatStatsChip,
  type StatsState,
} from '../../src/lib/practica-stats';

const empty: StatsState = { questions: {} };

describe('formatStatsChip()', () => {
  it('is empty when nothing has been answered', () => {
    expect(formatStatsChip(null)).toBe('');
    expect(formatStatsChip(summarize(empty))).toBe('');
  });

  it('shows the rounded overall accuracy', () => {
    const state = recordGrading(recordGrading(empty, { q1: true, q2: false }), { q3: true });
    expect(formatStatsChip(summarize(state))).toBe('Acumulado: 67%');
  });
});

describe('statsKeyFor()', () => {
  it('namespaces the key by asignatura', () => {
    expect(statsKeyFor('si')).toBe('plancha:stats:si');
    expect(statsKeyFor('dar')).toBe('plancha:stats:dar');
  });
});

describe('serializeStats()/parseStats()', () => {
  it('round-trips a state', () => {
    const s = recordGrading(empty, { 'q-1': true, 'q-2': false });
    expect(parseStats(serializeStats(s))).toEqual(s);
  });

  it('returns null for null/empty/invalid input', () => {
    expect(parseStats(null)).toBeNull();
    expect(parseStats('')).toBeNull();
    expect(parseStats('{not json')).toBeNull();
    expect(parseStats('42')).toBeNull();
    expect(parseStats(JSON.stringify({ nope: 1 }))).toBeNull();
  });
});

describe('recordGrading()', () => {
  it('counts attempts and wrong, and tracks the last outcome', () => {
    const s = recordGrading(empty, { 'q-1': true, 'q-2': false });
    expect(s.questions['q-1']).toEqual({ attempts: 1, wrong: 0, lastWrong: false });
    expect(s.questions['q-2']).toEqual({ attempts: 1, wrong: 1, lastWrong: true });
  });

  it('clears lastWrong when a previously failed question is answered right', () => {
    let s = recordGrading(empty, { 'q-1': false });
    expect(s.questions['q-1']).toEqual({ attempts: 1, wrong: 1, lastWrong: true });
    s = recordGrading(s, { 'q-1': true });
    expect(s.questions['q-1']).toEqual({ attempts: 2, wrong: 1, lastWrong: false });
  });
});

describe('summarize()', () => {
  it('reports answered count and both accuracies', () => {
    // q-1 failed then passed (2 attempts, 1 wrong, lastWrong=false);
    // q-2 failed once (1 attempt, 1 wrong, lastWrong=true).
    let s = recordGrading(empty, { 'q-1': false, 'q-2': false });
    s = recordGrading(s, { 'q-1': true });
    const sum = summarize(s);
    expect(sum.answered).toBe(2);
    // Last attempt: only q-1 is currently right -> 1/2 = 50%.
    expect(sum.accuracyLast).toBeCloseTo(0.5);
    // Cumulative: 3 attempts, 2 wrong -> 1 correct / 3 = 33.3%.
    expect(sum.accuracyAll).toBeCloseTo(1 / 3);
  });

  it('ranks most-failed questions by cumulative wrong count', () => {
    let s = recordGrading(empty, { 'q-1': false, 'q-2': false });
    s = recordGrading(s, { 'q-2': false }); // q-2 failed twice
    const sum = summarize(s);
    expect(sum.mostFailed.map((m) => m.id)).toEqual(['q-2', 'q-1']);
    expect(sum.mostFailed[0]).toEqual({ id: 'q-2', wrong: 2 });
  });

  it('is empty for a fresh state', () => {
    const sum = summarize(empty);
    expect(sum).toEqual({ answered: 0, accuracyLast: 0, accuracyAll: 0, mostFailed: [] });
  });
});

describe('failedIds()', () => {
  it('returns only questions whose last attempt was wrong', () => {
    let s = recordGrading(empty, { 'q-1': false, 'q-2': false });
    s = recordGrading(s, { 'q-1': true });
    expect(failedIds(s).sort()).toEqual(['q-2']);
  });
});

describe('pruneStats()', () => {
  it('drops ids no longer present', () => {
    const s = recordGrading(empty, { 'q-1': true, 'q-99': false });
    expect(Object.keys(pruneStats(s, ['q-1']).questions)).toEqual(['q-1']);
  });
});
