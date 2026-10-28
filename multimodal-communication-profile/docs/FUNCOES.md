# Inventário de código e funções

## `src/main.js`

- `createQuestionnaire()`: instancia um único estado em memória e devolve `initialize`, `renderQuestion`, `updateNavigation`.
- `questionnaire.initialize()`: conecta eventos às interfaces depois que o HTML carregou.

## `src/data/questions.js`

- `QUESTIONS`: array de 25 registros. Cada registro contém `mode`, `text`, `follow`, `options` (5), `primary`, `secondary` e `type`.
- `mode`: dimensão do gráfico de pizza.
- `primary`/`secondary`: hipóteses de associação a habilidades; não indica competência demonstrada.
- `type='contrast'`: declaração composta, tratada como ambígua na inferência de competência.

## `src/data/catalog.js`

- `MODES`: ordem das cinco modalidades.
- `MODE_COLORS`: correspondência fixa de cores com `MODES`.
- `SKILLS`: ordem Listening, Speaking, Reading, Writing.
- `SKILL_EMOJI`: emojis dos rótulos.
- `DESCRIPTIONS`: definição pedagógica de cada modo.
- `ACTIVITIES`: duas recomendações por modo (tarefa e metodologia).
- `SKILL_TASKS`: tarefa de verificação sugerida para cada habilidade.
- `TECHNICAL_NOTE`: declaração exata de limites e eventual encaminhamento.

## `src/core/format.js`

- `escapeHtml(input)`: transforma caracteres especiais do usuário e das questões em entidades HTML para evitar injeção em `innerHTML`.
- `mean(values)`: média aritmética ou `null` se o vetor está vazio.
- `normalizedIndex(value)`: normaliza média 1–4 em 0–100% pelo cálculo `(média − 1) / 3 × 100`, com limites 0 e 100; `null` permanece sem estimativa.
- `formatMean(value)`: texto pt-BR com duas casas; `—` quando ausente.
- `formatPercent(value)`: texto pt-BR com uma casa e símbolo `%`; `—` quando ausente.

## `src/core/analysis.js`

- `needsFollowup(question, answer)`: complemento em respostas 3/4 para itens de contraste; em 1/2 para itens positivos; não mostra após 0 ou `null`.
- `isQuestionComplete(question, answer, selections)`: valida resposta principal e, quando exigido, 1–2 seleções complementares.
- `analyzeModes(answers, questions)`: média, tamanho da amostra e índice convencional de cada modo; exclui 0 e `null`.
- `relativeShares(modeData)`: percentual da média de cada modo na soma de médias disponíveis; total = 100%, salvo sem dados.
- `analyzeSkills(answers, followups, questions)`: separa `scores`, `strength`, `need`, `context`, média, índice e contagem para cada habilidade. Somente questão positiva direta gera pontuação; contrastes e complementos fornecem observações.
- `summarize(answers, followups)`: agrega total válido, complementos, média geral, maior/menor modo, distribuição de modos e evidências de habilidades.

## `src/ui/questionnaire.js`

- `createQuestionnaire()`: cria estado `{answers, followups, step}` sem persistência.
- `show(id)` *(interna)*: alterna entre abertura, questionário e relatório, e retorna ao topo da página.
- `renderQuestion()` *(retornada e interna)*: apresenta afirmação, cinco alternativas principais e complemento se necessário; define eventos dos inputs.
- `updateNavigation()` *(retornada e interna)*: habilita/desabilita o botão Próxima conforme completude.
- `initialize()` *(retornada)*: registra ações dos botões Iniciar, Anterior, Próxima, Revisar e Imprimir; valida identificação do estudante.

## `src/ui/charts.js`

- `renderPie(shares)`: SVG de pizza com percentuais dentro das fatias quando houver espaço; `aria-label` e legenda externa oferecem sempre nome + percentual.
- `skillColor(index)`: verde ≥70; azul ≥55; amarelo ≥40; vermelho abaixo de 40. Convenção visual exploratória.
- `renderBar(label, value, color)`: barra com rótulo e percentual numérico visível; para valores ausentes mostra travessão.

## `src/ui/report.js`

- `renderReport(state)`: preenche título do estudante, idade/formação, cartões, pizza/legenda, gráficos, rubricas, análise técnica, nota técnica e tabela integral.
- `renderModeRubric(mode, colorIndex, answers, followups)`: rubrica por modo com descrição, itens, quadro azul (relatos favoráveis), quadro amarelo (necessidades/complementos), atividades e metodologias.
- `renderSkillRubric(skill, data)`: rubrica por Listening/Speaking/Reading/Writing; mostra índice apenas quando há itens diretos e contextualiza os demais.

## `scripts/build.mjs`

- Empacotador sem bibliotecas externas: lê os módulos em ordem topológica fixa, remove imports/exports resolvidos, embute CSS e imagem PNG e gera HTML único em `dist/`.
- Falha explicitamente quando encontra import/export não reconhecido ou referências externas remanescentes.
- **Ao adicionar um novo módulo**, incluir seu caminho na lista `ordered` na posição de dependência correta.

## `tests/analysis.test.mjs`

Testes automatizados de integridade dos 25 itens, gatilhos condicionais, avanço, médias, distribuição relativa, não pontuação de contrastes, respostas sem experiência, cores e escape HTML.
