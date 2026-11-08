/**
 * Gera o CSS das variáveis (`tokens.css`) a partir dos tokens em TS.
 */
import { NOMES_DE_TEMA, TEMA_PADRAO, TEMAS, variavelCss, type CoresDoTema } from './cores.ts';
import { CAMADAS, ESPACOS, RAIOS, SOMBRAS, TAMANHOS, TAMANHOS_CODIGO } from './escalas.ts';

const camelParaKebab = (s: string) => s.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`);

function blocoDoTema(cores: CoresDoTema): string {
  const linhas = Object.entries(cores)
    .filter(([nome]) => nome !== 'esquema')
    .map(([nome, valor]) => `  ${variavelCss(nome as keyof Omit<CoresDoTema, 'esquema'>)}: ${valor};`);
  return [...linhas, `  color-scheme: ${cores.esquema};`].join('\n');
}

/**
 * Uma variável por passo. Com `porValor`, os passos saem em ordem crescente: chaves que
 * parecem números inteiros ('1', '2') vêm antes das outras ('0-5') num objeto do JS.
 */
function blocoDeEscala(prefixo: string, escala: Readonly<Record<string, string>>, { porValor = false } = {}): string {
  const passos = Object.entries(escala);
  if (porValor) passos.sort(([, a], [, b]) => Number.parseFloat(a) - Number.parseFloat(b));
  return passos.map(([passo, valor]) => `  --${prefixo}-${camelParaKebab(passo)}: ${valor};`).join('\n');
}

export function gerarCss(): string {
  const temas = NOMES_DE_TEMA.map((nome) => {
    const seletor = nome === TEMA_PADRAO ? `:root,\n:root[data-tema="${nome}"]` : `:root[data-tema="${nome}"]`;
    return `${seletor} {\n${blocoDoTema(TEMAS[nome])}\n}`;
  });
  const escalas = [
    '  --escala: 1;',
    `  --raio: ${RAIOS.m};`,
    '  --fonte-codigo: "Fira Code", ui-monospace, Consolas, monospace;',
    '  --fonte-texto: var(--fonte-codigo);',
    '  --altura-linha: 1.6;',
    '  --altura-linha-codigo: 1.6;',
    blocoDeEscala('tam', TAMANHOS),
    blocoDeEscala('tam-codigo', TAMANHOS_CODIGO),
    blocoDeEscala('espaco', ESPACOS, { porValor: true }),
    blocoDeEscala('raio', RAIOS),
    blocoDeEscala('sombra', SOMBRAS),
    blocoDeEscala('camada', CAMADAS),
  ].join('\n');
  return [
    '/* Gerado por @sertaoseracloud/playground-ui (scripts/gerar-css.mjs). Não edite: mude os tokens em src/tokens. */',
    ...temas,
    `:root {\n${escalas}\n}`,
    '',
  ].join('\n\n');
}
