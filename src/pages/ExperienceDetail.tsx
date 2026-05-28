import { useParams, Link, useNavigate } from 'react-router-dom';
import { useExperienceDetail, useRelatedExperiences, generateSlug } from '@/hooks/usePortfolioDetail';
import { useSkillsForExperience, useSeeAlso } from '@/hooks/useRelatedContent';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema';
import { BASE_URL } from '@/config/constants';
import { SafeHTML } from '@/components/admin/SafeHTML';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function ExperienceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { settings } = useSiteSettings();
  const cvUrl = settings.cv_file_url || '/cv-nei-girao.pdf';
  const { data: experience, isLoading, error } = useExperienceDetail(slug || '');
  const { data: relatedExperiences } = useRelatedExperiences(
    experience?.company || '',
    experience?.id || ''
  );
  const relatedSkills = useSkillsForExperience(experience?.description || '');
  const seeAlsoItems = useSeeAlso(relatedSkills, 4);

  if (isLoading) {
    return (
      <div className="ed-root" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="ed-mono" style={{ color: 'var(--ed-muted)' }}>Carregando…</span>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="ed-root" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24 }}>
        <p style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontStyle: 'italic' }}>Experiência não encontrada</p>
        <button className="pp-btn pp-btn-sec" onClick={() => navigate('/')}>← Voltar ao portfólio</button>
      </div>
    );
  }

  const canonicalSlug = experience.slug || generateSlug(`${experience.role}-${experience.company}`);
  const exp = experience as any;

  const hasSTAR = !!(exp.case_challenge && exp.case_solution);
  const bodyContent = exp.case_body || experience.description || '';

  return (
    <div className="ed-root">
      <SEOHead
        title={experience.meta_title || `${experience.role} — ${experience.company}`}
        description={exp.excerpt || experience.meta_description || experience.description.slice(0, 160)}
        canonicalUrl={`${BASE_URL}/experiencia/${canonicalSlug}`}
        ogType="article"
        ogImage={experience.logo_url || undefined}
        keywords={[experience.role, experience.company, 'experiência profissional', 'product manager', 'Nei Girão']}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `${experience.role} na ${experience.company}`,
        "description": experience.meta_description || experience.description.slice(0, 160),
        "url": `${BASE_URL}/experiencia/${canonicalSlug}`,
        "author": { "@type": "Person", "name": "Nei Girão", "url": BASE_URL },
        "publisher": { "@type": "Person", "name": "Nei Girão", "url": BASE_URL },
        "mainEntityOfPage": `${BASE_URL}/experiencia/${canonicalSlug}`,
        "datePublished": exp.created_at || undefined,
        "dateModified": exp.updated_at || undefined,
        "about": { "@type": "OrganizationRole", "roleName": experience.role, "startDate": experience.period.split(' - ')[0] },
        "mentions": { "@type": "Organization", "name": experience.company, ...(experience.logo_url ? { "logo": experience.logo_url } : {}) }
      }) }} />
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Experiências', url: '/#experience' },
        { name: `${experience.role} — ${experience.company}` },
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
          <Link to="/#experience">Experiência</Link>
          <span className="ed-sep">·</span>
          <Link to="/#projects">Projetos</Link>
          <span className="ed-sep">·</span>
          <Link to="/#contact">Contato</Link>
        </nav>
      </header>

      {/* BREADCRUMB */}
      <div className="ed-container">
        <div className="pp-crumb">
          <Link to="/">Nei Girão</Link>
          <span className="pp-crumb-sep">/</span>
          <Link to="/#experience">Trajetória</Link>
          <span className="pp-crumb-sep">/</span>
          <span className="pp-crumb-current">{experience.company}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="pp-hero">
        <div className="ed-container">
          <div className="pp-brand-row">
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ed-muted)' }}>
              {experience.period}
            </span>
          </div>
          <h1 className="pp-title ed-display">{exp.case_title || experience.role}</h1>
          <div className="pp-role">{experience.company}</div>
          {exp.excerpt && (
            <p style={{ marginTop: 16, fontFamily: 'Source Serif 4, Georgia, serif', fontSize: 18, lineHeight: 1.6, color: 'var(--ed-muted)', maxWidth: 640 }}>{exp.excerpt}</p>
          )}
        </div>
      </section>

      {/* BODY */}
      <section className="pp-body">
        <div className="ed-container">
          <div className="pp-grid">
            {/* SIDEBAR */}
            <aside className="pp-side">
              {experience.logo_url && (
                <div className="pp-side-block">
                  <div className="pp-side-head">Empresa</div>
                  <img
                    src={experience.logo_url}
                    alt={`${experience.company} logo`}
                    loading="lazy"
                    style={{ maxWidth: 120, maxHeight: 60, objectFit: 'contain', display: 'block' }}
                  />
                </div>
              )}

              {exp.case_result && (
                <div className="pp-side-block">
                  <div className="pp-side-head">Resultado</div>
                  {exp.case_result.split(/\s*·\s*/).map((r: string, i: number) => (
                    <span key={i} className="pp-outcome">{r}</span>
                  ))}
                </div>
              )}

              {seeAlsoItems.length > 0 && (
                <div className="pp-side-block">
                  <div className="pp-side-head">Skills</div>
                  {seeAlsoItems.map(skill => (
                    <div key={skill.id} className="pp-stack-item">
                      <Link to={`/skill/${skill.slug || skill.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {skill.title}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </aside>

            {/* MAIN */}
            <div className="pp-main">
              {hasSTAR ? (
                <>
                  <div className="pp-section">
                    <h2>Desafio</h2>
                    <SafeHTML html={exp.case_challenge} className="pp-prose" />
                  </div>
                  <div className="pp-section">
                    <h2>Solução</h2>
                    <SafeHTML html={exp.case_solution} className="pp-prose" />
                  </div>
                </>
              ) : (
                <div className="pp-section">
                  <h2>Sobre esta experiência</h2>
                  <SafeHTML html={bodyContent} className="pp-prose" />
                </div>
              )}

              {relatedExperiences && relatedExperiences.length > 0 && (
                <div className="pp-section">
                  <h2>Outras experiências na {experience.company}</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {relatedExperiences.map(rel => (
                      <Link
                        key={rel.id}
                        to={`/experiencia/${rel.slug || rel.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <div style={{ padding: '12px 0', borderBottom: '1px solid var(--ed-line)' }}>
                          <div style={{ fontWeight: 500, fontSize: 15 }}>{rel.role}</div>
                          <div style={{ fontSize: 13, color: 'var(--ed-muted)', marginTop: 2 }}>{rel.period}</div>
                        </div>
                      </Link>
                    ))}
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
              Quer conversar sobre <em>esta experiência</em>?
            </h3>
            <div className="pp-cta-actions">
              <a
                className="pp-btn pp-btn-pri"
                href={`mailto:neigirao@gmail.com?subject=${encodeURIComponent('Sobre: ' + experience.role + ' — ' + experience.company)}`}
              >
                Falar comigo
              </a>
              <a href={cvUrl} download className="pp-btn pp-btn-sec">Baixar CV</a>
              <button className="pp-btn pp-btn-ghost" onClick={() => navigate('/#experience')}>
                Ver trajetória ↑
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
