/**
 * SkillsManager Component
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Eye, Copy, EyeOff, Search, X, List, LayoutGrid, Check, Plus, Trash2 } from 'lucide-react';
import { DeleteConfirmButton } from './DeleteConfirmButton';
import { toast } from 'sonner';
import { ImageUploader } from './ImageUploader';
import { SEOFields } from './SEOFields';
import { SortableList } from './SortableList';
import { PreviewModal } from './PreviewModal';
import { CompletenessIndicator } from './CompletenessIndicator';
import { AutosaveIndicator } from './AutosaveIndicator';
import { useAutosave } from '@/hooks/useAutosave';
import { useFormShortcuts } from '@/hooks/useFormShortcuts';

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
  const [fetchError, setFetchError] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'category'>('list');
  const [renamingCategory, setRenamingCategory] = useState<string | null>(null);
  const [categoryRenameValue, setCategoryRenameValue] = useState('');
  const [addingToCategory, setAddingToCategory] = useState<string | null>(null);
  const [quickAddName, setQuickAddName] = useState('');

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
    setFetchError(false);
    const { data, error } = await supabase.from('skills').select('*').order('order_index', { ascending: true });
    if (error) { toast.error('Erro ao carregar skills'); setFetchError(true); }
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

    if (formData.slug) {
      let q = supabase.from('skills').select('id').eq('slug', formData.slug);
      if (editingId) q = q.neq('id', editingId);
      const { data: existing } = await q.maybeSingle();
      if (existing) { toast.error('Este slug já está em uso. Escolha outro.'); return; }
    }

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

  const formRef = useRef<HTMLFormElement>(null);
  useFormShortcuts({
    onSave: () => formRef.current?.requestSubmit(),
    onCancel: editingId ? resetForm : undefined,
  });

  const handleRenameCategory = async (oldName: string, newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed || trimmed === oldName) { setRenamingCategory(null); return; }
    const toUpdate = skills.filter(s => s.category === oldName);
    const results = await Promise.all(
      toUpdate.map(s => supabase.from('skills').update({ category: trimmed }).eq('id', s.id))
    );
    if (results.some(r => r.error)) { toast.error('Erro ao renomear categoria'); return; }
    toast.success(`Categoria renomeada para "${trimmed}"`);
    setRenamingCategory(null);
    fetchSkills();
  };

  const handleQuickAdd = async (category: string) => {
    const name = quickAddName.trim();
    if (!name) return;
    const nextOrderIndex = skills.length > 0 ? Math.max(...skills.map(s => s.order_index)) + 1 : 0;
    const { error } = await supabase.from('skills').insert([{ name, category, order_index: nextOrderIndex }]);
    if (error) { toast.error('Erro ao adicionar item'); return; }
    toast.success(`"${name}" adicionado em ${category}`);
    setQuickAddName('');
    setAddingToCategory(null);
    fetchSkills();
  };

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
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
              existingSlugs={skills.filter(s => s.id !== editingId && s.slug).map(s => s.slug!)}
            />
            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'Atualizar' : 'Criar'}</Button>
              <Button type="button" variant="outline" onClick={() => setShowPreview(true)}><Eye className="h-4 w-4 mr-2" />Visualizar</Button>
              {editingId && <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* View mode toggle */}
      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('list')}
          className="gap-2"
        >
          <List className="h-4 w-4" /> Lista
        </Button>
        <Button
          variant={viewMode === 'category' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('category')}
          className="gap-2"
        >
          <LayoutGrid className="h-4 w-4" /> Por categoria
        </Button>
      </div>

      {viewMode === 'category' && !isLoading && !fetchError && (
        <CategoryView
          skills={skills}
          renamingCategory={renamingCategory}
          categoryRenameValue={categoryRenameValue}
          addingToCategory={addingToCategory}
          quickAddName={quickAddName}
          onStartRename={(cat) => { setRenamingCategory(cat); setCategoryRenameValue(cat); }}
          onRenameValueChange={setCategoryRenameValue}
          onConfirmRename={handleRenameCategory}
          onCancelRename={() => setRenamingCategory(null)}
          onStartAdd={(cat) => { setAddingToCategory(cat); setQuickAddName(''); }}
          onQuickAddChange={setQuickAddName}
          onQuickAddSubmit={handleQuickAdd}
          onCancelAdd={() => setAddingToCategory(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {viewMode === 'list' && <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              placeholder="Buscar por nome ou categoria..."
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
            <Button variant="outline" size="sm" onClick={fetchSkills}>Tentar novamente</Button>
          </div>
        ) : (() => {
          const q = searchQuery.toLowerCase();
          const filtered = q
            ? skills.filter(s =>
                s.name.toLowerCase().includes(q) ||
                (s.category || '').toLowerCase().includes(q)
              )
            : skills;

          const renderSkillCard = (skill: Skill) => (
            <Card className={`h-full ${editingId === skill.id ? 'ring-2 ring-primary' : ''} ${!skill.is_visible ? 'opacity-50' : ''}`}>
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
                    <Button size="icon" variant="ghost" onClick={() => handleToggleVisibility(skill)} aria-label={skill.is_visible ? `Ocultar ${skill.name}` : `Mostrar ${skill.name}`}>
                      {skill.is_visible ? <Eye className="h-4 w-4" aria-hidden="true" /> : <EyeOff className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
                    </Button>
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
          );

          if (filtered.length === 0) return (
            <p className="text-center text-muted-foreground py-8 text-sm">
              {searchQuery ? 'Nenhuma skill encontrada.' : 'Nenhuma skill adicionada ainda.'}
            </p>
          );

          if (searchQuery) return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(skill => <div key={skill.id}>{renderSkillCard(skill)}</div>)}
            </div>
          );

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <SortableList items={filtered} onReorder={handleReorder}
                strategy="grid"
                className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                renderItem={renderSkillCard}
              />
            </div>
          );
        })()}
      </div>}

      <PreviewModal open={showPreview} onOpenChange={setShowPreview} type="skill" data={formData} />
    </div>
  );
}

interface CategoryViewProps {
  skills: Skill[];
  renamingCategory: string | null;
  categoryRenameValue: string;
  addingToCategory: string | null;
  quickAddName: string;
  onStartRename: (cat: string) => void;
  onRenameValueChange: (v: string) => void;
  onConfirmRename: (old: string, next: string) => void;
  onCancelRename: () => void;
  onStartAdd: (cat: string) => void;
  onQuickAddChange: (v: string) => void;
  onQuickAddSubmit: (cat: string) => void;
  onCancelAdd: () => void;
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => void;
}

function CategoryView({
  skills, renamingCategory, categoryRenameValue, addingToCategory, quickAddName,
  onStartRename, onRenameValueChange, onConfirmRename, onCancelRename,
  onStartAdd, onQuickAddChange, onQuickAddSubmit, onCancelAdd, onEdit, onDelete,
}: CategoryViewProps) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    const cat = s.category || '(sem categoria)';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort((a, b) => {
    if (a === '(sem categoria)') return 1;
    if (b === '(sem categoria)') return -1;
    return a.localeCompare(b);
  });

  if (categories.length === 0) return (
    <p className="text-center text-muted-foreground py-8 text-sm">Nenhuma skill cadastrada ainda.</p>
  );

  return (
    <div className="space-y-6">
      {categories.map(cat => (
        <Card key={cat}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              {renamingCategory === cat ? (
                <>
                  <Input
                    value={categoryRenameValue}
                    onChange={e => onRenameValueChange(e.target.value)}
                    className="h-8 text-base font-semibold flex-1"
                    autoFocus
                    onKeyDown={e => {
                      if (e.key === 'Enter') onConfirmRename(cat, categoryRenameValue);
                      if (e.key === 'Escape') onCancelRename();
                    }}
                  />
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onConfirmRename(cat, categoryRenameValue)} aria-label="Confirmar nome">
                    <Check className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onCancelRename} aria-label="Cancelar">
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <CardTitle className="text-base flex-1">{cat}</CardTitle>
                  <span className="text-xs text-muted-foreground">{grouped[cat].length} {grouped[cat].length === 1 ? 'item' : 'itens'}</span>
                  {cat !== '(sem categoria)' && (
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-xs gap-1" onClick={() => onStartRename(cat)}>
                      <Pencil className="h-3 w-3" /> Renomear
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-1">
            {grouped[cat].map(skill => (
              <div key={skill.id} className={`flex items-center gap-2 py-2 px-3 rounded-md hover:bg-muted/50 ${!skill.is_visible ? 'opacity-50' : ''}`}>
                {skill.logo_url ? (
                  <img src={skill.logo_url} alt="" className="w-5 h-5 object-contain flex-shrink-0" />
                ) : (
                  <div className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="flex-1 text-sm font-medium">{skill.name}</span>
                {!skill.is_visible && <EyeOff className="h-3 w-3 text-muted-foreground" />}
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => onEdit(skill)} aria-label={`Editar ${skill.name}`}>
                  <Pencil className="h-3 w-3" />
                </Button>
                <DeleteConfirmButton itemName={skill.name} onConfirm={() => onDelete(skill.id)} />
              </div>
            ))}

            {addingToCategory === cat ? (
              <div className="flex items-center gap-2 pt-2">
                <Input
                  value={quickAddName}
                  onChange={e => onQuickAddChange(e.target.value)}
                  placeholder="Nome do item..."
                  className="h-8 text-sm"
                  autoFocus
                  onKeyDown={e => {
                    if (e.key === 'Enter') onQuickAddSubmit(cat === '(sem categoria)' ? '' : cat);
                    if (e.key === 'Escape') onCancelAdd();
                  }}
                />
                <Button size="sm" className="h-8" onClick={() => onQuickAddSubmit(cat === '(sem categoria)' ? '' : cat)}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8" onClick={onCancelAdd}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <button
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-2 py-1 px-3 rounded transition-colors"
                onClick={() => onStartAdd(cat)}
              >
                <Plus className="h-3 w-3" /> Adicionar item
              </button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
