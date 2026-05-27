import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSkillDetail, generateSlug } from '@/hooks/usePortfolioDetail';
import { useExperiences, useProjects } from '@/hooks/usePortfolioData';
import { useProjectsForSkill, useSeeAlso } from '@/hooks/useRelatedContent';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema';
import { BASE_URL } from '@/config/constants';
import { OptimizedImage } from '@/components/ui/optimized-image';
import SeeAlso from '@/components/SeeAlso';

const skillDescriptions: Record<string, string> = {
  'Dynatrace': 'Expertise em Dynatrace para Application Performance Monitoring (APM), monitoramento de infraestrutura e análise de experiência digital. Implementação de dashboards, alertas e otimização de performance.',
  'Grafana': 'Domínio em Grafana para visualização de dados e criação de dashboards customizados. Integração com múltiplas fontes de dados para monitoramento unificado.',
  'Azure Monitor': 'Experiência em Azure Monitor para observabilidade completa na nuvem Microsoft. Configuração de alertas, diagnósticos e análise de logs.',
  'Google Analytics': 'Proficiência em Google Analytics para análise de comportamento de usuários, tracking de conversões e geração de insights para otimização de produtos digitais.',
  'Product Management': 'Gestão estratégica de produtos digitais com foco em resultados. Definição de roadmap, priorização de backlog e alinhamento com stakeholders.',
  'Agile/Scrum': 'Metodologias ágeis para gestão de projetos e equipes. Experiência como Product Owner e Scrum Master em times multidisciplinares.',
  'Data Analysis': 'Análise de dados para tomada de decisões baseadas em evidências. Criação de métricas, KPIs e cultura data-driven.',
};

export default function SkillDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: skill, isLoading, error } = useSkillDetail(slug || '');
  const { experiences } = useExperiences();
  const { projects } = useProjects();

  if (isLoading) {
    return (
      <div className="ed-root" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="ed-mono" style={{ color: 'var(--ed-muted)' }}>Carregando…</span>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="ed-root" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24 }}>
        <p style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontStyle: 'italic' }}>Habilidade não encontrada</p>
        <button className="pp-btn pp-btn-sec" onClick={() => navigate('/')}>← Voltar ao portfólio</button>
      </div>
    );
  }

  const canonicalSlug = skill.slug || generateSlug(skill.name);
  const description = skill.meta_description || skillDescriptions[skill.name] ||
    `Habilidade em ${skill.name} desenvolvida ao longo de +15 anos de experiência em produtos digitais e observabilidade.`;

  const relatedExperiences = experiences.filter(exp =>
    exp.description.toLowerCase().includes(skill.name.toLowerCase())
  ).slice(0, 3);

  const relatedProjectsFromHook = useProjectsForSkill(skill?.name || '');

  const relatedProjects = projects.filter(proj =>
    proj.tags?.some(tag => tag.toLowerCase().includes(skill.name.toLowerCase())) ||
    proj.description.toLowerCase().includes(skill.name.toLowerCase())
  ).slice(0, 3);

  const seeAlsoItems = useSeeAlso([
    ...relatedExperiences.map(exp => ({
      id: exp.id,
      slug: exp.slug,
      title: exp.role,
      subtitle: `${exp.company} • ${exp.period}`,
      type: 'experience' as const
    })),
    ...relatedProjectsFromHook
  ], 5);

  return (
    <div className="ed-root">
      <SEOHead
        title={skill.meta_title || `${skill.name} - Habilidades`}
        description={description}
        canonicalUrl={`${BASE_URL}/skill/${canonicalSlug}`}
        ogType="article"
        keywords={[skill.name, skill.category || 'habilidade', 'expertise', 'competência', 'Nei Girão']}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `${skill.name} - Expertise de Nei Girão`,
        "description": description,
        "url": `${BASE_URL}/skill/${canonicalSlug}`,
        "author": { "@type": "Person", "name": "Nei Girão", "url": BASE_URL },
        "publisher": { "@type": "Person", "name": "Nei Girão", "url": BASE_URL },
        "mainEntityOfPage": `${BASE_URL}/skill/${canonicalSlug}`,
        "datePublished": (skill as any).created_at || undefined,
        "dateModified": (skill as any).updated_at || undefined,
        "about": {
          "@type": "Thing",
          "name": skill.name,
          ...(skill.category ? { "additionalType": skill.category } : {})
        }
      }) }} />
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Habilidades', url: '/#skills' },
        { name: skill.name },
      ]} />

      {/* MASTHEAD */}
      <header className="ed-mast">
        <div className="ed-mast-left">
          <Link to="/" className="ed-mast-title">Nei Girão</Link>
          <span className="ed-mast-sub">Edição 2026 · Vol. XV</span>
        </div>
        <nav className="ed-mast-right">
          <Link to="/">Início</Link>
          <span className="ed-sep">·</span>
          <Link to="/#skills">Habilidades</Link>
          <span className="ed-sep">·</span>
          <Link to="/#projects">Projetos</Link>
          <span className="ed-sep">·</span>
          <Link to="/contato">Contato</Link>
        </nav>
      </header>

      {/* BREADCRUMB */}
      <div className="ed-container">
        <div className="pp-crumb">
          <Link to="/">Nei Girão</Link>
          <span className="pp-crumb-sep">/</span>
          <Link to="/#skills">Habilidades</Link>
          <span className="pp-crumb-sep">/</span>
          <span className="pp-crumb-current">{skill.name}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="pp-hero">
        <div className="ed-container">
          <div className="pp-brand-row">
            {skill.category && <span>{skill.category}</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 16 }}>
            {skill.logo_url && (
              <div style={{ width: 64, height: 64, borderRadius: 8, background: 'var(--ed-paper)', border: '1px solid var(--ed-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12, flexShrink: 0 }}>
                <OptimizedImage
                  src={skill.logo_url}
                  alt={`${skill.name} logo`}
                  className="w-full h-full"
                  priority
                />
              </div>
            )}
            <h1 className="pp-title ed-display" style={{ margin: 0 }}>{skill.name}</h1>
          </div>
          <div className="pp-role">{description}</div>
        </div>
      </section>

      {/* BODY */}
      <section className="pp-body">
        <div className="ed-container">
          <div className="pp-grid">
            {/* SIDEBAR */}
            <aside className="pp-side">
              {skill.category && (
                <div className="pp-side-block">
                  <div className="pp-side-head">Categoria</div>
                  <div className="pp-stack-item" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 14 }}>{skill.category}</div>
                </div>
              )}

              {seeAlsoItems.length > 0 && (
                <div className="pp-side-block">
                  <div className="pp-side-head">Ver também</div>
                  <SeeAlso items={seeAlsoItems} />
                </div>
              )}
            </aside>

            {/* MAIN */}
            <div className="pp-main">
              {/* Related Experiences */}
              {relatedExperiences.length > 0 && (
                <div className="pp-section">
                  <h2>Experiências com {skill.name}</h2>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {relatedExperiences.map((exp) => (
                      <Link key={exp.id} to={`/experiencia/${exp.slug || exp.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ padding: '20px 0', borderBottom: '1px solid var(--ed-line)', transition: 'padding .15s' }}
                          onMouseEnter={e => (e.currentTarget.style.paddingLeft = '8px')}
                          onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}
                        >
                          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 440, letterSpacing: '-0.01em', marginBottom: 4 }}>
                            {exp.role}
                          </div>
                          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ed-muted)' }}>
                            {exp.company} · {exp.period}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <div className="pp-section">
                  <h2>Projetos Relacionados</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 0, borderTop: '1px solid var(--ed-line)' }}>
                    {relatedProjects.map((proj) => (
                      <Link key={proj.id} to={`/projeto/${proj.slug || proj.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ padding: 24, borderRight: '1px solid var(--ed-line)', borderBottom: '1px solid var(--ed-line)', transition: 'background .15s', cursor: 'pointer' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'var(--ed-paper)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 440, letterSpacing: '-0.01em', marginBottom: 8 }}>
                            {proj.title}
                          </div>
                          <div style={{ fontSize: 14, color: 'var(--ed-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {(proj.description || '').replace(/<[^>]*>/g, '').slice(0, 120)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {relatedExperiences.length === 0 && relatedProjects.length === 0 && (
                <div className="pp-section">
                  <div className="pp-prose">
                    <p>{description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pp-cta">
        <div className="ed-container">
          <div className="pp-cta-grid">
            <h3>
              Quer saber mais sobre <em>minhas habilidades</em>?
            </h3>
            <div className="pp-cta-actions">
              <button className="pp-btn pp-btn-pri" onClick={() => navigate('/contato')}>
                Falar comigo
              </button>
              <button className="pp-btn pp-btn-ghost" onClick={() => navigate('/#skills')}>
                Ver todas as skills ↑
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pp-foot">
        <div>© Nei Girão · 2026</div>
        <div>
          <Link to="/" style={{ color: '#E27464' }}>← Voltar ao site</Link>
        </div>
      </footer>
    </div>
  );
}
