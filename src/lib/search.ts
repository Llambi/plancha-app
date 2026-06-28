/**
 * Núcleo de búsqueda de PlanchaAPP — puro y testeable, sin dependencias de Astro.
 *
 * `buildSearchRecords` transforma las colecciones de contenido en registros
 * indexables (un registro por ítem: pregunta, esquema, capítulo de guía…), cada
 * uno con su deep-link. `createSearcher` envuelve Fuse.js para casar por nombre,
 * descripción y contenido de forma insensible a tildes/mayúsculas y tolerante a
 * erratas. El índice se sirve como JSON estático (ver `pages/search-index.json.ts`)
 * y se consume en cliente (SearchBox, página /buscar).
 */
import Fuse from 'fuse.js';
import { meta } from '../data/asignaturas';
import { url } from '../data/site';

export type Tipo = 'practica' | 'teoria';

/** Un ítem indexable del sitio. */
export interface SearchRecord {
  id: string;
  asignatura: string;
  asignaturaNombre: string;
  sigla: string;
  accent: string;
  tipo: Tipo;
  tipoLabel: string;
  titulo: string;
  texto: string;
  url: string;
}

/* --- Formas mínimas de las entradas de colección (desacopladas de Astro) --- */
interface TestData {
  id: string;
  asignatura: string;
  question: string;
  options?: string[];
  explicacion?: string;
}
interface DesarrolloData {
  id: string;
  asignatura: string;
  titulo?: string;
  enunciado: string;
}
interface EsquemaData {
  asignatura: string;
  tema: string;
  titulo: string;
  clave: string;
}
interface GuiaData {
  asignatura: string;
  chapter: string;
  titulo: string;
}
interface Entry<D> {
  data: D;
  body?: string;
}

export interface BuildInput {
  test?: Entry<TestData>[];
  desarrollo?: Entry<DesarrolloData>[];
  esquemas?: Entry<EsquemaData>[];
  guia?: Entry<GuiaData>[];
  /** Incluye la práctica interactiva de MongoDB (página única). Por defecto, sí. */
  includeMongo?: boolean;
}

const LABEL = {
  practica: 'Práctica de examen',
  esquema: 'Esquema de estudio',
  guia: 'Guía de estudio',
} as const;

/** Quita etiquetas/entidades HTML y normaliza espacios (solo para indexar). */
export function stripHtml(input?: string): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#?[a-z0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([?!.,;:)])/g, '$1') // sin espacio antes de puntuación de cierre
    .trim();
}

/** Construye los registros indexables a partir de las colecciones. */
export function buildSearchRecords(input: BuildInput): SearchRecord[] {
  const { test = [], desarrollo = [], esquemas = [], guia = [], includeMongo = true } = input;
  // Las asignaturas con guía exponen su test dentro de la guía (no en /practica).
  const guiaCodes = new Set(guia.map((g) => g.data.asignatura));
  const records: SearchRecord[] = [];

  const head = (code: string) => {
    const m = meta(code);
    return {
      asignatura: code,
      asignaturaNombre: m.nombre,
      sigla: m.sigla,
      accent: m.accent,
    };
  };

  for (const { data: d } of test) {
    const href = guiaCodes.has(d.asignatura)
      ? url(`/guia/${d.asignatura}#soa-quiz`)
      : url(`/practica/${d.asignatura}#q-${d.id}`);
    records.push({
      id: `test-${d.asignatura}-${d.id}`,
      ...head(d.asignatura),
      tipo: 'practica',
      tipoLabel: LABEL.practica,
      titulo: stripHtml(d.question),
      texto: stripHtml([d.question, ...(d.options ?? []), d.explicacion].filter(Boolean).join(' ')),
      url: href,
    });
  }

  for (const { data: d, body } of desarrollo) {
    records.push({
      id: `dev-${d.asignatura}-${d.id}`,
      ...head(d.asignatura),
      tipo: 'practica',
      tipoLabel: LABEL.practica,
      titulo: stripHtml(d.titulo || d.enunciado),
      texto: stripHtml([d.enunciado, body].filter(Boolean).join(' ')),
      url: url(`/practica/${d.asignatura}#d-${d.id}`),
    });
  }

  for (const { data: d, body } of esquemas) {
    records.push({
      id: `esq-${d.asignatura}-${d.tema}`,
      ...head(d.asignatura),
      tipo: 'teoria',
      tipoLabel: LABEL.esquema,
      titulo: d.titulo,
      texto: stripHtml([d.titulo, d.clave, body].filter(Boolean).join(' ')),
      url: url(`/esquemas/${d.asignatura}#${d.tema}`),
    });
  }

  for (const { data: d, body } of guia) {
    records.push({
      id: `guia-${d.asignatura}-${d.chapter}`,
      ...head(d.asignatura),
      tipo: 'teoria',
      tipoLabel: LABEL.guia,
      titulo: d.titulo,
      texto: stripHtml([d.titulo, body].filter(Boolean).join(' ')),
      url: url(`/guia/${d.asignatura}#${d.chapter}`),
    });
  }

  if (includeMongo) {
    records.push({
      id: 'mongodb',
      ...head('mongodb'),
      tipo: 'practica',
      tipoLabel: LABEL.practica,
      titulo: 'Práctica de MongoDB',
      texto: 'MongoDB consultas queries find aggregate práctica validador ejercicios tipo examen',
      url: url('/practica/mongodb'),
    });
  }

  return records;
}

export interface Searcher {
  /** Devuelve los registros que casan, ordenados por relevancia. */
  search(query: string, limit?: number): SearchRecord[];
}

/** Crea un buscador Fuse.js sobre los registros dados. */
export function createSearcher(records: SearchRecord[]): Searcher {
  const fuse = new Fuse(records, {
    keys: [
      { name: 'titulo', weight: 0.6 },
      { name: 'asignaturaNombre', weight: 0.3 },
      { name: 'sigla', weight: 0.2 },
      { name: 'texto', weight: 0.2 },
    ],
    ignoreDiacritics: true,
    ignoreLocation: true,
    includeScore: true,
    threshold: 0.4,
    minMatchCharLength: 2,
  });

  return {
    search(query, limit) {
      const q = query.trim();
      if (!q) return [];
      const results = limit ? fuse.search(q, { limit }) : fuse.search(q);
      return results.map((r) => r.item);
    },
  };
}
