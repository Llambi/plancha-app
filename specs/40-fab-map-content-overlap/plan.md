# Plan técnico — FAB «Mapa» solapa preguntas/opciones en viewports menores de 1240px

- **Issue**: #40
- **Spec**: ./spec.md
- **Rama**: 40-fix-fab-map-overlap

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque (final, tras descartar el enfoque inicial)

**Enfoque descartado durante `/implement`**: generalizar `updateFabPosition()`
(que ya esquiva el obstáculo de los filtros de tema, issue #29, reutilizando
`computeFabBottom()`) para también esquivar cualquier tarjeta (`.mm-anchor`)
que solapara la franja del FAB. Implementado y probado en vivo, se descubrió
que en una lista de tarjetas apiladas con solo `1rem` de margen entre ellas,
no siempre hay un hueco vertical libre: reposicionar el FAB para librar una
tarjeta puede hacer que invada la tarjeta **anterior** en su lugar (repro:
`/practica/si`, `scrollY=5277` → el FAB pasaba a solapar `q-q9`, una tarjeta
de ~578px, tras "esquivar" otra). Consultado con el usuario, se descarta este
enfoque en favor de uno más simple y honesto sobre sus límites.

**Enfoque final**: reducir el FAB (`.mm-fab` en `Minimap.astro`) a un botón
icono compacto (~44×44px, sin la etiqueta de texto «Mapa» visible) en vez de
la píldora actual (~87×37px con icono + texto + contador). Menor superficie
→ menor probabilidad de solape real con el contenido, sin pretender una
garantía de cero solape (ver spec.md). El contador de fijados pasa de estar
en línea junto al texto a ser una insignia pequeña superpuesta en la esquina
del círculo (patrón habitual de "badge" sobre un icono).

No se toca `updateFabPosition()` ni `computeFabBottom()`: el mecanismo que
esquiva los filtros de tema (#29) sigue exactamente igual que antes, solo
cambia el tamaño/forma visual del elemento que posiciona.

## Ficheros y áreas afectadas

- `src/components/Minimap.astro` — CSS de `.mm-fab`/`.mm-fab-ic`/`.mm-fab-count`
  (círculo compacto en vez de píldora) y marcado (se retira el nodo de texto
  «Mapa»). No se toca el script (`updateFabPosition`, `computeFabBottom`,
  `anchors`, etc.).
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- `computeFabBottom()` (`src/lib/minimap.ts`) — sin cambios, se sigue usando
  tal cual solo para el obstáculo de los filtros de tema.
- Tokens de diseño existentes: el contador reutiliza el par
  `--site-topbar-bg`/`--site-topbar-ink` (ya usado para el tooltip del rail,
  `.mm-tip`), que da buen contraste en ambos temas sin introducir un color
  nuevo.

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica — no hay lógica nueva en `src/lib/minimap.ts`
  (el intento de generalizar `computeFabBottom()` se revirtió por completo,
  incluidos sus tests).
- **E2E (Playwright)**: nuevo test en `tests/e2e/minimap.spec.ts` que
  comprueba que `.mm-fab` mide como máximo 48×48px y que su texto visible
  (`innerText`) está vacío (sin «Mapa»), en vez del test original de scroll
  exhaustivo (que perseguía una garantía ya descartada). El test existente de
  #29 («the FAB never covers a tema filter chip…») se mantiene sin cambios y
  sigue pasando.
- **Contenido**: no aplica (no toca `src/content/`).

## Riesgos / decisiones

- **No hay garantía de cero solape en el 100% de los casos.** Documentado en
  spec.md y aceptado explícitamente por el usuario: una tarjeta
  excepcionalmente larga aún podría generar un solape puntual en la esquina
  donde está el FAB, pero (a) el área de solape es mucho menor que con la
  píldora anterior, y (b) el resto de la etiqueta de la opción (radio +
  letra + mayoría del texto) sigue siendo clicable, ya que cada opción es una
  única `<label>` de ancho completo.
- **Efecto en el rail de escritorio (≥1240px)**: sin cambios; el rail no usa
  `.mm-fab` en absoluto.
- **Contador de fijados**: pasa de texto en línea a insignia superpuesta; se
  mantiene oculto cuando no hay nada fijado (clase `.zero`, sin cambios en esa
  lógica).
