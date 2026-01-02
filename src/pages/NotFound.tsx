import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, Mail } from "lucide-react";
import { NotFoundSEOHead } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const suggestedLinks = [
    { href: "/", label: "Início", icon: Home },
    { href: "/#about", label: "Sobre Mim", icon: Search },
    { href: "/#experience", label: "Experiência", icon: Search },
    { href: "/#contact", label: "Contato", icon: Mail },
  ];

  return (
    <>
      <NotFoundSEOHead />
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
        <Card className="max-w-lg w-full shadow-elegant border-2 border-border/50 backdrop-blur-sm bg-card/95">
          <CardContent className="p-8 md:p-12 text-center">
            {/* Error Code */}
            <div className="mb-6">
              <h1 className="text-8xl md:text-9xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                404
              </h1>
            </div>

            {/* Error Message */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Página não encontrada
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              A página <code className="bg-muted px-2 py-1 rounded text-sm">{location.pathname}</code> não existe. 
              Talvez você tenha digitado o endereço errado ou a página foi movida.
            </p>

            {/* Main CTA */}
            <Button asChild size="lg" className="mb-8 w-full sm:w-auto">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Início
              </Link>
            </Button>

            {/* Suggested Links */}
            <div className="border-t border-border pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Ou navegue para uma dessas páginas:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedLinks.map((link) => (
                  <Button key={link.href} variant="outline" size="sm" asChild>
                    <Link to={link.href}>
                      <link.icon className="w-3 h-3 mr-1" />
                      {link.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            {/* Sitemap Link */}
            <div className="mt-6 pt-4 border-t border-border">
              <a
                href="/sitemap.xml"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Ver Sitemap completo →
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NotFound;