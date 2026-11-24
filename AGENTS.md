# Instruções permanentes do DNA:IA

Consulte este arquivo, `docs/PROGRESSO.md` e `docs/PROMPT_MESTRE.md` antes de qualquer etapa. O Prompt Mestre e `docs/Paleta_Cores_Curso_IA.pdf` são as fontes oficiais. Preserve ambos integralmente e apresente conflitos de requisitos antes de tomar decisões que alterem o projeto.

## Produto e identidade

O DNA:IA divulga o Curso Técnico em Inteligência Artificial da Guiomar para estudantes do 9º ano, principalmente de 13 a 15 anos. O quiz tem 15 perguntas oficiais com seis alternativas cada e três fases. Preserve as respostas e a ordem sorteada ao voltar. Use os pesos e desempates do Prompt, com o resultado entre seis perfis revelado somente após a conclusão. Use linguagem jovem, clara e inclusiva.

Valide visualmente as duas páginas do PDF antes da Etapa 02. Implemente os tokens oficiais nessa etapa. Use azul e marinho como base, violeta como destaque, ciano apenas em fundos escuros e verde para conquistas e conclusão. Evite vermelho e prefira sombras sólidas de 4 a 6 px. Use Press Start 2P em rótulos curtos, Space Grotesk em textos e JetBrains Mono em dados e marcadores.

## Arquitetura e qualidade

Use React, TypeScript strict e Vite. Consulte a versão do Node em `.nvmrc` e use o lockfile com `npm ci`. Adicione dependências somente quando a etapa precisar delas. Separe interface, componentes, dados, motor, estado, persistência e estilos. Mantenha o motor testável sem React e use IDs estáveis. A aplicação funciona localmente no navegador e é publicada em `/dna-ia/`. Evite caminhos de recursos incompatíveis com o subdiretório.

Solicite apenas o nickname, trate-o como texto e mantenha os dados da sessão no dispositivo. Evite serviços externos, rastreamento, segredos e dados pessoais desnecessários. Garanta navegação por teclado, foco visível, contraste, textos alternativos adequados e respeito a movimento reduzido. Valide desktop e mobile e otimize fontes e imagens.

## Fluxo de entrega

1. Aguarde autorização para cada etapa. Inspecione o Git, preserve alterações existentes, confirme a integração da etapa anterior e sincronize a `main` quando for seguro.
2. Use a branch indicada no Prompt e preserve o escopo aprovado. Faça commits Conventional Commits e atualize a documentação permanente, incluindo o progresso e os resultados reais.
3. Valide com instalação limpa, lint, formatação, TypeScript, testes aplicáveis, build, revisão, segurança e `git diff --check`. Registre limitações.
4. Envie a branch e abra ou reaproveite um PR para `main` via GitHub CLI. Informe o link e o CI. Aguarde aprovação antes do merge. Preserve o histórico compartilhado e evite force push e exclusão de branches sem autorização.
5. O deploy ocorre em `main` após validações, via GitHub Actions. Confirme o run e a URL antes de marcar como publicado. Consulte `docs/DEPLOY.md` para proteção e permissões.
