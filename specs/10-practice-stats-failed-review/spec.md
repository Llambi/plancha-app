# Spec — Estadísticas de práctica y modo «solo repasar mis fallos»

- **Issue**: #10 · https://github.com/Llambi/plancha-app/issues/10
- **Estado**: borrador
- **Autor**: Hugo Perez Fernandez
- **Fecha**: 2026-06-30

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

Tras persistir el progreso (#8), el estudiante puede corregir el test y ver su
puntuación de la sesión, pero no tiene memoria de su rendimiento a lo largo del
tiempo: qué preguntas falla más, su porcentaje de acierto, ni una forma de repasar
solo lo que aún no domina. Repasar siempre el banco completo (p. ej. 259 preguntas
en DAR) es ineficiente. Falta convertir las correcciones en información útil para
dirigir el estudio.

## Resultado esperado

Cada vez que el estudiante corrige el test, el resultado por pregunta se acumula
como estadística por asignatura. En la propia página de práctica ve un resumen
(preguntas respondidas, % de acierto y las preguntas que más falla, con enlace a
cada una) y puede activar un modo **«solo mis fallos»** que oculta las preguntas
que no necesita repasar. Todo en el navegador (sitio estático), aislado por
asignatura, y reiniciable de forma explícita e independiente del progreso de #8.

## Modelo de «fallo» (decisión)

- Una pregunta está «fallada» (entra en el filtro «solo mis fallos») si su
  **corrección más reciente** fue incorrecta. **Sale** del conjunto en cuanto se
  acierta. El conjunto se autolimpia a medida que el estudiante mejora.
- El ranking de «preguntas más falladas» se ordena por **número acumulado de
  fallos** (cuántas veces se ha corregido mal), no solo por el último intento.

## Criterios de aceptación

Cada criterio en formato Given / When / Then y verificable:

1. **Dado** que respondo y pulso «Corregir» en `/practica/<asignatura>`, **cuando**
   se corrige, **entonces** por cada pregunta respondida se registra el resultado
   (acierto/fallo) en estadísticas acumuladas en `localStorage`, namespaced por
   asignatura (p. ej. `plancha:stats:<asignatura>`).
2. **Dado** que tengo estadísticas en una asignatura, **cuando** abro su página de
   práctica, **entonces** veo un resumen con: nº de preguntas respondidas, % de
   acierto global y la lista de preguntas más falladas (cada una enlazada a su
   ancla `#q-<id>`).
3. **Dado** que activo el modo **«solo mis fallos»**, **cuando** se aplica,
   **entonces** solo se muestran las preguntas cuya última corrección fue
   incorrecta; al desactivarlo, se vuelven a mostrar todas.
4. **Dado** que estoy en modo «solo mis fallos» y acierto una pregunta antes
   fallada y vuelvo a corregir, **cuando** se recalcula, **entonces** esa pregunta
   deja de contar como fallo (sale del conjunto en la siguiente aplicación del
   filtro).
5. **Dado** que tengo estadísticas, **cuando** pulso **reiniciar estadísticas**,
   **entonces** se borran las estadísticas de esa asignatura (el resumen queda
   vacío) sin afectar al progreso de respuestas (#8), que tiene su propio reinicio.
6. **Dado** un contenido cambiado (ids obsoletos) o `localStorage` no disponible,
   **cuando** se leen/agregan estadísticas, **entonces** se degrada con elegancia
   (ids desconocidos ignorados, sin errores visibles).
7. **Dado** una asignatura sin estadísticas todavía, **cuando** abro su página,
   **entonces** el resumen comunica el estado vacío y el modo «solo mis fallos» no
   oculta nada (no hay fallos registrados).

## Alcance

- Incluye:
  - Registro acumulado por pregunta al corregir: nº de intentos, nº de fallos y si
    el último intento fue fallo.
  - Resumen en la página de práctica: respondidas, % de acierto, top de más
    falladas con deep-link.
  - Toggle «solo mis fallos» que filtra las preguntas visibles.
  - Reinicio de estadísticas independiente del reinicio de progreso (#8).
  - Núcleo de agregación puro en `src/lib/`, testeado con Vitest; e2e del registro
    al corregir y del filtro de fallos.
- **No-objetivos**:
  - Algoritmo de repetición espaciada completo (SM-2/Anki): basta «repasar fallos».
  - Backend o sincronización entre dispositivos.
  - Estadísticas de preguntas de desarrollo (su autoevaluación es la issue #12) ni
    de la práctica de MongoDB.
  - Página/sección de estadísticas aparte (se resuelve con panel en la página).
  - Gráficas o visualizaciones; basta texto/listas.

## Impacto en el contenido / constitución

- ¿Toca `src/content/` (test, desarrollo, esquemas, guía)? **No.**
- No se modifica ningún enunciado, opción, solución ni explicación: el cambio es de
  comportamiento de UI/almacenamiento del lado cliente.
- Convenciones de código y Git (inglés en código nuevo, vocabulario de dominio en
  español, commits/PR en inglés) aplican con normalidad.

## Dudas abiertas

- Ninguna pendiente. Decisiones tomadas con el usuario:
  - **«Fallos» = última corrección incorrecta** (autolimpiable al acertar).
  - **Resumen como panel en la propia página de práctica** (sin ruta nueva).
