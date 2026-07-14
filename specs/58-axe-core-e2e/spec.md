# Spec — Añadir comprobación de accesibilidad automatizada (axe-core) a la suite E2E

- **Issue**: #58 · https://github.com/Llambi/plancha-app/issues/58
- **Estado**: borrador
- **Autor**: Llambi (vía Claude Code)
- **Fecha**: 2026-07-14

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

El repo ya tiene una suite E2E con Playwright (`tests/e2e/`,
`npm run test:e2e`) que corre sobre `build && preview`. No hay ninguna
comprobación automatizada de accesibilidad (roles ARIA, contraste, nombres
accesibles); los hallazgos de accesibilidad de las issues #40-#46 se
detectaron todos manualmente, sin ninguna red de seguridad automática que
avise si se reintroducen.

## Resultado esperado

`npm run test:e2e` incluye un test de accesibilidad (axe-core) por cada
tipo de página del sitio, que falla si aparece una violación nueva. Si al
implementar aparece alguna violación ya conocida y fuera de alcance de esta
issue, se documenta explícitamente en el propio test (comentario + exclusión
puntual, con su porqué) en vez de bajar el nivel de severidad globalmente o
ignorar toda la categoría.

## Criterios de aceptación

1. **Dado** cada tipo de página del sitio (home, práctica, esquemas, guía
   paginada, buscador, validador de MongoDB), **cuando** corre
   `npm run test:e2e`, **entonces** hay al menos un test que analiza esa
   página con axe-core y falla ante violaciones no documentadas.
2. **Dado** que apareciera alguna violación real al implementar esto,
   **cuando** no sea trivial arreglarla dentro del alcance de esta issue,
   **entonces** se documenta explícitamente en el test (qué regla, en qué
   página, por qué se acepta temporalmente) — nunca se silencia toda la
   categoría ni se baja el umbral de severidad de axe global.
3. **Dado** el resto de la suite E2E existente, **cuando** se añade esto,
   **entonces** no cambia ningún test ya existente.

## Alcance

- Incluye: un nuevo fichero de test E2E (`tests/e2e/a11y.spec.ts`) +
  la dependencia `@axe-core/playwright`.
- **No-objetivos**:
  - No se arregla aquí ningún hallazgo de accesibilidad que aparezca y no
    esté ya cubierto por una issue previa — se documenta como excepción
    conocida y, si hace falta, se abre una issue nueva aparte.
  - No se añade axe-core al flujo de desarrollo interactivo (p. ej. un
    hook de `astro dev`) — solo a la suite E2E.

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No. Solo tests y `package.json`/`package-lock.json`.

## Dudas abiertas

- Qué páginas concretas resultan limpias y cuáles (si alguna) necesitan una
  excepción documentada solo se sabe al ejecutar axe contra el sitio real
  durante `/implement` — no se puede saber de antemano sin ejecutarlo.
