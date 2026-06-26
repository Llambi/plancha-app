---
asignatura: si
id: si-dev-t6
tema: T6
kind: desarrollo
enunciado: ¿Qué es Protégé y para qué sirve su razonador? Indica un ejemplo de inconsistencia que detectaría.
orden: 16
---

<ul>
<li>Protégé es el editor de ontologías OWL más usado: gratuito, open source (Stanford), de escritorio o web (WebProtégé).</li>
<li>Recuerda: Protégé solo <b>digitaliza</b> la ontología; la representación del conocimiento se diseña antes.</li>
<li>El <b>razonador</b> (HermiT por defecto; también Pellet, FaCT++) comprueba la consistencia e infiere nuevos axiomas.</li>
<li>Ejemplo de inconsistencia: una clase que sea subclase de dos clases disjuntas, o una propiedad asignada fuera de su dominio (p. ej. hasTopping en algo que no es Pizza).</li>
</ul>
