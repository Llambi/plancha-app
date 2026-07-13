# Plan técnico — Práctica: permitir combinar el filtro de tema con «solo mis fallos»

- **Issue**: #55
- **Spec**: ./spec.md
- **Rama**: 55-combine-tema-and-failed-filters

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Hoy `applyFailedFilter()` y `applyTemaFilter()` recalculan `hidden` sobre
`[data-tq]` cada una desde cero (ignorando a la otra), y sus wiring
(`failedToggle` `change`, click de tema) resetean explícitamente al otro
filtro antes de aplicar el suyo. Se sustituyen ambas por una única
`applyFilters()` que combina los dos criterios con OR sobre "ocultar":
`q.hidden = (failedOn && !failed.has(q.id)) || (temaFilter !== 'all' &&
q.dataset.tema !== temaFilter)` — una pregunta se ve solo si pasa ambos
filtros activos a la vez (intersección). Se quitan las llamadas que
reseteaban un filtro al activar el otro (`resetTemaButtons()` desde el
handler de `failedToggle`, y desmarcar `failedToggle` desde el click de
tema), manteniendo intacto el reset de ambos al entrar en modo examen
(`startExam()`) y la salida del examen al activar cualquiera de los dos
(`if (examActive) exitExam()`), que es el único punto de exclusión que la
spec conserva.

## Ficheros y áreas afectados

- `src/pages/practica/[asignatura].astro` — sustituye `applyFailedFilter()` +
  `applyTemaFilter()` por `applyFilters()` (combinada); actualiza sus tres
  puntos de llamada (`failedToggle` `change`, click de botón de tema, reset de
  estadísticas) y simplifica el comentario que documentaba la exclusión mutua.
  `startExam()` sigue reseteando ambos filtros al arrancar (sin cambios en esa
  parte).
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- No se añade lógica nueva de storage/lectura: `applyFilters()` reutiliza
  exactamente la misma lectura de `plancha:stats:<asignatura>` vía
  `parseStats`/`failedIds` que ya usaba `applyFailedFilter()`.
- Se mantiene el mismo evento `practica:filter-changed` que ya escucha
  `Minimap.astro` para reconstruir el rail.

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica — no hay lógica pura nueva extraíble (es
  wiring de DOM sobre controles ya existentes, sin nueva lógica de
  `src/lib`); la cobertura va por e2e, que es como ya está testeado el resto
  de la interacción de filtros en esta página.
- **E2E (Playwright)**: en `tests/e2e/practica-tema-filter.spec.ts`, se
  sustituye el test "el filtro de tema es mutuamente excluyente con «solo mis
  fallos»..." (que asume el comportamiento antiguo) por dos tests: (a)
  activar un tema y luego "solo mis fallos" deja visible solo la
  intersección, y desactivar "solo mis fallos" restaura el tema sin
  perderlo; (b) el modo examen sigue siendo excluyente respecto a ambos
  (las mismas aserciones que tenía el test antiguo para esa parte).
- **Contenido**: no aplica; se valida con `astro check` + `astro build`.

## Riesgos / decisiones

- Se elimina un test e2e existente que verificaba el comportamiento antiguo
  (exclusión mutua tema/fallos) porque ese comportamiento es exactamente lo
  que esta issue cambia a propósito; se sustituye por tests que verifican el
  nuevo comportamiento combinado, conservando la parte que sí sigue siendo
  cierta (exclusión con el modo examen).
- No se toca el modo examen: sigue reseteando ambos filtros al arrancar y
  siendo la única relación de exclusión que queda en la página.
