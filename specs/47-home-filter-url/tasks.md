# Tasks — El filtro de tipo en la home no se refleja en la URL

- **Issue**: #47
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #47)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — Tests E2E que exigen sincronía con la URL (rojo)**
  - Test (rojo): en `tests/e2e/home-content-types.spec.ts`, dos tests —
    pulsar "Práctica" deja `?tipo=practica` en la URL; cargar
    `/?tipo=practica` aplica el filtro desde el principio. Fallan contra el
    código actual (sin query param en absoluto).
  - Commit: `test(home): require the type filter to sync with the URL query param (refs #47)`

- [ ] **T2 — `applyFilter()`/`syncUrl()` + lectura inicial de `?tipo=`**
  - Implementación (verde): refactor del script de filtros en
    `index.astro` según el plan.
  - Commit: `feat(home): sync the type filter with a ?tipo= URL query param (refs #47)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
