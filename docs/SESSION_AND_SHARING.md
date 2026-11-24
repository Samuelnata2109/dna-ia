# Persistência, retomada e compartilhamento — Etapa 07

## Formato salvo

A chave local `dna-ia:journey:v1` contém somente `storageVersion: 1`, a sessão oficial (`version`, `nickname`, `answers`, `optionOrder`), `navigation` e `passedMilestones` (0, 1 ou 2 transições já concluídas). Navegação é uma pergunta com índice 0–14, uma transição de fase ou a conclusão confirmada. Não são armazenados pontos, perfil, XP, imagens ou dados pessoais adicionais.

`sessionStorage.ts` valida a sessão integralmente por `validateSession`. Também exige as chaves esperadas, versão compatível, respostas em sequência, limites de navegação e consistência das fases. A conclusão exige 15 respostas e as duas transições passadas. Nenhum dado parcial de um arquivo inválido é recuperado silenciosamente. JSON corrompido, versão incompatível, IDs errados e estados inconsistentes são rejeitados por inteiro.

## Recuperação e salvamento

`useQuizSession` lê sem gravar na montagem. Uma sessão válida abre a escolha **CONTINUAR MINHA JORNADA** ou **COMEÇAR NOVAMENTE**; não há retomada automática. A escolha mostra nickname, respostas, XP e posição, sem revelar perfil. Continuar reutiliza a mesma ordem sorteada e a posição salva. Um resultado já confirmado abre sem repetir a revelação; uma sessão com a resposta 15 selecionada mas ainda sem conclusão confirmada permanece na pergunta 15.

As ações de criação, resposta, substituição, navegação, transição e conclusão validam e gravam o novo registro. Não há efeito de montagem que possa sobrescrever a escolha de recuperação. O estado React usa o mesmo registro validado. O XP e o resultado continuam derivados do motor. `passedMilestones` evita repetir uma transição já concluída ao voltar a uma pergunta anterior.

Se a leitura ou escrita do armazenamento falhar, a experiência continua em memória e informa que fechar ou atualizar pode perder o progresso. Uma gravação malsucedida não é anunciada como salva; pode permanecer no dispositivo a última versão gravada com sucesso. Dados inválidos são mantidos até a confirmação explícita de exclusão. O armazenamento é local ao navegador e à origem; não há envio de respostas ou nickname para servidores.

## Reinício

O diálogo nativo de confirmação informa a exclusão do progresso, começa com foco em **Cancelar**, contém o foco enquanto aberto e aceita Escape. Cancelar restaura o foco ao botão de origem. Confirmar remove somente a chave do DNA:IA e verifica sua ausência. Se a limpeza falhar, o diálogo informa o problema e a sessão atual continua aberta; o reinício não é anunciado como concluído. Após sucesso, a entrada recebe foco no nickname e START cria uma sessão nova, com novo embaralhamento.

## Compartilhamento

`shareResult.ts` produz uma mensagem com codinome, nome profissional e a URL canônica `https://samuelnata2109.github.io/dna-ia/`. Não recebe nickname, respostas nem pontuações. O envio só é iniciado pelo botão, usando Web Share quando disponível. Cancelamento (`AbortError`) recebe feedback próprio. Sem Web Share, usa Clipboard; uma falha real ou indisponibilidade de ambas oferece texto selecionável para cópia manual. Nenhum sucesso de cópia é informado antes da confirmação da API. O botão bloqueia chamadas simultâneas e o feedback usa `role="status"`.

## Recursos e desempenho

Quiz, resultado e demonstração são importados sob demanda com `React.lazy` e fallback acessível. As 21 imagens aprovadas não foram substituídas, recodificadas ou regeneradas. Permanecem WebP com dimensões explícitas, carregamento por pergunta e somente a ilustração vencedora no resultado. O manifesto de testes `tests/fixtures/approved-assets.json` registra seus SHA-256 para verificar integridade sem depender de rede. Não há nova biblioteca ou serviço externo.

Comparação dos arquivos gerados pelo Vite, em kB decimais, com a Etapa 06 publicada (sem simular rede ou atribuir pontuação Lighthouse):

| Recurso                              |            Etapa 06 |            Etapa 07 |
| ------------------------------------ | ------------------: | ------------------: |
| JavaScript de entrada                | 260,85 (81,54 gzip) | 254,60 (80,63 gzip) |
| CSS de entrada                       |   24,73 (5,78 gzip) |   15,68 (3,87 gzip) |
| JavaScript total de todos os módulos |              260,85 |              271,39 |

Os módulos adiados têm 2,81 kB (demonstração), 4,93 kB (quiz) e 9,05 kB (resultado), carregados quando necessários. O total de código inclui as funcionalidades novas; os recursos da entrada ficam menores. As fontes locais e os bytes das 21 imagens foram preservados.
