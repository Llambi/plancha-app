# Spec — Toggle de tema no funciona en /practica/mongodb (listener duplicado)

- **Issue**: #36 · https://github.com/Llambi/plancha-app/issues/36
- **Estado**: aprobada
- **Autor**: Claude Code
- **Fecha**: 2026-07-03

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

`src/components/MongoPractica.astro` registra su propio listener de click sobre
`.site-theme-toggle` que reimplementa la misma lógica que ya existe en
`src/layouts/BaseLayout.astro` (leer/escribir `data-theme` en
`document.documentElement` + persistir en `localStorage`). Al hacer click en
`/practica/mongodb`, ambos listeners se disparan sobre el mismo evento: el
segundo lee el valor que el primero acaba de escribir y lo revierte. El
resultado es que el toggle de tema no hace nada en esa página, mientras que en
el resto del sitio (que no duplica el listener) funciona bien.

## Resultado esperado

Clicar el toggle de tema en `/practica/mongodb` alterna `data-theme` entre
`light`/`dark` exactamente igual que en cualquier otra página del sitio,
usando el único listener común de `BaseLayout.astro`.

## Criterios de aceptación

1. **Dado** que estoy en `/practica/mongodb` con `data-theme="dark"`, **cuando**
   hago click en `.site-theme-toggle`, **entonces** `data-theme` pasa a
   `"light"` (y viceversa).
2. **Dado** el código de `MongoPractica.astro`, **cuando** se inspecciona el
   script de tema, **entonces** no existe un segundo `addEventListener('click', …)`
   sobre `.site-theme-toggle`; solo permanece el de `BaseLayout.astro`.
3. **Dado** el resto de páginas del sitio, **cuando** se ejecuta
   `npm run test:e2e`, **entonces** el test existente de persistencia del
   toggle de tema (`smoke.spec.ts`) sigue en verde y no hay nuevas regresiones.

## Alcance

- Incluye: eliminar el listener/lógica de tema duplicada en
  `MongoPractica.astro`.
- **No-objetivos**: no se toca la lógica de `BaseLayout.astro`, ni el resto de
  funcionalidad de `MongoPractica.astro` (validador interactivo de ejercicios).

## Impacto en el contenido / constitución

- ¿Toca `src/content/` (test, desarrollo, esquemas, guía)? No.
- No aplica la regla de contenido verbatim; es un fix de código puro.

## Dudas abiertas

- Ninguna.
