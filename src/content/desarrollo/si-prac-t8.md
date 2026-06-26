---
asignatura: si
id: si-prac-t8
tema: T8
titulo: Formalizar en lógica de primer orden / Prolog
kind: practico
enunciado: "Formaliza en lógica de primer orden: «Todo estudiante que aprueba el examen recibe el título» y «Existe un estudiante que ha aprobado». Después, escribe en <b>Prolog</b> una regla <code>titulado/1</code> equivalente."
orden: 108
---

<ul>
<li>LPO: <code>∀x ( Estudiante(x) ∧ Aprueba(x) → RecibeTitulo(x) )</code></li>
<li>LPO: <code>∃x ( Estudiante(x) ∧ Aprueba(x) )</code></li>
<li>En Prolog (cláusulas de Horn, declarativo):</li>
<li><pre>titulado(X) :- estudiante(X), aprueba(X).

estudiante(ana).
aprueba(ana).

?- titulado(ana).   % true</pre></li>
<li>El cuantificador universal se traduce en la regla; el existencial, en la existencia de un hecho que la satisface.</li>
</ul>
