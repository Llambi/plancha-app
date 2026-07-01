# Plan técnico — Filtrar preguntas de test por tema dentro de una asignatura

- **Issue**: #11
- **Spec**: ./spec.md
- **Rama**: 11-test-topic-filter

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Un grupo de botones «Filtrar por tema» se añade a la sección de test de
`/practica/<asignatura>`, con el mismo patrón visual/interactivo que
`.filter-btn` de `src/pages/index.astro` (botones nativos + `aria-pressed`,
sin necesidad de roving tabindex porque son `<button>` reales). Los temas se
derivan con una función pura nueva (`uniqueTemas`) a partir de los `tests` ya
disponibles en el frontmatter de la página — sin tocar contenido ni schema.
Seleccionar un tema oculta (`hidden`) las preguntas que no matchean, reutilizando
el mismo mecanismo que ya usan «solo mis fallos» (#10) y «modo examen» (#9)
para que el minimap las excluya (`practica:filter-changed`, ya escuchado). Los
tres controles (tema / fallos / examen) son mutuamente excluyentes: activar
uno resetea los otros dos, igual que ya hacen entre sí «modo examen» y «solo
mis fallos» desde la #9.

El cambio de comportamiento acordado con el usuario —`gradeAll()` debe operar
solo sobre `[data-tq]` visibles— se aplica en `TestQuestion.astro`, cambiando
el selector de `[data-tq]` a `[data-tq]:not([hidden])`. Es un cambio de una
línea con efecto correcto también sobre el modo examen (#9): al corregir un
subconjunto de N preguntas, el contador pasa a reflejar N, no el banco
completo.

## Ficheros y áreas afectadas

- `src/lib/practica-temas.ts` (**nuevo**) — `uniqueTemas(temas: (string |
undefined)[]): string[]`: dedup + orden natural (`localeCompare` con
  `numeric: true`, para que "Tema 2" preceda a "Tema 10"), ignora
  `undefined`/vacíos, devuelve `[]` si ninguna pregunta tiene `tema`.
- `src/components/TestQuestion.astro` — añade `data-tema={tema ?? ''}` al
  `<fieldset>` (para que el filtro pueda leerlo desde el DOM) y cambia
  `gradeAll()` para operar solo sobre `[data-tq]:not([hidden])`.
- `src/pages/practica/[asignatura].astro` — grupo de botones de filtro por
  tema (solo si `uniqueTemas(...)` no está vacío) + wiring: aplicar/quitar
  `hidden`, exclusión mutua con `[data-failed-toggle]` y el modo examen
  (`examActive`/`exitExam`), disparo de `practica:filter-changed`.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no (`tema` ya existe como
  opcional en `test`).

## Reutilización

- Patrón de botones `.filter-btn`/`aria-pressed` de `src/pages/index.astro`
  (mismo HTML/CSS, sin inventar un componente nuevo dado que solo se usa aquí).
- `practica:filter-changed` (ya escuchado por `Minimap.astro`) — el filtro de
  tema dispara el mismo evento, sin tocar `Minimap.astro`.
- El patrón de exclusión mutua ya establecido entre `examActive`/`exitExam` y
  `failedToggle` (issue #9) se extiende al tercer control (tema) con la misma
  idea: "el último control activado gana, resetea a los otros dos".
- `a.localeCompare(b, 'es', { numeric: true })` — mismo comparador ya usado en
  el `getStaticPaths` de la propia página para ordenar ids de test.

## Estrategia de test (TDD)

- **Unit (Vitest)**, `tests/unit/practica-temas.test.ts`:
  - `uniqueTemas`: dedup, orden natural ("Tema 2" antes que "Tema 10"), ignora
    `undefined`, devuelve `[]` si no hay ningún tema (caso de degradación
    elegante — no hay hoy una asignatura de práctica sin `tema`, así que este
    caso solo es cubribre por unit test, no e2e).
- **E2E (Playwright)**, `tests/e2e/practica-tema-filter.spec.ts` contra
  `/practica/si` (10 temas) y `/practica/dar` (10 temas, ids no numéricos
  simples — sirve para probar el orden natural con datos reales):
  - El grupo de botones aparece con «Todos» + un botón por tema.
  - Elegir un tema deja visibles solo esas preguntas; el resto `hidden`; el
    minimap (`.mm-tick`) las excluye.
  - Corregir con un tema activo puntúa solo sobre las visibles (contador
    `.score` con el total del tema, no el banco completo).
  - Activar el filtro de tema desactiva «solo mis fallos» y sale del modo
    examen si estaba activo, y viceversa (extiende el test ya existente de
    exclusión mutua de `tests/e2e/exam-mode.spec.ts`).
- **Regresión del cambio en `gradeAll()`**: añade una aserción en
  `tests/e2e/exam-mode.spec.ts` (subconjunto de N) de que, tras corregir, el
  contador `.score` muestra el total = N, no el banco completo.
- **Contenido**: no aplica (no se toca `src/content/`); `astro check` +
  `astro build` verifican tipado.

## Riesgos / decisiones

- **Tres controles mutuamente excluyentes en vez de combinables**: más simple
  y consistente con lo ya decidido en #9; combinarlos (intersección de
  filtros) sería un rediseño de `applyFailedFilter`/`startExam`/tema no pedido
  por ninguna de las tres issues y con más superficie de bugs.
- **Cambio de comportamiento en `gradeAll()`**: acordado explícitamente con el
  usuario; se revisa que no rompa los tests e2e existentes de `practica-stats`,
  `practica-progress` y `exam-mode` (ninguno corrige con un filtro ya activo,
  así que el comportamiento no cambia para ellos — se verifica en Implement).
