# Arquitetura

O DNA:IA é uma aplicação React compilada pelo Vite para arquivos estáticos. A Etapa 01 contém um ponto de entrada, um shell semântico e metadados do projeto. O TypeScript está em modo strict. A aplicação abre em `/dna-ia/` e pode ser recarregada nesse endereço.

A estrutura evolui com o escopo aprovado. Componentes e telas cuidam da interface. Dados contêm perguntas e perfis com IDs estáveis. O motor recebe as respostas e calcula um resultado determinístico sem depender de React. O estado coordena a jornada, e a persistência local mantém a sessão no dispositivo. Dados, motor, estado e interface terão módulos próprios quando forem implementados.

Vitest e React Testing Library cobrem comportamento e integração. Playwright abre o build de produção no subdiretório com Chromium desktop e mobile. O CI compartilha as mesmas validações entre os Pull Requests e a publicação em `main`.
