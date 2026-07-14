# Spec — Orden de encabezados incorrecto en el validador de MongoDB (axe: heading-order)

- **Issue**: #79 · https://github.com/Llambi/plancha-app/issues/79
- **Estado**: aprobada
- **Autor**: Llambi (vía Claude Code)
- **Fecha**: 2026-07-14

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

axe-core (issue #58) reporta `heading-order` ("Heading levels should only
increase by one") en `/practica/mongodb`. En todo el componente
`MongoPractica.astro` solo existen dos niveles de encabezado: un único `<h1>`
(título del ejercicio) y un `<h3>` por cada tarjeta de colección
(`.coll.card h3`) — salta directamente de nivel 1 a nivel 3, sin ningún `<h2>`
de por medio. Esto rompe la navegación por encabezados de un lector de
pantalla, que espera una jerarquía sin saltos.

## Resultado esperado

La jerarquía de encabezados de la página pasa a `h1` → `h2` (uno por tarjeta
de colección), sin ningún salto, y sin cambio visual: el tamaño de fuente de
la cabecera de cada tarjeta ya está fijado explícitamente por CSS (14px,
JetBrains Mono), independiente de la etiqueta semántica que se use.

## Criterios de aceptación

1. **Dado** `/practica/mongodb`, **cuando** se ejecuta axe-core, **entonces**
   ya no reporta `heading-order`.
2. **Dado** la página, **cuando** se inspecciona el árbol de encabezados,
   **entonces** la secuencia es `h1` (título del ejercicio) → `h2` (uno por
   cada `db.<colección>`), sin saltos de nivel.
3. **Dado** cualquier tarjeta de colección, **cuando** se compara visualmente
   contra el estado actual, **entonces** no hay ningún cambio apreciable
   (mismo tamaño, tipografía, color y layout).
4. Se retira la excepción documentada para `heading-order` en
   `/practica/mongodb` de `tests/e2e/a11y.spec.ts`.

## Alcance

- Incluye: `src/components/MongoPractica.astro` (markup del `<h3>` de cada
  tarjeta → `<h2>`, y sus 3 selectores CSS asociados), `tests/e2e/a11y.spec.ts`
  (retirar la excepción).
- **No-objetivos**:
  - No se insertan encabezados nuevos para `.block-tag` ("B1 Caso práctico",
    "B2 Test de consultas") — son `<div>`s decorativos, no headings, y no
    forman parte de la violación real de axe (la regla solo compara
    elementos de encabezado entre sí).
  - No se cambia el resto de la jerarquía de la página (topbar, etc.).

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No. Cambio semántico de una etiqueta HTML + su CSS
  en un componente, sin tocar contenido ni datos de ejercicios.

## Dudas abiertas

- Ninguna: la propuesta de la propia issue (ajustar la jerarquía sin cambiar
  tamaño/estilo) es directa y no tiene alternativas razonables a valorar.
