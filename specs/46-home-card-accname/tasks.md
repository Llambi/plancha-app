# Tasks — Home: el texto «Abrir →» se duplica en el nombre accesible de cada tarjeta

- **Issue**: #46
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #46)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — Test E2E que exige un nombre accesible sin «Abrir →» (rojo)**
  - Test (rojo): en `tests/e2e/home-content-types.spec.ts`, comprobar que
    el nombre accesible de la primera tarjeta no contiene "Abrir" y sí
    contiene el título real. Falla contra el código actual.
  - Commit: `test(home): require card accessible names to exclude the decorative "Abrir →" (refs #46)`

- [ ] **T2 — `aria-hidden` en el span decorativo**
  - Implementación (verde): `aria-hidden="true"` en `.doc-go`
    (`src/pages/index.astro`).
  - Commit: `fix(home): hide the decorative "Abrir →" from the card's accessible name (refs #46)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
