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
`[data-tema-filters]`). El FAB sigue quedando fijo sobre lo que haya en la
esquina inferior derecha del viewport al final del scroll: en la práctica,
tapa parcialmente la última pregunta visible (radio-button y/o texto de una
opción), tanto en móvil (375px) como en anchos de portátil (~800–1200px).
Esto bloquea el tap/click sobre esa zona exacta de la opción de respuesta.

## Resultado esperado

En cualquier viewport por debajo de 1240px, el contenido de preguntas
(test y desarrollo) nunca queda bajo el FAB «Mapa»: el usuario puede
seleccionar cualquier opción visible, incluida la que cae al final del
documento, sin que el botón la tape.

## Criterios de aceptación

1. **Dado** un viewport de 375px de ancho en `/practica/si`, **cuando** se
   hace scroll hasta el final del listado de preguntas, **entonces**
   ninguna opción de respuesta (radio/checkbox + etiqueta) queda cubierta
   por el FAB «Mapa».
2. **Dado** un viewport de ~1100px (portátil, por debajo del breakpoint de
   1240px que activa el rail de escritorio), **cuando** se hace scroll
   hasta el final, **entonces** tampoco hay solape entre el FAB y ninguna
   opción de respuesta.
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
