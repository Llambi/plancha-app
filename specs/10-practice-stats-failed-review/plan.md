# Plan técnico — Estadísticas de práctica y modo «solo repasar mis fallos»

- **Issue**: #10
- **Spec**: ./spec.md
- **Rama**: 10-practice-stats-failed-review

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Mismo patrón que #8: **lógica pura** de agregación en un módulo nuevo
`src/lib/practica-stats.ts` (testeable sin DOM), y **cableado con el DOM** en los
scripts ya existentes. Las estadísticas son acumulativas y viven en una clave
**independiente** del progreso: `plancha:stats:<asignatura>` (para poder
reiniciarlas por separado, criterio 5).

El registro por pregunta se obtiene **reutilizando el cómputo que `gradeAll()` ya
hace** al corregir: se amplía su retorno con los resultados por pregunta
(`results`) y el handler del click de «Corregir» los registra. **Solo el click real
registra**; la restauración al recargar (que también llama a `gradeAll()` para
repintar) **no** registra, evitando inflar las estadísticas en cada reload.

El **panel de resumen**, el toggle **«solo mis fallos»** y el botón de **reinicio
de estadísticas** viven en `practica/[asignatura].astro`: su script lee/resume las
estadísticas en carga y tras cada corrección (evento `practica:stats-updated`).

## Estado persistido (nuevo, independiente de #8)

Clave `plancha:stats:<asignatura>`, valor JSON:

```ts
interface QuestionStat {
  attempts: number; // veces corregida (respondida)
  wrong: number; // veces fallada (acumulado) -> ranking «más falladas»
  lastWrong: boolean; // última corrección fallida -> filtro «solo mis fallos»
}
interface StatsState {
  questions: Record<string, QuestionStat>; // id de fieldset ("q-<id>")
}
```

- `respondidas` = nº de preguntas con `attempts > 0`.
- `% acierto acumulado` = `(Σ attempts − Σ wrong) / Σ attempts` (sobre todos los
  intentos; refleja el esfuerzo total).
- `% acierto último intento` = `nº de respondidas con lastWrong === false / respondidas`
  (estado actual de dominio; comparado con el acumulado, muestra la mejora).
- `fallos` (filtro) = ids con `lastWrong === true`.

## Ficheros y áreas afectadas

- `src/lib/practica-stats.ts` (**nuevo**) — funciones puras: `statsKeyFor`,
  `serializeStats`, `parseStats` (defensiva → `null`), `recordGrading`,
  `summarize`, `failedIds`, `pruneStats`.
- `src/components/TestQuestion.astro` — `gradeAll()` devuelve además `results`
  (`{ id, answered, correct }[]`); el handler de `[data-grade-trigger]` registra
  estadísticas (solo respondidas) y emite `practica:stats-updated`. La ruta de
  restauración no cambia su comportamiento de stats (no registra).
- `src/pages/practica/[asignatura].astro` — panel de resumen (shell hidratado por
  JS), toggle `[data-failed-toggle]` («solo mis fallos») y botón
  `[data-stats-reset]`; script para render/filtrado/reinicio. Reusa `data-practica`
  (ya presente) para la asignatura.
- Colecciones de contenido: **ninguna**. Schema Zod: **no**.

## Reutilización

- Cómputo de acierto por pregunta de `gradeAll()` (no se reimplementa la
  corrección).
- `data-practica={code}` y los wrappers `safeGet/safeSet/safeRemove` de
  `TestQuestion.astro` (acceso a `localStorage` en `try/catch`).
- Anclas `#q-<id>` existentes para deep-linkar las «más falladas» (la clave de
  stat es justo el id del fieldset).
- Patrón de filtro por botones del índice (`src/pages/index.astro`) para el toggle.

## Estrategia de test (TDD)

- **Unit (Vitest)** `tests/unit/practica-stats.test.ts`:
  - `statsKeyFor` namespacing; `serializeStats`/`parseStats` ida y vuelta y parse
    defensivo (`null`).
  - `recordGrading`: incrementa `attempts`/`wrong` y fija `lastWrong`; acertar tras
    fallar pone `lastWrong=false` (criterio 4).
  - `summarize`: `respondidas`, `% acierto último intento` y `% acierto acumulado`
    (distintos cuando hay reintentos), orden de «más falladas» por `wrong`.
  - `failedIds`: solo `lastWrong`. `pruneStats`: descarta ids obsoletos.
- **E2E (Playwright)** `tests/e2e/practica-stats.spec.ts` (sobre el build):
  - Fallar una pregunta y corregir → el panel muestra respondidas y % acierto.
  - Activar «solo mis fallos» → solo quedan visibles las falladas.
  - Reiniciar estadísticas → panel vacío.
- **Build/check**: `astro check` + `astro build` verdes.

## Riesgos / decisiones

- **Doble conteo en reload**: se evita registrando solo en el click real de
  «Corregir»; la restauración repinta pero no registra. (Riesgo principal.)
- **Independencia de #8**: clave de stats separada; el reinicio de estadísticas no
  toca el progreso de respuestas y viceversa (criterio 5).
- **Ids obsoletos / `localStorage` ausente (criterio 6)**: `pruneStats` + accesos en
  `try/catch`; degrada como hoy.
- **Dos porcentajes de acierto** (último intento vs acumulado): el primero refleja
  el dominio actual y el segundo el esfuerzo total; mostrarlos juntos visibiliza la
  mejora. Ambos derivan de los mismos contadores, sin estado extra.
- **Alcance**: solo test de `/practica/<asignatura>`. Desarrollo (#12) y MongoDB
  fuera (no-objetivos).
