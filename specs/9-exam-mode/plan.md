# Plan técnico — Modo examen: barajado, subconjunto de N preguntas y simulacro cronometrado

- **Issue**: #9
- **Spec**: ./spec.md
- **Rama**: 9-exam-mode

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Un panel de «Modo examen» se añade a la sección de test de
`/practica/<asignatura>` (junto al panel de estadísticas existente). Al
«Empezar simulacro» se calcula, con un PRNG con semilla, el subconjunto/orden
de preguntas a mostrar y se aplica **reordenando los `<fieldset data-tq>`
reales en el DOM** + marcando `hidden` las no seleccionadas — el mismo
mecanismo que ya usa el filtro «solo mis fallos» (#10), así que el minimap ya
lo respeta sin tocarlo (rebuild vía `practica:filter-changed`, excluye
`el.hidden`). La corrección (manual o por timeout) se dispara con un click
sintético sobre `[data-grade-trigger]`, reutilizando `gradeAll()` y el evento
`tq:graded` ya cableados en `TestQuestion.astro` — cero lógica de corrección
duplicada. Toda la parte aleatoria/deterministic-testeable vive en un módulo
puro nuevo (`src/lib/exam-mode.ts`), siguiendo el patrón de
`practica-progress.ts`/`practica-stats.ts` (núcleo puro + wiring de DOM en el
`<script>` de la página).

## Ficheros y áreas afectadas

- `src/lib/exam-mode.ts` (**nuevo**) — PRNG con semilla, `shuffle`,
  `pickSubset`, `buildExamOrder` (combina ambos), y persistencia de la
  _configuración_ (`ExamConfig`, `examConfigKeyFor`, `serializeExamConfig`,
  `parseExamConfig`) en `localStorage` bajo `plancha:exam:<asignatura>`.
- `src/pages/practica/[asignatura].astro` — panel de modo examen (barajar /
  subconjunto N / cronómetro + botones empezar/salir + temporizador visible) y
  su wiring: solo se renderiza si `tests.length > 0`. Mutuamente excluyente con
  el checkbox «solo mis fallos» (activar uno desactiva el otro) para que
  ambos no compitan por la propiedad `hidden` del mismo elemento.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- `practica:filter-changed` (ya emitido por el toggle de fallos, ya escuchado
  por `Minimap.astro:879`) — el modo examen dispara el mismo evento tras
  reordenar/ocultar, sin tocar `Minimap.astro`.
- `[data-grade-trigger]` + `gradeAll()` + evento `tq:graded` (`TestQuestion.astro`)
  — la corrección (manual o por timeout) se dispara con
  `document.querySelector('[data-grade-trigger]')?.click()`; no se reimplementa
  la corrección.
- Patrón `keyFor`/`serialize`/`parse` defensivo de `practica-progress.ts` — se
  replica para `ExamConfig` en `exam-mode.ts` (mismo estilo, no se generaliza
  prematuramente a un helper compartido).
- `safeGet`/`safeSet`/`safeRemove` (localStorage con try/catch) — patrón ya
  presente en `TestQuestion.astro` y en el script de la página; se reutiliza
  igual (no se extrae a `src/lib` para no acoplar DOM con el core puro).

## Estrategia de test (TDD)

- **Unit (Vitest)**, `tests/unit/exam-mode.test.ts`:
  - `createRng(seed)`/`shuffle`: misma semilla → mismo resultado; es permutación
    (mismos elementos, mismo tamaño); semillas distintas → resultados distintos
    (para N suficientemente grande).
  - `pickSubset`: devuelve exactamente `n` elementos distintos de la entrada;
    clamp de `n` a `[0, total]`; determinista por semilla.
  - `buildExamOrder`: combina barajar + subconjunto; con `shuffle: false`
    conserva el orden relativo original del subconjunto elegido.
  - `examConfigKeyFor`/`serializeExamConfig`/`parseExamConfig`: namespacing,
    round-trip, defensivo ante JSON inválido/incompleto (igual que
    `practica-progress.test.ts`).
- **E2E (Playwright)**, contra `/practica/si` (banco de test pequeño, ya usado
  por `tests/e2e/practica.spec.ts`):
  - El panel de modo examen aparece cuando hay preguntas de test.
  - Activar un subconjunto de N dejar exactamente N `[data-tq]` visibles (resto
    `hidden`), y el minimap no lista las ocultas.
  - Activar «barajar» no pierde ni duplica preguntas (invariante de conjunto;
    no se afirma un orden concreto para evitar flakiness).
  - Modo cronometrado con duración muy corta corrige automáticamente al
    agotarse (reutiliza el patrón de timeout ya usado en
    `practica.spec.ts` para el botón «Ver respuesta»).
  - «Salir de modo examen» restaura todas las preguntas visibles en su orden
    original.
  - La configuración (barajar/N/cronómetro) persiste entre recargas de página.
- **Contenido**: no aplica (no se toca `src/content/`); `astro check` +
  `astro build` verifican que el nuevo markup/props tipan bien.

## Riesgos / decisiones

- **Aleatoriedad real vs. determinismo testeable**: el core (`exam-mode.ts`)
  recibe siempre un `rng: () => number` inyectado, así los tests unitarios usan
  semillas fijas; en producción la página lo alimenta con una semilla derivada
  de `Date.now()` (no hace falta un PRNG criptográfico, es solo para variar el
  repaso).
- **No se persiste el simulacro en curso** (subconjunto/orden exactos) tras
  recargar a mitad — coherente con el no-objetivo de la spec; recargar
  reinicia el modo examen a su estado «no activo» (la config sí persiste).
- **Exclusión mutua con «solo mis fallos»**: ambos filtros usan `hidden` sobre
  el mismo `[data-tq]`; combinarlos sin reglas claras es una fuente fácil de
  bugs y no lo pide la spec, así que activar uno desactiva el otro
  explícitamente.
- **Reordenar el DOM real** (en vez de solo CSS `order`) para que el rail del
  minimap (que itera en orden de documento) refleje el barajado sin tocar
  `Minimap.astro`; el coste es mover nodos existentes con
  `insertBefore`/`appendChild`, sin recrearlos (conserva listeners y estado).
