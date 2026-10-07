import { useState } from "react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { parseJsonSetting } from "@/lib/siteSettingsHelpers";

const DEFAULT_NAV = [
  { label: "Cases", href: "#cases" },
  { label: "Experiência", href: "#work" },
  { label: "Projetos", href: "#projects" },
  { label: "Lab", href: "/lab" },
  { label: "Contato", href: "#contact" },
];

export function MastheadSection() {
  const { settings } = useSiteSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const cvUrl = settings.cv_file_url || "#";

  const brand = settings.masthead_brand || "Nei Girão";
  const edition = settings.masthead_edition || "Edição 2026 · Vol. XV";
  const ctaLabel = settings.masthead_cta_label || "Baixar CV";
  const nav = parseJsonSetting<{ label: string; href: string }[]>(settings.masthead_nav, DEFAULT_NAV);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="ed-mast">
      <div className="ed-mast-left">
        <span className="ed-mast-title">{brand}</span>
        <span className="ed-mast-sub">{edition}</span>
      </div>
      <nav className="ed-mast-right">
        {nav.map((item, i) => (
          <span key={item.href + i} style={{ display: "inline" }}>
            {item.href.startsWith("/") && !item.href.startsWith("/#") ? (
              <Link to={item.href}>{item.label}</Link>
            ) : (
              <a href={item.href}>{item.label}</a>
            )}
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
      <button
        className="ed-mast-burger"
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(o => !o)}
      >
        {menuOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      {menuOpen && (
        <nav className="ed-mast-mobile-menu" onClick={handleNavClick}>
          {nav.map((item, i) => (
            item.href.startsWith("/") && !item.href.startsWith("/#") ? (
              <Link key={item.href + i} to={item.href}>{item.label}</Link>
            ) : (
              <a key={item.href + i} href={item.href}>{item.label}</a>
            )
          ))}
          <a className="ed-mast-cta" href={cvUrl} download aria-label={ctaLabel}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" />
            </svg>
            {ctaLabel}
          </a>
        </nav>
      )}
    </header>
  );
}
