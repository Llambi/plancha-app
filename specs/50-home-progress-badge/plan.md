# Plan técnico — Home: mostrar el % de progreso acumulado en la tarjeta de cada asignatura

- **Issue**: #50
- **Spec**: ./spec.md
- **Rama**: 50-home-progress-badge

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

El progreso vive solo en `localStorage`, así que el indicador se calcula en un
`<script>` cliente de `src/pages/index.astro`, igual que hace ya
`practica/[asignatura].astro` para su chip colapsado (`data-stats-summary` /
`formatStatsChip`). Cada `.doc-card` de tipo `practica` gana un
`data-asignatura="<code>"` (el mismo código que ya se usa para construir su
`href`) y un `<span class="doc-progress" hidden>` vacío en el marcado; al cargar,
el script recorre esas tarjetas, lee `plancha:stats:<code>`, y si hay alguna
pregunta respondida rellena el span con `formatStatsChip(summarize(state))` y lo
muestra. Sin dato guardado, el span se queda `hidden` (no se toca el DOM) — cumple
el criterio de "no 0% intrusivo" sin lógica condicional extra en el script.

## Ficheros y áreas afectadas

- `src/pages/index.astro` — añade `code` a la interfaz `Card`, lo rellena en los
  tres bloques que generan tarjetas `tipo: 'practica'` (test/desarrollo por
  asignatura + la tarjeta fija de MongoDB), añade `data-asignatura`/`doc-progress`
  al template y el script cliente que calcula y pinta el indicador.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- `parseStats`, `statsKeyFor`, `summarize`, `formatStatsChip` de
  `src/lib/practica-stats.ts` (ya cubiertas por `tests/unit/practica-stats.test.ts`
  y usadas en `src/pages/practica/[asignatura].astro:212-217`) — mismo patrón de
  import en un `<script>` de página Astro, sin lógica nueva.
- El propio patrón de `data-tipo` + querySelectorAll ya usado en el script de
  filtrado de `index.astro` para localizar `.doc-card`.

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica — no hay lógica pura nueva; se reutiliza
  `summarize`/`formatStatsChip`, ya testeados en `practica-stats.test.ts`.
- **E2E (Playwright)**: `tests/e2e/home-progress-badge.spec.ts` — (a) una
  asignatura sin stats guardadas no muestra `.doc-progress` visible en su
  tarjeta de la home; (b) tras corregir una pregunta en `/practica/si` (mismo
  flujo que `practica-stats.spec.ts`), la home muestra "Acumulado: 100%" en la
  tarjeta de esa asignatura; (c) la tarjeta de MongoDB nunca muestra el
  indicador.
- **Contenido**: no aplica (no toca `src/content/`); se valida igualmente con
  `astro check` + `astro build` por higiene general del repo.

## Riesgos / decisiones

- El script se ejecuta en el `<script>` ya existente de `index.astro` (no uno
  nuevo) para no duplicar el `querySelectorAll('.doc-card')` ni el ciclo de vida;
  se añade como una función más junto a `applyFilter`/`syncUrl`.
- Se aplica `data-asignatura` también a la tarjeta de MongoDB por simplicidad
  (mismo tratamiento que el resto de tarjetas `practica`): al no existir clave
  `plancha:stats:mongodb`, el span se queda oculto sin necesidad de un caso
  especial en el código.
