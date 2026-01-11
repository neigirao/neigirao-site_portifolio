/**
 * AvailabilityBadge - Badge de Disponibilidade
 * 
 * Exibe um badge animado indicando disponibilidade para novas oportunidades.
 * Inclui um dot pulsante verde para chamar atenção de recrutadores.
 */

import { Briefcase } from "lucide-react";

interface AvailabilityBadgeProps {
  isAvailable?: boolean;
  className?: string;
}

export const AvailabilityBadge = ({ 
  isAvailable = true, 
  className = "" 
}: AvailabilityBadgeProps) => {
  if (!isAvailable) return null;

  return (
    <div 
      className={`inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full 
        bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-sm
        animate-fade-in ${className}`}
    >
      {/* Pulsing dot */}
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
      </span>
      
      <span className="text-emerald-100 text-sm font-medium">
        Aberto a novas oportunidades
      </span>
      
      <Briefcase className="w-4 h-4 text-emerald-300" />
    </div>
  );
};

export default AvailabilityBadge;
