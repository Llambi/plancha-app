# Plan técnico — El contenido de la topbar no está contenido en ningún landmark (axe: region)

- **Issue**: #77
- **Spec**: ./spec.md
- **Rama**: 77-topbar-header-landmark

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Cambio de una sola etiqueta: `<div class="site-topbar">` → `<header
class="site-topbar">` en `BaseLayout.astro` (y su cierre correspondiente). Al
ser hijo directo de `<body>`, un `<header>` obtiene implícitamente
`role="banner"`, que es un landmark reconocido por axe-core para la regla
`region`. El selector CSS `.site-topbar` no cambia, así que no hay ningún
efecto visual. Se comprueba con un test E2E de accesibilidad dedicado (rol
`banner` presente y conteniendo el contenido esperado) antes de retirar la
excepción de `a11y.spec.ts`.

## Ficheros y áreas afectadas

- `src/layouts/BaseLayout.astro` — la apertura/cierre de `.site-topbar` pasa de
  `<div>`/`</div>` a `<header>`/`</header>`.
- `tests/e2e/a11y.spec.ts` — se retira `topbarLandmark` de las 6 entradas de
  `knownExceptions` (queda el objeto sin usar si ninguna página lo referencia;
  se borra también su definición).
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod: no.

## Reutilización

No aplica — es un único cambio de etiqueta en un fichero ya existente, sin
lógica nueva que extraer a `src/lib`.

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica (no hay lógica pura nueva).
- **E2E (Playwright)**: nuevo test en `tests/e2e/topbar-doctitle.spec.ts` (ya
  existe y cubre otras propiedades de la topbar) o un test dedicado que
  compruebe `getByRole('banner')` contiene `.site-brand`/`.site-home`/el
  toggle de tema. Además, tras el cambio, la suite `a11y.spec.ts` deja de
  reportar la regla `region` sin necesidad de excepción — esa es la
  verificación de fondo.
- **Contenido**: no aplica.

## Riesgos / decisiones

- Riesgo: un `<header>` con `display` distinto al `<div>` original podría
  alterar el layout. Mitigado porque el CSS ya aplicado (`.site-topbar { ...
}`) no depende de la etiqueta, solo de la clase — se verifica visualmente
  con los tools de preview tras el cambio.
- Decisión: no se envuelve además en `<nav>` para los enlaces — el issue y la
  regla `region` solo piden un landmark contenedor; `.site-home` y
  `.site-brand` son enlaces sueltos, no una navegación estructurada, así que
  `banner` es la semántica correcta (no `navigation`).
