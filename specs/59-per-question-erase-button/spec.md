# Spec — Botón para borrar la respuesta de una pregunta individual (test o desarrollo)

- **Issue**: #59 · https://github.com/Llambi/plancha-app/issues/59
- **Estado**: aprobada (decisiones ya acordadas con el usuario antes de abrir
  esta issue: ver comentarios de la conversación original)
- **Autor**: Llambi (vía Claude Code)
- **Fecha**: 2026-07-14

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

Hoy no existe forma de limpiar la respuesta de **una sola** pregunta: en
test solo existe «Reiniciar progreso» (borra **todas** las respuestas de la
asignatura); en desarrollo no hay ningún control de borrado, solo
autoguardado del borrador.

## Resultado esperado

Cada pregunta (test o desarrollo) tiene su propio botón con icono de goma
de borrar que limpia solo esa pregunta, sin afectar a las demás.

## Criterios de aceptación

1. **Test**: el botón desmarca la opción/opciones de esa pregunta y borra
   su entrada en `practica-progress.ts`, sin tocar otras preguntas ni las
   estadísticas acumuladas (`practica-stats.ts`).
2. **Test**: el botón solo está disponible **antes** de corregir esa
   pregunta — una vez en estado `graded` (corrección global), se oculta.
   No permite "descorregir".
3. **Desarrollo**: el botón vacía el textarea, borra el borrador guardado
   **y** quita la marca de autoevaluación ("Lo sabía"/"A medias"/"No lo
   sabía") de esa pregunta.
4. **Ambos**: el borrado requiere confirmación — un primer clic pone el
   botón en un estado visual de "confirmar" (icono/color distinto,
   `aria-label` que lo indica) durante 4 segundos; un segundo clic dentro
   de esa ventana ejecuta el borrado; si no se confirma, el botón vuelve
   solo a su estado normal.
5. **Persistencia**: usa las mismas utilidades y el mismo patrón
   `safeGet`/`safeSet` tolerante a `localStorage` no disponible que ya usa
   el resto del sitio.

## Alcance

- Incluye: `TestQuestion.astro`, `DesarrolloQuestion.astro`,
  `src/lib/practica-progress.ts`, `src/lib/desarrollo-progress.ts`.
- **No-objetivos**:
  - No se extrae un componente `EraseButton.astro` compartido (ver
    plan.md — el estilo `scoped` de Astro no llega a través de un
    componente hijo sin recurrir a `is:global`, y aquí no hace falta
    compartir entre más de 2 sitios con lógica de confirmación distinta
    cada uno).
  - No se ajustan `score`/`total` de una asignatura ya corregida (el botón
    no está disponible en ese estado, así que no hay nada que ajustar).
  - No se añade una preferencia para desactivar la confirmación.

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No. Cambio de comportamiento en dos componentes +
  dos módulos puros de `src/lib`.

## Dudas abiertas

- Ninguna: las tres decisiones de diseño (solo antes de corregir en test,
  borra texto + autoevaluación en desarrollo, requiere confirmación) ya se
  acordaron con el usuario al crear esta issue.
