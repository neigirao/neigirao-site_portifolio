import { Award, ExternalLink } from "lucide-react";
import { useCertifications } from "@/hooks/usePortfolioData";
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function CertificationsSection() {
  const { certifications, isLoading } = useCertifications();
  const { ref, isVisible } = useScrollAnimation();

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-20 w-48 rounded-xl" />)}
          </div>
        </div>
      </section>
    );
  }

  if (!certifications.length) return null;

  return (
    <section id="certifications" className="py-16 bg-muted/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-accent/10 border border-accent/20">
            <Award className="w-4 h-4 text-teal-accent" />
            <span className="text-sm font-medium text-foreground/80">Certificações</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Certificações Profissionais
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className={`group flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border hover:border-teal-accent/30 hover:shadow-md transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: isVisible ? `${index * 80}ms` : "0ms" }}
            >
              {cert.logo_url ? (
                <img src={cert.logo_url} alt={cert.name} width={32} height={32} className="w-8 h-8 object-contain" loading="lazy" />
              ) : (
                <Award className="w-6 h-6 text-teal-accent" />
              )}
              <div className="text-left">
                <div className="font-semibold text-sm text-foreground leading-tight">{cert.name}</div>
                <div className="text-xs text-muted-foreground">
                  {cert.issuer}{cert.year ? ` · ${cert.year}` : ''}
                </div>
              </div>
              {cert.credential_url && (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-muted-foreground hover:text-teal-accent transition-colors"
                  aria-label={`Ver credencial de ${cert.name}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
