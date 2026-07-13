# Spec — Home: mostrar el % de progreso acumulado en la tarjeta de cada asignatura

- **Issue**: #50 · https://github.com/Llambi/plancha-app/issues/50
- **Estado**: aprobada
- **Autor**: Llambi
- **Fecha**: 2026-07-13

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

Las estadísticas de aciertos por asignatura ya existen en `localStorage`
(`src/lib/practica-stats.ts`) pero solo se muestran al entrar en
`/practica/<asignatura>`. La home (`src/pages/index.astro`) no da ninguna pista de
qué asignaturas ya se han empezado a repasar, obligando a entrar en cada una para
saberlo.

## Resultado esperado

Al volver a la home, cada tarjeta de tipo "práctica" con progreso guardado muestra
de un vistazo el acierto acumulado (mismo dato y formato que dentro de la página de
práctica), sin tener que entrar. Las tarjetas sin progreso guardado se ven igual que
hoy.

## Criterios de aceptación

1. **Dado** una asignatura de tipo práctica sin estado guardado en
   `plancha:stats:<asignatura>`, **cuando** se carga la home, **entonces** su
   tarjeta no muestra ningún indicador de progreso (no aparece un "0%" intrusivo).
2. **Dado** una asignatura de tipo práctica con estado guardado y al menos una
   pregunta respondida, **cuando** se carga la home, **entonces** su tarjeta
   muestra el acierto acumulado devuelto por `summarize()`/`formatStatsChip()`
   (mismo texto/porcentaje que el chip colapsado de `/practica/<asignatura>`).
3. **Dado** que el indicador se calcula leyendo `localStorage` en el cliente,
   **cuando** se hace el build estático, **entonces** no se requiere ningún cambio
   en el modelo de datos ni en las colecciones de contenido (Zod/config.ts
   intactos).
4. **Dado** la tarjeta de práctica de MongoDB (`/practica/mongodb`, validador
   interactivo sin `practica-stats`), **cuando** se carga la home, **entonces** no
   muestra el indicador (no tiene estado en `plancha:stats:`).

## Alcance

- Incluye: leer `plancha:stats:<asignatura>` en un script cliente de
  `src/pages/index.astro`, reutilizando `parseStats`/`summarize`/
  `formatStatsChip` de `src/lib/practica-stats.ts`; añadir el indicador visual a
  las tarjetas `tipo: 'practica'` correspondientes.
- **No-objetivos**: no se cambia el cálculo de estadísticas, no se añade
  progreso a tarjetas de esquemas/guía (issue distinta), no se persiste nada
  nuevo, no se toca `src/content/`.

## Impacto en el contenido / constitución

- ¿Toca `src/content/`? No.
- Cambio puramente de UI/lectura de `localStorage` en `src/pages/index.astro`,
  reutilizando lógica ya testeada de `src/lib/practica-stats.ts`.

## Dudas abiertas

Ninguna: la issue especifica origen del dato (`practica-stats.ts`), formato
(reutilizar `summarize()`/`formatStatsChip()`) y el caso "sin progreso" (no
indicador).
