# Tasks — Contraste insuficiente del acento de DAR (#6C63FF) sobre texto blanco en negrita

- **Issue**: #43
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #43)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — `contrastRatio()` con tests unitarios (rojo → verde)**
  - Test (rojo): `tests/unit/color-contrast.test.ts` — casos de referencia
    (negro/blanco = 21, blanco/blanco = 1, `#6C63FF`/blanco ≈ 4.32). Falla
    porque `contrastRatio()` no existe todavía.
  - Implementación (verde): `src/lib/color-contrast.ts` con la fórmula de
    luminancia relativa + contraste WCAG.
  - Commit: `feat(color-contrast): add a WCAG contrast-ratio helper (refs #43)`

- [x] **T2 — Test que exige ≥4.5:1 para el acento de DAR (rojo)**
  - Test (rojo): en `tests/unit/asignaturas.test.ts`, añadir
    `expect(contrastRatio(ASIGNATURAS.dar.accent, '#ffffff')).toBeGreaterThanOrEqual(4.5)`.
    Falla contra el valor actual (`#6C63FF` ≈ 4.32).
  - Commit: `test(asignaturas): require the DAR accent to meet 4.5:1 contrast with white (refs #43)`

- [x] **T3 — Nuevo valor de acento para DAR (verde)**
  - Implementación (verde): `accent: '#5F55FF'` en `ASIGNATURAS.dar`
    (`src/data/asignaturas.ts`).
  - Commit: `fix(asignaturas): darken the DAR accent to meet 4.5:1 contrast with white (refs #43)`

## Verificación final (Gate B)

- [x] `astro check` sin errores
- [x] `npm test` en verde (incluye los tests nuevos)
- [x] `npm run build` sin errores
- [x] Verificación visual en `/practica/dar` (badge, sigla, filtro activo) con
      `preview_*`: mismo aspecto, solo un pelín más oscuro (confirmado rgb(95,85,255))
- [x] Cada criterio de aceptación de `spec.md` comprobado
