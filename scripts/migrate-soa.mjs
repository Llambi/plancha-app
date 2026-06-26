/**
 * Migración SOA: legacy/soa.html
 *   - Capítulos ch0..ch5 → src/content/guia/soa-chN.md (cuerpo = HTML VERBATIM,
 *     que la página renderiza con set:html; sin paso por markdown).
 *   - QUIZ_DATA (ch6) → src/content/test/soa.yaml (single + apariciones).
 *   - Vuelca el <style> de SOA a scripts/out/soa-style.css para portar su CSS.
 *
 * REGLA: contenido VERBATIM. Las preguntas/respuestas del quiz y el HTML de los
 * capítulos se conservan tal cual.
 *
 * Uso: node scripts/migrate-soa.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { parse } from 'node-html-parser';
import { extractDeclaration } from './lib/jsextract.mjs';

const SRC = 'legacy/soa.html';
const html = fs.readFileSync(SRC, 'utf8');
const root = parse(html, { comment: true });

// Metadatos de capítulo (de la barra lateral del original).
const CHAPTERS = [
  { id: 'ch0', num: '0', titulo: 'Estructura del Examen' },
  { id: 'ch1', num: '1', titulo: 'Teoría Variable', badge: '★★★' },
  { id: 'ch2', num: 'C', titulo: 'Programación C / UNIX', badge: '★★★' },
  { id: 'ch3', num: 'PS', titulo: 'PowerShell', badge: '★★★' },
  { id: 'ch4', num: 'SH', titulo: 'Bash / Shell', badge: '★★' },
  { id: 'ch5', num: '⚡', titulo: 'APRÉNDETE ESTO' },
];

function writeMd(out, frontmatter, body) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const fm = yaml.dump(frontmatter, { lineWidth: -1, noRefs: true, quotingType: '"' });
  fs.writeFileSync(out, `---\n${fm}---\n\n${body}\n`, 'utf8');
}
function assert(c, m) { if (!c) throw new Error('VERIFICACIÓN FALLIDA: ' + m); }

/* ---- 1) Capítulos de guía ---- */
CHAPTERS.forEach((ch, i) => {
  const el = root.querySelector(`#${ch.id}`);
  assert(el, `no se encontró #${ch.id}`);
  const body = el.innerHTML.trim();
  const out = `src/content/guia/soa-${ch.id}.md`;
  writeMd(out, {
    asignatura: 'soa',
    chapter: ch.id,
    num: ch.num,
    titulo: ch.titulo,
    ...(ch.badge ? { badge: ch.badge } : {}),
    orden: i,
  }, body);
  // verificación: el HTML del cuerpo coincide verbatim con el origen
  const written = fs.readFileSync(out, 'utf8');
  assert(written.includes(body), `cuerpo ${ch.id} no verbatim`);
});
console.log(`✓ SOA guía → src/content/guia/soa-ch0..ch5.md (${CHAPTERS.length} capítulos, verbatim OK)`);

/* ---- 2) Quiz ---- */
const QUIZ = extractDeclaration(html, 'QUIZ_DATA');
const entries = QUIZ.map((item, i) => {
  const correctIdx = item.opts.findIndex((o) => o.correct);
  assert(item.opts.filter((o) => o.correct).length === 1, `quiz q${i + 1} no tiene exactamente 1 correcta`);
  const e = {
    id: `q${i + 1}`,
    asignatura: 'soa',
    type: 'single',
    question: item.q,
    options: item.opts.map((o) => o.text),
    correct: [correctIdx],
  };
  if (item.appearances != null) e.apariciones = item.appearances;
  return e;
});
const outQuiz = 'src/content/test/soa.yaml';
fs.writeFileSync(outQuiz,
  '# Banco de preguntas SOA (Test de Examen) — generado por scripts/migrate-soa.mjs\n' +
  '# REGLA: contenido VERBATIM desde legacy/soa.html (QUIZ_DATA). No editar a mano.\n' +
  yaml.dump(entries, { lineWidth: -1, noRefs: true, quotingType: '"' }), 'utf8');
// verificación
const back = yaml.load(fs.readFileSync(outQuiz, 'utf8'));
assert(back.length === QUIZ.length, `recuento quiz: ${back.length} vs ${QUIZ.length}`);
QUIZ.forEach((item, i) => {
  const e = back[i];
  assert(e.question === item.q, `q quiz ${i + 1}`);
  item.opts.forEach((o, k) => assert(e.options[k] === o.text, `opt ${k} quiz ${i + 1}`));
  assert(e.options[e.correct[0]] === item.opts.find((o) => o.correct).text, `correcta quiz ${i + 1}`);
});
console.log(`✓ SOA quiz → ${outQuiz} (${entries.length} preguntas, verbatim OK)`);

/* ---- 3) Volcar el <style> para portar el CSS ---- */
const styleEl = root.querySelector('style');
fs.mkdirSync('scripts/out', { recursive: true });
fs.writeFileSync('scripts/out/soa-style.css', styleEl.innerHTML, 'utf8');
console.log('✓ CSS de SOA volcado en scripts/out/soa-style.css (para portar a SoaGuide)');
