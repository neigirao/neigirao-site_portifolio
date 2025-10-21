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
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <div className="min-h-screen bg-background">
      {/* ==================== NAVIGATION ==================== */}
      <nav className="fixed top-0 w-full bg-card/90 backdrop-blur-xl border-b border-border z-50 shadow-elegant transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => scrollToSection("home")}>
              Nei Girão
            </h1>
            {/* Menu de navegação - desktop only */}
            <div className="hidden md:flex space-x-6">
              {["home", "about", "skills", "education", "experience", "projects", "contact"].map(section => <button key={section} onClick={() => scrollToSection(section)} className={`text-sm font-medium transition-colors hover:text-secondary ${activeSection === section ? "text-secondary" : "text-muted-foreground"}`}>
                  {section === "home" ? "Início" : section === "about" ? "Resumo" : section === "education" ? "Formação" : section === "skills" ? "Skills" : section === "experience" ? "Experiência" : section === "projects" ? "Projetos" : "Contato"}
                </button>)}
            </div>
          </div>
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-hero pt-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-accent/10 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '1.5s'
      }} />
        
        <div className="max-w-7xl mx-auto px-6 py-20 text-center relative">
          <div className="animate-fade-in-up">
            {/* Badge/Tag */}
            <div className="inline-block mb-8 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <span className="text-white/90 text-sm font-semibold tracking-wide">
                ⚡ Product Manager | Observabilidade
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              Nei Girão
            </h1>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white/90 mb-8">
              Transformando produtos digitais em <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                experiências de sucesso
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Especialista em liderar equipes ágeis e implementar estratégias de observabilidade 
              que elevam a eficiência operacional e a resiliência dos produtos digitais
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" onClick={() => scrollToSection("contact")} className="bg-white text-primary hover:bg-white/90 shadow-glow hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold">
                Entre em Contato
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("projects")} className="bg-white text-primary hover:bg-white/90 shadow-glow hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold">
                Ver Projetos
              </Button>
            </div>
            
            {/* Stats/Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">15+</div>
                <div className="text-white/80 text-sm">Anos de Experiência</div>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">35+</div>
                <div className="text-white/80 text-sm">Membros Gerenciados</div>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">6+</div>
                <div className="text-white/80 text-sm">Produtos Lançados</div>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">4</div>
                <div className="text-white/80 text-sm">Grandes Empresas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="py-24 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-subtle opacity-50 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Resumo Profissional</h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          </div>
          
          <Card className="max-w-5xl mx-auto shadow-elegant border-2 border-border/50 backdrop-blur-sm bg-card/95">
            <CardContent className="p-10 md:p-16">
              <div className="space-y-6">
                <p className="text-xl text-foreground leading-relaxed font-medium">
                  Sou um profissional especializado em gestão estratégica de produtos digitais e Observabilidade, 
                  com mais de 5 anos de experiência na liderança de equipes ágeis e multidisciplinares.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Minha trajetória inclui atuação em empresas de grande porte como <span className="text-teal-accent font-semibold">Icatu Seguros</span>, 
                  <span className="text-teal-accent font-semibold"> Oi</span>, <span className="text-teal-accent font-semibold">TIM Brasil</span> e 
                  <span className="text-teal-accent font-semibold"> Rede Globo</span>, nas quais liderei iniciativas de alta relevância envolvendo 
                  produtos digitais, performance, qualidade e inovação.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Possuo sólida experiência em todo o ciclo de vida dos produtos digitais, desde a concepção e 
                  lançamento até estratégias de atendimento pós-venda. Meu forte está em liderar equipes ágeis, 
                  cultivando uma cultura analítica e data-driven.
                </p>
                <div className="pt-6 border-t border-border/50">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-semibold">Ferramentas principais:</span> Dynatrace, Grafana, 
                    Azure Monitor e Google Analytics para implementar estratégias robustas de Observabilidade, elevando 
                    significativamente a eficiência operacional e a resiliência dos produtos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ==================== SKILLS SECTION ==================== */}
      <section id="skills" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Habilidades</h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Especializado em observabilidade, product management e análise de dados
            </p>
          </div>
          {/* Grid de skills - responsivo */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {skills.map((skill, index) => <SkillCard key={skill.name} skill={skill} index={index} />)}
          </div>
        </div>
      </section>

      {/* ==================== EDUCATION SECTION ==================== */}
      <section id="education" className="py-24 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-subtle opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Formação Acadêmica</h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sólida formação acadêmica em tecnologia e marketing digital
            </p>
          </div>
          
          <Card className="max-w-5xl mx-auto shadow-elegant border-2 border-border/50 backdrop-blur-sm bg-card/95">
            <CardContent className="p-10 md:p-12">
              <div className="space-y-10">
                {education.map((edu, index) => <EducationItem key={index} education={edu} />)}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ==================== EXPERIENCE SECTION ==================== */}
      <section id="experience" className="py-24 bg-muted/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary opacity-5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-accent/10 opacity-5 blur-3xl rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Experiência Profissional</h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mais de 15 anos liderando produtos digitais e equipes em grandes empresas
            </p>
          </div>
          
          <Card className="max-w-5xl mx-auto shadow-elegant border-2 border-border/50 backdrop-blur-sm bg-card/95">
            <CardContent className="p-10 md:p-12">
              {/* Timeline de experiências */}
              <div className="space-y-10">
                {experiences.map((experience, index) => <ExperienceItem key={index} experience={experience} />)}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ==================== PROJECTS SECTION ==================== */}
      <section id="projects" className="py-24 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-subtle opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Principais Projetos</h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Projetos de destaque que geraram impacto significativo
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => <ProjectCard key={index} project={project} />)}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT SECTION ==================== */}
      <section id="contact" className="py-28 bg-gradient-hero relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-accent/10 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '1s'
      }} />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Vamos Conectar</h2>
            <div className="w-24 h-1 bg-white/80 mx-auto rounded-full mb-6" />
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Estou sempre interessado em ouvir sobre novas oportunidades e colaborações
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-3xl mx-auto">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow hover:scale-105 transition-all duration-300 w-full sm:w-auto px-8 py-6 text-lg" onClick={() => window.location.href = "mailto:neigirao@gmail.com"}>
              <MailIcon className="w-6 h-6 mr-3" />
              Email
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 w-full sm:w-auto px-8 py-6 text-lg hover:scale-105" onClick={() => window.open("https://linkedin.com/in/neigirao", "_blank")}>
              <LinkedInIcon className="w-6 h-6 mr-3" />
              LinkedIn
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 w-full sm:w-auto px-8 py-6 text-lg hover:scale-105" onClick={() => window.open("tel:21989921711", "_blank")}>
              <PhoneIcon className="w-6 h-6 mr-3" />
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
    </div>;
};
export default Index;