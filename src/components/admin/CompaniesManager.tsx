import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Pencil, Copy, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploader } from './ImageUploader';
import { SortableList } from './SortableList';
import { AutosaveIndicator } from './AutosaveIndicator';
import { DeleteConfirmButton } from './DeleteConfirmButton';
import { useAutosave } from '@/hooks/useAutosave';
import { useFormShortcuts } from '@/hooks/useFormShortcuts';
import { CompletenessIndicator } from './CompletenessIndicator';

interface Company {
  id: string;
  name: string;
  abbr: string;
  logo_url: string | null;
  order_index: number;
  is_visible: boolean;
}

interface CompaniesManagerProps {
  onDirtyChange?: (dirty: boolean) => void;
}

const emptyForm = { name: '', abbr: '', logo_url: '', is_visible: true };

export function CompaniesManager({ onDirtyChange }: CompaniesManagerProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const { status: autosaveStatus, clearDraft } = useAutosave({
    key: 'companies-form',
    data: formData,
    onRecover: useCallback((data: typeof emptyForm) => { setFormData(data); }, []),
  });

  useEffect(() => {
    const hasContent = [formData.name, formData.abbr].some(v => v.trim().length > 0);
    onDirtyChange?.(hasContent);
  }, [formData, onDirtyChange]);

  useEffect(() => { fetchCompanies(); }, []);

  const fetchCompanies = async () => {
    setIsLoading(true);
    setFetchError(false);
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('order_index', { ascending: true });
    if (error) { toast.error('Erro ao carregar empresas'); setFetchError(true); }
    setCompanies(data || []);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextOrderIndex = companies.length > 0 ? Math.max(...companies.map(c => c.order_index)) + 1 : 0;
    const dataToSubmit = {
      name: formData.name,
      abbr: formData.abbr,
      logo_url: formData.logo_url || null,
      is_visible: formData.is_visible,
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
    setFormData({ name: c.name, abbr: c.abbr, logo_url: c.logo_url || '', is_visible: c.is_visible });
  };

  const handleToggleVisible = async (c: Company) => {
    const { error } = await supabase.from('companies').update({ is_visible: !c.is_visible }).eq('id', c.id);
    if (error) { toast.error('Erro ao atualizar visibilidade'); return; }
    setCompanies(prev => prev.map(x => x.id === c.id ? { ...x, is_visible: !c.is_visible } : x));
  };

  const handleDuplicate = async (c: Company) => {
    const nextOrderIndex = companies.length > 0 ? Math.max(...companies.map(x => x.order_index)) + 1 : 0;
    const { error } = await supabase.from('companies').insert([{
      name: c.name, abbr: `${c.abbr} (cópia)`, logo_url: c.logo_url, is_visible: c.is_visible, order_index: nextOrderIndex,
    }]);
    if (error) { toast.error('Erro ao duplicar'); return; }
    toast.success('Empresa duplicada!');
    fetchCompanies();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('companies').delete().eq('id', id);
    if (error) { toast.error('Erro ao excluir'); return; }
    toast.success('Empresa excluída!');
    fetchCompanies();
  };

  const handleReorder = async (reordered: Company[]) => {
    setCompanies(reordered);
    await Promise.all(
      reordered.map((item, index) =>
        supabase.from('companies').update({ order_index: index }).eq('id', item.id)
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{editingId ? 'Editar' : 'Nova'} Empresa</CardTitle>
            <AutosaveIndicator status={autosaveStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nome Completo <span className="text-destructive" aria-hidden="true">*</span></Label>
                <Input id="company-name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Icatu Seguros" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-abbr">Abreviação <span className="text-destructive" aria-hidden="true">*</span></Label>
                <Input id="company-abbr" value={formData.abbr} onChange={e => setFormData({ ...formData, abbr: e.target.value })} placeholder="Icatu" required />
              </div>
            </div>
            <ImageUploader value={formData.logo_url} onChange={(url) => setFormData({ ...formData, logo_url: url })} label="Logo da Empresa" folder="companies" />
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
            <Button variant="outline" size="sm" onClick={fetchCompanies}>Tentar novamente</Button>
          </div>
        ) : companies.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-sm">Nenhuma empresa adicionada ainda. Adicione a primeira acima.</p>
        ) : (
          <SortableList
            items={companies}
            onReorder={handleReorder}
            renderItem={(c) => (
              <Card className={`${editingId === c.id ? 'ring-2 ring-primary' : ''} ${!c.is_visible ? 'opacity-50' : ''}`}>
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
                        <div className="mt-1"><CompletenessIndicator hasImage={!!c.logo_url} itemName={c.name} /></div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 ml-4">
                      <Button size="icon" variant="ghost" onClick={() => handleToggleVisible(c)} aria-label={c.is_visible ? `Ocultar ${c.name}` : `Mostrar ${c.name}`}>
                        {c.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                      </Button>
                      <Button size="icon" variant="outline" onClick={() => handleDuplicate(c)} aria-label={`Duplicar ${c.name}`}><Copy className="h-4 w-4" /></Button>
                      <Button size="icon" variant="outline" onClick={() => handleEdit(c)} aria-label={`Editar ${c.name}`}><Pencil className="h-4 w-4" /></Button>
                      <DeleteConfirmButton itemName={c.name} onConfirm={() => handleDelete(c.id)} />
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
