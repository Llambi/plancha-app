# Spec — Modo repaso transversal: «solo mis fallos» combinando todas las asignaturas

- **Issue**: #51 · https://github.com/Llambi/plancha-app/issues/51
- **Estado**: aprobada
- **Autor**: Llambi
- **Fecha**: 2026-07-13

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

El filtro "solo mis fallos" (issue #10) funciona hoy por asignatura, dentro de
`/practica/<asignatura>`. No hay ninguna vista que cruce los fallos de varias
asignaturas a la vez, así que repasar solo lo que se falla obliga a entrar
asignatura por asignatura y activar el filtro en cada una.

## Resultado esperado

Una vista nueva que, de un vistazo, lista todas las preguntas falladas en su
último intento agrupadas por asignatura, con enlace directo a cada pregunta en su
página de práctica original.

## Criterios de aceptación

1. **Dado** que ninguna asignatura tiene fallos registrados en
   `plancha:stats:<asignatura>`, **cuando** se visita la vista de repaso,
   **entonces** se muestra un estado vacío (no listas ni asignaturas fantasma).
2. **Dado** que una asignatura tiene una o más preguntas cuyo último intento fue
   fallo, **cuando** se visita la vista de repaso, **entonces** esa asignatura
   aparece con exactamente esas preguntas (ni las acertadas ni las no
   respondidas).
3. **Dado** una asignatura sin ningún fallo registrado (o sin datos guardados),
   **cuando** se visita la vista de repaso, **entonces** esa asignatura no
   aparece en el listado.
4. **Dado** una pregunta fallada listada en la vista de repaso, **cuando** se
   pulsa su enlace, **entonces** navega a `/practica/<asignatura>#q-<id>`, el
   mismo anchor que ya usan el buscador y la propia página de práctica.
5. **Dado** que el estado de fallos vive en `localStorage`, **cuando** se carga
   la vista, **entonces** no se lee ni escribe ninguna clave nueva: se reutiliza
   `plancha:stats:<asignatura>` (vía `failedIds()` de `practica-stats.ts`) y el
   índice de búsqueda ya existente (`search-index.json`) para el texto de cada
   pregunta.

## Alcance

- Incluye: una página nueva (`/repaso`) que agrupa por asignatura las preguntas
  con `lastWrong` en cualquier asignatura con datos guardados, con su deep-link;
  un punto de entrada visible desde la home.
- **No-objetivos**: no cubre preguntas de desarrollo/autoevaluación (issue
  distinta), no añade un modo de práctica dentro de la propia vista (solo
  enlaza a la pregunta original), no persiste nada nuevo, no toca
  `src/content/`.

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No.
- Cambio de UI + una función pura nueva de cruce de datos (localStorage + índice
  de búsqueda ya generado en build), reutilizando lógica ya testeada de
  `src/lib/practica-stats.ts` y `src/lib/search.ts`.

## Dudas abiertas

Ninguna: la issue especifica el origen de los fallos (`failedIds()`), el criterio
de qué asignaturas aparecen (con al menos un fallo) y la restricción de no
duplicar almacenamiento.
