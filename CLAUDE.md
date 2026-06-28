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
npm run test:all          # check + unit + build + e2e

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
  - `esquemas/` — Markdown; frontmatter (`asignatura, tema, num, titulo, clave,
orden`) + body = nested Markdown lists (the tree). Rendered by `EsquemaTree`.
  - `test/` — one YAML file per subject; array of questions
    (`type: single|multi`, `options`, `correct` as 0-based index array,
    `explicacion?`, `apariciones?`). Rendered by `TestQuestion`.
  - `desarrollo/` — Markdown; frontmatter (`enunciado`, `titulo?`, `kind`) + body
    = model answer (HTML). Rendered by `DesarrolloQuestion`.
  - `guia/` — Markdown; body = raw chapter HTML rendered with `set:html`
    (paginated guide). Rendered by `SoaGuide`.
- **Pages** (`src/pages/`): `index.astro` (listado filtrable), `esquemas/[asignatura]`,
  `practica/[asignatura]`, `guia/[asignatura]`, and `practica/mongodb.astro`
  (custom interactive validator, component `MongoPractica`).
- **Routing/base**: internal links use `BASE` from `src/data/site.ts` so they
  don't break under the `/plancha-app` subpath; `astro.config.mjs` imports the
  same `BASE`/`SITE`. Don't hardcode absolute `/...` links.

## Workflow (Spec-Driven Development)

La forma de trabajar en este repo es **Spec-Driven Development (SDD)**: la
especificación es la fuente de verdad y el trabajo avanza por fases con **dos
paradas obligatorias** para el usuario. Punto de entrada: el comando **`/workflow`**
(`.claude/commands/workflow.md`), que acepta un **texto de requerimiento** o un
**id de issue** de GitHub.

**Constitución** (de obligado cumplimiento en todas las fases): este `CLAUDE.md` +
[`.claude/rules/contenido-examenes-y-temarios.md`](.claude/rules/contenido-examenes-y-temarios.md).

Fases (cada una tiene su comando de fase para reanudarla):

1. **Specify** (`/spec`) — analiza el requerimiento/issue; si es texto, crea la
   issue (`gh issue create`); escribe `specs/<id>-<slug>/spec.md` (criterios de
   aceptación, alcance, no-objetivos).
2. **Branch** (`/spec`) — actualiza `main` y crea la rama de la issue con
   `gh issue develop` (convención nativa de GitHub `<nº>-<kebab>`, enlazada a la issue).
3. **Plan** (`/plan`) — escribe `plan.md` (CÓMO) y `tasks.md` (tareas TDD = commits
   atómicos). **⏸ GATE A**: espera aprobación del usuario; itera hasta conformidad.
4. **Implement** (`/implement`) — TDD por tarea (test rojo → mínimo → refactor), un
   **commit atómico** por tarea (Conventional Commits, `(refs #id)`). Contenido →
   skills `add-exam`/`add-esquema`.
5. **Verify** (`/deliver`) — `npm run check` + `npm test` + `npm run build` +
   `npm run test:e2e` + checklist de criterios. **⏸ GATE B**: espera confirmación.
6. **Deliver** (`/deliver`) — `gh pr create --base main` con `Closes #id`; la rama
   se elimina al mergear (`deleteBranchOnMerge` del repo).

Artefactos SDD: `specs/<id>-<slug>/{spec,plan,tasks}.md` (ver `specs/README.md`),
versionados en la rama. Plantillas en `.claude/templates/`. Subagente de apoyo:
`spec-analyst` (`.claude/agents/`).

## Adding content (use the skills)

Two skills drive content authoring (and are the documented way to add material):

- **`add-exam`** — add a test bank or desarrollo question (práctica). Transcribes
  **verbatim**; never modifies questions or answers.
- **`add-esquema`** — turn subject documents into study outlines (esquemas).

By hand, the conventions are:

- **Test bank**: `src/content/test/<asignatura>.yaml` (array of questions).
- **Esquema**: `src/content/esquemas/<asignatura>-tN.md`.
- **Desarrollo**: `src/content/desarrollo/<asignatura>-q<N>.md`.
- New subjects: add an entry to `src/data/asignaturas.ts`. Home and routes are
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
