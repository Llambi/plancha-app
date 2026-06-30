# Tasks — Persistencia de progreso de práctica (localStorage)

- **Issue**: #8
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #8)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — Núcleo de persistencia (puro)**
  - Test (rojo): `tests/unit/practica-progress.test.ts` — `keyFor` namespacing;
    `serialize`/`parse` ida y vuelta; `parse` devuelve `null` ante JSON inválido /
    no-objeto / forma incompleta; `pruneAnswers` descarta ids ausentes y conserva
    los vigentes.
  - Implementación (verde): `src/lib/practica-progress.ts` con `ProgressState`,
    `keyFor`, `serialize`, `parse`, `pruneAnswers`.
  - Refactor: comentario de cabecera al estilo de `search.ts`.
  - Commit: `feat(practica): add localStorage progress core (refs #8)`

- [x] **T2 — Restaurar y autosave en la práctica de test**
  - Test (rojo): `tests/e2e/practica-progress.spec.ts` — (a) marcar opciones en
    `/practica/si`, recargar y comprobar que las selecciones se restauran;
    (b) corregir, recargar y comprobar resaltado corregido + «Aciertos: X / N».
  - Implementación (verde): en `TestQuestion.astro` cablear restore-on-load,
    autosave al `change` y guardar al corregir (reusando `gradeAll()` y reemitiendo
    `tq:graded` al restaurar el estado corregido); en
    `practica/[asignatura].astro` añadir `data-practica={code}` a la sección de
    test. Acceso a `localStorage` en `try/catch`.
  - Commit: `feat(practica): persist and restore test progress (refs #8)`

- [x] **T3 — Control de reinicio de progreso**
  - Test (rojo): ampliar `tests/e2e/practica-progress.spec.ts` — corregir, pulsar
    «Reiniciar progreso», recargar y comprobar que no hay marcas ni puntuación.
  - Implementación (verde): botón `[data-reset-trigger]` en `.test-foot` de
    `practica/[asignatura].astro`; handler en `TestQuestion.astro` que hace
    `removeItem(keyFor(asig))` + `location.reload()`.
  - Commit: `feat(practica): add reset-progress control (refs #8)`

## Verificación final (Gate B)

- [x] `astro check` sin errores
- [x] `npm test` en verde
- [x] `npm run build` + `npm run test:e2e` en verde
- [x] Cada criterio de aceptación de `spec.md` comprobado (1–7)
