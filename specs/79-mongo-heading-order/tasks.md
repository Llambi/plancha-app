# Tasks — Orden de encabezados incorrecto en el validador de MongoDB

- **Issue**: #79
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #79)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — Rojo: cada tarjeta de colección debe exponer un `<h2>`**
  - Test (rojo): `tests/e2e/mongo-practica.spec.ts` — comprueba que cada
    tarjeta `.coll` tiene un `getByRole('heading', { level: 2 })` con el
    nombre `db.<colección>`. Falla porque hoy es un `<h3>`.
  - También se retira la excepción `heading-order` de `/practica/mongodb`
    en `tests/e2e/a11y.spec.ts` (mismo commit: ambos fallan por la misma
    causa).
  - Commit: `test(mongo-practica): add e2e coverage for the collection card heading level (refs #79)`

- [x] **T2 — `<h3>` → `<h2>` en las tarjetas de colección**
  - Implementación (verde): markup + los 3 selectores CSS asociados.
  - Verificación visual: comparación con el estado actual (mismo tamaño de
    fuente, ya fijado explícitamente por CSS).
  - Commit: `fix(mongo-practica): use h2 for collection card titles to fix the heading order (refs #79)`

## Verificación final (Gate B)

- [x] `astro check` sin errores
- [x] `npm test` en verde
- [x] `npm run build` + `npm run test:e2e` en verde
- [x] Cada criterio de aceptación de `spec.md` comprobado
