# Plan técnico — Móvil: la topbar crece y se aprieta cuando el docTitle es largo

- **Issue**: #31
- **Spec**: ./spec.md
- **Rama**: 31-topbar-doctitle-mobile-overflow

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Investigación previa

`.site-topbar` (`src/layouts/BaseLayout.astro`) es un flex row: brand,
`.site-doc-title`, `<SearchBox />`, `.site-spacer` (`margin-right: auto`),
enlace «← Inicio» (si `home`), toggle de tema. No hay `flex-wrap` explícito
(el valor por defecto ya es `nowrap`) ni manejo de anchura en
`.site-doc-title` (`font-size:13px; font-weight:600; opacity:.82`, sin más).

Reproducido en el preview a 375px en `/practica/mongodb` (el `docTitle` más
largo: `"MongoDB · Práctica"`): el texto de `.site-doc-title` envuelve dentro
de su `<span>` a dos líneas, lo que crece `.site-topbar` de alto (~54px →
~66.5px). La causa no es la longitud del texto en sí, sino que un `<span>`
dentro de un flex item por defecto tiene `min-width: auto` (= su
`min-content`, que para texto sin `white-space:nowrap` es la palabra más
larga) — al no caber en el ancho restante, el texto envuelve, y el flex
container crece para acomodar la altura del hijo más alto. `SearchBox` ya se
colapsa a un icono `<820px` (`SearchBox.astro`), así que en móvil el hueco
disponible para `.site-doc-title` es pequeño incluso con brand corto.

## Enfoque

Truncar `.site-doc-title` con ellipsis en vez de dejarlo envolver, usando el
patrón estándar de flexbox para texto truncable: `white-space: nowrap;
overflow: hidden; text-overflow: ellipsis;` más `min-width: 0` (imprescindible
— sin esto el flex item no se encoge por debajo de su `min-content`, que para
`nowrap` es el ancho completo del texto, y el truncado nunca llegaría a
activarse). No se usa un breakpoint con un ancho mágico: al ser una regla de
flexbox pura, solo trunca cuando el espacio disponible es realmente
insuficiente, sea cual sea el ancho exacto del viewport — en desktop, donde
sobra espacio, el texto se sigue viendo completo y sin cambios visuales.

## Ficheros y áreas afectadas

- `src/layouts/BaseLayout.astro` — regla CSS de `.site-doc-title` (dentro del
  bloque `<style is:global>` ya existente para la topbar).
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- No se toca `SearchBox.astro` (su colapso a icono en `<820px` ya reduce la
  presión sobre el espacio disponible; se reutiliza tal cual).
- Mismo bloque de estilos de topbar ya existente en `BaseLayout.astro`; no se
  crean componentes ni media queries nuevas.

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica — es una regla CSS pura, sin lógica que testear
  con Vitest.
- **E2E (Playwright)**: nuevo `tests/e2e/topbar-doctitle.spec.ts` —
  - a 375px en `/practica/mongodb` (el `docTitle` más largo del sitio), la
    altura de `.site-topbar` coincide con la altura de referencia sin
    envoltorio (una sola línea) — se compara contra la altura en una página
    sin `docTitle` (home, `/`) en el mismo viewport;
  - en ese mismo viewport, el buscador (icono), el enlace «Inicio» y el
    toggle de tema siguen siendo visibles y clicables;
  - en un viewport de escritorio, la altura de la topbar no cambia respecto
    al comportamiento actual.
- **Contenido**: no aplica (no hay cambios en `src/content/`).

## Riesgos / decisiones

- **Sin breakpoint explícito**: se decide no fijar un `max-width` numérico
  para `.site-doc-title` ni una media query — el ajuste vía flexbox
  (`min-width:0` + ellipsis) reacciona al espacio real disponible en
  cualquier combinación de ancho de viewport/longitud de `docTitle`/idioma,
  evitando un valor mágico que habría que re-ajustar si cambia el contenido
  de la topbar en el futuro.
