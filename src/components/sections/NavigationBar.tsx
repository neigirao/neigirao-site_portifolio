import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface NavigationBarProps {
  activeSection: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollToSection: (id: string) => void;
  menuItems: { id: string; label: string }[];
  scrollProgress: number;
}

export function NavigationBar({
  activeSection,
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
  menuItems,
  scrollProgress,
}: NavigationBarProps) {
  const navigate = useNavigate();
  const { settings } = useSiteSettings();
  const cvUrl = settings.cv_file_url || '/cv-nei-girao.pdf';

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
            <span
              className="text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              Nei Girão
            </span>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-200 hover:text-secondary ${
                    activeSection === item.id
                      ? "text-secondary font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
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
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      Menu
                    </span>
                  </div>
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left text-lg font-medium transition-colors hover:text-secondary py-2 ${
                        activeSection === item.id
                          ? "text-secondary border-l-4 border-secondary pl-4"
                          : "text-muted-foreground pl-4"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="flex items-center gap-3 mt-4">
                    <ThemeToggle />
                    <Button onClick={() => window.open(cvUrl, "_blank")} className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download CV
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
