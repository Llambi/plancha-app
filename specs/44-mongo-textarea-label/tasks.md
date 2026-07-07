# Tasks — Textarea del validador de MongoDB sin `<label>` asociado

- **Issue**: #44
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #44)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — Test E2E que exige un nombre accesible estable por colección (rojo)**
  - Test (rojo): en `tests/e2e/mongo-practica.spec.ts`, comprobar que las 2
    textareas del Ejercicio 1 tienen nombres accesibles distintos
    ("...db.peliculas"/"...db.clientes") y que no cambian tras escribir en
    ellas. Debe fallar contra el código actual (nombre accesible = el
    placeholder completo, igual en ambas hasta que se escribe algo).
  - Commit: `test(mongo-practica): require a stable accessible name per collection textarea (refs #44)`

- [x] **T2 — Label visualmente oculto por textarea**
  - Implementación (verde): `<label for="ta-...">` + clase `.sr-only`
    (visually-hidden) en `MongoPractica.astro`.
  - Commit: `fix(mongo-practica): give each collection textarea a proper accessible label (refs #44)`

## Verificación final (Gate B)

- [x] `astro check` sin errores
- [x] `npm test` en verde
- [x] `npm run build` + `npm run test:e2e` en verde (72/72)
- [x] Cada criterio de aceptación de `spec.md` comprobado (confirmado en el navegador: labels distintos, ocultos visualmente, sin cambio de layout)
