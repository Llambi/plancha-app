# Tasks — Modo examen: compartir/reproducir un simulacro vía URL

- **Issue**: #54
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #54)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — Núcleo puro: serializar/parsear el simulacro compartido**
  - Test (rojo): en `tests/unit/exam-mode.test.ts`, casos para
    `serializeSharedExam()`/`parseSharedExam()` — round-trip completo; sin
    `exam` -> `null`; semilla no numérica -> `null`; `shuffle`/`timed`
    ausentes -> `false`; `subsetSize` ausente -> `null`.
  - Implementación (verde): `SharedExamState`, `serializeSharedExam`,
    `parseSharedExam` en `src/lib/exam-mode.ts`.
  - Refactor: si aplica.
  - Commit: `feat(exam): add pure (de)serialization for a shareable simulacro URL (refs #54)`

- [ ] **T2 — E2E rojo: reproducir un simulacro desde su URL**
  - Test (rojo): en `tests/e2e/exam-mode.spec.ts` — iniciar un simulacro con
    barajado + subconjunto de 5, capturar la URL resultante, abrirla en un
    contexto de navegador nuevo y comprobar que reproduce el mismo orden de
    preguntas visibles y la misma configuración; salir del examen limpia los
    parámetros de la URL. Debe fallar porque la URL no lleva parámetros
    todavía.
  - Implementación: ninguna en esta tarea (solo el test).
  - Refactor: —
  - Commit: `test(exam): add e2e coverage for reproducing a shared simulacro (refs #54)`

- [ ] **T3 — Implementar la URL compartible en `/practica/<asignatura>`**
  - Test (rojo): el de T2 (sigue en rojo hasta esta tarea).
  - Implementación (verde): `startExam(seed = Date.now())` escribe los
    parámetros en la URL (`history.replaceState`) tras arrancar;
    `exitExam()` los limpia; botón `data-exam-share` (copia
    `location.href`); al cargar, si `parseSharedExam` detecta una URL de
    simulacro, aplica su configuración a los controles, abre
    `data-exam-panel` y llama a `startExam(shared.seed)`.
  - Refactor: si aplica.
  - Commit: `feat(exam): reproduce and share a simulacro via URL (refs #54)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
