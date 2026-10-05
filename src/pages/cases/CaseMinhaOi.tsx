import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema';
import { BASE_URL } from '@/config/constants';
import '@/styles/cases.css';

export default function CaseMinhaOi() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const links = [...document.querySelectorAll<HTMLAnchorElement>('.case-minha-oi .c-toc ol a')];
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
    <div className="case-page case-minha-oi">
      <SEOHead
        title="Case: Minha Oi — digitalizar o atendimento e cortar 40% dos custos | Nei Girão"
        description="Como liderei a digitalização do atendimento da Oi: app Minha Oi, Joice, WhatsApp, chat e redes sociais trabalhando como um só canal. −40% de custos operacionais e +10% de satisfação."
        canonicalUrl={`${BASE_URL}/projeto/minha-oi-app-nei-girao`}
        ogType="article"
        keywords={['Minha Oi', 'Oi', 'atendimento digital', 'transformação digital', 'Product Manager', 'Nei Girão']}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "headline": "Minha Oi: menos ligação, mais resolução. −40% de custo de atendimento",
            "author": { "@type": "Person", "name": "Nei Girão", "url": BASE_URL },
            "about": { "@type": "Organization", "name": "Oi" },
            "inLanguage": "pt-BR",
            "mainEntityOfPage": `${BASE_URL}/projeto/minha-oi-app-nei-girao`
          }
        ]
      }) }} />
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Projetos', url: '/#projects' },
        { name: 'Minha Oi APP' },
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
            <span>Oi</span>
          </nav>

          <header className="c-hero">
            <div className="c-kicker c-mono">Case · Oi · 2019 — 2021</div>
            <h1 className="c-disp">Minha Oi: <em>menos ligação</em>, mais resolução</h1>
            <p className="c-dek">Uma operadora com 8 milhões de clientes fazendo login todo mês e um call center caro e lotado. Este é o caso de como levamos o atendimento para o app, o site, a assistente virtual e o WhatsApp, e cortamos 40% dos custos sem perder a satisfação do cliente.</p>
            <div className="c-facts">
              <div className="c-fact"><div className="k c-mono">Meu papel</div><div className="v">Gerente de Transformação Digital · PM</div></div>
              <div className="c-fact"><div className="k c-mono">Escala</div><div className="v">8 milhões de logins por mês</div></div>
              <div className="c-fact"><div className="k c-mono">Período</div><div className="v">2019 — 2021</div></div>
              <div className="c-fact"><div className="k c-mono">Resultado</div><div className="v big">−40%</div></div>
            </div>
            <div className="c-hero-art">
              <figure style={{ margin: 0 }}>
                <div className="c-promo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'var(--case-paper)' }}>
                  <img src="/assets/case-oi/app-dois-celulares.png" alt="App Minha Oi: tela de troca de voz por internet e tela de benefícios com saldo de internet, voz e SMS" style={{ maxHeight: 420, width: 'auto' }} loading="eager" />
                </div>
                <figcaption>O app Minha Oi: benefícios da oferta e troca de minutos por internet. <a href="https://www.oi.com.br/minha-oi/app-minha-oi/" target="_blank" rel="noopener noreferrer">Ver no ar ↗</a></figcaption>
              </figure>
              <div className="c-facts-big">
                <div className="row"><div className="n">−40%</div><div className="l">no custo operacional do atendimento ao cliente</div></div>
                <div className="row"><div className="n">+10%</div><div className="l">de satisfação do cliente</div></div>
                <div className="row"><div className="n">8 mi</div><div className="l">de clientes fazendo login todo mês</div></div>
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
              <a className="c-btn sm" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fneigirao.lovable.app%2Fprojeto%2Fminha-oi-app-nei-girao" target="_blank" rel="noopener noreferrer">Compartilhar no LinkedIn</a>
            </div>
          </aside>

          <article>
            <div className="c-tldr">
              <span className="c-mono">Resumo em 30 segundos</span>
              <ul>
                <li><strong>Desafio:</strong> tirar volume do call center da Oi sem piorar a experiência de um canal com 8 milhões de clientes fazendo login todo mês.</li>
                <li><strong>O que fiz:</strong> liderei a digitalização do atendimento, primeiro no chat e depois em todos os canais digitais.</li>
                <li><strong>Como:</strong> começamos pelos pedidos mais frequentes, ligamos app, site, Joice, WhatsApp, chat e redes sociais numa mesma estratégia e medimos o que era resolvido, não o que era acessado.</li>
                <li><strong>Resultado:</strong> −40% nos custos operacionais e +10% de satisfação do cliente.</li>
              </ul>
            </div>

            <section id="problema">
              <h2><span className="n">01 — O problema</span>O cliente ligava para resolver o que podia resolver sozinho</h2>
              <p>Segunda via da conta, consumo de internet, recarga, religar um serviço bloqueado. Boa parte das ligações para a Oi era sobre pedidos simples, que não precisavam de um atendente.</p>
              <p>Cada uma dessas ligações custava caro para a empresa e tomava tempo do cliente. Os canais digitais existiam, mas funcionavam separados, e o cliente não confiava que fosse resolver por eles.</p>
              <div className="c-shift">
                <div className="side">
                  <span className="c-mono">Antes</span>
                  <ul>
                    <li>Pedido simples virava ligação</li>
                    <li>Fila e tempo de espera</li>
                    <li>Canais digitais isolados</li>
                    <li>Custo alto por atendimento</li>
                  </ul>
                </div>
                <div className="arrow" aria-hidden="true">→</div>
                <div className="side to">
                  <span className="c-mono">Depois</span>
                  <ul>
                    <li>Pedido simples resolvido no app ou no WhatsApp</li>
                    <li>Atendimento a qualquer hora</li>
                    <li>Canais conectados</li>
                    <li>Atendente livre para o que é complexo</li>
                  </ul>
                </div>
              </div>
              <div className="c-phones">
                <figure>
                  <span className="c-mono tag">Antes</span>
                  <div className="c-promo"><img src="/assets/case-oi/app-antigo.png" alt="Versão antiga do app Minha Oi, de 2013, com listas de consumo e saldo" loading="lazy" /></div>
                  <figcaption>A versão antiga do app: informação em lista, pouca ação.</figcaption>
                </figure>
                <figure>
                  <span className="c-mono tag">Depois</span>
                  <div className="c-promo"><img src="/assets/case-oi/app-recarga.png" alt="Novo app Minha Oi com saldo em destaque e botões para fazer recarga, trocar voz e internet e comprar pacotes" loading="lazy" /></div>
                  <figcaption>O novo app: o saldo em destaque e as ações mais pedidas a um toque.</figcaption>
                </figure>
              </div>
            </section>

            <section id="papel">
              <h2><span className="n">02 — Meu papel</span>Do chat à transformação digital do atendimento</h2>
              <p>Entrei em 2019 como gerente do atendimento digital via chat, responsável por todos os produtos da Oi, com as plataformas LivePerson e Plusoft e um time de 6 pessoas.</p>
              <p>Em 2020 assumi a Transformação Digital do atendimento como Product Manager. O escopo passou a incluir o app e o site Minha Oi, a assistente virtual Joice, o WhatsApp, o marketplace Oi Place e o atendimento em Facebook, Twitter e Instagram.</p>
            </section>

            <section id="decisoes">
              <h2><span className="n">03 — Decisões</span>Três decisões que fizeram diferença</h2>
              <div className="c-decisions">
                <div className="c-dec">
                  <div className="num">1</div>
                  <div>
                    <h3>Começar pelo que mais gera ligação</h3>
                    <p>Em vez de redesenhar tudo, priorizamos os pedidos de maior volume no call center: segunda via, consumo, recarga e religação de serviço. Cada um que passava a ser resolvido no digital tirava milhares de ligações da fila.</p>
                    <div className="trade"><b>Trade-off</b>Pedidos menos frequentes, mesmo que mal resolvidos, ficaram para depois.</div>
                    <figure className="c-wide">
                      <div className="c-promo"><img src="/assets/case-oi/app-banner.png" alt="Menu do app Minha Oi com fazer recarga, trocar voz e internet, comprar pacotes e mudar a oferta" loading="lazy" /></div>
                      <figcaption>O menu do app abre direto nos pedidos mais frequentes: recarga, troca de voz por internet e compra de pacotes.</figcaption>
                    </figure>
                  </div>
                </div>
                <div className="c-dec">
                  <div className="num">2</div>
                  <div>
                    <h3>Tratar seis canais como um só atendimento</h3>
                    <p>O cliente não pensa em canais, pensa no problema. App, site, Joice, WhatsApp, chat e redes sociais passaram a seguir a mesma estratégia, para o cliente resolver onde já estivesse.</p>
                    <div className="trade"><b>Trade-off</b>Alinhar canais com donos e plataformas diferentes deixou algumas entregas mais lentas.</div>
                    <figure className="c-wide">
                      <div className="c-promo"><img src="/assets/case-oi/site-minha-oi.png" alt="Site Minha Oi com atalhos para pagar a conta, avisar pagamento e resolver problemas de sinal" loading="lazy" /></div>
                      <figcaption>O site Minha Oi com atalhos para os três pedidos mais comuns: pagar a conta, avisar pagamento e resolver falta de sinal.</figcaption>
                    </figure>
                  </div>
                </div>
                <div className="c-dec">
                  <div className="num">3</div>
                  <div>
                    <h3>Medir o que foi resolvido, não o que foi acessado</h3>
                    <p>Acessos ao app não pagam a conta. A métrica que importava era quantos atendimentos terminavam resolvidos no digital, sem o cliente precisar ligar depois.</p>
                    <div className="trade"><b>Trade-off</b>A métrica certa mostrou números menores no começo e exigiu explicar a mudança para outras áreas.</div>
                  </div>
                </div>
              </div>
              <div className="c-channels" role="list" aria-label="Canais digitais do atendimento">
                <div className="c-ch core" role="listitem"><span className="c-mono">Autoatendimento</span><div className="t">App Minha Oi</div><div className="d">Conta, consumo, recarga e serviços no celular.</div></div>
                <div className="c-ch" role="listitem"><span className="c-mono">Autoatendimento</span><div className="t">Site Minha Oi</div><div className="d">Os mesmos serviços no navegador.</div></div>
                <div className="c-ch" role="listitem"><span className="c-mono">Assistente virtual</span><div className="t">Joice</div><div className="d">Respostas automáticas a qualquer hora.</div></div>
                <div className="c-ch" role="listitem"><span className="c-mono">Mensagem</span><div className="t">WhatsApp</div><div className="d">Atendimento onde o cliente já conversa.</div></div>
                <div className="c-ch" role="listitem"><span className="c-mono">Humano digital</span><div className="t">Chat</div><div className="d">Atendentes para casos mais complexos.</div></div>
                <div className="c-ch" role="listitem"><span className="c-mono">Social</span><div className="t">Redes sociais</div><div className="d">Facebook, Twitter e Instagram.</div></div>
              </div>
            </section>

            <section id="resultado">
              <h2><span className="n">04 — Resultado</span>O que mudou</h2>
              <div className="c-result">
                <div className="big">−40%</div>
                <div><span className="c-mono">Custo operacional do atendimento ao cliente</span><p>Redução de 40% no custo de operar o atendimento da Oi. Pedidos que antes viravam ligação para o call center passaram a ser resolvidos sozinhos pelo cliente no app, no site, na Joice e no WhatsApp.</p></div>
              </div>
              <figure className="c-wide">
                <div className="c-promo"><img src="/assets/case-oi/marca-minha-oi.png" alt="Marca Minha Oi com o app no celular e o site no computador" loading="lazy" /></div>
                <figcaption>Minha Oi no celular e no computador: o mesmo atendimento nos dois.</figcaption>
              </figure>
              <div className="c-outs">
                <div className="c-out"><div className="t">+10% de satisfação</div><div className="d">O cliente passou a resolver mais rápido, sem fila.</div></div>
                <div className="c-out"><div className="t">Nota do app em alta</div><div className="d">A avaliação do Minha Oi nas lojas subiu.</div></div>
                <div className="c-out"><div className="t">8 milhões de logins/mês</div><div className="d">Escala do canal digital que absorveu o volume do call center.</div></div>
              </div>
            </section>

            <blockquote><p>O melhor atendimento é aquele em que o cliente nem precisa pedir ajuda.</p><cite className="c-mono">— Nei Girão</cite></blockquote>

            <section id="aprendizados">
              <h2><span className="n">05 — Aprendizados</span>O que eu levaria para o próximo produto</h2>
              <ol className="c-lessons">
                <li><strong>O volume aponta a prioridade.</strong> Os dados do call center mostraram o que digitalizar primeiro, melhor do que qualquer opinião.</li>
                <li><strong>Canal não é produto, atendimento é.</strong> Juntar seis canais numa só estratégia valeu mais do que melhorar cada um isolado.</li>
                <li><strong>Custo e satisfação podem andar juntos.</strong> Cortar 40% e ainda subir a satisfação só foi possível porque o cliente resolvia mais rápido.</li>
              </ol>
            </section>

            <section style={{ marginBottom: 0 }}>
              <span className="c-mono" style={{ color: 'var(--case-muted)', display: 'block', marginBottom: 14 }}>Ferramentas e métodos</span>
              <div className="c-chips">
                {['Scrum / Kanban', 'LivePerson', 'Plusoft', 'Assistente virtual', 'WhatsApp', 'Google Analytics'].map(c => (
                  <span key={c} className="c-chip">{c}</span>
                ))}
              </div>
            </section>
          </article>
        </div>

        <section className="c-cta">
          <div className="c-wrap">
            <h2>Precisa de alguém para <em>escalar atendimento digital</em>?</h2>
            <div className="acts">
              <a className="c-btn pri" href="mailto:neigirao@gmail.com?subject=Sobre%20o%20case%20Minha%20Oi">Falar comigo</a>
              <a className="c-btn" href="https://www.linkedin.com/in/neigirao/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </section>

        <nav className="c-wrap c-next" aria-label="Outro case">
          <Link to="/projeto/nei-girao-ecommerce-previdencia-privada">
            <div><span className="c-mono">Case anterior</span><div className="t">Ecommerce de Previdência Privada</div></div>
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
