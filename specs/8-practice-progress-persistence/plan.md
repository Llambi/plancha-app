# Plan técnico — Persistencia de progreso de práctica (localStorage)

- **Issue**: #8
- **Spec**: ./spec.md
- **Rama**: 8-practice-progress-persistence

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Se separa la **lógica pura** (clave namespaced, (de)serialización defensiva, poda
de ids obsoletos) en un módulo nuevo `src/lib/practica-progress.ts`, testeable con
Vitest sin DOM (mismo patrón que `src/lib/search.ts`). El **cableado con el DOM**
vive en el `<script>` global que ya tiene `TestQuestion.astro` (el que corrige y
revela), porque ya posee la lógica de selección/corrección y se incluye una sola
vez por página. La página `practica/[asignatura].astro` solo aporta dos cosas: el
código de asignatura al cliente (atributo `data-practica`) y el botón de reinicio.

Para restaurar el estado «corregido» se **reutiliza `gradeAll()`** tal cual: al
cargar, si el estado guardado estaba corregido, se restauran las selecciones y se
llama a `gradeAll()`, que ya aplica el resaltado y deshabilita inputs; su resultado
se reemite como evento `tq:graded`, de modo que el handler de puntuación existente
en la página repinta «Aciertos: X / N» por el mismo camino. Así no se duplica nada.

## Ficheros y áreas afectadas

- `src/lib/practica-progress.ts` (**nuevo**) — funciones puras:
  `keyFor(asignatura)`, `serialize(state)`, `parse(raw)` (defensiva → `null` si el
  JSON es inválido o no cumple la forma), `pruneAnswers(answers, validIds)`.
- `src/components/TestQuestion.astro` — en su `<script>` se añade: restaurar al
  cargar, autosave al `change`, guardar al corregir, y manejar el reinicio. Lee la
  asignatura de `[data-practica]`. Todo acceso a `localStorage` va envuelto en
  `try/catch` (degradación elegante). No cambia el markup de la pregunta.
- `src/pages/practica/[asignatura].astro` — añade `data-practica={code}` a la
  sección de test y un botón «Reiniciar progreso» (`[data-reset-trigger]`) en
  `.test-foot`. El handler de `tq:graded` existente no cambia.
- Colecciones de contenido afectadas: **ninguna**.
- Cambios de schema Zod (`src/content/config.ts`): **no**.

## Reutilización

- `gradeAll()` de `TestQuestion.astro` para repintar el estado corregido al
  restaurar (no se reimplementa la corrección).
- Evento `tq:graded` + handler `.score` de `practica/[asignatura].astro` para la
  puntuación restaurada.
- Patrón `src/lib` puro + import en `<script>` cliente (como `search.ts`).
- Atributos/ids ya presentes: `[data-tq]`, `fieldset id="q-<id>"` como clave por
  pregunta; `[data-grade-trigger]`.

## Estado persistido

Clave `plancha:practica:<asignatura>`, valor JSON:

```ts
interface ProgressState {
  answers: Record<string, number[]>; // id de fieldset ("q-<id>") -> índices marcados
  graded: boolean;
  score: number; // solo significativo si graded
  total: number; // solo significativo si graded
}
```

## Estrategia de test (TDD)

- **Unit (Vitest)** `tests/unit/practica-progress.test.ts`:
  - `keyFor` namespacing por asignatura.
  - `serialize`/`parse` ida y vuelta.
  - `parse` defensivo: `null` ante JSON inválido, no-objeto o forma incompleta.
  - `pruneAnswers` descarta ids ausentes y conserva los vigentes.
- **E2E (Playwright)** `tests/e2e/practica-progress.spec.ts` (sobre el build, en
  `/practica/si`):
  - Marcar opciones → recargar → selecciones restauradas (criterio 1).
  - Corregir → recargar → resaltado corregido + «Aciertos: X / N» restaurados
    (criterio 2).
  - Reiniciar → recargar → sin marcas ni puntuación (criterio 3).
- **Build/check**: `astro check` + `astro build` siguen verdes (el `<script>`
  importa el lib; sin cambios de tipos de contenido).

## Riesgos / decisiones

- **Cambio de contenido (ids obsoletos)**: se mitiga con `pruneAnswers` contra los
  ids presentes en el DOM al restaurar (criterio 4). Cubierto en unit.
- **`localStorage` no disponible/lleno (criterio 6)**: todos los accesos en
  `try/catch`; la página funciona como hoy sin persistencia.
- **Reinicio**: se opta por `removeItem` + `location.reload()` por simplicidad y
  para garantizar un estado limpio verificable, en lugar de revertir el DOM a mano.
- **Alcance**: solo test de `/practica/<asignatura>`. Desarrollo y MongoDB quedan
  fuera (no-objetivos de la spec); si no hay `[data-practica]`, el cableado es
  no-op.
