import { describe, it, expect } from 'vitest';
import {
  isExportableKey,
  buildProgressExport,
  serializeProgressExport,
  parseProgressExport,
  type ProgressExport,
} from '../../src/lib/export-progress';

describe('isExportableKey()', () => {
  it('is true for any "plancha:"-prefixed key', () => {
    expect(isExportableKey('plancha:stats:si')).toBe(true);
    expect(isExportableKey('plancha:minimap-pins:practica-si')).toBe(true);
  });

  it('is false for unrelated keys', () => {
    expect(isExportableKey('site-theme')).toBe(false);
    expect(isExportableKey('some-other-key')).toBe(false);
  });
});

describe('buildProgressExport()', () => {
  it('keeps only "plancha:"-prefixed entries', () => {
    const result = buildProgressExport(
      {
        'plancha:stats:si': '{"questions":{}}',
        'plancha:desarrollo:si': '{"answers":{},"drafts":{}}',
        'site-theme': 'dark',
      },
      '2026-07-13T00:00:00.000Z',
    );
    expect(result).toEqual({
      version: 1,
      exportedAt: '2026-07-13T00:00:00.000Z',
      data: {
        'plancha:stats:si': '{"questions":{}}',
        'plancha:desarrollo:si': '{"answers":{},"drafts":{}}',
      },
    });
  });

  it('produces an empty data object when there is nothing exportable', () => {
    expect(buildProgressExport({ 'site-theme': 'light' }, '2026-07-13T00:00:00.000Z')).toEqual({
      version: 1,
      exportedAt: '2026-07-13T00:00:00.000Z',
      data: {},
    });
  });
});

describe('serializeProgressExport()/parseProgressExport()', () => {
  const sample: ProgressExport = {
    version: 1,
    exportedAt: '2026-07-13T00:00:00.000Z',
    data: { 'plancha:stats:si': '{"questions":{}}' },
  };

  it('round-trips an export', () => {
    expect(parseProgressExport(serializeProgressExport(sample))).toEqual(sample);
  });

  it('returns null for invalid JSON', () => {
    expect(parseProgressExport('{not json')).toBeNull();
  });

  it('returns null when the value is not an object', () => {
    expect(parseProgressExport('42')).toBeNull();
    expect(parseProgressExport('null')).toBeNull();
  });

  it('returns null when the shape is incomplete', () => {
    expect(parseProgressExport(JSON.stringify({ version: 1, data: {} }))).toBeNull(); // no exportedAt
    expect(parseProgressExport(JSON.stringify({ exportedAt: 'x', data: {} }))).toBeNull(); // no version
    expect(parseProgressExport(JSON.stringify({ version: 1, exportedAt: 'x' }))).toBeNull(); // no data
  });

  it('returns null when the version does not match', () => {
    expect(
      parseProgressExport(JSON.stringify({ version: 2, exportedAt: 'x', data: {} })),
    ).toBeNull();
  });

  it('returns null when a data value is not a string', () => {
    expect(
      parseProgressExport(
        JSON.stringify({ version: 1, exportedAt: 'x', data: { 'plancha:stats:si': 42 } }),
      ),
    ).toBeNull();
  });
});
