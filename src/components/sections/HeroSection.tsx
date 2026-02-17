import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-hero pt-20 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="max-w-7xl mx-auto px-6 py-20 text-center relative">
        <div className="animate-fade-in-up">
          <div className="inline-block mb-8 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
            <span className="text-white/90 text-sm font-semibold tracking-wide uppercase">
              ⚡ Product Manager | Observabilidade
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 leading-tight tracking-tight">
            Nei Girão
          </h1>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white/90 mb-8 leading-snug">
            Transformando produtos digitais em <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">experiências de sucesso</span>
          </h2>

          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Sou Product Manager e Estrategista de Dados, apaixonado por transformar observabilidade e cultura analítica em produtos digitais de alto impacto.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" onClick={() => scrollToSection("contact")} className="bg-white text-primary hover:bg-white/90 shadow-glow hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold">
              Entre em Contato
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.open("/cv-nei-girao.pdf", "_blank")} className="bg-white/10 text-white border-white/30 hover:bg-white/20 shadow-glow hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold backdrop-blur-sm">
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
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
        </div>
      </div>
    </section>
  );
}
