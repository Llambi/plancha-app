# Plan técnico — Nombre accesible redundante en preguntas de test

- **Issue**: #45
- **Spec**: ./spec.md
- **Rama**: 45-test-question-legend-name

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Se descarta la opción de sacar `<PinButton />` del `<legend>` en el DOM:
`<legend>` solo se trata como el título semántico de un `<fieldset>` cuando
es su **hijo directo**; envolverlo en un `<div class="tq-head">` (para
poder colocar el botón como hermano en la misma fila) le haría perder esa
semántica nativa por completo, rompiendo el mecanismo de nombre accesible
en sí (no solo el ruido que se quiere arreglar). Conseguir que un botón
fuera del legend quede visualmente en la misma fila, sin ese contenedor
compartido, tampoco es viable de forma simple/robusta (un `<legend>` solo
se renderiza en flujo normal junto a hermanos con trucos de posicionamiento
frágiles).

En su lugar (segunda opción que la propia issue contempla): añadir
`id={`q-${id}-label`}` al `<span class="tq-q">` ya existente (que envuelve
el enunciado + indicadores, sin el botón), y `aria-labelledby={`q-${id}-label`}`
en el `<fieldset>`. `aria-labelledby` tiene prioridad sobre el legend nativo
en el cálculo del nombre accesible (algoritmo accname: aria-labelledby >
aria-label > etiquetado nativo del lenguaje de host), así que el nombre del
grupo pasa a ser exactamente el contenido de `.tq-q`, sin el botón.

## Ficheros y áreas afectadas

- `src/components/TestQuestion.astro` — dos atributos añadidos
  (`id` en `.tq-q`, `aria-labelledby` en el `fieldset`). Sin cambios de
  CSS ni de script.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- El `id` de la pregunta (prop `id`) ya existe y se reutiliza para derivar
  el nuevo id del label (`q-${id}-label`), mismo patrón que `q-${id}` para
  el propio fieldset.

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica — cambio de atributos HTML, sin lógica en
  `src/lib`.
- **E2E (Playwright)**: nuevo test en `tests/e2e/practica.spec.ts` (junto a
  los ya existentes del reveal) que comprueba, para la primera pregunta de
  `/practica/si` (single, sin indicadores), que el nombre accesible del
  `fieldset` es exactamente el texto del enunciado — un match exacto falla
  automáticamente si "Fijar pregunta" (o el número) siguiera colándose.
- **Contenido**: no aplica.

## Riesgos / decisiones

- **El número (`.tq-num`) también queda fuera del nombre accesible**: la
  issue pide explícitamente "que apunte solo al texto de la pregunta", así
  que se sigue al pie de la letra (no se añade `.tq-num` a la cadena de
  `aria-labelledby`). El número sigue siendo visible para usuarios
  videntes; para lectores de pantalla, la posición se transmite por el
  orden de navegación entre fieldsets, no por el nombre.
- **`EsquemaTree.astro`/`DesarrolloQuestion.astro`**: usan `<PinButton />`
  pero no son `fieldset`/`legend` (son `<section>`/`<article>`), así que no
  tienen este problema — fuera de alcance, ya excluido en la spec.
