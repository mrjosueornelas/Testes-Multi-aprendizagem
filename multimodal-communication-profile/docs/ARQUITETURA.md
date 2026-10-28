# Arquitetura e regras de manutenção

## 1. Objetivo

Separar enunciados e conteúdo pedagógico, regras numéricas, apresentação e navegação para evitar que uma alteração na cor do gráfico modifique o algoritmo, ou que um ajuste de pergunta interrompa a impressão.

## 2. Dependências direcionais

```text
index.html ──> src/main.js ──> src/ui/questionnaire.js
                                      └──> src/ui/report.js ──> src/ui/charts.js
                                                              └──> src/core/format.js
                 questionário/relatório ──> src/core/analysis.js
                 questionário/análise ──> src/data/questions.js
                 relatório/análise ──> src/data/catalog.js

styles/main.css e assets/logo.png ──> apenas aparência
scripts/build.mjs ──> dist/arquivo-unico.html
```

`src/core` não usa `document`, `window` ou DOM. Pode ser testado em Node.js. `src/ui` trata DOM, eventos e HTML. `src/data` contém apenas configuração e textos, sem efeitos colaterais.

## 3. Fluxo

1. Estudante informa nome, idade e formação.
2. O estado inicial possui 25 respostas `null`; valor `0` significa **Não vivenciei** e não entra nas médias.
3. Cada item principal recebe 1–4 ou 0.
4. `needsFollowup` determina se pergunta complementar aparece; se aparecer, exige uma ou duas opções.
5. `isQuestionComplete` bloqueia avanço quando há complemento incompleto.
6. Após o item 25, `summarize` calcula médias, distribuição relativa e indicadores de habilidade.
7. `renderReport` desenha indicadores, pizza, barras, rubricas, análise técnica e registros.
8. O navegador imprime o relatório em A4. Nenhum dado é enviado ou gravado automaticamente.

## 4. Contratos dos módulos

- `QUESTIONS` mantém cinco itens por modo; os metadados `primary`/`secondary` referem-se apenas a Listening/Speaking/Reading/Writing ou `null`.
- `type: 'positive'` pode fornecer autorrelato direto à habilidade `primary`.
- `type: 'contrast'` nunca fornece ponto positivo direto; produz contexto ou alerta de necessidade.
- `followups` guarda índices inteiros das opções da questão; até 2 selecionadas.
- Cada gráfico lê um resultado da análise; **não** recalcula média internamente.
- `TECHNICAL_NOTE` é conteúdo fixo separado do algoritmo.
- IDs HTML são interface entre estrutura e módulos UI; não os renomeie sem atualizar os seletores.

## 5. Estratégia para mudanças seguras

1. Criar uma branch para cada melhoria (ex.: `feature/rubrica-listening`).
2. Alterar apenas o módulo responsável; se alterar critério, ajustar testes.
3. Executar `npm run check`.
4. Abrir `index.html` via servidor HTTP local; responder às 25 perguntas, testar retorno e complementos.
5. Abrir `dist/...html` diretamente (`file://`) e testar modo offline.
6. Conferir a prévia de impressão A4, cores de fundo e assinatura.
7. Comparar com `legacy/` antes de aprovar uma alteração substantiva.

## 6. Limites intencionais

Não contém backend, autenticação, coleta de dados, e-mail, sincronização ou banco de dados. Não publica GitHub Pages automaticamente. O nome "identificação profissional eletrônica" não significa assinatura digital certificada. O teste é exploratório e não valida proficiência.
