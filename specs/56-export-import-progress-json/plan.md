# Plan técnico — Exportar/importar el progreso de práctica (JSON)

- **Issue**: #56
- **Spec**: ./spec.md
- **Rama**: 56-export-import-progress-json

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

En vez de que el export conozca cada módulo (`practica-progress.ts`,
`practica-stats.ts`, `desarrollo-progress.ts`, `exam-mode.ts`,
`minimap.ts`) y su formato de clave, se cubre **todo** lo que ya comparte el
prefijo `plancha:` (confirmado: `plancha:practica:`, `plancha:stats:`,
`plancha:desarrollo:`, `plancha:exam:`, `plancha:minimap-pins:` — ninguno
usa un prefijo distinto) — un export por prefijo, no por lista de módulos.
Esto cumple el mínimo pedido por la spec sin acoplar el export a cada schema
interno y sin tener que tocar este código cada vez que se añada una clave
nueva. `site-theme` no lleva ese prefijo, así que queda fuera sin necesidad
de excluirla explícitamente. El núcleo (construir/serializar/parsear el
fichero de export) es puro y testeable en `src/lib/export-progress.ts`; leer
`localStorage`, disparar la descarga y aplicar un fichero importado es
wiring de DOM en un `<script>` de `index.astro`, con los mismos
`safeGet`/`safeSet` que ya usan `practica/[asignatura].astro`,
`Minimap.astro`, `TestQuestion.astro` y `DesarrolloQuestion.astro`.

## Ficheros y áreas afectadas

- `src/lib/export-progress.ts` (nuevo) — `ProgressExport` (`version`,
  `exportedAt`, `data: Record<string, string>`), `isExportableKey(key)`
  (prefijo `plancha:`), `buildProgressExport(entries, exportedAt)` (filtra
  por `isExportableKey`), `serializeProgressExport`/`parseProgressExport`
  (JSON, defensivo: `null` si falta `version`/`exportedAt`/`data`, o si algún
  valor de `data` no es string).
- `src/pages/index.astro` — sección nueva con botón "Exportar mi progreso" +
  input de archivo "Importar"; `<script>` con `safeGet`/`safeSet` locales
  (mismo patrón que el resto del sitio), lectura de todo `localStorage`
  (`readAllProgress()`), disparo de descarga vía `Blob` + `<a download>`
  efímero, y aplicación de un import válido escribiendo cada clave con
  `safeSet`.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- Patrón `safeGet`/`safeSet` (try/catch alrededor de `localStorage`) ya
  duplicado en `practica/[asignatura].astro`, `Minimap.astro`,
  `TestQuestion.astro`, `DesarrolloQuestion.astro` — se replica igual aquí
  (es el patrón establecido del repo; no se extrae a `src/lib` porque
  ninguno de esos usos lo hace tampoco).
- Ningún módulo de `src/lib` cambia: el export es un envoltorio genérico por
  prefijo, no reimplementa el parseo de cada uno.

## Estrategia de test (TDD)

- **Unit (Vitest)**: `tests/unit/export-progress.test.ts` —
  `buildProgressExport` filtra solo claves `plancha:*` (ignora `site-theme`
  u otras ajenas); `serializeProgressExport`/`parseProgressExport`
  round-trip completo; JSON inválido -> `null`; sin `version`/`exportedAt`/
  `data` -> `null`; algún valor de `data` no-string -> `null`.
- **E2E (Playwright)**: `tests/e2e/backup-progress.spec.ts` — sembrar
  progreso en un par de claves `plancha:*`, exportar y comprobar (vía
  `page.waitForEvent('download')`) que el fichero descargado contiene esas
  claves con sus valores; vaciar `localStorage` e importar ese mismo
  fichero (`setInputFiles` sobre el input), comprobando que las claves
  vuelven a existir con el mismo valor; importar un fichero no válido
  (JSON sin la forma esperada) y comprobar que se informa del error sin
  lanzar excepciones ni tocar el progreso existente.
- **Contenido**: no aplica; se valida con `astro check` + `astro build`.

## Riesgos / decisiones

- Cubrir por **prefijo** en vez de por lista explícita de módulos es una
  decisión deliberada: más robusto ante nuevas claves `plancha:*` futuras,
  y evita que este código dependa de los tipos internos de cada módulo. Se
  documenta aquí porque es la única desviación no literal del texto de la
  issue (que enumera módulos), aunque el resultado los cubre a todos igual
  (todos usan ese prefijo).
- El fichero importado se aplica escribiendo claves crudas en
  `localStorage` sin revalidar el JSON interno de cada valor (p. ej. no se
  vuelve a llamar a `parseStats`/`parse` de cada módulo): es exactamente lo
  que ya había, así que restaura el estado tal cual sin riesgo de
  reinterpretarlo distinto.
- No hay confirmación de "sobrescribir progreso existente" antes de
  importar: es una acción local (no destructiva de forma irreversible, ya
  que el propio export es la copia de seguridad), coherente con que la
  issue no pide ese paso.
