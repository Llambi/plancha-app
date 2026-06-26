/**
 * Genera src/components/MongoPractica.astro a partir de legacy/mongodb.html.
 * El validador de MongoDB es una app interactiva: sus `exercises` mezclan datos
 * y FUNCIONES de validación (rules[].ok). Por eso se porta el script de la app
 * VERBATIM (is:inline) y el CSS se reescala bajo `.mongo-practica`.
 *
 * REGLA: el contenido (enunciados, opciones, justificaciones) no se modifica;
 * el script de la app se copia carácter a carácter.
 *
 * Uso: node scripts/migrate-mongo.mjs
 */
import fs from 'node:fs';

const html = fs.readFileSync('legacy/mongodb.html', 'utf8');

/* ---- 1) CSS: extraer y reescalar bajo .mongo-practica ---- */
const css = html.match(/<style>([\s\S]*?)<\/style>/)[1];

const DROP = ['site-topbar', 'site-home', 'site-theme-toggle', 'site-doc-title', 'site-ic-', 'body>header'];

function scopeSelector(sel) {
  sel = sel.trim();
  if (!sel) return null;
  if (DROP.some((d) => sel.includes(d))) return null;
  // bloques de tema
  if (sel === ':root') return '.mongo-practica';
  if (sel === ':root[data-theme="dark"]') return ':root[data-theme="dark"] .mongo-practica';
  if (sel.startsWith(':root[data-theme="dark"] '))
    return ':root[data-theme="dark"] .mongo-practica ' + sel.slice(':root[data-theme="dark"] '.length);
  if (sel.startsWith(':root[data-theme="light"] '))
    return ':root[data-theme="light"] .mongo-practica ' + sel.slice(':root[data-theme="light"] '.length);
  // mapeos estructurales
  const map = {
    'html': null,
    'body': '.mongo-practica',
    '*': '.mongo-practica *',
    'a': '.mongo-practica a',
    'code': '.mongo-practica code',
    'header': '.mongo-practica .mongo-header',
    'main': '.mongo-practica #app',
    'footer': '.mongo-practica .mongo-footer',
    'textarea': '.mongo-practica textarea',
  };
  if (sel in map) return map[sel];
  return '.mongo-practica ' + sel;
}

function scopeSelectorList(list) {
  const parts = list.split(',').map(scopeSelector).filter(Boolean);
  return parts.length ? parts.join(', ') : null;
}

// Parser simple de reglas top-level (maneja @media con un nivel de anidación).
function transformCss(input) {
  let out = '';
  let i = 0;
  const n = input.length;
  while (i < n) {
    // saltar espacios/comentarios
    if (/\s/.test(input[i])) { i++; continue; }
    if (input[i] === '/' && input[i + 1] === '*') {
      const e = input.indexOf('*/', i + 2);
      i = e === -1 ? n : e + 2;
      continue;
    }
    // leer hasta { (cabecera de regla o @media)
    const braceStart = input.indexOf('{', i);
    if (braceStart === -1) break;
    const header = input.slice(i, braceStart).trim();
    // encontrar el } equilibrado
    let depth = 0, j = braceStart, end = -1;
    for (; j < n; j++) {
      if (input[j] === '{') depth++;
      else if (input[j] === '}') { depth--; if (depth === 0) { end = j; break; } }
    }
    if (end === -1) break;
    const bodyInner = input.slice(braceStart + 1, end);
    if (header.startsWith('@media')) {
      const inner = transformCss(bodyInner);
      if (inner.trim()) out += `${header}{\n${inner}}\n`;
    } else {
      const sel = scopeSelectorList(header);
      if (sel) out += `${sel}{${bodyInner.trim()}}\n`;
    }
    i = end + 1;
  }
  return out;
}

const scopedCss = transformCss(css);

/* ---- 2) Script de la app (el bloque que contiene const exercises) ---- */
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const appScript = scripts.find((s) => s.includes('const exercises'));
if (!appScript) throw new Error('No se encontró el script de la app MongoDB');

/* ---- 3) Footer (texto verbatim) ---- */
const footer = html.match(/<footer>([\s\S]*?)<\/footer>/)[1].trim();

/* ---- 4) Generar el componente ---- */
const component = `---
/**
 * MongoPractica — validador de consultas MongoDB portado de legacy/mongodb.html.
 * GENERADO por scripts/migrate-mongo.mjs. No editar a mano: regenerar.
 * El script de la app va is:inline VERBATIM (contiene la lógica de validación).
 * El CSS original va reescalado bajo .mongo-practica.
 */
---

<div class="mongo-practica">
  <div class="mongo-header">
    <div class="bar">
      <div class="mark">
        <div class="leaf">{ }</div>
        <div>
          <b>Práctica de examen · MongoDB</b>
          <span>Bases de Datos Avanzadas · estilo examen final</span>
        </div>
      </div>
      <nav class="picker" id="picker"></nav>
    </div>
  </div>
  <div id="app" class="mongo-main"></div>
  <footer class="mongo-footer">
    ${footer}
  </footer>
</div>

<script is:inline>
${appScript.trim()}
</script>

<style is:global>
${scopedCss.trim()}
</style>
`;

fs.mkdirSync('src/components', { recursive: true });
fs.writeFileSync('src/components/MongoPractica.astro', component, 'utf8');
console.log('✓ Generado src/components/MongoPractica.astro');
console.log(`  · CSS reescalado bajo .mongo-practica`);
console.log(`  · script de la app verbatim (${appScript.length} chars, incl. ${(appScript.match(/exercises/g) || []).length} refs a exercises)`);
