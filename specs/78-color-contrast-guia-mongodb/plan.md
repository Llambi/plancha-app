# Plan técnico — Contraste de color insuficiente en la guía SOA y el validador de MongoDB

- **Issue**: #78
- **Spec**: ./spec.md
- **Rama**: 78-color-contrast-guia-mongodb

> Esta es la capa CÓMO. Deriva de `spec.md` y se respeta su alcance. No introduce
> requisitos nuevos; si aparecen, vuelve a la spec.

## Enfoque

Para cada pareja fallida se oscurece el color de texto (mismo tono, más
oscuro) lo justo para superar 4.5:1 en modo claro, verificado con
`contrastRatio()`. El modo oscuro no se toca porque ya cumple.

- **`.soa-chip-badge`**: el problema no es el color base (`#fff`), sino la
  regla `opacity: 0.8` que lo diluye contra el fondo rojo del chip activo
  (4.25:1 efectivo). Subir la opacidad a `0.9` (5.09:1 efectivo) resuelve la
  única combinación fallida sin cambiar el color declarado.
- **`.key-box .box-label` / `.ejercicio .ej-label`**: ambas usan
  `var(--mcg-gold)` (`#c8860a`) como color de texto sobre
  `var(--mcg-gold-bg)` (`#fef6e4` en claro → 2.84:1). `--mcg-gold` también se
  usa para bordes (sin requisito de contraste de texto) y para
  `.template-label` sobre un fondo oscuro fijo (`#0f1729`, 5.85:1, no
  afectado). Oscurecer `--mcg-gold` globalmente rompería el modo oscuro
  (`--mcg-gold-bg` oscuro ya da 5.10:1 con el valor actual, y bajaría de 4.5
  con un tono más oscuro). Se introduce una variable nueva,
  `--mcg-gold-text`, solo para texto sobre `--mcg-gold-bg`: `#8a5c07` en modo
  claro (5.40:1) y el valor original `#c8860a` en modo oscuro (sigue en
  5.10:1, sin cambio). Los dos `.box-label`/`.ej-label` pasan a usar esta
  variable; el resto de usos de `--mcg-gold` (bordes, `.template-label`)
  quedan igual.
- **`.eyebrow` / `.block-tag .pct`**: ambos están directamente sobre el fondo
  general de la página (`var(--bg)`, `#eceee9` en claro), no sobre una
  tarjeta blanca. `--green-2` (`#00855f` → 3.98:1) y `--amber` (`#b45309` →
  4.30:1) se oscurecen en modo claro a `#006b4d` (5.60:1) y `#9c4708`
  (5.42:1) respectivamente, manteniendo el tono. El modo oscuro de estas dos
  variables no se toca (ya da 6.7:1 / 7.7:1).

## Ficheros y áreas afectadas

- `src/components/SoaGuide.astro`:
  - `.soa-chip-badge { opacity: 0.8 }` → `0.9`.
  - Nueva variable `--mcg-gold-text` en `.soa-guide` (claro) y en
    `:root[data-theme='dark'] .soa-guide` (oscuro, mismo valor que
    `--mcg-gold`).
  - `.soa-guide .key-box .box-label` y `.soa-guide .ejercicio .ej-label`:
    `color: var(--mcg-gold)` → `color: var(--mcg-gold-text)`.
- `src/components/MongoPractica.astro`:
  - `--green-2: #00855f` → `#006b4d` (solo bloque claro).
  - `--amber: #b45309` → `#9c4708` (solo bloque claro).
- `tests/e2e/a11y.spec.ts`: se retira la excepción `color-contrast` de
  `/guia/soa` y `/practica/mongodb`.
- Colecciones de contenido afectadas: ninguna.
- Cambios de schema Zod: no.

## Reutilización

- `contrastRatio()` de `src/lib/color-contrast.ts` (issue #43) para verificar
  cada nuevo valor antes de aplicarlo y en los tests unitarios nuevos.

## Estrategia de test (TDD)

- **Unit (Vitest)**: no se añade. A diferencia de la issue #43 (donde
  `contrastRatio()` comprobaba `ASIGNATURAS.dar.accent`, un valor real
  importado desde `src/data/asignaturas.ts`), aquí los colores viven inline
  en el `<style>` de cada `.astro` — un test unitario tendría que duplicar
  los valores hex a mano, sin ninguna fuente única, así que nunca fallaría
  de verdad contra el código actual ni detectaría un drift futuro entre CSS
  y test. Se descarta por no aportar una señal honesta.
- **E2E (Playwright)**: se retira la excepción `color-contrast` de
  `a11y.spec.ts` para las dos páginas — sigue en rojo hasta aplicar el fix,
  y en verde después. Esta es la verificación real: axe-core mide el color
  efectivamente renderizado (incluida la opacidad), no un valor hex aislado.
- **Contenido**: no aplica.

## Riesgos / decisiones

- Riesgo: oscurecer `--green-2`/`--amber`/`--mcg-gold-text` podría alejarse
  demasiado del tono original. Mitigado manteniendo el mismo hue (solo se
  reduce la luminosidad) y verificando visualmente con `preview_*` en ambas
  páginas, modo claro y oscuro.
- Decisión: no se toca `--mcg-gold` global ni `.template-label` — ya cumplen
  y tocarlos sin necesidad violaría el alcance ("solo los colores
  estrictamente necesarios").
