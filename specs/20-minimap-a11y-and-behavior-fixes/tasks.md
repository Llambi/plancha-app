# Tasks — Minimap: fallos de accesibilidad por teclado y de comportamiento (filtro «solo mis fallos», coloreado sin responder)

- **Issue**: #20
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #20)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [x] **T1 — No marcar como fallo una pregunta sin responder**
  - Test (rojo): `tests/unit/minimap.test.ts` — `describe('gradeMark()')`:
    `gradeMark([0], [])` → `null`; `gradeMark([0], [0])` → `'ok'`;
    `gradeMark([0], [1])` → `'bad'`. También se **corrige** el test e2e
    "grading colors the rail ticks and drawer rows to match the actual
    result" en `tests/e2e/minimap.spec.ts` para marcar explícitamente una
    pregunta como fallo (en vez de dejarla sin responder) y afirmar que las
    no respondidas no llevan clase `ok`/`bad`.
  - Implementación (verde): añade `gradeMark(correct, picked): 'ok'|'bad'|null`
    a `src/lib/minimap.ts` (usa `isCorrectPick` internamente; `null` si
    `picked` está vacío). `resultFor()` en `Minimap.astro` lo usa en vez de
    llamar a `isCorrectPick` directamente.
  - Refactor: ninguno adicional.
  - Commit: `fix(minimap): don't mark unanswered questions as failed (refs #20)`

- [x] **T2 — El minimap respeta el filtro «Solo mis fallos»**
  - Test (rojo): nuevo test e2e en `tests/e2e/minimap.spec.ts` — corrige el
    test dejando algunas preguntas sin responder y otras falladas, activa
    «Solo mis fallos» y afirma que `.mm-tick`/`.mm-lrow` solo existen para las
    preguntas que siguen visibles (falladas); lo desactiva y afirma que
    reaparecen todas.
  - Implementación (verde): `collectAnchors()` en `Minimap.astro` excluye
    elementos con `.hidden` (propiedad IDL nativa, ya usada por el filtro en
    `[asignatura].astro`); `applyFailedFilter()` en
    `src/pages/practica/[asignatura].astro` emite
    `document.dispatchEvent(new CustomEvent('practica:filter-changed'))` tras
    aplicar el filtro; `Minimap.astro` añade
    `document.addEventListener('practica:filter-changed', () => rebuild())`.
  - Refactor: ninguno.
  - Commit: `fix(minimap): hide filtered-out questions from the rail/drawer (refs #20)`

- [x] **T3 — Ticks del rail y filas del drawer operables por teclado**
  - Test (rojo): nuevo test e2e — enfoca directamente un `.mm-tick` (y,
    aparte, una `.mm-lrow` con el drawer abierto en viewport móvil) y pulsa
    `Enter`; afirma que `window.scrollY` cambia igual que con un click.
    Además afirma que ambos tienen `role="button"` y `aria-label` no vacío.
  - Implementación (verde): al construir cada tick/fila en
    `buildRail()`/`buildDrawer()`, añade `tabIndex = 0`,
    `role="button"`, `aria-label = a.label`. Extrae la lógica de "activar una
    ancla desde un tick/fila" (hoy duplicada dentro del listener de `click`)
    a una función compartida y añade un listener de `keydown` a nivel de
    documento que, para `Enter`/`Espacio` sobre un tick o fila, llama a la
    misma función (con `preventDefault` para no hacer scroll de página con
    Espacio). Añade `:focus-visible` a `.mm-tick`/`.mm-lrow`/`.mm-prow`.
  - Refactor: consolidar el `if (target.closest(...))` del listener de click
    y el nuevo de keydown sobre la función compartida.
  - Commit: `feat(minimap): make rail ticks and drawer rows keyboard-operable (refs #20)`

- [x] **T4 — El drawer gestiona el foco (trampa + retorno + Escape)**
  - Test (rojo): nuevo test e2e — abre el drawer (viewport móvil) y afirma
    que `document.activeElement` queda dentro de `.mm-drawer`; enfoca el
    último elemento focusable del drawer y pulsa `Tab`, afirma que el foco
    vuelve al primero (trampa); pulsa `Escape`, afirma que el drawer se
    cierra y el foco vuelve al botón «Mapa» que lo abrió.
  - Implementación (verde): en el toggle de apertura, guarda
    `document.activeElement` antes de añadir `mm-open` y mueve el foco a
    `.mm-x` (botón de cerrar); en el cierre (toggle, Escape, o clic en una
    fila), restaura el foco al elemento guardado. El listener de `keydown` ya
    existente gana: `Escape` cierra el drawer si está abierto; `Tab`/`Shift+Tab`
    mientras el drawer está abierto quedan atrapados dentro de sus elementos
    focusables (envolviendo del último al primero y viceversa).
  - Refactor: ninguno adicional.
  - Commit: `feat(minimap): trap focus in the drawer and restore it on close (refs #20)`

- [x] **T5 — El botón de fijar expone su estado (`aria-pressed`)**
  - Test (rojo): nuevo test e2e — fija una tarjeta y afirma
    `aria-pressed="true"` en su `[data-mm-pin]`; la desfija y afirma
    `aria-pressed="false"`; recarga con un pin persistido y afirma que nace
    ya con `aria-pressed="true"` (sin necesitar interacción).
  - Implementación (verde): `PinButton.astro` renderiza `aria-pressed="false"`
    por defecto (mismo patrón que `tq-reveal` en `TestQuestion.astro`); el
    botón inyectado en `ensureSubAnchors()` también nace con
    `aria-pressed="false"`; en `Minimap.astro`, `rebuild()` y `togglePin()`
    sincronizan `aria-pressed` en los botones `[data-mm-pin]` de cada ancla
    junto con la clase `.pinned`.
  - Refactor: ninguno.
  - Commit: `fix(minimap): expose pinned state via aria-pressed (refs #20)`

## Verificación final (Gate B)

- [x] `npm run check` sin errores
- [x] `npm test` en verde (61/61)
- [x] `npm run build` + `npm run test:e2e` en verde (25/25, incluida toda la
      suite existente — sin regresiones)
- [x] Cada criterio de aceptación de `spec.md` comprobado (ver tabla en el
      resumen de entrega)
