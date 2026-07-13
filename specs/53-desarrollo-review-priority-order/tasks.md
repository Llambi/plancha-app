# Tasks — Repetición espaciada para la autoevaluación de preguntas de desarrollo

- **Issue**: #53
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #53)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — Núcleo puro: orden de repaso priorizado**
  - Test (rojo): en `tests/unit/desarrollo-progress.test.ts`, casos para
    `buildReviewOrder()` — prioridad `no` > `medias` > sin autoevaluar >
    `sabia`; estabilidad dentro de un mismo grupo; `answers` vacío conserva el
    orden de entrada.
  - Implementación (verde): `buildReviewOrder<T>(items, idOf, answers)` en
    `src/lib/desarrollo-progress.ts`.
  - Refactor: si aplica.
  - Commit: `feat(desarrollo): add priority review order for self-assessed questions (refs #53)`

- [ ] **T2 — E2E rojo: toggle de repaso priorizado**
  - Test (rojo): en `tests/e2e/desarrollo-self-assessment.spec.ts` — marcar una
    pregunta tardía "No lo sabía" y otra temprana "Lo sabía", activar
    `data-dev-review-toggle` y comprobar que la marcada "No lo sabía" pasa a
    ser la primera; desactivar y comprobar que se restaura el orden original.
    Debe fallar porque el toggle no existe todavía.
  - Implementación: ninguna en esta tarea (solo el test).
  - Refactor: —
  - Commit: `test(desarrollo): add e2e coverage for the review-order toggle (refs #53)`

- [ ] **T3 — Implementar el toggle en `/practica/<asignatura>`**
  - Test (rojo): el de T2 (sigue en rojo hasta esta tarea).
  - Implementación (verde): checkbox `data-dev-review-toggle` en el panel
    `data-dev-stats` (mismo patrón `.stats-actions`/`.stats-toggle` que «solo
    mis fallos»); captura `originalDevOrder` al cargar; wiring `change` que
    reordena con `buildReviewOrder` + `container.appendChild` cuando se activa,
    y restaura `originalDevOrder` cuando se desactiva; dispara
    `practica:filter-changed` en ambos casos para que el minimap reconstruya
    el rail.
  - Refactor: si aplica.
  - Commit: `feat(desarrollo): wire the priority review toggle into the practica page (refs #53)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
