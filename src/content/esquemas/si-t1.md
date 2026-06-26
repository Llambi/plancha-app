---
asignatura: si
tema: T1
num: "1"
bloque: Bloque 1 · Agentes
titulo: Teoría de agentes
clave: Un <b>agente</b> percibe su entorno con sensores y actúa con actuadores de forma autónoma; es <b>racional</b> si elige la acción que maximiza su rendimiento esperado.
orden: 1
---

- Definición de agente
  - <b>Desde la IA</b>: entidad situada en un entorno que lo percibe (sensores) y actúa sobre él (actuadores)
  - <b>Desde la ing. software</b>: elemento de diseño autónomo dentro de un sistema mayor
  - Puede ser físico (robot) o virtual (software)
- Agente racional
  - Toma la decisión que más lo acerca a su objetivo (maximiza rendimiento)
  - <b>Racionalidad limitada</b>: resultado <i>suficiente</i> según la info disponible, con margen de error
- Conocimiento del entorno → autonomía
  - <b>A priori</b>: incorporado en el diseño
  - <b>Aprendido</b>: adquirido por experiencia
  - Solo a priori ⇒ NO autónomo · Aprender ⇒ autonomía (lo normal es mixto)
- Agentes que aprenden
  - Elemento de aprendizaje + crítico + elemento de rendimiento (actor) + generador de problemas
- Agentes vs objetos (Wooldridge)
  - Autonomía más fuerte (deciden si atienden peticiones)
  - Comportamiento flexible: reactivo, proactivo, social
  - Multi-hilo (cada agente ≥1 hilo de control)
- Programación orientada a agentes (POA)
  - 4 principios (Franklin & Graesser): <b>autonomía, persistencia, reactividad, habilidad social</b>
  - Término surgió en <span class='mono'>1997</span> · Shoham (1993) · framework <span class='mono'>JADE</span>
  - Se compara con la POO pero NO son lo mismo

