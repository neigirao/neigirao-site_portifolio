/**
 * SkillsManager Component
 * 
 * Gerenciador de skills com upload de imagem, campos SEO,
 * drag-and-drop e preview.
 */

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploader } from './ImageUploader';
import { SEOFields } from './SEOFields';
import { SortableList } from './SortableList';
import { PreviewModal } from './PreviewModal';

interface Skill {
  id: string;
  name: string;
  logo_url: string | null;
  category: string | null;
  order_index: number;
  meta_title: string | null;
  meta_description: string | null;
  slug: string | null;
}

export function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    category: '',
    meta_title: '',
    meta_description: '',
    slug: '',
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      toast.error('Erro ao carregar skills');
      return;
    }

    setSkills(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextOrderIndex = skills.length > 0 
      ? Math.max(...skills.map(s => s.order_index)) + 1 
      : 0;

    const dataToSubmit = {
      name: formData.name,
      logo_url: formData.logo_url || null,
      category: formData.category || null,
      meta_title: formData.meta_title || null,
      meta_description: formData.meta_description || null,
      slug: formData.slug || null,
      order_index: editingId 
        ? skills.find(s => s.id === editingId)?.order_index || 0
        : nextOrderIndex,
    };

    if (editingId) {
      const { error } = await supabase
        .from('skills')
        .update(dataToSubmit)
        .eq('id', editingId);

      if (error) {
        toast.error('Erro ao atualizar skill');
        return;
      }

      toast.success('Skill atualizada!');
    } else {
      const { error } = await supabase
        .from('skills')
        .insert([dataToSubmit]);

      if (error) {
        toast.error('Erro ao criar skill');
        return;
      }

      toast.success('Skill criada!');
    }

    resetForm();
    fetchSkills();
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      logo_url: skill.logo_url || '',
      category: skill.category || '',
      meta_title: skill.meta_title || '',
      meta_description: skill.meta_description || '',
      slug: skill.slug || '',
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta skill?')) return;

    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erro ao excluir skill');
      return;
    }

    toast.success('Skill excluída!');
    fetchSkills();
  };

  const handleReorder = async (reorderedItems: Skill[]) => {
    setSkills(reorderedItems);

    const updates = reorderedItems.map((item, index) => ({
      id: item.id,
      order_index: index,
    }));

    for (const update of updates) {
      await supabase
        .from('skills')
        .update({ order_index: update.order_index })
        .eq('id', update.id);
    }

    toast.success('Ordem atualizada!');
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      logo_url: '',
      category: '',
      meta_title: '',
      meta_description: '',
      slug: '',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Editar' : 'Nova'} Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Frontend, Backend, DevOps..."
                />
              </div>
            </div>

            <ImageUploader
              value={formData.logo_url}
              onChange={(url) => setFormData({ ...formData, logo_url: url })}
              label="Logo da Skill"
              folder="skills"
            />

            <SEOFields
              metaTitle={formData.meta_title}
              metaDescription={formData.meta_description}
              slug={formData.slug}
              onMetaTitleChange={(value) => setFormData({ ...formData, meta_title: value })}
              onMetaDescriptionChange={(value) => setFormData({ ...formData, meta_description: value })}
              onSlugChange={(value) => setFormData({ ...formData, slug: value })}
              titleSource={formData.name}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SortableList
            items={skills}
            onReorder={handleReorder}
            className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            renderItem={(skill) => (
              <Card className="h-full">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-3">
                    {skill.logo_url && (
                      <img 
                        src={skill.logo_url} 
                        alt={skill.name} 
                        className="w-8 h-8 object-contain"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{skill.name}</h3>
                      {skill.category && (
                        <p className="text-sm text-muted-foreground truncate">{skill.category}</p>
                      )}
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(skill)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(skill.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          />
        </div>
      </div>

      <PreviewModal
        open={showPreview}
        onOpenChange={setShowPreview}
        type="skill"
        data={formData}
      />
    </div>
  );
}
