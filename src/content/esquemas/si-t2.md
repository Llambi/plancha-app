---
asignatura: si
tema: T2
num: "2"
bloque: Bloque 1 · Agentes
titulo: Arquitectura de agentes
clave: "Se clasifican por <b>cómo deciden la acción</b> tras una percepción. Cada tipo añade capacidad al anterior: reflejo → modelo → objetivos → utilidad."
orden: 2
---

- Criterio de clasificación
  - Los <b>criterios de decisión</b> al elegir la acción tras un estímulo (no el lenguaje ni el hardware)
- Reactivo simple
  - Solo percepción actual · reglas <b>condición-acción</b>
  - Sin memoria; misma lectura ⇒ misma acción · funciona si el entorno es totalmente observable
- Reactivo basado en modelos
  - Estado interno + historial de percepciones
  - <b>Modelo de transición</b> (cómo evoluciona el mundo) y <b>de sensor</b>
  - No determina con exactitud un entorno parcialmente observable (incertidumbre inevitable)
- Basado en objetivos
  - Añade información de <b>meta</b> → búsqueda y planificación (proactivo)
  - Razona sobre el futuro; permite cambiar el objetivo sin renegociar reglas
  - Relación BDI: creencias=modelo · deseos=objetivos · intenciones=acciones inmediatas
- Basado en utilidad
  - <b>Función de utilidad</b>: asigna a cada estado un número real (la «felicidad»)
  - Útil cuando hay <b>varias alternativas</b>: elige la mejor manera de alcanzar el objetivo

