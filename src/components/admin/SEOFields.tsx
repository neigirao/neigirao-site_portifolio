/**
 * SEOFields Component
 * 
 * Campos de SEO com preview do Google, contador de caracteres,
 * e geração automática de slug.
 */

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Search, Wand2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SEOFieldsProps {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  onMetaTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  titleSource?: string; // Used to auto-generate slug
  existingSlugs?: string[]; // Slugs already taken by other records (for duplicate warning)
}

export function SEOFields({
  metaTitle,
  metaDescription,
  slug,
  onMetaTitleChange,
  onMetaDescriptionChange,
  onSlugChange,
  titleSource,
  existingSlugs,
}: SEOFieldsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Remove multiple hyphens
      .trim();
  };

  const handleAutoSlug = () => {
    if (titleSource) {
      onSlugChange(generateSlug(titleSource));
    }
  };

  // Auto-generate slug when titleSource changes and slug is empty
  useEffect(() => {
    if (titleSource && !slug) {
      onSlugChange(generateSlug(titleSource));
    }
  }, [titleSource]);

  const titleLength = metaTitle.length;
  const descriptionLength = metaDescription.length;

  const getTitleColor = () => {
    if (titleLength === 0) return 'text-muted-foreground';
    if (titleLength <= 60) return 'text-green-500';
    return 'text-red-500';
  };

  const getDescriptionColor = () => {
    if (descriptionLength === 0) return 'text-muted-foreground';
    if (descriptionLength <= 160) return 'text-green-500';
    return 'text-red-500';
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="w-full justify-between p-0 h-auto hover:bg-transparent"
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            <Search className="h-4 w-4" />
            Configurações SEO
          </span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-4 space-y-4">
        {/* Google Preview */}
        <div className="p-4 bg-muted/30 rounded-lg border">
          <p className="text-xs text-muted-foreground mb-2">Preview do Google:</p>
          <div className="space-y-1">
            <p className="text-blue-600 text-lg hover:underline cursor-pointer truncate">
              {metaTitle || 'Título da página'}
            </p>
            <p className="text-green-700 text-sm">
              neigirao.lovable.app/{slug || 'url-da-pagina'}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {metaDescription || 'Descrição da página aparecerá aqui...'}
            </p>
          </div>
        </div>

        {/* Meta Title */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="meta_title">Meta Título</Label>
            <span className={cn('text-xs', getTitleColor())}>
              {titleLength}/60
            </span>
          </div>
          <Input
            id="meta_title"
            value={metaTitle}
            onChange={(e) => onMetaTitleChange(e.target.value)}
            placeholder="Título para SEO (máx. 60 caracteres)"
            maxLength={70}
          />
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="meta_description">Meta Descrição</Label>
            <span className={cn('text-xs', getDescriptionColor())}>
              {descriptionLength}/160
            </span>
          </div>
          <Textarea
            id="meta_description"
            value={metaDescription}
            onChange={(e) => onMetaDescriptionChange(e.target.value)}
            placeholder="Descrição para SEO (máx. 160 caracteres)"
            rows={2}
            maxLength={200}
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL amigável)</Label>
          <div className="flex gap-2">
            <Input
              id="slug"
              value={slug}
              onChange={(e) => onSlugChange(generateSlug(e.target.value))}
              placeholder="url-amigavel"
              aria-invalid={!!(slug && existingSlugs?.includes(slug))}
            />
            {titleSource && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAutoSlug}
                title="Gerar a partir do título"
              >
                <Wand2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          {slug && existingSlugs?.includes(slug) && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Este slug já está em uso por outro registro. Escolha um único.
            </p>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
