export type CartaoHub = {
  icone: string;
  titulo: string;
  descricao: string;
  url: string;
  rotulo: string;
};

export type Divisao = {
  nome: string;
  descricao: string;
};

export type ConteudoNemesis = {
  website: {
    titulo: string;
    subtitulo: string;
    cartoes: CartaoHub[];
  };
  divisoes: Divisao[];
};

// Conteúdo padrão. É o que aparece enquanto ninguém editou nada ainda
// pelo Painel de Edição (/admin).
export const NEMESIS_PADRAO: ConteudoNemesis = {
  website: {
    titulo: "O site por dentro",
    subtitulo: "Um ponto de encontro pra tudo que forma a estrutura NÊMESIS.",
    cartoes: [
      {
        icone: "🎮",
        titulo: "DISCORD",
        descricao:
          "Entre no servidor pra acompanhar a comunidade, os avisos e conversar com a equipe.",
        url: "https://discord.gg/SS3ZPDMuXT",
        rotulo: "Entrar no servidor",
      },
      {
        icone: "🤖",
        titulo: "BOT",
        descricao:
          "Adicione o NÊMESIS BOT ao seu próprio servidor e ative os sistemas de administração.",
        url: "https://discord.com/oauth2/authorize?client_id=1530272683525410897&permissions=8&integration_type=0&scope=bot+applications.commands",
        rotulo: "Convidar o bot",
      },
      {
        icone: "🧩",
        titulo: "ROBLOX",
        descricao:
          "Visite a comunidade da NÊMESIS no Roblox e acompanhe as atividades no jogo.",
        url: "https://www.roblox.com/pt/communities/621286796/Comunidade-Nik#!/about",
        rotulo: "Ver comunidade",
      },
      {
        icone: "🏴",
        titulo: "DIVISÕES",
        descricao:
          "Conheça como a estrutura interna da NÊMESIS é organizada, divisão por divisão.",
        url: "/divisoes",
        rotulo: "Ver divisões",
      },
    ],
  },
  divisoes: [
    {
      nome: "COMANDO CENTRAL",
      descricao:
        "Lidera a NÊMESIS como um todo: define direção, prioridades e decisões estratégicas para as demais divisões.",
    },
    {
      nome: "OPERAÇÕES",
      descricao:
        "Organiza guerras, eventos e a agenda competitiva — planeja e executa tudo que envolve a atividade da comunidade.",
    },
    {
      nome: "RECRUTAMENTO",
      descricao:
        "Cuida da entrada de novos membros: avalia inscrições, conduz seleções e integra quem chega.",
    },
    {
      nome: "SUPORTE & MODERAÇÃO",
      descricao:
        "Responde tickets, resolve conflitos e mantém a ordem no servidor, com registro de cada ação tomada.",
    },
    {
      nome: "DESENVOLVIMENTO",
      descricao:
        "Mantém o bot, o site e os sistemas técnicos da NÊMESIS funcionando e evoluindo.",
    },
  ],
};

// Camada simples de "banco de dados": guarda o conteúdo editado no
// localStorage do navegador. Não há backend aqui, então uma edição feita
// no Painel de Edição só aparece pra quem editou, no mesmo navegador
// (ver aviso na página /admin).
const CHAVE = "nemesis_conteudo_v1";

export function nemesisCarregar(): ConteudoNemesis {
  if (typeof window === "undefined") return structuredClone(NEMESIS_PADRAO);
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return structuredClone(NEMESIS_PADRAO);
    const salvo = JSON.parse(bruto);
    return {
      website: salvo.website ?? structuredClone(NEMESIS_PADRAO.website),
      divisoes: Array.isArray(salvo.divisoes)
        ? salvo.divisoes
        : structuredClone(NEMESIS_PADRAO.divisoes),
    };
  } catch (e) {
    console.error("Não deu pra ler o conteúdo salvo, usando o padrão.", e);
    return structuredClone(NEMESIS_PADRAO);
  }
}

export function nemesisSalvar(conteudo: ConteudoNemesis) {
  localStorage.setItem(CHAVE, JSON.stringify(conteudo));
}

export function nemesisRestaurarPadrao() {
  localStorage.removeItem(CHAVE);
      }
