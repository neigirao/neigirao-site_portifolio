import { Link } from "react-router-dom";
import { useLabProjects } from "@/hooks/usePortfolioData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { SEOHead } from "@/components/SEO/SEOHead";
import { BASE_URL } from "@/config/constants";
import { SafeHTMLLite as SafeHTML } from "@/components/sections/SafeHTMLLite";

export default function Lab() {
  const { labProjects, isLoading } = useLabProjects();
  const { settings } = useSiteSettings();

  const titleHtml = settings.lab_title_html || "Estudos <em>fora</em> do trabalho.";
  const lead = settings.lab_lead || "Estudos pessoais e produtos construídos fora do horário de trabalho. Cada um com uma tese clara.";
  const brand = settings.site_name || "Nei Girão";

  return (
    <div className="ed-root">
      <SEOHead
        title="Lab · Nei Girão"
        description={lead}
        canonicalUrl={`${BASE_URL}/lab`}
      />

      <header className="ed-mast">
        <div className="ed-mast-left">
          <Link to="/" className="ed-mast-title">{brand}</Link>
          <span className="ed-mast-sub" style={{ color: "var(--ed-accent)" }}>Lab</span>
        </div>
        <nav className="ed-mast-right">
          <Link to="/">Início</Link>
          <span className="ed-sep">·</span>
          <Link to="/#contact">Contato</Link>
        </nav>
      </header>

      <main>
        <section className="ed-section" id="lab">
          <div className="ed-container">
            <div className="ed-section-head">
              <div>
                <div className="ed-section-num">Lab</div>
                <SafeHTML as="h1" className="ed-section-title" html={titleHtml} />
              </div>
              <p className="ed-section-lead">{lead}</p>
            </div>

            {isLoading ? (
              <div style={{ height: 200 }} />
            ) : labProjects.length === 0 ? (
              <p style={{ color: "var(--ed-muted)", textAlign: "center", padding: "4rem 0" }}>
                Nenhum projeto publicado ainda.
              </p>
            ) : (
              <div className="ed-lab">
                {labProjects.map((p) =>
                  p.slug ? (
                    <Link key={p.id} to={`/lab/${p.slug}`} className="ed-lab-card">
                      <div className="lab-row1">
                        <span className="lab-tag">{p.brand || "Lab"}</span>
                        <span>{p.year}</span>
                      </div>
                      <h2 className="lab-title">{p.title}</h2>
                      {p.category && <div className="lab-cat">{p.category}</div>}
                      {p.description && <p className="lab-desc">{p.description}</p>}
                      {p.why && (
                        <div className="lab-why">
                          <strong>Por que:</strong> {p.why}
                        </div>
                      )}
                    </Link>
                  ) : (
                    <div key={p.id} className="ed-lab-card">
                      <div className="lab-row1">
                        <span className="lab-tag">{p.brand || "Lab"}</span>
                        <span>{p.year}</span>
                      </div>
                      <h2 className="lab-title">{p.title}</h2>
                      {p.category && <div className="lab-cat">{p.category}</div>}
                      {p.description && <p className="lab-desc">{p.description}</p>}
                      {p.why && (
                        <div className="lab-why">
                          <strong>Por que:</strong> {p.why}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="ed-foot" style={{ background: "var(--ed-fg)", color: "#9B937B" }}>
        <div>© Nei Girão · 2026</div>
        <div>
          <Link to="/" style={{ color: "#9B937B", textDecoration: "none" }}>← Voltar ao portfólio</Link>
        </div>
      </footer>
    </div>
  );
}
