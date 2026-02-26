/**
 * ImpactMetrics - Seção de Resultados Quantificáveis
 * Fundo escuro/gradiente para destaque visual com animação count-up.
 */

import { TrendingUp, Users, Star, Target, Award, Zap, BarChart, CheckCircle, Globe, Rocket, LucideIcon } from "lucide-react";
import { useImpactMetrics } from "@/hooks/usePortfolioData";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountUp, parseMetricValue } from "@/hooks/useCountUp";

const ICON_MAP: Record<string, LucideIcon> = {
  Star, TrendingUp, Users, Target, Award, Zap, BarChart, CheckCircle, Globe, Rocket,
};

function MetricCard({ metric, index }: { metric: { id: string; value: string; label: string; description: string; icon: string; color: string }; index: number }) {
  const IconComponent = ICON_MAP[metric.icon] || Star;
  const parsed = parseMetricValue(metric.value);
  const { count, ref } = useCountUp(parsed?.number || 0, 2000);

  return (
    <div
      ref={ref}
      className="group relative p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 
        hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="text-teal-accent mb-4 transition-transform duration-300 group-hover:scale-110">
        <IconComponent className="w-7 h-7" />
      </div>
      <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
        {parsed ? `${count}${parsed.suffix}` : metric.value}
      </div>
      <div className="text-lg font-semibold text-white/90 mb-2">
        {metric.label}
      </div>
      <p className="text-sm text-white/60 leading-relaxed">
        {metric.description}
      </p>
    </div>
  );
}

export const ImpactMetrics = () => {
  const { metrics, isLoading } = useImpactMetrics();

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-40 rounded-xl bg-white/10" />)}
          </div>
        </div>
      </section>
    );
  }

  if (!metrics.length) return null;

  return (
    <section className="py-16 bg-gradient-hero relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-white/10 border border-white/20">
            <Award className="w-4 h-4 text-teal-accent" />
            <span className="text-sm font-medium text-white/90">Resultados Comprovados</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
            Impacto Mensurável
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Resultados concretos que demonstram capacidade de entrega e liderança
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.id} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
