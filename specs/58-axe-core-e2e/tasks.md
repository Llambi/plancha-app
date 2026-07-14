# Tasks — Añadir comprobación de accesibilidad automatizada (axe-core) a la suite E2E

- **Issue**: #58
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #58)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — Test de accesibilidad sin excepciones (rojo)**
  - Test (rojo): `tests/e2e/a11y.spec.ts`, un test por página de las 6 del
    alcance, cada uno afirma `results.violations` vacío sin ninguna
    excepción todavía. Falla con los 3 hallazgos reales del escaneo previo
    (landmark en las 6, contraste en guía/mongodb, orden de encabezados en
    mongodb).
  - Commit: `test(a11y): add axe-core checks for every page type (refs #58)`

- [x] **Crear las 3 issues de seguimiento** (no es un commit; acción entre
      T1 y T2 para poder referenciar sus números)
  - Landmark de la topbar sin contener (sitewide, `BaseLayout.astro`).
  - Contraste de color insuficiente (guía SOA + validador de MongoDB).
  - Orden de encabezados incorrecto en el validador de MongoDB.

- [x] **T2 — Documentar las excepciones conocidas (verde)**
  - Implementación (verde): `filterKnownViolations()` + lista de
    excepciones por regla/página en `tests/e2e/a11y.spec.ts`, cada una con
    un comentario que referencia la issue de seguimiento correspondiente.
  - Commit: `test(a11y): document known violations as scoped, tracked exceptions (refs #58)`

## Verificación final (Gate B)

- [x] `astro check` sin errores
- [x] `npm test` en verde (150/150)
- [x] `npm run build` + `npm run test:e2e` en verde (102/102, incluye
      `a11y.spec.ts`, 6 tests nuevos)
- [x] Cada criterio de aceptación de `spec.md` comprobado
