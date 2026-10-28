# Multimodal Communication Profile — Mr. Ornelas

Questionário pedagógico **exploratório** com 25 itens principais, perguntas condicionais, análise multimodal, autorrelato sobre quatro habilidades de inglês e relatório pronto para impressão em PDF.

## Como usar

- **Sem instalação:** abra `dist/Multimodal_Communication_Profile_Mr_Ornelas.html` no Chrome/Edge. Funciona inteiramente offline e não envia respostas.
- **Desenvolvimento modular:** execute `python3 -m http.server 8000` na pasta do projeto; abra `http://localhost:8000`. O arquivo `index.html` usa módulos ES e deve ser servido por HTTP (navegadores bloqueiam importações `file://`).
- **Gerar nova versão offline:** instale Node.js 20+ e execute `npm run build`.
- **Testar alterações:** `npm test` (sem instalar dependências). `npm run check` testa e compila.
- **Salvar PDF:** responda ao questionário e escolha **Imprimir / salvar PDF**.

## O que foi preservado

- Logo de Mr. Ornelas no cabeçalho.
- 25 afirmações originais da versão 2 e respectivos complementos condicionais; até duas alternativas por complemento.
- Pizza colorida com **nome e percentual de cada modalidade**; barras das quatro habilidades com emojis e cores por intervalo.
- Destaques **azuis** para evidências favoráveis e **amarelos** para necessidades de investigação.
- Nota técnica e identificação profissional no relatório.
- Processamento local, sem backend, e-mail, cookies ou armazenamento persistente.
- Cópia integral da versão 2 em `legacy/`, como referência histórica para comparação.

## Organização

| Arquivo | Responsabilidade | O que é seguro alterar ali |
| --- | --- | --- |
| `src/data/questions.js` | 25 itens e complementos | Enunciados, alternativas e metadados, após revisar regras |
| `src/data/catalog.js` | Modos, habilidades, recomendações, nota técnica e cores | Descrições pedagógicas e textos |
| `src/core/analysis.js` | Regras condicionais, evidências e pontuação | Algoritmo, acompanhado de testes |
| `src/core/format.js` | Médias, índices, escapes e formatação | Formato dos números |
| `src/ui/questionnaire.js` | Formulário, navegação e estado da entrevista | Comportamento da coleta |
| `src/ui/charts.js` | Pizza SVG, barras e faixas de cores | Elementos gráficos |
| `src/ui/report.js` | Composição dos quadros e rubricas | Estrutura do relatório |
| `src/main.js` | Inicialização | Ponto de entrada |
| `styles/main.css` | Visual e impressão A4 | Layout, espaços e tipografia |
| `assets/logo.png` | Logo original | Somente imagem gráfica |
| `index.html` | Estrutura semântica e áreas do relatório | Campos e containers (manter IDs) |
| `scripts/build.mjs` | Geração do HTML único, offline | Empacotamento |
| `tests/analysis.test.mjs` | Testes de regressão | Acrescentar casos a cada mudança |
| `legacy/` | Snapshot v2 | Nunca editar; referência |
| `dist/` | HTML pronto para clientes | Gerado automaticamente; não editar à mão |

Documentação detalhada: [Arquitetura](docs/ARQUITETURA.md), [Funções](docs/FUNCOES.md), [Metodologia de pontuação](docs/PONTUACAO.md).

## Limites e privacidade

O instrumento mede **concordância com autoafirmações** e identifica hipóteses pedagógicas, não proficiência formal nem diagnóstico clínico. Algumas afirmações são compostas, e seus índices não devem ser lidos como demonstrações objetivas de competência. Não existem validação psicométrica nem normas de referência. Os dados ficam apenas na memória da aba até o encerramento; o PDF salvo passa a ser responsabilidade de quem o armazena.

**Observação:** o repositório GitHub é público e contém apenas o código, o banco fixo de perguntas e os contatos profissionais exibidos no relatório; **não** inclui respostas de estudantes.
