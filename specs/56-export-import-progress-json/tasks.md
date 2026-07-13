# Tasks — Exportar/importar el progreso de práctica (JSON)

- **Issue**: #56
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #56)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — Núcleo puro: construir/(de)serializar el export**
  - Test (rojo): `tests/unit/export-progress.test.ts` — `buildProgressExport`
    filtra solo `plancha:*`; round-trip de
    `serializeProgressExport`/`parseProgressExport`; JSON inválido -> `null`;
    forma incompleta -> `null`; valor no-string en `data` -> `null`.
  - Implementación (verde): `src/lib/export-progress.ts` con
    `ProgressExport`, `isExportableKey`, `buildProgressExport`,
    `serializeProgressExport`, `parseProgressExport`.
  - Refactor: si aplica.
  - Commit: `feat(export): add pure (de)serialization for a progress backup file (refs #56)`

- [ ] **T2 — E2E rojo: exportar e importar progreso desde la home**
  - Test (rojo): `tests/e2e/backup-progress.spec.ts` — sembrar
    `plancha:stats:si` (y otra clave `plancha:*`), exportar y comprobar el
    contenido del fichero descargado; vaciar `localStorage`, importar ese
    fichero y comprobar que las claves se restauran con el mismo valor;
    importar un fichero no válido y comprobar que se informa del error sin
    romper la página. Debe fallar porque los controles no existen todavía.
  - Implementación: ninguna en esta tarea (solo el test).
  - Refactor: —
  - Commit: `test(export): add e2e coverage for exporting and importing progress (refs #56)`

- [ ] **T3 — Implementar exportar/importar en la home**
  - Test (rojo): el de T2 (sigue en rojo hasta esta tarea).
  - Implementación (verde): sección nueva en `src/pages/index.astro` con
    botón "Exportar mi progreso" (descarga vía `Blob` + `<a download>`) e
    input de archivo "Importar" (`FileReader` -> `parseProgressExport` ->
    `safeSet` por clave); `safeGet`/`safeSet` locales (mismo patrón que el
    resto del sitio); mensaje de estado para éxito/error.
  - Refactor: si aplica.
  - Commit: `feat(export): add progress export/import to the home page (refs #56)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
