# Plan técnico — Minimap: fallos de accesibilidad por teclado y de comportamiento (filtro «solo mis fallos», coloreado sin responder)

- **Issue**: #20
- **Spec**: ./spec.md
- **Rama**: 20-minimap-a11y-behavior-fixes

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Los cuatro fixes son independientes entre sí y viven en el mismo fichero
(`Minimap.astro`) o en sus vecinos directos, así que se implementan como
commits atómicos separados en vez de un solo cambio grande. Se sigue el patrón
ya establecido en el propio minimap: la lógica que se puede aislar del DOM va
a `src/lib/minimap.ts` (testable con Vitest); lo que depende de layout/foco/
eventos del navegador se cubre con Playwright, igual que el resto de
`tests/e2e/minimap.spec.ts`. No se toca el aspecto visual salvo los estados de
foco (`:focus-visible`) estrictamente necesarios para el criterio de
accesibilidad.

## Ficheros y áreas afectadas

- `src/lib/minimap.ts` — nueva función pura `gradeMark()` (fix 1).
- `src/components/Minimap.astro` — `resultFor()` usa `gradeMark()` (fix 1);
  `collectAnchors()` excluye anclas `hidden` + nuevo listener de
  `practica:filter-changed` (fix 2); ticks/filas ganan
  `role="button"`/`tabindex`/`aria-label` + manejo de teclado, refactor del
  handler de click a una función compartida (fix 3); apertura/cierre del
  drawer gestiona el foco (guardar/restaurar, mover foco al abrir, trampa de
  `Tab`, `Escape` cierra) (fix 4); sincroniza `aria-pressed` en
  `rebuild()`/`togglePin()` (fix 5).
- `src/components/PinButton.astro` — `aria-pressed="false"` por defecto,
  igual que el patrón ya usado en el botón «Ver respuesta» de
  `TestQuestion.astro`.
- `src/pages/practica/[asignatura].astro` — `applyFailedFilter()` emite
  `practica:filter-changed` tras (des)ocultar preguntas.
- `tests/unit/minimap.test.ts` — tests de `gradeMark()`.
- `tests/e2e/minimap.spec.ts` — nuevos tests de filtro, teclado, foco de
  drawer y `aria-pressed`; **se corrige** el test existente "grading colors
  the rail ticks…", que hoy asume (incorrectamente) que una pregunta sin
  responder cuenta como fallo.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod: ninguno.

## Reutilización

- `isCorrectPick()` (ya en `src/lib/minimap.ts`) se reutiliza dentro de
  `gradeMark()` en vez de reimplementar la comparación.
- El patrón `aria-pressed` ya existe en `TestQuestion.astro` (botón «Ver
  respuesta»); se replica tal cual en `PinButton`.
- El patrón de evento custom (`tq:graded`, `practica:stats-updated`) se
  reutiliza para `practica:filter-changed`, en vez de inventar otro mecanismo
  de sincronización.
- El `data-mm-label` que ya lleva cada ancla (usado hoy para el texto del
  tooltip/fila) se reutiliza como `aria-label` de ticks y filas — no hace
  falta un nuevo campo de datos.

## Estrategia de test (TDD)

- **Unit (Vitest)**: `gradeMark(correct, picked)` — devuelve `null` si
  `picked` está vacío, `'ok'`/`'bad'` en caso contrario (delegando en
  `isCorrectPick`). Es lo único de esta issue que es lógica pura sin DOM.
- **E2E (Playwright)**, contra `tests/e2e/minimap.spec.ts`:
  - Filtro: tras corregir con preguntas sin responder y activar «Solo mis
    fallos», `.mm-tick`/`.mm-lrow` solo existen para las preguntas visibles;
    al desactivar el filtro, vuelven a aparecer todas.
  - Teclado: enfocar un `.mm-tick`/`.mm-lrow` directamente (sin depender del
    orden completo de tabulación de la topbar) y pulsar `Enter`/`Espacio`
    produce el mismo salto que un click.
  - Foco del drawer: al abrir, `document.activeElement` queda dentro de
    `.mm-drawer`; `Tab` desde el último elemento focusable vuelve al primero
    (trampa); `Escape` cierra el drawer y devuelve el foco al control que lo
    abrió.
  - `aria-pressed`: fijar/desfijar un pin cambia su `aria-pressed`; tras
    recargar con un pin persistido, el botón nace con `aria-pressed="true"`.
  - Se **corrige** (no se borra) el test "grading colors the rail ticks…":
    pasa a marcar explícitamente una pregunta como fallo (opción incorrecta)
    y deja el resto sin responder, comprobando que esas quedan sin clase
    `ok`/`bad`.
- **Contenido**: no aplica (no se toca `src/content/`).

## Riesgos / decisiones

- El test e2e existente sobre coloreado codifica el bug del fix 1; se
  actualiza como parte de esa misma tarea (T1), no se dejan dos verdades
  contradictorias en el repo.
- El foco del rail: dado que en desktop el drawer está oculto por CSS
  (`display:none` bajo 1240px de ancho) y el rail es la única vía de
  navegación, hacer los ticks tabulables es la única forma de cumplir el
  criterio de teclado en desktop — no hay atajo para reducir el nº de
  paradas de tabulación sin rediseñar el rail, y el rediseño visual es
  no-objetivo de esta issue.
- `Escape` para cerrar el drawer no estaba pedido literalmente en la issue
  original, pero es prerequisito de un `role="dialog"` operable por teclado
  (criterio 5 de la spec); se añade como parte de la trampa de foco, no como
  tarea aparte.
- Se opta por una trampa de foco por `keydown` (en vez de `inert` en el resto
  de la página) porque el nodo del drawer vive dentro del mismo `<main>` que
  el resto del contenido de la página (herencia de `BaseLayout`), y aplicar
  `inert` ahí lo aplicaría también al propio drawer; la trampa por teclado
  evita ese problema sin reestructurar el layout.
