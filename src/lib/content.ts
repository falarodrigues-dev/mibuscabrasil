// Copy oficial extraída do "Prompt de construção — Landing Page + Painel Admin | MiBusca Brasil".
// Implementada como está, ajustando apenas quebras de linha (conforme instrução do prompt).

export const brand = {
  assinatura: "Gestão que gera resultados",
  instagram: "@mibuscabrasil",
  seguidores: "147 mil",
  site: "mibusca.com.br",
};

export const hero = {
  etiqueta: "GESTÃO DE IFOOD, 99FOOD E KEETA",
  h1: "Sua loja vende. Mas quanto realmente entra no fim do mês?",
  subtitulo:
    "A MiBusca assume a gestão das suas operações no iFood, 99Food e Keeta para aumentar pedidos, organizar preços e proteger o valor que é repassado para a sua loja. Você cuida da cozinha. A gente cuida do crescimento.",
  beneficios: [
    { icon: "price", texto: "Mais clareza sobre preços, taxas e descontos" },
    { icon: "menu", texto: "Cardápio organizado para vender mais em cada pedido" },
    { icon: "chart", texto: "Acompanhamento diário de promoções e desempenho" },
  ] as const,
  ctaPrincipal: "Quero falar com um especialista",
};

export const socialProof = {
  titulo: "Resultados construídos dentro da operação de cada loja.",
  numeros: [
    {
      valor: "+161%",
      rotulo: "de faturamento líquido no iFood",
      detalhe: "Pizzaria Dom Paolo, comparando julho/2026 com o mês anterior à parceria",
    },
    {
      valor: "+197%",
      rotulo: "de faturamento líquido no primeiro mês completo",
      detalhe: "Espetinho Top Nordestino",
    },
    {
      valor: "+22,7%",
      rotulo: "de repasse líquido recebido",
      detalhe: "Wonder Burger Salvador",
    },
  ],
  rodape: "Salvador/BA · Gestão de delivery para restaurantes, hamburguerias, lanchonetes e pizzarias.",
};

export const painPoints = {
  titulo: "Se você se reconhece em algum destes pontos, a conversa faz sentido.",
  cards: [
    { icon: "chart" as const, texto: "A loja vende bem, mas o repasse chega abaixo do que você esperava." },
    { icon: "percent" as const, texto: "Você não sabe exatamente quanto está cedendo em cada promoção." },
    { icon: "price" as const, texto: "Precificar considerando taxas, comissões e descontos virou um problema." },
    { icon: "menu" as const, texto: "O cardápio tem produtos, categorias e complementos desorganizados." },
    { icon: "clock" as const, texto: "Falta tempo para acompanhar as oportunidades que as plataformas oferecem." },
    { icon: "layers" as const, texto: "Você está em uma plataforma só e não sabe como entrar nas outras." },
  ],
  fechamento: "Cada um desses pontos é trabalho que a MiBusca executa todos os dias dentro da sua operação.",
};

export const services = {
  titulo: "Uma gestão completa, aplicada todos os dias na sua loja.",
  subtitulo: "Atuação nas três principais plataformas de delivery do país: iFood, 99Food e Keeta.",
  cards: [
    {
      icon: "building" as const,
      titulo: "Estruturação da loja",
      texto: "Revisão completa do perfil, dados, horários e configurações da operação.",
    },
    {
      icon: "menu" as const,
      titulo: "Gestão de cardápio",
      texto: "Organização de categorias, produtos e complementos para aumentar o ticket médio.",
    },
    {
      icon: "price" as const,
      titulo: "Precificação e margem",
      texto: "Ajuste de preços considerando taxas, comissões e descontos de cada plataforma.",
    },
    {
      icon: "tag" as const,
      titulo: "Gestão de promoções e cupons",
      texto: "Campanhas alinhadas ao seu objetivo, sem queimar margem.",
    },
    {
      icon: "search" as const,
      titulo: "Posicionamento na plataforma",
      texto: "Ações para melhorar ranqueamento e visibilidade orgânica.",
    },
    {
      icon: "star" as const,
      titulo: "Inclusão em listas e destaques",
      texto: "Monitoramento e inserção nas vitrines que geram visibilidade real.",
    },
    {
      icon: "activity" as const,
      titulo: "Gestão de performance",
      texto: "Acompanhamento de vendas, ticket médio, cancelamentos e avaliações.",
    },
    {
      icon: "whatsapp" as const,
      titulo: "Canal direto com a equipe",
      texto: "Grupo de WhatsApp com o gestor responsável da sua conta.",
    },
  ],
  ctaSecundario: "Quero que a MiBusca gerencie meu delivery",
};

export const casesAviso =
  "Os valores abaixo foram retirados diretamente dos relatórios das plataformas. Faturamento líquido e repasse líquido são medidas diferentes e estão identificadas em cada case. Resultados variam conforme praça, cardápio, estrutura e operação de cada loja.";

export const cases = {
  titulo: "Três operações, três cenários diferentes.",
  lista: [
    {
      nome: "Pizzaria Dom Paolo",
      tipo: "pizzaria",
      inicioParceria: "16/04/2026",
      metrica: "faturamento líquido no iFood",
      linhas: [
        { rotulo: "Mês-base (março/2026)", valor: "R$ 5.582,21" },
        { rotulo: "Melhor resultado (julho/2026)", valor: "R$ 14.580,44", destaque: "+161,19%" },
        {
          rotulo: "Média dos três primeiros meses completos (mai–jul)",
          valor: "R$ 12.481,87/mês",
          destaque: "+123,60% sobre a base",
        },
      ],
      oQueFoiFeito: "reestruturação de cardápio, precificação e gestão contínua de promoções e visibilidade.",
    },
    {
      nome: "Espetinho Top Nordestino",
      tipo: "espetinho",
      inicioParceria: "07/05/2026",
      metrica: "faturamento líquido no iFood",
      linhas: [
        { rotulo: "Mês-base (abril/2026)", valor: "R$ 4.327,03" },
        { rotulo: "Primeiro mês completo (junho/2026)", valor: "R$ 12.872,23", destaque: "+197,48%" },
        {
          rotulo: "Agosto/2026 até o dia 26 (mês parcial)",
          valor: "R$ 9.218,96",
          destaque: "+113,06% sobre a base",
        },
      ],
      observacao: "maio foi mês de transição, com entrada no dia 07.",
      oQueFoiFeito: null,
    },
    {
      nome: "Wonder Burger Salvador",
      tipo: "hamburgueria",
      inicioParceria: "25/03/2026",
      metrica: "repasse líquido recebido pela loja (não faturamento bruto)",
      situacaoInicial: "um item com desconto muito agressivo reduzia o valor líquido por pedido",
      linhas: [
        { rotulo: "Mês-base (fevereiro/2026)", valor: "R$ 15.298,21" },
        {
          rotulo: "Julho/2026",
          valor: "R$ 18.776,13",
          destaque: "+22,73% (R$ 3.477,92 a mais que a base)",
        },
        { rotulo: "Média de abril a julho", valor: "R$ 17.143,51/mês", destaque: "+12,06% sobre a base" },
      ],
      oQueFoiFeito: "correção gradual da distorção de preço mantendo o giro da operação.",
    },
  ],
  depoimento: {
    citacao: "Já quero agradecer por tudo que vocês estão fazendo na minha loja.",
    autor: "Valéria, Pizzaria Dom Paolo",
    imagem: "/images/depoimento-valeria-dom-paolo.webp",
  },
};

export const howItWorks = {
  titulo: "Do primeiro contato à gestão rodando.",
  passos: [
    {
      titulo: "Você preenche o formulário",
      texto: "Leva menos de um minuto. Usamos seus dados apenas para entrar em contato.",
    },
    {
      titulo: "Conversa com um especialista",
      texto: "Entendemos sua loja, suas plataformas e seu momento atual.",
    },
    {
      titulo: "Diagnóstico e proposta",
      texto: "Apresentamos o que precisa ser ajustado e o plano de trabalho.",
    },
    {
      titulo: "Gestão e acompanhamento",
      texto: "Execução diária, relatórios e canal direto com o gestor da sua conta.",
    },
  ],
};

export const about = {
  titulo: "Do zero à referência em gestão de delivery.",
  texto:
    "A MiBusca nasceu praticamente do zero, com um investimento inicial de cerca de R$ 40, e se tornou uma das maiores empresas de gestão de delivery para negócios do setor alimentício. Hoje somos referência em estratégia, gestão e crescimento para operações de delivery em todo o Brasil. Base em Salvador/BA, atendimento nacional.",
  credibilidade: `${brand.instagram} no Instagram · ${brand.seguidores} seguidores · ${brand.site}`,
};

export const faq = {
  titulo: "Perguntas frequentes",
  perguntas: [
    {
      pergunta: "A MiBusca atende qualquer tipo de restaurante?",
      resposta:
        "Trabalhamos com operações de delivery de alimentação: hamburguerias, pizzarias, lanchonetes, espetinhos, restaurantes e similares. Na conversa inicial avaliamos se o seu caso tem encaixe com o nosso trabalho.",
    },
    {
      pergunta: "Vocês atendem quem ainda não está nas plataformas?",
      resposta: "Sim. Nesse caso o trabalho começa pela estruturação e abertura da loja nas plataformas.",
    },
    {
      pergunta: "Em quanto tempo vejo resultado?",
      resposta:
        "Depende do estado atual da loja, do cardápio e da praça. Os primeiros ajustes são aplicados nos dias iniciais e o acompanhamento é contínuo. Na proposta explicamos o que é possível esperar no seu caso.",
    },
    {
      pergunta: "Como funciona o acompanhamento?",
      resposta: "Acompanhamento das métricas da operação e canal direto de WhatsApp com o gestor responsável pela sua conta.",
    },
    {
      pergunta: "Vocês trabalham com iFood, 99Food e Keeta ao mesmo tempo?",
      resposta: "Sim. A gestão pode ser feita em uma plataforma ou nas três, conforme o seu cenário.",
    },
    {
      pergunta: "Quanto custa?",
      resposta: "O investimento é apresentado depois do diagnóstico, porque depende do número de lojas, das plataformas e do escopo do trabalho.",
    },
  ],
};

export const finalCta = {
  titulo: "Vamos olhar os números da sua loja juntos.",
  subtitulo: "Preencha o formulário e fale com um especialista da MiBusca.",
  cta: "Quero falar com um especialista",
};

export const footer = {
  linhaDescritiva: "Gestão estratégica de operações de delivery no iFood, 99Food e Keeta.",
  copyright: "© 2026 MiBusca Brasil. Todos os direitos reservados.",
};

export const stickyMobileCta = "Falar com especialista";
