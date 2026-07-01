# Spec — Añadir gate de ESLint en CI

- **Issue**: #14 · https://github.com/Llambi/plancha-app/issues/14
- **Estado**: borrador
- **Autor**: Claude Code (workflow SDD)
- **Fecha**: 2026-07-01

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

La issue parte de que `.github/workflows/ci.yml` no ejecuta ESLint como gate.
Al revisar el estado actual del repo, esto **ya no es así**: el workflow de CI
(commit `b444574`, 2026-06-28, anterior a la apertura de la issue) ya incluye
los pasos `Lint (ESLint)` (`npm run lint`) y `Format check (Prettier)`
(`npm run format:check`) antes de tests/build/e2e, y ambos pasan en el estado
actual del repo (`npm run lint` y `npm run format:check` devuelven código 0).

Lo que sigue sin resolver es el segundo criterio de la issue: **`npm run
test:all` no incluye lint/format**, así que el comando local que se documenta
en `CLAUDE.md` como "verificación completa antes de entregar" no es
equivalente al gate real de CI — alguien podría ver `test:all` en verde
localmente y aun así fallar en CI por lint/formato.

## Resultado esperado

- CI sigue fallando si el código no pasa ESLint/Prettier (ya ocurre; se
  documenta explícitamente como ya resuelto).
- `npm run test:all` incluye lint (y format:check) como paso, de modo que
  reproduce localmente el mismo gate que corre en CI, en el mismo orden.
- El repo pasa el lint/format en su estado actual (confirmado).

## Criterios de aceptación

1. **Dado** el workflow `.github/workflows/ci.yml`, **cuando** se abre una PR
   contra `main`, **entonces** el job falla si `npm run lint` o
   `npm run format:check` fallan (ya cumplido; se deja constancia en la spec).
2. **Dado** `npm run test:all`, **cuando** se ejecuta localmente, **entonces**
   incluye `npm run lint` y `npm run format:check` en el mismo orden que CI
   (antes de `check`/tests/build/e2e), de modo que un `test:all` verde implica
   que CI tampoco fallará por lint/formato.
3. **Dado** el estado actual del repo, **cuando** se ejecuta `npm run lint` y
   `npm run format:check`, **entonces** ambos terminan con código de salida 0
   (ya verificado: 0 errores, 1 warning en `MongoPractica.astro` que no rompe
   el build; se documenta, no se corrige por ser ruido fuera de alcance).
4. **Dado** `CLAUDE.md` (sección "Running locally"), **cuando** se documenta
   `test:all`, **entonces** la descripción refleja los pasos reales
   (incluyendo lint/format).

## Alcance

- Incluye: actualizar el script `test:all` en `package.json` para anteponer
  `lint` y `format:check`; actualizar la línea correspondiente de `CLAUDE.md`;
  documentar en esta spec que el gate de CI ya existía antes de la issue.
- **No-objetivos**: reescribir reglas de ESLint, cambiar el workflow de CI
  (ya cumple el objetivo), corregir el warning existente de
  `MongoPractica.astro` (no es un error y tocarlo excede el alcance de la
  issue), renombrado masivo de identificadores.

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No.
- Cambios solo en `package.json` (script `test:all`) y `CLAUDE.md`
  (documentación). Sin impacto en rutas, `BASE` ni contenido verbatim.

## Dudas abiertas

Ninguna bloqueante. Hallazgo relevante para el usuario: el gate de CI (parte
principal de la issue) ya estaba resuelto antes de abrirla; el trabajo real
de #14 se reduce a alinear `test:all` con CI y documentarlo.
