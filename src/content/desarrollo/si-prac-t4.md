---
asignatura: si
id: si-prac-t4
tema: T4
titulo: Diseñar una mini-ontología (7 pasos)
kind: practico
enunciado: "Diseña una ontología sencilla para una <b>biblioteca</b>. Indica: dominio/alcance, conceptos y jerarquía, al menos dos propiedades, una restricción y dos instancias. Sigue el esquema de construcción del tema."
orden: 104
---

<ul>
<li><b>Dominio/alcance:</b> catálogo de una biblioteca (libros, autores, préstamos).</li>
<li><b>Conceptos y jerarquía:</b> <code>Material</code> → {<code>Libro</code>, <code>Revista</code>}; <code>Persona</code> → {<code>Autor</code>, <code>Socio</code>}.</li>
<li><b>Propiedades:</b> <code>escritoPor</code> (Libro → Autor), <code>tieneISBN</code> (Libro → literal), <code>prestadoA</code> (Libro → Socio).</li>
<li><b>Restricción:</b> un <code>Libro</code> tiene exactamente un <code>ISBN</code>; un <code>Libro</code> puede estar prestado a un único <code>Socio</code> a la vez.</li>
<li><b>Instancias:</b> <i>El Quijote</i> es instancia de <code>Libro</code>; <i>Cervantes</i> es instancia de <code>Autor</code>; <code>escritoPor(El Quijote, Cervantes)</code>.</li>
</ul>
