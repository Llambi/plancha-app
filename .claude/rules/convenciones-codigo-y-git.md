# Reglas — convenciones de código y Git

Normativa de **idioma, naming y Git** para PlanchaAPP. Es parte de la
**Constitución** (junto con `CLAUDE.md` y
[`contenido-examenes-y-temarios.md`](contenido-examenes-y-temarios.md)) y aplica a
todo el trabajo del repo. Para el contenido de `src/content/` mandan, además, las
reglas de contenido (verbatim).

## Idioma del código

- **Código nuevo en inglés**: identificadores, variables, funciones, tipos y
  **comentarios** se escriben en inglés.
- **Excepción de dominio (en español)**: se **conserva** el vocabulario de dominio,
  porque define rutas, claves YAML y el esquema Zod, y casa con el contenido. No es
  negociable ni se "traduce":

  > `asignatura`, `esquema`, `desarrollo`, `practica`, `guia`, `tema`, `clave`,
  > `num`, `orden`, `oficial`, `apariciones`, `titulo`, `enunciado`, `bloque`,
  > `sigla`, `accent` (y las rutas `/practica`, `/esquemas`, `/guia`, `/buscar`).

  Si añades un campo/identificador que forma parte de este modelo (frontmatter,
  schema, params de ruta, claves de `src/data`), va en español por coherencia. Lo
  demás (lógica, utilidades, helpers, nombres internos) va en inglés.

- **No se renombra lo existente.** Esta regla aplica a código nuevo; no abre una
  campaña de renombrado del código actual (que mezcla ambos por historia).
- **Contenido y UI en español**: el material de estudio y todo el texto visible al
  usuario siguen en español. No traduzcas cadenas de interfaz al inglés.

## Git

- **Ramas en inglés, ASCII, kebab-case.** Sin acentos, sin `ñ`, sin espacios ni
  símbolos. Formato para issues: `<nº>-<english-kebab>` (p. ej. `2-global-search`).
  El **título de la issue puede estar en español** (es contenido canónico), pero el
  **slug de la rama es inglés**: con `gh issue develop` usa
  `--name <nº>-<english-slug>` para no heredar un nombre con acentos del título.
- **Commits en inglés.** Conventional Commits con la descripción en inglés
  (`feat(search): add dynamic topbar search`), manteniendo el `(refs #<id>)` del
  flujo SDD.
- **Pull Requests en inglés.** Título y cuerpo en inglés (el `Closes #<id>` y el
  resumen/checklist). La issue enlazada puede seguir en español.

## Naming

- Ficheros y ramas en **kebab-case**; identificadores JS/TS en **camelCase**
  (clases/tipos en `PascalCase`), salvo el vocabulario de dominio en español.
- Componentes Astro en `PascalCase.astro` (como los existentes).

## Por qué

Ramas/commits/PR en inglés dan un historial consistente y legible por terceros,
mientras que el dominio en español mantiene la trazabilidad 1:1 con el contenido y
las rutas públicas. Mezclar idiomas en el dominio rompería esa correspondencia.
