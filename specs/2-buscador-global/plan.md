# Plan técnico — Buscador global en la topbar

- **Issue**: #2
- **Spec**: ./spec.md
- **Rama**: 2-buscador-global-en-la-topbar-con-resultados-dinámicos-y-página-de-resultados

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Sitio Astro estático ⇒ búsqueda **100% client-side**. Se extrae la lógica pura a
un módulo testeable `src/lib/search.ts` (`buildSearchRecords`, `stripHtml`,
`createSearcher` sobre **Fuse.js**). Un endpoint estático
`src/pages/search-index.json.ts` emite el índice JSON en build a partir de las
colecciones. El buscador es un componente `SearchBox.astro` insertado en la
topbar del `BaseLayout`, que carga el índice de forma perezosa al primer foco. La
granularidad es a nivel de ítem: cada resultado deep-linka a su ancla, generada
en render desde campos ya existentes (`id`, `tema`, `num`). Una página `/buscar`
muestra todos los resultados agrupados por asignatura.

## Ficheros y áreas afectadas

**Nuevos**

- `src/lib/search.ts` — núcleo puro: tipos `SearchRecord`, `buildSearchRecords()`,
  `stripHtml()`, `createSearcher()` (Fuse). Sin dependencias de Astro.
- `src/pages/search-index.json.ts` — `GET` que hace `getCollection()` de las 4
  colecciones + MongoDB y devuelve `buildSearchRecords()` como JSON.
- `src/components/SearchBox.astro` — buscador en topbar (combobox ARIA, panel de
  resultados, teclado, leyenda, modo móvil con icono que despliega).
- `src/pages/buscar.astro` — página de resultados completos agrupados por asignatura.
- `tests/unit/search.test.ts` — unit de la lógica de búsqueda.
- `tests/e2e/buscador.spec.ts` — e2e del flujo de buscador.

**Modificados**

- `src/layouts/BaseLayout.astro` — montar `<SearchBox/>` en `.site-topbar`.
- `src/components/TestQuestion.astro` — `id="q-<id>"` + `scroll-margin-top`.
- `src/components/DesarrolloQuestion.astro` — `id="d-<id>"` + `scroll-margin-top`.
- `src/components/EsquemaTree.astro` — `scroll-margin-top` (ya tiene `id={tema}`).
- `src/components/SoaGuide.astro` — `id="ch-<num>"` por capítulo + activar el
  capítulo según `location.hash` al cargar.
- `package.json` — dependencia `fuse.js`.
- `CLAUDE.md` — nota de arquitectura del buscador.

- Colecciones de contenido afectadas: ninguna (solo lectura).
- Cambios de schema Zod (`src/content/config.ts`): **no**.

## Reutilización

- `url()` y `BASE` de `src/data/site.ts` para construir todas las rutas/anclas.
- `meta()` de `src/data/asignaturas.ts` para nombre/sigla/acento por asignatura.
- Tokens `--site-*` del `BaseLayout` para estilos (claro/oscuro) y estilos de
  tarjeta del home como referencia para `/buscar`.
- `node-html-parser` (ya en devDeps) opcional para `stripHtml`.
- Anclas: `EsquemaTree` ya expone `id={tema}`; el quiz de la guía ya usa `#soa-quiz`.

## Estrategia de test (TDD)

- **Unit (Vitest)** sobre `src/lib/search.ts`:
  - `buildSearchRecords`: `tipoLabel`/`url`/ancla correctos por colección;
    **excepción SOA** (test → `/guia/soa#soa-quiz`); respeta `BASE`; `stripHtml`
    elimina etiquetas.
  - `createSearcher`: casa por nombre y por contenido; **insensible a
    tildes/mayúsculas**; tolera una errata; ordena por relevancia; respeta `limit`.
- **E2E (Playwright)** sobre el preview: escribir → panel con resultados + leyenda;
  ↑/↓ + Enter → navega a ancla; Enter sin selección → `/buscar?q=`; click → navega.
- **Contenido**: `astro check` + `astro build` (Zod falla el build si hay
  contenido inválido; el endpoint JSON se valida al construir).

## Riesgos / decisiones

- **Deep-link a capítulo de guía oculto:** los `.chapter-page` están
  `display:none`; al cargar con hash hay que activar el capítulo antes del scroll.
  Mitigación: handler de hash en `SoaGuide`.
- **Sticky topbar tapa el ancla:** `scroll-margin-top` en los objetivos.
- **Tildes en Fuse:** usar `ignoreDiacritics: true` (Fuse v7) y normalizar la query.
- **Tamaño del índice:** contenido acotado (5 asignaturas); carga perezosa al
  primer foco para no penalizar el first paint.
- **Colisión de anclas:** depende de `id` único por asignatura, ya garantizado por
  la constitución de contenido.
