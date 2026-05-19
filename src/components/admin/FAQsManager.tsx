import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Pencil, Trash2, Copy, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { SortableList } from './SortableList';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order_index: number;
  is_visible: boolean;
}

const emptyForm = { question: '', answer: '', is_visible: true };

export function FAQsManager() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase.from('faqs' as any).select('*').order('order_index');
    if (error) { toast.error('Erro ao carregar FAQs'); return; }
    setItems((data as any[]) || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextIdx = items.length > 0 ? Math.max(...items.map(i => i.order_index)) + 1 : 0;
    const payload = {
      question: formData.question,
      answer: formData.answer,
      is_visible: formData.is_visible,
      order_index: editingId ? items.find(i => i.id === editingId)?.order_index || 0 : nextIdx,
    };

    if (editingId) {
      const { error } = await supabase.from('faqs' as any).update(payload as any).eq('id', editingId);
      if (error) { toast.error(`Erro ao atualizar: ${error.message}`); return; }
      toast.success('FAQ atualizada!');
    } else {
      const { error } = await supabase.from('faqs' as any).insert([payload] as any);
      if (error) { toast.error(`Erro ao criar: ${error.message}`); return; }
      toast.success('FAQ criada!');
    }
    resetForm(); fetchItems();
  };

  const handleEdit = (f: FAQ) => {
    setEditingId(f.id);
    setFormData({ question: f.question, answer: f.answer, is_visible: f.is_visible });
  };

  const handleDuplicate = async (f: FAQ) => {
    const nextIdx = items.length > 0 ? Math.max(...items.map(i => i.order_index)) + 1 : 0;
    const { error } = await supabase.from('faqs' as any).insert([{
      question: f.question, answer: f.answer, is_visible: false, order_index: nextIdx,
    }] as any);
    if (error) { toast.error(`Erro ao duplicar: ${error.message}`); return; }
    toast.success('Duplicada!'); fetchItems();
  };

  const handleDelete = async (id: string) => {
    const deletedItem = items.find(i => i.id === id);
    const { error } = await supabase.from('faqs' as any).delete().eq('id', id);
    if (error) { toast.error(`Erro ao excluir: ${error.message}`); return; }
    fetchItems();
    if (deletedItem) {
      const { id: _id, ...itemWithoutId } = deletedItem;
      toast.success('Excluído!', {
        action: {
          label: 'Desfazer',
          onClick: async () => {
            await supabase.from('faqs' as any).insert([itemWithoutId] as any);
            fetchItems();
          },
        },
      });
    } else {
      toast.success('Excluído!');
    }
  };

  const handleReorder = async (reordered: FAQ[]) => {
    const previousItems = items;
    setItems(reordered);
    const results = await Promise.all(
      reordered.map((item, index) =>
        supabase.from('faqs' as any).update({ order_index: index } as any).eq('id', item.id)
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
        <CardHeader><CardTitle>{editingId ? 'Editar' : 'Nova'} FAQ</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Pergunta</Label>
              <Input value={formData.question} onChange={e => setFormData({ ...formData, question: e.target.value })} placeholder="Ex: Você está disponível para novas oportunidades?" required />
            </div>
            <div className="space-y-2">
              <Label>Resposta</Label>
              <Textarea value={formData.answer} onChange={e => setFormData({ ...formData, answer: e.target.value })} placeholder="Resposta detalhada..." rows={4} required />
            </div>
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
        <SortableList items={items} onReorder={handleReorder} renderItem={(f) => (
          <Card className={!f.is_visible ? 'opacity-50' : ''}>
            <CardContent className="pt-4 pb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <HelpCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="font-semibold">{f.question}</span>
                    <p className="text-xs text-muted-foreground truncate max-w-md">{f.answer.slice(0, 80)}...</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0 ml-4">
                  <Button size="icon" variant="outline" onClick={() => handleDuplicate(f)}><Copy className="h-4 w-4" /></Button>
                  <Button size="icon" variant="outline" onClick={() => handleEdit(f)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(f.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )} />
      </div>
    </div>
  );
}
