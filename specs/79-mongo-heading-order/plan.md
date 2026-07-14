# Plan técnico — Orden de encabezados incorrecto en el validador de MongoDB

- **Issue**: #79
- **Spec**: ./spec.md
- **Rama**: 79-mongo-heading-order

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Cambio de etiqueta semántica sin tocar el CSS de tamaño/tipografía: el
`<h3>` de cada tarjeta de colección (línea 805 de `MongoPractica.astro`) pasa
a `<h2>`. Los 3 selectores CSS que lo referencian (`.coll h3`, `.coll h3
.count`, y su variante `:root[data-theme='dark'] .coll h3 .count`) se
renombran a `h2` en paralelo, sin cambiar ninguna otra propiedad. Como el
tamaño de fuente ya está fijado explícitamente (14px, JetBrains Mono) y no
depende del user-agent stylesheet del navegador para `<h2>`/`<h3>`, no hay
efecto visual.

## Ficheros y áreas afectadas

- `src/components/MongoPractica.astro`:
  - Markup: `<h3>db.${coll.name} ...</h3>` → `<h2>...</h2>`.
  - CSS: `.mongo-practica .coll h3` → `.mongo-practica .coll h2`;
    `.mongo-practica .coll h3 .count` → `.mongo-practica .coll h2 .count`;
    `:root[data-theme='dark'] .mongo-practica .coll h3 .count` → `... .coll
h2 .count`.
- `tests/e2e/a11y.spec.ts`: se retira la excepción `heading-order` de
  `/practica/mongodb`.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod: no.

## Reutilización

No aplica — cambio de etiqueta/selector en un fichero ya existente.

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica (no hay lógica pura nueva).
- **E2E (Playwright)**: se retira la excepción `heading-order` de
  `a11y.spec.ts` para `/practica/mongodb` — sigue en rojo hasta aplicar el
  cambio de etiqueta, y en verde después. Es la verificación de fondo real
  (axe-core sobre el DOM renderizado). Se añade además una comprobación
  directa en `mongo-practica.spec.ts`: cada tarjeta de colección expone un
  `<h2>` con el nombre de la colección (verificable con
  `getByRole('heading', { level: 2 })`), como regresión rápida sin depender
  de axe.
- **Contenido**: no aplica.

## Riesgos / decisiones

- Riesgo: ninguno relevante — el CSS ya fija el tamaño de fuente de forma
  explícita, así que renombrar el selector no cambia el render.
- Decisión: no se insertan headings para `.block-tag` (fuera de alcance, ver
  spec.md — no forman parte de la violación real ni la regla los exige).
