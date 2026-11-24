# Arquitetura

O DNA:IA é uma aplicação React compilada pelo Vite para arquivos estáticos. O TypeScript está em modo strict. A tela inicial abre em `/dna-ia/` e pode ser recarregada nesse endereço. A demonstração de manutenção do Design System está em `/dna-ia/#design-system`. O fragmento funciona no GitHub Pages sem uma regra de reescrita.

A estrutura evolui com o escopo aprovado. Componentes e telas cuidam da interface. Dados contêm perguntas e perfis com IDs estáveis. O motor recebe as respostas e calcula um resultado determinístico sem depender de React. A persistência local será implementada na etapa correspondente.

Vitest e React Testing Library cobrem comportamento e integração. Playwright abre o build de produção no subdiretório com Chromium desktop e mobile. O CI compartilha as mesmas validações entre os Pull Requests e a publicação em `main`.

## Tela inicial

`WelcomePage` compõe `WelcomeHero`, `NicknameForm` e o SVG decorativo `DnaCore`. O formulário reaproveita `Input` e `Button`, e `nickname.ts` contém a validação pura. O limite de 24 caracteres usa grafemas Unicode via `Intl.Segmenter`; espaços nas extremidades são removidos antes de contar. Acentos combinados e emojis compostos contam como um caractere percebido.

`NicknameForm` chama `onStart(nickname)` uma única vez para um valor válido. `App` cria uma sessão com `createSession` e abre `QuizPage` diretamente na pergunta 01. A recarga inicia uma nova entrada, sem recuperação ou coleta de dados.

O chip de DNA, os circuitos e a rede são SVG inline com cores dos tokens oficiais. As animações CSS de entrada, ativação, fluxo e pulsação têm duração limitada e são removidas com `prefers-reduced-motion`. O texto e os controles aparecem antes da ilustração no fluxo mobile.

## Motor do quiz

`src/data/` guarda as perguntas, perfis e fases oficiais, separados de `src/types/quiz.ts`. `src/engine/` contém funções puras de sessão, embaralhamento, validação, progresso, pontuação e desempate. A regra de nickname foi movida sem alteração de comportamento para `src/utils/nickname.ts`, para uso comum do formulário e da criação de sessão.

O fluxo é: validar nickname → criar sessão e sortear opções uma vez → registrar respostas por IDs estáveis → calcular progresso a partir das respostas → validar conclusão. A sessão guarda a ordem sorteada para que a navegação preserve a apresentação. A pontuação é derivada das respostas, sem contador mutável. Dados corrompidos são rejeitados por inteiro; a persistência e a recuperação local só serão integradas em etapa posterior. Veja [Motor do quiz](QUIZ_ENGINE.md).

## Interface das perguntas

`App` mantém a sessão em memória e passa sua atualização a `QuizPage`. A página mantém apenas a posição e o tipo de tela (pergunta, transição de fase ou conclusão); respostas, fase e XP são derivados da sessão e dos dados oficiais. `QuestionCard` renderiza a imagem local e um `fieldset` de seis radios nativos na ordem de `optionOrder`. A escolha é gravada por ID via `recordAnswer`, podendo substituir outra sem perder as demais. A navegação não avança sem resposta. Após as perguntas 05 e 10, uma transição controlada por botão informa a fase concluída. Após a 15, `validateSession(session, true)` precede a tela de revelação da Etapa 06, sem exibir pontuações internas.

As 15 imagens WebP ficam em `public/images/questions/` com caminho prefixado por `import.meta.env.BASE_URL`, dimensões 1280 × 720 e carregamento sob demanda após a primeira. Consulte [Assets](ASSETS.md). A demonstração em `#design-system` continua acessível. Não há `localStorage` nesta etapa.

## Revelação do resultado

Na Etapa 06, a conclusão provisória foi substituída por `ResultPage`. Após a validação das 15 respostas, essa página obtém o perfil exclusivamente de `getFinalResult(session)`. `ResultReveal` controla a sequência narrativa curta, a opção de pular e a preferência de movimento reduzido. `ProfileDetails` compõe os dados oficiais e os complementos propostos de `profileEditorial.ts`, sem alterar os perfis ou o motor. Apenas a ilustração vencedora é carregada. Veja [Tela de resultado](RESULT_SCREEN.md) e [Propostas editoriais](PROFILE_EDITORIAL.md). A sessão segue em memória; persistência, compartilhamento e reinício pertencem à Etapa 07.
