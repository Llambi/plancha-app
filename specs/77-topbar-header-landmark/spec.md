# Spec — El contenido de la topbar no está contenido en ningún landmark (axe: region)

- **Issue**: #77 · https://github.com/Llambi/plancha-app/issues/77
- **Estado**: aprobada
- **Autor**: Llambi (vía Claude Code)
- **Fecha**: 2026-07-14

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

axe-core (issue #58) reporta la regla `region` ("All page content should be
contained by landmarks") en las 6 páginas comprobadas por
`tests/e2e/a11y.spec.ts`. La causa es la misma en todas: `.site-topbar`
(`src/layouts/BaseLayout.astro`) es un `<div>` suelto, hermano de `<main>` a
nivel de `<body>`, así que su contenido (`.site-brand`, `.site-doc-title`,
`SearchBox`, `.site-home`, el toggle de tema) queda fuera de cualquier
landmark ARIA. Esto afecta a usuarios de lector de pantalla que navegan por
landmarks: la topbar no aparece como región identificable.

## Resultado esperado

Toda la topbar queda dentro de un landmark (`<header>`, que obtiene
implícitamente `role="banner"` al ser hijo directo de `<body>`), sin ningún
cambio visual ni de comportamiento.

## Criterios de aceptación

1. **Dado** cualquiera de las 6 páginas cubiertas por `tests/e2e/a11y.spec.ts`,
   **cuando** se ejecuta axe-core, **entonces** ya no reporta la regla
   `region`.
2. **Dado** el layout renderizado, **cuando** se inspecciona el árbol de
   accesibilidad, **entonces** el contenido de la topbar (`.site-brand`,
   `.site-doc-title`, el buscador, `.site-home`, el toggle de tema) es
   descendiente de un landmark `banner`.
3. **Dado** cualquier página, **cuando** se compara visualmente contra el
   estado actual, **entonces** no hay ningún cambio (mismo aspecto, mismo
   layout, misma posición sticky).
4. Se retira la excepción `topbarLandmark` (`ruleId: 'region'`) de
   `tests/e2e/a11y.spec.ts` para las 6 páginas.

## Alcance

- Incluye: `src/layouts/BaseLayout.astro` (cambiar la etiqueta contenedora de
  `.site-topbar` de `<div>` a `<header>`), `tests/e2e/a11y.spec.ts` (retirar la
  excepción).
- **No-objetivos**:
  - No se cambia el CSS/selector `.site-topbar` (sigue aplicando igual sobre
    la nueva etiqueta).
  - No se tocan las issues #78 (contraste) ni #79 (heading-order): esas
    excepciones permanecen intactas.

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No. Cambio estructural en el layout compartido +
  ajuste del test de accesibilidad.

## Dudas abiertas

- Ninguna: la propuesta de la propia issue (`<div>` → `<header>`) es la
  solución estándar y no tiene alternativas razonables a valorar.
