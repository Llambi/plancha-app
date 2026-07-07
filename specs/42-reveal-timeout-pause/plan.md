# Plan técnico — «Ver respuesta» se oculta a los 5s sin forma de detener o ampliar el tiempo

- **Issue**: #42
- **Spec**: ./spec.md
- **Rama**: 42-reveal-timeout-pause

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

`TestQuestion.astro` ya tiene `revealTimers` (un `WeakMap<HTMLElement, number>`
que guarda el id del `setTimeout` pendiente por pregunta) y `revealAnswer()`/
`hideReveal()`. Se extrae la programación del `setTimeout` a dos funciones
pequeñas, `scheduleHide(q)` y `cancelHide(q)`, reutilizando el mismo mapa. Se
añaden 4 listeners delegados en `document` (mismo patrón que el resto del
fichero, que ya delega `click`/`change`/`input` en `document`):

- `mouseover`/`focusin` sobre `.tq-exp` o `[data-reveal-trigger]` → `cancelHide(q)`.
- `mouseout`/`focusout` saliendo de esa misma zona (comprobando
  `relatedTarget` para no disparar en movimientos internos) → `scheduleHide(q)`,
  pero solo si esa pregunta sigue con la explicación temporalmente visible y
  no está `graded` (una pregunta corregida en bloque no tiene temporizador
  que reprogramar).

No se cambia `REVEAL_MS` (sigue en 5000) ni la lógica de `hideReveal()`
salvo extraer la creación del timeout a `scheduleHide()`.

## Ficheros y áreas afectadas

- `src/components/TestQuestion.astro` — único fichero tocado (el bloque
  `<script>` de auto-ocultado).
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- `revealTimers` (ya existente) seguirá siendo la única fuente de verdad de
  "hay un temporizador pendiente para esta pregunta"; no se añade un segundo
  mapa de estado.
- Mismo patrón de delegación en `document` que ya usa el fichero para
  `click`/`change`/`input` (no se añaden listeners por elemento).

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica — no hay lógica nueva en `src/lib`; toda la
  lógica vive en el script inline del componente, ligada al DOM.
- **E2E (Playwright)**: se añaden 2 tests a `tests/e2e/practica.spec.ts`
  (junto al test ya existente de este mismo botón, issue #5):
  1. Con el ratón sobre `.tq-exp`, sigue visible pasados los 5s; al sacar el
     ratón, se oculta tras 5s adicionales.
  2. Con el foco de teclado en `[data-reveal-trigger]` tras activarlo, sigue
     visible pasados los 5s.
     Ambos, como el test ya existente de esta issue, esperan tiempo real (sin
     reloj simulado), consistente con el estilo ya usado en el fichero.
- **Contenido**: no aplica.

## Riesgos / decisiones

- **Sin reloj simulado (`page.clock`)**: el test existente de #5 ya espera
  tiempo real (~7s); se mantiene el mismo enfoque en vez de introducir un
  patrón nuevo (`page.clock`) solo para esta issue, a costa de que la suite
  E2E tarde un poco más.
- **Alcance del "área de interacción"**: solo `.tq-exp` y el botón de
  revelar, tal como pide la spec — no se extiende a toda la tarjeta de
  pregunta ni a las opciones marcadas como `revealed`.
- **Hallazgo durante `/implement`**: al activar "Ver respuesta" con teclado
  (foco ya en el botón antes de que exista `.tq-exp` visible), el
  `focusin` que normalmente pausaría el temporizador nunca llega a
  dispararse tras el revelado (el foco no cambia de sitio). Hubo que añadir
  una comprobación directa en `revealAnswer()` justo tras programar el
  ocultado. La primera versión comprobaba `document.activeElement ===
trigger`, pero eso **también** es cierto tras un simple clic de ratón en
  Chromium (que enfoca el botón), rompiendo el test ya existente de la
  issue #5 (que espera que un clic normal sí se autooculte a los 5s). Se
  corrigió usando `trigger.matches(':focus-visible')` en su lugar, que sí
  distingue foco de teclado (deliberado) de foco incidental por clic de
  ratón — sin este matiz, mouse-hover y keyboard-focus habrían quedado
  indistinguibles en el momento del revelado.
