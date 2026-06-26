/**
 * Migración mecánica de SI y CL a las colecciones de contenido.
 * REGLA: transcripción VERBATIM. Cada función verifica que el texto del
 * origen sobrevive carácter a carácter (o, para HTML, modulo espacios entre
 * etiquetas) en el destino.
 *
 * Uso: node scripts/migrate.mjs [si-test|si-dev|cl-dev|cl-esq|si-esq|all]
 */
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { parse } from 'node-html-parser';
import { extractDeclaration } from './lib/jsextract.mjs';

const read = (p) => fs.readFileSync(p, 'utf8');
const norm = (s) => s.replace(/\s+/g, ' ').trim(); // normaliza espacios (solo verificación)

/** Lee un .md y devuelve {fm, body}. El frontmatter se re-parsea para verificar
 *  los campos VERBATIM (sin verse afectado por el escapado YAML). */
function readMd(p) {
  const t = read(p);
  const m = t.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error('frontmatter no reconocido en ' + p);
  return { fm: yaml.load(m[1]), body: m[2] };
}

function writeYaml(out, entries, header) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const body = yaml.dump(entries, { lineWidth: -1, noRefs: true, quotingType: '"' });
  fs.writeFileSync(out, header + body, 'utf8');
}

function writeMd(out, frontmatter, body) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const fm = yaml.dump(frontmatter, { lineWidth: -1, noRefs: true, quotingType: '"' });
  fs.writeFileSync(out, `---\n${fm}---\n\n${body}\n`, 'utf8');
}

function assert(cond, msg) {
  if (!cond) throw new Error('VERIFICACIÓN FALLIDA: ' + msg);
}

/* ----------------------------- SI · TEST ----------------------------- */
function migrateSiTest() {
  const src = read('legacy/si.html');
  const TEMAS = extractDeclaration(src, 'TEMAS');
  const TEST = extractDeclaration(src, 'TEST');
  const entries = TEST.map((q, idx) => {
    assert(q.correcta >= 0 && q.correcta < q.opts.length, `correcta fuera de rango en TEST[${idx}]`);
    const e = {
      id: `q${idx + 1}`,
      asignatura: 'si',
      type: 'single',
      question: q.q,
      options: q.opts,
      correct: [q.correcta],
    };
    if (TEMAS[q.tema]) e.tema = TEMAS[q.tema].n; // "T5"
    if (q.oficial) e.oficial = true;
    if (q.just) e.explicacion = q.just;
    return e;
  });
  const out = 'src/content/test/si.yaml';
  writeYaml(out, entries,
    '# Banco de preguntas SI — generado por scripts/migrate.mjs\n' +
    '# REGLA: contenido VERBATIM desde legacy/si.html (const TEST). No editar a mano.\n');
  // verificación
  const back = yaml.load(read(out));
  assert(back.length === TEST.length, `recuento test SI: ${back.length} vs ${TEST.length}`);
  TEST.forEach((q, i) => {
    const e = back[i];
    assert(e.question === q.q, `question difiere SI q${i + 1}`);
    assert(e.options.length === q.opts.length, `nº opciones SI q${i + 1}`);
    q.opts.forEach((o, k) => assert(e.options[k] === o, `opción ${k} SI q${i + 1}`));
    assert(e.options[e.correct[0]] === q.opts[q.correcta], `correcta SI q${i + 1}`);
    assert((e.explicacion ?? '') === (q.just ?? ''), `just SI q${i + 1}`);
  });
  console.log(`✓ SI test → ${out} (${entries.length} preguntas, verbatim OK)`);
}

/* --------------------------- SI · DESARROLLO -------------------------- */
function listHtml(items) {
  return '<ul>\n' + items.map((it) => `<li>${it}</li>`).join('\n') + '\n</ul>';
}

function migrateSiDev() {
  const src = read('legacy/si.html');
  const TEMAS = extractDeclaration(src, 'TEMAS');
  const DEV = extractDeclaration(src, 'DEV');
  const PRAC = extractDeclaration(src, 'PRAC');
  let count = 0;
  // limpia desarrollo si previo de SI
  DEV.forEach((d, i) => {
    const id = `si-dev-t${d.tema}`;
    writeMd(`src/content/desarrollo/${id}.md`, {
      asignatura: 'si',
      id,
      tema: TEMAS[d.tema]?.n,
      kind: 'desarrollo',
      enunciado: d.q,
      orden: 10 + d.tema,
    }, listHtml(d.model));
    // verificación verbatim (frontmatter re-parseado + cuerpo crudo)
    const { fm, body } = readMd(`src/content/desarrollo/${id}.md`);
    assert(fm.enunciado === d.q, `enunciado DEV t${d.tema}`);
    d.model.forEach((m) => assert(norm(body).includes(norm(m)), `model DEV t${d.tema}`));
    count++;
  });
  PRAC.forEach((p) => {
    const id = `si-prac-t${p.tema}`;
    writeMd(`src/content/desarrollo/${id}.md`, {
      asignatura: 'si',
      id,
      tema: TEMAS[p.tema]?.n,
      titulo: p.titulo,
      kind: 'practico',
      enunciado: p.enun,
      orden: 100 + p.tema,
    }, listHtml(p.sol));
    const { fm, body } = readMd(`src/content/desarrollo/${id}.md`);
    assert(fm.enunciado === p.enun, `enun PRAC t${p.tema}`);
    assert(fm.titulo === p.titulo, `titulo PRAC t${p.tema}`);
    p.sol.forEach((s) => assert(norm(body).includes(norm(s)), `sol PRAC t${p.tema}`));
    count++;
  });
  console.log(`✓ SI desarrollo → src/content/desarrollo/si-*.md (${count} fichas, verbatim OK)`);
}

/* ----------------------------- CL · DEV ------------------------------ */
function migrateClDev() {
  const html = read('legacy/cl.html');
  const root = parse(html, { comment: false });
  const arts = root.querySelectorAll('article.q');
  assert(arts.length > 0, 'no se encontraron article.q en cl.html');
  let n = 0;
  arts.forEach((art, i) => {
    const qEl = art.querySelector('.q-text');
    const modelEl = art.querySelector('.model');
    assert(qEl && modelEl, `CL Q${i + 1} sin q-text o model`);
    const enunciado = qEl.innerHTML.trim();
    const h4 = modelEl.querySelector('h4');
    if (h4) h4.remove(); // etiqueta de UI, no contenido de la respuesta
    const modelHtml = modelEl.innerHTML.trim();
    const id = `cl-q${i + 1}`;
    writeMd(`src/content/desarrollo/${id}.md`, {
      asignatura: 'cl',
      id,
      kind: 'desarrollo',
      enunciado,
      orden: i + 1,
    }, modelHtml);
    const { fm, body } = readMd(`src/content/desarrollo/${id}.md`);
    assert(fm.enunciado === enunciado, `enunciado CL Q${i + 1}`);
    assert(norm(body).includes(norm(modelHtml)), `model CL Q${i + 1}`);
    n++;
  });
  console.log(`✓ CL desarrollo → src/content/desarrollo/cl-*.md (${n} fichas, verbatim OK)`);
}

/* ----------------------------- ESQUEMAS ------------------------------ */
// CL-esquemas: nodos:[{h, c:[{l, i:[...]}]}]
function clTreeToMd(nodos, fragments) {
  let md = '';
  for (const nodo of nodos) {
    md += `- ${nodo.h}\n`;
    fragments.push(nodo.h);
    for (const sub of nodo.c || []) {
      md += `  - ${sub.l}\n`;
      fragments.push(sub.l);
      for (const item of sub.i || []) {
        md += `    - ${item}\n`;
        fragments.push(item);
      }
    }
  }
  return md;
}

function migrateClEsq() {
  const src = read('legacy/cl-esquemas.html');
  const TEMAS = extractDeclaration(src, 'TEMAS');
  TEMAS.forEach((t, idx) => {
    const fragments = [];
    const body = clTreeToMd(t.nodos, fragments);
    const id = `cl-t${t.num}`;
    writeMd(`src/content/esquemas/${id}.md`, {
      asignatura: 'cl',
      tema: `T${t.num}`,
      num: String(t.num),
      bloque: t.bloque,
      titulo: t.titulo,
      clave: t.clave,
      orden: idx + 1,
    }, body);
    const { fm, body: b } = readMd(`src/content/esquemas/${id}.md`);
    assert(fm.titulo === t.titulo, `titulo cl-esq T${t.num}`);
    assert(fm.clave === t.clave, `clave cl-esq T${t.num}`);
    fragments.forEach((f) => assert(norm(b).includes(norm(f)), `nodo cl-esq T${t.num}: ${f.slice(0, 40)}`));
  });
  console.log(`✓ CL esquemas → src/content/esquemas/cl-*.md (${TEMAS.length} temas, verbatim OK)`);
}

// SI-esquemas: arbol:[{l, c?:[{l, c?}]}] (recursivo)
function siTreeToMd(nodes, depth, fragments) {
  let md = '';
  const pad = '  '.repeat(depth);
  for (const node of nodes) {
    md += `${pad}- ${node.l}\n`;
    fragments.push(node.l);
    if (node.c) md += siTreeToMd(node.c, depth + 1, fragments);
  }
  return md;
}

function migrateSiEsq() {
  const src = read('legacy/si-esquemas.html');
  const DATA = extractDeclaration(src, 'DATA');
  DATA.forEach((t, idx) => {
    const fragments = [];
    const body = siTreeToMd(t.arbol, 0, fragments);
    const num = String(t.n).replace(/\D/g, '');
    const id = `si-t${num}`;
    writeMd(`src/content/esquemas/${id}.md`, {
      asignatura: 'si',
      tema: t.n,
      num,
      bloque: t.bloque,
      titulo: t.t,
      clave: t.idea,
      orden: idx + 1,
    }, body);
    const { fm, body: b } = readMd(`src/content/esquemas/${id}.md`);
    assert(fm.titulo === t.t, `titulo si-esq ${t.n}`);
    assert(fm.clave === t.idea, `clave si-esq ${t.n}`);
    fragments.forEach((f) => assert(norm(b).includes(norm(f)), `nodo si-esq ${t.n}: ${f.slice(0, 40)}`));
  });
  console.log(`✓ SI esquemas → src/content/esquemas/si-*.md (${DATA.length} temas, verbatim OK)`);
}

/* ------------------------------- main -------------------------------- */
const target = process.argv[2] || 'all';
const tasks = {
  'si-test': migrateSiTest,
  'si-dev': migrateSiDev,
  'cl-dev': migrateClDev,
  'cl-esq': migrateClEsq,
  'si-esq': migrateSiEsq,
};
if (target === 'all') {
  for (const fn of Object.values(tasks)) fn();
} else if (tasks[target]) {
  tasks[target]();
} else {
  console.error(`Objetivo desconocido: ${target}. Usa: ${Object.keys(tasks).join(', ')}, all`);
  process.exit(1);
}
