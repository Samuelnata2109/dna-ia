# Revelação do resultado — Etapa 06

`QuizPage` valida a sessão ao concluir a pergunta 15 e abre `ResultPage`. A página chama exclusivamente `getFinalResult(session)`; o motor realiza a validação completa e determina o perfil. Nenhum ponto ou regra de desempate é calculado em React. Sessões inválidas são rejeitadas antes de produzir qualquer resultado.

`ResultReveal` mostra a confirmação de 15 respostas, três mensagens narrativas em intervalos de 750 ms e libera o resultado em aproximadamente 2,25 segundos. A ação **Pular animação** está disponível durante toda a sequência. `prefers-reduced-motion` revela imediatamente e também reage à alteração da preferência. Os timers são removidos ao desmontar. As mensagens não representam análise por modelo de IA. Não há som, flash intenso ou animação interminável.

`ProfileResult` apresenta a ilustração, codinome, profissão, mensagem com nickname tratado como texto, descrição oficial e conquista. `ProfileDetails` apresenta características e projetos oficiais e os [complementos editoriais propostos](PROFILE_EDITORIAL.md). O título recebe foco ao abrir o resultado; durante a sequência, as mensagens usam `role="status"`. As seis imagens compartilham o mesmo formato, proporção e tratamento visual. Somente a imagem do perfil vencedor é requisitada, com dimensões explícitas e prioridade de carregamento.

A tela usa os tokens oficiais e CSS/SVG, sem novas dependências. Não há coleta, persistência, compartilhamento ou reinício funcional nesta etapa. O espaço para essas ações informa sua disponibilidade futura; não há botões sem função. A sessão permanece em memória no `App`. A integração futura dessas ações pode ser adicionada como callbacks de `ResultPage`, sem alterar o motor.

As ilustrações e os complementos editoriais aguardam aceite no PR. O aviso recreativo obrigatório acompanha o resultado. Os nomes profissionais são áreas de afinidade, não certificações concedidas pelo quiz.
