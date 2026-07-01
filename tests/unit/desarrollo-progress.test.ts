import { describe, it, expect } from 'vitest';
import {
  keyFor,
  serialize,
  parse,
  pruneAnswers,
  summarize,
  type DesarrolloProgressState,
} from '../../src/lib/desarrollo-progress';

const sample: DesarrolloProgressState = {
  answers: { 'd-q1': 'sabia', 'd-q2': 'medias', 'd-q3': 'no' },
};

describe('keyFor()', () => {
  it('namespaces the key by asignatura', () => {
    expect(keyFor('si')).toBe('plancha:desarrollo:si');
    expect(keyFor('dar')).toBe('plancha:desarrollo:dar');
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
    expect(parse(JSON.stringify({}))).toBeNull(); // no answers
  });
});

describe('pruneAnswers()', () => {
  it('drops ids no longer present and keeps the valid ones', () => {
    const answers: DesarrolloProgressState['answers'] = {
      'd-q1': 'sabia',
      'd-q2': 'medias',
      'd-q99': 'no',
    };
    expect(pruneAnswers(answers, ['d-q1', 'd-q2'])).toEqual({ 'd-q1': 'sabia', 'd-q2': 'medias' });
  });

  it('returns an empty object when nothing is valid', () => {
    expect(pruneAnswers({ 'd-q99': 'sabia' }, ['d-q1'])).toEqual({});
  });
});

describe('summarize()', () => {
  it('counts sabia/medias/no and the total assessed', () => {
    expect(summarize(sample)).toEqual({ sabia: 1, medias: 1, no: 1, answered: 3 });
  });

  it('returns all zeros for an empty state', () => {
    expect(summarize({ answers: {} })).toEqual({ sabia: 0, medias: 0, no: 0, answered: 0 });
  });
});
