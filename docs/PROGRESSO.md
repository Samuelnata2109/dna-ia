# Progresso do DNA:IA

## Etapa 01 — Fundação e infraestrutura

- Branch: `feature/01-project-setup`.
- Fundação implementada no código: shell React, TypeScript strict, Vite, configuração de lint, formatação, suítes de teste e CI/CD.
- Fontes oficiais preservadas: `PROMPT_MESTRE.md` e `Paleta_Cores_Curso_IA.pdf`.
- Pages configurado para GitHub Actions. Primeira publicação depende do merge aprovado.
- Proteção da `main` documentada em `DEPLOY.md`, com ativação após o check estar disponível.
- O erro `ENOSPC` foi resolvido após a liberação de espaço na unidade C:. O lockfile inclui as ferramentas de desenvolvimento. O Node.js LTS 26.13.1 é compartilhado entre desenvolvimento e CI via `.nvmrc`.
- Validação local em 24/11/2026: `npm ci`, lint, Prettier, TypeScript e `git diff --check` aprovados. O Vitest passou em um teste unitário e um de integração. O Playwright passou em desktop e mobile, incluindo abertura e recarga em `/dna-ia/`.
- O build gerou `dist/` com os recursos no caminho previsto para o Pages. A auditoria do npm reportou zero vulnerabilidades conhecidas.
- Alterações desta etapa: aplicação em `src/`, suítes em `tests/`, configurações na raiz, automação e template em `.github/` e documentação permanente.
- Pull Request: aguarda abertura para revisão e execução do CI no GitHub.
- **Antes da Etapa 02:** validar visualmente as duas páginas do PDF oficial e obter autorização para iniciar o Design System.
