# Plan técnico — Home: el texto «Abrir →» se duplica en el nombre accesible de cada tarjeta

- **Issue**: #46
- **Spec**: ./spec.md
- **Rama**: 46-home-card-accname

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Añadir `aria-hidden="true"` al `<span class="doc-go">Abrir →</span>` en
`src/pages/index.astro`. Un solo atributo, sin cambios de CSS/DOM
estructural — coherente con el resto de decorativos ya marcados en la
misma tarjeta (`.doc-badge`, `.tdot`).

## Ficheros y áreas afectadas

- `src/pages/index.astro` — un atributo en el `<span class="doc-go">`.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- Mismo patrón `aria-hidden="true"` ya usado en `.doc-badge` y `.tdot` de la
  misma tarjeta.

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica.
- **E2E (Playwright)**: nuevo test en `tests/e2e/home-content-types.spec.ts`
  (ya cubre la home) que comprueba que el nombre accesible de la primera
  tarjeta no contiene "Abrir" ni "→", y que sí sigue conteniendo el
  contenido real (asignatura/título).
- **Contenido**: no aplica.

## Riesgos / decisiones

- Ninguno relevante: cambio de una línea, sin riesgo de regresión más allá
  de lo cubierto por el test nuevo.
