/**
 * Skill Card Component
 * 
 * Card animado que exibe uma habilidade técnica com ícone.
 * Inclui animações de hover e entrada escalonada baseada no índice.
 * 
 * @component
 * @example
 * ```tsx
 * <SkillCard 
 *   skill={{ name: "React", icon: ReactIcon }}
 *   index={0}
 * />
 * ```
 */

import React from 'react';
import { Card, CardContent } from './ui/card';
import { OptimizedImage } from './ui/optimized-image';
import { BriefcaseIcon, BarChartIcon, LaptopIcon, DonutChartIcon, LightbulbIcon, PercentageIcon, AzureIcon } from './Icons';

// Map skill names to icons for database skills
const skillIconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  'Product Management': BriefcaseIcon,
  'Observabilidade': BarChartIcon,
  'Agile/Scrum': LaptopIcon,
  'Data Analysis': DonutChartIcon,
  'Digital Products': LightbulbIcon,
  'Strategy': PercentageIcon,
  'Azure Monitor': AzureIcon,
};

/**
 * Props do SkillCard - suporta dados do banco ou estáticos
 */
interface SkillCardProps {
  skill: {
    name: string;
    icon?: string | React.ComponentType<React.SVGProps<SVGSVGElement>>;
    logo_url?: string | null;
  };
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  // Determine icon source: logo_url from DB, icon prop from static data, or fallback to map
  const logoUrl = skill.logo_url || (typeof skill.icon === 'string' ? skill.icon : null);
  const IconComponent = typeof skill.icon === 'function' ? skill.icon : skillIconMap[skill.name];
  
  return (
    <Card 
      className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-card border-border hover:border-teal-accent/30"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
        <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
          {logoUrl ? (
            <OptimizedImage 
              src={logoUrl} 
              alt={`${skill.name} logo`} 
              className="w-12 h-12 object-contain bg-transparent" 
            />
          ) : IconComponent ? (
            React.createElement(IconComponent, {
              className: "w-12 h-12 text-white",
              'aria-label': `Ícone de ${skill.name}`
            })
          ) : (
            <div className="w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
              {skill.name.charAt(0)}
            </div>
          )}
        </div>
        <h3 className="font-semibold text-foreground group-hover:text-teal-accent transition-colors duration-300 text-base">
          {skill.name}
        </h3>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
