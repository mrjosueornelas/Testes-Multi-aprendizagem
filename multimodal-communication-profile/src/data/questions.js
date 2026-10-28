/**
 * Banco dos 25 itens principais e respectivos complementos condicionais.
 * Edite apenas os objetos desta lista ao alterar enunciados/opções.
 * `type`: `positive` (uma afirmação favorável direta) ou `contrast` (duas proposições em contraste).
 * `primary` e `secondary`: habilidades para análise, não prova de proficiência.
 */
export const QUESTIONS = [
  {
    "mode": "Linguistic",
    "text": "Consigo compreender o significado de um texto em inglês quando o leio silenciosamente, mas tenho dificuldade para ler o mesmo texto em voz alta, respeitando a pronúncia e a entonação.",
    "follow": "Quando você lê um texto em inglês em voz alta, qual dificuldade aparece com maior frequência?",
    "options": [
      "Reconheço as palavras, mas não sei como pronunciá-las.",
      "Conheço a pronúncia isolada, mas tenho dificuldade com ritmo e entonação.",
      "Fico inseguro ao ler diante de outras pessoas.",
      "Consigo ler em voz alta, mas nem sempre compreendo o significado.",
      "Não identifico uma dificuldade específica."
    ],
    "primary": "Reading",
    "secondary": "Speaking",
    "type": "contrast"
  },
  {
    "mode": "Linguistic",
    "text": "Quando leio uma notícia em inglês, consigo identificar a ideia principal mesmo sem compreender todas as palavras, mas tenho dificuldade para explicar oralmente o que li.",
    "follow": "O que mais dificulta explicar oralmente algo que você acabou de ler?",
    "options": [
      "Não encontro as palavras necessárias.",
      "Tenho dificuldade para organizar frases espontaneamente.",
      "Compreendo o assunto, mas receio cometer erros.",
      "Preciso traduzir mentalmente antes de falar.",
      "Não sei identificar a principal dificuldade."
    ],
    "primary": "Reading",
    "secondary": "Speaking",
    "type": "contrast"
  },
  {
    "mode": "Linguistic",
    "text": "Consigo compreender uma explicação gramatical em inglês e reconhecer a estrutura em um texto, mas tenho dificuldade para utilizá-la espontaneamente durante uma conversa.",
    "follow": "Quando precisa utilizar uma estrutura gramatical durante uma conversa, o que acontece?",
    "options": [
      "Lembro a regra, mas demoro para formar a frase.",
      "Consigo utilizar a estrutura apenas em exercícios escritos.",
      "Dependo de exemplos prontos para formular respostas.",
      "Evito estruturas complexas e utilizo frases mais simples.",
      "Não percebo uma dificuldade recorrente."
    ],
    "primary": "Reading",
    "secondary": "Speaking",
    "type": "contrast"
  },
  {
    "mode": "Linguistic",
    "text": "Quando preciso escrever uma mensagem em inglês, consigo organizar minhas ideias, mas frequentemente recorro ao tradutor para selecionar palavras e expressões.",
    "follow": "Para qual finalidade você utiliza mais frequentemente o tradutor?",
    "options": [
      "Encontrar palavras que ainda não conheço.",
      "Verificar a organização gramatical da frase.",
      "Traduzir a mensagem inteira antes de enviá-la.",
      "Conferir expressões e adequação ao contexto.",
      "Uso por hábito, mesmo quando conheço as palavras."
    ],
    "primary": "Writing",
    "secondary": "Writing",
    "type": "contrast"
  },
  {
    "mode": "Linguistic",
    "text": "Consigo compreender uma pergunta em inglês, mas preciso de bastante tempo para organizar uma resposta oral, mesmo quando conheço o vocabulário necessário.",
    "follow": "Qual fator mais interfere no tempo necessário para responder em inglês?",
    "options": [
      "Preciso traduzir mentalmente.",
      "Tenho dificuldade para recuperar vocabulário.",
      "Penso muito nas regras gramaticais.",
      "Tenho receio de errar a pronúncia.",
      "Preciso de tempo para organizar minhas ideias, inclusive em português."
    ],
    "primary": "Listening",
    "secondary": "Speaking",
    "type": "contrast"
  },
  {
    "mode": "Aural",
    "text": "Consigo acompanhar o enredo de um filme em inglês sem legendas, identificando informações importantes apenas pela fala dos personagens.",
    "follow": "Ao assistir a um filme em inglês sem legendas, o que mais dificulta sua compreensão?",
    "options": [
      "A velocidade das falas.",
      "O sotaque ou a pronúncia dos personagens.",
      "O vocabulário e as expressões desconhecidas.",
      "Reconheço palavras, mas não acompanho o sentido geral.",
      "Não costumo assistir a filmes em inglês sem legendas."
    ],
    "primary": "Listening",
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Aural",
    "text": "Quando assisto a filmes em inglês com legendas em inglês, compreendo melhor os diálogos do que quando assisto sem legendas.",
    "follow": "Quando as legendas em inglês estão disponíveis, o que mais ajuda você a compreender?",
    "options": [
      "Reconhecer visualmente palavras que não identifico pelo som.",
      "Acompanhar a velocidade dos diálogos.",
      "Compreender vocabulário e expressões desconhecidas.",
      "Relacionar a pronúncia à escrita das palavras.",
      "Manter a atenção no conteúdo."
    ],
    "primary": "Reading",
    "secondary": "Listening",
    "type": "contrast"
  },
  {
    "mode": "Aural",
    "text": "Consigo compreender a letra de músicas cantadas em inglês por artistas de diferentes nacionalidades, mesmo quando apresentam sotaques ou pronúncias pouco familiares.",
    "follow": "O que mais dificulta compreender músicas de artistas de diferentes nacionalidades?",
    "options": [
      "As variações de sotaque.",
      "A velocidade e o ritmo musical.",
      "A união ou redução de sons entre palavras.",
      "O vocabulário e as expressões utilizadas.",
      "Mesmo lendo a letra, tenho dificuldade para compreender o significado."
    ],
    "primary": "Listening",
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Aural",
    "text": "Consigo compreender uma conversa em inglês quando os participantes falam lentamente, mas tenho dificuldade quando utilizam velocidade natural, reduções ou expressões informais.",
    "follow": "Quando a conversa passa da fala lenta para a velocidade natural, o que você percebe?",
    "options": [
      "Deixo de reconhecer palavras que conheço.",
      "Tenho dificuldade com contrações e reduções.",
      "Perco informações enquanto tento compreender uma frase.",
      "Preciso traduzir mentalmente e não acompanho.",
      "A dificuldade aparece principalmente com sotaques pouco familiares."
    ],
    "primary": "Listening",
    "secondary": "Listening",
    "type": "contrast"
  },
  {
    "mode": "Aural",
    "text": "Ao ouvir duas pessoas falando inglês com sotaques diferentes, consigo reconhecer que pronunciaram a mesma palavra, mesmo que os sons apresentem variações.",
    "follow": "O que mais dificulta reconhecer uma mesma palavra em sotaques diferentes?",
    "options": [
      "Diferenças entre sons vocálicos.",
      "Diferenças no ritmo e na tonicidade.",
      "Pouca familiaridade com variedades do inglês.",
      "Dificuldade para relacionar o som à escrita.",
      "Não consigo identificar o fator principal."
    ],
    "primary": "Listening",
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Visual",
    "text": "Consigo compreender instruções em inglês acompanhadas de imagens, mesmo quando desconheço parte do vocabulário utilizado.",
    "follow": "Quando uma instrução apresenta imagens, como você costuma utilizá-las?",
    "options": [
      "Entendo a tarefa principalmente pelas imagens.",
      "Combino imagens com palavras que reconheço.",
      "Preciso compreender quase todo o texto.",
      "As imagens não costumam ajudar.",
      "Não tenho experiência suficiente para avaliar."
    ],
    "primary": "Reading",
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Visual",
    "text": "Quando assisto a um vídeo em inglês, consigo compreender acontecimentos pela combinação de imagens e diálogos, mesmo sem entender todas as falas.",
    "follow": "Se o vídeo fosse apresentado apenas com áudio, como seria sua compreensão?",
    "options": [
      "Compreenderia praticamente o mesmo.",
      "Compreenderia a ideia geral, mas perderia detalhes.",
      "Teria dificuldade para acompanhar os acontecimentos.",
      "Não conseguiria compreender o conteúdo.",
      "Não consigo prever sem experimentar."
    ],
    "primary": "Listening",
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Visual",
    "text": "Consigo interpretar memes em inglês quando a imagem complementa uma expressão idiomática ou uma referência cultural.",
    "follow": "Ao encontrar um meme em inglês que você não compreende, qual dificuldade é mais frequente?",
    "options": [
      "Não conheço a expressão utilizada.",
      "Compreendo as palavras, mas não a referência cultural.",
      "Não percebo a relação entre texto e imagem.",
      "Não identifico ironia ou duplo sentido.",
      "Não tenho familiaridade com esse conteúdo."
    ],
    "primary": "Reading",
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Visual",
    "text": "Quando encontro um infográfico em inglês, consigo relacionar títulos, números, símbolos e informações escritas para compreender sua mensagem.",
    "follow": "Em um infográfico, qual informação costuma ser mais difícil?",
    "options": [
      "Títulos e subtítulos.",
      "Números e relações entre dados.",
      "Símbolos e elementos gráficos.",
      "Relação entre textos e imagens.",
      "Organização geral das informações."
    ],
    "primary": "Reading",
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Visual",
    "text": "Consigo compreender a mensagem de uma publicidade em inglês pela combinação entre imagens, palavras e elementos visuais, mesmo quando há duplo sentido.",
    "follow": "O que costuma dificultar a compreensão de uma publicidade em inglês?",
    "options": [
      "Vocabulário ou expressões desconhecidas.",
      "Referências culturais.",
      "Ironia, humor ou duplo sentido.",
      "Relação entre imagens e texto.",
      "Não costumo analisar publicidade em inglês."
    ],
    "primary": "Reading",
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Spatial",
    "text": "Consigo utilizar o Google Maps configurado em inglês para seguir um percurso, mesmo sem compreender todas as instruções escritas ou faladas.",
    "follow": "Qual recurso seria mais importante para chegar ao destino?",
    "options": [
      "Mapa e rota visual.",
      "Instruções escritas em inglês.",
      "Instruções de voz.",
      "Tradução de palavras desconhecidas.",
      "Ajuda de outra pessoa."
    ],
    "primary": "Reading",
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Spatial",
    "text": "Consigo compreender orientações em inglês como turn left, across from, between e next to e relacioná-las à posição real de objetos ou lugares.",
    "follow": "Qual situação apresenta maior dificuldade?",
    "options": [
      "Compreender expressões de localização.",
      "Relacionar instruções escritas à posição real.",
      "Compreender orientações faladas.",
      "Explicar oralmente como chegar a um lugar.",
      "Não conheço suficientemente esse vocabulário."
    ],
    "primary": "Reading",
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Spatial",
    "text": "Quando recebo instruções de montagem em inglês, consigo relacionar diagramas, posições e sequências para executar a tarefa.",
    "follow": "O que mais dificulta seguir instruções de montagem?",
    "options": [
      "Compreender os verbos de ação.",
      "Interpretar diagramas.",
      "Relacionar etapa escrita à imagem.",
      "Organizar a sequência.",
      "Não tenho experiência com essa tarefa."
    ],
    "primary": "Reading",
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Spatial",
    "text": "Consigo organizar informações em inglês em uma apresentação visual, distribuindo títulos, imagens e textos de forma que outras pessoas compreendam a mensagem.",
    "follow": "Ao preparar uma apresentação em inglês, qual etapa exige maior esforço?",
    "options": [
      "Organizar ideias em sequência lógica.",
      "Selecionar vocabulário.",
      "Distribuir imagens e textos.",
      "Explicar oralmente o conteúdo.",
      "Não costumo preparar apresentações."
    ],
    "primary": "Writing",
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Spatial",
    "text": "Consigo interpretar mapas de metrô, aeroportos ou edifícios com sinalização em inglês, mesmo quando desconheço parte das palavras apresentadas.",
    "follow": "Qual dificuldade é mais frequente ao usar sinalizações em inglês?",
    "options": [
      "Compreender palavras e abreviações.",
      "Interpretar símbolos e cores.",
      "Identificar direções e conexões.",
      "Relacionar mapa ao espaço físico.",
      "Não tenho experiência com essa situação."
    ],
    "primary": "Reading",
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Gestural",
    "text": "Reconheço que tocar uma pessoa desconhecida nos Estados Unidos pode ser considerado invasivo ou inadequado, dependendo do contexto e do consentimento, mesmo quando o gesto seria comum em minha cultura.",
    "follow": "Como você decide se um contato físico é apropriado em outra cultura?",
    "options": [
      "Observo o contexto e sinais de consentimento.",
      "Considero os costumes da outra pessoa.",
      "Ajo conforme costumes brasileiros.",
      "Prefiro evitar contato se não tenho certeza.",
      "Nunca pensei sobre essa diferença cultural."
    ],
    "primary": null,
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Gestural",
    "text": "Consigo perceber quando uma expressão facial ou um gesto modifica o significado de uma frase em inglês, como quando alguém utiliza ironia ou demonstra desconforto.",
    "follow": "O que é mais difícil ao interpretar gestos e expressões faciais?",
    "options": [
      "Reconhecer ironia ou sarcasmo.",
      "Perceber desconforto ou discordância.",
      "Relacionar expressão facial à fala.",
      "Compreender gestos de outras culturas.",
      "Não costumo prestar atenção a esses elementos."
    ],
    "primary": "Listening",
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Gestural",
    "text": "Quando não conheço uma palavra em inglês, consigo utilizar gestos, expressões faciais ou demonstrações para comunicar minha intenção sem interromper completamente a conversa.",
    "follow": "Quando falta uma palavra em uma conversa, o que você faz?",
    "options": [
      "Descrevo a ideia com outras palavras em inglês.",
      "Utilizo gestos ou demonstrações.",
      "Peço ajuda ou esclarecimento.",
      "Recorro ao português ou tradutor.",
      "Interrompo a tentativa de comunicação."
    ],
    "primary": "Speaking",
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Gestural",
    "text": "Consigo identificar situações em que um gesto comum no Brasil pode ser interpretado de maneira diferente em outro contexto cultural.",
    "follow": "Como você lida com um gesto cujo significado desconhece?",
    "options": [
      "Observo como é utilizado.",
      "Pergunto o que significa.",
      "Pesquiso antes de utilizá-lo.",
      "Presumo que signifique o mesmo que no Brasil.",
      "Evito utilizá-lo até compreender."
    ],
    "primary": null,
    "secondary": null,
    "type": "positive"
  },
  {
    "mode": "Gestural",
    "text": "Ao conversar em inglês, consigo observar sinais não verbais de incompreensão e reformular minha explicação para tornar a mensagem mais clara.",
    "follow": "Quando alguém não compreende sua fala, qual é sua reação?",
    "options": [
      "Reformulo com palavras mais simples.",
      "Utilizo gestos, exemplos ou demonstrações.",
      "Repito a frase mais lentamente.",
      "Peço que explique o que não compreendeu.",
      "Fico inseguro e tenho dificuldade para continuar."
    ],
    "primary": "Speaking",
    "secondary": null,
    "type": "positive"
  }
];
