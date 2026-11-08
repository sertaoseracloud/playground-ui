#!/usr/bin/env node
// Compara as cores de src/tokens com as de um estilo.css de playground.
//
//   node scripts/comparar-css.mjs ../go-playground/src/estilo.css [outro.css ...]
//
// Sai com código 1 se algum token de cor que existe nos dois tiver valor diferente.
// `bordaControle` é novo no pacote e não precisa existir no CSS antigo.
import { readFileSync } from 'node:fs';
import { TEMAS, NOMES_DE_TEMA, variavelCss } from '../src/tokens/cores.ts';

const normalizar = (v) => {
  let h = v.trim().toLowerCase();
  if (/^#[0-9a-f]{3}$/.test(h)) h = `#${[...h.slice(1)].map((c) => c + c).join('')}`;
  return h;
};

function temasDoCss(css) {
  const out = {};
  for (const m of css.matchAll(/((?::root(?:\[data-tema="[\w-]+"\])?\s*,?\s*)+)\{([^}]*)\}/g)) {
    for (const nome of [...m[1].matchAll(/data-tema="([\w-]+)"/g)].map((x) => x[1])) {
      out[nome] ??= {};
      for (const d of m[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[nome][d[1]] = normalizar(d[2]);
    }
  }
  return out;
}

let falhas = 0;
for (const arquivo of process.argv.slice(2)) {
  const doCss = temasDoCss(readFileSync(arquivo, 'utf8'));
  const diferencas = [];
  for (const tema of NOMES_DE_TEMA) {
    for (const [nome, valor] of Object.entries(TEMAS[tema])) {
      if (nome === 'esquema') continue;
      const v = variavelCss(nome);
      const antigo = doCss[tema]?.[v];
      if (antigo === undefined) continue;
      if (antigo !== normalizar(valor)) diferencas.push(`${tema} ${v}: css=${antigo} pacote=${valor}`);
    }
  }
  falhas += diferencas.length;
  console.log(diferencas.length ? `✗ ${arquivo}\n  ${diferencas.join('\n  ')}` : `✓ ${arquivo}: cores iguais às do pacote`);
}
process.exit(falhas ? 1 : 0);
