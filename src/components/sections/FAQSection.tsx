/**
 * FAQSection - Perguntas Frequentes reformuladas para recrutadores/clientes reais
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
      id: "availability",
      question: "Você está disponível para novas oportunidades?",
      answer: "Sim, estou aberto a conversas sobre posições de Product Manager, Head de Produto ou consultoria em observabilidade e produtos digitais. Atuo preferencialmente remoto ou híbrido a partir do Rio de Janeiro.",
    },
    {
      id: "impact",
      question: "Qual foi o maior resultado que você entregou como PM?",
      answer: experiences.length > 0
        ? `Um dos resultados mais expressivos foi a evolução da nota do app Meu TIM de 1.5 para 4.5 na App Store, liderando um time multidisciplinar com foco em qualidade e experiência do usuário. Na ${experiences[0]?.company || "empresa atual"}, sigo gerando impacto com cultura data-driven e observabilidade.`
        : "Evolução da nota do app Meu TIM de 1.5 para 4.5 na App Store, liderando time multidisciplinar com foco em qualidade e experiência do usuário.",
    },
    {
      id: "team-size",
      question: "Qual o tamanho de equipe que você já liderou?",
      answer: "Já gerenciei equipes de até 35+ membros, incluindo squads ágeis multidisciplinares com desenvolvedores, designers, QAs e analistas de dados. Tenho experiência com gestão direta e matricial em empresas como Icatu, TIM e Oi.",
    },
    {
      id: "tools",
      question: "Quais ferramentas e metodologias você domina?",
      answer: skills.length > 0
        ? `Trabalho com ${skills.slice(0, 5).map(s => s.name).join(", ")}, entre outras. Em observabilidade, sou especialista em Dynatrace, Grafana e Azure Monitor. Metodologias: Scrum, Kanban, SAFe, OKRs e Discovery contínuo.`
        : "Dynatrace, Grafana, Azure Monitor, Google Analytics, Scrum, Kanban, SAFe, OKRs e Discovery contínuo.",
    },
    {
      id: "education",
      question: "Qual é sua formação?",
      answer: education.length > 0
        ? `Possuo ${education.map(e => `${e.degree} pela ${e.institution}`).join(", ")}. Complemento com certificações em Scrum, Product Ownership e ferramentas de observabilidade.`
        : "Formação sólida em tecnologia e gestão, complementada por certificações em Scrum, Product Ownership e ferramentas de observabilidade.",
    },
  ];

  if (faqItems.length === 0) return null;

  return (
    <section id="faq" className="py-16 relative overflow-hidden scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground tracking-tight">
            Perguntas Frequentes
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground font-light">
            O que recrutadores e clientes costumam perguntar
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
