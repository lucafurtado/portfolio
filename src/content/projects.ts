export interface CaseStudyCopy {
  title: string;
  summary: string;
  overview: string;
  context: string;
  approach: string;
  whatIBuilt: string[];
  technical: string;
  outcome: string;
}

export interface Project {
  slug: string;
  classification: { en: string; pt: string };
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  liveNote?: { en: string; pt: string };
  en: CaseStudyCopy;
  pt: CaseStudyCopy;
}

export const projects: Project[] = [
  {
    slug: "indesigns",
    classification: {
      en: "Client Project · Website",
      pt: "Projeto de Cliente · Website",
    },
    stack: ["HTML5", "CSS3", "JavaScript", "Technical SEO"],
    githubUrl: "https://github.com/lucafurtado/indesigns-mkt-",
    liveNote: {
      en: "Built and deployment-ready — live launch pending the client's domain registration.",
      pt: "Construído e pronto para deploy — publicação pendente do registro de domínio do cliente.",
    },
    en: {
      title: "InDesigns",
      summary:
        "A multi-page marketing site for a Brasília interior design studio, with dedicated case-study pages for individual completed projects.",
      overview:
        "InDesigns is the marketing website for an interior design and architecture studio based in Brasília. It's a multi-page site — not a single scrolling landing page — built around the studio's actual body of work, with standalone pages for individual completed projects.",
      context:
        "The studio needed a way for prospective clients to browse specific, real projects (a psychology clinic, a rooftop common area, residential renovations) rather than a generic one-pager. Each project has its own story, materials and photos, and needed room to be presented properly.",
      approach:
        "I structured the site as a set of linked pages instead of one long homepage: a main site with an overview, and dedicated project pages that each function as a small case study in their own right. I treated technical SEO as a first-class requirement from the start, since a design studio's site lives or dies by how well it surfaces in local search.",
      whatIBuilt: [
        "Multi-page structure with dedicated case-study pages per completed project",
        "Full technical SEO implementation: meta tags, Open Graph and Twitter Card metadata, JSON-LD LocalBusiness structured data",
        "Custom redirect rules for clean, stable URLs",
        "Responsive layouts across all project pages",
      ],
      technical:
        "Hand-built with static HTML, CSS and JavaScript — no framework or CMS, by design, to keep the site simple and fast for a small studio to maintain. Deployment is configured for Vercel, including custom redirect rules (e.g. legacy paths redirecting to in-page anchors).",
      outcome:
        "Delivered a complete, deployment-ready website with structured project pages, responsive layouts and technical SEO implementation.",
    },
    pt: {
      title: "InDesigns",
      summary:
        "Site institucional multi-página para um estúdio de arquitetura de interiores em Brasília, com páginas dedicadas de case study para cada projeto entregue.",
      overview:
        "InDesigns é o site institucional de um estúdio de arquitetura de interiores em Brasília. É um site com múltiplas páginas — não uma landing page única — construído em torno do portfólio real do estúdio, com páginas próprias para cada projeto já entregue.",
      context:
        "O estúdio precisava de uma forma de mostrar projetos reais e específicos (uma clínica de psicologia, uma área comum de cobertura, reformas residenciais) em vez de uma página genérica única. Cada projeto tem sua própria história, materiais e fotos, e precisava de espaço para ser apresentado direito.",
      approach:
        "Estruturei o site como um conjunto de páginas conectadas em vez de uma homepage longa: um site principal com visão geral, e páginas de projeto dedicadas que funcionam como pequenos case studies. Tratei SEO técnico como requisito desde o início, já que o site de um estúdio de design depende diretamente de aparecer bem em buscas locais.",
      whatIBuilt: [
        "Estrutura multi-página com páginas de case study dedicadas por projeto entregue",
        "Implementação completa de SEO técnico: meta tags, Open Graph, Twitter Cards, dados estruturados JSON-LD (LocalBusiness)",
        "Regras de redirect customizadas para URLs limpas e estáveis",
        "Layouts responsivos em todas as páginas de projeto",
      ],
      technical:
        "Construído à mão com HTML, CSS e JavaScript estáticos — sem framework ou CMS, por decisão de projeto, pra manter o site simples e fácil de manter para um estúdio pequeno. Deploy configurado para Vercel, incluindo regras de redirect customizadas (ex: paths antigos redirecionando para âncoras internas).",
      outcome:
        "Entreguei um site completo e pronto para deploy, com páginas de projeto estruturadas, layouts responsivos e SEO técnico implementado.",
    },
  },
  {
    slug: "licittare-crm",
    classification: {
      en: "Client Project · Web Application — Internal Tool / CRM & Sales Ops",
      pt: "Projeto de Cliente · Aplicação Web — Ferramenta Interna / CRM & Vendas",
    },
    stack: ["JavaScript", "Supabase", "Python", "Chart.js"],
    en: {
      title: "Licittare CRM",
      summary:
        "An internal CRM for a B2G training company, pairing a Supabase-backed sales dashboard with a Python agent that prospects and enriches government-contract leads every day.",
      overview:
        "Licittare CRM is an internal sales and prospecting tool built for a company that runs training and courses on public-procurement law (a B2G — business-to-government — training business). It combines a multi-view sales dashboard (Today, Panel, Pipeline, Contacts, Leads, Professors, Import, Analytics) with a scheduled backend agent that finds and enriches new leads automatically.",
      context:
        "The business's best leads are companies that just won a public tender — they're the most likely to need compliance training soon after. Finding them meant manually checking government procurement portals, which is slow and easy to miss on any given day. The company needed both a way to track its sales pipeline and a way to stop manually hunting for leads.",
      approach:
        "I split the problem into two parts: a dashboard for the sales side (pipeline, contacts, analytics) and a fully automated data-collection pipeline for the sourcing side, so the sales process and the prospecting process could evolve independently. The dashboard was built as a lightweight single-page app rather than a heavier framework, since the priority was shipping a usable internal tool quickly, not building for scale.",
      whatIBuilt: [
        "A dashboard with dedicated views for daily activity, pipeline, contacts, leads, professor management, multi-source import (LinkedIn, mailing lists, PNCP, Google Contacts) and analytics",
        "Analytics charts (source breakdown, lead tier, funnel) built with Chart.js",
        "A Python agent, deployed separately and scheduled to run twice daily, that queries Brazil's public procurement API (PNCP) and the Portal da Transparência for newly awarded contracts",
        "Automatic lead enrichment: each company found is looked up by CNPJ (Brazilian company registry) via the ReceitaWS API to pull corporate name, address, and contact details",
        "Supabase Edge Functions to ingest enriched contacts into the CRM and to trigger follow-up alerts",
      ],
      technical:
        "Frontend is a single-page dashboard in vanilla JavaScript, talking directly to Supabase via its JS client, with Chart.js for the analytics views. The backend agent is a separate Python service (deployed on Railway) running on a daily schedule, calling the PNCP and Portal da Transparência government APIs plus the ReceitaWS enrichment API, and writing results into Supabase — either directly via supabase-py or through a dedicated Edge Function.",
      outcome:
        "Delivered a working internal tool that replaced manual lead-hunting with an automated daily pipeline, in active use by the client.",
    },
    pt: {
      title: "Licittare CRM",
      summary:
        "Um CRM interno para uma empresa de cursos B2G, unindo um dashboard de vendas com Supabase a um agente em Python que prospecta e enriquece leads de licitações públicas todo dia.",
      overview:
        "Licittare CRM é uma ferramenta interna de vendas e prospecção construída para uma empresa que dá cursos e treinamentos sobre licitações públicas (um negócio B2G — venda para governo). Combina um dashboard multi-view (Hoje, Painel, Pipeline, Contatos, Leads, Professores, Importar, Analytics) com um agente automatizado que encontra e enriquece leads novos todo dia.",
      context:
        "Os melhores leads do negócio são empresas que acabaram de vencer uma licitação — são as mais propensas a precisar de treinamento em compliance logo em seguida. Encontrar essas empresas exigia checar manualmente os portais de licitação do governo, um processo lento e fácil de falhar em algum dia. A empresa precisava tanto de uma forma de acompanhar o pipeline de vendas quanto de parar de caçar leads na mão.",
      approach:
        "Dividi o problema em duas partes: um dashboard para o lado comercial (pipeline, contatos, analytics) e um pipeline de coleta de dados totalmente automatizado para o lado de prospecção, pra que o processo de vendas e o de prospecção pudessem evoluir de forma independente. O dashboard foi construído como uma SPA leve em vez de um framework mais pesado, já que a prioridade era entregar uma ferramenta interna utilizável rápido, não construir pra escala.",
      whatIBuilt: [
        "Dashboard com views dedicadas para atividade diária, pipeline, contatos, leads, gestão de professores, importação multi-fonte (LinkedIn, mailing, PNCP, Google Contacts) e analytics",
        "Gráficos de analytics (origem, tier de lead, funil) construídos com Chart.js",
        "Um agente em Python, deployado separadamente e agendado para rodar duas vezes ao dia, que consulta a API do PNCP e o Portal da Transparência em busca de contratos recém-firmados",
        "Enriquecimento automático de leads: cada empresa encontrada é consultada por CNPJ via API da ReceitaWS pra trazer razão social, endereço e contato",
        "Edge Functions do Supabase pra inserir os contatos enriquecidos no CRM e disparar alertas de follow-up",
      ],
      technical:
        "O frontend é um dashboard single-page em JavaScript puro, conversando diretamente com o Supabase via client JS, com Chart.js nas views de analytics. O backend é um serviço Python separado (deployado no Railway), rodando em agenda diária, consultando as APIs governamentais do PNCP e do Portal da Transparência mais a API de enriquecimento da ReceitaWS, e gravando os resultados no Supabase — direto via supabase-py ou por uma Edge Function dedicada.",
      outcome:
        "Entreguei uma ferramenta interna funcional que substituiu a caça manual de leads por um pipeline automatizado diário, em uso ativo pelo cliente.",
    },
  },
  {
    slug: "danielle-cunha",
    classification: {
      en: "Website Redesign Concept",
      pt: "Concept de Redesign de Website",
    },
    stack: ["GSAP", "ScrollTrigger", "Lenis", "JavaScript"],
    liveUrl: "https://danielle-cunha-berna.pages.dev",
    en: {
      title: "Danielle Cunha",
      summary:
        "A scroll-driven redesign concept for a dermatology practice, built with GSAP/ScrollTrigger/SplitText and Lenis for cinematic, editorial-style transitions.",
      overview:
        "An independent concept redesign of the website for a dermatology practice. This wasn't a commissioned client project — it's a self-directed piece built to demonstrate what a more editorial, motion-driven front-end could look like for a healthcare practice's public site.",
      context:
        "Most small-practice medical websites default to generic templates. The goal here was to explore how much further a front-end can go — in typography, pacing and scroll-based storytelling — while still shipping a real, functional, responsive site with genuine procedure information, FAQs and a clear path to booking via WhatsApp.",
      approach:
        "I built the whole page around scroll as the primary interaction: sections reveal in sequence, text splits and animates in line-by-line, and a smooth-scroll library ties the whole experience together so it feels closer to a designed editorial piece than a stock template. Accessibility was a real constraint, not an afterthought — the entire animation layer degrades gracefully for users with `prefers-reduced-motion` enabled.",
      whatIBuilt: [
        "Scroll-triggered section reveals and a desktop-only pinned cinematic sequence, gated behind GSAP's matchMedia for responsive behavior",
        "Line-by-line text-splitting animations on headings using GSAP SplitText",
        "Full smooth-scroll implementation with Lenis, synced to the GSAP ticker",
        "A complete `prefers-reduced-motion` fallback that disables smooth scroll and forces content visible",
        "Mobile navigation, a sticky mobile CTA, and WhatsApp deep links pre-filled with contextual messages throughout the page",
      ],
      technical:
        "Vanilla HTML/CSS/JavaScript — no framework — using GSAP 3 with the ScrollTrigger and SplitText plugins, plus Lenis for smooth scrolling. JSON-LD Physician structured data is included for SEO. Deployed as a static site on Cloudflare Pages.",
      outcome:
        "Delivered a fully responsive, production-ready concept site covering the complete visitor journey — from procedure information to booking via WhatsApp — with real Google-review testimonials rather than invented ones.",
    },
    pt: {
      title: "Danielle Cunha",
      summary:
        "Um concept de redesign guiado por scroll para uma clínica de dermatologia, construído com GSAP/ScrollTrigger/SplitText e Lenis para transições cinematográficas e editoriais.",
      overview:
        "Um redesign conceitual independente do site de uma clínica de dermatologia. Não foi um projeto encomendado por cliente — é uma peça autoral construída pra mostrar até onde um front-end mais editorial e guiado por movimento pode ir num site público de uma prática de saúde.",
      context:
        "A maioria dos sites de clínicas pequenas usa templates genéricos. O objetivo aqui foi explorar até onde um front-end pode ir — em tipografia, ritmo e narrativa guiada por scroll — entregando ao mesmo tempo um site real, funcional e responsivo, com informação de procedimentos, FAQ e um caminho claro pro agendamento via WhatsApp.",
      approach:
        "Construí a página inteira em torno do scroll como interação principal: seções revelam em sequência, textos se dividem e animam linha por linha, e uma lib de smooth-scroll amarra a experiência toda pra parecer mais uma peça editorial desenhada do que um template pronto. Acessibilidade foi uma restrição real, não um adendo — toda a camada de animação degrada de forma graciosa para usuários com `prefers-reduced-motion` ativado.",
      whatIBuilt: [
        "Revelações de seção disparadas por scroll e uma sequência cinematográfica fixa (pinned) só para desktop, controlada via matchMedia do GSAP",
        "Animações de divisão de texto linha a linha nos títulos usando GSAP SplitText",
        "Smooth-scroll completo com Lenis, sincronizado ao ticker do GSAP",
        "Fallback completo de `prefers-reduced-motion` que desativa o smooth-scroll e força o conteúdo visível",
        "Navegação mobile, CTA fixo no mobile, e links de WhatsApp com mensagens contextuais pré-preenchidas ao longo da página",
      ],
      technical:
        "HTML/CSS/JavaScript puro — sem framework — usando GSAP 3 com os plugins ScrollTrigger e SplitText, mais Lenis para smooth-scroll. Dados estruturados JSON-LD (Physician) incluídos para SEO. Deployado como site estático no Cloudflare Pages.",
      outcome:
        "Entreguei um site conceitual totalmente responsivo e pronto para produção, cobrindo toda a jornada do visitante — da informação de procedimentos ao agendamento via WhatsApp — com depoimentos reais do Google, não inventados.",
    },
  },
  {
    slug: "gmm-engenharia",
    classification: {
      en: "Website Redesign Concept",
      pt: "Concept de Redesign de Website",
    },
    stack: ["GSAP", "ScrollTrigger", "JavaScript", "CSS"],
    liveUrl: "https://gmm-engenharia-berna.pages.dev",
    en: {
      title: "GMM Engenharia",
      summary:
        "A concept redesign for a construction and engineering company, with an industrial editorial visual direction and GSAP-driven scroll reveals.",
      overview:
        "An independent concept redesign for a construction and engineering company (waterproofing, residential and commercial construction, facade recovery, epoxy flooring). Like Danielle Cunha, this was self-directed exploratory work, not a commissioned client project.",
      context:
        "Construction and engineering companies at this scale rarely have a site that reflects the technical precision of their actual work. The goal was a visual direction that read as industrial and credible — closer to a construction-tech product page than a generic contractor site — while staying honest about the company's real services and real client feedback.",
      approach:
        "I leaned into an industrial/editorial visual language — navy and concrete tones, condensed display type — and used scroll-triggered GSAP animations more sparingly than on Danielle Cunha, to match a more restrained, technical tone appropriate to the industry.",
      whatIBuilt: [
        "Section-by-section scroll reveals and a scale-based curtain transition for the 'About' section, built with GSAP and ScrollTrigger",
        "Scroll-scrubbed parallax on background imagery",
        "A responsive photo grid showcasing real fieldwork photos",
        "Mobile navigation with a slide-in menu, and WhatsApp deep links for direct contact",
      ],
      technical:
        "Vanilla HTML/CSS/JavaScript — no framework — using GSAP 3 with the ScrollTrigger plugin (no smooth-scroll library on this one, a lighter setup than Danielle Cunha). Deployed as a static site on Cloudflare Pages.",
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
        "Empresas de construção e engenharia desse porte raramente têm um site que reflita a precisão técnica do trabalho real que fazem. O objetivo foi uma direção visual que parecesse industrial e confiável — mais perto de uma página de produto construction-tech do que de um site genérico de empreiteira — mantendo honestidade sobre os serviços reais e o feedback real de clientes da empresa.",
      approach:
        "Apostei numa linguagem visual industrial/editorial — tons de navy e concreto, tipografia condensada — e usei animações de scroll com GSAP de forma mais comedida do que no Danielle Cunha, pra combinar com um tom mais técnico e contido, adequado ao setor.",
      whatIBuilt: [
        "Revelações de seção por scroll e uma transição de cortina baseada em escala pra seção 'Sobre', construídas com GSAP e ScrollTrigger",
        "Parallax controlado por scroll (scrub) nas imagens de fundo",
        "Grid de fotos responsivo mostrando fotos reais de obra",
        "Navegação mobile com menu deslizante, e links de WhatsApp para contato direto",
      ],
      technical:
        "HTML/CSS/JavaScript puro — sem framework — usando GSAP 3 com o plugin ScrollTrigger (sem lib de smooth-scroll aqui, um setup mais leve que o do Danielle Cunha). Deployado como site estático no Cloudflare Pages.",
      outcome:
        "Entreguei um site conceitual totalmente responsivo com identidade visual industrial própria, construído em torno dos serviços reais da empresa e um depoimento genuíno de cliente.",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
