# Spec — Guía SOA: fuentes de Google Fonts sin preconnect

- **Issue**: #48 · https://github.com/Llambi/plancha-app/issues/48
- **Estado**: borrador
- **Autor**: Llambi (vía Claude Code)
- **Fecha**: 2026-07-08

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

La página de la guía (`src/pages/guia/[asignatura].astro`) carga
tipografías externas con un `<link rel="stylesheet"
href="https://fonts.googleapis.com/...">`, sin `rel="preconnect"` previo a
`fonts.googleapis.com`/`fonts.gstatic.com`. Eso implica una conexión
externa completa (DNS + TLS) en cada visita a `/guia/soa`, además de ser la
única dependencia de terceros de un sitio por lo demás autocontenido y
estático.

## Resultado esperado

La página de la guía adelanta la conexión a ambos orígenes de Google Fonts
antes de pedir la hoja de estilos, reduciendo el tiempo hasta que el texto
usa la tipografía definitiva. Se aplica el mínimo propuesto en la issue
(preconnect), no la alternativa de autoalojar las fuentes (marcada
explícitamente como "a valorar aparte").

## Criterios de aceptación

1. **Dado** `/guia/soa`, **cuando** se inspecciona el `<head>`,
   **entonces** hay un `<link rel="preconnect" href="https://fonts.googleapis.com">`
   y un `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`,
   ambos antes del `<link rel="stylesheet">` existente.
2. **Dado** el resto de la página, **cuando** se aplica este cambio,
   **entonces** no hay ningún cambio visual ni de comportamiento.

## Alcance

- Incluye: los `<link rel="preconnect">` en
  `src/pages/guia/[asignatura].astro` (única página que carga estas
  fuentes).
- **No-objetivos**:
  - No se autoalojan las fuentes en `public/fonts` (alternativa señalada
    en la issue como "a valorar aparte", no como parte de este fix).
  - No se toca ninguna otra página del sitio (ninguna otra carga fuentes
    externas).

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No. Cambio de metadatos de `<head>` en
  `src/pages/guia/[asignatura].astro`.

## Dudas abiertas

- Ninguna: la propuesta ya viene dada por la issue original.
