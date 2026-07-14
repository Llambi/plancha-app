# Tasks — Botón para borrar la respuesta de una pregunta individual

- **Issue**: #59
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #59)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — `clearAnswer()` en `practica-progress.ts` (rojo → verde)**
  - Test (rojo): `tests/unit/practica-progress.test.ts` — quita solo la
    pregunta indicada, deja el resto (incluidos `graded`/`score`/`total`)
    intacto; no-op si no tenía respuesta.
  - Implementación (verde): `clearAnswer(state, questionId)`.
  - Commit: `feat(practica-progress): add clearAnswer() to remove a single question's answer (refs #59)`

- [x] **T2 — `clearAnswer()` en `desarrollo-progress.ts` (rojo → verde)**
  - Test (rojo): `tests/unit/desarrollo-progress.test.ts` — quita
    respuesta y borrador de la pregunta indicada a la vez; deja otras
    preguntas intactas.
  - Implementación (verde): `clearAnswer(state, questionId)`.
  - Commit: `feat(desarrollo-progress): add clearAnswer() to remove a single question's answer and draft (refs #59)`

- [x] **T3 — E2E rojo: botón de borrar en preguntas de test**
  - Test (rojo): `tests/e2e/practica-erase.spec.ts` — un clic no borra
    (requiere confirmación); dos clics desmarcan la opción y persiste tras
    recargar; el botón no existe/no funciona tras corregir en bloque.
    Falla porque el botón no existe todavía.
  - Commit: `test(test-question): add e2e coverage for the per-question erase button (refs #59)`

- [x] **T4 — Implementar el botón de borrar en `TestQuestion.astro`**
  - Implementación (verde): botón `.tq-erase` + confirmación de 4s +
    borrado (DOM + `clearAnswer()`), oculto tras `.graded`.
  - Commit: `feat(test-question): add a per-question erase button with confirmation (refs #59)`

- [x] **T5 — E2E rojo: botón de borrar en preguntas de desarrollo**
  - Test (rojo): `tests/e2e/desarrollo-erase.spec.ts` — dos clics vacían
    el textarea y quitan la autoevaluación, y ambos cambios persisten tras
    recargar. Falla porque el botón no existe todavía.
  - Commit: `test(desarrollo-question): add e2e coverage for the per-question erase button (refs #59)`

- [x] **T6 — Implementar el botón de borrar en `DesarrolloQuestion.astro`**
  - Implementación (verde): botón `.dq-erase` + confirmación de 4s +
    borrado (textarea + autoevaluación + `clearAnswer()`).
  - Commit: `feat(desarrollo-question): add a per-question erase button with confirmation (refs #59)`

## Verificación final (Gate B)

- [x] `astro check` sin errores
- [x] `npm test` en verde
- [x] `npm run build` + `npm run test:e2e` en verde
- [x] Cada criterio de aceptación de `spec.md` comprobado
