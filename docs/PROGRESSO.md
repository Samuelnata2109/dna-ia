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
- **Antes da Etapa 02:** validar visualmente as duas páginas do PDF oficial e obter autorização para iniciar o Design System.
