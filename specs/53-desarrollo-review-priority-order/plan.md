# Plan técnico — Repetición espaciada para la autoevaluación de preguntas de desarrollo

- **Issue**: #53
- **Spec**: ./spec.md
- **Rama**: 53-desarrollo-review-priority-order

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Función pura genérica `buildReviewOrder<T>(items, idOf, answers)` en
`desarrollo-progress.ts` que ordena por prioridad de repaso: `no` (0) < `medias`
(1) < sin autoevaluar (2) < `sabia` (3), con `Array.prototype.sort` estable
(Node/V8 ya lo garantiza) para conservar el orden relativo dentro de cada grupo.
En `/practica/<asignatura>`, un checkbox nuevo en el panel "Autoevaluación"
("Repasar primero lo que no sé") activa/desactiva el reordenado: al activarse,
lee el estado ya persistido (`parseDevProgress(safeGet(devKeyFor(asignatura)))`),
calcula el orden con `buildReviewOrder` sobre los elementos `[data-dq]` ya
renderizados, y los reordena en el DOM con `container.appendChild(q)` — el mismo
patrón no destructivo que ya usa `startExam()`/`exitExam()` para las preguntas
tipo test. Al desactivarse, se restaura el orden original guardado al cargar la
página. No se persiste el estado del toggle (arranca siempre desmarcado/orden
secuencial, tal como pide la spec).

## Ficheros y áreas afectados

- `src/lib/desarrollo-progress.ts` — añade `buildReviewOrder<T>()` (pura,
  genérica sobre `T` para poder testear con datos simples y usar con elementos
  DOM sin acoplar la librería a `Element`).
- `src/pages/practica/[asignatura].astro` — añade el checkbox en el panel
  `data-dev-stats`, captura `originalDevOrder` al cargar (igual que
  `originalOrder` para preguntas test), wiring del toggle (`change` ->
  reordenar o restaurar + `document.dispatchEvent(new
CustomEvent('practica:filter-changed'))` para que el minimap reconstruya el
  rail con el nuevo orden, igual que hace el modo examen).
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- `parse`/`keyFor`/`SelfAssessment` ya existentes de `desarrollo-progress.ts`
  para leer el estado sin tocar el modelo de datos.
- Patrón de reordenado de DOM (`container.appendChild(q)` por cada elemento en
  el orden calculado) ya usado por `startExam()`/`exitExam()` en la misma
  página, incluido el disparo de `practica:filter-changed` para que
  `Minimap.astro` (que escucha ese evento) reconstruya el rail en el nuevo
  orden.
- Estructura y clases CSS `.stats-actions`/`.stats-toggle` ya definidas en esta
  misma página para el toggle «solo mis fallos» — se reutilizan tal cual para
  el nuevo checkbox, sin nuevas reglas de estilo.

## Estrategia de test (TDD)

- **Unit (Vitest)**: se amplía `tests/unit/desarrollo-progress.test.ts` con
  casos para `buildReviewOrder()` — orden `no` > `medias` > sin autoevaluar >
  `sabia`; empates dentro de un mismo grupo conservan el orden original
  (estabilidad); un `answers` vacío no reordena nada (todo "sin autoevaluar",
  mismo orden relativo que la entrada).
- **E2E (Playwright)**: se amplía `tests/e2e/desarrollo-self-assessment.spec.ts`
  — marcar una pregunta tardía como "No lo sabía" y otra temprana como "Lo
  sabía", activar el toggle y comprobar que la marcada "No lo sabía" pasa a ser
  la primera visible; desactivar el toggle y comprobar que se restaura el
  orden original.
- **Contenido**: no aplica (no toca `src/content/`); se valida con `astro
check` + `astro build` por higiene general.

## Riesgos / decisiones

- No se persiste el estado del toggle: cada carga de página empieza en orden
  secuencial (cumple explícitamente el criterio 2 de la spec de "no perder la
  vista secuencial como opción" sin necesitar una clave nueva en
  `localStorage` para recordar la preferencia).
- Se descarta cualquier noción de "antigüedad del último repaso" porque hoy no
  existe ese dato y añadirlo sería almacenamiento nuevo, fuera del alcance
  acordado en la spec (criterio 3).
