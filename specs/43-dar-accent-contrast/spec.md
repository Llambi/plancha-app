# Spec — Contraste insuficiente del acento de DAR (#6C63FF) sobre texto blanco en negrita

- **Issue**: #43 · https://github.com/Llambi/plancha-app/issues/43
- **Estado**: borrador
- **Autor**: Llambi (vía Claude Code)
- **Fecha**: 2026-07-07

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

El acento de la asignatura DAR es `#6C63FF` (`src/data/asignaturas.ts:14`),
usado como fondo de badges/botones con texto blanco en negrita (`.doc-badge`,
`.filter-btn.on`, `.ph-sigla`). Calculado con la fórmula de contraste WCAG,
`#6C63FF` vs blanco da **~4.32:1**, por debajo del 4.5:1 exigido para texto
normal en AA (cumple el 3:1 de componentes UI/texto grande, pero no el de
texto). El resto de acentos del sitio (SOA, SI, CL, MongoDB) ya superan
4.5:1.

## Resultado esperado

El acento de DAR pasa a un tono ligeramente más oscuro, visualmente casi
idéntico al actual (mismo matiz/saturación, solo un poco menos claro), que
alcanza ≥4.5:1 de contraste con blanco. El resto de acentos no cambia.

## Criterios de aceptación

1. **Dado** el nuevo valor de acento de DAR, **cuando** se calcula su
   contraste WCAG contra blanco (`#FFFFFF`), **entonces** es ≥4.5:1.
2. **Dado** el resto de asignaturas (SOA, SI, CL, MongoDB), **cuando** se
   aplica este cambio, **entonces** sus acentos no se modifican.
3. **Dado** los elementos que usan el acento como fondo con texto blanco
   (`.doc-badge`, `.filter-btn.on`, `.ph-sigla` en las páginas de DAR),
   **cuando** se aplica el cambio, **entonces** se ven con el nuevo color,
   sin cambios de maquetación/tamaño.

## Alcance

- Incluye: el valor `accent` de DAR en `src/data/asignaturas.ts`.
- **No-objetivos**:
  - No se tocan los acentos de las demás asignaturas.
  - No se cambia dónde/cómo se usa `--site-accent` (solo su valor para DAR).
  - No se añade un test de contraste automatizado genérico para todos los
    acentos (fuera de alcance; issue #58, axe-core, cubre accesibilidad
    automatizada de forma más amplia).

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No. Cambio de un valor en `src/data/asignaturas.ts`
  (metadatos de presentación, no contenido de examen).

## Dudas abiertas

- Ninguna. Propuesta concreta: `#5F55FF` (contraste 4.96:1 con blanco,
  calculado con la fórmula de luminancia relativa WCAG — ver plan.md para el
  detalle del cálculo), manteniendo el mismo matiz/saturación que el
  original y con margen sobre el mínimo de 4.5:1 (no al filo).
