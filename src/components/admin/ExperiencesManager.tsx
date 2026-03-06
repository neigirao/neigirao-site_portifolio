/**
 * ExperiencesManager Component
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2, Eye, Copy, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploader } from './ImageUploader';
import { RichTextEditor } from './RichTextEditor';
import { SEOFields } from './SEOFields';
import { SortableList } from './SortableList';
import { PreviewModal } from './PreviewModal';
import { CompletenessIndicator } from './CompletenessIndicator';
import { AutosaveIndicator } from './AutosaveIndicator';
import { useAutosave } from '@/hooks/useAutosave';

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  logo_url: string | null;
  order_index: number;
  meta_title: string | null;
  meta_description: string | null;
  slug: string | null;
  is_visible: boolean;
}

interface ExperiencesManagerProps {
  onDirtyChange?: (dirty: boolean) => void;
}

const emptyForm = {
  company: '', role: '', period: '', description: '', logo_url: '',
  meta_title: '', meta_description: '', slug: '',
};

export function ExperiencesManager({ onDirtyChange }: ExperiencesManagerProps) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const { status: autosaveStatus, clearDraft } = useAutosave({
    key: 'experiences-form',
    data: formData,
    onRecover: useCallback((data: typeof emptyForm) => { setFormData(data); }, []),
  });

  // Track dirty state
  useEffect(() => {
    const hasContent = Object.values(formData).some(v => typeof v === 'string' && v.trim().length > 0);
    onDirtyChange?.(hasContent);
  }, [formData, onDirtyChange]);

  useEffect(() => { fetchExperiences(); }, []);

  const fetchExperiences = async () => {
    const { data, error } = await supabase.from('experiences').select('*').order('order_index', { ascending: true });
    if (error) { toast.error('Erro ao carregar experiências'); return; }
    setExperiences(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextOrderIndex = experiences.length > 0 ? Math.max(...experiences.map(exp => exp.order_index)) + 1 : 0;
    const dataToSubmit = {
      company: formData.company, role: formData.role, period: formData.period,
      description: formData.description, logo_url: formData.logo_url || null,
      meta_title: formData.meta_title || null, meta_description: formData.meta_description || null,
      slug: formData.slug || null,
      order_index: editingId ? experiences.find(e => e.id === editingId)?.order_index || 0 : nextOrderIndex,
    };

    if (editingId) {
      const { error } = await supabase.from('experiences').update(dataToSubmit).eq('id', editingId);
      if (error) { toast.error('Erro ao atualizar experiência'); return; }
      toast.success('Experiência atualizada!');
    } else {
      const { error } = await supabase.from('experiences').insert([dataToSubmit]);
      if (error) { toast.error('Erro ao criar experiência'); return; }
      toast.success('Experiência criada!');
    }
    resetForm();
    fetchExperiences();
  };

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setFormData({
      company: exp.company, role: exp.role, period: exp.period,
      description: exp.description, logo_url: exp.logo_url || '',
      meta_title: exp.meta_title || '', meta_description: exp.meta_description || '', slug: exp.slug || '',
    });
  };

  const handleDuplicate = async (exp: Experience) => {
    const nextOrderIndex = experiences.length > 0 ? Math.max(...experiences.map(e => e.order_index)) + 1 : 0;
    const { error } = await supabase.from('experiences').insert([{
      company: exp.company, role: `${exp.role} (cópia)`, period: exp.period,
      description: exp.description, logo_url: exp.logo_url,
      meta_title: null, meta_description: null, slug: null, order_index: nextOrderIndex,
    }]);
    if (error) { toast.error('Erro ao duplicar'); return; }
    toast.success('Experiência duplicada!');
    fetchExperiences();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta experiência?')) return;
    const { error } = await supabase.from('experiences').delete().eq('id', id);
    if (error) { toast.error('Erro ao excluir experiência'); return; }
    toast.success('Experiência excluída!');
    fetchExperiences();
  };

  const handleToggleVisibility = async (exp: Experience) => {
    const { error } = await supabase.from('experiences').update({ is_visible: !exp.is_visible }).eq('id', exp.id);
    if (error) { toast.error('Erro ao alterar visibilidade'); return; }
    toast.success(exp.is_visible ? 'Experiência ocultada' : 'Experiência visível');
    fetchExperiences();
  };

  const handleReorder = async (reorderedItems: Experience[]) => {
    setExperiences(reorderedItems);
    for (const [index, item] of reorderedItems.entries()) {
      await supabase.from('experiences').update({ order_index: index }).eq('id', item.id);
    }
    toast.success('Ordem atualizada!');
  };

  const resetForm = () => { setEditingId(null); setFormData(emptyForm); clearDraft(); onDirtyChange?.(false); };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{editingId ? 'Editar' : 'Nova'} Experiência</CardTitle>
            <AutosaveIndicator status={autosaveStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input id="company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Cargo</Label>
                <Input id="role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Período</Label>
              <Input id="period" value={formData.period} onChange={(e) => setFormData({ ...formData, period: e.target.value })} required />
            </div>
            <ImageUploader value={formData.logo_url} onChange={(url) => setFormData({ ...formData, logo_url: url })} label="Logo da Empresa" folder="experiences" />
            <RichTextEditor value={formData.description} onChange={(value) => setFormData({ ...formData, description: value })} label="Descrição" />
            <SEOFields
              metaTitle={formData.meta_title} metaDescription={formData.meta_description} slug={formData.slug}
              onMetaTitleChange={(value) => setFormData({ ...formData, meta_title: value })}
              onMetaDescriptionChange={(value) => setFormData({ ...formData, meta_description: value })}
              onSlugChange={(value) => setFormData({ ...formData, slug: value })}
              titleSource={`${formData.role} - ${formData.company}`}
            />
            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'Atualizar' : 'Criar'}</Button>
              <Button type="button" variant="outline" onClick={() => setShowPreview(true)}>
                <Eye className="h-4 w-4 mr-2" /> Visualizar
              </Button>
              {editingId && <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Arraste os itens para reordenar</p>
        <SortableList items={experiences} onReorder={handleReorder} renderItem={(exp) => (
          <Card className={!exp.is_visible ? 'opacity-50' : ''}>
            <CardContent className="pt-4 pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg truncate">{exp.role}</h3>
                    {!exp.is_visible && <EyeOff className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                    <CompletenessIndicator hasSeo={!!(exp.meta_title && exp.meta_description)} hasImage={!!exp.logo_url} hasSlug={!!exp.slug} itemName={exp.role} />
                  </div>
                  <p className="text-muted-foreground truncate">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                </div>
                <div className="flex gap-2 items-center flex-shrink-0 ml-4">
                  <Switch checked={exp.is_visible} onCheckedChange={() => handleToggleVisibility(exp)} aria-label={`Visibilidade de ${exp.role}`} />
                  <Button size="icon" variant="outline" onClick={() => handleDuplicate(exp)} aria-label={`Duplicar ${exp.role}`}>
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => handleEdit(exp)} aria-label={`Editar ${exp.role}`}>
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(exp.id)} aria-label={`Excluir ${exp.role}`}>
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )} />
      </div>

      <PreviewModal open={showPreview} onOpenChange={setShowPreview} type="experience" data={formData} />
    </div>
  );
}
