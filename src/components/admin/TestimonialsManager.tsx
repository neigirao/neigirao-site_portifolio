import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Pencil, Trash2, Copy, Quote } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploader } from './ImageUploader';
import { SortableList } from './SortableList';

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

const emptyForm = { author_name: '', author_role: '', author_company: '', author_photo_url: '', linkedin_url: '', quote: '', is_visible: true };

export function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase.from('testimonials').select('*').order('order_index');
    if (error) { toast.error('Erro ao carregar depoimentos'); return; }
    setItems(data || []);
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
      if (error) { toast.error(`Erro ao atualizar: ${error.message}`); return; }
      toast.success('Depoimento atualizado!');
    } else {
      const { error } = await supabase.from('testimonials').insert([payload]);
      if (error) { toast.error(`Erro ao criar: ${error.message}`); return; }
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
    if (error) { toast.error(`Erro ao duplicar: ${error.message}`); return; }
    toast.success('Duplicado!'); fetchItems();
  };

  const handleDelete = async (id: string) => {
    const deletedItem = items.find(i => i.id === id);
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) { toast.error(`Erro ao excluir: ${error.message}`); return; }
    fetchItems();
    if (deletedItem) {
      const { id: _id, ...itemWithoutId } = deletedItem;
      toast.success('Excluído!', {
        action: {
          label: 'Desfazer',
          onClick: async () => {
            await supabase.from('testimonials').insert([itemWithoutId]);
            fetchItems();
          },
        },
      });
    } else {
      toast.success('Excluído!');
    }
  };

  const handleReorder = async (reordered: Testimonial[]) => {
    const previousItems = items;
    setItems(reordered);
    const results = await Promise.all(
      reordered.map((item, index) =>
        supabase.from('testimonials').update({ order_index: index }).eq('id', item.id)
      )
    );
    if (results.some(r => r.error)) {
      setItems(previousItems);
      toast.error('Erro ao salvar ordem. Revertendo.');
      return;
    }
    toast.success('Ordem atualizada!');
  };

  const resetForm = () => { setEditingId(null); setFormData(emptyForm); };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>{editingId ? 'Editar' : 'Novo'} Depoimento</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome do Autor</Label>
                <Input value={formData.author_name} onChange={e => setFormData({ ...formData, author_name: e.target.value })} placeholder="João Silva" required />
              </div>
              <div className="space-y-2">
                <Label>Cargo</Label>
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
              <Label>Depoimento</Label>
              <Textarea value={formData.quote} onChange={e => setFormData({ ...formData, quote: e.target.value })} placeholder="Nei é um profissional excepcional..." rows={3} required />
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
        <p className="text-sm text-muted-foreground">Arraste para reordenar</p>
        <SortableList items={items} onReorder={handleReorder} renderItem={(t) => (
          <Card className={!t.is_visible ? 'opacity-50' : ''}>
            <CardContent className="pt-4 pb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {t.author_photo_url ? <img src={t.author_photo_url} alt={t.author_name} className="w-8 h-8 rounded-full object-cover" /> : <Quote className="w-6 h-6 text-teal-accent flex-shrink-0" />}
                  <div className="min-w-0">
                    <span className="font-semibold">{t.author_name}</span>
                    <span className="ml-2 text-sm text-muted-foreground">{t.author_role}</span>
                    <p className="text-xs text-muted-foreground truncate max-w-md">"{t.quote.slice(0, 80)}..."</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0 ml-4">
                  <Button size="icon" variant="outline" onClick={() => handleDuplicate(t)}><Copy className="h-4 w-4" /></Button>
                  <Button size="icon" variant="outline" onClick={() => handleEdit(t)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(t.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )} />
      </div>
    </div>
  );
}
