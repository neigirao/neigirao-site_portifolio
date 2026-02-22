/**
 * CompaniesManager - CMS para empresas do Hero
 */

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploader } from './ImageUploader';
import { SortableList } from './SortableList';

interface Company {
  id: string;
  name: string;
  abbr: string;
  logo_url: string | null;
  order_index: number;
}

const emptyForm = { name: '', abbr: '', logo_url: '' };

export function CompaniesManager() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => { fetchCompanies(); }, []);

  const fetchCompanies = async () => {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('order_index', { ascending: true });
    if (error) { toast.error('Erro ao carregar empresas'); return; }
    setCompanies(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextOrderIndex = companies.length > 0 ? Math.max(...companies.map(c => c.order_index)) + 1 : 0;

    const dataToSubmit = {
      name: formData.name,
      abbr: formData.abbr,
      logo_url: formData.logo_url || null,
      order_index: editingId ? companies.find(c => c.id === editingId)?.order_index || 0 : nextOrderIndex,
    };

    if (editingId) {
      const { error } = await supabase.from('companies').update(dataToSubmit).eq('id', editingId);
      if (error) { toast.error('Erro ao atualizar'); return; }
      toast.success('Empresa atualizada!');
    } else {
      const { error } = await supabase.from('companies').insert([dataToSubmit]);
      if (error) { toast.error('Erro ao criar'); return; }
      toast.success('Empresa criada!');
    }
    resetForm();
    fetchCompanies();
  };

  const handleEdit = (c: Company) => {
    setEditingId(c.id);
    setFormData({ name: c.name, abbr: c.abbr, logo_url: c.logo_url || '' });
  };

  const handleDuplicate = async (c: Company) => {
    const nextOrderIndex = companies.length > 0 ? Math.max(...companies.map(x => x.order_index)) + 1 : 0;
    const { error } = await supabase.from('companies').insert([{
      name: c.name, abbr: `${c.abbr} (cópia)`, logo_url: c.logo_url, order_index: nextOrderIndex,
    }]);
    if (error) { toast.error('Erro ao duplicar'); return; }
    toast.success('Empresa duplicada!');
    fetchCompanies();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir esta empresa?')) return;
    const { error } = await supabase.from('companies').delete().eq('id', id);
    if (error) { toast.error('Erro ao excluir'); return; }
    toast.success('Empresa excluída!');
    fetchCompanies();
  };

  const handleReorder = async (reordered: Company[]) => {
    setCompanies(reordered);
    for (let i = 0; i < reordered.length; i++) {
      await supabase.from('companies').update({ order_index: i }).eq('id', reordered[i].id);
    }
    toast.success('Ordem atualizada!');
  };

  const resetForm = () => { setEditingId(null); setFormData(emptyForm); };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Editar' : 'Nova'} Empresa</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nome Completo</Label>
                <Input id="company-name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Icatu Seguros" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-abbr">Abreviação</Label>
                <Input id="company-abbr" value={formData.abbr} onChange={e => setFormData({ ...formData, abbr: e.target.value })} placeholder="Icatu" required />
              </div>
            </div>
            <ImageUploader value={formData.logo_url} onChange={(url) => setFormData({ ...formData, logo_url: url })} label="Logo da Empresa" folder="companies" />
            <div className="flex gap-2">
              <Button type="submit">{editingId ? 'Atualizar' : 'Criar'}</Button>
              {editingId && <Button type="button" variant="outline" onClick={resetForm}>Cancelar</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Arraste para reordenar</p>
        <SortableList
          items={companies}
          onReorder={handleReorder}
          renderItem={(c) => (
            <Card>
              <CardContent className="pt-4 pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {c.logo_url ? (
                      <img src={c.logo_url} alt={c.name} className="w-8 h-8 object-contain" />
                    ) : (
                      <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-xs font-bold">{c.abbr[0]}</div>
                    )}
                    <div>
                      <span className="font-semibold">{c.name}</span>
                      <span className="ml-2 text-sm text-muted-foreground">({c.abbr})</span>
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
          )}
        />
      </div>
    </div>
  );
}
