---
asignatura: soa
chapter: ch0
num: "0"
titulo: Estructura del Examen
orden: 0
---

<div class="chapter-banner">
      <div class="ch-label">Introducción</div>
      <h1>Estructura del Examen SOA</h1>
      <p class="ch-desc">Todo lo que necesitas saber antes de empezar. Qué cae, cuántas veces y cuánto vale cada parte.</p>
      <div class="objectives">
        <strong>Al terminar este capítulo sabrás:</strong>
        Las tres partes del examen · Qué aparece siempre · Qué es opcional · Por dónde empezar
      </div>
    </div>
    <div class="content-area">
      <div class="section-heading"><div class="sec-num">Sección 1</div><h2>Las tres partes del desarrollo</h2></div>
      <div class="mcg-table-wrap"><table class="mcg-table">
        <thead><tr><th>Parte</th><th>Contenido</th><th>Frecuencia</th><th>Puntos aprox.</th></tr></thead>
        <tbody>
          <tr><td><strong>Teoría variable</strong></td><td>Características del lenguaje C · Estructura de un SO · Sistemas de ficheros Windows · Proceso vs Hilo</td><td class="red-cell">★★★ 2026</td><td>~1 pt</td></tr>
          <tr><td><strong>Problema C / UNIX</strong></td><td>Programa en C con menú de 4 opciones usando llamadas al sistema UNIX</td><td class="red-cell">★★★ 100%</td><td>~2 pts</td></tr>
          <tr><td><strong>Problema PowerShell</strong></td><td>Script PS con gestión de procesos, eventos, directorios</td><td class="red-cell">★★★ 100%</td><td>~2 pts</td></tr>
          <tr><td><strong>Bash (opcional)</strong></td><td>Menú Bash con operaciones de ficheros — solo en algunos modelos</td><td>★★ Algunos</td><td>~1 pt</td></tr>
        </tbody>
      </table></div>

      <div class="exam-box">
        <div class="box-label">Estrategia de examen</div>
        <p><strong>Domina el menú C y el menú PowerShell</strong> — aparecen en el 100% de los modelos desde 2022. Si tienes tiempo limitado: aprende esos dos primero. La teoría vale ~1 punto extra.</p>
      </div>

      <div class="section-heading"><div class="sec-num">Sección 2</div><h2>Opciones más frecuentes del menú C</h2></div>
      <div class="mcg-table-wrap"><table class="mcg-table">
        <thead><tr><th>Opción del menú</th><th>Llamadas al sistema</th><th>Años</th></tr></thead>
        <tbody>
          <tr><td>Mostrar PID y PID del padre</td><td><code>getpid()</code>, <code>getppid()</code></td><td class="red-cell">2022A · 2024A · 2026A/B</td></tr>
          <tr><td>Atributos de ficheros del directorio actual</td><td><code>stat()</code>, <code>opendir()</code>, <code>readdir()</code></td><td class="red-cell">2022A · 2024A</td></tr>
          <tr><td>Mostrar números del N al M</td><td>Bucle <code>for</code></td><td class="red-cell">2022A · 2024A</td></tr>
          <tr><td>Salir</td><td><code>exit(0)</code></td><td>TODOS</td></tr>
          <tr><td>Variable de entorno PATH</td><td><code>getenv("PATH")</code></td><td>2023D</td></tr>
          <tr><td>Crear proceso hijo</td><td><code>fork()</code>, <code>wait()</code></td><td>Varios</td></tr>
        </tbody>
      </table></div>

      <div class="section-heading"><div class="sec-num">Sección 3</div><h2>Tareas más frecuentes en PowerShell</h2></div>
      <div class="mcg-table-wrap"><table class="mcg-table">
        <thead><tr><th>Tarea</th><th>Cmdlet</th><th>Años</th></tr></thead>
        <tbody>
          <tr><td>Matar proceso paint (ID 1234)</td><td><code>Stop-Process -Name "paint" -Id 1234</code></td><td class="red-cell">2025C · 2026A</td></tr>
          <tr><td>Mostrar procesos activos</td><td><code>Get-Process</code></td><td class="red-cell">2024C · 2025C</td></tr>
          <tr><td>Guardar fecha en fichero</td><td><code>Get-Date | Out-File 'c:\actual.txt'</code></td><td class="red-cell">2024C</td></tr>
          <tr><td>Registros de eventos del sistema</td><td><code>Get-EventLog -LogName System</code></td><td class="red-cell">2024C · 2025C · 2026A</td></tr>
          <tr><td>Renombrar carpeta</td><td><code>Rename-Item -Path … -NewName …</code></td><td>2024F · 2025C</td></tr>
          <tr><td>Menú con directorio</td><td><code>Get-ChildItem</code>, <code>New-Item</code>, <code>Remove-Item</code></td><td>2023B · 2024F · 2025B</td></tr>
        </tbody>
      </table></div>

      <div class="key-box">
        <div class="box-label">Plan de estudio</div>
        <p><strong>Capítulo C:</strong> 15 pasos desde printf hasta fork/wait. Cada uno con ejercicio.<br>
        <strong>Capítulo PowerShell:</strong> 17 pasos desde Write-Host hasta Get-EventLog.<br>
        <strong>Capítulo Bash:</strong> 15 pasos para los modelos donde aparece.</p>
      </div>
    </div>
    <div class="chapter-nav">
      <button class="ch-nav-btn" onclick="prevChapter()">&#8592; Anterior</button>
      <button class="ch-nav-btn next" onclick="nextChapter()">Siguiente: Teoría &#8594;</button>
    </div>
