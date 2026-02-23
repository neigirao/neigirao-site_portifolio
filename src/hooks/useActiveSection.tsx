import { useState, useEffect, useCallback } from "react";

const SECTION_IDS = ["home", "experience", "projects", "skills", "about", "contact"];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.1, 0.3, 0.5], rootMargin: "-80px 0px -40% 0px" }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const menuItems = [
    { id: "home", label: "Início" },
    { id: "experience", label: "Experiência" },
    { id: "projects", label: "Projetos" },
    { id: "skills", label: "Skills" },
    { id: "about", label: "Sobre" },
    { id: "contact", label: "Contato" },
  ];

  return { activeSection, isMenuOpen, setIsMenuOpen, scrollToSection, menuItems };
}
