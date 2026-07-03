# Plan técnico — Toggle de tema no funciona en /practica/mongodb (listener duplicado)

- **Issue**: #36
- **Spec**: ./spec.md
- **Rama**: 36-fix-mongo-practica-theme-toggle

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

`MongoPractica.astro` duplica, dentro de su propio `<script>`, el mismo bloque
de toggle de tema que ya vive en `BaseLayout.astro`. Ambos escuchan click sobre
el mismo botón `.site-theme-toggle` y leen/escriben `data-theme` en
`document.documentElement`; al dispararse los dos listeners en el mismo evento,
el segundo revierte lo que hizo el primero. La solución es puramente
sustractiva: eliminar el bloque IIFE duplicado (`/* Toggle de tema (común) */`)
de `MongoPractica.astro` y dejar que el único listener de `BaseLayout.astro`
gobierne el toggle en todas las páginas, incluida esta.

## Ficheros y áreas afectadas

- `src/components/MongoPractica.astro` — eliminar el IIFE de ~14 líneas que
  registra el segundo listener de click sobre `.site-theme-toggle` (justo
  después de `render();`, antes del `<style is:global>`).
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- Se reutiliza tal cual el listener existente de `src/layouts/BaseLayout.astro`
  (líneas ~106-119): no se escribe lógica nueva, solo se retira la duplicada.

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica — no hay lógica pura nueva que testear.
- **E2E (Playwright)**: se añade un test en `tests/e2e/smoke.spec.ts` que
  navega a `/practica/mongodb`, lee `data-theme` antes de clicar
  `.site-theme-toggle`, clica una vez y comprueba que `data-theme` cambió
  (mismo patrón que el test ya existente `el toggle de tema persiste en
localStorage`, pero comparando el valor antes/después para detectar el caso
  "no-op" que produce el listener duplicado). Este test falla en rojo con el
  código actual (con el duplicado) y pasa en verde tras eliminarlo.
- **Contenido**: no aplica (no se toca `src/content/`).

## Riesgos / decisiones

- Riesgo mínimo: el bloque eliminado es un duplicado exacto del de
  `BaseLayout.astro`, sin lógica adicional específica de `MongoPractica`
  (confirmado por diff línea a línea). No hay comportamiento que preservar.
