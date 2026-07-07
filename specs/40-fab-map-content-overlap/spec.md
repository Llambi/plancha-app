# Spec — FAB «Mapa» solapa preguntas/opciones en viewports menores de 1240px

- **Issue**: #40 · https://github.com/Llambi/plancha-app/issues/40
- **Estado**: borrador
- **Autor**: Llambi (vía Claude Code)
- **Fecha**: 2026-07-07

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

El botón flotante «Mapa» (`.mm-fab` en `Minimap.astro`) usa `position: fixed`
en cualquier viewport por debajo de 1240px. El issue #29 ya corrigió que
tapara los chips de «Filtrar por tema», pero ese fix solo esquiva ese
obstáculo puntual (`updateFabPosition`, que solo mira
`[data-tema-filters]`). Al ser `fixed`, el FAB tapa **cualquier** tarjeta de
pregunta que quede bajo su rectángulo mientras el usuario se desplaza por el
documento, en **cualquier posición intermedia de scroll** (no solo al final):
es reproducible parando el scroll en cualquier punto donde una tarjeta caiga
en la esquina inferior derecha del viewport, tanto en móvil (375px) como en
anchos de portátil (~800–1200px).

> **Corrección tras verificación en vivo** (durante `/plan`): la redacción
> original de este problema y sus criterios hablaba de «al hacer scroll hasta
> el final». Comprobado en el navegador (`/practica/si`, scroll hasta
> `scrollHeight` real), el padding-bottom de 4rem que ya trae `<main>` es
> suficiente para que **el final real del documento no tenga solape**. El
> solape reproducible está en posiciones **intermedias** de scroll, no al
> final. Se corrige aquí el problema y los criterios para reflejar la causa
> real antes de diseñar la solución.

## Resultado esperado

En cualquier viewport por debajo de 1240px, y en **cualquier posición de
scroll** (no solo al final), el contenido de preguntas (test y desarrollo)
nunca queda bajo el FAB «Mapa»: el usuario puede seleccionar cualquier
opción visible sin que el botón la tape.

## Criterios de aceptación

1. **Dado** un viewport de 375px de ancho en `/practica/si`, **cuando** se
   hace scroll a varias posiciones intermedias (no solo al final),
   **entonces** ninguna tarjeta de pregunta (test o desarrollo) queda
   cubierta por el FAB «Mapa» en ninguna de ellas.
2. **Dado** un viewport de ~1100px (portátil, por debajo del breakpoint de
   1240px que activa el rail de escritorio), **cuando** se repite el mismo
   recorrido de scroll, **entonces** tampoco hay solape entre el FAB y
   ninguna tarjeta de pregunta.
3. **Dado** el fix de #29 (el FAB esquivando los chips de «Filtrar por
   tema»), **cuando** se aplica este cambio, **entonces** ese
   comportamiento se mantiene sin regresión.
4. **Dado** un viewport ≥1240px (rail de escritorio, sin FAB), **cuando**
   se hace scroll, **entonces** no hay cambio de comportamiento (el rail
   no se ve afectado por este fix).

## Alcance

- Incluye: ajustar el layout/posicionamiento para que el FAB nunca se
  superponga a contenido interactivo de preguntas (`[data-tq]`, `[data-dq]`)
  en las páginas que usan `Minimap` (`práctica`, `esquemas`).
- **No-objetivos**:
  - No se rediseña el FAB ni su icono/etiqueta.
  - No se toca el comportamiento del rail de escritorio (≥1240px).
  - No se resuelve aquí ningún otro hallazgo de accesibilidad del Minimap
    (ya cubiertos por issues previas como #20).

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No. Es un cambio de layout/CSS en
  `src/components/Minimap.astro` (y posiblemente el contenedor `<main>` de
  las páginas que lo usan). No aplica la regla de contenido verbatim.

## Dudas abiertas

- Ninguna: el criterio de éxito (ninguna opción de respuesta tapada) es
  observable y verificable con captura/inspección en los tres anchos de
  referencia (375px, ~1100px, ≥1240px).
