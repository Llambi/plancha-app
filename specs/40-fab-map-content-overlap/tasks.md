# Tasks — FAB «Mapa» solapa preguntas/opciones en viewports menores de 1240px

- **Issue**: #40
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #40)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — Test E2E que reproduce el solape del FAB con tarjetas de contenido**
  - Test (rojo): añadir en `tests/e2e/minimap.spec.ts`, junto al test existente
    de #29, un test que en `/practica/si` a 375×812 muestree ~10 posiciones de
    scroll entre 0 y `scrollHeight - innerHeight` y compruebe que ningún
    `[data-tq]`/`[data-dq]` solapa `.mm-fab`. Debe fallar contra el código
    actual (build + `npx playwright test minimap`).
  - Implementación: ninguna todavía (solo el test).
  - Refactor: —
  - Commit: `test(minimap): reproduce el solape del FAB con tarjetas de contenido (refs #40)`

- [ ] **T2 — Generalizar `updateFabPosition()` para esquivar cualquier tarjeta, no solo los filtros**
  - Test (ya en rojo desde T1).
  - Implementación (verde): en `src/components/Minimap.astro`, extender
    `updateFabPosition()` para, además del obstáculo de
    `[data-tema-filters]`, recorrer `anchors` calculando con
    `computeFabBottom()` (sin cambios) el empuje necesario para cada tarjeta
    que solape verticalmente la franja del FAB, y aplicar el `Math.max()`
    entre el empuje por filtros y el empuje por contenido.
  - Refactor: si el bucle resultante queda legible, ninguno adicional.
  - Commit: `fix(minimap): el FAB "Mapa" esquiva cualquier tarjeta bajo su rectángulo, no solo los filtros de tema (refs #40)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde (sin cambios esperados en unit, se confirma que nada se rompe)
- [ ] `npm run build` + `npm run test:e2e` en verde (incluye el nuevo test y el de #29)
- [ ] Cada criterio de aceptación de `spec.md` comprobado manualmente además del test automatizado (375px, ~1100px, ≥1240px)
