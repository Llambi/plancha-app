---
asignatura: soa
chapter: ch5
num: ⚡
titulo: APRÉNDETE ESTO
orden: 5
---

<div class="chapter-banner" style="background:linear-gradient(135deg,#7B0D1C 0%,#C41230 100%);">
      <div class="ch-label">Resumen de Examen Real</div>
      <h1>⚡ APRÉNDETE ESTO</h1>
      <p class="ch-desc">Las preguntas de desarrollo que han salido literalmente en los exámenes. La pregunta exacta, la respuesta exacta. Sin rodeos.</p>
      <div class="objectives">
        <strong>Qué encontrarás aquí:</strong>
        Teoría recurrente por año · Menú C clásico con código · PowerShell más repetido · Bash cuando aparece
      </div>
    </div>
    <div class="exam-alert">
      <span class="stars">★★★</span>
      Las preguntas de desarrollo valen 6 puntos (1 teoría + 2,5 + 2,5 prácticas). Aprende estos patrones de memoria.
    </div>

    <div class="content-area">

      <!-- ==================== BLOQUE 1: TEORÍA ==================== -->
      <div class="section-heading" style="background:#fff5f5; border-left-color:var(--mcg-red);">
        <div class="sec-num" style="color:var(--mcg-red);">Bloque T · TEORÍA (1 punto)</div>
        <h2 style="color:var(--mcg-red-dark);">Preguntas de teoría que han caído — responde en ~10 líneas</h2>
      </div>

      <!-- T1: Características de C -->
      <div class="exam-real-card">
        <div class="erc-header">
          <span class="erc-year">TEORÍA · T1</span>
          <span class="erc-label">
            <span style="background:#C41230; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700;">2026-A</span>
          </span>
        </div>
        <div class="erc-body">
          <div class="erc-enunciado"><em>Se ha preguntado así:</em><br><br>
            <strong>¿Cuáles son las principales características que hacen que C sea un lenguaje utilizado profesionalmente?</strong>
          </div>
          <div class="solucion" style="margin-top:12px;">
            <div class="sol-toggle" onclick="toggleSol(this)"><span>⚡ Responde esto</span><span class="sol-arrow">▼</span></div>
            <div class="sol-content" style="padding:14px 2px 4px;">
              <div class="def-box">
                <div class="box-label">Respuesta directa</div>
                <p><strong>1. Portabilidad:</strong> El código C se puede compilar en prácticamente cualquier plataforma sin apenas cambios.<br>
                <strong>2. Eficiencia:</strong> Genera código máquina muy eficiente; es casi tan rápido como ensamblador.<br>
                <strong>3. Control de bajo nivel:</strong> Permite acceder directamente a memoria (punteros), registros y llamadas al sistema.<br>
                <strong>4. Estructurado:</strong> Soporta funciones, bucles y condicionales → facilita el mantenimiento.<br>
                <strong>5. Lenguaje base del UNIX/Linux:</strong> El kernel Linux y muchas llamadas POSIX están escritas en C.<br>
                <strong>6. Amplia librería estándar (stdlib):</strong> stdio, stdlib, string, unistd…<br>
                <strong>7. Compilado (no interpretado):</strong> El ejecutable final no necesita intérprete en tiempo de ejecución.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- T2: Funciones del SO -->
      <div class="exam-real-card">
        <div class="erc-header">
          <span class="erc-year">TEORÍA · T2</span>
          <span class="erc-label">
            <span style="background:#C41230; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700;">2025-C</span>
          </span>
        </div>
        <div class="erc-body">
          <div class="erc-enunciado"><em>Se ha preguntado así:</em><br><br>
            <strong>Define cuáles son las funciones de un Sistema Operativo.</strong>
          </div>
          <div class="solucion" style="margin-top:12px;">
            <div class="sol-toggle" onclick="toggleSol(this)"><span>⚡ Responde esto</span><span class="sol-arrow">▼</span></div>
            <div class="sol-content" style="padding:14px 2px 4px;">
              <div class="def-box">
                <div class="box-label">Respuesta directa</div>
                <p><strong>1. Gestión de procesos:</strong> Creación, planificación y terminación de procesos/hilos.<br>
                <strong>2. Gestión de memoria:</strong> Asignación y liberación de memoria RAM, memoria virtual y paginación.<br>
                <strong>3. Gestión del sistema de ficheros:</strong> Organización, lectura/escritura y permisos de archivos y directorios.<br>
                <strong>4. Gestión de dispositivos E/S:</strong> Comunicación con hardware a través de drivers.<br>
                <strong>5. Gestión de seguridad y protección:</strong> Control de acceso, permisos y autenticación.<br>
                <strong>6. Interfaz de usuario:</strong> Shell de línea de comandos o interfaz gráfica (GUI).<br>
                <strong>7. Comunicación entre procesos (IPC):</strong> Pipes, sockets, señales, semáforos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- T3: Sistemas monolíticos -->
      <div class="exam-real-card">
        <div class="erc-header">
          <span class="erc-year">TEORÍA · T3</span>
          <span class="erc-label">
            <span style="background:#C41230; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700;">2026-B</span>
            <span style="background:#6B3A8E; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2024-E</span>
          </span>
        </div>
        <div class="erc-body">
          <div class="erc-enunciado"><em>Se ha preguntado así:</em><br><br>
            <strong>Define la estructura de un Sistema Operativo. Describe las principales características de los sistemas monolíticos.</strong>
          </div>
          <div class="solucion" style="margin-top:12px;">
            <div class="sol-toggle" onclick="toggleSol(this)"><span>⚡ Responde esto</span><span class="sol-arrow">▼</span></div>
            <div class="sol-content" style="padding:14px 2px 4px;">
              <div class="def-box">
                <div class="box-label">Respuesta directa</div>
                <p><strong>Estructuras de SO:</strong> Monolítica · En capas · Microkernel · Máquina virtual · Exokernel<br><br>
                <strong>Sistema monolítico (Linux es el ejemplo):</strong><br>
                — Todo el SO corre en modo kernel como un único bloque de código.<br>
                — Las funciones se llaman directamente entre sí (no hay separación entre módulos).<br>
                — <strong>Ventajas:</strong> Alta eficiencia y rendimiento (no hay paso de mensajes entre módulos).<br>
                — <strong>Inconvenientes:</strong> Difícil de mantener y depurar; un fallo puede tumbar todo el sistema.<br>
                — <strong>Ejemplo:</strong> Linux (con módulos cargables dinámicamente), MS-DOS.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- T4: Proceso Windows recursos -->
      <div class="exam-real-card">
        <div class="erc-header">
          <span class="erc-year">TEORÍA · T4</span>
          <span class="erc-label">
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700;">2024-C</span>
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2024-F</span>
          </span>
        </div>
        <div class="erc-body">
          <div class="erc-enunciado"><em>Se ha preguntado así:</em><br><br>
            <strong>Desde la perspectiva de Windows un proceso identifica a un conjunto de recursos. ¿Puedes enumerar este conjunto de recursos?</strong>
          </div>
          <div class="solucion" style="margin-top:12px;">
            <div class="sol-toggle" onclick="toggleSol(this)"><span>⚡ Responde esto</span><span class="sol-arrow">▼</span></div>
            <div class="sol-content" style="padding:14px 2px 4px;">
              <div class="def-box">
                <div class="box-label">Respuesta directa</div>
                <p>Un proceso en Windows encapsula los siguientes recursos:<br>
                <strong>1.</strong> Espacio de direcciones de memoria virtual privado.<br>
                <strong>2.</strong> Un token de acceso (credenciales de seguridad: usuario, grupo, privilegios).<br>
                <strong>3.</strong> Una lista de handles (manejadores) a objetos del kernel: ficheros, sockets, eventos, secciones…<br>
                <strong>4.</strong> Al menos un hilo de ejecución (thread).<br>
                <strong>5.</strong> Identificador de proceso único (PID).<br>
                <strong>6.</strong> Variables de entorno heredadas del proceso padre.<br>
                <strong>7.</strong> Prioridad base para la planificación del proceso.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- T5: Win32 vs Win64 -->
      <div class="exam-real-card">
        <div class="erc-header">
          <span class="erc-year">TEORÍA · T5</span>
          <span class="erc-label">
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700;">2025-B</span>
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2023-B</span>
          </span>
        </div>
        <div class="erc-body">
          <div class="erc-enunciado"><em>Se ha preguntado así:</em><br><br>
            <strong>¿Cuáles son las principales diferencias entre Win32 y Win64?</strong>
          </div>
          <div class="solucion" style="margin-top:12px;">
            <div class="sol-toggle" onclick="toggleSol(this)"><span>⚡ Responde esto</span><span class="sol-arrow">▼</span></div>
            <div class="sol-content" style="padding:14px 2px 4px;">
              <div class="def-box">
                <div class="box-label">Respuesta directa</div>
                <p><strong>Memoria:</strong> Win32 → 4 GB espacio de direcciones por proceso (2 GB usuario + 2 GB kernel). Win64 → hasta 128 TB de espacio virtual por proceso (en la práctica, máquinas con mucha más RAM).<br>
                <strong>Tamaño de punteros:</strong> Win32 → 4 bytes. Win64 → 8 bytes. Los programas x64 deben recompilarse.<br>
                <strong>Registros CPU:</strong> Win64 dispone de 16 registros de propósito general (vs 8 en x86). Más rendimiento.<br>
                <strong>Convención de llamadas:</strong> Diferente ABI (Application Binary Interface): parámetros pasados por registro en x64, por pila en x86.<br>
                <strong>Compatibilidad:</strong> Windows 64 bits ejecuta binarios Win32 mediante WOW64 (emulación).<br>
                <strong>Drivers:</strong> Los drivers de Win64 deben estar firmados digitalmente. Los de Win32 no necesariamente.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- T6: PowerShell qué es -->
      <div class="exam-real-card">
        <div class="erc-header">
          <span class="erc-year">TEORÍA · T6</span>
          <span class="erc-label">
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700;">2025-A</span>
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2024-A</span>
          </span>
        </div>
        <div class="erc-body">
          <div class="erc-enunciado"><em>Se ha preguntado así:</em><br><br>
            <strong>¿Qué es PowerShell y cuáles serían los pasos para su puesta en marcha?</strong>
          </div>
          <div class="solucion" style="margin-top:12px;">
            <div class="sol-toggle" onclick="toggleSol(this)"><span>⚡ Responde esto</span><span class="sol-arrow">▼</span></div>
            <div class="sol-content" style="padding:14px 2px 4px;">
              <div class="def-box">
                <div class="box-label">Respuesta directa</div>
                <p><strong>PowerShell</strong> es un shell de línea de comandos y lenguaje de scripting orientado a objetos desarrollado por Microsoft, construido sobre .NET. A diferencia de cmd.exe (que trabaja con texto), PowerShell trabaja con <em>objetos</em> .NET, lo que permite encadenar comandos y manipular propiedades directamente.<br><br>
                <strong>Pasos para su puesta en marcha:</strong><br>
                1. Verificar versión instalada: <code>$PSVersionTable.PSVersion</code><br>
                2. Abrir PowerShell con privilegios de administrador (clic derecho → Ejecutar como administrador).<br>
                3. Establecer la política de ejecución si es necesario: <code>Set-ExecutionPolicy RemoteSigned</code><br>
                4. Crear o editar un script <code>.ps1</code> con un editor (PowerShell ISE, VS Code…).<br>
                5. Ejecutar el script: <code>.\miscript.ps1</code></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="sec-divider">

      <!-- ==================== BLOQUE 2: PRÁCTICA C ==================== -->
      <div class="section-heading" style="background:#fff5f5; border-left-color:var(--mcg-red);">
        <div class="sec-num" style="color:var(--mcg-red);">Bloque C · PRÁCTICA C / UNIX (2,5 puntos)</div>
        <h2 style="color:var(--mcg-red-dark);">El menú de 4 opciones en C — patrones que siempre vuelven</h2>
      </div>

      <!-- C1: Menú clásico PID + directorio + números -->
      <div class="exam-real-card">
        <div class="erc-header">
          <span class="erc-year">C · PATRÓN 1 — El más repetido</span>
          <span class="erc-label">
            <span style="background:#C41230; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700;">2026-A</span>
            <span style="background:#C41230; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2026-B</span>
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2025-A</span>
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2024-A</span>
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2022-A</span>
          </span>
        </div>
        <div class="erc-body">
          <div class="erc-enunciado"><em>Se ha preguntado así:</em><br><br>
            <strong>Realiza un programa en C bajo UNIX. El programa debe mostrar un menú con 4 opciones hasta pulsar la opción 4 (salir). Las opciones son:</strong><br>
            &nbsp;&nbsp;<strong>1.</strong> Muestra el PID de este proceso en curso y el de su padre.<br>
            &nbsp;&nbsp;<strong>2.</strong> Mediante llamadas básicas a sistema muestra los atributos de ficheros y directorios del path actual.<br>
            &nbsp;&nbsp;<strong>3.</strong> Muestra los números del 11 al 22.<br>
            &nbsp;&nbsp;<strong>4.</strong> Salir.
          </div>
          <div class="solucion" style="margin-top:12px;">
            <div class="sol-toggle" onclick="toggleSol(this)"><span>⚡ Código completo comentado</span><span class="sol-arrow">▼</span></div>
            <div class="sol-content">
              <div class="code-block"><span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span>
<span class="pp">#include</span> <span class="str">&lt;stdlib.h&gt;</span>
<span class="pp">#include</span> <span class="str">&lt;unistd.h&gt;</span>    <span class="cm">// getpid(), getppid()</span>
<span class="pp">#include</span> <span class="str">&lt;dirent.h&gt;</span>    <span class="cm">// opendir(), readdir(), closedir()</span>
<span class="pp">#include</span> <span class="str">&lt;sys/stat.h&gt;</span>  <span class="cm">// stat(), struct stat</span>

<span class="ty">void</span> <span class="fn">mostrarPID</span>() {
    printf(<span class="str">"PID del proceso actual: %d\n"</span>, getpid());
    printf(<span class="str">"PID del proceso padre:  %d\n"</span>, getppid());
}

<span class="ty">void</span> <span class="fn">mostrarAtributos</span>() {
    DIR *dir = opendir(<span class="str">"."</span>);        <span class="cm">// abrir directorio actual</span>
    <span class="kw">struct</span> dirent *entrada;
    <span class="kw">struct</span> stat info;

    <span class="kw">while</span> ((entrada = readdir(dir)) != NULL) {
        <span class="kw">if</span> (stat(entrada-&gt;d_name, &amp;info) == <span class="num">0</span>) {
            printf(<span class="str">"%s  — tamaño: %ld bytes\n"</span>,
                   entrada-&gt;d_name, (<span class="ty">long</span>)info.st_size);
        }
    }
    closedir(dir);
}

<span class="ty">void</span> <span class="fn">mostrarNumeros</span>() {
    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="num">11</span>; i &lt;= <span class="num">22</span>; i++) {
        printf(<span class="str">"%d\n"</span>, i);
    }
}

<span class="ty">void</span> <span class="fn">mostrarMenu</span>() {
    printf(<span class="str">"\n===== MENÚ SOA =====\n"</span>);
    printf(<span class="str">"1. Mostrar PID y PPID\n"</span>);
    printf(<span class="str">"2. Atributos del directorio actual\n"</span>);
    printf(<span class="str">"3. Números del 11 al 22\n"</span>);
    printf(<span class="str">"4. Salir\n"</span>);
    printf(<span class="str">"Opción: "</span>);
}

<span class="ty">int</span> <span class="fn">main</span>() {
    <span class="ty">int</span> op;
    <span class="kw">do</span> {
        mostrarMenu();
        scanf(<span class="str">"%d"</span>, &amp;op);
        <span class="kw">switch</span> (op) {
            <span class="kw">case</span> <span class="num">1</span>: mostrarPID();        <span class="kw">break</span>;
            <span class="kw">case</span> <span class="num">2</span>: mostrarAtributos(); <span class="kw">break</span>;
            <span class="kw">case</span> <span class="num">3</span>: mostrarNumeros();   <span class="kw">break</span>;
            <span class="kw">case</span> <span class="num">4</span>: printf(<span class="str">"Saliendo...\n"</span>); <span class="kw">break</span>;
            <span class="kw">default</span>: printf(<span class="str">"Opción no válida\n"</span>);
        }
    } <span class="kw">while</span> (op != <span class="num">4</span>);
    <span class="kw">return</span> <span class="num">0</span>;
}</div>
              <div class="key-box" style="margin-top:10px;">
                <div class="box-label">🔑 Claves a recordar</div>
                <p><code>getpid()</code> = PID propio · <code>getppid()</code> = PID padre · <code>opendir(".")</code> = dir actual · <code>stat(nombre, &amp;info)</code> llena la struct con tamaño, permisos, fechas · <code>closedir()</code> siempre al final</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- C2: Menú fichero renombrar + leer + números inversos -->
      <div class="exam-real-card">
        <div class="erc-header">
          <span class="erc-year">C · PATRÓN 2 — Ficheros</span>
          <span class="erc-label">
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700;">2025-B</span>
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2023-B</span>
          </span>
        </div>
        <div class="erc-body">
          <div class="erc-enunciado"><em>Se ha preguntado así:</em><br><br>
            <strong>Realiza un programa en C bajo UNIX con menú de 4 opciones:</strong><br>
            &nbsp;&nbsp;<strong>1.</strong> Modifica el nombre del fichero "ficheroA.txt" por "ficheroB.txt" y gestionar si tiene error.<br>
            &nbsp;&nbsp;<strong>2.</strong> Muestra el contenido del fichero "ficheroB.txt".<br>
            &nbsp;&nbsp;<strong>3.</strong> Muestra los números del 22 al 11.<br>
            &nbsp;&nbsp;<strong>4.</strong> Salir.
          </div>
          <div class="solucion" style="margin-top:12px;">
            <div class="sol-toggle" onclick="toggleSol(this)"><span>⚡ Código completo comentado</span><span class="sol-arrow">▼</span></div>
            <div class="sol-content">
              <div class="code-block"><span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span>
<span class="pp">#include</span> <span class="str">&lt;stdlib.h&gt;</span>

<span class="ty">void</span> <span class="fn">renombrar</span>() {
    <span class="cm">// rename() devuelve 0 si OK, -1 si error</span>
    <span class="kw">if</span> (rename(<span class="str">"ficheroA.txt"</span>, <span class="str">"ficheroB.txt"</span>) == <span class="num">0</span>)
        printf(<span class="str">"Renombrado correctamente\n"</span>);
    <span class="kw">else</span>
        perror(<span class="str">"Error al renombrar"</span>);
}

<span class="ty">void</span> <span class="fn">mostrarContenido</span>() {
    FILE *f = fopen(<span class="str">"ficheroB.txt"</span>, <span class="str">"r"</span>);
    <span class="kw">if</span> (f == NULL) { perror(<span class="str">"Error apertura"</span>); <span class="kw">return</span>; }
    <span class="ty">char</span> linea[<span class="num">256</span>];
    <span class="kw">while</span> (fgets(linea, <span class="kw">sizeof</span>(linea), f) != NULL)
        printf(<span class="str">"%s"</span>, linea);
    fclose(f);
}

<span class="ty">void</span> <span class="fn">numerosInversos</span>() {
    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="num">22</span>; i &gt;= <span class="num">11</span>; i--)
        printf(<span class="str">"%d\n"</span>, i);
}

<span class="ty">int</span> <span class="fn">main</span>() {
    <span class="ty">int</span> op;
    <span class="kw">do</span> {
        printf(<span class="str">"\n1.Renombrar  2.Leer  3.Números  4.Salir\nOpción: "</span>);
        scanf(<span class="str">"%d"</span>, &amp;op);
        <span class="kw">switch</span>(op) {
            <span class="kw">case</span> <span class="num">1</span>: renombrar();       <span class="kw">break</span>;
            <span class="kw">case</span> <span class="num">2</span>: mostrarContenido(); <span class="kw">break</span>;
            <span class="kw">case</span> <span class="num">3</span>: numerosInversos(); <span class="kw">break</span>;
            <span class="kw">case</span> <span class="num">4</span>: printf(<span class="str">"Adios\n"</span>);    <span class="kw">break</span>;
            <span class="kw">default</span>: printf(<span class="str">"Inválida\n"</span>);
        }
    } <span class="kw">while</span> (op != <span class="num">4</span>);
    <span class="kw">return</span> <span class="num">0</span>;
}</div>
              <div class="key-box" style="margin-top:10px;">
                <div class="box-label">🔑 Claves a recordar</div>
                <p><code>rename("orig","dest")</code> renombra · <code>fopen(f,"r")</code> abre para leer · <code>fgets(buf,size,f)</code> lee línea a línea · <code>perror("msg")</code> imprime el error del sistema · <code>fclose(f)</code> siempre</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- C3: Menú escribir fichero -->
      <div class="exam-real-card">
        <div class="erc-header">
          <span class="erc-year">C · PATRÓN 3 — Escribir y leer fichero</span>
          <span class="erc-label">
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700;">2024-C</span>
          </span>
        </div>
        <div class="erc-body">
          <div class="erc-enunciado"><em>Se ha preguntado así:</em><br><br>
            <strong>Realiza un programa en C bajo UNIX con menú de 4 opciones:</strong><br>
            &nbsp;&nbsp;<strong>1.</strong> Escribe tu nombre en el fichero "nombre.txt".<br>
            &nbsp;&nbsp;<strong>2.</strong> Muestra el contenido del fichero "nombre.txt".<br>
            &nbsp;&nbsp;<strong>3.</strong> Muestra los números del -1 al 8.<br>
            &nbsp;&nbsp;<strong>4.</strong> Salir.
          </div>
          <div class="solucion" style="margin-top:12px;">
            <div class="sol-toggle" onclick="toggleSol(this)"><span>⚡ Código completo comentado</span><span class="sol-arrow">▼</span></div>
            <div class="sol-content">
              <div class="code-block"><span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span>
<span class="pp">#include</span> <span class="str">&lt;stdlib.h&gt;</span>
<span class="pp">#include</span> <span class="str">&lt;string.h&gt;</span>

<span class="ty">void</span> <span class="fn">escribirNombre</span>() {
    FILE *f = fopen(<span class="str">"nombre.txt"</span>, <span class="str">"w"</span>); <span class="cm">// "w" = escribir (sobreescribe)</span>
    <span class="kw">if</span> (f == NULL) { perror(<span class="str">"Error"</span>); <span class="kw">return</span>; }
    <span class="ty">char</span> nombre[<span class="num">100</span>];
    printf(<span class="str">"Introduce tu nombre: "</span>);
    scanf(<span class="str">"%s"</span>, nombre);
    fprintf(f, <span class="str">"%s\n"</span>, nombre);
    fclose(f);
    printf(<span class="str">"Nombre guardado en nombre.txt\n"</span>);
}

<span class="ty">void</span> <span class="fn">leerNombre</span>() {
    FILE *f = fopen(<span class="str">"nombre.txt"</span>, <span class="str">"r"</span>);
    <span class="kw">if</span> (f == NULL) { perror(<span class="str">"Error"</span>); <span class="kw">return</span>; }
    <span class="ty">char</span> linea[<span class="num">100</span>];
    <span class="kw">while</span> (fgets(linea, <span class="kw">sizeof</span>(linea), f))
        printf(<span class="str">"%s"</span>, linea);
    fclose(f);
}

<span class="ty">void</span> <span class="fn">mostrarNumerosNeg</span>() {
    <span class="kw">for</span> (<span class="ty">int</span> i = <span class="num">-1</span>; i &lt;= <span class="num">8</span>; i++)
        printf(<span class="str">"%d\n"</span>, i);
}

<span class="ty">int</span> <span class="fn">main</span>() {
    <span class="ty">int</span> op;
    <span class="kw">do</span> {
        printf(<span class="str">"\n1.Escribir  2.Leer  3.Números  4.Salir\nOpción: "</span>);
        scanf(<span class="str">"%d"</span>, &amp;op);
        <span class="kw">switch</span>(op) {
            <span class="kw">case</span> <span class="num">1</span>: escribirNombre();     <span class="kw">break</span>;
            <span class="kw">case</span> <span class="num">2</span>: leerNombre();         <span class="kw">break</span>;
            <span class="kw">case</span> <span class="num">3</span>: mostrarNumerosNeg(); <span class="kw">break</span>;
            <span class="kw">case</span> <span class="num">4</span>: printf(<span class="str">"Adios\n"</span>);    <span class="kw">break</span>;
            <span class="kw">default</span>: printf(<span class="str">"Inválida\n"</span>);
        }
    } <span class="kw">while</span> (op != <span class="num">4</span>);
    <span class="kw">return</span> <span class="num">0</span>;
}</div>
            </div>
          </div>
        </div>
      </div>

      <hr class="sec-divider">

      <!-- ==================== BLOQUE 3: PRÁCTICA POWERSHELL ==================== -->
      <div class="section-heading" style="background:#fff5f5; border-left-color:var(--mcg-red);">
        <div class="sec-num" style="color:var(--mcg-red);">Bloque PS · PRÁCTICA POWERSHELL (2,5 puntos)</div>
        <h2 style="color:var(--mcg-red-dark);">Los tres patrones PowerShell que siempre vuelven</h2>
      </div>

      <!-- PS1: Procesos + Stop + EventLog -->
      <div class="exam-real-card">
        <div class="erc-header">
          <span class="erc-year">PS · PATRÓN 1 — Procesos y eventos</span>
          <span class="erc-label">
            <span style="background:#C41230; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700;">2026-B</span>
            <span style="background:#C41230; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2025-C</span>
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2024-C</span>
          </span>
        </div>
        <div class="erc-body">
          <div class="erc-enunciado"><em>Se ha preguntado así:</em><br><br>
            <strong>En PowerShell:</strong><br>
            &nbsp;&nbsp;<strong>1.</strong> Muestre los procesos abiertos.<br>
            &nbsp;&nbsp;<strong>2.</strong> Suponiendo que existe un proceso con ID 1234 y nombre Paint, pare dicho proceso.<br>
            &nbsp;&nbsp;<strong>3.</strong> Muestra los registros de eventos de Windows (abrir visor de eventos).
          </div>
          <div class="solucion" style="margin-top:12px;">
            <div class="sol-toggle" onclick="toggleSol(this)"><span>⚡ Código completo comentado</span><span class="sol-arrow">▼</span></div>
            <div class="sol-content">
              <div class="code-block"><span class="cm"># PUNTO 1 — Mostrar procesos abiertos</span>
<span class="ps-cmd">Get-Process</span>

<span class="cm"># PUNTO 2 — Parar proceso Paint con ID 1234 (dos formas)</span>
<span class="ps-cmd">Stop-Process</span> <span class="ps-param">-Name</span> <span class="ps-str">"paint"</span> <span class="ps-param">-Force</span>
<span class="ps-cmd">Stop-Process</span> <span class="ps-param">-Id</span> <span class="num">1234</span> <span class="ps-param">-Force</span>

<span class="cm"># PUNTO 3 — Ver registros de eventos (visor de eventos)</span>
<span class="ps-cmd">Get-EventLog</span> <span class="ps-param">-List</span>                      <span class="cm"># lista todos los logs disponibles</span>
<span class="ps-cmd">Get-EventLog</span> <span class="ps-param">-LogName</span> <span class="ps-str">"System"</span>          <span class="cm"># eventos del sistema</span>
<span class="ps-cmd">Get-EventLog</span> <span class="ps-param">-LogName</span> <span class="ps-str">"Application"</span>     <span class="cm"># eventos de aplicación</span>
<span class="cm"># Alternativa moderna:</span>
<span class="ps-cmd">Get-WinEvent</span> <span class="ps-param">-LogName</span> <span class="ps-str">"System"</span> <span class="ps-param">-MaxEvents</span> <span class="num">10</span></div>
              <div class="key-box" style="margin-top:10px;">
                <div class="box-label">🔑 Claves a recordar</div>
                <p><code>Get-Process</code> · <code>Stop-Process -Name "paint" -Force</code> · <code>Stop-Process -Id 1234 -Force</code> · <code>Get-EventLog -List</code> · <code>Get-EventLog -LogName "System"</code></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PS2: Tabla multiplicar + UID + EventLog -->
      <div class="exam-real-card">
        <div class="erc-header">
          <span class="erc-year">PS · PATRÓN 2 — Tabla, UID y eventos</span>
          <span class="erc-label">
            <span style="background:#C41230; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700;">2026-A</span>
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2025-A</span>
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2024-A</span>
          </span>
        </div>
        <div class="erc-body">
          <div class="erc-enunciado"><em>Se ha preguntado así:</em><br><br>
            <strong>En PowerShell:</strong><br>
            &nbsp;&nbsp;<strong>1.</strong> Dado un número por teclado entre 1 y 10 muestra su tabla de multiplicar.<br>
            &nbsp;&nbsp;<strong>2.</strong> Muestra el UID del usuario.<br>
            &nbsp;&nbsp;<strong>3.</strong> Muestra los registros de eventos de Windows (abrir visor de eventos).
          </div>
          <div class="solucion" style="margin-top:12px;">
            <div class="sol-toggle" onclick="toggleSol(this)"><span>⚡ Código completo comentado</span><span class="sol-arrow">▼</span></div>
            <div class="sol-content">
              <div class="code-block"><span class="cm"># PUNTO 1 — Tabla de multiplicar</span>
<span class="ps-var">$num</span> = <span class="ps-cmd">Read-Host</span> <span class="ps-str">"Introduce un número (1-10)"</span>
<span class="kw">for</span> (<span class="ps-var">$i</span> = <span class="num">1</span>; <span class="ps-var">$i</span> <span class="ps-param">-le</span> <span class="num">10</span>; <span class="ps-var">$i</span>++) {
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"$num x $i = $($num * $i)"</span>
}

<span class="cm"># PUNTO 2 — UID del usuario (SID en Windows)</span>
<span class="ps-var">$user</span> = [System.Security.Principal.WindowsIdentity]::GetCurrent()
<span class="ps-cmd">Write-Host</span> <span class="ps-str">"Usuario: $($user.Name)"</span>
<span class="ps-cmd">Write-Host</span> <span class="ps-str">"SID (UID): $($user.User)"</span>

<span class="cm"># Alternativa más simple que también vale:</span>
<span class="ps-cmd">whoami</span> <span class="ps-param">/user</span>

<span class="cm"># PUNTO 3 — Registros de eventos</span>
<span class="ps-cmd">Get-EventLog</span> <span class="ps-param">-List</span>
<span class="ps-cmd">Get-EventLog</span> <span class="ps-param">-LogName</span> <span class="ps-str">"System"</span></div>
              <div class="key-box" style="margin-top:10px;">
                <div class="box-label">🔑 Claves a recordar</div>
                <p><code>Read-Host "msg"</code> · <code>for ($i=1; $i -le 10; $i++)</code> · <code>whoami /user</code> para el UID · <code>Get-EventLog -List</code></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PS3: Gestión directorios -->
      <div class="exam-real-card">
        <div class="erc-header">
          <span class="erc-year">PS · PATRÓN 3 — Gestión de directorios</span>
          <span class="erc-label">
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700;">2025-B</span>
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2023-B</span>
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2022-A</span>
          </span>
        </div>
        <div class="erc-body">
          <div class="erc-enunciado"><em>Se ha preguntado así:</em><br><br>
            <strong>En PowerShell muestra un menú que recibe un nombre de directorio y la opción numérica 1, 2 o 3. Según la opción crea un directorio, lo elimina o lo lista.</strong>
          </div>
          <div class="solucion" style="margin-top:12px;">
            <div class="sol-toggle" onclick="toggleSol(this)"><span>⚡ Código completo comentado</span><span class="sol-arrow">▼</span></div>
            <div class="sol-content">
              <div class="code-block"><span class="kw">function</span> <span class="fn">CrearDirectorio</span>(<span class="ps-var">$dir</span>) {
    <span class="ps-cmd">New-Item</span> <span class="ps-param">-Path</span> <span class="ps-var">$dir</span> <span class="ps-param">-ItemType</span> <span class="ps-str">"Directory"</span>
}
<span class="kw">function</span> <span class="fn">EliminarDirectorio</span>(<span class="ps-var">$dir</span>) {
    <span class="ps-cmd">Remove-Item</span> <span class="ps-param">-Path</span> <span class="ps-var">$dir</span> <span class="ps-param">-Recurse</span> <span class="ps-param">-Force</span>
}
<span class="kw">function</span> <span class="fn">ListarDirectorio</span>(<span class="ps-var">$dir</span>) {
    <span class="ps-cmd">Get-ChildItem</span> <span class="ps-param">-Path</span> <span class="ps-var">$dir</span>
}

<span class="kw">do</span> {
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"`n===== MENÚ SOA ====="</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"1. Crear directorio"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"2. Eliminar directorio"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"3. Listar directorio"</span>
    <span class="ps-cmd">Write-Host</span> <span class="ps-str">"4. Salir"</span>
    <span class="ps-var">$dir</span> = <span class="ps-cmd">Read-Host</span> <span class="ps-str">"Introduce el nombre del directorio"</span>
    <span class="ps-var">$op</span>  = <span class="ps-cmd">Read-Host</span> <span class="ps-str">"Opción"</span>

    <span class="kw">switch</span> (<span class="ps-var">$op</span>) {
        <span class="ps-str">"1"</span> { CrearDirectorio <span class="ps-var">$dir</span>    }
        <span class="ps-str">"2"</span> { EliminarDirectorio <span class="ps-var">$dir</span> }
        <span class="ps-str">"3"</span> { ListarDirectorio <span class="ps-var">$dir</span>   }
        <span class="ps-str">"4"</span> { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Saliendo..."</span>  }
        default { <span class="ps-cmd">Write-Host</span> <span class="ps-str">"Opción inválida"</span> }
    }
} <span class="kw">while</span> (<span class="ps-var">$op</span> <span class="ps-param">-ne</span> <span class="ps-str">"4"</span>)</div>
              <div class="key-box" style="margin-top:10px;">
                <div class="box-label">🔑 Claves a recordar</div>
                <p><code>New-Item -ItemType "Directory"</code> · <code>Remove-Item -Recurse -Force</code> · <code>Get-ChildItem -Path $dir</code> · <code>Read-Host</code> · <code>switch($op)</code> con strings entre comillas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="sec-divider">

      <!-- ==================== BLOQUE 4: BASH ==================== -->
      <div class="section-heading" style="background:#fff5f5; border-left-color:var(--mcg-red);">
        <div class="sec-num" style="color:var(--mcg-red);">Bloque SH · PRÁCTICA BASH (solo en algunos modelos)</div>
        <h2 style="color:var(--mcg-red-dark);">Menú Bash — aparece en vez del C o combinado</h2>
      </div>

      <!-- SH1: CPU + usuarios + PATH -->
      <div class="exam-real-card">
        <div class="erc-header">
          <span class="erc-year">BASH · PATRÓN 1 — CPU y usuarios</span>
          <span class="erc-label">
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700;">2024-E</span>
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2024-F</span>
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2023-D</span>
          </span>
        </div>
        <div class="erc-body">
          <div class="erc-enunciado"><em>Se ha preguntado así:</em><br><br>
            <strong>Realiza un programa en Bash bajo Linux con menú de 4 opciones hasta pulsar la opción 4 (salir):</strong><br>
            &nbsp;&nbsp;<strong>1.</strong> Obtener el uso del procesador.<br>
            &nbsp;&nbsp;<strong>2.</strong> Obtener el número de usuarios conectados.<br>
            &nbsp;&nbsp;<strong>3.</strong> Obtener el número de usuarios conectados desde la última vez que se preguntó.<br>
            &nbsp;&nbsp;<strong>4.</strong> Salir.
          </div>
          <div class="solucion" style="margin-top:12px;">
            <div class="sol-toggle" onclick="toggleSol(this)"><span>⚡ Código completo comentado</span><span class="sol-arrow">▼</span></div>
            <div class="sol-content">
              <div class="code-block"><span class="bash-cmd">#!/bin/bash</span>
<span class="cm"># Variable para recordar el número de usuarios en la última consulta</span>
<span class="bash-var">usuarios_previos</span>=<span class="num">0</span>

<span class="fn">uso_procesador</span>() {
    <span class="bash-cmd">echo</span> <span class="bash-str">"--- Uso del procesador ---"</span>
    <span class="bash-cmd">top</span> -bn1 | <span class="bash-cmd">grep</span> <span class="bash-str">"Cpu(s)"</span>
    <span class="cm"># Alternativa: uptime  o  mpstat 1 1</span>
}

<span class="fn">usuarios_conectados</span>() {
    <span class="bash-var">num</span>=$(<span class="bash-cmd">who</span> | <span class="bash-cmd">wc</span> -l)
    <span class="bash-cmd">echo</span> <span class="bash-str">"Usuarios conectados ahora: $num"</span>
    <span class="bash-var">usuarios_previos</span>=<span class="bash-var">$num</span>
}

<span class="fn">usuarios_desde_ultima_vez</span>() {
    <span class="bash-var">actual</span>=$(<span class="bash-cmd">who</span> | <span class="bash-cmd">wc</span> -l)
    <span class="bash-var">diff</span>=$(( <span class="bash-var">$actual</span> - <span class="bash-var">$usuarios_previos</span> ))
    <span class="bash-cmd">echo</span> <span class="bash-str">"Usuarios ahora: $actual"</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"Diferencia respecto a última consulta: $diff"</span>
    <span class="bash-var">usuarios_previos</span>=<span class="bash-var">$actual</span>
}

<span class="kw">while</span> <span class="bash-cmd">true</span>; <span class="kw">do</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">""</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"===== MENÚ BASH ====="</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"1. Uso del procesador"</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"2. Número de usuarios conectados"</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"3. Usuarios desde la última vez"</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"4. Salir"</span>
    <span class="bash-cmd">read</span> -p <span class="bash-str">"Opción: "</span> <span class="bash-var">op</span>

    <span class="kw">case</span> <span class="bash-var">$op</span> <span class="kw">in</span>
        1) uso_procesador           ;;
        2) usuarios_conectados      ;;
        3) usuarios_desde_ultima_vez ;;
        4) <span class="bash-cmd">echo</span> <span class="bash-str">"Fin."</span>; <span class="bash-cmd">exit</span> <span class="num">0</span>  ;;
        *) <span class="bash-cmd">echo</span> <span class="bash-str">"Opción inválida"</span>    ;;
    <span class="kw">esac</span>
<span class="kw">done</span></div>
              <div class="key-box" style="margin-top:10px;">
                <div class="box-label">🔑 Claves a recordar</div>
                <p><code>top -bn1 | grep "Cpu(s)"</code> · <code>who | wc -l</code> = número usuarios · <code>$(( $a - $b ))</code> = aritmética bash · <code>case $op in 1) ... ;; *) ... ;; esac</code></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SH2: Bash ficheros (2025B) -->
      <div class="exam-real-card">
        <div class="erc-header">
          <span class="erc-year">BASH · PATRÓN 2 — Operaciones con ficheros</span>
          <span class="erc-label">
            <span style="background:#1A5276; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700;">2025-B</span>
            <span style="background:#C41230; color:white; padding:2px 7px; border-radius:3px; font-size:11px; font-weight:700; margin-left:4px;">2026-A (test)</span>
          </span>
        </div>
        <div class="erc-body">
          <div class="erc-enunciado"><em>Se ha preguntado así:</em><br><br>
            <strong>Escribe un programa en Bash bajo Linux que muestre un menú con 4 opciones:</strong><br>
            &nbsp;&nbsp;<strong>1.</strong> Mostrar el contenido de la variable PWD.<br>
            &nbsp;&nbsp;<strong>2.</strong> Suponiendo que existe un proceso con nombre paint y con id 1234 escribe cómo matarlo en bash.<br>
            &nbsp;&nbsp;<strong>3.</strong> Mostrar el contenido de un fichero (pedir nombre al usuario).<br>
            &nbsp;&nbsp;<strong>4.</strong> Salir.
          </div>
          <div class="solucion" style="margin-top:12px;">
            <div class="sol-toggle" onclick="toggleSol(this)"><span>⚡ Código completo comentado</span><span class="sol-arrow">▼</span></div>
            <div class="sol-content">
              <div class="code-block"><span class="bash-cmd">#!/bin/bash</span>

<span class="fn">mostrar_pwd</span>() {
    <span class="bash-cmd">echo</span> <span class="bash-str">"Directorio actual (PWD): $PWD"</span>
}

<span class="fn">matar_paint</span>() {
    <span class="cm"># Matar por nombre:</span>
    <span class="bash-cmd">kill</span> -9 $(<span class="bash-cmd">pgrep</span> paint)
    <span class="cm"># Matar por PID directamente:</span>
    <span class="bash-cmd">kill</span> -9 <span class="num">1234</span>
    <span class="cm"># Alternativa con killall:</span>
    <span class="bash-cmd">killall</span> -9 paint
}

<span class="fn">ver_fichero</span>() {
    <span class="bash-cmd">read</span> -p <span class="bash-str">"Nombre del fichero: "</span> <span class="bash-var">f</span>
    <span class="kw">if</span> [ -f <span class="bash-str">"$f"</span> ]; <span class="kw">then</span>
        <span class="bash-cmd">cat</span> <span class="bash-str">"$f"</span>
    <span class="kw">else</span>
        <span class="bash-cmd">echo</span> <span class="bash-str">"Error: fichero no encontrado"</span>
    <span class="kw">fi</span>
}

<span class="kw">while</span> <span class="bash-cmd">true</span>; <span class="kw">do</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">""</span>
    <span class="bash-cmd">echo</span> <span class="bash-str">"1. Mostrar PWD  2. Matar paint  3. Ver fichero  4. Salir"</span>
    <span class="bash-cmd">read</span> -p <span class="bash-str">"Opción: "</span> <span class="bash-var">op</span>
    <span class="kw">case</span> <span class="bash-var">$op</span> <span class="kw">in</span>
        1) mostrar_pwd  ;;
        2) matar_paint  ;;
        3) ver_fichero  ;;
        4) <span class="bash-cmd">exit</span> <span class="num">0</span>     ;;
        *) <span class="bash-cmd">echo</span> <span class="bash-str">"Inválida"</span> ;;
    <span class="kw">esac</span>
<span class="kw">done</span></div>
              <div class="key-box" style="margin-top:10px;">
                <div class="box-label">🔑 Claves a recordar</div>
                <p><code>$PWD</code> = variable directorio actual · <code>kill -9 $(pgrep paint)</code> · <code>kill -9 1234</code> por PID · <code>[ -f "$f" ]</code> comprueba si fichero existe · <code>cat "$f"</code> muestra contenido</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="summary-card" style="margin-top:40px; background:linear-gradient(135deg,#7B0D1C 0%,#C41230 100%);">
        <h3>⚡ Resumen: lo mínimo que tienes que saber</h3>
        <ul>
          <li><strong>Teoría:</strong> Funciones del SO · Monolítico (Linux) · Recursos de un proceso Windows · Características de C · Diferencias Win32/Win64 · PowerShell qué es</li>
          <li><strong>C Patrón 1 (más importante):</strong> <code>getpid()</code> + <code>getppid()</code> · <code>opendir()</code> + <code>readdir()</code> + <code>stat()</code> · loop for números</li>
          <li><strong>C Patrón 2:</strong> <code>rename()</code> · <code>fopen/fgets/fclose</code> · loop inverso</li>
          <li><strong>PS Patrón 1:</strong> <code>Get-Process</code> · <code>Stop-Process -Name "paint" -Id 1234 -Force</code> · <code>Get-EventLog -List</code></li>
          <li><strong>PS Patrón 2:</strong> <code>Read-Host</code> · <code>for ($i=1; $i -le 10; $i++)</code> · <code>whoami /user</code></li>
          <li><strong>PS Patrón 3:</strong> <code>New-Item -ItemType Directory</code> · <code>Remove-Item -Recurse</code> · <code>Get-ChildItem</code></li>
          <li><strong>Bash:</strong> <code>who | wc -l</code> · <code>top -bn1 | grep Cpu</code> · <code>kill -9 $(pgrep paint)</code> · <code>$PWD</code> · <code>cat "$f"</code></li>
        </ul>
      </div>

    </div><!-- /content-area -->
    <div class="chapter-nav">
      <button class="ch-nav-btn" onclick="prevChapter()">&#8592; Bash / Shell</button>
      <button class="ch-nav-btn next" onclick="showChapter(6)">Test de Examen &#8594;</button>
    </div>
