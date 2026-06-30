# Spec — Persistencia de progreso de práctica (localStorage)

- **Issue**: #8 · https://github.com/Llambi/plancha-app/issues/8
- **Estado**: borrador
- **Autor**: Hugo Perez Fernandez
- **Fecha**: 2026-06-30

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

Hoy el estado de la práctica no sobrevive a un reload ni a una revisita. En
`/practica/<asignatura>` el estudiante marca opciones, pulsa «Corregir» y ve su
puntuación, pero al recargar (o volver más tarde) todo se pierde: opciones
marcadas, estado «corregido» y puntuación vuelven a cero. Para un material de
estudio que se consume en varias sesiones, perder el progreso es fricción real.

Además, esta persistencia es la **base habilitadora** de mejoras posteriores
(modo examen #9, estadísticas #10, autoevaluación de desarrollo #12), que
dependen de poder leer/escribir estado por asignatura.

## Resultado esperado

Al volver a la página de práctica de una asignatura, el estudiante recupera el
estado en el que la dejó: sus respuestas marcadas siguen ahí y, si había
corregido, vuelve a ver la corrección (aciertos/fallos, explicaciones) y la
puntuación. Puede reiniciar ese progreso de forma explícita y visible. Todo
sucede en el navegador (sitio 100 % estático), aislado por asignatura.

## Criterios de aceptación

Cada criterio en formato Given / When / Then y verificable:

1. **Dado** que marco opciones en preguntas de test en `/practica/<asignatura>`,
   **cuando** recargo la página, **entonces** mis opciones marcadas se restauran
   tal cual (autosave al marcar, sin necesidad de haber corregido).
2. **Dado** que he pulsado «Corregir», **cuando** recargo la página, **entonces**
   se restauran el estado «corregido» (resaltado de aciertos/fallos y
   explicaciones visibles) y el texto de puntuación «Aciertos: X / N».
3. **Dado** que tengo progreso guardado en una asignatura, **cuando** pulso el
   control de **reiniciar progreso**, **entonces** se borra el estado persistido de
   esa asignatura y la página queda como recién abierta (sin marcas, sin corregir,
   sin puntuación).
4. **Dado** que el contenido cambió y un `id` de pregunta guardado ya no existe,
   **cuando** se restaura el estado, **entonces** las entradas obsoletas se ignoran
   con elegancia (sin errores en consola; las preguntas vigentes se restauran).
5. **Dado** dos asignaturas distintas, **cuando** guardo progreso en una,
   **entonces** no afecta al estado de la otra (clave de `localStorage` namespaced
   por asignatura, p. ej. `plancha:practica:<asignatura>`).
6. **Dado** un navegador con `localStorage` no disponible o lleno (excepción al
   leer/escribir), **cuando** uso la página, **entonces** funciona como hoy (sin
   persistencia) y no se lanza ningún error visible al usuario.
7. **Dado** un deep-link `#q-<id>`, **cuando** abro la página con estado guardado,
   **entonces** el deep-linking y el resaltado `:target` siguen funcionando como
   hoy.

## Alcance

- Incluye:
  - Autosave de las opciones marcadas (test single/multi) por asignatura.
  - Persistencia y restauración del estado «corregido» y de la puntuación.
  - Control visible para reiniciar el progreso de la asignatura.
  - Namespacing por asignatura y degradación elegante (ids obsoletos,
    `localStorage` no disponible).
  - Lógica de (de)serialización extraída a `src/lib/` y testeada de forma pura;
    e2e del ciclo marcar → recargar → restaurar → reiniciar.
- **No-objetivos**:
  - Restaurar la posición de scroll / lectura (el deep-link `#q-<id>` ya cubre
    volver a una pregunta concreta).
  - Sincronización entre dispositivos o backend (sigue siendo estático).
  - Modo examen, estadísticas o autoevaluación de desarrollo (issues #9, #10, #12,
    que se apoyarán en esta base).
  - Persistir el «Ver respuesta» temporal por pregunta (es efímero por diseño).
  - Persistir progreso de la práctica de MongoDB (validador a medida, fuera de
    `/practica/<asignatura>`).

## Impacto en el contenido / constitución

- ¿Toca `src/content/` (test, desarrollo, esquemas, guía)? **No.**
- No se modifica ningún enunciado, opción, solución ni explicación: el cambio es de
  comportamiento de UI/almacenamiento del lado cliente. La regla de contenido
  verbatim no se ve afectada.
- Convenciones de código y Git (idioma inglés en código nuevo, vocabulario de
  dominio en español, commits/PR en inglés) aplican con normalidad.

## Dudas abiertas

- Ninguna pendiente. Decisiones tomadas con el usuario:
  - **Guardado: autosave al marcar** (no solo al corregir).
  - **Scroll: no se restaura** (queda fuera de alcance).
