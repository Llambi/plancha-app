import { describe, it, expect } from 'vitest';
import { BASE, SITE, url, canonicalUrl } from '../../src/data/site';

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

describe('canonicalUrl()', () => {
  it('devuelve la URL absoluta (SITE + BASE + ruta)', () => {
    expect(canonicalUrl('/practica/si')).toBe(`${SITE}${BASE}/practica/si`);
  });

  it('devuelve la raíz absoluta por defecto', () => {
    expect(canonicalUrl()).toBe(`${SITE}${BASE}/`);
    expect(canonicalUrl('/')).toBe(`${SITE}${BASE}/`);
  });
});
