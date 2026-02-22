import { Button } from "@/components/ui/button";
import { Download, User } from "lucide-react";
import { useCompanies } from "@/hooks/usePortfolioData";

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  const { companies } = useCompanies();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-hero pt-20 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="max-w-7xl mx-auto px-6 py-20 text-center relative">
        <div className="animate-fade-in-up">
          {/* Professional Photo */}
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-primary p-1">
              <div className="w-full h-full rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center">
                <User className="w-16 h-16 md:w-20 md:h-20 text-white/60" />
              </div>
            </div>
          </div>

          {/* Badge - 3 roles */}
          <div className="inline-block mb-6 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
            <span className="text-white/90 text-sm font-semibold tracking-wide uppercase">
              Product Management · Transformação Digital · Dados
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight tracking-tight">
            Nei Girão
          </h1>

          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white/90 mb-8 leading-snug">
            Liderança estratégica em produtos digitais,
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">dados e transformação</span>
          </h2>

          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Product Manager e Estrategista de Dados com 15+ anos transformando observabilidade e cultura analítica em produtos digitais de alto impacto.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-teal-accent text-white hover:bg-teal-accent/90 shadow-glow hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold"
            >
              Entre em Contato
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("/cv-nei-girao.pdf", "_blank")}
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 shadow-glow hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold backdrop-blur-sm"
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              { value: "15+", label: "Anos de Experiência" },
              { value: "35+", label: "Membros Gerenciados" },
              { value: "6+", label: "Produtos Lançados" },
              { value: "4", label: "Grandes Empresas" },
            ].map((stat) => (
              <div key={stat.label} className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Company Logos Bar */}
          <div className="mt-12 max-w-3xl mx-auto">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Empresas onde atuei</p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {companies.map((company) => (
                <span
                  key={company.id}
                  className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors duration-300"
                  title={company.name}
                >
                  {company.logo_url ? (
                    <img src={company.logo_url} alt={company.name} className="h-8 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-80 transition-opacity" />
                  ) : (
                    <span className="text-lg font-bold tracking-wide">{company.abbr}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
