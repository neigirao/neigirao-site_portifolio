import { Skeleton } from "@/components/ui/skeleton";
import ProjectCard from "@/components/ProjectCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { DbProject } from "@/hooks/usePortfolioData";

interface ProjectsSectionProps {
  projects: DbProject[];
  isLoading: boolean;
}

export function ProjectsSection({ projects, isLoading }: ProjectsSectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  if (!isLoading && projects.length === 0) return null;

  return (
    <section id="projects" className="py-16 bg-background relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-subtle opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground tracking-tight">Principais Projetos</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Projetos de destaque que geraram impacto significativo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-lg" />)
            : projects.map((project, index) => (
                <div
                  key={project.id || index}
                  className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: isVisible ? `${index * 80}ms` : "0ms" }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
