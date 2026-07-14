# Spec — Home: indicador de «última vez estudiado» por asignatura

- **Issue**: #57 · https://github.com/Llambi/plancha-app/issues/57
- **Estado**: aprobada
- **Autor**: Llambi
- **Fecha**: 2026-07-13

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

La home no distingue asignaturas activas de otras que llevan tiempo sin
tocarse, lo que dificulta decidir qué repasar.

## Resultado esperado

Cada tarjeta de práctica con actividad reciente muestra, de forma discreta,
hace cuánto se estudió por última vez (p. ej. "Estudiado hace 3 días").

## Criterios de aceptación

1. **Dado** una asignatura sin ninguna interacción registrada, **cuando** se
   carga la home, **entonces** su tarjeta no muestra el indicador.
2. **Dado** una asignatura en la que se ha corregido una pregunta de test o
   autoevaluado una de desarrollo, **cuando** se carga la home, **entonces**
   su tarjeta muestra hace cuánto fue esa interacción.
3. **Dado** que el dato de "última vez estudiado" se deriva de interacción
   real del usuario, **cuando** se guarda, **entonces** se hace en
   `localStorage` (client-side), consistente con el resto de estadísticas del
   sitio — no se deriva de metadatos del contenido.

## Alcance

- Incluye: un timestamp nuevo en `localStorage`
  (`plancha:last-studied:<asignatura>`), actualizado al corregir un test o
  autoevaluar una pregunta de desarrollo en `/practica/<asignatura>`; un
  indicador discreto en la tarjeta correspondiente de la home con el tiempo
  relativo ("hace X días/horas/…").
- **No-objetivos**: no cubre la práctica interactiva de MongoDB (no dispara
  los eventos de corrección/autoevaluación existentes que se reutilizan
  aquí); no añade un historial de fechas, solo la última; no afecta a
  esquemas ni guías (no tienen "corrección").

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No.
- Añade un módulo puro nuevo (`src/lib/last-studied.ts`) + wiring en
  `/practica/<asignatura>` (dos listeners más sobre eventos ya existentes:
  `tq:graded` y `desarrollo:stats-updated`) y en la home (lectura +
  formateo, mismo patrón que el badge de progreso del issue #50).

## Dudas abiertas

Ninguna: a diferencia del issue #53, aquí la propia issue permite
explícitamente "guardar... la fecha del último intento", así que añadir una
clave nueva de `localStorage` está dentro de alcance.
