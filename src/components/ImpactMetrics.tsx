/**
 * ImpactMetrics - Seção de Resultados Quantificáveis
 * 
 * Exibe métricas de impacto em destaque para chamar atenção de headhunters.
 * Cada métrica tem ícone, valor e descrição.
 */

import { TrendingUp, Users, Star, Target, Award, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Metric {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  color: string;
}

const metrics: Metric[] = [
  {
    icon: <Star className="w-6 h-6" />,
    value: "1.5 → 4.5",
    label: "Avaliação App",
    description: "TIM Brasil - Melhoria na nota do app em 6 meses",
    color: "text-yellow-500",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    value: "+40%",
    label: "Redução Custos",
    description: "Icatu - Otimização de infraestrutura e processos",
    color: "text-emerald-500",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: "35+",
    label: "Profissionais",
    description: "Equipes gerenciadas em múltiplos projetos",
    color: "text-blue-500",
  },
  {
    icon: <Target className="w-6 h-6" />,
    value: "100%",
    label: "Disponibilidade",
    description: "SLA mantido em sistemas críticos",
    color: "text-purple-500",
  },
];

export const ImpactMetrics = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-accent/10 border border-accent/20">
            <Award className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Resultados Comprovados</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Impacto Mensurável
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Resultados concretos que demonstram capacidade de entrega e liderança
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden border-2 border-border/50 hover:border-accent/50 
                transition-all duration-300 hover:shadow-elegant hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Icon with color */}
                <div className={`${metric.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  {metric.icon}
                </div>
                
                {/* Value - Big and Bold */}
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {metric.value}
                </div>
                
                {/* Label */}
                <div className="text-lg font-semibold text-foreground mb-2">
                  {metric.label}
                </div>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {metric.description}
                </p>

                {/* Decorative gradient */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-primary opacity-5 
                  rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-300" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
