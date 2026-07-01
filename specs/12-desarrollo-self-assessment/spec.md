# Spec — Autoevaluación en preguntas de desarrollo (lo sabía / a medias / no lo sabía)

- **Issue**: #12 · https://github.com/Llambi/plancha-app/issues/12
- **Estado**: borrador
- **Autor**: Claude Code (a petición del usuario)
- **Fecha**: 2026-07-01

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

`DesarrolloQuestion.astro` solo muestra el enunciado, un textarea y la
respuesta modelo. El estudiante no tiene forma de registrar si sabía la
respuesta, así que no puede repasar por "lo que peor lleva" en las preguntas
de desarrollo (sí puede en test, desde la #10).

## Resultado esperado

Cada pregunta de desarrollo ofrece tres botones de autoevaluación («Lo
sabía» / «A medias» / «No lo sabía»), accesibles por teclado (`<button>`
nativos + `aria-pressed`, solo uno activo a la vez por pregunta). La
selección se persiste en `localStorage`, namespaced por asignatura, y se
restaura al volver a la página.

**Alcance de "contribuye a las estadísticas"** (decidido con el usuario): se
añade un resumen propio y sencillo en la sección de desarrollo —conteos de
"Sabías / A medias / No sabías" sobre las preguntas autoevaluadas— análogo al
panel de stats ya existente para test (`practica-stats.ts`), pero
**independiente**: el modelo de datos de test es correcto/incorrecto y no
encaja con el 3-estados de desarrollo, así que no se reutiliza la misma
estructura, solo el patrón (persistencia namespaced + panel de resumen).

## Criterios de aceptación

1. **Dado** una pregunta de desarrollo, **cuando** se visita su página de
   práctica, **entonces** aparecen tres botones de autoevaluación
   accesibles por teclado (`aria-pressed`), ninguno activo por defecto.
2. **Dado** los tres botones de una pregunta, **cuando** el usuario pulsa
   uno, **entonces** ese botón queda activo (`aria-pressed="true"`) y los
   otros dos inactivos para esa pregunta (nunca dos a la vez).
3. **Dado** una autoevaluación ya elegida, **cuando** el usuario recarga la
   página, **entonces** el botón elegido sigue marcado como activo
   (persistencia namespaced por asignatura en `localStorage`).
4. **Dado** una o más preguntas de desarrollo autoevaluadas, **cuando** se
   visita la sección de desarrollo, **entonces** se muestra un resumen con
   los conteos («Sabías: X · A medias: Y · No sabías: Z» sobre el total
   autoevaluado) que se actualiza al autoevaluar.
5. **Dado** el enunciado y la respuesta modelo de una pregunta de desarrollo,
   **cuando** se añade la autoevaluación, **entonces** ninguno de los dos se
   modifica (verbatim) — la autoevaluación es un control nuevo, no toca el
   contenido existente.

## Alcance

- Incluye: botones de autoevaluación en `DesarrolloQuestion.astro`;
  persistencia pura y testeable (nuevo módulo, mismo patrón que
  `practica-progress.ts`); panel de resumen propio en la sección de
  desarrollo de `/practica/<asignatura>`.
- **No-objetivos**:
  - No se integra en `practica-stats.ts` (modelo correcto/incorrecto no
    aplica al 3-estados).
  - No hay botón de "reiniciar autoevaluación" (no lo pide la issue; se
    puede añadir después si hace falta).
  - No se cambia el enunciado, el textarea de respuesta libre ni la
    respuesta modelo.

## Impacto en el contenido / constitución

- No toca `src/content/`: la autoevaluación es un control de UI + estado en
  `localStorage`, nunca el `enunciado` ni el cuerpo (respuesta modelo)
  existentes.

## Dudas abiertas

Resuelta con el usuario antes de escribir esta spec: el resumen de stats de
desarrollo es propio y sencillo, independiente de `practica-stats.ts`. Sin
más dudas bloqueantes.
