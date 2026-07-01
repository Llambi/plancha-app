# Spec — SEO y metadatos: Open Graph, sitemap y favicon real

- **Issue**: #13 · https://github.com/Llambi/plancha-app/issues/13
- **Estado**: borrador
- **Autor**: Claude Code (a petición del usuario)
- **Fecha**: 2026-07-01

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

`src/layouts/BaseLayout.astro` no emite Open Graph/Twitter Card, no hay
sitemap, y el favicon es un placeholder vacío (`href="data:,"`). El sitio se
comparte y se indexa peor de lo que podría con una mejora barata.

## Resultado esperado

Toda página que usa `BaseLayout` emite metadatos Open Graph y Twitter Card
(título, descripción) coherentes con su `title`/`description` ya existentes,
un favicon real visible en la pestaña del navegador, y el build genera un
sitemap correcto bajo `/plancha-app`. Nada de esto rompe el despliegue bajo
el base path.

## Criterios de aceptación

1. **Dado** cualquier página con `BaseLayout`, **cuando** se inspecciona su
   `<head>`, **entonces** incluye `og:title`, `og:description`, `og:type`,
   `og:url` y las equivalentes `twitter:card`/`twitter:title`/
   `twitter:description`, derivadas de las props `title`/`description` ya
   existentes (sin hardcodear rutas absolutas; `og:url` usa `SITE`+`BASE`).
2. **Dado** el build (`npm run build`), **cuando** termina, **entonces** genera
   un sitemap (`@astrojs/sitemap`) cuyas URLs incluyen el subpath
   `/plancha-app` y es accesible sirviendo `dist/` (p. ej. bajo
   `/plancha-app/sitemap-index.xml`).
3. **Dado** el `<link rel="icon">` de `BaseLayout`, **cuando** se carga
   cualquier página, **entonces** apunta a un favicon real (no `data:,`),
   referenciado vía `BASE` (no ruta absoluta hardcodeada) y accesible (200).
4. **Dado** el sitio desplegado bajo `/plancha-app`, **cuando** se navega por
   él, **entonces** ningún enlace se rompe (sigue usando `BASE`/`url()` como
   ya exige la constitución del repo).
5. **Dado** `npm run build`, **cuando** se ejecuta, **entonces** sigue en
   verde (Zod + sitemap + favicon no introducen errores de build).

## Alcance

- Incluye: meta tags OG/Twitter en `BaseLayout.astro`; integración
  `@astrojs/sitemap`; favicon real en `public/favicon.svg` referenciado vía
  `BASE`.
- **No-objetivos** (según la propia issue):
  - Rediseño visual o cambios de contenido.
  - `og:image`: no hay ninguna imagen/captura del sitio hoy; añadir una
    requeriría diseñarla, lo que excede "mejora barata". Se omite (`og:image`
    es "si procede" según la propia issue) — puede añadirse después sin
    romper nada cuando exista un asset real.
  - `robots.txt`: no lo pide la issue; no se añade para no ampliar alcance.

## Impacto en el contenido / constitución

- No toca `src/content/`. Los enlaces (`og:url`, favicon) usan `SITE`/`BASE`
  de `src/data/site.ts`, cumpliendo la regla de no hardcodear rutas
  absolutas.

## Dudas abiertas

Ninguna bloqueante. Decisión ya tomada arriba: se omite `og:image` por falta
de un asset real (evita inventar una imagen de marca no solicitada).
