/**
 * Cores dos quatro temas dos playgrounds.
 *
 * Os valores são os mesmos que os cinco repositórios têm hoje no `src/estilo.css`
 * (conferido em 07/11/2026, sem diferença entre eles). Os nomes também são os de hoje,
 * para o CSS existente continuar funcionando. Novo aqui: `bordaControle`, a borda de
 * campos e botões neutros, com 3:1 sobre os três fundos (WCAG 1.4.11).
 */

/** Hexadecimal de 6 dígitos (`#rrggbb`) ou de 8, com transparência (`#rrggbbaa`). */
export type Hex = `#${string}`;

export const NOMES_DE_TEMA = ['dracula', 'alto-contraste', 'claro', 'suave'] as const;
export type NomeDoTema = (typeof NOMES_DE_TEMA)[number];

/** O tema usado quando a pessoa ainda não escolheu nenhum. */
export const TEMA_PADRAO: NomeDoTema = 'dracula';

export interface CoresDoTema {
  /** Fundo da página. */
  fundo: Hex;
  /** Painéis e cartões sobre o fundo. */
  fundoEscuro: Hex;
  /** Editor, terminal e barras. */
  fundoMaisEscuro: Hex;
  /** Divisórias e superfícies neutras (decorativas: não usar como borda de controle). */
  linha: Hex;
  /** Linha atual do editor. */
  linhaAtual: Hex;
  /** Seleção de texto. */
  selecao: Hex;
  /** Texto principal. */
  texto: Hex;
  /** Texto secundário (4,5:1 sobre os fundos). */
  suave: Hex;
  ciano: Hex;
  verde: Hex;
  laranja: Hex;
  rosa: Hex;
  roxo: Hex;
  vermelho: Hex;
  amarelo: Hex;
  /** Texto em cima de botões coloridos. */
  sobreCor: Hex;
  /** Contorno de foco. */
  foco: Hex;
  /** Borda de campos e botões neutros: 3:1 sobre os três fundos. */
  bordaControle: Hex;
  /** Só no alto contraste: fundo e borda dos botões sem cor. */
  fundoBotao?: Hex;
  bordaBotao?: Hex;
  /** Valor de `color-scheme` (barras de rolagem e controles nativos). */
  esquema: 'dark' | 'light';
}

export const TEMAS: Readonly<Record<NomeDoTema, CoresDoTema>> = {
  dracula: {
    fundo: '#282a36',
    fundoEscuro: '#21222c',
    fundoMaisEscuro: '#191a21',
    linha: '#44475a',
    linhaAtual: '#44475a55',
    selecao: '#44475a',
    texto: '#f8f8f2',
    // O "comment" do Dracula (#6272a4) não chega a 4,5:1 nos fundos do site.
    suave: '#a9b1d6',
    ciano: '#8be9fd',
    verde: '#50fa7b',
    laranja: '#ffb86c',
    rosa: '#ff79c6',
    roxo: '#bd93f9',
    vermelho: '#ff5555',
    amarelo: '#f1fa8c',
    sobreCor: '#191a21',
    foco: '#f1fa8c',
    bordaControle: '#737582',
    esquema: 'dark',
  },
  'alto-contraste': {
    fundo: '#000000',
    fundoEscuro: '#0b0b0b',
    fundoMaisEscuro: '#000000',
    linha: '#8a8a8a',
    linhaAtual: '#262626',
    selecao: '#1d4ed8',
    texto: '#ffffff',
    suave: '#d6d6d6',
    ciano: '#00ffff',
    verde: '#3dff7a',
    laranja: '#ffb000',
    rosa: '#ff8cff',
    roxo: '#d0b3ff',
    vermelho: '#ff5c5c',
    amarelo: '#ffff00',
    sobreCor: '#000000',
    foco: '#ffff00',
    bordaControle: '#ffffff',
    fundoBotao: '#000000',
    bordaBotao: '#ffffff',
    esquema: 'dark',
  },
  // Paleta "Alucard", a versão clara do Dracula.
  claro: {
    fundo: '#fffbeb',
    fundoEscuro: '#f4f0dc',
    fundoMaisEscuro: '#ebe7d2',
    linha: '#cfccbb',
    linhaAtual: '#ece8d4',
    selecao: '#cfcfde',
    texto: '#1f1f1f',
    suave: '#555088',
    ciano: '#036a96',
    verde: '#14710a',
    laranja: '#a34d14',
    rosa: '#a3144d',
    roxo: '#644ac9',
    vermelho: '#b8281b',
    amarelo: '#6b5a0f',
    sobreCor: '#ffffff',
    foco: '#644ac9',
    bordaControle: '#858379',
    esquema: 'light',
  },
  // Cores pouco saturadas e sem brilho forte, para quem se cansa com estímulo visual.
  suave: {
    fundo: '#2b2d33',
    fundoEscuro: '#25272c',
    fundoMaisEscuro: '#202226',
    linha: '#41444d',
    linhaAtual: '#41444d66',
    selecao: '#474b57',
    texto: '#dedcd5',
    suave: '#b4b8c6',
    ciano: '#93b9c4',
    verde: '#9fc49b',
    laranja: '#d6b38f',
    rosa: '#cfa8bc',
    roxo: '#b5aad6',
    vermelho: '#d69494',
    amarelo: '#d6d09c',
    sobreCor: '#202226',
    foco: '#d6d09c',
    bordaControle: '#76787b',
    esquema: 'dark',
  },
};

/** Nome da variável CSS de cada cor: `fundoEscuro` → `--fundo-escuro`. */
export function variavelCss(nome: keyof Omit<CoresDoTema, 'esquema'>): `--${string}` {
  return `--${nome.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`)}`;
}
