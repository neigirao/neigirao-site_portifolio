import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema';
import { BASE_URL } from '@/config/constants';
import '@/styles/cases.css';

export default function CaseMeuTIM() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const links = [...document.querySelectorAll<HTMLAnchorElement>('.case-meu-tim .c-toc ol a')];
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

  return (
    <div className="case-page case-meu-tim">
      <SEOHead
        title="Case: Meu TIM — como levar a nota de um app de 1,5 para 4,5 estrelas | Nei Girão"
        description="Como liderei a Performance Digital do app Meu TIM: estabilidade antes de novas funções, releases com critério e as avaliações das lojas no backlog. Nota de 1,5 para 4,5."
        canonicalUrl={`${BASE_URL}/projeto/nei-girao-meu-tim-app-tim`}
        ogType="article"
        keywords={['Meu TIM', 'TIM Brasil', 'app', 'Product Owner', 'performance digital', 'Nei Girão']}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "headline": "Meu TIM: como levar a nota de um app de 1,5 para 4,5",
            "author": { "@type": "Person", "name": "Nei Girão", "url": BASE_URL },
            "about": { "@type": "Organization", "name": "TIM Brasil" },
            "inLanguage": "pt-BR",
            "mainEntityOfPage": `${BASE_URL}/projeto/nei-girao-meu-tim-app-tim`
          }
        ]
      }) }} />
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Projetos', url: '/#projects' },
        { name: 'Meu TIM APP' },
      ]} />

      <div className="c-progress" ref={progressRef} />

      <header className="c-mast">
        <div className="c-wrap">
          <Link to="/" className="c-mast-brand">Nei Girão</Link>
          <nav className="c-mast-right c-mono">
            <Link to="/#projects" className="lnk">Projetos</Link>
            <Link to="/#work" className="lnk">Experiência</Link>
            <Link to="/#contact" className="lnk">Contato</Link>
          </nav>
        </div>
      </header>

      <main>
        <div className="c-wrap">
          <nav className="c-crumb c-mono" aria-label="Breadcrumb">
            <Link to="/">Início</Link><span>/</span>
            <Link to="/#projects">Projetos</Link><span>/</span>
            <span>TIM</span>
          </nav>

          <header className="c-hero">
            <div className="c-kicker c-mono">Case · TIM Brasil · 2017 — 2019</div>
            <h1 className="c-disp">Meu TIM: de 1,5 para 4,5 estrelas <em>parando de quebrar</em> antes de crescer</h1>
            <p className="c-dek">O app de autoatendimento de uma das maiores operadoras do país tinha nota 1,5 nas lojas. Este é o caso de como a equipe de Performance Digital tratou estabilidade como a principal função do produto.</p>
            <div className="c-facts">
              <div className="c-fact"><div className="k c-mono">Meu papel</div><div className="v">Product Owner · Performance Digital</div></div>
              <div className="c-fact"><div className="k c-mono">Produtos</div><div className="v">App Meu TIM e site TIM</div></div>
              <div className="c-fact"><div className="k c-mono">Período</div><div className="v">2017 — 2019</div></div>
              <div className="c-fact"><div className="k c-mono">Resultado</div><div className="v big">1,5 → 4,5</div></div>
            </div>
            <div className="c-rating" role="img" aria-label="Nota do app Meu TIM nas lojas passou de 1,5 para 4,5 estrelas">
              <div className="side from">
                <span className="c-mono">Quando cheguei</span>
                <div className="rn">1,5</div>
                <div className="c-stars" aria-hidden="true">
                  <span>★<i style={{ width: '100%' }}>★</i></span>
                  <span>★<i style={{ width: '50%' }}>★</i></span>
                  <span>★<i style={{ width: '0%' }}>★</i></span>
                  <span>★<i style={{ width: '0%' }}>★</i></span>
                  <span>★<i style={{ width: '0%' }}>★</i></span>
                </div>
              </div>
              <div className="mid" aria-hidden="true">→</div>
              <div className="side to">
                <span className="c-mono">Quando saí</span>
                <div className="rn">4,5</div>
                <div className="c-stars" aria-hidden="true">
                  <span>★<i style={{ width: '100%' }}>★</i></span>
                  <span>★<i style={{ width: '100%' }}>★</i></span>
                  <span>★<i style={{ width: '100%' }}>★</i></span>
                  <span>★<i style={{ width: '100%' }}>★</i></span>
                  <span>★<i style={{ width: '50%' }}>★</i></span>
                </div>
              </div>
              <div className="note">Nota do app Meu TIM nas lojas de aplicativos. Hoje o app mantém 4,8 na App Store, com mais de 780 mil avaliações.</div>
            </div>
          </header>
        </div>

        <div className="c-wrap c-body">
          <aside className="c-toc" aria-label="Neste case">
            <span className="c-mono">Neste case</span>
            <ol>
              <li><a href="#problema">O problema</a></li>
              <li><a href="#papel">Meu papel</a></li>
              <li><a href="#decisoes">Decisões que fizeram diferença</a></li>
              <li><a href="#resultado">Resultado</a></li>
              <li><a href="#aprendizados">O que eu aprendi</a></li>
            </ol>
            <div className="share">
              <a className="c-btn sm" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fneigirao.lovable.app%2Fprojeto%2Fnei-girao-meu-tim-app-tim" target="_blank" rel="noopener noreferrer">Compartilhar no LinkedIn</a>
            </div>
          </aside>

          <article>
            <div className="c-tldr">
              <span className="c-mono">Resumo em 30 segundos</span>
              <ul>
                <li><strong>Desafio:</strong> o app Meu TIM tinha nota 1,5 nas lojas, com incidentes críticos frequentes no app e no site.</li>
                <li><strong>O que fiz:</strong> liderei a equipe de Performance Digital como Product Owner dos canais de autoatendimento.</li>
                <li><strong>Como:</strong> estabilidade antes de novas funções, releases com critério claro de qualidade e as avaliações das lojas dentro do backlog.</li>
                <li><strong>Resultado:</strong> a nota do app subiu de 1,5 para 4,5, com menos incidentes críticos e mais retenção de usuários.</li>
              </ul>
            </div>

            <section id="problema">
              <h2><span className="n">01 — O problema</span>Um app que o cliente não confiava em abrir</h2>
              <figure className="c-wide" style={{ marginTop: 0, marginBottom: 28 }}>
                <div className="c-promo">
                  <img src="/assets/case-tim/app-banner.png" alt="Telas do app Meu TIM: acesso automático pela rede TIM, consumo de internet e minutos e saldo de recarga" loading="lazy" />
                </div>
                <figcaption>Telas do Meu TIM: acesso automático pela rede, consumo e saldo de recarga.</figcaption>
              </figure>
              <p>O Meu TIM era o principal canal de autoatendimento da operadora: consultar consumo, ver a fatura, fazer recarga. Mas falhava com frequência, e cada falha virava uma avaliação de uma estrela e uma ligação para a central.</p>
              <p>Nota 1,5 numa loja de aplicativos não é só um problema de imagem. Ela afasta quem ainda não baixou o app e empurra para o atendimento humano quem poderia resolver sozinho.</p>
              <div className="c-reviews">
                <div className="c-rev bad">
                  <div className="top"><span className="c-mono">App Store · set/2017</span><span className="st">★☆☆☆☆</span></div>
                  <q>A cada atualização ao invés de melhorar piora.</q>
                  <div className="src">Avaliação de cliente, no início do trabalho.</div>
                </div>
                <div className="c-rev good">
                  <div className="top"><span className="c-mono">App Store · abr/2019</span><span className="st">★★★★★</span></div>
                  <q>Sem problemas na última versão.</q>
                  <div className="src">Avaliação de cliente, no fim do trabalho.</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--case-muted)', marginTop: 8 }}>
                Avaliações públicas do Meu TIM na <a href="https://apps.apple.com/br/app/meu-tim/id668591218" target="_blank" rel="noopener noreferrer">App Store</a>, citadas em trecho.
              </p>
            </section>

            <section id="papel">
              <h2><span className="n">02 — Meu papel</span>Product Owner da Performance Digital</h2>
              <p>Entre 2017 e 2019 fui Product Owner e especialista em Performance Digital da TIM, responsável pelos canais de autoatendimento: o app Meu TIM e o site TIM.</p>
              <p>Liderava a equipe que cuidava de estabilidade, tempo de resolução de incidentes e qualidade das entregas, trabalhando com Scrum e Kanban.</p>
              <div className="c-phones2">
                <figure>
                  <div className="c-pf"><img src="/assets/case-tim/app-black.png" alt="App Meu TIM Black com consumo de internet e minutos na primeira tela" loading="lazy" /></div>
                  <figcaption>Consumo de internet e minutos logo na primeira tela.</figcaption>
                </figure>
                <figure>
                  <div className="c-pf"><img src="/assets/case-tim/app-home.png" alt="App Meu TIM com total de internet disponível, pacotes e saldo com botão Fazer recarga" loading="lazy" /></div>
                  <figcaption>Total de internet, saldo e recarga a um toque.</figcaption>
                </figure>
              </div>
            </section>

            <section id="decisoes">
              <h2><span className="n">03 — Decisões</span>Três decisões que fizeram diferença</h2>
              <div className="c-decisions">
                <div className="c-dec">
                  <div className="num">1</div>
                  <div>
                    <h3>Estabilidade antes de novas funções</h3>
                    <p>A fila de incidentes críticos passou a ser priorizada pelo impacto no cliente, não pela ordem de chegada. Antes de lançar qualquer coisa nova, o app precisava parar de falhar no que já fazia.</p>
                    <div className="trade"><b>Trade-off</b>Novas funções pedidas por outras áreas esperaram mais tempo na fila.</div>
                  </div>
                </div>
                <div className="c-dec">
                  <div className="num">2</div>
                  <div>
                    <h3>Release só sobe com critério de pronto</h3>
                    <p>Organizamos o time de releases em Scrum e Kanban, com uma definição clara do que é estar pronto para produção, e acompanhamos cada versão depois de publicada.</p>
                    <div className="trade"><b>Trade-off</b>O ciclo ficou mais rigoroso, e algumas entregas levaram mais tempo para chegar ao cliente.</div>
                  </div>
                </div>
                <div className="c-dec">
                  <div className="num">3</div>
                  <div>
                    <h3>A avaliação da loja vira item de backlog</h3>
                    <p>As reclamações nas lojas de aplicativos passaram a alimentar o backlog do produto. O cliente mostrava onde o app falhava, e a equipe atacava primeiro o que mais aparecia.</p>
                    <div className="trade"><b>Trade-off</b>Avaliações são ruidosas e exigiram triagem constante para separar padrão de caso isolado.</div>
                  </div>
                </div>
              </div>
              <div className="c-reviews" style={{ marginTop: 28 }}>
                <div className="c-rv-col">
                  <span className="c-mono">2017 · antes</span>
                  <div className="c-rv">
                    <div className="top"><span className="ttl">Cada dia Pior</span><span className="dt">08/09/2017</span></div>
                    <div className="st">★<span className="off">★★★★</span></div>
                    <p>"A cada atualização ao invés de melhorar piora…"</p>
                    <div className="src">Avaliação real · App Store</div>
                  </div>
                </div>
                <div className="c-rv-col after">
                  <span className="c-mono">2019 · depois</span>
                  <div className="c-rv">
                    <div className="top"><span className="ttl">Um Bom APP</span><span className="dt">05/04/2019</span></div>
                    <div className="st">★★★★★</div>
                    <p>"Sem problemas na última versão atualizada deste APP. Tomara que continuem sempre assertivos."</p>
                    <div className="src">Avaliação real · App Store</div>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 15, color: 'var(--case-muted)', marginTop: 12 }}>A mesma loja, com 19 meses de diferença: a reclamação era sobre atualizações que quebravam o app. O elogio é justamente sobre a última atualização.</p>
            </section>

            <section id="resultado">
              <h2><span className="n">04 — Resultado</span>O que mudou</h2>
              <div className="c-result">
                <div className="big">4,5</div>
                <div><span className="c-mono">Nota do app nas lojas</span><p>A nota do Meu TIM saiu de 1,5 para 4,5 estrelas. O app deixou de afastar clientes e passou a resolver o que eles precisavam.</p></div>
              </div>
              <div className="c-outs">
                <div className="c-out"><div className="t">Menos incidentes críticos</div><div className="d">No app Meu TIM e no site TIM.</div></div>
                <div className="c-out"><div className="t">Resolução mais rápida</div><div className="d">Menos tempo entre a falha e a correção.</div></div>
                <div className="c-out"><div className="t">+62% no autoatendimento</div><div className="d">Clientes atendidos pelo site e app no 2º tri de 2018 vs. 2017.</div></div>
              </div>
              <p style={{ marginTop: 28, fontSize: 16 }}>
                No período, o autoatendimento digital cresceu: no segundo trimestre de 2018, o número de clientes que buscaram atendimento pelo site e pelo app Meu TIM aumentou 62% em relação ao mesmo período de 2017, segundo a operadora (<a href="https://www.convergenciadigital.com.br/cgi/cgilua.exe/sys/start.htm?UserActiveTemplate=site&infoid=48758&sid=17" target="_blank" rel="noopener noreferrer">Convergência Digital</a>).
              </p>
              <p style={{ marginTop: 12, fontSize: 15, color: 'var(--case-muted)' }}>
                Para dar a dimensão do produto: hoje o Meu TIM soma mais de 100 milhões de downloads no Google Play e cerca de 70 milhões de acessos por mês, segundo a operadora (<a href="https://tecnoblog.net/noticias/aplicativo-meu-tim-e-reformulado-com-novo-visual-e-mais-funcoes/" target="_blank" rel="noopener noreferrer">Tecnoblog</a>).
              </p>
            </section>

            <blockquote><p>Num app de serviço, estabilidade é a primeira funcionalidade.</p><cite className="c-mono">— Nei Girão</cite></blockquote>

            <section id="aprendizados">
              <h2><span className="n">05 — Aprendizados</span>O que eu levaria para o próximo produto</h2>
              <ol className="c-lessons">
                <li><strong>Ninguém avalia bem um app que trava.</strong> Antes de novas funções, o cliente quer que as atuais funcionem.</li>
                <li><strong>A loja de aplicativos é pesquisa de graça.</strong> As avaliações mostraram, todos os dias, onde estava a dor do cliente.</li>
                <li><strong>Qualidade é processo, não fase.</strong> Critério de pronto e acompanhamento depois do lançamento evitaram que os mesmos erros voltassem.</li>
              </ol>
            </section>

            <section style={{ marginBottom: 0 }}>
              <span className="c-mono" style={{ color: 'var(--case-muted)', display: 'block', marginBottom: 14 }}>Ferramentas e métodos</span>
              <div className="c-chips">
                {['Scrum / Kanban', 'Performance digital', 'Gestão de incidentes', 'Self-care', 'Avaliações de loja'].map(c => (
                  <span key={c} className="c-chip">{c}</span>
                ))}
              </div>
            </section>
          </article>
        </div>

        <section className="c-cta">
          <div className="c-wrap">
            <h2>Seu app precisa <em>parar de quebrar</em> antes de crescer?</h2>
            <div className="acts">
              <a className="c-btn pri" href="mailto:neigirao@gmail.com?subject=Sobre%20o%20case%20Meu%20TIM">Falar comigo</a>
              <a className="c-btn" href="https://www.linkedin.com/in/neigirao/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </section>

        <nav className="c-wrap c-next" aria-label="Outro case">
          <Link to="/projeto/minha-oi-app-nei-girao">
            <div><span className="c-mono">Próximo case</span><div className="t">Minha Oi: menos ligação, mais resolução</div></div>
            <span className="arr">→</span>
          </Link>
        </nav>
      </main>

      <footer className="c-foot">
        <div className="c-wrap">
          <span>© Nei Girão · 2026</span>
          <Link to="/">← Voltar ao site</Link>
        </div>
      </footer>
    </div>
  );
}
