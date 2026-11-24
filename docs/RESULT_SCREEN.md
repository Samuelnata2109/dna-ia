# Revelação do resultado — Etapa 06

`QuizPage` valida a sessão ao concluir a pergunta 15 e abre `ResultPage`. A página chama exclusivamente `getFinalResult(session)`; o motor realiza a validação completa e determina o perfil. Nenhum ponto ou regra de desempate é calculado em React. Sessões inválidas são rejeitadas antes de produzir qualquer resultado.

`ResultReveal` mostra a confirmação de 15 respostas, três mensagens narrativas em intervalos de 750 ms e libera o resultado em aproximadamente 2,25 segundos. A ação **Pular animação** está disponível durante toda a sequência. `prefers-reduced-motion` revela imediatamente e também reage à alteração da preferência. Os timers são removidos ao desmontar. As mensagens não representam análise por modelo de IA. Não há som, flash intenso ou animação interminável.

`ProfileResult` apresenta a ilustração, codinome, profissão, mensagem com nickname tratado como texto, descrição oficial e conquista. `ProfileDetails` apresenta características e projetos oficiais e os [complementos editoriais aprovados](PROFILE_EDITORIAL.md). O título recebe foco ao abrir o resultado; durante a sequência, as mensagens usam `role="status"`. As seis imagens compartilham o mesmo formato, proporção e tratamento visual. Somente a imagem do perfil vencedor é requisitada, com dimensões explícitas e prioridade de carregamento.

A tela usa os tokens oficiais e CSS/SVG, sem novas dependências. A Etapa 07 acrescenta `ResultActions` com **COMPARTILHAR RESULTADO** e **REFAZER QUIZ**. O compartilhamento usa Web Share ou fallback de cópia, sem nickname ou respostas. O reinício chama o controlador da sessão e exige confirmação de exclusão. Ao continuar um resultado salvo, `skipReveal` apresenta o perfil diretamente. A sessão é persistida localmente pelo hook, sem modificar o motor. Veja [Persistência e compartilhamento](SESSION_AND_SHARING.md).

As seis ilustrações e os complementos editoriais foram aprovados pelo responsável, sem substituição ou reescrita, em 24/11/2026. O aviso recreativo obrigatório acompanha o resultado. Os nomes profissionais são áreas de afinidade, não certificações concedidas pelo quiz.

## Evidências da publicação da Etapa 06

O PR #6 foi mesclado no commit `0bd68834d3b60b06415c6497c431a37c9d8f1016`. O [workflow de publicação](https://github.com/Samuelnata2109/dna-ia/actions/runs/45440830687) concluiu validação e deploy com sucesso. O ambiente `github-pages` registrou o deployment `8034497554` como bem-sucedido em 24/11/2026 às 13h47min43s (Fortaleza), para [DNA:IA](https://samuelnata2109.github.io/dna-ia/).

A versão pública foi validada com Chromium/Playwright em 12 jornadas completas, seis em desktop e seis em emulação de Pixel 7 com toque. As respostas foram mistas (duas escolhas de outro perfil por jornada) e o resultado exibido foi comparado a `getFinalResult(session)` do código integrado, com correspondência em todos os casos. Não houve resultado ou requisição de ilustração de perfil antes da conclusão das 15 perguntas.

- Sequência automática: observadas as mensagens de processamento e desbloqueio e a chegada ao resultado em desktop e mobile.
- Pulo: acionado por Enter no desktop e por toque no mobile, abrindo o resultado com foco no título.
- Movimento reduzido: quatro perfis por dispositivo abriram diretamente o resultado, sem o botão de pulo e com `animation-name: none` na ilustração.
- Conteúdo: codinome, profissão, mensagem com nickname, descrição, características, projetos, os dois textos editoriais e aviso recreativo comparados literalmente aos dados integrados. O nickname `Fênix <b>IA</b>` permaneceu texto literal, sem criar uma tag `b`.
- Recursos: as seis imagens responderam HTTP 200 e seus hashes corresponderam aos arquivos aprovados. Cada resultado requisitou apenas a vencedora. Não houve erros de console, execução, respostas HTTP de erro ou falhas de requisição nas 12 jornadas finais.
- Layout: todos os perfis conferidos em 1440 e 1280 px no desktop e 412, 375 e 320 px no mobile, sem rolagem horizontal. Capturas do Builder em 1440, 412 e 320 px revisadas visualmente, sem sobreposição ou perda de leitura. A abertura e recarga de `/dna-ia/` responderam HTTP 200.

Relatório JSON e capturas locais: `test-results/published-stage06/`, ignorados pelo Git. A primeira tentativa de teste recarregou a página antes de concluir os downloads das fontes, cancelando quatro requisições; a repetição aguardou `document.fonts.ready` antes da recarga e concluiu sem falhas. Nenhum ajuste de código de produto foi necessário. Esta atualização é documentação local sem commit na `main`.
