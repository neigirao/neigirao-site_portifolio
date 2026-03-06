import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import ExperienceItem from "@/components/ExperienceItem";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import type { DbExperience } from "@/hooks/usePortfolioData";

const INITIAL_COUNT = 4;

interface ExperienceSectionProps {
  experiences: DbExperience[];
  isLoading: boolean;
}

export function ExperienceSection({ experiences, isLoading }: ExperienceSectionProps) {
  const { settings } = useSiteSettings();
  const subtitle = settings.section_subtitle_experience || "Mais de 15 anos liderando produtos digitais e equipes em grandes empresas";
  const [expanded, setExpanded] = useState(false);

  if (!isLoading && experiences.length === 0) return null;

  const visibleExperiences = expanded ? experiences : experiences.slice(0, INITIAL_COUNT);
  const hasMore = experiences.length > INITIAL_COUNT;

  return (
    <section id="experience" className="py-16 bg-muted/30 relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary opacity-5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-accent/10 opacity-5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground tracking-tight">Experiência Profissional</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            {subtitle}
          </p>
        </div>

        <Card className="max-w-5xl mx-auto shadow-elegant border-2 border-border/50 backdrop-blur-sm bg-card/95">
          <CardContent className="p-10 md:p-12">
            <div className="space-y-10">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-lg" />)
                : visibleExperiences.map((experience, index) => <ExperienceItem key={experience.id || index} experience={experience} />)}
            </div>

            {!isLoading && hasMore && (
              <div className="text-center mt-10 pt-6 border-t border-border/50">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setExpanded(!expanded)}
                  className="gap-2 border-2 border-teal-accent/30 text-teal-accent hover:bg-teal-accent/10 hover:border-teal-accent/50 transition-all"
                >
                  {expanded ? (
                    <>Ver menos <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>Ver todas as {experiences.length} experiências <ChevronDown className="w-4 h-4" /></>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
