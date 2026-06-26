---
name: add-exam
description: Add an exam or battery of questions to the repo as practice content (test single/multi or desarrollo). Asks the needed questions and transcribes VERBATIM. Use when the user provides exam questions to incorporate.
---

# add-exam

Incorporate an exam / question battery into PlanchaAPP as **práctica** content.
The output is files under `src/content/test/` (YAML) and/or
`src/content/desarrollo/` (Markdown), following `src/content/config.ts`.

## ⛔ Regla absoluta

**NO MODIFIQUES NI LAS PREGUNTAS NI LAS RESPUESTAS.** Transcribe carácter a
carácter: enunciados, opciones, respuestas correctas, justificaciones y
respuestas modelo. No corrijas ortografía, no reordenes opciones, no reformules.
Si algo parece un error, consérvalo igual y coméntalo aparte (nunca lo edites).

## 1. Preguntas que debes hacer al usuario (antes de escribir nada)

Reúne lo que falte (pregunta solo lo que no esté claro en el material aportado):

- **Asignatura**: ¿código existente (`dar, soa, si, cl, mongodb`) o nueva? Si es
  nueva, pide nombre, sigla y color de acento → añádela a `src/data/asignaturas.ts`.
- **Tipo de cada pregunta**:
  - **Test**: ¿una sola correcta (`single`) o varias (`multi`)?
  - **Desarrollo**: pregunta abierta con respuesta modelo.
- Para test: **¿cuál es la opción correcta?** (si el material no lo marca, pídelo;
  no la adivines). ¿Hay justificación/explicación? ¿`tema`? ¿es oficial?
- Si el formato del material es ambiguo (no se distingue enunciado de opciones,
  o no está clara la correcta), **pregunta** en vez de inferir.

## 2. Dónde y cómo escribir

### Test → `src/content/test/<asignatura>.yaml`
Añade al array (o crea el fichero). Por pregunta:
```yaml
- id: q<N>                 # único dentro del banco
  asignatura: <código>
  type: single | multi
  question: <enunciado VERBATIM>
  options:                 # ORDEN ORIGINAL, sin reordenar
    - <opción 1 VERBATIM>
    - <opción 2 VERBATIM>
  correct: [<índices 0-based de las correctas>]
  tema: <opcional>
  oficial: <true si procede>
  explicacion: <opcional, VERBATIM>
```
- `correct` es un array de índices 0-based sobre `options`: un elemento para
  `single`, varios para `multi`.
- **El test se renderiza como texto escapado**: si una opción contiene código o
  etiquetas (p. ej. `<script>`), se mostrará literal — déjalo tal cual, NO uses
  HTML de formato en test.

### Desarrollo → `src/content/desarrollo/<asignatura>-q<N>.md`
```markdown
---
asignatura: <código>
id: <asignatura>-q<N>
tema: <opcional>
titulo: <opcional>
kind: desarrollo | practico
enunciado: <enunciado VERBATIM>
orden: <número>
---

<respuesta modelo VERBATIM — admite HTML/Markdown de formato>
```

## 3. Verificación (obligatoria)

1. `npm run build` (valida el esquema Zod).
2. Relee cada fichero creado y **compáralo con el material original**: el texto
   debe coincidir carácter a carácter. Reporta un resumen: nº de preguntas,
   asignatura, tipo, y "transcripción verbatim: sí".
3. Si hay muchas preguntas en un formato regular (HTML/JSON/tabla), considera un
   script de extracción de un solo uso (Node) que las vuelque y **verifique por
   diff** que coinciden carácter a carácter, en vez de teclear a mano.

## 4. No olvides

- Si es una asignatura nueva, su tarjeta en el home y su ruta `practica/<código>`
  se generan solas desde las colecciones (no toques páginas).
- No inventes respuestas correctas ni justificaciones: si no vienen, pídelas.
