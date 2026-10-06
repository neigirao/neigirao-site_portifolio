import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema';
import { BASE_URL } from '@/config/constants';
import '@/styles/cases.css';

export function LendasDoFlu() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const links = [...document.querySelectorAll<HTMLAnchorElement>('.case-ldf .c-toc ol a')];
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
        "@id": `${BASE_URL}/lab/lendas-do-flu#article`,
        "headline": "Lendas do Flu: um jogo que virou laboratório de dados",
        "description": "Case de produto: quiz do Fluminense feito com vibe code, dados, especiais, admin, monitoramento e servidor MCP.",
        "image": "https://lendasdoflu.com/1-og-lendas.png",
        "datePublished": "2026-10-06",
        "dateModified": "2026-10-06",
        "inLanguage": "pt-BR",
        "author": { "@id": `${BASE_URL}/#person` },
        "about": { "@id": "https://lendasdoflu.com/#app" },
        "keywords": "Fluminense, quiz, vibe coding, product management, dados, Supabase, React, MCP",
        "mainEntityOfPage": `${BASE_URL}/lab/lendas-do-flu`
      },
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        "name": "Nei Girão",
        "jobTitle": "Product Manager",
        "url": `${BASE_URL}/`,
        "sameAs": ["https://www.linkedin.com/in/neigirao/", "https://github.com/neigirao"],
        "knowsAbout": ["Product Management", "Product Analytics", "Observabilidade", "Vibe coding", "React", "Supabase", "Model Context Protocol"]
      },
      {
        "@type": ["VideoGame", "SoftwareApplication"],
        "@id": "https://lendasdoflu.com/#app",
        "name": "Lendas do Flu",
        "url": "https://lendasdoflu.com/",
        "applicationCategory": "GameApplication",
        "genre": "Quiz",
        "operatingSystem": "Web, iOS",
        "inLanguage": "pt-BR",
        "creator": { "@id": `${BASE_URL}/#person` },
        "sameAs": ["https://github.com/neigirao/flulegendarium"]
      },
      {
        "@type": "SoftwareSourceCode",
        "name": "flulegendarium",
        "codeRepository": "https://github.com/neigirao/flulegendarium",
        "programmingLanguage": ["TypeScript", "SQL"],
        "runtimePlatform": "React 18, Supabase",
        "author": { "@id": `${BASE_URL}/#person` }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "O que é o Lendas do Flu?",
            "acceptedAnswer": { "@type": "Answer", "text": "Um quiz sobre ídolos e camisas históricas do Fluminense, com três modos de jogo, ranking, desafios diários e páginas especiais como o Maior Atacante e o Maior Treinador." }
          },
          {
            "@type": "Question",
            "name": "Como o Lendas do Flu foi construído?",
            "acceptedAnswer": { "@type": "Answer", "text": "Com vibe code, usando Lovable, Claude Code, Codex e Instinct, sobre React, TypeScript e Supabase, com testes, ADRs e monitoramento com Sentry, GA4 e Web Vitals." }
          },
          {
            "@type": "Question",
            "name": "Quem criou o Lendas do Flu?",
            "acceptedAnswer": { "@type": "Answer", "text": "Nei Girão, Product Manager, como projeto pessoal para estudar produto, dados e desenvolvimento com IA." }
          },
          {
            "@type": "Question",
            "name": "O código do Lendas do Flu é aberto?",
            "acceptedAnswer": { "@type": "Answer", "text": "Sim. O repositório está no GitHub em github.com/neigirao/flulegendarium, com arquitetura e decisões documentadas." }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Início", "item": `${BASE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": "Lab", "item": `${BASE_URL}/#lab` },
          { "@type": "ListItem", "position": 3, "name": "Lendas do Flu" }
        ]
      }
    ]
  };

  return (
    <div className="case-page case-ldf">
      <SEOHead
        title="Lendas do Flu: quiz do Fluminense, dados e vibe code | Case · Nei Girão"
        description="Case de produto de Nei Girão, Product Manager: o Lendas do Flu, quiz do Fluminense feito com vibe code, React e Supabase. Dados, especiais, admin, monitoramento e um servidor MCP."
        canonicalUrl={`${BASE_URL}/lab/lendas-do-flu`}
        ogImage="https://lendasdoflu.com/1-og-lendas.png"
        ogType="article"
        keywords={['Lendas do Flu', 'quiz Fluminense', 'vibe coding', 'product manager', 'case de produto', 'Supabase', 'React', 'MCP', 'analytics', 'Nei Girão']}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Lab', url: '/#lab' },
        { name: 'Lendas do Flu' },
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
            <span>Lendas do Flu</span>
          </nav>

          <header className="c-hero">
            <div className="c-kicker c-mono">Lab · Projeto pessoal · Vibe code</div>
            <h1 className="c-disp">
              Construí um jogo para torcedores do Flu. <em>O que mais chamou atenção foram os dados.</em>
            </h1>
            <p className="c-dek">
              O Lendas do Flu é um quiz em que o torcedor tenta acertar o nome do jogador e o ano da camisa. Fiz em poucas horas com vibe code. Por trás, ele virou um laboratório de comportamento.
            </p>
            <div className="c-facts">
              <div className="c-fact">
                <div className="k c-mono">Meu papel</div>
                <div className="v">Ideia, produto e construção</div>
              </div>
              <div className="c-fact">
                <div className="k c-mono">Como</div>
                <div className="v">Vibe code · Lovable</div>
              </div>
              <div className="c-fact">
                <div className="k c-mono">Jogadores</div>
                <div className="v">94 únicos</div>
              </div>
              <div className="c-fact">
                <div className="k c-mono">Partidas</div>
                <div className="v big">417</div>
              </div>
            </div>

            <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a className="c-btn pri" href="https://lendasdoflu.com/" target="_blank" rel="noopener noreferrer">
                Jogar o Lendas do Flu ↗
              </a>
              <a className="c-btn" href="https://lendasdoflu.com/estatisticas" target="_blank" rel="noopener noreferrer">
                Ver estatísticas ao vivo ↗
              </a>
              <a className="c-btn" href="https://github.com/neigirao/flulegendarium" target="_blank" rel="noopener noreferrer">
                Ver código no GitHub ↗
              </a>
            </div>

            <figure className="c-shot" style={{ marginTop: '36px' }}>
              <div className="c-frame">
                <div className="chrome"><i /><i /><i /></div>
                <img
                  src="/lab/lendas-do-flu/home.png"
                  alt="Home do Lendas do Flu: De Castilho a Cano, você sabe? Três modos de quiz: adivinhe o jogador, por década e quiz das camisas"
                  width={967}
                  height={798}
                  fetchPriority="high"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <figcaption>
                A home: 243 ídolos, 189 camisas, 6 décadas e 3 modos de quiz.{' '}
                <a href="https://lendasdoflu.com/" target="_blank" rel="noopener noreferrer">lendasdoflu.com ↗</a>
              </figcaption>
            </figure>
          </header>
        </div>

        <div className="c-wrap c-body">
          <aside className="c-toc" aria-label="Neste projeto">
            <span className="c-mono">Neste projeto</span>
            <ol>
              <li><a href="#jogo">O jogo</a></li>
              <li><a href="#especiais">Os especiais</a></li>
              <li><a href="#numeros">Os números</a></li>
              <li><a href="#leitura">Lendo como produto</a></li>
              <li><a href="#metodo">O método</a></li>
              <li><a href="#tecnologia">A tecnologia</a></li>
              <li><a href="#bastidores">Os bastidores</a></li>
              <li><a href="#aprendizados">O que eu aprendi</a></li>
              <li><a href="#faq">Perguntas frequentes</a></li>
            </ol>
            <div className="share">
              <a
                className="c-btn sm"
                href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fneigirao.lovable.app%2Flab%2Flendas-do-flu"
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
                <li><strong>O que é:</strong> um quiz sobre ídolos do Fluminense, com modos adaptativo, por década e de camisas, ranking e desafios diários.</li>
                <li><strong>Como fiz:</strong> sozinho, com vibe code, sem time e sem backlog.</li>
                <li><strong>O que mudou:</strong> o produto já nasceu medindo. Cada partida gera dado sobre como o torcedor lembra.</li>
                <li><strong>A ideia central:</strong> dados não são um output. Dados são uma feature do produto.</li>
              </ul>
            </div>

            {/* O que este projeto mostra */}
            <aside className="c-hire" aria-label="O que este projeto mostra">
              <div className="hd"><span className="c-mono">O que este projeto mostra</span></div>
              <ul>
                <li>
                  <b>Dono do produto, de ponta a ponta</b>
                  <span>Da ideia ao jogo no ar, na web e no iPhone, com 94 jogadores reais. <a href="#jogo">Ver o jogo</a></span>
                </li>
                <li>
                  <b>Produto orientado a dados</b>
                  <span>Instrumentação desde o início e leitura de comportamento, não só de métricas. <a href="#leitura">Ver a leitura</a></span>
                </li>
                <li>
                  <b>Fluência técnica</b>
                  <span>Arquitetura em camadas, testes, ADRs e decisões de trade-off documentadas. <a href="#tecnologia">Ver a tecnologia</a></span>
                </li>
                <li>
                  <b>Construção com IA</b>
                  <span>Vibe code com regras: hipótese, risco e plano para desfazer. E um servidor MCP no ar. <a href="#tecnologia">Ver o MCP</a></span>
                </li>
                <li>
                  <b>Operação e qualidade</b>
                  <span>Admin com BI, suporte e monitoramento. <a href="#bastidores">Ver os bastidores</a></span>
                </li>
              </ul>
            </aside>

            {/* S01 — O jogo */}
            <section id="jogo" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">01 — O jogo</span>
                Acertar o jogador e o ano da camisa
              </h2>
              <p>
                A mecânica é simples: aparece a foto de um ídolo tricolor e o torcedor digita o nome. No quiz de camisas, precisa acertar o ano. Há ranking, perfil, conquistas e um desafio novo por dia.
              </p>
              <figure className="c-wide">
                <div className="c-frame">
                  <div className="chrome"><i /><i /><i /></div>
                  <img
                    src="/lab/lendas-do-flu/jogo.png"
                    alt="Tela de jogo: foto de um ídolo do Fluminense, campo para digitar o nome, cronômetro, score, sequência e níveis de dificuldade"
                    width={1455}
                    height={639}
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <figcaption>Adivinhe o jogador: foto, cronômetro e dificuldade que sobe conforme você acerta.</figcaption>
              </figure>
              <p>
                Foi construído com React, Supabase e Lovable. Mesmo sendo um projeto pessoal, tomei decisões de produto como faria no trabalho, e registrei cada uma na documentação do repositório:
              </p>
              <div className="c-reads">
                <div className="c-read">
                  <div className="a">Dificuldade</div>
                  <div className="ar">→</div>
                  <div className="b">5 níveis com curadoria, de iniciante a expert. O jogo nunca troca de nível escondido para não frustrar o torcedor.</div>
                </div>
                <div className="c-read">
                  <div className="a">Camisas no celular</div>
                  <div className="ar">→</div>
                  <div className="b">No celular, um toque sem querer numa opção de ano já contava como resposta. Agora o torcedor escolhe e depois confirma: um passo a mais, menos erro involuntário.</div>
                </div>
                <div className="c-read">
                  <div className="a">Medição desde o início</div>
                  <div className="ar">→</div>
                  <div className="b">Funil de eventos, GA4 e Core Web Vitals instrumentados antes de qualquer dashboard.</div>
                </div>
              </div>
              <figure className="c-wide">
                <div className="c-frame">
                  <div className="chrome"><i /><i /><i /></div>
                  <img
                    src="/lab/lendas-do-flu/camisas.png"
                    alt="Quiz das camisas: foto de uma camisa histórica do Fluminense e três opções de ano com a década correspondente"
                    width={1642}
                    height={859}
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <figcaption>Quiz das camisas: três opções de ano, com a década como contexto.</figcaption>
              </figure>
            </section>

            {/* S02 — Os especiais */}
            <section id="especiais" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">02 — Os especiais</span>
                Maior atacante e maior treinador da história do Fluminense
              </h2>
              <p>
                Além do quiz, o jogo tem páginas especiais que transformam uma discussão de arquibancada em análise. A primeira, <strong>Maior Atacante</strong>, compara 15 lendas tricolores, de Welfare a Cano, com uma metodologia aberta: 6 critérios, cada conquista com seu valor, sem normalização.
              </p>
              <div className="c-crit" role="list">
                <div role="listitem"><span className="c-mono">01</span><b>Gols</b><span className="v">1 ponto por gol</span></div>
                <div role="listitem"><span className="c-mono">02</span><b>Clássicos</b><span className="v">+1 por gol em Fla-Flu, Flu-Vasco e Flu-Botafogo</span></div>
                <div role="listitem"><span className="c-mono">03</span><b>Decisivos</b><span className="v">+1 a +20 por gol em mata-mata e finais</span></div>
                <div role="listitem"><span className="c-mono">04</span><b>Títulos</b><span className="v">De 5 a 200 pontos por conquista</span></div>
                <div role="listitem"><span className="c-mono">05</span><b>Campanhas</b><span className="v">De 1 a 60 pontos pela fase alcançada</span></div>
                <div role="listitem"><span className="c-mono">06</span><b>Longevidade</b><span className="v">0,25 ponto por jogo</span></div>
              </div>
              <div className="c-formula">
                Melhor atacante do Flu = <em>gols</em> + <em>clássicos</em> + <em>decisivos</em> + <em>títulos</em> + <em>campanhas</em> + <em>longevidade</em>
              </div>
              <p>
                Mas a página não termina no veredito. A torcida vota em quem acha que é o maior e compartilha a escolha. E um comparador coloca dois ídolos frente a frente, critério por critério. Waldo tem mais gols que Fred; Fred tem mais pontos em títulos e gols decisivos.
              </p>
              <div className="c-esp-shots">
                <figure>
                  <div className="c-frame">
                    <div className="chrome"><i /><i /><i /></div>
                    <img
                      src="/lab/lendas-do-flu/especial-regua.png"
                      alt="Especial Maior Atacante: 15 candidatos, 6 critérios, a régua de pontuação e a fórmula"
                      width={696}
                      height={873}
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                  <figcaption>A régua: 15 candidatos, 6 critérios e a fórmula aberta.</figcaption>
                </figure>
                <figure>
                  <div className="c-frame">
                    <div className="chrome"><i /><i /><i /></div>
                    <img
                      src="/lab/lendas-do-flu/especial-voto.png"
                      alt="Votação da torcida com os 15 atacantes e o comparador cara a cara entre Waldo e Fred"
                      width={718}
                      height={898}
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                  <figcaption>A voz da torcida e o comparador cara a cara.</figcaption>
                </figure>
              </div>
              <p>
                Depois veio o segundo especial, <strong>Maior Treinador</strong>: 11 técnicos, de Zezé Moreira a Fernando Diniz, passando por Abel Braga e Renato Gaúcho, avaliados por aproveitamento, títulos, campanhas e longevidade. Também com ranking oficial, comparador e votação da torcida.
              </p>
              <p style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <a href="https://lendasdoflu.com/especiais/maior-atacante" target="_blank" rel="noopener noreferrer">Ver o especial Maior Atacante ↗</a>
                <a href="https://lendasdoflu.com/especiais/maior-treinador" target="_blank" rel="noopener noreferrer">Ver o especial Maior Treinador ↗</a>
              </p>
              <p>
                Para produto, é o mesmo princípio do jogo: tornar a regra visível gera debate, e debate gera dado. Cada voto e cada comparação diz o que a torcida valoriza: gol, título ou momento decisivo.
              </p>
            </section>

            {/* S03 — Os números */}
            <section id="numeros" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">03 — Os números</span>
                Uma página de estatísticas aberta ao público
              </h2>
              <p>Coloquei as estatísticas do jogo numa página pública. Alguns padrões apareceram logo:</p>
              <div className="c-statsplit">
                <div>
                  <div className="c-nums">
                    <div><b>417</b><span>partidas jogadas</span></div>
                    <div><b>94</b><span>jogadores únicos</span></div>
                    <div><b>86,9%</b><span>de acerto global</span></div>
                    <div><b>51</b><span>acertos seguidos, o recorde</span></div>
                    <div><b>23h</b><span>horário de pico</span></div>
                    <div><b>59,6%</b><span>de acerto no quiz de camisas</span></div>
                  </div>
                  <p style={{ marginTop: '20px' }}>
                    Até aqui, parece um dashboard padrão. Mas, olhando como produto, os números viram comportamento.
                  </p>
                </div>
                <figure className="tall">
                  <img
                    src="/lab/lendas-do-flu/estatisticas.png"
                    alt="Página de estatísticas do Lendas do Flu: partidas jogadas, jogadores únicos, curiosidades, quiz das camisas, camisas por década e horário nobre"
                    width={480}
                    height={862}
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <figcaption>A página "O Flu em números", aberta a qualquer torcedor.</figcaption>
                </figure>
              </div>
            </section>

            {/* S04 — Lendo como produto */}
            <section id="leitura" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">04 — Lendo como produto</span>
                Isso não são números. É comportamento.
              </h2>
              <div className="c-reads">
                <div className="c-read">
                  <div className="a">Taxa de acerto alta</div>
                  <div className="ar">→</div>
                  <div className="b">O torcedor acerta mais pelo contexto emocional do que pela memória exata.</div>
                </div>
                <div className="c-read">
                  <div className="a">Fases vencedoras</div>
                  <div className="ar">→</div>
                  <div className="b">Jogadores de times campeões têm taxa de acerto muito maior. Memória afetiva pesa mais que conhecimento.</div>
                </div>
                <div className="c-read">
                  <div className="a">Ano da camisa</div>
                  <div className="ar">→</div>
                  <div className="b">Pequenas variações no ano confundem mais do que o nome do jogador.</div>
                </div>
                <div className="c-read">
                  <div className="a">Quase acerto</div>
                  <div className="ar">→</div>
                  <div className="b">Há um padrão claro de respostas quase certas. Para produto, isso é ouro: mostra onde ajustar a dificuldade.</div>
                </div>
                <div className="c-read">
                  <div className="a">Pontuação</div>
                  <div className="ar">→</div>
                  <div className="b">Concentração extrema: quase todo mundo fica abaixo de 500 pontos no quiz de camisas.</div>
                </div>
                <div className="c-read">
                  <div className="a">Pico às 23h</div>
                  <div className="ar">→</div>
                  <div className="b">O uso é noturno. Diz quando lançar desafios e mandar lembretes.</div>
                </div>
              </div>
            </section>

            <blockquote>
              <p>Dados não começam no dashboard. Começam na pergunta que você decide permitir no seu produto.</p>
              <cite className="c-mono">— Nei Girão</cite>
            </blockquote>

            {/* S05 — O método */}
            <section id="metodo" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">05 — O método</span>
                A mesma lógica que uso em qualquer produto
              </h2>
              <p>
                Não construí só um jogo. Construí uma estrutura de coleta de dados, um modelo simples de métricas e um ciclo de feedback contínuo.
              </p>
              <div className="c-loop" role="list" aria-label="Ciclo de dados no produto">
                <div className="st" role="listitem">
                  <span className="c-mono">01</span>
                  <div className="t">Comece pela pergunta</div>
                  <div className="d">O que eu quero aprender?</div>
                </div>
                <div className="st" role="listitem">
                  <span className="c-mono">02</span>
                  <div className="t">Capture o dado</div>
                  <div className="d">Garanta que o produto registre isso.</div>
                </div>
                <div className="st" role="listitem">
                  <span className="c-mono">03</span>
                  <div className="t">Leia para gerar insight</div>
                  <div className="d">Não só visualização.</div>
                </div>
                <div className="st hl" role="listitem">
                  <span className="c-mono">04</span>
                  <div className="t">Evolua o produto</div>
                  <div className="d">Use o comportamento real.</div>
                </div>
              </div>
            </section>

            {/* S06 — A tecnologia */}
            <section id="tecnologia" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">06 — A tecnologia</span>
                Feito com vibe code, tratado como produto de verdade
              </h2>
              <p>
                Vibe code acelerou a construção, mas não substituiu engenharia. O repositório tem arquitetura documentada, decisões registradas em ADRs e uma esteira de qualidade, como eu exigiria de qualquer time.
              </p>
              <div className="c-stack" role="list" aria-label="Camadas da aplicação">
                <div className="ly" role="listitem">
                  <span className="c-mono">Interface</span>
                  <div className="t">React 18 + TypeScript</div>
                  <div className="d">Vite, Tailwind e componentes Radix. Gráficos com Recharts.</div>
                </div>
                <div className="ly" role="listitem">
                  <span className="c-mono">Estado e dados</span>
                  <div className="t">Zustand + TanStack Query</div>
                  <div className="d">Estado de jogo simples e cache de dados remotos.</div>
                </div>
                <div className="ly" role="listitem">
                  <span className="c-mono">Backend</span>
                  <div className="t">Supabase</div>
                  <div className="d">Postgres, autenticação, storage e edge functions.</div>
                </div>
                <div className="ly" role="listitem">
                  <span className="c-mono">Mobile</span>
                  <div className="t">PWA + iOS</div>
                  <div className="d">Funciona como app no navegador e no iPhone, via Capacitor. Login com Google e Apple.</div>
                </div>
              </div>
              <div className="c-eng">
                <div className="c">
                  <span className="c-mono">Arquitetura</span>
                  <h3>Camadas com limites claros</h3>
                  <p>Interface só mostra e coleta interação; hooks coordenam o jogo; serviços guardam as regras. Assim, um erro aponta direto para a camada certa.</p>
                </div>
                <div className="c">
                  <span className="c-mono">Performance</span>
                  <h3>Cache pensado por tipo de conteúdo</h3>
                  <p>Arquivos do app ficam guardados, dados de ranking sempre buscam a versão nova, e as fotos dos jogadores aparecem na hora enquanto se atualizam ao fundo.</p>
                </div>
                <div className="c">
                  <span className="c-mono">Observabilidade</span>
                  <h3>Falhar de forma observável</h3>
                  <p>Logs centralizados com contexto, erros enviados ao Sentry e Core Web Vitals medidos no navegador de cada jogador.</p>
                </div>
                <div className="c">
                  <span className="c-mono">Qualidade</span>
                  <h3>Nada entra sem passar na esteira</h3>
                  <p>Lint, checagem de tipos, testes com Vitest e Playwright, e Lighthouse. Mudanças só entram com a integração contínua verde.</p>
                </div>
                <div className="c dark">
                  <span className="c-mono">IA com controle</span>
                  <h3>Evoluir com IA sem perder o rumo</h3>
                  <p>Toda mudança sugerida por IA declara hipótese, risco e plano para desfazer. Decisões importantes viram ADR, e a documentação é parte do código.</p>
                </div>
              </div>

              <h3 className="c-h3">Arquitetura e infraestrutura</h3>
              <p>Do celular do torcedor ao banco, passando pela esteira que publica cada versão.</p>
              <div className="c-arch" role="list" aria-label="Arquitetura do Lendas do Flu">
                <div className="col" role="listitem">
                  <span className="c-mono">Cliente</span>
                  <div className="t">Web e iPhone</div>
                  <ul>
                    <li>React 18, TypeScript e Vite</li>
                    <li>PWA com service worker e cache por tipo de conteúdo</li>
                    <li>App iOS com Capacitor</li>
                    <li>Login Google e Apple</li>
                  </ul>
                </div>
                <div className="col hl" role="listitem">
                  <span className="c-mono">Backend</span>
                  <div className="t">Supabase</div>
                  <ul>
                    <li>Postgres com regras de acesso e funções (RPC)</li>
                    <li>Storage para fotos de jogadores e camisas</li>
                    <li>Edge functions, como a rotação de desafios diários</li>
                  </ul>
                </div>
                <div className="col" role="listitem">
                  <span className="c-mono">Serviços externos</span>
                  <div className="t">Integrações</div>
                  <ul>
                    <li>Sentry para erros</li>
                    <li>GA4 para comportamento</li>
                    <li>Servidor MCP para assistentes de IA</li>
                  </ul>
                </div>
                <div className="col" role="listitem">
                  <span className="c-mono">Entrega</span>
                  <div className="t">CI e publicação</div>
                  <ul>
                    <li>GitHub CI: lint, build, testes e cobertura</li>
                    <li>Workflows de E2E e Lighthouse</li>
                    <li>Codemagic para web e iOS</li>
                    <li>Publicação pelo Lovable</li>
                  </ul>
                </div>
              </div>

              <h3 className="c-h3">SEO e descoberta</h3>
              <p>Jogo bom que ninguém encontra não tem dado para gerar. Por isso, ser achado no Google e por assistentes de IA também foi parte do produto.</p>
              <div className="c-mon" role="list">
                <div className="m" role="listitem">
                  <span className="c-mono">Por página</span>
                  <div className="t">Título, descrição e schema</div>
                  <div className="d">Um gerenciador de SEO define título, descrição e dados estruturados em cada página, como os especiais.</div>
                </div>
                <div className="m" role="listitem">
                  <span className="c-mono">Rastreamento</span>
                  <div className="t">Sitemaps e robots.txt</div>
                  <div className="d">Três sitemaps separam páginas fixas, conteúdo do jogo e o índice geral.</div>
                </div>
                <div className="m" role="listitem">
                  <span className="c-mono">IA</span>
                  <div className="t">llms.txt</div>
                  <div className="d">Um resumo do site feito para assistentes de IA entenderem o jogo.</div>
                </div>
                <div className="m" role="listitem">
                  <span className="c-mono">Velocidade</span>
                  <div className="t">CSS crítico e carga sob demanda</div>
                  <div className="d">Imagens otimizadas e trechos longos dos especiais carregando só quando o torcedor chega neles.</div>
                </div>
              </div>

              <h3 className="c-h3">Telemetria: o que é medido e onde</h3>
              <p>Cada tipo de sinal tem um destino próprio. E há uma regra clara: nada de dado pessoal nos eventos.</p>
              <div className="c-tele-wrap">
                <table className="c-tele">
                  <thead>
                    <tr>
                      <th>Sinal</th>
                      <th>Para onde vai</th>
                      <th>Para quê</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Funil do jogo</td>
                      <td>Tabela própria de eventos no Supabase + GA4, enviados em lote</td>
                      <td>Ver onde o torcedor entra, joga e desiste</td>
                    </tr>
                    <tr>
                      <td>Funil de login</td>
                      <td>GA4: início, sucesso, erro e abandono</td>
                      <td>Medir atrito no cadastro, só com códigos de provedor e motivo, sem e-mail ou ID</td>
                    </tr>
                    <tr>
                      <td>Erros</td>
                      <td>Logger central + Sentry</td>
                      <td>Cada falha com rota, modo de jogo e contexto</td>
                    </tr>
                    <tr>
                      <td>Performance</td>
                      <td>Web Vitals + Vercel Speed Insights</td>
                      <td>LCP e CLS no navegador real de cada jogador</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="c-h3">As IAs que construíram comigo</h3>
              <p>Nenhuma ferramenta fez tudo sozinha. Cada uma entrou numa etapa, e as regras do repositório valem para todas.</p>
              <div className="c-ais" role="list">
                <div className="ai" role="listitem">
                  <div className="t">Lovable</div>
                  <div className="d">Construção da primeira versão e publicação do site.</div>
                </div>
                <div className="ai" role="listitem">
                  <div className="t">Claude Code</div>
                  <div className="d">Agente de código no repositório.</div>
                </div>
                <div className="ai" role="listitem">
                  <div className="t">Codex</div>
                  <div className="d">Agente de código no repositório.</div>
                </div>
                <div className="ai" role="listitem">
                  <div className="t">Instinct</div>
                  <div className="d">Agente de código no repositório.</div>
                </div>
              </div>

              <div className="c-mcp">
                <div className="top">
                  <span className="c-mono">Servidor MCP · Funcionando</span>
                  <h3>Uma IA que conversa com os dados do jogo</h3>
                  <p>Criei um servidor MCP (Model Context Protocol) que deixa assistentes de IA, como o Claude, consultarem o Lendas do Flu. Em vez de abrir um dashboard, o torcedor pergunta, e a resposta já vem com números e uma leitura pronta.</p>
                </div>
                <div className="tools">
                  <div className="tool">
                    <code>get_user_game_stats</code>
                    <div className="q">"Qual é o meu nível de torcedor?"</div>
                    <div className="d">Partidas, acertos, precisão, melhor pontuação, maior sequência, tempo médio e modos jogados. E classifica o torcedor num nível.</div>
                  </div>
                  <div className="tool">
                    <code>get_user_ranking_position</code>
                    <div className="q">"Em que posição eu estou no ranking?"</div>
                    <div className="d">Posição, percentil entre os jogadores e o top 5, com uma frase de incentivo para subir.</div>
                  </div>
                </div>
                <div className="ladder">
                  <span className="lbl">Níveis de torcedor</span>
                  <span className="s">Base Tricolor</span><i>→</i>
                  <span className="s">Reserva Promissor</span><i>→</i>
                  <span className="s">Titular Absoluto</span><i>→</i>
                  <span className="s">Craque da Memória</span><i>→</i>
                  <span className="s top">Lenda Tricolor</span>
                </div>
              </div>
              <p>É a mesma ideia do jogo levada um passo adiante: o produto não só gera dados, ele já entrega a interpretação.</p>

              <section id="codigo" style={{ marginTop: '40px' }}>
                <h3 className="c-h3" style={{ margin: 0 }}>Para quem quer ver o código</h3>
                <p>O repositório é público. Estes são os melhores pontos de partida:</p>
                <div className="c-devs">
                  <a href="https://github.com/neigirao/flulegendarium/blob/main/docs/ARCHITECTURE.md" target="_blank" rel="noopener noreferrer">
                    <span className="c-mono">Arquitetura</span>
                    <div className="t">Camadas e fluxo do jogo</div>
                    <div className="d">Como interface, hooks e serviços se dividem.</div>
                  </a>
                  <a href="https://github.com/neigirao/flulegendarium/blob/main/docs/adr/003-adaptive-difficulty-system.md" target="_blank" rel="noopener noreferrer">
                    <span className="c-mono">ADR 003</span>
                    <div className="t">Dificuldade adaptativa</div>
                    <div className="d">5 níveis com curadoria e sem fallback escondido.</div>
                  </a>
                  <a href="https://github.com/neigirao/flulegendarium/blob/main/docs/adr/005-service-worker-caching.md" target="_blank" rel="noopener noreferrer">
                    <span className="c-mono">ADR 005</span>
                    <div className="t">Cache do service worker</div>
                    <div className="d">Cache-first, network-first e stale-while-revalidate.</div>
                  </a>
                  <a href="https://github.com/neigirao/flulegendarium/blob/main/docs/adr/012-jersey-two-step-confirm.md" target="_blank" rel="noopener noreferrer">
                    <span className="c-mono">ADR 012</span>
                    <div className="t">Confirmação em dois passos</div>
                    <div className="d">Menos toques acidentais no quiz de camisas.</div>
                  </a>
                  <a href="https://github.com/neigirao/flulegendarium/blob/main/docs/AI_GUIDE.md" target="_blank" rel="noopener noreferrer">
                    <span className="c-mono">IA</span>
                    <div className="t">Guia para evoluir com IA</div>
                    <div className="d">Regras para mudanças assistidas por IA.</div>
                  </a>
                </div>
              </section>
            </section>

            {/* S07 — Os bastidores */}
            <section id="bastidores" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">07 — Os bastidores</span>
                Admin, CMS e monitoramento: o produto que ninguém vê
              </h2>
              <p>
                Por trás do jogo há uma área administrativa completa. É nela que o conteúdo é cuidado, os dados viram decisão e os problemas aparecem antes de o torcedor reclamar.
              </p>
              <div className="c-adm">
                <div className="col">
                  <div className="h">
                    <span className="t">CMS de conteúdo</span>
                    <span className="c-mono">Gestão</span>
                  </div>
                  <ul>
                    <li>Jogadores<small>Cadastro, foto, dados históricos e nível de dificuldade.</small></li>
                    <li>Camisas<small>Formulário, envio e recorte de imagem.</small></li>
                    <li>Notícias<small>Artigos e categorias do portal.</small></li>
                    <li>Usuários<small>Lista, números de uso e quem está logado.</small></li>
                  </ul>
                </div>
                <div className="col">
                  <div className="h">
                    <span className="t">Análise e BI</span>
                    <span className="c-mono">Decisão</span>
                  </div>
                  <ul>
                    <li>Painel executivo<small>Visão geral para decidir rápido.</small></li>
                    <li>Funil e tendência<small>Onde o torcedor entra e onde desiste.</small></li>
                    <li>Retenção, coortes e segmentos<small>Quem volta, quando e com que perfil.</small></li>
                    <li>Mapa de calor e pontuação<small>Horários de uso e distribuição de pontos.</small></li>
                    <li>Dificuldade por jogador<small>Quais ídolos o torcedor mais erra.</small></li>
                  </ul>
                </div>
                <div className="col">
                  <div className="h">
                    <span className="t">Qualidade e suporte</span>
                    <span className="c-mono">Cuidado</span>
                  </div>
                  <ul>
                    <li>NPS e feedback<small>O que o torcedor acha, em números e em texto.</small></li>
                    <li>Tickets de suporte<small>O botão "Tive um problema" vira fila.</small></li>
                    <li>Relatório de erros<small>Falhas agrupadas por tipo.</small></li>
                    <li>Feedback de imagem<small>Fotos que o torcedor marcou como erradas.</small></li>
                  </ul>
                </div>
              </div>

              <h3 className="c-h3">As ferramentas de monitoramento</h3>
              <div className="c-mon" role="list">
                <div className="m" role="listitem">
                  <span className="c-mono">Erros</span>
                  <div className="t">Sentry + logger central</div>
                  <div className="d">Cada falha chega com rota, modo de jogo e contexto.</div>
                </div>
                <div className="m" role="listitem">
                  <span className="c-mono">Comportamento</span>
                  <div className="t">GA4 + funil próprio</div>
                  <div className="d">Eventos de jogo e login, sem guardar dados pessoais.</div>
                </div>
                <div className="m" role="listitem">
                  <span className="c-mono">Performance</span>
                  <div className="t">Web Vitals, Speed Insights e Lighthouse</div>
                  <div className="d">LCP, CLS e afins medidos no navegador real de cada torcedor.</div>
                </div>
                <div className="m" role="listitem">
                  <span className="c-mono">Conteúdo</span>
                  <div className="t">Painéis de imagens</div>
                  <div className="d">Fotos de jogadores e camisas com problema aparecem num painel no admin.</div>
                </div>
              </div>

              <div className="c-honest">
                <div className="tags" aria-hidden="true">
                  <span className="r">Real</span>
                  <span className="e">Estimado</span>
                  <span className="i">Indisponível</span>
                </div>
                <div>
                  <h3>Honestidade com o próprio dado</h3>
                  <p>Uma reavaliação do admin mostrou que alguns números ainda eram estimados, como a classificação de erros por palavra-chave. Em vez de esconder isso, o próximo passo é marcar cada métrica como real, estimada ou indisponível. Dashboard bom é o que diz o quanto dá para confiar nele.</p>
                </div>
              </div>
            </section>

            {/* S08 — Aprendizados */}
            <section id="aprendizados" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">08 — Aprendizados</span>
                O que eu levo para o trabalho
              </h2>
              <ol className="c-lessons">
                <li>
                  <strong>Dados são uma feature do produto.</strong>
                  Um produto que já nasce instrumentado responde perguntas que um dashboard montado depois não consegue.
                </li>
                <li>
                  <strong>Qualquer PM pode criar o próprio dado.</strong>
                  Não é preciso esperar um time de dados para testar hipóteses e aprender com comportamento real.
                </li>
                <li>
                  <strong>Vibe code não dispensa engenharia.</strong>
                  A velocidade vem da IA; a confiabilidade vem de arquitetura, testes e decisões documentadas.
                </li>
                <li>
                  <strong>Maturidade analítica se constrói iterando.</strong>
                  Ela não nasce perfeita. Cresce errando rápido.
                </li>
              </ol>
            </section>

            {/* S09 — FAQ */}
            <section id="faq" style={{ scrollMarginTop: '90px', marginBottom: '72px' }}>
              <h2>
                <span className="n">09 — Perguntas frequentes</span>
                Sobre o Lendas do Flu
              </h2>
              <div className="c-faq">
                <details>
                  <summary>O que é o Lendas do Flu?</summary>
                  <p>Um quiz sobre ídolos e camisas históricas do Fluminense, com três modos de jogo, ranking, desafios diários e páginas especiais como o Maior Atacante e o Maior Treinador.</p>
                </details>
                <details>
                  <summary>Como o Lendas do Flu foi construído?</summary>
                  <p>Com vibe code, usando Lovable, Claude Code, Codex e Instinct, sobre React, TypeScript e Supabase, com testes, ADRs e monitoramento com Sentry, GA4 e Web Vitals.</p>
                </details>
                <details>
                  <summary>Quem criou o Lendas do Flu?</summary>
                  <p>Nei Girão, Product Manager, como projeto pessoal para estudar produto, dados e desenvolvimento com IA.</p>
                </details>
                <details>
                  <summary>O código do Lendas do Flu é aberto?</summary>
                  <p>Sim. O repositório está no GitHub, em <a href="https://github.com/neigirao/flulegendarium" target="_blank" rel="noopener noreferrer">github.com/neigirao/flulegendarium</a>, com arquitetura e decisões documentadas.</p>
                </details>
              </div>
            </section>

            {/* Ferramentas */}
            <section style={{ marginBottom: 0 }}>
              <span className="c-mono" style={{ color: 'var(--case-muted)', display: 'block', marginBottom: '14px' }}>Ferramentas</span>
              <div className="c-chips">
                {[
                  'Lovable · vibe code', 'Claude Code', 'Codex', 'Instinct',
                  'React + TypeScript', 'Vite', 'Zustand', 'TanStack Query',
                  'Supabase', 'Capacitor · iOS', 'GA4', 'Sentry', 'Vitest',
                  'Playwright', 'Lighthouse', 'Vercel Speed Insights',
                  'MCP · Model Context Protocol'
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
            <h2>Você está analisando dados ou <em>criando sistemas que produzem inteligência</em>?</h2>
            <div className="acts">
              <a className="c-btn pri" href="https://lendasdoflu.com/" target="_blank" rel="noopener noreferrer">Jogar ↗</a>
              <a className="c-btn" href="mailto:neigirao@gmail.com?subject=Sobre%20o%20Lendas%20do%20Flu">Falar comigo</a>
              <a className="c-btn" href="https://github.com/neigirao/flulegendarium" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a className="c-btn" href="https://www.linkedin.com/in/neigirao/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </section>

        {/* Next */}
        <nav className="c-wrap c-next" aria-label="Outro projeto">
          <Link to="/projeto/nei-girao-observabilidade-icatu">
            <div>
              <span className="c-mono">Ver um case profissional</span>
              <div className="t">Observabilidade na Icatu</div>
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

export default LendasDoFlu;
