export interface Testimonial {
  quote: { en: string; pt: string };
  shortQuote: { en: string; pt: string };
  author: string;
  role: { en: string; pt: string };
}

export interface CaseStudyCopy {
  title: string;
  summary: string;
  /** Legacy long-form sections — Danielle Cunha / GMM Engenharia only, not touched in this pass. */
  overview?: string;
  context?: string;
  whatIBuilt?: string[];
  technical?: string;
  /** Lean Challenge/Approach/Outcome structure — client, product & personal cases. */
  challenge?: string;
  approach: string;
  outcome: string;
}

export interface ProjectImage {
  src: string;
  alt: { en: string; pt: string };
  /** Tailwind aspect-ratio class override for images that aren't 16:10 (e.g. wide dashboard captures). */
  aspect?: string;
}

export interface ProjectImages {
  thumbnail: ProjectImage;
  secondary?: ProjectImage;
  mobile?: ProjectImage;
}

export type ProjectCategory = "client" | "product" | "personal" | "concept";

export interface Project {
  slug: string;
  category: ProjectCategory;
  classification: { en: string; pt: string };
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  liveNote?: { en: string; pt: string };
  images?: ProjectImages;
  /** AI WhatsApp attendant project only — real demo video/GIF isn't ready yet, render a placeholder instead of images. */
  videoPlaceholder?: boolean;
  /** Danielle Cunha / GMM Engenharia are excluded from the current homepage curation, but their case pages stay live. */
  showOnHome?: boolean;
  testimonial?: Testimonial;
  en: CaseStudyCopy;
  pt: CaseStudyCopy;
}

export const projects: Project[] = [
  {
    slug: "licittare-crm",
    category: "client",
    classification: {
      en: "Lead-generation automation for a B2G training company",
      pt: "Automação de captação de leads para uma empresa de treinamento B2G",
    },
    stack: ["JavaScript", "Supabase", "Python", "Chart.js"],
    images: {
      thumbnail: {
        src: "/projects/licittare-crm/dashboard.webp",
        aspect: "aspect-[4/3] sm:aspect-[1440/460]",
        alt: {
          en: "Licittare CRM pipeline view, contacts grouped by sales stage (sample data, not real client leads)",
          pt: "Visão de pipeline do Licittare CRM, contatos agrupados por estágio de venda (dados de exemplo, não são leads reais de clientes)",
        },
      },
      secondary: {
        src: "/projects/licittare-crm/analytics.webp",
        aspect: "aspect-[1440/770]",
        alt: {
          en: "Licittare CRM analytics view with lead-source chart, conversion funnel and top organizations (sample data, not real client leads)",
          pt: "Visão de analytics do Licittare CRM, com gráfico de origem de leads, funil de conversão e principais órgãos (dados de exemplo, não são leads reais de clientes)",
        },
      },
    },
    testimonial: {
      quote: {
        en: "The CRM brought a lot more organization to our sales process. Before, tracking contacts, opportunities, and follow-ups depended on separate spreadsheets and a lot of manual work; now we can see the whole pipeline in one place and know exactly what needs to happen next. It made prospecting more organized and day-to-day work at Licittare much more practical.",
        pt: "O CRM trouxe muito mais organização para o nosso processo comercial. Antes, acompanhar contatos, oportunidades e follow-ups dependia de controles separados e muito trabalho manual; agora conseguimos visualizar todo o processo em um só lugar e saber exatamente o que precisa ser feito. Isso deixou a prospecção mais organizada e o dia a dia da Licittare muito mais prático.",
      },
      shortQuote: {
        en: "Now we can see the whole pipeline in one place and know exactly what needs to happen next.",
        pt: "Agora conseguimos visualizar todo o processo em um só lugar e saber exatamente o que precisa ser feito.",
      },
      author: "Madeline",
      role: { en: "Sales Lead, Licittare", pt: "Responsável Comercial, Licittare" },
    },
    en: {
      title: "Licittare CRM",
      summary:
        "A B2G training company needed to find businesses that had just won public tenders, its best sales leads, but was hunting for them by hand on government portals every day, with sales activity scattered across spreadsheets. I built an automated daily pipeline that finds and enriches new leads on its own, feeding a single sales dashboard the team actually uses.",
      challenge:
        "Licittare runs training and courses on public-procurement law for companies that sell to the Brazilian government (a B2G business). Its best leads are companies that just won a public tender, they're the ones most likely to need compliance training soon after winning. Finding them meant someone manually checking government procurement portals every day, a process that's slow, easy to miss, and doesn't scale past one person's attention. On the sales side, Licittare had no single place to track contacts, opportunities and follow-ups. Everything lived in separate spreadsheets and manual reminders, which meant leads fell through simply because no one had a clear view of what stage they were in or what needed to happen next. The business needed two things at once: a real sales pipeline it could see, and an automated way to stop hunting for leads by hand every morning.",
      approach:
        "I split the problem into two independent parts that could evolve on their own schedule: a dashboard for the sales side, pipeline, contacts, analytics, and a fully automated data-collection pipeline for the sourcing side. Coupling them tightly would have meant every change to the sales process risked breaking lead sourcing, and vice versa. For the dashboard, I built a lightweight single-page app in vanilla JavaScript talking directly to Supabase, rather than reaching for a heavier framework: the priority was shipping a usable internal tool fast for a team of a few people, not building for a scale Licittare didn't have yet. For sourcing, I built a separate Python agent, deployed on its own schedule, that queries Brazil's public procurement API (PNCP) and the Portal da Transparência for newly awarded contracts, then enriches each company found by looking up its CNPJ via the ReceitaWS API to pull corporate name, address and contact details. Supabase Edge Functions handle ingesting those enriched contacts into the CRM and triggering follow-up alerts, so the sourcing agent and the dashboard stay connected without being the same codebase.",
      outcome:
        "Delivered a working internal CRM, in active use by the client, that replaced manual lead-hunting with an automated daily pipeline: a multi-view dashboard (Today, Pipeline, Contacts, Leads, Analytics) backed by a Python agent that finds and enriches new leads twice a day, with no one checking a government portal by hand. Sales activity that used to live across separate spreadsheets and personal reminders now runs through a single pipeline view, and follow-ups get triggered automatically instead of depending on someone remembering. Licittare's sales lead adopted the system for daily use within the first sprint.",
    },
    pt: {
      title: "Licittare CRM",
      summary:
        "Uma empresa de cursos B2G precisava encontrar empresas que tinham acabado de vencer licitações públicas, seus melhores leads, mas caçava isso na mão nos portais do governo todo dia, com a atividade comercial espalhada em planilhas. Construí um pipeline automatizado que encontra e enriquece leads novos sozinho, alimentando um único dashboard de vendas usado pelo time no dia a dia.",
      challenge:
        "A Licittare dá cursos e treinamentos sobre licitações públicas para empresas que vendem pro governo brasileiro (um negócio B2G). Os melhores leads do negócio são empresas que acabaram de vencer uma licitação, são as mais propensas a precisar de treinamento em compliance logo depois de vencer. Encontrar essas empresas exigia checar manualmente os portais de licitação do governo todo dia, um processo lento, fácil de falhar, e que não escala além da atenção de uma pessoa. Do lado comercial, a Licittare não tinha um lugar único pra acompanhar contatos, oportunidades e follow-ups. Tudo vivia em planilhas separadas e lembretes manuais, o que fazia leads escaparem simplesmente porque ninguém tinha uma visão clara de em que etapa cada um estava ou do que precisava acontecer a seguir. O negócio precisava de duas coisas ao mesmo tempo: um pipeline de vendas real e visível, e uma forma automatizada de parar de caçar leads na mão toda manhã.",
      approach:
        "Dividi o problema em duas partes independentes, que pudessem evoluir no próprio ritmo: um dashboard pro lado comercial, pipeline, contatos, analytics, e um pipeline de coleta de dados totalmente automatizado pro lado de prospecção. Acoplar os dois de forma rígida significaria que qualquer mudança no processo comercial arriscaria quebrar a prospecção, e vice-versa. Pro dashboard, construí uma SPA leve em JavaScript puro, conversando diretamente com o Supabase, em vez de usar um framework mais pesado: a prioridade era entregar uma ferramenta interna utilizável rápido pra um time de poucas pessoas, não construir pra uma escala que a Licittare ainda não tinha. Pra prospecção, construí um agente Python separado, deployado na própria agenda, que consulta a API pública de licitações do Brasil (PNCP) e o Portal da Transparência em busca de contratos recém-firmados, e depois enriquece cada empresa encontrada consultando o CNPJ via API da ReceitaWS pra trazer razão social, endereço e contato. Edge Functions do Supabase cuidam de inserir esses contatos enriquecidos no CRM e disparar alertas de follow-up, então o agente de prospecção e o dashboard ficam conectados sem serem o mesmo código.",
      outcome:
        "Entreguei um CRM interno funcional, em uso ativo pelo cliente, que substituiu a caça manual de leads por um pipeline automatizado diário: um dashboard multi-view (Hoje, Pipeline, Contatos, Leads, Analytics) apoiado por um agente Python que encontra e enriquece leads novos duas vezes ao dia, sem ninguém checando um portal do governo na mão. A atividade comercial que antes vivia espalhada em planilhas e lembretes pessoais agora passa por uma visão única de pipeline, e os follow-ups disparam automaticamente em vez de depender de alguém lembrar. A responsável comercial da Licittare adotou o sistema pro uso diário já no primeiro sprint.",
    },
  },
  {
    slug: "maestria",
    category: "product",
    classification: {
      en: "AI WhatsApp attendant for small business lead qualification",
      pt: "Atendente de IA no WhatsApp para qualificação de leads de pequenas empresas",
    },
    stack: ["Node.js", "Express", "Claude API", "SQLite"],
    videoPlaceholder: true,
    showOnHome: true,
    en: {
      title: "AI WhatsApp Attendant",
      summary:
        "A WhatsApp AI attendant that qualifies leads, holds conversation context and hands off to a human with a ready briefing, built as a reusable, config-only product for small businesses.",
      challenge:
        "Small service businesses, law firms, clinics, brokerages, lose leads in the gap between \"someone messages on WhatsApp\" and \"someone on the team actually replies.\" A solo founder or a small team can't staff WhatsApp around the clock, and by the time someone gets back to a lead, the moment's often gone. I wanted to build a reusable \"digital employee\" that could sit in that gap: receive a message, hold context across the conversation, qualify whether the lead is worth a human's time, and hand off to a real person with enough context that the handoff doesn't feel like starting over. The constraint that mattered most: this had to work for non-technical business owners. No client should ever need to touch code or a database to configure their own instance, since the people running these businesses are not developers and won't hire one to maintain a chatbot.",
      approach:
        "I built one instance per company rather than a multi-tenant system, each configured entirely through files: a config.json for business rules and a knowledge.md for what the assistant should know, with no code changes required to onboard a new business. Prompts live in Markdown with {{variables}} substituted at runtime, so tone and knowledge can be edited without touching the assistant's logic. The stack is Node.js and Express talking to Claude's API for the conversational layer, with SQLite for lightweight per-instance memory, no shared database needed when each business runs its own instance. The WhatsApp integration turned out to be the hardest part in practice: I started on Evolution API/Baileys, but hit a structural session bug I couldn't resolve (\"closing session in favor of incoming prekey bundle\") that caused silent disconnects. I migrated the whole integration layer to Z-API mid-build rather than patch around it, then moved the process to systemd with automatic reconnection after a real ~18-hour outage from a dropped session went unnoticed. Transfer to a human happens on configurable keywords or a message-count limit, and the assistant generates a short briefing for the human before handing off, so no context gets lost in the switch.",
      outcome:
        "The assistant is running in production on a live WhatsApp number, not a demo environment, answering real inbound messages with a plain, direct tone and no emoji, and it never quotes a price, it routes pricing questions to a proper diagnostic conversation instead. It handles scheduling end-to-end: checking real Google Calendar availability, creating the event with a Meet link, and sending a briefing over WhatsApp once a meeting is confirmed. A dedicated monitoring sheet and automated health checks catch failures before they turn into another silent outage. An automated follow-up sequence is built and tested, and is staged for activation pending a final tone review before it starts messaging real leads.",
    },
    pt: {
      title: "Atendente de IA no WhatsApp",
      summary:
        "Um atendente de IA no WhatsApp que qualifica leads, mantém contexto da conversa e transfere pra um humano com um briefing pronto, construído como produto reutilizável e configurável só por arquivo, pra pequenas empresas.",
      challenge:
        "Pequenas empresas de serviço, escritórios de advocacia, clínicas, corretoras, perdem leads no intervalo entre \"alguém manda mensagem no WhatsApp\" e \"alguém do time realmente responde\". Um fundador solo ou um time pequeno não consegue cobrir o WhatsApp 24 horas, e quando alguém responde o lead, o momento muitas vezes já passou. Eu queria construir um \"funcionário digital\" reutilizável pra ocupar essa lacuna: receber a mensagem, manter contexto ao longo da conversa, qualificar se o lead vale o tempo de um humano, e transferir pra uma pessoa real com contexto suficiente pra a transferência não parecer um recomeço. A restrição mais importante: isso precisava funcionar pra donos de negócio não-técnicos. Nenhum cliente deveria precisar mexer em código ou banco de dados pra configurar a própria instância, já que quem toca esses negócios não é desenvolvedor e não vai contratar um pra manter um chatbot.",
      approach:
        "Construí uma instância por empresa em vez de um sistema multi-tenant, cada uma configurada inteiramente por arquivo: um config.json com as regras do negócio e um knowledge.md com o que o atendente precisa saber, sem precisar mudar código pra integrar uma empresa nova. Os prompts vivem em Markdown com {{variáveis}} substituídas em tempo de execução, então tom e conhecimento podem ser editados sem tocar na lógica do atendente. A stack é Node.js e Express conversando com a API do Claude pra camada de conversa, com SQLite pra memória leve por instância, sem precisar de banco compartilhado já que cada empresa roda a própria instância. A integração com WhatsApp acabou sendo a parte mais difícil na prática: comecei com Evolution API/Baileys, mas esbarrei num bug estrutural de sessão que não consegui resolver (\"closing session in favor of incoming prekey bundle\"), que causava desconexões silenciosas. Migrei toda a camada de integração pra Z-API no meio da construção em vez de tentar contornar o bug, e depois passei o processo pra systemd com reconexão automática, depois de uma queda real de ~18 horas por uma sessão caída que passou despercebida. A transferência pra humano acontece por palavras-chave configuráveis ou limite de mensagens, e o atendente gera um briefing curto pro humano antes de transferir, pra nenhum contexto se perder na troca.",
      outcome:
        "O atendente está rodando em produção, num número real de WhatsApp, não um ambiente de demonstração, respondendo mensagens reais com tom direto e sem emoji, e nunca informa preço, encaminha perguntas de valor pra uma conversa de diagnóstico de verdade. Ele cuida do agendamento de ponta a ponta: checa disponibilidade real no Google Calendar, cria o evento com link do Meet, e manda um briefing por WhatsApp quando a reunião é confirmada. Uma planilha de monitoramento dedicada e healthchecks automatizados pegam falhas antes que virem outra queda silenciosa. Uma sequência automática de follow-up já está construída e testada, aguardando só a aprovação final do tom antes de ativar com leads reais.",
    },
  },
  {
    slug: "growth-marketing-command-center",
    category: "personal",
    classification: {
      en: "Marketing analytics dashboard for growth operations teams",
      pt: "Dashboard de analytics de marketing para times de growth",
    },
    stack: ["HTML5", "CSS3", "JavaScript", "SQL"],
    liveUrl: "https://growth-marketing-command-center.vercel.app/",
    githubUrl: "https://github.com/lucafurtado/growth-marketing-command-center",
    images: {
      thumbnail: {
        src: "/projects/growth-marketing-command-center/desktop-home.webp",
        alt: {
          en: "Growth Marketing Command Center executive KPI overview, channel performance and campaign efficiency matrix",
          pt: "Visão executiva de KPIs do Growth Marketing Command Center, performance por canal e matriz de eficiência de campanhas",
        },
      },
      secondary: {
        src: "/projects/growth-marketing-command-center/desktop-detail.webp",
        alt: {
          en: "Growth Marketing Command Center channel performance and executive insights panels",
          pt: "Painéis de performance por canal e insights executivos do Growth Marketing Command Center",
        },
      },
      mobile: {
        src: "/projects/growth-marketing-command-center/mobile-home.webp",
        aspect: "aspect-[390/844]",
        alt: {
          en: "Growth Marketing Command Center on a mobile viewport",
          pt: "Growth Marketing Command Center em viewport mobile",
        },
      },
    },
    en: {
      title: "Growth Marketing Command Center",
      summary:
        "Marketing teams running paid, organic and retargeting side by side usually can't say fast which channel is actually worth scaling. I built a self-directed executive dashboard connecting spend, acquisition efficiency and revenue per channel, so the budget call is backed by ROAS and CAC, not raw lead volume.",
      challenge:
        "Marketing teams that run paid, organic and retargeting campaigns side by side usually can't answer a simple question fast: which channel is actually worth scaling? A campaign can look successful on raw lead volume while quietly losing money on CAC, or converting leads that never turn into qualified pipeline. Most teams end up stitching this picture together from separate ad-platform dashboards, a CRM export and a spreadsheet, after the budget decision was already due. I built this as a self-directed project to demonstrate the other side of my background, the growth and marketing-operations side, not just the ability to wire up a CRM or a booking flow. The goal was a single executive view that connects spend, acquisition efficiency and revenue outcome per channel, the kind of dashboard a growth ops or RevOps team would actually use to decide where to scale and where to cut.",
      approach:
        "I built it frontend-only on purpose: HTML, CSS and vanilla JavaScript reading from a local JSON dataset, with no backend and no external JS dependencies. That constraint was deliberate, the point of this project is the analytics model and the executive-reporting layer, not a server, so I kept the stack out of the way of that. I designed the KPI set around what a growth or RevOps team actually decides on: spend, revenue, ROAS, CAC, qualified leads and conversion rate, not vanity metrics like impressions or raw clicks. The Campaign Efficiency Matrix groups every campaign into a decision bucket, high ROAS/low CAC, high spend/low return, scaling opportunity, underperforming, so the dashboard argues for a specific budget action instead of just displaying numbers. I also wrote the underlying SQL queries the dashboard's aggregates are meant to represent and included them in the repo, since in a real environment this data would come from a warehouse, not a static JSON file, and I wanted the project to show that reasoning, not hide it behind mock data with no traceable source.",
      outcome:
        "Delivered a complete, working dashboard covering executive KPIs, channel-level performance, a campaign efficiency matrix, monthly trends and full filtering by channel, objective, status and month, backed by a realistic mock dataset and the SQL queries that dataset is meant to represent. It's one of four executive-analytics dashboards I built the same way (CRM funnel, marketplace operations, SaaS customer journey), each aimed at a different operations discipline, to build a portfolio proof point in a domain, growth and marketing analytics, that's directly relevant to the client work I do but isn't visible in a client case study on its own.",
    },
    pt: {
      title: "Growth Marketing Command Center",
      summary:
        "Times de marketing que rodam campanhas pagas, orgânicas e de retargeting ao mesmo tempo geralmente não conseguem dizer rápido qual canal realmente vale escalar. Construí um dashboard executivo autoral conectando investimento, eficiência de aquisição e receita por canal, pra a decisão de orçamento se apoiar em ROAS e CAC, não em volume bruto de leads.",
      challenge:
        "Times de marketing que rodam campanhas pagas, orgânicas e de retargeting ao mesmo tempo geralmente não conseguem responder rápido uma pergunta simples: qual canal realmente vale a pena escalar? Uma campanha pode parecer bem-sucedida em volume bruto de leads enquanto perde dinheiro silenciosamente em CAC, ou converte leads que nunca viram pipeline qualificado. A maioria dos times acaba costurando esse quadro juntando dashboards separados de cada plataforma de anúncio, uma exportação de CRM e uma planilha, depois que a decisão de orçamento já estava vencida. Construí isso como um projeto autoral pra mostrar o outro lado do meu background, o lado de growth e marketing operations, não só a capacidade de montar um CRM ou um fluxo de agendamento. O objetivo era uma visão executiva única que conecta investimento, eficiência de aquisição e resultado em receita por canal, o tipo de dashboard que um time de growth ops ou RevOps realmente usaria pra decidir onde escalar e onde cortar.",
      approach:
        "Construí só o frontend de propósito: HTML, CSS e JavaScript puro lendo de um dataset JSON local, sem backend e sem dependências externas de JS. Essa restrição foi deliberada, o ponto desse projeto é o modelo de analytics e a camada de relatório executivo, não um servidor, então mantive a stack fora do caminho disso. Desenhei o conjunto de KPIs em torno do que um time de growth ou RevOps realmente decide: investimento, receita, ROAS, CAC, leads qualificados e taxa de conversão, não métricas de vaidade como impressões ou cliques brutos. A Matriz de Eficiência de Campanhas agrupa cada campanha numa categoria de decisão, ROAS alto/CAC baixo, investimento alto/retorno baixo, oportunidade de escala, abaixo do esperado, então o dashboard argumenta por uma ação de orçamento específica em vez de só mostrar números. Também escrevi as queries SQL que os agregados do dashboard deveriam representar e incluí no repositório, já que num ambiente real esses dados viriam de um warehouse, não de um JSON estático, e eu queria que o projeto mostrasse esse raciocínio, não escondesse atrás de dados fake sem origem rastreável.",
      outcome:
        "Entreguei um dashboard completo e funcional cobrindo KPIs executivos, performance por canal, matriz de eficiência de campanhas, tendências mensais e filtros completos por canal, objetivo, status e mês, apoiado num dataset mock realista e nas queries SQL que esse dataset deveria representar. É um dos quatro dashboards executivos que construí da mesma forma (funil de CRM, operações de marketplace, jornada de cliente SaaS), cada um focado numa disciplina de operações diferente, pra construir uma prova de portfólio numa área, analytics de growth e marketing, que é diretamente relevante pro trabalho que faço com clientes mas não aparece sozinha num case study de cliente.",
    },
  },
  {
    slug: "crm-funnel-analytics-dashboard",
    category: "personal",
    classification: {
      en: "Pipeline visibility and revenue forecasting for a sales team",
      pt: "Visibilidade de pipeline e previsão de receita para um time de vendas",
    },
    stack: ["HTML5", "CSS3", "JavaScript", "SQL"],
    liveUrl: "https://crm-funnel-analytics-dashboard.vercel.app/",
    githubUrl: "https://github.com/lucafurtado/crm-funnel-analytics-dashboard",
    images: {
      thumbnail: {
        src: "/projects/crm-funnel-analytics-dashboard/thumb.webp",
        alt: {
          en: "CRM Funnel Analytics dashboard showing pipeline KPIs and funnel-stage conversion from visitor to customer",
          pt: "Dashboard CRM Funnel Analytics mostrando KPIs de pipeline e conversão por estágio do funil, de visitante a cliente",
        },
      },
    },
    en: {
      title: "CRM Funnel Analytics",
      summary:
        "A sales team pulling leads from several sources usually can't say, in one place, where deals are actually getting stuck or how much revenue is really likely to close. I built a self-directed CRM analytics dashboard that tracks how leads move from acquisition to customer and forecasts pipeline value with probability-weighted revenue.",
      challenge:
        "A sales team pulling leads from several sources can tell you how many leads came in, but rarely how efficiently they're moving through the funnel or which stage is actually the bottleneck. A healthy-looking top of funnel can still leak revenue if MQL-to-SQL conversion is weak, or if deals stall at a specific stage without anyone noticing until the forecast misses. Most teams answer this by cross-referencing a CRM export against a spreadsheet after the fact, well after the point where they could have acted on it.",
      approach:
        "Built the same way as the rest of this self-directed dashboard series: HTML, CSS and vanilla JavaScript reading from a local dataset, no backend, so the project is about the analytics model, not infrastructure. The dashboard tracks records through six funnel stages, Visitor, Lead, MQL, SQL, Opportunity, Customer, with a stage-by-stage conversion view so a stalled stage is visible immediately instead of buried in a spreadsheet pivot. Alongside stage conversion, it surfaces the numbers a sales leader actually forecasts on: pipeline value, probability-weighted expected revenue, average CAC and average ROAS, filterable by lead source, funnel stage, sales owner and segment, so the view can narrow from the whole pipeline down to one rep's open deals without leaving the dashboard.",
      outcome:
        "Delivered a working funnel-analytics dashboard with full-pipeline KPIs, stage-by-stage conversion tracking and probability-weighted revenue forecasting, backed by a realistic mock dataset. It's one of four executive-analytics dashboards I built the same way (growth marketing, marketplace operations, SaaS customer journey), each aimed at a different operations discipline.",
    },
    pt: {
      title: "CRM Funnel Analytics",
      summary:
        "Um time de vendas captando leads de várias fontes geralmente não consegue dizer, num só lugar, onde os negócios estão realmente travando ou quanta receita tem chance real de fechar. Construí um dashboard autoral de analytics de CRM que acompanha como os leads avançam da aquisição até virar cliente e projeta o valor do pipeline com receita ponderada por probabilidade.",
      challenge:
        "Um time de vendas captando leads de várias fontes consegue dizer quantos leads entraram, mas raramente com que eficiência eles avançam pelo funil ou qual etapa é realmente o gargalo. Um topo de funil que parece saudável ainda pode vazar receita se a conversão de MQL pra SQL for fraca, ou se negócios travarem numa etapa específica sem ninguém perceber até o forecast falhar. A maioria dos times responde isso cruzando uma exportação de CRM com uma planilha depois do fato, bem depois do ponto em que dava pra agir.",
      approach:
        "Construído da mesma forma que o resto dessa série de dashboards autorais: HTML, CSS e JavaScript puro lendo de um dataset local, sem backend, pra o projeto ficar focado no modelo de analytics, não em infraestrutura. O dashboard acompanha registros por seis estágios de funil, Visitante, Lead, MQL, SQL, Oportunidade, Cliente, com uma visão de conversão estágio a estágio pra uma etapa travada ficar visível na hora em vez de escondida numa tabela dinâmica. Junto da conversão por estágio, ele traz os números que um líder de vendas realmente usa pra prever receita: valor de pipeline, receita esperada ponderada por probabilidade, CAC médio e ROAS médio, filtráveis por origem do lead, estágio do funil, responsável comercial e segmento, pra a visão ir do pipeline inteiro até os negócios abertos de um vendedor específico sem sair do dashboard.",
      outcome:
        "Entreguei um dashboard funcional de analytics de funil com KPIs completos de pipeline, acompanhamento de conversão estágio a estágio e previsão de receita ponderada por probabilidade, apoiado num dataset mock realista. É um dos quatro dashboards executivos que construí da mesma forma (growth marketing, operações de marketplace, jornada de cliente SaaS), cada um focado numa disciplina de operações diferente.",
    },
  },
  {
    slug: "saas-customer-journey-dashboard",
    category: "personal",
    classification: {
      en: "Customer Success and account-health analytics for a SaaS business",
      pt: "Analytics de Customer Success e saúde de conta para um negócio SaaS",
    },
    stack: ["HTML5", "CSS3", "JavaScript", "SQL"],
    liveUrl: "https://saas-customer-journey-dashboard.vercel.app/",
    githubUrl: "https://github.com/lucafurtado/saas-customer-journey-dashboard",
    images: {
      thumbnail: {
        src: "/projects/saas-customer-journey-dashboard/thumb.webp",
        alt: {
          en: "SaaS Customer Journey Dashboard showing MRR, account health and churn-risk KPIs alongside onboarding progress",
          pt: "Dashboard SaaS Customer Journey mostrando KPIs de MRR, saúde de conta e risco de churn, além do progresso de onboarding",
        },
      },
    },
    en: {
      title: "SaaS Customer Journey Dashboard",
      summary:
        "A Customer Success team managing dozens of accounts usually finds out one is at risk of churning only after it's gone quiet. I built a self-directed executive dashboard that tracks account health, onboarding progress and churn risk in one view, so at-risk accounts surface before renewal, not after.",
      challenge:
        "Customer Success in a SaaS business depends on catching a declining account early, low product usage, a stalled onboarding, a support ticket that never got resolved, but that signal is usually scattered across a product-analytics tool, a support inbox and a CRM, with no single view connecting them to revenue. By the time churn risk shows up in the MRR number, the account was already lost. Teams need one place that ties account health, onboarding completion and revenue together, not three separate tools that each show part of the picture.",
      approach:
        "Same self-directed, frontend-only build as the rest of this dashboard series: HTML, CSS and vanilla JavaScript against a local dataset, so the project is about the CS analytics model, not a server. I centered the dashboard on a composite health score per account, alongside the inputs that actually feed it: NPS, onboarding completion percentage, and a flagged high-risk account count, next to the revenue metrics a CS or RevOps lead is ultimately accountable for, current MRR, active accounts, MRR growth. A dedicated churn-risk view and an onboarding-progress breakdown make it possible to see which accounts need attention this week, not just how revenue trended last month.",
      outcome:
        "Delivered a working dashboard covering MRR and MRR growth, active and high-risk account counts, NPS, onboarding completion and a churn-risk breakdown, backed by a realistic mock dataset. It's one of four executive-analytics dashboards I built the same way (growth marketing, CRM funnel, marketplace operations), each aimed at a different operations discipline.",
    },
    pt: {
      title: "SaaS Customer Journey Dashboard",
      summary:
        "Um time de Customer Success gerenciando dezenas de contas geralmente só descobre que uma está em risco de churn depois que ela já ficou quieta. Construí um dashboard executivo autoral que acompanha saúde de conta, progresso de onboarding e risco de churn numa única visão, pra contas em risco aparecerem antes da renovação, não depois.",
      challenge:
        "Customer Success num negócio SaaS depende de pegar uma conta em declínio cedo, uso baixo do produto, onboarding travado, um chamado de suporte que nunca foi resolvido, mas esse sinal geralmente está espalhado entre uma ferramenta de product analytics, uma caixa de suporte e um CRM, sem uma visão única conectando tudo à receita. Quando o risco de churn aparece no número de MRR, a conta já foi perdida. Times precisam de um lugar só que junte saúde de conta, conclusão de onboarding e receita, não três ferramentas separadas mostrando cada uma um pedaço do quadro.",
      approach:
        "Mesma construção autoral e só de frontend do resto dessa série de dashboards: HTML, CSS e JavaScript puro contra um dataset local, pra o projeto ficar focado no modelo de analytics de CS, não num servidor. Centrei o dashboard num health score composto por conta, junto com o que realmente alimenta esse score: NPS, percentual de conclusão de onboarding, e uma contagem de contas sinalizadas como alto risco, ao lado das métricas de receita que um líder de CS ou RevOps responde no fim das contas: MRR atual, contas ativas, crescimento de MRR. Uma visão dedicada de risco de churn e um detalhamento do progresso de onboarding tornam possível ver quais contas precisam de atenção nessa semana, não só como a receita andou no mês passado.",
      outcome:
        "Entreguei um dashboard funcional cobrindo MRR e crescimento de MRR, contagem de contas ativas e de alto risco, NPS, conclusão de onboarding e um detalhamento de risco de churn, apoiado num dataset mock realista. É um dos quatro dashboards executivos que construí da mesma forma (growth marketing, funil de CRM, operações de marketplace), cada um focado numa disciplina de operações diferente.",
    },
  },
  {
    slug: "marketplace-operations-dashboard",
    category: "personal",
    classification: {
      en: "Marketplace operations visibility across revenue, fulfillment and ad efficiency",
      pt: "Visibilidade de operações de marketplace em receita, fulfillment e eficiência de anúncios",
    },
    stack: ["HTML5", "CSS3", "JavaScript", "SQL"],
    liveUrl: "https://marketplace-operations-dashboard.vercel.app/",
    githubUrl: "https://github.com/lucafurtado/marketplace-operations-dashboard",
    images: {
      thumbnail: {
        src: "/projects/marketplace-operations-dashboard/thumb.webp",
        alt: {
          en: "Marketplace Operations Dashboard showing revenue, margin and TACOS KPIs, channel revenue distribution and an operational alerts queue",
          pt: "Dashboard Marketplace Operations mostrando KPIs de receita, margem e TACOS, distribuição de receita por canal e uma fila de alertas operacionais",
        },
      },
    },
    en: {
      title: "Marketplace Operations Dashboard",
      summary:
        "A seller running the same catalog across multiple marketplaces usually can't see, in one place, which channel is actually profitable once ad spend and stock risk are counted, only which one sells the most. I built a self-directed operations dashboard that connects revenue, margin, inventory health and advertising efficiency across channels into one executive view.",
      challenge:
        "Selling the same catalog across multiple marketplaces (Mercado Livre, Amazon, Shopee and similar) means revenue, margin, ad spend and stock levels each live inside that platform's own seller dashboard. A channel can look like the top performer on raw revenue while quietly running a thin net margin once TACOS, ad spend as a share of revenue, is factored in, or while several SKUs are one bad week away from stocking out. Catching that requires stitching together numbers from every platform by hand, usually after the stockout or the margin problem has already happened.",
      approach:
        "Built the same way as the rest of this dashboard series: HTML, CSS and vanilla JavaScript against a local dataset, frontend-only, so the focus is the operations model, not infrastructure. I designed the KPI set around what actually drives a marketplace operator's decisions: revenue, net profit and net margin, TACOS, and an inventory-health score, all filterable by marketplace, category, fulfillment type and month, plus a channel-exposure breakdown so it's clear how concentrated revenue is on any one platform. An operational-alerts panel flags SKUs running below safe stock coverage and channels where margin is compressing, so the dashboard surfaces problems before they become stockouts or an unprofitable channel, instead of just reporting totals after the fact.",
      outcome:
        "Delivered a working dashboard covering executive KPIs, channel-level revenue distribution, fulfillment and advertising efficiency, and a live operational-alerts queue for stock and margin risk, backed by a realistic mock dataset. It's one of four executive-analytics dashboards I built the same way (growth marketing, CRM funnel, SaaS customer journey), each aimed at a different operations discipline.",
    },
    pt: {
      title: "Marketplace Operations Dashboard",
      summary:
        "Um vendedor rodando o mesmo catálogo em vários marketplaces geralmente não vê, num só lugar, qual canal é realmente lucrativo depois de contar gasto com anúncio e risco de estoque, só qual vende mais. Construí um dashboard autoral de operações que conecta receita, margem, saúde de estoque e eficiência de anúncios entre canais numa visão executiva única.",
      challenge:
        "Vender o mesmo catálogo em vários marketplaces (Mercado Livre, Amazon, Shopee e afins) significa que receita, margem, gasto com anúncio e nível de estoque vivem cada um dentro do painel de vendedor daquela plataforma. Um canal pode parecer o melhor em receita bruta enquanto roda com uma margem líquida apertada quando se conta o TACOS, o gasto com anúncio como fatia da receita, ou enquanto vários SKUs estão a uma semana ruim de esgotar o estoque. Perceber isso exige juntar os números de cada plataforma na mão, geralmente depois que a ruptura de estoque ou o problema de margem já aconteceu.",
      approach:
        "Construído da mesma forma que o resto dessa série de dashboards: HTML, CSS e JavaScript puro contra um dataset local, só frontend, pra o foco ficar no modelo de operações, não em infraestrutura. Desenhei o conjunto de KPIs em torno do que realmente move a decisão de quem opera um marketplace: receita, lucro líquido e margem líquida, TACOS, e um score de saúde de estoque, todos filtráveis por marketplace, categoria, tipo de fulfillment e mês, além de um detalhamento de exposição por canal pra ficar claro quão concentrada a receita está numa única plataforma. Um painel de alertas operacionais sinaliza SKUs abaixo da cobertura de estoque de segurança e canais com margem em compressão, então o dashboard mostra os problemas antes que virem ruptura de estoque ou um canal deficitário, em vez de só reportar totais depois do fato.",
      outcome:
        "Entreguei um dashboard funcional cobrindo KPIs executivos, distribuição de receita por canal, eficiência de fulfillment e anúncios, e uma fila viva de alertas operacionais de estoque e margem, apoiado num dataset mock realista. É um dos quatro dashboards executivos que construí da mesma forma (growth marketing, funil de CRM, jornada de cliente SaaS), cada um focado numa disciplina de operações diferente.",
    },
  },
  {
    slug: "indesigns",
    category: "client",
    classification: {
      en: "Marketing site for a Brasília interior design studio",
      pt: "Site institucional para um estúdio de arquitetura de interiores em Brasília",
    },
    stack: ["HTML5", "CSS3", "JavaScript", "Technical SEO"],
    githubUrl: "https://github.com/lucafurtado/indesigns-mkt-",
    liveNote: {
      en: "Built and deployment-ready, with live launch pending the client's domain registration.",
      pt: "Construído e pronto para deploy, com publicação pendente do registro de domínio do cliente.",
    },
    images: {
      thumbnail: {
        src: "/projects/indesigns/desktop-home.webp",
        alt: {
          en: "InDesigns homepage hero, an editorial-style landing page for a Brasília interior design studio",
          pt: "Hero da homepage do InDesigns, uma landing page em estilo editorial para um estúdio de arquitetura de interiores em Brasília",
        },
      },
      secondary: {
        src: "/projects/indesigns/desktop-detail.webp",
        alt: {
          en: "InDesigns case-study page for the Orbis Psicologia project",
          pt: "Página de case study do InDesigns para o projeto Orbis Psicologia",
        },
      },
      mobile: {
        src: "/projects/indesigns/mobile-home.webp",
        aspect: "aspect-[390/844]",
        alt: {
          en: "InDesigns homepage on a mobile viewport",
          pt: "Homepage do InDesigns em viewport mobile",
        },
      },
    },
    testimonial: {
      quote: {
        en: "Working with Luca on the website was a smooth process. He understood Indesigns' identity and turned what we wanted to convey into a site that truly represents the studio. We now have a much more professional digital presence, aligned with our work.",
        pt: "Trabalhar com o Luca na construção do site foi um processo muito tranquilo. Ele conseguiu entender a identidade da Indesigns e transformar o que a gente queria transmitir em um site que realmente representa o estúdio. Hoje temos uma presença digital muito mais profissional e alinhada com o nosso trabalho.",
      },
      shortQuote: {
        en: "He understood Indesigns' identity and turned what we wanted to convey into a site that truly represents the studio.",
        pt: "Ele conseguiu entender a identidade da Indesigns e transformar o que a gente queria transmitir em um site que realmente representa o estúdio.",
      },
      author: "Indira",
      role: { en: "Founder, InDesigns", pt: "Fundadora, InDesigns" },
    },
    en: {
      title: "InDesigns",
      summary:
        "A design studio had real, finished work but no way to show it, every conversation with a prospective client started from zero, with no local search presence to back up word-of-mouth referrals. I built a multi-page site with dedicated case-study pages for each completed project, with full technical SEO built in from day one so the studio actually surfaces in local search.",
      challenge:
        "InDesigns is an interior design and architecture studio based in Brasília. The studio had real, finished work, a psychology clinic, a rooftop common area, several residential renovations, but no site to show it. Without one, every conversation with a prospective client started from zero: no way to point at a specific completed project, no local search presence, and no professional digital footprint to back up word-of-mouth referrals. The studio needed a website that did more than exist: it needed dedicated pages for individual completed projects so a prospect could see specific, real work instead of a generic before/after gallery, and it needed to actually surface in local search, since a design studio at this scale depends on being found nearby, not on paid acquisition.",
      approach:
        "I structured the site as a set of linked pages instead of one long homepage: a main site with an overview, and dedicated project pages that each function as a small case study in their own right. That decision came first, before any visual work, because the core problem was information architecture, not decoration. I treated technical SEO as a first-class requirement from the start rather than an afterthought: meta tags, Open Graph and Twitter Card metadata, and JSON-LD LocalBusiness structured data were part of the initial build, not a later pass. On the implementation side, I chose to hand-build the site with static HTML, CSS and JavaScript instead of reaching for a framework or CMS. For a small studio that will maintain this site themselves long after I'm gone, a framework's dependency surface and a CMS's admin panel are both more to break than to gain, given the page count and update frequency involved. I also set up custom redirect rules so legacy paths resolve to the right in-page anchors instead of dead links, which matters for SEO continuity if the site's structure changes later.",
      outcome:
        "Delivered a complete, deployment-ready website: a multi-page structure with dedicated case-study pages for each finished project, full technical SEO (meta tags, Open Graph, JSON-LD LocalBusiness data), and responsive layouts across every page. Live launch is pending only the client's own domain registration, everything else is built and deployment-ready. The studio went from having no dedicated web presence, just word-of-mouth and a social profile, to a site that can carry a prospective client through its actual body of work project by project.",
    },
    pt: {
      title: "InDesigns",
      summary:
        "Um estúdio de design tinha trabalho real e finalizado, mas nenhuma forma de mostrar isso, toda conversa com um cliente em potencial começava do zero, sem presença em busca local pra sustentar as indicações boca a boca. Construí um site multi-página com páginas de case study dedicadas pra cada projeto entregue, com SEO técnico completo desde o início pra o estúdio aparecer de verdade em busca local.",
      challenge:
        "InDesigns é um estúdio de arquitetura de interiores em Brasília. O estúdio tinha trabalho real e finalizado, uma clínica de psicologia, uma área comum de cobertura, várias reformas residenciais, mas nenhum site pra mostrar isso. Sem um site, toda conversa com um cliente em potencial começava do zero: sem como apontar pra um projeto específico já entregue, sem presença em busca local, sem um respaldo digital profissional pra sustentar as indicações boca a boca. O estúdio precisava de um site que fizesse mais do que existir: precisava de páginas dedicadas por projeto entregue, pra um prospect ver trabalho real e específico em vez de uma galeria genérica de antes/depois, e precisava aparecer de verdade em busca local, já que um estúdio desse porte depende de ser encontrado por perto, não de mídia paga.",
      approach:
        "Estruturei o site como um conjunto de páginas conectadas em vez de uma homepage longa: um site principal com visão geral, e páginas de projeto dedicadas que funcionam como pequenos case studies. Essa decisão veio primeiro, antes de qualquer trabalho visual, porque o problema central era arquitetura de informação, não decoração. Tratei SEO técnico como requisito de primeira classe desde o início, não como um ajuste posterior: meta tags, Open Graph, Twitter Cards e dados estruturados JSON-LD (LocalBusiness) já fizeram parte da construção inicial. Na implementação, optei por construir o site à mão com HTML, CSS e JavaScript estáticos em vez de usar um framework ou CMS. Pra um estúdio pequeno que vai manter esse site sozinho depois que eu sair do projeto, a superfície de dependências de um framework e o painel admin de um CMS são mais coisa pra quebrar do que pra ganhar, dado o número de páginas e a frequência de atualização envolvidos. Também configurei regras de redirect customizadas pra que paths antigos apontem pras âncoras certas em vez de virarem links quebrados, o que importa pra continuidade de SEO se a estrutura do site mudar mais tarde.",
      outcome:
        "Entreguei um site completo e pronto pra deploy: estrutura multi-página com páginas de case study dedicadas por projeto entregue, SEO técnico completo (meta tags, Open Graph, dados estruturados JSON-LD LocalBusiness) e layouts responsivos em todas as páginas. A publicação depende só do registro de domínio do próprio cliente, o resto já está construído e pronto. O estúdio saiu de não ter presença web nenhuma, só boca a boca e um perfil social, pra um site que consegue levar um cliente em potencial pelo portfólio real, projeto por projeto.",
    },
  },
  {
    slug: "danielle-cunha",
    category: "concept",
    showOnHome: false,
    classification: {
      en: "Website Redesign Concept",
      pt: "Concept de Redesign de Website",
    },
    stack: ["GSAP", "ScrollTrigger", "Lenis", "JavaScript"],
    liveUrl: "https://danielle-cunha-berna.pages.dev",
    images: {
      thumbnail: {
        src: "/projects/danielle-cunha/desktop-home.webp",
        alt: {
          en: "Danielle Cunha homepage hero with a dermatology procedure photo and headline",
          pt: "Hero da homepage do Danielle Cunha, com foto de procedimento dermatológico e headline",
        },
      },
      secondary: {
        src: "/projects/danielle-cunha/desktop-detail.webp",
        alt: {
          en: "Danielle Cunha 'About the doctor' section with credentials and specialty",
          pt: "Seção 'A médica' do site Danielle Cunha, com credenciais e especialidade",
        },
      },
      mobile: {
        src: "/projects/danielle-cunha/mobile-home.webp",
        aspect: "aspect-[390/844]",
        alt: {
          en: "Danielle Cunha homepage on a mobile viewport",
          pt: "Homepage do Danielle Cunha em viewport mobile",
        },
      },
    },
    en: {
      title: "Danielle Cunha",
      summary:
        "A scroll-driven redesign concept for a dermatology practice, built with GSAP/ScrollTrigger/SplitText and Lenis for cinematic, editorial-style transitions.",
      overview:
        "An independent concept redesign of the website for a dermatology practice. This wasn't a commissioned client project: it's a self-directed piece built to demonstrate what a more editorial, motion-driven front-end could look like for a healthcare practice's public site.",
      context:
        "Most small-practice medical websites default to generic templates. The goal here was to explore how much further a front-end can go, in typography, pacing and scroll-based storytelling, while still shipping a real, functional, responsive site with genuine procedure information, FAQs and a clear path to booking via WhatsApp.",
      approach:
        "I built the whole page around scroll as the primary interaction: sections reveal in sequence, text splits and animates in line-by-line, and a smooth-scroll library ties the whole experience together so it feels closer to a designed editorial piece than a stock template. Accessibility was a real constraint, not an afterthought: the entire animation layer degrades gracefully for users with `prefers-reduced-motion` enabled.",
      whatIBuilt: [
        "Scroll-triggered section reveals and a desktop-only pinned cinematic sequence, gated behind GSAP's matchMedia for responsive behavior",
        "Line-by-line text-splitting animations on headings using GSAP SplitText",
        "Full smooth-scroll implementation with Lenis, synced to the GSAP ticker",
        "A complete `prefers-reduced-motion` fallback that disables smooth scroll and forces content visible",
        "Mobile navigation, a sticky mobile CTA, and WhatsApp deep links pre-filled with contextual messages throughout the page",
      ],
      technical:
        "Vanilla HTML/CSS/JavaScript, with no framework, using GSAP 3 with the ScrollTrigger and SplitText plugins, plus Lenis for smooth scrolling. JSON-LD Physician structured data is included for SEO. Deployed as a static site on Cloudflare Pages.",
      outcome:
        "Delivered a fully responsive, production-ready concept site covering the complete visitor journey, from procedure information to booking via WhatsApp, with real Google-review testimonials rather than invented ones.",
    },
    pt: {
      title: "Danielle Cunha",
      summary:
        "Um concept de redesign guiado por scroll para uma clínica de dermatologia, construído com GSAP/ScrollTrigger/SplitText e Lenis para transições cinematográficas e editoriais.",
      overview:
        "Um redesign conceitual independente do site de uma clínica de dermatologia. Não foi um projeto encomendado por cliente: é uma peça autoral construída pra mostrar até onde um front-end mais editorial e guiado por movimento pode ir num site público de uma prática de saúde.",
      context:
        "A maioria dos sites de clínicas pequenas usa templates genéricos. O objetivo aqui foi explorar até onde um front-end pode ir, em tipografia, ritmo e narrativa guiada por scroll, entregando ao mesmo tempo um site real, funcional e responsivo, com informação de procedimentos, FAQ e um caminho claro pro agendamento via WhatsApp.",
      approach:
        "Construí a página inteira em torno do scroll como interação principal: seções revelam em sequência, textos se dividem e animam linha por linha, e uma lib de smooth-scroll amarra a experiência toda pra parecer mais uma peça editorial desenhada do que um template pronto. Acessibilidade foi uma restrição real, não um adendo: toda a camada de animação degrada de forma graciosa para usuários com `prefers-reduced-motion` ativado.",
      whatIBuilt: [
        "Revelações de seção disparadas por scroll e uma sequência cinematográfica fixa (pinned) só para desktop, controlada via matchMedia do GSAP",
        "Animações de divisão de texto linha a linha nos títulos usando GSAP SplitText",
        "Smooth-scroll completo com Lenis, sincronizado ao ticker do GSAP",
        "Fallback completo de `prefers-reduced-motion` que desativa o smooth-scroll e força o conteúdo visível",
        "Navegação mobile, CTA fixo no mobile, e links de WhatsApp com mensagens contextuais pré-preenchidas ao longo da página",
      ],
      technical:
        "HTML/CSS/JavaScript puro, sem framework, usando GSAP 3 com os plugins ScrollTrigger e SplitText, mais Lenis para smooth-scroll. Dados estruturados JSON-LD (Physician) incluídos para SEO. Deployado como site estático no Cloudflare Pages.",
      outcome:
        "Entreguei um site conceitual totalmente responsivo e pronto para produção, cobrindo toda a jornada do visitante, da informação de procedimentos ao agendamento via WhatsApp, com depoimentos reais do Google, não inventados.",
    },
  },
  {
    slug: "gmm-engenharia",
    category: "concept",
    showOnHome: false,
    classification: {
      en: "Website Redesign Concept",
      pt: "Concept de Redesign de Website",
    },
    stack: ["GSAP", "ScrollTrigger", "JavaScript", "CSS"],
    liveUrl: "https://gmm-engenharia-berna.pages.dev",
    images: {
      thumbnail: {
        src: "/projects/gmm-engenharia/desktop-home.webp",
        alt: {
          en: "GMM Engenharia homepage hero with an industrial visual direction",
          pt: "Hero da homepage do GMM Engenharia, com direção visual industrial",
        },
      },
      secondary: {
        src: "/projects/gmm-engenharia/desktop-detail.webp",
        alt: {
          en: "GMM Engenharia services section listing waterproofing, construction and renovation",
          pt: "Seção de serviços do GMM Engenharia, listando impermeabilização, construção e reformas",
        },
      },
      mobile: {
        src: "/projects/gmm-engenharia/mobile-home.webp",
        aspect: "aspect-[390/844]",
        alt: {
          en: "GMM Engenharia homepage on a mobile viewport",
          pt: "Homepage do GMM Engenharia em viewport mobile",
        },
      },
    },
    en: {
      title: "GMM Engenharia",
      summary:
        "A concept redesign for a construction and engineering company, with an industrial editorial visual direction and GSAP-driven scroll reveals.",
      overview:
        "An independent concept redesign for a construction and engineering company (waterproofing, residential and commercial construction, facade recovery, epoxy flooring). Like Danielle Cunha, this was self-directed exploratory work, not a commissioned client project.",
      context:
        "Construction and engineering companies at this scale rarely have a site that reflects the technical precision of their actual work. The goal was a visual direction that read as industrial and credible, closer to a construction-tech product page than a generic contractor site, while staying honest about the company's real services and real client feedback.",
      approach:
        "I leaned into an industrial/editorial visual language, navy and concrete tones, condensed display type, and used scroll-triggered GSAP animations more sparingly than on Danielle Cunha, to match a more restrained, technical tone appropriate to the industry.",
      whatIBuilt: [
        "Section-by-section scroll reveals and a scale-based curtain transition for the 'About' section, built with GSAP and ScrollTrigger",
        "Scroll-scrubbed parallax on background imagery",
        "A responsive photo grid showcasing real fieldwork photos",
        "Mobile navigation with a slide-in menu, and WhatsApp deep links for direct contact",
      ],
      technical:
        "Vanilla HTML/CSS/JavaScript, with no framework, using GSAP 3 with the ScrollTrigger plugin (no smooth-scroll library on this one, a lighter setup than Danielle Cunha). Deployed as a static site on Cloudflare Pages.",
      outcome:
        "Delivered a fully responsive concept site with a distinct industrial visual identity, built around the company's real services and a genuine client testimonial.",
    },
    pt: {
      title: "GMM Engenharia",
      summary:
        "Um concept de redesign para uma empresa de construção e engenharia, com direção visual industrial e editorial e animações de scroll com GSAP.",
      overview:
        "Um redesign conceitual independente para uma empresa de construção e engenharia (impermeabilização, construção residencial e comercial, recuperação de fachadas, piso epóxi). Assim como o Danielle Cunha, foi um trabalho exploratório autoral, não um projeto encomendado por cliente.",
      context:
        "Empresas de construção e engenharia desse porte raramente têm um site que reflita a precisão técnica do trabalho real que fazem. O objetivo foi uma direção visual que parecesse industrial e confiável, mais perto de uma página de produto construction-tech do que de um site genérico de empreiteira, mantendo honestidade sobre os serviços reais e o feedback real de clientes da empresa.",
      approach:
        "Apostei numa linguagem visual industrial/editorial, tons de navy e concreto, tipografia condensada, e usei animações de scroll com GSAP de forma mais comedida do que no Danielle Cunha, pra combinar com um tom mais técnico e contido, adequado ao setor.",
      whatIBuilt: [
        "Revelações de seção por scroll e uma transição de cortina baseada em escala pra seção 'Sobre', construídas com GSAP e ScrollTrigger",
        "Parallax controlado por scroll (scrub) nas imagens de fundo",
        "Grid de fotos responsivo mostrando fotos reais de obra",
        "Navegação mobile com menu deslizante, e links de WhatsApp para contato direto",
      ],
      technical:
        "HTML/CSS/JavaScript puro, sem framework, usando GSAP 3 com o plugin ScrollTrigger (sem lib de smooth-scroll aqui, um setup mais leve que o do Danielle Cunha). Deployado como site estático no Cloudflare Pages.",
      outcome:
        "Entreguei um site conceitual totalmente responsivo com identidade visual industrial própria, construído em torno dos serviços reais da empresa e um depoimento genuíno de cliente.",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function homeProjects(): Project[] {
  return projects.filter((p) => p.showOnHome !== false);
}

export function testimonialProjects(): Project[] {
  return projects.filter((p) => p.testimonial);
}
