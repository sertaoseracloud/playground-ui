# ADR 0003: TypeScript e React em 100% dos playgrounds, com os certificados emitidos intocáveis

- **Status:** aceita em 08/11/2026. Substitui a decisão do [ADR 0001](0001-opcao-b-astro-ilhas-react.md) (opção B). As regras e os portões do [ADR 0002](0002-regras-de-projeto.md) continuam valendo e ganham os desta página.
- **Contexto completo:** `estudo-componentizacao/plano-migracao-100-ts.md` (estudo e plano, mesma data)

## Contexto

A opção B deixava o domínio dos motores, o conteúdo e os testes em JavaScript, e o React só nas ilhas com estado. Em 08/11 duas coisas mostraram o custo de manter cinco implementações sem tipos da mesma interface:

- o DivergeGo tinha lacunas que os testes de unidade aceitavam: falas da vila, botão de pausar o cenário e testes pendentes depois de um erro de compilação;
- o build do DivergeGo tinha perdido o prerender, e o site saía sem SEO nem `sitemap.xml`.

O estudo mede cerca de 154 mil linhas de JavaScript nos cinco, com praticamente nenhum tipo.

## Decisão

1. **TypeScript estrito em tudo:** pacote, interface, domínio, motores, conteúdo (com esquema Zod), testes e scripts. No fim de cada repositório, `allowJs: false`. As exceções estão no plano: o runtime Go do DivergeGo, os runtimes WASM de terceiros e os arquivos gerados.
2. **Astro + React em toda a interface.** Telas estáticas em `.astro`, sem JavaScript no cliente. Todo comportamento em componentes React (`.tsx`). Nada de DOM imperativo fora dos hooks adaptadores (CodeMirror, Pixi, workers).
3. **Pacote + cinco repositórios**, sem monorepo. O pacote ganha os pontos de entrada `/react`, `/astro`, `/dominio`, `/testes` e `/config`.
4. **Ordem e controle:**
   - fase 0 (fundação e compatibilidade);
   - spike no Kubernetes com critério para seguir;
   - design system e primitivos;
   - domínio e casca no pacote;
   - um repositório por vez: Kubernetes → Terraform → Go → PHP → Python.

   O Python tem um gatilho para parar e ficar na opção B.
5. **Primitivos com comportamento complexo** (`Dialogo`, `Menu`, `Abas`, `Dica`) em React Aria Components, **se o spike confirmar** que o peso cabe no orçamento de JavaScript. Se não couber, são escritos à mão, com os mesmos testes.

## Regra que não muda: certificados já emitidos continuam valendo

Quem recebeu um certificado tem um link (`#/certificado/<código>`, `#/validar/<código>` ou `badge/<módulo>/?c=<código>`), às vezes um PDF com o selo, e às vezes o XML com as assinaturas. Nenhuma fase da migração pode invalidar um deles. O contrato é este:

| O que | Onde está hoje | Por que não pode mudar |
|---|---|---|
| Código do link: `base64url(JSON { n, m, d, h, c })` | `codificarCertificado` / `decodificarCertificado` | Os links já publicados (LinkedIn, PDFs) carregam esse código |
| Mensagem do selo: `JSON.stringify([data, responsável, organização, nome.trim(), módulo, anterior?])` | `mensagemAssinada` | O selo HMAC-SHA256 é calculado sobre ela |
| Cadeia na ordem de `CERTIFICADOS` | `ORDEM`, `montarCadeia` | Cada selo inclui o anterior: reordenar ou renomear módulos quebra os seguintes. Módulo novo só no fim |
| Derivação das chaves: `sha256("<repo>:<rótulo>:<segredo>")`, com os rótulos `certificado` e `ed25519` | `vite.config.js` / `astro.config.mjs` | É de onde saem a chave do selo e a semente Ed25519 |
| Segredos `CERTIFICADO_SEGREDO` e `CERTIFICADO_SEGREDO_HOMOLOGACAO` | secrets de cada repositório | Trocar o segredo invalida todos os selos e a chave pública |
| Chave pública em `chave-publica-ed25519.txt` e `.json`, e o XML `…/certificado/v1` | build e `certificadoXml` | Quem valida fora do site usa essa chave e esse formato |
| Id `SSC-AAAA-XXXX-XXXX` | `idCertificado` | Aparece no certificado e no LinkedIn |
| Links antigos sem selo abrem como "sem selo" (`ausente`), não como inválidos | `decodificarCertificado` | Certificados de antes do selo |
| Rotas `#/certificado/…`, `#/validar/…` e `badge/<módulo>/?c=…` | roteador e `scripts/gerar-badges.mjs` | Quando as telas virarem páginas Astro, as rotas antigas continuam funcionando (redirecionamento no cliente a partir do `#`) |

**Como isso é garantido:**

- **`tests/compat-certificados.test.js` nos cinco repositórios**, com os vetores em `tests/fixtures/certificados-v1.json`. Eles foram gerados pelo código de 08/11 com as chaves fictícias dos testes e conferem:
  - o código, o selo, o id, a mensagem e a assinatura de cada módulo;
  - os três formatos de link;
  - o certificado impresso;
  - o link sem selo;
  - a ordem.

  O arquivo migrado para TS precisa passar no mesmo teste, com os mesmos vetores. Regerar os vetores só é permitido para acrescentar um módulo no fim.
- **O pipeline** (`playground.yml`, job `montar`) compara a chave pública do build com a que já está publicada em produção e na homologação, e para a publicação se mudar.
- **E2E de rotas antigas**, quando a fase 4 trocar o roteamento de um repositório: um link `#/certificado/…` e um `badge/…/?c=…` gerados com a chave do build de teste abrem o certificado com o selo conferindo.

## Consequências

- O esforço estimado sobe de 58–88 para 128–186 dias-pessoa. Com duas pessoas, são de 14 a 20 semanas.
- O `comuns.json` some à medida que as telas vão para o pacote.
- O pipeline ganha os jobs `tipos`, `componentes` e `contrato`, que só rodam quando o repositório tem o script correspondente.
- Uma mudança no módulo de certificados exige a revisão de quem conhece este contrato, mesmo com os testes verdes.
