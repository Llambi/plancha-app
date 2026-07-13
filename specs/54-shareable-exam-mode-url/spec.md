# Spec — Modo examen: compartir/reproducir un simulacro vía URL

- **Issue**: #54 · https://github.com/Llambi/plancha-app/issues/54
- **Estado**: aprobada
- **Autor**: Llambi
- **Fecha**: 2026-07-13

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

El modo examen (`src/lib/exam-mode.ts`) genera el orden barajado/subconjunto con
una semilla basada en `Date.now()`. La configuración (barajado, subconjunto,
cronometrado) se guarda por asignatura en `localStorage`, pero no hay forma de
compartir un simulacro concreto con otra persona ("hazte este mismo examen que
me tocó a mí").

## Resultado esperado

Al iniciar un simulacro, la URL de la página refleja esa configuración exacta
(semilla + opciones), de forma que compartir esa URL y abrirla reproduce el
mismo orden de preguntas y la misma configuración, en cualquier navegador.

## Criterios de aceptación

1. **Dado** que se inicia un simulacro, **cuando** se mira la URL de la página,
   **entonces** contiene la semilla y la configuración (barajado, subconjunto,
   cronometrado) usadas para generarlo.
2. **Dado** una URL de simulacro (propia o compartida por otra persona),
   **cuando** se abre en cualquier navegador, **entonces** se reproduce
   automáticamente el mismo orden de preguntas y la misma configuración que
   generó esa URL.
3. **Dado** que se sale del modo examen, **cuando** se mira la URL,
   **entonces** ya no contiene los parámetros del simulacro (vuelve a la URL
   normal de la asignatura).
4. **Dado** que se inicia un simulacro sin llegar por una URL compartida,
   **cuando** se pulsa "Empezar simulacro" varias veces (saliendo entre medias),
   **entonces** cada uno usa una semilla nueva y aleatoria — el comportamiento
   por defecto no cambia.

## Alcance

- Incluye: serializar semilla + configuración del simulacro como parámetros de
  consulta de la URL al iniciarlo; leerlos al cargar la página para reproducir
  el mismo simulacro automáticamente; un botón para copiar el enlace al
  portapapeles como atajo (la URL de la barra de direcciones ya es
  compartible por sí sola).
- **No-objetivos**: no comparte el estado de las respuestas ya marcadas ni la
  corrección (solo la configuración/orden del simulacro); no añade
  autenticación ni backend; no afecta a asignaturas sin modo examen (sin test).

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No.
- Cambio de lógica pura (serialización/parseo de parámetros de URL) en
  `src/lib/exam-mode.ts` + wiring en `/practica/<asignatura>`, reutilizando el
  `rng` seedeado y `buildExamOrder` ya existentes y testeados.

## Dudas abiertas

Ninguna: la issue especifica claramente qué serializar (semilla + opciones) y
que el comportamiento por defecto (sin URL) no cambia.
