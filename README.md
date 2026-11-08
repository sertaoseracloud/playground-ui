# @sertaoseracloud/playground-ui

Design system e componentes compartilhados dos playgrounds da Sertão será cloud: DivergeGo, DivergeKubernetes, DivergePHP, DivergePython e DivergeTerraform.

O motivo e o plano estão no [ADR 0001](docs/adr/0001-opcao-b-astro-ilhas-react.md), e as regras de projeto no [ADR 0002](docs/adr/0002-regras-de-projeto.md).

## O que já tem (0.1.0)

- **Tokens de cor** dos 4 temas (Drácula, alto contraste, claro e suave), em TypeScript, com os mesmos nomes e valores que os playgrounds usam hoje, mais `--borda-controle` (3:1 nos três fundos).
- **Teste de contraste WCAG 2.2** de todos os pares que o design system garante: texto, texto secundário, cores de destaque, texto sobre botão colorido, foco e borda de controle.
- **Escalas**: tipografia (`--tam-*`), espaçamento (`--espaco-*`), raios (`--raio-*`), sombras (`--sombra-*`) e camadas (`--camada-*`). De onde veio cada passo e como trocar os valores de hoje está em [docs/escalas.md](docs/escalas.md).
- **`dist/tokens.css`**, gerado a partir dos tokens e versionado no repositório: quem instala pelo git não precisa compilar nada. Um teste confere que ele está em dia.

## Usar

```bash
npm install github:sertaoseracloud/playground-ui#v0.1.1
```

```js
import '@sertaoseracloud/playground-ui/tokens.css';
import { TEMAS, contraste } from '@sertaoseracloud/playground-ui/tokens';
```

## Desenvolver

Precisa do Node 24 (executa o TypeScript direto, sem compilar). Depois de mudar um token, rode `npm run build` e versione o `dist/tokens.css`.

```bash
npm install
npm run verificar   # tipos, testes e build de dist/tokens.css
node scripts/comparar-css.mjs ../go-playground/src/estilo.css   # cores iguais às de um playground?
```

## Próximos passos (opção B)

1. Trocar os valores soltos do CSS dos playgrounds pelas escalas, tela a tela, com comparação visual nos 4 temas.
2. Primitivos React em TS (`Botao`, `Abas`, `Dialogo`, `Aviso`) com testes e axe.
3. Casca e páginas comuns em `.astro`, mais o painel de acessibilidade.
4. Domínio comum em TS: progresso, preferências, certificados, contrato `Motor`.

## Licença

AGPL-3.0-or-later, a mesma dos playgrounds.
