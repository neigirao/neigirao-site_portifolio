import { useSiteSettings } from "@/hooks/useSiteSettings";
import { AUTHOR_EMAIL, AUTHOR_LINKEDIN } from "@/config/constants";

export function CoverSection() {
  const { settings } = useSiteSettings();

  const headline = settings.hero_headline || "Lidero produtos digitais que entregam resultado mensurável.";
  const years = settings.hero_years || "15+";
  const companiesCount = settings.hero_companies_count || "5";
  const email = settings.contact_email || AUTHOR_EMAIL;
  const linkedin = settings.contact_linkedin || AUTHOR_LINKEDIN;
  const cvUrl = settings.cv_file_url || "#";
  const location = settings.hero_location || "Rio de Janeiro, Brasil";

  return (
    <section className="ed-cover">
      <div className="ed-container">
        <div className="ed-cover-issue ed-mono">
          <span>Perfil № 01</span>
          <span className="center">— Um Product Leader, em quinze anos —</span>
          <span>{location}</span>
        </div>

        <h1 className="ed-name">Nei Girão</h1>

        <div className="ed-deck-line">
          <div className="stat">
            <strong>{years}</strong>anos
          </div>
          <div className="role">{headline}</div>
          <div className="stat">
            <strong>{companiesCount}</strong>companhias
          </div>
        </div>

        <div className="ed-cover-cta">
          <div className="ed-email-line">
            Para conversar, escreva para{" "}
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <div className="group">
            <a className="ed-btn ed-btn-pri" href={`mailto:${email}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16v12H4z" /><path d="M4 6l8 7 8-7" />
              </svg>
              Falar comigo
            </a>
            <a className="ed-btn ed-btn-sec" href={cvUrl} download>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" />
              </svg>
              Baixar CV (.pdf)
            </a>
            <a className="ed-btn ed-btn-ghost" href={linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
