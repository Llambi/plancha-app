# Spec — Toggle de tema: añadir un tercer estado «Automático»

- **Issue**: #49 · https://github.com/Llambi/plancha-app/issues/49
- **Estado**: borrador
- **Autor**: Llambi (vía Claude Code)
- **Fecha**: 2026-07-08

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

`BaseLayout.astro` guarda la preferencia de tema en
`localStorage('site-theme')` la primera vez que el usuario toca el botón;
a partir de ahí, el sitio ya no vuelve a mirar `prefers-color-scheme`
aunque el usuario cambie la preferencia de su sistema operativo (p. ej.
modo oscuro automático al anochecer).

## Resultado esperado

El toggle de tema pasa de dos estados (claro/oscuro) a tres (claro →
oscuro → automático → claro…). En modo "automático", el sitio sigue
`prefers-color-scheme` en todo momento, incluidos los cambios que ocurran
mientras la página ya está abierta (sin recargar). Sin preferencia
guardada (primera visita), el estado por defecto pasa a ser "automático"
en vez de congelar el valor detectado la primera vez.

## Criterios de aceptación

1. **Dado** ninguna preferencia guardada (primera visita), **cuando** se
   carga cualquier página, **entonces** el tema visual sigue
   `prefers-color-scheme` y el estado del toggle es "automático".
2. **Dado** el toggle en cualquier estado, **cuando** se pulsa una vez,
   **entonces** avanza exactamente un paso en el ciclo claro → oscuro →
   automático → claro (nunca salta dos pasos ni se queda igual — guarda de
   regresión del bug de listener duplicado, issue #36).
3. **Dado** el modo "automático" activo, **cuando** cambia la preferencia
   `prefers-color-scheme` del sistema operativo mientras la página sigue
   abierta, **entonces** el tema visual se actualiza solo, sin recargar ni
   volver a pulsar el botón.
4. **Dado** cualquier preferencia elegida (incluida "automático"),
   **cuando** se recarga la página o se navega a otra, **entonces** se
   mantiene (persistida en `localStorage`).
5. **Dado** el resto de la topbar (buscador, «Inicio», tamaño/posición del
   botón), **cuando** se aplica este cambio, **entonces** no hay ninguna
   diferencia (issue #31, ya cubierta por tests existentes).

## Alcance

- Incluye: `src/layouts/BaseLayout.astro` (script anti-parpadeo, botón,
  script de click, CSS de los iconos).
- **No-objetivos**:
  - No se añade un menú desplegable de 3 opciones explícitas (radio
    buttons, `<select>`…) — se mantiene un único botón cíclico, igual que
    hoy, solo que con un estado más.
  - No se persiste nada nuevo aparte del propio valor de preferencia
    (`'light' | 'dark' | 'auto'`) en la misma clave `site-theme` ya
    existente.

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No. Cambio de comportamiento/UI en
  `src/layouts/BaseLayout.astro`, compartido por todas las páginas.

## Dudas abiertas

- Ninguna: el enfoque (tercer estado cíclico, valor por defecto
  "automático") ya se acordó con el usuario antes de escribir esta spec.
