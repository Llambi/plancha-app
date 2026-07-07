# Plan técnico — Validador de MongoDB: el test de consultas no es accesible por teclado

- **Issue**: #41
- **Spec**: ./spec.md
- **Rama**: 41-mongo-quiz-keyboard-a11y

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Sustituir el `<div class="opt" onclick="pick(qi,oi)">` de cada opción por un
`<label class="opt">` que envuelve un `<input type="radio">` real (agrupado
por pregunta vía `name="q-${current}-${qi}"`, ya que cada pregunta tiene una
única respuesta correcta). El `<input>` se posiciona visualmente oculto
(patrón "visually-hidden" estándar: `position:absolute` + `clip`, **no**
`display:none`/`visibility:hidden`, que romperían el foco/teclado) para no
alterar el diseño visual actual (letra + código resaltado + color de borde
según estado). El foco de teclado se hace visible reenviando
`:focus-visible` del input oculto al `<label>` visible vía `:has()`.

El `id` que ya usa todo el JS existente
(`opt-${current}-${qi}-${oi}`) se mantiene en el `<label>` externo (no se
mueve al `<input>`), así que `markSelected()`/`applyCorrection()` siguen
funcionando con `document.getElementById(...)` sin más cambios que añadir
`input.checked`/`input.disabled` donde corresponde. `pick(qi, oi)` pasa de
dispararse por `onclick` en el div a `onchange` en el input (se dispara
igual al hacer clic en cualquier parte del `<label>`, por la asociación
label↔input nativa, y también al seleccionar con teclado).

## Ficheros y áreas afectadas

- `src/components/MongoPractica.astro` — único fichero tocado:
  - Marcado de cada opción (dentro de `render()`).
  - `markSelected()` — añade `input.checked = true`.
  - `applyCorrection()` — añade `input.disabled = true` al bloquear cada
    opción.
  - CSS: `.opt` pasa a `position: relative`; nueva clase `.opt-radio`
    (visually-hidden) y regla `:focus-visible` reenviada al `.opt`.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- Patrón "visually-hidden" — no existe ya en el repo (el resto del sitio usa
  radios/checkboxes _visibles_, p. ej. `TestQuestion.astro`), así que aquí sí
  hace falta introducirlo puntualmente para no alterar el diseño ya afinado
  de esta vista. No se generaliza a un componente/clase global — se queda
  scopeado a `.mongo-practica` igual que el resto del CSS de este componente.
- `--spring` (token de acento verde ya usado en `.opt.sel`/`.opt:hover`) se
  reutiliza para el anillo de foco, sin introducir un color nuevo.

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica — no hay lógica nueva en `src/lib`; todo el
  cambio vive en el script inline de `MongoPractica.astro`.
- **E2E (Playwright)**: nuevo fichero `tests/e2e/mongo-practica.spec.ts` (no
  existía cobertura E2E de `/practica/mongodb`) con tests que:
  1. Confirman que cada opción es un `input[type="radio"]` con `name`
     compartido por pregunta.
  2. Seleccionan una opción **solo con teclado** (`Tab` hasta ella + `Space`)
     y comprueban que queda `checked`.
  3. Corrigen el test y comprueban que los inputs de esa pregunta quedan
     `disabled`.
  4. Comprueban que el resto del comportamiento (colores correct/wrong,
     marcador de puntuación) no cambia.
- **Contenido**: no aplica.

## Riesgos / decisiones

- **`:has()` en CSS**: no se usaba en ningún otro fichero del repo
  (comprobado con `grep`); sería la primera vez que se introduce. Soporte de
  navegadores modernos (Chrome/Edge/Safari/Firefox actuales) suficiente para
  un proyecto personal sin matriz de compatibilidad legacy, pero se señala
  aquí por ser una novedad, no una reutilización de un patrón ya probado en
  el repo.
- **No se añade `<fieldset>`/`<legend>`**: mejora de agrupación semántica
  fuera del alcance de esta issue (ver spec.md, no-objetivos).
- **Sin cambios en `pick()`/`applyCorrection()`/`resetTest()` más allá de lo
  descrito**: se preserva toda la lógica de puntuación/feedback existente.
