import { Button } from "@/components/ui/button";
import { MailIcon, LinkedInIcon, PhoneIcon } from "@/components/Icons";
import { AUTHOR_EMAIL, AUTHOR_LINKEDIN } from "@/config/constants";

export function ContactSection() {
  return (
    <section id="contact" className="py-28 bg-gradient-hero relative overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">Vamos Conectar</h2>
          <div className="w-24 h-1 bg-white/80 mx-auto rounded-full mb-6" />
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
            Pronto para conversas sobre novos desafios
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-3xl mx-auto">
          {/* Email - Primary CTA */}
          <Button size="lg" className="bg-teal-accent text-white hover:bg-teal-accent/90 shadow-glow hover:scale-105 transition-all duration-300 w-full sm:w-auto px-10 py-7 text-lg font-semibold" onClick={() => window.location.href = `mailto:${AUTHOR_EMAIL}`}>
            <MailIcon className="w-6 h-6 mr-3" />
            Email
          </Button>
          {/* LinkedIn - Secondary */}
          <Button size="lg" className="bg-white/20 text-white hover:bg-white/30 border border-white/30 hover:scale-105 transition-all duration-300 w-full sm:w-auto px-8 py-6 text-lg backdrop-blur-sm" onClick={() => window.open(AUTHOR_LINKEDIN, "_blank")}>
            <LinkedInIcon className="w-6 h-6 mr-3" />
            LinkedIn
          </Button>
          {/* WhatsApp - Tertiary */}
          <Button size="lg" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 w-full sm:w-auto px-8 py-6 text-lg" onClick={() => window.open("tel:21989921711", "_blank")}>
            <PhoneIcon className="w-6 h-6 mr-3" />
            (21) 98992-1711
          </Button>
        </div>
      </div>
    </section>
  );
}
