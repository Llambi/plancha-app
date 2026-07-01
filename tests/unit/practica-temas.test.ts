import { describe, it, expect } from 'vitest';
import { uniqueTemas } from '../../src/lib/practica-temas';

describe('uniqueTemas()', () => {
  it('dedupes repeated temas', () => {
    expect(uniqueTemas(['T1', 'T2', 'T1', 'T2', 'T1'])).toEqual(['T1', 'T2']);
  });

  it('sorts naturally ("Tema 2" before "Tema 10")', () => {
    expect(uniqueTemas(['Tema 10', 'Tema 2', 'Tema 1'])).toEqual(['Tema 1', 'Tema 2', 'Tema 10']);
  });

  it('sorts naturally for "T1".."T10"-style temas', () => {
    expect(uniqueTemas(['T10', 'T2', 'T1'])).toEqual(['T1', 'T2', 'T10']);
  });

  it('ignores undefined and empty values', () => {
    expect(uniqueTemas(['T1', undefined, '', 'T2', undefined])).toEqual(['T1', 'T2']);
  });

  it('returns an empty array when no question has a tema (graceful degradation)', () => {
    expect(uniqueTemas([undefined, undefined])).toEqual([]);
    expect(uniqueTemas([])).toEqual([]);
  });
});
