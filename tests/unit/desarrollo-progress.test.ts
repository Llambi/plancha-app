import { describe, it, expect } from 'vitest';
import {
  keyFor,
  serialize,
  parse,
  pruneAnswers,
  pruneDrafts,
  summarize,
  formatDevChip,
  type DesarrolloProgressState,
} from '../../src/lib/desarrollo-progress';

const sample: DesarrolloProgressState = {
  answers: { 'd-q1': 'sabia', 'd-q2': 'medias', 'd-q3': 'no' },
  drafts: { 'd-q1': 'mi respuesta' },
};

describe('formatDevChip()', () => {
  it('is empty when nothing has been self-assessed', () => {
    expect(formatDevChip(null)).toBe('');
    expect(formatDevChip(summarize({ answers: {}, drafts: {} }))).toBe('');
  });

  it('shows the three self-assessment counts', () => {
    expect(formatDevChip(summarize(sample))).toBe('Sabías 1 · A medias 1 · No 1');
  });
});

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

  it('defaults a missing drafts field to {} (backward-compat with pre-existing states)', () => {
    const legacy = { answers: { 'd-q1': 'sabia' } };
    expect(parse(JSON.stringify(legacy))).toEqual({ answers: { 'd-q1': 'sabia' }, drafts: {} });
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

describe('pruneDrafts()', () => {
  it('drops ids no longer present and keeps the valid ones', () => {
    const drafts: DesarrolloProgressState['drafts'] = {
      'd-q1': 'respuesta 1',
      'd-q2': 'respuesta 2',
      'd-q99': 'respuesta huerfana',
    };
    expect(pruneDrafts(drafts, ['d-q1', 'd-q2'])).toEqual({
      'd-q1': 'respuesta 1',
      'd-q2': 'respuesta 2',
    });
  });

  it('returns an empty object when nothing is valid', () => {
    expect(pruneDrafts({ 'd-q99': 'respuesta' }, ['d-q1'])).toEqual({});
  });
});

describe('summarize()', () => {
  it('counts sabia/medias/no and the total assessed', () => {
    expect(summarize(sample)).toEqual({ sabia: 1, medias: 1, no: 1, answered: 3 });
  });

  it('returns all zeros for an empty state', () => {
    expect(summarize({ answers: {}, drafts: {} })).toEqual({
      sabia: 0,
      medias: 0,
      no: 0,
      answered: 0,
    });
  });
});
