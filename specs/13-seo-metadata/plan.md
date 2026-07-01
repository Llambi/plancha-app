# Plan técnico — SEO y metadatos: Open Graph, sitemap y favicon real

- **Issue**: #13
- **Spec**: ./spec.md
- **Rama**: 13-seo-metadata

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Tres piezas independientes, cada una un cambio pequeño y aislado:

1. **Meta tags**: un helper puro nuevo `canonicalUrl(pathname)` en
   `src/data/site.ts` (reutiliza `url()` ya existente) construye la URL
   absoluta (`SITE` + `BASE` + ruta) para `og:url`. `BaseLayout.astro` añade
   las etiquetas OG/Twitter al `<head>`, derivadas de las props `title`/
   `description` que ya recibe cada página.
2. **Favicon**: un SVG estático nuevo en `public/favicon.svg` (círculo con el
   color de acento por defecto, el mismo mark que ya usa el punto de la
   topbar) referenciado como `${BASE}/favicon.svg` — Astro copia `public/` tal
   cual a `dist/`, que se sirve bajo `/plancha-app`.
3. **Sitemap**: `@astrojs/sitemap` como integración de Astro; `site`+`base` ya
   están configurados en `astro.config.mjs`, así que el sitemap generado ya
   incluye el subpath correcto sin configuración adicional.

## Ficheros y áreas afectadas

- `src/data/site.ts` — añade `canonicalUrl(pathname: string): string`.
- `src/layouts/BaseLayout.astro` — añade meta tags OG/Twitter al `<head>`;
  cambia `<link rel="icon" href="data:,">` por
  `<link rel="icon" type="image/svg+xml" href={`${BASE}/favicon.svg`}>`.
- `public/favicon.svg` (**nuevo**, directorio `public/` nuevo).
- `astro.config.mjs` — añade `integrations: [sitemap()]`.
- `package.json` — nueva dependencia `@astrojs/sitemap`.
- Colecciones de contenido afectadas: ninguna. Cambios de schema Zod: no.

## Reutilización

- `SITE`/`BASE`/`url()` de `src/data/site.ts` — `canonicalUrl` se construye
  encima de `url()`, no reimplementa el join de rutas.
- `site`/`base` ya configurados en `astro.config.mjs` (issue #1) — el
  sitemap los hereda sin tocarlos.

## Estrategia de test (TDD)

- **Unit (Vitest)**, `tests/unit/site.test.ts` (extiende el existente):
  - `canonicalUrl('/practica/si')` → `${SITE}${BASE}/practica/si`.
  - `canonicalUrl()`/`canonicalUrl('/')` → raíz.
- **E2E (Playwright)**, `tests/e2e/seo.spec.ts` contra el build/preview:
  - La home incluye `<link rel="icon">` apuntando a `${BASE}/favicon.svg` y
    la petición a esa URL responde 200.
  - La home incluye `meta[property="og:title"]`, `og:description`,
    `og:type`, `og:url` (con el subpath `/plancha-app`), y
    `meta[name="twitter:card"]`/`twitter:title`/`twitter:description`.
  - Tras el build, `${BASE}/sitemap-index.xml` responde 200 y su contenido
    referencia URLs con el subpath `/plancha-app`.
- **Contenido**: no aplica. `astro check` + `astro build` verifican que la
  nueva integración no rompe el build.

## Riesgos / decisiones

- **SVG como único formato de favicon**: los navegadores modernos lo
  soportan directamente; no se generan PNG/ICO adicionales (fuera de alcance
  para una "mejora barata" sin pedir assets nuevos).
- **Sin `og:image`**: decidido en la spec — no hay asset real hoy: no se
  fabrica uno de relleno.
- **`@astrojs/sitemap` respeta `base` automáticamente**: se verifica en
  Implement inspeccionando el XML generado en `dist/`, no se asume sin
  comprobar.
