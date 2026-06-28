# Plan técnico — <título de la issue>

- **Issue**: #<id>
- **Spec**: ./spec.md
- **Rama**: <nº>-<kebab>

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

<Estrategia técnica en 3-6 frases. Qué patrón se sigue y por qué.>

## Ficheros y áreas afectadas

- `<ruta>` — <qué cambia y por qué>
- Colecciones de contenido afectadas: <test/desarrollo/esquemas/guia o ninguna>
- Cambios de schema Zod (`src/content/config.ts`): <sí/no — detalle>

## Reutilización

<Funciones/utilidades/componentes existentes que se reutilizan, con su ruta.
P.ej. `url()` de src/data/site.ts, `EsquemaTree`, etc. Evitar código nuevo si ya existe.>

## Estrategia de test (TDD)

- **Unit (Vitest)**: <qué lógica se testea — loaders, schemas, utils>
- **E2E (Playwright)**: <qué flujo de navegador se cubre, si aplica>
- **Contenido**: validación vía `astro check` + `astro build` (Zod falla el build
  si el contenido es inválido).

## Riesgos / decisiones

- <riesgo o trade-off y cómo se mitiga>
