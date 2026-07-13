# Spec — Exportar/importar el progreso de práctica (JSON)

- **Issue**: #56 · https://github.com/Llambi/plancha-app/issues/56
- **Estado**: aprobada
- **Autor**: Llambi
- **Fecha**: 2026-07-13

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

Todo el progreso del usuario (respuestas, estadísticas, autoevaluación de
desarrollo, fijados del minimapa) vive únicamente en `localStorage` del
navegador. Cambiar de dispositivo, usar modo privado o borrar caché pierde
todo ese historial sin aviso.

## Resultado esperado

Una acción "Exportar mi progreso" descarga un `.json` con todo el progreso
guardado; una acción "Importar" restaura ese archivo tal cual, en el mismo
navegador o en otro.

## Criterios de aceptación

1. **Dado** progreso guardado en varias asignaturas, **cuando** se exporta,
   **entonces** el `.json` descargado incluye, como mínimo, lo gestionado por
   `practica-progress.ts`, `practica-stats.ts`, `desarrollo-progress.ts` y los
   pines del minimapa.
2. **Dado** un `.json` exportado previamente, **cuando** se importa (en el
   mismo navegador o en otro, tras vaciar `localStorage`), **entonces** el
   estado queda exactamente como estaba en el momento de exportar (mismas
   asignaturas, mismas respuestas).
3. **Dado** un archivo que no es un export válido de PlanchaAPP, **cuando**
   se intenta importar, **entonces** se informa del error sin tocar el
   progreso ya guardado ni romper la página.
4. **Dado** que `localStorage` no está disponible (modo privado estricto,
   deshabilitado), **cuando** se exporta o se importa, **entonces** la
   función degrada con gracia (mismo patrón `safeGet`/`safeSet` ya usado en
   el resto del sitio), sin lanzar errores no controlados.

## Alcance

- Incluye: un núcleo puro de (de)serialización del export en
  `src/lib/export-progress.ts`; un punto de entrada en la home
  (`src/pages/index.astro`) con un botón "Exportar mi progreso" y un input de
  archivo "Importar"; cubre todas las claves de `localStorage` con el prefijo
  `plancha:` (progreso de test, estadísticas, autoevaluación de desarrollo,
  configuración del modo examen y pines del minimapa — todo lo que ya usa ese
  prefijo, sin tener que enumerar cada módulo a mano).
- **No-objetivos**: no exporta la preferencia de tema (`site-theme`, no lleva
  prefijo `plancha:` y no es "progreso"); no sincroniza entre dispositivos
  automáticamente (es exportar/importar manual); no cubre el estado del
  validador de MongoDB (no usa `localStorage`, no hay nada que exportar).

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No.
- Núcleo puro nuevo (`export-progress.ts`) + wiring de descarga/lectura de
  fichero en `index.astro`, reutilizando el mismo patrón `safeGet`/`safeSet`
  ya presente en varios componentes del sitio.

## Dudas abiertas

Ninguna: la issue especifica el mínimo de datos a cubrir y el patrón de
degradación (`safeGet`/`safeSet`). Cubrir por prefijo `plancha:` en vez de
enumerar claves módulo a módulo es una decisión de implementación (ver
`plan.md`), no cambia el alcance acordado.
