# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

**PlanchaAPP** — exam study materials (in Spanish), built as a static **Astro**
site. The home lists content by subject; every item is one of two categories:
**práctica de examen** (test questions + open-ended "desarrollo") or **esquema de
estudio** (theory: hierarchical outlines, plus one rich paginated guide). Content
is authored as files under `src/content/` and the static site is generated at build.

Deploys to **GitHub Pages** under `https://portfolio.llambi.dev/plancha-app`, so
the site is served from the base path `/plancha-app` (see `src/data/site.ts`).

## Running locally

```bash
npm install
npm run dev               # dev server (http://localhost:4321)
npm run build             # generates dist/
npm run preview           # serves the built dist/

npm test                  # unit tests (Vitest)
npm run test:e2e          # e2e smoke (Playwright, sobre el preview)
npm run test:all          # lint + format + check + unit + build + e2e

docker compose up -d --build   # builds Astro + serves at http://localhost:8080
docker compose down
```

> Dev-server note: Astro caches the content layer. After adding/editing files
> under `src/content/`, restart `npm run dev` if changes don't appear. The
> production build is unaffected.

## Architecture

- **Astro, output `static`.** Shared shell in `src/layouts/BaseLayout.astro`
  (topbar, light/dark theme via `localStorage('site-theme')`, `--site-*` tokens,
  a11y). All pages extend it. Per-subject metadata (name, accent) in
  `src/data/asignaturas.ts`.
- **Content Collections** (`src/content/config.ts`, Zod-validated):
  - `esquemas/` — Markdown; frontmatter (`asignatura, tema, num, titulo, clave, orden`) + body = nested Markdown lists (the tree). Rendered by `EsquemaTree`.
  - `test/` — one YAML file per subject; array of questions
    (`type: single|multi`, `options`, `correct` as 0-based index array,
    `explicacion?`, `apariciones?`). Rendered by `TestQuestion`.
  - `desarrollo/` — Markdown; frontmatter (`enunciado`, `titulo?`, `kind`) + body
    = model answer (HTML). Rendered by `DesarrolloQuestion`.
  - `guia/` — Markdown; body = raw chapter HTML rendered with `set:html`
    (paginated guide). Rendered by `SoaGuide`.
- **Pages** (`src/pages/`): `index.astro` (listado filtrable), `esquemas/[asignatura]`,
  `practica/[asignatura]`, `guia/[asignatura]`, `practica/mongodb.astro`
  (custom interactive validator, component `MongoPractica`) and `buscar.astro`
  (página de resultados de búsqueda).
- **Routing/base**: internal links use `BASE` from `src/data/site.ts` so they
  don't break under the `/plancha-app` subpath; `astro.config.mjs` imports the
  same `BASE`/`SITE`. Don't hardcode absolute `/...` links.
- **Buscador global** (client-side, sitio estático): núcleo puro y testeable en
  `src/lib/search.ts` (`buildSearchRecords` → un registro por ítem con su
  deep-link; `createSearcher` envuelve **Fuse.js**, insensible a tildes/erratas).
  El índice se genera en build vía el endpoint `src/pages/search-index.json.ts`
  (`/plancha-app/search-index.json`) y se carga de forma perezosa. UI:
  `SearchBox.astro` (en la topbar del `BaseLayout`, combobox ARIA con teclado
  ↑/↓/Enter/Esc y modo móvil) + página `buscar.astro` (resultados agrupados por
  asignatura). Los resultados deep-linkan a anclas derivadas de campos existentes:
  `#q-<id>` (test), `#d-<id>` (desarrollo), `#<tema>` (esquema), `#<chapter>` o
  `#soa-quiz` (guía). Los componentes solo añaden `id`/`scroll-margin-top`; no se
  toca el contenido. Las opciones se crean por JS, así que sus estilos van en
  bloques `is:global` namespaced (Astro no scopea elementos creados en runtime).

### Patterns & gotchas

- **Astro scopes `<style>`.** Scoped styles do **not** apply to elements created at
  runtime via JS (`createElement`/`innerHTML`): they don't get the scope attribute.
  Put their CSS in a `<style is:global>` block **namespaced** under a root class
  (e.g. `.searchbox .sb-opt { … }`). The search dropdown is the reference.
- **Deep-link anchors.** Derive anchors from fields the content already has; give
  the target an `id` **and** `scroll-margin-top` so the sticky topbar doesn't cover
  it. JS-paginated views (e.g. `SoaGuide`) must read `location.hash` on load and
  **activate** the right section before scrolling (sections are `display:none`).
- **Dynamic data on a static site.** Generate a JSON endpoint at build
  (`src/pages/*.json.ts` with `export const GET`) and **lazy-fetch** it client-side.
  The search index (`search-index.json.ts` + `src/lib/search.ts`) is the pattern.
- **Internal links** always go through `BASE`/`url()` from `src/data/site.ts`; never
  hardcode absolute `/...` paths (they break under the `/plancha-app` subpath).

### Testing

- **Unit (Vitest)** in `tests/unit/` — pure logic (`src/lib`, `src/data`, schemas).
  `vitest.config.ts` uses `getViteConfig` so tests can import `astro:content`.
- **E2E (Playwright)** in `tests/e2e/` — runs against `build && preview`. First run
  on a machine needs `npx playwright install chromium`.
- **UI changes**: verify with the `preview_*` tools (snapshot/click/screenshot) and
  share the proof; don't ask the user to check manually.

## Conventions

Normativa completa en
[`.claude/rules/convenciones-codigo-y-git.md`](.claude/rules/convenciones-codigo-y-git.md).
En resumen:

- **Idioma del código**: código nuevo y comentarios **en inglés**, **salvo el
  vocabulario de dominio** (`asignatura, esquema, desarrollo, practica, guia, tema,
clave, num, orden, oficial, apariciones`…), que se mantiene en **español** porque
  define rutas, claves YAML y el esquema Zod. No se renombra lo existente.
- **Contenido y UI**: en **español** (no se traduce texto visible).
- **Git en inglés**: ramas ASCII kebab sin acentos (`<nº>-<english-slug>`),
  mensajes de commit (Conventional Commits) y **PR (título + cuerpo)** en inglés.
  Las issues pueden ir en español.

### Guía de codificación (siempre)

Al **iniciar cualquier tarea de escribir, revisar o refactorizar código**, invoca
primero la skill **`andrej-karpathy-skills:karpathy-guidelines`** y aplica sus
directrices (cambios quirúrgicos, sin sobre-ingeniería, explicitar supuestos,
criterios de éxito verificables). Aplica a todo el trabajo del repo, dentro y
fuera del flujo SDD. No aplica a tareas que no tocan código (p. ej. solo contenido
`src/content/` transcrito verbatim, donde mandan las reglas de contenido).

## Workflow (Spec-Driven Development)

La forma de trabajar en este repo es **Spec-Driven Development (SDD)**: la
especificación es la fuente de verdad y el trabajo avanza por fases con **dos
paradas obligatorias** para el usuario. Punto de entrada: el comando **`/workflow`**
(`.claude/commands/workflow.md`), que acepta un **texto de requerimiento** o un
**id de issue** de GitHub.

**Constitución** (de obligado cumplimiento en todas las fases): este `CLAUDE.md` +
[`.claude/rules/contenido-examenes-y-temarios.md`](.claude/rules/contenido-examenes-y-temarios.md)
(contenido verbatim) +
[`.claude/rules/convenciones-codigo-y-git.md`](.claude/rules/convenciones-codigo-y-git.md)
(idioma, naming y Git).

Fases (cada una tiene su comando de fase para reanudarla):

1. **Specify** (`/spec`) — analiza el requerimiento/issue; si es texto, crea la
   issue (`gh issue create`); escribe `specs/<id>-<slug>/spec.md` (criterios de
   aceptación, alcance, no-objetivos).
2. **Branch** (`/spec`) — comprueba que `main` ya trae el tooling, actualízala y
   crea la rama enlazada con `gh issue develop <id> --base main --name
<id>-<english-slug> --checkout`. El **slug va en inglés ASCII** aunque el título
   de la issue esté en español (ver `convenciones-codigo-y-git.md`).
3. **Plan** (`/plan`) — escribe `plan.md` (CÓMO) y `tasks.md` (tareas TDD = commits
   atómicos). **⏸ GATE A**: espera aprobación del usuario; itera hasta conformidad.
4. **Implement** (`/implement`) — TDD por tarea (test rojo → mínimo → refactor), un
   **commit atómico** por tarea (Conventional Commits, `(refs #id)`). Contenido →
   skills `add-exam`/`add-esquema`.
5. **Verify** (`/deliver`) — `npm run check` + `npm test` + `npm run build` +
   `npm run test:e2e` + checklist de criterios. **⏸ GATE B**: espera confirmación.
6. **Deliver** (`/deliver`) — `gh pr create --base main` (título y cuerpo **en
   inglés**) con `Closes #id`; la rama se elimina al mergear
   (`deleteBranchOnMerge` del repo). `main` tiene un **ruleset que exige 1 review**:
   como admin/owner se mergea saltándolo con `gh pr merge <id> --admin --merge`
   (solo se permite el método _merge_).

Artefactos SDD: `specs/<id>-<slug>/{spec,plan,tasks}.md` (ver `specs/README.md`),
versionados en la rama. Plantillas en `.claude/templates/`. Subagente de apoyo:
`spec-analyst` (`.claude/agents/`).

## Adding content (use the skills)

Three skills drive content authoring (and are the documented way to add material):

- **`add-asignatura`** — register a new subject: updates `src/data/asignaturas.ts`
  **and** the `asignatura` Zod enum in `src/content/config.ts` (content for a code
  missing from the enum fails the build). Run it before adding content for a new code.
- **`add-exam`** — add a test bank or desarrollo question (práctica). Transcribes
  **verbatim**; never modifies questions or answers.
- **`add-esquema`** — turn subject documents into study outlines (esquemas).

By hand, the conventions are:

- **Test bank**: `src/content/test/<asignatura>.yaml` (array of questions).
- **Esquema**: `src/content/esquemas/<asignatura>-tN.md`.
- **Desarrollo**: `src/content/desarrollo/<asignatura>-q<N>.md`.
- New subjects: use the `add-asignatura` skill (entry in `src/data/asignaturas.ts`
  **+** the `asignatura` Zod enum in `src/content/config.ts`). Home and routes are
  generated from the collections — no page edits needed.

> The **rule**: questions, answers and exam texts are never modified — content is
> transcribed verbatim. The test banks render as escaped text (literal HTML in a
> question shows as code), so don't add HTML formatting to test content.
>
> Full normative version (verbatim, correct answer, structural integrity, double
> read-back) in [`.claude/rules/contenido-examenes-y-temarios.md`](.claude/rules/contenido-examenes-y-temarios.md).
> Read it before adding or editing any content under `src/content/`.

## Rule of thumb

The original standalone HTML documents that this content was migrated from are not
in the working tree; they live in git history (commit that introduced `legacy/`).
Retrieve with `git show <commit>:legacy/<file>.html` if you ever need to re-verify.
