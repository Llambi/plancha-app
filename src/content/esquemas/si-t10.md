---
asignatura: si
tema: T10
num: "10"
bloque: Bloque 4 · Aplicaciones
titulo: Sistemas basados en conocimiento y sistemas expertos
clave: "Un <b>sistema experto</b> emula a un experto humano en un dominio. Aporte clave de <b>MYCIN</b>: separar el <b>motor de inferencia</b> de la <b>base de conocimiento</b>."
orden: 10
---

- Definición
  - Emula el comportamiento de un <b>experto humano</b> en un área concreta (no propósito general)
  - Se define por su <b>funcionalidad</b>, no por su tecnología (heurística simple o motor complejo)
- MYCIN (Shortliffe, Stanford, años 70)
  - Diagnóstico de enfermedades infecciosas de la sangre · acierto ~70%
  - Separó por primera vez <b>motor de inferencia</b> y <b>base de conocimiento</b>
  - Interacción con el usuario + explicación de resultados (no fue EL primero: DENDRAL es anterior)
- Elementos / arquitectura
  - <b>Base de conocimiento</b> · <b>Motor de inferencia</b> (el que «piensa») · <b>Memoria de trabajo</b> (base de hechos)
  - Módulo de explicación · Interfaz de usuario · Interfaz de adquisición
- Motor de inferencia
  - <b>Hacia adelante</b>: guiado por datos → objetivo
  - <b>Hacia atrás</b>: parte de una hipótesis y pide datos para confirmarla
  - Determinista vs probabilístico · equivale al razonador de las ontologías
- Creación y CBR
  - Desde cero o con un <b>Shell</b> (sistema experto sin base de conocimiento)
  - <b>CBR</b> (razonamiento basado en casos): ciclo de las 4R → recuperar, reutilizar, revisar, retener

