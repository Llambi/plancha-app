---
asignatura: soa
chapter: ch4
num: SH
titulo: Bash / Shell
badge: ★★
orden: 4
---

<div class="chapter-banner">
      <div class="ch-label">Cap&iacute;tulo 4 &middot; Programaci&oacute;n</div>
      <h1>Bash / Shell</h1>
      <p class="ch-desc">Paso a paso desde el echo hasta el men&uacute; completo con operaciones de ficheros. Aparece en algunos modelos del examen (2023B, 2025B/C).</p>
      <div class="objectives">
        <strong>Al terminar este cap&iacute;tulo sabr&aacute;s:</strong>
        echo &middot; variables &middot; read -p &middot; if/for/case/while &middot; mkdir/mv/rm/ls/cat/cp/chmod &middot; echo &gt;&gt; &middot; men&uacute; completo
      </div>
    </div>
    <div class="exam-alert" style="background:#E67E22;">
      <span class="stars">&#9733;&#9733;</span> OPCIONAL &mdash; Solo en algunos modelos. Si aparece: siempre es un men&uacute; bash con operaciones de ficheros/directorios.
    </div>
    <div class="content-area">

  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">1</div>
      <div><div class="paso-title">echo — Imprimir texto</div><div class="paso-subtitle">El printf de Bash</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>echo "texto"</code> imprime en consola con salto de línea automático. Todo script Bash empieza con la línea <code>#!/bin/bash</code> (shebang) — es obligatoria para indicar el intérprete.</p>
      <div class="code-block"><span class="bash-cmd">#!/bin/bash</span>
<span class="bash-cmd">echo</span> <span class="bash-str">"Hola Mundo"</span>
<span class="bash-cmd">echo</span> <span class="bash-str">"SOA 2026"</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Crea un script que imprima <strong>Inicio del script SOA</strong> y en la siguiente línea <strong>Autor: tu nombre</strong>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="bash-cmd">#!/bin/bash</span>
<span class="bash-cmd">echo</span> <span class="bash-str">"Inicio del script SOA"</span>
<span class="bash-cmd">echo</span> <span class="bash-str">"Autor: Andoni"</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">2</div>
      <div><div class="paso-title">Variables — Asignar y usar</div><div class="paso-subtitle">Sin espacios alrededor del =</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">En Bash las variables se asignan <strong>sin espacios</strong>: <code>nombre=valor</code>. Para usar el valor: <code>$nombre</code> o <code>${nombre}</code>. Con comillas dobles las variables se expanden; con comillas simples NO.</p>
      <div class="code-block"><span class="bash-var">nombre</span>=<span class="bash-str">"Ana"</span>
<span class="bash-var">edad</span>=<span class="num">25</span>
<span class="bash-cmd">echo</span> <span class="bash-str">"$nombre tiene $edad a&ntilde;os"</span>
<span class="bash-cmd">echo</span> <span class="bash-str">'$nombre no se expande'</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Guarda la cadena <code>Sistemas Operativos</code> en una variable y muéstrala con echo.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="bash-cmd">#!/bin/bash</span>
<span class="bash-var">asig</span>=<span class="bash-str">"Sistemas Operativos"</span>
<span class="bash-cmd">echo</span> <span class="bash-str">"Asignatura: $asig"</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">3</div>
      <div><div class="paso-title">read -p — Leer del usuario</div><div class="paso-subtitle">Entrada interactiva</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>read -p "mensaje: " variable</code> muestra el mensaje y guarda la entrada en la variable. El <code>-p</code> es el prompt (el mensaje). Es el equivalente a <code>Read-Host</code> en PS.</p>
      <div class="code-block"><span class="bash-cmd">read</span> -p <span class="bash-str">"Tu nombre: "</span> <span class="bash-var">nombre</span>
<span class="bash-cmd">echo</span> <span class="bash-str">"Hola $nombre"</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Pide al usuario que introduzca una ruta de directorio y guárdala en <code>$ruta</code>. Luego imprime: <em>Usarás la ruta: [ruta]</em></p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="bash-cmd">#!/bin/bash</span>
<span class="bash-cmd">read</span> -p <span class="bash-str">"Ruta del directorio: "</span> <span class="bash-var">ruta</span>
<span class="bash-cmd">echo</span> <span class="bash-str">"Usar&aacute;s la ruta: $ruta"</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">4</div>
      <div><div class="paso-title">if / elif / else — Condicional</div><div class="paso-subtitle">Espacios obligatorios en [ ]</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">Los corchetes <code>[ ... ]</code> necesitan espacios interiores. Operadores numéricos: <code>-eq</code>, <code>-ne</code>, <code>-gt</code>, <code>-lt</code>. Para strings: <code>=</code>, <code>!=</code>. Para ficheros: <code>-f</code> (fichero), <code>-d</code> (directorio).</p>
      <div class="code-block"><span class="kw">if</span> [ <span class="bash-var">$n</span> -gt <span class="num">10</span> ]; <span class="kw">then</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"Grande"</span>
<span class="kw">elif</span> [ <span class="bash-var">$n</span> -eq <span class="num">10</span> ]; <span class="kw">then</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"Exacto 10"</span>
<span class="kw">else</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"Peque&ntilde;o"</span>
<span class="kw">fi</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Pide un número; si es mayor que 100 di <strong>Muy grande</strong>, si es mayor que 10 di <strong>Grande</strong>, si no di <strong>Pequeño</strong>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="bash-cmd">read</span> -p <span class="bash-str">"N&uacute;mero: "</span> <span class="bash-var">n</span>
<span class="kw">if</span> [ <span class="bash-var">$n</span> -gt <span class="num">100</span> ]; <span class="kw">then</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"Muy grande"</span>
<span class="kw">elif</span> [ <span class="bash-var">$n</span> -gt <span class="num">10</span> ]; <span class="kw">then</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"Grande"</span>
<span class="kw">else</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"Peque&ntilde;o"</span>
<span class="kw">fi</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">5</div>
      <div><div class="paso-title">for — Bucle con rango</div><div class="paso-subtitle">Contar del N al M</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>for i in {1..5}; do ... done</code> — la sintaxis de rango usa llaves. Para rangos variables: <code>$(seq $n $m)</code>. Es el equivalente al bucle for de C.</p>
      <div class="code-block"><span class="kw">for</span> i <span class="kw">in</span> {1..5}; <span class="kw">do</span>
    <span class="bash-cmd">echo</span> <span class="bash-var">$i</span>
<span class="kw">done</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Imprime los números del <strong>5 al 15</strong>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="kw">for</span> i <span class="kw">in</span> {5..15}; <span class="kw">do</span>
    <span class="bash-cmd">echo</span> <span class="bash-var">$i</span>
<span class="kw">done</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">6</div>
      <div><div class="paso-title">case — El switch de Bash</div><div class="paso-subtitle">Múltiples opciones</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">El <code>case</code> de Bash es el equivalente al <code>switch</code> de C y PS. La sintaxis es: <code>case $var in patron) comandos ;; *) default ;; esac</code>. El <code>;;</code> es el equivalente al <code>break</code>.</p>
      <div class="code-block"><span class="kw">case</span> <span class="bash-var">$op</span> <span class="kw">in</span>
    1) <span class="bash-cmd">echo</span> <span class="bash-str">"Opci&oacute;n uno"</span> ;;
    2) <span class="bash-cmd">echo</span> <span class="bash-str">"Opci&oacute;n dos"</span> ;;
    *) <span class="bash-cmd">echo</span> <span class="bash-str">"Inv&aacute;lido"</span>    ;;
<span class="kw">esac</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Pide un color (rojo/verde/azul) y muestra su código hex: <strong>#FF0000 / #00FF00 / #0000FF</strong>. Si es otro: <em>Color desconocido</em>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="bash-cmd">read</span> -p <span class="bash-str">"Color: "</span> <span class="bash-var">c</span>
<span class="kw">case</span> <span class="bash-var">$c</span> <span class="kw">in</span>
    rojo)  <span class="bash-cmd">echo</span> <span class="bash-str">"#FF0000"</span> ;;
    verde) <span class="bash-cmd">echo</span> <span class="bash-str">"#00FF00"</span> ;;
    azul)  <span class="bash-cmd">echo</span> <span class="bash-str">"#0000FF"</span> ;;
    *)     <span class="bash-cmd">echo</span> <span class="bash-str">"Color desconocido"</span> ;;
<span class="kw">esac</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">7</div>
      <div><div class="paso-title">while true — El bucle del menú</div><div class="paso-subtitle">La base de cualquier menú Bash</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>while true; do ... done</code> crea un bucle infinito. Para salir se usa <code>break</code> o <code>exit 0</code>. Este es el patrón estándar para menús en Bash — combina con el <code>case</code> del paso anterior.</p>
      <div class="code-block"><span class="kw">while</span> <span class="bash-cmd">true</span>; <span class="kw">do</span>
    <span class="bash-cmd">read</span> -p <span class="bash-str">"Salir (s/n)? "</span> <span class="bash-var">op</span>
    [ <span class="bash-str">"$op"</span> = <span class="bash-str">"s"</span> ] &amp;&amp; <span class="kw">break</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"Continuando..."</span>
<span class="kw">done</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Haz un while true que pida números y los sume todos. Cuando el usuario introduzca <strong>0</strong>, sale y muestra el total.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="bash-var">suma</span>=<span class="num">0</span>
<span class="kw">while</span> <span class="bash-cmd">true</span>; <span class="kw">do</span>
    <span class="bash-cmd">read</span> -p <span class="bash-str">"N&uacute;mero (0=salir): "</span> <span class="bash-var">n</span>
    [ <span class="bash-var">$n</span> -eq <span class="num">0</span> ] &amp;&amp; <span class="kw">break</span>
    <span class="bash-var">suma</span>=$(( <span class="bash-var">$suma</span> + <span class="bash-var">$n</span> ))
<span class="kw">done</span>
<span class="bash-cmd">echo</span> <span class="bash-str">"Suma total: $suma"</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">8</div>
      <div><div class="paso-title">mkdir — Crear directorio</div><div class="paso-subtitle">El New-Item -ItemType Directory de Linux</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>mkdir nombre</code> crea un directorio. <code>mkdir -p ruta/completa</code> crea toda la ruta sin error aunque ya exista. Es el equivalente a <code>New-Item -ItemType Directory</code> en PS.</p>
      <div class="code-block"><span class="bash-cmd">mkdir</span> directorio1
<span class="bash-cmd">mkdir</span> -p proyecto/src/utils    <span class="cm"># crea toda la ruta</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Crea el directorio <strong>examen_soa</strong> y dentro de él el subdirectorio <strong>scripts</strong> con un solo comando.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="bash-cmd">mkdir</span> -p examen_soa/scripts
<span class="bash-cmd">echo</span> <span class="bash-str">"Directorios creados"</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">9</div>
      <div><div class="paso-title">mv — Mover o renombrar</div><div class="paso-subtitle">El Rename-Item de Linux</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>mv origen destino</code> mueve o renombra. Si el destino es un directorio, mueve el fichero dentro. Si es un nombre nuevo, renombra. Es el equivalente a <code>Rename-Item</code> en PS.</p>
      <div class="code-block"><span class="bash-cmd">mv</span> directorio1 directorio2      <span class="cm"># renombrar</span>
<span class="bash-cmd">mv</span> fichero.txt /tmp/            <span class="cm"># mover a /tmp/</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Renombra el directorio <strong>examen_soa</strong> a <strong>examen_soa_2026</strong>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="bash-cmd">mv</span> examen_soa examen_soa_2026
<span class="bash-cmd">echo</span> <span class="bash-str">"Renombrado correctamente"</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">10</div>
      <div><div class="paso-title">rm — Borrar ficheros y directorios</div><div class="paso-subtitle">El Remove-Item de Linux</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>rm fichero</code> borra un fichero. <code>rm -r directorio</code> borra directorio y todo su contenido. <code>rm -f</code> fuerza sin preguntar. Combina: <code>rm -rf directorio</code>.</p>
      <div class="code-block"><span class="bash-cmd">rm</span> fichero.txt
<span class="bash-cmd">rm</span> -rf directorio_temporal</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Borra el directorio <strong>examen_soa_2026</strong> y todo su contenido sin preguntar.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="bash-cmd">rm</span> -rf examen_soa_2026
<span class="bash-cmd">echo</span> <span class="bash-str">"Directorio eliminado"</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">11</div>
      <div><div class="paso-title">ls — Listar contenido</div><div class="paso-subtitle">El Get-ChildItem de Linux</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>ls</code> lista el directorio. <code>ls -l</code> con detalles (permisos, tamaño, fecha). <code>ls -la</code> incluye ficheros ocultos. <code>ls -lh</code> tamaños legibles (KB, MB).</p>
      <div class="code-block"><span class="bash-cmd">ls</span>          <span class="cm"># básico</span>
<span class="bash-cmd">ls</span> -la       <span class="cm"># con ocultos</span>
<span class="bash-cmd">ls</span> -lh /tmp  <span class="cm"># tamaños legibles</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Lista el directorio actual mostrando todos los ficheros (incluyendo ocultos), permisos y tamaño legible.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="bash-cmd">ls</span> -lah</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">12</div>
      <div><div class="paso-title">cat — Leer un fichero</div><div class="paso-subtitle">Mostrar contenido en pantalla</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>cat fichero</code> muestra el contenido completo del fichero. <code>cat -n fichero</code> muestra con números de línea. Muy útil para verificar que los ficheros se escribieron bien.</p>
      <div class="code-block"><span class="bash-cmd">cat</span> README.txt
<span class="bash-cmd">cat</span> -n script.sh   <span class="cm"># con n&uacute;meros de l&iacute;nea</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Muestra el contenido del fichero <code>/etc/hostname</code> (que contiene el nombre del equipo).</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="bash-cmd">cat</span> /etc/hostname</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">13</div>
      <div><div class="paso-title">echo > y >> — Escribir en fichero</div><div class="paso-subtitle">Redirigir salida</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>echo "texto" &gt; fichero</code> crea/sobreescribe el fichero. <code>echo "texto" &gt;&gt; fichero</code> añade al final sin borrar el contenido anterior. El operador <code>&gt;</code> es destructivo; <code>&gt;&gt;</code> acumula.</p>
      <div class="code-block"><span class="bash-cmd">echo</span> <span class="bash-str">"Primera l&iacute;nea"</span> &gt; log.txt
<span class="bash-cmd">echo</span> <span class="bash-str">"Segunda l&iacute;nea"</span> &gt;&gt; log.txt
<span class="bash-cmd">cat</span> log.txt</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Escribe <em>Hola desde Bash</em> en un fichero <strong>salida.txt</strong>. Luego añade la fecha con <code>$(date)</code>. Finalmente muestra el fichero con cat.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="bash-cmd">echo</span> <span class="bash-str">"Hola desde Bash"</span> &gt; salida.txt
<span class="bash-cmd">echo</span> <span class="bash-str">"Fecha: $(date)"</span> &gt;&gt; salida.txt
<span class="bash-cmd">cat</span> salida.txt</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">14</div>
      <div><div class="paso-title">cp — Copiar ficheros</div><div class="paso-subtitle">Duplicar sin mover</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>cp origen destino</code> copia un fichero. <code>cp -r directorio/ destino/</code> copia un directorio con todo su contenido. A diferencia de <code>mv</code>, el original permanece.</p>
      <div class="code-block"><span class="bash-cmd">cp</span> fichero.txt copia.txt
<span class="bash-cmd">cp</span> -r /home/user/docs /tmp/</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Copia el fichero <strong>salida.txt</strong> creado antes a <strong>salida_backup.txt</strong>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="bash-cmd">cp</span> salida.txt salida_backup.txt
<span class="bash-cmd">echo</span> <span class="bash-str">"Copia creada"</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">15</div>
      <div><div class="paso-title">chmod — Permisos de ejecución</div><div class="paso-subtitle">Hacer ejecutable un script</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>chmod +x script.sh</code> da permiso de ejecución. Los scripts Bash necesitan este permiso para ejecutarse con <code>./script.sh</code>. También se puede usar notación octal: <code>chmod 755</code> (rwxr-xr-x).</p>
      <div class="code-block"><span class="bash-cmd">chmod</span> +x mi_script.sh     <span class="cm"># dar ejecuci&oacute;n</span>
<span class="bash-cmd">chmod</span> 755 script.sh       <span class="cm"># rwxr-xr-x</span>
<span class="bash-cmd">chmod</span> 644 datos.txt       <span class="cm"># rw-r--r--</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Da permisos de ejecución al fichero <strong>mi_script.sh</strong> y luego comprueba los permisos con <code>ls -l</code>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="bash-cmd">chmod</span> +x mi_script.sh
<span class="bash-cmd">ls</span> -l mi_script.sh</div></div>
      </div>
    </div>
  </div>
  <div class="integrador-box">
    <div class="int-label">Ejercicio Integrador</div>
    <h3>El Script Bash Completo &mdash; Como en el Examen Real</h3>
    <p>Escribe el script Bash completo con men&uacute; de 4 opciones:</p>
    <ol>
      <li>Listar el contenido del directorio actual (con atributos)</li>
      <li>Crear un subdirectorio (pedir nombre con read)</li>
      <li>Mostrar el contenido de un fichero (pedir nombre con read, comprobar que existe)</li>
      <li>Salir</li>
    </ol>
    <div class="solucion">
      <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver el script completo del examen</span><span class="sol-arrow">&#9660;</span></div>
      <div class="sol-content">
        <div class="code-block"><span class="bash-cmd">#!/bin/bash</span>

<span class="kw">while</span> <span class="bash-cmd">true</span>; <span class="kw">do</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">""</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"========== MENU BASH =========="</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"1. Listar directorio actual"</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"2. Crear subdirectorio"</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"3. Leer contenido de un fichero"</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"4. Salir"</span>
    <span class="bash-cmd">read</span> -p <span class="bash-str">"Opci&oacute;n: "</span> <span class="bash-var">op</span>

    <span class="kw">case</span> <span class="bash-var">$op</span> <span class="kw">in</span>
        1)
            <span class="bash-cmd">echo</span> <span class="bash-str">"--- Contenido del directorio actual ---"</span>
            <span class="bash-cmd">ls</span> -lah
            ;;
        2)
            <span class="bash-cmd">read</span> -p <span class="bash-str">"Nombre del directorio: "</span> <span class="bash-var">nombre</span>
            <span class="bash-cmd">mkdir</span> -p <span class="bash-str">"$nombre"</span>
            <span class="bash-cmd">echo</span> <span class="bash-str">"Directorio '$nombre' creado"</span>
            ;;
        3)
            <span class="bash-cmd">read</span> -p <span class="bash-str">"Nombre del fichero: "</span> <span class="bash-var">fichero</span>
            <span class="kw">if</span> [ -f <span class="bash-str">"$fichero"</span> ]; <span class="kw">then</span>
                <span class="bash-cmd">cat</span> <span class="bash-str">"$fichero"</span>
            <span class="kw">else</span>
                <span class="bash-cmd">echo</span> <span class="bash-str">"Error: fichero '$fichero' no encontrado"</span>
            <span class="kw">fi</span>
            ;;
        4)
            <span class="bash-cmd">echo</span> <span class="bash-str">"Saliendo..."</span>
            <span class="bash-cmd">exit</span> <span class="num">0</span>
            ;;
        *)
            <span class="bash-cmd">echo</span> <span class="bash-str">"Opci&oacute;n no v&aacute;lida"</span>
            ;;
    <span class="kw">esac</span>
<span class="kw">done</span></div>
      </div>
    </div>
  </div>


<div class="exam-real-section">
  <div class="section-heading">
    <div class="sec-num">Ejercicios Reales de Examen</div>
    <h2>Preguntas Bash sacadas de ex&aacute;menes anteriores</h2>
  </div>
  <p class="body-text">Bash aparece solo en algunos modelos. Cuando sale, siempre es un men&uacute; con operaciones de ficheros o directorios.</p>

  <div class="exam-real-card">
    <div class="erc-header">
      <div class="erc-year">2023 &mdash; Modelo B</div>
      <div class="erc-label">Pregunta de desarrollo real</div>
    </div>
    <div class="erc-body">
      <div class="erc-enunciado"><strong>Problema Bash (opcional):</strong> Crea un script Bash con men&uacute; de 4 opciones que gestione un directorio:<br><br>
  &nbsp;&nbsp;<strong>1.</strong> Listar el contenido del directorio de trabajo<br>
  &nbsp;&nbsp;<strong>2.</strong> Crear un nuevo subdirectorio (el usuario introduce el nombre)<br>
  &nbsp;&nbsp;<strong>3.</strong> Eliminar un fichero del directorio (el usuario introduce el nombre)<br>
  &nbsp;&nbsp;<strong>4.</strong> Salir del script</div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n completa comentada</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="bash-cmd">#!/bin/bash</span>
<span class="cm"># Examen 2023 Mod B — Solucion completa</span>

<span class="kw">while</span> <span class="bash-cmd">true</span>; <span class="kw">do</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">""</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"====== MENU BASH 2023B ======"</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"1. Listar directorio"</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"2. Crear subdirectorio"</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"3. Eliminar fichero"</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"4. Salir"</span>
    <span class="bash-cmd">read</span> -p <span class="bash-str">"Opcion: "</span> <span class="bash-var">op</span>

    <span class="kw">case</span> <span class="bash-var">$op</span> <span class="kw">in</span>
        1)
            <span class="cm"># ls -la: -l detalles, -a incluye ocultos</span>
            <span class="bash-cmd">echo</span> <span class="bash-str">"--- Contenido del directorio actual ---"</span>
            <span class="bash-cmd">ls</span> -la
            ;;
        2)
            <span class="cm"># Pedimos el nombre con read y creamos con mkdir -p
            # Las comillas en "$nombre" son importantes si el nombre tiene espacios</span>
            <span class="bash-cmd">read</span> -p <span class="bash-str">"Nombre del nuevo subdirectorio: "</span> <span class="bash-var">nombre</span>
            <span class="bash-cmd">mkdir</span> -p <span class="bash-str">"$nombre"</span>
            <span class="bash-cmd">echo</span> <span class="bash-str">"Subdirectorio '$nombre' creado correctamente"</span>
            ;;
        3)
            <span class="cm"># Pedimos el nombre, comprobamos si existe con [ -f ] antes de borrar</span>
            <span class="bash-cmd">read</span> -p <span class="bash-str">"Nombre del fichero a eliminar: "</span> <span class="bash-var">fichero</span>
            <span class="kw">if</span> [ -f <span class="bash-str">"$fichero"</span> ]; <span class="kw">then</span>
                <span class="bash-cmd">rm</span> <span class="bash-str">"$fichero"</span>
                <span class="bash-cmd">echo</span> <span class="bash-str">"Fichero '$fichero' eliminado"</span>
            <span class="kw">else</span>
                <span class="bash-cmd">echo</span> <span class="bash-str">"Error: fichero '$fichero' no encontrado"</span>
            <span class="kw">fi</span>
            ;;
        4)
            <span class="bash-cmd">echo</span> <span class="bash-str">"Saliendo del script..."</span>
            <span class="bash-cmd">exit</span> <span class="num">0</span>
            ;;
        *)
            <span class="bash-cmd">echo</span> <span class="bash-str">"Opcion no valida. Elige entre 1 y 4."</span>
            ;;
    <span class="kw">esac</span>
<span class="kw">done</span></div></div>
      </div>
    </div>
  </div>
  <div class="exam-real-card">
    <div class="erc-header">
      <div class="erc-year">2025 &mdash; Modelo B</div>
      <div class="erc-label">Pregunta de desarrollo real</div>
    </div>
    <div class="erc-body">
      <div class="erc-enunciado"><strong>Problema Bash (opcional):</strong> Script Bash con men&uacute; de 4 opciones sobre ficheros:<br><br>
  &nbsp;&nbsp;<strong>1.</strong> Mostrar el contenido de un fichero (pedir nombre al usuario)<br>
  &nbsp;&nbsp;<strong>2.</strong> Copiar un fichero a otro (pedir nombres de origen y destino)<br>
  &nbsp;&nbsp;<strong>3.</strong> Mover/renombrar un fichero (pedir nombres de origen y destino)<br>
  &nbsp;&nbsp;<strong>4.</strong> Salir</div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n completa comentada</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="bash-cmd">#!/bin/bash</span>
<span class="cm"># Examen 2025 Mod B — Solucion completa</span>

<span class="kw">while</span> <span class="bash-cmd">true</span>; <span class="kw">do</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">""</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"====== MENU BASH 2025B ======"</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"1. Ver contenido de fichero"</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"2. Copiar fichero"</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"3. Mover/renombrar fichero"</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"4. Salir"</span>
    <span class="bash-cmd">read</span> -p <span class="bash-str">"Opcion: "</span> <span class="bash-var">op</span>

    <span class="kw">case</span> <span class="bash-var">$op</span> <span class="kw">in</span>
        1)
            <span class="bash-cmd">read</span> -p <span class="bash-str">"Nombre del fichero: "</span> <span class="bash-var">f</span>
            <span class="cm"># -f comprueba que existe y es un fichero regular</span>
            <span class="kw">if</span> [ -f <span class="bash-str">"$f"</span> ]; <span class="kw">then</span>
                <span class="bash-cmd">echo</span> <span class="bash-str">"--- Contenido de $f ---"</span>
                <span class="bash-cmd">cat</span> <span class="bash-str">"$f"</span>
            <span class="kw">else</span>
                <span class="bash-cmd">echo</span> <span class="bash-str">"Error: '$f' no existe"</span>
            <span class="kw">fi</span>
            ;;
        2)
            <span class="bash-cmd">read</span> -p <span class="bash-str">"Fichero origen: "</span>  <span class="bash-var">origen</span>
            <span class="bash-cmd">read</span> -p <span class="bash-str">"Fichero destino: "</span> <span class="bash-var">destino</span>
            <span class="cm"># cp copia, el original permanece</span>
            <span class="bash-cmd">cp</span> <span class="bash-str">"$origen"</span> <span class="bash-str">"$destino"</span>
            <span class="bash-cmd">echo</span> <span class="bash-str">"Copiado: $origen -> $destino"</span>
            ;;
        3)
            <span class="bash-cmd">read</span> -p <span class="bash-str">"Fichero origen: "</span>  <span class="bash-var">origen</span>
            <span class="bash-cmd">read</span> -p <span class="bash-str">"Fichero destino: "</span> <span class="bash-var">destino</span>
            <span class="cm"># mv mueve o renombra; el original desaparece</span>
            <span class="bash-cmd">mv</span> <span class="bash-str">"$origen"</span> <span class="bash-str">"$destino"</span>
            <span class="bash-cmd">echo</span> <span class="bash-str">"Movido/renombrado: $origen -> $destino"</span>
            ;;
        4)
            <span class="bash-cmd">echo</span> <span class="bash-str">"Fin del script."</span>
            <span class="bash-cmd">exit</span> <span class="num">0</span>
            ;;
        *)
            <span class="bash-cmd">echo</span> <span class="bash-str">"Opcion invalida"</span>
            ;;
    <span class="kw">esac</span>
<span class="kw">done</span></div></div>
      </div>
    </div>
  </div>
</div>
    </div><!-- /content-area -->
    <div class="chapter-nav">
      <button class="ch-nav-btn" onclick="prevChapter()">&#8592; PowerShell</button>
      <button class="ch-nav-btn next" onclick="nextChapter()">&#9889; APRÉNDETE ESTO &#8594;</button>
    </div>
