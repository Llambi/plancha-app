# Spec — Las respuestas escritas en preguntas de desarrollo no se guardan (se pierden al recargar)

- **Issue**: #28 · https://github.com/Llambi/plancha-app/issues/28
- **Estado**: borrador
- **Autor**: Llambi (Hugo Perez)
- **Fecha**: 2026-07-02

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

En `src/components/DesarrolloQuestion.astro`, el `<textarea class="dq-text">`
donde el usuario redacta su respuesta a una pregunta de desarrollo no tiene
ningún manejador de guardado. Al recargar la página (o volver más tarde), el
texto escrito desaparece.

Esto es inconsistente con el resto de la app, donde el progreso del usuario sí
persiste en `localStorage`:

- Respuestas de test → `src/lib/practica-progress.ts` (usado por
  `TestQuestion.astro`).
- Autoevaluación de la propia pregunta de desarrollo (Lo sabía / A medias / No
  lo sabía) → `src/lib/desarrollo-progress.ts`.

Un usuario que dedica tiempo a redactar una respuesta larga puede perderla por
un simple refresco o cierre accidental de la pestaña.

## Resultado esperado

El texto que el usuario escribe en el textarea de una pregunta de desarrollo se
guarda de forma incremental en `localStorage` (namespaced por asignatura,
siguiendo el patrón existente) y se restaura automáticamente al volver a
cargar la página, igual que ya ocurre con la autoevaluación.

## Criterios de aceptación

1. **Dado** que el usuario escribe texto en el `<textarea>` de una pregunta de
   desarrollo, **cuando** deja de escribir (tras un breve debounce), **entonces**
   el borrador se guarda en `localStorage` bajo una clave namespaced por
   asignatura.
2. **Dado** un borrador guardado para una pregunta de desarrollo, **cuando** el
   usuario recarga la página o vuelve a visitarla, **entonces** el texto se
   restaura en el textarea correspondiente (identificado por su id de
   pregunta, p. ej. `d-<id>`).
3. **Dado** que el usuario borra todo el texto de un textarea, **cuando** el
   guardado incremental se dispara, **entonces** el borrador vacío se refleja
   en `localStorage` (no queda un borrador obsoleto con contenido antiguo).
4. **Dado** que `localStorage` no está disponible (modo privado, cuota
   excedida), **cuando** el usuario escribe o recarga, **entonces** la app
   degrada silenciosamente (no lanza errores visibles ni rompe la página),
   igual que el resto de la app (`safeGet`/`safeSet`).
5. **Dado** que existen varias preguntas de desarrollo en la misma página,
   **cuando** se restauran los borradores, **entonces** cada textarea recibe
   únicamente el borrador de su propia pregunta (sin mezclar respuestas entre
   preguntas).

## Alcance

- Incluye: guardado incremental (on input + debounce) y restauración al cargar
  del contenido del `<textarea class="dq-text">` en `DesarrolloQuestion.astro`,
  persistido en `localStorage` con clave namespaced por asignatura, siguiendo
  el patrón de `practica-progress.ts` / `desarrollo-progress.ts` (posible
  extensión de `desarrollo-progress.ts` o módulo hermano equivalente,
  a decidir en el plan).
- **No-objetivos**:
  - No se añade sincronización entre dispositivos ni backend: sigue siendo
    solo `localStorage`.
  - No se cambia la autoevaluación existente (Lo sabía / A medias / No lo
    sabía) ni su formato de persistencia actual.
  - No se añade límite de tamaño, expiración ni compresión de borradores.

## Impacto en el contenido / constitución

- ¿Toca `src/content/` (test, desarrollo, esquemas, guía)? **No.**
- Este cambio es puramente de comportamiento de UI/persistencia
  (`src/components/DesarrolloQuestion.astro` y `src/lib/`); no toca contenido
  transcrito de exámenes ni temarios, por lo que las reglas de contenido
  verbatim no aplican.

## Dudas abiertas

- Ninguna: la issue original ya especifica el patrón a seguir
  (`safeGet`/`safeSet`, clave namespaced por asignatura) y los criterios de
  aceptación son concretos y verificables.
