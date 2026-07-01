# Tasks — Filtrar preguntas de test por tema dentro de una asignatura

- **Issue**: #11
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #11)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — `uniqueTemas`: helper puro para derivar los temas distintos**
  - Test (rojo): `tests/unit/practica-temas.test.ts` — dedup, orden natural
    ("Tema 2" antes que "Tema 10"; también con valores tipo "T1".."T10"),
    ignora `undefined`/cadena vacía, devuelve `[]` si no hay ningún tema.
  - Implementación (verde): `src/lib/practica-temas.ts` —
    `uniqueTemas(temas: (string | undefined)[]): string[]`.
  - Commit: `feat(practica): add uniqueTemas helper for the topic filter (refs #11)`

- [x] **T2 — `gradeAll()` opera solo sobre preguntas visibles**
  - Test (rojo): en `tests/e2e/exam-mode.spec.ts`, extiende el test del
    subconjunto de N (T6 de la #9) para afirmar que, tras pulsar «Corregir
    test», `.score` muestra el total = N (no el banco completo).
  - Implementación (verde): en `src/components/TestQuestion.astro`, cambia el
    selector de `gradeAll()` de `[data-tq]` a `[data-tq]:not([hidden])`.
  - Commit: `fix(practica): grade only visible questions (refs #11)`

- [x] **T3 — `data-tema` en `TestQuestion` + grupo de botones de filtro**
  - Test (rojo): `tests/e2e/practica-tema-filter.spec.ts` — en `/practica/si`
    aparece el grupo «Filtrar por tema» con «Todos» + un botón por cada uno de
    los 10 temas; en `/practica/cl` (sin test) no aparece.
  - Implementación (verde): añade `data-tema={tema ?? ''}` al `<fieldset>` de
    `TestQuestion.astro`; en `src/pages/practica/[asignatura].astro`, calcula
    `uniqueTemas(tests.map(t => t.data.tema))` y renderiza el grupo de botones
    (patrón `.filter-btn` de `index.astro`) solo si no está vacío.
  - Commit: `feat(practica): add topic filter buttons (refs #11)`

- [x] **T4 — Aplicar el filtro: ocultar, minimap, corrección sobre visibles**
  - Test (rojo): elegir un tema deja visibles solo esas preguntas (resto
    `hidden`); el minimap (`.mm-tick`) las excluye; corregir con el filtro
    activo puntúa `.score` solo sobre las visibles.
  - Implementación (verde): wiring en `[asignatura].astro` — al pulsar un
    botón de tema, aplica `hidden` por comparación de `data-tema`, dispara
    `practica:filter-changed`.
  - Commit: `feat(practica): wire the topic filter to hide non-matching questions (refs #11)`

- [x] **T5 — Exclusión mutua con «solo mis fallos» y modo examen**
  - Test (rojo): activar el filtro de tema desactiva «solo mis fallos» y sale
    del modo examen si estaba activo; activar cualquiera de esos dos resetea
    el filtro de tema a «Todos».
  - Implementación (verde): el click de un botón de tema desmarca
    `[data-failed-toggle]` (y reaplica su filtro) y llama a `exitExam()` si
    `examActive`; `applyFailedFilter`/`startExam` resetean el filtro de tema a
    «Todos» al activarse.
  - Commit: `feat(practica): make the topic filter mutually exclusive with the other filters (refs #11)`

## Verificación final (Gate B)

- [x] `astro check` sin errores
- [x] `npm test` en verde
- [x] `npm run build` + `npm run test:e2e` en verde
- [x] Cada criterio de aceptación de `spec.md` comprobado
