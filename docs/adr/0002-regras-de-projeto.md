# ADR 0002: regras de projeto e portões de cada fase

- **Status:** aceita em 07/11/2026

## Regras do código

1. **TypeScript estrito** no pacote e em todo arquivo novo dos playgrounds. O código antigo vira TS quando for tocado.
2. **Nada de `innerHTML`** em código novo: JSX e Astro escapam o texto sozinhos. `set:html` só no componente de enunciado, que é conteúdo nosso.
3. **Funções com até 80 linhas e complexidade até 15** no código novo. O código antigo só pode diminuir.
4. **Camadas:** o domínio não importa UI, stores nem `localStorage`. A persistência entra por uma porta (`RepositorioDeEstado`).
5. **Ilhas:** props mínimas e serializáveis. Nunca vão para uma ilha a solução do exercício nem chaves. Um teste procura `solucao` no HTML gerado.
6. **Tokens:** cores, tamanhos de fonte, espaçamentos, raios, sombras e camadas vêm do pacote. As cores mantêm os nomes atuais (`--fundo`, `--texto`, `--ciano`…), para não quebrar o CSS existente. As escalas novas são `--tam-*` (fonte), `--espaco-*`, `--raio-*`, `--sombra-*` e `--camada-*`. Valor solto em CSS novo é erro de revisão.
7. **Compatibilidade:** as chaves do `localStorage` não mudam, para que progresso, rascunhos e certificados já emitidos continuem valendo.

## Portões de cada PR de migração

Um PR só entra se todos estes itens passarem:

- **Paridade:** DOM e pixels iguais nas telas tocadas, nos 4 temas, desktop e celular. A exceção são as mudanças visuais intencionais, como a troca de escala, que precisam de imagens de antes e depois revisadas.
- **Acessibilidade:** axe com 0 violações e Lighthouse Acessibilidade 100. As 18 opções do painel continuam funcionando.
- **E2E** verde.
- **JavaScript por página:** só diminui.
- **Segredo dos certificados:** fora do `dist/`, conferido por `scripts/conferir-segredo.mjs`.
- **Verificação local:** `npm run verificar` verde.
