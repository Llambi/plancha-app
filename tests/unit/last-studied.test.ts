import { describe, it, expect } from 'vitest';
import { keyFor, formatLastStudied } from '../../src/lib/last-studied';

describe('keyFor()', () => {
  it('namespaces the key by asignatura', () => {
    expect(keyFor('si')).toBe('plancha:last-studied:si');
    expect(keyFor('dar')).toBe('plancha:last-studied:dar');
  });
});

describe('formatLastStudied()', () => {
  const now = Date.parse('2026-07-13T12:00:00.000Z');

  it('is empty for a missing timestamp', () => {
    expect(formatLastStudied(null, now)).toBe('');
  });

  it('is empty for an invalid timestamp', () => {
    expect(formatLastStudied('not-a-date', now)).toBe('');
  });

  it('is empty when "now" is before the saved timestamp', () => {
    expect(formatLastStudied('2026-07-13T12:00:01.000Z', now)).toBe('');
  });

  it('shows "hace un momento" for under a minute', () => {
    expect(formatLastStudied('2026-07-13T11:59:30.000Z', now)).toBe('Estudiado hace un momento');
  });

  it('shows minutes, with correct singular/plural', () => {
    expect(formatLastStudied('2026-07-13T11:59:00.000Z', now)).toBe('Estudiado hace 1 minuto');
    expect(formatLastStudied('2026-07-13T11:55:00.000Z', now)).toBe('Estudiado hace 5 minutos');
  });

  it('shows hours, with correct singular/plural', () => {
    expect(formatLastStudied('2026-07-13T11:00:00.000Z', now)).toBe('Estudiado hace 1 hora');
    expect(formatLastStudied('2026-07-13T09:00:00.000Z', now)).toBe('Estudiado hace 3 horas');
  });

  it('shows days, with correct singular/plural', () => {
    expect(formatLastStudied('2026-07-12T12:00:00.000Z', now)).toBe('Estudiado hace 1 día');
    expect(formatLastStudied('2026-07-10T12:00:00.000Z', now)).toBe('Estudiado hace 3 días');
  });

  it('shows months, with correct singular/plural', () => {
    expect(formatLastStudied('2026-06-13T12:00:00.000Z', now)).toBe('Estudiado hace 1 mes');
    expect(formatLastStudied('2026-04-13T12:00:00.000Z', now)).toBe('Estudiado hace 3 meses');
  });

  it('shows years, with correct singular/plural', () => {
    expect(formatLastStudied('2025-07-13T12:00:00.000Z', now)).toBe('Estudiado hace 1 año');
    expect(formatLastStudied('2023-07-13T12:00:00.000Z', now)).toBe('Estudiado hace 3 años');
  });
});
