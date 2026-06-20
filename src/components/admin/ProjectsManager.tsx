/**
 * ProjectsManager Component
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Pencil, Eye, Copy, Search, X, ExternalLink, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploader } from './ImageUploader';
import { MultiImageUploader } from './MultiImageUploader';
import { RichTextEditor } from './RichTextEditor';
import { SEOFields } from './SEOFields';
import { SortableList } from './SortableList';
import { PreviewModal } from './PreviewModal';
import { CompletenessIndicator } from './CompletenessIndicator';
import { AutosaveIndicator } from './AutosaveIndicator';
import { useAutosave } from '@/hooks/useAutosave';
import { useFormShortcuts } from '@/hooks/useFormShortcuts';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  images: string[];
  link: string | null;
  tags: string[];
  order_index: number;
  meta_title: string | null;
  meta_description: string | null;
  slug: string | null;
  highlight_metric: string | null;
  context: string | null;
  challenge: string | null;
  solution: string | null;
  results: string | null;
  learnings: string | null;
  brand: string | null;
  project_subtitle: string | null;
  is_visible: boolean;
}

interface ProjectsManagerProps {
  onDirtyChange?: (dirty: boolean) => void;
}

const emptyForm = {
  title: '',
  description: '',
  image_url: '',
  link: '',
  tags: '',
  meta_title: '',
  meta_description: '',
  slug: '',
  highlight_metric: '',
  context: '',
  challenge: '',
  solution: '',
  results: '',
  learnings: '',
  brand: '',
  project_subtitle: '',
  images: [] as string[],
};

interface ProjectCardProps {
  project: Project;
  editingId: string | null;
  onEdit: (project: Project) => void;
  onDuplicate: (project: Project) => void;
  onDelete: (id: string, name: string) => void;
  onToggleVisibility: (project: Project) => void;
}

const ProjectCard = ({ project, editingId, onEdit, onDuplicate, onDelete, onToggleVisibility }: ProjectCardProps) => (
  <Card className={`${editingId === project.id ? 'ring-2 ring-primary' : ''} ${!project.is_visible ? 'opacity-50' : ''}`}>
    <CardContent className="pt-4 pb-4">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg truncate">{project.title}</h3>
            {project.highlight_metric && (
              <span className="text-xs bg-teal-accent/10 text-teal-accent px-2 py-0.5 rounded-full font-medium">{project.highlight_metric}</span>
            )}
            <CompletenessIndicator hasSeo={!!(project.meta_title && project.meta_description)} hasImage={!!project.image_url} hasSlug={!!project.slug} itemName={project.title} />
          </div>
          {project.tags.length > 0 && (
            <div className="flex gap-2 mt-1 flex-wrap">
              {project.tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="text-xs bg-muted px-2 py-1 rounded">{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2 flex-shrink-0 ml-4 items-center">
          <Switch checked={project.is_visible} onCheckedChange={() => onToggleVisibility(project)} aria-label={`Visibilidade de ${project.title}`} />
          {project.slug && project.is_visible && (
            <Button size="icon" variant="ghost" asChild aria-label={`Ver ${project.title} no site`}>
              <a href={`/projeto/${project.slug}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          )}
          <Button size="icon" variant="outline" onClick={() => onDuplicate(project)} aria-label={`Duplicar ${project.title}`}>
            <Copy className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button size="icon" variant="outline" onClick={() => onEdit(project)} aria-label={`Editar ${project.title}`}>
            <Pencil className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button size="icon" variant="destructive" onClick={() => onDelete(project.id, project.title)} aria-label={`Excluir ${project.title}`}>
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export function ProjectsManager({ onDirtyChange }: ProjectsManagerProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { status: autosaveStatus, clearDraft } = useAutosave({
    key: 'projects-form',
    data: formData,
    onRecover: useCallback((data: typeof emptyForm) => {
      setFormData(data);
    }, []),
  });

  useEffect(() => {
    const hasContent = Object.values(formData).some(v => typeof v === 'string' && v.trim().length > 0);
    onDirtyChange?.(hasContent);
  }, [formData, onDirtyChange]);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    setFetchError(false);
    const { data, error } = await supabase.from('projects').select('*').order('order_index', { ascending: true });
    if (error) { toast.error('Erro ao carregar projetos'); setFetchError(true); }
    setProjects(data || []);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextOrderIndex = projects.length > 0 ? Math.max(...projects.map(p => p.order_index)) + 1 : 0;
    const dataToSubmit = {
      title: formData.title, description: formData.description,
      image_url: formData.image_url || null, link: formData.link || null,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      meta_title: formData.meta_title || null, meta_description: formData.meta_description || null,
      slug: formData.slug || null,
      highlight_metric: formData.highlight_metric || null,
      context: formData.context || null,
      challenge: formData.challenge || null,
      solution: formData.solution || null,
      results: formData.results || null,
      learnings: formData.learnings || null,
      brand: formData.brand || null,
      project_subtitle: formData.project_subtitle || null,
      images: formData.images || [],
      order_index: editingId ? projects.find(p => p.id === editingId)?.order_index || 0 : nextOrderIndex,
    };

    if (formData.slug) {
      let slugQuery = supabase.from('projects').select('id').eq('slug', formData.slug);
      if (editingId) slugQuery = slugQuery.neq('id', editingId);
      const { data: existing } = await slugQuery.maybeSingle();
      if (existing) {
        toast.error('Este slug já está em uso. Escolha outro.');
        return;
      }
    }

    if (editingId) {
      const { error } = await supabase.from('projects').update(dataToSubmit).eq('id', editingId);
      if (error) { toast.error(`Erro ao atualizar projeto: ${error.message}`); return; }
      toast.success('Projeto atualizado!');
    } else {
      const { error } = await supabase.from('projects').insert([dataToSubmit]);
      if (error) { toast.error(`Erro ao criar projeto: ${error.message}`); return; }
      toast.success('Projeto criado!');
    }
    resetForm();
    fetchProjects();
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title, description: project.description,
      image_url: project.image_url || '', link: project.link || '',
      tags: project.tags.join(', '),
      meta_title: project.meta_title || '', meta_description: project.meta_description || '',
      slug: project.slug || '',
      highlight_metric: project.highlight_metric || '',
      context: project.context || '',
      challenge: project.challenge || '',
      solution: project.solution || '',
      results: project.results || '',
      learnings: project.learnings || '',
      brand: project.brand || '',
      project_subtitle: project.project_subtitle || '',
      images: project.images || [],
    });
  };

  const handleDuplicate = async (project: Project) => {
    const nextOrderIndex = projects.length > 0 ? Math.max(...projects.map(p => p.order_index)) + 1 : 0;
    const { error } = await supabase.from('projects').insert([{
      title: `${project.title} (cópia)`, description: project.description,
      image_url: project.image_url, link: project.link,
      tags: project.tags, meta_title: null, meta_description: null, slug: null,
      highlight_metric: project.highlight_metric,
      context: project.context, challenge: project.challenge,
      solution: project.solution, results: project.results, learnings: project.learnings,
      order_index: nextOrderIndex,
    }]);
    if (error) { toast.error(`Erro ao duplicar: ${error.message}`); return; }
    toast.success('Projeto duplicado!');
    fetchProjects();
  };

  const handleDelete = async (id: string, name: string) => {
    const deletedItem = projects.find(i => i.id === id);
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) { toast.error(`Erro ao excluir: ${error.message}`); return; }
    fetchProjects();
    if (deletedItem) {
      const { id: _id, ...itemWithoutId } = deletedItem;
      toast.success('Excluído!', {
        action: {
          label: 'Desfazer',
          onClick: async () => {
            await supabase.from('projects').insert([itemWithoutId]);
            fetchProjects();
          },
        },
      });
    } else {
      toast.success('Excluído!');
    }
  };

  const handleToggleVisibility = async (project: Project) => {
    const { error } = await supabase.from('projects').update({ is_visible: !project.is_visible }).eq('id', project.id);
    if (error) { toast.error('Erro ao alterar visibilidade'); return; }
    setProjects(prev => prev.map(p => p.id === project.id ? { ...p, is_visible: !project.is_visible } : p));
  };

  const handleReorder = async (reorderedItems: Project[]) => {
    const previousItems = projects;
    setProjects(reorderedItems);
    const results = await Promise.all(
      reorderedItems.map((item, index) =>
        supabase.from('projects').update({ order_index: index }).eq('id', item.id)
      )
    );
    if (results.some(r => r.error)) {
      setProjects(previousItems);
      toast.error('Erro ao salvar ordem. Revertendo.');
      return;
    }
    toast.success('Ordem atualizada!');
  };

  const resetForm = () => { setEditingId(null); setFormData(emptyForm); clearDraft(); onDirtyChange?.(false); };

  const formRef = useRef<HTMLFormElement>(null);
  useFormShortcuts({
    onSave: () => formRef.current?.requestSubmit(),
    onCancel: editingId ? resetForm : undefined,
  });

  const filteredProjects = searchQuery
    ? projects.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : projects;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{editingId ? 'Editar' : 'Novo'} Projeto</CardTitle>
            <AutosaveIndicator status={autosaveStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            </div>
            <RichTextEditor value={formData.description} onChange={(value) => setFormData({ ...formData, description: value })} label="Descrição" />
            <ImageUploader value={formData.image_url} onChange={(url) => setFormData({ ...formData, image_url: url })} label="Imagem do Projeto" folder="projects" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="link">Link do Projeto</Label>
                <Input id="link" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input id="tags" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="React, TypeScript, Node.js" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="highlight_metric">Métrica de Destaque</Label>
              <Input
                id="highlight_metric"
                value={formData.highlight_metric}
                onChange={(e) => setFormData({ ...formData, highlight_metric: e.target.value })}
                placeholder="Ex: +15% conversão · 6 produtos lançados"
                maxLength={100}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Métrica-chave exibida em destaque no card e na página do projeto</span>
                <span>{formData.highlight_metric.length}/100</span>
              </div>
            </div>

            {/* Campos para design editorial */}
            <div className="space-y-3 p-3 border rounded-lg bg-muted/30">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Campos para Home Editorial</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="brand">Marca/Empresa (ex: ICATU, OI, TIM)</Label>
                  <Input id="brand" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} placeholder="ICATU" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project_subtitle">Subtítulo do projeto</Label>
                  <Input id="project_subtitle" value={formData.project_subtitle} onChange={(e) => setFormData({ ...formData, project_subtitle: e.target.value })} placeholder="Conversão online +15%" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Exibidos no grid de projetos da home editorial (Direction C).</p>
            </div>

            {/* Case Study Fields */}
            <div className="border-t border-border pt-4 mt-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">📋 Case Study (opcional)</h3>
              <div className="space-y-4">
                <RichTextEditor value={formData.context} onChange={(value) => setFormData({ ...formData, context: value })} label="Contexto" />
                <RichTextEditor value={formData.challenge} onChange={(value) => setFormData({ ...formData, challenge: value })} label="Desafio" />
                <RichTextEditor value={formData.solution} onChange={(value) => setFormData({ ...formData, solution: value })} label="Solução" />
                <RichTextEditor value={formData.results} onChange={(value) => setFormData({ ...formData, results: value })} label="Resultados" />
                <RichTextEditor value={formData.learnings} onChange={(value) => setFormData({ ...formData, learnings: value })} label="Aprendizados" />
              </div>
            </div>

            <SEOFields
              metaTitle={formData.meta_title} metaDescription={formData.meta_description} slug={formData.slug}
              onMetaTitleChange={(v) => setFormData({ ...formData, meta_title: v })}
              onMetaDescriptionChange={(v) => setFormData({ ...formData, meta_description: v })}
              onSlugChange={(v) => setFormData({ ...formData, slug: v })}
              titleSource={formData.title}
              existingSlugs={projects.filter(p => p.id !== editingId && p.slug).map(p => p.slug!)}
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
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              data-search-input
              placeholder="Buscar por título ou tag... (atalho: /)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          {searchQuery && (
            <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')} aria-label="Limpar busca">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {searchQuery ? 'Busca ativa — reordenação desabilitada' : 'Arraste os itens para reordenar'}
        </p>
        {isLoading ? (
          <div className="py-8 text-center text-muted-foreground text-sm">Carregando...</div>
        ) : fetchError ? (
          <div className="py-8 text-center space-y-3">
            <p className="text-sm text-muted-foreground">Erro ao carregar os dados.</p>
            <Button variant="outline" size="sm" onClick={fetchProjects}>Tentar novamente</Button>
          </div>
        ) : filteredProjects.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-sm">
            {searchQuery ? 'Nenhum projeto encontrado para esta busca.' : 'Nenhum projeto adicionado ainda.'}
          </p>
        ) : searchQuery ? (
          <div className="space-y-2">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                editingId={editingId}
                onEdit={handleEdit}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
                onToggleVisibility={handleToggleVisibility}
              />
            ))}
          </div>
        ) : (
          <SortableList items={projects} onReorder={handleReorder} renderItem={(project) => (
            <ProjectCard
              project={project}
              editingId={editingId}
              onEdit={handleEdit}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
              onToggleVisibility={handleToggleVisibility}
            />
          )} />
        )}
      </div>

      <PreviewModal open={showPreview} onOpenChange={setShowPreview} type="project" data={{ ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) }} />
    </div>
  );
}
