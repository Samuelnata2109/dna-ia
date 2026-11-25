# Auditoria da versão 1.0.0

## Escopo

A auditoria pré-lançamento usou a Etapa 07 como referência e a prévia local do build da candidata em `/dna-ia/`. O workflow da Etapa 07 concluiu com sucesso, e o endereço público respondeu com HTTP 200 e `Cache-Control: max-age=600` em 24/11/2026. A versão 1.0.0 foi verificada separadamente após o deploy. [Workflow da Etapa 07](https://github.com/Samuelnata2109/dna-ia/actions/runs/45465809427)

## Revisão de conteúdo e privacidade

- As perguntas, as alternativas, as descrições, os complementos aprovados e o cálculo do motor foram preservados. A mensagem personalizada mantém o formato do Prompt Mestre. `Desenvolvedor` usa a forma masculina presente no título oficial e `Analista` e `Especialista` são substantivos comuns de dois gêneros. O artigo da mensagem concorda com a forma empregada no título, sem inferência sobre o nickname.
- A entrada continua pedindo apenas o nickname, que React renderiza como texto. A sessão armazena versão, nickname, escolhas, ordem das alternativas e posição em `localStorage`. A recuperação valida o envelope e a sessão do motor. A exclusão é confirmada no armazenamento antes de retornar à entrada.
- O compartilhamento começa em uma ação explícita. O texto leva codinome, profissão e URL pública. Em falha do Web Share, tenta a Clipboard API e então oferece cópia manual. `AbortError` encerra a ação antes da cópia. Os testes podem simular as respostas das APIs sem enviar uma mensagem a terceiros.
- O conteúdo, as fontes e os recursos são servidos como arquivos estáticos. Os módulos de interface, persistência e compartilhamento foram revistos quanto a chamadas de rede, rastreamento e uso de segredos.

## Acessibilidade

A referência para a avaliação é a [WCAG 2.2](https://www.w3.org/TR/WCAG22/). O indicador visual de salvamento permanece disponível na página. Já os anúncios programáticos priorizam a retomada e as falhas, e a confirmação de reinício anuncia erros de exclusão no próprio diálogo. O botão de compartilhar mantém o foco enquanto aguarda a resposta do navegador. No fallback manual, o campo rotulado permite seleção por teclado.

Na publicação da Etapa 07, o axe-core identificou contraste de 4,24:1 nos índices azuis das alternativas e de 4,10:1 e 4,48:1 nos rótulos das transições Explore e Challenge. A candidata usa os tons oficiais azul 200 e violeta 200 nesses textos. As razões calculadas com os fundos amostrados são 7,82:1, 7,56:1 e 8,17:1, respectivamente. O azul e o violeta de contornos e símbolos continuam identificando as fases.

- A revisão em Chromium 159 e axe-core 4.14.1 percorreu 32 estados, incluindo entrada, 15 perguntas, marcos, revelação, seis resultados, retomada parcial e completa, reinício, cópia manual, falha de armazenamento e demonstração do Design System. A varredura das telas estáticas em 1440 e 320 px retornou zero violações das regras WCAG A/AA selecionadas.
- A matriz de layout incluiu 1440, 1280, 1024, 768, 412, 375 e 320 px nas telas representativas. Em 768 × 430 px, foi verificada a orientação paisagem. As larguras de 640 e 320 px em uma base de 1280 px foram usadas para simular o reflow de zoom de 200% e 400% na entrada. A interface de entrada também passou pela verificação com fonte raiz a 200% em 768 px. A execução não encontrou rolagem horizontal indevida ou imagens com carregamento ou dimensões inválidas nos estados verificados.
- A análise observou semântica dos controles, rótulos, foco, ordem de teclado e movimento reduzido. A validação de leitor de tela se limita à semântica e aos anúncios no navegador. Um leitor de tela dedicado e aparelhos físicos não foram exercitados. Os testes não certificam conformidade integral com a WCAG.

## Build, caminhos e recursos

- O Vite 8.3.8 gerou `dist/` com base `/dna-ia/`. A prévia verificou o caminho, a recarga em `#design-system`, os recursos locais e a renderização das perguntas e dos resultados. A varredura registrou zero erros de console e zero falhas de rede.
- JavaScript inicial de 254,73 kB (80,66 kB gzip), CSS inicial de 15,81 kB (3,89 kB gzip) e JavaScript total de aproximadamente 271,47 kB, conforme a saída do build validado no PR. Quiz, Design System e resultado têm chunks próprios. O carregamento inicial conserva fontes locais e a ilustração vencedora é resolvida a partir do resultado oficial.
- Os SHA-256 dos 21 WebP coincidem com [o manifesto dos assets aprovados](../tests/fixtures/approved-assets.json). A revisão de diff confirma que o motor, o banco de perguntas, os perfis, os textos complementares, o PDF e o Prompt Mestre foram preservados.

## Desempenho de laboratório

Medição da entrada servida pelo Vite Preview no Windows, com Chromium 159, cache desativado e três navegações frias por perfil. A coluna de deslocamento soma os eventos de layout sem entrada do usuário durante o carregamento. O dispositivo móvel foi um Pixel 7 emulado, com CPU limitada em 4×, latência de 150 ms e download de 200.000 B/s.

| Perfil                | LCP mediano | Deslocamento mediano | Evento load mediano |
| --------------------- | ----------: | -------------------: | ------------------: |
| Desktop em 1440 × 900 |      524 ms |               0,0015 |              337 ms |
| Pixel 7 emulado       |    1.772 ms |               0,0227 |            1.498 ms |

A entrada requisitou JS, CSS e quatro WOFF2 para as três famílias oficiais. As imagens das perguntas e dos perfis são solicitadas durante a jornada. Os valores representam amostras locais, sujeitas à carga do Windows, e não medem INP ou desempenho de campo. Os WebP aprovados foram preservados byte a byte.

O Lighthouse 13.6 também mediu a entrada do build final em Chromium 159 no Windows. O perfil móvel simulado usou viewport de 412 × 823 px, latência de 150 ms, rede de 1.638,4 kbps e CPU limitada em 4×.

| Medição Lighthouse                  | Desempenho | Acessibilidade |    LCP |    CLS | Tempo total de bloqueio |
| ----------------------------------- | ---------: | -------------: | -----: | -----: | ----------------------: |
| Durante restauração de dependências |     64/100 |        100/100 | 854 ms | 0,0240 |                3.999 ms |
| Após a restauração                  |     68/100 |        100/100 | 880 ms | 0,0240 |                2.846 ms |

O tempo de bloqueio elevado permaneceu na repetição, com **68/100** de desempenho e **2,85 s** de TBT. Na primeira medição, as duas tarefas mais longas ficaram sem atribuição a um recurso específico na captura. A medição é de laboratório e a origem do bloqueio continua indeterminada. A nota de acessibilidade cobre as verificações automáticas da tela inicial.

O responsável pelo projeto dispensou a investigação móvel complementar para o lançamento de 24/11/2026. A investigação de desempenho em campo, os testes em aparelhos físicos e a avaliação com leitores de tela dedicados ficam como melhorias futuras. A decisão preserva os resultados medidos e autoriza a publicação da 1.0.0.

Os testes locais identificaram um atraso na revelação com o Windows sob carga. Agora os três estágios são agendados no início da sequência, em 750, 1.500 e 2.250 ms, com cancelamento ao pular ou desmontar. Há uma regressão com relógio simulado que avança diretamente até a revelação e verifica o foco final.

## Instalação e execução dos testes

O Windows bloqueou a remoção do binário do Rolldown em uso pelo Vite na pasta de trabalho. Em uma cópia limpa, `npm ci` instalou 230 pacotes com Node 26.13.1. `npm audit --audit-level=low` retornou zero vulnerabilidades conhecidas. Nenhuma dependência foi acrescentada ao projeto.

As primeiras execuções locais registraram limites de tempo na inicialização de workers do Vitest e durante jornadas no Playwright sob carga. A entrada nos testes de integração do quiz passou a aguardar a importação assíncrona dentro do `act` do React. Os testes mantêm as asserções de primeira pergunta, foco, respostas e progresso. O workflow do PR executa as suítes completas em Linux.

Na primeira execução de Playwright em Windows, 28 de 38 casos passaram. As falhas incluíram tempos limite e a colisão de regiões de status na demonstração. A região de sessão agora pertence à jornada. A validação completa do código no [CI do PR #8](https://github.com/Samuelnata2109/dna-ia/actions/runs/45512292757), no commit `d4ab268`, aprovou 64 testes de Vitest em 14 arquivos e 38 de Playwright em Chromium desktop e Pixel 7 emulado. Também passaram `npm ci`, lint, Prettier, typecheck e build.

## Validação em produção — 24/11/2026

- O commit integrado `84b9bfd921c4cc74a14e2901281391ed68a3a47f` contém a versão `1.0.0` e foi publicado às 21h02min32s (Fortaleza). Os jobs de validação e deploy aprovaram 64 testes de Vitest, incluindo pesos e desempates, e 38 de Playwright, além do build. O HTML público retornou HTTP 200 e referenciou o JavaScript `index-H_BJ4EZ7.js` e o CSS `index-DF8CRTSC.css` gerados pelo workflow. [Workflow de publicação](https://github.com/Samuelnata2109/dna-ia/actions/runs/45514610630) · [Site publicado](https://samuelnata2109.github.io/dna-ia/)
- Os 38 testes de navegador sobre a URL pública foram aprovados em Chromium 159, com desktop e Pixel 7 emulado. A execução durou oito minutos, sem casos pulados, falhas ou retries. Foram exercitados o nickname obrigatório, as 15 perguntas, níveis e XP, a preservação da ordem embaralhada, os seis resultados, a revelação automática e o pulo, movimento reduzido, retomada após recarga ou reabertura da aba, reinício e cancelamento. A recarga em `/dna-ia/`, o Design System e as larguras de 320, 375, 412, 1280 e 1440 px também passaram.
- Web Share e as respostas de falha das APIs foram simulados nos cenários controlados. Em duas verificações adicionais, a Clipboard API do Chromium foi exercitada com permissões de teste. Uma falha simulada do Web Share acionou cópia real, somente com os dados públicos, e um cancelamento simulado preservou a área de transferência. Os fluxos de quiz, resultados e compartilhamento monitorados não registraram erros de console. O monitoramento adicional de compartilhamento também não registrou falhas de rede ou requisições para serviços de terceiros.
- Os 21 WebP públicos corresponderam ao manifesto SHA-256 e os quatro WOFF2 foram baixados com sucesso. Os SHA-256 do Prompt Mestre e do PDF da paleta coincidiram com os valores registrados antes do lançamento. Os testes mobile foram executados por emulação. A investigação de desempenho móvel, os ensaios em aparelhos físicos e a avaliação com leitores de tela dedicados seguem no histórico de melhorias futuras.
