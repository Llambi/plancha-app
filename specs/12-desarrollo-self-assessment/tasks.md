# Tasks — Autoevaluación en preguntas de desarrollo

- **Issue**: #12
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #12)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — `desarrollo-progress.ts`: núcleo puro de persistencia**
  - Test (rojo): `tests/unit/desarrollo-progress.test.ts` — `keyFor`
    namespacea por asignatura; `serialize`/`parse` hacen round-trip y son
    defensivos (`null` ante JSON inválido/no-objeto/forma incompleta);
    `pruneAnswers` descarta ids inexistentes; `summarize` cuenta
    sabía/medias/no correctamente.
  - Implementación (verde): `src/lib/desarrollo-progress.ts` con
    `SelfAssessment`, `DesarrolloProgressState`, `keyFor`, `serialize`,
    `parse`, `pruneAnswers`, `summarize`.
  - Commit: `feat(practica): add desarrollo-progress core for self-assessment (refs #12)`

- [x] **T2 — Botones de autoevaluación: seleccionar, persistir, restaurar**
  - Test (rojo): `tests/e2e/desarrollo-self-assessment.spec.ts` — en
    `/practica/si` aparecen 3 botones por pregunta de desarrollo, ninguno
    activo; pulsar «Lo sabía» lo marca (`aria-pressed="true"`) y dejar los
    otros dos en `false`; tras `page.reload()`, sigue marcado.
  - Implementación (verde): grupo de 3 botones en
    `src/components/DesarrolloQuestion.astro` + `data-desarrollo={code}` en
    la sección de desarrollo de `[asignatura].astro`; script de selección/
    persistencia/restauración usando `desarrollo-progress.ts`.
  - Commit: `feat(practica): add self-assessment buttons to desarrollo questions (refs #12)`

- [ ] **T3 — Resumen de conteos (sabía/a medias/no sabía)**
  - Test (rojo): tras autoevaluar dos preguntas distintas (una «Lo sabía»,
    otra «No lo sabía»), el resumen de la sección de desarrollo muestra
    "Sabías: 1 · A medias: 0 · No sabías: 1" (2 autoevaluadas).
  - Implementación (verde): panel `data-dev-stats-summary` en
    `[asignatura].astro`; `renderDevStats()` que lee `desarrollo-progress.ts`
    y se repinta con el evento `desarrollo:stats-updated`.
  - Commit: `feat(practica): show a self-assessment summary for desarrollo questions (refs #12)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
