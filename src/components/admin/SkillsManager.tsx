/**
 * SkillsManager Component
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Eye, Copy, EyeOff } from 'lucide-react';
import { DeleteConfirmButton } from './DeleteConfirmButton';
import { toast } from 'sonner';
import { ImageUploader } from './ImageUploader';
import { SEOFields } from './SEOFields';
import { SortableList } from './SortableList';
import { PreviewModal } from './PreviewModal';
import { CompletenessIndicator } from './CompletenessIndicator';
import { AutosaveIndicator } from './AutosaveIndicator';
import { useAutosave } from '@/hooks/useAutosave';

interface Skill {
  id: string;
  name: string;
  logo_url: string | null;
  category: string | null;
  order_index: number;
  meta_title: string | null;
  meta_description: string | null;
  slug: string | null;
  is_visible: boolean;
}

interface SkillsManagerProps {
  onDirtyChange?: (dirty: boolean) => void;
}

const emptyForm = { name: '', logo_url: '', category: '', meta_title: '', meta_description: '', slug: '' };

export function SkillsManager({ onDirtyChange }: SkillsManagerProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const { status: autosaveStatus, clearDraft } = useAutosave({
    key: 'skills-form',
    data: formData,
    onRecover: useCallback((data: typeof emptyForm) => { setFormData(data); }, []),
  });

  useEffect(() => {
    const hasContent = Object.values(formData).some(v => typeof v === 'string' && v.trim().length > 0);
    onDirtyChange?.(hasContent);
  }, [formData, onDirtyChange]);

  useEffect(() => { fetchSkills(); }, []);

  const fetchSkills = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('skills').select('*').order('order_index', { ascending: true });
    if (error) { toast.error('Erro ao carregar skills'); }
    setSkills(data || []);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextOrderIndex = skills.length > 0 ? Math.max(...skills.map(s => s.order_index)) + 1 : 0;
    const dataToSubmit = {
      name: formData.name, logo_url: formData.logo_url || null,
      category: formData.category || null,
      meta_title: formData.meta_title || null, meta_description: formData.meta_description || null,
      slug: formData.slug || null,
      order_index: editingId ? skills.find(s => s.id === editingId)?.order_index || 0 : nextOrderIndex,
    };

    if (editingId) {
      const { error } = await supabase.from('skills').update(dataToSubmit).eq('id', editingId);
      if (error) { toast.error('Erro ao atualizar skill'); return; }
      toast.success('Skill atualizada!');
    } else {
      const { error } = await supabase.from('skills').insert([dataToSubmit]);
      if (error) { toast.error('Erro ao criar skill'); return; }
      toast.success('Skill criada!');
    }
    resetForm();
    fetchSkills();
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name, logo_url: skill.logo_url || '', category: skill.category || '',
      meta_title: skill.meta_title || '', meta_description: skill.meta_description || '', slug: skill.slug || '',
    });
  };

  const handleDuplicate = async (skill: Skill) => {
    const nextOrderIndex = skills.length > 0 ? Math.max(...skills.map(s => s.order_index)) + 1 : 0;
    const { error } = await supabase.from('skills').insert([{
      name: `${skill.name} (cópia)`, logo_url: skill.logo_url, category: skill.category,
      meta_title: null, meta_description: null, slug: null, order_index: nextOrderIndex,
    }]);
    if (error) { toast.error('Erro ao duplicar'); return; }
    toast.success('Skill duplicada!');
    fetchSkills();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) { toast.error('Erro ao excluir skill'); return; }
    toast.success('Skill excluída!');
    fetchSkills();
  };

  const handleToggleVisibility = async (skill: Skill) => {
    const { error } = await supabase.from('skills').update({ is_visible: !skill.is_visible }).eq('id', skill.id);
    if (error) { toast.error('Erro ao alterar visibilidade'); return; }
    toast.success(skill.is_visible ? 'Skill ocultada' : 'Skill visível');
    fetchSkills();
  };

  const handleReorder = async (reorderedItems: Skill[]) => {
    setSkills(reorderedItems);
    await Promise.all(
      reorderedItems.map((item, index) =>
        supabase.from('skills').update({ order_index: index }).eq('id', item.id)
      )
    );
    toast.success('Ordem atualizada!');
  };

  const resetForm = () => { setEditingId(null); setFormData(emptyForm); clearDraft(); onDirtyChange?.(false); };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{editingId ? 'Editar' : 'Nova'} Skill</CardTitle>
            <AutosaveIndicator status={autosaveStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome <span className="text-destructive" aria-hidden="true">*</span></Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Frontend, Backend, DevOps..." />
              </div>
            </div>
            <ImageUploader value={formData.logo_url} onChange={(url) => setFormData({ ...formData, logo_url: url })} label="Logo da Skill" folder="skills" />
            <SEOFields
              metaTitle={formData.meta_title} metaDescription={formData.meta_description} slug={formData.slug}
              onMetaTitleChange={(v) => setFormData({ ...formData, meta_title: v })}
              onMetaDescriptionChange={(v) => setFormData({ ...formData, meta_description: v })}
              onSlugChange={(v) => setFormData({ ...formData, slug: v })}
              titleSource={formData.name}
            />
            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'Atualizar' : 'Criar'}</Button>
              <Button type="button" variant="outline" onClick={() => setShowPreview(true)}><Eye className="h-4 w-4 mr-2" />Visualizar</Button>
              {editingId && <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Arraste os itens para reordenar</p>
        {isLoading ? (
          <div className="py-8 text-center text-muted-foreground text-sm">Carregando...</div>
        ) : skills.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-sm">Nenhuma skill adicionada ainda.</p>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SortableList items={skills} onReorder={handleReorder}
            strategy="grid"
            className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            renderItem={(skill) => (
              <Card className={`h-full ${!skill.is_visible ? 'opacity-50' : ''}`}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-3">
                    {skill.logo_url ? (
                      <img src={skill.logo_url} alt={`Logo ${skill.name}`} className="w-8 h-8 object-contain" />
                    ) : (
                      <div className="w-8 h-8 bg-muted rounded flex items-center justify-center" aria-hidden="true">
                        <span className="text-xs text-muted-foreground">?</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold truncate">{skill.name}</h3>
                        {!skill.is_visible && <EyeOff className="h-3 w-3 text-muted-foreground flex-shrink-0" />}
                        <CompletenessIndicator hasSeo={!!(skill.meta_title && skill.meta_description)} hasImage={!!skill.logo_url} hasSlug={!!skill.slug} itemName={skill.name} />
                      </div>
                      {skill.category && <p className="text-sm text-muted-foreground truncate">{skill.category}</p>}
                    </div>
                    <div className="flex gap-1 items-center flex-shrink-0">
                      <Switch checked={skill.is_visible} onCheckedChange={() => handleToggleVisibility(skill)} aria-label={`Visibilidade de ${skill.name}`} />
                      <Button size="icon" variant="ghost" onClick={() => handleDuplicate(skill)} aria-label={`Duplicar ${skill.name}`}>
                        <Copy className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(skill)} aria-label={`Editar ${skill.name}`}>
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      <DeleteConfirmButton itemName={skill.name} onConfirm={() => handleDelete(skill.id)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          />
        </div>
        )}
      </div>

      <PreviewModal open={showPreview} onOpenChange={setShowPreview} type="skill" data={formData} />
    </div>
  );
}
