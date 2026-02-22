/**
 * ImpactMetrics - Seção de Resultados Quantificáveis
 * Busca dados da tabela impact_metrics via hook.
 */

import { TrendingUp, Users, Star, Target, Award, Zap, BarChart, CheckCircle, Globe, Rocket, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useImpactMetrics } from "@/hooks/usePortfolioData";
import { Skeleton } from "@/components/ui/skeleton";

const ICON_MAP: Record<string, LucideIcon> = {
  Star, TrendingUp, Users, Target, Award, Zap, BarChart, CheckCircle, Globe, Rocket,
};

export const ImpactMetrics = () => {
  const { metrics, isLoading } = useImpactMetrics();

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-40 rounded-xl" />)}
          </div>
        </div>
      </section>
    );
  }

  if (!metrics.length) return null;

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
          {metrics.map((metric, index) => {
            const IconComponent = ICON_MAP[metric.icon] || Star;
            return (
              <Card
                key={metric.id}
                className="group relative overflow-hidden border-2 border-border/50 hover:border-accent/50 
                  transition-all duration-300 hover:shadow-elegant hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className={`${metric.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {metric.value}
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-2">
                    {metric.label}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {metric.description}
                  </p>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-primary opacity-5 
                    rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-300" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
