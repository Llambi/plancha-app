# Tasks — «Ver respuesta» se oculta a los 5s sin forma de detener o ampliar el tiempo

- **Issue**: #42
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #42)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — Tests E2E que exigen pausar el ocultado (rojo)**
  - Test (rojo): añadir a `tests/e2e/practica.spec.ts` dos tests — ratón
    sobre `.tq-exp` mantiene visible pasados 5s (y se oculta 5s después de
    salir); foco de teclado en el botón mantiene visible pasados 5s. Deben
    fallar contra el código actual (se oculta a los 5s sin importar
    hover/foco).
  - Commit: `test(practica): require hover/focus to pause the reveal auto-hide timer (refs #42)`

- [ ] **T2 — Pausar/reprogramar el temporizador según hover/foco**
  - Implementación (verde): en `TestQuestion.astro`, extraer
    `scheduleHide(q)`/`cancelHide(q)` de la lógica actual y añadir los 4
    listeners delegados (`mouseover`/`mouseout`/`focusin`/`focusout`) sobre
    `.tq-exp`/`[data-reveal-trigger]`.
  - Commit: `fix(test-question): pause the reveal auto-hide while hovering or focusing the answer (refs #42)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde (incluye los 2 tests
      nuevos y el test existente de #5, sin regresión)
- [ ] Cada criterio de aceptación de `spec.md` comprobado
