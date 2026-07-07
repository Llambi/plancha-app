# Spec — Textarea del validador de MongoDB sin `<label>` asociado

- **Issue**: #44 · https://github.com/Llambi/plancha-app/issues/44
- **Estado**: borrador
- **Autor**: Llambi (vía Claude Code)
- **Fecha**: 2026-07-07

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

En `src/components/MongoPractica.astro`, el `<textarea>` donde se pega el
JSON de cada colección (bloque "Caso práctico") solo tiene `placeholder`
como texto, sin `<label>` ni `aria-label`. El placeholder no es un
sustituto accesible de un label: desaparece al escribir, y aquí es un texto
largo y multilínea que un lector de pantalla anuncia entero como "nombre"
del campo cada vez que se enfoca.

## Resultado esperado

Cada textarea de colección tiene un nombre accesible corto, estable y
distinto por colección (p. ej. "JSON de la colección db.peliculas"),
independiente de su `placeholder` (que se mantiene igual, como ejemplo de
formato).

## Criterios de aceptación

1. **Dado** un ejercicio con varias colecciones (p. ej. Ejercicio 1:
   `peliculas` y `clientes`), **cuando** se inspecciona el nombre accesible
   de cada textarea, **entonces** cada una tiene un nombre distinto que
   identifica su colección, no el placeholder.
2. **Dado** ese nombre accesible, **cuando** se borra o cambia el contenido
   del textarea, **entonces** el nombre accesible no cambia (no depende del
   `placeholder`, que sí desaparece al escribir).
3. **Dado** el resto del bloque "Caso práctico" (validar colección, cargar
   ejemplo, resultados), **cuando** se aplica este cambio, **entonces** no
   hay ninguna diferencia visual ni de comportamiento.

## Alcance

- Incluye: el `<textarea>` de cada colección en el bloque "Caso práctico"
  del validador de MongoDB.
- **No-objetivos**:
  - No se toca el bloque "Test de consultas" (ya resuelto en #41).
  - No se añade validación de formato al propio textarea (fuera de alcance).

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No. El validador de MongoDB no usa colecciones de
  contenido; sus ejercicios están definidos inline en `MongoPractica.astro`.

## Dudas abiertas

- Ninguna: la propuesta de texto del label ("JSON de la colección
  db.<nombre>") ya viene dada por la issue original.
