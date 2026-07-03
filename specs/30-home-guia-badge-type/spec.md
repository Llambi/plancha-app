# Spec — Home: las guías paginadas se etiquetan como «Esquemas» (confusión de tipo de contenido)

- **Issue**: #30 · https://github.com/Llambi/plancha-app/issues/30
- **Estado**: borrador
- **Autor**: Llambi (Hugo Perez)
- **Fecha**: 2026-07-03

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

En `src/pages/index.astro`, la home solo distingue dos tipos de contenido
(`tipo: 'practica' | 'teoria'`) para el filtro y el badge de cada card. Las
guías paginadas (colección `guia/`, ver `SoaGuide.astro`) se etiquetan como
`tipo: 'teoria'` (líneas 69-83), heredando la etiqueta «Esquemas»
(`{c.tipo === 'practica' ? 'Práctica' : 'Esquemas'}`), igual que los esquemas
jerárquicos reales (colección `esquemas/`).

Son formatos distintos: un esquema es un árbol jerárquico de un tema; una guía
es un documento paginado por capítulos con quiz propio. La card de «Sistemas
Operativos Avanzados» dice «Guía de estudio» en el título pero «ESQUEMAS» en
el badge inferior, y aparece al filtrar por «Esquemas» aunque no lo sea.

## Resultado esperado

Las cards de tipo guía muestran su propia etiqueta («Guía»), distinguible de
«Práctica» y «Esquemas» tanto en el badge de la card como en el filtro de la
home, sin romper el comportamiento existente de los filtros «Práctica» y
«Esquemas» para el resto de contenido.

## Criterios de aceptación

1. **Dado** una asignatura con guía paginada (p. ej. SOA), **cuando** se
   renderiza la home, **entonces** su card muestra el badge «Guía» (no
   «Esquemas»).
2. **Dado** el filtro «Esquemas» de la home, **cuando** se pulsa, **entonces**
   ya no incluye las cards de guía (solo esquemas jerárquicos reales).
3. **Dado** el grupo de filtros de la home, **cuando** se renderiza,
   **entonces** existe una forma de filtrar específicamente por guías, sin
   alterar el comportamiento de los filtros «Todos», «Práctica» y «Esquemas»
   para el resto de cards.
4. **Dado** el filtro «Práctica», **cuando** se pulsa, **entonces** sigue
   mostrando exactamente las mismas cards que antes (sin regresión).
5. **Dado** el nuevo badge/estilo de guía, **cuando** se compara con el resto
   de badges, **entonces** el color del indicador (`tdot`) sigue el mismo
   sistema de acentos por asignatura ya usado por `practica`/`teoria` (no se
   introduce un esquema de color ajeno).

## Alcance

- Incluye: distinguir las guías paginadas como un tipo propio en
  `src/pages/index.astro` (badge, filtro, estilos del indicador), sin tocar
  las páginas `/guia/[asignatura]` en sí.
- **No-objetivos**: no se cambia el contenido ni la estructura de las páginas
  de guía; no se toca la colección `guia/` ni `SoaGuide.astro`.

## Impacto en el contenido / constitución

- ¿Toca `src/content/` (test, desarrollo, esquemas, guía)? **No.**
- Es un cambio de presentación en `src/pages/index.astro` (badges/filtros de
  la home); no modifica contenido transcrito ni el schema Zod de las
  colecciones.

## Dudas abiertas

- Ninguna: los criterios de aceptación de la issue ya son concretos. El texto
  exacto de la nueva etiqueta/botón de filtro y el estilo del indicador se
  proponen en `plan.md` para confirmar en el Gate A (es una decisión de
  presentación menor, no de alcance).
