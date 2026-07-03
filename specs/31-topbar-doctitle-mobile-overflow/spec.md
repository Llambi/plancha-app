# Spec — Móvil: la topbar crece y se aprieta cuando el docTitle es largo

- **Issue**: #31 · https://github.com/Llambi/plancha-app/issues/31
- **Estado**: borrador
- **Autor**: Llambi (Hugo Perez)
- **Fecha**: 2026-07-03

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

En `src/layouts/BaseLayout.astro`, `.site-topbar` es un flex row (brand,
`.site-doc-title`, buscador, spacer, enlace «← Inicio», toggle de tema) sin
manejo específico del `docTitle` en móvil. Verificado en `/practica/si` a
375px: el texto de `.site-doc-title` («SI · Práctica») envuelve a dos líneas
dentro de su `<span>`, lo que hace crecer `.site-topbar` de ~54px a ~66.5px de
alto y aprieta visualmente el resto de controles (buscador, «Inicio», toggle
de tema). Afecta a toda página de detalle que pasa `docTitle` (práctica,
esquemas, guía — ver `docTitle=` en `src/pages/`).

## Resultado esperado

En viewports estrechos, el `docTitle` nunca provoca que la topbar crezca de
altura ni que el resto de controles pierdan tamaño o interactividad. En
desktop, el comportamiento visual no cambia.

## Criterios de aceptación

1. **Dado** un viewport estrecho (`<420px` aprox.) en una página de detalle
   con `docTitle`, **cuando** se renderiza la topbar, **entonces** su altura
   se mantiene igual que sin `docTitle` (no crece por el envoltorio a dos
   líneas).
2. **Dado** ese mismo viewport, **cuando** se inspeccionan brand, buscador
   (icono colapsado), enlace «Inicio» y toggle de tema, **entonces**
   mantienen su tamaño e interactividad actuales (siguen siendo clicables).
3. **Dado** un viewport de escritorio, **cuando** se renderiza la misma
   página, **entonces** la topbar se ve igual que antes del cambio (sin
   regresión visual).

## Alcance

- Incluye: el comportamiento de `.site-doc-title` dentro de `.site-topbar` en
  `src/layouts/BaseLayout.astro` cuando el espacio es insuficiente.
- **No-objetivos**: no se rediseña la topbar completa; no se toca el resto de
  elementos (brand, buscador, enlace inicio, toggle de tema) salvo lo
  estrictamente necesario para que no se aprieten.

## Impacto en el contenido / constitución

- ¿Toca `src/content/` (test, desarrollo, esquemas, guía)? **No.**
- Cambio de CSS/layout en `src/layouts/BaseLayout.astro`; no modifica
  contenido transcrito ni el schema Zod de las colecciones.

## Dudas abiertas

- Ninguna: los criterios de aceptación de la issue ya son concretos y
  verificables (altura de topbar constante, controles intactos, sin cambios
  en desktop).
