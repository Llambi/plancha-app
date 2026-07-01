# Spec — Filtrar preguntas de test por tema dentro de una asignatura

- **Issue**: #11 · https://github.com/Llambi/plancha-app/issues/11
- **Estado**: borrador
- **Autor**: Claude Code (a petición del usuario)
- **Fecha**: 2026-07-01

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

El campo `tema` ya existe en el schema de `test/` (opcional) y se muestra por
pregunta, pero en `/practica/<asignatura>` el banco se sirve completo y en
bloque (p. ej. 257 preguntas en DAR agrupadas en 10 temas, 88 en SI en 10
temas). No hay forma de estudiar/corregir solo un tema concreto.

## Resultado esperado

En la sección «Preguntas tipo test» de `/practica/<asignatura>` aparece un
grupo de botones «Filtrar por tema» (mismo patrón que los filtros de tipo del
índice, `src/pages/index.astro`): «Todos» + un botón por cada `tema` distinto
presente en el banco de esa asignatura, derivados de los datos existentes (sin
hardcodear). Al elegir un tema, solo esas preguntas quedan visibles (el resto
`hidden`, igual que ya hacen «solo mis fallos» (#10) y «modo examen» (#9): el
minimap las excluye automáticamente vía `practica:filter-changed`). Si la
asignatura no tiene `tema` en ninguna pregunta, el filtro no se muestra
(degradación elegante).

Al corregir con un filtro de tema activo, la corrección y el contador
(`.score`) reflejan **solo las preguntas visibles**, no el banco completo. Esto
requiere que `gradeAll()` (`TestQuestion.astro`) deje de contar las
`[data-tq]` ocultas — cambio de comportamiento acordado con el usuario que
también corrige un desajuste ya existente en el modo examen (#9): hoy, al
elegir un subconjunto de N preguntas y corregir, el contador mostraba el
resultado sobre el banco completo en vez de sobre el subconjunto mostrado.

## Criterios de aceptación

1. **Dado** un banco de test con `tema` en sus preguntas, **cuando** se visita
   `/practica/<asignatura>`, **entonces** aparece un grupo de botones «Todos» +
   uno por cada `tema` distinto (derivados de los datos, sin hardcodear),
   accesible por teclado (son `<button>` nativos con `aria-pressed`).
2. **Dado** el filtro de tema, **cuando** el usuario elige un tema concreto,
   **entonces** solo las preguntas de ese tema quedan visibles (el resto
   `hidden`, no se borran del DOM) y el minimap deja de listarlas.
3. **Dado** un filtro de tema activo, **cuando** el usuario pulsa «Corregir
   test», **entonces** la corrección y el contador `.score` operan solo sobre
   las preguntas visibles (p. ej. «Aciertos: 2 / 5» si el tema tiene 5
   preguntas), no sobre el banco completo.
4. **Dado** que una asignatura no tiene `tema` en ninguna pregunta de test,
   **cuando** se visita su página de práctica, **entonces** no aparece el
   grupo de botones de filtro por tema (degradación elegante).
5. **Dado** el filtro de tema y los controles ya existentes de «solo mis
   fallos» (#10) y «modo examen» (#9), **cuando** se activa uno,
   **entonces** los otros dos se desactivan (mutuamente excluyentes, mismo
   mecanismo `hidden` sobre `[data-tq]`; evita que compitan entre sí).
6. **Dado** el subconjunto de N preguntas del modo examen (#9) ya existente,
   **cuando** se corrige, **entonces** el contador `.score` refleja solo las N
   preguntas mostradas (no el banco completo) — corrección del comportamiento
   previo, acordada explícitamente con el usuario en esta issue.

## Alcance

- Incluye: grupo de botones de filtro por tema en `/practica/<asignatura>`;
  helper puro para derivar/ordenar los temas distintos (testeable, cubre el
  caso "sin tema" → lista vacía); cambio en `gradeAll()` de
  `TestQuestion.astro` para operar solo sobre `[data-tq]` visibles; exclusión
  mutua con «solo mis fallos» y «modo examen».
- **No-objetivos**:
  - No se cambia el contenido ni el orden de las preguntas (verbatim).
  - No se combinan los tres filtros entre sí (p. ej. «solo mis fallos» +
    tema simultáneos) — son mutuamente excluyentes, igual que ya lo son «modo
    examen» y «solo mis fallos» desde la #9.
  - No se añade un `tema` a asignaturas que hoy no lo tienen en su contenido.

## Impacto en el contenido / constitución

- No toca `src/content/`: el campo `tema` ya existe en el schema; el filtro
  solo cambia qué preguntas ya existentes se **muestran/puntúan**, nunca su
  texto, opciones o `correct`.

## Dudas abiertas

Resuelta con el usuario antes de escribir esta spec: `gradeAll()` pasa a
operar solo sobre preguntas visibles (afecta también, para bien, al modo
examen #9). Sin más dudas bloqueantes.
