# Spec — Minimap: fallos de accesibilidad por teclado y de comportamiento (filtro «solo mis fallos», coloreado sin responder)

- **Issue**: #20 · https://github.com/Llambi/plancha-app/issues/20
- **Estado**: borrador
- **Autor**: Claude Code (revisión de la PR #18)
- **Fecha**: 2026-07-01

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

La PR #18 implementó el minimap de navegación (issue #16) para las páginas de
práctica y esquemas. Una revisión manual posterior (verificada en navegador,
no especulativa) encontró tres problemas:

1. El minimap colorea en rojo (`bad`) preguntas de test que están `graded`
   pero que el usuario nunca respondió, tratándolas igual que las realmente
   falladas. Esto contradice cómo el resto de la app (`TestQuestion.astro`'s
   `gradeAll()`, `practica-stats.ts`) distingue `answered` de `correct`, y
   genera información engañosa para quien usa el minimap para repasar fallos.
2. La issue #16 exigía explícitamente tener en cuenta el filtro «Solo mis
   fallos» (issue #10): cuando hay preguntas `hidden`, el índice debería
   reflejarlo. No se implementó — el minimap no rebuild al cambiar el filtro
   y sigue navegando a preguntas ocultas.
3. La issue #16 exigía "navegable por teclado, roles/labels ARIA adecuados,
   foco visible". Los ticks del rail y las filas del drawer no son
   focusables/operables por teclado, el drawer (`role="dialog"`) no gestiona
   el foco al abrir/cerrar, y el botón de fijar no expone su estado
   (`aria-pressed`) para lectores de pantalla.

## Resultado esperado

El minimap refleja fielmente el estado real de las preguntas (sin marcar como
falladas las que no se han respondido), es coherente con el filtro «Solo mis
fallos» ya existente, y es utilizable de principio a fin solo con teclado
(rail, drawer, pins), cumpliendo lo que la propia issue #16 ya pedía.

## Criterios de aceptación

1. **Dado** un test corregido en el que una pregunta no tiene ninguna opción
   marcada, **cuando** se construye/actualiza el rail o el drawer del
   minimap, **entonces** esa pregunta no lleva la marca `bad` (rojo); solo la
   llevan las respondidas e incorrectas.
2. **Dado** el filtro «Solo mis fallos» activado (algunas preguntas quedan
   `hidden`), **cuando** se abre o refresca el minimap, **entonces** las
   entradas correspondientes a preguntas ocultas no se muestran (o quedan
   claramente no-interactivas) en el rail y en el drawer.
3. **Dado** el filtro anterior, **cuando** se desactiva, **entonces** el
   minimap vuelve a mostrar todas las entradas.
4. **Dado** el rail o el drawer con foco de teclado, **cuando** el usuario
   pulsa `Tab`, **entonces** llega a cada tick/fila individual (incluida la
   sección «Fijados») con un indicador de foco visible, y `Enter`/`Espacio`
   ejecuta el mismo salto que un click.
5. **Dado** el drawer cerrado, **cuando** se abre (FAB o atajo), **entonces**
   el foco se mueve dentro de él; **cuando** se cierra, **entonces** el foco
   vuelve al control que lo abrió, y mientras está abierto el contenido de
   fondo no es alcanzable por `Tab`.
6. **Dado** una entrada pinnable (pregunta test/desarrollo, tema o
   sub-branch de esquema), **cuando** se fija o desfija con el botón de pin,
   **entonces** su `aria-pressed` (o equivalente) cambia en consecuencia.
7. **Dado** cualquiera de los cambios anteriores, **cuando** se ejercitan el
   rail, el drawer, los pins (persistencia en `localStorage`), el scroll-spy,
   el drag-to-scrub y el atajo `n`/`p`, **entonces** siguen funcionando como
   antes de este fix (regresión cero).

## Alcance

- Incluye: `src/components/Minimap.astro`, `src/components/PinButton.astro`,
  `src/lib/minimap.ts` y los tests (unit + e2e) que cubren este
  comportamiento.
- **No-objetivos**:
  - No se rediseña el aspecto visual del minimap (colores, tamaños, layout)
    más allá de lo necesario para los estados de foco/accesibilidad.
  - No se modifica `practica-stats.ts` ni la lógica del filtro «Solo mis
    fallos» en sí (issue #10); solo cómo el minimap reacciona a él.
  - No se toca contenido de `src/content/`.

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No.
- Cambios limitados a componentes/lib de UI y sus tests; no aplica la regla
  de contenido verbatim.

## Dudas abiertas

Ninguna: los tres problemas están verificados en navegador (capturas y
`preview_eval` durante la revisión de la PR #18) y los criterios de
aceptación derivan directamente de las exigencias ya explícitas de la issue
#16.
