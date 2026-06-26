---
asignatura: soa
chapter: ch1
num: "1"
titulo: Teoría Variable
badge: ★★★
orden: 1
---

<div class="chapter-banner">
      <div class="ch-label">Capítulo 1 · Teoría</div>
      <h1>Teoría Variable del Examen</h1>
      <p class="ch-desc">Preguntas teóricas que aparecen como primera pregunta o en el test. Memoriza las plantillas de respuesta.</p>
    </div>
    <div class="exam-alert">
      <span class="stars">★★★</span> Apareció en 2026 Mod A y Mod B como pregunta directa de desarrollo
    </div>
    <div class="content-area">

      <div class="section-heading"><div class="sec-num">1.1</div><h2>Características del lenguaje C</h2></div>
      <div class="exam-box">
        <div class="box-label">Enunciado exacto 2026 Mod A</div>
        <p>"Indica las características del lenguaje C que lo hacen tan utilizado en el mundo profesional"</p>
      </div>
      <div class="def-box">
        <div class="box-label">Definición</div>
        <div class="box-term">El lenguaje C</div>
        <p>Lenguaje de programación de propósito general, compilado, de nivel medio: permite programación de alto nivel con acceso directo al hardware. Base de sistemas operativos (Linux, macOS, Windows) y lenguajes modernos (Python, Ruby, PHP).</p>
      </div>
      <p class="body-text">Las <strong>6 características clave</strong> para el examen:</p>
      <div class="mcg-table-wrap"><table class="mcg-table">
        <thead><tr><th>Característica</th><th>Explicación</th></tr></thead>
        <tbody>
          <tr><td><strong>Portabilidad</strong></td><td>El mismo código compila en distintos SO con ajustes mínimos (estándar POSIX/ANSI)</td></tr>
          <tr><td><strong>Eficiencia</strong></td><td>Compilado a código máquina nativo; no hay intérprete ni máquina virtual</td></tr>
          <tr><td><strong>Control de bajo nivel</strong></td><td>Punteros, acceso directo a memoria, gestión manual de recursos</td></tr>
          <tr><td><strong>Ecosistema maduro</strong></td><td>Librerías estándar amplísimas: POSIX, GNU, BSD, ANSI C</td></tr>
          <tr><td><strong>Determinismo</strong></td><td>El programador controla cuándo se reserva y libera memoria (sin GC)</td></tr>
          <tr><td><strong>Amplio uso</strong></td><td>Linux kernel, macOS core, firmware embebido, bases de Python/Ruby</td></tr>
        </tbody>
      </table></div>
      <div class="template-label">PLANTILLA DE RESPUESTA</div>
      <div class="template-box">El lenguaje C es uno de los más utilizados en el mundo profesional gracias a:
1. Portabilidad: un mismo código fuente puede compilarse en múltiples sistemas
   operativos con cambios mínimos (estándares ANSI C y POSIX).
2. Eficiencia: se compila directamente a código máquina, sin intérprete ni VM.
3. Control de bajo nivel: los punteros permiten acceso directo a memoria y hardware.
4. Ecosistema maduro: cuenta con librerías estándar muy completas (POSIX, GNU).
5. Determinismo: el programador gestiona explícitamente la memoria (malloc/free).
6. Base de la industria: el kernel de Linux, macOS y el núcleo de Python están
   escritos en C, lo que garantiza su vigencia a largo plazo.</div>

      <hr class="sec-divider">

      <div class="section-heading"><div class="sec-num">1.2</div><h2>Estructura de un Sistema Operativo</h2></div>
      <div class="exam-box">
        <div class="box-label">Enunciado exacto 2026 Mod B</div>
        <p>"Describe la estructura general de un sistema operativo"</p>
      </div>
      <div class="mcg-table-wrap"><table class="mcg-table">
        <thead><tr><th>Componente</th><th>Función</th></tr></thead>
        <tbody>
          <tr><td><strong>Núcleo (Kernel)</strong></td><td>Interfaz entre hardware y software; modo kernel con acceso total al hardware</td></tr>
          <tr><td><strong>Gestor de procesos</strong></td><td>Creación, planificación, sincronización y terminación de procesos</td></tr>
          <tr><td><strong>Gestor de memoria</strong></td><td>Asignación/liberación, memoria virtual, paginación, segmentación</td></tr>
          <tr><td><strong>Gestor de E/S</strong></td><td>Drivers, buffers, gestión de dispositivos (disco, red, teclado…)</td></tr>
          <tr><td><strong>Sistema de ficheros</strong></td><td>Organización del almacenamiento: directorios, permisos, acceso</td></tr>
          <tr><td><strong>Shell / Interfaz</strong></td><td>CLI (bash, zsh, cmd) o GUI — intermediario entre usuario y kernel</td></tr>
        </tbody>
      </table></div>
      <div class="key-box">
        <div class="box-label">Diagrama de capas</div>
        <p>Hardware → Kernel → Llamadas al sistema (syscalls) → Shell/Aplicaciones → Usuario</p>
      </div>

      <hr class="sec-divider">

      <div class="section-heading"><div class="sec-num">1.3</div><h2>Sistemas de ficheros de Windows</h2></div>
      <div class="exam-box">
        <div class="box-label">Test frecuente</div>
        <p>"¿Cuáles son los sistemas de ficheros de Windows?" — respuesta exacta: <strong>NTFS · FAT32 · exFAT · ReFS</strong></p>
      </div>
      <div class="mcg-table-wrap"><table class="mcg-table">
        <thead><tr><th>FS</th><th>Nombre completo</th><th>Características clave</th></tr></thead>
        <tbody>
          <tr><td><strong>NTFS</strong></td><td>New Technology File System</td><td>El principal de Windows. Permisos, cifrado (EFS), journaling, compresión. Límite teórico 16 EB.</td></tr>
          <tr><td><strong>FAT32</strong></td><td>File Allocation Table 32</td><td>Compatible con todos los SO. Límite 4 GB por fichero, 2 TB por volumen. Para USB legacy.</td></tr>
          <tr><td><strong>exFAT</strong></td><td>Extended FAT</td><td>Para SD y USB modernos. Sin límite de 4 GB, sin journaling. Compatible con Windows/macOS/Linux.</td></tr>
          <tr><td><strong>ReFS</strong></td><td>Resilient File System</td><td>Para servidores y Storage Spaces. Tolerancia a fallos, sin desfragmentación, integridad de datos.</td></tr>
        </tbody>
      </table></div>

      <hr class="sec-divider">

      <div class="section-heading"><div class="sec-num">1.4</div><h2>Proceso vs Hilo (Thread)</h2></div>
      <div class="mcg-table-wrap"><table class="mcg-table">
        <thead><tr><th>Aspecto</th><th>Proceso</th><th>Hilo (Thread)</th></tr></thead>
        <tbody>
          <tr><td>Definición</td><td>Unidad de recursos del SO</td><td>Unidad de ejecución dentro de un proceso</td></tr>
          <tr><td>Memoria</td><td>Espacio de memoria propio e independiente</td><td>Comparte memoria del proceso padre</td></tr>
          <tr><td>Overhead</td><td>Alto (crear proceso es costoso)</td><td>Bajo (crear hilo es mucho más rápido)</td></tr>
          <tr><td>Comunicación</td><td>IPC: pipes, sockets, memoria compartida</td><td>Directa (memoria compartida del proceso)</td></tr>
          <tr><td>Fallo</td><td>Un proceso no afecta a otros</td><td>Un hilo con error puede matar el proceso</td></tr>
          <tr><td>Creación en C</td><td><code>fork()</code></td><td><code>pthread_create()</code></td></tr>
        </tbody>
      </table></div>

    </div>
    <div class="chapter-nav">
      <button class="ch-nav-btn" onclick="prevChapter()">&#8592; Anterior</button>
      <button class="ch-nav-btn next" onclick="nextChapter()">Siguiente: C/UNIX &#8594;</button>
    </div>
