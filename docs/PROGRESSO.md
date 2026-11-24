# Progresso do DNA:IA

## Etapa 01 — Fundação e infraestrutura

- Branch: `feature/01-project-setup`.
- Fundação implementada no código: shell React, TypeScript strict, Vite, configuração de lint, formatação, suítes de teste e CI/CD.
- Fontes oficiais preservadas: `PROMPT_MESTRE.md` e `Paleta_Cores_Curso_IA.pdf`.
- Etapa 01 integrada e publicada em 24/11/2026. A `main` local foi sincronizada por fast-forward com `origin/main` no commit `56a565a2b705c2ca9a0b2a8a718dfe039758fe46`.
- Proteção da `main`: o repositório público permite exigir Pull Request e o check **Validate project** (GitHub Actions), já aprovado no PR. A consulta confirmou acesso administrativo, ausência de proteção de branch e de rulesets. A configuração permanece pendente. Veja [Publicação](DEPLOY.md).
- O erro `ENOSPC` foi resolvido após a liberação de espaço na unidade C:. O lockfile inclui as ferramentas de desenvolvimento. O Node.js LTS 26.13.1 é compartilhado entre desenvolvimento e CI via `.nvmrc`.
- Validação local em 24/11/2026: `npm ci`, lint, Prettier, TypeScript e `git diff --check` aprovados. O Vitest passou em um teste unitário e um de integração. O Playwright passou em desktop e mobile, incluindo abertura e recarga em `/dna-ia/`.
- O build gerou `dist/` com os recursos no caminho previsto para o Pages. A auditoria do npm reportou zero vulnerabilidades conhecidas.
- Alterações desta etapa: aplicação em `src/`, suítes em `tests/`, configurações na raiz, automação e template em `.github/` e documentação permanente.
- Pull Request [#1](https://github.com/Samuelnata2109/dna-ia/pull/1) mesclado em 24/11/2026 às 02h05 (Fortaleza), com o [CI do PR](https://github.com/Samuelnata2109/dna-ia/pull/1/checks) aprovado. O commit inicial da etapa é `447dcee`.
- [Workflow de publicação](https://github.com/Samuelnata2109/dna-ia/actions/runs/45330849082) aprovado no commit integrado. Validação, upload e publicação concluídos com sucesso. O ambiente `github-pages` registrou o deployment `8019188569` como bem-sucedido às 02h06 (Fortaleza).
- [Site publicado](https://samuelnata2109.github.io/dna-ia/) validado com Playwright e Chromium 159.0.8154.6 em desktop (1280 × 720) e emulação de Pixel 7 (412 × 839). O HTML e `/dna-ia/assets/index-9muay2r3.js` responderam HTTP 200 na abertura e na recarga em ambos os perfis. O título e a identificação do curso ficaram visíveis, sem erros de carregamento ou execução e sem rolagem horizontal.

## Etapa 02 — Design System

- Branch: `feature/02-design-system`, criada a partir da `main` em `56a565a`. O registro local da primeira publicação foi preservado no commit `f08a354`.
- As duas páginas do PDF oficial foram renderizadas e revisadas visualmente. A comparação automática confirmou os 27 tokens oficiais descritos no Prompt Mestre. Os arquivos oficiais mantiveram os hashes anteriores.
- Implementação: tokens, fontes locais, Button, Input, Card, Badge, ProgressBar e componentes de layout. A raiz exibe uma demonstração dos componentes em vez de iniciar uma sessão de quiz. Veja [Design System](DESIGN_SYSTEM.md).
- Validação: `npm ci`, lint, Prettier, TypeScript e build passaram. O Vitest aprovou seis testes. O Playwright aprovou seis verificações em desktop e mobile, incluindo foco, alvos de toque, contraste, fontes locais, movimento reduzido e recarga sob `/dna-ia/`. A auditoria npm retornou zero vulnerabilidades conhecidas.
- Revisão visual em Chromium nas larguras de 1440, 412 e 320 px. Fontes, cartões, hierarquia, foco e barras de progresso foram conferidos sem rolagem horizontal.
- Pull Request [#2](https://github.com/Samuelnata2109/dna-ia/pull/2) mesclado em 24/11/2026 às 06h08 (Fortaleza). A `main` local foi sincronizada por fast-forward com `origin/main` no commit `6b7123c4351c5db5aa20b2cbcf235f592ff1ef1f`, que preserva os commits da etapa. Os hashes do Prompt Mestre e do PDF foram preservados.
- [Workflow de publicação](https://github.com/Samuelnata2109/dna-ia/actions/runs/45362398587) aprovado no commit integrado. A validação e a publicação passaram. O ambiente `github-pages` registrou sucesso no deployment `8023356317` em 24/11/2026 às 06h09 (Fortaleza).
- [Demonstração em produção](https://samuelnata2109.github.io/dna-ia/) validada com Playwright em Chromium desktop (1280 × 720) e emulação de Pixel 7 (412 × 839). A página e a recarga, CSS, JavaScript e quatro arquivos WOFF2 retornaram HTTP 200. Press Start 2P 400, Space Grotesk 400 e 700 e JetBrains Mono 400 ficaram carregadas. Os estilos oficiais foram aplicados e a revisão das capturas confirmou a disposição dos componentes. A ação de teste funcionou por teclado e toque, com foco visível no desktop. O campo inválido e a conclusão de progresso mantiveram seus estados acessíveis. Não houve erros no console, falhas de rede ou rolagem horizontal.
- **Orientação para as próximas etapas:** mantenha o verde reservado para conquista e conclusão. Valide a acessibilidade a cada funcionalidade nova, incluindo teclado, foco visível, contraste, nomes e estados acessíveis, toque e movimento reduzido quando aplicável.
- **Próxima etapa:** tela inicial, mediante autorização explícita.
