import { Quote, Linkedin } from "lucide-react";
import { useTestimonials } from "@/hooks/usePortfolioData";
import { Skeleton } from "@/components/ui/skeleton";

export function TestimonialsSection() {
  const { testimonials, isLoading } = useTestimonials();

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map(i => <Skeleton key={i} className="h-48 rounded-xl" />)}
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-accent/10 border border-accent/20">
            <Quote className="w-4 h-4 text-teal-accent" />
            <span className="text-sm font-medium text-foreground/80">Recomendações</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            O Que Dizem Sobre Mim
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative p-6 rounded-2xl bg-card border border-border hover:border-teal-accent/20 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-teal-accent/20 absolute top-4 right-4" />
              <p className="text-foreground/80 leading-relaxed mb-6 italic text-sm">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                {t.author_photo_url ? (
                  <img
                    src={t.author_photo_url}
                    alt={t.author_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-teal-accent/10 flex items-center justify-center text-teal-accent font-bold text-sm">
                    {t.author_name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-foreground">{t.author_name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {t.author_role}{t.author_company ? ` · ${t.author_company}` : ''}
                  </div>
                </div>
                {t.linkedin_url && (
                  <a
                    href={t.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-teal-accent transition-colors"
                    aria-label={`LinkedIn de ${t.author_name}`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
