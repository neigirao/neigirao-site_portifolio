import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLabProjects, DbLabProject } from '@/hooks/usePortfolioData';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema';
import { BASE_URL } from '@/config/constants';
import { useSiteSettings } from '@/hooks/useSiteSettings';

function useLabDetail(slug: string) {
  return useQuery({
    queryKey: ['lab-project', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lab_projects')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return {
        ...data,
        actions: Array.isArray(data.actions) ? data.actions : [],
        outcomes: Array.isArray(data.outcomes) ? data.outcomes : [],
        stack: Array.isArray(data.stack) ? data.stack : [],
      } as DbLabProject;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!slug,
  });
}

export default function LabDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { settings } = useSiteSettings();
  const cvUrl = settings.cv_file_url || '/cv-nei-girao.pdf';
  const { data: project, isLoading, error } = useLabDetail(slug || '');
  const { labProjects } = useLabProjects();

  const idx = labProjects.findIndex(p => p.slug === slug);
  const prev = idx > 0 ? labProjects[idx - 1] : null;
  const next = idx < labProjects.length - 1 ? labProjects[idx + 1] : null;

  if (isLoading) {
    return (
      <div className="ed-root" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="ed-mono" style={{ color: 'var(--ed-muted)' }}>Carregando…</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="ed-root" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24 }}>
        <p style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontStyle: 'italic' }}>Projeto não encontrado</p>
        <button className="pp-btn pp-btn-sec" onClick={() => navigate('/')}>← Voltar ao portfólio</button>
      </div>
    );
  }

  return (
    <div className="ed-root">
      <SEOHead
        title={project.meta_title || `${project.title} — Lab · Nei Girão`}
        description={project.meta_description || project.description || ''}
        canonicalUrl={`${BASE_URL}/lab/${project.slug}`}
        ogType="article"
        keywords={[project.title, 'lab', 'projeto pessoal', 'Nei Girão', ...(project.stack || [])]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.meta_description || project.description || '',
        "url": `${BASE_URL}/lab/${project.slug}`,
        "author": { "@type": "Person", "name": "Nei Girão", "url": BASE_URL },
        "keywords": project.stack?.join(', ') || '',
        "genre": project.category || 'Lab project',
      }) }} />
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Lab', url: '/#lab' },
        { name: project.title },
      ]} />

      {/* Masthead */}
      <header className="pp-mast">
        <div className="pp-mast-inner">
          <Link to="/" className="pp-back">← {settings.site_name || 'Nei Girão'}</Link>
          <div className="pp-mast-right ed-mono">
            <span style={{ color: 'var(--ed-accent)' }}>Lab</span>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="pp-hero">
          <div className="pp-hero-inner">
            <div className="pp-hero-meta">
              <span className="ed-mono" style={{ color: 'var(--ed-accent)' }}>{project.brand || 'LAB'}</span>
              <span className="ed-mono" style={{ color: 'var(--ed-muted)', marginLeft: 12 }}>{project.year}</span>
            </div>
            <h1 className="pp-title">{project.title}</h1>
            {project.category && (
              <p className="pp-role" style={{ fontStyle: 'italic', color: 'var(--ed-muted)' }}>{project.category}</p>
            )}
          </div>
        </section>

        {/* Body */}
        <div className="pp-body">
          <div className="pp-body-inner">

            {/* Sidebar */}
            <aside className="pp-sidebar">
              {project.outcomes && project.outcomes.length > 0 && (
                <div className="pp-sidebar-block">
                  <div className="pp-sidebar-label">Resultados</div>
                  <div className="pp-outcomes">
                    {project.outcomes.map((o, i) => (
                      <span key={i} className="pp-outcome-chip">{o}</span>
                    ))}
                  </div>
                </div>
              )}

              {project.stack && project.stack.length > 0 && (
                <div className="pp-sidebar-block">
                  <div className="pp-sidebar-label">Stack</div>
                  <div className="pp-stack-chips">
                    {project.stack.map((s, i) => (
                      <span key={i} className="pp-stack-chip">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {project.why && (
                <div className="pp-sidebar-block">
                  <div className="pp-sidebar-label">Por que</div>
                  <p style={{ fontStyle: 'italic', color: 'var(--ed-muted)', fontSize: 15, lineHeight: 1.55, margin: 0 }}>{project.why}</p>
                </div>
              )}
            </aside>

            {/* Main Content */}
            <article className="pp-content">
              {project.context && (
                <section className="pp-section">
                  <h2 className="pp-section-label">Contexto</h2>
                  <p className="pp-text">{project.context}</p>
                </section>
              )}

              {project.actions && project.actions.length > 0 && (
                <section className="pp-section">
                  <h2 className="pp-section-label">O que eu fiz</h2>
                  <ol className="pp-action-list">
                    {project.actions.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ol>
                </section>
              )}
            </article>
          </div>
        </div>

        {/* CTA */}
        <section className="pp-cta">
          <div className="pp-cta-inner">
            <p className="pp-cta-text">
              Quer saber mais sobre meu trabalho ou conversar sobre produto?
            </p>
            <div className="pp-cta-btns">
              <Link to="/#contact" className="pp-btn pp-btn-pri">Falar comigo</Link>
              <a href={cvUrl} download className="pp-btn pp-btn-sec">Baixar CV</a>
            </div>
          </div>
        </section>

        {/* Prev / Next */}
        {(prev || next) && (
          <nav className="pp-nav">
            <div className="pp-nav-inner">
              {prev ? (
                <Link to={`/lab/${prev.slug}`} className="pp-nav-link pp-nav-prev">
                  <span className="pp-nav-dir">← Anterior</span>
                  <span className="pp-nav-title">{prev.title}</span>
                </Link>
              ) : <span />}
              {next ? (
                <Link to={`/lab/${next.slug}`} className="pp-nav-link pp-nav-next">
                  <span className="pp-nav-dir">Próximo →</span>
                  <span className="pp-nav-title">{next.title}</span>
                </Link>
              ) : <span />}
            </div>
          </nav>
        )}
      </main>

      <footer className="ed-foot" style={{ background: 'var(--ed-fg)', color: '#9B937B' }}>
        <div>© Nei Girão · 2026</div>
        <div>
          <Link to="/" style={{ color: '#9B937B', textDecoration: 'none' }}>← Voltar ao portfólio</Link>
        </div>
      </footer>
    </div>
  );
}
