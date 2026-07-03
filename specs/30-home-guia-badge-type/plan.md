# Plan técnico — Home: las guías paginadas se etiquetan como «Esquemas» (confusión de tipo de contenido)

- **Issue**: #30
- **Spec**: ./spec.md
- **Rama**: 30-home-guia-badge-type

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Investigación previa

En `src/pages/index.astro`:

- `Card.tipo` es `'practica' | 'teoria'` (línea 20).
- El bucle de esquemas reales (`esqCodes`, líneas 53-67) asigna `tipo:
'teoria'`.
- El bucle de guías paginadas (`guiaCodes`, líneas 69-83) **también** asigna
  `tipo: 'teoria'` — origen exacto del bug.
- El badge de la card (línea 138-141) y el filtro (`data-filter`/`data-tipo`,
  líneas 113-121 y script 152-174) solo distinguen `practica`/`teoria`.
- El filtrado es genérico por atributo (`c.dataset.tipo === f`, línea 167): un
  botón de filtro nuevo con `data-filter="guia"` funciona sin tocar el script.
- El `tdot` (indicador de color) usa el acento de la asignatura por defecto
  (`var(--c, var(--site-accent))`, línea 324) salvo para `teoria`, que lo
  fuerza a gris/muted (línea 326-328) — así se distingue visualmente
  «interactivo» (practica, con color) de «lectura» (teoria, gris).

## Decisión de diseño (menor, a confirmar en Gate A)

- **Tercer valor de `tipo`**: `'practica' | 'teoria' | 'guia'`. Los esquemas
  reales siguen en `'teoria'`; solo las guías paginadas pasan a `'guia'`.
- **Badge de la card**: «Guía» (antes «Esquemas», heredado de `teoria`).
- **Filtro de la home**: se añade un 4º botón «Guías» (`data-filter="guia"`)
  junto a Todos/Práctica/Esquemas. El filtro «Esquemas» deja de incluir las
  guías (era el bug: las guías fingían ser esquemas).
- **Color del `tdot`**: las guías son material de lectura/estudio como los
  esquemas (no interactivo como la práctica), así que se les aplica el mismo
  tratamiento gris/muted que `teoria` (`.doc-type.guia .tdot`), manteniendo la
  convención existente «color de acento = interactivo, gris = lectura» en vez
  de introducir un tercer estilo de color.

## Enfoque

Cambio de presentación acotado a `src/pages/index.astro`: ampliar el tipo
`Card['tipo']`, cambiar el `tipo` asignado en el bucle de guías, añadir el
badge/label y el botón de filtro para `guia`, y su regla CSS de `tdot`. El
script de filtrado (genérico por `data-filter`/`data-tipo`) no necesita
cambios.

## Ficheros y áreas afectadas

- `src/pages/index.astro` — tipo `Card['tipo']`, asignación en el bucle de
  guías, badge/label, botón de filtro «Guías», CSS `.doc-type.guia`.
- Colecciones de contenido afectadas: ninguna (no se toca `src/content/guia/`
  ni `SoaGuide.astro`).
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- Filtrado genérico ya existente (`data-filter` en el botón ↔ `data-tipo` en
  la card, `tests/e2e` lo cubre vía interacción real) — el nuevo botón
  «Guías» se integra sin tocar el `<script>`.
- Patrón CSS existente `.doc-type.<tipo> .tdot` (ya usado por `teoria`) — se
  añade la variante `guia` siguiendo el mismo patrón, sin nuevas clases.

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica. La lógica de tipado/badge es un mapeo directo
  en el template de `index.astro` (no hay un módulo puro equivalente a
  `src/lib/*` para esta página — precedente: la home ya solo tiene cobertura
  e2e/smoke, sin unit tests). Extraer una función pura para un mapeo de 3
  casos sería una abstracción sin otro consumidor.
- **E2E (Playwright)**: nuevo `tests/e2e/home-content-types.spec.ts` (o
  extensión de `smoke.spec.ts`) —
  - la card de la asignatura con guía (SOA) muestra el badge «Guía», no
    «Esquemas»;
  - el filtro «Esquemas» ya no incluye esa card;
  - existe un filtro «Guías» que, al pulsarlo, muestra solo la(s) card(s) de
    guía;
  - el filtro «Práctica» sigue mostrando las mismas cards que antes (no
    regresión).
- **Contenido**: no aplica (no hay cambios en `src/content/`).

## Riesgos / decisiones

- **Orden de las cards** (`cards.sort(... a.tipo.localeCompare(b.tipo))`): al
  añadir `'guia'` el orden alfabético de tipos cambia (`guia` < `practica` <
  `teoria`), pero como una asignatura con guía nunca tiene también una card de
  práctica separada (`if (guiaCodes.has(code)) continue;` ya excluye ese
  caso), no hay reordenación visible entre cards del mismo `subject`. No se
  toca el criterio de orden.
