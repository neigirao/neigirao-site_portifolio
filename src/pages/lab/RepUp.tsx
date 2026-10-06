import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema';
import { BASE_URL } from '@/config/constants';
import '@/styles/cases.css';

export function RepUp() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const links = [...document.querySelectorAll<HTMLAnchorElement>('.case-rup .c-toc ol a')];
    const secs = links.map(a => document.querySelector<HTMLElement>(a.getAttribute('href') || ''));

    const onScroll = () => {
      const h = document.documentElement;
      if (bar) bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
      let cur = 0;
      secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < 140) cur = i; });
      links.forEach((a, i) => a.classList.toggle('on', i === cur));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${BASE_URL}/lab/rep-up#article`,
        "headline": "Rep Up: app de musculação grátis para iPhone, offline e sem anúncios",
        "description": "Rep Up é um app de treino grátis para iPhone: monta o treino em duas perguntas, ensina 876 exercícios e funciona sem internet. Veja como foi criado e aprovado na App Store.",
        "image": `${BASE_URL}/lab/rep-up/og.png`,
        "datePublished": "2026-10-05",
        "dateModified": "2026-10-06",
        "inLanguage": "pt-BR",
        "author": { "@id": `${BASE_URL}/#person` },
        "keywords": "app de musculação grátis, app de treino para iPhone, app de academia offline, Rep Up, treino sem internet, App Store, Capacitor, Supabase, vibe code, Nei Girão",
        "mainEntityOfPage": `${BASE_URL}/lab/rep-up`
      },
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        "name": "Nei Girão",
        "jobTitle": "Product Manager",
        "url": `${BASE_URL}/`,
        "sameAs": ["https://www.linkedin.com/in/neigirao/", "https://github.com/neigirao"],
        "knowsAbout": ["Product Management", "Product Analytics", "Vibe coding", "React", "Supabase", "Capacitor", "iOS", "App Store"]
      },
      {
        "@type": "MobileApplication",
        "@id": "https://apps.apple.com/br/app/rep-up/id6812042720#app",
        "name": "Rep Up",
        "operatingSystem": "iOS",
        "applicationCategory": "HealthApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "BRL"
        },
        "url": "https://apps.apple.com/br/app/rep-up/id6812042720",
        "sameAs": ["https://repupgym.lovable.app/", "https://github.com/neigirao/rep-up-buddy"],
        "creator": { "@id": `${BASE_URL}/#person` },
        "identifier": {
          "@type": "PropertyValue",
          "propertyID": "AppleAppStoreID",
          "value": "6812042720"
        }
      },
      {
        "@type": "SoftwareSourceCode",
        "name": "rep-up-buddy",
        "codeRepository": "https://github.com/neigirao/rep-up-buddy",
        "programmingLanguage": ["TypeScript", "Swift", "SQL"],
        "runtimePlatform": "React 18, Supabase, Capacitor",
        "author": { "@id": `${BASE_URL}/#person` }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "O Rep Up é realmente gratuito?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. O Rep Up é grátis, sem anúncio e sem compra dentro do app. O custo é zero para baixar e para usar."
            }
          },
          {
            "@type": "Question",
            "name": "O Rep Up funciona sem internet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. O treino é gravado no aparelho com IndexedDB (Dexie). A nuvem (Supabase) é cópia: sincroniza quando há sinal, mas o app funciona normalmente sem internet."
            }
          },
          {
            "@type": "Question",
            "name": "Quantos exercícios o Rep Up tem?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "876 exercícios, com foto e passo a passo em português. Os dados vêm do Free Exercise DB, adaptado e traduzido."
            }
          },
          {
            "@type": "Question",
            "name": "Por que o Rep Up não tem IA na versão 1.0?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Apple rejeitou o app por causa das diretrizes 5.1.1(i) e 5.1.2(i), que exigem consentimento específico para coletar dados de saúde com IA. Para lançar sem cobrar do usuário, desliguei a IA na versão 1.0. A próxima versão traz a IA de volta com o fluxo de consentimento correto."
            }
          },
          {
            "@type": "Question",
            "name": "O Rep Up é para iPhone mesmo? E o Android?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A versão 1.0 é para iPhone (iOS). Há também uma versão web em repupgym.lovable.app. A versão Android está em desenvolvimento."
            }
          },
          {
            "@type": "Question",
            "name": "Como o Rep Up foi construído?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Com vibe code, usando Lovable, Claude Code, Codex e Instinct, sobre React, TypeScript, Dexie/IndexedDB, Supabase e Capacitor para iOS. O app passou pela revisão da Apple e está na App Store desde 05/10/2026."
            }
          },
          {
            "@type": "Question",
            "name": "O código do Rep Up é aberto?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim. O repositório está no GitHub em github.com/neigirao/rep-up-buddy."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Início", "item": `${BASE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": "Lab", "item": `${BASE_URL}/#lab` },
          { "@type": "ListItem", "position": 3, "name": "Rep Up" }
        ]
      }
    ]
  };

  return (
    <div className="case-page case-rup">
      <SEOHead
        title="Rep Up: app de musculação grátis para iPhone, offline e sem anúncios | Nei Girão"
        description="Rep Up é um app de treino grátis para iPhone: monta o treino em duas perguntas, ensina 876 exercícios e funciona sem internet. Veja como foi criado e aprovado na App Store."
        canonicalUrl={`${BASE_URL}/lab/rep-up`}
        ogImage={`${BASE_URL}/lab/rep-up/og.png`}
        ogType="article"
        keywords={['app de musculação grátis', 'app de treino para iPhone', 'app de academia offline', 'Rep Up', 'treino sem internet', 'App Store', 'Capacitor', 'Supabase', 'vibe code', 'Nei Girão']}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Helmet>
        <meta name="apple-itunes-app" content="app-id=6812042720" />
      </Helmet>
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Lab', url: '/#lab' },
        { name: 'Rep Up' },
      ]} />

      <div className="c-progress" ref={progressRef} />

      <header className="c-mast">
        <div className="c-wrap">
          <Link to="/" className="c-mast-brand">Nei Girão</Link>
          <nav className="c-mast-right c-mono">
            <Link to="/#projects" className="lnk">Projetos</Link>
            <Link to="/#lab" className="lnk">Lab</Link>
            <Link to="/#contact" className="lnk">Contato</Link>
          </nav>
        </div>
      </header>

      <main>
        <div className="c-wrap">
          <nav className="c-crumb c-mono" aria-label="Breadcrumb">
            <Link to="/">Início</Link><span>/</span>
            <Link to="/#lab">Lab</Link><span>/</span>
            <span>Rep Up</span>
          </nav>

          <header className="c-hero">
            <div className="c-kicker c-mono">Lab · App iOS · Treino · Vibe code</div>
            <h1 className="c-disp">
              Construí um app de treino para iPhone. <em>Do zero à App Store em 5 semanas.</em>
            </h1>
            <p className="c-dek">
              Rep Up é um app de musculação grátis para iPhone: duas perguntas montam a semana, um toque registra a série e o descanso começa sozinho. Funciona sem sinal.
            </p>
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

            <div className="rup-hero-btns" style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                className="c-btn pri rup-appbtn"
                href="https://apps.apple.com/br/app/rep-up/id6812042720"
                target="_blank"
                rel="noopener noreferrer"
              >
                ↓ Baixar na App Store
              </a>
              <a
                className="c-btn"
                href="https://repupgym.lovable.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Versão web ↗
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

            <figure className="c-shot" style={{ marginTop: '36px' }}>
              <img
                src="/lab/rep-up/og.png"
                alt="Rep Up: app de musculação grátis para iPhone"
                width={1200}
                height={630}
                fetchPriority="high"
                style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '10px', border: '1px solid var(--case-line)' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </figure>
          </header>
        </div>

        <div className="c-wrap c-body">
          <aside className="c-toc" aria-label="Neste projeto">
            <span className="c-mono">Neste projeto</span>
            <ol>
              <li><a href="#problema">O problema</a></li>
              <li><a href="#solucao">A solução</a></li>
              <li><a href="#decisoes">Decisões de produto</a></li>
              <li><a href="#arquitetura">A arquitetura</a></li>
              <li><a href="#ia">A IA e a Apple</a></li>
              <li><a href="#lancamento">O lançamento</a></li>
              <li><a href="#processo">Como trabalhei</a></li>
              <li><a href="#licoes">O que deu errado</a></li>
              <li><a href="#depois">O que vem depois</a></li>
              <li><a href="#faq">Perguntas frequentes</a></li>
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
            {/* TLDR */}
            <div className="c-tldr">
              <span className="c-mono">Resumo em 30 segundos</span>
              <ul>
                <li><strong>O app:</strong> musculação para quem treina sozinho. Grátis, sem anúncio e sem compra dentro do app.</li>
                <li><strong>A ideia:</strong> duas perguntas montam a semana; na academia, um toque registra a série e o descanso começa sozinho.</li>
                <li><strong>O diferencial:</strong> funciona sem sinal. O treino fica gravado no aparelho, e a nuvem é só cópia.</li>
                <li><strong>Tempo:</strong> 5 semanas entre a primeira versão do banco (29/08/2026) e a App Store (05/10/2026), com duas rejeições no caminho.</li>
                <li><strong>A virada:</strong> a Apple rejeitou o app por causa da IA. Desliguei a IA, reenviei, e a versão 1.0 entrou no ar em 05/10/2026.</li>
              </ul>
            </div>

            {/* O que este projeto mostra */}
            <aside className="c-hire" aria-label="O que este projeto mostra">
              <div className="hd"><span className="c-mono">O que este projeto mostra</span></div>
              <ul>
                <li>
                  <b>Dono do produto, de ponta a ponta</b>
                  <span>Da ideia à App Store, passando por design, código e revisão da Apple. <a href="#lancamento">Ver o lançamento</a></span>
                </li>
                <li>
                  <b>Coragem de cortar escopo</b>
                  <span>Três abas, sem calorias, sem rede social, sem cobrança. <a href="#decisoes">Ver as decisões</a></span>
                </li>
                <li>
                  <b>Fluência técnica</b>
                  <span>Offline-first, sincronia em transação e app nativo com Capacitor e Swift. <a href="#arquitetura">Ver a arquitetura</a></span>
                </li>
                <li>
                  <b>Privacidade e conformidade</b>
                  <span>Desliguei a IA para cumprir as regras da Apple sem cobrar do usuário. <a href="#ia">Ver a decisão</a></span>
                </li>
                <li>
                  <b>Construção com IA</b>
                  <span>Agentes de IA escrevem o código; eu decido o produto. <a href="#processo">Ver o processo</a></span>
                </li>
              </ul>
            </aside>

            {/* S01 — O problema */}
            <section id="problema" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">01 — O problema</span>
                Apps de treino comuns pedem demais antes de mostrar qualquer coisa.
              </h2>
              <p>
                A cena que guiou o design: <em>"De pé na academia, entre séries. Uma mão livre, suada. Celular às vezes no chão. Luz de subsolo, sem sinal. Noventa segundos de descanso."</em>
              </p>
              <p>
                Apps comuns pedem peso, altura e dados antes de mostrar qualquer coisa. Têm calorias, metas e rede social que ninguém pediu. Precisam de internet. Mandam notificação cobrando todo dia.
              </p>

              <div className="c-shift" style={{ margin: '32px 0 8px' }}>
                <div className="side">
                  <span className="c-mono">Apps comuns</span>
                  <ul>
                    <li>Cadastro: peso, altura, idade</li>
                    <li>Calorias, metas, rede social</li>
                    <li>Precisam de internet</li>
                    <li>Notificação cobrando todo dia</li>
                  </ul>
                </div>
                <div className="arrow">→</div>
                <div className="side to">
                  <span className="c-mono">Rep Up</span>
                  <ul>
                    <li>Duas perguntas e treino pronto</li>
                    <li>Só treino e o que levantou</li>
                    <li>Funciona sem sinal</li>
                    <li>Nenhuma bolinha vermelha</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* S02 — A solução */}
            <section id="solucao" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">02 — A solução</span>
                Um toque registra a série. O descanso começa sozinho.
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

              {/* Phone strip */}
              <div className="rup-phones" style={{ display: 'flex', gap: '14px', margin: '28px 0 8px', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '10px' }}>
                {[
                  { src: '/lab/rep-up/1-treino.png', width: 1242, height: 2688, alt: 'Tela Treino: próximo treino A, lista de exercícios e dias da semana', caption: 'Treino' },
                  { src: '/lab/rep-up/2-sessao.png', width: 1242, height: 2688, alt: 'Sessão de treino: supino reto, contador de séries, peso e repetições', caption: 'Sessão' },
                  { src: '/lab/rep-up/3-descanso.png', width: 1242, height: 2688, alt: 'Descanso automático: cronômetro de 2:28 e próximo exercício', caption: 'Descanso' },
                  { src: '/lab/rep-up/4-voce.png', width: 1242, height: 2688, alt: 'Tela Você: tom do professor e configurações pessoais', caption: 'Você' },
                  { src: '/lab/rep-up/5-numeros.png', width: 1242, height: 2688, alt: 'Tela Números: treinos e séries da semana e histórico', caption: 'Números' },
                ].map(({ src, width, height, alt, caption }) => (
                  <figure key={src} style={{ flex: '0 0 200px', scrollSnapAlign: 'start', margin: 0 }}>
                    <img
                      src={src}
                      alt={alt}
                      width={width}
                      height={height}
                      loading="lazy"
                      style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '14px', border: '1px solid var(--case-line)', background: '#111' }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <figcaption style={{ textAlign: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--case-muted)', marginTop: '8px' }}>
                      {caption}
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="c-reads" style={{ marginTop: '24px' }}>
                <div className="c-read">
                  <div className="a">Ficha do professor</div>
                  <div className="ar">→</div>
                  <div className="b">Duas perguntas (divisão e dias por semana) montam a semana inteira automaticamente.</div>
                </div>
                <div className="c-read">
                  <div className="a">Trocar um exercício</div>
                  <div className="ar">→</div>
                  <div className="b">Substitua qualquer exercício por outro do mesmo grupo muscular, sem refazer o treino.</div>
                </div>
                <div className="c-read">
                  <div className="a">Progresso honesto</div>
                  <div className="ar">→</div>
                  <div className="b">Histórico por exercício: o que você levantou, quando e quantas séries.</div>
                </div>
                <div className="c-read">
                  <div className="a">Seus dados</div>
                  <div className="ar">→</div>
                  <div className="b">Tudo fica no aparelho. A nuvem sincroniza, mas não é obrigatória.</div>
                </div>
              </div>
            </section>

            {/* S03 — Decisões de produto */}
            <section id="decisoes" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">03 — Decisões de produto</span>
                O que entrou, o que ficou de fora e por quê.
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '24px 0 8px' }}>
                <div style={{ border: '1px solid var(--case-line)', borderRadius: '8px', padding: '18px', background: 'var(--case-paper)' }}>
                  <span className="c-mono" style={{ color: 'var(--case-accent)', display: 'block', marginBottom: '10px' }}>Entrou</span>
                  <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '15px', lineHeight: 1.6 }}>
                    <li>Treino em 2 perguntas</li>
                    <li>Registro com 1 toque</li>
                    <li>Descanso automático</li>
                    <li>Offline com sincronização</li>
                    <li>Catálogo indexável (876 exercícios)</li>
                    <li>Tom do professor à escolha</li>
                  </ul>
                </div>
                <div style={{ border: '1px solid var(--case-line)', borderRadius: '8px', padding: '18px', background: 'var(--case-paper)', opacity: 0.7 }}>
                  <span className="c-mono" style={{ color: 'var(--case-muted)', display: 'block', marginBottom: '10px' }}>Ficou de fora</span>
                  <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '15px', lineHeight: 1.6, color: 'var(--case-muted)' }}>
                    <li>Calorias e macros</li>
                    <li>Rede social e conquistas</li>
                    <li>Wearable e vídeo</li>
                    <li>Câmera de forma</li>
                    <li>Moeda virtual</li>
                    <li>Foto de progresso</li>
                  </ul>
                </div>
              </div>

              <div className="c-decisions" style={{ marginTop: '32px' }}>
                <div className="c-dec">
                  <div className="num">1</div>
                  <div>
                    <h3>Offline-first, nuvem como cópia</h3>
                    <p>O dado do treino fica no aparelho (IndexedDB via Dexie). A nuvem (Supabase) é backup e sincronia entre dispositivos. O app nunca fica indisponível por falta de sinal.</p>
                    <div className="trade"><b>Trade-off</b> Sincronia em transação exigiu lógica de conflito e merge. Mais complexidade, mas o usuário nunca perde um treino.</div>
                  </div>
                </div>
                <div className="c-dec">
                  <div className="num">2</div>
                  <div>
                    <h3>Grátis, sem anúncio, sem compra</h3>
                    <p>A decisão de não cobrar e não mostrar anúncio foi tomada antes da primeira linha de código. O app é laboratório de produto, não negócio.</p>
                    <div className="trade"><b>Trade-off</b> Sem receita, o custo de infraestrutura sai do bolso. Aceitável para o escopo atual.</div>
                  </div>
                </div>
                <div className="c-dec">
                  <div className="num">3</div>
                  <div>
                    <h3>Três abas, sem mais</h3>
                    <p>O app tem exatamente três abas: Treino, Números e Você. Qualquer feature nova precisa caber em uma delas ou justificar uma quarta.</p>
                    <div className="trade"><b>Trade-off</b> Algumas features legais (ex.: registro de aparelhos da academia) foram descartadas por não se encaixar sem forçar a estrutura.</div>
                  </div>
                </div>
              </div>

              <p style={{ marginTop: '20px', color: 'var(--case-muted)', fontSize: '15px', fontStyle: 'italic' }}>
                Uma ideia que não entrou: cadastrar os aparelhos de cada academia. Seria útil, mas adicionaria uma quarta aba e dependência de dados externos. Ficou para depois.
              </p>
            </section>

            {/* S04 — A arquitetura */}
            <section id="arquitetura" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">04 — A arquitetura</span>
                Cinco regras que guiaram cada decisão técnica.
              </h2>

              <ol className="c-lessons" style={{ counterReset: 'l', listStyle: 'none', padding: 0, margin: '24px 0 0' }}>
                <li>
                  <strong>O dado do treino pertence ao usuário, não ao servidor.</strong>
                  Tudo vai para o IndexedDB primeiro. O Supabase recebe a cópia depois.
                </li>
                <li>
                  <strong>Nenhuma tela depende de rede para funcionar.</strong>
                  Se a sincronização falha, o usuário nem percebe. O treino continua.
                </li>
                <li>
                  <strong>Cada escrita é uma transação.</strong>
                  Série registrada, descanso iniciado e histórico atualizado em uma operação. Sem estado parcial.
                </li>
                <li>
                  <strong>O código nativo é mínimo.</strong>
                  Capacitor cuida da ponte iOS. O Swift customizado cobre só o que o Capacitor não entrega nativamente.
                </li>
                <li>
                  <strong>Observabilidade desde o início.</strong>
                  GA4, Sentry e Crashlytics antes de qualquer usuário real.
                </li>
              </ol>

              <h3 className="c-h3">Stack</h3>
              <div className="c-stack">
                <div className="ly">
                  <span className="c-mono">Interface</span>
                  <div className="t">React + TypeScript</div>
                  <div className="d">Vite, Tailwind, shadcn-ui.</div>
                </div>
                <div className="ly">
                  <span className="c-mono">Dados locais</span>
                  <div className="t">IndexedDB (Dexie)</div>
                  <div className="d">Treinos, séries e histórico gravados no aparelho.</div>
                </div>
                <div className="ly">
                  <span className="c-mono">Nuvem</span>
                  <div className="t">Supabase</div>
                  <div className="d">Postgres, autenticação, storage e RLS.</div>
                </div>
                <div className="ly">
                  <span className="c-mono">iOS</span>
                  <div className="t">Capacitor + Swift</div>
                  <div className="d">App nativo via Capacitor. Notificações em Swift.</div>
                </div>
                <div className="ly">
                  <span className="c-mono">CI/CD</span>
                  <div className="t">Codemagic</div>
                  <div className="d">Build automático, TestFlight e App Store Connect.</div>
                </div>
                <div className="ly">
                  <span className="c-mono">Qualidade</span>
                  <div className="t">GA4 · Sentry · Crashlytics</div>
                  <div className="d">Testes, CI, observabilidade e crash reports.</div>
                </div>
              </div>
            </section>

            {/* S05 — A IA e a Apple */}
            <section id="ia" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">05 — A IA e a Apple</span>
                A Apple rejeitou o app por causa da IA. Desliguei a IA.
              </h2>
              <p>
                O build 26 foi reprovado pelas diretrizes <strong>5.1.1(i) e 5.1.2(i)</strong>: features de IA que processam dados de saúde exigem consentimento explícito e fluxo de privacidade específico.
              </p>
              <p>Três caminhos possíveis:</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px', margin: '24px 0 8px' }}>
                <div style={{ border: '1px solid var(--case-line)', borderRadius: '8px', padding: '18px', background: 'var(--case-paper)', opacity: 0.6 }}>
                  <span className="c-mono" style={{ display: 'block', marginBottom: '8px', color: 'var(--case-muted)' }}>Opção A — Descartada</span>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', marginBottom: '8px' }}>Adicionar paywall</div>
                  <div style={{ fontSize: '14px', color: 'var(--case-muted)', lineHeight: 1.5 }}>Cobrar pelo plano com IA. Cumpre a diretriz, mas contradiz a premissa do app ser gratuito.</div>
                </div>
                <div style={{ border: '1px solid var(--case-line)', borderRadius: '8px', padding: '18px', background: 'var(--case-paper)', opacity: 0.6 }}>
                  <span className="c-mono" style={{ display: 'block', marginBottom: '8px', color: 'var(--case-muted)' }}>Opção B — Descartada</span>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', marginBottom: '8px' }}>Modo híbrido</div>
                  <div style={{ fontSize: '14px', color: 'var(--case-muted)', lineHeight: 1.5 }}>IA opcional com tela de consentimento. Mais complexidade, mais prazo para revisão.</div>
                </div>
                <div style={{ border: '2px solid var(--case-accent)', borderRadius: '8px', padding: '18px', background: 'var(--case-paper)' }}>
                  <span className="c-mono" style={{ display: 'block', marginBottom: '8px', color: 'var(--case-accent)' }}>Escolhida</span>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', marginBottom: '8px' }}>Desligar a IA na 1.0</div>
                  <div style={{ fontSize: '14px', color: 'var(--case-muted)', lineHeight: 1.5 }}>Remover completamente a IA da v1.0. Lançar rápido, trazer a IA de volta na próxima versão com o fluxo correto.</div>
                </div>
              </div>

              <div className="trade" style={{ marginTop: '16px', fontSize: '15px', color: 'var(--case-muted)', borderLeft: '2px solid var(--case-accent)', paddingLeft: '14px' }}>
                <b style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--case-accent)', marginRight: '6px' }}>Trade-off</b>
                A versão 1.0 não tem sugestão inteligente de treino. Mas entrou na loja sem cobrar do usuário e sem complexidade de consentimento.
              </div>

              <p style={{ marginTop: '20px' }}>
                A IA volta na próxima versão com: apenas dias/semana e experiência (sem dados pessoais), consentimento explícito obrigatório e declaração de faixa etária e região.
              </p>
            </section>

            {/* S06 — O lançamento */}
            <section id="lancamento" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">06 — O lançamento</span>
                5 semanas, 2 rejeições, 1 app no ar.
              </h2>

              <div style={{ borderTop: '2px solid var(--case-fg)', marginTop: '24px' }}>
                {[
                  { date: '29/08/2026', event: 'Primeira versão do banco. Começa o projeto.' },
                  { date: 'Build 26', event: 'Reprovado pelas diretrizes 5.1.1 e 5.1.2, por causa da IA.' },
                  { date: '01/10/2026', event: 'Correção da diretriz 4.0 (logo Apple). Conta de demonstração desativada e substituída.' },
                  { date: '03/10/2026', event: 'Build 27 reenviado, com IA desligada.' },
                  { date: '05/10/2026', event: 'Versão 1.0 no ar. 🎉', highlight: true },
                ].map(({ date, event, highlight }) => (
                  <div
                    key={date}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '120px minmax(0, 1fr)',
                      gap: '20px',
                      padding: '18px 0',
                      borderBottom: '1px solid var(--case-line)',
                      alignItems: 'baseline',
                      ...(highlight ? { background: 'transparent' } : {}),
                    }}
                  >
                    <span className="c-mono" style={{ color: highlight ? 'var(--case-accent)' : 'var(--case-muted)', fontSize: '11px' }}>{date}</span>
                    <span style={{ fontSize: '16px', fontWeight: highlight ? 600 : 400, color: highlight ? 'var(--case-fg)' : undefined }}>{event}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* S07 — Como trabalhei */}
            <section id="processo" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">07 — Como trabalhei</span>
                Agentes de IA escrevem o código. Eu decido o produto.
              </h2>
              <p>
                Lovable construiu a primeira versão. Claude Code, Codex e Instinct foram os agentes de código. Sete prompts colados um a um geraram a estrutura inicial.
              </p>
              <p>
                Para cada nova feature, passei por quatro revisores de IA antes de aceitar o código:
              </p>

              <div className="c-reads">
                <div className="c-read">
                  <div className="a">Engenheiro</div>
                  <div className="ar">→</div>
                  <div className="b">Revisou arquitetura, tipagem e edge cases. Apontou o risco da sincronia sem transação.</div>
                </div>
                <div className="c-read">
                  <div className="a">UX</div>
                  <div className="ar">→</div>
                  <div className="b">Revisou fluxos, microcopy e estados de erro. Pediu o aviso de descanso na tela apagada.</div>
                </div>
                <div className="c-read">
                  <div className="a">Designer</div>
                  <div className="ar">→</div>
                  <div className="b">Revisou hierarquia visual e contraste. Simplificou a tela de sessão.</div>
                </div>
                <div className="c-read">
                  <div className="a">Personal trainer</div>
                  <div className="ar">→</div>
                  <div className="b">Validou a lógica de montagem de treino e os tempos de descanso padrão.</div>
                </div>
              </div>
            </section>

            {/* S08 — O que deu errado */}
            <section id="licoes" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">08 — O que deu errado</span>
                Quatro lições que custaram tempo.
              </h2>
              <ol className="c-lessons">
                <li>
                  <strong>Não ler as diretrizes da Apple antes de implementar IA.</strong>
                  A rejeição por 5.1.1 e 5.1.2 era previsível. Bastava ler antes de codar.
                </li>
                <li>
                  <strong>Conta de demonstração hardcoded.</strong>
                  A Apple pediu uma conta de demonstração funcional. A que eu criei tinha dados hardcoded que quebraram no review. Precisou de um build extra só para isso.
                </li>
                <li>
                  <strong>Logo da Apple no onboarding.</strong>
                  A diretriz 4.0 proíbe usar o logo da Apple de qualquer jeito. Usei para indicar "login com Apple" na tela de entrada. Teve que sair.
                </li>
                <li>
                  <strong>Confiar demais na IA para decisões de produto.</strong>
                  A IA sugeriu calorias e macros na primeira versão do plano. Levei dois dias para perceber que isso contrariava tudo que eu queria construir.
                </li>
              </ol>
            </section>

            {/* S09 — O que vem depois */}
            <section id="depois" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">09 — O que vem depois</span>
                v1.0.1 em TestFlight. Android em desenvolvimento.
              </h2>
              <p>O que está em TestFlight agora:</p>

              <div className="c-stack">
                <div className="ly">
                  <span className="c-mono">IA de volta</span>
                  <div className="t">Conexão com Gemini</div>
                  <div className="d">Com o fluxo de consentimento correto, sem dados pessoais.</div>
                </div>
                <div className="ly">
                  <span className="c-mono">Saúde</span>
                  <div className="t">Apple Saúde</div>
                  <div className="d">Sincronização de treinos com o app Saúde do iPhone.</div>
                </div>
                <div className="ly">
                  <span className="c-mono">UX</span>
                  <div className="t">Seletor em roda</div>
                  <div className="d">Selecionar peso e reps com o wheel picker nativo do iOS.</div>
                </div>
                <div className="ly">
                  <span className="c-mono">Onboarding</span>
                  <div className="t">Novo fluxo de entrada</div>
                  <div className="d">Menos fricção para o primeiro treino.</div>
                </div>
              </div>

              <p style={{ marginTop: '20px' }}>
                <strong>Android:</strong> em desenvolvimento. A base React + Capacitor facilita o porte, mas a revisão do Google tem seu próprio processo.
              </p>
            </section>

            {/* S10 — FAQ */}
            <section id="faq" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">10 — Perguntas frequentes</span>
                Sobre o Rep Up
              </h2>
              <div className="c-faq">
                <details>
                  <summary>O Rep Up é realmente gratuito?</summary>
                  <p>Sim. O Rep Up é grátis, sem anúncio e sem compra dentro do app. O custo é zero para baixar e para usar.</p>
                </details>
                <details>
                  <summary>O Rep Up funciona sem internet?</summary>
                  <p>Sim. O treino é gravado no aparelho com IndexedDB (Dexie). A nuvem (Supabase) é cópia: sincroniza quando há sinal, mas o app funciona normalmente sem internet.</p>
                </details>
                <details>
                  <summary>Quantos exercícios o Rep Up tem?</summary>
                  <p>876 exercícios, com foto e passo a passo em português. Os dados vêm do Free Exercise DB, adaptado e traduzido.</p>
                </details>
                <details>
                  <summary>Por que o Rep Up não tem IA na versão 1.0?</summary>
                  <p>A Apple rejeitou o app por causa das diretrizes 5.1.1(i) e 5.1.2(i), que exigem consentimento específico para coletar dados de saúde com IA. Para lançar sem cobrar do usuário, desliguei a IA na versão 1.0. A próxima versão traz a IA de volta com o fluxo de consentimento correto.</p>
                </details>
                <details>
                  <summary>O Rep Up é para iPhone mesmo? E o Android?</summary>
                  <p>A versão 1.0 é para iPhone (iOS). Há também uma versão web em <a href="https://repupgym.lovable.app/" target="_blank" rel="noopener noreferrer">repupgym.lovable.app</a>. A versão Android está em desenvolvimento.</p>
                </details>
                <details>
                  <summary>Como o Rep Up foi construído?</summary>
                  <p>Com vibe code, usando Lovable, Claude Code, Codex e Instinct, sobre React, TypeScript, Dexie/IndexedDB, Supabase e Capacitor para iOS. O app passou pela revisão da Apple e está na App Store desde 05/10/2026.</p>
                </details>
                <details>
                  <summary>O código do Rep Up é aberto?</summary>
                  <p>Sim. O repositório está no GitHub em <a href="https://github.com/neigirao/rep-up-buddy" target="_blank" rel="noopener noreferrer">github.com/neigirao/rep-up-buddy</a>.</p>
                </details>
              </div>
            </section>

            {/* Ferramentas */}
            <section style={{ marginBottom: 0 }}>
              <span className="c-mono" style={{ color: 'var(--case-muted)', display: 'block', marginBottom: '14px' }}>Ferramentas</span>
              <div className="c-chips">
                {[
                  'Lovable', 'Free Exercise DB', 'Claude Code', 'Codex', 'Instinct',
                  'React · TypeScript', 'Dexie / IndexedDB', 'Supabase', 'Capacitor',
                  'Swift', 'Codemagic', 'TestFlight', 'GA4', 'Sentry', 'Crashlytics',
                ].map(tool => (
                  <span key={tool} className="c-chip">{tool}</span>
                ))}
              </div>
            </section>
          </article>
        </div>

        {/* CTA */}
        <section className="c-cta">
          <div className="c-wrap">
            <h2>Seu treino, <em>sem enrolação.</em></h2>
            <div className="acts">
              <a
                className="c-btn pri"
                href="https://apps.apple.com/br/app/rep-up/id6812042720"
                target="_blank"
                rel="noopener noreferrer"
              >
                ↓ App Store
              </a>
              <a className="c-btn" href="mailto:neigirao@gmail.com?subject=Sobre%20o%20Rep%20Up">Falar comigo</a>
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

        {/* Next */}
        <nav className="c-wrap c-next" aria-label="Outro projeto">
          <Link to="/#lab">
            <div>
              <span className="c-mono">Voltar ao Lab</span>
              <div className="t">Todos os projetos</div>
            </div>
            <span className="arr">→</span>
          </Link>
        </nav>
      </main>

      <footer className="c-foot c-mono">
        <div className="c-wrap">
          <span>© Nei Girão · 2026</span>
          <Link to="/" style={{ color: '#E27464' }}>← Voltar ao site</Link>
        </div>
      </footer>
    </div>
  );
}

export default RepUp;
