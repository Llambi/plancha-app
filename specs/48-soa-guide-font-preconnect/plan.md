# Plan técnico — Guía SOA: fuentes de Google Fonts sin preconnect

- **Issue**: #48
- **Spec**: ./spec.md
- **Rama**: 48-soa-guide-font-preconnect

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Añadir dos `<link rel="preconnect">` (a `fonts.googleapis.com` y
`fonts.gstatic.com`, este último con `crossorigin`) en el slot `head` de
`src/pages/guia/[asignatura].astro`, justo antes del `<link
rel="stylesheet">` ya existente. Cambio puramente de metadatos, sin lógica.

## Ficheros y áreas afectadas

- `src/pages/guia/[asignatura].astro` — dos `<link>` nuevos.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- No aplica (metadatos estáticos, sin lógica que compartir).

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica.
- **E2E (Playwright)**: nuevo fichero `tests/e2e/guia-fonts.spec.ts` (no
  había cobertura E2E de `/guia/soa` hasta ahora) que comprueba que ambos
  `<link rel="preconnect">` existen en el `<head>` con los atributos
  correctos.
- **Contenido**: no aplica.

## Riesgos / decisiones

- **No se autoalojan las fuentes**: la spec lo excluye explícitamente como
  no-objetivo (alternativa "a valorar aparte" en la issue original, más
  costosa: descargar y servir 3 familias tipográficas desde `public/`).
