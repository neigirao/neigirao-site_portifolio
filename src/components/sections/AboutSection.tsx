/**
 * About Section - Professional Summary + Methodology
 * Education is now rendered as a separate section.
 */

import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BarChart3, Users, Activity, Search } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { SafeHTML } from "@/components/admin/SafeHTML";

const ICON_MAP: Record<string, any> = { BarChart3, Users, Activity, Search };

const DEFAULT_METHODOLOGY_ITEMS = [
  { icon: "BarChart3", title: "Data-Driven", description: "Decisões fundamentadas em dados, métricas e experimentação contínua." },
  { icon: "Users", title: "Agile Leadership", description: "Liderança de squads multidisciplinares com Scrum e Kanban." },
  { icon: "Activity", title: "Observabilidade", description: "Cultura de monitoramento proativo com Dynatrace, Grafana e Azure Monitor." },
  { icon: "Search", title: "Discovery Contínuo", description: "Validação constante com usuários e stakeholders." },
];

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { settings } = useSiteSettings();
  const aboutSubtitle = settings.about_subtitle || 'Trajetória e metodologia de trabalho';
  const aboutSummary = settings.about_summary;
  const aboutTools = settings.about_tools || 'Dynatrace, Grafana, Azure Monitor, Google Analytics';

  const methodologyItems = (() => {
    try {
      const parsed = settings.methodology_items ? JSON.parse(settings.methodology_items) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_METHODOLOGY_ITEMS;
    } catch { return DEFAULT_METHODOLOGY_ITEMS; }
  })();

  return (
    <section id="about" className="py-16 bg-background relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-subtle opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative" ref={ref}>
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground tracking-tight">Sobre</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            {aboutSubtitle}
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Left: Professional Summary */}
          <Card className="shadow-elegant border-2 border-border/50 bg-card/95 h-full">
            <CardContent className="p-8 md:p-10">
              <h3 className="text-2xl font-bold text-foreground mb-4">Resumo Profissional</h3>
              <div className="space-y-4">
                {aboutSummary ? (
                  <SafeHTML html={aboutSummary} className="text-muted-foreground leading-relaxed" />
                ) : (
                  <>
                    <p className="text-muted-foreground leading-relaxed">
                      Profissional especializado em gestão estratégica de produtos digitais e Observabilidade, com mais de 15 anos liderando equipes ágeis em empresas como{" "}
                      <span className="text-teal-accent font-semibold">Icatu Seguros</span>,{" "}
                      <span className="text-teal-accent font-semibold">Oi</span>,{" "}
                      <span className="text-teal-accent font-semibold">TIM Brasil</span> e{" "}
                      <span className="text-teal-accent font-semibold">Rede Globo</span>.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Experiência em todo o ciclo de vida dos produtos digitais, cultivando cultura analítica e data-driven.
                    </p>
                  </>
                )}
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-semibold">Ferramentas:</span> {aboutTools}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right: Methodology grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {methodologyItems.map((item: { icon: string; title: string; description: string }) => {
              const IconComp = ICON_MAP[item.icon] || BarChart3;
              return (
                <Card key={item.title} className="shadow-elegant border-2 border-border/50 bg-card/95 hover:border-secondary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-3">
                      <IconComp className="w-5 h-5 text-secondary" />
                    </div>
                    <h4 className="text-base font-bold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
