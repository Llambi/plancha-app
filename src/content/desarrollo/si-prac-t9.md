---
asignatura: si
id: si-prac-t9
tema: T9
titulo: Elegir el enfoque de aprendizaje automático
kind: practico
enunciado: "Para cada caso indica si es <b>supervisado o no supervisado</b>, si es <b>clasificación o regresión</b> (cuando aplique) y propón un algoritmo del tema: (a) predecir el precio de una vivienda; (b) agrupar clientes por hábitos de compra sin etiquetas; (c) decidir si un correo es spam."
orden: 109
---

<ul>
<li>(a) Precio de vivienda → <b>supervisado, regresión</b> (salida continua). Algoritmo: regresión / árboles de regresión.</li>
<li>(b) Agrupar clientes sin etiquetas → <b>no supervisado</b>, clustering. Algoritmo: <b>k-medias</b>.</li>
<li>(c) Spam / no spam → <b>supervisado, clasificación</b> (salida discreta). Algoritmo: <b>Naive Bayes</b>, SVM o KNN.</li>
<li>En los supervisados, valida con un conjunto de prueba independiente (etiquetas reales vs predichas).</li>
</ul>
