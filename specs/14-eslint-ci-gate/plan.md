# Plan técnico — Añadir gate de ESLint en CI

- **Issue**: #14
- **Spec**: ./spec.md
- **Rama**: 14-eslint-ci-gate

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

El gate de CI (criterio 1 de la spec) ya existe en `.github/workflows/ci.yml`
desde antes de abrir la issue — no se toca ese fichero. El trabajo real es
alinear el comando local `npm run test:all` con el orden de pasos de CI
(lint → format:check → check → test → build → test:e2e), para que un
`test:all` en verde garantice que CI tampoco fallará por lint/formato.
Cambio de configuración puro (un script en `package.json`), sin lógica nueva
que testear con Vitest/Playwright.

## Ficheros y áreas afectadas

- `package.json` — el script `test:all` pasa de
  `"astro check && vitest run && astro build && playwright test"` a anteponer
  `eslint . && prettier --check .`, en el mismo orden que `ci.yml`.
- `CLAUDE.md` (sección "Running locally") — actualizar el comentario de
  `test:all` para reflejar los pasos reales.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

No aplica — no hay lógica de dominio que reutilizar; es un script npm
existente al que se le añaden dos pasos ya definidos (`lint`, `format:check`).

## Estrategia de test (TDD)

No hay lógica nueva que cubrir con Vitest/Playwright (no hay `src/lib` ni
componentes involucrados). La verificación es directa:

- Ejecutar `npm run test:all` de punta a punta y comprobar que termina en
  verde, incluyendo los nuevos pasos de lint/format al principio.
- Confirmar que el orden de pasos coincide con `.github/workflows/ci.yml`
  (para que un fallo local de lint se vea _antes_ que fallos más costosos de
  build/e2e, igual que en CI).
- **Contenido**: no aplica (no se toca `src/content/`).

## Riesgos / decisiones

- **Riesgo**: alargar `test:all` con dos pasos más. Mitigación: ambos son
  rápidos (ESLint/Prettier sobre el repo actual tardan segundos) y ya corren
  en CI, así que el coste marginal es bajo frente al beneficio de detectar el
  fallo localmente antes del push.
- **Decisión**: no se añade `lint`/`format:check` como pasos _nuevos_ de CI
  (ya existen); solo se documentan como ya resueltos y se replican en
  `test:all` para consistencia local/CI.
- **Decisión**: no se corrige el warning existente de `no-unused-vars` en
  `MongoPractica.astro` — es un warning, no rompe `npm run lint` (exit 0), y
  la issue excluye explícitamente reescribir reglas o tocar código no
  relacionado.
