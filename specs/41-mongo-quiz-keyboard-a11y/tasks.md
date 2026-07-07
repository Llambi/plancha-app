# Tasks — Validador de MongoDB: el test de consultas no es accesible por teclado

- **Issue**: #41
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #41)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — Test E2E que exige selección por teclado (rojo)**
  - Test (rojo): nuevo `tests/e2e/mongo-practica.spec.ts`. Comprueba que las
    opciones son `input[type="radio"]` agrupados por `name` y que se pueden
    marcar solo con `Tab` + `Space`. Debe fallar contra el código actual
    (los `<div onclick>` no son focalizables).
  - Commit: `test(mongo-practica): require keyboard-selectable radio options for the query quiz (refs #41)`

- [ ] **T2 — Radios reales para las opciones del test de consultas**
  - Implementación (verde): en `MongoPractica.astro`, opciones como
    `<label class="opt"><input type="radio" class="opt-radio" .../>…</label>`;
    `markSelected()` añade `input.checked=true`; CSS visually-hidden +
    `:focus-visible` reenviado al `.opt`.
  - Commit: `fix(mongo-practica): make the query quiz options keyboard-selectable radio inputs (refs #41)`

- [ ] **T3 — Deshabilitar los inputs al corregir (test + implementación)**
  - Test (rojo): añadir al mismo spec E2E — tras "Corregir test", los inputs
    de una pregunta quedan `disabled`.
  - Implementación (verde): `applyCorrection()` añade `input.disabled = true`
    junto a las clases `.locked`/`.correct`/`.wrong` ya existentes.
  - Commit: `fix(mongo-practica): disable radio inputs once the query quiz is corrected (refs #41)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde (incluye el nuevo
      `mongo-practica.spec.ts`)
- [ ] Cada criterio de aceptación de `spec.md` comprobado, incluida una
      pasada manual de teclado en `/practica/mongodb`
