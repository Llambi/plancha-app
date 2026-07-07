# Tasks — FAB «Mapa» solapa preguntas/opciones en viewports menores de 1240px

- **Issue**: #40
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #40)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — Test E2E que exige un FAB compacto (icono, sin etiqueta de texto)**
  - Test (rojo): añadido en `tests/e2e/minimap.spec.ts` — comprueba que
    `.mm-fab` mide ≤48×48px y que su `innerText` está vacío (sin «Mapa»).
    Confirmado en rojo contra la píldora original (87×37px con texto).
  - Commit: `test(minimap): assert the FAB is a compact icon, not a large labeled pill (refs #40)`

- [x] **T2 — Reducir el FAB a un icono compacto**
  - Implementación (verde): `.mm-fab` pasa a círculo de 44×44px sin padding
    horizontal ni texto; se retira el nodo «Mapa» del marcado; el contador de
    fijados pasa a insignia superpuesta (`--site-topbar-bg`/`--site-topbar-ink`).
    `updateFabPosition()`/`computeFabBottom()` no se tocan.
  - Commit: `fix(minimap): shrink the FAB to a compact icon so it overlaps less content (refs #40)`

> Nota: un primer intento (generalizar `updateFabPosition()` para esquivar
> cualquier tarjeta) se implementó, se probó y se descartó por completo
> durante esta fase — ver `plan.md` para el detalle. No dejó commits (se
> revirtió antes de comitear nada), así que no aparece como tarea aquí.

## Verificación final (Gate B)

- [x] `astro check` sin errores
- [x] `npm test` en verde (111 tests, sin cambios de comportamiento en `src/lib/minimap.ts`)
- [x] `npm run build` + `npm run test:e2e` — verde salvo 2 fallos preexistentes
      y no relacionados en `seo.spec.ts` (og:url con barra final, sitemap 404
      bajo preview; ver issue #27). No introducidos por este cambio.
- [x] Cada criterio de aceptación de `spec.md` comprobado (tamaño/etiqueta del
      FAB, regresión de #29, rail de escritorio sin cambios)
