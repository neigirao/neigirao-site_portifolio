import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, Download } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/artigos", label: "Artigos" },
  { to: "/contato", label: "Contato" },
];

export function StandaloneNavbar() {
  const { scrollProgress } = useScrollProgress();
  const { settings } = useSiteSettings();
  const cvUrl = settings.cv_file_url || "/cv-nei-girao.pdf";
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-border z-[60]">
        <div
          className="h-full bg-gradient-primary transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav className="fixed top-0 w-full bg-card/90 backdrop-blur-xl border-b border-border z-50 shadow-elegant transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              Nei Girão
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-all duration-200 hover:text-secondary ${
                    location.pathname === link.to
                      ? "text-secondary font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <ThemeToggle />
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(cvUrl, "_blank")}
                className="ml-2"
              >
                <Download className="w-4 h-4 mr-2" />
                CV
              </Button>
            </div>

            {/* Mobile menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-8">
                  <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                    Menu
                  </span>
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-left text-lg font-medium transition-colors hover:text-secondary py-2 ${
                        location.pathname === link.to
                          ? "text-secondary border-l-4 border-secondary pl-4"
                          : "text-muted-foreground pl-4"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button onClick={() => window.open(cvUrl, "_blank")} className="mt-4">
                    <Download className="w-4 h-4 mr-2" />
                    Download CV
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
