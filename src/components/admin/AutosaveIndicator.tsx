import { Cloud, CloudOff, Check, RotateCcw } from 'lucide-react';

interface AutosaveIndicatorProps {
  status: 'idle' | 'saving' | 'saved' | 'recovered';
}

export function AutosaveIndicator({ status }: AutosaveIndicatorProps) {
  if (status === 'idle') return null;

  const config = {
    saving: { icon: Cloud, text: 'Salvando rascunho...', className: 'text-muted-foreground' },
    saved: { icon: Check, text: 'Rascunho salvo', className: 'text-green-600 dark:text-green-400' },
    recovered: { icon: RotateCcw, text: 'Rascunho recuperado', className: 'text-blue-600 dark:text-blue-400' },
  }[status];

  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-1.5 text-xs ${config.className} animate-in fade-in duration-300`}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{config.text}</span>
    </div>
  );
}
