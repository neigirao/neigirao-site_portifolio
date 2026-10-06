/**
 * EducationManager Component
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from './RichTextEditor';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Eye, Copy, EyeOff } from 'lucide-react';
import { DeleteConfirmButton } from './DeleteConfirmButton';
import { toast } from 'sonner';
import { SEOFields } from './SEOFields';
import { SortableList } from './SortableList';
import { PreviewModal } from './PreviewModal';
import { CompletenessIndicator } from './CompletenessIndicator';
import { AutosaveIndicator } from './AutosaveIndicator';
import { useAutosave } from '@/hooks/useAutosave';
import { useFormShortcuts } from '@/hooks/useFormShortcuts';

interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string | null;
  order_index: number;
  meta_title: string | null;
  meta_description: string | null;
  slug: string | null;
  is_visible: boolean;
}

interface EducationManagerProps {
  onDirtyChange?: (dirty: boolean) => void;
}

const emptyForm = { institution: '', degree: '', period: '', description: '', meta_title: '', meta_description: '', slug: '' };

export function EducationManager({ onDirtyChange }: EducationManagerProps) {
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const { status: autosaveStatus, clearDraft } = useAutosave({
    key: 'education-form',
    data: formData,
    onRecover: useCallback((data: typeof emptyForm) => { setFormData(data); }, []),
  });

  useEffect(() => {
    const hasContent = Object.values(formData).some(v => typeof v === 'string' && v.trim().length > 0);
    onDirtyChange?.(hasContent);
  }, [formData, onDirtyChange]);

  useEffect(() => { fetchEducation(); }, []);

  const fetchEducation = async () => {
    setIsLoading(true);
    setFetchError(false);
    const { data, error } = await supabase.from('education').select('*').order('order_index', { ascending: true });
    if (error) { toast.error('Erro ao carregar educação'); setFetchError(true); }
    setEducation(data || []);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextOrderIndex = education.length > 0 ? Math.max(...education.map(edu => edu.order_index)) + 1 : 0;
    const dataToSubmit = {
      institution: formData.institution, degree: formData.degree, period: formData.period,
      description: formData.description || null,
      meta_title: formData.meta_title || null, meta_description: formData.meta_description || null,
      slug: formData.slug || null,
      order_index: editingId ? education.find(e => e.id === editingId)?.order_index || 0 : nextOrderIndex,
    };

    if (formData.slug) {
      let q = supabase.from('education').select('id').eq('slug', formData.slug);
      if (editingId) q = q.neq('id', editingId);
      const { data: existing } = await q.maybeSingle();
      if (existing) { toast.error('Este slug já está em uso. Escolha outro.'); return; }
    }

    if (editingId) {
      const { error } = await supabase.from('education').update(dataToSubmit).eq('id', editingId);
      if (error) { toast.error('Erro ao atualizar educação'); return; }
      toast.success('Educação atualizada!');
    } else {
      const { error } = await supabase.from('education').insert([dataToSubmit]);
      if (error) { toast.error('Erro ao criar educação'); return; }
      toast.success('Educação criada!');
    }
    resetForm();
    fetchEducation();
  };

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    setFormData({
      institution: edu.institution, degree: edu.degree, period: edu.period,
      description: edu.description || '',
      meta_title: edu.meta_title || '', meta_description: edu.meta_description || '', slug: edu.slug || '',
    });
  };

  const handleDuplicate = async (edu: Education) => {
    const nextOrderIndex = education.length > 0 ? Math.max(...education.map(e => e.order_index)) + 1 : 0;
    const { error } = await supabase.from('education').insert([{
      institution: edu.institution, degree: `${edu.degree} (cópia)`, period: edu.period,
      description: edu.description, meta_title: null, meta_description: null, slug: null,
      order_index: nextOrderIndex,
    }]);
    if (error) { toast.error('Erro ao duplicar'); return; }
    toast.success('Educação duplicada!');
    fetchEducation();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('education').delete().eq('id', id);
    if (error) { toast.error('Erro ao excluir educação'); return; }
    toast.success('Educação excluída!');
    fetchEducation();
  };

  const handleToggleVisibility = async (edu: Education) => {
    const { error } = await supabase.from('education').update({ is_visible: !edu.is_visible }).eq('id', edu.id);
    if (error) { toast.error('Erro ao alterar visibilidade'); return; }
    toast.success(edu.is_visible ? 'Educação ocultada' : 'Educação visível');
    fetchEducation();
  };

  const handleReorder = async (reorderedItems: Education[]) => {
    setEducation(reorderedItems);
    await Promise.all(
      reorderedItems.map((item, index) =>
        supabase.from('education').update({ order_index: index }).eq('id', item.id)
      )
    );
    toast.success('Ordem atualizada!');
  };

  const resetForm = () => { setEditingId(null); setFormData(emptyForm); clearDraft(); onDirtyChange?.(false); };

  const formRef = useRef<HTMLFormElement>(null);
  useFormShortcuts({
    onSave: () => formRef.current?.requestSubmit(),
    onCancel: editingId ? resetForm : undefined,
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{editingId ? 'Editar' : 'Nova'} Educação</CardTitle>
            <AutosaveIndicator status={autosaveStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institution">Instituição <span className="text-destructive" aria-hidden="true">*</span></Label>
                <Input id="institution" value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degree">Curso/Grau <span className="text-destructive" aria-hidden="true">*</span></Label>
                <Input id="degree" value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Período <span className="text-destructive" aria-hidden="true">*</span></Label>
              <Input id="period" value={formData.period} onChange={(e) => setFormData({ ...formData, period: e.target.value })} required />
            </div>
            <RichTextEditor value={formData.description} onChange={(value) => setFormData({ ...formData, description: value })} label="Descrição (opcional)" />
            <SEOFields
              metaTitle={formData.meta_title} metaDescription={formData.meta_description} slug={formData.slug}
              onMetaTitleChange={(v) => setFormData({ ...formData, meta_title: v })}
              onMetaDescriptionChange={(v) => setFormData({ ...formData, meta_description: v })}
              onSlugChange={(v) => setFormData({ ...formData, slug: v })}
              titleSource={`${formData.degree} - ${formData.institution}`}
              existingSlugs={education.filter(e => e.id !== editingId && e.slug).map(e => e.slug!)}
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
        ) : fetchError ? (
          <div className="py-8 text-center space-y-3">
            <p className="text-sm text-muted-foreground">Erro ao carregar os dados.</p>
            <Button variant="outline" size="sm" onClick={fetchEducation}>Tentar novamente</Button>
          </div>
        ) : education.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-sm">Nenhuma educação adicionada ainda.</p>
        ) : (
        <SortableList items={education} onReorder={handleReorder} renderItem={(edu) => (
          <Card className={`${editingId === edu.id ? 'ring-2 ring-primary' : ''} ${!edu.is_visible ? 'opacity-50' : ''}`}>
            <CardContent className="pt-4 pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg truncate">{edu.degree}</h3>
                    {!edu.is_visible && <EyeOff className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                    <CompletenessIndicator hasSeo={!!(edu.meta_title && edu.meta_description)} hasSlug={!!edu.slug} itemName={edu.degree} />
                  </div>
                  <p className="text-muted-foreground truncate">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                </div>
                <div className="flex gap-2 items-center flex-shrink-0 ml-4">
                  <Switch checked={edu.is_visible} onCheckedChange={() => handleToggleVisibility(edu)} aria-label={`Visibilidade de ${edu.degree}`} />
                  <Button size="icon" variant="outline" onClick={() => handleDuplicate(edu)} aria-label={`Duplicar ${edu.degree}`}>
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => handleEdit(edu)} aria-label={`Editar ${edu.degree}`}>
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <DeleteConfirmButton itemName={edu.degree} onConfirm={() => handleDelete(edu.id)} />
                </div>
              </div>
            </CardContent>
          </Card>
        )} />
        )}
      </div>

      <PreviewModal open={showPreview} onOpenChange={setShowPreview} type="education" data={formData} />
    </div>
  );
}
