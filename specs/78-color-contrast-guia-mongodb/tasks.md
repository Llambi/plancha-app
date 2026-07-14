# Tasks — Contraste de color insuficiente en la guía SOA y el validador de MongoDB

- **Issue**: #78
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #78)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

> Nota (durante implementación): se descartó el test unitario con
> `contrastRatio()` sobre valores hex duplicados, previsto inicialmente en
> `plan.md` — al no importar un valor real de fuente única (los colores viven
> inline en el `<style>` de cada `.astro`), habría sido un duplicado
> hardcodeado que nunca falla en rojo de verdad ni detecta drift. El test
> E2E de axe-core sobre el DOM renderizado (T1) es la verificación real y
> honesta: falla contra el código actual, pasa tras el fix.

- [x] **T1 — E2E rojo: retirar la excepción `color-contrast`**
  - Quita la excepción `color-contrast` de `/guia/soa` y
    `/practica/mongodb` en `tests/e2e/a11y.spec.ts`; falla porque axe-core
    sigue detectando la violación real.
  - Commit: `test(a11y): remove the color-contrast exception ahead of the fix (refs #78)`

- [x] **T2 — Aplicar los colores en `SoaGuide.astro`**
  - Implementación (verde para `/guia/soa` de T1): `.soa-chip-badge`
    opacidad `0.9` → ajustada a `0.97` al descubrir en la verificación una
    segunda instancia del badge (el contador "Qs" del quiz, texto muted
    sobre blanco) que a 0.9 seguía en 4.2:1; nueva variable
    `--mcg-gold-text` (claro `#8a5c07`, oscuro `#c8860a`); `.key-box
.box-label` y `.ejercicio .ej-label` pasan a usarla.
  - Verificación: axe-core (`a11y.spec.ts`) en verde para `/guia/soa`;
    `getComputedStyle` confirmó el color exacto renderizado. La
    verificación visual con `preview_*` no pudo completarse — el tool de
    scroll se quedó colgado en esta sesión (limitación ya vista antes).
  - Commit: `fix(soa-guide): darken text colors to meet contrast on gold/red backgrounds (refs #78)`

- [x] **T3 — Aplicar los colores en `MongoPractica.astro`**
  - Implementación (verde para `/practica/mongodb` de T1): `--green-2`/
    `--amber` en modo claro pasan a `#006b4d`/`#9c4708`.
  - Verificación: axe-core en verde + `mongo-practica.spec.ts` sin
    regresiones.
  - Commit: `fix(mongo-practica): darken eyebrow/pct colors to meet contrast in light mode (refs #78)`

## Verificación final (Gate B)

- [x] `astro check` sin errores
- [x] `npm test` en verde
- [x] `npm run build` + `npm run test:e2e` en verde
- [x] Cada criterio de aceptación de `spec.md` comprobado
