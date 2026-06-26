/**
 * Extrae un literal de declaración JS (`const NAME = [...]` o `{...}`) de un
 * fichero fuente y lo evalúa a un valor JS real. Pensado para extraer los
 * bancos de datos (arrays/objetos de datos puros) de los HTML originales sin
 * transcribir a mano. Los ficheros son del propio repo (entrada de confianza).
 *
 * El escáner respeta cadenas (', ", `) y comentarios (// y /* *​/) para
 * localizar el cierre equilibrado del literal.
 */
export function extractDeclaration(src, name) {
  const decl = new RegExp(`const\\s+${name}\\s*=\\s*`);
  const m = decl.exec(src);
  if (!m) throw new Error(`No se encontró la declaración: const ${name}`);
  let i = m.index + m[0].length;
  const open = src[i];
  if (open !== '[' && open !== '{') {
    throw new Error(`${name} no empieza por [ o { (encontrado '${open}')`);
  }
  const close = open === '[' ? ']' : '}';
  let depth = 0;
  let str = null; // comilla activa
  let end = -1;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    const prev = src[j - 1];
    if (str) {
      if (c === str && prev !== '\\') str = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      str = c;
      continue;
    }
    if (c === '/' && src[j + 1] === '/') {
      const nl = src.indexOf('\n', j);
      j = nl === -1 ? src.length : nl;
      continue;
    }
    if (c === '/' && src[j + 1] === '*') {
      const ce = src.indexOf('*/', j + 2);
      j = ce === -1 ? src.length : ce + 1;
      continue;
    }
    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) {
        end = j;
        break;
      }
    }
  }
  if (end === -1) throw new Error(`No se cerró el literal de ${name}`);
  const literal = src.slice(i, end + 1);
  // eslint-disable-next-line no-new-func
  return new Function(`return (${literal});`)();
}
