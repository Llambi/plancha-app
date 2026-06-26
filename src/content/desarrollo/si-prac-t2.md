---
asignatura: si
id: si-prac-t2
tema: T2
titulo: Clasificar el tipo de agente
kind: practico
enunciado: Un <b>coche autónomo</b> que recuerda el tráfico reciente, planifica la ruta hacia un destino y, entre varias rutas válidas, elige la más rápida y segura. Clasifícalo según los cuatro tipos de Russell & Norvig y justifica cada descarte.
orden: 102
---

<ul>
<li>No es <b>reactivo simple</b>: usa memoria del tráfico (estado interno), no solo la percepción actual.</li>
<li>Es más que <b>basado en modelos</b>: además del estado, persigue una meta (llegar al destino).</li>
<li>Supera al <b>basado en objetivos</b>: no le basta llegar; entre rutas válidas elige según tiempo y seguridad.</li>
<li>Es un <b>agente basado en utilidad</b>: usa una función de utilidad que pondera tiempo/seguridad/coste para elegir la mejor alternativa.</li>
</ul>
