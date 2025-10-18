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
import type { Experience } from '../types';

/**
 * Props do ExperienceItem
 * 
 * @interface ExperienceItemProps
 * @property {Experience} experience - Objeto com dados da experiência profissional
 */
interface ExperienceItemProps {
  /** Dados completos da experiência profissional */
  experience: Experience;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience }) => {
  return (
    <div className="relative pl-8 sm:pl-32 py-6 group">
      <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-border sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-teal-accent after:border-4 after:box-content after:border-card after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
        <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-24 h-6 mb-3 sm:mb-0 text-teal-accent bg-teal-accent/10 rounded-full border border-teal-accent/20">
          {experience.period}
        </time>
        <div className="text-xl font-bold text-foreground">
          {experience.role} · {experience.company}
        </div>
      </div>
      <ul className="mt-2 list-disc list-inside text-muted-foreground space-y-1">
        {experience.description.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceItem;
