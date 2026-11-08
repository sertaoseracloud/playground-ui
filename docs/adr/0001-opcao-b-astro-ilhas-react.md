# ADR 0001: Astro nos cinco playgrounds, React com TypeScript só nas ilhas, e um pacote compartilhado

- **Status:** aceita em 07/11/2026; **substituída** em 08/11/2026 pelo [ADR 0003](0003-typescript-e-react-100.md) (TypeScript e React em 100%)
- **Contexto completo:** `estudo-componentizacao/README.md` (estudo de esforço, mesma data)

## Contexto

Os cinco playgrounds (Go, Kubernetes, PHP, Python e Terraform) repetem a mesma interface:

- 66 arquivos de `src/` existem nos cinco, 18 deles idênticos;
- outras ~6.000 linhas são de 60% a 99% iguais;
- a sincronização é feita à mão pelo `comuns.json` e já divergiu.

Terraform e Kubernetes já usam o Astro como gerador de páginas. Go, PHP e Python são SPAs com Vite. O Go chegou a migrar para Astro e React em 3 dias, conferindo só "HTTP 200", e desfez a migração no mesmo dia.

## Decisão

Seguir a **opção B** do estudo:

1. Um pacote compartilhado, `@sertaoseracloud/playground-ui`, em TypeScript, com o design system, a casca, as páginas comuns, as ilhas genéricas e o domínio comum.
2. **Astro** nos cinco playgrounds, com uma página por tela. As telas estáticas viram componentes `.astro`, sem JavaScript.
3. **React com TypeScript só nas ilhas com estado**: tela do exercício, painel de acessibilidade, tutorial, cenário da trilha, validador e certificado.
4. Ordem: pacote → Kubernetes → Terraform → Go → PHP → Python. O Python tem um spike do motor antes e um gatilho para parar.

## Consequências

- O `comuns.json` encolhe conforme os arquivos entram no pacote, até sumir.
- Cada fase é um PR pequeno com portão de paridade (ADR 0002). Não há migração em bloco.
- Enquanto o GitHub Actions só publica o site, a verificação de cada PR é local (`npm run verificar`).
- O pacote começa como dependência git por tag (`github:sertaoseracloud/playground-ui#v0.x.y`), sem registro de pacotes.
