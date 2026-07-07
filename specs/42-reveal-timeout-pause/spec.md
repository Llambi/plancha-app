# Spec — «Ver respuesta» se oculta a los 5s sin forma de detener o ampliar el tiempo

- **Issue**: #42 · https://github.com/Llambi/plancha-app/issues/42
- **Estado**: borrador
- **Autor**: Llambi (vía Claude Code)
- **Fecha**: 2026-07-07

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

`TestQuestion.astro` implementa el botón "Ver respuesta" (issue #5) con un
auto-ocultado fijo de 5000 ms (`REVEAL_MS`). Un nuevo clic reinicia el
contador, pero no hay forma de pausarlo o ampliarlo mientras se sigue
leyendo. Para alguien con dislexia, baja visión, o que usa zoom/lector de
pantalla, 5 segundos puede no ser suficiente, y la única "solución" hoy es
re-pulsar el botón repetidamente. Roza WCAG 2.2.1 (Timing Adjustable).

## Resultado esperado

Mientras el usuario sigue interactuando con la respuesta revelada (ratón
sobre la explicación o el botón, o foco de teclado en cualquiera de los
dos), el ocultado automático no se dispara. En cuanto deja de interactuar
(ratón fuera, foco fuera), se reprograma un nuevo conteo de 5s desde ese
momento — el comportamiento por defecto (ocultado tras 5s de inactividad)
se mantiene igual que hoy para quien no interactúa.

## Criterios de aceptación

1. **Dado** una respuesta revelada, **cuando** el puntero del ratón está
   sobre `.tq-exp` (la explicación), **entonces** no se oculta aunque pasen
   más de 5s.
2. **Dado** el caso anterior, **cuando** el puntero sale de `.tq-exp` (sin
   volver a entrar a otra zona de interacción), **entonces** se oculta tras
   5s adicionales de inactividad.
3. **Dado** una respuesta revelada, **cuando** el foco de teclado está en el
   botón "Ver respuesta" (p. ej. justo tras activarlo con `Enter`/`Espacio`),
   **entonces** tampoco se oculta mientras el foco permanezca ahí.
4. **Dado** una respuesta revelada sin ninguna interacción de ratón/teclado
   sobre ella, **cuando** pasan 5s, **entonces** se sigue ocultando sola,
   igual que hoy (no-regresión del comportamiento por defecto).
5. **Dado** una pregunta ya corregida en bloque (explicación permanente,
   sin temporizador), **cuando** se aplica este cambio, **entonces** no hay
   ninguna diferencia de comportamiento (issue #5, criterio ya cubierto).

## Alcance

- Incluye: el temporizador de auto-ocultado de "Ver respuesta" en
  `TestQuestion.astro` (única vista donde vive este componente/patrón).
- **No-objetivos**:
  - No se cambia la duración por defecto de 5000 ms.
  - No se añade una preferencia de usuario configurable (p. ej. "duración
    de revelado" en ajustes) — no pedido.
  - No se extiende el pausado a otras zonas de la tarjeta de pregunta
    (p. ej. las propias opciones), solo a `.tq-exp` y al botón, tal como
    describe la issue.

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No. Cambio de comportamiento en
  `src/components/TestQuestion.astro`.

## Dudas abiertas

- Ninguna: los criterios de aceptación ya estaban completamente definidos
  en la issue original.
