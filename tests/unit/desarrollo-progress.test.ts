import { describe, it, expect } from 'vitest';
import {
  keyFor,
  serialize,
  parse,
  pruneAnswers,
  pruneDrafts,
  summarize,
  formatDevChip,
  buildReviewOrder,
  clearAnswer,
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

describe('buildReviewOrder()', () => {
  const idOf = (id: string) => id;

  it('orders "no" before "medias", unassessed, then "sabia"', () => {
    const items = ['d-q1', 'd-q2', 'd-q3', 'd-q4'];
    const answers: DesarrolloProgressState['answers'] = {
      'd-q1': 'sabia',
      'd-q2': 'no',
      'd-q3': 'medias',
      // d-q4 never assessed
    };
    expect(buildReviewOrder(items, idOf, answers)).toEqual(['d-q2', 'd-q3', 'd-q4', 'd-q1']);
  });

  it('keeps the original relative order within the same priority group (stable)', () => {
    const items = ['d-q1', 'd-q2', 'd-q3'];
    const answers: DesarrolloProgressState['answers'] = {
      'd-q1': 'no',
      'd-q2': 'no',
      'd-q3': 'no',
    };
    expect(buildReviewOrder(items, idOf, answers)).toEqual(['d-q1', 'd-q2', 'd-q3']);
  });

  it('leaves the input order unchanged when nothing has been assessed', () => {
    const items = ['d-q1', 'd-q2', 'd-q3'];
    expect(buildReviewOrder(items, idOf, {})).toEqual(items);
  });

  it('works with non-string items via a custom idOf', () => {
    const items = [{ id: 'd-q1' }, { id: 'd-q2' }];
    const answers: DesarrolloProgressState['answers'] = { 'd-q2': 'no' };
    expect(buildReviewOrder(items, (i) => i.id, answers)).toEqual([{ id: 'd-q2' }, { id: 'd-q1' }]);
  });
});

describe('clearAnswer() (issue #59)', () => {
  it('removes both the self-assessment and the draft for the given question', () => {
    const cleared = clearAnswer(sample, 'd-q1');
    expect(cleared.answers).toEqual({ 'd-q2': 'medias', 'd-q3': 'no' });
    expect(cleared.drafts).toEqual({});
  });

  it('leaves other questions untouched', () => {
    const cleared = clearAnswer(sample, 'd-q2');
    expect(cleared.answers).toEqual({ 'd-q1': 'sabia', 'd-q3': 'no' });
    expect(cleared.drafts).toEqual({ 'd-q1': 'mi respuesta' });
  });

  it('is a no-op when the question had neither an answer nor a draft', () => {
    const cleared = clearAnswer(sample, 'd-q99');
    expect(cleared).toEqual(sample);
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
