# Tasks — Botón por pregunta de test que revela la opción correcta y se oculta a los 5s

- **Issue**: #5
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #<id>)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — E2E rojo: revelar/ocultar por pregunta**
  - Test (rojo): `tests/e2e/practica.spec.ts` (nuevo). Navega a `/practica/si`; pulsa
    «Ver respuesta» en la primera pregunta; afirma que la opción correcta tiene
    `.revealed` y la `.tq-exp` es visible; espera >5 s y afirma que `.revealed`
    desaparece y la `.tq-exp` queda oculta. Falla porque aún no existe el botón.
  - Commit: `test(practica): cover per-question reveal button (refs #5)`

- [x] **T2 — Botón + lógica de revelado con auto-ocultado a 5 s**
  - Implementación (verde): en `TestQuestion.astro` añade el `<button data-reveal-trigger>`
    en `.tq-actions`, los estilos scoped (`.tq-reveal`, `.tq-opt.revealed`,
    `.tq-exp.revealed`) y el handler delegado con `WeakMap` que resalta correcta(s) +
    explicación, programa `setTimeout(5000)` y reinicia el timer en re-clic
    (`clearTimeout`), sincronizando `aria-pressed`. Hace pasar T1 (criterios 1, 2, 3).
  - Commit: `feat(practica): add per-question reveal button auto-hiding after 5s (refs #5)`

- [x] **T3 — Ocultar el botón tras corregir en bloque (criterio 4)**
  - Test (rojo): amplía `practica.spec.ts` — tras pulsar «Corregir test», el
    `[data-reveal-trigger]` no está visible.
  - Implementación (verde): regla CSS `.tq.graded .tq-reveal { display: none; }` y
    guarda en el handler para no actuar sobre preguntas `.graded`.
  - Refactor/opcional: añadir frase al `.block-desc` de `practica/[asignatura].astro`.
  - Commit: `feat(practica): hide per-question reveal once graded in bulk (refs #5)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado (1–4)
- [ ] Verificación visual con `preview_*` (estado revelado verde + explicación; auto-ocultado)
