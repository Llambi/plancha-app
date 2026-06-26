---
name: add-esquema
description: Generate study-outline (esquema) content for the repo from one or more documents covering a subject's topics. Builds the hierarchical tree per tema. Use when the user provides subject material to turn into esquemas.
---

# add-esquema

Turn one or more source documents (apuntes, temario, PDFs, notes) into
**esquemas de estudio** for PlanchaAPP: hierarchical outlines per tema under
`src/content/esquemas/`, following `src/content/config.ts`.

## Qué es un esquema aquí

Un fichero Markdown por **tema**, con:
- Frontmatter: `asignatura, tema, num, bloque?, titulo, clave, orden`.
- `clave` = la **idea fuerza** del tema (1–2 frases que resumen lo esencial).
- Cuerpo = el **árbol** de conceptos como **listas Markdown anidadas**
  (nivel 0 = grandes bloques, niveles siguientes = detalle). Se permite HTML
  inline para resaltar: `<b>…</b>`, `<code>…</code>`, `<span class="mono">…</span>`.

Lo renderiza el componente `EsquemaTree` (cabecera + idea fuerza + árbol).

## 1. Preguntas que debes hacer al usuario

- **Asignatura**: ¿código existente (`dar, soa, si, cl, mongodb`) o nueva? Si es
  nueva, pide nombre, sigla y acento → `src/data/asignaturas.ts`.
- **Mapa de temas**: ¿cómo se numeran (T1, T2…), hay bloques, qué `titulo` lleva
  cada uno? Si el documento ya trae estructura de temas, propón el mapeo y
  confírmalo.
- **Profundidad**: ¿esquema condensado (claves de examen) o detallado? Por
  defecto, esquema de estudio claro y jerárquico, no copia literal del documento.
- Si un documento cubre varios temas, confirma dónde corta cada tema.

## 2. Cómo construir cada esquema

Por cada tema, crea `src/content/esquemas/<asignatura>-t<N>.md`:

```markdown
---
asignatura: <código>
tema: T<N>
num: "<N>"
bloque: <opcional>
titulo: <título del tema>
clave: La <b>idea fuerza</b> del tema en 1–2 frases.
orden: <N>
---

- Gran bloque conceptual
  - Concepto con <b>resaltado</b> clave
    - Detalle o matiz
    - Otro detalle
  - Otro concepto
- Segundo gran bloque
  - …
```

Pautas de calidad del esquema:
- Sintetiza y jerarquiza: agrupa por ideas, no transcribas párrafos enteros.
- Resalta lo evaluable con `<b>` y los términos técnicos/comandos con `<code>`.
- Una `clave` por tema que capture "lo que no se puede olvidar".
- Mantén un estilo consistente con los esquemas existentes (mira
  `src/content/esquemas/si-t1.md` o `cl-t1.md` como referencia).

> Nota: a diferencia de las preguntas de examen (que son verbatim), un esquema
> es una **síntesis** del material; puedes redactar y organizar. Aun así, no
> inventes contenido que no esté en las fuentes ni alteres definiciones.

## 3. Verificación

1. `npm run build` (valida Zod).
2. `npm run dev` y revisa que el árbol y la idea fuerza se ven bien (reinicia el
   dev server si la caché de contenido no refresca).
3. Resume: asignatura, nº de temas creados y de qué documento(s) salen.

## 4. No olvides

- La tarjeta del home y la ruta `esquemas/<código>` se generan solas desde la
  colección (no toques páginas).
- Si la asignatura es nueva, añádela a `src/data/asignaturas.ts`.
