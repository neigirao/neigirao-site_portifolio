import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Wand2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

function generateSlugClient(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

interface BulkSlugGeneratorProps {
  onComplete?: () => void;
}

export function BulkSlugGenerator({ onComplete }: BulkSlugGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    let totalGenerated = 0;

    try {
      // Fetch all items without slugs from all tables
      const [expRes, projRes, skillRes, eduRes] = await Promise.all([
        supabase.from('experiences').select('id, role, company, slug'),
        supabase.from('projects').select('id, title, slug'),
        supabase.from('skills').select('id, name, slug'),
        supabase.from('education').select('id, degree, institution, slug'),
      ]);

      const updates: PromiseLike<unknown>[] = [];

      // Experiences without slug
      for (const exp of (expRes.data || []).filter(e => !e.slug)) {
        const slug = generateSlugClient(`${exp.role}-${exp.company}`);
        updates.push(supabase.from('experiences').update({ slug }).eq('id', exp.id));
        totalGenerated++;
      }

      // Projects without slug
      for (const proj of (projRes.data || []).filter(p => !p.slug)) {
        const slug = generateSlugClient(proj.title);
        updates.push(supabase.from('projects').update({ slug }).eq('id', proj.id));
        totalGenerated++;
      }

      // Skills without slug
      for (const skill of (skillRes.data || []).filter(s => !s.slug)) {
        const slug = generateSlugClient(skill.name);
        updates.push(supabase.from('skills').update({ slug }).eq('id', skill.id));
        totalGenerated++;
      }

      // Education without slug
      for (const edu of (eduRes.data || []).filter(e => !e.slug)) {
        const slug = generateSlugClient(`${edu.degree}-${edu.institution}`);
        updates.push(supabase.from('education').update({ slug }).eq('id', edu.id));
        totalGenerated++;
      }

      await Promise.all(updates);

      if (totalGenerated > 0) {
        toast.success(`${totalGenerated} slug${totalGenerated > 1 ? 's' : ''} gerado${totalGenerated > 1 ? 's' : ''} com sucesso!`);
        onComplete?.();
      } else {
        toast.info('Todos os itens já possuem slug!');
      }
    } catch {
      toast.error('Erro ao gerar slugs');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleGenerate}
      disabled={isGenerating}
      variant="outline"
      size="sm"
    >
      {isGenerating ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
      ) : (
        <Wand2 className="h-4 w-4 mr-2" aria-hidden="true" />
      )}
      {isGenerating ? 'Gerando...' : 'Gerar slugs em massa'}
    </Button>
  );
}
