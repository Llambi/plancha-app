# Tasks — Nombre accesible redundante en preguntas de test

- **Issue**: #45
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #45)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — Test E2E que exige un nombre accesible sin «Fijar pregunta» (rojo)**
  - Test (rojo): en `tests/e2e/practica.spec.ts`, comprobar que el
    `fieldset` de la primera pregunta de `/practica/si` (single, sin
    indicadores) tiene como nombre accesible exactamente el texto del
    enunciado. Falla contra el código actual (incluye "Fijar pregunta").
  - Commit: `test(test-question): require the question fieldset's accessible name to exclude the pin button (refs #45)`

- [ ] **T2 — `aria-labelledby` apuntando solo al texto de la pregunta**
  - Implementación (verde): `id` en `.tq-q` + `aria-labelledby` en el
    `fieldset`, en `TestQuestion.astro`.
  - Commit: `fix(test-question): scope the question's accessible name to its text via aria-labelledby (refs #45)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
