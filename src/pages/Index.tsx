/**
 * Index Page - Main Portfolio Page
 * 
 * Página principal do portfolio com todas as seções:
 * - Hero: Apresentação e CTAs
 * - About: Informações sobre o profissional
 * - Skills: Habilidades técnicas em cards
 * - Experience: Timeline de experiências profissionais
 * - Contact: Links para contato e redes sociais
 * 
 * Navegação:
 * - Usa smooth scroll para navegação entre seções
 * - Estado local para rastrear seção ativa
 * - Menu fixo no topo
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ExperienceItem from "@/components/ExperienceItem";
import SkillCard from "@/components/SkillCard";
import EducationItem from "@/components/EducationItem";
import ProjectCard from "@/components/ProjectCard";
import { MailIcon, LinkedInIcon, PhoneIcon } from "@/components/Icons";
import { experiences, skills, education, projects } from "@/data/portfolio";

const Index = () => {
  // Estado para rastrear seção ativa no menu
  const [activeSection, setActiveSection] = useState("home");

  /**
   * Navega suavemente para uma seção específica
   * @param sectionId - ID da seção HTML
   */
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ==================== NAVIGATION ==================== */}
      <nav className="fixed top-0 w-full bg-card/80 backdrop-blur-lg border-b border-border z-50 shadow-elegant">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Nei Girão
            </h1>
            {/* Menu de navegação - desktop only */}
            <div className="hidden md:flex space-x-6">
              {["home", "about", "education", "skills", "experience", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-secondary ${
                    activeSection === section ? "text-secondary" : "text-muted-foreground"
                  }`}
                >
                  {section === "home" ? "Início" :
                   section === "about" ? "Resumo" :
                   section === "education" ? "Formação" :
                   section === "skills" ? "Skills" :
                   section === "experience" ? "Experiência" :
                   section === "projects" ? "Projetos" :
                   "Contato"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-hero pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Product Manager & <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Observabilidade
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
              Transformando produtos digitais em experiências de sucesso
            </p>
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-secondary hover:bg-secondary/90 text-white shadow-glow"
              >
                Entre em Contato
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("projects")}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Ver Projetos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Resumo Profissional</h2>
          <Card className="max-w-4xl mx-auto shadow-elegant">
            <CardContent className="p-8 md:p-12">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Sou um profissional especializado em gestão estratégica de produtos digitais e Observabilidade, 
                com mais de 5 anos de experiência na liderança de equipes ágeis e multidisciplinares. Minha 
                trajetória inclui atuação em empresas de grande porte como Icatu Seguros, Oi, TIM Brasil e 
                Rede Globo, nas quais liderei iniciativas de alta relevância envolvendo produtos digitais, 
                performance, qualidade e inovação.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Possuo sólida experiência em todo o ciclo de vida dos produtos digitais, desde a concepção e 
                lançamento até estratégias de atendimento pós-venda. Meu forte está em liderar equipes ágeis, 
                cultivando uma cultura analítica e data-driven.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Utilizo ferramentas como Dynatrace, Grafana, Azure Monitor e Google Analytics para implementar 
                estratégias robustas de Observabilidade, elevando significativamente a eficiência operacional 
                e a resiliência dos produtos.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ==================== EDUCATION SECTION ==================== */}
      <section id="education" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Formação Acadêmica</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Sólida formação acadêmica em tecnologia e marketing digital
          </p>
          <Card className="max-w-4xl mx-auto shadow-elegant">
            <CardContent className="p-8">
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <EducationItem key={index} education={edu} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ==================== SKILLS SECTION ==================== */}
      <section id="skills" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Habilidades & Expertise</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Especializado em observabilidade, product management e análise de dados
          </p>
          {/* Grid de skills - responsivo */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EXPERIENCE SECTION ==================== */}
      <section id="experience" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Experiência Profissional</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Mais de 15 anos liderando produtos digitais e equipes em grandes empresas
          </p>
          <Card className="max-w-4xl mx-auto shadow-elegant">
            <CardContent className="p-8">
              {/* Timeline de experiências */}
              <div className="space-y-8">
                {experiences.map((experience, index) => (
                  <ExperienceItem key={index} experience={experience} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ==================== PROJECTS SECTION ==================== */}
      <section id="projects" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Principais Projetos</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Projetos de destaque que geraram impacto significativo
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT SECTION ==================== */}
      <section id="contact" className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Vamos Conectar</h2>
          <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
            Estou sempre interessado em ouvir sobre novas oportunidades e colaborações
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-glow"
              onClick={() => window.location.href = "mailto:neigirao@gmail.com"}
            >
              <MailIcon className="w-5 h-5 mr-2" />
              Email
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => window.open("https://linkedin.com/in/neigirao", "_blank")}
            >
              <LinkedInIcon className="w-5 h-5 mr-2" />
              LinkedIn
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => window.open("tel:21989921711", "_blank")}
            >
              <PhoneIcon className="w-5 h-5 mr-2" />
              (21) 98992-1711
            </Button>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Nei Girão. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
