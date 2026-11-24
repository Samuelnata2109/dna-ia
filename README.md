# DNA:IA

Quiz de personalidade para estudantes de 13 a 15 anos conhecerem áreas de atuação do Curso Técnico em Inteligência Artificial da Guiomar.

## Desenvolvimento

Use a versão LTS de Node.js indicada em `.nvmrc`.

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

Antes do primeiro E2E, execute `npx playwright install chromium` (ou `npx.cmd` no PowerShell) e gere o build.

`src/` contém o shell React. `tests/` contém as suítes. `docs/` reúne as fontes oficiais e documentação. `.github/` contém os workflows e o template de PR.

Consulte [Projeto](docs/PROJETO.md), [Arquitetura](docs/ARQUITETURA.md), [Progresso](docs/PROGRESSO.md) e [Publicação](docs/DEPLOY.md).
