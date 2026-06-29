---
description: Fase 4 SDD — implementa las tareas mediante TDD con commits atómicos.
argument-hint: [id de issue] (opcional; por defecto la rama actual)
---

# /implement — Implementación TDD

Requiere `tasks.md` aprobado (Gate A superado) y estar en la rama de la issue.

## Ciclo por cada tarea de `tasks.md`

1. **Rojo** — escribe el/los test que fallan:
   - Lógica (loaders, schemas Zod, utils de `src/data`) → test Vitest en `tests/unit/`.
   - Flujo de navegador → test Playwright en `tests/e2e/`.
   - Ejecuta `npm test` (o `npm run test:e2e`) y confirma que **falla** por la razón
     esperada.
2. **Verde** — escribe la implementación **mínima** para pasar el test.
   - Si la tarea es **contenido** (`src/content/`), invoca la skill `add-exam` o
     `add-esquema` según corresponda. Estas garantizan transcripción **verbatim** y
     respetan `.claude/rules/contenido-examenes-y-temarios.md`. Su "test" es que
     `astro check` + `astro build` pasen (Zod valida el contenido).
3. **Refactor** — limpia sin cambiar comportamiento; los tests siguen en verde.
4. **Commit atómico** — un commit por tarea, Conventional Commits con la
   **descripción en inglés**:
   `git commit -m "<type>(<scope>): <english description> (refs #<id>)"`
   Marca la tarea como `[x]` en `tasks.md`.

## Reglas

- **Un commit = una tarea.** No mezcles cambios no relacionados.
- No saltes el test rojo: el test se escribe **antes** que la implementación.
- Nunca modifiques enunciados/respuestas de contenido (constitución).
- Mantén `main` intacta; trabaja solo en la rama de la issue.
- **Convenciones** (`.claude/rules/convenciones-codigo-y-git.md`): código y
  comentarios nuevos **en inglés**, salvo el vocabulario de dominio en español
  (`asignatura, esquema, practica, guia, tema, clave`…); no renombres lo existente.
  Para añadir asignatura nueva, usa la skill `add-asignatura` (registro + enum Zod).

Al terminar todas las tareas, continúa con `/deliver`.
