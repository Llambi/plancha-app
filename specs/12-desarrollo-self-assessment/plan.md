# Plan técnico — Autoevaluación en preguntas de desarrollo

- **Issue**: #12
- **Spec**: ./spec.md
- **Rama**: 12-desarrollo-self-assessment

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Un núcleo puro nuevo (`src/lib/desarrollo-progress.ts`) modela el estado de
autoevaluación (`Record<id, 'sabia' | 'medias' | 'no'>`) y su persistencia en
`localStorage`, namespaced por asignatura — mismo patrón exacto que
`practica-progress.ts` (interfaz + `keyFor`/`serialize`/`parse` defensivo +
`pruneAnswers`), más un `summarize` propio para los conteos. El wiring de DOM
vive en el `<script>` de `DesarrolloQuestion.astro` (donde ya vive el toggle
de «Ver respuesta modelo»): tres botones nativos con `aria-pressed` por
pregunta, un solo activo a la vez. Al pulsar, se guarda el estado y se
dispara un evento (`desarrollo:stats-updated`, mismo nombre de patrón que
`practica:stats-updated`) que la página de práctica escucha para repintar un
resumen propio (independiente de `practica-stats.ts`, que modela
correcto/incorrecto y no encaja con el 3-estados).

Como `DesarrolloQuestion.astro` no tiene hoy forma de saber la `asignatura`
(el atributo `data-practica` solo está en la sección de test), se añade
`data-desarrollo={code}` a la sección de desarrollo de
`src/pages/practica/[asignatura].astro`, análogo a `data-practica`.

## Ficheros y áreas afectadas

- `src/lib/desarrollo-progress.ts` (**nuevo**) — tipo `SelfAssessment`,
  `DesarrolloProgressState`, `keyFor`, `serialize`, `parse` (defensivo),
  `pruneAnswers`, `summarize`.
- `src/components/DesarrolloQuestion.astro` — añade el grupo de 3 botones
  (`role="group"`, `aria-pressed`) tras la respuesta modelo; script para
  seleccionar/persistir/restaurar y disparar `desarrollo:stats-updated`.
- `src/pages/practica/[asignatura].astro` — `data-desarrollo={code}` en la
  sección de desarrollo; panel de resumen (`data-dev-stats-summary`) +
  listener de `desarrollo:stats-updated`.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- Patrón `keyFor`/`serialize`/`parse` defensivo + `pruneAnswers` de
  `practica-progress.ts` (mismo estilo, estado distinto).
- Patrón del panel de resumen (`renderStats()`/`[data-stats-summary]`) de
  `src/pages/practica/[asignatura].astro`, replicado para desarrollo sin
  tocar el original.
- `safeGet`/`safeSet` (localStorage con try/catch) ya presentes en la página.

## Estrategia de test (TDD)

- **Unit (Vitest)**, `tests/unit/desarrollo-progress.test.ts`:
  - `keyFor`: namespacing por asignatura.
  - `serialize`/`parse`: round-trip; defensivo ante JSON inválido/incompleto
    (mismo catálogo de casos que `practica-progress.test.ts`).
  - `pruneAnswers`: descarta ids que ya no existen.
  - `summarize`: cuenta correctamente sabía/a medias/no sabía y el total
    autoevaluado.
- **E2E (Playwright)**, `tests/e2e/desarrollo-self-assessment.spec.ts` contra
  `/practica/si` (tiene preguntas de desarrollo):
  - Los 3 botones aparecen por pregunta, ninguno activo por defecto.
  - Pulsar uno lo marca activo y desmarca los otros dos (de esa pregunta).
  - Tras recargar, la selección persiste.
  - El resumen de conteos aparece y se actualiza al autoevaluar más de una
    pregunta.
- **Contenido**: no aplica (no se toca `src/content/`); `astro check` +
  `astro build` verifican tipado.

## Riesgos / decisiones

- **Resumen independiente de `practica-stats.ts`**: acordado con el usuario;
  evita forzar un modelo correcto/incorrecto sobre un 3-estados subjetivo.
- **Sin botón de reset**: no lo pide la issue; se añade solo si surge la
  necesidad en una issue futura (no se sobre-construye ahora).
- **`data-desarrollo` nuevo en la página**: cambio aditivo, no toca
  `data-practica` ni el wiring existente del panel de test.
