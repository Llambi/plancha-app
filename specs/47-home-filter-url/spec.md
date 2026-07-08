# Spec — El filtro de tipo en la home no se refleja en la URL

- **Issue**: #47 · https://github.com/Llambi/plancha-app/issues/47
- **Estado**: borrador
- **Autor**: Llambi (vía Claude Code)
- **Fecha**: 2026-07-08

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

Los botones "Todos/Práctica/Esquemas/Guías" de la home (`src/pages/index.astro`)
son solo estado de cliente (clase `.on` + `hidden` en las tarjetas). No hay
query param ni `history.replaceState`, a diferencia del buscador
(`/buscar?q=...`), que sí sincroniza su estado con la URL. No se puede
compartir ni guardar un enlace a "solo Práctica", y el filtro se pierde al
recargar.

## Resultado esperado

El filtro activo se sincroniza con un query param (`?tipo=practica`, etc.),
igual que ya hace el buscador con `?q=`. Cargar la home con ese parámetro
aplica el filtro automáticamente. El estado por defecto (Todos, sin query
param) no cambia.

## Criterios de aceptación

1. **Dado** la home, **cuando** se pulsa un filtro distinto de "Todos",
   **entonces** la URL pasa a incluir `?tipo=<filtro>` sin recargar la
   página.
2. **Dado** un enlace `/?tipo=practica` (o `teoria`/`guia`), **cuando** se
   carga la home, **entonces** ese filtro queda activo desde el principio
   (botón marcado, tarjetas filtradas) sin necesidad de clic.
3. **Dado** el filtro "Todos", **cuando** se selecciona, **entonces** el
   query param `tipo` se elimina de la URL (no se deja `?tipo=all`).
4. **Dado** un valor de `tipo` no reconocido o ausente, **cuando** se carga
   la home, **entonces** se comporta como "Todos" (comportamiento por
   defecto sin cambios).

## Alcance

- Incluye: el script de filtros de `src/pages/index.astro`.
- **No-objetivos**:
  - No se toca el buscador (`buscar.astro`), que ya sincroniza su propio
    `?q=` — solo se reutiliza el mismo patrón, sin tocar ese código.
  - No se añade persistencia en `localStorage` del último filtro usado (no
    pedido).

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No. Cambio de comportamiento en el script inline de
  `src/pages/index.astro`.

## Dudas abiertas

- Ninguna: el patrón a reutilizar (`URLSearchParams` + `history.replaceState`)
  ya existe en `buscar.astro` y la propia issue lo señala como referencia.
