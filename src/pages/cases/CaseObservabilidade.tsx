import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema';
import { BASE_URL } from '@/config/constants';
import '@/styles/cases.css';

export default function CaseObservabilidade() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const links = [...document.querySelectorAll<HTMLAnchorElement>('.case-obs .c-toc ol a')];
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
    <div className="case-page case-obs">
      <SEOHead
        title="Case: criando a área de Observabilidade da Icatu Seguros — Dynatrace, Grafana e release | Nei Girão"
        description="Como estruturei a área de Observabilidade, Release e Delivery da Icatu Seguros: dashboards no Grafana com dados em tempo real do Application Insights e uma métrica única de disponibilidade das aplicações."
        canonicalUrl={`${BASE_URL}/projeto/nei-girao-observabilidade-icatu`}
        ogType="article"
        keywords={['Observabilidade', 'Icatu', 'Dynatrace', 'Grafana', 'Product Manager', 'Release', 'Nei Girão']}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "headline": "Criando a área de Observabilidade da Icatu Seguros",
            "author": { "@type": "Person", "name": "Nei Girão", "url": BASE_URL },
            "about": { "@type": "Organization", "name": "Icatu Seguros" },
            "inLanguage": "pt-BR",
            "mainEntityOfPage": `${BASE_URL}/projeto/nei-girao-observabilidade-icatu`
          }
        ]
      }) }} />
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Projetos', url: '/#projects' },
        { name: 'Observabilidade Icatu' },
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
            <span>Icatu</span>
          </nav>

          <header className="c-hero">
            <div className="c-kicker c-mono">Case · Icatu Seguros · 2024 — hoje</div>
            <h1 className="c-disp">Observabilidade: <em>descobrir o problema</em> antes do cliente</h1>
            <p className="c-dek">Quando um produto digital cai, quem costuma avisar é o cliente. Este é o caso de como estruturei a área de Observabilidade da Icatu para inverter essa ordem.</p>
            <div className="c-facts">
              <div className="c-fact"><div className="k c-mono">Meu papel</div><div className="v">PM · Coordenador de TI</div></div>
              <div className="c-fact"><div className="k c-mono">Time</div><div className="v">20 pessoas diretas</div></div>
              <div className="c-fact"><div className="k c-mono">Período</div><div className="v">2024 — hoje</div></div>
              <div className="c-fact"><div className="k c-mono">Resultado</div><div className="v">Indicador de disponibilidade</div></div>
            </div>

            <div className="c-hero-art">
              <figure className="c-shot" style={{ margin: 0 }}>
                <div className="c-frame">
                  <div className="chrome"><i /><i /><i /></div>
                  <img src="/assets/case-obs/disponibilidade.png" alt="Painel de experiência do cliente com a disponibilidade e o tempo de resposta de cada jornada digital, em tempo real" loading="eager" />
                </div>
                <figcaption>Disponibilidade de cada jornada digital, em tempo real. Nomes de parceiros ocultados.</figcaption>
              </figure>
              <div className="c-facts-big">
                <div className="row"><div className="n">6</div><div className="l">produtos digitais entregues com monitoramento desde o lançamento</div></div>
                <div className="row"><div className="n">1</div><div className="l">métrica de disponibilidade das aplicações, acompanhada em tempo real</div></div>
              </div>
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
              <a className="c-btn sm" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fneigirao.lovable.app%2Fprojeto%2Fnei-girao-observabilidade-icatu" target="_blank" rel="noopener noreferrer">Compartilhar no LinkedIn</a>
            </div>
          </aside>

          <article>
            <div className="c-tldr">
              <span className="c-mono">Resumo em 30 segundos</span>
              <ul>
                <li><strong>Desafio:</strong> os produtos digitais da Icatu cresciam, e os problemas em produção eram descobertos tarde, muitas vezes pelo cliente.</li>
                <li><strong>O que fiz:</strong> estruturei e lidero a área de Observabilidade, Release e Delivery, junto com Produtos Digitais.</li>
                <li><strong>Como:</strong> dashboards no Grafana com dados em tempo real do Application Insights, cobrindo vendas e saúde técnica, um ciclo de release padronizado e métricas técnicas lidas junto com os dados de negócio.</li>
                <li><strong>Resultado:</strong> detecção de problemas mais rápida, menos incidentes críticos, 6 produtos entregues e, pela primeira vez, uma métrica de disponibilidade das aplicações.</li>
              </ul>
            </div>

            <section id="problema">
              <h2><span className="n">01 — O problema</span>Quem avisava que o sistema caiu era o cliente</h2>
              <p>Com mais produtos digitais no ar, como os ecommerces de Seguro de Vida e Previdência, cada falha passou a custar venda e confiança. Mas a visão de saúde dos sistemas era fragmentada, e muitos problemas só apareciam quando o cliente reclamava.</p>
              <p>Ao mesmo tempo, as entregas seguiam ritmos diferentes em cada time, e um lançamento podia trazer instabilidade sem que ninguém percebesse logo.</p>

              <div className="c-shift">
                <div className="side"><span className="c-mono">Antes</span><ul>
                  <li>Problema descoberto pelo cliente</li>
                  <li>Visão espalhada em várias ferramentas</li>
                  <li>Release sem padrão entre os times</li>
                  <li>Métrica técnica longe do negócio</li>
                </ul></div>
                <div className="arrow" aria-hidden="true">→</div>
                <div className="side to"><span className="c-mono">Depois</span><ul>
                  <li>Alerta antes do impacto no cliente</li>
                  <li>Dashboards em tempo real</li>
                  <li>Ciclo de release padronizado</li>
                  <li>Disponibilidade medida e acompanhada</li>
                </ul></div>
              </div>
            </section>

            <section id="papel">
              <h2><span className="n">02 — Meu papel</span>Montar a área e dar dono à saúde dos produtos</h2>
              <p>Desde 2024 sou Product Manager e Coordenador de TI de Observabilidade, Release e Delivery na Icatu Seguros. Lidero diretamente 20 pessoas.</p>
              <p>Trabalho junto com marketing, arquitetura, infraestrutura e produtos para que observabilidade não seja um assunto só técnico, mas parte de como a empresa lança e opera seus produtos digitais.</p>

              <div className="c-flow" role="list" aria-label="Ciclo de entrega e observabilidade">
                {[
                  { n: '01', t: 'Desenvolver', d: 'Squads constroem com monitoramento previsto desde o início.' },
                  { n: '02', t: 'Lançar', d: 'Release padronizado, com critério claro para subir.' },
                  { n: '03', t: 'Observar', d: 'Dynatrace e Grafana em tempo real.', hl: true },
                  { n: '04', t: 'Melhorar', d: 'Dados de produção viram prioridade no backlog.' },
                ].map(({ n, t, d, hl }) => (
                  <div key={n} className={`c-st${hl ? ' hl' : ''}`} role="listitem">
                    <span className="c-mono">{n}</span>
                    <div className="t">{t}</div>
                    <div className="d">{d}</div>
                  </div>
                ))}
              </div>
            </section>

            <section id="decisoes">
              <h2><span className="n">03 — Decisões</span>Três decisões que fizeram diferença</h2>
              <div className="c-decisions">
                <div className="c-dec">
                  <div className="num">1</div>
                  <div>
                    <h3>Uma visão única, em tempo real: negócio e tecnologia na mesma tela</h3>
                    <p>A área criou diversos dashboards no Grafana que leem dados do Application Insights em tempo real. Num mesmo lugar, o time vê como estão as vendas e como está a saúde dos sistemas, e percebe o problema nascendo, não depois que ele vira reclamação.</p>

                    <div className="c-pipe" aria-label="Fluxo dos dados">
                      <b>Produtos digitais</b><i>→</i><b>Application Insights</b><i>→</i><b className="hl">Grafana</b><i>→</i><b>Times e liderança</b>
                    </div>

                    <div className="c-dashes">
                      <div className="c-dash">
                        <div className="dh"><span className="t">Negócio</span><span className="c-mono">Tempo real</span></div>
                        <ul>
                          <li>Vendas<span>volume e valor</span></li>
                          <li>Forma de pagamento<span>mix por meio</span></li>
                          <li>Produto mais vendido<span>ranking</span></li>
                          <li>Agência<span>vendas por agência</span></li>
                          <li>Usuário que mais vende<span>ranking</span></li>
                        </ul>
                      </div>
                      <div className="c-dash tech">
                        <div className="dh"><span className="t">Tecnologia</span><span className="c-mono">Tempo real</span></div>
                        <ul>
                          <li>Tempo de resposta<span>por endpoint</span></li>
                          <li>Disponibilidade<span>por endpoint</span></li>
                          <li>FCP<span>First Contentful Paint</span></li>
                          <li>LCP<span>Largest Contentful Paint</span></li>
                          <li>Outras métricas do Lighthouse<span>front-end</span></li>
                        </ul>
                      </div>
                    </div>

                    <div className="trade"><b>Trade-off</b>Instrumentar tudo exige tempo das squads, que deixa de ir para novas funcionalidades.</div>

                    <div className="c-pair-shots">
                      <figure className="c-wide">
                        <div className="c-frame">
                          <div className="chrome"><i /><i /><i /></div>
                          <img src="/assets/case-obs/negocio.png" alt="Dashboard de negócio no Grafana: propostas enviadas, prêmio arrecadado, vendas por produto, formas de pagamento, logins e vendas por corretora" loading="lazy" />
                        </div>
                        <figcaption>Negócio: propostas, prêmio, produto, forma de pagamento, logins e vendas por corretora. Nomes ocultados.</figcaption>
                      </figure>
                      <figure className="c-wide">
                        <div className="c-frame">
                          <div className="chrome"><i /><i /><i /></div>
                          <img src="/assets/case-obs/tecnologia.png" alt="Dashboard técnico no Grafana: OKRs de SLO, taxa de sucesso e tempo de resposta, com disponibilidade e p95 por endpoint" loading="lazy" />
                        </div>
                        <figcaption>Tecnologia: SLO, taxa de sucesso, tempo de resposta e disponibilidade por endpoint.</figcaption>
                      </figure>
                    </div>
                  </div>
                </div>

                <div className="c-dec">
                  <div className="num">2</div>
                  <div>
                    <h3>Release e delivery no mesmo time da observabilidade</h3>
                    <p>Juntar quem lança com quem monitora fechou o ciclo: cada versão é acompanhada depois de publicada, e qualquer instabilidade é ligada rapidamente à mudança que a causou.</p>
                    <div className="trade"><b>Trade-off</b>Um processo de release mais rigoroso deixou alguns lançamentos um pouco mais lentos.</div>
                  </div>
                </div>

                <div className="c-dec">
                  <div className="num">3</div>
                  <div>
                    <h3>Disponibilidade virou um número</h3>
                    <p>Antes, a pergunta "as aplicações estão no ar?" não tinha uma resposta única. Com tempo de resposta e disponibilidade de cada endpoint vindo do Application Insights, passamos a ter uma métrica de disponibilidade das aplicações, acompanhada por todos os times.</p>
                    <div className="trade"><b>Trade-off</b>Definir o que conta como "disponível" exigiu acordo entre produto, arquitetura e infraestrutura antes de o número valer para todos.</div>
                  </div>
                </div>
              </div>
            </section>

            <section id="resultado">
              <h2><span className="n">04 — Resultado</span>O que mudou</h2>
              <div className="c-result">
                <div className="big">Disponibilidade</div>
                <div><span className="c-mono">Uma métrica para todas as aplicações</span><p>O principal resultado foi ter uma métrica de disponibilidade das aplicações, calculada com dados em tempo real e vista por produto, tecnologia e liderança.</p></div>
              </div>
              <div className="c-outs">
                <div className="c-out"><div className="t">Menos incidentes críticos</div><div className="d">Problemas identificados e resolvidos antes de chegar ao cliente.</div></div>
                <div className="c-out"><div className="t">Negócio e tecnologia juntos</div><div className="d">Vendas, endpoints e métricas de front-end no mesmo painel, em tempo real.</div></div>
                <div className="c-out"><div className="t">6 produtos entregues</div><div className="d">Lançados com qualidade e no prazo.</div></div>
              </div>
            </section>

            <blockquote><p>Observabilidade boa é quando o time descobre o problema antes do cliente.</p><cite className="c-mono">— Nei Girão</cite></blockquote>

            <section id="aprendizados">
              <h2><span className="n">05 — Aprendizados</span>O que eu levaria para o próximo produto</h2>
              <ol className="c-lessons">
                <li><strong>Monitorar é parte do produto.</strong> Observabilidade pensada desde o desenvolvimento custa menos do que remendada depois do lançamento.</li>
                <li><strong>Métrica técnica precisa falar a língua do negócio.</strong> Colocar vendas e disponibilidade na mesma tela foi o que trouxe apoio das outras áreas.</li>
                <li><strong>Quem lança e quem monitora devem estar perto.</strong> Juntar release e observabilidade encurtou o caminho entre a falha e a correção.</li>
              </ol>
            </section>

            <section style={{ marginBottom: 0 }}>
              <span className="c-mono" style={{ color: 'var(--case-muted)', display: 'block', marginBottom: 14 }}>Ferramentas e métodos</span>
              <div className="c-chips">
                {['Dynatrace', 'Grafana', 'Application Insights', 'Lighthouse · FCP / LCP', 'Azure Monitor', 'Release management', 'Scrum / Kanban'].map(c => (
                  <span key={c} className="c-chip">{c}</span>
                ))}
              </div>
            </section>
          </article>
        </div>

        <section className="c-cta">
          <div className="c-wrap">
            <h2>Precisa de <em>observabilidade</em> ligada a resultado?</h2>
            <div className="acts">
              <a className="c-btn pri" href="mailto:neigirao@gmail.com?subject=Sobre%20o%20case%20Observabilidade">Falar comigo</a>
              <a className="c-btn" href="https://www.linkedin.com/in/neigirao/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </section>

        <nav className="c-wrap c-next" aria-label="Próximo case">
          <Link to="/projeto/ecommerce-seguro-de-vida-nei-girao">
            <div><span className="c-mono">Próximo case</span><div className="t">Ecommerce de Seguro de Vida</div></div>
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
