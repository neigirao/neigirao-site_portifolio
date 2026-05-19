import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Pencil, Copy, HelpCircle, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { SortableList } from './SortableList';
import { AutosaveIndicator } from './AutosaveIndicator';
import { DeleteConfirmButton } from './DeleteConfirmButton';
import { useAutosave } from '@/hooks/useAutosave';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order_index: number;
  is_visible: boolean;
}

interface FAQsManagerProps {
  onDirtyChange?: (dirty: boolean) => void;
}

const emptyForm = { question: '', answer: '', is_visible: true };

export function FAQsManager({ onDirtyChange }: FAQsManagerProps) {
  const [items, setItems] = useState<FAQ[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const { status: autosaveStatus, clearDraft } = useAutosave({
    key: 'faqs-form',
    data: formData,
    onRecover: useCallback((data: typeof emptyForm) => { setFormData(data); }, []),
  });

  useEffect(() => {
    const hasContent = [formData.question, formData.answer].some(v => v.trim().length > 0);
    onDirtyChange?.(hasContent);
  }, [formData, onDirtyChange]);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    setFetchError(false);
    const { data, error } = await supabase.from('faqs').select('*').order('order_index');
    if (error) { toast.error('Erro ao carregar FAQs'); setFetchError(true); }
    setItems((data || []) as unknown as FAQ[]);
    setIsLoading(false);
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
      const { error } = await supabase.from('faqs').update(payload).eq('id', editingId);
      if (error) { toast.error('Erro ao atualizar'); return; }
      toast.success('FAQ atualizada!');
    } else {
      const { error } = await supabase.from('faqs').insert([payload]);
      if (error) { toast.error('Erro ao criar'); return; }
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
    const { error } = await supabase.from('faqs').insert([{
      question: f.question, answer: f.answer, is_visible: false, order_index: nextIdx,
    }]);
    if (error) { toast.error('Erro ao duplicar'); return; }
    toast.success('Duplicada!'); fetchItems();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('faqs').delete().eq('id', id);
    if (error) { toast.error('Erro ao excluir'); return; }
    toast.success('Excluída!'); fetchItems();
  };

  const handleReorder = async (reordered: FAQ[]) => {
    setItems(reordered);
    await Promise.all(
      reordered.map((item, index) =>
        supabase.from('faqs').update({ order_index: index }).eq('id', item.id)
      )
    );
    toast.success('Ordem atualizada!');
  };

  const handleToggleVisible = async (f: FAQ) => {
    const { error } = await supabase.from('faqs').update({ is_visible: !f.is_visible }).eq('id', f.id);
    if (error) { toast.error('Erro ao atualizar visibilidade'); return; }
    setItems(prev => prev.map(x => x.id === f.id ? { ...x, is_visible: !f.is_visible } : x));
  };

  const resetForm = () => { setEditingId(null); setFormData(emptyForm); clearDraft(); onDirtyChange?.(false); };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{editingId ? 'Editar' : 'Nova'} FAQ</CardTitle>
            <AutosaveIndicator status={autosaveStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Pergunta <span className="text-destructive" aria-hidden="true">*</span></Label>
              <Input value={formData.question} onChange={e => setFormData({ ...formData, question: e.target.value })} placeholder="Ex: Você está disponível para novas oportunidades?" required />
            </div>
            <div className="space-y-2">
              <Label>Resposta <span className="text-destructive" aria-hidden="true">*</span></Label>
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
        <p className="text-sm text-muted-foreground">Arraste os itens para reordenar</p>
        {isLoading ? (
          <div className="py-8 text-center text-muted-foreground text-sm">Carregando...</div>
        ) : fetchError ? (
          <div className="py-8 text-center space-y-3">
            <p className="text-sm text-muted-foreground">Erro ao carregar os dados.</p>
            <Button variant="outline" size="sm" onClick={fetchItems}>Tentar novamente</Button>
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-sm">Nenhuma FAQ adicionada ainda. Crie a primeira acima.</p>
        ) : (
          <SortableList items={items} onReorder={handleReorder} renderItem={(f) => (
            <Card className={`${editingId === f.id ? 'ring-2 ring-primary' : ''} ${!f.is_visible ? 'opacity-50' : ''}`}>
              <CardContent className="pt-4 pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <HelpCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="font-semibold">{f.question}</span>
                      <p className="text-xs text-muted-foreground truncate max-w-md">{f.answer.slice(0, 80)}{f.answer.length > 80 ? '...' : ''}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 ml-4">
                    <Button size="icon" variant="ghost" onClick={() => handleToggleVisible(f)} aria-label={f.is_visible ? 'Ocultar FAQ' : 'Mostrar FAQ'}>
                      {f.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => handleDuplicate(f)} aria-label="Duplicar FAQ"><Copy className="h-4 w-4" /></Button>
                    <Button size="icon" variant="outline" onClick={() => handleEdit(f)} aria-label="Editar FAQ"><Pencil className="h-4 w-4" /></Button>
                    <DeleteConfirmButton itemName={f.question.slice(0, 60)} onConfirm={() => handleDelete(f.id)} />
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
