# Imagens das perguntas

**Aceite editorial concluído:** em 24/11/2026, o responsável pelo projeto aprovou técnica e editorialmente as 15 ilustrações da Etapa 05, sem necessidade de substituição. Após o merge do PR #5, as 15 imagens publicadas foram carregadas em desktop e mobile e seus hashes SHA-256 foram comparados aos WebP locais aprovados, com correspondência integral. Nenhuma imagem foi substituída.

A [prancha de revisão](review/questions-contact-sheet.png) apresenta as 15 miniaturas com numeração das perguntas e identificação das cenas. Ela foi montada a partir dos WebP existentes, sem substituí-los. As capturas [Level 01](review/transition-5.png), [Level 02](review/transition-10.png) e [conclusão final](review/transition-15.png) registram os destaques azul, violeta e verde, respectivamente.

As 15 ilustrações foram geradas para o DNA:IA com a ferramenta de geração de imagens do ambiente em 24/11/2026, a partir das descrições oficiais de `src/data/questions.ts`. Nenhuma fotografia, imagem de banco, marca ou material de terceiro foi fornecido como referência. **Licença/origem:** geração para este projeto sob os termos aplicáveis da ferramenta, sem licença de recurso externo incorporado. Os PNG de origem permanecem no histórico local da ferramenta; o repositório contém apenas WebP otimizados. Cada arquivo mede 1280 × 720 px, aparece sob `/dna-ia/images/questions/` e está marcado como **implementado e aprovado editorialmente**.

| Pergunta | Arquivo            | Cena baseada na descrição oficial            | Origem, formato e situação           |
| -------- | ------------------ | -------------------------------------------- | ------------------------------------ |
| 01       | `question-01.webp` | Superpoderes tecnológicos e hologramas       | Geração original; WebP; implementada |
| 02       | `question-02.webp` | Mundo aberto futurista                       | Geração original; WebP; implementada |
| 03       | `question-03.webp` | Computador futurista potente                 | Geração original; WebP; implementada |
| 04       | `question-04.webp` | Estúdio de produção audiovisual              | Geração original; WebP; implementada |
| 05       | `question-05.webp` | Equipe jovem em projeto tecnológico          | Geração original; WebP; implementada |
| 06       | `question-06.webp` | Laboratório escolar tecnológico              | Geração original; WebP; implementada |
| 07       | `question-07.webp` | Sistema inteligente e respostas inesperadas  | Geração original; WebP; implementada |
| 08       | `question-08.webp` | Estúdio de criação de jogos                  | Geração original; WebP; implementada |
| 09       | `question-09.webp` | Robô em ambiente de aprendizagem             | Geração original; WebP; implementada |
| 10       | `question-10.webp` | Competição de inovação tecnológica           | Geração original; WebP; implementada |
| 11       | `question-11.webp` | Cidade do futuro em 2050                     | Geração original; WebP; implementada |
| 12       | `question-12.webp` | Rede social futurista                        | Geração original; WebP; implementada |
| 13       | `question-13.webp` | Desafios tecnológicos em estação de trabalho | Geração original; WebP; implementada |
| 14       | `question-14.webp` | Apresentação de invenção tecnológica         | Geração original; WebP; implementada |
| 15       | `question-15.webp` | Equipe em missão tecnológica                 | Geração original; WebP; implementada |

O nome alternativo de cada imagem é a descrição oficial da pergunta. As imagens não identificam qual alternativa corresponde a um perfil. A primeira é carregada de imediato; as demais usam `loading="lazy"`, `decoding="async"` e dimensões explícitas.

## Ilustrações dos perfis — Etapa 06

**Situação: geradas e implementadas, aguardando aceite editorial antes do merge.** A [prancha de seis perfis](review/profiles-contact-sheet.png) permite comparar os personagens e seus contextos. Os arquivos locais estão em `public/images/profiles/`, WebP quadrado de 960 × 960 px. Foram gerados originalmente com a ferramenta de imagens do ambiente em 24/11/2026, sem imagem de terceiro fornecida como referência, sob os termos aplicáveis da ferramenta. Os PNG originais permanecem no diretório de geração do Codex; foram redimensionados e codificados em WebP (qualidade 0,82) via canvas do Chromium. Não há recurso externo incorporado com licença de banco de imagens.

| Perfil        | Arquivo              |  Bytes | Contexto e texto alternativo                                                       |
| ------------- | -------------------- | -----: | ---------------------------------------------------------------------------------- |
| THE BUILDER   | `the-builder.webp`   |  91336 | Personagem construindo sistemas em um terminal holográfico com chips e circuitos.  |
| THE DETECTIVE | `the-detective.webp` |  98884 | Personagem investigando gráficos e conexões em painéis holográficos de dados.      |
| THE BRAIN     | `the-brain.webp`     |  91718 | Personagem explorando uma rede neural com nós conectados e um cérebro digital.     |
| THE CREATOR   | `the-creator.webp`   | 108148 | Personagem criando formas e cenas de arte digital com hologramas e uma caneta.     |
| THE MAKER     | `the-maker.webp`     | 108704 | Personagem trabalhando com braços robóticos, sensores e dispositivos inteligentes. |
| THE GUARDIAN  | `the-guardian.webp`  |  90734 | Personagem verificando uma rede protegida por um escudo digital.                   |

Cada prompt especificou um retrato quadrado de personagem desbloqueável, concept art 3D estilizada, fundo marinho, azul/violeta e ciano controlado em superfícies escuras, sem marcas, textos, vermelho ou verde. A cena variou conforme as identidades gráficas oficiais (terminais/chips, dados/lentes, redes neurais, criação digital, robótica/sensores e escudos/verificação). Todos receberam o mesmo enquadramento e acabamento. A aplicação carrega somente a ilustração vencedora; os textos alternativos são definidos no complemento tipado de cada perfil.
