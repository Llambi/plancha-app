# Plan técnico — Minimap: el FAB «Mapa» solapa filtros en móvil y la etiqueta «mapa» del rail se ve mal en algunos casos

- **Issue**: #29
- **Spec**: ./spec.md
- **Rama**: 29-minimap-fab-overlap-rail-label

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Investigación previa

Reproducido en el preview (`/practica/si`, viewport 375×812, sin scroll):
`.mm-fab` ocupa `top:759 bottom:796 left:271.8 right:359`; los chips de
`.tema-filters` envuelven a 2 filas (`top:754.7-787.7` y `795.7-828.7`) y **T4,
T9, T10** intersecan con el FAB — coincide exactamente con lo reportado en la
issue. La causa es que `.mm-fab` es `position: fixed` (ancla a la esquina del
viewport) mientras que `.tema-filters` es contenido normal del flujo del
documento: cuando la altura del contenido de cabecera (badge, panel de
estadísticas, panel de modo examen) sitúa los chips justo en el borde inferior
del viewport inicial (sin haber hecho scroll), ambos coinciden en pantalla.

## Decisión de diseño (FAB)

Se valoraron dos opciones:

- **(A) Reposicionar dinámicamente el FAB** (elegida): en scroll/resize, si
  `.tema-filters` invade la zona que el FAB necesita, se sube el FAB
  (`bottom` dinámico) lo justo para dejar de solaparse; en cualquier otro caso
  usa su posición por defecto (`bottom: 16px`). El FAB **nunca se oculta ni dejar
  de ser clicable**.
- **(B) Ocultar/desvanecer el FAB hasta que el usuario haga scroll** más allá
  de la cabecera. Más simple de implementar, pero **cambia el comportamiento
  actual** (el FAB deja de estar disponible nada más cargar la página) y
  **rompe 3 tests e2e existentes** en `tests/e2e/minimap.spec.ts` que hacen
  `page.locator('.mm-fab').click()` justo tras `page.goto()`, sin hacer scroll
  antes — además de chocar con el criterio de aceptación 2 de la spec ("el FAB
  sigue siendo accesible y funcional tras el cambio").

Se descarta (B) y se implementa (A): reposicionamiento dinámico, sin ocultar
nunca el FAB, reutilizando el listener de `scroll` que el componente ya tiene
(`updateViewport()`/`updateActiveMarkers()`) para no añadir un segundo
listener.

## Enfoque

1. **FAB vs. filtros**: nueva función pura `computeFabBottom()` en
   `src/lib/minimap.ts` que, dadas las coordenadas del posible obstáculo
   (`.tema-filters`, vía `getBoundingClientRect()`) y las del FAB, devuelve el
   valor de `bottom` (px) a aplicar: el valor por defecto si no hay colisión,
   o un valor mayor que despeje el obstáculo con un pequeño margen. Sin
   colisión (obstáculo fuera del viewport, o `.tema-filters` inexistente en la
   página — p. ej. `/esquemas/*`) devuelve siempre el valor por defecto.
   `Minimap.astro` la invoca en el listener de `scroll` ya existente y en
   `rebuild()` (carga inicial/resize), fijando `fabEl.style.bottom` (o
   quitándolo para volver al valor CSS por defecto).
2. **Etiqueta «mapa» del rail**: eliminar la regla `.mm-rail::before` (el
   `content: 'mapa'` y sus reglas de posicionamiento) de `Minimap.astro`. El
   `<nav class="mm-rail" aria-label="Minimapa de navegación">` ya es
   identificable sin ese literal.

## Ficheros y áreas afectadas

- `src/lib/minimap.ts` — nueva función pura `computeFabBottom()`.
- `src/components/Minimap.astro` — referencia a `.mm-fab`, invocación de
  `computeFabBottom()` desde el listener de scroll y desde `rebuild()`;
  eliminación de la regla `.mm-rail::before`.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- Listener de `scroll` ya existente en `Minimap.astro` (junto a
  `updateViewport()`/`updateActiveMarkers()`) — se añade la llamada ahí, sin
  crear un segundo listener.
- `rebuild()` (ya se invoca en carga inicial, resize y cambios de contenido)
  — se añade la llamada ahí para la posición inicial correcta.
- Atributo `data-tema-filters` ya presente en
  `src/pages/practica/[asignatura].astro` — se usa tal cual como selector, sin
  añadir uno nuevo ni acoplar `Minimap.astro` a clases específicas de esa
  página más allá de ese data-attribute.
- Patrón núcleo-puro-testeable + wiring en `<script>` ya usado por
  `src/lib/minimap.ts` (pines, labels) y `src/lib/desarrollo-progress.ts`.

## Estrategia de test (TDD)

- **Unit (Vitest)**: `tests/unit/minimap.test.ts` — casos para
  `computeFabBottom()`: sin obstáculo (`.tema-filters` no presente) devuelve el
  valor por defecto; obstáculo fuera del viewport (arriba o abajo del todo)
  devuelve el valor por defecto; obstáculo que invade la zona del FAB devuelve
  un `bottom` mayor, exactamente el necesario para despejarlo con el margen
  configurado; caso límite en que el hueco disponible iguala justo lo
  necesario devuelve el valor por defecto (no hay colisión real).
- **E2E (Playwright)**: extiende `tests/e2e/minimap.spec.ts` —
  - en `/practica/si` a 375×812 sin hacer scroll, ningún `.filter-btn` se
    solapa con `.mm-fab` (comparación de `getBoundingClientRect()`);
  - el FAB sigue abriendo el drawer tras el reposicionamiento (reutiliza el
    patrón ya usado en los tests existentes que hacen clic en `.mm-fab` sin
    hacer scroll antes — deben seguir pasando sin cambios, prueba de que no se
    rompe la disponibilidad del FAB);
  - el rail (`>=1240px`) ya no muestra el literal «mapa»
    (`getComputedStyle(railEl, '::before').content` es `'none'` o vacío) y
    conserva su `aria-label="Minimapa de navegación"`.
- **Contenido**: no aplica (no hay cambios en `src/content/`).

## Riesgos / decisiones

- **`FAB_DEFAULT_BOTTOM` debe coincidir con el `bottom: 16px` del CSS de
  `.mm-fab`.** Es un valor duplicado (uno en CSS, otro en el script) porque el
  script necesita conocer el valor por defecto para poder volver a él; se deja
  comentado en el código para que quede claro que ambos deben mantenerse en
  sincronía si se cambia el CSS.
- **Alcance del reposicionamiento**: solo actúa cuando existe
  `[data-tema-filters]` en la página (asignaturas con test); en `/esquemas/*`
  o asignaturas sin preguntas tipo test, el FAB mantiene siempre su posición
  por defecto.
