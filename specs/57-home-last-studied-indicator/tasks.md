# Tasks — Home: indicador de «última vez estudiado» por asignatura

- **Issue**: #57
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #57)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — Núcleo puro: formatear "última vez estudiado"**
  - Test (rojo): `tests/unit/last-studied.test.ts` para
    `formatLastStudied()` — sin timestamp/timestamp inválido/`now` anterior
    -> `''`; menos de un minuto -> "hace un momento"; minutos, horas, días,
    meses, años, con singular/plural correcto.
  - Implementación (verde): `src/lib/last-studied.ts` con `keyFor()` y
    `formatLastStudied()`.
  - Refactor: si aplica.
  - Commit: `feat(last-studied): add pure relative-time formatter (refs #57)`

- [x] **T2 — E2E rojo: indicador en la home**
  - Test (rojo): en el spec e2e de la home — sin interacción no hay
    indicador; corregir un test en `/practica/si` y volver a la home
    muestra "Estudiado hace un momento"; autoevaluar una pregunta de
    desarrollo también lo activa. Debe fallar porque el indicador no existe
    todavía.
  - Implementación: ninguna en esta tarea (solo el test).
  - Refactor: —
  - Commit: `test(home): add e2e coverage for the last-studied indicator (refs #57)`

- [x] **T3 — Implementar el indicador**
  - Test (rojo): el de T2 (sigue en rojo hasta esta tarea).
  - Implementación (verde): listeners de `tq:graded`/
    `desarrollo:stats-updated` en `src/pages/practica/[asignatura].astro`
    que llaman a `safeSet(keyFor(asignatura), new Date().toISOString())`;
    elemento `.doc-studied` en `src/pages/index.astro` (tarjetas
    `tipo: 'practica'`) relleno por el `<script>` existente de badges con
    `formatLastStudied(...)`.
  - Refactor: si aplica.
  - Commit: `feat(home): show a relative last-studied indicator per subject (refs #57)`

## Verificación final (Gate B)

- [x] `astro check` sin errores
- [x] `npm test` en verde (150/150)
- [x] `npm run build` + `npm run test:e2e` en verde (96/96)
- [x] Cada criterio de aceptación de `spec.md` comprobado
