---
name: add-asignatura
description: Register a new subject (asignatura) in PlanchaAPP. Updates the metadata registry AND the Zod enum so content for the new code validates. Use before adding content for a subject whose code does not exist yet.
---

# add-asignatura

Da de alta una **asignatura nueva** en PlanchaAPP. Es el paso previo a añadir
contenido (test/desarrollo/esquema/guía) cuando el **código de asignatura aún no
existe**. Si el código ya existe, no uses esta skill: ve directo a `add-exam` o
`add-esquema`.

> ⚠️ **Hueco habitual:** una asignatura nueva NO basta con añadirla a
> `src/data/asignaturas.ts`. El esquema de contenido valida `asignatura` contra un
> **enum Zod** en `src/content/config.ts`; si el código no está en ese enum, el
> `npm run build` fallará al validar cualquier contenido de esa asignatura. Esta
> skill toca **los dos** sitios.

## 1. Datos que debes pedir al usuario

- **`code`**: identificador corto en minúsculas, ASCII, sin espacios (p. ej. `bd`,
  `redes`). Es vocabulario de dominio → va en español/minúsculas y define la ruta
  pública (`/practica/<code>`, `/esquemas/<code>`, `/guia/<code>`).
- **`nombre`**: nombre completo de la asignatura (español, visible en el sitio).
- **`sigla`**: 2–4 letras para el badge (p. ej. `BD`).
- **`accent`**: color de acento en hex `#rrggbb`.

## 2. Cambios (los dos, obligatorios)

### a) Registro de metadatos — `src/data/asignaturas.ts`

Añade una entrada al objeto `ASIGNATURAS`:

```ts
<code>: { code: '<code>', nombre: '<nombre>', sigla: '<SIGLA>', accent: '#rrggbb' },
```

### b) Enum Zod — `src/content/config.ts`

Añade `'<code>'` al enum `asignatura` (es la línea
`const asignatura = z.enum([...])`):

```ts
const asignatura = z.enum(['dar', 'soa', 'si', 'cl', 'mongodb', '<code>']);
```

## 3. Verificación

1. `npm run build` (Zod valida; si el enum no incluye el código, falla aquí).
2. La tarjeta del home y las rutas `practica|esquemas|guia/<code>` se generan solas
   desde las colecciones en cuanto exista contenido — **no edites páginas**.

## 4. Después

Pasa el contenido real a las skills de contenido (verbatim según
`.claude/rules/contenido-examenes-y-temarios.md`):

- Preguntas / desarrollo → `add-exam`.
- Esquemas de estudio → `add-esquema`.
