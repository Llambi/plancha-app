# Plan técnico — Modo repaso transversal: «solo mis fallos» combinando todas las asignaturas

- **Issue**: #51
- **Spec**: ./spec.md
- **Rama**: 51-cross-subject-failed-review

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Página nueva `src/pages/repaso.astro`, cargada perezosamente en cliente (mismo
patrón que `buscar.astro`/`SearchBox`): un `<script>` escanea las claves de
`localStorage` con el prefijo de `statsKeyFor('')` (`"plancha:stats:"`), extrae la
asignatura de cada clave, y para cada una calcula `failedIds()` sobre su estado
parseado. Con la lista de ids fallados por asignatura, hace **fetch** del mismo
`search-index.json` que ya usa el buscador global y cruza cada id fallado (`q-<id>`)
con su registro (`test-<asignatura>-<id>`) para obtener texto y deep-link
(`#q-<id>`, ya construido en el índice). El cruce se aísla en una función pura
nueva y testeable (`src/lib/repaso.ts`), siguiendo el mismo patrón "núcleo puro +
wiring en `<script>`" que `search.ts`/`practica-stats.ts`. Sin backend nuevo, sin
segunda copia del estado: solo lectura de `localStorage` + el índice ya generado
en build.

## Ficheros y áreas afectadas

- `src/lib/repaso.ts` (nuevo) — `buildRepasoGroups(records, failedByAsignatura)`:
  función pura que cruza registros de `SearchRecord` (de `search.ts`) con los ids
  fallados por asignatura y devuelve grupos `{ asignatura, asignaturaNombre,
sigla, accent, items }`, omitiendo asignaturas sin fallos o sin registro
  correspondiente.
- `src/pages/repaso.astro` (nuevo) — shell (heading, contenedor de resultados,
  estado vacío) + `<script>` que escanea `localStorage`, hace fetch del índice y
  renderiza los grupos devueltos por `buildRepasoGroups`. Estilos `is:global`
  namespaced bajo `.repaso-page` (elementos creados en runtime — mismo gotcha que
  `buscar.astro`).
- `src/pages/index.astro` — añade un enlace de entrada a `/repaso` (via `url()`
  de `src/data/site.ts`) cerca del contador de asignaturas/documentos.
- Colecciones de contenido afectadas: ninguna (lee `search-index.json`, ya
  generado a partir de las colecciones existentes).
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- `statsKeyFor`, `parseStats`, `failedIds` de `src/lib/practica-stats.ts` (ya
  testeadas) para leer y filtrar los fallos por asignatura.
- `SearchRecord`, el propio `search-index.json.ts` (endpoint ya existente) y el
  patrón de fetch perezoso de `buscar.astro` para obtener texto + deep-link de
  cada pregunta — no se reconstruye el contenido del test bank en esta página.
- `url()`/`BASE` de `src/data/site.ts` para el enlace desde la home.
- Patrón de agrupar-y-renderizar de `buscar.astro` (`.bp-group`/`.bp-item`) como
  referencia de estructura/estilo para `.repaso-page` (clases nuevas,
  namespaced, sin compartir el bloque `is:global` de `buscar.astro`).

## Estrategia de test (TDD)

- **Unit (Vitest)**: `tests/unit/repaso.test.ts` para `buildRepasoGroups()` —
  asignatura con fallos que sí tiene registros → grupo con los items correctos;
  asignatura con fallos pero sin registro correspondiente en el índice → no
  aparece; asignatura con `failedIds` vacío → no aparece; ids fallados en varias
  asignaturas → grupos separados, cada uno con su `asignaturaNombre`/`sigla`/
  `accent` tomados del primer item.
- **E2E (Playwright)**: `tests/e2e/repaso.spec.ts` — (a) sin ningún
  `plancha:stats:*` guardado, la vista muestra el estado vacío; (b) tras fallar
  una pregunta en `/practica/si` (mismo patrón que `practica-stats.spec.ts`,
  marcando una opción incorrecta), `/repaso` lista esa pregunta bajo "Sistemas
  Inteligentes" con un enlace que apunta a `/practica/si#q-<id>`; (c) el enlace
  de la home a `/repaso` existe y navega correctamente.
- **Contenido**: no aplica (no toca `src/content/`); se valida con `astro check`
  - `astro build` por higiene general.

## Riesgos / decisiones

- Escanear `Object.keys(localStorage)` con el prefijo de `statsKeyFor('')` evita
  tener que enumerar asignaturas conocidas en build o mantener una lista aparte;
  como el quiz de `guia/` (SOA) no usa `practica-stats`, nunca aparecerá una
  clave para esa asignatura, así que no hace falta excluirla explícitamente.
- El límite de resultados no aplica aquí (a diferencia de `buscar.astro`, que
  capa a `MAX = 200`): el conjunto de fallos de un usuario real es pequeño por
  construcción (subset de lo que ha respondido), así que no se pagina.
