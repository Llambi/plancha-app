# Spec — Home: el texto «Abrir →» se duplica en el nombre accesible de cada tarjeta

- **Issue**: #46 · https://github.com/Llambi/plancha-app/issues/46
- **Estado**: borrador
- **Autor**: Llambi (vía Claude Code)
- **Fecha**: 2026-07-08

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

En `src/pages/index.astro`, cada tarjeta de la home es un único
`<a class="doc-card">` que envuelve toda la información (asignatura, tipo,
descripción) más un `<span class="doc-go">Abrir →</span>` decorativo. El
nombre accesible del enlace incluye "Abrir →" al final de un texto ya
largo, sin aportar información (el propio elemento ya es un link). Afecta a
las 7+ tarjetas de la home.

## Resultado esperado

El nombre accesible de cada tarjeta ya no incluye "Abrir →"; el resto del
contenido (asignatura, título, descripción, tipo) se mantiene. Sin cambios
visuales.

## Criterios de aceptación

1. **Dado** cualquier tarjeta de la home, **cuando** se calcula su nombre
   accesible, **entonces** no incluye "Abrir" ni "→".
2. **Dado** el resto del contenido de la tarjeta (asignatura, título,
   descripción, etiqueta de tipo), **cuando** se aplica este cambio,
   **entonces** sigue formando parte del nombre accesible igual que hoy.
3. **Dado** el layout visual actual, **cuando** se aplica este cambio,
   **entonces** no hay ningún cambio (solo se añade `aria-hidden="true"`).

## Alcance

- Incluye: el `<span class="doc-go">` de `src/pages/index.astro`.
- **No-objetivos**:
  - No se toca el resto de la tarjeta (badge, tipo, descripción), que ya
    tienen su propio tratamiento de accesibilidad correcto.
  - No se toca el buscador (`buscar.astro`/`SearchBox.astro`), que tiene un
    patrón de tarjeta similar pero no fue reportado en esta issue.

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No. Cambio de un atributo de accesibilidad en
  `src/pages/index.astro`.

## Dudas abiertas

- Ninguna: la propuesta (`aria-hidden="true"` en `.doc-go`) ya viene dada
  por la issue original.
