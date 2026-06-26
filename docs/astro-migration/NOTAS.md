# Notas de migración

Registro de incidencias, decisiones de detalle y casos especiales pendientes.

## Estado por fase

- **Fase 0 (andamiaje)** — ✅ Completa. Astro estático, `BaseLayout` con diseño
  unificado (topbar, tema claro/oscuro, tokens `--site-*`), Docker multi-stage.
  Verificado en navegador (tema persiste, sin errores de consola).
- **Fase 1 (modelo de datos)** — ✅ Completa. `src/content/config.ts` con 3
  colecciones (Zod): `esquemas` (md), `test` (YAML por asignatura vía loader
  personalizado), `desarrollo` (md). Soporte single/multi verificado.
- **Fase 2 (migración)** — ✅ Completa. DAR, SI (test + desarrollo), CL
  (desarrollo), CL-esquemas, SI-esquemas, SOA (guía + quiz), MongoDB.
- **Fase 3 (componentes)** — ✅ `TestQuestion`, `DesarrolloQuestion`,
  `EsquemaTree`, `SoaGuide`, `MongoPractica`. Verificados en navegador.
- **Fase 4 (páginas)** — ✅ Home dinámico con filtros + `esquemas/[asignatura]`
  + `practica/[asignatura]` + `guia/[asignatura]` + `practica/mongodb`.
- **Fase 5 (interactivos)** — ✅ SOA (guía paginada + quiz) y MongoDB (validador)
  portados como componentes. Verificados en navegador.
- **Fase 6 (cierre)** — ✅ `html/` movido a `legacy/` (no se sirve; scripts
  actualizados y re-verificados). `CLAUDE.md` y skill `new-doc` reescritos al
  flujo Astro. Docker (build multi-stage) verificado sirviendo en `:8080`.

## Migraciones realizadas

### DAR → `src/content/test/dar.yaml`
- Script: `scripts/migrate-dar.mjs` (extracción + verificación verbatim).
- 257 preguntas, todas `single`. 2056 comprobaciones de cadena verbatim OK.
- `correct_answer` (texto) convertido a índice 0-based; `correct_letter` del
  origen usado como cross-check de coherencia letra/índice.
- 1 pregunta sin `explicacion` en origen (se respeta; campo opcional).
- **Barajado**: el origen tenía `shuffle_options`/`shuffle_questions`. Es
  responsabilidad del **componente de render** (Fase 3), no de los datos. Las
  opciones se guardan en ORDEN ORIGINAL (la REGLA prohíbe reordenar en datos).

## Migraciones realizadas (cont.)

### SI → `test/si.yaml` + `desarrollo/si-*.md`
- Extracción con `scripts/migrate.mjs` (lib `scripts/lib/jsextract.mjs`, que
  evalúa los literales `const TEMAS/TEST/DEV/PRAC` del HTML).
- Test: 88 preguntas (`single`). Desarrollo: 10 DEV + 10 PRAC = 20 fichas.
- **Decisión**: el "ejercicio práctico" (PRAC) NO necesita una pieza interactiva
  propia; estructuralmente es enunciado + solución revelable, idéntico a un
  desarrollo. Se migra como `desarrollo` con `kind: practico` y `titulo`. Esto
  simplifica respecto al plan original (que lo enviaba a la Fase 5). Contenido
  intacto.

### CL → `desarrollo/cl-*.md`
- HTML incrustado parseado con `node-html-parser` (`article.q` → `.q-text` +
  `.model`). 5 fichas. Se conserva todo el `.model` salvo el `<h4>` de UI (el
  componente pone su propia cabecera). `.src` (tags de tema) se conserva.

### CL-esquemas / SI-esquemas → `esquemas/cl-*.md` / `esquemas/si-*.md`
- Árboles JS (`const TEMAS` / `const DATA`) convertidos a listas Markdown
  anidadas; HTML inline (`<b>`, `<span class='mono'>`, `<code>`) preservado.
- 7 temas CL + 10 temas SI. Verificación: cada fragmento de nodo presente verbatim.

## Incidencias técnicas
- **Verificación de frontmatter**: el contenido con comillas (p. ej. `"DATILIN"`)
  se escapa en YAML; la verificación re-parsea el frontmatter y compara el valor,
  no el texto crudo del fichero.
- **Bug dev de Vite** `Cannot split a chunk... import.meta`: lo disparaba
  `import.meta.env.BASE_URL`. Como no hay `base` configurado, se sustituyó por
  rutas absolutas (`/`). El build de producción no se veía afectado.
- **Caché de contenido en dev**: al cambiar ficheros de `src/content`, reiniciar
  el dev server (el content-layer cachea). No afecta al build.

### SOA → `guia/soa-ch*.md` + `test/soa.yaml`
- `scripts/migrate-soa.mjs`. 6 capítulos (ch0–ch5) como colección `guia`
  (cuerpo = HTML verbatim, renderizado con `set:html`, sin paso por markdown).
  Quiz (QUIZ_DATA, 80 preguntas single) → `test/soa.yaml` con campo opcional
  `apariciones` (veces que salió en exámenes).
- Componente `SoaGuide`: reproduce la paginación por capítulos
  (showChapter/prev/next) y el acordeón de soluciones (toggleSol); el CSS de
  contenido de SOA va reescalado bajo `.soa-guide` (solo carga en esa página).
  Fuentes (Merriweather/Source Code Pro) vía slot `head` de BaseLayout.

### MongoDB → componente `MongoPractica`
- `scripts/migrate-mongo.mjs` GENERA `src/components/MongoPractica.astro`
  (regenerar, no editar a mano). El validador mezcla datos y FUNCIONES de
  validación, así que el script de la app se porta is:inline VERBATIM; el CSS
  original se reescala bajo `.mongo-practica`. Página estática
  `practica/mongodb.astro`. La tarjeta del home se añade a mano (no es colección).

## Migración completa
Todas las fases (0–6) terminadas y verificadas. Originales en `legacy/` como
fuente de la verdad; sitio Astro generado desde `src/content/`. Build de
producción y build de Docker limpios.
