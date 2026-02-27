import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ExperienceItem from "@/components/ExperienceItem";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { DbExperience } from "@/hooks/usePortfolioData";

interface ExperienceSectionProps {
  experiences: DbExperience[];
  isLoading: boolean;
}

export function ExperienceSection({ experiences, isLoading }: ExperienceSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-16 bg-muted/30 relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary opacity-5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-accent/10 opacity-5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground tracking-tight">Experiência Profissional</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Mais de 15 anos liderando produtos digitais e equipes em grandes empresas
          </p>
        </div>

        <Card className={`max-w-5xl mx-auto shadow-elegant border-2 border-border/50 backdrop-blur-sm bg-card/95 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <CardContent className="p-10 md:p-12">
            <div className="space-y-10">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-lg" />)
                : experiences.map((experience, index) => <ExperienceItem key={experience.id || index} experience={experience} />)}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
