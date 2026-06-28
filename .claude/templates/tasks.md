# Tasks — <título de la issue>

- **Issue**: #<id>
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #<id>)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — <nombre>**
  - Test (rojo): <fichero de test y qué afirma>
  - Implementación (verde): <qué se escribe>
  - Refactor: <si aplica>
  - Commit: `<tipo>(<scope>): <descripción> (refs #<id>)`

- [ ] **T2 — <nombre>**
  - …

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
