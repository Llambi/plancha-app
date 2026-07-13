# Tasks — Modo repaso transversal: «solo mis fallos» combinando todas las asignaturas

- **Issue**: #51
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #51)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — Núcleo puro: cruce de fallos con el índice de búsqueda**
  - Test (rojo): `tests/unit/repaso.test.ts` para `buildRepasoGroups()` —
    asignatura con fallos y registros coincidentes → grupo con esos items;
    fallos sin registro correspondiente → no aparece; `failedIds` vacío → no
    aparece; varias asignaturas con fallos → grupos separados con metadatos
    (`asignaturaNombre`/`sigla`/`accent`) del primer item de cada grupo.
  - Implementación (verde): `src/lib/repaso.ts` con `buildRepasoGroups(records,
failedByAsignatura)`.
  - Refactor: si aplica.
  - Commit: `feat(repaso): add pure matcher for failed questions across subjects (refs #51)`

- [x] **T2 — E2E rojo: página `/repaso`**
  - Test (rojo): `tests/e2e/repaso.spec.ts` — (a) sin stats guardadas, estado
    vacío; (b) tras fallar una pregunta en `/practica/si`, `/repaso` la lista
    bajo "Sistemas Inteligentes" con enlace a `/practica/si#q-<id>`; (c) la home
    tiene un enlace a `/repaso`. Debe fallar porque la página/enlace no existen
    todavía.
  - Implementación: ninguna en esta tarea (solo el test).
  - Refactor: —
  - Commit: `test(repaso): add e2e coverage for the cross-subject review page (refs #51)`

- [x] **T3 — Implementar la página `/repaso` y su enlace desde la home**
  - Test (rojo): el de T2 (sigue en rojo hasta esta tarea).
  - Implementación (verde): `src/pages/repaso.astro` (shell + script que
    escanea `localStorage` con el prefijo de `statsKeyFor('')`, calcula
    `failedIds()` por asignatura, hace fetch de `search-index.json`, llama a
    `buildRepasoGroups()` y renderiza los grupos o el estado vacío); enlace
    nuevo en `src/pages/index.astro` hacia `/repaso`.
  - Refactor: si el renderizado de grupos duplica demasiado el de
    `buscar.astro`, extraer solo lo estrictamente compartido (sin forzar una
    abstracción si no aporta claridad).
  - Commit: `feat(repaso): add the cross-subject failed-questions review page (refs #51)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
