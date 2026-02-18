import { Link } from "react-router-dom";
import { AUTHOR_EMAIL, AUTHOR_LINKEDIN, AUTHOR_WHATSAPP } from "@/config/constants";
import { Linkedin, Mail, MessageCircle } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-foreground mb-3">Nei Girão</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Product Manager especializado em Observabilidade e Produtos Digitais. Rio de Janeiro, Brasil.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Portfolio</Link></li>
              <li><Link to="/sobre" className="hover:text-foreground transition-colors">Sobre mim</Link></li>
              <li><Link to="/contato" className="hover:text-foreground transition-colors">Contato</Link></li>
              <li>
                <a href="/cv-nei-girao.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Download CV
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">Conectar</h4>
            <div className="flex gap-4">
              <a
                href={AUTHOR_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${AUTHOR_EMAIL}`}
                aria-label="Email"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={AUTHOR_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-teal-accent hover:text-white transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nei Girão. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link to="/sobre" className="hover:text-foreground transition-colors">Sobre</Link>
            <Link to="/contato" className="hover:text-foreground transition-colors">Contato</Link>
            <a href="/sitemap.xml" className="hover:text-foreground transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
