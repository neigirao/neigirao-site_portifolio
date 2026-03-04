import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import EducationItem from "@/components/EducationItem";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import type { DbEducation } from "@/hooks/usePortfolioData";

interface EducationSectionProps {
  education: DbEducation[];
  isLoading: boolean;
}

export function EducationSection({ education, isLoading }: EducationSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  if (!isLoading && education.length === 0) return null;

  return (
    <section id="education" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-subtle opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground tracking-tight">Formação Acadêmica</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Sólida formação acadêmica em tecnologia e marketing digital
          </p>
        </div>

        <Card className={`max-w-5xl mx-auto shadow-elegant border-2 border-border/50 backdrop-blur-sm bg-card/95 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <CardContent className="p-10 md:p-12">
            <div className="space-y-10">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-lg" />)
                : education.map((edu, index) => <EducationItem key={edu.id || index} education={edu} />)}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
