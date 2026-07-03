# Tasks — Minimap: el FAB «Mapa» solapa filtros en móvil y la etiqueta «mapa» del rail se ve mal en algunos casos

- **Issue**: #29
- **Plan**: ./plan.md

> Cada tarea es **atómica** y produce **un commit** (Conventional Commits, con
> `(refs #29)`). Orden TDD: primero el test que falla, luego la implementación
> mínima, luego refactor. Marca `[x]` al completar.

## Tareas

- [ ] **T1 — Helper puro `computeFabBottom()`**
  - Test (rojo): `tests/unit/minimap.test.ts` — nuevos casos: sin colisión
    (obstáculo fuera del viewport arriba/abajo, o inexistente) devuelve el
    `bottom` por defecto; obstáculo que invade la zona del FAB devuelve un
    `bottom` mayor calculado exactamente; caso límite (hueco == lo necesario)
    devuelve el valor por defecto.
  - Implementación (verde): añadir `computeFabBottom()` a
    `src/lib/minimap.ts`, función pura sin DOM (recibe números/rects simples).
  - Refactor: si aplica, ajustar nombres/comentario para claridad.
  - Commit: `feat(minimap): add computeFabBottom collision helper (refs #29)`

- [ ] **T2 — Reposicionar el FAB dinámicamente en `Minimap.astro`**
  - Test (rojo): `tests/e2e/minimap.spec.ts` — nuevo test en `/practica/si` a
    375×812 sin hacer scroll: ningún `.filter-btn` se solapa con `.mm-fab`
    (bounding boxes vía `page.evaluate`).
  - Implementación (verde): referencia a `.mm-fab` en el `<script>`, invocar
    `computeFabBottom()` desde el listener de `scroll` existente y desde
    `rebuild()`, fijando `fabEl.style.bottom` (o `removeProperty` si no hace
    falta ajuste).
  - Refactor: si aplica.
  - Commit: `feat(minimap): keep the FAB clear of the tema filter chips (refs #29)`
  - Verificación de no-regresión: los tests existentes que hacen clic en
    `.mm-fab` sin scroll previo (`tests/e2e/minimap.spec.ts`) deben seguir
    pasando sin modificarlos — confirma que el FAB sigue siempre visible y
    funcional.

- [ ] **T3 — Quitar el literal «mapa» del rail**
  - Test (rojo): `tests/e2e/minimap.spec.ts` — nuevo test en `>=1240px`:
    `getComputedStyle(rail, '::before').content` es `'none'` (o vacío), y el
    `<nav class="mm-rail">` conserva `aria-label="Minimapa de navegación"`.
  - Implementación (verde): eliminar la regla `.mm-rail::before` de
    `src/components/Minimap.astro`.
  - Refactor: si aplica.
  - Commit: `fix(minimap): remove the "mapa" literal from the rail (refs #29)`

## Verificación final (Gate B)

- [ ] `astro check` sin errores
- [ ] `npm test` en verde
- [ ] `npm run build` + `npm run test:e2e` en verde
- [ ] Cada criterio de aceptación de `spec.md` comprobado
