# Tasks — Las respuestas escritas en preguntas de desarrollo no se guardan (se pierden al recargar)

- **Issue**: #28
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #28)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — Persistir borradores en `desarrollo-progress.ts`**
  - Test (rojo): `tests/unit/desarrollo-progress.test.ts` — nuevos casos:
    round-trip de `drafts` vía `serialize`/`parse`; `parse()` de un estado sin
    `drafts` devuelve `{ answers, drafts: {} }` (no `null`); poda de `drafts`
    por ids válidos (paralelo a los casos existentes de `pruneAnswers`).
  - Implementación (verde): añadir `drafts: Record<string, string>` a
    `DesarrolloProgressState`; `parse()` defaultea `drafts` ausente a `{}`;
    exportar función de poda para `drafts` (reutilizando/generalizando la
    lógica de `pruneAnswers`).
  - Refactor: extraer un helper interno compartido para podar un
    `Record<string, T>` por ids válidos, usado por `pruneAnswers` y la nueva
    función de poda de `drafts`, para no duplicar la lógica.
  - Commit: `feat(desarrollo): add drafts field to progress state (refs #28)`

- [x] **T2 — Guardar y restaurar el borrador en el textarea**
  - Test (rojo): `tests/e2e/desarrollo-draft-answer.spec.ts` — escribir texto
    en el primer `.dq-text` de `/practica/si`, recargar, comprobar que el
    texto persiste; borrar el texto y recargar, comprobar que sigue vacío;
    escribir en dos preguntas distintas y comprobar que cada una restaura solo
    su propio borrador.
  - Implementación (verde): en el `<script>` de `DesarrolloQuestion.astro`,
    añadir un manejador `input` sobre `.dq-text` con debounce (~400ms) que
    guarda el valor vía `keyFor`/`serialize`/`safeSet`; añadir
    `restoreDrafts()` (análoga a `restoreSelfAssessment()`) invocada al cargar,
    que rellena `textarea.value` desde el estado persistido y usa
    `questionIds()` para podar borradores obsoletos antes de guardarlos de
    nuevo.
  - Refactor: si `restoreSelfAssessment()`/`restoreDrafts()` comparten mucho
    boilerplate de lectura de estado, valorar extraer un pequeño helper común
    (solo si no complica la legibilidad).
  - Commit: `feat(desarrollo): save and restore draft answers in the textarea (refs #28)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
