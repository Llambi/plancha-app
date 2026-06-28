---
description: Flujo Spec-Driven Development de principio a fin (issue → spec → branch → plan → TDD → verify → PR).
argument-hint: <texto del requerimiento> | <id de issue, p.ej. 42>
---

# /workflow — Spec-Driven Development

Orquesta el flujo de trabajo completo de PlanchaAPP. La **especificación es la
fuente de verdad**; el trabajo avanza por fases con **dos paradas obligatorias**
para el usuario.

Entrada: `$ARGUMENTS`

- Si es **un número** (`42`, `#42`) → es una issue existente.
- Si es **texto** → es un requerimiento nuevo; se analizará y se creará una issue.

Constitución del proyecto (de obligado cumplimiento en todas las fases):
`CLAUDE.md` + `.claude/rules/contenido-examenes-y-temarios.md`.

## Cómo proceder

Ejecuta las fases **en orden**. Cada fase está detallada en su propio comando;
puedes invocarlas como sub-pasos o reanudar una suelta con `/spec`, `/plan`,
`/implement`, `/deliver`.

1. **Specify + Branch** → sigue `.claude/commands/spec.md`.
   Produce la issue (si venía texto), `specs/<id>-<slug>/spec.md`, actualiza `main`
   y crea la rama de la issue.
2. **Plan** → sigue `.claude/commands/plan.md`.
   Produce `plan.md` + `tasks.md`. **⏸ GATE A**: presenta spec+plan y **espera**
   aprobación; itera hasta que el usuario esté conforme. No implementes antes.
3. **Implement** → sigue `.claude/commands/implement.md`.
   TDD por tarea, commits atómicos.
4. **Verify + Deliver** → sigue `.claude/commands/deliver.md`.
   Verificación total. **⏸ GATE B**: espera confirmación. Luego abre la PR → `main`.

## Reglas del orquestador

- **Nunca cruces un GATE sin confirmación explícita del usuario.**
- Si en cualquier fase faltan datos o hay ambigüedad, **pregunta** antes de seguir.
- Si el trabajo toca `src/content/`, usa las skills `add-exam` / `add-esquema` y
  respeta las reglas de contenido (verbatim).
- Reporta al final de cada fase qué se ha producido (issue, rama, ficheros, commits).
