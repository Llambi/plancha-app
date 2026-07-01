# Tasks — Modo examen: barajado, subconjunto de N preguntas y simulacro cronometrado

- **Issue**: #9
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #9)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — PRNG con semilla + `shuffle`**
  - Test (rojo): `tests/unit/exam-mode.test.ts` — `createRng(seed)` produce la
    misma secuencia para la misma semilla; `shuffle(items, rng)` es una
    permutación (mismo tamaño y elementos) y es determinista por semilla.
  - Implementación (verde): `src/lib/exam-mode.ts` — `createRng(seed: number): () => number`
    (mulberry32 o similar, sin dependencias) + `shuffle<T>(items: T[], rng): T[]`
    (Fisher–Yates, no muta la entrada).
  - Commit: `feat(practica): add seeded shuffle utility (refs #9)`

- [x] **T2 — `pickSubset` + `buildExamOrder`**
  - Test (rojo): `pickSubset(items, n, rng)` devuelve `n` elementos distintos de
    la entrada, con `n` clamped a `[0, total]`, determinista por semilla;
    `buildExamOrder(items, { shuffle, subsetSize }, rng)` combina ambos y, con
    `shuffle: false`, conserva el orden relativo original del subconjunto.
  - Implementación (verde): añade `pickSubset` y `buildExamOrder` a
    `src/lib/exam-mode.ts`.
  - Commit: `feat(practica): add subset sampling and exam order builder (refs #9)`

- [x] **T3 — Persistencia de la configuración (`ExamConfig`)**
  - Test (rojo): `examConfigKeyFor` namespacea por asignatura;
    `serializeExamConfig`/`parseExamConfig` hacen round-trip y son defensivos
    (`null` ante JSON inválido, no-objeto o forma incompleta) — mismo patrón que
    `tests/unit/practica-progress.test.ts`.
  - Implementación (verde): tipo `ExamConfig` (`shuffle: boolean; subsetSize:
number | null; timed: boolean; minutes: number`) + las tres funciones en
    `src/lib/exam-mode.ts`.
  - Commit: `feat(practica): persist exam-mode config in localStorage (refs #9)`

- [x] **T4 — Panel de modo examen: scaffold + empezar/salir**
  - Test (rojo): `tests/e2e/exam-mode.spec.ts` — en `/practica/si` el panel de
    modo examen es visible (hay preguntas de test); al pulsar «Empezar
    simulacro» sin barajar ni subconjunto y luego «Salir de modo examen», el
    conjunto y orden de `[data-tq]` visibles vuelve a ser el original.
  - Implementación (verde): añade el panel (markup) a
    `src/pages/practica/[asignatura].astro` (solo si `tests.length > 0`) con
    botones «Empezar simulacro»/«Salir de modo examen»; wiring que guarda el
    orden original de los `[data-tq]` al cargar y lo restaura al salir.
  - Commit: `feat(practica): add exam-mode panel with start/exit (refs #9)`

- [ ] **T5 — Integrar barajado real en el simulacro**
  - Test (rojo): activar «Barajar preguntas» + empezar conserva el mismo
    conjunto de ids visibles que antes (invariante, sin asumir un orden
    concreto para no introducir flakiness).
  - Implementación (verde): al empezar, usa `buildExamOrder`/`shuffle` de
    `exam-mode.ts` con una semilla de `Date.now()` y reordena los `<fieldset>`
    reales en su contenedor (`insertBefore`/`appendChild`).
  - Commit: `feat(practica): wire shuffle into the exam-mode start flow (refs #9)`

- [ ] **T6 — Integrar subconjunto de N**
  - Test (rojo): fijar N=3 y empezar deja exactamente 3 `[data-tq]` visibles
    (resto `hidden`); el minimap (rail) no incluye las ocultas (reutiliza
    `practica:filter-changed`, ya consumido por `Minimap.astro`). Activar el
    modo examen desactiva/desmarca el checkbox «solo mis fallos» (exclusión
    mutua) y viceversa.
  - Implementación (verde): input de N en el panel; al empezar, marca `hidden`
    las no seleccionadas y dispara `practica:filter-changed`; wiring de
    exclusión mutua con `[data-failed-toggle]`.
  - Commit: `feat(practica): wire N-question subset into exam mode (refs #9)`

- [ ] **T7 — Modo cronometrado con autocorrección**
  - Test (rojo): con el cronómetro activado y una duración muy corta, al
    agotarse el tiempo el test queda corregido (`.tq.graded`) sin intervención
    del usuario — mismo patrón de espera con timeout que el test de «Ver
    respuesta» en `tests/e2e/practica.spec.ts`.
  - Implementación (verde): temporizador visible (`aria-live`) en el panel;
    `setInterval` en cuenta atrás; al llegar a 0 (o al pulsar «Corregir» antes),
    dispara `[data-grade-trigger]`.click() y detiene el intervalo.
  - Commit: `feat(practica): add timed exam mode with auto-grading (refs #9)`

- [ ] **T8 — Persistir y restaurar la configuración del panel**
  - Test (rojo): tras fijar valores en el panel (barajar/N/cronómetro) y
    recargar la página, los controles reflejan la configuración guardada (sin
    arrancar el simulacro automáticamente).
  - Implementación (verde): al cargar, lee `parseExamConfig` y rellena los
    controles; al cambiar cualquiera, guarda con `serializeExamConfig`.
  - Commit: `feat(practica): persist exam-mode settings across visits (refs #9)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
