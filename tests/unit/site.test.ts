import { describe, it, expect } from 'vitest';
import { BASE, url } from '../../src/data/site';

describe('url()', () => {
  it('antepone BASE a una ruta absoluta', () => {
    expect(url('/esquemas')).toBe(`${BASE}/esquemas`);
  });

  it('normaliza rutas sin barra inicial', () => {
    expect(url('practica')).toBe(`${BASE}/practica`);
  });

  it('colapsa barras duplicadas', () => {
    expect(url('//guia')).toBe(`${BASE}/guia`);
  });

  it('devuelve BASE para la raíz por defecto', () => {
    expect(url()).toBe(`${BASE}/`);
  });
});
