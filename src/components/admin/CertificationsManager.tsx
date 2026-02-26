import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2, Copy, Award } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploader } from './ImageUploader';
import { SortableList } from './SortableList';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string | null;
  logo_url: string | null;
  credential_url: string | null;
  order_index: number;
}

const emptyForm = { name: '', issuer: '', year: '', logo_url: '', credential_url: '' };

export function CertificationsManager() {
  const [items, setItems] = useState<Certification[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase.from('certifications').select('*').order('order_index');
    if (error) { toast.error('Erro ao carregar certificações'); return; }
    setItems(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextIdx = items.length > 0 ? Math.max(...items.map(i => i.order_index)) + 1 : 0;
    const payload = {
      name: formData.name,
      issuer: formData.issuer,
      year: formData.year || null,
      logo_url: formData.logo_url || null,
      credential_url: formData.credential_url || null,
      order_index: editingId ? items.find(i => i.id === editingId)?.order_index || 0 : nextIdx,
    };

    if (editingId) {
      const { error } = await supabase.from('certifications').update(payload).eq('id', editingId);
      if (error) { toast.error('Erro ao atualizar'); return; }
      toast.success('Certificação atualizada!');
    } else {
      const { error } = await supabase.from('certifications').insert([payload]);
      if (error) { toast.error('Erro ao criar'); return; }
      toast.success('Certificação criada!');
    }
    resetForm(); fetchItems();
  };

  const handleEdit = (c: Certification) => {
    setEditingId(c.id);
    setFormData({ name: c.name, issuer: c.issuer, year: c.year || '', logo_url: c.logo_url || '', credential_url: c.credential_url || '' });
  };

  const handleDuplicate = async (c: Certification) => {
    const nextIdx = items.length > 0 ? Math.max(...items.map(i => i.order_index)) + 1 : 0;
    const { error } = await supabase.from('certifications').insert([{ name: `${c.name} (cópia)`, issuer: c.issuer, year: c.year, logo_url: c.logo_url, credential_url: c.credential_url, order_index: nextIdx }]);
    if (error) { toast.error('Erro ao duplicar'); return; }
    toast.success('Duplicado!'); fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir esta certificação?')) return;
    const { error } = await supabase.from('certifications').delete().eq('id', id);
    if (error) { toast.error('Erro ao excluir'); return; }
    toast.success('Excluído!'); fetchItems();
  };

  const handleReorder = async (reordered: Certification[]) => {
    setItems(reordered);
    for (let i = 0; i < reordered.length; i++) {
      await supabase.from('certifications').update({ order_index: i }).eq('id', reordered[i].id);
    }
    toast.success('Ordem atualizada!');
  };

  const resetForm = () => { setEditingId(null); setFormData(emptyForm); };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>{editingId ? 'Editar' : 'Nova'} Certificação</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="CSM - Certified Scrum Master" required />
              </div>
              <div className="space-y-2">
                <Label>Emissor</Label>
                <Input value={formData.issuer} onChange={e => setFormData({ ...formData, issuer: e.target.value })} placeholder="Scrum Alliance" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ano</Label>
                <Input value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} placeholder="2023" />
              </div>
              <div className="space-y-2">
                <Label>URL da Credencial</Label>
                <Input value={formData.credential_url} onChange={e => setFormData({ ...formData, credential_url: e.target.value })} placeholder="https://..." />
              </div>
            </div>
            <ImageUploader value={formData.logo_url} onChange={(url) => setFormData({ ...formData, logo_url: url })} label="Logo" folder="certifications" />
            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'Atualizar' : 'Criar'}</Button>
              {editingId && <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Arraste para reordenar</p>
        <SortableList items={items} onReorder={handleReorder} renderItem={(c) => (
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {c.logo_url ? <img src={c.logo_url} alt={c.name} className="w-8 h-8 object-contain" /> : <Award className="w-6 h-6 text-teal-accent" />}
                  <div>
                    <span className="font-semibold">{c.name}</span>
                    <span className="ml-2 text-sm text-muted-foreground">{c.issuer}{c.year ? ` · ${c.year}` : ''}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0 ml-4">
                  <Button size="icon" variant="outline" onClick={() => handleDuplicate(c)}><Copy className="h-4 w-4" /></Button>
                  <Button size="icon" variant="outline" onClick={() => handleEdit(c)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(c.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )} />
      </div>
    </div>
  );
}
