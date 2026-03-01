import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Trash2, Eye, Copy, FileText, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploader } from './ImageUploader';
import { RichTextEditor } from './RichTextEditor';
import { SEOFields } from './SEOFields';
import { SortableList } from './SortableList';
import { AutosaveIndicator } from './AutosaveIndicator';
import { CompletenessIndicator } from './CompletenessIndicator';
import { useAutosave } from '@/hooks/useAutosave';
import { estimateReadingTime } from '@/hooks/useArticles';

interface Article {
  id: string;
  title: string;
  slug: string | null;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  tags: string[] | null;
  status: string;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  reading_time_minutes: number | null;
  order_index: number;
}

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image_url: '',
  tags: '',
  status: 'draft' as string,
  meta_title: '',
  meta_description: '',
};

export function ArticlesManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  const { status: autosaveStatus, clearDraft } = useAutosave({
    key: 'articles-form',
    data: formData,
    onRecover: useCallback((data: typeof emptyForm) => {
      setFormData(data);
    }, []),
  });

  useEffect(() => { fetchArticles(); }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('order_index', { ascending: true });
    if (error) { toast.error('Erro ao carregar artigos'); return; }
    setArticles(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextOrderIndex = articles.length > 0 ? Math.max(...articles.map(a => a.order_index)) + 1 : 0;
    const readingTime = estimateReadingTime(formData.content);
    
    const dataToSubmit = {
      title: formData.title,
      slug: formData.slug || null,
      excerpt: formData.excerpt || null,
      content: formData.content,
      cover_image_url: formData.cover_image_url || null,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      status: formData.status,
      published_at: formData.status === 'published' ? new Date().toISOString() : null,
      meta_title: formData.meta_title || null,
      meta_description: formData.meta_description || null,
      reading_time_minutes: readingTime,
      order_index: editingId ? articles.find(a => a.id === editingId)?.order_index || 0 : nextOrderIndex,
    };

    if (editingId) {
      // Preserve original published_at if already published
      const existing = articles.find(a => a.id === editingId);
      if (existing?.published_at && formData.status === 'published') {
        dataToSubmit.published_at = existing.published_at;
      }
      const { error } = await supabase.from('articles').update(dataToSubmit).eq('id', editingId);
      if (error) { toast.error('Erro ao atualizar artigo'); return; }
      toast.success('Artigo atualizado!');
    } else {
      const { error } = await supabase.from('articles').insert([dataToSubmit]);
      if (error) { toast.error('Erro ao criar artigo'); return; }
      toast.success('Artigo criado!');
    }
    resetForm();
    fetchArticles();
  };

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      slug: article.slug || '',
      excerpt: article.excerpt || '',
      content: article.content,
      cover_image_url: article.cover_image_url || '',
      tags: (article.tags || []).join(', '),
      status: article.status,
      meta_title: article.meta_title || '',
      meta_description: article.meta_description || '',
    });
  };

  const handleDuplicate = async (article: Article) => {
    const nextOrderIndex = articles.length > 0 ? Math.max(...articles.map(a => a.order_index)) + 1 : 0;
    const { error } = await supabase.from('articles').insert([{
      title: `${article.title} (cópia)`,
      content: article.content,
      excerpt: article.excerpt,
      cover_image_url: article.cover_image_url,
      tags: article.tags,
      status: 'draft',
      reading_time_minutes: article.reading_time_minutes,
      order_index: nextOrderIndex,
    }]);
    if (error) { toast.error('Erro ao duplicar'); return; }
    toast.success('Artigo duplicado como rascunho!');
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este artigo?')) return;
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) { toast.error('Erro ao excluir artigo'); return; }
    toast.success('Artigo excluído!');
    fetchArticles();
  };

  const handleReorder = async (reorderedItems: Article[]) => {
    setArticles(reorderedItems);
    for (const [index, item] of reorderedItems.entries()) {
      await supabase.from('articles').update({ order_index: index }).eq('id', item.id);
    }
    toast.success('Ordem atualizada!');
  };

  const resetForm = () => { setEditingId(null); setFormData(emptyForm); clearDraft(); };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{editingId ? 'Editar' : 'Novo'} Artigo</CardTitle>
            <AutosaveIndicator status={autosaveStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="article-title">Título</Label>
              <Input
                id="article-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Título do artigo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="article-excerpt">Resumo / Excerpt</Label>
              <Textarea
                id="article-excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Breve resumo do artigo (aparece na listagem)"
                rows={2}
              />
            </div>

            <ImageUploader
              value={formData.cover_image_url}
              onChange={(url) => setFormData({ ...formData, cover_image_url: url })}
              label="Imagem de Capa"
              folder="articles"
            />

            <RichTextEditor
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              label="Conteúdo do Artigo"
              placeholder="Escreva seu artigo aqui..."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="article-tags">Tags (separadas por vírgula)</Label>
                <Input
                  id="article-tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Observabilidade, Product Management"
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <SEOFields
              metaTitle={formData.meta_title}
              metaDescription={formData.meta_description}
              slug={formData.slug}
              onMetaTitleChange={(v) => setFormData({ ...formData, meta_title: v })}
              onMetaDescriptionChange={(v) => setFormData({ ...formData, meta_description: v })}
              onSlugChange={(v) => setFormData({ ...formData, slug: v })}
              titleSource={formData.title}
            />

            {formData.content && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Tempo estimado de leitura: {estimateReadingTime(formData.content)} min
              </p>
            )}

            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'Atualizar' : 'Criar'}</Button>
              {editingId && <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Arraste os itens para reordenar</p>
        <SortableList items={articles} onReorder={handleReorder} renderItem={(article) => (
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <h3 className="font-semibold text-lg truncate">{article.title}</h3>
                    <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                      {article.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </Badge>
                    <CompletenessIndicator
                      hasSeo={!!(article.meta_title && article.meta_description)}
                      hasImage={!!article.cover_image_url}
                      hasSlug={!!article.slug}
                      itemName={article.title}
                    />
                  </div>
                  {article.excerpt && (
                    <p className="text-sm text-muted-foreground truncate mt-1">{article.excerpt}</p>
                  )}
                  <div className="flex items-center gap-3 mt-1">
                    {article.reading_time_minutes && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.reading_time_minutes} min
                      </span>
                    )}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {article.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0 ml-4">
                  {article.status === 'published' && article.slug && (
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => window.open(`/artigo/${article.slug}`, '_blank')}
                      aria-label={`Ver ${article.title}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  <Button size="icon" variant="outline" onClick={() => handleDuplicate(article)} aria-label={`Duplicar ${article.title}`}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => handleEdit(article)} aria-label={`Editar ${article.title}`}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(article.id)} aria-label={`Excluir ${article.title}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )} />
      </div>
    </div>
  );
}
