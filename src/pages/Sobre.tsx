/**
 * /sobre - Dedicated About Page for SEO
 * 
 * Página dedicada com biografia completa, ranqueia melhor que #about anchor.
 */

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/SEO";
import { useExperiences, useSkills, useEducation } from "@/hooks/usePortfolioData";
import { prefetchRoute } from "@/utils/prefetch";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Download, Linkedin, Mail, MapPin, Calendar, Award } from "lucide-react";
import { StandaloneNavbar } from "@/components/sections/StandaloneNavbar";
import { AUTHOR_EMAIL, AUTHOR_LINKEDIN, BASE_URL } from "@/config/constants";
import { Helmet } from "react-helmet-async";
import { SafeHTML } from "@/components/admin/SafeHTML";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
        <span className="w-1 h-7 bg-gradient-primary rounded-full inline-block" />
        {title}
      </h2>
      {children}
    </div>
  );
}

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
    <>
      <SEOHead
        title="Sobre Nei Girão - Product Manager | Observabilidade"
        description="Conheça Nei Girão: Product Manager com +15 anos liderando produtos digitais em Icatu Seguros, Oi, TIM e Globo. Expert em Dynatrace, Grafana e Azure Monitor."
        canonicalUrl={`${BASE_URL}/sobre`}
        ogType="profile"
        keywords={["Nei Girão", "Product Manager", "observabilidade", "Dynatrace", "Grafana", "Icatu", "TIM", "Oi", "Globo", "Rio de Janeiro"]}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <StandaloneNavbar />
        {/* Header */}
        <div className="bg-gradient-hero pt-24 pb-20 relative overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-accent/10 rounded-full blur-3xl" />
          <div className="max-w-4xl mx-auto px-6 relative">
            <div className="flex flex-col md:flex-row md:items-end gap-8">
              <div className="flex-1">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                  Nei Girão
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium mb-2">
                  Product Manager | Observabilidade & Produtos Digitais
                </p>
                <div className="flex flex-wrap gap-3 text-white/70 text-sm mt-4">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Rio de Janeiro, Brasil</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> +15 anos de experiência</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => window.open(cvUrl, "_blank")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  onClick={() => window.open(AUTHOR_LINKEDIN, "_blank")}
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
          {/* Bio */}
          <Section title="Resumo Profissional">
            <Card className="border-2 border-border/50 shadow-elegant">
              <CardContent className="p-8 space-y-4">
                {settings.about_summary ? (
                  <SafeHTML html={settings.about_summary} className="text-muted-foreground leading-relaxed" />
                ) : (
                  <>
                    <p className="text-lg text-foreground leading-relaxed font-medium">
                      Sou um profissional especializado em gestão estratégica de produtos digitais e Observabilidade, com mais de 15 anos de experiência na liderança de equipes ágeis e multidisciplinares.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Minha trajetória inclui atuação em empresas de grande porte como{" "}
                      <strong className="text-foreground">Icatu Seguros</strong>,{" "}
                      <strong className="text-foreground">Oi</strong>,{" "}
                      <strong className="text-foreground">TIM Brasil</strong> e{" "}
                      <strong className="text-foreground">Rede Globo</strong>, nas quais liderei iniciativas de alta relevância envolvendo produtos digitais, performance, qualidade e inovação.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Possuo sólida experiência em todo o ciclo de vida dos produtos digitais, desde a concepção e lançamento até estratégias de atendimento pós-venda. Meu diferencial está em liderar equipes ágeis com cultura analítica e data-driven, usando ferramentas como <strong className="text-foreground">Dynatrace</strong>, <strong className="text-foreground">Grafana</strong> e <strong className="text-foreground">Azure Monitor</strong>.
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </Section>

          {/* Skills */}
          {Object.keys(skillsByCategory).length > 0 && (
            <Section title="Habilidades & Competências">
              <div className="space-y-6">
                {Object.entries(skillsByCategory).map(([category, catSkills]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {catSkills.map(skill => (
                        <Link key={skill.id} to={`/skill/${skill.slug || skill.name.toLowerCase()}`} onMouseEnter={() => prefetchRoute('/skill/')}>
                          <Badge
                            variant="secondary"
                            className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer px-3 py-1"
                          >
                            {skill.name}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <Section title="Trajetória Profissional">
              <div className="space-y-4">
                {experiences.map(exp => (
                  <Link key={exp.id} to={`/experiencia/${exp.slug || exp.company.toLowerCase()}`} onMouseEnter={() => prefetchRoute('/experiencia/')}>
                    <Card className="border border-border/50 hover:border-primary/40 hover:shadow-elegant transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{exp.role}</h3>
                            <p className="text-muted-foreground">{exp.company}</p>
                          </div>
                          <Badge variant="outline" className="self-start sm:self-center whitespace-nowrap text-xs">
                            {exp.period}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{exp.description?.replace(/<[^>]*>/g, '').slice(0, 200) || ''}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </Section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Section title="Formação Acadêmica">
              <div className="space-y-4">
                {education.map(edu => (
                  <Card key={edu.id} className="border border-border/50">
                    <CardContent className="p-6 flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                        <p className="text-muted-foreground">{edu.institution}</p>
                        <Badge variant="outline" className="mt-2 text-xs">{edu.period}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Section>
          )}

          {/* CTA */}
          <div className="text-center py-8 border-t border-border">
            <p className="text-muted-foreground mb-6">Interessado em conectar ou colaborar?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contato">
                <Button size="lg" className="w-full sm:w-auto">
                  <Mail className="w-4 h-4 mr-2" />
                  Entrar em Contato
                </Button>
              </Link>
              <Link to="/">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Ver Portfolio Completo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
