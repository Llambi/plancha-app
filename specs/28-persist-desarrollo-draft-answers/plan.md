# Plan técnico — Las respuestas escritas en preguntas de desarrollo no se guardan (se pierden al recargar)

- **Issue**: #28
- **Spec**: ./spec.md
- **Rama**: 28-persist-desarrollo-draft-answers

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Extender el módulo existente `desarrollo-progress.ts` (misma clave de
`localStorage`, `plancha:desarrollo:<asignatura>`) con un nuevo campo
`drafts: Record<string, string>` en paralelo a `answers`, en vez de crear un
módulo o una clave nuevos. Cablear el guardado/restauración en el `<script>`
que ya existe en `DesarrolloQuestion.astro` (el mismo que gestiona la
autoevaluación): `input` con debounce (~400ms) para guardar, y una llamada de
restauración al cargar que rellena el `value` del textarea, siguiendo el mismo
patrón que `restoreSelfAssessment()`.

## Ficheros y áreas afectadas

- `src/lib/desarrollo-progress.ts` — añade `drafts` a `DesarrolloProgressState`;
  `parse()` debe tratar un `drafts` ausente (estados persistidos antes de este
  cambio) como `{}` en vez de invalidar todo el estado; generaliza la lógica de
  poda (hoy solo `pruneAnswers`) en un helper compartido reutilizado por
  `answers` y `drafts`.
- `src/components/DesarrolloQuestion.astro` — añade un manejador `input`
  debounced sobre `.dq-text` que persiste el borrador, y una llamada
  `restoreDrafts()` en la carga (mismo bloque `<script>` que ya importa
  `keyFor`/`serialize`/`parse`/`pruneAnswers` y define `safeGet`/`safeSet`).
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- `keyFor`, `serialize`, `parse`, `pruneAnswers` de
  `src/lib/desarrollo-progress.ts` (ya importados en el `<script>` del
  componente) — se extiende el mismo módulo, no se crea uno nuevo.
- `safeGet`/`safeSet` ya definidos en el `<script>` de
  `DesarrolloQuestion.astro` — se reutilizan tal cual.
- `questionIds()` (ya recoge los ids `[data-dq]` presentes) — se reutiliza
  también para podar borradores obsoletos.

## Estrategia de test (TDD)

- **Unit (Vitest)**: extiende `tests/unit/desarrollo-progress.test.ts` —
  round-trip de `drafts` en `serialize`/`parse`; `parse()` de un estado
  persistido sin `drafts` (compatibilidad hacia atrás, debe devolver `{}` en
  vez de `null`); poda de borradores por ids válidos (mismo comportamiento que
  `pruneAnswers` para `answers`).
- **E2E (Playwright)**: nuevo `tests/e2e/desarrollo-draft-answer.spec.ts` —
  escribir en un `.dq-text`, recargar, comprobar que el texto persiste; borrar
  el texto, recargar, comprobar que no queda un borrador obsoleto; dos
  preguntas de desarrollo distintas mantienen borradores independientes.
- **Contenido**: no aplica (no hay cambios en `src/content/`).

## Riesgos / decisiones

- **Duración del debounce (~400ms)**: suficiente para no escribir en cada
  pulsación, corta para que los tests e2e no necesiten esperas largas
  (`waitForTimeout` acorde al debounce, o disparar `blur`/forzar el guardado
  antes de recargar).
- **Compatibilidad hacia atrás**: los estados ya persistidos (sin campo
  `drafts`) no deben invalidarse — si `parse()` los rechazara, un usuario
  existente perdería también su autoevaluación al desplegar este cambio.
