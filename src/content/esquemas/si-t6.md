---
asignatura: si
tema: T6
num: "6"
bloque: Bloque 2 · Conocimiento
titulo: Software de creación de ontologías
clave: Editar RDF/OWL a mano es inviable; los <b>editores de ontologías</b> dan interfaz gráfica. <b>Protégé</b> es el más usado y su <b>razonador</b> comprueba consistencia e infiere.
orden: 6
---

- Editores de ontologías
  - Generan RDF de una ontología diseñada antes · exportan varias serializaciones · escritorio o web
  - Ejemplos: <b>Protégé</b>, WebProtégé, Apollo, NeOn Toolkit, SWOOP, TopBraid Composer
- Protégé
  - <b>Gratuito y open source</b> (Stanford) · OWL 2, RDF/XML, Turtle, OWL/XML, OBO
  - Ejecución: <span class='mono'>run.bat</span> (Windows) / <span class='mono'>run.sh</span> (Linux)
  - Pestañas y vistas <b>configurables</b> · toda clase hereda de <span class='mono'>Thing</span>
  - Propiedades: transitivas, simétricas, asimétricas, reflexivas…
- Razonador
  - Comprueba <b>consistencia</b> e infiere nuevos axiomas (no solo consistencia)
  - Incluido: <b>HermiT</b> · también Pellet, FaCT++
  - Detecta, p. ej., subclase de dos clases disjuntas o propiedad fuera de su dominio
- Ontologías en Python — Owlready2
  - Importa/exporta NTriples y RDF/XML · manipula como objetos Python · carga DBpedia · usa HermiT/Pellet

