/**
 * Escalas do design system: tipografia, espaçamento, raios, sombras e camadas.
 *
 * Saíram dos valores que o CSS dos playgrounds usa hoje (07/11/2026): 55 tamanhos de
 * fonte, 76 paddings, 16 raios, 19 sombras e 11 z-index. Cada escala guarda os passos
 * mais usados, para mudar o mínimo de pixels. A tabela de equivalência (valor de hoje →
 * passo) está em `docs/escalas.md`.
 */

/**
 * Tamanhos de fonte da interface, em rem. Acompanham o tamanho de texto do painel de
 * acessibilidade, que muda o `font-size` do `<html>`.
 */
export const TAMANHOS = {
  '2xs': '0.75rem',
  xs: '0.8rem',
  sm: '0.85rem', // o mais usado hoje (30 vezes)
  md: '0.9rem',
  base: '1rem',
  lg: '1.2rem',
  xl: '1.4rem',
  '2xl': '1.6rem',
  '3xl': '2rem',
  titulo: 'clamp(2rem, 4.2vw, 3.1rem)', // título da landing
} as const;

/** Código (editor e terminal): em px vezes a `--escala` do painel, como hoje. */
export const TAMANHOS_CODIGO = {
  sm: 'calc(13px * var(--escala))',
  base: 'calc(14px * var(--escala))',
  lg: 'calc(15px * var(--escala))',
} as const;

/**
 * Espaçamento (padding, margin, gap) em grade de 4 px, com meios passos de 2 px nos
 * tamanhos pequenos, porque 6 px e 10 px estão entre os valores mais usados hoje.
 */
export const ESPACOS = {
  '0': '0',
  '0-5': '2px',
  '1': '4px',
  '1-5': '6px',
  '2': '8px',
  '2-5': '10px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '12': '48px',
  '16': '64px',
} as const;

export const RAIOS = {
  p: '4px',
  m: '8px', // o `--raio` de hoje
  g: '12px',
  pilula: '999px',
  circulo: '50%',
} as const;

/** Sombras de elevação. Halos e destaques coloridos são do componente, não da escala. */
export const SOMBRAS = {
  '1': '0 1px 3px rgb(0 0 0 / 0.2)', // cartões e chips
  '2': '0 8px 24px rgb(0 0 0 / 0.4)', // menus, dicas e popovers
  '3': '0 20px 60px rgb(0 0 0 / 0.5)', // diálogos e tutorial
} as const;

/** Camadas (z-index) com nome, em vez de números soltos espalhados pelo CSS. */
export const CAMADAS = {
  fundo: '-1', // cenário da trilha
  barra: '30', // barra fixa do exercício
  menu: '40', // menus suspensos ("Mais ações")
  flutuante: '45', // botões flutuantes
  sobreposicao: '50', // régua de leitura e destaque do tutorial
  aviso: '55', // aviso de privacidade
  lembrete: '60', // lembrete de pausa
  menuTopo: '70', // menu do celular
  pular: '100', // link "pular para o conteúdo"
} as const;

export const ESCALAS = { TAMANHOS, TAMANHOS_CODIGO, ESPACOS, RAIOS, SOMBRAS, CAMADAS } as const;
