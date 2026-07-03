# Tasks — Móvil: la topbar crece y se aprieta cuando el docTitle es largo

- **Issue**: #31
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #31)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — Truncar `.site-doc-title` en vez de envolver**
  - Test (rojo): nuevo `tests/e2e/topbar-doctitle.spec.ts` —
    - a 375px, la altura de `.site-topbar` en `/practica/mongodb` (docTitle
      más largo) coincide con la altura en `/` (sin docTitle);
    - a 375px, el buscador (icono), «Inicio» y el toggle de tema siguen
      visibles y clicables;
    - en viewport de escritorio, la altura de la topbar no cambia.
  - Implementación (verde): en `src/layouts/BaseLayout.astro`, añadir a
    `.site-doc-title` `min-width: 0; white-space: nowrap; overflow: hidden;
text-overflow: ellipsis;`.
  - Refactor: si aplica.
  - Commit: `fix(layout): truncate the topbar docTitle instead of wrapping (refs #31)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
