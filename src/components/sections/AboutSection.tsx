import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-subtle opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground tracking-tight">Resumo Profissional</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </div>

        <Card className={`max-w-5xl mx-auto shadow-elegant border-2 border-border/50 backdrop-blur-sm bg-card/95 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <CardContent className="p-10 md:p-16">
            <div className="space-y-6">
              <p className="text-xl text-foreground leading-relaxed font-medium">Sou um profissional especializado em gestão estratégica de produtos digitais e Observabilidade, com mais de 7 anos de experiência na liderança de equipes ágeis e multidisciplinares.</p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Minha trajetória inclui atuação em empresas de grande porte como{" "}
                <span className="text-teal-accent font-semibold">Icatu Seguros</span>,
                <span className="text-teal-accent font-semibold"> Oi</span>,{" "}
                <span className="text-teal-accent font-semibold">TIM Brasil</span> e
                <span className="text-teal-accent font-semibold"> Rede Globo</span>, nas quais liderei iniciativas de
                alta relevância envolvendo produtos digitais, performance, qualidade e inovação.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Possuo sólida experiência em todo o ciclo de vida dos produtos digitais, desde a concepção e
                lançamento até estratégias de atendimento pós-venda. Meu forte está em liderar equipes ágeis,
                cultivando uma cultura analítica e data-driven.
              </p>
              <div className="pt-6 border-t border-border/50">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-semibold">Ferramentas principais:</span> Dynatrace, Grafana,
                  Azure Monitor e Google Analytics para implementar estratégias robustas de Observabilidade, elevando
                  significativamente a eficiência operacional e a resiliência dos produtos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
