# Tasks — Home: mostrar el % de progreso acumulado en la tarjeta de cada asignatura

- **Issue**: #50
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #50)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — E2E rojo: indicador de progreso en la home**
  - Test (rojo): `tests/e2e/home-progress-badge.spec.ts` con tres casos —
    (1) asignatura sin stats guardadas → su `.doc-card` no muestra
    `.doc-progress` visible; (2) tras corregir una pregunta en `/practica/si`
    (mismo patrón de `practica-stats.spec.ts`: check + `[data-grade-trigger]`),
    la home muestra "Acumulado: 100%" en la tarjeta de esa asignatura;
    (3) la tarjeta de MongoDB nunca muestra el indicador. Debe fallar porque
    `.doc-progress` no existe todavía.
  - Implementación: ninguna en esta tarea (solo el test).
  - Refactor: —
  - Commit: `test(home): add e2e coverage for the per-subject progress badge (refs #50)`

- [ ] **T2 — Implementar el indicador de progreso acumulado**
  - Test (rojo): el de T1 (sigue en rojo hasta esta tarea).
  - Implementación (verde): en `src/pages/index.astro` — añadir `code` a
    `Card`, rellenarlo en las tarjetas `tipo: 'practica'` (bucle de
    test/desarrollo y la tarjeta fija de MongoDB), añadir
    `data-asignatura={c.code}` y `<span class="doc-progress" hidden></span>`
    al template, e importar `parseStats`/`statsKeyFor`/`summarize`/
    `formatStatsChip` de `../lib/practica-stats` en el `<script>` existente
    para recorrer `.doc-card[data-asignatura]` y rellenar/mostrar el span
    cuando `formatStatsChip(...)` no esté vacío. Añadir el estilo del
    `.doc-progress` (pill discreta, consistente con `.doc-type`/`.doc-go`).
  - Refactor: si el bloque de relleno de `code` se repite entre los tres
    orígenes de tarjetas `practica`, extraer un pequeño helper local.
  - Commit: `feat(home): show accumulated practice progress on subject cards (refs #50)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
