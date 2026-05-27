import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SEO/BreadcrumbSchema";
import { useExperiences, useSkills, useEducation } from "@/hooks/usePortfolioData";
import { prefetchRoute } from "@/utils/prefetch";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { AUTHOR_EMAIL, AUTHOR_LINKEDIN, BASE_URL } from "@/config/constants";
import { SafeHTML } from "@/components/admin/SafeHTML";

export default function Sobre() {
  const { experiences } = useExperiences();
  const { skills } = useSkills();
  const { education } = useEducation();
  const { settings } = useSiteSettings();
  const cvUrl = settings.cv_file_url || '/cv-nei-girao.pdf';

  const skillsByCategory = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    const cat = skill.category || "Geral";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nei Girão",
    "jobTitle": "Product Manager",
    "url": `${BASE_URL}/sobre`,
    "email": AUTHOR_EMAIL,
    "sameAs": [AUTHOR_LINKEDIN],
    "description": "Product Manager com +15 anos de experiência em Observabilidade e Produtos Digitais",
    "address": { "@type": "PostalAddress", "addressLocality": "Rio de Janeiro", "addressCountry": "BR" },
    "alumniOf": education.map(edu => ({ "@type": "EducationalOrganization", "name": edu.institution })),
    "worksFor": experiences[0] ? { "@type": "Organization", "name": experiences[0].company } : undefined,
    "knowsAbout": skills.map(s => s.name)
  };

  return (
    <div className="ed-root">
      <SEOHead
        title="Sobre Nei Girão - Product Manager | Observabilidade"
        description="Conheça Nei Girão: Product Manager com +15 anos liderando produtos digitais em Icatu Seguros, Oi, TIM e Globo. Expert em Dynatrace, Grafana e Azure Monitor."
        canonicalUrl={`${BASE_URL}/sobre`}
        ogType="profile"
        keywords={["Nei Girão", "Product Manager", "observabilidade", "Dynatrace", "Grafana", "Icatu", "TIM", "Oi", "Globo", "Rio de Janeiro"]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Sobre' },
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
          <Link to="/#experience">Trajetória</Link>
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
          <span className="pp-crumb-current">Sobre</span>
        </div>
      </div>

      {/* HERO */}
      <section className="pp-hero">
        <div className="ed-container">
          <div className="pp-brand-row">
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ed-muted)' }}>
              Rio de Janeiro · +15 anos
            </span>
          </div>
          <h1 className="pp-title ed-display">Nei Girão</h1>
          <div className="pp-role">Product Manager · Observabilidade & Produtos Digitais</div>
        </div>
      </section>

      {/* BODY */}
      <section className="pp-body">
        <div className="ed-container">
          <div className="pp-grid">
            {/* SIDEBAR */}
            <aside className="pp-side">
              <div className="pp-side-block">
                <div className="pp-side-head">Localização</div>
                <div className="pp-stack-item">Rio de Janeiro, Brasil</div>
              </div>

              <div className="pp-side-block">
                <div className="pp-side-head">Links</div>
                <a href={AUTHOR_LINKEDIN} target="_blank" rel="noopener noreferrer" className="pp-ext-link" style={{ display: 'block', marginBottom: 8 }}>
                  LinkedIn ↗
                </a>
                <a href={`mailto:${AUTHOR_EMAIL}`} className="pp-ext-link" style={{ display: 'block', marginBottom: 8 }}>
                  Email ↗
                </a>
                <a href={cvUrl} download className="pp-ext-link" style={{ display: 'block' }}>
                  Baixar CV ↗
                </a>
              </div>

              {Object.keys(skillsByCategory).length > 0 && (
                <div className="pp-side-block">
                  <div className="pp-side-head">Stack</div>
                  {Object.entries(skillsByCategory).slice(0, 2).map(([cat, catSkills]) => (
                    <div key={cat} style={{ marginBottom: 12 }}>
                      <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ed-accent)', marginBottom: 4 }}>{cat}</div>
                      {catSkills.slice(0, 5).map(skill => (
                        <Link key={skill.id} to={`/skill/${skill.slug || skill.name.toLowerCase()}`} onMouseEnter={() => prefetchRoute('/skill/')}>
                          <div className="pp-stack-item">{skill.name}</div>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </aside>

            {/* MAIN */}
            <div className="pp-main">
              {/* Bio */}
              <div className="pp-section">
                <h2>Resumo Profissional</h2>
                {settings.about_summary ? (
                  <SafeHTML html={settings.about_summary} className="pp-prose" />
                ) : (
                  <div className="pp-prose">
                    <p>
                      Profissional especializado em gestão estratégica de produtos digitais e Observabilidade,
                      com mais de 15 anos de experiência na liderança de equipes ágeis e multidisciplinares.
                    </p>
                    <p>
                      Trajetória inclui atuação em <strong>Icatu Seguros</strong>, <strong>Oi</strong>,{" "}
                      <strong>TIM Brasil</strong> e <strong>Rede Globo</strong>, liderando iniciativas de alta
                      relevância em produtos digitais, performance e inovação.
                    </p>
                    <p>
                      Diferencial em liderança de equipes com cultura analítica e data-driven, usando ferramentas
                      como <strong>Dynatrace</strong>, <strong>Grafana</strong> e <strong>Azure Monitor</strong>.
                    </p>
                  </div>
                )}
              </div>

              {/* Experience */}
              {experiences.length > 0 && (
                <div className="pp-section">
                  <h2>Trajetória Profissional</h2>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {experiences.map(exp => (
                      <Link
                        key={exp.id}
                        to={`/experiencia/${exp.slug || exp.company.toLowerCase()}`}
                        onMouseEnter={() => prefetchRoute('/experiencia/')}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <div style={{ padding: '20px 0', borderBottom: '1px solid var(--ed-line)', transition: 'padding .15s' }}
                          onMouseEnter={e => (e.currentTarget.style.paddingLeft = '8px')}
                          onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}
                        >
                          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 440, letterSpacing: '-0.01em', marginBottom: 4 }}>
                            {exp.role}
                          </div>
                          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ed-accent)', marginBottom: 6 }}>
                            {exp.company}
                            <span style={{ color: 'var(--ed-muted)', marginLeft: 12 }}>{exp.period}</span>
                          </div>
                          <div style={{ fontSize: 15, color: 'var(--ed-muted)', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {(exp.description || '').replace(/<[^>]*>/g, '').slice(0, 200)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div className="pp-section">
                  <h2>Formação Acadêmica</h2>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {education.map(edu => (
                      <div key={edu.id} style={{ padding: '18px 0', borderBottom: '1px dotted var(--ed-line)' }}>
                        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 440, letterSpacing: '-0.01em', marginBottom: 4 }}>
                          {edu.degree}
                        </div>
                        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ed-muted)' }}>
                          {edu.institution}
                          {edu.period && <span style={{ marginLeft: 12, color: 'var(--ed-accent)' }}>{edu.period}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All skills */}
              {Object.keys(skillsByCategory).length > 2 && (
                <div className="pp-section">
                  <h2>Habilidades & Competências</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 32 }}>
                    {Object.entries(skillsByCategory).map(([cat, catSkills]) => (
                      <div key={cat}>
                        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ed-accent)', marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid var(--ed-line)' }}>
                          {cat}
                        </div>
                        {catSkills.map(skill => (
                          <Link key={skill.id} to={`/skill/${skill.slug || skill.name.toLowerCase()}`} onMouseEnter={() => prefetchRoute('/skill/')}>
                            <div className="pp-stack-item">{skill.name}</div>
                          </Link>
                        ))}
                      </div>
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
              Vamos <em>conversar</em>?
            </h3>
            <div className="pp-cta-actions">
              <Link to="/contato" className="pp-btn pp-btn-pri">Entrar em contato</Link>
              <a href={cvUrl} download className="pp-btn pp-btn-sec">Baixar CV</a>
              <Link to="/" className="pp-btn pp-btn-ghost">Ver portfólio ↑</Link>
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
