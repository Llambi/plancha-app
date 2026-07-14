# Tasks — Contraste de color insuficiente en la guía SOA y el validador de MongoDB

- **Issue**: #78
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #78)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — Unit rojo: las 4 parejas de color deben cumplir 4.5:1**
  - Test (rojo): `tests/unit/color-contrast-fixes.test.ts` — usa
    `contrastRatio()` sobre los valores finales previstos
    (`.soa-chip-badge` efectivo, `--mcg-gold-text`, `--green-2`, `--amber`)
    contra su fondo real; falla porque las variables aún no existen/no
    tienen esos valores.
  - Commit: `test(color-contrast): add coverage for the soa/mongo contrast fixes (refs #78)`

- [ ] **T2 — E2E rojo: retirar la excepción `color-contrast`**
  - Quita la excepción `color-contrast` de `/guia/soa` y
    `/practica/mongodb` en `tests/e2e/a11y.spec.ts`; falla porque axe-core
    sigue detectando la violación real.
  - Commit: `test(a11y): remove the color-contrast exception ahead of the fix (refs #78)`

- [ ] **T3 — Aplicar los colores en `SoaGuide.astro`**
  - Implementación (verde para el `.soa-guide` de T1/T2): `.soa-chip-badge`
    opacidad `0.9`; nueva variable `--mcg-gold-text` (claro `#8a5c07`,
    oscuro `#c8860a`); `.key-box .box-label` y `.ejercicio .ej-label` pasan
    a usarla.
  - Verificación visual: `preview_*` en `/guia/soa`, claro y oscuro.
  - Commit: `fix(soa-guide): darken text colors to meet contrast on gold/red backgrounds (refs #78)`

- [ ] **T4 — Aplicar los colores en `MongoPractica.astro`**
  - Implementación (verde): `--green-2`/`--amber` en modo claro pasan a
    `#006b4d`/`#9c4708`.
  - Verificación visual: `preview_*` en `/practica/mongodb`, claro y oscuro.
  - Commit: `fix(mongo-practica): darken eyebrow/pct colors to meet contrast in light mode (refs #78)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
