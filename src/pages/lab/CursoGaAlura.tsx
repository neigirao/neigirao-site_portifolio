import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema';
import { BASE_URL } from '@/config/constants';
import '@/styles/cases.css';

export function CursoGaAlura() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const links = [...document.querySelectorAll<HTMLAnchorElement>('.case-ga-alura .c-toc ol a')];
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
        "headline": "Ensinei Google Analytics na Alura: o básico, sempre com algo a mais",
        "inLanguage": "pt-BR",
        "datePublished": "2026-10-06",
        "author": { "@id": `${BASE_URL}/#person` },
        "about": { "@id": `${BASE_URL}/lab/curso-google-analytics-alura#course` },
        "mainEntityOfPage": `${BASE_URL}/lab/curso-google-analytics-alura`
      },
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        "name": "Nei Girão",
        "url": `${BASE_URL}/`,
        "sameAs": [
          "https://www.linkedin.com/in/neigirao/",
          "https://cursos.alura.com.br/user/neigirao"
        ],
        "knowsAbout": ["Google Analytics", "Web Analytics", "Product Management", "Marketing Digital"]
      },
      {
        "@type": "Course",
        "@id": `${BASE_URL}/lab/curso-google-analytics-alura#course`,
        "name": "Google Analytics: Medindo o sucesso do seu site",
        "description": "Curso introdutório de Google Analytics na Alura, com um e-commerce real como exemplo do início ao fim.",
        "inLanguage": "pt-BR",
        "provider": { "@type": "Organization", "name": "Alura", "sameAs": "https://www.alura.com.br/" },
        "instructor": { "@id": `${BASE_URL}/#person` }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Início", "item": `${BASE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": "Lab", "item": `${BASE_URL}/#lab` },
          { "@type": "ListItem", "position": 3, "name": "Curso de Google Analytics na Alura" }
        ]
      }
    ]
  };

  return (
    <div className="case-page case-ga-alura">
      <SEOHead
        title="Curso de Google Analytics na Alura: como ensinei o básico com algo a mais | Nei Girão"
        description="Como criei e gravei o curso Google Analytics: Medindo o sucesso do seu site, na Alura, em 2017: roteiro, um e-commerce real como exemplo e aulas curtas com exercícios."
        canonicalUrl={`${BASE_URL}/lab/curso-google-analytics-alura`}
        ogType="article"
        keywords={['curso Google Analytics', 'Alura', 'Google Analytics para iniciantes', 'web analytics', 'instrutor Alura', 'Nei Girão']}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Lab', url: '/#lab' },
        { name: 'Curso de Google Analytics na Alura' },
      ]} />

      <div className="c-progress" ref={progressRef} />

      <header className="c-mast">
        <div className="c-wrap">
          <Link to="/" className="c-mast-brand">Nei Girão</Link>
          <nav className="c-mast-right c-mono">
            <Link to="/#projects" className="lnk">Projetos</Link>
            <Link to="/#lab" className="lnk">Lab</Link>
            <Link to="/#contact" className="lnk">Contato</Link>
            <a
              className="c-btn pri sm"
              href="https://cursos.alura.com.br/user/neigirao"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alura ↗
            </a>
          </nav>
        </div>
      </header>

      <main>
        <div className="c-wrap">
          <nav className="c-crumb c-mono" aria-label="Breadcrumb">
            <Link to="/">Início</Link><span>/</span>
            <Link to="/#lab">Lab</Link><span>/</span>
            <span>Curso na Alura</span>
          </nav>

          <header className="c-hero">
            <div className="c-kicker c-mono">Lab · Ensino · Alura · 2017</div>
            <h1 className="c-disp">
              Ensinei Google Analytics na Alura:{' '}
              <em>o básico, sempre com algo a mais</em>
            </h1>
            <p className="c-dek">
              Em 2017, criei e gravei como instrutor da Alura um curso de introdução ao Google Analytics.
              Para quem nunca tinha aberto a ferramenta e para quem só conhecia o gráfico de visitantes.
            </p>
            <div className="c-facts">
              <div className="c-fact"><div className="k c-mono">Meu papel</div><div className="v">Instrutor externo</div></div>
              <div className="c-fact"><div className="k c-mono">Onde</div><div className="v">Alura · estúdio do Rio</div></div>
              <div className="c-fact"><div className="k c-mono">Curso</div><div className="v">Google Analytics: Medindo o sucesso do seu site</div></div>
              <div className="c-fact"><div className="k c-mono">Ano</div><div className="v big">2017</div></div>
            </div>
          </header>
        </div>

        <div className="c-wrap c-body">
          <aside className="c-toc" aria-label="Nesta página">
            <span className="c-mono">Nesta página</span>
            <ol>
              <li><a href="#para-quem">Para quem é</a></li>
              <li><a href="#conteudo">O que o aluno aprende</a></li>
              <li><a href="#como">Como ensinei</a></li>
              <li><a href="#bastidores">Os bastidores</a></li>
              <li><a href="#aprendizados">O que eu aprendi</a></li>
            </ol>
            <div className="share">
              <a
                className="c-btn sm"
                href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fneigirao.lovable.app%2Flab%2Fcurso-google-analytics-alura"
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
                <li><strong>O curso:</strong> Google Analytics: Medindo o sucesso do seu site, na Alura.</li>
                <li><strong>Para quem:</strong> quem nunca usou a ferramenta e quem só tinha visto o gráfico básico de visitantes.</li>
                <li><strong>Como:</strong> aulas curtas em vídeo, exercícios e um único e-commerce real como exemplo do começo ao fim.</li>
                <li><strong>A regra:</strong> explicar o básico e sempre entregar algo a mais.</li>
                <li><strong>Hoje:</strong> o curso saiu do catálogo. Com a chegada do GA4, a Alura passou a oferecer versões novas.</li>
              </ul>
            </div>

            {/* 01 — Para quem é */}
            <section id="para-quem">
              <h2><span className="n">01 — Para quem é</span>Quem abre o Google Analytics e não sabe por onde começar</h2>
              <p>O curso foi pensado para dois públicos. Quem nunca usou o Google Analytics e precisa entender o que cada número significa. E quem já abriu a ferramenta, viu o gráfico de visitantes e parou ali.</p>
              <p>Para atender os dois ao mesmo tempo, cada aula explica o conceito básico e, logo em seguida, mostra um uso que vai além. Na aula de público, por exemplo, o aluno não só lê as métricas: já compara períodos e acompanha a evolução.</p>
            </section>

            {/* 02 — O que o aluno aprende */}
            <section id="conteudo">
              <h2><span className="n">02 — O que o aluno aprende</span>Dos primeiros passos à análise em tempo real</h2>
              <ol className="c-ga-chaps">
                <li><div><b>Passos iniciais com Google Analytics</b><span>Instalação, sessões e usuários.</span></div></li>
                <li><div><b>Relatórios de Público</b><span>Métricas básicas, comparação de datas, taxa de rejeição, dados demográficos, sistema e celular.</span></div></li>
                <li><div><b>Outros relatórios de Público</b><span>Relatórios personalizados, análise de coorte, valor da vida útil e usuários ativos.</span></div></li>
                <li><div><b>Comportamento e fontes de tráfego</b><span>De onde vem o visitante e o que ele faz no site.</span></div></li>
                <li><div><b>Cruzando dados em tempo real</b><span>Juntar relatórios para tirar conclusões.</span></div></li>
              </ol>
              <p className="c-ga-note">Capítulos conforme aparecem nas discussões do fórum do curso na Alura.</p>
            </section>

            {/* 03 — Como ensinei */}
            <section id="como">
              <h2><span className="n">03 — Como ensinei</span>Um e-commerce real do começo ao fim</h2>
              <p>
                Em vez de dados de exemplo, o curso inteiro usa o MusicDot, uma plataforma real de cursos
                online de música. O MusicDot foi cofundado por{' '}
                <a href="https://www.linkedin.com/in/sergiolopesjr/" target="_blank" rel="noopener noreferrer">Sérgio Lopes</a>,
                cofundador da Alura. Ou seja, o exemplo era um negócio de verdade, com dados de verdade e
                alguém do lado para responder por ele. Cada relatório é apresentado a partir de uma pergunta
                que esse negócio precisaria responder.
              </p>
              <div className="c-reads">
                <div className="c-read"><div className="a">Exemplo único</div><div className="ar">→</div><div className="b">Um só caso do início ao fim, para o aluno acompanhar a mesma loja crescer de aula em aula.</div></div>
                <div className="c-read"><div className="a">Aulas curtas</div><div className="ar">→</div><div className="b">Vídeos objetivos, gravados no estúdio da Alura no Rio.</div></div>
                <div className="c-read"><div className="a">Exercícios</div><div className="ar">→</div><div className="b">Atividades para consolidar cada capítulo antes de seguir.</div></div>
                <div className="c-read"><div className="a">Algo a mais</div><div className="ar">→</div><div className="b">Cada conceito básico vem com um uso mais avançado, para quem já conhecia a ferramenta.</div></div>
              </div>
              <figure className="c-ga-shot">
                <img
                  src="/lab/curso-google-analytics-alura/primeira-aula.png"
                  alt="Página do curso na Alura no celular, com a carreira Marketing Digital e o vídeo da primeira aula de Google Analytics com o instrutor Nei Girão"
                  width="534"
                  height="947"
                  loading="lazy"
                />
                <figcaption>A página do curso na Alura, com a primeira aula.</figcaption>
              </figure>
            </section>

            {/* 04 — Os bastidores */}
            <section id="bastidores">
              <h2><span className="n">04 — Os bastidores</span>Um curso se constrói como um produto</h2>
              <p>Antes de gravar, o curso passou por roteiro, revisão e testes, com a didática da Alura como referência.</p>
              <ol className="c-tl">
                <li>
                  <span className="when">Julho de 2017</span>
                  <div className="what">Me candidatei como instrutor, com foco em Google Analytics, e propus cinco cursos: da introdução ao avançado, KPIs, e-commerce e funis de conversão. Começamos pela introdução.</div>
                </li>
                <li>
                  <span className="when">Agosto de 2017</span>
                  <div className="what">
                    Escrevi o roteiro e o revisei em encontros presenciais com{' '}
                    <a href="https://www.linkedin.com/in/steppat/" target="_blank" rel="noopener noreferrer">Nico Steppat</a>,
                    coordenador didático da Alura no Rio, com feedback de{' '}
                    <a href="https://www.linkedin.com/in/sergiolopesjr/" target="_blank" rel="noopener noreferrer">Sérgio Lopes</a>,
                    cofundador da Alura. Foi aí que nasceu a regra do básico com algo a mais.
                  </div>
                </li>
                <li>
                  <span className="when">Agosto de 2017</span>
                  <div className="what">Decidimos usar um negócio real, o MusicDot, cofundado pelo Sérgio, como exemplo do curso inteiro. Os encontros passaram a ser duas vezes por semana até fechar o roteiro.</div>
                </li>
                <li>
                  <span className="when">Segundo semestre de 2017</span>
                  <div className="what">Gravação das aulas no estúdio da Alura, no Rio de Janeiro.</div>
                </li>
                <li>
                  <span className="when">Dezembro de 2017</span>
                  <div className="what">Com o curso no ar, passei a responder as dúvidas dos alunos no fórum.</div>
                </li>
                <li>
                  <span className="when">Depois do GA4</span>
                  <div className="what">O Google substituiu o Universal Analytics pelo GA4, e o curso deu lugar a versões novas no catálogo da Alura.</div>
                </li>
              </ol>
            </section>

            <blockquote>
              <p>Explicar o básico e sempre dar algo a mais. Foi a regra de cada aula.</p>
              <cite className="c-mono">— Nei Girão</cite>
            </blockquote>

            {/* 05 — Aprendizados */}
            <section id="aprendizados">
              <h2><span className="n">05 — Aprendizados</span>O que ensinar me ensinou sobre produto</h2>
              <ol className="c-lessons">
                <li><strong>Um curso é um produto.</strong> Tem público, roteiro como roadmap e revisões como ciclos de feedback.</li>
                <li><strong>Exemplo real ensina mais que exemplo perfeito.</strong> Acompanhar uma loja de verdade dá contexto a cada número.</li>
                <li><strong>Atender dois públicos exige camadas.</strong> O básico para quem começa e algo a mais para quem já sabe, na mesma aula.</li>
              </ol>
            </section>

            <section style={{ marginBottom: 0 }}>
              <span className="c-mono" style={{ color: 'var(--case-muted)', display: 'block', marginBottom: '14px' }}>Temas</span>
              <div className="c-chips">
                <span className="c-chip">Google Analytics</span>
                <span className="c-chip">Web analytics</span>
                <span className="c-chip">Métricas de público</span>
                <span className="c-chip">Taxa de rejeição</span>
                <span className="c-chip">Análise de coorte</span>
                <span className="c-chip">Didática</span>
              </div>
            </section>
          </article>
        </div>

        <section className="c-cta">
          <div className="c-wrap">
            <h2>Dados só servem quando <em>alguém entende o que eles dizem</em>.</h2>
            <div className="acts">
              <a className="c-btn pri" href="https://cursos.alura.com.br/user/neigirao" target="_blank" rel="noopener noreferrer">Perfil de instrutor na Alura ↗</a>
              <a className="c-btn" href="mailto:neigirao@gmail.com?subject=Sobre%20o%20curso%20de%20Google%20Analytics">Falar comigo</a>
              <a className="c-btn" href="https://www.linkedin.com/in/neigirao/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </section>

        <nav className="c-wrap c-next" aria-label="Outro projeto">
          <Link to="/lab/lendas-do-flu">
            <div>
              <span className="c-mono">Próximo no Lab</span>
              <div className="t">Lendas do Flu</div>
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

export default CursoGaAlura;
