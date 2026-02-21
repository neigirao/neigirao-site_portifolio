import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BarChart3, Users, Activity, Search } from "lucide-react";

const METHODOLOGY_ITEMS = [
  {
    icon: BarChart3,
    title: "Data-Driven",
    description: "Decisões fundamentadas em dados, métricas e experimentação contínua. KPIs claros para medir impacto real.",
  },
  {
    icon: Users,
    title: "Agile Leadership",
    description: "Liderança de squads multidisciplinares com Scrum e Kanban. Foco em entrega iterativa e colaboração.",
  },
  {
    icon: Activity,
    title: "Observabilidade",
    description: "Cultura de monitoramento proativo com Dynatrace, Grafana e Azure Monitor. Redução de MTTR e incidentes.",
  },
  {
    icon: Search,
    title: "Discovery Contínuo",
    description: "Validação constante com usuários e stakeholders. Product Discovery integrado ao ciclo de desenvolvimento.",
  },
];

export function FAQSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="methodology" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground tracking-tight">Como Trabalho</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Minha abordagem para criar produtos digitais de alto impacto
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {METHODOLOGY_ITEMS.map((item) => (
            <Card key={item.title} className="shadow-elegant border-2 border-border/50 backdrop-blur-sm bg-card/95 hover:border-secondary/30 transition-all duration-300 hover:shadow-glow">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
