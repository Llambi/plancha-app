# Tasks — Guía SOA: fuentes de Google Fonts sin preconnect

- **Issue**: #48
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #48)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — Test E2E que exige los `<link rel="preconnect">` (rojo)**
  - Test (rojo): nuevo `tests/e2e/guia-fonts.spec.ts` — comprueba en
    `/guia/soa` que existen `link[rel="preconnect"]` para
    `fonts.googleapis.com` y `fonts.gstatic.com` (este con `crossorigin`).
    Falla contra el código actual (no existen).
  - Commit: `test(guia): require preconnect links for the Google Fonts stylesheet (refs #48)`

- [ ] **T2 — Añadir los preconnect**
  - Implementación (verde): 2 `<link rel="preconnect">` en
    `src/pages/guia/[asignatura].astro`, antes del stylesheet.
  - Commit: `feat(guia): preconnect to Google Fonts before the stylesheet request (refs #48)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
