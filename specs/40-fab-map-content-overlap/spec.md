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

> **Segunda corrección, durante `/implement`**: el plan inicial proponía
> generalizar `updateFabPosition()` para "esquivar" (reposicionar) el FAB por
> encima de cualquier tarjeta que lo solapara, igual que ya hace con los
> filtros de tema. Implementado y probado en vivo, se descubrió un problema de
> fondo: en una lista de tarjetas apiladas con muy poco margen entre sí
> (`1rem`), no siempre existe un hueco vertical libre donde reposicionar el
> FAB — a veces el reposicionamiento solo **desplaza el solape a la tarjeta de
> justo antes** (comprobado en `/practica/si`, `scrollY=5277`: el FAB acababa
> solapando `q-q9`, una tarjeta de ~578px que ni siquiera tocaba la zona
> original del FAB). Se descarta ese enfoque. Tras consultarlo con el usuario,
> se opta por **reducir el FAB a un icono compacto** (sin la etiqueta «Mapa»
> visible) en vez de perseguir una garantía de «cero solape» inalcanzable de
> forma general. Los criterios de aceptación de abajo reflejan este acuerdo.

## Resultado esperado

En cualquier viewport por debajo de 1240px, el FAB se reduce a un botón
icono compacto (sin texto visible, con su función accesible vía
`aria-label`), reduciendo significativamente el área de posible solape con
el contenido. No se persigue una garantía de cero solape en todos los casos
(no es alcanzable de forma general en una lista de tarjetas apiladas sin
huecos), pero el solape restante queda acotado a una esquina pequeña de la
tarjeta, dejando el resto de la etiqueta de la opción (radio/checkbox +
letra + mayor parte del texto) clicable.

## Criterios de aceptación

1. **Dado** un viewport por debajo de 1240px en `/practica/si`, **cuando**
   se muestra el FAB, **entonces** es un botón compacto (≈44×44px) sin texto
   visible «Mapa», con `aria-label` describiendo su función.
2. **Dado** el fix de #29 (el FAB esquivando los chips de «Filtrar por
   tema»), **cuando** se aplica este cambio, **entonces** ese
   comportamiento se mantiene sin regresión.
3. **Dado** un viewport ≥1240px (rail de escritorio, sin FAB), **cuando**
   se hace scroll, **entonces** no hay cambio de comportamiento (el rail
   no se ve afectado por este fix).

## Alcance

- Incluye: reducir el FAB a un botón icono compacto en las páginas que usan
  `Minimap` (`práctica`, `esquemas`), para reducir (no eliminar por
  completo, ver nota arriba) el área de posible solape con el contenido.
- **No-objetivos**:
  - No se garantiza cero solape en el 100% de los casos (tarjetas
    excepcionalmente largas pueden seguir generando un solape puntual en su
    esquina).
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
