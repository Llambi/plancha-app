/**
 * Configuración de marca y rutas del sitio (fuente única de verdad).
 * `BASE` debe coincidir con `base` en astro.config.mjs (lo importa de aquí).
 * Todos los enlaces internos se construyen con `BASE` para no romperse al
 * desplegarse bajo la subruta /plancha-app.
 */
export const SITE_NAME = 'PlanchaAPP';
export const BASE = '/plancha-app';
export const SITE = 'https://portfolio.llambi.dev';

/** Une BASE con una ruta interna garantizando una sola barra. */
export function url(path = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${p}`.replace(/\/{2,}/g, '/');
}

/** URL absoluta (SITE + BASE + ruta), para metadatos como og:url/og:image. */
export function canonicalUrl(path = '/'): string {
  return `${SITE}${url(path)}`;
}
