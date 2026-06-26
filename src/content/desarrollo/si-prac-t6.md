---
asignatura: si
id: si-prac-t6
tema: T6
titulo: Flujo de trabajo en Protégé
kind: practico
enunciado: Enumera los pasos para, en Protégé, crear la clase <code>Pizza</code> con la subclase <code>Margherita</code>, una propiedad de objeto <code>hasTopping</code> y comprobar la consistencia. ¿Qué razonador usarías?
orden: 106
---

<ul>
<li>1) <i>File → New</i>: aparece la clase raíz <code>Thing</code>.</li>
<li>2) En la pestaña <i>Entities/Classes</i>, crear <code>Pizza</code> como subclase de <code>Thing</code> y <code>Margherita</code> como subclase de <code>Pizza</code>.</li>
<li>3) En <i>Object Properties</i>, crear <code>hasTopping</code>; opcionalmente caracterizarla (transitiva, simétrica…) y fijar dominio/rango.</li>
<li>4) Asignar la restricción (p. ej. <code>hasTopping</code> solo aplica a <code>Pizza</code>).</li>
<li>5) Menú <i>Reasoner → HermiT</i> y pulsar <kbd>Ctrl+R</kbd>: comprueba consistencia e infiere la jerarquía. Alternativas: Pellet, FaCT++.</li>
</ul>
