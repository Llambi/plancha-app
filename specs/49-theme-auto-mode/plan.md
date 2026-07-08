# Plan técnico — Toggle de tema: añadir un tercer estado «Automático»

- **Issue**: #49
- **Spec**: ./spec.md
- **Rama**: 49-theme-auto-mode

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

`localStorage('site-theme')` pasa a guardar la **preferencia**
(`'light' | 'dark' | 'auto'`, por defecto `'auto'` si no hay nada guardado)
en vez del tema resuelto. Se separan dos conceptos en el DOM:

- `data-theme` (`<html>`) — el tema **visual resuelto** (`light`/`dark`),
  igual que hoy; todo el CSS `--site-*` sigue enganchado a este atributo,
  sin tocarlo.
- `data-theme-pref` (`<html>`, nuevo) — la **preferencia** cruda
  (`light`/`dark`/`auto`), usada solo para decidir qué icono del toggle se
  muestra.

`resolveTheme(pref)`: si `pref === 'auto'`, usa
`matchMedia('(prefers-color-scheme: dark)').matches`; si no, es el propio
`pref`. Se usa tanto en el script anti-parpadeo del `<head>` como en el
click del toggle.

El toggle cicla `light → dark → auto → light…` (array `ORDER`, siguiente =
`ORDER[(ORDER.indexOf(actual) + 1) % 3]`). Cada click: calcula el
siguiente, aplica `data-theme-pref` + `data-theme` (resuelto), guarda en
`localStorage`.

Mientras la preferencia activa sea `'auto'`, un listener de
`matchMedia('(prefers-color-scheme: dark)').addEventListener('change', …)`
actualiza `data-theme` en vivo si cambia la preferencia del sistema con la
página ya abierta (comprobando en el propio callback que `data-theme-pref`
siga siendo `'auto'` en ese momento).

Icono: se añade un tercer glifo `.site-ic-auto` (`◐`), mismo estilo que los
existentes (`☀`/`☾`, caracteres simples, no SVG/emoji). El CSS pasa de
"ocultar el que no toca" (basado en `data-theme`) a "mostrar solo el que
toca" (basado en `data-theme-pref`), con los tres ocultos por defecto.

## Ficheros y áreas afectadas

- `src/layouts/BaseLayout.astro` — script anti-parpadeo (`<head>`), botón
  (añade `.site-ic-auto`), script de click, CSS de los iconos.
- `tests/e2e/smoke.spec.ts` — el test "el toggle de tema cambia data-theme
  en /practica/mongodb" asumía un ciclo de 2 estados donde un clic siempre
  cambia el tema visual resuelto; con 3 estados eso ya no es cierto en
  general (p. ej. `auto→light` cuando el sistema ya está en claro no
  cambia el tema resuelto, aunque sí avanza la preferencia). Se reescribe
  para comprobar el avance exacto de un paso en `data-theme-pref` en vez
  del cambio de `data-theme` — sigue guardando la regresión original de
  #36 (listener duplicado), ahora de forma más precisa.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- Misma clave `localStorage('site-theme')` ya existente (cambia lo que
  guarda, no el nombre de la clave).
- Mismo patrón de script `is:inline` en el `<head>` para evitar parpadeo,
  ya existente.

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica — lógica ligada a `matchMedia`/`localStorage`
  del navegador, no extraída a `src/lib`.
- **E2E (Playwright)**: nuevo fichero `tests/e2e/theme-auto.spec.ts`:
  1. Sin preferencia guardada y con `colorScheme: 'dark'` emulado, el tema
     resuelto es oscuro y el toggle queda en estado "automático".
  2. Tres clics consecutivos recorren light → dark → auto → light exacto
     (vía `data-theme-pref`).
  3. En modo automático, `page.emulateMedia({ colorScheme: 'dark' })`
     tras la carga actualiza `data-theme` sin recargar ni hacer clic.
     Además, se actualiza el test existente de `smoke.spec.ts` (ver arriba).
- **Contenido**: no aplica.

## Riesgos / decisiones

- **Cambio de comportamiento por defecto**: antes, la primera visita
  "congelaba" el tema detectado la primera vez que se tocaba el botón;
  ahora el estado por defecto es explícitamente "automático" hasta que el
  usuario elige claro/oscuro a propósito. Es exactamente el resultado que
  pide la spec, documentado aquí porque es un cambio de comportamiento
  observable para cualquier visitante nuevo.
- **Icono nuevo (`◐`)**: carácter Unicode simple, mismo estilo que los dos
  ya existentes; no se usa SVG para no introducir un patrón nuevo en un
  botón que ya funciona así.
