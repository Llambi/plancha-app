---
asignatura: soa
chapter: ch3
num: PS
titulo: PowerShell
badge: ★★★
orden: 3
---

<div class="chapter-banner">
      <div class="ch-label">Cap&iacute;tulo 3 &middot; Programaci&oacute;n</div>
      <h1>PowerShell</h1>
      <p class="ch-desc">De Write-Host al script completo con men&uacute;. Cada paso es un comando nuevo; el ejercicio lo fija. Al final construyes el Problema 2 del examen.</p>
      <div class="objectives">
        <strong>Al terminar este cap&iacute;tulo sabr&aacute;s:</strong>
        Write-Host &middot; variables &middot; Read-Host &middot; if/for/switch/do-while &middot; funciones &middot; New/Rename/Get/Remove-Item &middot; Get-Process &middot; Stop-Process &middot; Get-EventLog &middot; Out-File
      </div>
    </div>
    <div class="exam-alert">
      <span class="stars">&#9733;&#9733;&#9733;</span> PROBLEMA 2 &mdash; aparece en el 100% de los ex&aacute;menes 2022-2026. Script con tareas del sistema Windows.
    </div>
    <div class="content-area">

  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">1</div>
      <div><div class="paso-title">Write-Host — Imprimir</div><div class="paso-subtitle">El echo de PowerShell</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>Write-Host "texto"</code> imprime en consola. Es el equivalente al <code>printf</code> de C o al <code>echo</code> de Bash. Para concatenar variables dentro del string usa comillas dobles: <code>"Hola $nombre"</code>.</p>
      <div class="code-block"><span class="ps-cmd">Write-Host</span> <span class="ps-str">"Hola Mundo"</span>
<span class="ps-cmd">Write-Host</span> <span class="ps-str">"Bienvenido a SOA"</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Imprime el texto: <strong>PowerShell — Sistemas Operativos Avanzados</strong></p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="ps-cmd">Write-Host</span> <span class="ps-str">"PowerShell - Sistemas Operativos Avanzados"</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">2</div>
      <div><div class="paso-title">Variables ($) — Almacenar valores</div><div class="paso-subtitle">Todo empieza con $</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">Las variables en PS <strong>siempre empiezan con <code>$</code></strong>. No hay declaración de tipo: PS lo infiere. Para usar el valor dentro de un string con comillas dobles: <code>"Soy $nombre"</code>.</p>
      <div class="code-block"><span class="ps-var">$nombre</span> = <span class="ps-str">"Ana"</span>
<span class="ps-var">$edad</span>   = <span class="num">25</span>
<span class="ps-cmd">Write-Host</span> <span class="ps-str">"Soy $nombre, tengo $edad a&ntilde;os"</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Guarda tu asignatura en <code>$asig</code> y tu nota en <code>$nota</code>. Imprime: <em>En [asig] saqué [nota]</em></p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="ps-var">$asig</span> = <span class="ps-str">"SOA"</span>
<span class="ps-var">$nota</span> = <span class="num">8</span>
<span class="ps-cmd">Write-Host</span> <span class="ps-str">"En $asig saqu&eacute; $nota"</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">3</div>
      <div><div class="paso-title">Read-Host — Leer del usuario</div><div class="paso-subtitle">Entrada interactiva</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>Read-Host "mensaje"</code> muestra el mensaje y devuelve lo que teclea el usuario como <strong>string</strong>. Para operar matemáticamente con el resultado hay que convertirlo con <code>[int]</code>.</p>
      <div class="code-block"><span class="ps-var">$nombre</span> = <span class="ps-cmd">Read-Host</span> <span class="ps-str">"C&oacute;mo te llamas"</span>
<span class="ps-cmd">Write-Host</span> <span class="ps-str">"Hola, $nombre"</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Pide el nombre del usuario y muestra: <strong>Bienvenido, [nombre]</strong></p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="ps-var">$n</span> = <span class="ps-cmd">Read-Host</span> <span class="ps-str">"Tu nombre"</span>
<span class="ps-cmd">Write-Host</span> <span class="ps-str">"Bienvenido, $n"</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">4</div>
      <div><div class="paso-title">[int] — Convertir a número</div><div class="paso-subtitle">Read-Host siempre devuelve string</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">Como <code>Read-Host</code> devuelve texto, si quieres sumar, restar o comparar números debes convertir con <code>[int]</code>. Sin conversión, <code>"5" + "3"</code> daría <code>"53"</code> en vez de <code>8</code>.</p>
      <div class="code-block"><span class="ps-var">$n</span> = [<span class="ps-cmd">int</span>](<span class="ps-cmd">Read-Host</span> <span class="ps-str">"N&uacute;mero"</span>)
<span class="ps-cmd">Write-Host</span> (<span class="ps-var">$n</span> * <span class="num">2</span>)</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Pide un número al usuario y muestra su cuadrado (<em>n²</em>).</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="ps-var">$n</span> = [<span class="ps-cmd">int</span>](<span class="ps-cmd">Read-Host</span> <span class="ps-str">"N&uacute;mero"</span>)
<span class="ps-cmd">Write-Host</span> (<span class="ps-var">$n</span> * <span class="ps-var">$n</span>)</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">5</div>
      <div><div class="paso-title">if / else — Condicionales</div><div class="paso-subtitle">Operadores de comparación de PS</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">En PowerShell los operadores de comparación son palabras: <code>-eq</code> (==), <code>-ne</code> (!=), <code>-gt</code> (&gt;), <code>-lt</code> (&lt;), <code>-ge</code> (&gt;=), <code>-le</code> (&lt;=). No se usan <code>&gt;</code> ni <code>==</code>.</p>
      <div class="code-block"><span class="ps-var">$n</span> = [<span class="ps-cmd">int</span>](<span class="ps-cmd">Read-Host</span> <span class="ps-str">"N&uacute;mero"</span>)
<span class="kw">if</span> (<span class="ps-var">$n</span> -gt <span class="num">10</span>) { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Grande"</span> }
<span class="kw">else</span>               { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Peque&ntilde;o"</span> }</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Pide un número; si es negativo imprime <strong>NEGATIVO</strong>, si es cero <strong>CERO</strong>, si es positivo <strong>POSITIVO</strong>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="ps-var">$n</span> = [<span class="ps-cmd">int</span>](<span class="ps-cmd">Read-Host</span> <span class="ps-str">"Num"</span>)
<span class="kw">if</span>     (<span class="ps-var">$n</span> -lt <span class="num">0</span>) { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"NEGATIVO"</span> }
<span class="kw">elseif</span> (<span class="ps-var">$n</span> -eq <span class="num">0</span>) { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"CERO"</span>     }
<span class="kw">else</span>               { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"POSITIVO"</span>  }</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">6</div>
      <div><div class="paso-title">for — Bucle contador</div><div class="paso-subtitle">Contar del 1 al N</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">Misma lógica que C pero con operadores PS: <code>for($i=1; $i -le 5; $i++)</code>. El incremento <code>$i++</code> funciona igual que en C.</p>
      <div class="code-block"><span class="kw">for</span>(<span class="ps-var">$i</span>=<span class="num">1</span>; <span class="ps-var">$i</span> -le <span class="num">5</span>; <span class="ps-var">$i</span>++) {
    <span class="ps-cmd">Write-Host</span> <span class="ps-var">$i</span>
}</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Imprime los números del <strong>1 al 10</strong>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="kw">for</span>(<span class="ps-var">$i</span>=<span class="num">1</span>; <span class="ps-var">$i</span> -le <span class="num">10</span>; <span class="ps-var">$i</span>++) { <span class="ps-cmd">Write-Host</span> <span class="ps-var">$i</span> }</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">7</div>
      <div><div class="paso-title">switch — Selección múltiple</div><div class="paso-subtitle">El case de PowerShell</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">El <code>switch</code> de PS usa llaves: <code>switch($var) { "1" { acc } "2" { acc } default { acc } }</code>. Como <code>Read-Host</code> devuelve string, los casos suelen ser strings entre comillas.</p>
      <div class="code-block"><span class="ps-var">$op</span> = <span class="ps-cmd">Read-Host</span> <span class="ps-str">"1/2/3"</span>
<span class="kw">switch</span>(<span class="ps-var">$op</span>) {
    <span class="ps-str">"1"</span> { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"UNO"</span>  }
    <span class="ps-str">"2"</span> { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"DOS"</span>  }
    <span class="kw">default</span> { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Otro"</span> }
}</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Pide un número del 1 al 3 y escribe en letra <strong>UNO</strong>, <strong>DOS</strong> o <strong>TRES</strong>. Si es otro: <em>Opción inválida</em>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="ps-var">$op</span> = <span class="ps-cmd">Read-Host</span> <span class="ps-str">"1-3"</span>
<span class="kw">switch</span>(<span class="ps-var">$op</span>) {
    <span class="ps-str">"1"</span> { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"UNO"</span>  }
    <span class="ps-str">"2"</span> { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"DOS"</span>  }
    <span class="ps-str">"3"</span> { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"TRES"</span> }
    <span class="kw">default</span> { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Opci&oacute;n inv&aacute;lida"</span> }
}</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">8</div>
      <div><div class="paso-title">do-while — El bucle del menú</div><div class="paso-subtitle">Repetir hasta elegir Salir</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">Igual que en C: el <code>do-while</code> ejecuta al menos una vez. Para salir del menú: <code>while ($op -ne "4")</code>. Combina con el <code>switch</code> del paso anterior.</p>
      <div class="code-block"><span class="kw">do</span> {
    <span class="ps-var">$op</span> = <span class="ps-cmd">Read-Host</span> <span class="ps-str">"Opci&oacute;n (4=salir)"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Elegiste $op"</span>
} <span class="kw">while</span> (<span class="ps-var">$op</span> -ne <span class="ps-str">"4"</span>)</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Haz un do-while que pida palabras al usuario y las imprima en mayúsculas con <code>.ToUpper()</code>, hasta que escriba <strong>fin</strong>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="kw">do</span> {
    <span class="ps-var">$palabra</span> = <span class="ps-cmd">Read-Host</span> <span class="ps-str">"Palabra (fin=salir)"</span>
    <span class="kw">if</span> (<span class="ps-var">$palabra</span> -ne <span class="ps-str">"fin"</span>) { <span class="ps-cmd">Write-Host</span> <span class="ps-var">$palabra</span>.ToUpper() }
} <span class="kw">while</span> (<span class="ps-var">$palabra</span> -ne <span class="ps-str">"fin"</span>)</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">9</div>
      <div><div class="paso-title">function — Encapsular el menú</div><div class="paso-subtitle">Reutilizar código</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>function NombreFuncion { código }</code> define una función. Se llama con su nombre. Para el menú usamos una función <code>Show-Menu</code> que imprime las opciones, igual que <code>mostrarMenu()</code> en C.</p>
      <div class="code-block"><span class="kw">function</span> <span class="ps-cmd">Show-Menu</span> {
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"`n=== MENU ==="</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"1. Opcion A"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"4. Salir"</span>
}
<span class="ps-cmd">Show-Menu</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Crea la función <code>Show-Menu</code> con 4 opciones del examen e intégrala en un do-while que llame a <code>Show-Menu</code> antes de cada <code>Read-Host</code>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="kw">function</span> <span class="ps-cmd">Show-Menu</span> {
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"`n=== MENU SOA ==="</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"1. Matar proceso paint"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"2. Ver procesos activos"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"3. Ver eventos del sistema"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"4. Salir"</span>
}
<span class="kw">do</span> {
    <span class="ps-cmd">Show-Menu</span>
    <span class="ps-var">$op</span> = <span class="ps-cmd">Read-Host</span> <span class="ps-str">"Opci&oacute;n"</span>
} <span class="kw">while</span> (<span class="ps-var">$op</span> -ne <span class="ps-str">"4"</span>)</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">10</div>
      <div><div class="paso-title">New-Item — Crear directorio o fichero</div><div class="paso-subtitle">mkdir y touch de PS</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>New-Item -ItemType Directory -Path "nombre"</code> crea un directorio. <code>New-Item -ItemType File -Path "nombre.txt"</code> crea un fichero vacío. Es el equivalente a <code>mkdir</code> y <code>touch</code> en Linux.</p>
      <div class="code-block"><span class="ps-cmd">New-Item</span> <span class="ps-param">-ItemType</span> Directory <span class="ps-param">-Path</span> <span class="ps-str">"MiCarpeta"</span>
<span class="ps-cmd">New-Item</span> <span class="ps-param">-ItemType</span> File     <span class="ps-param">-Path</span> <span class="ps-str">"notas.txt"</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Crea un directorio llamado <strong>ExamenSOA2026</strong> y dentro de él un fichero llamado <strong>resultado.txt</strong>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="ps-cmd">New-Item</span> <span class="ps-param">-ItemType</span> Directory <span class="ps-param">-Path</span> <span class="ps-str">"ExamenSOA2026"</span>
<span class="ps-cmd">New-Item</span> <span class="ps-param">-ItemType</span> File <span class="ps-param">-Path</span> <span class="ps-str">"ExamenSOA2026\resultado.txt"</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">11</div>
      <div><div class="paso-title">Rename-Item — Renombrar</div><div class="paso-subtitle">El mv de PowerShell</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>Rename-Item -Path "viejo" -NewName "nuevo"</code> renombra ficheros o carpetas. Es el equivalente a <code>mv viejo nuevo</code> en Linux.</p>
      <div class="code-block"><span class="ps-cmd">Rename-Item</span> <span class="ps-param">-Path</span> <span class="ps-str">"carpeta1"</span> <span class="ps-param">-NewName</span> <span class="ps-str">"carpeta_final"</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Renombra el directorio <strong>ExamenSOA2026</strong> a <strong>ExamenSOA_LISTO</strong>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="ps-cmd">Rename-Item</span> <span class="ps-param">-Path</span> <span class="ps-str">"ExamenSOA2026"</span> <span class="ps-param">-NewName</span> <span class="ps-str">"ExamenSOA_LISTO"</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">12</div>
      <div><div class="paso-title">Get-ChildItem — Listar directorio</div><div class="paso-subtitle">El ls de PowerShell</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>Get-ChildItem</code> lista el directorio actual o el especificado con <code>-Path</code>. Con <code>| Format-Table</code> se formatea la salida. Alias corto: <code>gci</code> o <code>ls</code>.</p>
      <div class="code-block"><span class="ps-cmd">Get-ChildItem</span>                         <span class="cm"># directorio actual</span>
<span class="ps-cmd">Get-ChildItem</span> <span class="ps-param">-Path</span> <span class="ps-str">"C:\"</span>              <span class="cm"># raíz C:</span>
<span class="ps-cmd">Get-ChildItem</span> | <span class="ps-cmd">Format-Table</span> Name, Length, LastWriteTime</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Lista el contenido de <code>C:\</code> mostrando <strong>Name</strong>, <strong>Length</strong> y <strong>LastWriteTime</strong> en formato tabla.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="ps-cmd">Get-ChildItem</span> <span class="ps-param">-Path</span> <span class="ps-str">"C:\"</span> | <span class="ps-cmd">Format-Table</span> Name, Length, LastWriteTime <span class="ps-param">-AutoSize</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">13</div>
      <div><div class="paso-title">Remove-Item — Borrar</div><div class="paso-subtitle">El rm de PowerShell</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>Remove-Item -Path "nombre"</code> borra un fichero. Para borrar un directorio con contenido añade <code>-Recurse</code>. Con <code>-ErrorAction SilentlyContinue</code> no da error si no existe.</p>
      <div class="code-block"><span class="ps-cmd">Remove-Item</span> <span class="ps-param">-Path</span> <span class="ps-str">"fichero.txt"</span>
<span class="ps-cmd">Remove-Item</span> <span class="ps-param">-Path</span> <span class="ps-str">"carpeta"</span> <span class="ps-param">-Recurse</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Borra el directorio <strong>ExamenSOA_LISTO</strong> y todo su contenido.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="ps-cmd">Remove-Item</span> <span class="ps-param">-Path</span> <span class="ps-str">"ExamenSOA_LISTO"</span> <span class="ps-param">-Recurse</span> <span class="ps-param">-ErrorAction</span> SilentlyContinue</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">14</div>
      <div><div class="paso-title">Get-Process — Ver procesos activos</div><div class="paso-subtitle">Gestión de procesos</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>Get-Process</code> muestra todos los procesos en ejecución. Con <code>-Name</code> filtra por nombre. Pipe a <code>Format-Table</code> para ver columnas específicas como Name, Id, CPU, WorkingSet.</p>
      <div class="code-block"><span class="ps-cmd">Get-Process</span>                              <span class="cm"># todos</span>
<span class="ps-cmd">Get-Process</span> <span class="ps-param">-Name</span> <span class="ps-str">"chrome"</span>              <span class="cm"># filtrar</span>
<span class="ps-cmd">Get-Process</span> | <span class="ps-cmd">Format-Table</span> Name, Id, CPU <span class="ps-param">-AutoSize</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Muestra los procesos activos con columnas <strong>Name</strong>, <strong>Id</strong> y <strong>WorkingSet</strong> (memoria usada).</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="ps-cmd">Get-Process</span> | <span class="ps-cmd">Format-Table</span> Name, Id, WorkingSet <span class="ps-param">-AutoSize</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">15</div>
      <div><div class="paso-title">Stop-Process — Matar un proceso</div><div class="paso-subtitle">La tarea más repetida del examen</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>Stop-Process -Name "nombre"</code> mata por nombre. <code>-Id</code> mata por ID. Con <code>-Force</code> fuerza si no responde. El examen 2025C y 2026A piden concretamente: matar <strong>paint</strong> con ID <strong>1234</strong>.</p>
      <div class="code-block"><span class="ps-cmd">Stop-Process</span> <span class="ps-param">-Name</span> <span class="ps-str">"notepad"</span>
<span class="ps-cmd">Stop-Process</span> <span class="ps-param">-Id</span> <span class="num">1234</span>
<span class="ps-cmd">Stop-Process</span> <span class="ps-param">-Name</span> <span class="ps-str">"paint"</span> <span class="ps-param">-Id</span> <span class="num">1234</span> <span class="ps-param">-Force</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Mata el proceso <strong>paint</strong> con ID <strong>1234</strong> (el más frecuente del examen). Añade <code>-ErrorAction SilentlyContinue</code> por si no existe.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="ps-cmd">Stop-Process</span> <span class="ps-param">-Name</span> <span class="ps-str">"paint"</span> <span class="ps-param">-Id</span> <span class="num">1234</span> <span class="ps-param">-ErrorAction</span> SilentlyContinue
<span class="ps-cmd">Write-Host</span> <span class="ps-str">"Proceso paint (1234) eliminado"</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">16</div>
      <div><div class="paso-title">Get-EventLog — Registros del sistema</div><div class="paso-subtitle">Logs de Windows</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>Get-EventLog -LogName System</code> muestra el log de eventos del sistema Windows. Con <code>-Newest N</code> limita a las N últimas entradas. También existe <code>-LogName Application</code>. Aparece en 2024C, 2025C y 2026A.</p>
      <div class="code-block"><span class="ps-cmd">Get-EventLog</span> <span class="ps-param">-LogName</span> System               <span class="cm"># todos</span>
<span class="ps-cmd">Get-EventLog</span> <span class="ps-param">-LogName</span> System <span class="ps-param">-Newest</span> <span class="num">10</span>  <span class="cm"># últimos 10</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Muestra las últimas <strong>20</strong> entradas del log del sistema en formato tabla.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="ps-cmd">Get-EventLog</span> <span class="ps-param">-LogName</span> System <span class="ps-param">-Newest</span> <span class="num">20</span> | <span class="ps-cmd">Format-Table</span> <span class="ps-param">-AutoSize</span></div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">17</div>
      <div><div class="paso-title">Get-Date + Out-File — Fecha en fichero</div><div class="paso-subtitle">Guardar salida</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>Get-Date</code> devuelve la fecha y hora actuales. El operador <code>|</code> (pipe) pasa el resultado a <code>Out-File "ruta"</code> que lo guarda en un fichero. Con <code>-Append</code> añade al final en vez de sobreescribir.</p>
      <div class="code-block"><span class="ps-var">$fecha</span> = <span class="ps-cmd">Get-Date</span>
<span class="ps-var">$fecha</span> | <span class="ps-cmd">Out-File</span> <span class="ps-str">"C:\actual.txt"</span>

<span class="cm"># Sin variable (directo):</span>
<span class="ps-cmd">Get-Date</span> | <span class="ps-cmd">Out-File</span> <span class="ps-str">"C:\log.txt"</span></div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Guarda la fecha y hora actuales en <strong>C:\log_soa.txt</strong> y luego imprime un mensaje confirmando que se guardó.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="ps-cmd">Get-Date</span> | <span class="ps-cmd">Out-File</span> <span class="ps-str">"C:\log_soa.txt"</span>
<span class="ps-cmd">Write-Host</span> <span class="ps-str">"Fecha guardada en C:\log_soa.txt"</span></div></div>
      </div>
    </div>
  </div>
  <div class="integrador-box">
    <div class="int-label">Ejercicio Integrador</div>
    <h3>El Script Completo &mdash; Como en el Examen Real</h3>
    <p>Escribe el script PowerShell completo con men&uacute; de 4 opciones:</p>
    <ol>
      <li>Matar el proceso &laquo;paint&raquo; con ID 1234</li>
      <li>Mostrar todos los procesos activos (Name, Id, CPU)</li>
      <li>Ver los &uacute;ltimos 10 eventos del sistema + guardar fecha en c:\fecha.txt</li>
      <li>Salir</li>
    </ol>
    <div class="solucion">
      <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver el script completo del examen</span><span class="sol-arrow">&#9660;</span></div>
      <div class="sol-content">
        <div class="code-block"><span class="kw">function</span> <span class="ps-cmd">Show-Menu</span> {
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"`n========== MENU POWERSHELL =========="</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"1. Matar proceso paint (ID 1234)"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"2. Mostrar procesos activos"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"3. Ver eventos del sistema + guardar fecha"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"4. Salir"</span>
}

<span class="kw">do</span> {
    <span class="ps-cmd">Show-Menu</span>
    <span class="ps-var">$op</span> = <span class="ps-cmd">Read-Host</span> <span class="ps-str">"`nSelecciona opcion"</span>

    <span class="kw">switch</span> (<span class="ps-var">$op</span>) {
        <span class="ps-str">"1"</span> {
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Matando proceso paint (ID 1234)..."</span>
            <span class="ps-cmd">Stop-Process</span> <span class="ps-param">-Name</span> <span class="ps-str">"paint"</span> <span class="ps-param">-Id</span> <span class="num">1234</span> <span class="ps-param">-ErrorAction</span> SilentlyContinue
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Listo."</span>
        }
        <span class="ps-str">"2"</span> {
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"`n--- Procesos activos ---"</span>
            <span class="ps-cmd">Get-Process</span> | <span class="ps-cmd">Format-Table</span> Name, Id, CPU <span class="ps-param">-AutoSize</span>
        }
        <span class="ps-str">"3"</span> {
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"`n--- Eventos del sistema (últimos 10) ---"</span>
            <span class="ps-cmd">Get-EventLog</span> <span class="ps-param">-LogName</span> System <span class="ps-param">-Newest</span> <span class="num">10</span> | <span class="ps-cmd">Format-Table</span> <span class="ps-param">-AutoSize</span>
            <span class="ps-cmd">Get-Date</span> | <span class="ps-cmd">Out-File</span> <span class="ps-str">"c:\fecha.txt"</span>
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Fecha guardada en c:\fecha.txt"</span>
        }
        <span class="ps-str">"4"</span> {
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Cerrando..."</span>
        }
        <span class="kw">default</span> {
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Opcion no valida"</span>
        }
    }
} <span class="kw">while</span> (<span class="ps-var">$op</span> -ne <span class="ps-str">"4"</span>)</div>
      </div>
    </div>
  </div>


<div class="exam-real-section">
  <div class="section-heading">
    <div class="sec-num">Ejercicios Reales de Examen</div>
    <h2>Preguntas PowerShell sacadas de ex&aacute;menes anteriores</h2>
  </div>
  <p class="body-text">Enunciados reales. Resu&eacute;lvelos antes de ver la soluci&oacute;n. F&iacute;jate en los comentarios — explican el <em>por qu&eacute;</em> de cada cmdlet.</p>

  <div class="exam-real-card">
    <div class="erc-header">
      <div class="erc-year">2024 &mdash; Modelo C</div>
      <div class="erc-label">Pregunta de desarrollo real</div>
    </div>
    <div class="erc-body">
      <div class="erc-enunciado"><strong>Problema 2 PowerShell:</strong> Crea un script PS con men&uacute; de 4 opciones:<br><br>
  &nbsp;&nbsp;<strong>1.</strong> Mostrar los procesos activos del sistema<br>
  &nbsp;&nbsp;<strong>2.</strong> Guardar en un fichero <em>c:\actual.txt</em> la fecha y hora actuales<br>
  &nbsp;&nbsp;<strong>3.</strong> Mostrar los registros de eventos del sistema Windows y listar los comandos disponibles para gestionar servicios (guardar en fichero)<br>
  &nbsp;&nbsp;<strong>4.</strong> Salir</div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n completa comentada</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="cm"># Examen 2024 Mod C — Solucion completa</span>

<span class="kw">function</span> <span class="ps-cmd">Show-Menu</span> {
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"`n========== MENU 2024C =========="</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"1. Mostrar procesos activos"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"2. Guardar fecha en c:\actual.txt"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"3. Eventos sistema + comandos de servicios"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"4. Salir"</span>
}

<span class="kw">do</span> {
    <span class="ps-cmd">Show-Menu</span>
    <span class="ps-var">$op</span> = <span class="ps-cmd">Read-Host</span> <span class="ps-str">"`nOpcion"</span>

    <span class="kw">switch</span> (<span class="ps-var">$op</span>) {
        <span class="ps-str">"1"</span> {
            <span class="cm"># Get-Process lista todos los procesos con Name, Id, CPU, etc.</span>
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"`n--- Procesos activos ---"</span>
            <span class="ps-cmd">Get-Process</span> | <span class="ps-cmd">Format-Table</span> Name, Id, CPU <span class="ps-param">-AutoSize</span>
        }
        <span class="ps-str">"2"</span> {
            <span class="cm"># Get-Date devuelve la fecha/hora actual como objeto DateTime
            # Out-File lo escribe en el fichero especificado</span>
            <span class="ps-cmd">Get-Date</span> | <span class="ps-cmd">Out-File</span> <span class="ps-str">"c:\actual.txt"</span>
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Fecha guardada en c:\actual.txt"</span>
        }
        <span class="ps-str">"3"</span> {
            <span class="cm"># Get-EventLog -LogName System muestra el log del sistema Windows
            # Get-Command -Noun Service lista todos los cmdlets que trabajan con servicios</span>
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"`n--- Registros del sistema ---"</span>
            <span class="ps-cmd">Get-EventLog</span> <span class="ps-param">-LogName</span> System <span class="ps-param">-Newest</span> <span class="num">10</span> | <span class="ps-cmd">Format-Table</span> <span class="ps-param">-AutoSize</span>

            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"`n--- Comandos de servicios ---"</span>
            <span class="ps-cmd">Get-Command</span> <span class="ps-param">-Noun</span> Service | <span class="ps-cmd">Out-File</span> <span class="ps-str">"c:\servicios.txt"</span>
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Guardado en c:\servicios.txt"</span>
        }
        <span class="ps-str">"4"</span> { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Cerrando..."</span> }
        <span class="kw">default</span> { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Opcion no valida"</span> }
    }
} <span class="kw">while</span> (<span class="ps-var">$op</span> <span class="ps-param">-ne</span> <span class="ps-str">"4"</span>)</div></div>
      </div>
    </div>
  </div>
  <div class="exam-real-card">
    <div class="erc-header">
      <div class="erc-year">2025 &mdash; Modelo C</div>
      <div class="erc-label">Pregunta de desarrollo real</div>
    </div>
    <div class="erc-body">
      <div class="erc-enunciado"><strong>Problema 2 PowerShell:</strong> Script PS con men&uacute; de 4 opciones:<br><br>
  &nbsp;&nbsp;<strong>1.</strong> <em>Matar</em> el proceso &laquo;paint&raquo; con identificador de proceso <em>1234</em><br>
  &nbsp;&nbsp;<strong>2.</strong> Mostrar los procesos que se est&aacute;n ejecutando en el sistema<br>
  &nbsp;&nbsp;<strong>3.</strong> Ver los registros de eventos del sistema + renombrar la carpeta <em>&laquo;carpeta1&raquo;</em> como <em>&laquo;carpeta&raquo;</em><br>
  &nbsp;&nbsp;<strong>4.</strong> Salir del script</div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n completa comentada</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="cm"># Examen 2025 Mod C — Solucion completa</span>

<span class="kw">function</span> <span class="ps-cmd">Show-Menu</span> {
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"`n========== MENU 2025C =========="</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"1. Matar proceso paint (ID 1234)"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"2. Mostrar procesos activos"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"3. Ver eventos + renombrar carpeta1"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"4. Salir"</span>
}

<span class="kw">do</span> {
    <span class="ps-cmd">Show-Menu</span>
    <span class="ps-var">$op</span> = <span class="ps-cmd">Read-Host</span> <span class="ps-str">"`nOpcion"</span>

    <span class="kw">switch</span> (<span class="ps-var">$op</span>) {
        <span class="ps-str">"1"</span> {
            <span class="cm"># Stop-Process con -Name Y -Id juntos — mas especifico y seguro
            # -ErrorAction SilentlyContinue: no lanza error si el proceso no existe</span>
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Matando proceso paint (ID 1234)..."</span>
            <span class="ps-cmd">Stop-Process</span> <span class="ps-param">-Name</span> <span class="ps-str">"paint"</span> <span class="ps-param">-Id</span> <span class="num">1234</span> <span class="ps-param">-ErrorAction</span> SilentlyContinue
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Proceso terminado."</span>
        }
        <span class="ps-str">"2"</span> {
            <span class="cm"># Get-Process sin parametros = todos los procesos del sistema</span>
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"`n--- Procesos en ejecucion ---"</span>
            <span class="ps-cmd">Get-Process</span> | <span class="ps-cmd">Format-Table</span> Name, Id, CPU, WorkingSet <span class="ps-param">-AutoSize</span>
        }
        <span class="ps-str">"3"</span> {
            <span class="cm"># Ver log de eventos del sistema</span>
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"`n--- Registros de eventos ---"</span>
            <span class="ps-cmd">Get-EventLog</span> <span class="ps-param">-LogName</span> System <span class="ps-param">-Newest</span> <span class="num">15</span> | <span class="ps-cmd">Format-Table</span> <span class="ps-param">-AutoSize</span>

            <span class="cm"># Rename-Item: renombra "carpeta1" a "carpeta"
            # -Path: origen  -NewName: nombre nuevo</span>
            <span class="ps-cmd">Rename-Item</span> <span class="ps-param">-Path</span> <span class="ps-str">"carpeta1"</span> <span class="ps-param">-NewName</span> <span class="ps-str">"carpeta"</span> <span class="ps-param">-ErrorAction</span> SilentlyContinue
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Carpeta renombrada: carpeta1 -> carpeta"</span>
        }
        <span class="ps-str">"4"</span> { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Cerrando script..."</span> }
        <span class="kw">default</span> { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Opcion invalida"</span> }
    }
} <span class="kw">while</span> (<span class="ps-var">$op</span> <span class="ps-param">-ne</span> <span class="ps-str">"4"</span>)</div></div>
      </div>
    </div>
  </div>
  <div class="exam-real-card">
    <div class="erc-header">
      <div class="erc-year">2026 &mdash; Modelo A</div>
      <div class="erc-label">Pregunta de desarrollo real</div>
    </div>
    <div class="erc-body">
      <div class="erc-enunciado"><strong>Problema 2 PowerShell:</strong> Implementa un script PS con men&uacute; de 4 opciones:<br><br>
  &nbsp;&nbsp;<strong>1.</strong> Eliminar el proceso &laquo;paint&raquo; con PID <em>1234</em><br>
  &nbsp;&nbsp;<strong>2.</strong> Mostrar los procesos activos del sistema<br>
  &nbsp;&nbsp;<strong>3.</strong> Consultar los registros de eventos del sistema y guardar la fecha y hora actuales en <em>c:\fecha.txt</em><br>
  &nbsp;&nbsp;<strong>4.</strong> Salir<br><br>
  <em>(Patr&oacute;n muy similar a 2025C — cambia solo la opci&oacute;n 3)</em></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n completa comentada</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="cm"># Examen 2026 Mod A — Solucion completa</span>

<span class="kw">function</span> <span class="ps-cmd">Show-Menu</span> {
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"`n========== MENU 2026A =========="</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"1. Eliminar proceso paint (PID 1234)"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"2. Mostrar procesos activos"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"3. Eventos sistema + guardar fecha en c:\fecha.txt"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"4. Salir"</span>
}

<span class="kw">do</span> {
    <span class="ps-cmd">Show-Menu</span>
    <span class="ps-var">$op</span> = <span class="ps-cmd">Read-Host</span> <span class="ps-str">"`nOpcion"</span>

    <span class="kw">switch</span> (<span class="ps-var">$op</span>) {
        <span class="ps-str">"1"</span> {
            <span class="cm"># MEMORIZA esta linea: siempre "paint" -Id 1234 en el examen</span>
            <span class="ps-cmd">Stop-Process</span> <span class="ps-param">-Name</span> <span class="ps-str">"paint"</span> <span class="ps-param">-Id</span> <span class="num">1234</span> <span class="ps-param">-ErrorAction</span> SilentlyContinue
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Proceso paint (1234) eliminado."</span>
        }
        <span class="ps-str">"2"</span> {
            <span class="ps-cmd">Get-Process</span> | <span class="ps-cmd">Format-Table</span> Name, Id, CPU <span class="ps-param">-AutoSize</span>
        }
        <span class="ps-str">"3"</span> {
            <span class="cm"># Primero mostramos los eventos del sistema</span>
            <span class="ps-cmd">Get-EventLog</span> <span class="ps-param">-LogName</span> System <span class="ps-param">-Newest</span> <span class="num">10</span> | <span class="ps-cmd">Format-Table</span> <span class="ps-param">-AutoSize</span>

            <span class="cm"># Luego guardamos la fecha actual en c:echa.txt
            # Get-Date | Out-File es el patron canonico para "guardar fecha"</span>
            <span class="ps-cmd">Get-Date</span> | <span class="ps-cmd">Out-File</span> <span class="ps-str">"c:\fecha.txt"</span>
            <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Fecha guardada en c:\fecha.txt"</span>
        }
        <span class="ps-str">"4"</span> { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Saliendo..."</span> }
        <span class="kw">default</span> { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Opcion no valida"</span> }
    }
} <span class="kw">while</span> (<span class="ps-var">$op</span> <span class="ps-param">-ne</span> <span class="ps-str">"4"</span>)</div></div>
      </div>
    </div>
  </div>
</div>
    </div><!-- /content-area -->
    <div class="chapter-nav">
      <button class="ch-nav-btn" onclick="prevChapter()">&#8592; Anterior</button>
      <button class="ch-nav-btn next" onclick="nextChapter()">Siguiente: Bash &#8594;</button>
    </div>
