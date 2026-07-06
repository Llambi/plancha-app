# Spec — Práctica: «Modo examen» y «Estadísticas» como secciones colapsables

- **Issue**: #32 · https://github.com/Llambi/plancha-app/issues/32
- **Estado**: borrador
- **Autor**: Llambi (Hugo Perez)
- **Fecha**: 2026-07-03

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

En `src/pages/practica/[asignatura].astro`, los paneles de **estadísticas**
(`.stats [data-stats]` en test y `.stats [data-dev-stats]` en desarrollo) y de
**modo examen** (`.exam [data-exam-panel]`) se renderizan **siempre expandidos** y
**antes de la primera pregunta**. Eso empuja la pregunta 1 bastante hacia abajo —
más notable en móvil. Se descartó usar un modal (la app ya tiene dos patrones de
overlay: buscador→drawer y minimapa→FAB+drawer, y las estadísticas conviene
verlas de un vistazo, no ocultas tras un clic).

## Resultado esperado

Al abrir una página de práctica, los paneles de estadísticas y de modo examen
aparecen **colapsados**, mostrando un **resumen de una línea** siempre visible.
La pregunta 1 queda mucho más arriba (menos scroll inicial, sobre todo en móvil).
Quien quiera el detalle o configurar el simulacro, expande el panel; todo sigue
siendo operable por teclado y anunciado por lectores de pantalla. La funcionalidad
existente (modo examen, «solo mis fallos», filtro de tema, autoevaluación) no
cambia.

## Criterios de aceptación

1. **Dado** que se carga una página de práctica con paneles de estadísticas y/o
   modo examen, **cuando** se renderiza, **entonces** ambos aparecen
   **colapsados por defecto**, con un **resumen de una línea** visible sin
   expandir (p. ej. «Acumulado: 74%» en estadísticas; «20 min · barajado» en
   modo examen si hay configuración guardada; un texto neutro si no hay datos).
2. **Dado** un panel colapsado, **cuando** se opera con teclado (Enter/Espacio
   sobre el disparador), **entonces** expande/colapsa, y el estado
   expandido/colapsado se anuncia correctamente a lectores de pantalla (patrón
   nativo `<details>`/`<summary>`).
3. **Dado** el estado por defecto (colapsado), **cuando** se compara la posición
   de la pregunta 1 con el estado anterior (paneles expandidos), **entonces** la
   pregunta 1 queda visible antes (menos desplazamiento inicial), especialmente
   en viewport móvil.
4. **Dado** un cambio en las estadísticas o en la configuración de examen,
   **cuando** se actualiza el resumen, **entonces** refleja el estado real y
   **no rompe** `renderStats()` ni `renderDevStats()` (el detalle completo sigue
   disponible al expandir).
5. **Dado** que se expande o colapsa un panel, **cuando** hay funcionalidad
   activa (modo examen en curso, «solo mis fallos», filtro de tema),
   **entonces** colapsar/expandir **no interfiere** con esa funcionalidad.

## Alcance

- Incluye: el **contenedor y la presentación** de los tres paneles en
  `src/pages/practica/[asignatura].astro` — estadísticas de test
  (`[data-stats]`), modo examen (`[data-exam-panel]`) y estadísticas de
  desarrollo (`[data-dev-stats]`) — convertidos en colapsables (`<details>`),
  con su resumen compacto en el `<summary>`.
- **No-objetivos**:
  - No se implementa como **modal** (descartado, ver Problema).
  - No se cambia la **lógica interna** de modo examen ni de estadísticas
    (`renderStats`, `renderDevStats`, examen, filtros); solo su
    presentación/contenedor.
  - No se persiste el estado expandido/colapsado entre sesiones (reevaluable si
    se pide más adelante).

## Impacto en el contenido / constitución

- ¿Toca `src/content/` (test, desarrollo, esquemas, guía)? **No.**
- Cambio de markup/CSS/JS de presentación en `src/pages/practica/[asignatura].astro`.
  No modifica contenido transcrito ni el schema Zod de las colecciones.

## Dudas abiertas

- Ninguna que bloquee: los criterios de la issue son concretos y verificables. El
  contenido exacto del resumen compacto y el detalle de estilos se concretan en
  `plan.md`.
