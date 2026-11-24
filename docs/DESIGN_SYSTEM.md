# Design System DNA:IA

O PDF oficial foi renderizado e revisado visualmente nas duas páginas. A primeira apresenta a paleta, os exemplos sobre fundos claros e escuros e as regras de uso. A segunda apresenta a tipografia, as combinações recomendadas e o bloco de variáveis CSS. O branco está na paleta da primeira página e tem token explícito no Prompt Mestre. Consulte a [paleta](Paleta_Cores_Curso_IA.pdf) e o [Prompt Mestre](PROMPT_MESTRE.md).

## Tokens

Os tokens oficiais ficam em `src/styles/tokens.css`. Os componentes consomem esses tokens e usam propriedades `--ds-*` para espaçamento, foco e estados.

| Família | Tokens e valores                                                                                                            |
| ------- | --------------------------------------------------------------------------------------------------------------------------- |
| Base    | `navy-900 #0B1033`, `navy-800 #0F1538`, `blue-900 #1E2A6E`, `text-2 #3D4766`, `bg #F7F8FF`, `line #CCD3F0`, `white #FFFFFF` |
| Azul    | `blue-600 #3B5BDB`, `blue-400 #5C7CFA`, `blue-200 #A5B4FC`, `link-hover #1E3A8A`                                            |
| Violeta | `violet-700 #6D28D9`, `violet-600 #7C3AED`, `violet-500 #8B5CF6`, `violet-400 #9775FA`, `violet-200 #C4B5FD`                |
| Ciano   | `cyan-400 #22D3EE`, `cyan-200 #67E8F9`                                                                                      |
| Verde   | `green-700 #047857`, `green-800 #15803D`, `green-600 #16A34A`, `green-500 #22C55E`, `green-200 #6EE7B7`                     |

Os nomes acima recebem o prefixo `--ia-`. Azul e marinho formam a base, e violeta destaca ações e validações. O ciano aparece sobre marinho. O verde marca conquistas e a conclusão da terceira fase. A barra usa azul na fase 1, violeta na fase 2 e enquanto a fase 3 está em andamento, e verde após a conclusão da fase 3.

A sombra padrão é `4px 4px 0 var(--ia-violet-200)`. O painel da demonstração também usa deslocamento sólido de 6 px. A escala de espaçamento é de 4, 8, 12, 16, 24, 32 e 48 px com a configuração padrão da fonte raiz.

## Tipografia

As fontes foram empacotadas localmente com Fontsource. As importações usam o subconjunto latino e os pesos efetivamente usados na etapa.

- **Space Grotesk:** 400 para leitura e 700 para títulos, rótulos e ações. Fallback sem serifa.
- **Press Start 2P:** 400 em rótulos curtos de jogo, de preferência em caixa alta. Evite Ó, Í, Ô e Ê nessa fonte. Fallback monoespaçado.
- **JetBrains Mono:** 400 para percentuais, números e marcadores. Fallback monoespaçado.

## Componentes

| Componente                   | API e comportamento                                                                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                     | Variantes `primary`, `secondary` e `quiet`, tamanhos `sm` (44 px), `md` (48 px) e `lg` (56 px). Encaminha atributos do botão nativo. O tipo padrão é `button`.                  |
| `Input`                      | Rótulo obrigatório, ajuda e erro opcionais. Associa os textos via `aria-describedby` e marca o erro com `aria-invalid`. Suporta atributos nativos como `readOnly` e `disabled`. |
| `Card`                       | Superfícies `default` e `dark`, borda azul e sombra lilás. Use elementos semânticos ao redor quando a composição exigir regiões.                                                |
| `Badge`                      | Tons `neutral`, `phase-1`, `phase-2`, `accent` e `achievement`. Use textos curtos. As variantes ciano e verde têm fundo marinho próprio.                                        |
| `ProgressBar`                | `label`, `value` e `phase`. Renderiza `progress` nativo e limita o valor entre 0 e 100. A conclusão tem texto visível e descrição acessível.                                    |
| `Container`, `Stack`, `Grid` | Limite de largura, espaçamento vertical e colunas responsivas sem alterar a semântica de regiões e títulos.                                                                     |

O foco usa contorno de 3 px visível pelo teclado. Controles ativos têm alvo de pelo menos 44 px. Erro, desabilitado e conclusão têm texto ou semântica nativa além da cor. O sistema respeita `prefers-reduced-motion`; as transições de cor passam a 0 ms. A demonstração na raiz ilustra os componentes antes da construção da tela inicial.

## Validação

O Playwright verifica contraste de pelo menos 4,5:1 para os textos amostrados e 3:1 para as cores de borda, foco e preenchimento das barras testadas. Também checa a ordem de foco, a ativação por teclado, o alvo de toque, o carregamento das fontes locais e a ausência de rolagem horizontal. A revisão visual foi feita em Chromium com larguras de 1440, 412 e 320 px.
