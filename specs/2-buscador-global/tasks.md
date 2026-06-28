# Tasks — Buscador global en la topbar

- **Issue**: #2
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #2)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — Lógica de búsqueda (núcleo testeable)**
  - Test (rojo): `tests/unit/search.test.ts` — `buildSearchRecords` mapea cada
    colección a `tipoLabel`/`url`/ancla correctos (incl. excepción SOA →
    `/guia/soa#soa-quiz`), `stripHtml` limpia HTML, `createSearcher` casa por
    nombre/contenido, es insensible a tildes/mayúsculas, tolera errata y respeta `limit`.
  - Implementación (verde): `src/lib/search.ts` + dependencia `fuse.js`.
  - Commit: `feat(search): núcleo de búsqueda (índice + Fuse) con tests (refs #2)`

- [ ] **T2 — Endpoint del índice JSON**
  - Implementación: `src/pages/search-index.json.ts` (`GET`) que reúne las 4
    colecciones + MongoDB y emite `buildSearchRecords()` como JSON.
  - Verificación: `astro build` genera `search-index.json`.
  - Commit: `feat(search): endpoint search-index.json generado en build (refs #2)`

- [ ] **T3 — Anclas deep-link en componentes**
  - Implementación: `id` + `scroll-margin-top` en `TestQuestion` (`q-<id>`),
    `DesarrolloQuestion` (`d-<id>`), `scroll-margin-top` en `EsquemaTree`;
    `SoaGuide` con `id="ch-<num>"` y activación de capítulo según `location.hash`.
  - Commit: `feat(content): anclas deep-link en preguntas, esquemas y guía (refs #2)`

- [ ] **T4 — SearchBox en la topbar**
  - Implementación: `src/components/SearchBox.astro` (combobox ARIA, panel,
    teclado ↑/↓/Enter/Esc, leyenda, carga perezosa del índice, modo móvil con
    icono) e integración en `src/layouts/BaseLayout.astro`.
  - Commit: `feat(search): buscador dinámico en la topbar (refs #2)`

- [ ] **T5 — Página /buscar**
  - Implementación: `src/pages/buscar.astro` — lee `?q`, agrupa por asignatura,
    estados vacíos, buscador sincronizado.
  - Commit: `feat(search): página de resultados /buscar agrupada por asignatura (refs #2)`

- [ ] **T6 — E2E del buscador**
  - Test: `tests/e2e/buscador.spec.ts` — panel + leyenda, ↑/↓+Enter a ancla,
    Enter→/buscar, click navega.
  - Commit: `test(search): e2e del flujo de buscador (refs #2)`

- [ ] **T7 — Documentación**
  - Implementación: nota de arquitectura del buscador en `CLAUDE.md`.
  - Commit: `docs: documenta el buscador global en CLAUDE.md (refs #2)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
