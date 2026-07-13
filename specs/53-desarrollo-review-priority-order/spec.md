# Spec — Repetición espaciada para la autoevaluación de preguntas de desarrollo

- **Issue**: #53 · https://github.com/Llambi/plancha-app/issues/53
- **Estado**: aprobada
- **Autor**: Llambi
- **Fecha**: 2026-07-13

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

La autoevaluación "Lo sabía / A medias / No lo sabía" (issue #12) ya guarda
estado por pregunta en `desarrollo-progress.ts`, pero las preguntas de
desarrollo siempre se presentan en el mismo orden fijo del contenido. Repasar
primero lo que peor se domina obliga a ir buscando manualmente esas preguntas.

## Resultado esperado

Una forma de reordenar, dentro de una asignatura, las preguntas de desarrollo
para repasar antes lo que peor se sabe, sin perder la posibilidad de volver al
orden secuencial original.

## Criterios de aceptación

1. **Dado** una asignatura con preguntas de desarrollo autoevaluadas con
   distintos estados, **cuando** se activa el repaso priorizado, **entonces**
   las preguntas se reordenan con esta prioridad: "No lo sabía" primero, luego
   "A medias", luego las nunca autoevaluadas, y por último "Lo sabía".
2. **Dado** que el repaso priorizado está activo, **cuando** se desactiva,
   **entonces** las preguntas vuelven a su orden secuencial original (el del
   contenido).
3. **Dado** el estado de autoevaluación ya persistido en
   `plancha:desarrollo:<asignatura>`, **cuando** se calcula el orden de
   repaso, **entonces** no se lee ni escribe ninguna clave nueva de
   `localStorage` (se reutiliza `answers` de `desarrollo-progress.ts` tal
   cual).
4. **Dado** que dentro de un mismo grupo de prioridad (p. ej. varias "No lo
   sabía") no hay más información que distinga una de otra, **cuando** se
   calcula el orden, **entonces** se conserva su orden relativo original
   (orden estable, sin depender de un timestamp que hoy no existe).

## Alcance

- Incluye: una función pura de ordenación reutilizando el estado existente de
  `desarrollo-progress.ts`, y un control (toggle) en el panel de
  autoevaluación de `/practica/<asignatura>` para activarla/desactivarla
  sobre las preguntas de desarrollo ya renderizadas.
- **No-objetivos**: no implementa un algoritmo de repetición espaciada con
  fechas/intervalos (no hay timestamps guardados y añadirlos queda fuera de
  alcance); no persiste la preferencia del toggle entre recargas (arranca
  siempre en orden secuencial); no afecta a las preguntas tipo test.

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No.
- Cambio de lógica pura (nueva función de ordenación) + wiring de UI en
  `/practica/<asignatura>`, reutilizando el estado ya persistido por
  `desarrollo-progress.ts` y el patrón de reordenado de DOM ya usado por el
  modo examen (`container.appendChild`).

## Dudas abiertas

Ninguna: el AC "sin nuevo almacenamiento" descarta explícitamente añadir
timestamps de "último repaso"; la propuesta de la issue lo presenta como
ejemplo ("ej. ordenar por estado + antigüedad"), no como requisito, así que el
criterio de orden se resuelve solo con el estado de autoevaluación ya
existente.
