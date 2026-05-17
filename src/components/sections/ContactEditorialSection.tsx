import { useSiteSettings } from "@/hooks/useSiteSettings";
import { AUTHOR_EMAIL, AUTHOR_LINKEDIN, AUTHOR_WHATSAPP, AUTHOR_PHONE } from "@/config/constants";

export function ContactEditorialSection() {
  const { settings } = useSiteSettings();

  const pitch = settings.contact_pitch ||
    "Estou aberto a posições sênior de Product (Lead, Manager, Group PM, Head) — preferência por insurtech, fintech e produtos com escala. Mande uma mensagem.";
  const email = settings.contact_email || AUTHOR_EMAIL;
  const linkedin = settings.contact_linkedin || AUTHOR_LINKEDIN;
  const whatsapp = settings.contact_whatsapp || AUTHOR_WHATSAPP;
  const phone = settings.contact_phone || AUTHOR_PHONE;
  const cvUrl = settings.cv_file_url || "#";

  return (
    <section className="ed-contact" id="contact">
      <div className="ed-container">
        <div className="ed-mono" style={{ color: "#E27464", marginBottom: 24 }}>
          № 06 — Contato
        </div>
        <h2>
          Vamos <em>conversar</em>.
        </h2>
        <p>{pitch}</p>

        <div className="ed-contact-grid">
          <a className="ed-contact-card" href={`mailto:${email}`}>
            <span className="label">Por email</span>
            <span className="value">{email}</span>
            <span className="arrow">→</span>
          </a>
          <a className="ed-contact-card" href={linkedin} target="_blank" rel="noopener noreferrer">
            <span className="label">LinkedIn</span>
            <span className="value">linkedin.com/in/neigirao</span>
            <span className="arrow">→</span>
          </a>
          <a className="ed-contact-card" href={whatsapp} target="_blank" rel="noopener noreferrer">
            <span className="label">No WhatsApp</span>
            <span className="value">{phone}</span>
            <span className="arrow">→</span>
          </a>
          <a className="ed-contact-card" href={cvUrl} download>
            <span className="label">Baixar CV (.pdf)</span>
            <span className="value">Nei Girão · CV · 2026</span>
            <span className="arrow">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
