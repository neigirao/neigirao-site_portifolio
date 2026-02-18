/**
 * /contato - Dedicated Contact Page for SEO
 * 
 * Página dedicada de contato, ranqueia melhor que #contact anchor.
 */

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowLeft, Mail, Linkedin, Phone, MessageCircle, MapPin, Clock, ExternalLink } from "lucide-react";
import { AUTHOR_EMAIL, AUTHOR_LINKEDIN, AUTHOR_WHATSAPP, AUTHOR_PHONE, BASE_URL } from "@/config/constants";
import { Helmet } from "react-helmet-async";

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
    "telephone": AUTHOR_PHONE,
    "sameAs": [AUTHOR_LINKEDIN],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rio de Janeiro",
      "addressRegion": "RJ",
      "addressCountry": "BR"
    }
  }
};

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  href: string;
  external?: boolean;
  highlight?: boolean;
}

function ContactCard({ icon, title, description, action, href, external, highlight }: ContactCardProps) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <Card className={`border-2 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 h-full ${highlight ? "border-primary/40 bg-primary/5" : "border-border/50"}`}>
        <CardContent className="p-8 flex flex-col items-center text-center h-full">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${highlight ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
            {icon}
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-6 flex-1">{description}</p>
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="w-full"
          >
            <Button className={`w-full ${highlight ? "" : "variant-outline"}`} variant={highlight ? "default" : "outline"}>
              {action}
              {external && <ExternalLink className="w-3 h-3 ml-2" />}
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Contato() {
  return (
    <>
      <SEOHead
        title="Contato - Nei Girão | Product Manager"
        description="Entre em contato com Nei Girão. Disponível para novas oportunidades, parcerias e projetos em Product Management e Observabilidade. Rio de Janeiro, Brasil."
        canonicalUrl={`${BASE_URL}/contato`}
        keywords={["contato", "Nei Girão", "Product Manager", "oportunidades", "parcerias", "Rio de Janeiro"]}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-hero py-20 relative overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-accent/10 rounded-full blur-3xl" />
          <div className="max-w-4xl mx-auto px-6 relative">
            <Link to="/">
              <Button variant="ghost" className="text-white/80 hover:text-white mb-8 -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Portfolio
              </Button>
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
              Vamos Conectar
            </h1>
            <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
              Estou sempre aberto a novas oportunidades, parcerias e conversas sobre produtos digitais e observabilidade.
            </p>
            <div className="flex flex-wrap gap-4 mt-8 text-white/70 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4" />
                Rio de Janeiro, Brasil
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" />
                BRT (UTC-3)
              </span>
            <span className="flex items-center gap-2 bg-teal-accent/20 text-teal-accent px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-teal-accent rounded-full animate-pulse" />
                Disponível para oportunidades
              </span>
            </div>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            <ContactCard
              icon={<Mail className="w-7 h-7" />}
              title="Email"
              description="Para propostas formais, oportunidades de trabalho e colaborações profissionais."
              action="Enviar Email"
              href={`mailto:${AUTHOR_EMAIL}`}
              highlight
            />
            <ContactCard
              icon={<MessageCircle className="w-7 h-7" />}
              title="WhatsApp"
              description="Para conversas rápidas, dúvidas e networking informal."
              action="Abrir WhatsApp"
              href={AUTHOR_WHATSAPP}
              external
            />
            <ContactCard
              icon={<Linkedin className="w-7 h-7" />}
              title="LinkedIn"
              description="Conecte-se profissionalmente e acompanhe minhas publicações sobre produtos e observabilidade."
              action="Ver Perfil"
              href={AUTHOR_LINKEDIN}
              external
            />
            <ContactCard
              icon={<Phone className="w-7 h-7" />}
              title="Telefone"
              description="Disponível para ligações em horário comercial (BRT), para conversas mais detalhadas."
              action="Ligar Agora"
              href="tel:+5521989921711"
            />
          </div>

          {/* Additional Info */}
          <Card className="border-2 border-border/50 bg-muted/30">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">O que posso ajudar?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Product Management & Strategy",
                  "Observabilidade (Dynatrace, Grafana)",
                  "Gestão de Equipes Ágeis",
                  "Data-Driven Decision Making",
                  "OKRs & KPIs de Produto",
                  "Mentoria em Product Management",
                ].map(topic => (
                  <div key={topic} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    {topic}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground mb-4">Quer ver meu trabalho primeiro?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sobre">
                <Button variant="outline">Conhecer minha trajetória</Button>
              </Link>
              <Link to="/">
                <Button variant="outline">Ver portfolio completo</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
