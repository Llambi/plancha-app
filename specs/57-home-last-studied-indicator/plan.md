# Plan técnico — Home: indicador de «última vez estudiado» por asignatura

- **Issue**: #57
- **Spec**: ./spec.md
- **Rama**: 57-home-last-studied-indicator

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

`/practica/<asignatura>` ya dispara dos eventos genéricos en cada interacción
real: `tq:graded` (al corregir el test) y `desarrollo:stats-updated` (al
autoevaluar una pregunta de desarrollo). Se añade un tercer listener a cada
uno que guarda `new Date().toISOString()` bajo
`plancha:last-studied:<asignatura>` (vía `safeSet`, mismo patrón que el resto
de la página). Un módulo puro nuevo (`src/lib/last-studied.ts`) expone
`keyFor()` y `formatLastStudied(savedAt, now)`, que convierte el timestamp
guardado en un texto relativo en español ("Estudiado hace 3 días"), con `now`
como parámetro (igual que `createRng(seed)` en `exam-mode.ts`) para que sea
determinista y testeable sin mockear el reloj del sistema. En la home, se
amplía el mismo bucle por tarjeta que ya añadió el badge de progreso (#50)
para leer también esta clave y, si hay dato, mostrar el texto relativo bajo
la descripción de la tarjeta.

## Ficheros y áreas afectados

- `src/lib/last-studied.ts` (nuevo) — `keyFor(asignatura)`,
  `formatLastStudied(savedAt: string | null, now: number): string`.
- `src/pages/practica/[asignatura].astro` — dos listeners más
  (`tq:graded`, `desarrollo:stats-updated`) que llaman a
  `safeSet(keyFor(asignatura), new Date().toISOString())`.
- `src/pages/index.astro` — nuevo elemento `.doc-studied` (oculto por
  defecto) en las tarjetas `tipo: 'practica'`, junto al `.doc-progress` de
  #50; el `<script>` existente que ya recorre `[data-asignatura]` lee
  también `plancha:last-studied:<code>` y rellena/muestra este elemento con
  `formatLastStudied(...)`.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- Eventos `tq:graded`/`desarrollo:stats-updated` ya existentes — no se
  inventa ninguna señal nueva de "hay interacción", solo se escucha una vez
  más.
- El mismo bucle `cards.forEach(...)` de `index.astro` (issue #50) para
  badges por tarjeta, evitando un segundo recorrido del DOM.
- `safeSet` local ya definida en `practica/[asignatura].astro`.

## Estrategia de test (TDD)

- **Unit (Vitest)**: `tests/unit/last-studied.test.ts` — `formatLastStudied`:
  sin timestamp -> `''`; timestamp inválido -> `''`; `now` anterior al
  timestamp -> `''`; menos de un minuto -> "hace un momento"; minutos, horas,
  días, meses y años, con singular/plural correcto en los límites (1 vs N).
- **E2E (Playwright)**: se amplía `tests/e2e/home-progress-badge.spec.ts` (o
  fichero equivalente) — (a) una asignatura sin interacción no muestra el
  indicador; (b) corregir una pregunta de test en `/practica/si` y volver a
  la home muestra "Estudiado hace un momento" en su tarjeta; (c)
  autoevaluar una pregunta de desarrollo también lo activa (cubre el segundo
  listener).
- **Contenido**: no aplica; se valida con `astro check` + `astro build`.

## Riesgos / decisiones

- Solo se cubren test y desarrollo (los dos eventos ya existentes); la
  práctica de MongoDB no dispara ninguno de los dos, así que su tarjeta
  nunca mostrará el indicador — coherente con el no-objetivo de la spec.
- `formatLastStudied` no distingue franjas finas más allá de minuto/hora/
  día/mes/año (sin "ayer", "la semana pasada", etc.) para no sobre-diseñar
  un formateador de fechas relativo cuando la issue solo pide "hace X
  días" como ejemplo.
