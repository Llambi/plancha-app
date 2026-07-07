# Plan técnico — FAB «Mapa» solapa preguntas/opciones en viewports menores de 1240px

- **Issue**: #40
- **Spec**: ./spec.md
- **Rama**: 40-fix-fab-map-overlap

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

`Minimap.astro` ya resuelve exactamente este mismo problema para un obstáculo
conocido y estático (los chips `[data-tema-filters]`, issue #29):
`updateFabPosition()` mide el rectángulo del obstáculo y llama a
`computeFabBottom()` (función pura ya testeada en `src/lib/minimap.ts`) para
calcular cuánto hay que subir el FAB para no taparlo. El bug de este issue es
el mismo problema, pero con un "obstáculo" dinámico: cualquier tarjeta
(`.mm-anchor`) que en un momento dado caiga bajo el rectángulo del FAB.

La solución generaliza el patrón existente en vez de crear uno nuevo: en cada
`updateFabPosition()` (ya se ejecuta en cada `scroll`), además de comprobar el
obstáculo de los filtros de tema, se recorre el array `anchors` (ya recolectado
en memoria por `rebuild()`) buscando cualquiera cuyo rectángulo solape
verticalmente con la franja del FAB, y se usa la misma `computeFabBottom()`
para calcular el empuje necesario. El resultado final es el máximo entre el
empuje por filtros y el empuje por contenido — así ambos casos (que podrían
coincidir, aunque sea raro) se respetan sin que uno pise al otro.

No se toca `computeFabBottom()` ni su firma: es una función pura de un único
obstáculo, y llamarla una vez por candidato y quedarse con el máximo evita
tener que generalizar su API (que ya tiene tests unitarios cubriendo casos
límite) para un beneficio marginal.

## Ficheros y áreas afectadas

- `src/components/Minimap.astro` — generalizar `updateFabPosition()` (única
  función que cambia). No se tocan `buildRail()`, `buildDrawer()`,
  `collectAnchors()` ni el resto del componente.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- `computeFabBottom()` (`src/lib/minimap.ts:92-100`) — se reutiliza tal cual,
  sin cambios de firma ni de comportamiento.
- `anchors` (array ya poblado por `collectAnchors()`/`rebuild()` en
  `Minimap.astro`) — ya contiene, en orden de documento, todas las tarjetas de
  test/desarrollo/esquema no ocultas; no hace falta recolectar nada nuevo.
- `fabEl.offsetHeight`, `FAB_DEFAULT_BOTTOM`, `FAB_GAP` — constantes/medidas ya
  existentes en el componente, usadas hoy solo para el caso de los filtros.

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica — `computeFabBottom()` no cambia de firma ni de
  comportamiento, sus tests actuales (`tests/unit/minimap.test.ts`) siguen
  siendo válidos tal cual y no requieren cambios.
- **E2E (Playwright)**: nuevo test en `tests/e2e/minimap.spec.ts` (junto al ya
  existente «the FAB never covers a tema filter chip…», del issue #29), que:
  1. Fija el viewport a 375×812.
  2. Va a `/practica/si` (tiene test + desarrollo, cubre ambos tipos de
     tarjeta).
  3. Calcula `maxScroll` y muestrea ~10 posiciones repartidas entre 0 y
     `maxScroll` (incluyendo extremos e intermedias) en vez de recorrer todo
     el documento en pasos fijos, para no acoplar el test a la longitud total
     del contenido ni hacerlo lento.
  4. En cada posición, comprueba que ningún `[data-tq]`/`[data-dq]` solapa el
     rectángulo de `.mm-fab` (mismo helper `intersects` ya usado en el test
     de #29, duplicado igual que allí — no se extrae a `helpers.ts` porque el
     propio test de #29 tampoco lo hizo).
  - Este test debe **fallar en rojo** contra el código actual (reproduce el
    bug) antes de tocar `Minimap.astro`.
- **Contenido**: no aplica (no toca `src/content/`).

## Riesgos / decisiones

- **Coste en `scroll`**: se añade un recorrido de `anchors` (getBoundingClientRect
  por elemento) en cada evento de scroll. Para la asignatura más grande del
  sitio (DAR, 257 preguntas) es un recorrido de ese orden por evento; son
  lecturas de layout baratas y sin escritura intercalada (no hay thrashing), y
  el propio componente ya hace un recorrido equivalente en `buildRail()` en
  cada `rebuild()`. No se introduce throttling/rAF nuevo porque el código
  existente tampoco lo tenía para `updateFabPosition()`; si en el futuro se
  detecta jank real, es un cambio aislado y posterior.
- **Efecto colateral en `/esquemas/<asignatura>`**: como `anchors` también
  incluye las secciones de tema y las sub-ramas del árbol en esquemas, el
  mismo fix las protege igual que a las preguntas de práctica. No es un
  objetivo explícito de la spec, pero es un beneficio gratuito del enfoque
  genérico — no se añaden criterios ni tests específicos para esquemas para
  no ampliar el alcance.
- **No se combinan los dos empujes sumándolos**: se calcula el empuje por
  filtros y el empuje por contenido por separado (cada uno con el mismo
  `FAB_DEFAULT_BOTTOM` como base) y se toma el `Math.max()` de ambos, no se
  encadenan. Encadenar (usar el resultado del primero como base del segundo)
  sobre-empujaría el FAB cuando ambos obstáculos coinciden, aunque no sería
  incorrecto (solo más conservador de lo necesario); se prefiere el máximo
  por ser el cálculo exacto.
