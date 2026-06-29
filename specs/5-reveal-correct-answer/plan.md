# Plan técnico — Botón por pregunta de test que revela la opción correcta y se oculta a los 5s

- **Issue**: #5
- **Spec**: ./spec.md
- **Rama**: 5-reveal-correct-answer

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Se añade un **botón por pregunta** dentro del `<fieldset>` de `TestQuestion.astro`.
Al pulsarlo, un handler delegado (en el mismo `<script>` ya incluido una sola vez por
página) resalta la(s) opción(es) correcta(s) y muestra la explicación, y programa un
`setTimeout` de **5000 ms** que lo revierte. El botón vive en el template (no se crea
por JS), así que los `<style>` _scoped_ de Astro le aplican sin `is:global`. Se
reutiliza el estado ya existente del componente —`data-correct`, las clases `.tq-opt`,
la `.tq-exp[hidden]` y el patrón de listener delegado en `document`— sin tocar el botón
global «Corregir test» ni el evento `tq:graded`.

## Ficheros y áreas afectadas

- `src/components/TestQuestion.astro` — (1) markup: `<button data-reveal-trigger>` en un
  `.tq-actions` tras `.tq-opts`; (2) estilos scoped: `.tq-reveal`, `.tq-opt.revealed`
  (verde, reutilizando `--site-ok`/`--site-ok-soft`), `.tq-exp.revealed` y
  `.tq.graded .tq-reveal { display:none }`; (3) script: handler de `[data-reveal-trigger]`
  con `WeakMap<HTMLElement, number>` para reiniciar el timer en re-clic y `aria-pressed`.
- `src/pages/practica/[asignatura].astro` — opcional: añadir una frase al `.block-desc`
  mencionando el botón de revelar por pregunta. Sin cambios en la lógica de `tq:graded`.
- Colecciones de contenido afectadas: **ninguna** (no se toca `src/content/`).
- Cambios de schema Zod (`src/content/config.ts`): **no**.

## Reutilización

- `data-correct` (JSON de índices) y `.tq-opt input[value]` ya presentes — misma fuente
  que usa `gradeAll()`.
- `.tq-exp[hidden]` (explicación) ya existe; el revelado solo alterna su `hidden`.
- Patrón de listener delegado en `document` (el de `[data-grade-trigger]`) — se añade
  un segundo `if` para `[data-reveal-trigger]`.
- Tokens de color `--site-ok` / `--site-ok-soft` definidos en `BaseLayout.astro`.

## Estrategia de test (TDD)

- **E2E (Playwright)** en `tests/e2e/practica.spec.ts` (nuevo), contra `/practica/si`
  (q1: single, `correct:[0]`, con `explicacion`):
  - Click en «Ver respuesta» → la `.tq-opt` correcta tiene clase `revealed` y la
    `.tq-exp` es visible (criterio 1).
  - Tras esperar >5 s → `revealed` desaparece y `.tq-exp` vuelve a estar oculta
    (criterio 2).
  - Tras pulsar el global «Corregir test», el botón `[data-reveal-trigger]` no está
    visible (criterio 4).
- **Unit (Vitest)**: no aplica — la lógica vive en el `<script>` del componente Astro
  (igual que la corrección global actual, no extraída a `src/lib`). No se introduce
  módulo nuevo testeable sin sobre-ingeniería.
- **Contenido**: `astro check` + `astro build` siguen validando el Zod (sin cambios).
- **Criterio 3** (reinicio de timer en re-clic): cubierto por implementación
  (`WeakMap` con `clearTimeout`) y verificación visual con `preview_*`; no se fuerza un
  e2e con doble espera de 5 s para no introducir flakiness.

## Riesgos / decisiones

- **Espera de 5 s en e2e**: hace el test más lento pero es determinista; se usa
  `waitForTimeout`/`expect(...).toBeHidden()` con margen.
- **Solape con la corrección global**: si la pregunta ya está `.graded`, el botón se
  oculta por CSS y el handler no actúa, evitando estados contradictorios (verde temporal
  vs. correcto/incorrecto permanente).
