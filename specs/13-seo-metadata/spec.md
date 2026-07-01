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
(título, descripción, imagen) coherentes con su `title`/`description` ya
existentes, un favicon real visible en la pestaña del navegador, y el build
genera un sitemap correcto bajo `/plancha-app`. Nada de esto rompe el
despliegue bajo el base path.

## Criterios de aceptación

1. **Dado** cualquier página con `BaseLayout`, **cuando** se inspecciona su
   `<head>`, **entonces** incluye `og:title`, `og:description`, `og:type`,
   `og:url`, `og:image` y las equivalentes `twitter:card` (`summary_large_image`)/
   `twitter:title`/`twitter:description`/`twitter:image`, derivadas de las
   props `title`/`description` ya existentes (sin hardcodear rutas
   absolutas; `og:url`/`og:image` usan `SITE`+`BASE`).
2. **Dado** el build (`npm run build`), **cuando** termina, **entonces** genera
   un sitemap (`@astrojs/sitemap`) cuyas URLs incluyen el subpath
   `/plancha-app` y es accesible sirviendo `dist/` (p. ej. bajo
   `/plancha-app/sitemap-index.xml`).
3. **Dado** el `<link rel="icon">` de `BaseLayout`, **cuando** se carga
   cualquier página, **entonces** apunta a un favicon real (no `data:,`),
   referenciado vía `BASE` (no ruta absoluta hardcodeada) y accesible (200).
4. **Dado** la imagen de `og:image`, **cuando** se solicita su URL,
   **entonces** responde 200 y es una imagen rasterizada (PNG), no un SVG
   (los crawlers de OG/Twitter no renderizan SVG de forma fiable).
5. **Dado** el sitio desplegado bajo `/plancha-app`, **cuando** se navega por
   él, **entonces** ningún enlace se rompe (sigue usando `BASE`/`url()` como
   ya exige la constitución del repo).
6. **Dado** `npm run build`, **cuando** se ejecuta, **entonces** sigue en
   verde (Zod + sitemap + favicon + og:image no introducen errores de build).

## Alcance

- Incluye: meta tags OG/Twitter en `BaseLayout.astro` (incluida imagen);
  integración `@astrojs/sitemap`; favicon real en `public/favicon.svg`;
  imagen `og:image` real (PNG) en `public/og-image.png`, generada a partir de
  un SVG propio con la marca (mismo acento por defecto que la topbar) — ambos
  assets nuevos, no capturas del sitio ni contenido de terceros.
- **No-objetivos** (según la propia issue):
  - Rediseño visual o cambios de contenido del sitio en sí (el `og:image` es
    un asset nuevo aparte, no un cambio visual del sitio).
  - `robots.txt`: no lo pide la issue; no se añade para no ampliar alcance.

## Impacto en el contenido / constitución

- No toca `src/content/`. Los enlaces (`og:url`, `og:image`, favicon) usan
  `SITE`/`BASE` de `src/data/site.ts`, cumpliendo la regla de no hardcodear
  rutas absolutas.

## Dudas abiertas

Ninguna bloqueante. Resuelto con el usuario: se añade `og:image` con un
asset propio nuevo (no una captura del sitio).
