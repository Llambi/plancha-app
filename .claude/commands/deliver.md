---
description: Fase 5+6 SDD — verifica todo, espera confirmación (Gate B) y abre la PR a main con borrado de rama.
argument-hint: [id de issue] (opcional; por defecto la rama actual)
---

# /deliver — Verificación + Entrega

Requiere la implementación completa en la rama de la issue.

## 1. Verificación total

Ejecuta y revisa que todo pasa:

```bash
npm run check        # astro check (tipos / diagnósticos)
npm test             # vitest run (unit)
npm run build        # genera dist/ (Zod valida el contenido)
npm run test:e2e     # playwright sobre el preview
```

Para cambios visibles en el navegador, usa además los tools `preview_*` para
confirmar el resultado (no pidas al usuario que compruebe a mano).

Recorre los **criterios de aceptación** de `spec.md` uno a uno y marca el checklist
de `tasks.md`. Opcional: pasa `/code-review` sobre el diff.

## ⏸ GATE B — esperar al usuario

Presenta el resumen de verificación (qué pasó, evidencias) y **detente** hasta que
el usuario confirme. Si pide cambios, vuelve a `/implement`.

## 2. Abrir la PR

Setup único del repo (si aún no está activo — borra la rama al mergear):

```bash
gh repo edit Llambi/plancha-app --delete-branch-on-merge
```

Crear la PR hacia `main`, cerrando la issue:

```bash
git push -u origin HEAD
gh pr create --base main \
  --title "<tipo>: <título> (#<id>)" \
  --body "Closes #<id>

<resumen + checklist de criterios de aceptación>"
```

- `Closes #<id>` cierra la issue al mergear.
- Con `delete-branch-on-merge` activo, la rama se elimina automáticamente. Si no se
  pudo activar el ajuste, al mergear usa `gh pr merge --delete-branch` como red de
  seguridad.

## Salida

Reporta: url de la PR, estado de las verificaciones, y que la rama se borrará al
mergear.
