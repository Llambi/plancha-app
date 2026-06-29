# Spec — Botón por pregunta de test que revela la opción correcta y se oculta a los 5s

- **Issue**: #5 · https://github.com/Llambi/plancha-app/issues/5
- **Estado**: borrador
- **Autor**: Hugo Perez Fernandez
- **Fecha**: 2026-06-29

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

Hoy las preguntas tipo test solo se corrigen en bloque con el botón global
«Corregir test» (`[data-grade-trigger]`), que marca aciertos/fallos y revela las
explicaciones de **todas** las preguntas a la vez, de forma permanente. No existe
forma de consultar la solución de **una sola** pregunta de manera puntual mientras se
estudia.

## Resultado esperado

Cada pregunta de tipo test tiene su **propio botón** que, al pulsarlo, **revela su
opción correcta** (resaltada en verde) y su **explicación**. Transcurridos
**5 segundos**, el resaltado y la explicación **se vuelven a ocultar**
automáticamente, dejando la pregunta como estaba.

## Criterios de aceptación

1. **Dado** una pregunta de test sin corregir, **cuando** el usuario pulsa su botón de
   revelar, **entonces** la(s) opción(es) correcta(s) se resaltan y la explicación (si
   existe) se hace visible.
2. **Dado** que se ha revelado la solución, **cuando** transcurren 5 segundos,
   **entonces** el resaltado desaparece y la explicación vuelve a ocultarse.
3. **Dado** que la solución está revelada, **cuando** el usuario vuelve a pulsar el
   botón, **entonces** la cuenta de 5 s se reinicia (no se acumulan temporizadores).
4. **Dado** que la pregunta ya se corrigió con «Corregir test», **cuando** se muestra,
   **entonces** el botón de revelar por pregunta no se ofrece (la solución ya es
   visible de forma permanente).

## Alcance

- Incluye: nuevo botón por pregunta en el componente `src/components/TestQuestion.astro`,
  estilos del estado revelado y la lógica de auto-ocultado a 5 s en el script ya
  incluido una sola vez por página.
- **No-objetivos**: no cambia el botón global «Corregir test» ni el marcador de
  aciertos (`tq:graded`); no modifica el contenido de exámenes ni el esquema Zod.

## Impacto en el contenido / constitución

- ¿Toca `src/content/` (test, desarrollo, esquemas, guía)? **No**.
- El contenido (question, options, explicacion) se sigue renderizando **verbatim** con
  `set:html`; el cambio es puramente de UI/interacción sobre el componente y su página.

## Dudas abiertas

- Ninguna: comportamiento (resaltar correcta + mostrar explicación, 5 s, reinicio de
  timer en re-clic, ocultar botón tras corregir en bloque) confirmado con el usuario en
  la fase de planificación.
