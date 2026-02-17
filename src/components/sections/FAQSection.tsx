import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FAQ_ITEMS = [
  {
    question: "Quais são as principais habilidades de Nei Girão?",
    answer: 'Sou especializado em <span class="text-teal-accent font-semibold">Product Management</span>, <span class="text-teal-accent font-semibold">Observabilidade</span> (Dynatrace, Grafana, Azure Monitor), Google Analytics, metodologias ágeis (Scrum), análise de dados e gestão de produtos digitais.',
  },
  {
    question: "Quantos anos de experiência você possui?",
    answer: 'Possuo mais de <span class="text-teal-accent font-semibold">15 anos de experiência</span> em gestão de produtos digitais e observabilidade, tendo trabalhado em empresas como Icatu Seguros, Oi, TIM Brasil e Globo.com, liderando equipes de até 35 pessoas.',
  },
  {
    question: "Em quais empresas você trabalhou?",
    answer: 'Trabalhei em grandes empresas brasileiras: <span class="text-teal-accent font-semibold">Icatu Seguros</span> (2021-Presente) como Product Manager de Observabilidade, <span class="text-teal-accent font-semibold">Oi</span> (2009-2021) liderando transformação digital, <span class="text-teal-accent font-semibold">TIM Brasil</span> (2017-2019) melhorando o app Meu TIM de 1,5 para 4,5 estrelas, e <span class="text-teal-accent font-semibold">Globo.com</span> (2016-2017) integrando Globoesporte.com.',
  },
  {
    question: "Quais ferramentas de observabilidade você domina?",
    answer: 'Possuo expertise avançada em <span class="text-teal-accent font-semibold">Dynatrace</span> (APM e monitoramento distribuído), <span class="text-teal-accent font-semibold">Grafana</span> (dashboards customizados), <span class="text-teal-accent font-semibold">Azure Monitor</span> (cloud observability) e <span class="text-teal-accent font-semibold">Google Analytics</span> (análise comportamental), utilizando essas ferramentas para implementar estratégias que reduziram incidentes críticos e melhoraram MTTR.',
  },
  {
    question: "Qual é sua formação acadêmica?",
    answer: 'Possuo <span class="text-teal-accent font-semibold">MBA em Marketing Digital</span> pelo Instituto Infnet (2011-2013), <span class="text-teal-accent font-semibold">Bacharelado em Sistema de Informação</span> pela Universidade Estácio de Sá (2006-2010) e formação técnica em Eletrônica e Telecomunicações pela Escola Técnica Resende Rammel.',
  },
  {
    question: "Quais resultados você alcançou como Product Manager?",
    answer: 'Entreguei resultados mensuráveis como: <span class="text-teal-accent font-semibold">aumento de 15% na conversão</span> do ecommerce de seguros, <span class="text-teal-accent font-semibold">redução de 40% nos custos</span> de atendimento digital, melhoria do <span class="text-teal-accent font-semibold">app rating de 1,5 para 4,5 estrelas</span>, e implementação de estratégias de observabilidade que reduziram incidentes críticos em grandes operações.',
  },
];

export function FAQSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground tracking-tight">Perguntas Frequentes</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Respostas para as dúvidas mais comuns sobre minha experiência
          </p>
        </div>

        <Card className={`max-w-5xl mx-auto shadow-elegant border-2 border-border/50 backdrop-blur-sm bg-card/95 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <CardContent className="p-10 md:p-12">
            <div className="space-y-8">
              {FAQ_ITEMS.map((item, index) => (
                <div key={index}>
                  {index > 0 && <div className="h-px bg-border/50 mb-8" />}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">{item.question}</h3>
                    <p
                      className="text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
