import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SEOHead } from "@/components/SEO/SEOHead";
import { BreadcrumbSchema } from "@/components/SEO/BreadcrumbSchema";
import { BASE_URL } from "@/config/constants";
import "@/styles/cases.css";

export function RepUp() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const links = [...document.querySelectorAll<HTMLAnchorElement>(".case-repup .c-toc ol a")];
    const secs = links.map((a) => document.querySelector<HTMLElement>(a.getAttribute("href") || ""));

    const onScroll = () => {
      const h = document.documentElement;
      if (bar) bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
      let cur = 0;
      secs.forEach((s, i) => {
        if (s && s.getBoundingClientRect().top < 140) cur = i;
      });
      links.forEach((a, i) => a.classList.toggle("on", i === cur));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Rep Up: como criei um app de treino e passei pela revisão da Apple",
        inLanguage: "pt-BR",
        datePublished: "2026-10-06",
        image: `${BASE_URL}/lab/rep-up/og.png`,
        author: { "@id": `${BASE_URL}/#person` },
        about: { "@id": `${BASE_URL}/lab/rep-up#app` },
        mainEntityOfPage: `${BASE_URL}/lab/rep-up`,
      },
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: "Nei Girão",
        url: `${BASE_URL}/`,
        sameAs: ["https://www.linkedin.com/in/neigirao/", "https://github.com/neigirao"],
      },
      {
        "@type": "MobileApplication",
        "@id": `${BASE_URL}/lab/rep-up#app`,
        name: "Rep Up",
        operatingSystem: "iOS",
        applicationCategory: "HealthApplication",
        inLanguage: "pt-BR",
        offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
        url: "https://apps.apple.com/br/app/rep-up/id6812042720",
        author: { "@id": `${BASE_URL}/#person` },
      },
      {
        "@type": "SoftwareSourceCode",
        codeRepository: "https://github.com/neigirao/rep-up-buddy",
        programmingLanguage: ["TypeScript", "Swift"],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "O Rep Up é grátis?",
            acceptedAnswer: { "@type": "Answer", text: "Sim. É gratuito, sem anúncios e sem compra dentro do app." },
          },
          {
            "@type": "Question",
            name: "Tem Rep Up para Android?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A versão para Android está em desenvolvimento. Enquanto isso, a versão web funciona no navegador de qualquer celular.",
            },
          },
          {
            "@type": "Question",
            name: "O que é o Rep Up?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Um app gratuito de musculação para iPhone, para quem treina sozinho. Ele monta o treino da semana em duas perguntas e registra o que você levantou, sem anúncios e sem compra dentro do app.",
            },
          },
          {
            "@type": "Question",
            name: "O Rep Up funciona sem internet?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim. O treino fica gravado no aparelho e sincroniza com a nuvem quando há sinal. A conta serve para o histórico atravessar a troca de celular.",
            },
          },
          {
            "@type": "Question",
            name: "O Rep Up usa inteligência artificial?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A versão 1.0 saiu sem IA, para cumprir as regras de privacidade da Apple. Na versão seguinte, a IA volta só para montar o plano, com consentimento, declaração de idade e região, e sem dado pessoal no envio.",
            },
          },
          {
            "@type": "Question",
            name: "Como o Rep Up foi construído?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Em cerca de cinco semanas, com Lovable, Claude Code, Codex e Instinct. Começou no Lovable como web app, com React, TypeScript, IndexedDB e Supabase. Depois virou app de iPhone com Capacitor e Swift, com builds na nuvem pelo Codemagic.",
            },
          },
          {
            "@type": "Question",
            name: "Quem criou o Rep Up?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nei Girão, Product Manager, como projeto pessoal, trabalhando com agentes de IA que escrevem o código enquanto ele decide o produto.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Lab", item: `${BASE_URL}/#lab` },
          { "@type": "ListItem", position: 3, name: "Rep Up" },
        ],
      },
    ],
  };

  return (
    <div className="case-page case-repup">
      <SEOHead
        title="Rep Up: app de musculação grátis para iPhone, offline e sem anúncios | Nei Girão"
        description="Rep Up é um app de treino grátis para iPhone: monta o treino em duas perguntas, ensina 876 exercícios e funciona sem internet. Veja como foi criado e aprovado na App Store."
        canonicalUrl={`${BASE_URL}/lab/rep-up`}
        ogImage={`${BASE_URL}/lab/rep-up/og.png`}
        ogType="article"
        keywords={[
          "app de musculação grátis",
          "app de treino para iPhone",
          "app de academia offline",
          "Rep Up",
          "treino sem internet",
          "App Store",
          "Capacitor",
          "Supabase",
          "vibe code",
          "Nei Girão",
        ]}
      />
      <Helmet>
        <meta name="apple-itunes-app" content="app-id=6812042720" />
      </Helmet>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema items={[{ name: "Início", url: "/" }, { name: "Lab", url: "/#lab" }, { name: "Rep Up" }]} />

      <div className="c-progress" ref={progressRef} />

      <header className="c-mast">
        <div className="c-wrap">
          <Link to="/" className="c-mast-brand">
            Nei Girão
          </Link>
          <nav className="c-mast-right c-mono">
            <Link to="/#projects" className="lnk">
              Projetos
            </Link>
            <Link to="/#lab" className="lnk">
              Lab
            </Link>
            <Link to="/#contact" className="lnk">
              Contato
            </Link>
            <a
              className="c-btn pri sm"
              href="https://apps.apple.com/br/app/rep-up/id6812042720"
              target="_blank"
              rel="noopener noreferrer"
            >
              App Store
            </a>
          </nav>
        </div>
      </header>

      <main>
        <div className="c-wrap">
          <nav className="c-crumb c-mono" aria-label="Breadcrumb">
            <Link to="/">Início</Link>
            <span>/</span>
            <Link to="/#lab">Lab</Link>
            <span>/</span>
            <span>Rep Up</span>
          </nav>

          <header className="c-hero">
            <div className="c-kicker c-mono">Lab · App iOS · Vibe code · 2026</div>
            <h1 className="c-disp">
              Rep Up: um app de treino feito para <em>a mão suada, entre séries, sem sinal</em>
            </h1>
            <p className="c-dek">
              Criei o Rep Up porque os apps de treino que eu encontrava eram pagos, e eu só queria aprender a fazer cada
              exercício. Ele monta a semana em duas perguntas e registra o que você levantou. Nada além disso. Este é o
              caso de como ele saiu do Lovable, virou app de iPhone e passou pela revisão da Apple em cinco semanas.
            </p>
            <div className="c-hero-btns">
              <a
                className="c-appbtn"
                href="https://apps.apple.com/br/app/rep-up/id6812042720"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="22" height="22">
                  <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1zM13.9 5c.7-.9 1.2-2 1-3.2-1 0-2.2.7-3 1.5-.6.7-1.2 1.9-1.1 3.1 1.2.1 2.3-.6 3.1-1.4z" />
                </svg>
                <span>
                  <small>Baixar na</small>
                  <b>App Store</b>
                </span>
              </a>
              <a className="c-btn" href="https://repupgym.lovable.app/" target="_blank" rel="noopener noreferrer">
                Versão web (PWA) ↗
              </a>
              <a
                className="c-btn"
                href="https://github.com/neigirao/rep-up-buddy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Código no GitHub ↗
              </a>
            </div>
            <div className="c-facts">
              <div className="c-fact">
                <div className="k c-mono">Meu papel</div>
                <div className="v">Produto, design e código</div>
              </div>
              <div className="c-fact">
                <div className="k c-mono">Plataforma</div>
                <div className="v">iPhone e web</div>
              </div>
              <div className="c-fact">
                <div className="k c-mono">Preço</div>
                <div className="v">Grátis, sem anúncio</div>
              </div>
              <div className="c-fact">
                <div className="k c-mono">Da 1ª linha à loja</div>
                <div className="v big">5 semanas</div>
              </div>
            </div>
            <figure className="c-og">
              <img
                src="/lab/rep-up/og.png"
                alt="Rep Up: seu treino, sem enrolação"
                width="1200"
                height="630"
                fetchPriority="high"
              />
            </figure>
          </header>
        </div>

        <div className="c-wrap c-body">
          <aside className="c-toc" aria-label="Nesta página">
            <span className="c-mono">Nesta página</span>
            <ol>
              <li>
                <a href="#problema">O problema</a>
              </li>
              <li>
                <a href="#solucao">A solução</a>
              </li>
              <li>
                <a href="#decisoes">Decisões de produto</a>
              </li>
              <li>
                <a href="#arquitetura">A arquitetura</a>
              </li>
              <li>
                <a href="#ia">A IA e a Apple</a>
              </li>
              <li>
                <a href="#lancamento">O lançamento</a>
              </li>
              <li>
                <a href="#processo">Como trabalhei</a>
              </li>
              <li>
                <a href="#licoes">O que deu errado</a>
              </li>
              <li>
                <a href="#depois">O que vem depois</a>
              </li>
              <li>
                <a href="#faq">Perguntas frequentes</a>
              </li>
            </ol>
            <div className="share">
              <a
                className="c-btn sm"
                href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fneigirao.lovable.app%2Flab%2Frep-up"
                target="_blank"
                rel="noopener noreferrer"
              >
                Compartilhar no LinkedIn
              </a>
            </div>
          </aside>

          <article>
            <div className="c-tldr">
              <span className="c-mono">Resumo em 30 segundos</span>
              <ul>
                <li>
                  <strong>O app:</strong> musculação para quem treina sozinho. Grátis, sem anúncio e sem compra dentro
                  do app.
                </li>
                <li>
                  <strong>A ideia:</strong> duas perguntas montam a semana; na academia, um toque registra a série e o
                  descanso começa sozinho.
                </li>
                <li>
                  <strong>O diferencial:</strong> funciona sem sinal. O treino fica gravado no aparelho, e a nuvem é só
                  cópia.
                </li>
                <li>
                  <strong>Tempo:</strong> 5 semanas entre a primeira versão do banco (29/08/2026) e a App Store
                  (05/10/2026), com duas rejeições no caminho.
                </li>
                <li>
                  <strong>A virada:</strong> a Apple rejeitou o app por causa da IA. Desliguei a IA, reenviei, e a
                  versão 1.0 entrou no ar em 05/10/2026.
                </li>
              </ul>
            </div>

            <aside className="c-hire" aria-label="O que este projeto mostra">
              <div className="hd">
                <span className="c-mono">O que este projeto mostra</span>
              </div>
              <ul>
                <li>
                  <b>Dono do produto, de ponta a ponta</b>
                  <span>
                    Da ideia à App Store, passando por design, código e revisão da Apple.{" "}
                    <a href="#lancamento">Ver o lançamento</a>
                  </span>
                </li>
                <li>
                  <b>Coragem de cortar escopo</b>
                  <span>
                    Três abas, sem calorias, sem rede social, sem cobrança. <a href="#decisoes">Ver as decisões</a>
                  </span>
                </li>
                <li>
                  <b>Fluência técnica</b>
                  <span>
                    Offline-first, sincronia em transação e app nativo com Capacitor e Swift.{" "}
                    <a href="#arquitetura">Ver a arquitetura</a>
                  </span>
                </li>
                <li>
                  <b>Privacidade e conformidade</b>
                  <span>
                    Desliguei a IA para cumprir as regras da Apple sem cobrar do usuário.{" "}
                    <a href="#ia">Ver a decisão</a>
                  </span>
                </li>
                <li>
                  <b>Construção com IA</b>
                  <span>
                    Agentes de IA escrevem o código; eu decido o produto. <a href="#processo">Ver o processo</a>
                  </span>
                </li>
              </ul>
            </aside>

            <section id="problema">
              <h2>
                <span className="n">01 — O problema</span>Quem treina sozinho não sabe montar treino
              </h2>
              <p>
                A maioria dos apps de treino pergunta peso, altura, idade e objetivo antes de mostrar qualquer coisa.
                Depois, enche a tela de calorias, metas e notificações. Quem só quer saber o que treinar hoje desiste no
                cadastro.
              </p>
              <p>
                Foi o meu caso: os apps que mostravam como fazer cada exercício cobravam assinatura. Eu queria um app
                grátis que me ensinasse o movimento e me dissesse o que treinar hoje.
              </p>
              <div className="c-shift">
                <div className="side">
                  <span className="c-mono">Apps de treino comuns</span>
                  <ul>
                    <li>Cadastro com peso, altura e idade</li>
                    <li>Calorias, metas e rede social</li>
                    <li>Precisam de internet</li>
                    <li>Notificação cobrando todo dia</li>
                  </ul>
                </div>
                <div className="arrow" aria-hidden="true">
                  →
                </div>
                <div className="side to">
                  <span className="c-mono">Rep Up</span>
                  <ul>
                    <li>Duas perguntas e o treino está pronto</li>
                    <li>Só treino e o que você levantou</li>
                    <li>Funciona sem sinal</li>
                    <li>Nenhuma bolinha vermelha</li>
                  </ul>
                </div>
              </div>
              <p>Desenhei o Rep Up a partir de uma cena concreta:</p>
              <div className="c-scene">
                <span className="c-mono">A cena que guiou cada decisão</span>
                <p>
                  De pé na academia, entre séries. Uma mão livre, suada. Celular às vezes no chão. Luz de subsolo, sem
                  sinal. Noventa segundos de descanso.
                </p>
              </div>
            </section>

            <section id="solucao">
              <h2>
                <span className="n">02 — A solução</span>Seu treino, sem enrolação
              </h2>
              <div className="c-reads">
                <div className="c-read">
                  <div className="a">Uma mão livre, suada</div>
                  <div className="ar">→</div>
                  <div className="b">Um toque registra a série. Sem digitar nada.</div>
                </div>
                <div className="c-read">
                  <div className="a">Sem sinal no subsolo</div>
                  <div className="ar">→</div>
                  <div className="b">Tudo funciona offline e sincroniza depois.</div>
                </div>
                <div className="c-read">
                  <div className="a">Noventa segundos</div>
                  <div className="ar">→</div>
                  <div className="b">O descanso começa sozinho e avisa com a tela apagada.</div>
                </div>
                <div className="c-read">
                  <div className="a">Não sei fazer o exercício</div>
                  <div className="ar">→</div>
                  <div className="b">Foto e passo a passo em português para 876 exercícios.</div>
                </div>
              </div>
              <p>
                O app começa com duas perguntas: quais dias você treina e quais exercícios faz. Ele monta a divisão,
                escolhe séries e repetições e diz qual é o treino de hoje. Não pergunta peso, altura nem idade.
              </p>
              <div className="c-phones-scroll">
                <figure>
                  <img src="/lab/rep-up/1-treino.webp" alt="Tela Treino: próximo treino A (peito, ombro, tríceps), botão Bora treinar e o plano com os exercícios" width="1242" height="2688" loading="lazy" />
                  <figcaption>Treino</figcaption>
                </figure>
                <figure>
                  <img src="/lab/rep-up/2-sessao.webp" alt="Sessão de treino: supino reto com a carga da última vez, recorde e botão Fiz para registrar a série" width="1242" height="2688" loading="lazy" />
                  <figcaption>Sessão</figcaption>
                </figure>
                <figure>
                  <img src="/lab/rep-up/3-descanso.webp" alt="Descanso automático: cronômetro de 2:28 com botões Fixar, +30s e Pular" width="1242" height="2688" loading="lazy" />
                  <figcaption>Descanso</figcaption>
                </figure>
                <figure>
                  <img src="/lab/rep-up/4-voce.webp" alt="Tela Você: tom do professor (acolhe ou empurra), dias por semana, descanso padrão e exportar dados" width="1242" height="2688" loading="lazy" />
                  <figcaption>Você</figcaption>
                </figure>
                <figure>
                  <img src="/lab/rep-up/5-numeros.webp" alt="Tela Números: treinos e séries da semana, kg levantados e recordes por exercício" width="1242" height="2688" loading="lazy" />
                  <figcaption>Números</figcaption>
                </figure>
              </div>
              <div className="c-reads">
                <div className="c-read">
                  <div className="a">Ficha do professor</div>
                  <div className="ar">→</div>
                  <div className="b">Fotografe ou cole o texto, e o app transforma em semana de treino.</div>
                </div>
                <div className="c-read">
                  <div className="a">Trocar um exercício</div>
                  <div className="ar">→</div>
                  <div className="b">Vale só para hoje e não reescreve o plano.</div>
                </div>
                <div className="c-read">
                  <div className="a">Progresso honesto</div>
                  <div className="ar">→</div>
                  <div className="b">
                    Recordes e volume semanal por músculo. Sem série registrada, a tela fica vazia.
                  </div>
                </div>
                <div className="c-read">
                  <div className="a">Seus dados</div>
                  <div className="ar">→</div>
                  <div className="b">Exporte tudo em JSON aberto. Apague a conta dentro do app, sem e-mail.</div>
                </div>
              </div>
            </section>

            <section id="decisoes">
              <h2>
                <span className="n">03 — Decisões de produto</span>O que ficou de fora, de propósito
              </h2>
              <p>
                A parte mais difícil foi dizer não. Três abas (Treino, Números e Você) são o teto, e não há bolinha
                vermelha cobrando nada.
              </p>
              <div className="c-cols2">
                <div className="c-box">
                  <span className="c-mono">Entrou</span>
                  <ul>
                    <li>Treino montado em duas perguntas</li>
                    <li>Registro com um toque</li>
                    <li>Descanso automático</li>
                    <li>Funciona sem sinal</li>
                    <li>Catálogo público, indexável pelo Google</li>
                    <li>Tom à escolha: acolhe ou provoca</li>
                  </ul>
                </div>
                <div className="c-box c-box-out">
                  <span className="c-mono">Ficou de fora</span>
                  <ul>
                    <li>Calorias e dieta</li>
                    <li>Rede social</li>
                    <li>Wearable e vídeo de treino</li>
                    <li>Análise de forma por câmera</li>
                    <li>Moeda virtual</li>
                    <li>Foto de progresso</li>
                  </ul>
                </div>
              </div>
              <div className="c-trade">
                <b>Trade-off</b> Menos funcionalidades significam menos argumentos na loja e menos motivos para quem
                compara apps. Apostei que quem treina sozinho quer menos, não mais.
              </div>
              <p>
                O catálogo de exercícios também ficou aberto, sem login: uma página por exercício e um sitemap com 881
                URLs, feito para o Google encontrar o app.
              </p>
              <h3 className="c-h3">Três regras de produto que estavam no primeiro prompt</h3>
              <div className="c-decisions">
                <div className="c-dec">
                  <div className="num">1</div>
                  <div>
                    <h3>Dois professores, e nenhum fala na hora da queda</h3>
                    <p>
                      Você escolhe a voz do app: o professor que empurra ou o que acolhe. O que empurra cutuca treino
                      pulado e carga parada, nunca corpo, peso ou aparência. E nos momentos frágeis as duas vozes dizem
                      exatamente a mesma frase.
                    </p>
                    <div className="trade">
                      <b>Trade-off</b> Cada frase do app existe em duas versões, lado a lado no mesmo arquivo.
                    </div>
                  </div>
                </div>
                <div className="c-dec">
                  <div className="num">2</div>
                  <div>
                    <h3>A sequência conta semanas, não dias</h3>
                    <p>
                      Musculação exige descanso. Uma sequência diária premiaria treinar todo dia, que é justamente o que
                      não se deve fazer. No Rep Up, a sequência conta semanas cumpridas.
                    </p>
                    <div className="trade">
                      <b>Trade-off</b> Uma sequência semanal anda devagar e dá menos "recompensa" diária. Preferi um
                      número que não empurra para o treino errado.
                    </div>
                  </div>
                </div>
                <div className="c-dec">
                  <div className="num">3</div>
                  <div>
                    <h3>O app cede sempre, concorda nunca e insiste uma vez</h3>
                    <p>
                      Se você sobe a carga quando o app sugeriu aliviar, ele aceita na hora e guarda as duas coisas. Se
                      a carga cair depois de três avisos ignorados, ele fala uma vez. Nunca duas, e nunca bloqueia.
                    </p>
                    <div className="trade">
                      <b>Trade-off</b> Respeitar a escolha da pessoa às vezes significa deixá-la errar.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="arquitetura">
              <h2>
                <span className="n">04 — A arquitetura</span>Cinco regras que não se quebram
              </h2>
              <p>
                O app nasceu no Lovable, como web mobile-first instalável. Depois, o mesmo código foi empacotado com
                Capacitor para virar app de iPhone. Em uma frase: o app grava tudo no celular primeiro e copia para a
                nuvem depois.
              </p>
              <ol className="c-rules">
                <li>
                  <div>
                    <b>O treino mora no aparelho.</b> Nada de treino no localStorage. O IndexedDB é a fonte da verdade,
                    e o Supabase é a cópia.
                  </div>
                </li>
                <li>
                  <div>
                    <b>Gravar e sincronizar são uma coisa só.</b> A escrita e a fila de sincronia entram na mesma
                    transação.
                  </div>
                </li>
                <li>
                  <div>
                    <b>Nenhuma função essencial depende de IA.</b> Toda chamada de IA passa pelo servidor, e o app
                    funciona inteiro sem ela.
                  </div>
                </li>
                <li>
                  <div>
                    <b>Nenhum dado sai do aparelho sem conta.</b> A conta existe para o histórico atravessar a troca de
                    celular.
                  </div>
                </li>
                <li>
                  <div>
                    <b>Nenhum texto mora no código da tela.</b> Tudo vem de um arquivo de textos, e um teste varre as
                    telas atrás de português solto.
                  </div>
                </li>
              </ol>
              <div className="c-cols2">
                <div className="c-box">
                  <span className="c-mono">Stack</span>
                  <ul>
                    <li>React + TypeScript (Lovable)</li>
                    <li>IndexedDB (Dexie) no aparelho</li>
                    <li>Supabase: Postgres, Auth, Storage e Edge Functions</li>
                    <li>Capacitor + Swift no iPhone</li>
                    <li>Codemagic para builds de iOS na nuvem</li>
                  </ul>
                </div>
                <div className="c-box">
                  <span className="c-mono">Qualidade e medição</span>
                  <ul>
                    <li>Testes automatizados</li>
                    <li>CI "tudo ou nada", incluindo o build nativo</li>
                    <li>GA4 só com o funil de cadastro</li>
                    <li>Sentry para erro, Crashlytics para travamento</li>
                  </ul>
                </div>
              </div>
              <div className="c-trade">
                <b>Trade-off</b> Gravar primeiro no aparelho exige uma fila de sincronia, conferência das duas pontas e
                "lápides" para o que foi apagado. É bem mais trabalho que gravar direto na nuvem, mas é o que faz o app
                funcionar no subsolo.
              </div>
            </section>

            <section id="ia">
              <h2>
                <span className="n">05 — A IA e a Apple</span>A rejeição que me fez desligar a IA
              </h2>
              <p>
                O Rep Up usava o Gemini em quatro fluxos: montar o plano, ler a ficha por foto, buscar exercício e
                avaliar um aparelho por foto. A Apple rejeitou o build 26 pelas diretrizes 5.1.1(i) e 5.1.2(i).
              </p>
              <div className="c-opts">
                <div className="c-opt">
                  <span className="c-mono">Opção A</span>Pagar a camada paga do Gemini, com consentimento e política
                  nova.
                </div>
                <div className="c-opt">
                  <span className="c-mono">Opção B</span>Um modelo híbrido, com parte da IA ligada.
                </div>
                <div className="c-opt c-opt-pick">
                  <span className="c-mono">Escolhi</span>Desligar a IA nesta versão, sem ligar cobrança, e reenviar.
                </div>
              </div>
              <div className="c-trade">
                <b>Trade-off</b> Saíram da versão 1.0 a leitura da ficha por foto, a busca inteligente e o "Posso fazer
                aqui?". Em troca, o app chegou à loja sem cobrança e sem dado pessoal indo para terceiros.
              </div>
              <p>
                A IA ficou atrás de uma chave: a interface escondida, o código mantido. O build 27 foi reenviado em
                03/10/2026. Como a regra 3 já garantia que nada essencial dependia de IA, o app continuou inteiro.
              </p>
              <div className="c-cols2">
                <div className="c-box">
                  <span className="c-mono">O que vai para o Gemini (v1.0.1)</span>
                  <ul>
                    <li>Quantos dias por semana você treina (de 2 a 6)</li>
                    <li>Sua experiência: iniciante, intermediário ou avançado</li>
                    <li>Nada mais: sem nome, sem e-mail, sem identificador</li>
                  </ul>
                </div>
                <div className="c-box">
                  <span className="c-mono">O que precisa acontecer antes</span>
                  <ul>
                    <li>Você declara ter 18 anos ou mais</li>
                    <li>Você declara estar fora da UE, do Reino Unido e da Suíça</li>
                    <li>Você aceita o envio ao Google</li>
                    <li>Se qualquer checagem falhar, nada é enviado</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="lancamento">
              <h2>
                <span className="n">06 — O lançamento</span>Do primeiro build à App Store
              </h2>
              <ol className="c-tl">
                <li>
                  <span className="when">29/08/2026</span>
                  <div className="what">Primeira versão do banco de dados. Começa o projeto.</div>
                </li>
                <li>
                  <span className="when">Build 26</span>
                  <div className="what">Reprovado pelas diretrizes 5.1.1 e 5.1.2, por causa da IA.</div>
                </li>
                <li>
                  <span className="when">01/10/2026</span>
                  <div className="what">
                    Correção da diretriz 4.0: botão "Iniciar sessão com a Apple" usava logo desenhado por nós. Troquei
                    pela arte oficial e reenviei.
                  </div>
                </li>
                <li>
                  <span className="when">Conta de demonstração</span>
                  <div className="what">
                    A primeira foi desativada e precisou ser trocada. A nota ao revisor prometia histórico, mas a conta
                    estava vazia.
                  </div>
                </li>
                <li>
                  <span className="when">03/10/2026</span>
                  <div className="what">
                    Build 27 reenviado, com a IA desligada e uma nota pedindo ao revisor para montar um plano no início.
                  </div>
                </li>
                <li>
                  <span className="when">05/10/2026</span>
                  <div className="what">Versão 1.0 no ar, no Brasil, nos EUA e em quase todos os países.</div>
                </li>
              </ol>
            </section>

            <blockquote>
              <p>
                Conta de demonstração, nota ao revisor, política, etiqueta de privacidade e o comportamento do build têm
                que contar a mesma história.
              </p>
              <cite className="c-mono">— A lição da revisão</cite>
            </blockquote>

            <section id="processo">
              <h2>
                <span className="n">07 — Como trabalhei</span>Eu decido, os agentes executam
              </h2>
              <p>
                Trabalhei com as mesmas ferramentas do Lendas do Flu: Lovable, Claude Code, Codex e Instinct. Os agentes
                escrevem código, abrem PR, rodam build e preenchem o App Store Connect. Eu decido, muitas vezes
                respondendo só um número.
              </p>
              <div className="c-reads">
                <div className="c-read">
                  <div className="a">Engenheiro</div>
                  <div className="ar">→</div>
                  <div className="b">O que vai quebrar em um ano: dados, sincronia, falhas sem sinal.</div>
                </div>
                <div className="c-read">
                  <div className="a">UX</div>
                  <div className="ar">→</div>
                  <div className="b">Onde o app atrapalha quem está tentando fazer algo.</div>
                </div>
                <div className="c-read">
                  <div className="a">Designer</div>
                  <div className="ar">→</div>
                  <div className="b">O que está feio, ilegível ou incoerente.</div>
                </div>
                <div className="c-read">
                  <div className="a">Personal trainer</div>
                  <div className="ar">→</div>
                  <div className="b">Treina no app como um profissional e diz o que falta.</div>
                </div>
              </div>
            </section>

            <section id="licoes">
              <h2>
                <span className="n">08 — O que eu mudei</span>O que deu errado e o que mudei
              </h2>
              <ol className="c-lessons">
                <li>
                  <strong>Prometer o que a conta de teste não mostra.</strong> A nota ao revisor falava em histórico, e
                  a conta estava vazia. Agora, ou a conta tem histórico, ou a nota muda.
                </li>
                <li>
                  <strong>Tratar IA como detalhe técnico.</strong> Para a Apple, IA é dado do usuário saindo do
                  aparelho. Consentimento e política vêm antes do código.
                </li>
                <li>
                  <strong>Deixar o build nativo fora da checagem.</strong> Uma mudança quebrou o iPhone sem ninguém ver.
                  Agora o CI só passa se o build nativo também passar.
                </li>
                <li>
                  <strong>Medir demais.</strong> Rastreador que precisa ser declarado na etiqueta de privacidade é
                  rastreador que eu posso cortar.
                </li>
              </ol>
            </section>

            <section id="depois">
              <h2>
                <span className="n">09 — O que vem depois</span>A versão 1.0.1, em andamento
              </h2>
              <p>Hoje no TestFlight, ainda não publicada:</p>
              <ul>
                <li>
                  <strong>Conexão com a IA (Gemini),</strong> com as proteções descritas na seção 05.
                </li>
                <li>
                  <strong>Apple Saúde:</strong> só escrita e só o treino (tipo, início e fim).
                </li>
                <li>
                  <strong>Seletor em roda</strong> para carga e repetições.
                </li>
                <li>
                  <strong>Novo fluxo de entrada,</strong> com quatro caminhos para começar.
                </li>
              </ul>
              <p>
                Fora da 1.0.1, a versão para <strong>Android</strong> já está em desenvolvimento.
              </p>
            </section>

            <section id="faq">
              <h2>
                <span className="n">10 — Perguntas frequentes</span>Sobre o Rep Up
              </h2>
              <div className="c-faq">
                <details>
                  <summary>O Rep Up é grátis?</summary>
                  <p>Sim. É gratuito, sem anúncios e sem compra dentro do app.</p>
                </details>
                <details>
                  <summary>Tem Rep Up para Android?</summary>
                  <p>
                    A versão para Android está em desenvolvimento. Enquanto isso, a versão web funciona no navegador de
                    qualquer celular.
                  </p>
                </details>
                <details>
                  <summary>O que é o Rep Up?</summary>
                  <p>
                    Um app gratuito de musculação para iPhone, para quem treina sozinho. Ele monta o treino da semana em
                    duas perguntas e registra o que você levantou, sem anúncios e sem compra dentro do app.
                  </p>
                </details>
                <details>
                  <summary>O Rep Up funciona sem internet?</summary>
                  <p>Sim. O treino fica gravado no aparelho e sincroniza com a nuvem quando há sinal.</p>
                </details>
                <details>
                  <summary>O Rep Up usa inteligência artificial?</summary>
                  <p>
                    A versão 1.0 saiu sem IA, para cumprir as regras de privacidade da Apple. Na versão seguinte, a IA
                    volta só para montar o plano, com consentimento e sem dado pessoal no envio.
                  </p>
                </details>
                <details>
                  <summary>Como o Rep Up foi construído?</summary>
                  <p>
                    Em cerca de cinco semanas, com Lovable, Claude Code, Codex e Instinct. Começou como web app, depois
                    virou app de iPhone com Capacitor e Swift, com builds na nuvem pelo Codemagic.
                  </p>
                </details>
                <details>
                  <summary>Quem criou o Rep Up?</summary>
                  <p>
                    Nei Girão, Product Manager, como projeto pessoal, trabalhando com agentes de IA que escrevem o
                    código enquanto ele decide o produto.
                  </p>
                </details>
              </div>
            </section>

            <section style={{ marginBottom: 0 }}>
              <span className="c-mono" style={{ color: "var(--case-muted)", display: "block", marginBottom: "14px" }}>
                Ferramentas
              </span>
              <div className="c-chips">
                <span className="c-chip">Lovable</span>
                <span className="c-chip">Free Exercise DB</span>
                <span className="c-chip">Claude Code</span>
                <span className="c-chip">Codex</span>
                <span className="c-chip">Instinct</span>
                <span className="c-chip">React · TypeScript</span>
                <span className="c-chip">Dexie / IndexedDB</span>
                <span className="c-chip">Supabase</span>
                <span className="c-chip">Capacitor · Swift</span>
                <span className="c-chip">Codemagic</span>
                <span className="c-chip">TestFlight</span>
                <span className="c-chip">GA4 · Sentry · Crashlytics</span>
              </div>
            </section>
          </article>
        </div>

        <section className="c-cta">
          <div className="c-wrap">
            <h2>
              Seu treino, <em>sem enrolação</em>.
            </h2>
            <div className="acts">
              <a
                className="c-appbtn"
                href="https://apps.apple.com/br/app/rep-up/id6812042720"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="22" height="22">
                  <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1zM13.9 5c.7-.9 1.2-2 1-3.2-1 0-2.2.7-3 1.5-.6.7-1.2 1.9-1.1 3.1 1.2.1 2.3-.6 3.1-1.4z" />
                </svg>
                <span>
                  <small>Baixar na</small>
                  <b>App Store</b>
                </span>
              </a>
              <a className="c-btn" href="mailto:neigirao@gmail.com?subject=Sobre%20o%20Rep%20Up">
                Falar comigo
              </a>
              <a
                className="c-btn"
                href="https://github.com/neigirao/rep-up-buddy"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>

        <nav className="c-wrap c-next" aria-label="Outro projeto">
          <Link to="/lab/lendas-do-flu">
            <div>
              <span className="c-mono">Outro no Lab</span>
              <div className="t">Lendas do Flu</div>
            </div>
            <span className="arr">→</span>
          </Link>
        </nav>
      </main>

      <footer className="c-foot c-mono">
        <div className="c-wrap">
          <span>© Nei Girão · 2026</span>
          <Link to="/" style={{ color: "#E27464" }}>
            ← Voltar ao site
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default RepUp;
