import { describe, it, expect } from 'vitest';
import { ASIGNATURAS, meta } from '../../src/data/asignaturas';

describe('registro de asignaturas', () => {
  it('cada entrada tiene code coherente con su clave', () => {
    for (const [key, value] of Object.entries(ASIGNATURAS)) {
      expect(value.code).toBe(key);
      expect(value.nombre.length).toBeGreaterThan(0);
      expect(value.accent).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });
});

describe('meta()', () => {
  it('devuelve los metadatos de una asignatura conocida', () => {
    expect(meta('soa').sigla).toBe('SOA');
  });

  it('genera un fallback razonable para una asignatura desconocida', () => {
    const m = meta('xyz');
    expect(m.code).toBe('xyz');
    expect(m.sigla).toBe('XYZ');
    expect(m.accent).toMatch(/^#[0-9a-fA-F]{6}$/);
  });
});
