# PROMPT MESTRE DEFINITIVO — DNA:IA

## Quiz interativo de personalidade — Curso Técnico em Inteligência Artificial

**Nome do projeto:** DNA:IA

**Slogan:** Desbloqueie sua identidade tecnológica.

**Instituição:** Guiomar.

---

# 01. PAPEL E RESPONSABILIDADES

Atue como um Engenheiro de Software Sênior especializado em:

- React e TypeScript.
- Arquitetura de software.
- Desenvolvimento frontend.
- UI/UX Design.
- Design System.
- Gamificação.
- Animações e microinterações.
- Desenvolvimento de experiências digitais educacionais.
- Responsividade e acessibilidade.
- Testes automatizados.
- Git e GitHub.
- GitHub Actions.
- CI/CD.
- Segurança e privacidade.
- Otimização de desempenho.

Você será responsável por planejar, desenvolver, testar, documentar, versionar e preparar a publicação do projeto.

Trabalhe de maneira incremental, profissional e organizada.

Não implemente todas as funcionalidades de uma única vez.

Cada etapa deverá possuir objetivos definidos, critérios de aceitação, branch independente, commits organizados, testes e Pull Request.

---

# 02. CONTEXTUALIZAÇÃO DO PROJETO

Estamos desenvolvendo uma aplicação web interativa chamada DNA:IA, destinada à divulgação e apresentação do Curso Técnico em Inteligência Artificial da Guiomar.

O projeto consiste em um quiz de personalidade no qual o jogador responderá a 15 perguntas objetivas de múltipla escolha para descobrir com qual área de atuação da Inteligência Artificial possui maior afinidade.

Cada resposta deverá influenciar diretamente o resultado final.

O resultado deverá permanecer completamente oculto durante toda a experiência, sendo revelado somente após a conclusão das 15 perguntas.

O projeto será inspirado na dinâmica dos quizzes de personalidade do Quizur, combinada com elementos de interfaces de jogos, gamificação e uma identidade visual tecnológica própria.

Não desenvolver uma prova de conhecimentos técnicos.

Não existem respostas certas ou erradas.

O objetivo é explorar interesses, criatividade, curiosidade, raciocínio, preferências e formas de resolver problemas.

---

# 03. PÚBLICO-ALVO

O público-alvo principal é composto por:

- Estudantes do 9º ano do Ensino Fundamental.
- Adolescentes entre 13 e 15 anos.
- Estudantes que estão conhecendo os cursos técnicos.
- Pessoas sem conhecimentos prévios em programação.
- Pessoas que ainda não conhecem as diferentes áreas da Inteligência Artificial.

A experiência deverá ser compreensível mesmo para alguém que nunca utilizou uma ferramenta de Inteligência Artificial.

O quiz deverá despertar curiosidade e interesse pelo curso técnico.

## Diretrizes de comunicação

Utilizar:

- Linguagem jovem e natural.
- Perguntas objetivas.
- Situações imaginativas.
- Alternativas curtas e compreensíveis.
- Humor leve quando apropriado.
- Referências a jogos, tecnologia, escola, redes sociais e ficção científica.

Evitar:

- Linguagem excessivamente formal.
- Gírias forçadas.
- Textos muito longos.
- Termos técnicos sem contextualização.
- Perguntas semelhantes a avaliações escolares.
- Estética infantilizada.
- Linguagem corporativa.
- Perguntas repetitivas ou previsíveis.

O estudante deverá sentir que está participando de uma experiência digital semelhante a um jogo, e não preenchendo um formulário.

---

# 04. CONCEITO CRIATIVO

O conceito central do DNA:IA será a descoberta da identidade tecnológica do jogador.

A experiência deverá transmitir a sensação de que um sistema futurista está analisando suas escolhas para revelar seu perfil dentro do universo da Inteligência Artificial.

A narrativa visual será construída em torno de:

- Identidade digital.
- DNA tecnológico.
- Redes neurais.
- Processamento de informações.
- Sistemas inteligentes.
- Exploração tecnológica.
- Desbloqueio de personagens.
- Descoberta de habilidades.

A narrativa deverá ser leve e não poderá prejudicar a objetividade das perguntas.

O projeto não deverá apresentar aparência de formulário tradicional.

---

# 05. DIREÇÃO ARTÍSTICA

Desenvolver uma identidade visual autoral, combinando:

- Retro futurismo.
- Interfaces de jogos digitais.
- Pixel art em elementos pontuais.
- Design editorial contemporâneo.
- Ilustrações tecnológicas 3D estilizadas.
- Gamificação.
- Elementos gráficos inspirados em circuitos e redes neurais.

A interface deverá possuir acabamento visual semelhante ao de um projeto desenvolvido por uma equipe profissional de design e desenvolvimento.

## Evitar aparência genérica de IA

Não utilizar indiscriminadamente:

- Glassmorphism.
- Gradientes exagerados.
- Sombras desfocadas.
- Efeitos neon em toda a interface.
- Cartões excessivamente arredondados.
- Ícones decorativos sem função.
- Emojis como substitutos de elementos gráficos profissionais.
- Robôs genéricos em todas as telas.
- Layouts repetitivos.
- Textos promocionais genéricos.
- Animações exageradas.
- Excesso de informações simultâneas.

Priorizar:

- Hierarquia visual clara.
- Composições equilibradas.
- Espaçamentos consistentes.
- Tipografia expressiva.
- Elementos gráficos personalizados.
- Microinterações refinadas.
- Contraste adequado.
- Consistência entre todas as telas.
- Identidade visual memorável.

O design deverá ser jovem sem ser infantil e profissional sem ser corporativo.

---

# 06. IDENTIDADE VISUAL OBRIGATÓRIA

Utilizar como fonte oficial o documento:

Paleta_Cores_Curso_IA.pdf

Antes de implementar qualquer interface, analisar integralmente o documento.

Não substituir as cores ou fontes oficiais por escolhas arbitrárias.

## 6.1. Paleta de cores

Implementar os seguintes Design Tokens:

```css
:root {
  /* Base */
  --ia-navy-900: #0B1033;
  --ia-navy-800: #0F1538;
  --ia-blue-900: #1E2A6E;
  --ia-text-2: #3D4766;
  --ia-bg: #F7F8FF;
  --ia-line: #CCD3F0;
  --ia-white: #FFFFFF;

  /* Azul */
  --ia-blue-600: #3B5BDB;
  --ia-blue-400: #5C7CFA;
  --ia-blue-200: #A5B4FC;
  --ia-link-hover: #1E3A8A;

  /* Violeta */
  --ia-violet-700: #6D28D9;
  --ia-violet-600: #7C3AED;
  --ia-violet-500: #8B5CF6;
  --ia-violet-400: #9775FA;
  --ia-violet-200: #C4B5FD;

  /* Ciano */
  --ia-cyan-400: #22D3EE;
  --ia-cyan-200: #67E8F9;

  /* Verde */
  --ia-green-700: #047857;
  --ia-green-800: #15803D;
  --ia-green-600: #16A34A;
  --ia-green-500: #22C55E;
  --ia-green-200: #6EE7B7;

  /* Tipografia */
  --ia-font-pixel: 'Press Start 2P', monospace;
  --ia-font-body: 'Space Grotesk', sans-serif;
  --ia-font-mono: 'JetBrains Mono', monospace;

  /* Sombra */
  --ia-shadow: 4px 4px 0 var(--ia-violet-200);
}
```

## 6.2. Regras obrigatórias de utilização das cores

1. Azul e marinho deverão constituir a base visual do projeto.
2. Violeta deverá ser utilizado como destaque principal.
3. Ciano deverá aparecer exclusivamente sobre fundos escuros.
4. Verde deverá ser reservado para conquistas, conclusão, certificados e indicadores de progresso completo.
5. Não utilizar vermelho na interface.
6. Utilizar sombras sólidas e deslocadas entre 4 e 6 pixels.
7. Não utilizar sombras desfocadas.
8. Respeitar a progressão visual azul, violeta e verde.
9. Utilizar verde na terceira fase somente em elementos associados à conquista e à conclusão.
10. Utilizar os tokens oficiais em vez de repetir valores hexadecimais pelos componentes.

## 6.3. Tipografia

### Press Start 2P

Utilizar exclusivamente em:

- Rótulos curtos.
- Indicadores de fase.
- START.
- LEVEL.
- XP.
- QUEST.
- PROFILE UNLOCKED.
- Elementos relacionados à estética gamer.

Evitar Ó, Í, Ô e Ê nessa fonte, conforme orientação do documento oficial.

Não utilizar essa fonte em parágrafos ou perguntas longas.

### Space Grotesk

Fonte principal do projeto.

Utilizar:

- Peso 700 para títulos e perguntas.
- Peso 400 para textos e descrições.
- Pesos intermediários quando necessário para a hierarquia visual.

### JetBrains Mono

Utilizar em:

- Numeração das perguntas.
- Indicadores de progresso.
- Porcentagens.
- Códigos.
- Marcadores.
- Elementos de processamento digital.

Garantir carregamento otimizado das fontes e fallbacks adequados.

---

# 07. ESTRUTURA DA EXPERIÊNCIA

A experiência será dividida em:

1. Tela inicial.
2. Level 01 — Explore.
3. Transição de fase.
4. Level 02 — Challenge.
5. Transição de fase.
6. Level 03 — Identity.
7. Processamento do resultado.
8. Revelação do perfil profissional.

## Progressão

- Level 01: perguntas 01 a 05.
- Level 02: perguntas 06 a 10.
- Level 03: perguntas 11 a 15.

Cada fase deverá possuir identidade visual própria, mantendo a consistência do Design System.

O quiz deverá ter duração estimada de aproximadamente 3 a 5 minutos, sem limite obrigatório de tempo.

---

# 08. TELA INICIAL

A tela inicial deverá causar uma primeira impressão marcante.

## Elementos obrigatórios

- Identificação do Curso Técnico em Inteligência Artificial.
- Nome DNA:IA.
- Slogan "Desbloqueie sua identidade tecnológica".
- Breve descrição da experiência.
- Campo de texto para inserir nickname.
- Botão de iniciar quiz.
- Informação de que existem 15 perguntas.
- Elementos gráficos relacionados à Inteligência Artificial.

## Direção visual

Utilizar fundo predominantemente azul-marinho.

Explorar elementos como:

- Chip de Inteligência Artificial.
- Redes neurais.
- Circuitos eletrônicos.
- Partículas digitais.
- Formas geométricas.
- Conexões entre nós.
- Linhas de processamento.
- Elementos gráficos flutuantes.

Criar uma composição visual equilibrada e impactante.

A tela inicial deverá possuir animações, mas sem comprometer o desempenho ou a legibilidade.

## Animações

Implementar:

- Entrada suave dos elementos.
- Movimento discreto dos elementos gráficos.
- Pulsação das conexões neurais.
- Circuitos com fluxo de informação.
- Microinterações no campo de nickname.
- Ativação animada do botão START.

## Campo de nickname

O campo deverá:

- Possuir placeholder intuitivo.
- Aceitar nomes e apelidos.
- Remover espaços desnecessários nas extremidades.
- Rejeitar entradas vazias ou compostas apenas por espaços.
- Possuir limite razoável de caracteres.
- Aceitar caracteres acentuados.
- Permitir navegação por teclado.
- Apresentar foco visual acessível.

Não solicitar nome completo, e-mail, telefone, idade ou cadastro.

## Botão de iniciar

O botão deverá permanecer desabilitado enquanto o nickname for inválido.

Quando o jogador inserir um nickname válido:

- Habilitar o botão.
- Executar uma microinteração visual.
- Permitir iniciar a experiência.
- Permitir acionamento pelo teclado.

Não permitir que o quiz seja iniciado sem nickname válido.

---

# 09. INTERFACE DAS PERGUNTAS

Apresentar somente uma pergunta por vez.

## Ordem obrigatória dos elementos

1. Identificação da fase.
2. Número da pergunta.
3. Barra de progresso.
4. Enunciado.
5. Imagem relacionada à pergunta.
6. Alternativas.
7. Botões de navegação.

A imagem deverá estar obrigatoriamente posicionada entre o enunciado e as alternativas.

## Alternativas

Cada pergunta deverá possuir seis alternativas.

O jogador poderá selecionar somente uma alternativa por pergunta.

Cada alternativa deverá:

- Possuir área de clique confortável.
- Apresentar texto objetivo.
- Possuir estado padrão.
- Possuir estado de hover.
- Possuir estado de foco.
- Possuir estado selecionado.
- Possuir identificação acessível.

Ao selecionar uma alternativa, utilizar:

- Mudança de borda.
- Destaque visual.
- Marcador de seleção.
- Microanimação.
- Deslocamento pixelado quando adequado.

Não utilizar vermelho ou verde para indicar respostas certas ou erradas.

## Navegação

Implementar:

- Botão Continuar.
- Botão Voltar.
- Navegação por teclado.
- Transições suaves entre perguntas.

O botão Continuar deverá permanecer desabilitado enquanto nenhuma alternativa estiver selecionada.

Permitir alterar respostas anteriores.

Ao retornar para uma pergunta, preservar a alternativa selecionada e a ordem das opções.

Não duplicar pontuações quando uma resposta for alterada.

---

# 10. BANCO OFICIAL DE PERGUNTAS

Implementar exatamente as 15 perguntas descritas nesta seção.

Cada alternativa está associada internamente a um perfil profissional.

A associação deverá permanecer invisível ao jogador.

A ordem apresentada abaixo corresponde aos seguintes perfis:

- A: Desenvolvedor de IA.
- B: Analista de Dados.
- C: Especialista em Machine Learning.
- D: Especialista em IA Generativa.
- E: Especialista em Robótica e Automação.
- F: Especialista em IA Responsável.

Embaralhar a ordem visual das alternativas no início de cada sessão, mantendo suas associações internas.

Não embaralhar novamente ao retornar para uma pergunta.

## LEVEL 01 — EXPLORE

### QUEST 01

Se você pudesse ter um superpoder tecnológico, qual seria?

A. Criar qualquer aplicativo em segundos.

B. Descobrir padrões que ninguém percebe.

C. Ensinar máquinas a aprender.

D. Transformar minha imaginação em realidade.

E. Controlar robôs e máquinas.

F. Identificar conteúdos falsos e ameaças digitais.

Imagem: superpoderes tecnológicos, hologramas e energia digital.

### QUEST 02

Você entrou em um jogo de mundo aberto. O que faria primeiro?

A. Criaria minhas próprias ferramentas.

B. Exploraria o mapa e seus segredos.

C. Descobriria como os inimigos se comportam.

D. Personalizaria meu personagem e minha base.

E. Construiria máquinas e veículos.

F. Criaria estratégias para proteger minha equipe.

Imagem: cenário de jogo de mundo aberto futurista.

### QUEST 03

Você ganhou um computador superpotente. Como utilizaria?

A. Criaria meu próprio jogo.

B. Investigaria informações interessantes.

C. Faria experimentos com Inteligência Artificial.

D. Criaria animações e personagens.

E. Controlaria dispositivos inteligentes.

F. Investigaria golpes e ameaças virtuais.

Imagem: computador futurista em uma estação tecnológica.

### QUEST 04

Qual desses vídeos você teria mais vontade de assistir?

A. Como um jogo é programado.

B. Mistérios resolvidos através de dados.

C. Como uma máquina aprende a jogar.

D. Como criar filmes utilizando IA.

E. Robôs fazendo coisas impressionantes.

F. Como identificar vídeos falsos feitos por IA.

Imagem: universo de produção audiovisual e tecnologia digital.

### QUEST 05

Se seus amigos precisassem da sua ajuda em um projeto, o que você faria?

A. Organizaria o funcionamento do projeto.

B. Investigaria as informações necessárias.

C. Testaria diferentes possibilidades.

D. Criaria o visual e as ideias.

E. Montaria um protótipo.

F. Verificaria se tudo é seguro e confiável.

Imagem: grupo de estudantes desenvolvendo um projeto tecnológico.

---

## LEVEL 02 — CHALLENGE

### QUEST 06

Sua escola recebeu um laboratório futurista. Qual seria sua primeira invenção?

A. Um aplicativo que facilita a rotina escolar.

B. Um painel que organiza informações da escola.

C. Uma IA que ajuda cada aluno a aprender.

D. Uma ferramenta que cria aulas interativas.

E. Um robô ajudante para a escola.

F. Uma ferramenta que protege os dados dos alunos.

Imagem: laboratório escolar futurista.

### QUEST 07

Uma Inteligência Artificial começou a dar respostas estranhas. O que você faria?

A. Investigaria seu código.

B. Analisaria as respostas anteriores.

C. Testaria novas formas de ensiná-la.

D. Experimentaria perguntas diferentes.

E. Testaria seu funcionamento em um dispositivo.

F. Investigaria se ela poderia causar algum problema.

Imagem: sistema inteligente apresentando respostas inesperadas.

### QUEST 08

Você foi convidado para desenvolver um jogo. Qual parte escolheria?

A. Programar as mecânicas.

B. Analisar o comportamento dos jogadores.

C. Criar inimigos que aprendem.

D. Desenvolver personagens e cenários.

E. Criar máquinas e controles interativos.

F. Garantir a segurança dos jogadores.

Imagem: estúdio de desenvolvimento de jogos.

### QUEST 09

Um robô misterioso apareceu na sua sala. O que mais despertaria sua curiosidade?

A. O programa que controla o robô.

B. As informações que ele consegue coletar.

C. Sua capacidade de aprender.

D. Sua aparência e personalidade.

E. Como suas peças funcionam.

F. Se podemos confiar nele.

Imagem: robô futurista em uma sala de aula.

### QUEST 10

Você tem 24 horas para participar de uma competição tecnológica. Qual projeto escolheria?

A. Um aplicativo inteligente.

B. Uma ferramenta que descobre tendências.

C. Uma IA que reconhece objetos.

D. Um curta-metragem criado com IA.

E. Um robô que completa desafios.

F. Uma ferramenta contra notícias falsas.

Imagem: competição de inovação tecnológica.

---

## LEVEL 03 — IDENTITY

### QUEST 11

Você viajou para o ano de 2050. O que mais gostaria de encontrar?

A. Aplicativos capazes de resolver problemas complexos.

B. Tecnologias que ajudam a prever acontecimentos.

C. Máquinas que aprendem novas habilidades.

D. Experiências digitais impossíveis de imaginar hoje.

E. Robôs ajudando pessoas em todos os lugares.

F. Uma internet mais segura e confiável.

Imagem: cidade futurista no ano de 2050.

### QUEST 12

Se você pudesse melhorar uma rede social usando IA, o que faria?

A. Criaria novas funcionalidades.

B. Descobriria quais conteúdos despertam mais interesse.

C. Ensinaria a IA a recomendar conteúdos melhores.

D. Criaria ferramentas de edição incríveis.

E. Integraria a rede a dispositivos inteligentes.

F. Combateria perfis falsos e golpes.

Imagem: rede social futurista e conexões digitais.

### QUEST 13

Qual desafio faria você perder a noção do tempo?

A. Construir um sistema do zero.

B. Resolver um mistério cheio de pistas.

C. Fazer uma máquina aprender algo novo.

D. Criar um universo com personagens próprios.

E. Montar uma invenção que realmente funciona.

F. Descobrir falhas escondidas em uma tecnologia.

Imagem: estação de trabalho com diferentes desafios tecnológicos.

### QUEST 14

Você criou uma tecnologia que ficou famosa. Por qual motivo gostaria de ser reconhecido?

A. Por facilitar a vida das pessoas.

B. Por descobrir algo que ninguém havia percebido.

C. Por criar uma máquina inovadora que aprende.

D. Por transformar ideias em experiências incríveis.

E. Por construir uma invenção revolucionária.

F. Por tornar o mundo digital mais seguro.

Imagem: apresentação de uma grande invenção tecnológica.

### QUEST 15

Uma equipe futurista precisa de você para sua última missão. Qual responsabilidade assumiria?

A. Construir o sistema da missão.

B. Decifrar as informações recebidas.

C. Ensinar a IA da equipe a enfrentar novos desafios.

D. Imaginar soluções que ninguém pensou.

E. Construir os equipamentos da missão.

F. Proteger a equipe e avaliar os riscos.

Imagem: equipe tecnológica em uma central de operações futurista.

---

# 11. PERFIS PROFISSIONAIS

O quiz deverá possuir exatamente seis resultados possíveis.

Cada perfil deverá possuir:

- Identificador único.
- Codinome.
- Nome profissional.
- Ilustração exclusiva.
- Descrição.
- Características principais.
- Exemplos de projetos.
- Áreas de atuação.
- Relação com o Curso Técnico em Inteligência Artificial.

Nenhum perfil deverá ser apresentado como superior aos demais.

## PERFIL 01 — THE BUILDER

**Desenvolvedor de IA**

Características:

- Raciocínio lógico.
- Organização.
- Resolução de problemas.
- Curiosidade tecnológica.
- Interesse por programação.

Descrição:

Você gosta de transformar ideias em soluções reais. Para você, a tecnologia é uma maneira de criar sistemas, resolver problemas e facilitar a vida das pessoas.

Exemplos de projetos:

- Aplicativos inteligentes.
- Chatbots.
- Assistentes virtuais.
- Sistemas automatizados.

Identidade gráfica:

- Terminais.
- Código.
- Chips.
- Interfaces digitais.

## PERFIL 02 — THE DETECTIVE

**Analista de Dados**

Características:

- Curiosidade.
- Observação.
- Investigação.
- Pensamento analítico.
- Atenção aos detalhes.

Descrição:

Você gosta de investigar informações, descobrir padrões e encontrar respostas que outras pessoas ainda não perceberam.

Exemplos de projetos:

- Dashboards.
- Análise de tendências.
- Visualização de informações.
- Sistemas de apoio à decisão.

Identidade gráfica:

- Gráficos.
- Dados.
- Lentes digitais.
- Conexões entre informações.

## PERFIL 03 — THE BRAIN

**Especialista em Machine Learning**

Características:

- Pensamento experimental.
- Curiosidade científica.
- Raciocínio analítico.
- Persistência.
- Interesse em aprendizagem de máquinas.

Descrição:

Você gosta de descobrir como as coisas funcionam, testar possibilidades e encontrar maneiras de fazer máquinas aprenderem e evoluírem.

Exemplos de projetos:

- Reconhecimento de imagens.
- Sistemas de recomendação.
- Modelos de previsão.
- Classificação inteligente.

Identidade gráfica:

- Redes neurais.
- Cérebros digitais.
- Nós conectados.
- Processamento de informações.

## PERFIL 04 — THE CREATOR

**Especialista em IA Generativa**

Características:

- Criatividade.
- Imaginação.
- Inovação.
- Expressão visual.
- Experimentação.

Descrição:

Você enxerga a tecnologia como uma ferramenta para transformar sua imaginação em realidade. Gosta de criar novas experiências e explorar possibilidades diferentes.

Exemplos de projetos:

- Geração de imagens.
- Produção audiovisual.
- Criação de personagens.
- Ferramentas criativas com IA.

Identidade gráfica:

- Formas abstratas.
- Hologramas.
- Elementos de criação digital.
- Composições visuais futuristas.

## PERFIL 05 — THE MAKER

**Especialista em Robótica e Automação**

Características:

- Praticidade.
- Criatividade técnica.
- Experimentação.
- Construção.
- Interesse em dispositivos.

Descrição:

Você gosta de colocar ideias em prática, construir invenções e conectar o mundo digital ao mundo físico.

Exemplos de projetos:

- Robôs inteligentes.
- Automação residencial.
- Dispositivos interativos.
- Sistemas com sensores.

Identidade gráfica:

- Braços robóticos.
- Engrenagens.
- Circuitos.
- Componentes eletrônicos.

## PERFIL 06 — THE GUARDIAN

**Especialista em IA Responsável**

Características:

- Pensamento crítico.
- Responsabilidade.
- Observação.
- Estratégia.
- Preocupação com impactos sociais.

Descrição:

Você acredita que a tecnologia deve ser utilizada de maneira segura, justa e responsável. Gosta de investigar riscos e encontrar maneiras de tornar os sistemas mais confiáveis.

Exemplos de projetos:

- Ferramentas contra desinformação.
- Avaliação de sistemas de IA.
- Proteção de informações.
- Identificação de conteúdos manipulados.

Identidade gráfica:

- Escudos digitais.
- Cadeados.
- Sistemas de verificação.
- Redes protegidas.

Os nomes profissionais representam áreas de afinidade e possibilidades de aprendizagem, não títulos ou certificações concedidos pelo quiz.

---

# 12. MOTOR DE PONTUAÇÃO

Implementar um motor de pontuação determinístico, independente da interface.

## Pesos

- Perguntas 01 a 05: peso 1.
- Perguntas 06 a 10: peso 2.
- Perguntas 11 a 15: peso 3.

Pontuação total distribuída entre os perfis: 30 pontos.

Cada alternativa deverá possuir um identificador estável e uma associação com um perfil.

O resultado deverá ser calculado exclusivamente com base nas respostas selecionadas.

Não utilizar inteligência artificial generativa para decidir o resultado.

Não escolher resultados aleatoriamente.

## Alteração de respostas

Armazenar as respostas por identificador da pergunta.

Recalcular a pontuação a partir das respostas armazenadas.

Não acumular pontos permanentemente a cada clique.

Isso deverá impedir duplicações quando o jogador retornar e alterar uma resposta.

## Critérios de desempate

Aplicar na seguinte ordem:

1. Maior pontuação total.
2. Maior pontuação obtida na terceira fase entre os perfis empatados.
3. Analisar as respostas em ordem inversa, da pergunta 15 até a pergunta 01, selecionando o primeiro perfil pertencente ao grupo ainda empatado.

Garantir que o mesmo conjunto de respostas sempre produza o mesmo resultado.

## Validações

Não permitir calcular ou apresentar o resultado quando:

- Existirem perguntas sem resposta.
- Existirem respostas inválidas.
- O estado da sessão estiver corrompido.
- O nickname estiver inválido.

Implementar testes unitários para todos os perfis, pesos, desempates e alterações de respostas.

---

# 13. SISTEMA DE GAMIFICAÇÃO

Implementar uma experiência de progressão baseada em XP.

O XP deverá representar exclusivamente o progresso do jogador, e não seu nível de inteligência ou desempenho.

## Progressão

- Início: 0%.
- Conclusão do Level 01: aproximadamente 33%.
- Conclusão do Level 02: aproximadamente 66%.
- Conclusão do Level 03: 100%.

Utilizar:

- Barra de progresso animada.
- Indicadores de fase.
- Numeração das perguntas.
- Mensagens de conclusão.
- Transições entre níveis.
- Microinterações de seleção.
- Elementos visuais de conquista.

## Transições entre fases

Ao concluir cada conjunto de cinco perguntas, apresentar uma transição curta com:

- Identificação da fase concluída.
- Atualização do XP.
- Mensagem de progresso.
- Apresentação da próxima fase.

As transições deverão ser rápidas e não poderão tornar a experiência cansativa.

Não implementar:

- Rankings entre estudantes.
- Perda de pontos.
- Punições.
- Cronômetros obrigatórios.
- Sistemas de recompensas aleatórias.
- Mecanismos manipulativos de engajamento.

---

# 14. IMAGENS E ELEMENTOS GRÁFICOS

Cada uma das 15 perguntas deverá possuir uma imagem exclusiva relacionada ao seu contexto.

Os seis perfis profissionais também deverão possuir ilustrações exclusivas.

## Direção artística das imagens

Utilizar uma estética consistente, inspirada em:

- Arte conceitual de jogos.
- Ilustrações tecnológicas.
- Renderizações 3D estilizadas.
- Retro futurismo.
- Cenários digitais.
- Tons oficiais de azul e violeta.

As imagens deverão possuir acabamento profissional e ser interessantes para adolescentes.

Não utilizar imagens infantis, genéricas ou visualmente desconectadas.

As imagens das perguntas não deverão destacar uma alternativa específica nem revelar o perfil associado a ela.

## Requisitos técnicos

- Preferir proporção 16:9 nas imagens das perguntas.
- Utilizar proporção consistente nas ilustrações dos perfis.
- Priorizar WebP, AVIF ou SVG quando adequado.
- Otimizar tamanho e resolução.
- Definir dimensões para evitar mudanças inesperadas de layout.
- Implementar textos alternativos adequados.
- Implementar carregamento otimizado.
- Evitar requisições desnecessárias.
- Não depender de URLs externas instáveis.

Organizar os arquivos localmente:

```text
public/images/
├── questions/
│   ├── question-01.webp
│   ├── question-02.webp
│   ├── ...
│   └── question-15.webp
├── profiles/
│   ├── the-builder.webp
│   ├── the-detective.webp
│   ├── the-brain.webp
│   ├── the-creator.webp
│   ├── the-maker.webp
│   └── the-guardian.webp
└── graphics/
```

Caso as imagens definitivas não estejam disponíveis, implementar placeholders locais com a proporção correta e registrar a pendência.

Não afirmar que imagens definitivas foram produzidas quando não foram.

Não utilizar imagens sem autorização de uso adequada.

---

# 15. PROCESSAMENTO E REVELAÇÃO DO RESULTADO

Após a resposta da última pergunta, iniciar uma sequência curta de revelação.

A sequência deverá transmitir a sensação de que um sistema está processando as escolhas do jogador.

## Etapas da animação

1. Finalização da última pergunta.
2. Preenchimento da barra de XP até 100%.
3. Animação de processamento digital.
4. Escaneamento visual.
5. Mensagem de conclusão.
6. Revelação do codinome.
7. Entrada animada da ilustração.
8. Apresentação do perfil profissional.

Possíveis mensagens:

- ANALISANDO ESCOLHAS...
- PROCESSANDO PERFIL...
- IDENTIDADE DESBLOQUEADA.
- PROFILE UNLOCKED.

As mensagens são elementos narrativos da interface. Não afirmar que existe uma análise por IA real quando o resultado é calculado por um algoritmo de pontuação.

A sequência deverá ser curta, fluida e compatível com dispositivos móveis.

Respeitar prefers-reduced-motion.

---

# 16. TELA FINAL

A tela final deverá ser o momento de maior impacto visual da experiência.

Inspirar-se em telas de desbloqueio de personagens de jogos digitais.

## Elementos obrigatórios

- Indicador de conclusão de 100%.
- Codinome do perfil.
- Ilustração exclusiva.
- Nome profissional.
- Nickname do jogador.
- Mensagem personalizada.
- Descrição do perfil.
- Principais características.
- Exemplos de projetos.
- Relação com o Curso Técnico em Inteligência Artificial.
- Botão para compartilhar.
- Botão para refazer o quiz.

## Mensagem obrigatória

"Parabéns, [nickname], você tem todas as características de um [tipo de Técnico em IA]."

Exemplo:

"Parabéns, Player01, você tem todas as características de um Desenvolvedor de IA."

Realizar ajustes gramaticais quando necessários.

## Direção visual

- Fundo azul-marinho.
- Destaques em violeta.
- Ciano exclusivamente sobre fundo escuro.
- Verde nos indicadores de conquista.
- Ilustração profissional em destaque.
- Tipografia expressiva.
- Composição inspirada em cartões de personagens.
- Animações de revelação.

Apresentar discretamente a informação:

"Este resultado é uma descoberta recreativa baseada nos seus interesses e escolhas."

Não apresentar o resultado como avaliação psicológica, certificação profissional ou determinação de carreira.

---

# 17. COMPARTILHAMENTO

Implementar compartilhamento opcional do resultado.

Quando disponível, utilizar a Web Share API.

Implementar fallback para copiar uma mensagem ou o endereço do quiz.

A mensagem poderá conter:

"Descobri meu DNA tecnológico! Meu perfil é THE CREATOR — Especialista em IA Generativa. Descubra o seu também!"

Não incluir automaticamente o nickname em URLs públicas.

Não publicar resultados sem ação explícita do jogador.

Não exigir integração com redes sociais ou autenticação.

---

# 18. RESPONSIVIDADE

Desenvolver utilizando abordagem mobile-first.

Considerar que grande parte do público utilizará smartphones.

Garantir funcionamento em:

- Smartphones pequenos.
- Smartphones maiores.
- Tablets.
- Notebooks.
- Computadores desktop.

## Requisitos

- Ausência de rolagem horizontal indevida.
- Botões com áreas de toque confortáveis.
- Textos legíveis.
- Imagens proporcionais.
- Alternativas facilmente selecionáveis.
- Navegação acessível.
- Layout adaptado ao tamanho da tela.
- Compatibilidade com diferentes orientações.
- Ausência de elementos sobrepostos.

Em smartphones, priorizar a pergunta, a imagem e as alternativas.

Em computadores, aproveitar o espaço disponível sem esticar excessivamente o conteúdo.

Não desenvolver simplesmente uma versão desktop reduzida para celular.

---

# 19. ACESSIBILIDADE

Implementar:

- HTML semântico.
- Navegação completa por teclado.
- Indicadores de foco visíveis.
- Labels associados aos campos.
- Grupos de alternativas semanticamente corretos.
- Textos alternativos nas imagens.
- Contraste adequado.
- Suporte a leitores de tela.
- Suporte a prefers-reduced-motion.
- Feedback acessível de progresso.
- Estados desabilitados compreensíveis.
- Áreas de interação confortáveis.

Buscar conformidade com WCAG 2.2 nível AA nos critérios aplicáveis.

Não utilizar apenas cores para comunicar estados.

Não utilizar animações com flashes intensos.

Não permitir que animações impeçam o acesso às funcionalidades.

---

# 20. PRIVACIDADE E SEGURANÇA

Considerando que o público-alvo inclui menores de idade:

- Solicitar somente nickname.
- Não exigir cadastro.
- Não solicitar nome completo.
- Não solicitar e-mail.
- Não solicitar telefone.
- Não solicitar localização.
- Não coletar informações pessoais em servidores.
- Não implementar publicidade.
- Não implementar rastreamento comportamental.
- Não utilizar ferramentas de analytics sem autorização específica.
- Não enviar respostas para serviços externos.

O quiz deverá funcionar inteiramente no navegador.

Utilizar armazenamento local apenas para recuperação do progresso.

Não armazenar informações desnecessárias.

Permitir apagar o progresso ao reiniciar.

Validar os dados recuperados do armazenamento local.

Tratar o nickname como texto, nunca como HTML executável.

Não incluir segredos, tokens ou credenciais no frontend ou no repositório.

---

# 21. STACK TECNOLÓGICA

Utilizar preferencialmente:

- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- Motion.
- Lucide React.
- Zustand.
- Vitest.
- React Testing Library.
- Playwright.
- ESLint.
- Prettier.
- Git.
- GitHub.
- GitHub Actions.
- GitHub Pages.

Antes de instalar dependências, avaliar sua real necessidade.

Não instalar bibliotecas redundantes.

Utilizar SVG e CSS para animações simples.

Utilizar Motion quando houver necessidade de animações mais complexas.

Não utilizar Three.js apenas para produzir efeitos decorativos que podem ser obtidos com soluções mais leves.

O projeto deverá funcionar sem:

- Backend.
- Banco de dados remoto.
- APIs de Inteligência Artificial.
- Serviços pagos.
- Servidores próprios.

---

# 22. ARQUITETURA DO SOFTWARE

Separar responsabilidades entre:

- Interface.
- Componentes reutilizáveis.
- Banco de perguntas.
- Definições dos perfis.
- Motor de pontuação.
- Gerenciamento de estado.
- Persistência.
- Animações.
- Estilos.
- Testes.
- Configuração de infraestrutura.

Evitar componentes excessivamente grandes.

Não concentrar toda a aplicação em App.tsx.

Utilizar TypeScript em modo strict.

Evitar any sem justificativa.

Utilizar identificadores estáveis para perguntas, alternativas e perfis.

Separar a lógica de negócio da interface.

O motor de pontuação deverá poder ser testado independentemente dos componentes React.

---

# 23. ESTRUTURA DE DIRETÓRIOS

Utilizar a seguinte estrutura como referência, adaptando-a quando houver justificativa técnica:

```text
dna-ia/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── deploy.yml
│   └── pull_request_template.md
├── public/
│   ├── images/
│   │   ├── questions/
│   │   ├── profiles/
│   │   └── graphics/
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── quiz/
│   │   ├── animations/
│   │   ├── feedback/
│   │   └── layout/
│   ├── pages/
│   │   ├── Welcome/
│   │   ├── Quiz/
│   │   └── Result/
│   ├── data/
│   │   ├── questions.ts
│   │   └── profiles.ts
│   ├── engine/
│   │   ├── scoring.ts
│   │   └── tieBreaker.ts
│   ├── hooks/
│   ├── store/
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   └── animations.css
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── Paleta_Cores_Curso_IA.pdf
│   ├── PROJETO.md
│   ├── DESIGN_SYSTEM.md
│   ├── ARQUITETURA.md
│   ├── QUIZ_ENGINE.md
│   ├── ASSETS.md
│   ├── PROGRESSO.md
│   └── DEPLOY.md
├── AGENTS.md
├── README.md
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
└── .gitignore
```

Não criar arquivos vazios ou estruturas desnecessárias apenas para reproduzir a árvore.

---

# 24. GERENCIAMENTO DE ESTADO

O estado da aplicação deverá controlar:

- Nickname.
- Sessão atual.
- Pergunta atual.
- Fase atual.
- Respostas selecionadas.
- Ordem embaralhada das alternativas.
- Progresso.
- Estado de conclusão.
- Resultado final.
- Recuperação de sessão.

Persistir somente os dados necessários.

Ao recarregar a página, permitir recuperar uma sessão válida.

Oferecer opção para continuar ou iniciar uma nova experiência.

Ao reiniciar, limpar corretamente os dados da sessão anterior.

Impedir que estados inválidos produzam resultados incorretos.

---

# 25. ANIMAÇÕES E MICROINTERAÇÕES

Implementar animações nos seguintes momentos:

## Tela inicial

- Entrada do título.
- Movimento dos elementos gráficos.
- Fluxo dos circuitos.
- Pulsação das redes neurais.
- Ativação do botão START.

## Perguntas

- Entrada da imagem.
- Transição entre perguntas.
- Seleção de alternativas.
- Atualização da barra de XP.
- Feedback visual dos botões.

## Fases

- LEVEL COMPLETE.
- Atualização do progresso.
- Apresentação da próxima fase.

## Resultado

- Processamento digital.
- Escaneamento.
- Desbloqueio do perfil.
- Entrada da ilustração.
- Revelação do codinome.
- Partículas de conquista.

Priorizar animações baseadas em transform e opacity quando adequado.

Evitar animações que provoquem travamentos ou alterações constantes de layout.

Respeitar configurações de movimento reduzido.

Não sacrificar desempenho em favor de efeitos visuais.

---

# 26. DESEMPENHO

O projeto deverá funcionar adequadamente em smartphones de entrada e intermediários.

Implementar:

- Otimização de imagens.
- Carregamento antecipado dos recursos essenciais.
- Carregamento sob demanda quando necessário.
- Redução de dependências.
- Otimização das fontes.
- Divisão de código quando houver benefício.
- Controle de animações.
- Redução de renderizações desnecessárias.
- Build de produção otimizado.

Buscar bons resultados nas métricas do Lighthouse, especialmente em desempenho e acessibilidade.

Registrar resultados efetivamente medidos, sem inventar pontuações.

---

# 27. TESTES AUTOMATIZADOS

Implementar testes unitários, de integração e end-to-end.

## Testes obrigatórios do motor

- Existência de exatamente 15 perguntas.
- Existência de exatamente seis perfis.
- Seis alternativas válidas por pergunta.
- Identificadores únicos.
- Associação correta entre alternativas e perfis.
- Aplicação correta dos pesos.
- Resultado determinístico.
- Funcionamento dos critérios de desempate.
- Alteração de respostas.
- Ausência de duplicação de pontos.
- Rejeição de sessões incompletas.
- Possibilidade de obter todos os seis resultados.

## Testes da interface

- Botão START desabilitado sem nickname.
- Botão START habilitado com nickname válido.
- Navegação entre perguntas.
- Seleção única de alternativas.
- Botão Continuar desabilitado sem resposta.
- Preservação de respostas ao voltar.
- Atualização correta do progresso.
- Preservação da ordem das alternativas.
- Resultado oculto até a última pergunta.
- Mensagem final com nickname.
- Reinício da experiência.
- Recuperação de sessão.

## Testes end-to-end

Simular:

- Jornada completa do jogador.
- Fluxo em dispositivo móvel.
- Fluxo em desktop.
- Alteração de respostas.
- Recarregamento da página.
- Conclusão dos seis perfis.
- Compartilhamento com fallback.
- Navegação por teclado.
- Funcionamento no ambiente de produção.

---

# 28. ETAPAS OFICIAIS DE IMPLEMENTAÇÃO

O projeto deverá ser desenvolvido em oito etapas.

Não iniciar uma nova etapa sem autorização.

## ETAPA 01 — Fundação e infraestrutura

Branch:

feature/01-project-setup

Objetivos:

- Analisar o repositório.
- Configurar React, TypeScript e Vite.
- Configurar dependências essenciais.
- Configurar lint e formatação.
- Configurar testes.
- Criar documentação inicial.
- Criar AGENTS.md.
- Configurar GitHub Actions.
- Preparar GitHub Pages.
- Realizar primeiro build e publicação após aprovação do PR.

## ETAPA 02 — Design System

Branch:

feature/02-design-system

Objetivos:

- Analisar o PDF oficial.
- Implementar Design Tokens.
- Configurar tipografia.
- Criar componentes reutilizáveis.
- Implementar botões.
- Implementar campos de texto.
- Implementar cartões.
- Implementar indicadores de progresso.
- Definir estados de interação.
- Validar contraste e responsividade.

## ETAPA 03 — Tela inicial

Branch:

feature/03-welcome-screen

Objetivos:

- Desenvolver composição visual.
- Implementar identidade DNA:IA.
- Criar elementos gráficos.
- Implementar animações.
- Implementar campo de nickname.
- Implementar validação.
- Implementar botão START.
- Validar experiência mobile e desktop.

## ETAPA 04 — Motor do quiz

Branch:

feature/04-quiz-engine

Objetivos:

- Implementar as 15 perguntas oficiais.
- Implementar os seis perfis.
- Criar tipos de dados.
- Implementar pontuação.
- Implementar desempates.
- Implementar embaralhamento.
- Implementar gerenciamento de respostas.
- Implementar testes unitários.

## ETAPA 05 — Interface das perguntas

Branch:

feature/05-quiz-interface

Objetivos:

- Desenvolver tela de perguntas.
- Implementar imagens.
- Implementar alternativas.
- Implementar navegação.
- Implementar barra de XP.
- Implementar as três fases.
- Implementar transições.
- Validar responsividade.

## ETAPA 06 — Revelação do resultado

Branch:

feature/06-result-screen

Objetivos:

- Desenvolver animação de processamento.
- Implementar revelação do perfil.
- Desenvolver os seis resultados.
- Implementar mensagem personalizada.
- Implementar ilustrações dos perfis.
- Implementar tela de conquista.
- Validar todos os resultados.

## ETAPA 07 — Experiência complementar

Branch:

feature/07-user-experience

Objetivos:

- Implementar recuperação de sessão.
- Implementar reinício.
- Implementar compartilhamento.
- Refinar acessibilidade.
- Refinar microinterações.
- Otimizar imagens.
- Melhorar desempenho.

## ETAPA 08 — Refinamento e lançamento

Branch:

feature/08-production-release

Objetivos:

- Revisar toda a interface.
- Corrigir inconsistências.
- Substituir placeholders pendentes.
- Validar identidade visual.
- Executar testes completos.
- Realizar auditoria de acessibilidade.
- Realizar auditoria de desempenho.
- Validar GitHub Pages.
- Finalizar documentação.
- Preparar versão 1.0.0.

---

# 29. REGRAS OBRIGATÓRIAS DE GIT E GITHUB

Utilizar desenvolvimento baseado em branches independentes.

A branch main deverá representar a versão estável e publicável.

Não implementar funcionalidades diretamente na main.

## Antes de iniciar cada etapa

1. Inspecionar o estado atual do repositório.
2. Executar git status.
3. Identificar alterações locais existentes.
4. Ler AGENTS.md.
5. Ler docs/PROGRESSO.md.
6. Verificar se a etapa anterior foi integrada.
7. Sincronizar a main quando for seguro.
8. Criar a branch correspondente à etapa.
9. Apresentar o plano de implementação.

Não descartar alterações existentes do usuário.

Não iniciar uma etapa a partir de uma branch desatualizada.

## Durante a implementação

- Realizar commits organizados.
- Utilizar Conventional Commits.
- Evitar commits com alterações não relacionadas.
- Manter documentação atualizada.
- Executar testes progressivamente.
- Revisar o próprio código.

Exemplos:

```text
feat: implement nickname validation
feat: add quiz scoring engine
fix: correct mobile question layout
style: apply official design tokens
test: cover profile tie-breaking
docs: update project progress
ci: configure GitHub Pages deployment
```

## Ao finalizar cada etapa

Executar obrigatoriamente:

1. Instalação reproduzível de dependências.
2. Lint.
3. Verificação de tipos.
4. Testes unitários.
5. Testes de integração aplicáveis.
6. Testes end-to-end aplicáveis.
7. Build de produção.
8. git diff --check.
9. Revisão das alterações.
10. Atualização da documentação.
11. Commit.
12. Push da branch.
13. Criação automática do Pull Request.

Utilizar GitHub CLI ou integração autorizada para abrir o PR.

O Pull Request deverá ter como destino a branch main.

Não abrir PR duplicado para a mesma etapa.

Caso já exista um PR correspondente, atualizá-lo através da branch existente.

## Restrições

- Não realizar merge sem aprovação.
- Não utilizar force push.
- Não executar operações destrutivas.
- Não excluir branches sem autorização.
- Não alterar histórico compartilhado.
- Não simular commits, pushes ou PRs.
- Não declarar testes aprovados sem executá-los.

Se não houver permissões suficientes, informar exatamente o impedimento.

---

# 30. PULL REQUESTS AUTOMÁTICOS

Cada etapa deverá resultar em um Pull Request próprio.

Criar um template contendo:

## Resumo

Descrição objetiva da implementação.

## Funcionalidades implementadas

Lista das funcionalidades entregues.

## Alterações técnicas

Arquivos, componentes e decisões relevantes.

## Testes executados

Comandos e resultados reais.

## Validação visual

Informações sobre os layouts mobile e desktop, quando aplicável.

## Pendências

Problemas conhecidos e funcionalidades não implementadas.

## Checklist

- [ ] Identidade visual respeitada.
- [ ] Código revisado.
- [ ] Lint aprovado.
- [ ] TypeScript aprovado.
- [ ] Testes aprovados.
- [ ] Build aprovado.
- [ ] Documentação atualizada.
- [ ] Responsividade validada quando aplicável.
- [ ] Nenhum segredo incluído.
- [ ] Pronto para revisão.

Preencher os itens de acordo com as verificações efetivamente realizadas.

Informar ao usuário o link real do Pull Request criado.

---

# 31. CI/CD COM GITHUB ACTIONS

Configurar integração contínua e publicação automática desde a primeira etapa.

Criar:

```text
.github/workflows/ci.yml
.github/workflows/deploy.yml
```

## Workflow de CI

Executar automaticamente:

- Na abertura de Pull Requests.
- Na atualização de Pull Requests.
- Em alterações relevantes na main.

Etapas:

1. Checkout do repositório.
2. Configuração de uma versão LTS compatível do Node.js.
3. Configuração de cache.
4. Instalação utilizando npm ci.
5. Lint.
6. Verificação de tipos.
7. Testes unitários.
8. Testes de integração aplicáveis.
9. Testes end-to-end quando configurados.
10. Build de produção.

O workflow deverá falhar caso alguma validação obrigatória falhe.

Configurar ou documentar a proteção da branch main com verificações obrigatórias, conforme as permissões e recursos disponíveis no repositório.

## Workflow de deploy

O deploy deverá acontecer automaticamente após a integração de uma etapa aprovada à main.

O workflow de publicação deverá executar ou depender explicitamente das validações obrigatórias antes de publicar.

Não permitir que um workflow independente publique uma versão cujo CI tenha falhado.

Utilizar as Actions oficiais do GitHub Pages para:

- Configuração do Pages.
- Upload do artefato.
- Publicação.

Configurar:

- Permissões mínimas necessárias.
- Ambiente github-pages.
- Controle de concorrência.
- Build de produção.
- Publicação da pasta dist.
- Dependência entre validação, build e deploy.

Não publicar branches de funcionalidades diretamente no endereço oficial de produção.

A abertura do PR deverá disparar a validação automática.

O merge aprovado deverá disparar a publicação automática.

---

# 32. CONFIGURAÇÃO DO GITHUB PAGES

O projeto será hospedado utilizando GitHub Pages com GitHub Actions.

Garantir compatibilidade com endereços no formato:

https://usuario.github.io/nome-do-repositorio/

Configurar corretamente o base path do Vite.

Não assumir que o projeto será hospedado na raiz do domínio.

Garantir funcionamento de:

- Imagens.
- Fontes.
- Arquivos CSS.
- Scripts JavaScript.
- Recursos públicos.
- Navegação.
- Atualização da página.

Utilizar import.meta.env.BASE_URL ou mecanismos equivalentes quando necessário.

Evitar caminhos absolutos incompatíveis com subdiretórios.

Preferir uma aplicação com navegação controlada por estado quando isso simplificar a experiência.

Caso sejam utilizadas rotas, implementar uma estratégia compatível com GitHub Pages.

Evitar erros 404 ao atualizar a página.

Documentar a configuração:

Settings → Pages → Build and deployment → Source → GitHub Actions.

Não afirmar que o deploy foi realizado até que sua execução tenha sido confirmada.

---

# 33. DOCUMENTAÇÃO PERMANENTE

Criar e manter os seguintes arquivos:

## AGENTS.md

Deverá conter as regras permanentes do projeto:

- Objetivos.
- Público-alvo.
- Arquitetura.
- Stack tecnológica.
- Identidade visual.
- Regras de implementação.
- Versionamento.
- Testes.
- Segurança.
- Privacidade.
- Pull Requests.
- Deploy.
- Restrições.

Esse arquivo deverá ser consultado antes de qualquer nova tarefa.

## README.md

Deverá conter:

- Apresentação do projeto.
- Objetivo.
- Tecnologias.
- Instalação.
- Execução local.
- Comandos disponíveis.
- Estrutura de arquivos.
- Testes.
- Publicação.
- Endereço oficial quando confirmado.

## docs/PROJETO.md

Deverá conter:

- Escopo.
- Requisitos funcionais.
- Requisitos não funcionais.
- Público-alvo.
- Experiência do jogador.
- Etapas de desenvolvimento.

## docs/DESIGN_SYSTEM.md

Deverá conter:

- Paleta oficial.
- Tipografia.
- Tokens.
- Componentes.
- Estados.
- Espaçamentos.
- Sombras.
- Animações.
- Regras de acessibilidade.

## docs/ARQUITETURA.md

Deverá conter:

- Organização do software.
- Responsabilidades dos módulos.
- Fluxo de dados.
- Gerenciamento de estado.
- Decisões técnicas.

## docs/QUIZ_ENGINE.md

Deverá conter:

- Perguntas.
- Perfis.
- Associação das alternativas.
- Pesos.
- Pontuação.
- Desempates.
- Validações.

## docs/ASSETS.md

Deverá conter:

- Inventário das imagens.
- Origem dos recursos.
- Licenças quando aplicáveis.
- Formatos.
- Dimensões.
- Pendências de substituição.

## docs/DEPLOY.md

Deverá conter:

- Configuração do GitHub Pages.
- Workflows.
- Permissões.
- Base path.
- Procedimentos de publicação.
- Solução de problemas.

## docs/PROGRESSO.md

Deverá conter:

- Etapas concluídas.
- Etapa atual.
- Próximas etapas.
- Branches utilizadas.
- Arquivos modificados.
- Decisões técnicas.
- Testes executados.
- Resultados reais.
- Problemas encontrados.
- Pendências.
- Links dos Pull Requests.
- Estado do deploy.

Atualizar o documento ao final de cada etapa.

Não registrar funcionalidades como concluídas quando ainda estiverem pendentes.

---

# 34. RELATÓRIO DE CONCLUSÃO DE CADA ETAPA

Ao finalizar uma etapa, apresentar um relatório contendo:

1. Nome da etapa.
2. Objetivos alcançados.
3. Funcionalidades implementadas.
4. Arquivos criados.
5. Arquivos modificados.
6. Decisões técnicas.
7. Dependências adicionadas.
8. Testes executados.
9. Resultados dos testes.
10. Resultado do build.
11. Branch utilizada.
12. Commits realizados.
13. Link do Pull Request.
14. Estado do CI.
15. Estado do deploy.
16. Pendências.
17. Próxima etapa recomendada.

Diferenciar claramente:

- Implementado.
- Testado.
- Aguardando revisão.
- Aguardando merge.
- Publicado.
- Pendente.
- Bloqueado.

Não utilizar informações inventadas para preencher o relatório.

---

# 35. CRITÉRIOS DE ACEITAÇÃO DO PROJETO

O projeto somente poderá ser considerado concluído quando:

- A tela inicial estiver funcional.
- O nickname for obrigatório.
- O botão START respeitar a validação.
- Existirem exatamente 15 perguntas.
- Todas as perguntas possuírem imagens relacionadas.
- Todas as perguntas possuírem seis alternativas.
- A seleção for individual.
- As respostas influenciarem corretamente o resultado.
- Existirem exatamente seis perfis.
- O resultado permanecer oculto até a conclusão.
- O sistema de pontuação estiver validado.
- Os desempates estiverem testados.
- A mensagem final estiver personalizada.
- As animações estiverem funcionais.
- A identidade visual oficial estiver respeitada.
- A experiência estiver adequada ao público de 13 a 15 anos.
- O layout estiver responsivo.
- A acessibilidade estiver validada.
- A documentação estiver atualizada.
- Os testes obrigatórios estiverem aprovados.
- O build de produção estiver aprovado.
- Os Pull Requests estiverem organizados.
- O GitHub Actions estiver funcional.
- O GitHub Pages estiver publicado e validado.
- Não existirem placeholders indevidos na versão final.

---

# 36. DIRETRIZES DE CONTINUIDADE

Sempre preservar as funcionalidades já aprovadas.

Não modificar elementos de etapas anteriores sem necessidade técnica ou autorização.

Quando uma mudança afetar funcionalidades existentes:

1. Identificar o impacto.
2. Explicar a necessidade.
3. Preservar o comportamento aprovado.
4. Executar testes de regressão.
5. Documentar a alteração.

Evitar refatorações desnecessárias.

Não substituir tecnologias sem justificativa.

Não ampliar o escopo sem autorização.

Em caso de conflito entre requisitos, apresentar o conflito antes de tomar uma decisão que altere o projeto.

Priorizar qualidade, consistência, manutenção e experiência do usuário.

---

# 37. PRIMEIRA EXECUÇÃO — INSTRUÇÃO IMEDIATA

Neste momento, não implemente todas as etapas.

Realize somente uma análise inicial do ambiente e o planejamento da Etapa 01.

Execute as seguintes ações:

1. Inspecione o repositório atual.
2. Identifique os arquivos existentes.
3. Verifique o estado do Git.
4. Identifique a branch atual.
5. Verifique o repositório remoto.
6. Identifique as versões disponíveis do Node.js e npm.
7. Analise o arquivo Paleta_Cores_Curso_IA.pdf, caso esteja disponível.
8. Verifique a disponibilidade de autenticação para GitHub.
9. Identifique permissões necessárias para criação de branches, pushes e Pull Requests.
10. Identifique possíveis limitações do ambiente.
11. Apresente a arquitetura proposta.
12. Apresente o plano detalhado da Etapa 01.
13. Apresente os arquivos que serão criados ou modificados.
14. Apresente os critérios de aceitação.
15. Informe os riscos e dependências.

Não criar commits, branches, Pull Requests ou realizar deploy nesta primeira análise.

Não modificar arquivos existentes sem autorização.

Caso o PDF não esteja disponível, informar a pendência antes de iniciar o Design System.

Ao receber autorização para a Etapa 01, registrar as diretrizes permanentes deste Prompt Mestre no AGENTS.md e na documentação correspondente.

Aguarde minha autorização explícita antes de iniciar a implementação.

A resposta inicial deverá ser objetiva, organizada e tecnicamente fundamentada.

---

# DIRETRIZ FINAL

O DNA:IA não deverá ser apenas um quiz funcional.

Deverá ser uma experiência digital memorável, capaz de despertar nos estudantes do 9º ano a curiosidade pelo universo da Inteligência Artificial.

Cada decisão de design, desenvolvimento, animação e comunicação deverá contribuir para esse objetivo.

Construir um projeto profissional, autoral, acessível, organizado, testável, documentado e preparado para evolução futura.