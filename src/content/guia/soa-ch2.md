---
asignatura: soa
chapter: ch2
num: C
titulo: Programación C / UNIX
badge: ★★★
orden: 2
---

<div class="chapter-banner">
      <div class="ch-label">Capítulo 2 · Programación</div>
      <h1>Programación C / UNIX</h1>
      <p class="ch-desc">De cero al programa con menú completo. Cada paso te enseña un concepto; el ejercicio lo fija. Al final construyes el examen entero.</p>
      <div class="objectives">
        <strong>Al terminar este capítulo sabrás escribir:</strong>
        printf · scanf · if/for/switch · getpid/getppid · stat/opendir · getenv · fork/wait · el menú completo de 4 opciones
      </div>
    </div>
    <div class="exam-alert">
      <span class="stars">★★★</span> PROBLEMA 1 — aparece en el 100% de los exámenes 2022-2026. Menú de 4 opciones con llamadas al sistema UNIX.
    </div>
    <div class="content-area">

  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">1</div>
      <div><div class="paso-title">printf — Imprimir texto</div><div class="paso-subtitle">El Hola Mundo de C</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">El comando de salida básico. Necesita <code>#include &lt;stdio.h&gt;</code> siempre. El <code>\n</code> es salto de línea.</p>
      <div class="code-block">#<span class="pp">include</span> &lt;<span class="fn">stdio.h</span>&gt;
<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="fn">printf</span>(<span class="str">"Hola Mundo\n"</span>);
    <span class="kw">return</span> <span class="num">0</span>;
}</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Imprime el texto: <strong>SOA - Sistemas Operativos Avanzados</strong></p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block">#<span class="pp">include</span> &lt;<span class="fn">stdio.h</span>&gt;
<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="fn">printf</span>(<span class="str">"SOA - Sistemas Operativos Avanzados\n"</span>);
    <span class="kw">return</span> <span class="num">0</span>;
}</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">2</div>
      <div><div class="paso-title">Variables — int, char[]</div><div class="paso-subtitle">Declarar y usar</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">C es tipado: hay que declarar el tipo antes del nombre. Los tipos más usados en el examen: <code>int</code> (entero), <code>char[]</code> (cadena). Para imprimir: <code>%d</code> → int, <code>%s</code> → string, <code>%ld</code> → long.</p>
      <div class="code-block"><span class="kw">int</span> n = <span class="num">42</span>;
<span class="kw">char</span> msg[] = <span class="str">"Hola"</span>;
<span class="fn">printf</span>(<span class="str">"%s: %d\n"</span>, msg, n);</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Declara una variable <code>int edad = 25</code> y otra <code>char nombre[] = "Ana"</code>. Imprime: <strong>Ana tiene 25 años</strong></p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="kw">int</span> edad = <span class="num">25</span>;
<span class="kw">char</span> nombre[] = <span class="str">"Ana"</span>;
<span class="fn">printf</span>(<span class="str">"%s tiene %d a&ntilde;os\n"</span>, nombre, edad);</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">3</div>
      <div><div class="paso-title">scanf — Leer del usuario</div><div class="paso-subtitle">Entrada por teclado</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>scanf("%d", &amp;n)</code> lee un entero y lo guarda en <code>n</code>. El <code>&amp;</code> es obligatorio: le pasa la <em>dirección de memoria</em> de la variable a scanf.</p>
      <div class="code-block"><span class="kw">int</span> n;
<span class="fn">printf</span>(<span class="str">"Introduce un numero: "</span>);
<span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;n);
<span class="fn">printf</span>(<span class="str">"Escribiste: %d\n"</span>, n);</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Pide al usuario dos números <code>a</code> y <code>b</code> e imprime su suma.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="kw">int</span> a, b;
<span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;a);
<span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;b);
<span class="fn">printf</span>(<span class="str">"Suma: %d\n"</span>, a + b);</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">4</div>
      <div><div class="paso-title">if / else — Condicional</div><div class="paso-subtitle">Tomar decisiones</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">Compara valores con <code>==</code>, <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>. El operador módulo <code>%</code> da el resto de la división — útil para comprobar si un número es par (<code>n % 2 == 0</code>).</p>
      <div class="code-block"><span class="kw">if</span> (n &gt; <span class="num">10</span>) {
    <span class="fn">printf</span>(<span class="str">"Grande\n"</span>);
} <span class="kw">else</span> {
    <span class="fn">printf</span>(<span class="str">"Peque&ntilde;o\n"</span>);
}</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Pide un número; si es par imprime <strong>PAR</strong>, si no <strong>IMPAR</strong>. Pista: <code>n % 2 == 0</code></p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="kw">int</span> n;
<span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;n);
<span class="kw">if</span> (n % <span class="num">2</span> == <span class="num">0</span>) <span class="fn">printf</span>(<span class="str">"PAR\n"</span>);
<span class="kw">else</span> <span class="fn">printf</span>(<span class="str">"IMPAR\n"</span>);</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">5</div>
      <div><div class="paso-title">for — Bucle contador</div><div class="paso-subtitle">Repetir N veces</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">El bucle for tiene tres partes: <code>for(inicio; condición; incremento)</code>. Para el examen se usa para imprimir rangos de números, típicamente del N al M introducidos por el usuario.</p>
      <div class="code-block"><span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">1</span>; i &lt;= <span class="num">5</span>; i++) {
    <span class="fn">printf</span>(<span class="str">"%d\n"</span>, i);
}</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Imprime los números del <strong>11 al 22</strong> (exactamente como aparece en el examen 2022A y 2024A).</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">11</span>; i &lt;= <span class="num">22</span>; i++) {
    <span class="fn">printf</span>(<span class="str">"%d\n"</span>, i);
}</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">6</div>
      <div><div class="paso-title">do-while — El bucle del menú</div><div class="paso-subtitle">Ejecutar al menos una vez</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">El <code>do-while</code> ejecuta el cuerpo <em>antes</em> de comprobar la condición. Es el patrón perfecto para menús: el menú se muestra al menos una vez y se repite hasta que el usuario elige Salir (opción 4).</p>
      <div class="code-block"><span class="kw">int</span> op;
<span class="kw">do</span> {
    <span class="fn">printf</span>(<span class="str">"Opci&oacute;n (0=salir): "</span>);
    <span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;op);
} <span class="kw">while</span> (op != <span class="num">0</span>);</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Haz un do-while que pida números y pare solo cuando el usuario introduzca exactamente <strong>0</strong>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="kw">int</span> n;
<span class="kw">do</span> {
    <span class="fn">printf</span>(<span class="str">"N&uacute;mero (0 para salir): "</span>);
    <span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;n);
    <span class="kw">if</span> (n != <span class="num">0</span>) <span class="fn">printf</span>(<span class="str">"Leido: %d\n"</span>, n);
} <span class="kw">while</span> (n != <span class="num">0</span>);
<span class="fn">printf</span>(<span class="str">"Adios\n"</span>);</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">7</div>
      <div><div class="paso-title">switch / case — El menú de opciones</div><div class="paso-subtitle">La estructura central del examen</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">El <code>switch</code> evalúa el valor de una variable y ejecuta el <code>case</code> que coincide. Es <strong>obligatorio</strong> el <code>break</code> al final de cada case para no caer al siguiente. El <code>default</code> gestiona entradas no válidas.</p>
      <div class="code-block"><span class="kw">switch</span>(opcion) {
    <span class="kw">case</span> <span class="num">1</span>: <span class="fn">printf</span>(<span class="str">"Uno\n"</span>); <span class="kw">break</span>;
    <span class="kw">case</span> <span class="num">2</span>: <span class="fn">printf</span>(<span class="str">"Dos\n"</span>); <span class="kw">break</span>;
    <span class="kw">case</span> <span class="num">3</span>: <span class="fn">printf</span>(<span class="str">"Salir\n"</span>); <span class="kw">break</span>;
    <span class="kw">default</span>: <span class="fn">printf</span>(<span class="str">"Inv&aacute;lido\n"</span>);
}</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Pide un número del 1 al 3 y responde <strong>UNO</strong>, <strong>DOS</strong> o <strong>TRES</strong>. Si es otro número: <em>Opción no válida</em>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="kw">int</span> op;
<span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;op);
<span class="kw">switch</span>(op) {
    <span class="kw">case</span> <span class="num">1</span>: <span class="fn">printf</span>(<span class="str">"UNO\n"</span>);  <span class="kw">break</span>;
    <span class="kw">case</span> <span class="num">2</span>: <span class="fn">printf</span>(<span class="str">"DOS\n"</span>);  <span class="kw">break</span>;
    <span class="kw">case</span> <span class="num">3</span>: <span class="fn">printf</span>(<span class="str">"TRES\n"</span>); <span class="kw">break</span>;
    <span class="kw">default</span>: <span class="fn">printf</span>(<span class="str">"Opci&oacute;n no v&aacute;lida\n"</span>);
}</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">8</div>
      <div><div class="paso-title">mostrarMenu() — La función del menú</div><div class="paso-subtitle">Encapsular la presentación</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">Es buena práctica separar el menú en su propia función <code>void mostrarMenu()</code>. Se llama antes del <code>scanf</code> dentro del do-while. El corrector valorará la separación en funciones.</p>
      <div class="code-block"><span class="kw">void</span> <span class="fn">mostrarMenu</span>() {
    <span class="fn">printf</span>(<span class="str">"\n=== MENU ===\n"</span>);
    <span class="fn">printf</span>(<span class="str">"1. Mostrar PID y PPID\n"</span>);
    <span class="fn">printf</span>(<span class="str">"2. Atributos del directorio\n"</span>);
    <span class="fn">printf</span>(<span class="str">"3. N&uacute;meros del N al M\n"</span>);
    <span class="fn">printf</span>(<span class="str">"4. Salir\n"</span>);
    <span class="fn">printf</span>(<span class="str">"Opci&oacute;n: "</span>);
}</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Crea la función <code>mostrarMenu()</code> completa con las 4 opciones del examen e intégrala dentro del do-while. Que el bucle se repita hasta que la opción sea 4.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="kw">void</span> <span class="fn">mostrarMenu</span>() {
    <span class="fn">printf</span>(<span class="str">"\n=== MENU ===\n"</span>);
    <span class="fn">printf</span>(<span class="str">"1. PID y PPID\n2. Atributos\n3. N&uacute;meros\n4. Salir\nOp: "</span>);
}

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> op;
    <span class="kw">do</span> {
        <span class="fn">mostrarMenu</span>();
        <span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;op);
        <span class="kw">switch</span>(op) {
            <span class="kw">case</span> <span class="num">4</span>: <span class="fn">printf</span>(<span class="str">"Saliendo...\n"</span>); <span class="kw">break</span>;
            <span class="kw">default</span>: <span class="fn">printf</span>(<span class="str">"(pendiente)\n"</span>);
        }
    } <span class="kw">while</span>(op != <span class="num">4</span>);
    <span class="kw">return</span> <span class="num">0</span>;
}</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">9</div>
      <div><div class="paso-title">getpid() y getppid() — Identificadores de proceso</div><div class="paso-subtitle">La opción más repetida del examen</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>getpid()</code> devuelve el PID del proceso actual. <code>getppid()</code> devuelve el PID del proceso padre. El tipo de retorno es <code>pid_t</code> (se imprime con <code>%d</code>). Requiere <code>#include &lt;unistd.h&gt;</code>.</p>
      <div class="code-block">#<span class="pp">include</span> &lt;<span class="fn">unistd.h</span>&gt;

<span class="fn">printf</span>(<span class="str">"PID actual: %d\n"</span>, <span class="fn">getpid</span>());
<span class="fn">printf</span>(<span class="str">"PID padre:  %d\n"</span>, <span class="fn">getppid</span>());</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Escribe el case 1 del switch que imprima: <em>«El proceso [PID] tiene como padre al proceso [PPID]»</em></p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="kw">case</span> <span class="num">1</span>:
    <span class="fn">printf</span>(<span class="str">"\n--- PID y PPID ---\n"</span>);
    <span class="fn">printf</span>(<span class="str">"El proceso %d tiene como padre al proceso %d\n"</span>,
           <span class="fn">getpid</span>(), <span class="fn">getppid</span>());
    <span class="kw">break</span>;</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">10</div>
      <div><div class="paso-title">stat() — Metadatos de un fichero</div><div class="paso-subtitle">Tamaño, tipo, permisos</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>stat("ruta", &amp;info)</code> rellena una <code>struct stat</code> con metadatos del fichero. Los campos más útiles: <code>st_size</code> (tamaño en bytes), <code>st_mode</code> (tipo y permisos). Requiere <code>#include &lt;sys/stat.h&gt;</code>.</p>
      <div class="code-block">#<span class="pp">include</span> &lt;<span class="fn">sys/stat.h</span>&gt;

<span class="ty">struct stat</span> info;
<span class="fn">stat</span>(<span class="str">"fichero.txt"</span>, &amp;info);
<span class="fn">printf</span>(<span class="str">"Tama&ntilde;o: %ld bytes\n"</span>, (<span class="kw">long</span>)info.st_size);</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Obtén el tamaño de un fichero llamado <strong>datos.txt</strong> e imprímelo. Luego comprueba si es un fichero regular con <code>S_ISREG(info.st_mode)</code>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="ty">struct stat</span> info;
<span class="kw">if</span> (<span class="fn">stat</span>(<span class="str">"datos.txt"</span>, &amp;info) == <span class="num">0</span>) {
    <span class="fn">printf</span>(<span class="str">"Tama&ntilde;o: %ld bytes\n"</span>, (<span class="kw">long</span>)info.st_size);
    <span class="kw">if</span> (<span class="fn">S_ISREG</span>(info.st_mode)) <span class="fn">printf</span>(<span class="str">"Es fichero regular\n"</span>);
    <span class="kw">if</span> (<span class="fn">S_ISDIR</span>(info.st_mode)) <span class="fn">printf</span>(<span class="str">"Es directorio\n"</span>);
}</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">11</div>
      <div><div class="paso-title">opendir() + readdir() — Listar directorio</div><div class="paso-subtitle">La opción 2 clásica del examen</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>opendir(".")</code> abre el directorio actual. <code>readdir(dir)</code> devuelve cada entrada como un puntero <code>struct dirent*</code>. El nombre del fichero está en <code>entrada-&gt;d_name</code>. Cierra siempre con <code>closedir()</code>. Requiere <code>#include &lt;dirent.h&gt;</code>.</p>
      <div class="code-block">#<span class="pp">include</span> &lt;<span class="fn">dirent.h</span>&gt;

<span class="ty">DIR</span> *dir = <span class="fn">opendir</span>(<span class="str">"."</span>);
<span class="ty">struct dirent</span> *e;
<span class="kw">while</span> ((e = <span class="fn">readdir</span>(dir)) != <span class="kw">NULL</span>)
    <span class="fn">printf</span>(<span class="str">"%s\n"</span>, e-&gt;d_name);
<span class="fn">closedir</span>(dir);</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Escribe el case 2 que lista todos los ficheros del directorio actual con su nombre y tamaño en bytes. Salta los que empiecen por <code>.</code> (punto).</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="kw">case</span> <span class="num">2</span>: {
    <span class="ty">DIR</span> *dir = <span class="fn">opendir</span>(<span class="str">"."</span>);
    <span class="ty">struct dirent</span> *e;
    <span class="ty">struct stat</span> info;
    <span class="kw">char</span> ruta[<span class="num">512</span>];
    <span class="fn">printf</span>(<span class="str">"\n--- Ficheros del directorio actual ---\n"</span>);
    <span class="kw">while</span> ((e = <span class="fn">readdir</span>(dir)) != <span class="kw">NULL</span>) {
        <span class="kw">if</span> (e-&gt;d_name[<span class="num">0</span>] == <span class="str">'.'</span>) <span class="kw">continue</span>;
        <span class="fn">snprintf</span>(ruta, <span class="kw">sizeof</span>(ruta), <span class="str">"./%s"</span>, e-&gt;d_name);
        <span class="fn">stat</span>(ruta, &amp;info);
        <span class="fn">printf</span>(<span class="str">"%-20s  %ld bytes\n"</span>, e-&gt;d_name, (<span class="kw">long</span>)info.st_size);
    }
    <span class="fn">closedir</span>(dir);
    <span class="kw">break</span>;
}</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">12</div>
      <div><div class="paso-title">getenv() — Variables de entorno</div><div class="paso-subtitle">Leer PATH y otras</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>getenv("NOMBRE")</code> devuelve el valor de una variable de entorno como <code>char*</code>, o <code>NULL</code> si no existe. No necesita include adicional (está en <code>&lt;stdlib.h&gt;</code>).</p>
      <div class="code-block"><span class="kw">char</span> *path = <span class="fn">getenv</span>(<span class="str">"PATH"</span>);
<span class="kw">if</span> (path != <span class="kw">NULL</span>)
    <span class="fn">printf</span>(<span class="str">"PATH = %s\n"</span>, path);
<span class="kw">else</span>
    <span class="fn">printf</span>(<span class="str">"No definida\n"</span>);</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Escribe un case que muestre el valor de la variable de entorno <strong>HOME</strong>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="kw">case</span> <span class="num">X</span>: {
    <span class="kw">char</span> *home = <span class="fn">getenv</span>(<span class="str">"HOME"</span>);
    <span class="kw">if</span> (home != <span class="kw">NULL</span>) <span class="fn">printf</span>(<span class="str">"HOME = %s\n"</span>, home);
    <span class="kw">else</span> <span class="fn">printf</span>(<span class="str">"Variable no definida\n"</span>);
    <span class="kw">break</span>;
}</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">13</div>
      <div><div class="paso-title">fork() — Crear proceso hijo</div><div class="paso-subtitle">Duplicar el proceso</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>fork()</code> crea un proceso hijo clon del padre. Devuelve: <strong>0</strong> al hijo · <strong>PID del hijo</strong> al padre · <strong>-1</strong> si hay error. A partir del fork, padre e hijo ejecutan código independiente. Requiere <code>#include &lt;unistd.h&gt;</code>.</p>
      <div class="code-block"><span class="ty">pid_t</span> pid = <span class="fn">fork</span>();
<span class="kw">if</span> (pid == <span class="num">0</span>) {
    <span class="fn">printf</span>(<span class="str">"SOY EL HIJO (PID=%d)\n"</span>, <span class="fn">getpid</span>());
} <span class="kw">else if</span> (pid &gt; <span class="num">0</span>) {
    <span class="fn">printf</span>(<span class="str">"SOY EL PADRE (hijo=%d)\n"</span>, pid);
} <span class="kw">else</span> {
    <span class="fn">perror</span>(<span class="str">"fork"</span>);
}</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Crea un proceso hijo. El hijo imprime <em>«Hijo ejecutando, PID=[pid]»</em> y termina. El padre imprime <em>«Padre, mi hijo tiene PID=[pid_hijo]»</em>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block">#<span class="pp">include</span> &lt;<span class="fn">unistd.h</span>&gt;
#<span class="pp">include</span> &lt;<span class="fn">stdlib.h</span>&gt;

<span class="ty">pid_t</span> pid = <span class="fn">fork</span>();
<span class="kw">if</span> (pid == <span class="num">0</span>) {
    <span class="fn">printf</span>(<span class="str">"Hijo ejecutando, PID=%d\n"</span>, <span class="fn">getpid</span>());
    <span class="fn">exit</span>(<span class="num">0</span>);
} <span class="kw">else if</span> (pid &gt; <span class="num">0</span>) {
    <span class="fn">printf</span>(<span class="str">"Padre, mi hijo tiene PID=%d\n"</span>, pid);
} <span class="kw">else</span> {
    <span class="fn">perror</span>(<span class="str">"fork"</span>);
}</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">14</div>
      <div><div class="paso-title">wait() — Esperar al proceso hijo</div><div class="paso-subtitle">Sincronizar padre e hijo</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory"><code>wait(NULL)</code> bloquea al padre hasta que cualquier hijo termina. Evita <em>procesos zombie</em>. Si quieres esperar a un hijo concreto usa <code>waitpid(pid, NULL, 0)</code>. Requiere <code>#include &lt;sys/wait.h&gt;</code>.</p>
      <div class="code-block">#<span class="pp">include</span> &lt;<span class="fn">sys/wait.h</span>&gt;

<span class="ty">pid_t</span> pid = <span class="fn">fork</span>();
<span class="kw">if</span> (pid == <span class="num">0</span>) {
    <span class="fn">printf</span>(<span class="str">"Hijo trabajando...\n"</span>);
    <span class="fn">exit</span>(<span class="num">0</span>);
} <span class="kw">else</span> {
    <span class="fn">wait</span>(<span class="kw">NULL</span>);
    <span class="fn">printf</span>(<span class="str">"Hijo termin&oacute;.\n"</span>);
}</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>El padre crea un hijo que imprime 3 números del 1 al 3 y termina. El padre espera con <code>wait()</code> y luego imprime <em>«Proceso hijo completado»</em>.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="ty">pid_t</span> pid = <span class="fn">fork</span>();
<span class="kw">if</span> (pid == <span class="num">0</span>) {
    <span class="kw">for</span>(<span class="kw">int</span> i=<span class="num">1</span>; i&lt;=<span class="num">3</span>; i++) <span class="fn">printf</span>(<span class="str">"%d\n"</span>, i);
    <span class="fn">exit</span>(<span class="num">0</span>);
} <span class="kw">else</span> {
    <span class="fn">wait</span>(<span class="kw">NULL</span>);
    <span class="fn">printf</span>(<span class="str">"Proceso hijo completado\n"</span>);
}</div></div>
      </div>
    </div>
  </div>
  <div class="paso-card">
    <div class="paso-header">
      <div class="paso-num">15</div>
      <div><div class="paso-title">Bucle N a M con scanf</div><div class="paso-subtitle">El case 3 del examen</div></div>
    </div>
    <div class="paso-body">
      <p class="paso-theory">El examen 2022A y 2024A piden: <em>«el usuario introduce N y M, imprime todos los números del N al M»</em>. Combina dos <code>scanf</code> + un <code>for</code>. Añade comprobación <code>if (n &gt; m)</code> para validar.</p>
      <div class="code-block"><span class="kw">int</span> n, m;
<span class="fn">printf</span>(<span class="str">"N: "</span>); <span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;n);
<span class="fn">printf</span>(<span class="str">"M: "</span>); <span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;m);
<span class="kw">for</span> (<span class="kw">int</span> i = n; i &lt;= m; i++)
    <span class="fn">printf</span>(<span class="str">"%d\n"</span>, i);</div>
      <div class="ejercicio"><div class="ej-label">Ejercicio</div><p>Escribe el case 3 completo: pide N y M, valida que N &lt;= M y muestra los números. Si N &gt; M imprime un mensaje de error.</p></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="kw">case</span> <span class="num">3</span>: {
    <span class="kw">int</span> n, m;
    <span class="fn">printf</span>(<span class="str">"\nIntroduce N: "</span>); <span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;n);
    <span class="fn">printf</span>(<span class="str">"Introduce M: "</span>); <span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;m);
    <span class="kw">if</span> (n &gt; m) {
        <span class="fn">printf</span>(<span class="str">"Error: N debe ser &lt;= M\n"</span>);
    } <span class="kw">else</span> {
        <span class="fn">printf</span>(<span class="str">"N&uacute;meros del %d al %d:\n"</span>, n, m);
        <span class="kw">for</span> (<span class="kw">int</span> i = n; i &lt;= m; i++) <span class="fn">printf</span>(<span class="str">"%d "</span>, i);
        <span class="fn">printf</span>(<span class="str">"\n"</span>);
    }
    <span class="kw">break</span>;
}</div></div>
      </div>
    </div>
  </div>
  <div class="integrador-box">
    <div class="int-label">Ejercicio Integrador</div>
    <h3>El Programa Completo — Como en el Examen Real</h3>
    <p>Escribe el programa C completo con menú de 4 opciones:</p>
    <ol>
      <li>Mostrar PID y PPID del proceso actual</li>
      <li>Listar ficheros del directorio actual con nombre y tamaño</li>
      <li>Introducir N y M, mostrar números del N al M</li>
      <li>Salir</li>
    </ol>
    <p>Usa: <code style="color:#c3e88d">#include &lt;stdio.h&gt;, &lt;unistd.h&gt;, &lt;sys/stat.h&gt;, &lt;dirent.h&gt;, &lt;stdlib.h&gt;</code></p>
    <div class="solucion">
      <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver el programa completo del examen</span><span class="sol-arrow">&#9660;</span></div>
      <div class="sol-content">
        <div class="code-block">#<span class="pp">include</span> &lt;<span class="fn">stdio.h</span>&gt;
#<span class="pp">include</span> &lt;<span class="fn">stdlib.h</span>&gt;
#<span class="pp">include</span> &lt;<span class="fn">unistd.h</span>&gt;
#<span class="pp">include</span> &lt;<span class="fn">sys/stat.h</span>&gt;
#<span class="pp">include</span> &lt;<span class="fn">dirent.h</span>&gt;

<span class="kw">void</span> <span class="fn">mostrarMenu</span>() {
    <span class="fn">printf</span>(<span class="str">"\n========== MENU ==========\n"</span>);
    <span class="fn">printf</span>(<span class="str">"1. Mostrar PID y PPID\n"</span>);
    <span class="fn">printf</span>(<span class="str">"2. Atributos ficheros directorio actual\n"</span>);
    <span class="fn">printf</span>(<span class="str">"3. Mostrar numeros del N al M\n"</span>);
    <span class="fn">printf</span>(<span class="str">"4. Salir\n"</span>);
    <span class="fn">printf</span>(<span class="str">"Seleccione opcion: "</span>);
}

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> opcion;
    <span class="kw">do</span> {
        <span class="fn">mostrarMenu</span>();
        <span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;opcion);

        <span class="kw">switch</span>(opcion) {
            <span class="kw">case</span> <span class="num">1</span>:
                <span class="fn">printf</span>(<span class="str">"\n--- PID y PPID ---\n"</span>);
                <span class="fn">printf</span>(<span class="str">"PID del proceso: %d\n"</span>, <span class="fn">getpid</span>());
                <span class="fn">printf</span>(<span class="str">"PID del padre:   %d\n"</span>, <span class="fn">getppid</span>());
                <span class="kw">break</span>;

            <span class="kw">case</span> <span class="num">2</span>: {
                <span class="ty">DIR</span> *dir = <span class="fn">opendir</span>(<span class="str">"."</span>);
                <span class="ty">struct dirent</span> *e;
                <span class="ty">struct stat</span> info;
                <span class="kw">char</span> ruta[<span class="num">512</span>];
                <span class="fn">printf</span>(<span class="str">"\n--- Ficheros del directorio actual ---\n"</span>);
                <span class="kw">while</span> ((e = <span class="fn">readdir</span>(dir)) != <span class="kw">NULL</span>) {
                    <span class="kw">if</span> (e-&gt;d_name[<span class="num">0</span>] == <span class="str">'.'</span>) <span class="kw">continue</span>;
                    <span class="fn">snprintf</span>(ruta, <span class="kw">sizeof</span>(ruta), <span class="str">"./%s"</span>, e-&gt;d_name);
                    <span class="fn">stat</span>(ruta, &amp;info);
                    <span class="fn">printf</span>(<span class="str">"%-20s  %ld bytes  %s\n"</span>,
                           e-&gt;d_name, (<span class="kw">long</span>)info.st_size,
                           <span class="fn">S_ISDIR</span>(info.st_mode) ? <span class="str">"[DIR]"</span> : <span class="str">"[FILE]"</span>);
                }
                <span class="fn">closedir</span>(dir);
                <span class="kw">break</span>;
            }

            <span class="kw">case</span> <span class="num">3</span>: {
                <span class="kw">int</span> n, m;
                <span class="fn">printf</span>(<span class="str">"\nN: "</span>); <span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;n);
                <span class="fn">printf</span>(<span class="str">"M: "</span>); <span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;m);
                <span class="kw">if</span> (n &gt; m) { <span class="fn">printf</span>(<span class="str">"Error: N &gt; M\n"</span>); <span class="kw">break</span>; }
                <span class="fn">printf</span>(<span class="str">"Numeros del %d al %d: "</span>, n, m);
                <span class="kw">for</span> (<span class="kw">int</span> i = n; i &lt;= m; i++) <span class="fn">printf</span>(<span class="str">"%d "</span>, i);
                <span class="fn">printf</span>(<span class="str">"\n"</span>);
                <span class="kw">break</span>;
            }

            <span class="kw">case</span> <span class="num">4</span>:
                <span class="fn">printf</span>(<span class="str">"Saliendo...\n"</span>);
                <span class="kw">break</span>;

            <span class="kw">default</span>:
                <span class="fn">printf</span>(<span class="str">"Opcion no valida\n"</span>);
        }
    } <span class="kw">while</span> (opcion != <span class="num">4</span>);
    <span class="kw">return</span> <span class="num">0</span>;
}</div>
      </div>
    </div>
  </div>


<div class="exam-real-section">
  <div class="section-heading">
    <div class="sec-num">Ejercicios Reales de Examen</div>
    <h2>Preguntas C/UNIX sacadas de examenes anteriores</h2>
  </div>
  <p class="body-text">Practica con enunciados reales. Intenta resolverlos antes de ver la solucion. Las soluciones incluyen comentarios explicativos.</p>

  <div class="exam-real-card">
    <div class="erc-header">
      <div class="erc-year">2022 &mdash; Modelo A</div>
      <div class="erc-label">Pregunta de desarrollo real</div>
    </div>
    <div class="erc-body">
      <div class="erc-enunciado"><strong>Problema 1:</strong> Desarrolla un programa en C que, mediante un <em>men&uacute; de 4 opciones</em>, permita al usuario:<br><br>
  &nbsp;&nbsp;<strong>1.</strong> Mostrar el PID del proceso actual y el PID de su proceso padre<br>
  &nbsp;&nbsp;<strong>2.</strong> Mostrar el nombre y los atributos (tama&ntilde;o y tipo) de los ficheros del directorio actual<br>
  &nbsp;&nbsp;<strong>3.</strong> Mostrar los n&uacute;meros del <em>11 al 22</em><br>
  &nbsp;&nbsp;<strong>4.</strong> Salir del programa</div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n completa comentada</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="cm">/* Examen 2022 Mod A — Solución completa */</span>
#<span class="pp">include</span> &lt;<span class="fn">stdio.h</span>&gt;
#<span class="pp">include</span> &lt;<span class="fn">stdlib.h</span>&gt;
#<span class="pp">include</span> &lt;<span class="fn">unistd.h</span>&gt;    <span class="cm">/* getpid(), getppid() */</span>
#<span class="pp">include</span> &lt;<span class="fn">sys/stat.h</span>&gt;  <span class="cm">/* stat(), struct stat, S_ISREG, S_ISDIR */</span>
#<span class="pp">include</span> &lt;<span class="fn">dirent.h</span>&gt;    <span class="cm">/* opendir(), readdir(), closedir() */</span>

<span class="cm">/* Funcion auxiliar: muestra el menu de opciones */</span>
<span class="kw">void</span> <span class="fn">mostrarMenu</span>() {
    <span class="fn">printf</span>(<span class="str">"\n========== MENU ==========\n"</span>);
    <span class="fn">printf</span>(<span class="str">"1. Mostrar PID y PID del padre\n"</span>);
    <span class="fn">printf</span>(<span class="str">"2. Atributos de ficheros del directorio actual\n"</span>);
    <span class="fn">printf</span>(<span class="str">"3. Mostrar numeros del 11 al 22\n"</span>);
    <span class="fn">printf</span>(<span class="str">"4. Salir\n"</span>);
    <span class="fn">printf</span>(<span class="str">"Seleccione una opcion: "</span>);
}

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> opcion;

    <span class="kw">do</span> {
        <span class="fn">mostrarMenu</span>();
        <span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;opcion);

        <span class="kw">switch</span>(opcion) {

            <span class="kw">case</span> <span class="num">1</span>:
                <span class="cm">/* getpid() = PID del proceso actual
                   getppid() = PID del proceso padre (la shell) */</span>
                <span class="fn">printf</span>(<span class="str">"\n--- Identificadores de proceso ---\n"</span>);
                <span class="fn">printf</span>(<span class="str">"PID del proceso actual: %d\n"</span>, <span class="fn">getpid</span>());
                <span class="fn">printf</span>(<span class="str">"PID del proceso padre:  %d\n"</span>, <span class="fn">getppid</span>());
                <span class="kw">break</span>;

            <span class="kw">case</span> <span class="num">2</span>: {
                <span class="cm">/* Abrimos el directorio actual con "."
                   Iteramos con readdir hasta que devuelve NULL
                   Para cada entrada, llamamos a stat() para obtener metadatos */</span>
                <span class="ty">DIR</span> *dir;
                <span class="ty">struct dirent</span> *entrada;
                <span class="ty">struct stat</span> info;
                <span class="kw">char</span> ruta[<span class="num">512</span>];

                dir = <span class="fn">opendir</span>(<span class="str">"."</span>);
                <span class="kw">if</span> (dir == <span class="kw">NULL</span>) {
                    <span class="fn">perror</span>(<span class="str">"No se pudo abrir el directorio"</span>);
                    <span class="kw">break</span>;
                }

                <span class="fn">printf</span>(<span class="str">"\n--- Ficheros del directorio actual ---\n"</span>);
                <span class="fn">printf</span>(<span class="str">"%-22s %-10s %s\n"</span>, <span class="str">"Nombre"</span>, <span class="str">"Tamano"</span>, <span class="str">"Tipo"</span>);
                <span class="fn">printf</span>(<span class="str">"%-22s %-10s %s\n"</span>, <span class="str">"------"</span>, <span class="str">"------"</span>, <span class="str">"----"</span>);

                <span class="kw">while</span> ((entrada = <span class="fn">readdir</span>(dir)) != <span class="kw">NULL</span>) {
                    <span class="cm">/* Saltamos "." y ".." para no confundir */</span>
                    <span class="kw">if</span> (entrada-&gt;d_name[<span class="num">0</span>] == <span class="str">'.'</span>) <span class="kw">continue</span>;

                    <span class="cm">/* Construimos la ruta completa para stat() */</span>
                    <span class="fn">snprintf</span>(ruta, <span class="kw">sizeof</span>(ruta), <span class="str">"./%s"</span>, entrada-&gt;d_name);
                    <span class="fn">stat</span>(ruta, &amp;info);

                    <span class="fn">printf</span>(<span class="str">"%-22s %-10ld %s\n"</span>,
                        entrada-&gt;d_name,
                        (<span class="kw">long</span>)info.st_size,
                        <span class="fn">S_ISDIR</span>(info.st_mode) ? <span class="str">"DIRECTORIO"</span> : <span class="str">"FICHERO"</span>);
                }
                <span class="fn">closedir</span>(dir);
                <span class="kw">break</span>;
            }

            <span class="kw">case</span> <span class="num">3</span>:
                <span class="cm">/* Bucle for simple de 11 a 22 incluidos */</span>
                <span class="fn">printf</span>(<span class="str">"\n--- Numeros del 11 al 22 ---\n"</span>);
                <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">11</span>; i &lt;= <span class="num">22</span>; i++) {
                    <span class="fn">printf</span>(<span class="str">"%d "</span>, i);
                }
                <span class="fn">printf</span>(<span class="str">"\n"</span>);
                <span class="kw">break</span>;

            <span class="kw">case</span> <span class="num">4</span>:
                <span class="fn">printf</span>(<span class="str">"Saliendo del programa...\n"</span>);
                <span class="kw">break</span>;

            <span class="kw">default</span>:
                <span class="fn">printf</span>(<span class="str">"Opcion no valida. Intente de nuevo.\n"</span>);
        }

    } <span class="kw">while</span> (opcion != <span class="num">4</span>);  <span class="cm">/* repetir hasta que elija Salir */</span>

    <span class="kw">return</span> <span class="num">0</span>;
}</div></div>
      </div>
    </div>
  </div>
  <div class="exam-real-card">
    <div class="erc-header">
      <div class="erc-year">2024 &mdash; Modelo A</div>
      <div class="erc-label">Pregunta de desarrollo real</div>
    </div>
    <div class="erc-body">
      <div class="erc-enunciado"><strong>Problema 1:</strong> Escribe un programa en C con <em>men&uacute; de 4 opciones</em>:<br><br>
  &nbsp;&nbsp;<strong>1.</strong> Mostrar el PID del proceso y el PID de su padre<br>
  &nbsp;&nbsp;<strong>2.</strong> Mostrar los atributos (nombre, tama&ntilde;o y si es fichero o directorio) de todos los elementos del directorio actual<br>
  &nbsp;&nbsp;<strong>3.</strong> Pedir al usuario dos n&uacute;meros N y M e imprimir todos los n&uacute;meros entre N y M<br>
  &nbsp;&nbsp;<strong>4.</strong> Salir</div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n completa comentada</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="cm">/* Examen 2024 Mod A — igual que 2022A pero la opcion 3 pide N y M por teclado */</span>
#<span class="pp">include</span> &lt;<span class="fn">stdio.h</span>&gt;
#<span class="pp">include</span> &lt;<span class="fn">stdlib.h</span>&gt;
#<span class="pp">include</span> &lt;<span class="fn">unistd.h</span>&gt;
#<span class="pp">include</span> &lt;<span class="fn">sys/stat.h</span>&gt;
#<span class="pp">include</span> &lt;<span class="fn">dirent.h</span>&gt;

<span class="kw">void</span> <span class="fn">mostrarMenu</span>() {
    <span class="fn">printf</span>(<span class="str">"\n=== MENU ===\n1.PID/PPID\n2.Atributos dir\n3.Numeros N-M\n4.Salir\nOp: "</span>);
}

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> op;
    <span class="kw">do</span> {
        <span class="fn">mostrarMenu</span>();
        <span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;op);
        <span class="kw">switch</span>(op) {

            <span class="kw">case</span> <span class="num">1</span>:
                <span class="cm">/* Identico a 2022A */</span>
                <span class="fn">printf</span>(<span class="str">"PID: %d  PPID: %d\n"</span>, <span class="fn">getpid</span>(), <span class="fn">getppid</span>());
                <span class="kw">break</span>;

            <span class="kw">case</span> <span class="num">2</span>: {
                <span class="cm">/* Identico a 2022A — opendir + readdir + stat */</span>
                <span class="ty">DIR</span> *dir = <span class="fn">opendir</span>(<span class="str">"."</span>);
                <span class="ty">struct dirent</span> *e;
                <span class="ty">struct stat</span> s;
                <span class="kw">char</span> ruta[<span class="num">512</span>];
                <span class="kw">while</span> ((e = <span class="fn">readdir</span>(dir)) != <span class="kw">NULL</span>) {
                    <span class="kw">if</span> (e-&gt;d_name[<span class="num">0</span>]==<span class="str">'.'</span>) <span class="kw">continue</span>;
                    <span class="fn">snprintf</span>(ruta, <span class="kw">sizeof</span>(ruta), <span class="str">"./%s"</span>, e-&gt;d_name);
                    <span class="fn">stat</span>(ruta, &amp;s);
                    <span class="fn">printf</span>(<span class="str">"%-20s %ld bytes  %s\n"</span>, e-&gt;d_name, (<span class="kw">long</span>)s.st_size,
                           <span class="fn">S_ISDIR</span>(s.st_mode)?<span class="str">"DIR"</span>:<span class="str">"FILE"</span>);
                }
                <span class="fn">closedir</span>(dir);
                <span class="kw">break</span>;
            }

            <span class="kw">case</span> <span class="num">3</span>: {
                <span class="cm">/* DIFERENCIA respecto 2022A: el usuario introduce N y M */</span>
                <span class="kw">int</span> n, m;
                <span class="fn">printf</span>(<span class="str">"Introduce N: "</span>); <span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;n);
                <span class="fn">printf</span>(<span class="str">"Introduce M: "</span>); <span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;m);
                <span class="kw">if</span> (n &gt; m) { <span class="fn">printf</span>(<span class="str">"Error: N debe ser menor que M\n"</span>); <span class="kw">break</span>; }
                <span class="kw">for</span> (<span class="kw">int</span> i = n; i &lt;= m; i++) <span class="fn">printf</span>(<span class="str">"%d "</span>, i);
                <span class="fn">printf</span>(<span class="str">"\n"</span>);
                <span class="kw">break</span>;
            }

            <span class="kw">case</span> <span class="num">4</span>: <span class="fn">printf</span>(<span class="str">"Saliendo...\n"</span>); <span class="kw">break</span>;
            <span class="kw">default</span>: <span class="fn">printf</span>(<span class="str">"Opcion invalida\n"</span>);
        }
    } <span class="kw">while</span>(op != <span class="num">4</span>);
    <span class="kw">return</span> <span class="num">0</span>;
}</div></div>
      </div>
    </div>
  </div>
  <div class="exam-real-card">
    <div class="erc-header">
      <div class="erc-year">2026 &mdash; Modelo A</div>
      <div class="erc-label">Pregunta de desarrollo real</div>
    </div>
    <div class="erc-body">
      <div class="erc-enunciado"><strong>Problema 1:</strong> Implementa en C un programa con men&uacute; de 4 opciones usando llamadas al sistema UNIX:<br><br>
  &nbsp;&nbsp;<strong>1.</strong> Obtener y mostrar el PID del proceso y el de su proceso padre<br>
  &nbsp;&nbsp;<strong>2.</strong> Listar nombre, tama&ntilde;o y tipo de cada elemento del directorio de trabajo actual<br>
  &nbsp;&nbsp;<strong>3.</strong> Solicitar al usuario los l&iacute;mites N y M y mostrar todos los enteros comprendidos entre ellos<br>
  &nbsp;&nbsp;<strong>4.</strong> Finalizar el programa<br><br>
  <em>(Nota: el examen 2026 confirma el mismo patr&oacute;n que 2022A y 2024A)</em></div>
      <div class="solucion">
        <div class="sol-toggle" onclick="toggleSol(this)"><span>&#128161; Ver soluci&oacute;n completa comentada</span><span class="sol-arrow">&#9660;</span></div>
        <div class="sol-content"><div class="code-block"><span class="cm">/* Examen 2026 Mod A — El patron es IDENTICO a 2024A
   Mismos includes, misma estructura, mismos 4 casos.
   La solucion es practicamente la misma que la de 2024A.
   
   CONSEJO: Si dominas el programa de 2024A, dominas el de 2026A.
   El examinador varia los textos del enunciado pero el codigo es el mismo. */</span>

#<span class="pp">include</span> &lt;<span class="fn">stdio.h</span>&gt;
#<span class="pp">include</span> &lt;<span class="fn">stdlib.h</span>&gt;
#<span class="pp">include</span> &lt;<span class="fn">unistd.h</span>&gt;    <span class="cm">/* getpid, getppid */</span>
#<span class="pp">include</span> &lt;<span class="fn">sys/stat.h</span>&gt;  <span class="cm">/* stat, S_ISREG, S_ISDIR */</span>
#<span class="pp">include</span> &lt;<span class="fn">dirent.h</span>&gt;    <span class="cm">/* opendir, readdir, closedir */</span>

<span class="kw">void</span> <span class="fn">mostrarMenu</span>() {
    <span class="fn">printf</span>(<span class="str">"\n========== MENU SOA 2026 ==========\n"</span>);
    <span class="fn">printf</span>(<span class="str">"1. PID del proceso y del padre\n"</span>);
    <span class="fn">printf</span>(<span class="str">"2. Listar directorio de trabajo\n"</span>);
    <span class="fn">printf</span>(<span class="str">"3. Enteros entre N y M\n"</span>);
    <span class="fn">printf</span>(<span class="str">"4. Finalizar\n"</span>);
    <span class="fn">printf</span>(<span class="str">"Opcion: "</span>);
}

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> op;
    <span class="kw">do</span> {
        <span class="fn">mostrarMenu</span>();
        <span class="fn">scanf</span>(<span class="str">"%d"</span>, &amp;op);
        <span class="kw">switch</span>(op) {
            <span class="kw">case</span> <span class="num">1</span>:
                <span class="fn">printf</span>(<span class="str">"PID proceso actual: %d\n"</span>, <span class="fn">getpid</span>());
                <span class="fn">printf</span>(<span class="str">"PID proceso padre:  %d\n"</span>, <span class="fn">getppid</span>());
                <span class="kw">break</span>;
            <span class="kw">case</span> <span class="num">2</span>: {
                <span class="ty">DIR</span> *d = <span class="fn">opendir</span>(<span class="str">"."</span>);
                <span class="ty">struct dirent</span> *e;
                <span class="ty">struct stat</span> s;
                <span class="kw">char</span> ruta[<span class="num">512</span>];
                <span class="kw">while</span>((e=<span class="fn">readdir</span>(d))!=<span class="kw">NULL</span>) {
                    <span class="kw">if</span>(e-&gt;d_name[<span class="num">0</span>]==<span class="str">'.'</span>) <span class="kw">continue</span>;
                    <span class="fn">snprintf</span>(ruta,<span class="kw">sizeof</span>(ruta),<span class="str">"./%s"</span>,e-&gt;d_name);
                    <span class="fn">stat</span>(ruta,&amp;s);
                    <span class="fn">printf</span>(<span class="str">"%-20s %8ld bytes  [%s]\n"</span>,
                        e-&gt;d_name, (<span class="kw">long</span>)s.st_size,
                        <span class="fn">S_ISDIR</span>(s.st_mode)?<span class="str">"DIR"</span>:<span class="str">"FILE"</span>);
                }
                <span class="fn">closedir</span>(d);
                <span class="kw">break</span>;
            }
            <span class="kw">case</span> <span class="num">3</span>: {
                <span class="kw">int</span> n, m;
                <span class="fn">printf</span>(<span class="str">"N: "</span>); <span class="fn">scanf</span>(<span class="str">"%d"</span>,&amp;n);
                <span class="fn">printf</span>(<span class="str">"M: "</span>); <span class="fn">scanf</span>(<span class="str">"%d"</span>,&amp;m);
                <span class="kw">for</span>(<span class="kw">int</span> i=n; i&lt;=m; i++) <span class="fn">printf</span>(<span class="str">"%d\n"</span>,i);
                <span class="kw">break</span>;
            }
            <span class="kw">case</span> <span class="num">4</span>: <span class="fn">printf</span>(<span class="str">"Programa finalizado.\n"</span>); <span class="kw">break</span>;
            <span class="kw">default</span>: <span class="fn">printf</span>(<span class="str">"Opcion no valida.\n"</span>);
        }
    } <span class="kw">while</span>(op!=<span class="num">4</span>);
    <span class="kw">return</span> <span class="num">0</span>;
}</div></div>
      </div>
    </div>
  </div>
</div>
    </div><!-- /content-area -->
    <div class="chapter-nav">
      <button class="ch-nav-btn" onclick="prevChapter()">&#8592; Anterior</button>
      <button class="ch-nav-btn next" onclick="nextChapter()">Siguiente: PowerShell &#8594;</button>
    </div>
