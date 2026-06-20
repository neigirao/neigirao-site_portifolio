import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProjectDetail, generateSlug } from '@/hooks/usePortfolioDetail';
import { useProjects } from '@/hooks/usePortfolioData';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema';
import { BASE_URL } from '@/config/constants';
import { SafeHTML } from '@/components/admin/SafeHTML';
import { useExperiencesForProject, useSkillsForProject } from '@/hooks/useRelatedContent';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading, error } = useProjectDetail(slug || '');
  const { projects: allProjects } = useProjects();

  const idx = allProjects.findIndex(p => p.slug === slug);
  const prev = idx > 0 ? allProjects[idx - 1] : null;
  const next = idx < allProjects.length - 1 ? allProjects[idx + 1] : null;

  const relatedExperiences = useExperiencesForProject(project?.tags || null, project?.description || '');
  const relatedSkills = useSkillsForProject(project?.tags || null, project?.description || '');

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

  const canonicalSlug = project.slug || generateSlug(project.title);

  const outcomePills = project.highlight_metric
    ? project.highlight_metric.split(/\s*·\s*/).map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="ed-root">
      <SEOHead
        title={project.meta_title || project.title}
        description={project.meta_description || (project.description || '').slice(0, 160)}
        canonicalUrl={`${BASE_URL}/projeto/${canonicalSlug}`}
        ogType="article"
        ogImage={project.image_url || undefined}
        keywords={[project.title, ...(project.tags || []), 'projeto', 'case', 'Nei Girão']}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.meta_description || (project.description || '').slice(0, 160),
        "url": `${BASE_URL}/projeto/${canonicalSlug}`,
        "author": { "@type": "Person", "name": "Nei Girão", "url": BASE_URL },
        ...(project.image_url ? { "image": project.image_url } : {}),
        ...(project.link ? { "mainEntityOfPage": project.link } : {}),
        ...(project.tags ? { "keywords": project.tags.join(", ") } : {}),
      }) }} />
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Projetos', url: '/#projects' },
        { name: project.title },
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
          <Link to="/#projects">Projetos</Link>
          <span className="ed-sep">·</span>
          <Link to="/#work">Experiência</Link>
          <span className="ed-sep">·</span>
          <Link to="/#contact">Contato</Link>
        </nav>
      </header>

      {/* BREADCRUMB */}
      <div className="ed-container">
        <div className="pp-crumb">
          <Link to="/">Nei Girão</Link>
          <span className="pp-crumb-sep">/</span>
          <Link to="/#projects">Produtos vivos</Link>
          <span className="pp-crumb-sep">/</span>
          <span className="pp-crumb-current">{project.brand || project.title}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="pp-hero">
        <div className="ed-container">
          <div className="pp-brand-row">
            {project.brand && <span>{project.brand}</span>}
            {project.brand && project.highlight_metric && <span className="pp-brand-sep">·</span>}
            {project.highlight_metric && <span style={{ color: 'var(--ed-muted)' }}>{project.highlight_metric}</span>}
          </div>
          <h1 className="pp-title ed-display">{project.title}</h1>
          {project.project_subtitle && (
            <div className="pp-role">{project.project_subtitle}</div>
          )}
        </div>
      </section>

      {/* SCREENSHOT / GALLERY */}
      <ProjectGallery
        images={[project.image_url, ...((project as any).images || [])].filter(Boolean) as string[]}
        title={project.title}
        brand={project.brand}
      />


      {/* BODY */}
      <section className="pp-body">
        <div className="ed-container">
          <div className="pp-grid">
            {/* SIDEBAR */}
            <aside className="pp-side">
              {outcomePills.length > 0 && (
                <div className="pp-side-block">
                  <div className="pp-side-head">Resultado</div>
                  {outcomePills.map((o, i) => (
                    <span key={i} className="pp-outcome">{o}</span>
                  ))}
                </div>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="pp-side-block">
                  <div className="pp-side-head">Ferramental</div>
                  {project.tags.map((tag, i) => (
                    <div key={i} className="pp-stack-item">{tag}</div>
                  ))}
                </div>
              )}

              {project.link && (
                <div className="pp-side-block">
                  <div className="pp-side-head">Link</div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="pp-ext-link">
                    Ver produto ↗
                  </a>
                </div>
              )}
            </aside>

            {/* MAIN CONTENT */}
            <div className="pp-main">
              {project.context && (
                <div className="pp-section">
                  <h2>Contexto</h2>
                  <SafeHTML html={project.context} className="pp-prose" />
                </div>
              )}

              {project.description && (
                <div className="pp-section">
                  <h2>O que eu fiz</h2>
                  <SafeHTML html={project.description} className="pp-prose" />
                </div>
              )}

              {project.challenge && (
                <div className="pp-section">
                  <h2>Desafio</h2>
                  <SafeHTML html={project.challenge} className="pp-prose" />
                </div>
              )}

              {project.solution && (
                <div className="pp-section">
                  <h2>Solução</h2>
                  <SafeHTML html={project.solution} className="pp-prose" />
                </div>
              )}

              {project.results && (
                <div className="pp-section">
                  <h2>Resultados</h2>
                  <SafeHTML html={project.results} className="pp-prose" />
                </div>
              )}

              {project.learnings && (
                <div className="pp-section">
                  <h2>Aprendizados</h2>
                  <SafeHTML html={project.learnings} className="pp-prose" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* RELATED CONTENT */}
      {(relatedExperiences.length > 0 || relatedSkills.length > 0) && (
        <section style={{ borderTop: '1px solid var(--ed-line)', padding: '48px 0' }}>
          <div className="ed-container">
            <div style={{ display: 'grid', gap: 40, gridTemplateColumns: relatedExperiences.length > 0 && relatedSkills.length > 0 ? '1fr 1fr' : '1fr' }}>
              {relatedExperiences.length > 0 && (
                <div>
                  <div className="ed-mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ed-muted)', marginBottom: 16 }}>Experiências relacionadas</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {relatedExperiences.map(exp => (
                      <Link key={exp.id} to={`/experiencia/${exp.slug || exp.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ padding: '12px 0', borderBottom: '1px solid var(--ed-line)' }}>
                          <div style={{ fontWeight: 500, fontSize: 15 }}>{exp.title}</div>
                          {exp.subtitle && <div style={{ fontSize: 13, color: 'var(--ed-muted)', marginTop: 2 }}>{exp.subtitle}</div>}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {relatedSkills.length > 0 && (
                <div>
                  <div className="ed-mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ed-muted)', marginBottom: 16 }}>Habilidades relacionadas</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {relatedSkills.map(skill => (
                      <Link key={skill.id} to={`/skill/${skill.slug || skill.id}`} style={{ textDecoration: 'none' }}>
                        <span style={{ display: 'inline-block', padding: '6px 14px', border: '1px solid var(--ed-line)', borderRadius: 20, fontSize: 13, color: 'var(--ed-fg)', transition: 'border-color 0.15s' }}>
                          {skill.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA STRIP */}
      <section className="pp-cta">
        <div className="ed-container">
          <div className="pp-cta-grid">
            <h3>
              Quer conversar sobre <em>este projeto</em>?
            </h3>
            <div className="pp-cta-actions">
              <a
                className="pp-btn pp-btn-pri"
                href={`mailto:neigirao@gmail.com?subject=${encodeURIComponent('Sobre o projeto: ' + project.title)}`}
              >
                Falar comigo
              </a>
              <button className="pp-btn pp-btn-sec" onClick={() => navigate('/#contact')}>
                Ver contato
              </button>
              <a
                className="pp-btn pp-btn-ghost"
                href="https://linkedin.com/in/neigirao"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PREV / NEXT NAV */}
      <section className="pp-nav">
        <div className="ed-container">
          <div className="pp-nav-grid">
            {prev ? (
              <Link to={`/projeto/${prev.slug}`} className="pp-nav-link">
                <span className="pp-nav-dir">← Projeto anterior</span>
                <span className="pp-nav-title">{prev.title}</span>
                {prev.brand && <span className="pp-nav-brand">{prev.brand}</span>}
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/projeto/${next.slug}`} className="pp-nav-link pp-nav-next">
                <span className="pp-nav-dir">Próximo projeto →</span>
                <span className="pp-nav-title">{next.title}</span>
                {next.brand && <span className="pp-nav-brand">{next.brand}</span>}
              </Link>
            ) : <div />}
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

function ProjectGallery({ images, title, brand }: { images: string[]; title: string; brand: string | null }) {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(1);
  const count = images.length;

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    onSelect();
    api.on('select', onSelect);
    return () => { api.off('select', onSelect); };
  }, [api]);

  const caption = count > 0
    ? `${brand ? brand + ' · ' : ''}${title}${count > 1 ? ` · Imagem ${current} de ${count}` : ''}`
    : '— Imagem não disponível —';

  return (
    <section className="pp-shot">
      <div className="ed-container">
        {count === 0 ? (
          <div className="pp-shot-frame">
            <div className="pp-shot-placeholder">
              <div className="pp-shot-glyph">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="14" rx="2"/>
                  <circle cx="8.5" cy="10.5" r="1.5"/>
                  <path d="M21 16l-5-5L8 19"/>
                </svg>
              </div>
              <div className="pp-shot-placeholder-title">Imagem do projeto</div>
            </div>
          </div>
        ) : count === 1 ? (
          <div className="pp-shot-frame">
            <img src={images[0]} alt={title} loading="lazy" />
          </div>
        ) : (
          <div className="pp-shot-carousel">
            <Carousel setApi={setApi} opts={{ loop: true }}>
              <CarouselContent>
                {images.map((url, i) => (
                  <CarouselItem key={url + i}>
                    <div className="pp-shot-frame">
                      <img src={url} alt={`${title} — imagem ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            <div className="pp-shot-counter">{current} / {count}</div>
          </div>
        )}
        <div className="pp-shot-caption">{caption}</div>
      </div>
    </section>
  );
}
