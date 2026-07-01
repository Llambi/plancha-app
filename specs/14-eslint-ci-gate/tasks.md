# Tasks — Añadir gate de ESLint en CI

- **Issue**: #14
- **Plan**: ./plan.md

> No hay lógica de dominio nueva, así que el ciclo TDD clásico (test rojo →
> verde) no aplica: la "verificación roja" es ejecutar el comando actual y
> comprobar que no reproduce el gate de CI; la "verde" es tras el cambio.

## Tareas

- [ ] **T1 — Alinear `test:all` con el gate de CI**
  - Verificación (roja): `npm run test:all` actual no ejecuta `eslint .` ni
    `prettier --check .`, así que puede dar verde localmente y aun así fallar
    en CI por lint/formato.
  - Implementación (verde): en `package.json`, cambiar el script `test:all` a
    `"npm run lint && npm run format:check && npm run check && npm test &&
npm run build && npm run test:e2e"` (mismo orden que
    `.github/workflows/ci.yml`).
  - Refactor: no aplica.
  - Commit: `ci(scripts): run lint and format:check as part of test:all (refs #14)`

- [ ] **T2 — Documentar el gate en CLAUDE.md**
  - Verificación (roja): la línea de `CLAUDE.md` sobre `test:all` dice
    `# check + unit + build + e2e`, que ya no describe el comando real.
  - Implementación (verde): actualizar el comentario a
    `# lint + format + check + unit + build + e2e`.
  - Refactor: no aplica.
  - Commit: `docs(claude): document lint/format in test:all (refs #14)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] `npm run lint` y `npm run format:check` en verde (ya lo están en el
      estado actual del repo)
- [ ] `npm run test:all` completo en verde, con los pasos en el mismo orden
      que `.github/workflows/ci.yml`
- [ ] Cada criterio de aceptación de `spec.md` comprobado
