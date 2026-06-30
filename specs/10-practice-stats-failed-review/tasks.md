# Tasks — Estadísticas de práctica y modo «solo repasar mis fallos»

- **Issue**: #10
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #10)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — Núcleo de agregación de estadísticas (puro)**
  - Test (rojo): `tests/unit/practica-stats.test.ts` — `statsKeyFor` namespacing;
    `serializeStats`/`parseStats` ida y vuelta + parse defensivo; `recordGrading`
    (cuenta `attempts`/`wrong`, fija `lastWrong`, y `lastWrong=false` al acertar
    tras fallar); `summarize` (respondidas, % acierto del último intento y % acierto
    acumulado, orden de más falladas); `failedIds` (solo `lastWrong`); `pruneStats`
    (descarta ids obsoletos).
  - Implementación (verde): `src/lib/practica-stats.ts` con `QuestionStat`,
    `StatsState` y esas funciones.
  - Commit: `feat(practica): add stats aggregation core (refs #10)`

- [x] **T2 — Registrar al corregir y mostrar el panel de resumen**
  - Test (rojo): `tests/e2e/practica-stats.spec.ts` — responder y corregir en
    `/practica/si`; el panel muestra «respondidas» y los dos porcentajes de acierto
    (último intento y acumulado).
  - Implementación (verde): en `TestQuestion.astro`, `gradeAll()` devuelve
    `results` y el handler de corregir registra estadísticas (solo respondidas) y
    emite `practica:stats-updated`; en `practica/[asignatura].astro`, panel shell +
    script que resume en carga y al recibir el evento. La restauración no registra.
  - Commit: `feat(practica): record and show practice stats (refs #10)`

- [x] **T3 — Filtro «solo mis fallos»**
  - Test (rojo): ampliar el e2e — fallar una pregunta, corregir, activar «solo mis
    fallos» y comprobar que solo quedan visibles las falladas.
  - Implementación (verde): toggle `[data-failed-toggle]` en
    `practica/[asignatura].astro` que oculta las preguntas cuyo id no está en
    `failedIds`; al desactivarlo, se muestran todas.
  - Commit: `feat(practica): add "review failed" filter (refs #10)`

- [x] **T4 — Reinicio de estadísticas**
  - Test (rojo): ampliar el e2e — con estadísticas, pulsar «Reiniciar
    estadísticas» y comprobar que el panel queda vacío.
  - Implementación (verde): botón `[data-stats-reset]` que borra
    `statsKeyFor(asignatura)` y re-renderiza el panel; no afecta al progreso (#8).
  - Commit: `feat(practica): add reset-stats control (refs #10)`

## Verificación final (Gate B)

- [x] `astro check` sin errores
- [x] `npm test` en verde
- [x] `npm run build` + `npm run test:e2e` en verde
- [x] Cada criterio de aceptación de `spec.md` comprobado (1–7)
