/**
 * Index Page - Main Portfolio Page (Composition Only)
 * Order: Hero → Impact → About → Experience → Projects → Skills → Certifications → Testimonials → Articles → Education → FAQ → Contact
 */

import { useExperiences, useSkills, useEducation, useProjects } from "@/hooks/usePortfolioData";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useActiveSection } from "@/hooks/useActiveSection";
import { HomeSEOHead, DynamicSchema } from "@/components/SEO";
import { ImpactMetrics } from "@/components/ImpactMetrics";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { MessageCircle, ArrowUp } from "lucide-react";
import { AUTHOR_WHATSAPP } from "@/config/constants";
import {
  NavigationBar,
  HeroSection,
  AboutSection,
  SkillsSection,
  EducationSection,
  ExperienceSection,
  ProjectsSection,
  CertificationsSection,
  TestimonialsSection,
  FAQSection,
  ContactSection,
  FooterSection,
  RecentArticlesSection,
} from "@/components/sections";

const Index = () => {
  const { experiences, isLoading: loadingExperiences } = useExperiences();
  const { skills, isLoading: loadingSkills } = useSkills();
  const { education, isLoading: loadingEducation } = useEducation();
  const { projects, isLoading: loadingProjects } = useProjects();
  const { scrollProgress, showBackToTop, scrollToTop } = useScrollProgress();
  const { activeSection, isMenuOpen, setIsMenuOpen, scrollToSection, menuItems } = useActiveSection();

  return (
    <>
      <HomeSEOHead />
      <DynamicSchema />
      <div className="min-h-screen bg-background">
        {/* Skip to content - Accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[70] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-sm focus:font-medium">
          Pular para o conteúdo principal
        </a>

        <NavigationBar
          activeSection={activeSection}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          scrollToSection={scrollToSection}
          menuItems={menuItems}
          scrollProgress={scrollProgress}
        />

        {/* Back to Top */}
        {showBackToTop && (
          <button onClick={scrollToTop} className="fixed bottom-24 right-8 z-40 bg-card border-2 border-border text-foreground p-3 rounded-full shadow-elegant hover:scale-110 hover:bg-muted transition-all duration-300" aria-label="Voltar ao topo">
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating WhatsApp CTA */}
        <a href={AUTHOR_WHATSAPP} target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-40 bg-teal-accent text-white p-4 rounded-full shadow-glow hover:scale-110 transition-all duration-300" aria-label="Contato via WhatsApp">
          <MessageCircle className="w-6 h-6" />
        </a>

        <main id="main-content">
        <ErrorBoundary><HeroSection scrollToSection={scrollToSection} /></ErrorBoundary>
        <ErrorBoundary><ImpactMetrics /></ErrorBoundary>
        <ErrorBoundary><AboutSection /></ErrorBoundary>
        <ErrorBoundary><ExperienceSection experiences={experiences} isLoading={loadingExperiences} /></ErrorBoundary>
        <ErrorBoundary><ProjectsSection projects={projects} isLoading={loadingProjects} /></ErrorBoundary>
        <ErrorBoundary><SkillsSection skills={skills} isLoading={loadingSkills} /></ErrorBoundary>
        <ErrorBoundary><CertificationsSection /></ErrorBoundary>
        <ErrorBoundary><TestimonialsSection /></ErrorBoundary>
        <ErrorBoundary><RecentArticlesSection /></ErrorBoundary>
        <ErrorBoundary><EducationSection education={education} isLoading={loadingEducation} /></ErrorBoundary>
        <ErrorBoundary><FAQSection /></ErrorBoundary>
        <ErrorBoundary><ContactSection /></ErrorBoundary>
        </main>
        <FooterSection />
      </div>
    </>
  );
};

export default Index;
