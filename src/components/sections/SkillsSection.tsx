import { Skeleton } from "@/components/ui/skeleton";
import SkillCard from "@/components/SkillCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import type { DbSkill } from "@/hooks/usePortfolioData";

interface SkillsSectionProps {
  skills: DbSkill[];
  isLoading: boolean;
}

export function SkillsSection({ skills, isLoading }: SkillsSectionProps) {
  const { ref, isVisible } = useScrollAnimation();
  const { settings } = useSiteSettings();
  const subtitle = settings.section_subtitle_skills || "Especializado em observabilidade, product management e análise de dados";

  if (!isLoading && skills.length === 0) return null;

  return (
    <section id="skills" className="py-16 bg-muted/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground tracking-tight">Especialidades</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            {subtitle}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-lg" />)
            : skills.map((skill, index) => (
                <div
                  key={skill.id || skill.name}
                  className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: isVisible ? `${index * 60}ms` : "0ms" }}
                >
                  <SkillCard skill={skill} index={index} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
