import { describe, it, expect } from 'vitest';
import { BASE } from '../../src/data/site';
import {
  buildSearchRecords,
  createSearcher,
  stripHtml,
  type BuildInput,
} from '../../src/lib/search';

const sample: BuildInput = {
  test: [
    {
      data: {
        id: '1',
        asignatura: 'dar',
        question: '¿Qué es un <b>socket</b>?',
        options: ['Un puerto', 'Un extremo de comunicación'],
        explicacion: 'Es un extremo de la comunicación bidireccional.',
      },
    },
  ],
  desarrollo: [
    {
      data: {
        id: '3',
        asignatura: 'dar',
        titulo: 'Concurrencia con hilos',
        enunciado: 'Explica la concurrencia.',
      },
      body: 'Un hilo es una unidad de ejecución.',
    },
  ],
  esquemas: [
    {
      data: { asignatura: 'si', tema: 'T2', titulo: 'Búsqueda heurística', clave: 'A*' },
      body: 'Algoritmos informados y no informados.',
    },
  ],
  guia: [
    { data: { asignatura: 'soa', chapter: 'ch0', titulo: 'Introducción' }, body: 'Conceptos.' },
  ],
  // El test de SOA vive dentro de la guía: enlaza al quiz, no a /practica.
};

describe('stripHtml', () => {
  it('elimina etiquetas y normaliza espacios', () => {
    expect(stripHtml('<p>Hola   <b>mundo</b></p>')).toBe('Hola mundo');
  });
  it('decodifica entidades comunes y devuelve cadena vacía si no hay entrada', () => {
    expect(stripHtml('a&amp;b')).toBe('a&b');
    expect(stripHtml(undefined)).toBe('');
  });
});

describe('buildSearchRecords', () => {
  const records = buildSearchRecords(sample);

  it('genera un registro por ítem más MongoDB', () => {
    // 1 test + 1 desarrollo + 1 esquema + 1 guía + mongodb = 5
    expect(records).toHaveLength(5);
  });

  it('mapea el test a práctica con deep-link a la pregunta y respeta BASE', () => {
    const r = records.find((x) => x.id === 'test-dar-1')!;
    expect(r.tipo).toBe('practica');
    expect(r.tipoLabel).toBe('Práctica de examen');
    expect(r.url).toBe(`${BASE}/practica/dar#q-1`);
    expect(r.titulo).toBe('¿Qué es un socket?'); // sin HTML
    expect(r.texto).toContain('extremo de comunicación'); // incluye opciones
  });

  it('enlaza el desarrollo a su ancla d-<id>', () => {
    const r = records.find((x) => x.id === 'dev-dar-3')!;
    expect(r.url).toBe(`${BASE}/practica/dar#d-3`);
    expect(r.titulo).toBe('Concurrencia con hilos');
    expect(r.texto).toContain('unidad de ejecución'); // incluye el cuerpo
  });

  it('mapea el esquema a teoría con ancla por tema', () => {
    const r = records.find((x) => x.id === 'esq-si-T2')!;
    expect(r.tipo).toBe('teoria');
    expect(r.tipoLabel).toBe('Esquema de estudio');
    expect(r.url).toBe(`${BASE}/esquemas/si#T2`);
  });

  it('mapea el capítulo de guía con ancla por slug de capítulo', () => {
    const r = records.find((x) => x.id === 'guia-soa-ch0')!;
    expect(r.tipoLabel).toBe('Guía de estudio');
    expect(r.url).toBe(`${BASE}/guia/soa#ch0`);
  });

  it('redirige el test de una asignatura con guía al quiz de la guía', () => {
    const withGuiaTest = buildSearchRecords({
      guia: [{ data: { asignatura: 'soa', chapter: 'ch0', titulo: 'Intro' } }],
      test: [{ data: { id: '5', asignatura: 'soa', question: 'Pregunta SOA' } }],
      includeMongo: false,
    });
    const r = withGuiaTest.find((x) => x.id === 'test-soa-5')!;
    expect(r.url).toBe(`${BASE}/guia/soa#soa-quiz`);
  });

  it('puede excluir MongoDB', () => {
    const r = buildSearchRecords({ ...sample, includeMongo: false });
    expect(r.find((x) => x.id === 'mongodb')).toBeUndefined();
  });
});

describe('createSearcher', () => {
  const searcher = createSearcher(buildSearchRecords(sample));

  it('casa por nombre/contenido y es insensible a mayúsculas', () => {
    const r = searcher.search('SOCKET');
    expect(r.some((x) => x.id === 'test-dar-1')).toBe(true);
  });

  it('es insensible a tildes', () => {
    const r = searcher.search('heuristica'); // sin tilde
    expect(r.some((x) => x.id === 'esq-si-T2')).toBe(true);
  });

  it('tolera una errata de tecleo', () => {
    const r = searcher.search('socet'); // errata de "socket"
    expect(r.some((x) => x.id === 'test-dar-1')).toBe(true);
  });

  it('respeta el límite de resultados', () => {
    const r = searcher.search('a', 1);
    expect(r.length).toBeLessThanOrEqual(1);
  });

  it('devuelve vacío para una consulta vacía', () => {
    expect(searcher.search('   ')).toEqual([]);
  });
});
