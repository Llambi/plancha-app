---
asignatura: si
id: si-prac-t5
tema: T5
titulo: Convertir lenguaje natural en tripletas RDF
kind: practico
enunciado: "Convierte en tripletas <code>&lt;sujeto&gt; &lt;predicado&gt; &lt;objeto&gt;</code> el texto: «Ana es una persona, Ana conoce a Luis y Luis trabaja en el Hospital Central». Añade además una sentencia con <code>rdf:type</code> y otra con <code>rdfs:subClassOf</code>."
orden: 105
---

<ul>
<li><pre>&lt;Ana&gt;   &lt;esUn&gt;       &lt;Persona&gt;
&lt;Ana&gt;   &lt;conoce&gt;     &lt;Luis&gt;
&lt;Luis&gt;  &lt;trabajaEn&gt;  &lt;HospitalCentral&gt;</pre></li>
<li>Con vocabulario RDF/RDFS:</li>
<li><pre>ex:Ana   rdf:type        ex:Persona
ex:Medico rdfs:subClassOf ex:Persona</pre></li>
<li>Recuerda: cada recurso se identificaría con una URI; rdf:type marca la instancia y rdfs:subClassOf la jerarquía de clases.</li>
</ul>
