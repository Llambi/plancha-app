# Tasks — Práctica: permitir combinar el filtro de tema con «solo mis fallos»

- **Issue**: #55
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #55)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — E2E rojo: combinar tema + «solo mis fallos»**
  - Test (rojo): en `tests/e2e/practica-tema-filter.spec.ts`, sustituye el
    test de exclusión mutua tema/fallos por: (a) fallar `q1` (tema T1) en
    `/practica/si`, activar el tema T1 (8 preguntas), activar "solo mis
    fallos" y comprobar que solo queda visible `q1`; desactivar "solo mis
    fallos" y comprobar que vuelven a verse las 8 del tema; (b) el modo
    examen sigue saliendo/reseteando ambos filtros (aserciones ya existentes
    del test antiguo). Debe fallar porque hoy activar uno resetea al otro.
  - Implementación: ninguna en esta tarea (solo el test).
  - Refactor: —
  - Commit: `test(practica): add e2e coverage for combining tema and failed filters (refs #55)`

- [x] **T2 — Combinar los filtros de tema y «solo mis fallos»**
  - Test (rojo): el de T1 (sigue en rojo hasta esta tarea).
  - Implementación (verde): en `src/pages/practica/[asignatura].astro`,
    sustituir `applyFailedFilter()`/`applyTemaFilter()` por una única
    `applyFilters()` que combina ambos criterios con OR sobre "ocultar";
    quitar el reset cruzado en el `change` de `failedToggle` y en el click de
    tema (mantener solo `if (examActive) exitExam()` en ambos); actualizar
    los tres puntos de llamada.
  - Refactor: si aplica.
  - Commit: `feat(practica): combine the tema and failed-questions filters (refs #55)`

## Verificación final (Gate B)

- [x] `astro check` sin errores
- [x] `npm test` en verde
- [x] `npm run build` + `npm run test:e2e` en verde
- [x] Cada criterio de aceptación de `spec.md` comprobado
