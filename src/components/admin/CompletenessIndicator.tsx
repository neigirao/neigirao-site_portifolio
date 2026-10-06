import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface CompletenessIndicatorProps {
  /** Passe `undefined` para pular o check (entidade não tem SEO). */
  hasSeo?: boolean;
  /** Passe `undefined` para pular o check (entidade não tem imagem). */
  hasImage?: boolean;
  /** Passe `undefined` para pular o check (entidade não tem slug). */
  hasSlug?: boolean;
  itemName: string;
}

export function CompletenessIndicator({ hasSeo, hasImage, hasSlug, itemName }: CompletenessIndicatorProps) {
  const checks: boolean[] = [];
  if (hasSeo !== undefined) checks.push(hasSeo);
  if (hasSlug !== undefined) checks.push(hasSlug);
  if (hasImage !== undefined) checks.push(hasImage);

  if (checks.length === 0) return null;

  const isComplete = checks.every(Boolean);
  const isPartial = checks.some(Boolean) && !isComplete;

  const missingItems: string[] = [];
  if (hasSeo === false) missingItems.push('SEO (título e descrição)');
  if (hasSlug === false) missingItems.push('Slug');
  if (hasImage === false) missingItems.push('Imagem');

  if (isComplete) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Badge
            variant="secondary"
            className="bg-green-500/10 text-green-600 dark:text-green-400 gap-1 cursor-pointer"
            aria-label={`${itemName}: Completo`}
          >
            <CheckCircle className="h-3 w-3" aria-hidden="true" />
            <span className="sr-only">Status:</span>
            Completo
          </Badge>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 text-sm">
          <p>Todos os campos preenchidos ✓</p>
        </PopoverContent>
      </Popover>
    );
  }

  if (isPartial) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Badge
            variant="secondary"
            className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 gap-1 cursor-pointer"
            aria-label={`${itemName}: Incompleto`}
          >
            <AlertCircle className="h-3 w-3" aria-hidden="true" />
            <span className="sr-only">Status:</span>
            Incompleto
          </Badge>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 text-sm">
          <p className="font-medium mb-1">Campos faltando:</p>
          <ul className="text-xs space-y-0.5">
            {missingItems.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant="secondary"
          className="bg-red-500/10 text-red-600 dark:text-red-400 gap-1 cursor-pointer"
          aria-label={`${itemName}: Vazio`}
        >
          <XCircle className="h-3 w-3" aria-hidden="true" />
          <span className="sr-only">Status:</span>
          Vazio
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 text-sm">
        <p className="font-medium mb-1">Campos faltando:</p>
        <ul className="text-xs space-y-0.5">
          {missingItems.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
