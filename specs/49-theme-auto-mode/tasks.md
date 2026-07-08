# Tasks — Toggle de tema: añadir un tercer estado «Automático»

- **Issue**: #49
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #49)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — Tests E2E del ciclo de 3 estados y del modo automático (rojo)**
  - Test (rojo): nuevo `tests/e2e/theme-auto.spec.ts` con los 3 casos del
    plan (por defecto automático + sigue al sistema; ciclo exacto de 3
    clics; actualización en vivo al cambiar `prefers-color-scheme`).
    Fallan contra el código actual (toggle binario, sin
    `data-theme-pref`).
  - Commit: `test(theme): require a 3-state light/dark/auto toggle that follows the system live (refs #49)`

- [x] **T2 — Implementar el estado «automático»**
  - Implementación (verde): `BaseLayout.astro` — script anti-parpadeo,
    botón + icono `.site-ic-auto`, script de click con ciclo de 3 estados
    y listener de `matchMedia` en modo automático, CSS de iconos.
  - Commit: `feat(theme): add a third "auto" state that follows prefers-color-scheme live (refs #49)`

- [x] **T3 — Adaptar el test existente de #36 al ciclo de 3 estados**
  - Test (rojo → verde en el mismo commit, es un test ya existente que se
    reescribe): `tests/e2e/smoke.spec.ts`, "el toggle de tema cambia
    data-theme en /practica/mongodb" — pasa a comprobar el avance exacto
    de un paso en `data-theme-pref` tras un clic, en vez de asumir que
    `data-theme` resuelto siempre cambia.
  - Commit: `test(smoke): adapt the theme-toggle regression test to the 3-state cycle (refs #49)`

## Verificación final (Gate B)

- [x] `astro check` sin errores
- [x] `npm test` en verde
- [x] `npm run build` + `npm run test:e2e` en verde (80/80, incluye
      `theme-auto.spec.ts` y el test adaptado de `smoke.spec.ts`)
- [x] Cada criterio de aceptación de `spec.md` comprobado (incl. verificación manual del icono en el navegador)
