---
asignatura: si
id: si-dev-t5
tema: T5
kind: desarrollo
enunciado: ¿Qué es una tripleta RDF? Explica la diferencia de expresividad entre RDF, RDFS y OWL.
orden: 15
---

<ul>
<li>Una tripleta RDF es una sentencia <code>&lt;sujeto&gt; &lt;predicado&gt; &lt;objeto&gt;</code>, equivalente a una oración simple; los recursos se identifican con URIs.</li>
<li><b>RDF</b>: modelo base de tripletas (serializable como RDF/XML, Turtle, N-Triples, JSON-LD).</li>
<li><b>RDFS</b>: capa sobre RDF que añade jerarquías de clases/subclases y propiedades, con dominios y rangos (rdf:type, rdfs:subClassOf).</li>
<li><b>OWL</b>: capa sobre RDFS con axiomas y mayor carga semántica (restricciones bidireccionales, owl:sameAs, inferencia).</li>
</ul>
