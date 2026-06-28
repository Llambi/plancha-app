# specs/

Artefactos de **Spec-Driven Development** del repo. Cada feature/issue tiene su
carpeta, versionada en la rama de la issue para que la PR audite
**spec → plan → código** como una unidad.

## Layout

```
specs/
  <id>-<slug>/
    spec.md     # QUÉ y POR QUÉ — criterios de aceptación, alcance, no-objetivos
    plan.md     # CÓMO — ficheros, schema, estrategia de test
    tasks.md    # tareas TDD = commits atómicos
```

- `<id>` = número de la issue de GitHub (fuente canónica de la spec).
- `<slug>` = título en kebab-case.
- Las plantillas están en `.claude/templates/`.

Estas carpetas las crea el flujo `/workflow` (comandos `/spec` y `/plan`). Ver la
sección **Workflow (Spec-Driven Development)** en `CLAUDE.md`.
