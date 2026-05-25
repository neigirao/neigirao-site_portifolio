import { useSiteSettings } from "@/hooks/useSiteSettings";
import { parseJsonSetting } from "@/lib/siteSettingsHelpers";

const DEFAULT_NAV = [
  { label: "Cases", href: "#cases" },
  { label: "Experiência", href: "#work" },
  { label: "Projetos", href: "#projects" },
  { label: "Lab", href: "#lab" },
  { label: "Contato", href: "#contact" },
];

export function MastheadSection() {
  const { settings } = useSiteSettings();
  const cvUrl = settings.cv_file_url || "#";

  const brand = settings.masthead_brand || "Nei Girão";
  const edition = settings.masthead_edition || "Edição 2026 · Vol. XV";
  const ctaLabel = settings.masthead_cta_label || "Baixar CV";
  const nav = parseJsonSetting<{ label: string; href: string }[]>(settings.masthead_nav, DEFAULT_NAV);

  return (
    <header className="ed-mast">
      <div className="ed-mast-left">
        <span className="ed-mast-title">{brand}</span>
        <span className="ed-mast-sub">{edition}</span>
      </div>
      <nav className="ed-mast-right">
        {nav.map((item, i) => (
          <span key={item.href + i} style={{ display: "inline" }}>
            <a href={item.href}>{item.label}</a>
            {i < nav.length - 1 && <span className="ed-sep">·</span>}
          </span>
        ))}
        <a className="ed-mast-cta" href={cvUrl} download aria-label={ctaLabel}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" />
          </svg>
          {ctaLabel}
        </a>
      </nav>
    </header>
  );
}
