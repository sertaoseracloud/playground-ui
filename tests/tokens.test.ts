import { describe, expect, it } from 'vitest';
import {
  NOMES_DE_TEMA, TEMAS, auditarTema, contraste, gerarCss, variavelCss,
  CAMADAS, ESPACOS, RAIOS, SOMBRAS, TAMANHOS,
} from '../src/tokens/index.ts';

describe('contraste', () => {
  it('segue a fórmula do WCAG 2.2', () => {
    expect(contraste('#000000', '#ffffff')).toBeCloseTo(21, 5);
    expect(contraste('#777777', '#ffffff')).toBeCloseTo(4.48, 2);
    expect(contraste('#fff', '#fff')).toBe(1);
  });

  it.each(NOMES_DE_TEMA)('o tema %s cumpre todos os pares garantidos (AA)', (tema) => {
    expect(auditarTema(TEMAS[tema])).toEqual([]);
  });

  it('a linha decorativa continua abaixo de 3:1 (por isso a borda de controle existe)', () => {
    expect(contraste(TEMAS.dracula.linha, TEMAS.dracula.fundo)).toBeLessThan(3);
    expect(contraste(TEMAS.dracula.bordaControle, TEMAS.dracula.fundo)).toBeGreaterThanOrEqual(3);
  });
});

describe('tokens.css', () => {
  const css = gerarCss();

  it('tem um bloco por tema, com o padrão também em :root', () => {
    expect(css).toContain(':root,\n:root[data-tema="dracula"] {');
    for (const tema of NOMES_DE_TEMA) expect(css).toContain(`:root[data-tema="${tema}"]`);
  });

  it('declara todas as cores de todos os temas com os nomes de hoje', () => {
    expect(variavelCss('fundoMaisEscuro')).toBe('--fundo-mais-escuro');
    expect(variavelCss('sobreCor')).toBe('--sobre-cor');
    for (const tema of NOMES_DE_TEMA) {
      for (const [nome, valor] of Object.entries(TEMAS[tema])) {
        if (nome === 'esquema') continue;
        expect(css).toContain(`${variavelCss(nome as 'fundo')}: ${valor};`);
      }
    }
    expect(css.match(/color-scheme: (dark|light);/g)).toHaveLength(NOMES_DE_TEMA.length);
  });

  it('declara as escalas', () => {
    expect(css).toContain('--tam-sm: 0.85rem;');
    expect(css).toContain('--tam-2xs: 0.75rem;');
    expect(css).toContain('--espaco-1-5: 6px;');
    expect(css).toContain('--raio-m: 8px;');
    expect(css).toContain('--raio: 8px;');
    expect(css).toContain('--camada-menu-topo: 70;');
    expect(css).toContain('--sombra-2: 0 8px 24px rgb(0 0 0 / 0.4);');
  });
});

describe('escalas', () => {
  it('são pequenas o bastante para serem uma escala', () => {
    expect(Object.keys(TAMANHOS).length).toBeLessThanOrEqual(10);
    expect(Object.keys(ESPACOS).length).toBeLessThanOrEqual(13);
    expect(Object.keys(RAIOS)).toHaveLength(5);
    expect(Object.keys(SOMBRAS)).toHaveLength(3);
  });

  it('tamanhos crescem e espaços não se repetem', () => {
    const rem = Object.values(TAMANHOS).filter((v) => v.endsWith('rem')).map(Number.parseFloat);
    expect(rem).toEqual([...rem].sort((a, b) => a - b));
    const px = Object.values(ESPACOS).map(Number.parseFloat);
    expect(new Set(px).size).toBe(px.length);
  });

  it('o CSS lista os espaços em ordem crescente', () => {
    const px = [...gerarCss().matchAll(/--espaco-[\w-]+: ([\d.]+)(?:px)?;/g)].map((m) => Number.parseFloat(m[1] ?? ''));
    expect(px).toEqual([...px].sort((a, b) => a - b));
    expect(px).toHaveLength(Object.keys(ESPACOS).length);
  });

  it('as camadas não se repetem', () => {
    const valores = Object.values(CAMADAS);
    expect(new Set(valores).size).toBe(valores.length);
  });
});
