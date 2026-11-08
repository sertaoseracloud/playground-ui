/**
 * Contraste WCAG 2.2 entre duas cores e os pares de tokens que o design system garante.
 */
import type { CoresDoTema, Hex } from './cores.ts';

function canais(hex: Hex): [number, number, number] {
  let h = hex.slice(1);
  if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
  const v = [0, 2, 4].map((i) => Number.parseInt(h.slice(i, i + 2), 16));
  if (v.some(Number.isNaN)) throw new Error(`Cor inválida: ${hex}`);
  return v as [number, number, number];
}

/** Luminância relativa (WCAG 2.2). A transparência é ignorada. */
export function luminancia(hex: Hex): number {
  const [r, g, b] = canais(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Razão de contraste entre duas cores, de 1 a 21. */
export function contraste(a: Hex, b: Hex): number {
  const [claro, escuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x) as [number, number];
  return (claro + 0.05) / (escuro + 0.05);
}

type Cor = keyof Omit<CoresDoTema, 'esquema' | 'fundoBotao' | 'bordaBotao'>;

export interface ParDeContraste {
  frente: Cor;
  fundo: Cor;
  minimo: number;
  uso: string;
}

const FUNDOS: Cor[] = ['fundo', 'fundoEscuro', 'fundoMaisEscuro'];
const DESTAQUES: Cor[] = ['ciano', 'verde', 'laranja', 'rosa', 'roxo', 'vermelho', 'amarelo'];

/** Os pares que todo tema precisa cumprir, com o mínimo do WCAG 2.2 AA para cada uso. */
export const PARES_GARANTIDOS: readonly ParDeContraste[] = [
  ...FUNDOS.map((fundo): ParDeContraste => ({ frente: 'texto', fundo, minimo: 4.5, uso: 'texto normal' })),
  ...(['fundo', 'fundoEscuro'] as Cor[]).map((fundo): ParDeContraste => ({ frente: 'suave', fundo, minimo: 4.5, uso: 'texto secundário' })),
  ...DESTAQUES.map((frente): ParDeContraste => ({ frente, fundo: 'fundo', minimo: 4.5, uso: 'texto colorido e links' })),
  ...DESTAQUES.map((fundo): ParDeContraste => ({ frente: 'sobreCor', fundo, minimo: 4.5, uso: 'texto em botão colorido' })),
  { frente: 'foco', fundo: 'fundo', minimo: 3, uso: 'contorno de foco' },
  ...FUNDOS.map((fundo): ParDeContraste => ({ frente: 'bordaControle', fundo, minimo: 3, uso: 'borda de campo e botão neutro' })),
];

export interface FalhaDeContraste extends ParDeContraste {
  razao: number;
}

/** Pares do tema que não chegam ao mínimo (lista vazia = tema aprovado). */
export function auditarTema(cores: CoresDoTema): FalhaDeContraste[] {
  return PARES_GARANTIDOS.map((par) => ({ ...par, razao: contraste(cores[par.frente], cores[par.fundo]) }))
    .filter((r) => r.razao < r.minimo);
}
