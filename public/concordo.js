// Banco de propostas do Concordo e regra de pontuação.
//
// Cada tema tem 2 ou mais pares; cada rodada sorteia 1 par por tema.
// pg = páginas do PDF do plano de governo (numeração do leitor de PDF) onde a proposta aparece.
// As cópias locais dos PDFs ficam na raiz do repositório, só para conferência.

export const CANDIDATOS = {
  pl: {
    nome: 'Flávio Bolsonaro',
    partido: 'PL',
    plano: 'https://www.tse.jus.br/eleicoes/eleicoes-2026-content/arquivos/proposta-pl/@@display-file/file/proposta-pl.pdf',
  },
  pt: {
    nome: 'Lula',
    partido: 'PT',
    plano: 'https://www.tse.jus.br/eleicoes/eleicoes-2026-content/arquivos/proposta-pt/@@display-file/file/proposta-pt.pdf',
  },
}

export const rotulo = (c) => `${CANDIDATOS[c].nome} (${CANDIDATOS[c].partido})`

export const TEMAS = [
  {
    tema: 'Segurança pública',
    itens: [
      {
        id: 'faccoes',
        pergunta: 'Como enfrentar as facções criminosas?',
        pl: { texto: 'Declarar facções como PCC e CV organizações narcoterroristas e pôr tropas das Forças Armadas em fronteiras, portos e aeroportos.', pg: [13, 15] },
        pt: { texto: 'Criar um Ministério da Segurança Pública para integrar as forças do país e sufocar o dinheiro das facções com inteligência financeira.', pg: [27, 28, 30] },
      },
      {
        id: 'prisoes',
        pergunta: 'O que fazer com as prisões?',
        pl: { texto: 'Construir presídios de segurança máxima no modelo de El Salvador e acabar com a progressão de pena para crimes hediondos.', pg: [14, 15] },
        pt: { texto: 'Ampliar presídios federais para isolar líderes de facções e cumprir o plano nacional de melhoria das prisões para reduzir a reincidência.', pg: [28] },
      },
      {
        id: 'policiamento',
        pergunta: 'O que priorizar no controle da violência?',
        pl: { texto: 'Instalar 1 milhão de câmeras de reconhecimento facial ligadas a bancos de dados criminais e dobrar o investimento federal em segurança.', pg: [15] },
        pt: { texto: 'Ampliar o uso de câmeras corporais pelos policiais e manter o controle sobre armas e munições, com rastreamento e mais fiscalização.', pg: [28, 30] },
      },
    ],
  },
  {
    tema: 'Mulheres',
    itens: [
      {
        id: 'violencia_mulher',
        pergunta: 'Como combater a violência contra a mulher?',
        pl: { texto: 'Fazer condenados por feminicídio e agressão a mulheres cumprirem a pena inteira e aprovar a castração química para estupradores condenados.', pg: [14] },
        pt: { texto: 'Ampliar a rede de proteção, com mais centros de atendimento e salas especializadas para vítimas, e capacitar as polícias para atendê-las.', pg: [21] },
      },
      {
        id: 'mulher_trabalho',
        pergunta: 'Como apoiar as mulheres no trabalho?',
        pl: { texto: 'Oferecer cursos gratuitos, internet para estudar e buscar emprego e juros menores para mulheres que pagam as contas em dia.', pg: [18, 19, 20] },
        pt: { texto: 'Obrigar empresas com diferença salarial entre homens e mulheres a seguir planos com metas para reduzir essa desigualdade.', pg: [75] },
      },
      {
        id: 'saude_mulher',
        pergunta: 'Qual deve ser o foco na saúde da mulher?',
        pl: { texto: 'Levar unidades móveis de saúde da mulher a todo o país e oferecer uma assistente virtual para orientar e agendar atendimentos.', pg: [18, 21] },
        pt: { texto: 'Distribuir de graça anticoncepcionais de longa duração e absorventes e garantir os direitos sexuais e reprodutivos das mulheres.', pg: [21, 38] },
      },
    ],
  },
  {
    tema: 'Impostos e custo de vida',
    itens: [
      {
        id: 'reforma_tributaria',
        pergunta: 'Qual deve ser o rumo dos impostos?',
        pl: { texto: 'Rever a reforma tributária para baixar o imposto sobre o consumo e cortar impostos sobre energia elétrica e combustíveis.', pg: [30, 31] },
        pt: { texto: 'Manter a reforma tributária, com cesta básica isenta e devolução de imposto aos mais pobres, e cobrar mais dos super-ricos.', pg: [10, 11, 48] },
      },
      {
        id: 'energia_gas',
        pergunta: 'Como aliviar a conta de luz e o gás?',
        pl: { texto: 'Simplificar a conta de luz, reduzindo aos poucos encargos e subsídios embutidos nela, mantida a tarifa social para quem precisa.', pg: [31] },
        pt: { texto: 'Seguir combatendo a pobreza energética, com conta de luz gratuita para quem é de baixa renda e consome pouco e botijão de gás gratuito.', pg: [64, 65, 66] },
      },
    ],
  },
  {
    tema: 'Contas públicas',
    itens: [
      {
        id: 'regra_fiscal',
        pergunta: 'Como lidar com os gastos do governo?',
        pl: { texto: 'Cortar pelo menos 10 ministérios e criar regras fiscais mais rígidas para reduzir a dívida pública e, com isso, os juros.', pg: [69, 70, 71] },
        pt: { texto: 'Manter a regra fiscal atual, que limita os gastos sem cortar políticas sociais, e ampliar investimentos para puxar o crescimento.', pg: [48, 49] },
      },
      {
        id: 'servidores',
        pergunta: 'O que fazer em relação aos servidores públicos?',
        pl: { texto: 'Fazer a reforma administrativa, cortar supersalários e penduricalhos e reduzir cargos comissionados e gastos da máquina pública.', pg: [69] },
        pt: { texto: 'Valorizar os servidores com negociação permanente e regulamentar o direito de negociação coletiva no serviço público.', pg: [16, 76] },
      },
    ],
  },
  {
    tema: 'Trabalho',
    itens: [
      {
        id: 'jornada',
        pergunta: 'Qual deve ser o rumo das leis trabalhistas?',
        pl: { texto: 'Reduzir os encargos da carteira assinada, sem retirar direitos, e deixar empresa e trabalhador negociarem a jornada diretamente.', pg: [43, 44] },
        pt: { texto: 'Acabar com a escala 6x1, reduzir a jornada para 40 horas sem corte de salário e manter o salário mínimo subindo acima da inflação.', pg: [74, 75] },
      },
      {
        id: 'aplicativos',
        pergunta: 'Como tratar o trabalho por aplicativo?',
        pl: { texto: 'Manter as oportunidades de renda dos aplicativos, com proteção social e previdenciária, sem sindicatos à frente da regulamentação.', pg: [45] },
        pt: { texto: 'Regulamentar o trabalho por aplicativo, definindo remuneração, direitos trabalhistas e previdenciários e transparência dos algoritmos.', pg: [75, 77] },
      },
      {
        id: 'desemprego',
        pergunta: 'Como ajudar quem tem dificuldade de conseguir emprego?',
        pl: { texto: 'Criar contratos mais atrativos para empresas contratarem jovens no primeiro emprego e pessoas de 50 anos ou mais desempregadas há um ano.', pg: [44] },
        pt: { texto: 'Estimular vagas em atividades de interesse coletivo, como meio ambiente, cultura, esporte e cuidado de pessoas, e ampliar a aprendizagem para jovens.', pg: [24, 74] },
      },
    ],
  },
  {
    tema: 'Programas sociais e moradia',
    itens: [
      {
        id: 'programas_sociais',
        pergunta: 'Qual deve ser o foco dos programas sociais?',
        pl: { texto: 'Manter os programas com foco na porta de saída: prioridade em vagas e cursos e volta garantida ao benefício se o emprego não der certo.', pg: [42, 43] },
        pt: { texto: 'Manter e ampliar a transferência de renda, com valor extra por criança, e expandir cozinhas solidárias, restaurantes populares e espaços para crianças.', pg: [18, 23, 26] },
      },
      {
        id: 'creches_cuidado',
        pergunta: 'Como garantir creche e cuidado para quem precisa?',
        pl: { texto: 'Dar voucher para creche particular onde faltar vaga na pública e montar uma rede de cuidado de idosos em parceria com empresas e organizações sociais.', pg: [21] },
        pt: { texto: 'Construir mais creches públicas com estados e municípios e levar atendimento domiciliar do SUS a idosos com limitações em todo o país.', pg: [22, 31] },
      },
      {
        id: 'moradia',
        pergunta: 'Qual deve ser a prioridade na moradia?',
        pl: { texto: 'Construir 2,5 milhões de moradias com os menores juros possíveis e facilitar a escritura para quem já mora há anos no mesmo lugar.', pg: [47] },
        pt: { texto: 'Ampliar o programa habitacional para todas as faixas de renda e construir moradias em terrenos da União nas áreas centrais das cidades.', pg: [45] },
      },
    ],
  },
  {
    tema: 'Educação',
    itens: [
      {
        id: 'escola_valores',
        pergunta: 'Qual deve ser o papel da escola na formação de valores?',
        pl: { texto: 'Uma escola sem doutrinação político-partidária, em que os pais decidem sobre os valores dos filhos, e mais escolas cívico-militares.', pg: [35] },
        pt: { texto: 'Ampliar na escola a educação para as relações étnico-raciais e contra preconceitos, com atividades que estimulem o senso crítico.', pg: [20, 25, 43] },
      },
      {
        id: 'ensino_medio_superior',
        pergunta: 'Como apoiar os jovens do ensino médio à faculdade?',
        pl: { texto: 'Ampliar o ensino técnico em parceria com empresas e criar um crédito estudantil que só se paga com emprego, proporcional ao salário.', pg: [36, 37] },
        pt: { texto: 'Pagar incentivo para jovens de baixa renda concluírem o ensino médio, abrir mais institutos federais e expandir as universidades públicas.', pg: [32, 33] },
      },
      {
        id: 'alfabetizacao',
        pergunta: 'Como melhorar o aprendizado nas escolas?',
        pl: { texto: 'Alfabetizar pelo método fônico, ligar o repasse de verbas às metas de aprendizagem e pagar bons alunos para dar reforço aos colegas.', pg: [35] },
        pt: { texto: 'Alfabetizar 80% das crianças na idade certa com estados e municípios, manter o piso salarial dos professores e levar professores aonde faltam.', pg: [31, 33] },
      },
    ],
  },
  {
    tema: 'Saúde',
    itens: [
      {
        id: 'filas_saude',
        pergunta: 'Como reduzir as filas na saúde?',
        pl: { texto: 'Reajustar o que o SUS paga a hospitais e santas casas e contratar exames da rede privada nos horários em que os aparelhos ficam parados.', pg: [37] },
        pt: { texto: 'Ampliar o atendimento especializado na rede pública com terceiro turno e mutirões e criar uma fila única digital ordenada pela gravidade.', pg: [37, 38] },
      },
      {
        id: 'medicos_remedios',
        pergunta: 'Como ampliar o acesso a médicos e remédios?',
        pl: { texto: 'Levar médicos a quem está longe pelo teleatendimento e entregar remédios em casa para idosos, pessoas com deficiência e doentes crônicos.', pg: [38] },
        pt: { texto: 'Manter o programa que leva médicos a áreas carentes e os remédios 100% gratuitos nas farmácias conveniadas, que também passarão a oferecer exames.', pg: [35, 36] },
      },
    ],
  },
  {
    tema: 'Meio ambiente e campo',
    itens: [
      {
        id: 'licenciamento',
        pergunta: 'Qual deve ser o rumo da política ambiental?',
        pl: { texto: 'Licença ambiental com prazo fixo (se o órgão não decidir a tempo, ela é concedida) e autonomia para indígenas e quilombolas produzirem em suas terras.', pg: [50] },
        pt: { texto: 'Destinar mais terras públicas à conservação, continuar demarcando terras indígenas e retirando invasores e cumprir as metas de corte de emissões.', pg: [20, 70, 71] },
      },
      {
        id: 'amazonia',
        pergunta: 'Como cuidar da Amazônia?',
        pl: { texto: 'Exigir transparência de ONGs financiadas do exterior que processam a União e não tratar o morador da floresta como criminoso.', pg: [59] },
        pt: { texto: 'Manter fundos com dinheiro internacional para projetos sustentáveis na Amazônia e pôr em funcionamento um fundo global para manter florestas tropicais em pé.', pg: [56, 71] },
      },
      {
        id: 'terra',
        pergunta: 'Qual deve ser a prioridade na questão da terra?',
        pl: { texto: 'Acelerar a entrega de títulos de propriedade a pequenos produtores rurais e reforçar a segurança jurídica do direito de propriedade.', pg: [54] },
        pt: { texto: 'Continuar a reforma agrária, assentando famílias acampadas, e acelerar a titulação de territórios quilombolas e de comunidades tradicionais.', pg: [60] },
      },
      {
        id: 'agricultura',
        pergunta: 'Qual deve ser a prioridade para quem produz alimentos?',
        pl: { texto: 'Reorganizar as dívidas dos produtores rurais e ampliar a capacidade de armazenar safras para garantir preço melhor e oferta estável.', pg: [31, 54] },
        pt: { texto: 'Ampliar o crédito barato para a agricultura familiar, priorizando cesta básica, orgânicos e agroecologia, e as compras públicas desses alimentos.', pg: [59] },
      },
    ],
  },
  {
    tema: 'Energia e estatais',
    itens: [
      {
        id: 'estatais',
        pergunta: 'Qual deve ser o papel das empresas estatais?',
        pl: { texto: 'Retomar privatizações, avaliando caso a caso, escolher dirigentes de estatais por critérios de mercado e deixar a iniciativa privada liderar a infraestrutura.', pg: [50, 70] },
        pt: { texto: 'Fortalecer a Petrobras: voltar à distribuição de combustíveis, ampliar refino e exploração e amortecer a variação dos preços internacionais.', pg: [66, 67] },
      },
      {
        id: 'fontes_energia',
        pergunta: 'Qual deve ser o rumo da energia no país?',
        pl: { texto: 'Liberar a extração de gás por fraturamento (fracking), com responsabilidade ambiental, e expandir gasodutos e refino para baratear a energia.', pg: [52, 53] },
        pt: { texto: 'Acelerar a troca de combustíveis fósseis por alternativas de baixo carbono, reduzir a produção de carvão e debater um caminho global para deixar os fósseis.', pg: [64, 65, 71] },
      },
    ],
  },
  {
    tema: 'Brasil no mundo',
    itens: [
      {
        id: 'politica_externa',
        pergunta: 'Qual deve ser a prioridade da política externa?',
        pl: { texto: 'Reaproximar o Brasil de parceiros como Estados Unidos, Israel e Argentina, retomar a entrada na OCDE e ampliar a abertura comercial.', pg: [62, 63] },
        pt: { texto: 'Aprofundar a integração com a América do Sul, o Mercosul e o BRICS e defender reformas na ONU e no FMI a favor de países em desenvolvimento.', pg: [80, 81] },
      },
      {
        id: 'industria',
        pergunta: 'Qual deve ser a política para a indústria?',
        pl: { texto: 'Facilitar a importação de máquinas, tecnologia e insumos para aumentar a concorrência e baixar preços, integrando o Brasil às cadeias globais.', pg: [63] },
        pt: { texto: 'Fortalecer a indústria nacional com crédito direcionado, compras do governo e exigência de conteúdo local, com preferência a empresas brasileiras.', pg: [51] },
      },
    ],
  },
  {
    tema: 'Instituições',
    itens: [
      {
        id: 'redes_sociais',
        pergunta: 'Qual deve ser o papel do governo nas redes sociais?',
        pl: { texto: 'Acabar com estruturas do governo que rotulam ou punem conteúdos como desinformação: crimes na internet ficam só com a Justiça.', pg: [66, 67] },
        pt: { texto: 'Regulamentar as redes sociais para impedir a difusão de desinformação e de campanhas de ódio, com transparência dos algoritmos.', pg: [16, 55] },
      },
      {
        id: 'judiciario',
        pergunta: 'Qual deve ser a relação com o Judiciário e o STF?',
        pl: { texto: 'Limitar decisões individuais de ministros do STF e tirar do Supremo os julgamentos criminais de parlamentares.', pg: [65] },
        pt: { texto: 'Manter o diálogo com o Judiciário, respeitando a autonomia dos Poderes, para tornar a Justiça mais rápida.', pg: [16] },
      },
      {
        id: 'reforma_politica',
        pergunta: 'Qual deve ser o foco de uma reforma política?',
        pl: { texto: 'Acabar com a reeleição para presidente e fazer uma reforma que aproxime eleitor e eleito e fortaleça partidos com programa claro.', pg: [66] },
        pt: { texto: 'Fazer uma reforma para que os eleitos reflitam melhor a composição da sociedade e enfrentar o peso das emendas parlamentares no orçamento.', pg: [15] },
      },
    ],
  },
]

// Proximidade no estilo dos testes de afinidade eleitoral: cada resposta vai de -2
// (prefere muito a proposta do PL) a +2 (prefere muito a do PT). PL fica no lado
// negativo só por ordem alfabética das siglas. A média vira % de proximidade.
export function placar(respostas) {
  const valores = Object.values(respostas)
  const temas = { pl: 0, pt: 0, neutro: 0 }
  for (const v of valores) temas[v < 0 ? 'pl' : v > 0 ? 'pt' : 'neutro']++
  const media = valores.length ? valores.reduce((a, b) => a + b, 0) / valores.length : 0
  const pt = Math.round(50 + 25 * media)
  return { pt, pl: 100 - pt, temas, resultado: pt > 50 ? 'pt' : pt < 50 ? 'pl' : 'empate' }
}
