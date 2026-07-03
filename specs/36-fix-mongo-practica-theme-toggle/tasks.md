# Tasks — Toggle de tema no funciona en /practica/mongodb (listener duplicado)

- **Issue**: #36
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #36)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — Test e2e de regresión para el toggle en /practica/mongodb**
  - Test (rojo): añade en `tests/e2e/smoke.spec.ts` un test que navega a
    `/practica/mongodb`, lee `data-theme` antes de clicar
    `.site-theme-toggle`, clica una vez y afirma que `data-theme` cambió.
    Con el código actual (listener duplicado) el test falla porque el valor
    no cambia.
  - Implementación (verde): ninguna en esta tarea (solo se añade el test).
  - Refactor: —
  - Commit: `test(e2e): cubrir el toggle de tema en /practica/mongodb (refs #36)`

- [x] **T2 — Eliminar el listener de tema duplicado en MongoPractica.astro**
  - Test (verifica verde): el test de T1 debe pasar tras este cambio.
  - Implementación: elimina el IIFE duplicado (`/* Toggle de tema (común) */`)
    de `src/components/MongoPractica.astro`, dejando que `BaseLayout.astro`
    gobierne el toggle.
  - Refactor: no aplica (cambio puramente sustractivo).
  - Commit: `fix(mongo-practica): remove duplicate theme toggle listener (refs #36)`

## Verificación final (Gate B)

- [x] `astro check` sin errores
- [x] `npm test` en verde
- [x] `npm run build` + `npm run test:e2e` en verde (2 fallos preexistentes en
      `seo.spec.ts`, no relacionados, confirmados idénticos en `main`)
- [x] Cada criterio de aceptación de `spec.md` comprobado
