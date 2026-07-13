# Plan técnico — Modo examen: compartir/reproducir un simulacro vía URL

- **Issue**: #54
- **Spec**: ./spec.md
- **Rama**: 54-shareable-exam-mode-url

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

`buildExamOrder`/`createRng` ya son deterministas: la misma semilla + la misma
configuración (`shuffle`, `subsetSize`) sobre el mismo banco de preguntas
producen siempre el mismo orden. Solo falta serializar esos tres datos (+
`timed`/`minutes`, que no afectan al orden pero sí a la reproducción de la
config) como parámetros de la URL. Se añaden dos funciones puras en
`exam-mode.ts` (`serializeSharedExam`/`parseSharedExam`, mismo patrón que
`serializeExamConfig`/`parseExamConfig`). En `/practica/<asignatura>`:
`startExam()` pasa a aceptar una semilla explícita (por defecto `Date.now()`,
así que el arranque normal no cambia) y, tras arrancar, escribe los parámetros
en la URL con `history.replaceState` (sin recargar ni añadir entradas al
historial); al salir del examen, los limpia. Al cargar la página, si la URL
trae `exam=<seed>`, se aplican esos valores a los controles del panel y se
arranca automáticamente el simulacro con esa semilla — reproduciendo el mismo
orden en cualquier navegador. Un botón "Copiar enlace del simulacro" (visible
solo con el examen activo) copia `location.href` al portapapeles como atajo;
la URL de la barra de direcciones ya es compartible sin él.

## Ficheros y áreas afectadas

- `src/lib/exam-mode.ts` — añade `SharedExamState`,
  `serializeSharedExam(state): URLSearchParams` y
  `parseSharedExam(params): SharedExamState | null` (parseo defensivo: sin
  `exam` o semilla no numérica -> `null`).
- `src/pages/practica/[asignatura].astro` — botón nuevo
  `data-exam-share` junto a `data-exam-exit`; `startExam(seed = Date.now())`
  ahora recibe la semilla y actualiza la URL tras arrancar; `exitExam()` limpia
  los parámetros de la URL y oculta el botón de compartir; al cargar, si
  `parseSharedExam(new URLSearchParams(location.search))` devuelve algo, aplica
  esa configuración a los controles, abre el panel `data-exam-panel` y llama a
  `startExam(shared.seed)`.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- `createRng`, `buildExamOrder` ya existentes y testeados — no se toca su
  lógica, solo se expone la semilla que ya se generaba internamente.
- Patrón de `serialize*/parse*` defensivo ya usado por `serializeExamConfig`/
  `parseExamConfig` (mismo fichero) y por `practica-stats.ts`/
  `desarrollo-progress.ts`.
- Patrón `history.replaceState` + `URLSearchParams` ya usado por
  `index.astro` (`?tipo=`) y `buscar.astro` (`?q=`) para mantener el estado
  compartible en la URL sin recargar.

## Estrategia de test (TDD)

- **Unit (Vitest)**: se amplía `tests/unit/exam-mode.test.ts` con
  `serializeSharedExam()`/`parseSharedExam()` — round-trip completo; sin
  parámetro `exam` -> `null`; semilla no numérica -> `null`; `shuffle`/`timed`
  ausentes en los params se interpretan como `false`; `subsetSize` ausente ->
  `null`.
- **E2E (Playwright)**: se amplía `tests/e2e/exam-mode.spec.ts` — iniciar un
  simulacro con barajado + subconjunto dejará parámetros `exam`/`shuffle`/
  `subset` en la URL; abrir esa URL en un contexto de navegador nuevo (aislado,
  simulando "otro dispositivo") reproduce exactamente el mismo orden de
  preguntas visibles y la misma configuración marcada en los controles; salir
  del modo examen limpia esos parámetros de la URL.
- **Contenido**: no aplica (no toca `src/content/`); se valida con `astro
check` + `astro build` por higiene general.

## Riesgos / decisiones

- No se comparte el estado de respuestas/corrección, solo la configuración que
  genera el orden — mantiene el alcance acotado a lo que pide la issue.
- `history.replaceState` (no `pushState`) evita ensuciar el historial del
  navegador con una entrada por cada inicio/salida de simulacro, igual que ya
  hacen los filtros de `index.astro`/`buscar.astro`.
- El botón "Copiar enlace" es un atajo de `navigator.clipboard`; si falla (p.
  ej. permisos), la URL de la barra de direcciones sigue siendo válida como
  vía alternativa, así que no hace falta gestionar el error de forma especial.
