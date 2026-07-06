# Tasks — Práctica: paneles «Modo examen» y «Estadísticas» colapsables

- **Issue**: #32
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #32)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — Paneles colapsables (`<details>`), colapsados por defecto**
  - Test (rojo): nuevo `tests/e2e/practica-collapsible.spec.ts` —
    - los paneles de estadísticas, modo examen y autoevaluación son `<details>`
      **sin `open`** al cargar `/practica/<asig>`;
    - click (o Enter con foco) en el `<summary>` **expande** el cuerpo (sus
      controles pasan a ser visibles);
    - la 1ª pregunta `[data-tq]` está **más arriba** con los paneles colapsados
      que cuando se expanden (menos scroll inicial).
  - Implementación (verde): en `src/pages/practica/[asignatura].astro`, envolver
    `[data-stats]`, `[data-exam-panel]` y `[data-dev-stats]` en
    `<details class="panel">` con `<summary>` (título del panel) + cuerpo con el
    contenido actual; CSS del disclosure para que parezcan los paneles de hoy.
  - Regresión: abrir el `<details>` correspondiente en los e2e existentes que
    interactúan con controles ahora colapsados (exam-mode, stats, subset/timed,
    «solo mis fallos», reiniciar) para que la suite siga verde.
  - Commit: `feat(practica): make the stats and exam panels collapsible, collapsed by default (refs #32)`

- [x] **T2 — Resumen compacto de una línea en cada `<summary>`**
  - Test (rojo):
    - Unit (Vitest) para los formatters puros nuevos:
      - `formatExamConfigSummary` en `src/lib/exam-mode.ts` (barajado / subconjunto
        / cronometrado → cadena; nula/por defecto → neutro);
      - formatter de chip de estadísticas en `src/lib/practica-stats.ts`
        (con aciertos → «Acumulado: N%»; sin respuestas → neutro);
      - formatter de chip de autoevaluación en `src/lib/desarrollo-progress.ts`.
    - E2E (en `practica-collapsible.spec.ts`): tras corregir, el chip de
      estadísticas muestra el acumulado; con config de examen guardada, el chip de
      examen muestra su resumen.
  - Implementación (verde): añadir los formatters puros a las libs; en la página,
    renderers del chip suscritos a `practica:stats-updated`,
    `desarrollo:stats-updated` y a los cambios de config de examen, que escriben el
    `<summary>`. **Sin** modificar `renderStats`/`renderDevStats`.
  - Commit: `feat(practica): show a one-line summary in each collapsed panel (refs #32)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde (incluye los formatters nuevos)
- [ ] `npm run build` + `npm run test:e2e` en verde (incluye el nuevo spec y los ajustados)
- [ ] Cada criterio de aceptación de `spec.md` comprobado
