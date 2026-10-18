import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SEOHead } from "@/components/SEO/SEOHead";
import { BreadcrumbSchema } from "@/components/SEO/BreadcrumbSchema";
import { BASE_URL } from "@/config/constants";
import "@/styles/cases.css";

export function PileOfBooks() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const links = [...document.querySelectorAll<HTMLAnchorElement>(".case-pile .c-toc ol a")];
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
        headline: "Pile of Books: como criei uma estante de livros e cheguei à App Store em 26 dias",
        inLanguage: "pt-BR",
        datePublished: "2026-10-17",
        image: `${BASE_URL}/lab/pile-of-books/og.png`,
        author: { "@id": `${BASE_URL}/#person` },
        about: { "@id": `${BASE_URL}/lab/pile-of-books#app` },
        mainEntityOfPage: `${BASE_URL}/lab/pile-of-books`,
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
        "@id": `${BASE_URL}/lab/pile-of-books#app`,
        name: "Pile of Books",
        operatingSystem: "iOS",
        applicationCategory: "BooksApplication",
        inLanguage: "pt-BR",
        offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
        url: "https://apps.apple.com/br/app/pile-of-books/id6816698886",
        author: { "@id": `${BASE_URL}/#person` },
      },
      {
        "@type": "SoftwareSourceCode",
        codeRepository: "https://github.com/neigirao/my-book-shelf",
        programmingLanguage: ["TypeScript"],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "O Pile of Books é grátis?",
            acceptedAnswer: { "@type": "Answer", text: "Sim. É gratuito na App Store e na versão web." },
          },
          {
            "@type": "Question",
            name: "Tem Pile of Books para Android?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Hoje o app é para iPhone. A versão web funciona no navegador de qualquer celular.",
            },
          },
          {
            "@type": "Question",
            name: "O que é o Pile of Books?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Uma estante pessoal de livros, HQs e mangás, com diário de leitura, estatísticas de verdade e retrospectiva do ano. Grátis e sem anúncio, para iPhone e web.",
            },
          },
          {
            "@type": "Question",
            name: "O Pile of Books funciona sem internet?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Não. A estante mora na nuvem, e o app precisa de internet para acessá-la.",
            },
          },
          {
            "@type": "Question",
            name: "Meus dados ficam presos no Pile of Books?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Não. Você importa sua biblioteca em CSV e exporta tudo em CSV ou JSON, além de uma API só de leitura, protegida por token.",
            },
          },
          {
            "@type": "Question",
            name: "A página pública mostra o que eu leio?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Só se você ativar, e mesmo assim ela mostra apenas totais: quantidade de lidos, páginas, ritmo, gêneros e autores. Nunca títulos, estante ou resenhas.",
            },
          },
          {
            "@type": "Question",
            name: "Como o Pile of Books foi construído?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Em 26 dias, com Lovable, Claude Code, Codex e Instinct. Começou no Lovable como web app, com React, TypeScript e Supabase. Depois virou app de iPhone com Capacitor, com build na nuvem pelo Codemagic.",
            },
          },
          {
            "@type": "Question",
            name: "Quem criou o Pile of Books?",
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
          { "@type": "ListItem", position: 3, name: "Pile of Books" },
        ],
      },
    ],
  };

  return (
    <div className="case-page case-pile">
      <SEOHead
        title="Pile of Books: app de estante de livros, HQs e mangás grátis | Nei Girão"
        description="Estante grátis de livros, HQs e mangás para iPhone e web: diário de leitura, estatísticas de verdade e retrospectiva. Da ideia à App Store em 26 dias."
        canonicalUrl={`${BASE_URL}/lab/pile-of-books`}
        ogImage={`${BASE_URL}/lab/pile-of-books/og.png`}
        ogType="article"
        keywords={[
          "app de estante de livros",
          "app de livros para iPhone",
          "organizar HQs e mangás",
          "letterboxd de livros",
          "alternativa ao skoob",
          "diário de leitura",
          "estatísticas de leitura",
          "Pile of Books",
          "App Store",
          "Nei Girão",
        ]}
      />
      <Helmet>
        <meta name="apple-itunes-app" content="app-id=6816698886" />
      </Helmet>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema
        items={[{ name: "Início", url: "/" }, { name: "Lab", url: "/#lab" }, { name: "Pile of Books" }]}
      />

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
              href="https://apps.apple.com/br/app/pile-of-books/id6816698886"
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
            <span>Pile of Books</span>
          </nav>

          <header className="c-hero">
            <div className="c-kicker c-mono">Lab · App iOS · Vibe code · 2026</div>
            <h1 className="c-disp">
              Pile of Books: uma estante para livros, HQs e mangás, com <em>estatísticas de verdade</em>
            </h1>
            <p className="c-dek">
              Criei o Pile porque o Skoob parou no tempo e o Letterboxd não fala de livros. O norte foi uma frase:
              tudo do Skoob mais tudo do Letterboxd, só que para livros e HQ. Da frase à App Store, 26 dias.
            </p>
            <div className="c-hero-btns">
              <a
                className="c-appbtn"
                href="https://apps.apple.com/br/app/pile-of-books/id6816698886"
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
              <a className="c-btn" href="https://pileofbooks.lovable.app/" target="_blank" rel="noopener noreferrer">
                Versão web ↗
              </a>
              <a
                className="c-btn"
                href="https://github.com/neigirao/my-book-shelf"
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
                <div className="k c-mono">Da ideia à loja</div>
                <div className="v big">26 dias</div>
              </div>
            </div>
            <figure className="c-og">
              <img
                src="/lab/pile-of-books/og.png"
                alt="Pile of Books: sua estante de livros e quadrinhos, com estatísticas de verdade"
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
                <a href="#apple">A Apple</a>
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
                href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fneigirao.lovable.app%2Flab%2Fpile-of-books"
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
                  <strong>O app:</strong> estante de livros, HQs e mangás, com diário de leitura e estatísticas.
                  Grátis e sem anúncio, para iPhone e web.
                </li>
                <li>
                  <strong>A ideia:</strong> tudo do Skoob mais tudo do Letterboxd, só que para livros e HQ.
                </li>
                <li>
                  <strong>O diferencial:</strong> Brasil em primeiro lugar. Edição brasileira, editora brasileira e
                  capa que sempre volta.
                </li>
                <li>
                  <strong>Tempo:</strong> 26 dias entre o norte do produto (18/09/2026) e a App Store (14/10/2026).
                </li>
                <li>
                  <strong>A virada:</strong> a 1.0 entrou como um shell do site. A 1.1, já empacotada e nativa,
                  espera a exclusão de conta dentro do app.
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
                    Da frase de norte à App Store em 26 dias, passando por design, código e revisão da Apple.{" "}
                    <a href="#lancamento">Ver o lançamento</a>
                  </span>
                </li>
                <li>
                  <b>Nicho como estratégia</b>
                  <span>
                    HQs e mangás como categoria de verdade, não como exceção. <a href="#decisoes">Ver as decisões</a>
                  </span>
                </li>
                <li>
                  <b>Fluência técnica</b>
                  <span>
                    RLS no banco, catálogo multi-provedor com nota de confiança, importação e API aberta.{" "}
                    <a href="#arquitetura">Ver a arquitetura</a>
                  </span>
                </li>
                <li>
                  <b>Privacidade por padrão</b>
                  <span>
                    Página pública desligada por padrão e só com totais, nunca títulos.{" "}
                    <a href="#arquitetura">Ver a regra</a>
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
                <span className="n">01 — O problema</span>Estante brasileira parada no tempo
              </h2>
              <p>
                O Skoob envelheceu sem sair do lugar. O Letterboxd é de filme. E os catálogos internacionais erram o
                que mais importa aqui: a edição brasileira, com a capa e a editora certas.
              </p>
              <p>
                Quem lê HQ e mangá fica ainda pior: ou o app trata quadrinho como exceção, ou não trata de jeito
                nenhum. Eu queria uma estante séria, com números de verdade, para o que eu realmente leio.
              </p>
              <div className="c-shift">
                <div className="side">
                  <span className="c-mono">Apps de estante comuns</span>
                  <ul>
                    <li>Capa americana no lugar da edição brasileira</li>
                    <li>HQ e mangá como cidadãos de segunda</li>
                    <li>Estatística rasa ou inexistente</li>
                    <li>Exportar seus dados é pedir favor</li>
                  </ul>
                </div>
                <div className="arrow" aria-hidden="true">
                  →
                </div>
                <div className="side to">
                  <span className="c-mono">Pile of Books</span>
                  <ul>
                    <li>Edição e editora brasileiras primeiro</li>
                    <li>Quadrinhos como categoria de verdade</li>
                    <li>Números e Retrospectiva estilo Letterboxd</li>
                    <li>CSV, JSON e uma API aberta</li>
                  </ul>
                </div>
              </div>
              <p>Desenhei o Pile a partir de uma cena concreta:</p>
              <div className="c-scene">
                <span className="c-mono">A cena que guiou cada decisão</span>
                <p>
                  No sofá, terminando um volume de mangá. Marcar como lido, ver quanto falta para a meta do ano e
                  escolher o próximo da pilha. Trinta segundos, sem brigar com o cadastro.
                </p>
              </div>
            </section>

            <section id="solucao">
              <h2>
                <span className="n">02 — A solução</span>Sua estante, com estatísticas de verdade
              </h2>
              <div className="c-reads">
                <div className="c-read">
                  <div className="a">Cadastro sem atrito</div>
                  <div className="ar">→</div>
                  <div className="b">Busque por título, autor ou ISBN, leia o código de barras ou fotografe a capa.</div>
                </div>
                <div className="c-read">
                  <div className="a">Brasil em primeiro lugar</div>
                  <div className="ar">→</div>
                  <div className="b">BrasilAPI antes dos catálogos internacionais, e editoras brasileiras normalizadas.</div>
                </div>
                <div className="c-read">
                  <div className="a">Capa garantida</div>
                  <div className="ar">→</div>
                  <div className="b">Toda busca volta com capa. Sem capa confiável, o app avisa em vez de inventar.</div>
                </div>
                <div className="c-read">
                  <div className="a">Diário que prevê</div>
                  <div className="ar">→</div>
                  <div className="b">Sessões, ritmo e previsão de término baseada no seu ritmo recente.</div>
                </div>
              </div>
              <p>
                O cadastro é a porta de entrada dos dados: a partir de três letras, o app consulta os provedores em
                paralelo e mostra um cartão por obra, com capa, edição, editora, páginas e ISBN. Um toque, e o livro
                está na estante.
              </p>
              <div className="c-phones-scroll">
                <figure>
                  <img src="/lab/pile-of-books/1-inicio.webp" alt="Tela de início: obras na estante, já lidas, páginas, meta de 2026 e o que está lendo agora" width="1242" height="2688" loading="lazy" />
                  <figcaption>Início</figcaption>
                </figure>
                <figure>
                  <img src="/lab/pile-of-books/2-estante.webp" alt="Estante com capas de livros, HQs e mangás" width="1242" height="2688" loading="lazy" />
                  <figcaption>Estante</figcaption>
                </figure>
                <figure>
                  <img src="/lab/pile-of-books/3-ficha.webp" alt="Ficha de um quadrinho com capa, nota em estrelas, tipo, formato e opção de releitura" width="1242" height="2688" loading="lazy" />
                  <figcaption>Ficha</figcaption>
                </figure>
                <figure>
                  <img src="/lab/pile-of-books/4-busca.webp" alt="Adicionar obra: busca com capas, leitura de código de barras e identificação por foto" width="1242" height="2688" loading="lazy" />
                  <figcaption>Adicionar</figcaption>
                </figure>
                <figure>
                  <img src="/lab/pile-of-books/5-numeros-notas.webp" alt="Números: ritmo médio, lidos por tipo e distribuição de notas" width="1242" height="2688" loading="lazy" />
                  <figcaption>Números</figcaption>
                </figure>
                <figure>
                  <img src="/lab/pile-of-books/6-numeros-autores.webp" alt="Números: gêneros favoritos, autores e editoras mais lidas" width="1242" height="2688" loading="lazy" />
                  <figcaption>Autores</figcaption>
                </figure>
              </div>
              <div className="c-reads">
                <div className="c-read">
                  <div className="a">Números de verdade</div>
                  <div className="ar">→</div>
                  <div className="b">Só conta o que foi lido. O que está na pilha não infla estatística.</div>
                </div>
                <div className="c-read">
                  <div className="a">Retrospectiva</div>
                  <div className="ar">→</div>
                  <div className="b">O ano em imagem, pronta para compartilhar no story.</div>
                </div>
                <div className="c-read">
                  <div className="a">Página pública opcional</div>
                  <div className="ar">→</div>
                  <div className="b">Um /u/seu-nome só com totais, desligado por padrão.</div>
                </div>
                <div className="c-read">
                  <div className="a">Seus dados</div>
                  <div className="ar">→</div>
                  <div className="b">Importe em CSV, exporte em CSV ou JSON, e leia tudo por uma API com token.</div>
                </div>
              </div>
            </section>

            <section id="decisoes">
              <h2>
                <span className="n">03 — Decisões de produto</span>O que ficou de fora, de propósito
              </h2>
              <p>
                O norte era ambicioso: tudo do Skoob mais tudo do Letterboxd. A parte difícil foi segurar o escopo sem
                perder a ambição.
              </p>
              <div className="c-cols2">
                <div className="c-box">
                  <span className="c-mono">Entrou</span>
                  <ul>
                    <li>Quadrinhos: HQ e mangá como uma categoria</li>
                    <li>Diário de leitura com ritmo e previsão</li>
                    <li>Números e Retrospectiva</li>
                    <li>Meta anual e sequência de dias</li>
                    <li>Importação e exportação abertas</li>
                    <li>Página pública opcional, só com totais</li>
                  </ul>
                </div>
                <div className="c-box c-box-out">
                  <span className="c-mono">Ficou de fora</span>
                  <ul>
                    <li>Rede social aberta</li>
                    <li>Migração direta do Skoob (ficou o CSV)</li>
                    <li>Compra e venda de livros</li>
                    <li>Feed de atividades de desconhecidos</li>
                    <li>Moeda virtual</li>
                    <li>Anúncio</li>
                  </ul>
                </div>
              </div>
              <div className="c-trade">
                <b>Trade-off</b> Sem rede social aberta, o app cresce mais devagar. Em troca, os clubes ficam privados
                e à prova de spoiler, e a estante continua sendo sua.
              </div>
              <h3 className="c-h3">Três regras de produto que estavam no primeiro prompt</h3>
              <div className="c-decisions">
                <div className="c-dec">
                  <div className="num">1</div>
                  <div>
                    <h3>Capa é dado, não enfeite</h3>
                    <p>
                      Toda busca volta com capa, e a edição brasileira vem primeiro. Quando nenhum provedor tem uma
                      capa confiável, o app diz isso em vez de mostrar uma imagem errada.
                    </p>
                    <div className="trade">
                      <b>Trade-off</b> O matching estrito às vezes deixa o cadastro mais lento. Uma capa errada
                      envenena a estante inteira.
                    </div>
                  </div>
                </div>
                <div className="c-dec">
                  <div className="num">2</div>
                  <div>
                    <h3>Estatística honesta: só conta o lido</h3>
                    <p>
                      Números e Retrospectiva ignoram o que está na pilha ou pela metade. Estatística que conta
                      intenção vira vaidade.
                    </p>
                    <div className="trade">
                      <b>Trade-off</b> O número fica menor, mas é real. E um número real sustenta a meta do ano.
                    </div>
                  </div>
                </div>
                <div className="c-dec">
                  <div className="num">3</div>
                  <div>
                    <h3>Público é escolha, e só agregado</h3>
                    <p>
                      A página /u/ sai desligada. Quando você liga, ela mostra totais: lidos, páginas, ritmo, gêneros
                      e autores. Nunca títulos, estante ou resenhas.
                    </p>
                    <div className="trade">
                      <b>Trade-off</b> Menos viral do que um perfil completo, mais confiança para quem guarda a
                      própria vida de leitura no app.
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
                O app nasceu no Lovable, como web mobile-first, e virou app de iPhone empacotado com Capacitor. Em uma
                frase: a estante mora na nuvem, protegida pelo próprio banco, e cada dado seu sai quando você quiser.
              </p>
              <ol className="c-rules">
                <li>
                  <div>
                    <b>O banco se protege sozinho.</b> Row Level Security em todas as tabelas. Nem a página pública
                    abre exceção: ela vem de uma função que só devolve totais.
                  </div>
                </li>
                <li>
                  <div>
                    <b>Capa com direito de uso.</b> Só provedores gratuitos: BrasilAPI, Google Books e Open Library,
                    nessa ordem. ISBN primeiro, e cada match leva uma nota de confiança.
                  </div>
                </li>
                <li>
                  <div>
                    <b>IA só no servidor e só com consentimento.</b> A foto da capa vai ao Gemini uma por vez, para
                    identificar a obra, com OCR de reserva. Nada mais passa por IA.
                  </div>
                </li>
                <li>
                  <div>
                    <b>Todo dado sai quando você quiser.</b> Exportação em CSV e JSON, e uma API aberta só de
                    leitura, protegida por token.
                  </div>
                </li>
                <li>
                  <div>
                    <b>CI tudo ou nada.</b> Install, lint, tipos, testes e build, mais um smoke test depois de cada
                    deploy.
                  </div>
                </li>
              </ol>
              <div className="c-cols2">
                <div className="c-box">
                  <span className="c-mono">Stack</span>
                  <ul>
                    <li>React 19 + TypeScript (Lovable)</li>
                    <li>TanStack Query</li>
                    <li>Supabase: Postgres com RLS, Auth e Storage</li>
                    <li>Capacitor no iPhone</li>
                    <li>Codemagic para builds de iOS na nuvem</li>
                  </ul>
                </div>
                <div className="c-box">
                  <span className="c-mono">Qualidade e medição</span>
                  <ul>
                    <li>Testes automatizados e typecheck no CI</li>
                    <li>Smoke test depois de cada deploy</li>
                    <li>GA4 só com o funil de cadastro</li>
                    <li>Sem Hotjar. Sentry só de erros, sem replay e sem dado pessoal</li>
                  </ul>
                </div>
              </div>
              <div className="c-trade">
                <b>Trade-off</b> RLS em tudo e provedores gratuitos dão mais trabalho de banco e de busca. É o preço
                de um app em que ninguém lê a estante de ninguém, e que não depende de catálogo pago.
              </div>
            </section>

            <section id="apple">
              <h2>
                <span className="n">05 — A Apple</span>O shell que abriu a loja, o nativo que fecha a conta
              </h2>
              <p>
                Para não perder o embalo, a versão 1.0 foi um shell: o app abre o site publicado, inteiro, dentro de
                uma casca nativa. Passou na revisão e entrou no ar em 14/10/2026, em 175 países.
              </p>
              <p>
                Mas shell não é produto. A 1.1 já está empacotada com o código nativo de verdade, <Link to="/lab/rep-up">como o Rep Up</Link>. O que
                segura o envio: a Apple exige excluir a conta dentro do app, e a etiqueta de privacidade precisa
                declarar Fotos e Vídeos, porque as capas identificadas por foto vão para o Storage.
              </p>
              <div className="c-trade">
                <b>Trade-off</b> O shell colocou o app na loja em 26 dias. O preço veio depois: a 1.1 refaz o empacote e ainda
                aguarda a exclusão de conta.
              </div>
            </section>

            <section id="lancamento">
              <h2>
                <span className="n">06 — O lançamento</span>Da frase de norte à App Store
              </h2>
              <ol className="c-tl">
                <li>
                  <span className="when">18/09/2026</span>
                  <div className="what">
                    O norte em uma frase: tudo do Skoob mais tudo do Letterboxd, só que para livros e HQ.
                  </div>
                </li>
                <li>
                  <span className="when">23/09/2026</span>
                  <div className="what">
                    Search Console verificado e sitemap enviado. SEO desde o começo, com páginas públicas.
                  </div>
                </li>
                <li>
                  <span className="when">27/09/2026</span>
                  <div className="what">No TestFlight, só para iPhone.</div>
                </li>
                <li>
                  <span className="when">06/10/2026</span>
                  <div className="what">
                    A cadeia de capas fecha: BrasilAPI, Google Books e Open Library, com nota de confiança no match.
                  </div>
                </li>
                <li>
                  <span className="when">14/10/2026</span>
                  <div className="what">
                    Versão 1.0 no ar, em 175 países. No mesmo dia, o bundle nativo da 1.1 é mergeado.
                  </div>
                </li>
              </ol>
            </section>

            <blockquote>
              <p>
                Entrar rápido na loja com um shell vale uma vez. A segunda versão tem que ser de verdade.
              </p>
              <cite className="c-mono">— A lição do lançamento</cite>
            </blockquote>

            <section id="processo">
              <h2>
                <span className="n">07 — Como trabalhei</span>Eu decido, os agentes executam
              </h2>
              <p>
                Trabalhei com as mesmas ferramentas do Rep Up: Lovable, Claude Code, Codex e Instinct. Os agentes
                escrevem código, abrem PR, rodam CI e preenchem o App Store Connect. Eu decido, muitas vezes
                respondendo só um número.
              </p>
              <div className="c-reads">
                <div className="c-read">
                  <div className="a">Engenheiro</div>
                  <div className="ar">→</div>
                  <div className="b">O que vai quebrar em um ano: dados, permissões, limites dos provedores.</div>
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
                  <div className="a">Colecionador de HQs</div>
                  <div className="ar">→</div>
                  <div className="b">Lê no app como um colecionador e diz o que falta.</div>
                </div>
              </div>
            </section>

            <section id="licoes">
              <h2>
                <span className="n">08 — O que eu mudei</span>O que deu errado e o que mudei
              </h2>
              <ol className="c-lessons">
                <li>
                  <strong>Confiar na cota anônima do Google Books.</strong> Sem chave, a busca batia no limite diário.
                  Agora a chave gratuita entra desde o primeiro dia.
                </li>
                <li>
                  <strong>Lançar shell como se fosse atalho sem custo.</strong> A 1.0 entrou rápido, mas a 1.1 nativa
                  refaz o empacote e ainda espera a exclusão de conta.
                </li>
                <li>
                  <strong>Prometer migração direta do Skoob.</strong> Sem um caminho confiável, o formato honesto foi
                  o CSV. Cortei cedo.
                </li>
                <li>
                  <strong>Medir demais.</strong> Rastreador que precisa ser declarado na etiqueta de privacidade é
                  rastreador que eu posso cortar.
                </li>
              </ol>
            </section>

            <section id="depois">
              <h2>
                <span className="n">09 — O que vem depois</span>A 1.1, nativa de verdade
              </h2>
              <p>O que segura a próxima versão na loja:</p>
              <ul>
                <li>
                  <strong>App nativo empacotado,</strong> sem depender do site publicado.
                </li>
                <li>
                  <strong>Excluir a conta dentro do app,</strong> exigência da Apple.
                </li>
                <li>
                  <strong>Etiqueta de privacidade</strong> declarando Fotos e Vídeos.
                </li>
              </ul>
              <p>
                Depois da 1.1, <strong>audiolivros</strong> já estão em estudo.
              </p>
            </section>

            <section id="faq">
              <h2>
                <span className="n">10 — Perguntas frequentes</span>Sobre o Pile of Books
              </h2>
              <div className="c-faq">
                <details>
                  <summary>O Pile of Books é grátis?</summary>
                  <p>Sim. É gratuito na App Store e na versão web.</p>
                </details>
                <details>
                  <summary>Tem Pile of Books para Android?</summary>
                  <p>Hoje o app é para iPhone. A versão web funciona no navegador de qualquer celular.</p>
                </details>
                <details>
                  <summary>O que é o Pile of Books?</summary>
                  <p>
                    Uma estante pessoal de livros, HQs e mangás, com diário de leitura, estatísticas de verdade e
                    retrospectiva do ano. Grátis e sem anúncio, para iPhone e web.
                  </p>
                </details>
                <details>
                  <summary>O Pile of Books funciona sem internet?</summary>
                  <p>Não. A estante mora na nuvem, e o app precisa de internet para acessá-la.</p>
                </details>
                <details>
                  <summary>Meus dados ficam presos no Pile of Books?</summary>
                  <p>
                    Não. Você importa sua biblioteca em CSV e exporta tudo em CSV ou JSON, além de uma API só de
                    leitura, protegida por token.
                  </p>
                </details>
                <details>
                  <summary>A página pública mostra o que eu leio?</summary>
                  <p>
                    Só se você ativar, e mesmo assim ela mostra apenas totais: quantidade de lidos, páginas, ritmo,
                    gêneros e autores. Nunca títulos, estante ou resenhas.
                  </p>
                </details>
                <details>
                  <summary>Como o Pile of Books foi construído?</summary>
                  <p>
                    Em 26 dias, com Lovable, Claude Code, Codex e Instinct. Começou como web app, com React,
                    TypeScript e Supabase, e virou app de iPhone com Capacitor, com builds na nuvem pelo Codemagic.
                  </p>
                </details>
                <details>
                  <summary>Quem criou o Pile of Books?</summary>
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
                <span className="c-chip">Claude Code</span>
                <span className="c-chip">Codex</span>
                <span className="c-chip">Instinct</span>
                <span className="c-chip">React 19 · TypeScript</span>
                <span className="c-chip">TanStack</span>
                <span className="c-chip">Supabase</span>
                <span className="c-chip">Capacitor</span>
                <span className="c-chip">Codemagic</span>
                <span className="c-chip">TestFlight</span>
                <span className="c-chip">GA4</span>
                <span className="c-chip">BrasilAPI</span>
                <span className="c-chip">Google Books</span>
                <span className="c-chip">Open Library</span>
                <span className="c-chip">Gemini</span>
              </div>
            </section>
          </article>
        </div>

        <section className="c-cta">
          <div className="c-wrap">
            <h2>
              Sua estante, com <em>estatísticas de verdade</em>.
            </h2>
            <div className="acts">
              <a
                className="c-appbtn"
                href="https://apps.apple.com/br/app/pile-of-books/id6816698886"
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
              <a className="c-btn" href="mailto:neigirao@gmail.com?subject=Sobre%20o%20Pile%20of%20Books">
                Falar comigo
              </a>
              <a
                className="c-btn"
                href="https://github.com/neigirao/my-book-shelf"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>

        <nav className="c-wrap c-next" aria-label="Outro projeto">
          <Link to="/lab/rep-up">
            <div>
              <span className="c-mono">Outro no Lab</span>
              <div className="t">Rep Up</div>
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

export default PileOfBooks;
