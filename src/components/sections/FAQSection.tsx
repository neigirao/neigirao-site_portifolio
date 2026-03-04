/**
 * FAQSection - Perguntas Frequentes dinâmicas do banco de dados
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useFAQs } from "@/hooks/usePortfolioData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export function FAQSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { faqs, isLoading } = useFAQs();
  const { settings } = useSiteSettings();

  const subtitle = settings.section_subtitle_faq || "O que recrutadores e clientes costumam perguntar";

  if (isLoading || faqs.length === 0) return null;

  return (
    <section id="faq" className="py-16 relative overflow-hidden scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground tracking-tight">
            Perguntas Frequentes
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground font-light">
            {subtitle}
          </p>
        </div>

        <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((item) => (
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
