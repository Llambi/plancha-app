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
   absoluta (`SITE` + `BASE` + ruta) para `og:url`/`og:image`.
   `BaseLayout.astro` añade las etiquetas OG/Twitter al `<head>`, derivadas de
   las props `title`/`description` que ya recibe cada página, más
   `og:image`/`twitter:image` apuntando al PNG nuevo.
2. **Favicon + og:image**: se dibuja un único SVG de marca en
   `public/brand.svg` (círculo con el color de acento por defecto, el mismo
   mark que ya usa el punto de la topbar, sobre fondo transparente) que sirve
   de favicon directamente (`public/favicon.svg`), y una variante 1200×630
   (`public/og-image.svg`, fondo sólido con el acento + wordmark
   "PlanchaAPP" + la descripción por defecto) rasterizada a
   `public/og-image.png` con `rsvg-convert` (herramienta ya presente en el
   entorno) — se genera una vez y se versiona el PNG resultante, sin añadir
   el paso de conversión al build.
3. **Sitemap**: `@astrojs/sitemap` como integración de Astro; `site`+`base` ya
   están configurados en `astro.config.mjs`, así que el sitemap generado ya
   incluye el subpath correcto sin configuración adicional.

## Ficheros y áreas afectadas

- `src/data/site.ts` — añade `canonicalUrl(pathname: string): string`.
- `src/layouts/BaseLayout.astro` — añade meta tags OG/Twitter al `<head>`
  (incluida imagen); cambia `<link rel="icon" href="data:,">` por
  `<link rel="icon" type="image/svg+xml" href={`${BASE}/favicon.svg`}>`.
- `public/favicon.svg`, `public/og-image.png` (**nuevos**, directorio
  `public/` nuevo). El SVG fuente de la og-image no se versiona (solo su
  PNG rasterizado, que es lo que se sirve).
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
    `og:type`, `og:url` (con el subpath `/plancha-app`), `og:image` (URL
    absoluta con `SITE`+`BASE`), y `meta[name="twitter:card"]` =
    `summary_large_image`, `twitter:title`, `twitter:description`,
    `twitter:image`.
  - La URL de `og:image` responde 200 y `content-type: image/png`.
  - Tras el build, `${BASE}/sitemap-index.xml` responde 200 y su contenido
    referencia URLs con el subpath `/plancha-app`.
- **Contenido**: no aplica. `astro check` + `astro build` verifican que la
  nueva integración no rompe el build.

## Riesgos / decisiones

- **SVG como favicon, PNG para `og:image`**: los navegadores soportan SVG
  como favicon, pero los crawlers de OG/Twitter (Facebook, LinkedIn, X) no
  renderizan SVG de forma fiable para la vista previa — de ahí rasterizar
  solo la imagen social a PNG con `rsvg-convert`.
- **Assets de marca propios, no capturas del sitio**: evita depender de un
  screenshot que quedaría desactualizado; usa los mismos tokens de color que
  ya existen (`--site-accent` por defecto).
- **`@astrojs/sitemap` respeta `base` automáticamente**: se verifica en
  Implement inspeccionando el XML generado en `dist/`, no se asume sin
  comprobar.
