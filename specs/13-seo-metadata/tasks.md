# Tasks — SEO y metadatos: Open Graph, sitemap y favicon real

- **Issue**: #13
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #13)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — `canonicalUrl()`: helper puro para la URL absoluta**
  - Test (rojo): `tests/unit/site.test.ts` — `canonicalUrl('/practica/si')`
    devuelve `${SITE}${BASE}/practica/si`; `canonicalUrl()`/`canonicalUrl('/')`
    devuelve la raíz absoluta.
  - Implementación (verde): añade `canonicalUrl` a `src/data/site.ts`,
    reutilizando `url()`.
  - Commit: `feat(seo): add canonicalUrl helper (refs #13)`

- [ ] **T2 — Favicon real + meta tags Open Graph/Twitter (sin imagen)**
  - Test (rojo): `tests/e2e/seo.spec.ts` — la home tiene
    `meta[property="og:title"]`, `og:description`, `og:type="website"`,
    `og:url` (con `/plancha-app`), `meta[name="twitter:card"]`,
    `twitter:title`, `twitter:description`; `<link rel="icon">` apunta a
    `${BASE}/favicon.svg` y esa URL responde 200 (no `data:,`).
  - Implementación (verde): `public/favicon.svg` (círculo con el acento por
    defecto); `BaseLayout.astro` añade las meta tags usando `canonicalUrl` y
    cambia el `<link rel="icon">`.
  - Commit: `feat(seo): add Open Graph/Twitter meta tags and a real favicon (refs #13)`

- [ ] **T3 — `og:image`/`twitter:image` con un asset propio**
  - Test (rojo): extiende `tests/e2e/seo.spec.ts` — la home tiene
    `meta[property="og:image"]` y `meta[name="twitter:image"]` con una URL
    absoluta (`SITE`+`BASE`), `twitter:card` pasa a ser
    `summary_large_image`, y esa URL de imagen responde 200 con
    `content-type: image/png`.
  - Implementación (verde): genera `public/og-image.png` (1200×630) a partir
    de un SVG de marca con `rsvg-convert` (wordmark "PlanchaAPP" + acento por
    defecto); añade las meta tags de imagen en `BaseLayout.astro`.
  - Commit: `feat(seo): add a real og:image/twitter:image (refs #13)`

- [ ] **T4 — Sitemap con `@astrojs/sitemap`**
  - Test (rojo): tras `npm run build`, `${BASE}/sitemap-index.xml` responde
    200 sirviendo `dist/` y su contenido referencia URLs con el subpath
    `/plancha-app` (verificado en `tests/e2e/seo.spec.ts`, que corre contra
    build+preview).
  - Implementación (verde): `npm install @astrojs/sitemap`; añade
    `integrations: [sitemap()]` a `astro.config.mjs`.
  - Commit: `feat(seo): add sitemap generation via @astrojs/sitemap (refs #13)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
