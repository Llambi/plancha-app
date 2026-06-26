---
asignatura: si
tema: T5
num: "5"
bloque: Bloque 2 · Conocimiento
titulo: Lenguaje de ontologías
clave: <b>RDF</b> representa el conocimiento como tripletas <span class='mono'>sujeto-predicado-objeto</span>. <b>RDFS</b> añade jerarquías; <b>OWL</b> añade axiomas; <b>SPARQL</b> consulta.
orden: 5
---

- RDF (Resource Description Framework)
  - Tripleta = <span class='mono'>&lt;sujeto&gt; &lt;predicado&gt; &lt;objeto&gt;</span> (oración simple)
  - Recursos identificados con <b>URIs</b> · también literales
  - Modelo abstracto → serializaciones: <b>RDF/XML, Turtle, N3, N-Triples, JSON-LD</b>
- RDF Schema (RDFS)
  - Capa semántica sobre RDF (no imprescindible para RDF)
  - <span class='mono'>rdf:type</span> = sujeto es instancia del objeto
  - <span class='mono'>rdfs:subClassOf</span> = jerarquía de clases/subclases · dominio y rango
- OWL (Web Ontology Language)
  - Capa sobre RDFS, basado en RDF · más rico en metadatos
  - Aporta <b>axiomas</b>, restricciones bidireccionales, <span class='mono'>owl:sameAs</span>, inferencia
- SPARQL
  - Lenguaje de consulta para ontologías RDF (sintaxis tipo SQL)
  - <b>Endpoints</b>: consultan almacenes de tripletas (triple stores)
- Linked Data
  - Tripletas RDF basadas en recursos, enlazadas entre sí

