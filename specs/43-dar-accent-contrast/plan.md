# Plan técnico — Contraste insuficiente del acento de DAR (#6C63FF) sobre texto blanco en negrita

- **Issue**: #43
- **Spec**: ./spec.md
- **Rama**: 43-dar-accent-contrast

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Añadir una pequeña utilidad pura `contrastRatio(hex1, hex2)` en
`src/lib/color-contrast.ts` (fórmula de luminancia relativa + contraste de
WCAG 2.x), con sus propios tests unitarios validándola contra casos de
referencia conocidos (negro/blanco = 21:1, blanco/blanco = 1:1). Se usa esa
utilidad, no un valor hardcodeado, para verificar el nuevo acento de DAR —
así el test comprueba la propiedad real (≥4.5:1), no solo que el hex sea un
valor concreto elegido a mano.

Cambio de valor: `#6C63FF` → `#5F55FF` en `ASIGNATURAS.dar.accent`
(`src/data/asignaturas.ts`). Mismo matiz/saturación (HSL), solo un poco más
oscuro; contraste calculado: 4.96:1 (con margen sobre el mínimo de 4.5:1).

## Ficheros y áreas afectadas

- `src/lib/color-contrast.ts` — nuevo, la utilidad `contrastRatio()`.
- `src/data/asignaturas.ts` — cambia el valor de `accent` de `dar`.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- No existía ninguna utilidad de contraste en el repo; se añade como pieza
  reutilizable en `src/lib/` (mismo patrón que `src/lib/minimap.ts`,
  `src/lib/search.ts`… — funciones puras, testeadas en `tests/unit/`), por
  si otra issue de accesibilidad la necesita más adelante (p. ej. #58).
- No se generaliza a "verificar todos los acentos automáticamente": la spec
  lo excluye explícitamente como no-objetivo, para no ampliar el alcance de
  esta issue.

## Estrategia de test (TDD)

- **Unit (Vitest)**:
  - `tests/unit/color-contrast.test.ts` (nuevo): valida `contrastRatio()`
    contra casos de referencia (negro/blanco, blanco/blanco, y el propio
    `#6C63FF` original ≈ 4.32:1, para documentar el problema original).
  - `tests/unit/asignaturas.test.ts`: añade un test que comprueba
    `contrastRatio(ASIGNATURAS.dar.accent, '#ffffff') >= 4.5`.
- **E2E (Playwright)**: no aplica — es un cambio de valor de color sin
  cambio de comportamiento/interacción; se verifica visualmente con
  `preview_inspect`/captura en `/practica/dar` como parte de la verificación
  manual, no como test automatizado nuevo.
- **Contenido**: no aplica.

## Riesgos / decisiones

- **No se sustituye el resto de acentos** aunque en teoría podrían
  recalcularse igual: fuera de alcance (no reportado como problema, y la
  spec lo excluye explícitamente).
- **Margen sobre el mínimo**: se elige 4.96:1 en vez de un valor justo al
  filo de 4.5:1, para tolerar pequeñas variaciones de renderizado
  (antialiasing, subpíxeles) sin quedar por debajo en la práctica.
