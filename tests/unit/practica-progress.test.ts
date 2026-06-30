import { describe, it, expect } from 'vitest';
import {
  keyFor,
  serialize,
  parse,
  pruneAnswers,
  type ProgressState,
} from '../../src/lib/practica-progress';

const sample: ProgressState = {
  answers: { 'q-1': [0], 'q-2': [1, 3] },
  graded: true,
  score: 1,
  total: 2,
};

describe('keyFor()', () => {
  it('namespaces the key by asignatura', () => {
    expect(keyFor('si')).toBe('plancha:practica:si');
    expect(keyFor('dar')).toBe('plancha:practica:dar');
  });
});

describe('serialize()/parse()', () => {
  it('round-trips a state', () => {
    expect(parse(serialize(sample))).toEqual(sample);
  });

  it('returns null for null/empty input', () => {
    expect(parse(null)).toBeNull();
    expect(parse('')).toBeNull();
  });

  it('returns null for invalid JSON', () => {
    expect(parse('{not json')).toBeNull();
  });

  it('returns null when the value is not an object', () => {
    expect(parse('42')).toBeNull();
    expect(parse('"x"')).toBeNull();
    expect(parse('null')).toBeNull();
  });

  it('returns null when the shape is incomplete', () => {
    expect(parse(JSON.stringify({ graded: true, score: 0, total: 0 }))).toBeNull(); // no answers
    expect(parse(JSON.stringify({ answers: {} }))).toBeNull(); // no graded
  });
});

describe('pruneAnswers()', () => {
  it('drops ids no longer present and keeps the valid ones', () => {
    const answers = { 'q-1': [0], 'q-2': [1], 'q-99': [2] };
    expect(pruneAnswers(answers, ['q-1', 'q-2'])).toEqual({ 'q-1': [0], 'q-2': [1] });
  });

  it('returns an empty object when nothing is valid', () => {
    expect(pruneAnswers({ 'q-99': [0] }, ['q-1'])).toEqual({});
  });
});
