# Escalas: de onde vieram e como trocar os valores de hoje

Medido no CSS do go-playground em 07/11/2026. Os outros quatro playgrounds têm os mesmos arquivos com 76% a 100% de semelhança. Os números entre parênteses contam quantas vezes cada valor aparece hoje.

Os tamanhos que usam `cqw` (as falas e placas dos cenários, que acompanham a largura do palco) e os efeitos próprios de um componente (halos coloridos, sombra interna da aba ativa, o "véu" do tutorial) ficam fora das escalas: são do componente.

## Tipografia: 55 valores → 10 passos

| Passo | Valor | Valores de hoje que viram este passo |
|---|---|---|
| `--tam-2xs` | 0.75rem | 0.75rem (13), 0.78rem (11) |
| `--tam-xs` | 0.8rem | 0.8rem (10), 0.82rem (10) |
| `--tam-sm` | 0.85rem | 0.85rem (31), 0.85em (4), 0.86rem (2), 0.88rem (6) |
| `--tam-md` | 0.9rem | 0.9rem (8), 0.9em (3), 0.92em, 0.93em, 0.95rem (4) |
| `--tam-base` | 1rem | 1rem (8), 1.05rem (5), 1.08rem |
| `--tam-lg` | 1.2rem | 1.1rem (2), 1.15rem (3), 1.2rem (5) |
| `--tam-xl` | 1.4rem | 1.3rem (5), 1.35rem, 1.4rem (3) |
| `--tam-2xl` | 1.6rem | 1.5rem (2), 1.6rem (5), 1.7rem, 1.8rem |
| `--tam-3xl` | 2rem | 2rem (3), 2.6rem |
| `--tam-titulo` | clamp(2rem, 4.2vw, 3.1rem) | título da landing |
| `--tam-codigo-sm` / `--tam-codigo` / `--tam-codigo-lg` | 13px / 14px / 15px × `--escala` | editor e terminal |

## Espaçamento: 31 valores de px → 13 passos

| Passo | Valor | Valores de hoje |
|---|---|---|
| `--espaco-0-5` | 2px | 1px (3), 2px (16), 3px (6) |
| `--espaco-1` | 4px | 4px (47), 5px (6) |
| `--espaco-1-5` | 6px | 6px (70), 7px (4) |
| `--espaco-2` | 8px | 8px (71), 9px (2) |
| `--espaco-2-5` | 10px | 10px (67) |
| `--espaco-3` | 12px | 12px (55) |
| `--espaco-4` | 16px | 14px (42, revisar caso a caso: 12 ou 16), 16px (39), 18px (25, revisar: 16 ou 20) |
| `--espaco-5` | 20px | 20px (11), 22px (5) |
| `--espaco-6` | 24px | 24px (6), 26px (5), 28px (8, revisar: 24 ou 32) |
| `--espaco-8` | 32px | 30px (2), 34px, 36px (2) |
| `--espaco-12` | 48px | 40px (2), 48px (2) |
| `--espaco-16` | 64px | 64px, 80px |

Os valores maiores (104px, 120px, 180px) são alturas e larguras de elementos, não espaçamento.

## Raios: 16 valores → 5

| Passo | Valor | Hoje |
|---|---|---|
| `--raio-p` | 4px | 4px (9), 5px (3), 6px (19) |
| `--raio-m` | 8px | 8px (19), 10px (12), e o `--raio` atual |
| `--raio-g` | 12px | 12px (12), 14px (4), 16px (2) |
| `--raio-pilula` | 999px | 999px (7) |
| `--raio-circulo` | 50% | 50% (14) |

## Sombras: 19 → 3 de elevação

| Passo | Valor | Hoje |
|---|---|---|
| `--sombra-1` | 0 1px 3px rgb(0 0 0 / 0.2) | chips e cartões |
| `--sombra-2` | 0 8px 24px rgb(0 0 0 / 0.4) | 0 4px 16px, 0 6px 18px, 0 8px 24px (2), 0 10px 30px (2): menus, dicas e popovers |
| `--sombra-3` | 0 20px 60px rgb(0 0 0 / 0.5) | 0 10px 40px, 0 16px 30px, 0 20px 60px, 0 24px 60px: diálogos e tutorial |

## Camadas: 11 z-index → 9 nomes

| Camada | Valor | Hoje |
|---|---|---|
| `--camada-fundo` | -1 | `.cenario`, `.cenario-pixi` |
| `--camada-barra` | 30 | `.barra-item` |
| `--camada-menu` | 40 | `.menu-mais-acoes`, `.ir-passo-atual` |
| `--camada-flutuante` | 45 | `.flutuantes` |
| `--camada-sobreposicao` | 50 | `.regua-leitura`, `.tutorial-destaque` |
| `--camada-aviso` | 55 | `.aviso-privacidade` |
| `--camada-lembrete` | 60 | `.lembrete-pausa` |
| `--camada-menu-topo` | 70 | `.menu-topo` (celular) |
| `--camada-pular` | 100 | `.pular` |

Os valores 1 e 2 (`.painel-jogador` e `.fala-vila`) são locais ao cenário e não precisam de token.

**Inconsistência encontrada:** `.menu-mais-acoes` tem `z-index: 40` num arquivo e `100` em outro. Na troca, fica `--camada-menu`.

## Cores: o que mudou

Nada nos valores. A única novidade é **`--borda-controle`**, a borda de campos e botões neutros, com 3:1 ou mais sobre os três fundos em todos os temas. Hoje o botão neutro (`.btn`) usa `--linha` como fundo, sem borda, e o contorno fica com 1,4 a 1,6:1:

| Tema | `--linha` (hoje) | `--borda-controle` | Contraste mínimo |
|---|---|---|---|
| Drácula | #44475a (1,56:1) | #737582 | 3,12:1 |
| Alto contraste | #8a8a8a (5,70:1) | #ffffff | 21:1 |
| Claro | #cfccbb (1,30:1) | #858379 | 3,06:1 |
| Suave | #41444d (1,41:1) | #76787b | 3,11:1 |
