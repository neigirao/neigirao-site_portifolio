import { useSiteSettings } from "@/hooks/useSiteSettings";
import { AUTHOR_EMAIL, AUTHOR_LINKEDIN, AUTHOR_WHATSAPP, AUTHOR_PHONE } from "@/config/constants";
import { SafeHTML } from "@/components/admin/SafeHTML";

export function ContactEditorialSection() {
  const { settings } = useSiteSettings();

  const pitch = settings.contact_pitch ||
    "Estou aberto a posições sênior de Product (Lead, Manager, Group PM, Head) — preferência por insurtech, fintech e produtos com escala. Mande uma mensagem.";
  const email = settings.contact_email || AUTHOR_EMAIL;
  const linkedin = settings.contact_linkedin || AUTHOR_LINKEDIN;
  const whatsapp = settings.contact_whatsapp || AUTHOR_WHATSAPP;
  const phone = settings.contact_phone || AUTHOR_PHONE;
  const cvUrl = settings.cv_file_url || "#";

  const sectionNum = settings.contact_section_num || "№ 06 — Contato";
  const titleHtml = settings.contact_title_html || "Vamos <em>conversar</em>.";
  const labelEmail = settings.contact_label_email || "Por email";
  const labelLinkedin = settings.contact_label_linkedin || "LinkedIn";
  const labelWhatsapp = settings.contact_label_whatsapp || "No WhatsApp";
  const labelCv = settings.contact_label_cv || "Baixar CV (.pdf)";
  const linkedinDisplay = settings.contact_linkedin_display || "linkedin.com/in/neigirao";
  const cvValue = settings.contact_cv_value || "Nei Girão · CV · 2026";

  return (
    <section className="ed-contact" id="contact">
      <div className="ed-container">
        <div className="ed-mono" style={{ color: "#E27464", marginBottom: 24 }}>
          {sectionNum}
        </div>
        <SafeHTML as="h2" html={titleHtml} />
        <p>{pitch}</p>

        <div className="ed-contact-grid">
          <a className="ed-contact-card" href={`mailto:${email}`}>
            <span className="label">{labelEmail}</span>
            <span className="value">{email}</span>
            <span className="arrow">→</span>
          </a>
          <a className="ed-contact-card" href={linkedin} target="_blank" rel="noopener noreferrer">
            <span className="label">{labelLinkedin}</span>
            <span className="value">{linkedinDisplay}</span>
            <span className="arrow">→</span>
          </a>
          <a className="ed-contact-card" href={whatsapp} target="_blank" rel="noopener noreferrer">
            <span className="label">{labelWhatsapp}</span>
            <span className="value">{phone}</span>
            <span className="arrow">→</span>
          </a>
          <a className="ed-contact-card" href={cvUrl} download>
            <span className="label">{labelCv}</span>
            <span className="value">{cvValue}</span>
            <span className="arrow">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
