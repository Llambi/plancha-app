# Tasks — El contenido de la topbar no está contenido en ningún landmark (axe: region)

- **Issue**: #77
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #77)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — E2E rojo: la topbar debe ser un landmark `banner`**
  - Test (rojo): `tests/e2e/topbar-doctitle.spec.ts` (o fichero nuevo) — un
    test que localiza `page.getByRole('banner')` y comprueba que contiene
    `.site-brand`, `.site-home` y el toggle de tema. Falla porque
    `.site-topbar` es un `<div>` sin rol.
  - Commit: `test(layout): add e2e coverage for the topbar banner landmark (refs #77)`

- [ ] **T2 — `<div class="site-topbar">` → `<header class="site-topbar">`**
  - Implementación (verde): cambia la etiqueta de apertura/cierre en
    `BaseLayout.astro`; sin tocar el CSS.
  - Verificación visual: tools `preview_*` en `/` y otra página, comparando
    contra el estado actual.
  - Commit: `fix(layout): wrap the topbar in a header landmark (refs #77)`

- [ ] **T3 — Retirar la excepción `region` de `a11y.spec.ts`**
  - Quita `topbarLandmark` de las 6 entradas de `knownExceptions` y su
    definición; `npm run test:e2e` confirma que las 6 páginas siguen sin
    violaciones inesperadas (ya no por excepción, sino porque el problema
    real está resuelto).
  - Commit: `test(a11y): remove the topbar region exception now that it's fixed (refs #77)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
