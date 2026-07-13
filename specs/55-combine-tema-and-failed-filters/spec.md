# Spec — Práctica: permitir combinar el filtro de tema con «solo mis fallos»

- **Issue**: #55 · https://github.com/Llambi/plancha-app/issues/55
- **Estado**: aprobada
- **Autor**: Llambi
- **Fecha**: 2026-07-13

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

El filtro de tema, "solo mis fallos" y el modo examen comparten hoy el mismo
flag `hidden` sobre `[data-tq]` y son mutuamente excluyentes: activar uno
desactiva los otros dos. En asignaturas con muchas preguntas (DAR tiene 257),
no poder ver "solo mis fallos del tema 3" obliga a repasar los fallos de toda
la asignatura mezclados.

## Resultado esperado

El filtro de tema y "solo mis fallos" se pueden activar a la vez y se
combinan (intersección): se ven solo las preguntas de ese tema que además
están falladas. El modo examen sigue siendo excluyente respecto a ambos, como
hoy, porque genera su propio orden/subconjunto.

## Criterios de aceptación

1. **Dado** un tema activo con preguntas falladas y no falladas dentro de él,
   **cuando** se activa también "solo mis fallos", **entonces** solo quedan
   visibles las preguntas de ese tema que están falladas (intersección de
   ambos criterios).
2. **Dado** "solo mis fallos" y un tema activos a la vez, **cuando** se
   desactiva "solo mis fallos", **entonces** vuelven a verse todas las
   preguntas de ese tema (el filtro de tema no se pierde).
3. **Dado** cualquier combinación de tema y "solo mis fallos" activa,
   **cuando** se inicia el modo examen, **entonces** ambos se desactivan (el
   examen sigue siendo excluyente, comportamiento sin cambios).
4. **Dado** el modo examen activo, **cuando** se activa el filtro de tema o
   "solo mis fallos", **entonces** se sale del modo examen (comportamiento sin
   cambios).

## Alcance

- Incluye: cambiar la lógica de `/practica/<asignatura>` para que el filtro de
  tema y "solo mis fallos" calculen la visibilidad de forma combinada en vez
  de resetearse mutuamente.
- **No-objetivos**: no cambia el modo examen ni su relación de exclusión con
  los otros dos filtros; no añade controles de UI nuevos (es un cambio de
  comportamiento sobre los controles ya existentes).

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No.
- Cambio de lógica de UI en `src/pages/practica/[asignatura].astro`
  (client-side), sin nuevas claves de `localStorage` ni cambios de schema.

## Dudas abiertas

Ninguna: la issue especifica explícitamente qué combina (tema + fallos) y qué
sigue siendo excluyente (modo examen).
