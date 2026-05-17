import { useSiteSettings } from "@/hooks/useSiteSettings";
import { AUTHOR_EMAIL, AUTHOR_LINKEDIN } from "@/config/constants";

export function MastheadSection() {
  const { settings } = useSiteSettings();
  const cvUrl = settings.cv_file_url || "#";
  const email = settings.contact_email || AUTHOR_EMAIL;
  const linkedin = settings.contact_linkedin || AUTHOR_LINKEDIN;

  return (
    <header className="ed-mast">
      <div className="ed-mast-left">
        <span className="ed-mast-title">Nei Girão</span>
        <span className="ed-mast-sub">Edição 2026 · Vol. XV</span>
      </div>
      <nav className="ed-mast-right">
        <a href="#cases">Cases</a>
        <span className="ed-sep">·</span>
        <a href="#work">Experiência</a>
        <span className="ed-sep">·</span>
        <a href="#projects">Projetos</a>
        <span className="ed-sep">·</span>
        <a href="#contact">Contato</a>
        <a
          className="ed-mast-cta"
          href={cvUrl}
          download
          aria-label="Baixar CV"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" />
          </svg>
          Baixar CV
        </a>
      </nav>
    </header>
  );
}
