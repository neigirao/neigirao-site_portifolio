import { useState } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SEO/BreadcrumbSchema";
import { AUTHOR_EMAIL, AUTHOR_LINKEDIN, AUTHOR_WHATSAPP, BASE_URL } from "@/config/constants";
import { toast } from "sonner";

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contato - Nei Girão",
  "description": "Entre em contato com Nei Girão, Product Manager especializado em Observabilidade",
  "url": `${BASE_URL}/contato`,
  "mainEntity": {
    "@type": "Person",
    "name": "Nei Girão",
    "email": AUTHOR_EMAIL,
    "sameAs": [AUTHOR_LINKEDIN],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rio de Janeiro",
      "addressRegion": "RJ",
      "addressCountry": "BR"
    }
  }
};

export default function Contato() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(AUTHOR_EMAIL);
    setEmailCopied(true);
    toast.success("Email copiado!");
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const checkRateLimit = (): boolean => {
    const key = "contact_form_timestamps";
    const now = Date.now();
    const hour = 60 * 60 * 1000;
    const stored = JSON.parse(localStorage.getItem(key) || "[]") as number[];
    const recent = stored.filter((t) => now - t < hour);
    if (recent.length >= 3) return false;
    recent.push(now);
    localStorage.setItem(key, JSON.stringify(recent));
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    if (!checkRateLimit()) {
      toast.error("Limite de envios atingido. Tente novamente em 1 hora.");
      return;
    }
    setSending(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.from("contact_messages").insert({
        name: formData.name,
        email: formData.email,
        message: formData.subject ? `[${formData.subject}] ${formData.message}` : formData.message,
      });
      if (error) throw error;
      toast.success("Mensagem enviada com sucesso! Retorno em breve.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="ed-root">
      <SEOHead
        title="Contato - Nei Girão | Product Manager"
        description="Entre em contato com Nei Girão para projetos, parcerias e oportunidades em Product Management e Observabilidade. Rio de Janeiro, Brasil."
        canonicalUrl={`${BASE_URL}/contato`}
        keywords={["contato", "Nei Girão", "Product Manager", "oportunidades", "parcerias", "Rio de Janeiro"]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Contato' },
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
          <Link to="/sobre">Sobre</Link>
          <span className="ed-sep">·</span>
          <Link to="/#projects">Projetos</Link>
          <span className="ed-sep">·</span>
          <Link to="/artigos">Artigos</Link>
        </nav>
      </header>

      {/* BREADCRUMB */}
      <div className="ed-container">
        <div className="pp-crumb">
          <Link to="/">Nei Girão</Link>
          <span className="pp-crumb-sep">/</span>
          <span className="pp-crumb-current">Contato</span>
        </div>
      </div>

      {/* HERO */}
      <section className="pp-hero">
        <div className="ed-container">
          <div className="pp-brand-row">
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ed-muted)' }}>
              Rio de Janeiro · BRT (UTC-3)
            </span>
          </div>
          <h1 className="pp-title ed-display">Vamos<br />Conversar?</h1>
          <div className="pp-role">Transformando desafios em produtos digitais de alto impacto.</div>
        </div>
      </section>

      {/* BODY */}
      <section className="pp-body">
        <div className="ed-container">
          <div className="pp-grid">
            {/* SIDEBAR */}
            <aside className="pp-side">
              <div className="pp-side-block">
                <div className="pp-side-head">Canais</div>
                <a href={`mailto:${AUTHOR_EMAIL}`} className="pp-ext-link" style={{ display: 'block', marginBottom: 8 }}>
                  Email ↗
                </a>
                <a href={AUTHOR_WHATSAPP} target="_blank" rel="noopener noreferrer" className="pp-ext-link" style={{ display: 'block', marginBottom: 8 }}>
                  WhatsApp ↗
                </a>
                <a href={AUTHOR_LINKEDIN} target="_blank" rel="noopener noreferrer" className="pp-ext-link" style={{ display: 'block' }}>
                  LinkedIn ↗
                </a>
              </div>

              <div className="pp-side-block">
                <div className="pp-side-head">Posso ajudar com</div>
                {[
                  "Product Strategy",
                  "Observabilidade",
                  "Equipes Ágeis",
                  "Data-Driven",
                  "OKRs & KPIs",
                  "Mentoria PM",
                ].map(topic => (
                  <div key={topic} className="pp-stack-item">{topic}</div>
                ))}
              </div>

              <div className="pp-side-block">
                <div className="pp-side-head">Email</div>
                <button
                  onClick={handleCopyEmail}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                >
                  <span className="pp-ext-link" style={{ display: 'block' }}>
                    {emailCopied ? '✓ Copiado!' : `${AUTHOR_EMAIL} ⧉`}
                  </span>
                </button>
              </div>
            </aside>

            {/* MAIN: FORM */}
            <div className="pp-main">
              <div className="pp-section">
                <h2>Envie uma mensagem</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label htmlFor="name" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ed-muted)' }}>
                        Nome *
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        autoComplete="name"
                        style={{
                          background: 'var(--ed-paper)', border: '1px solid var(--ed-line)',
                          borderRadius: 4, padding: '10px 14px',
                          fontFamily: 'Source Serif 4, serif', fontSize: 16, color: 'var(--ed-fg)',
                          outline: 'none', transition: 'border-color .15s',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'var(--ed-fg)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--ed-line)')}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label htmlFor="email" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ed-muted)' }}>
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        autoComplete="email"
                        style={{
                          background: 'var(--ed-paper)', border: '1px solid var(--ed-line)',
                          borderRadius: 4, padding: '10px 14px',
                          fontFamily: 'Source Serif 4, serif', fontSize: 16, color: 'var(--ed-fg)',
                          outline: 'none', transition: 'border-color .15s',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'var(--ed-fg)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--ed-line)')}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label htmlFor="subject" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ed-muted)' }}>
                      Assunto
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="Ex: Oportunidade de PM, Consultoria, Parceria…"
                      value={formData.subject}
                      onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      autoComplete="off"
                      style={{
                        background: 'var(--ed-paper)', border: '1px solid var(--ed-line)',
                        borderRadius: 4, padding: '10px 14px',
                        fontFamily: 'Source Serif 4, serif', fontSize: 16, color: 'var(--ed-fg)',
                        outline: 'none', transition: 'border-color .15s',
                      }}
                      onFocus={e => (e.target.style.borderColor = 'var(--ed-fg)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--ed-line)')}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label htmlFor="message" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ed-muted)' }}>
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      placeholder="Conte sobre o projeto, oportunidade ou como posso ajudar…"
                      rows={6}
                      value={formData.message}
                      onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      style={{
                        background: 'var(--ed-paper)', border: '1px solid var(--ed-line)',
                        borderRadius: 4, padding: '10px 14px',
                        fontFamily: 'Source Serif 4, serif', fontSize: 16, color: 'var(--ed-fg)',
                        outline: 'none', transition: 'border-color .15s', resize: 'vertical',
                      }}
                      onFocus={e => (e.target.style.borderColor = 'var(--ed-fg)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--ed-line)')}
                    />
                  </div>
                  <div>
                    <button type="submit" className="pp-btn pp-btn-pri" disabled={sending}>
                      {sending ? "Enviando…" : "Enviar mensagem →"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Contact options editorial style */}
              <div className="pp-section">
                <h2>Outros canais</h2>
                <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--ed-line)' }}>
                  {[
                    { label: 'Email', value: AUTHOR_EMAIL, href: `mailto:${AUTHOR_EMAIL}`, desc: 'Para propostas formais' },
                    { label: 'WhatsApp', value: 'Enviar mensagem', href: AUTHOR_WHATSAPP, desc: 'Para conversas rápidas', external: true },
                    { label: 'LinkedIn', value: '/in/neigirao', href: AUTHOR_LINKEDIN, desc: 'Conecte-se profissionalmente', external: true },
                  ].map(item => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      style={{
                        display: 'grid', gridTemplateColumns: '160px 1fr 24px',
                        gap: 24, padding: '18px 0', borderBottom: '1px solid var(--ed-line)',
                        textDecoration: 'none', color: 'inherit', alignItems: 'center',
                        transition: 'padding .15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.paddingLeft = '12px')}
                      onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}
                    >
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ed-muted)' }}>
                        {item.label}
                      </span>
                      <span>
                        <span style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 440 }}>{item.value}</span>
                        <span style={{ display: 'block', fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--ed-muted)', letterSpacing: '0.08em', marginTop: 2 }}>{item.desc}</span>
                      </span>
                      <span style={{ color: 'var(--ed-accent)', fontSize: 18 }}>→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pp-cta">
        <div className="ed-container">
          <div className="pp-cta-grid">
            <h3>
              Quer ver meu <em>trabalho</em> primeiro?
            </h3>
            <div className="pp-cta-actions">
              <Link to="/sobre" className="pp-btn pp-btn-pri">Conhecer trajetória</Link>
              <Link to="/" className="pp-btn pp-btn-sec">Ver portfólio completo</Link>
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
