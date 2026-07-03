# Tasks — Home: las guías paginadas se etiquetan como «Esquemas» (confusión de tipo de contenido)

- **Issue**: #30
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #30)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — Badge, filtro y tipo propios para las guías**
  - Test (rojo): nuevo `tests/e2e/home-content-types.spec.ts` —
    - la card de la asignatura con guía (SOA) muestra el badge «Guía» (no
      «Esquemas»);
    - el filtro «Esquemas» ya no incluye esa card tras pulsarlo;
    - existe un botón de filtro «Guías» que, al pulsarlo, deja visible
      únicamente la(s) card(s) de guía;
    - el filtro «Práctica» sigue mostrando el mismo conjunto de cards que
      antes (no regresión).
  - Implementación (verde): en `src/pages/index.astro` — ampliar
    `Card['tipo']` a `'practica' | 'teoria' | 'guia'`; cambiar el `tipo` del
    bucle de guías paginadas a `'guia'`; badge `{c.tipo === 'practica' ?
'Práctica' : c.tipo === 'guia' ? 'Guía' : 'Esquemas'}`; añadir el botón de
    filtro «Guías» (`data-filter="guia"`); añadir `.doc-type.guia .tdot` con
    el mismo tratamiento gris que `.doc-type.teoria .tdot`.
  - Refactor: si aplica.
  - Commit: `feat(home): distinguish paginated guides from esquemas (refs #30)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
