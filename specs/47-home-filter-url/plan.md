# Plan técnico — El filtro de tipo en la home no se refleja en la URL

- **Issue**: #47
- **Spec**: ./spec.md
- **Rama**: 47-home-filter-url

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Refactor mínimo del script de filtros en `src/pages/index.astro`:

1. Extraer la lógica de aplicar un filtro (marcar el botón activo + mostrar/
   ocultar tarjetas) a una función `applyFilter(f)`, reutilizada tanto por
   el click como por la carga inicial.
2. Añadir `syncUrl(f)` — mismo patrón que `syncUrl()` en `buscar.astro`
   (`URLSearchParams` + `history.replaceState`, sin recargar): añade
   `?tipo=<f>` si `f !== 'all'`, lo elimina si es `'all'`.
3. Al cargar la página, leer `?tipo=` de la URL (`URLSearchParams` sobre
   `window.location.search`) y llamar a `applyFilter()` con ese valor si es
   uno de los `data-filter` reales, o `'all'` en cualquier otro caso
   (ausente, vacío, o un valor no reconocido).

## Ficheros y áreas afectadas

- `src/pages/index.astro` — el bloque `<script>` de filtros.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod (`src/content/config.ts`): no.

## Reutilización

- Mismo patrón que `syncUrl()`/lectura inicial de `URLSearchParams` ya
  usado en `buscar.astro` — no se crea un mecanismo nuevo, solo se aplica
  el mismo aquí. No se extrae a una utilidad compartida en `src/lib`
  (son ~6 líneas en cada sitio, con nombres de parámetro distintos —
  no justifica una abstracción para dos usos).

## Estrategia de test (TDD)

- **Unit (Vitest)**: no aplica — lógica de URL ligada al DOM/`window`, sin
  extraerse a `src/lib`.
- **E2E (Playwright)**: 2 tests nuevos en `tests/e2e/home-content-types.spec.ts`
  (ya cubre los filtros de la home):
  1. Pulsar "Práctica" actualiza la URL a `?tipo=practica` sin recargar.
  2. Cargar `/?tipo=practica` dejar ese filtro activo desde el principio
     (botón con `aria-pressed="true"`, tarjetas filtradas).
- **Contenido**: no aplica.

## Riesgos / decisiones

- **No se persiste en `localStorage`**: fuera de alcance (ver spec.md).
- **Valor no reconocido en `?tipo=`**: se trata igual que ausente (cae a
  "Todos"), sin mostrar error ni vaciar la lista — criterio 4 de la spec.
