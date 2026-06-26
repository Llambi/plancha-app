# Plan maestro — Migración a Astro (contexto en frío para el workflow)

> Este documento es la **única fuente de verdad** del workflow `/astro-migrate`.
> Cada comando de fase (`/astro:*`) lo lee al empezar. Está escrito para que un
> agente que arranca **sin contexto previo** pueda ejecutar su fase con seguridad.

---

## 0. LA REGLA (no negociable)

**LAS PREGUNTAS Y RESPUESTAS NO SE MODIFICAN BAJO NINGÚN CONCEPTO.**

- La migración es una **transcripción mecánica**, no una reescritura.
- Texto de enunciados, opciones, respuestas correctas, justificaciones y
  respuestas modelo se conserva **carácter a carácter**, incluido el HTML
  inline (`<b>`, `<strong>`, `<li>`, citas tipo `[1, 2]`, etc.).
- **No** se corrige ortografía, **no** se reordena opciones, **no** se
  "mejora" la redacción. Si algo parece un error, se conserva igual y se
  anota aparte; nunca se edita.
- Todo lo transcrito se **verifica por diff** contra el original (ver Fase 2).

---

## 1. Objetivo

Refactorizar este sitio de estudio (HTML estáticos sueltos en `html/`) a un
proyecto **Astro** que genera el estático en build, con:

- Un **home** que lista los contenidos, filtrables por **Esquemas** / **Práctica**.
- **Esquemas**: árbol de conceptos por tema de cada asignatura.
- **Práctica**:
  - **Test**: opciones, se elige **una o varias** según la pregunta.
  - **Desarrollo**: textarea + botón que revela una **respuesta modelo**.
- Añadir contenido nuevo = crear **un fichero** (`.md` o entrada YAML), sin tocar código.

## 2. Decisiones cerradas (no reabrir sin pedir al usuario)

| # | Decisión | Elección |
|---|----------|----------|
| 1 | Diseño visual | **Unificar todo** en un único sistema de diseño común (base `--site-*` ya existente: topbar, toggle claro/oscuro, tokens). Se descartan los looks bespoke por asignatura. |
| 2 | Formato de datos | **Híbrido**: Markdown+frontmatter para esquemas y desarrollo; YAML para bancos de test. |
| 3 | Piezas interactivas a medida | **Portar como componentes** Astro/JS dedicados (validador MongoDB, práctico SI, quiz/paginado SOA), conservando funcionalidad. |

## 3. Inventario de ficheros origen (`html/`)

Las preguntas/esquemas YA estructurados se extraen **por script** (no a mano).
Lo que es HTML rico se preserva **verbatim**.

| Origen | Asignatura | Naturaleza | Cómo están los datos hoy |
|--------|-----------|------------|--------------------------|
| `html/dar.html` | DAR | Test (single) | ✅ JSON en `<script type="application/json" id="qdata">`: `{settings, questions:[{id,type:"single_choice",question,options[],correct_answer (string literal),meta:{tema,correct_letter,explicacion}}]}` |
| `html/si.html` | SI | Test + desarrollo + práctico | Arrays JS. Test: `{tema,oficial,q,opts[],correcta:<idx>,just}`. Hay también banco de desarrollo y un ejercicio práctico. Estado runtime: `current={test:[],dev:[],prac:null}`. **Leer el fichero** para los nombres exactos de variables. |
| `html/cl.html` | CL | Solo desarrollo | ⚠️ Incrustado en HTML: por pregunta hay `.q-text` (enunciado, HTML rico) + `<textarea>` + `.model` (respuesta modelo, HTML rico con `<li><strong>`). **Sin** datos estructurados → preservar HTML verbatim. |
| `html/mongodb.html` | MongoDB | Práctica con validador de consultas | Interactivo a medida. **Leer el fichero**; portar el validador como componente (Fase 5). |
| `html/cl-esquemas.html` | CL | Esquema | `const TEMAS=[{id,num,bloque,titulo,clave,nodos:[{h,c:[{l,i:[...]}]}]}]` (árbol 2–3 niveles, HTML inline). |
| `html/si-esquemas.html` | SI | Esquema | `const DATA=[{n,bloque,t,idea,arbol:[{l,c:[{l,c?}]}]}]` (árbol recursivo, HTML inline). |
| `html/soa.html` | SOA | Esquema/guía + quiz | HTML puro paginado por capítulos: `.chapter-page#chN`, `.section-heading`. Incluye quiz integrado. 3441 líneas — el más costoso. Preservar HTML; portar quiz+paginado como componente. |

**Colores de acento por asignatura** (de `html/index.html`, conservarlos como
acento por tarjeta dentro del diseño unificado):
DAR `#6C63FF` · SOA `#C41230` · SI `#2D5BD7` · CL `#0f6e7e` · MongoDB `#00855f`.

**Sistema común ya existente** (reutilizar como base del diseño unificado):
topbar sticky con nav-a-root, toggle claro/oscuro con persistencia en
`localStorage('site-theme')`, tokens `--site-*`, skip-link de accesibilidad.
Ver `html/index.html` (líneas ~14–118) como referencia del diseño base.

## 4. Arquitectura destino

```
/ (raíz del repo)
  package.json            # Astro, output: 'static'
  astro.config.mjs
  Dockerfile              # build de Astro -> Nginx sirve dist/
  docker-compose.yml      # actualizado: build local, sigue en :8080
  src/
    content/
      config.ts           # colecciones + esquemas Zod
      esquemas/           # 1 fichero .md por tema (cl-t1.md, si-t1.md, ...)
      test/               # 1 .yaml por asignatura (dar.yaml, si.yaml, ...)
      desarrollo/         # 1 .md por pregunta (cl-q1.md, ...)
    layouts/
      BaseLayout.astro    # topbar, tema claro/oscuro, a11y, tokens --site-*
    components/
      EsquemaTree.astro
      TestQuestion.astro      # single + multi, marcar y corregir, explicación
      DesarrolloQuestion.astro# textarea + "ver respuesta modelo"
      MongoQueryValidator.*   # Fase 5
      PracticoSI.*            # Fase 5
      SoaGuide.*              # Fase 5 (paginado por capítulos + quiz)
    pages/
      index.astro
      esquemas/[slug].astro
      practica/[slug].astro
  html/                   # se retira en la Fase 6, no antes
```

## 5. Esquemas de datos (Content Collections + Zod)

Definir en `src/content/config.ts`. Códigos de asignatura: `dar | soa | si | cl | mongodb`.

**Colección `esquemas`** (loader Markdown, `src/content/esquemas/*.md`):
```
frontmatter:
  asignatura: enum(dar,soa,si,cl,mongodb)
  tema: string            # p.ej. "T1"
  num: string             # p.ej. "1"
  bloque: string.optional
  titulo: string
  clave: string           # "idea fuerza" — puede contener HTML/markdown inline
  orden: number
body: listas anidadas en Markdown = el árbol de nodos
```

**Colección `test`** (loader de datos YAML, `src/content/test/<asignatura>.yaml`):
```
array de:
  id: string
  asignatura: enum(...)
  tema: string.optional
  oficial: boolean.default(false)
  type: enum('single','multi')
  question: string         # verbatim, puede contener HTML inline
  options: string[]        # ORDEN ORIGINAL, verbatim
  correct: number[]        # índices 0-based sobre options; 1 elemento si single
  explicacion: string.optional   # 'just'/'explicacion' del origen, verbatim
```

**Colección `desarrollo`** (loader Markdown, `src/content/desarrollo/*.md`):
```
frontmatter:
  asignatura: enum(...)
  id: string
  tema: string.optional
  enunciado: string        # verbatim (puede contener HTML inline)
  orden: number
body: respuesta modelo VERBATIM (HTML/markdown tal cual el original)
```

> Notas:
> - `correct` como **array de índices** para soportar single y multi con un solo modelo.
> - Conservar **orden original** de `options` (la REGLA prohíbe reordenar).
> - Para contenido con HTML rico (CL, SOA), preferir MDX o `set:html` en el
>   render, nunca reescribir el texto.

## 6. Convenciones

- Nomenclatura de ficheros: `<asignatura>-<tema|qN>.md`, `<asignatura>.yaml`.
- `slug` de páginas = `<asignatura>` para práctica/esquemas, o por tema según convenga.
- Idioma del contenido y la UI: **español**.
- Mantener la persistencia de tema en `localStorage('site-theme')` y el patrón
  anti-parpadeo (script inline en `<head>`).
- No introducir dependencias de runtime innecesarias; el sitio es estático.

## 7. Orden de ejecución del workflow

Ejecutar las fases **en orden**; cada una deja el repo en verde antes de la siguiente:

1. `/astro:scaffold`        — Fase 0: andamiaje Astro + BaseLayout + Docker.
2. `/astro:datamodel`       — Fase 1: `config.ts` + esquemas Zod (sin datos aún).
3. `/astro:migrate-content` — Fase 2: extracción mecánica + verificación por diff.
4. `/astro:components`      — Fase 3: EsquemaTree, TestQuestion, DesarrolloQuestion.
5. `/astro:pages`           — Fase 4: index + páginas dinámicas.
6. `/astro:interactive`     — Fase 5: validador Mongo, práctico SI, guía/quiz SOA.
7. `/astro:finalize`        — Fase 6: verificación visual, retirar `html/`, docs.

## 8. Definición de "hecho" global

- `npm run build` genera `dist/` sin errores.
- El home lista todo el contenido y filtra Esquemas/Práctica.
- Cada asignatura es accesible y funcional (test corrige; desarrollo revela modelo;
  esquemas se ven; piezas interactivas funcionan).
- La verificación por diff de la Fase 2 pasa: **cero** cambios en preguntas/respuestas.
- `docker compose up` sirve el sitio en `:8080`.
