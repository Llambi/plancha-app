/**
 * Índice de búsqueda generado en build.
 * Reúne las colecciones de contenido y emite los registros indexables como JSON
 * estático en `/plancha-app/search-index.json`. El cliente (SearchBox, /buscar)
 * lo carga de forma perezosa y busca con Fuse.js (ver `src/lib/search.ts`).
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildSearchRecords } from '../lib/search';

export const GET: APIRoute = async () => {
  const [test, desarrollo, esquemas, guia] = await Promise.all([
    getCollection('test'),
    getCollection('desarrollo'),
    getCollection('esquemas'),
    getCollection('guia'),
  ]);

  const records = buildSearchRecords({ test, desarrollo, esquemas, guia });

  return new Response(JSON.stringify(records), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
