# Plan técnico — Práctica: paneles «Modo examen» y «Estadísticas» colapsables

- **Issue**: #32
- **Spec**: ./spec.md
- **Rama**: 32-practica-collapsible-panels

> Esta es la capa CÓMO. Deriva de `spec.md` y respeta su alcance. No introduce
> requisitos nuevos.

## Enfoque

Convertir los tres paneles de `src/pages/practica/[asignatura].astro`
(estadísticas de test `[data-stats]`, modo examen `[data-exam-panel]`,
estadísticas de desarrollo `[data-dev-stats]`) en **`<details>` nativos**,
**colapsados por defecto** (sin atributo `open`). El `<summary>` lleva el título
del panel + un **chip de resumen** de una línea; el contenido actual (acciones,
opciones de examen, resumen completo) pasa al cuerpo del `<details>`. Se usa el
patrón nativo `<details>/<summary>` porque ya da teclado y anuncio de
expandido/colapsado gratis (criterio 2), y evita un tercer patrón de overlay.
La **lógica interna no se toca**: `renderStats`/`renderDevStats`, modo examen y
filtros siguen igual; solo se añaden renderers **compactos** del chip que se
suscriben a los eventos ya existentes.

## Ficheros y áreas afectadas

- `src/pages/practica/[asignatura].astro` — markup de los 3 paneles → `<details>`
  con `<summary>` (título + chip) y cuerpo; CSS del disclosure; pequeños renderers
  del chip suscritos a `practica:stats-updated`, `desarrollo:stats-updated` y a los
  cambios de config de examen.
- `src/lib/exam-mode.ts` — nueva función pura `formatExamConfigSummary(config)`.
- `src/lib/practica-stats.ts` — nueva función pura para el texto compacto de
  estadísticas (p. ej. `formatStatsChip(summary)` → «Acumulado: 74%»).
- `src/lib/desarrollo-progress.ts` — nueva función pura para el chip de
  autoevaluación (p. ej. «Sabías 3 · A medias 1 · No 0»).
- `tests/e2e/` — nuevo spec de colapsables; **ajuste de e2e existentes** que
  interactúan con controles ahora colapsados (ver Riesgos).
- `tests/unit/` — tests de los formatters puros.
- Colecciones de contenido afectadas: **ninguna**.
- Cambios de schema Zod (`src/content/config.ts`): **no**.

## Reutilización

- Estado y utilidades ya existentes: `parseStats`/`summarize` (`practica-stats`),
  `parseExamConfig`/`ExamConfig`/`examConfigKeyFor` (`exam-mode`),
  `summarizeDevProgress` (`desarrollo-progress`), `safeGet` y los eventos
  `practica:stats-updated` / `desarrollo:stats-updated` ya emitidos.
- Los formatters nuevos son **funciones puras** en las libs existentes (mismo sitio
  que `summarize`/`parseExamConfig`), testeables en Vitest y reutilizadas por la página.
- `<details>/<summary>` nativos: sin JS de accesibilidad propio.

## Estrategia de test (TDD)

- **Unit (Vitest)**: los formatters puros —
  - `formatExamConfigSummary`: con barajado / subconjunto / cronometrado activos →
    cadena compacta; config nula o «todo por defecto» → texto neutro.
  - chip de estadísticas: resumen con aciertos → «Acumulado: N%»; sin respuestas → neutro.
  - chip de autoevaluación: con datos → «Sabías X · A medias Y · No Z»; sin datos → neutro.
- **E2E (Playwright)** — nuevo `tests/e2e/practica-collapsible.spec.ts`:
  - los 3 paneles son `<details>` **sin `open`** al cargar; el chip de resumen es visible;
  - click / Enter en el `<summary>` **expande** (cuerpo y controles visibles);
  - la 1ª pregunta `[data-tq]` queda **más arriba** con paneles colapsados que expandidos;
  - tras corregir, el chip de estadísticas refleja el acumulado; con config de examen
    guardada, el chip de examen muestra el resumen.
- **Regresión**: ajustar los e2e existentes que tocan controles ahora colapsados
  (abrir el `<details>` antes de interactuar) para mantener la suite verde.
- **Contenido**: N/A (no se toca `src/content/`); `astro check` + `build` deben pasar.

## Riesgos / decisiones

- **Rompe e2e existentes**: al colapsar por defecto, los tests que clican
  «Empezar simulacro», «Solo mis fallos», «Reiniciar estadísticas» o los inputs de
  examen fallarían (elementos ocultos dentro del `<details>` cerrado). Mitigación:
  en la misma tarea del contenedor, esos tests abren el panel (`open`/click en
  summary) antes de interactuar. Es mantenimiento derivado del cambio de presentación.
- **Chip vs resumen completo**: el `<summary>` muestra solo el chip compacto; el
  detalle completo (`[data-stats-summary]`, «Más falladas», etc.) queda en el cuerpo
  al expandir. `renderStats`/`renderDevStats` siguen escribiendo el detalle; los
  renderers del chip son aparte y no modifican esas funciones (criterio 4).
- **Modo examen activo**: colapsar/expandir no altera el estado del simulacro (el
  cuerpo permanece en el DOM); no se auto-colapsa ni auto-expande al iniciar/salir.
