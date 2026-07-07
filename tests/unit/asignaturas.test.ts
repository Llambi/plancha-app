import { describe, it, expect } from 'vitest';
import { ASIGNATURAS, meta } from '../../src/data/asignaturas';
import { contrastRatio } from '../../src/lib/color-contrast';

describe('registro de asignaturas', () => {
  it('cada entrada tiene code coherente con su clave', () => {
    for (const [key, value] of Object.entries(ASIGNATURAS)) {
      expect(value.code).toBe(key);
      expect(value.nombre.length).toBeGreaterThan(0);
      expect(value.accent).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });

  // Issue #43: the DAR accent was #6C63FF (~4.32:1 with white), short of the
  // 4.5:1 AA threshold for the white bold text placed on it (badges, "on"
  // buttons, sigla).
  it('el acento de DAR cumple 4.5:1 de contraste con blanco', () => {
    expect(contrastRatio(ASIGNATURAS.dar.accent, '#ffffff')).toBeGreaterThanOrEqual(4.5);
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
