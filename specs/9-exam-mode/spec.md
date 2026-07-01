# Spec — Modo examen: barajado, subconjunto de N preguntas y simulacro cronometrado

- **Issue**: #9 · https://github.com/Llambi/plancha-app/issues/9
- **Estado**: borrador
- **Autor**: Claude Code (a petición del usuario)
- **Fecha**: 2026-07-01

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

En `/practica/<asignatura>` el banco de test se sirve completo, en el orden
fijo del contenido (p. ej. 259 preguntas en DAR, 88 en SI). Para simular un
examen real hace falta poder repasar un subconjunto aleatorio, en orden
barajado, y opcionalmente contrarreloj — no solo repasar el banco entero en
orden.

## Resultado esperado

Sobre la sección «Preguntas tipo test» de `/practica/<asignatura>` se añade un
panel de configuración de **modo examen** que permite:

- Barajar el orden de las preguntas.
- Elegir un subconjunto de N preguntas al azar.
- Activar un simulacro cronometrado con temporizador visible.

Al iniciar el simulacro, solo las preguntas seleccionadas son visibles (en el
orden resultante); el resto queda oculto igual que ya hace el filtro «solo mis
fallos» (#10), de modo que el minimap las excluye automáticamente (ya corregido
en #20). Al terminar (por el usuario o porque se agota el tiempo) se corrige
igual que hoy: se reutiliza `gradeAll()`/evento `tq:graded` y el marcador
`.score` existentes.

## Criterios de aceptación

1. **Dado** el banco de test de una asignatura, **cuando** el usuario activa
   «Barajar preguntas» y pulsa «Empezar simulacro», **entonces** las preguntas
   visibles se muestran en un orden distinto al original (salvo empate por
   azar) y cada una conserva su `options` sin reordenar.
2. **Dado** el panel de modo examen, **cuando** el usuario indica un
   subconjunto de N preguntas (1 ≤ N ≤ total) y empieza el simulacro,
   **entonces** exactamente N preguntas quedan visibles, elegidas al azar sin
   repetición, y las demás quedan `hidden` (no se borran del DOM).
3. **Dado** un simulacro en curso con «solo mis fallos» activo, **cuando** el
   usuario reconfigura el subconjunto, **entonces** el minimap (rail/drawer)
   dejan de listar las preguntas ocultas por el modo examen, igual que ya
   ocurre con el filtro de fallos (reutiliza `practica:filter-changed`); ningún
   tick/fila navega a una pregunta oculta.
4. **Dado** el modo cronometrado activado con una duración M (minutos),
   **cuando** empieza el simulacro, **entonces** se muestra un temporizador
   visible en cuenta atrás; si el usuario corrige antes de tiempo se detiene el
   temporizador, y si llega a 0 se dispara la corrección automáticamente (como
   si se hubiera pulsado «Corregir»).
5. **Dado** un simulacro (cronometrado o no) que finaliza, **cuando** se
   corrige, **entonces** se muestra la puntuación reutilizando el evento
   `tq:graded` y el contador `.score` ya existentes — sin un segundo marcador
   de puntuación paralelo.
6. **Dado** un simulacro activo, **cuando** el usuario pulsa «Salir de modo
   examen» / reinicia, **entonces** vuelven a verse todas las preguntas en su
   orden original y el temporizador (si lo había) se detiene sin corregir
   nada.
7. **Dado** el banco de test de una asignatura, **cuando** se genera un
   barajado o subconjunto con la misma semilla, **entonces** el resultado es
   determinista (permite tests unitarios reproducibles); con semillas o
   momentos distintos, el resultado varía.
8. **Dado** que el usuario configuró antes un modo examen (barajar/N/tiempo)
   para una asignatura, **cuando** vuelve a `/practica/<asignatura>` más
   tarde, **entonces** el panel recuerda esa configuración (no hace falta
   volver a rellenarla), sin que eso implique guardar un historial de
   simulacros realizados.
9. **Dado** que una asignatura no tiene preguntas tipo test (solo desarrollo),
   **cuando** se visita su página de práctica, **entonces** no aparece el
   panel de modo examen (no aplica a `desarrollo`).

## Alcance

- Incluye: panel de configuración (barajar / subconjunto N / cronómetro),
  lógica pura de barajado y muestreo (testeable con semilla), integración con
  el flujo de corrección existente (`tq:graded`, `.score`) y con el mecanismo
  de ocultación ya usado por el filtro «solo mis fallos» (para que el minimap
  se comporte igual).
- Persistencia de la **configuración** del modo examen (barajar on/off, N,
  cronómetro on/off + duración) por asignatura, apoyándose en el patrón de
  `practica-progress.ts`/`localStorage` de la #8.
- **No-objetivos**:
  - Persistencia del **histórico** de simulacros realizados (puntuaciones
    pasadas, fechas, etc.) — eso es de la issue de estadísticas.
  - Persistir/restaurar el **subconjunto y orden exactos** de un simulacro en
    curso tras recargar la página a mitad — recargar durante un simulacro
    activo puede razonablemente reiniciarlo (no es un requisito).
  - Combinar simultáneamente modo examen y filtro «solo mis fallos» de forma
    especial: basta con que ambos usen el mismo mecanismo de ocultación sin
    interferir uno con otro de forma incorrecta.
  - Modo examen para preguntas de `desarrollo` (no tiene sentido de
    barajado/corrección automática tal como está planteado el bloque).
  - Rediseño visual del resto de la página de práctica más allá del panel
    nuevo.

## Impacto en el contenido / constitución

- No toca `src/content/` (test, desarrollo, esquemas, guía): el banco de
  preguntas se transcribe igual; el modo examen solo cambia qué subconjunto y
  en qué orden se **muestran** las preguntas ya existentes, nunca su
  contenido. El orden de `options` dentro de cada pregunta no se altera (regla
  de integridad de `correct`).

## Dudas abiertas

Ninguna bloqueante: los criterios de aceptación de la propia issue #9 son
suficientemente concretos. El detalle de UI (dónde va el panel, valores por
defecto de N y minutos) se decide en `plan.md`.
