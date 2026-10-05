import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema';
import { BASE_URL } from '@/config/constants';
import '@/styles/cases.css';

export default function CaseSeguroVida() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const links = [...document.querySelectorAll<HTMLAnchorElement>('.case-seguro-vida .c-toc ol a')];
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
    <div className="case-page case-seguro-vida">
      <SEOHead
        title="Case: ecommerce de Seguro de Vida da Icatu — +15% de conversão online | Nei Girão"
        description="Como levei a venda de seguro de vida da Icatu para uma jornada 100% digital: discovery, decisões de produto, observabilidade e +15% de conversão online."
        canonicalUrl={`${BASE_URL}/projeto/ecommerce-seguro-de-vida-nei-girao`}
        ogType="article"
        keywords={['Seguro de Vida', 'Icatu', 'ecommerce', 'Product Manager', 'Nei Girão']}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "headline": "Como transformamos a venda de seguro de vida em uma jornada digital",
            "description": "Case de Product Management: ecommerce de Seguro de Vida da Icatu Seguros, +15% de conversão online.",
            "author": { "@type": "Person", "name": "Nei Girão", "url": BASE_URL },
            "about": { "@type": "Organization", "name": "Icatu Seguros" },
            "inLanguage": "pt-BR",
            "mainEntityOfPage": `${BASE_URL}/projeto/ecommerce-seguro-de-vida-nei-girao`
          }
        ]
      }) }} />
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Projetos', url: '/#projects' },
        { name: 'Ecommerce Seguro de Vida' },
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
            <div className="c-kicker c-mono">Case · Icatu Seguros · 2021 — 2024</div>
            <h1 className="c-disp">Seguro de vida sem corretor, sem ligação: <em>a jornada digital</em> que aumentou a conversão em 15%</h1>
            <p className="c-dek">Seguro de vida sempre foi vendido numa conversa. Este é o caso de como transformamos essa conversa em um ecommerce que o cliente consegue usar sozinho, do início ao fim, e que converte.</p>
            <div className="c-facts">
              <div className="c-fact"><div className="k c-mono">Meu papel</div><div className="v">Product Manager, dono do ecommerce</div></div>
              <div className="c-fact"><div className="k c-mono">Time</div><div className="v">2 squads · 17 pessoas</div></div>
              <div className="c-fact"><div className="k c-mono">Período</div><div className="v">2021 — 2024</div></div>
              <div className="c-fact"><div className="k c-mono">Resultado</div><div className="v big">+15%</div></div>
            </div>
            <figure className="c-shot">
              <div className="c-frame">
                <div className="chrome"><i /><i /><i /></div>
                <img src="/assets/case-vida/cotacao.png" alt="Tela de cotação do ecommerce de Seguro de Vida da Icatu: o cliente escolhe o valor da proteção e vê o preço mensal e anual na hora" loading="eager" />
              </div>
              <figcaption>A tela de cotação: o cliente escolhe o valor da proteção e vê o preço na hora, sem cadastro. <a href="http://bit.ly/3Mjg0d9" target="_blank" rel="noopener noreferrer">Ver produto no ar ↗</a></figcaption>
            </figure>
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
              <a className="c-btn sm" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fneigirao.lovable.app%2Fprojeto%2Fecommerce-seguro-de-vida-nei-girao" target="_blank" rel="noopener noreferrer">Compartilhar no LinkedIn</a>
            </div>
          </aside>

          <article>
            <div className="c-tldr">
              <span className="c-mono">Resumo em 30 segundos</span>
              <ul>
                <li><strong>Desafio:</strong> vender seguro de vida online, um produto que depende de confiança e normalmente é vendido por corretor.</li>
                <li><strong>O que fiz:</strong> liderei o discovery, defini a jornada de cotação, contratação e pagamento, e instrumentei o funil de ponta a ponta.</li>
                <li><strong>Como:</strong> 2 squads multidisciplinares, releases curtos guiados por dados, observabilidade com Dynatrace e Azure Monitor.</li>
                <li><strong>Resultado:</strong> +15% de conversão nas vendas online.</li>
              </ul>
            </div>

            <section id="problema">
              <h2><span className="n">01 — O problema</span>Um produto que ninguém compra por impulso</h2>
              <p>Seguro de vida é uma compra que as pessoas adiam. Envolve pensar em risco, em família e em dinheiro, e por isso sempre dependeu de alguém do outro lado explicando, tirando dúvidas e passando confiança.</p>
              <p>A Icatu queria abrir um canal próprio de venda online. O desafio não era colocar um formulário no ar. Era fazer o cliente sentir, sozinho e em poucos minutos, a mesma segurança que teria numa conversa com um corretor.</p>
              <p>O produto oferece proteção por morte natural ou acidental de R$ 20 mil a R$ 250 mil, a partir de R$ 10 por mês. É um valor acessível, mas o cliente precisava entender o que estava comprando antes de confiar.</p>
              <p>Isso trazia três tensões ao mesmo tempo: <strong>simplicidade</strong> para quem compra, <strong>rigor</strong> para a área atuarial e o jurídico, e <strong>estabilidade</strong> para um produto que lida com pagamento e dados sensíveis.</p>
            </section>

            <section id="papel">
              <h2><span className="n">02 — Meu papel</span>Dono do produto, do discovery ao pós-lançamento</h2>
              <p>Como Product Manager e coordenador de Produtos Digitais, eu era responsável pelo ecommerce de ponta a ponta. Coordenava 2 squads com 17 pessoas, entre produto, design e engenharia, e era a ponte com atuária, jurídico, marketing e growth.</p>
              <p>Na prática, isso significava decidir o que entrava em cada release, defender essas escolhas com dados e garantir que o que subia para produção ficasse de pé.</p>
            </section>

            <section id="decisoes">
              <h2><span className="n">03 — Decisões</span>Três decisões que fizeram diferença</h2>
              <div className="c-decisions">
                <div className="c-dec">
                  <div className="num">1</div>
                  <div>
                    <h3>Mostrar o preço antes de pedir os dados</h3>
                    <p>O cliente chegava, informava poucos dados e já via quanto ia pagar. O cadastro completo só aparecia depois que ele tinha um motivo para continuar.</p>
                    <div className="trade"><b>Trade-off</b>Menos leads capturados logo no início, em troca de mais gente chegando à contratação.</div>
                    <figure className="c-wide">
                      <div className="c-frame">
                        <div className="chrome"><i /><i /><i /></div>
                        <img src="/assets/case-vida/landing.png" alt="Página inicial do ecommerce: proteção a partir de R$ 10 por mês e um único botão, Quero cotar" loading="lazy" />
                      </div>
                      <figcaption>O preço aparece já na entrada ("a partir de R$ 10 por mês"), com uma única ação: cotar.</figcaption>
                    </figure>
                  </div>
                </div>
                <div className="c-dec">
                  <div className="num">2</div>
                  <div>
                    <h3>Instrumentar o funil antes de otimizar</h3>
                    <p>Antes de mexer em qualquer tela, mapeamos cada etapa da jornada com eventos no Google Analytics. Assim cada mudança era comparada com um ponto de partida real, e não com a nossa intuição.</p>
                    <div className="trade"><b>Trade-off</b>As primeiras sprints entregaram medição, não features visíveis. Foi preciso alinhar essa expectativa com a liderança.</div>
                  </div>
                </div>
                <div className="c-dec">
                  <div className="num">3</div>
                  <div>
                    <h3>Tratar estabilidade como parte da experiência</h3>
                    <p>Uma falha no pagamento custa uma venda e também a confiança do cliente. Implantamos observabilidade com Dynatrace e Azure Monitor para identificar problemas antes que eles chegassem ao cliente.</p>
                    <div className="trade"><b>Trade-off</b>Parte da capacidade do time foi para infraestrutura e monitoramento, e não para novas funcionalidades.</div>
                  </div>
                </div>
              </div>
              <figure className="c-wide">
                <div className="c-frame">
                  <div className="chrome"><i /><i /><i /></div>
                  <img src="/assets/case-vida/coberturas.png" alt="Coberturas adicionais opcionais, como inclusão de pais e assistência funeral, cada uma com o preço extra visível" loading="lazy" />
                </div>
                <figcaption>Coberturas adicionais modulares: cada opção mostra quanto acrescenta ao preço. O cliente monta o próprio seguro, sem pacotes fechados.</figcaption>
              </figure>
            </section>

            <section id="resultado">
              <h2><span className="n">04 — Resultado</span>O que mudou</h2>
              <div className="c-result">
                <div className="big">+15%</div>
                <div><span className="c-mono">Conversão online</span><p>Aumento na taxa de conversão das vendas online de Seguro de Vida depois das iterações na jornada.</p></div>
              </div>
              <div className="c-outs">
                <div className="c-out"><div className="t">Canal próprio no ar</div><div className="d">Venda de seguro de vida 100% digital, disponível 24/7.</div></div>
                <div className="c-out"><div className="t">Decisão por dados</div><div className="d">Cada release medida contra um ponto de partida do funil.</div></div>
                <div className="c-out"><div className="t">Base para o próximo</div><div className="d">A mesma estrutura foi usada no ecommerce de Previdência Privada.</div></div>
              </div>
            </section>

            <blockquote><p>Em produto de confiança, a melhor feature é não quebrar.</p><cite className="c-mono">— Nei Girão</cite></blockquote>

            <section id="aprendizados">
              <h2><span className="n">05 — Aprendizados</span>O que eu levaria para o próximo produto</h2>
              <ol className="c-lessons">
                <li><strong>Medir vem antes de melhorar.</strong> Sem um ponto de partida, qualquer resultado vira opinião. Investir cedo em instrumentação economizou meses de discussão.</li>
                <li><strong>Confiança também é design.</strong> Mostrar o preço cedo, usar linguagem clara e não ter falhas no checkout fizeram mais pela conversão do que mudanças visuais.</li>
                <li><strong>As áreas reguladoras fazem parte do squad.</strong> Trazer atuária e jurídico para o discovery, em vez de só para a aprovação final, deixou o ciclo de entrega mais rápido.</li>
              </ol>
            </section>

            <section style={{ marginBottom: 0 }}>
              <span className="c-mono" style={{ color: 'var(--case-muted)', display: 'block', marginBottom: 14 }}>Ferramentas e métodos</span>
              <div className="c-chips">
                {['Discovery', 'Scrum / Kanban', 'Design Thinking', 'Google Analytics', 'Dynatrace', 'Azure Monitor'].map(c => (
                  <span key={c} className="c-chip">{c}</span>
                ))}
              </div>
            </section>
          </article>
        </div>

        <section className="c-cta">
          <div className="c-wrap">
            <h2>Montando um time de produto em <em>seguros ou fintech</em>?</h2>
            <div className="acts">
              <a className="c-btn pri" href="mailto:neigirao@gmail.com?subject=Sobre%20o%20case%20Seguro%20de%20Vida">Falar comigo</a>
              <a className="c-btn" href="https://www.linkedin.com/in/neigirao/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </section>

        <nav className="c-wrap c-next" aria-label="Próximo case">
          <Link to="/projeto/nei-girao-ecommerce-previdencia-privada">
            <div><span className="c-mono">Próximo case</span><div className="t">Ecommerce de Previdência Privada</div></div>
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
