/**
 * EducationManager Component
 * 
 * Gerenciador de educação com campos SEO, drag-and-drop e preview.
 */

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { SEOFields } from './SEOFields';
import { SortableList } from './SortableList';
import { PreviewModal } from './PreviewModal';
import { CompletenessIndicator } from './CompletenessIndicator';

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
}

export function EducationManager() {
  const [education, setEducation] = useState<Education[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    period: '',
    description: '',
    meta_title: '',
    meta_description: '',
    slug: '',
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      toast.error('Erro ao carregar educação');
      return;
    }

    setEducation(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextOrderIndex = education.length > 0 
      ? Math.max(...education.map(edu => edu.order_index)) + 1 
      : 0;

    const dataToSubmit = {
      institution: formData.institution,
      degree: formData.degree,
      period: formData.period,
      description: formData.description || null,
      meta_title: formData.meta_title || null,
      meta_description: formData.meta_description || null,
      slug: formData.slug || null,
      order_index: editingId 
        ? education.find(e => e.id === editingId)?.order_index || 0
        : nextOrderIndex,
    };

    if (editingId) {
      const { error } = await supabase
        .from('education')
        .update(dataToSubmit)
        .eq('id', editingId);

      if (error) {
        toast.error('Erro ao atualizar educação');
        return;
      }

      toast.success('Educação atualizada!');
    } else {
      const { error } = await supabase
        .from('education')
        .insert([dataToSubmit]);

      if (error) {
        toast.error('Erro ao criar educação');
        return;
      }

      toast.success('Educação criada!');
    }

    resetForm();
    fetchEducation();
  };

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      period: edu.period,
      description: edu.description || '',
      meta_title: edu.meta_title || '',
      meta_description: edu.meta_description || '',
      slug: edu.slug || '',
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta educação?')) return;

    const { error } = await supabase
      .from('education')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erro ao excluir educação');
      return;
    }

    toast.success('Educação excluída!');
    fetchEducation();
  };

  const handleReorder = async (reorderedItems: Education[]) => {
    setEducation(reorderedItems);

    const updates = reorderedItems.map((item, index) => ({
      id: item.id,
      order_index: index,
    }));

    for (const update of updates) {
      await supabase
        .from('education')
        .update({ order_index: update.order_index })
        .eq('id', update.id);
    }

    toast.success('Ordem atualizada!');
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      institution: '',
      degree: '',
      period: '',
      description: '',
      meta_title: '',
      meta_description: '',
      slug: '',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Editar' : 'Nova'} Educação</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institution">Instituição</Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degree">Curso/Grau</Label>
                <Input
                  id="degree"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="period">Período</Label>
              <Input
                id="period"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição (opcional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <SEOFields
              metaTitle={formData.meta_title}
              metaDescription={formData.meta_description}
              slug={formData.slug}
              onMetaTitleChange={(value) => setFormData({ ...formData, meta_title: value })}
              onMetaDescriptionChange={(value) => setFormData({ ...formData, meta_description: value })}
              onSlugChange={(value) => setFormData({ ...formData, slug: value })}
              titleSource={`${formData.degree} - ${formData.institution}`}
            />

            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? 'Atualizar' : 'Criar'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowPreview(true)}
              >
                <Eye className="h-4 w-4 mr-2" />
                Visualizar
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Arraste os itens para reordenar
        </p>
        <SortableList
          items={education}
          onReorder={handleReorder}
          renderItem={(edu) => (
            <Card>
              <CardContent className="pt-4 pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg truncate">{edu.degree}</h3>
                      <CompletenessIndicator
                        hasSeo={!!(edu.meta_title && edu.meta_description)}
                        hasImage={true} // Education doesn't have images
                        hasSlug={!!edu.slug}
                        itemName={edu.degree}
                      />
                    </div>
                    <p className="text-muted-foreground truncate">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.period}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 ml-4">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      onClick={() => handleEdit(edu)}
                      aria-label={`Editar ${edu.degree}`}
                    >
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="destructive" 
                      onClick={() => handleDelete(edu.id)}
                      aria-label={`Excluir ${edu.degree}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        />
      </div>

      <PreviewModal
        open={showPreview}
        onOpenChange={setShowPreview}
        type="education"
        data={formData}
      />
    </div>
  );
}
