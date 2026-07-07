# Plan técnico — Textarea del validador de MongoDB sin `<label>` asociado

- **Issue**: #44
- **Spec**: ./spec.md
- **Rama**: 44-mongo-textarea-label

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Añadir un `<label for="ta-${current}-${ci}">JSON de la colección
db.${coll.name}</label>` justo antes de cada `<textarea>`, visualmente
oculto con el mismo patrón "visually-hidden" (clip) que ya se introdujo en
la issue #41 para el radio oculto de las opciones del test — pero como una
clase **nueva y propia** (`.mongo-practica .sr-only`), sin tocar ni renombrar
`.opt-radio` (que ya está mergeado y probado en #41): son casos de uso
relacionados pero no vale la pena arriesgar ese código ya probado solo para
compartir 8 líneas de CSS.

El `placeholder` del textarea no cambia (sigue siendo el ejemplo de
formato). El `id` del textarea ya existe (`ta-${current}-${ci}`) y se
reutiliza tal cual para el `for` del label.

## Ficheros y áreas afectadas

- `src/components/MongoPractica.astro` — el bloque `render()` que genera
  cada tarjeta de colección, más la nueva clase CSS `.sr-only`.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- Mismo `id` de textarea ya existente (`ta-${current}-${ci}`), sin generar
  ningún id nuevo.
- Patrón visually-hidden de #41, pero como clase independiente
  (`.sr-only`), no reutilizando `.opt-radio` directamente (ver Enfoque).

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica — no hay lógica nueva en `src/lib`.
- **E2E (Playwright)**: nuevo test en `tests/e2e/mongo-practica.spec.ts`
  (junto a los de #41) que comprueba, para el Ejercicio 1 (dos colecciones,
  `peliculas` y `clientes`), que cada textarea tiene un nombre accesible
  distinto y correcto vía `toHaveAccessibleName()`, y que ese nombre no
  depende del contenido/placeholder (se comprueba tras escribir algo en el
  textarea, que el nombre accesible sigue siendo el mismo).
- **Contenido**: no aplica.

## Riesgos / decisiones

- **Duplicación de CSS visually-hidden** (`.opt-radio` de #41 vs `.sr-only`
  aquí): aceptada a propósito por seguridad (no tocar código ya mergeado y
  probado), documentado aquí para que quede constancia si en el futuro se
  quiere unificar.
- **Texto del label**: se usa literalmente el texto propuesto en la issue
  ("JSON de la colección db.&lt;nombre&gt;"), sin traducir/parafrasear.
