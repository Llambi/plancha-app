# PlanchaAPP

Material de estudio para preparar exámenes, como sitio estático generado con
[Astro](https://astro.build/). El inicio lista los contenidos por asignatura y
cada documento es de uno de **dos tipos**:

- **Práctica de examen** — preguntas tipo test (una o varias respuestas) y
  preguntas de desarrollo con respuesta modelo. Corrección en el navegador.
- **Esquema de estudio** — esquemas jerárquicos por tema con su «idea fuerza»
  (más una guía paginada rica para la asignatura SOA).

🔗 **En producción:** <https://portfolio.llambi.dev/plancha-app>

Diseño unificado con barra superior, tema claro/oscuro y navegación a inicio en
todas las páginas. Todo el contenido se escribe como ficheros en `src/content/` y
el sitio estático se genera en el build.

---

## Stack

- **Astro** (`output: static`), TypeScript, **Content Collections** validadas con Zod.
- Sin framework de UI: componentes `.astro` + JS de cliente ligero.
- Despliegue en **GitHub Pages** vía GitHub Actions, bajo la subruta `/plancha-app`.

## Desarrollo local

```bash
npm install
npm run dev        # servidor de desarrollo  -> http://localhost:4321/plancha-app/
npm run build      # genera dist/
npm run preview    # sirve el dist/ construido

# Alternativa con Docker (build de Astro + Nginx)
docker compose up -d --build   # -> http://localhost:8080
docker compose down
```

> Nota: Astro cachea la capa de contenido. Si añades/editas ficheros en
> `src/content/` y no se reflejan, reinicia `npm run dev`. El build no se ve afectado.

## Estructura

```
src/
  content/
    config.ts          # colecciones + esquemas Zod
    test/              # bancos de test, un .yaml por asignatura     (práctica)
    desarrollo/        # preguntas de desarrollo, un .md por pregunta (práctica)
    esquemas/          # esquemas de estudio, un .md por tema        (teoría)
    guia/              # guía paginada (SOA), HTML por capítulo       (teoría)
  components/          # TestQuestion, DesarrolloQuestion, EsquemaTree, SoaGuide, MongoPractica
  layouts/BaseLayout.astro
  data/
    site.ts            # nombre, BASE (/plancha-app) y SITE (fuente única)
    asignaturas.ts     # nombre, sigla y color de acento por asignatura
  pages/               # index + rutas dinámicas por asignatura
.github/workflows/deploy.yml   # CI/CD a GitHub Pages
```

## Modelo de contenido

Añadir material = crear **un fichero** en la colección adecuada; el inicio y las
rutas se generan solos. Para una asignatura nueva, basta añadir su entrada en
`src/data/asignaturas.ts`.

| Tipo                  | Colección                               | Formato                                                                                    |
| --------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------ |
| Test (práctica)       | `src/content/test/<asig>.yaml`          | array de `{id, asignatura, type: single\|multi, question, options, correct: [índices], …}` |
| Desarrollo (práctica) | `src/content/desarrollo/<asig>-q<N>.md` | frontmatter (`enunciado`, `kind`, …) + cuerpo = respuesta modelo                           |
| Esquema (teoría)      | `src/content/esquemas/<asig>-t<N>.md`   | frontmatter (`titulo`, `clave`, …) + cuerpo = listas Markdown anidadas                     |

> **La regla:** las preguntas, respuestas y textos de examen **no se modifican
> nunca** — se transcriben verbatim. Los bancos de test se muestran como texto
> escapado (si una opción contiene HTML literal, p. ej. `<script>`, se ve como
> código), así que no añadas HTML de formato al contenido de test.

## Añadir contenido con las skills

El proyecto incluye dos _skills_ de Claude Code (en `.claude/skills/`) que generan
los ficheros con el formato correcto y haciendo las preguntas necesarias. Se
invocan desde Claude Code aportando el material.

### `add-exam` — añadir una práctica de examen

Para incorporar **un examen o una batería de preguntas**. La skill:

1. Detecta el tipo (test de una o varias respuestas, o desarrollo).
2. **Pregunta lo necesario**: asignatura, cuál es la opción correcta, si hay
   justificación, tema, etc. (no adivina las respuestas).
3. Crea los ficheros en `test/` o `desarrollo/` **transcribiendo verbatim**.
4. Verifica el build y que el texto coincide carácter a carácter.

> **NO MODIFICA NI LAS PREGUNTAS NI LAS RESPUESTAS.** Si algo parece un error, lo
> conserva igual y lo señala aparte.

### `add-esquema` — generar esquemas de estudio

Para convertir **uno o más documentos con los temas de la asignatura** en
esquemas. La skill:

1. Pregunta la asignatura y el mapa de temas (numeración, títulos, bloques).
2. Por cada tema, extrae el árbol de conceptos y una «idea fuerza».
3. Crea `esquemas/<asig>-t<N>.md` con el frontmatter y el árbol como listas
   anidadas (con resaltado HTML inline donde aporta).

> A diferencia de las preguntas (verbatim), un esquema es una **síntesis** del
> material: se puede redactar y organizar, pero sin inventar ni alterar definiciones.

Cada skill documenta su formato y comprobaciones en `.claude/skills/<skill>/SKILL.md`.

## Despliegue

`.github/workflows/deploy.yml` construye el sitio (con `base: /plancha-app`) y lo
publica en GitHub Pages en cada push a `main`. Requisitos en el repositorio:

- **Settings → Pages → Source: GitHub Actions**.
- El sitio se sirve en `https://portfolio.llambi.dev/plancha-app` (Pages de
  usuario con dominio propio; los repos-proyecto se sirven en `/<repo>`).

Todos los enlaces internos y los assets usan el `BASE` de `src/data/site.ts`, de
modo que no se rompen al servirse bajo la subruta.

## Licencia

[MIT](LICENSE).
