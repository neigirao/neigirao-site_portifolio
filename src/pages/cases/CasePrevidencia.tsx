import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema';
import { BASE_URL } from '@/config/constants';
import '@/styles/cases.css';

export default function CasePrevidencia() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const links = [...document.querySelectorAll<HTMLAnchorElement>('.case-previdencia .c-toc ol a')];
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
    <div className="case-page case-previdencia">
      <SEOHead
        title="Case: ecommerce de Previdência Privada da Icatu — jornada digital de ponta a ponta | Nei Girão"
        description="Como desenhei a jornada digital de Previdência Privada da Icatu: decisões de produto para um produto de decisão longa, linguagem clara e funil instrumentado."
        canonicalUrl={`${BASE_URL}/projeto/nei-girao-ecommerce-previdencia-privada`}
        ogType="article"
        keywords={['Previdência Privada', 'Icatu', 'ecommerce', 'Product Manager', 'fundos', 'Nei Girão']}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "headline": "Previdência privada online: como simplificar um produto de decisão longa",
            "author": { "@type": "Person", "name": "Nei Girão", "url": BASE_URL },
            "about": { "@type": "Organization", "name": "Icatu Seguros" },
            "inLanguage": "pt-BR",
            "mainEntityOfPage": `${BASE_URL}/projeto/nei-girao-ecommerce-previdencia-privada`
          }
        ]
      }) }} />
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Projetos', url: '/#projects' },
        { name: 'Ecommerce Previdência Privada' },
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
            <h1 className="c-disp">Previdência privada online: <em>escolher um fundo</em> com a mesma clareza de quem compara preços</h1>
            <p className="c-dek">Escolher um fundo de previdência sempre exigiu um gerente explicando taxas, riscos e rentabilidade. Este é o caso de como colocamos tudo isso na tela, lado a lado, para o cliente decidir e contratar sozinho.</p>
            <div className="c-facts">
              <div className="c-fact"><div className="k c-mono">Meu papel</div><div className="v">Product Manager, dono do ecommerce</div></div>
              <div className="c-fact"><div className="k c-mono">Time</div><div className="v">2 squads · 17 pessoas</div></div>
              <div className="c-fact"><div className="k c-mono">Período</div><div className="v">2021 — 2024</div></div>
              <div className="c-fact"><div className="k c-mono">Resultado</div><div className="v big">+R$ 1 mi/mês</div></div>
            </div>
            <figure className="c-shot">
              <div className="c-frame">
                <div className="chrome"><i /><i /><i /></div>
                <img src="/assets/case-prev/fundos.png" alt="Vitrine de fundos de previdência da Icatu: fundos em destaque, filtros por risco e estratégia, termômetro de risco e tabela comparativa" loading="eager" />
              </div>
              <figcaption>A vitrine de fundos: destaques, filtros, termômetro de risco e uma tabela que compara taxa e rentabilidade. <a href="https://compraprevidencia.icatuseguros.com.br/home" target="_blank" rel="noopener noreferrer">Ver produto no ar ↗</a></figcaption>
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
              <a className="c-btn sm" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fneigirao.lovable.app%2Fprojeto%2Fnei-girao-ecommerce-previdencia-privada" target="_blank" rel="noopener noreferrer">Compartilhar no LinkedIn</a>
            </div>
          </aside>

          <article>
            <div className="c-tldr">
              <span className="c-mono">Resumo em 30 segundos</span>
              <ul>
                <li><strong>Desafio:</strong> vender previdência privada online, um produto de decisão longa que depende de comparar taxas, riscos e rentabilidade.</li>
                <li><strong>O que fiz:</strong> liderei o discovery e desenhei uma vitrine onde o cliente compara fundos e contrata sem precisar de um gerente.</li>
                <li><strong>Como:</strong> números lado a lado, risco traduzido em um termômetro visual, detalhe do fundo sem sair da lista e contratação em poucos passos.</li>
                <li><strong>Resultado:</strong> um novo canal de venda faturando mais de R$ 1 milhão por mês, com contratação 100% digital.</li>
              </ul>
            </div>

            <section id="problema">
              <h2><span className="n">01 — O problema</span>Uma compra que ninguém faz no impulso</h2>
              <p>Quem procura previdência privada pesquisa por semanas. Compara taxa de administração, rentabilidade e risco entre fundos com nomes longos e parecidos, e muitas vezes desiste no meio do caminho.</p>
              <p>Tradicionalmente, essa comparação acontecia numa conversa com um gerente. A Icatu queria um canal próprio, em que o cliente tivesse a mesma informação e a mesma segurança para decidir sozinho.</p>
            </section>

            <section id="papel">
              <h2><span className="n">02 — Meu papel</span>Dono do produto, do discovery ao pós-lançamento</h2>
              <p>Como Product Manager e coordenador de Produtos Digitais, eu respondia pelo ecommerce de ponta a ponta. Coordenava 2 squads com 17 pessoas e fazia a ponte com as áreas de investimentos, jurídico, marketing e growth.</p>
              <p>A estrutura que construímos no ecommerce de Seguro de Vida serviu de base, mas a jornada de Previdência precisou de decisões próprias.</p>
            </section>

            <section id="decisoes">
              <h2><span className="n">03 — Decisões</span>Três decisões que fizeram diferença</h2>
              <div className="c-decisions">
                <div className="c-dec">
                  <div className="num">1</div>
                  <div>
                    <h3>Colocar os números que importam lado a lado</h3>
                    <p>Taxa de administração, rentabilidade no ano e em 12 meses e aporte mínimo aparecem para todos os fundos, no mesmo formato. O cliente compara como compararia preços em qualquer loja.</p>
                    <div className="trade"><b>Trade-off</b>Mostrar tudo de forma aberta inclui os fundos com rentabilidade menor. Apostamos que transparência gera mais confiança do que uma vitrine seletiva.</div>
                  </div>
                </div>
                <div className="c-dec">
                  <div className="num">2</div>
                  <div>
                    <h3>Traduzir risco em algo visual</h3>
                    <p>Em vez de exigir que o cliente entenda classificações técnicas, criamos um termômetro de risco, de "muito baixo" a "muito alto", junto com filtros por estratégia e valor de investimento.</p>
                    <div className="trade"><b>Trade-off</b>Simplificar o risco em uma escala exigiu várias rodadas de validação com as áreas de investimentos e jurídico.</div>
                  </div>
                </div>
                <div className="c-dec">
                  <div className="num">3</div>
                  <div>
                    <h3>Aprofundar sem tirar o cliente da lista</h3>
                    <p>Ao clicar num fundo, os detalhes abrem num painel lateral: descrição, rentabilidades e histórico de 12, 24 e 36 meses. A lista continua ao fundo e o botão "Escolher este fundo" leva direto à contratação.</p>
                    <div className="trade"><b>Trade-off</b>Um painel tem menos espaço que uma página própria, então a descrição completa ficou atrás de um "Veja mais".</div>
                    <figure className="c-wide">
                      <div className="c-frame">
                        <div className="chrome"><i /><i /><i /></div>
                        <img src="/assets/case-prev/detalhe.png" alt="Painel lateral com detalhes de um fundo: descrição, rentabilidade no ano, em 12 meses e no último mês, gráfico de histórico e botão Escolher este fundo" loading="lazy" />
                      </div>
                      <figcaption>O detalhe do fundo abre ao lado da lista, com histórico de rentabilidade e o botão para seguir.</figcaption>
                    </figure>
                  </div>
                </div>
              </div>
              <figure className="c-wide">
                <div className="c-frame">
                  <div className="chrome"><i /><i /><i /></div>
                  <img src="/assets/case-prev/aporte.png" alt="Primeira etapa da contratação: escolha entre aporte mensal ou aporte único, com o valor mínimo informado" loading="lazy" />
                </div>
                <figcaption>A contratação começa com uma única pergunta: aporte mensal ou único, com o valor mínimo já informado.</figcaption>
              </figure>
            </section>

            <section id="resultado">
              <h2><span className="n">04 — Resultado</span>O que mudou</h2>
              <div className="c-result">
                <div className="big">+R$ 1 mi</div>
                <div><span className="c-mono">Faturamento por mês</span><p>Um canal de venda novo para a Icatu, que passou a faturar mais de R$ 1 milhão por mês só no digital.</p></div>
              </div>
              <div className="c-outs">
                <div className="c-out"><div className="t">+15% de conversão online</div><div className="d">Somando os ecommerces de Seguro de Vida e Previdência Privada.</div></div>
                <div className="c-out"><div className="t">Contratação 100% digital</div><div className="d">Da simulação ao primeiro aporte, sem precisar de atendimento.</div></div>
                <div className="c-out"><div className="t">Comparação transparente</div><div className="d">Taxa, risco e rentabilidade de todos os fundos no mesmo formato.</div></div>
              </div>
            </section>

            <blockquote><p>Num produto de longo prazo, a primeira coisa que você vende é clareza.</p><cite className="c-mono">— Nei Girão</cite></blockquote>

            <section id="aprendizados">
              <h2><span className="n">05 — Aprendizados</span>O que eu levaria para o próximo produto</h2>
              <ol className="c-lessons">
                <li><strong>Produto complexo pede jornada simples, não produto simples.</strong> Não dava para simplificar a previdência. Dava para simplificar o caminho até ela.</li>
                <li><strong>Reaproveitar a base acelera, mas não substitui o discovery.</strong> A estrutura do ecommerce de Vida economizou meses, mas o comportamento de quem compra previdência é outro.</li>
                <li><strong>Transparência vende.</strong> Mostrar todos os números, inclusive os menos favoráveis, deu ao cliente a confiança que antes vinha de um gerente.</li>
              </ol>
            </section>

            <section style={{ marginBottom: 0 }}>
              <span className="c-mono" style={{ color: 'var(--case-muted)', display: 'block', marginBottom: 14 }}>Ferramentas e métodos</span>
              <div className="c-chips">
                {['Discovery', 'Scrum / Kanban', 'Design de comparação', 'Google Analytics', 'Adobe Analytics', 'Dynatrace'].map(c => (
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
              <a className="c-btn pri" href="mailto:neigirao@gmail.com?subject=Sobre%20o%20case%20Previd%C3%AAncia">Falar comigo</a>
              <a className="c-btn" href="https://www.linkedin.com/in/neigirao/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </section>

        <nav className="c-wrap c-next" aria-label="Case anterior">
          <Link to="/projeto/ecommerce-seguro-de-vida-nei-girao">
            <div><span className="c-mono">Case anterior</span><div className="t">Ecommerce de Seguro de Vida</div></div>
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
