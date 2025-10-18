import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ExperienceItem from "@/components/ExperienceItem";
import SkillCard from "@/components/SkillCard";
import { MailIcon, LinkedInIcon, GithubIcon } from "@/components/Icons";
import { experiences, skills } from "@/data/portfolio";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-card/80 backdrop-blur-lg border-b border-border z-50 shadow-elegant">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Nei Girão
            </h1>
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "experience", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-secondary ${
                    activeSection === section ? "text-secondary" : "text-muted-foreground"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-hero pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Data Analyst & <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Cloud Specialist
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
              Transforming data into actionable insights with modern analytics tools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-secondary hover:bg-secondary/90 text-white shadow-glow"
              >
                Get in Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("experience")}
                className="border-white/20 text-white hover:bg-white/10"
              >
                View My Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">About Me</h2>
          <Card className="max-w-4xl mx-auto shadow-elegant">
            <CardContent className="p-8 md:p-12">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I'm a passionate data analyst with expertise in cloud technologies and modern analytics platforms. 
                With years of experience in transforming complex data into clear, actionable insights, I help 
                organizations make data-driven decisions.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My approach combines technical expertise in tools like Dynatrace, Google Analytics, Azure, and 
                Grafana with strong business acumen to deliver solutions that drive real results.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Skills & Expertise</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Proficient in a wide range of analytics and cloud technologies
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Professional Experience</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            My journey in data analytics and cloud technologies
          </p>
          <Card className="max-w-4xl mx-auto shadow-elegant">
            <CardContent className="p-8">
              <div className="space-y-8">
                {experiences.map((experience, index) => (
                  <ExperienceItem key={index} experience={experience} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Let's Connect</h2>
          <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
            I'm always interested in hearing about new opportunities and collaborations
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-glow"
              onClick={() => window.location.href = "mailto:nei.girao@example.com"}
            >
              <MailIcon className="w-5 h-5 mr-2" />
              Email Me
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
              onClick={() => window.open("https://github.com/neigirao", "_blank")}
            >
              <GithubIcon className="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
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
