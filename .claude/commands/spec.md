---
description: Fase 1+2 SDD — analiza el requerimiento o la issue, escribe la spec, actualiza main y crea la rama.
argument-hint: <texto del requerimiento> | <id de issue>
---

# /spec — Specify + Branch

Entrada: `$ARGUMENTS` (texto de requerimiento **o** id de issue).

## 1. Determinar la entrada y obtener la issue

- Si `$ARGUMENTS` es **un número** (admite `#`):
  - `gh issue view <id> --json number,title,body,labels,url`
  - Analiza el contenido. Si es ambiguo o incompleto, **pregunta al usuario** y
    actualiza la issue con `gh issue edit <id>` solo tras confirmar.
- Si `$ARGUMENTS` es **texto**:
  - Analízalo. Para requerimientos grandes o vagos, puedes delegar el análisis en el
    subagente `spec-analyst` para aflorar ambigüedades y criterios de aceptación.
  - Resuelve las dudas con el usuario **antes** de crear nada.
  - Crea la issue: `gh issue create --title "<título>" --body "<cuerpo>"`.
    El cuerpo debe contener problema, resultado esperado y criterios de aceptación.
  - Captura el número de issue devuelto.

## 2. Escribir la spec versionada

- `slug` = título en kebab-case (minúsculas, sin acentos, `-` como separador).
- Crea `specs/<id>-<slug>/spec.md` a partir de `.claude/templates/spec.md`,
  rellenando todos los apartados (criterios Given/When/Then, alcance, no-objetivos,
  impacto en la constitución de contenido).

## 3. Actualizar main y crear la rama

```bash
git fetch origin
git switch main
git pull --ff-only origin main
# slug EN INGLÉS, ASCII, sin acentos (aunque la issue esté en español)
gh issue develop <id> --base main --name <id>-<english-slug> --checkout
```

- **Comprueba antes** que `main` ya trae el tooling que vas a necesitar (tests,
  lint, comandos SDD). Si falta porque otra rama no se ha mergeado, resuélvelo antes
  de ramear (no ramees desde un `main` sin infraestructura).
- **Usa siempre `--name <id>-<english-slug>`**: sin él, `gh issue develop` deriva el
  nombre del título de la issue y arrastra acentos/`ñ`/longitud. El slug va en
  **inglés ASCII kebab** (ver `.claude/rules/convenciones-codigo-y-git.md`).
- Commitea la spec en la rama (mensaje en inglés):
  `git add specs/<id>-<slug>/ && git commit -m "docs(spec): specify #<id> (refs #<id>)"`

## Salida

Reporta: número de issue + url, nombre de la rama, ruta de `spec.md`. Continúa con
`/plan` (no implementes todavía).
