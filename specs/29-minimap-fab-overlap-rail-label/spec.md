# Spec — Minimap: el FAB «Mapa» solapa filtros en móvil y la etiqueta «mapa» del rail se ve mal en algunos casos

- **Issue**: #29 · https://github.com/Llambi/plancha-app/issues/29
- **Estado**: borrador
- **Autor**: Llambi (Hugo Perez)
- **Fecha**: 2026-07-03

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

En `src/components/Minimap.astro`, usado por `/practica/[asignatura]`, hay dos
problemas de UI verificados midiendo bounding boxes:

1. **FAB solapa filtros (móvil).** El botón flotante `.mm-fab` (fixed,
   `bottom:16px; right:16px`, visible en viewports `<1240px`) se solapa con
   los chips de `.tema-filters` cuando estos ocupan varias filas. En
   `/practica/si` (10 temas), los chips **T4, T9 y T10 quedan cubiertos** por
   el FAB y no son pulsables sin antes esquivarlo o cerrarlo.
2. **Etiqueta «mapa» del rail (desktop) se ve mal en algunos casos.** El rail
   lateral (`.mm-rail::before`, visible en `>=1240px`) añade el texto literal
   `mapa` fijo en la parte superior. En páginas con pocos anchors (rail corto),
   la etiqueta queda descuadrada o solapa el primer tick.

## Resultado esperado

En móvil, ningún chip de filtro por tema (ni ningún otro control interactivo)
queda tapado por el FAB, en ninguna asignatura, sin perder la funcionalidad del
FAB (sigue abriendo el drawer del minimapa). En desktop, el rail deja de
mostrar el literal «mapa» pero sigue siendo identificable/accesible (ya lleva
`aria-label="Minimapa de navegación"` en el `<nav>`).

## Criterios de aceptación

1. **Dado** un viewport `<1240px` (FAB visible) en una asignatura con temas
   suficientes para envolver los chips a varias filas (p. ej. SI, 10 temas),
   **cuando** se renderiza `/practica/si`, **entonces** ningún chip de
   `.tema-filters` (ni otro control interactivo) queda cubierto por `.mm-fab`.
2. **Dado** el FAB reposicionado/ajustado, **cuando** el usuario lo pulsa,
   **entonces** sigue abriendo el drawer del minimapa (sin regresión de
   funcionalidad ni de accesibilidad).
3. **Dado** un viewport `>=1240px` (rail visible), **cuando** se renderiza
   cualquier página con minimapa, **entonces** no aparece el literal «mapa» en
   la parte superior del rail (`.mm-rail::before` con `content: 'mapa'`
   eliminado o vaciado).
4. **Dado** el rail sin el literal «mapa», **cuando** se audita accesibilidad,
   **entonces** el `<nav class="mm-rail">` sigue siendo identificable vía su
   `aria-label="Minimapa de navegación"` existente.
5. **Dado** ambos cambios aplicados, **cuando** se revisa el layout en
   `>=1240px` y en `<1240px`, **entonces** no hay regresiones visuales (rail,
   FAB, drawer, filtros de tema se ven y funcionan como antes salvo por los dos
   cambios pedidos).

## Alcance

- Incluye: reposicionar/ajustar el FAB `.mm-fab` (y su z-index/margen respecto
  a `.tema-filters`) para que no tape los chips en móvil; eliminar el literal
  «mapa» de `.mm-rail::before` en desktop.
- **No-objetivos**: no se rediseña el minimapa en profundidad (rail, drawer,
  drag-to-scrub, pines, etc. se mantienen tal cual); el alcance es exactamente
  evitar la colisión FAB/filtros y quitar la etiqueta «mapa» del rail.

## Impacto en el contenido / constitución

- ¿Toca `src/content/` (test, desarrollo, esquemas, guía)? **No.**
- Es un cambio de estilos/layout en `src/components/Minimap.astro` (y quizá
  coordinación con `.tema-filters` en `src/pages/practica/[asignatura].astro`);
  no toca contenido transcrito de exámenes ni temarios.

## Dudas abiertas

- Ninguna: los criterios de aceptación de la issue ya son concretos y
  verificables (bounding boxes, viewports, y qué literal desaparece).
