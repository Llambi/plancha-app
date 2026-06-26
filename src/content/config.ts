import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import type { Loader, LoaderContext } from 'astro/loaders';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

/** Códigos de asignatura admitidos en todo el sitio. */
const asignatura = z.enum(['dar', 'soa', 'si', 'cl', 'mongodb']);

/* -------------------------------------------------------------------------- */
/* Loader: un fichero YAML por asignatura, cada uno con un ARRAY de preguntas. */
/* Cada entrada se indexa como `${asignatura}-${id}`.                         */
/* -------------------------------------------------------------------------- */
function yamlBankLoader(dir: string): Loader {
  return {
    name: 'yaml-bank-loader',
    load: async ({ store, parseData, generateDigest, logger }: LoaderContext) => {
      const absDir = path.resolve(dir);
      store.clear();
      if (!fs.existsSync(absDir)) {
        logger.warn(`yamlBankLoader: no existe el directorio ${dir}`);
        return;
      }
      const files = fs
        .readdirSync(absDir)
        .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'));
      for (const file of files) {
        const raw = fs.readFileSync(path.join(absDir, file), 'utf-8');
        const parsed = yaml.load(raw);
        if (!Array.isArray(parsed)) {
          logger.warn(`yamlBankLoader: ${file} no es un array; se omite`);
          continue;
        }
        for (const item of parsed as Record<string, unknown>[]) {
          const rawId = item.id ?? item.asignatura;
          if (!rawId) {
            logger.warn(`yamlBankLoader: entrada sin id en ${file}; se omite`);
            continue;
          }
          const id = `${item.asignatura ?? path.parse(file).name}-${rawId}`;
          const data = await parseData({ id, data: item });
          store.set({ id, data, digest: generateDigest(data) });
        }
      }
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Colección: ESQUEMAS (Markdown + frontmatter; cuerpo = árbol en listas).     */
/* -------------------------------------------------------------------------- */
const esquemas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/esquemas' }),
  schema: z.object({
    asignatura,
    tema: z.string(), // p.ej. "T1"
    num: z.string(), // p.ej. "1"
    bloque: z.string().optional(),
    titulo: z.string(),
    clave: z.string(), // "idea fuerza"; admite HTML/markdown inline
    orden: z.number(),
  }),
});

/* -------------------------------------------------------------------------- */
/* Colección: TEST (YAML por asignatura; soporta single y multi).              */
/* -------------------------------------------------------------------------- */
const test = defineCollection({
  loader: yamlBankLoader('./src/content/test'),
  schema: z.object({
    id: z.string(),
    asignatura,
    tema: z.string().optional(),
    oficial: z.boolean().default(false),
    type: z.enum(['single', 'multi']),
    question: z.string(), // verbatim, puede contener HTML inline
    options: z.array(z.string()).min(2), // ORDEN ORIGINAL, verbatim
    correct: z.array(z.number().int().nonnegative()).min(1), // índices 0-based
    explicacion: z.string().optional(), // verbatim
    apariciones: z.number().int().optional(), // veces que salió en exámenes (SOA)
  }),
});

/* -------------------------------------------------------------------------- */
/* Colección: DESARROLLO (Markdown; cuerpo = respuesta modelo verbatim).       */
/* -------------------------------------------------------------------------- */
const desarrollo = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/desarrollo' }),
  schema: z.object({
    asignatura,
    id: z.string(),
    tema: z.string().optional(),
    titulo: z.string().optional(), // p.ej. para ejercicios prácticos
    kind: z.enum(['desarrollo', 'practico']).default('desarrollo'),
    enunciado: z.string(), // verbatim (puede contener HTML inline)
    orden: z.number(),
  }),
});

/* -------------------------------------------------------------------------- */
/* Colección: GUIA (capítulos de guía paginada; cuerpo = HTML VERBATIM).        */
/* Se renderiza con set:html (sin paso por markdown) para preservar el HTML.    */
/* -------------------------------------------------------------------------- */
const guia = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guia' }),
  schema: z.object({
    asignatura,
    chapter: z.string(), // p.ej. "ch0"
    num: z.string(), // etiqueta corta: "0", "C", "PS", "⚡"
    titulo: z.string(),
    badge: z.string().optional(),
    orden: z.number(),
  }),
});

export const collections = { esquemas, test, desarrollo, guia };
