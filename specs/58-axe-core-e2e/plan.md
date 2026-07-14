# Plan técnico — Añadir comprobación de accesibilidad automatizada (axe-core) a la suite E2E

- **Issue**: #58
- **Spec**: ./spec.md
- **Rama**: 58-axe-core-e2e

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Escaneo previo (resuelve la duda abierta de la spec)

Se instaló `@axe-core/playwright` y se ejecutó un escaneo puntual (descartado,
no forma parte de los commits) contra las 6 páginas del alcance, ya
construidas (`npm run build` + preview real). Hallazgos reales:

- **`region` (moderate)** — en **las 6 páginas**: el contenido de la topbar
  (`.site-brand`, `.site-doc-title`, `.site-home`) no está contenido en
  ningún landmark (`.site-topbar` es un `<div>` suelto, no un `<header>`).
  Mismo origen en las 6 páginas (`BaseLayout.astro`, compartido).
- **`color-contrast` (serious)** — en `/guia/soa`: `.soa-chip-badge` y
  `.key-box .box-label`; en `/practica/mongodb`: `.eyebrow` y los badges
  `.pct`.
- **`heading-order` (moderate)** — en `/practica/mongodb`: el `<h3>` de
  `.coll.card` salta un nivel.

Por alcance (`spec.md`, no-objetivos), **no se arregla ninguno aquí**: se
documentan como excepciones puntuales (regla + página, no la categoría
entera) y se abre una issue nueva por cada hallazgo real para su propio
ciclo SDD.

## Enfoque

- Dependencia: `@axe-core/playwright` (ya instalada durante el escaneo).
- `tests/e2e/a11y.spec.ts`: un test por página
  (`/`, `/practica/si`, `/esquemas/si`, `/guia/soa`, `/buscar`,
  `/practica/mongodb`), cada uno ejecuta
  `new AxeBuilder({ page }).analyze()` y compara `violations` contra una
  lista de excepciones conocidas **por regla y por página** (no una
  supresión global de la regla). Cualquier violación no documentada hace
  fallar el test.
- Helper `filterKnownViolations(violations, known)` en el propio fichero de
  test (lógica pequeña y específica de este test, no se extrae a
  `src/lib`).

## Ficheros y áreas afectadas

- `package.json`/`package-lock.json` — nueva `devDependency`.
- `tests/e2e/a11y.spec.ts` (nuevo).
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- `BASE` de `src/data/site.ts`, mismo patrón de navegación que el resto de
  la suite E2E.

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica.
- **E2E (Playwright)**: es la propia tarea — `tests/e2e/a11y.spec.ts`,
  6 tests (uno por página). Rojo inicial: mismo test sin la lista de
  excepciones, falla con los 3 hallazgos reales de arriba. Verde: con las
  excepciones documentadas (regla + página + referencia a la issue de
  seguimiento correspondiente).
- **Contenido**: no aplica.

## Riesgos / decisiones

- **Excepciones acotadas, no globales**: cada excepción se filtra por
  `ruleId` **dentro del test de esa página concreta**, nunca en la
  configuración global de axe ni deshabilitando la regla para todo el
  sitio — así una violación nueva de esa misma regla en otra página sí
  haría fallar el test.
- **3 issues de seguimiento nuevas** (una por hallazgo real, no por
  página): landmark de la topbar (sitewide), contraste de color (guía SOA +
  MongoDB), orden de encabezados (MongoDB). Se crean antes de cerrar esta
  issue para poder referenciar su número exacto en los comentarios del
  test.
