# Spec — Validador de MongoDB: el test de consultas no es accesible por teclado

- **Issue**: #41 · https://github.com/Llambi/plancha-app/issues/41
- **Estado**: borrador
- **Autor**: Llambi (vía Claude Code)
- **Fecha**: 2026-07-07

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

En `src/components/MongoPractica.astro`, las opciones del bloque "Test de
consultas" (B2) de cada ejercicio se generan como
`<div class="opt" onclick="pick(qi, oi)">` (sin `role`, `tabindex` ni
manejador de teclado), a diferencia de `TestQuestion.astro` (usado en el
resto del sitio: `/practica/si`, `/practica/dar`…), que sí usa
`<input type="radio">`/`<input type="checkbox">` reales. Un usuario que
navega solo con teclado no puede seleccionar ninguna respuesta en
`/practica/mongodb`.

## Resultado esperado

Las opciones del test de consultas del validador de MongoDB son controles de
formulario nativos (radio, ya que cada pregunta tiene una única respuesta
correcta), seleccionables con teclado, con el mismo comportamiento visual y
de corrección que hoy — sin necesidad de reescribir el validador para que
reutilice `TestQuestion.astro` (arquitectura muy distinta: esta vista
renderiza todo por JS vanilla vía `innerHTML`, no por colecciones de
contenido de Astro).

## Criterios de aceptación

1. **Dado** el test de consultas de `/practica/mongodb`, **cuando** se
   navega solo con teclado (`Tab` + `Espacio`), **entonces** se puede
   seleccionar cualquier opción de cualquier pregunta.
2. **Dado** una opción seleccionada, **cuando** se inspecciona con
   tecnología de asistencia, **entonces** expone `role="radio"` (implícito
   en `<input type="radio">`) y su estado `checked` correctamente.
3. **Dado** el comportamiento actual (clic con ratón, colores de
   correcto/incorrecto tras "Corregir test", feedback por pregunta,
   persistencia de la selección al cambiar de ejercicio y volver),
   **cuando** se aplica este cambio, **entonces** nada de eso cambia para
   el usuario final — visual y funcionalmente idéntico salvo por ser ahora
   operable por teclado.
4. **Dado** una pregunta ya corregida, **cuando** se intenta cambiar la
   selección (ratón o teclado), **entonces** no se puede (los controles
   quedan deshabilitados, igual que antes al estar los `<div>` bajo
   `.locked` — ahora reforzado por `disabled` real en el `<input>`).

## Alcance

- Incluye: únicamente las opciones del bloque "Test de consultas" (B2) del
  validador de MongoDB (`MongoPractica.astro`).
- **No-objetivos**:
  - No se migra el validador para reutilizar `TestQuestion.astro` (cambio de
    arquitectura mucho mayor, no pedido por la issue).
  - No se envuelve el grupo de opciones en `<fieldset>`/`<legend>` (mejora
    de agrupación semántica adicional, no parte de los criterios de
    aceptación de esta issue).
  - No se toca el bloque "Caso práctico" (B1, textareas de JSON) — es un
    hallazgo de accesibilidad distinto (issue #44).

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No. El validador de MongoDB no usa colecciones de
  contenido; sus ejercicios están definidos inline en
  `MongoPractica.astro`. No aplica la regla de contenido verbatim.

## Dudas abiertas

- Ninguna: los criterios de aceptación ya estaban completamente definidos
  en la issue original.
