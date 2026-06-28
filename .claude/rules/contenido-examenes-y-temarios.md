# Reglas — contenido de exámenes y temarios

Aplican a TODO el material de estudio bajo `src/content/`:
`test/` (baterías de preguntas), `desarrollo/` (preguntas de desarrollo y
prácticos), `esquemas/` (esquemas de estudio) y `guia/` (guía paginada).

La autoría se hace con las skills `add-exam` y `add-esquema`. Estas reglas son la
versión normativa de lo que esas skills aplican; valen también cuando se edita a
mano.

## Regla de oro: el contenido se transcribe VERBATIM, nunca se modifica

- **NO se modifican ni los enunciados ni las respuestas.** Se transcriben carácter
  a carácter: misma redacción, mismas mayúsculas/minúsculas, misma puntuación,
  mismos acentos y mismos símbolos que en el documento original.
- **NO se corrigen** erratas, faltas de ortografía, errores de cálculo ni datos que
  parezcan equivocados. Si algo parece un error, **consérvalo igual** y coméntalo
  al usuario por separado — nunca lo edites en el contenido.
- **NO se reordenan las opciones.** Las `options` van en su **orden original**.
  Reordenar invalidaría los índices de `correct`.
- **NO se traduce, parafrasea, resume ni "mejora"** ningún enunciado, opción,
  explicación o respuesta modelo.
- **NO se añade formato HTML** a las preguntas de test: el banco se renderiza como
  texto escapado (el HTML literal se ve como código). HTML/Markdown inline solo se
  admite donde el esquema lo contempla (p. ej. `clave` en esquemas, `question`
  cuando ya venía con HTML en el original, cuerpo de `desarrollo` y `guia`).

## La respuesta correcta

- En `test/`, la solución es el array `correct` con **índices 0-based** sobre
  `options` (`type: single` → un índice; `type: multi` → uno o más).
- La marca de cuál es la correcta se toma **del documento original**. Si el original
  no indica la solución, o es ambigua o parece incorrecta, **no la inventes ni la
  deduzcas en silencio**: pregúntalo al usuario y deja constancia.
- Si tras confirmar con el usuario la solución original es errónea, el enunciado y
  las opciones siguen siendo verbatim; la corrección va en `explicacion`, nunca
  cambiando el texto de la pregunta.

## Integridad estructural (no es contenido, pero protege el contenido)

- `correct` debe referirse a posiciones existentes de `options` (0-based, sin
  índices fuera de rango ni repetidos).
- Cada `id` de pregunta es único dentro de su asignatura; al añadir, no reutilices
  ni renumeres ids ya publicados (romperías enlaces/anclas).
- Respeta el esquema Zod de `src/content/config.ts`. Si un campo no encaja, es señal
  de que falta confirmar algo con el usuario, no de relajar la regla.
- `asignatura` debe ser uno de los códigos admitidos; alta de asignatura nueva =
  entrada en `src/data/asignaturas.ts` (ver CLAUDE.md).

## Doble lectura antes de dar por buena una entrada

- Tras transcribir, **relee** enunciado, opciones, solución (`correct`) y
  explicación comparándolos **contra el original**, carácter a carácter, antes de
  considerar la entrada terminada. Es el control anti-erratas de transcripción.
- Comprueba en esa relectura que: el texto coincide exactamente, el orden de
  `options` es el del original, los índices de `correct` apuntan a la(s) opción(es)
  correcta(s) del original, y ningún campo se ha "completado" de memoria.
- Si algo no cuadra en la relectura, **no lo arregles editando el contenido**:
  vuelve al original (o al `legacy/` en git) y, si persiste la duda, consúltalo
  con el usuario.

## Procedencia y verificación

- Ante la duda sobre la fuente, los documentos originales migrados están en el
  historial de git (commit que introdujo `legacy/`). Recupéralos con
  `git show <commit>:legacy/<fichero>.html` para re-verificar — nunca "rellenes"
  de memoria.
- Si un examen aporta metadatos (veces que ha aparecido, si es oficial), usa
  `apariciones` / `oficial`; no los inventes.
