/**
 * ProjectsManager Component
 * 
 * Gerenciador de projetos com upload de imagem, editor rico,
 * campos SEO, drag-and-drop e preview.
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
import { RichTextEditor } from './RichTextEditor';
import { SEOFields } from './SEOFields';
import { SortableList } from './SortableList';
import { PreviewModal } from './PreviewModal';
import { CompletenessIndicator } from './CompletenessIndicator';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  link: string | null;
  tags: string[];
  order_index: number;
  meta_title: string | null;
  meta_description: string | null;
  slug: string | null;
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    link: '',
    tags: '',
    meta_title: '',
    meta_description: '',
    slug: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      toast.error('Erro ao carregar projetos');
      return;
    }

    setProjects(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextOrderIndex = projects.length > 0 
      ? Math.max(...projects.map(p => p.order_index)) + 1 
      : 0;

    const dataToSubmit = {
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url || null,
      link: formData.link || null,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      meta_title: formData.meta_title || null,
      meta_description: formData.meta_description || null,
      slug: formData.slug || null,
      order_index: editingId 
        ? projects.find(p => p.id === editingId)?.order_index || 0
        : nextOrderIndex,
    };

    if (editingId) {
      const { error } = await supabase
        .from('projects')
        .update(dataToSubmit)
        .eq('id', editingId);

      if (error) {
        toast.error('Erro ao atualizar projeto');
        return;
      }

      toast.success('Projeto atualizado!');
    } else {
      const { error } = await supabase
        .from('projects')
        .insert([dataToSubmit]);

      if (error) {
        toast.error('Erro ao criar projeto');
        return;
      }

      toast.success('Projeto criado!');
    }

    resetForm();
    fetchProjects();
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      image_url: project.image_url || '',
      link: project.link || '',
      tags: project.tags.join(', '),
      meta_title: project.meta_title || '',
      meta_description: project.meta_description || '',
      slug: project.slug || '',
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erro ao excluir projeto');
      return;
    }

    toast.success('Projeto excluído!');
    fetchProjects();
  };

  const handleReorder = async (reorderedItems: Project[]) => {
    setProjects(reorderedItems);

    const updates = reorderedItems.map((item, index) => ({
      id: item.id,
      order_index: index,
    }));

    for (const update of updates) {
      await supabase
        .from('projects')
        .update({ order_index: update.order_index })
        .eq('id', update.id);
    }

    toast.success('Ordem atualizada!');
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      image_url: '',
      link: '',
      tags: '',
      meta_title: '',
      meta_description: '',
      slug: '',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Editar' : 'Novo'} Projeto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <RichTextEditor
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
              label="Descrição"
            />

            <ImageUploader
              value={formData.image_url}
              onChange={(url) => setFormData({ ...formData, image_url: url })}
              label="Imagem do Projeto"
              folder="projects"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="link">Link do Projeto</Label>
                <Input
                  id="link"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="React, TypeScript, Node.js"
                />
              </div>
            </div>

            <SEOFields
              metaTitle={formData.meta_title}
              metaDescription={formData.meta_description}
              slug={formData.slug}
              onMetaTitleChange={(value) => setFormData({ ...formData, meta_title: value })}
              onMetaDescriptionChange={(value) => setFormData({ ...formData, meta_description: value })}
              onSlugChange={(value) => setFormData({ ...formData, slug: value })}
              titleSource={formData.title}
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
          items={projects}
          onReorder={handleReorder}
          renderItem={(project) => (
            <Card>
              <CardContent className="pt-4 pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg truncate">{project.title}</h3>
                      <CompletenessIndicator
                        hasSeo={!!(project.meta_title && project.meta_description)}
                        hasImage={!!project.image_url}
                        hasSlug={!!project.slug}
                        itemName={project.title}
                      />
                    </div>
                    {project.tags.length > 0 && (
                      <div className="flex gap-2 mt-1 flex-wrap">
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0 ml-4">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      onClick={() => handleEdit(project)}
                      aria-label={`Editar ${project.title}`}
                    >
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="destructive" 
                      onClick={() => handleDelete(project.id)}
                      aria-label={`Excluir ${project.title}`}
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
        type="project"
        data={{
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        }}
      />
    </div>
  );
}
