# Spec — Nombre accesible redundante en preguntas de test (el legend repite el botón «Fijar pregunta»)

- **Issue**: #45 · https://github.com/Llambi/plancha-app/issues/45
- **Estado**: borrador
- **Autor**: Llambi (vía Claude Code)
- **Fecha**: 2026-07-07

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

En `TestQuestion.astro`, el `<legend>` del fieldset envuelve tanto el
enunciado como el `<PinButton />`. Como el nombre accesible de un
`fieldset` se deriva de su `legend`, el grupo completo se anuncia con el
texto del botón incluido (ej. "1 ¿Cuándo se dice que un agente es
racional? Fijar pregunta"), y el lector vuelve a anunciar el botón por
separado al llegar a él. Ruido menor pero constante, repetido en cientos
de preguntas.

## Resultado esperado

El nombre accesible del `fieldset` de cada pregunta es solo el texto de la
pregunta (enunciado + indicadores como "selección múltiple" o "×N en
exámenes" si los hay), sin el texto del botón "Fijar pregunta". Layout
visual sin cambios.

## Criterios de aceptación

1. **Dado** una pregunta de test, **cuando** se calcula su nombre accesible
   (`fieldset`), **entonces** es exactamente el texto de `.tq-q` (enunciado
   - indicadores), sin "Fijar pregunta".
2. **Dado** el layout visual actual (número, enunciado y botón de fijar en
   una fila), **cuando** se aplica este cambio, **entonces** no hay ningún
   cambio visual (solo se añaden atributos de accesibilidad, no se toca el
   DOM/CSS visual).
3. **Dado** el botón de fijar pregunta, **cuando** se aplica este cambio,
   **entonces** sigue funcionando y anunciándose igual que hoy (su propio
   `aria-label`/`aria-pressed`, sin cambios).

## Alcance

- Incluye: el `<fieldset>` de `TestQuestion.astro` (usado en todas las
  preguntas de test del sitio).
- **No-objetivos**:
  - No se saca `<PinButton />` del `<legend>` en el DOM (la opción de
    reestructurar el layout se descarta por el riesgo/complejidad de que
    `<legend>` deje de ser hijo directo de `<fieldset>` — perdería su
    semántica nativa de legend). Se usa la alternativa que la propia issue
    ya contempla: `aria-labelledby` apuntando solo al texto.
  - No se toca `EsquemaTree.astro` ni `DesarrolloQuestion.astro`, que
    también usan `<PinButton />` pero no son `<fieldset>`/`<legend>` (no
    aplica el mismo mecanismo de nombre accesible).

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No. Cambio de atributos de accesibilidad en
  `src/components/TestQuestion.astro`.

## Dudas abiertas

- Ninguna: la propia issue ya especifica la alternativa a aplicar si no se
  saca el botón del legend.
