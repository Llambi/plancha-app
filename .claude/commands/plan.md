---
description: Fase 3 SDD — escribe el plan técnico y el desglose de tareas TDD, y para para aprobación (Gate A).
argument-hint: [id de issue] (opcional; por defecto la rama actual)
---

# /plan — Planificación (Gate A)

Requiere una spec existente (`specs/<id>-<slug>/spec.md`) y estar en la rama de la
issue. Si no hay spec, ejecuta antes `/spec`.

## 1. Escribir el plan técnico

- Crea `specs/<id>-<slug>/plan.md` desde `.claude/templates/plan.md`.
- Define el CÓMO: ficheros afectados, colecciones de contenido, cambios de schema
  Zod (`src/content/config.ts`), y la **estrategia de test** (qué cubre Vitest, qué
  cubre Playwright, qué se valida vía `astro check`/`build`).
- **Reutiliza lo existente** antes de proponer código nuevo (p.ej. `url()` en
  `src/data/site.ts`, componentes en `src/components/`, loaders/schemas en
  `src/content/config.ts`). Puedes apoyarte en el agente `Plan` integrado.

## 2. Desglosar en tareas TDD

- Crea `specs/<id>-<slug>/tasks.md` desde `.claude/templates/tasks.md`.
- Cada tarea es **atómica = un commit**, en orden TDD (test rojo → implementación
  → refactor), con su mensaje Conventional Commits y `(refs #<id>)`.

## 3. Commit de la planificación

`git add specs/<id>-<slug>/ && git commit -m "docs(plan): planifica #<id> (refs #<id>)"`

## ⏸ GATE A — esperar al usuario

Presenta un resumen de spec + plan + tasks y **detente**. No implementes.

- Si el usuario pide cambios, itera spec/plan/tasks y vuelve a presentar.
- Solo cuando confirme conformidad, continúa con `/implement`.
