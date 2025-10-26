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
import type { Skill } from '../types';

/**
 * Props do SkillCard
 * 
 * @interface SkillCardProps
 * @property {Skill} skill - Objeto com nome e ícone da habilidade
 * @property {number} index - Índice do card (para delay de animação)
 */
interface SkillCardProps {
  /** Dados da habilidade (nome e ícone) */
  skill: Skill;
  /** Índice para calcular delay de animação (index * 0.1s) */
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const isImageUrl = typeof skill.icon === 'string';
  
  return (
    <Card 
      className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-card border-border hover:border-teal-accent/30"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
        <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
          {isImageUrl ? (
            <img src={skill.icon as string} alt={skill.name} className="w-12 h-12 object-contain" />
          ) : (
            React.createElement(skill.icon as React.ComponentType<React.SVGProps<SVGSVGElement>>, {
              className: "w-12 h-12 text-white"
            })
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
