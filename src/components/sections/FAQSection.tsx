/**
 * FAQSection - Seção de Perguntas Frequentes
 * 
 * Renderiza FAQ real visível na página, alinhado com o schema FAQPage do JSON-LD.
 * Usa accordion para UX limpa e semântica correta para SEO.
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useExperiences, useSkills, useEducation } from "@/hooks/usePortfolioData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export function FAQSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { experiences } = useExperiences();
  const { skills } = useSkills();
  const { education } = useEducation();

  const faqItems = [
    {
      id: "skills",
      question: "Quais são as principais habilidades de Nei Girão?",
      answer: skills.length > 0
        ? `Nei Girão é especializado em ${skills.slice(0, 6).map(s => s.name).join(", ")}, e gestão de produtos digitais.`
        : "Nei Girão é especializado em Product Management, Observabilidade, Agile/Scrum, Data Analysis e gestão de produtos digitais.",
    },
    {
      id: "experience",
      question: "Quantos anos de experiência Nei Girão possui?",
      answer: experiences.length > 0
        ? `Nei Girão possui mais de 15 anos de experiência em gestão de produtos digitais e observabilidade, tendo trabalhado em empresas como ${experiences.slice(0, 4).map(e => e.company).join(", ")}.`
        : "Nei Girão possui mais de 15 anos de experiência em gestão de produtos digitais e observabilidade.",
    },
    {
      id: "companies",
      question: "Em quais empresas Nei Girão trabalhou?",
      answer: experiences.length > 0
        ? `Nei Girão trabalhou em grandes empresas como ${experiences.map(e => `${e.company} (${e.period})`).join(", ")}, liderando equipes e produtos digitais.`
        : "Nei Girão trabalhou em grandes empresas do mercado brasileiro, liderando equipes e produtos digitais.",
    },
    {
      id: "tools",
      question: "Quais ferramentas de observabilidade Nei Girão domina?",
      answer: "Nei Girão possui expertise em Dynatrace, Grafana, Azure Monitor e Google Analytics, utilizando essas ferramentas para implementar estratégias robustas de observabilidade e monitoramento.",
    },
    {
      id: "education",
      question: "Qual é a formação acadêmica de Nei Girão?",
      answer: education.length > 0
        ? `Nei Girão possui ${education.map(e => `${e.degree} pela ${e.institution} (${e.period})`).join(", ")}.`
        : "Nei Girão possui formação acadêmica sólida em áreas de tecnologia e gestão.",
    },
  ];

  return (
    <section id="faq" className="py-16 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground tracking-tight">
            Perguntas Frequentes
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground font-light">
            As dúvidas mais comuns sobre minha trajetória e competências
          </p>
        </div>

        <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border border-border/50 rounded-xl px-6 bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline gap-3">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
