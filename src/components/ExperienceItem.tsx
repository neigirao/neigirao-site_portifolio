/**
 * Experience Item Component
 * 
 * Renderiza um item individual de experiência profissional em formato de timeline.
 * Inclui período, cargo, empresa e lista de responsabilidades.
 * 
 * @component
 * @example
 * ```tsx
 * <ExperienceItem 
 *   experience={{
 *     period: "2023-Presente",
 *     role: "Senior Analyst",
 *     company: "Tech Corp",
 *     description: ["Responsabilidade 1", "Responsabilidade 2"]
 *   }}
 * />
 * ```
 */

import React from 'react';

/**
 * Props do ExperienceItem - suporta dados do banco ou estáticos
 */
interface ExperienceItemProps {
  experience: {
    period: string;
    role: string;
    company: string;
    description: string | string[];
  };
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience }) => {
  return (
    <div className="relative pl-8 sm:pl-32 py-8 group hover:bg-muted/20 rounded-lg transition-all duration-300 -mx-4 px-4">
      <div className="flex flex-col sm:flex-row items-start mb-4 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-border sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3 after:h-3 after:bg-teal-accent after:border-4 after:box-content after:border-card after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5 group-hover:after:scale-125 after:transition-transform after:duration-300 after:shadow-glow">
        <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-bold uppercase w-28 h-7 mb-4 sm:mb-0 text-teal-accent bg-teal-accent/10 rounded-full border-2 border-teal-accent/30 group-hover:border-teal-accent/50 transition-colors">
          {experience.period}
        </time>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-teal-accent transition-colors">
            {experience.role}
          </h3>
          <div className="text-lg text-muted-foreground font-semibold mb-4">
            {experience.company}
          </div>
        </div>
      </div>
      <ul className="space-y-3 mt-4">
        {(Array.isArray(experience.description) 
          ? experience.description 
          : experience.description.split('. ').filter(Boolean)
        ).map((point, index) => (
          <li key={index} className="flex items-start text-muted-foreground leading-relaxed">
            <span className="text-teal-accent mr-3 mt-1 flex-shrink-0">▪</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceItem;
