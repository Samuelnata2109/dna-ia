# Arquitetura

O DNA:IA é uma aplicação React compilada pelo Vite para arquivos estáticos. O TypeScript está em modo strict. A tela inicial abre em `/dna-ia/` e pode ser recarregada nesse endereço. A demonstração de manutenção do Design System está em `/dna-ia/#design-system`. O fragmento funciona no GitHub Pages sem uma regra de reescrita.

A estrutura evolui com o escopo aprovado. Componentes e telas cuidam da interface. Dados contêm perguntas e perfis com IDs estáveis. O motor recebe as respostas e calcula um resultado determinístico sem depender de React. A persistência local e a integração da interface serão implementadas nas etapas correspondentes.

Vitest e React Testing Library cobrem comportamento e integração. Playwright abre o build de produção no subdiretório com Chromium desktop e mobile. O CI compartilha as mesmas validações entre os Pull Requests e a publicação em `main`.

## Tela inicial

`WelcomePage` compõe `WelcomeHero`, `NicknameForm` e o SVG decorativo `DnaCore`. O formulário reaproveita `Input` e `Button`, e `nickname.ts` contém a validação pura. O limite de 24 caracteres usa grafemas Unicode via `Intl.Segmenter`; espaços nas extremidades são removidos antes de contar. Acentos combinados e emojis compostos contam como um caractere percebido.

`NicknameForm` chama `onStart(nickname)` uma única vez para um valor válido. A página guarda o nickname normalizado em memória e alterna entre entrada e destino provisório. A confirmação recebe foco e o retorno restaura o valor e o foco no campo. O destino pode ser substituído pela experiência real quando a interface do quiz estiver disponível. A recarga inicia uma nova entrada, sem recuperação ou coleta de dados.

O chip de DNA, os circuitos e a rede são SVG inline com cores dos tokens oficiais. As animações CSS de entrada, ativação, fluxo e pulsação têm duração limitada e são removidas com `prefers-reduced-motion`. O texto e os controles aparecem antes da ilustração no fluxo mobile.

## Motor do quiz

`src/data/` guarda as perguntas, perfis e fases oficiais, separados de `src/types/quiz.ts`. `src/engine/` contém funções puras de sessão, embaralhamento, validação, progresso, pontuação e desempate. A regra de nickname foi movida sem alteração de comportamento para `src/utils/nickname.ts`, para uso comum do formulário e da criação de sessão.

O fluxo futuro será: validar nickname → criar sessão e sortear opções uma vez → registrar respostas por IDs estáveis → calcular progresso a partir das respostas → validar conclusão → calcular resultado. A sessão guarda a ordem sorteada para que a navegação posterior preserve a apresentação. A pontuação é derivada das respostas, sem contador mutável. Dados corrompidos são rejeitados por inteiro; a persistência e a recuperação local só serão integradas em etapa posterior. Veja [Motor do quiz](QUIZ_ENGINE.md).
