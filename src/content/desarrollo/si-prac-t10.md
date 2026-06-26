---
asignatura: si
id: si-prac-t10
tema: T10
titulo: Diseñar un sistema experto
kind: practico
enunciado: Diseña a alto nivel un sistema experto para el <b>diagnóstico de averías</b> de un electrodoméstico. Indica sus módulos, qué guarda la base de conocimiento y la memoria de trabajo, y si usarías encadenamiento hacia adelante o hacia atrás.
orden: 110
---

<ul>
<li><b>Módulos:</b> base de conocimiento (reglas de averías), motor de inferencia, memoria de trabajo (base de hechos), módulo de explicación, interfaz de usuario e interfaz de adquisición.</li>
<li><b>Base de conocimiento:</b> reglas tipo «SI no enciende Y enchufe OK ENTONCES revisar fusible».</li>
<li><b>Memoria de trabajo:</b> hechos del caso concreto, hipótesis y conclusiones intermedias.</li>
<li><b>Encadenamiento:</b> si el usuario describe síntomas y queremos llegar a la causa → <b>hacia adelante</b> (guiado por datos). Si partimos de «sospecho que es el fusible» y pedimos datos que lo confirmen → <b>hacia atrás</b>.</li>
<li>Podría construirse desde cero o sobre un <b>Shell</b> (sistema experto sin base de conocimiento).</li>
</ul>
