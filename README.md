# DNA:IA

Quiz educativo de afinidade para estudantes de 13 a 15 anos conhecerem áreas de atuação do Curso Técnico em Inteligência Artificial da Guiomar. A jornada tem 15 perguntas, três fases e seis perfis possíveis. O resultado é recreativo e se baseia nas escolhas feitas durante o quiz.

As oito etapas de desenvolvimento foram concluídas. A versão estável **1.0.0** foi publicada em 24 de novembro de 2026 a partir do commit `84b9bfd921c4cc74a14e2901281391ed68a3a47f`. [Jogar no GitHub Pages](https://samuelnata2109.github.io/dna-ia/) · [Release 1.0.0](https://github.com/Samuelnata2109/dna-ia/releases/tag/v1.0.0) · [Validação e deploy](https://github.com/Samuelnata2109/dna-ia/actions/runs/45514610630)

## Desenvolvimento

Use a versão de Node.js indicada em `.nvmrc`, também usada pelo CI.

```sh
npm ci
npm run dev
```

No PowerShell, use `npm.cmd` caso a execução de `npm.ps1` esteja bloqueada. Abra o endereço com o subdiretório `/dna-ia/` informado pelo Vite.

| Comando                | Finalidade                                   |
| ---------------------- | -------------------------------------------- |
| `npm run lint`         | Executar ESLint                              |
| `npm run format:check` | Verificar a formatação                       |
| `npm run format`       | Aplicar Prettier                             |
| `npm run typecheck`    | Verificar TypeScript                         |
| `npm test`             | Executar testes unitários e de integração    |
| `npm run build`        | Gerar `dist/`                                |
| `npm run test:e2e`     | Validar o build em Chromium desktop e mobile |
| `npm run preview`      | Servir o build local de produção             |

Antes do primeiro E2E, execute `npx playwright install chromium` (ou `npx.cmd` no PowerShell) e gere o build.

## Jornada e privacidade

Os níveis Explore, Challenge e Identity contribuem com pesos 1, 2 e 3, respectivamente, totalizando 30 pontos internos. Em empate, vence quem obteve mais pontos em Identity. Se o empate persistir, decide a escolha mais recente associada a um dos perfis empatados. O XP representa apenas a proporção de perguntas respondidas.

O navegador guarda o nickname, as escolhas, a ordem das opções e a posição no quiz. Uma sessão válida pode ser retomada depois de atualizar ou reabrir a página no mesmo navegador. Em caso de bloqueio do armazenamento, a jornada pode continuar na aba atual. Refazer o quiz apaga o progresso salvo após confirmação. O compartilhamento é opcional e inclui somente o codinome, o nome profissional e o link público.

## Estrutura

| Caminho                                        | Conteúdo                                       |
| ---------------------------------------------- | ---------------------------------------------- |
| `src/pages/`, `src/components/`, `src/styles/` | Interface, Design System e estados visuais     |
| `src/data/`, `src/engine/`                     | Conteúdo oficial e regras determinísticas      |
| `src/hooks/`, `src/storage/`, `src/utils/`     | Estado, retomada e compartilhamento            |
| `public/images/`                               | Arte local das perguntas e dos perfis          |
| `tests/`                                       | Testes unitários, de integração e de navegador |
| `docs/`, `.github/`                            | Documentação, CI e publicação                  |

## Publicação e manutenção

O Vite gera `dist/` com base `/dna-ia/`. O workflow de publicação valida o commit integrado à `main` antes de enviar o build ao GitHub Pages. A demonstração pode ser aberta em `/dna-ia/#design-system`.

A validação em produção aprovou 38 testes em Chromium desktop e Pixel 7 emulado. A auditoria móvel de laboratório registrou **68/100** de desempenho e **2,85 s** de TBT. A investigação complementar foi dispensada para este lançamento pelo responsável pelo projeto. A investigação de desempenho, os testes em aparelhos físicos e a avaliação com leitores de tela dedicados ficam como melhorias futuras. [Auditoria e evidências da versão](docs/RELEASE_AUDIT.md)

- [Arquitetura](docs/ARQUITETURA.md), [Motor do quiz](docs/QUIZ_ENGINE.md) e [Resultado](docs/RESULT_SCREEN.md)
- [Sessão e compartilhamento](docs/SESSION_AND_SHARING.md), [Design System](docs/DESIGN_SYSTEM.md) e [Recursos gráficos](docs/ASSETS.md)
- [Progresso](docs/PROGRESSO.md), [Changelog](CHANGELOG.md), [Auditoria da versão](docs/RELEASE_AUDIT.md) e [Publicação](docs/DEPLOY.md)
