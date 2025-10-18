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
  const Icon = skill.icon;
  
  return (
    <Card 
      className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1 bg-card border-border"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
        <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-primary group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-10 h-10 text-white" />
        </div>
        <h3 className="font-semibold text-foreground">{skill.name}</h3>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
