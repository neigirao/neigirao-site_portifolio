import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminLabProject } from '@/hooks/useAdminData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Pencil, Plus, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import { SortableList } from './SortableList';
import { AutosaveIndicator } from './AutosaveIndicator';
import { DeleteConfirmButton } from './DeleteConfirmButton';
import { SEOFields } from './SEOFields';
import { useAutosave } from '@/hooks/useAutosave';

interface Props {
  onDirtyChange?: (dirty: boolean) => void;
}

const emptyForm = {
  title: '',
  slug: '',
  category: '',
  year: new Date().getFullYear().toString(),
  description: '',
  why: '',
  context: '',
  actionsRaw: '',
  outcomesRaw: '',
  stackRaw: '',
  brand: 'LAB',
  is_visible: true,
  meta_title: '',
  meta_description: '',
};

type FormData = typeof emptyForm;

function toLines(arr: string[]): string {
  return arr.join('\n');
}
function fromLines(raw: string): string[] {
  return raw.split('\n').map(s => s.trim()).filter(Boolean);
}

function formToDb(f: FormData) {
  return {
    title: f.title,
    slug: f.slug || null,
    category: f.category || null,
    year: f.year || null,
    description: f.description || null,
    why: f.why || null,
    context: f.context || null,
    actions: fromLines(f.actionsRaw),
    outcomes: fromLines(f.outcomesRaw),
    stack: fromLines(f.stackRaw),
    brand: f.brand || 'LAB',
    is_visible: f.is_visible,
    meta_title: f.meta_title || null,
    meta_description: f.meta_description || null,
  };
}

function dbToForm(p: AdminLabProject): FormData {
  return {
    title: p.title,
    slug: p.slug || '',
    category: p.category || '',
    year: p.year || '',
    description: p.description || '',
    why: p.why || '',
    context: p.context || '',
    actionsRaw: toLines(p.actions || []),
    outcomesRaw: toLines(p.outcomes || []),
    stackRaw: toLines(p.stack || []),
    brand: p.brand || 'LAB',
    is_visible: p.is_visible,
    meta_title: p.meta_title || '',
    meta_description: p.meta_description || '',
  };
}

export function LabManager({ onDirtyChange }: Props) {
  const [items, setItems] = useState<AdminLabProject[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { status: autosaveStatus, clearDraft } = useAutosave({
    key: 'lab-form',
    data: formData,
    onRecover: useCallback((d: FormData) => setFormData(d), []),
  });

  useEffect(() => {
    const hasContent = [formData.title, formData.description, formData.context].some(v => v.trim().length > 0);
    onDirtyChange?.(hasContent);
  }, [formData, onDirtyChange]);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setFetchError(false);
    try {
      const { data, error } = await supabase
        .from('lab_projects')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      setItems((data || []).map(p => ({
        ...p,
        actions: Array.isArray(p.actions) ? p.actions : [],
        outcomes: Array.isArray(p.outcomes) ? p.outcomes : [],
        stack: Array.isArray(p.stack) ? p.stack : [],
      })) as AdminLabProject[]);
    } catch {
      setFetchError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const set = (k: keyof FormData, v: string | boolean) =>
    setFormData(prev => ({ ...prev, [k]: v }));

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    clearDraft();
    onDirtyChange?.(false);
  };

  const handleEdit = (item: AdminLabProject) => {
    setFormData(dbToForm(item));
    setEditingId(item.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) { toast.error('Título é obrigatório.'); return; }

    if (formData.slug) {
      let q = supabase.from('lab_projects').select('id').eq('slug', formData.slug);
      if (editingId) q = q.neq('id', editingId);
      const { data: existing } = await q.maybeSingle();
      if (existing) { toast.error('Este slug já está em uso. Escolha outro.'); return; }
    }

    setIsSaving(true);
    const payload = formToDb(formData);
    try {
      if (editingId) {
        const { error } = await supabase.from('lab_projects').update(payload).eq('id', editingId);
        if (error) { toast.error(`Erro ao atualizar: ${error.message}`); return; }
        toast.success('Projeto atualizado!');
      } else {
        const nextOrder = items.length;
        const { error } = await supabase.from('lab_projects').insert([{ ...payload, order_index: nextOrder }]);
        if (error) { toast.error(`Erro ao criar: ${error.message}`); return; }
        toast.success('Projeto criado!');
      }
      resetForm();
      fetchItems();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const deletedItem = items.find(i => i.id === id);
    const { error } = await supabase.from('lab_projects').delete().eq('id', id);
    if (error) { toast.error(`Erro ao excluir: ${error.message}`); return; }
    fetchItems();
    if (deletedItem) {
      const { id: _id, created_at: _c, updated_at: _u, ...rest } = deletedItem;
      toast.success('Excluído!', {
        action: {
          label: 'Desfazer',
          onClick: async () => {
            await supabase.from('lab_projects').insert([rest]);
            fetchItems();
          },
        },
      });
    }
    if (editingId === id) resetForm();
  };

  const handleReorder = async (reordered: AdminLabProject[]) => {
    const previous = items;
    setItems(reordered);
    const results = await Promise.all(
      reordered.map((item, index) =>
        supabase.from('lab_projects').update({ order_index: index }).eq('id', item.id)
      )
    );
    if (results.some(r => r.error)) {
      setItems(previous);
      toast.error('Erro ao salvar ordem. Revertendo.');
      return;
    }
    toast.success('Ordem atualizada!');
  };

  const handleToggleVisible = async (item: AdminLabProject) => {
    const { error } = await supabase
      .from('lab_projects')
      .update({ is_visible: !item.is_visible })
      .eq('id', item.id);
    if (error) { toast.error(`Erro ao alterar visibilidade: ${error.message}`); return; }
    fetchItems();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{editingId ? 'Editar projeto Lab' : 'Novo projeto Lab'}</span>
            <AutosaveIndicator status={autosaveStatus} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Título *</Label>
              <Input value={formData.title} onChange={e => set('title', e.target.value)} placeholder="Snap Cards" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input value={formData.slug} onChange={e => set('slug', e.target.value)} placeholder="snap-cards" />
              </div>
              <div className="space-y-2">
                <Label>Ano</Label>
                <Input value={formData.year} onChange={e => set('year', e.target.value)} placeholder="2025" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Input value={formData.category} onChange={e => set('category', e.target.value)} placeholder="Jogo · Card battle" />
              </div>
              <div className="space-y-2">
                <Label>Brand</Label>
                <Input value={formData.brand} onChange={e => set('brand', e.target.value)} placeholder="LAB" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descrição curta</Label>
              <Textarea value={formData.description} onChange={e => set('description', e.target.value)} rows={2} placeholder="Exibida no card da homepage." />
            </div>

            <div className="space-y-2">
              <Label>Por que (tese)</Label>
              <Input value={formData.why} onChange={e => set('why', e.target.value)} placeholder="Estudo de game design e estados complexos de UI." />
            </div>

            <div className="space-y-2">
              <Label>Contexto</Label>
              <Textarea value={formData.context} onChange={e => set('context', e.target.value)} rows={3} placeholder="Narrativa do projeto..." />
            </div>

            <div className="space-y-2">
              <Label>O que eu fiz (uma ação por linha)</Label>
              <Textarea value={formData.actionsRaw} onChange={e => set('actionsRaw', e.target.value)} rows={4} placeholder={"Construí um seed determinístico por data.\nIntegrei dados via API pública."} />
            </div>

            <div className="space-y-2">
              <Label>Resultados (um por linha)</Label>
              <Textarea value={formData.outcomesRaw} onChange={e => set('outcomesRaw', e.target.value)} rows={2} placeholder={"Daily puzzle funcional\nStreak + share grid implementados"} />
            </div>

            <div className="space-y-2">
              <Label>Stack (uma tecnologia por linha)</Label>
              <Textarea value={formData.stackRaw} onChange={e => set('stackRaw', e.target.value)} rows={3} placeholder={"React\nTailwind\nVite"} />
            </div>

            <SEOFields
              metaTitle={formData.meta_title}
              onMetaTitleChange={v => set('meta_title', v)}
              metaDescription={formData.meta_description}
              onMetaDescriptionChange={v => set('meta_description', v)}
              titleSource={formData.title}
            />

            <div className="flex items-center gap-2">
              <Switch checked={formData.is_visible} onCheckedChange={v => set('is_visible', v)} id="lab-visible" />
              <Label htmlFor="lab-visible">Visível no site</Label>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Salvando…' : editingId ? 'Atualizar' : 'Criar'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Projetos Lab ({items.length})</h3>
          {editingId && (
            <Button size="sm" variant="outline" onClick={resetForm}>
              <Plus className="h-4 w-4 mr-1" /> Novo
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="py-8 text-center text-muted-foreground text-sm">Carregando...</div>
        ) : fetchError ? (
          <div className="py-8 text-center space-y-3">
            <p className="text-sm text-muted-foreground">Erro ao carregar os dados.</p>
            <Button variant="outline" size="sm" onClick={fetchItems}>Tentar novamente</Button>
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-sm">Nenhum projeto adicionado.</p>
        ) : (
          <SortableList
            items={items}
            onReorder={handleReorder}
            renderItem={(item) => (
              <Card className={`${editingId === item.id ? 'ring-2 ring-primary' : ''} ${!item.is_visible ? 'opacity-50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{item.brand || 'LAB'}</span>
                        {item.year && <span className="text-xs text-muted-foreground">· {item.year}</span>}
                      </div>
                      <p className="font-semibold text-sm truncate">{item.title}</p>
                      {item.category && <p className="text-xs text-muted-foreground">{item.category}</p>}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button variant="ghost" size="sm" onClick={() => handleToggleVisible(item)} title={item.is_visible ? 'Ocultar' : 'Mostrar'}>
                        {item.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <DeleteConfirmButton onConfirm={() => handleDelete(item.id)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          />
        )}
      </div>
    </div>
  );
}
