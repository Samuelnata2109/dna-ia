# Motor do quiz

## Dados oficiais

`src/data/questions.ts` contém as 15 perguntas da seção 10 do [Prompt Mestre](PROMPT_MESTRE.md), em sequência oficial. Cada pergunta conserva número, enunciado, descrição da imagem, seis alternativas e associação A–F aos perfis. Os IDs são `q01` a `q15` e `q01-a` a `q15-f`. A Etapa 05 acrescentou as 15 imagens correspondentes em `public/images/questions/`, documentadas em [Assets](ASSETS.md), sem modificar o banco oficial.

`src/data/profiles.ts` contém os seis codinomes, nomes profissionais, descrições, características, exemplos de projetos e elementos de identidade gráfica da seção 11. A seção exige áreas de atuação e relação com o curso, mas não fornece textos específicos para esses dois campos. Eles dependem de conteúdo aprovado para a futura tela de resultado. Nenhuma ilustração de perfil foi produzida nesta etapa.

| Alternativa | Perfil                                           | ID          |
| ----------- | ------------------------------------------------ | ----------- |
| A           | THE BUILDER — Desenvolvedor de IA                | `builder`   |
| B           | THE DETECTIVE — Analista de Dados                | `detective` |
| C           | THE BRAIN — Especialista em Machine Learning     | `brain`     |
| D           | THE CREATOR — Especialista em IA Generativa      | `creator`   |
| E           | THE MAKER — Especialista em Robótica e Automação | `maker`     |
| F           | THE GUARDIAN — Especialista em IA Responsável    | `guardian`  |

`src/data/levels.ts` define Explore (01–05, peso 1), Challenge (06–10, peso 2) e Identity (11–15, peso 3). A soma dos pesos em uma sessão completa é 30.

## Sessão e respostas

`createSession(nickname, random?)` normaliza o nickname com a mesma regra da tela inicial e sorteia a ordem das seis alternativas de cada pergunta uma vez. O sorteio usa Fisher–Yates; a fonte aleatória pode ser injetada em testes. A sequência das perguntas e as associações das alternativas permanecem fixas.

A sessão contém `version: 1`, `nickname`, `answers` e `optionOrder`. Respostas usam o ID da pergunta como chave e o ID da alternativa como valor. `recordAnswer` substitui a resposta anterior; `removeAnswer`, `getAnswer`, `getAnsweredQuestionIds`, `getPendingQuestionIds` e `getOptionsInSessionOrder` apoiam a navegação futura. As funções retornam novos objetos em vez de alterar a sessão recebida. A ordem sorteada acompanha a sessão e não muda ao retornar a uma pergunta.

`validateSession` **rejeita integralmente** uma sessão inválida. Não há recuperação parcial silenciosa. A validação exige versão, nickname normalizado e válido, 15 listas completas de IDs de alternativas sem duplicações nem associação trocada e respostas referentes a perguntas e alternativas existentes. `getFinalResult` exige as 15 respostas. `validateQuestionBank` verifica também a estrutura e os IDs únicos do catálogo oficial. A persistência e recuperação da sessão no armazenamento local são responsabilidade da Etapa 07; qualquer dado recuperado deverá passar por `validateSession` antes do uso.

## Pontuação, desempate e progresso

`calculateScores` recalcula as pontuações a partir das respostas atuais. Cada resposta soma apenas o peso da própria pergunta ao perfil associado. A função permite pontuações parciais para uso interno, mas a interface não deve mostrar pontos ou perfis antes da conclusão.

`getFinalResult` aceita somente uma sessão validada e completa. Primeiro escolhe a maior pontuação total. Se houver empate, `resolveTie` compara somente os empatados pelos pontos obtidos no Level 03. Se ainda houver empate, percorre as respostas de `q15` até `q01` e escolhe o primeiro perfil do grupo restante. Não há sorteio nem preferência alfabética no resultado.

`calculateProgress` conta perguntas respondidas, indica pendentes, fase ativa, conclusão de cada fase, porcentagem e XP. A porcentagem usa `floor(respondidas / 15 × 100)`: 0%, 33%, 66% e 100% nos marcos principais. XP é igual à porcentagem de progresso e não representa acerto, capacidade ou desempenho. A interface da Etapa 05 usa esse valor na barra visual e nas transições.

## Limite atual

O motor permanece independente de React. START cria a sessão e abre a pergunta 01. A interface usa as funções públicas do motor; nenhum critério de pontuação ou desempate foi alterado. Na Etapa 06, `ResultPage` passou a chamar `getFinalResult(session)` após a conclusão legítima das 15 respostas. A validação do motor precede qualquer resultado; nenhum ponto individual é exibido. Persistência e compartilhamento permanecem para etapas posteriores.
