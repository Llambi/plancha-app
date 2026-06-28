# Spec — Buscador global en la topbar

- **Issue**: #2 · https://github.com/Llambi/plancha-app/issues/2
- **Estado**: aprobada
- **Autor**: Hugo Perez Fernandez
- **Fecha**: 2026-06-28

> Esta spec es el QUÉ y el POR QUÉ. El CÓMO va en `plan.md`. Es la copia
> versionada en la rama de la issue (fuente canónica = la propia issue en GitHub).

## Problema / necesidad

Hoy no hay forma de buscar en PlanchaAPP: para encontrar una pregunta, un tema o
un contenido concreto hay que entrar a cada documento (práctica, esquemas, guía)
y leerlo. Falta un buscador global que dé acceso rápido al material.

## Resultado esperado

Un **buscador global en la topbar**, disponible en todas las páginas, con
resultados dinámicos y deep-link al ítem concreto, más una página de resultados
completos. Búsqueda 100% client-side (sitio Astro estático) sobre un índice JSON
generado en build, con Fuse.js.

## Criterios de aceptación

1. **Dado** cualquier página, **cuando** el usuario escribe en el buscador de la
   topbar, **entonces** aparece debajo un bloque con resultados dinámicos; cada
   resultado muestra el **nombre de la asignatura**, el **tipo** (Práctica de
   examen / Esquema de estudio / Guía) y un fragmento del ítem.
2. **Dado** el bloque de resultados abierto, **cuando** pulsa **↑/↓**, **entonces**
   el foco se mueve por los resultados; **Enter** sobre uno navega a su ancla.
3. **Dado** texto en el buscador sin resultado resaltado, **cuando** pulsa
   **Enter**, **entonces** va a `/buscar?q=<texto>` con todos los resultados.
4. **Dado** el bloque de resultados, **cuando** hace **click** en un resultado,
   **entonces** navega a esa opción (deep-link al ancla).
5. **Dado** el bloque de resultados, **entonces** se ve una **leyenda** que
   explica el uso de ↑/↓ y Enter.
6. **Dado** `/buscar?q=<texto>`, **entonces** se listan **todos** los resultados
   agrupados por asignatura, con buscador sincronizado y estados vacíos.
7. La búsqueda casa por **nombre, descripción y contenido**, es insensible a
   tildes/mayúsculas y tolera erratas (Fuse.js).
8. Funciona en claro/oscuro, es accesible por teclado (patrón ARIA combobox) y
   respeta el base path `/plancha-app`. En móvil, un icono de lupa despliega el campo.

## Alcance

- **Incluye:** todos los documentos del home (práctica test+desarrollo, esquemas,
  guía SOA y la práctica de MongoDB), índice generado en build, buscador en la
  topbar con teclado/ratón, y página `/buscar`.
- **No-objetivos:** no se modifica contenido de exámenes/temarios (verbatim); sin
  backend ni búsqueda server-side; no se reescriben los componentes de render más
  allá de añadir anclas; no se indexan páginas fuera del home.

## Impacto en el contenido / constitución

- ¿Toca `src/content/` (test, desarrollo, esquemas, guía)? **No** (solo lectura
  para construir el índice).
- Se obedece `.claude/rules/contenido-examenes-y-temarios.md`: no se modifican
  enunciados/opciones/respuestas. Las anclas deep-link se **derivan en render** de
  campos ya existentes (`id`, `tema`, `num`); no se añade ningún campo nuevo a
  `src/content/` ni cambia el formato que producen las skills `add-exam` /
  `add-esquema`. Requisito ya cubierto por la constitución: `id` único por asignatura.

## Dudas abiertas

Ninguna pendiente. Decisiones cerradas con el usuario:

- Granularidad de resultado: **ítem concreto con deep-link**.
- Matching: **Fuse.js** (insensible a tildes, tolerante a erratas).
- Cobertura: **todos los documentos del home**.
- Móvil: **icono de lupa que despliega** el campo.
- Página `/buscar`: resultados **agrupados por asignatura**.
