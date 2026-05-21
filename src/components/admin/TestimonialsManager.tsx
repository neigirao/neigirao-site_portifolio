import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from './RichTextEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Pencil, Copy, Quote, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploader } from './ImageUploader';
import { SortableList } from './SortableList';
import { AutosaveIndicator } from './AutosaveIndicator';
import { DeleteConfirmButton } from './DeleteConfirmButton';
import { useAutosave } from '@/hooks/useAutosave';

interface Testimonial {
  id: string;
  author_name: string;
  author_role: string;
  author_company: string | null;
  author_photo_url: string | null;
  linkedin_url: string | null;
  quote: string;
  order_index: number;
  is_visible: boolean;
}

interface TestimonialsManagerProps {
  onDirtyChange?: (dirty: boolean) => void;
}

const emptyForm = { author_name: '', author_role: '', author_company: '', author_photo_url: '', linkedin_url: '', quote: '', is_visible: true };

export function TestimonialsManager({ onDirtyChange }: TestimonialsManagerProps) {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const { status: autosaveStatus, clearDraft } = useAutosave({
    key: 'testimonials-form',
    data: formData,
    onRecover: useCallback((data: typeof emptyForm) => { setFormData(data); }, []),
  });

  useEffect(() => {
    const hasContent = [formData.author_name, formData.author_role, formData.quote].some(v => v.trim().length > 0);
    onDirtyChange?.(hasContent);
  }, [formData, onDirtyChange]);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    setFetchError(false);
    const { data, error } = await supabase.from('testimonials').select('*').order('order_index');
    if (error) { toast.error('Erro ao carregar depoimentos'); setFetchError(true); }
    setItems(data || []);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextIdx = items.length > 0 ? Math.max(...items.map(i => i.order_index)) + 1 : 0;
    const payload = {
      author_name: formData.author_name,
      author_role: formData.author_role,
      author_company: formData.author_company || null,
      author_photo_url: formData.author_photo_url || null,
      linkedin_url: formData.linkedin_url || null,
      quote: formData.quote,
      is_visible: formData.is_visible,
      order_index: editingId ? items.find(i => i.id === editingId)?.order_index || 0 : nextIdx,
    };

    if (editingId) {
      const { error } = await supabase.from('testimonials').update(payload).eq('id', editingId);
      if (error) { toast.error('Erro ao atualizar'); return; }
      toast.success('Depoimento atualizado!');
    } else {
      const { error } = await supabase.from('testimonials').insert([payload]);
      if (error) { toast.error('Erro ao criar'); return; }
      toast.success('Depoimento criado!');
    }
    resetForm(); fetchItems();
  };

  const handleEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setFormData({
      author_name: t.author_name, author_role: t.author_role,
      author_company: t.author_company || '', author_photo_url: t.author_photo_url || '',
      linkedin_url: t.linkedin_url || '', quote: t.quote, is_visible: t.is_visible,
    });
  };

  const handleDuplicate = async (t: Testimonial) => {
    const nextIdx = items.length > 0 ? Math.max(...items.map(i => i.order_index)) + 1 : 0;
    const { error } = await supabase.from('testimonials').insert([{
      author_name: t.author_name, author_role: t.author_role, author_company: t.author_company,
      author_photo_url: t.author_photo_url, linkedin_url: t.linkedin_url, quote: t.quote,
      is_visible: false, order_index: nextIdx,
    }]);
    if (error) { toast.error('Erro ao duplicar'); return; }
    toast.success('Duplicado!'); fetchItems();
  };

  const handleToggleVisible = async (t: Testimonial) => {
    const { error } = await supabase.from('testimonials').update({ is_visible: !t.is_visible }).eq('id', t.id);
    if (error) { toast.error('Erro ao atualizar visibilidade'); return; }
    setItems(prev => prev.map(x => x.id === t.id ? { ...x, is_visible: !t.is_visible } : x));
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) { toast.error('Erro ao excluir'); return; }
    toast.success('Excluído!'); fetchItems();
  };

  const handleReorder = async (reordered: Testimonial[]) => {
    setItems(reordered);
    await Promise.all(
      reordered.map((item, index) =>
        supabase.from('testimonials').update({ order_index: index }).eq('id', item.id)
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
            <CardTitle>{editingId ? 'Editar' : 'Novo'} Depoimento</CardTitle>
            <AutosaveIndicator status={autosaveStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome do Autor <span className="text-destructive" aria-hidden="true">*</span></Label>
                <Input value={formData.author_name} onChange={e => setFormData({ ...formData, author_name: e.target.value })} placeholder="João Silva" required />
              </div>
              <div className="space-y-2">
                <Label>Cargo <span className="text-destructive" aria-hidden="true">*</span></Label>
                <Input value={formData.author_role} onChange={e => setFormData({ ...formData, author_role: e.target.value })} placeholder="Head de Produto" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Empresa</Label>
                <Input value={formData.author_company} onChange={e => setFormData({ ...formData, author_company: e.target.value })} placeholder="Icatu Seguros" />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input value={formData.linkedin_url} onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })} placeholder="https://linkedin.com/in/..." />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Depoimento <span className="text-destructive" aria-hidden="true">*</span></Label>
              <RichTextEditor value={formData.quote} onChange={(value) => setFormData({ ...formData, quote: value })} label="" />
            </div>
            <ImageUploader value={formData.author_photo_url} onChange={(url) => setFormData({ ...formData, author_photo_url: url })} label="Foto do Autor" folder="testimonials" />
            <div className="flex items-center gap-2">
              <Switch checked={formData.is_visible} onCheckedChange={(v) => setFormData({ ...formData, is_visible: v })} />
              <Label>Visível no site</Label>
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'Atualizar' : 'Criar'}</Button>
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
            <Button variant="outline" size="sm" onClick={fetchItems}>Tentar novamente</Button>
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-sm">Nenhum depoimento adicionado ainda. Adicione o primeiro acima.</p>
        ) : (
          <SortableList items={items} onReorder={handleReorder} renderItem={(t) => (
            <Card className={`${editingId === t.id ? 'ring-2 ring-primary' : ''} ${!t.is_visible ? 'opacity-50' : ''}`}>
              <CardContent className="pt-4 pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {t.author_photo_url ? <img src={t.author_photo_url} alt={t.author_name} className="w-8 h-8 rounded-full object-cover" /> : <Quote className="w-6 h-6 text-teal-accent flex-shrink-0" />}
                    <div className="min-w-0">
                      <span className="font-semibold">{t.author_name}</span>
                      <span className="ml-2 text-sm text-muted-foreground">{t.author_role}</span>
                      <p className="text-xs text-muted-foreground truncate max-w-md">"{t.quote.slice(0, 80)}{t.quote.length > 80 ? '...' : ''}"</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 ml-4">
                    <Button size="icon" variant="ghost" onClick={() => handleToggleVisible(t)} aria-label={t.is_visible ? `Ocultar depoimento de ${t.author_name}` : `Mostrar depoimento de ${t.author_name}`}>
                      {t.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => handleDuplicate(t)} aria-label={`Duplicar depoimento de ${t.author_name}`}><Copy className="h-4 w-4" /></Button>
                    <Button size="icon" variant="outline" onClick={() => handleEdit(t)} aria-label={`Editar depoimento de ${t.author_name}`}><Pencil className="h-4 w-4" /></Button>
                    <DeleteConfirmButton itemName={t.author_name} onConfirm={() => handleDelete(t.id)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )} />
        )}
      </div>
    </div>
  );
}
