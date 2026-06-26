/**
 * Migración mecánica DAR: legacy/dar.html (#qdata JSON) -> src/content/test/dar.yaml
 *
 * REGLA: las preguntas y respuestas NO se modifican. Esto es una transcripción
 * verbatim. El script extrae y, a continuación, VERIFICA por diff que cada
 * cadena (question, options, explicacion, tema) sobrevive carácter a carácter
 * tras escribir y volver a parsear el YAML.
 *
 * Uso: node scripts/migrate-dar.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const SRC = 'legacy/dar.html';
const OUT = 'src/content/test/dar.yaml';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function extract() {
  const html = fs.readFileSync(SRC, 'utf8');
  const m = html.match(
    /<script type="application\/json" id="qdata">([\s\S]*?)<\/script>/,
  );
  if (!m) throw new Error('No se encontró el bloque #qdata en ' + SRC);
  return JSON.parse(m[1]);
}

function toEntry(q) {
  if (q.type !== 'single_choice') {
    throw new Error(`Tipo no soportado en DAR: ${q.type} (${q.id})`);
  }
  const correctIdx = q.options.indexOf(q.correct_answer);
  if (correctIdx < 0) {
    throw new Error(`correct_answer no está en options: ${q.id}`);
  }
  // Cross-check: correct_letter del origen debe coincidir con el índice.
  if (q.meta?.correct_letter && LETTERS[correctIdx] !== q.meta.correct_letter) {
    throw new Error(
      `Incoherencia letra/índice en ${q.id}: letra=${q.meta.correct_letter} idx=${correctIdx}`,
    );
  }
  const entry = {
    id: q.id,
    asignatura: 'dar',
    type: 'single',
    question: q.question,
    options: q.options, // ORDEN ORIGINAL, verbatim
    correct: [correctIdx],
  };
  if (q.meta?.tema) entry.tema = q.meta.tema;
  if (q.meta?.explicacion) entry.explicacion = q.meta.explicacion;
  return entry;
}

function verify(source, outFile) {
  // Re-parsear el YAML escrito y comparar verbatim con el origen.
  const parsed = yaml.load(fs.readFileSync(outFile, 'utf8'));
  if (!Array.isArray(parsed)) throw new Error('El YAML de salida no es un array');
  if (parsed.length !== source.questions.length) {
    throw new Error(
      `Recuento: origen=${source.questions.length} salida=${parsed.length}`,
    );
  }
  const byId = new Map(parsed.map((e) => [e.id, e]));
  let checks = 0;
  for (const q of source.questions) {
    const e = byId.get(q.id);
    if (!e) throw new Error(`Falta la pregunta ${q.id} en la salida`);
    if (e.question !== q.question)
      throw new Error(`question difiere en ${q.id}`);
    if (e.options.length !== q.options.length)
      throw new Error(`nº opciones difiere en ${q.id}`);
    q.options.forEach((opt, i) => {
      if (e.options[i] !== opt)
        throw new Error(`opción ${i} difiere en ${q.id}`);
      checks++;
    });
    // la opción marcada como correcta apunta al mismo TEXTO que el origen
    if (e.options[e.correct[0]] !== q.correct_answer)
      throw new Error(`correct_answer difiere en ${q.id}`);
    if ((e.explicacion ?? '') !== (q.meta?.explicacion ?? ''))
      throw new Error(`explicacion difiere en ${q.id}`);
    if ((e.tema ?? '') !== (q.meta?.tema ?? ''))
      throw new Error(`tema difiere en ${q.id}`);
    checks += 4;
  }
  return checks;
}

// ---- main ----
const source = extract();
const entries = source.questions.map(toEntry);
const header =
  '# Banco de preguntas DAR — generado por scripts/migrate-dar.mjs\n' +
  '# REGLA: contenido transcrito VERBATIM desde legacy/dar.html. No editar a mano.\n' +
  `# ${entries.length} preguntas · tipo single · nota: el barajado (opciones/preguntas)\n` +
  '# es responsabilidad del componente de render, no de los datos.\n';
const body = yaml.dump(entries, { lineWidth: -1, noRefs: true, quotingType: '"' });
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, header + body, 'utf8');

const checks = verify(source, OUT);
console.log(`✓ Escrito ${OUT}`);
console.log(`✓ ${entries.length} preguntas migradas`);
console.log(`✓ Verificación verbatim OK (${checks} comprobaciones de cadena)`);
