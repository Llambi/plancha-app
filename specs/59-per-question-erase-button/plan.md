# Plan técnico — Botón para borrar la respuesta de una pregunta individual

- **Issue**: #59
- **Spec**: ./spec.md
- **Rama**: 59-per-question-erase-button

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

**No se extrae un `EraseButton.astro` compartido.** `PinButton.astro`
funciona como componente compartido porque su estado (pinned) y estilos
viven en `Minimap.astro` vía `<style is:global>` — un `<style>` `scoped`
normal de Astro no llega a elementos renderizados por un componente hijo
(por eso Minimap.astro ya tiene que usar `is:global` para `.pin-btn`). El
botón de borrar no tiene ese mismo caso de uso (más de dos tipos de host
heterogéneos con el mismo estado compartido) — cada uno de los dos sitios
(`TestQuestion`, `DesarrolloQuestion`) tiene su propia lógica de
confirmación y su propia condición de visibilidad, así que se inlinea el
marcado (SVG + botón) de forma independiente y `scoped` en cada componente,
evitando pelearse con el scoping de Astro para un beneficio marginal.

**Núcleo puro** — una función `clearAnswer()` por módulo:

- `src/lib/practica-progress.ts`: `clearAnswer(state, questionId)` — quita
  `questionId` de `state.answers`, deja `graded`/`score`/`total` intactos
  (el botón no está disponible una vez `graded`, así que no hay nada que
  recalcular).
- `src/lib/desarrollo-progress.ts`: `clearAnswer(state, questionId)` — quita
  `questionId` de **`state.answers` y `state.drafts`** a la vez.

**Confirmación** — patrón común a ambos componentes (implementado dos
veces, uno por script, no compartido): primer clic añade la clase
`.confirm` al botón (icono/color de aviso, `aria-label` actualizado) y
arma un `setTimeout` de 4000 ms que revierte el estado si no se confirma;
un segundo clic dentro de esa ventana cancela el timer, ejecuta el borrado
real y revierte el botón a su estado normal.

**Visibilidad en test**: el botón de borrar se oculta con
`.tq.graded .tq-erase { display: none; }` — mismo patrón ya usado para
`.tq.graded .tq-reveal`, comprobando la clase `.graded` del propio
`fieldset` (que ya reflejaba correctamente los casos límite de preguntas
ocultas durante una corrección, issue #20).

**Icono**: SVG inline con el mismo estilo de trazo que `PinButton`
(`fill: none; stroke: currentColor; stroke-width: 1.7`), forma simple de
goma de borrar (rectángulo redondeado inclinado + línea de base).

## Ficheros y áreas afectadas

- `src/lib/practica-progress.ts` — `clearAnswer()`.
- `src/lib/desarrollo-progress.ts` — `clearAnswer()`.
- `src/components/TestQuestion.astro` — botón `.tq-erase` en `.tq-head`
  (junto a `PinButton`), lógica de confirmación + borrado en el `<script>`
  ya existente.
- `src/components/DesarrolloQuestion.astro` — botón `.dq-erase` en
  `.dq-head`, misma lógica adaptada a su propio estado.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- `keyFor`/`parse`/`serialize`/`safeGet`/`safeSet` ya existentes en ambos
  módulos y componentes — el borrado usa exactamente el mismo mecanismo de
  persistencia que ya usa el resto de cada página.
- Mismo patrón visual de icono en línea que `PinButton.astro` (trazo, no
  relleno), sin reutilizar el componente en sí (ver Enfoque).

## Estrategia de test (TDD)

- **Unit (Vitest)**:
  - `tests/unit/practica-progress.test.ts`: `clearAnswer()` — quita solo
    la pregunta indicada; deja las demás intactas; deja
    `graded`/`score`/`total` intactos; no falla si la pregunta no tenía
    respuesta.
  - `tests/unit/desarrollo-progress.test.ts`: `clearAnswer()` — quita
    respuesta y borrador de la pregunta indicada a la vez; deja otras
    preguntas intactas.
- **E2E (Playwright)**:
  - `tests/e2e/practica-erase.spec.ts` (nuevo): un clic no borra nada
    (requiere confirmación); dos clics sí desmarca la opción y persiste
    tras recargar; el botón desaparece tras corregir en bloque.
  - `tests/e2e/desarrollo-erase.spec.ts` (nuevo): dos clics vacían el
    textarea, quitan la autoevaluación, y ambos cambios persisten tras
    recargar.
- **Contenido**: no aplica.

## Riesgos / decisiones

- **Confirmación no compartida entre componentes**: se acepta una pequeña
  duplicación de lógica (temporizador + clase `.confirm`) entre
  `TestQuestion.astro` y `DesarrolloQuestion.astro` en vez de forzar una
  utilidad compartida — cada uno ya tiene su propio `<script>` independiente
  y su propio criterio de qué borrar.
- **4000 ms de ventana de confirmación**: valor concreto elegido para que
  sea determinista y testeable (ni tan corto que sea difícil de acertar en
  un test E2E, ni tan largo que estorbe en uso real).
