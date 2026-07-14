# Spec — Contraste de color insuficiente en la guía SOA y el validador de MongoDB (axe: color-contrast)

- **Issue**: #78 · https://github.com/Llambi/plancha-app/issues/78
- **Estado**: aprobada
- **Autor**: Llambi (vía Claude Code)
- **Fecha**: 2026-07-14

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

axe-core (issue #58) reporta `color-contrast` (severidad "serious") en modo
claro, en dos páginas, para cuatro parejas texto/fondo con menos de 4.5:1:

- `/guia/soa`: `.soa-chip-badge` en su estado `.active` (blanco al 80% de
  opacidad sobre fondo rojo → 4.25:1) y `.key-box .box-label` (dorado sobre
  fondo dorado claro → 2.84:1). El mismo par dorado/dorado-claro se repite,
  sin estar en la evidencia original, en `.ejercicio .ej-label`.
- `/practica/mongodb`: `.eyebrow` (verde sobre el fondo general → 3.98:1) y
  `.block-tag .pct` (ámbar sobre el fondo general → 4.30:1).

Confirmado midiendo con `contrastRatio()` (`src/lib/color-contrast.ts`,
añadida en la issue #43) los colores reales de cada combinación tal y como
se renderizan (incluyendo la opacidad del badge y el fondo real que hay
detrás de cada elemento, no un blanco genérico).

## Resultado esperado

Las cuatro combinaciones (y la quinta, `.ejercicio .ej-label`, que comparte
causa con `.key-box .box-label`) alcanzan ≥4.5:1 en modo claro, sin alterar
el modo oscuro (que ya cumple) ni el diseño más allá del color estrictamente
necesario.

## Criterios de aceptación

1. **Dado** `/guia/soa` en modo claro, **cuando** se mide el contraste real
   (color efectivo tras opacidad) de `.soa-chip-badge.active`, **entonces**
   es ≥4.5:1 contra su fondo rojo.
2. **Dado** `/guia/soa` en modo claro, **cuando** se mide `.key-box
.box-label` y `.ejercicio .ej-label` contra su fondo dorado claro,
   **entonces** ambos son ≥4.5:1.
3. **Dado** `/practica/mongodb` en modo claro, **cuando** se mide `.eyebrow`
   y `.block-tag .pct` contra el fondo general de la página, **entonces**
   ambos son ≥4.5:1.
4. **Dado** cualquiera de las dos páginas, **cuando** se ejecuta axe-core
   (`tests/e2e/a11y.spec.ts`), **entonces** ya no reporta `color-contrast`.
5. **Dado** el modo oscuro de ambas páginas, **cuando** se compara visualmente
   contra el estado actual, **entonces** no hay cambio (los valores oscuros
   ya cumplían y no se tocan).
6. Se retira la excepción documentada para `color-contrast` en esas dos
   páginas de `tests/e2e/a11y.spec.ts` (issue #58).

## Alcance

- Incluye: `src/components/SoaGuide.astro` (variable `--mcg-gold-text` nueva
  para texto sobre fondo dorado, opacidad de `.soa-chip-badge`),
  `src/components/MongoPractica.astro` (`--green-2`/`--amber` en modo claro).
- **No-objetivos**:
  - No se toca ninguna otra pareja de color que ya cumple (p. ej. `.def-box`,
    `.exam-box`, `.example-box`, `.template-label` sobre fondo oscuro fijo).
  - No se cambia el modo oscuro de ninguna de las dos páginas.
  - No se abordan las issues #77 (ya resuelta) ni #79 (heading-order):
    su excepción en `a11y.spec.ts` permanece intacta.

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No. Solo variables/colores CSS en dos componentes.

## Dudas abiertas

- Ninguna: los nuevos valores se derivan matemáticamente con la misma
  fórmula WCAG ya usada en el repo (issue #43), manteniendo el tono de cada
  color (mismo hue, versión más oscura).
