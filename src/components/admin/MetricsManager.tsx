import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { SortableList } from './SortableList';
import { AutosaveIndicator } from './AutosaveIndicator';
import { DeleteConfirmButton } from './DeleteConfirmButton';
import { useAutosave } from '@/hooks/useAutosave';

interface Metric {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  order_index: number;
  is_visible: boolean;
}

const ICON_OPTIONS = [
  'Star', 'TrendingUp', 'Users', 'Target', 'Award', 'Zap',
  'BarChart', 'CheckCircle', 'Globe', 'Rocket',
];

const COLOR_OPTIONS = [
  { label: 'Amarelo', value: 'text-yellow-500' },
  { label: 'Verde', value: 'text-emerald-500' },
  { label: 'Azul', value: 'text-blue-500' },
  { label: 'Roxo', value: 'text-purple-500' },
  { label: 'Vermelho', value: 'text-red-500' },
  { label: 'Laranja', value: 'text-orange-500' },
  { label: 'Teal', value: 'text-teal-500' },
];

const emptyForm = { value: '', label: '', description: '', icon: 'Star', color: 'text-yellow-500' };

interface MetricsManagerProps {
  onDirtyChange?: (dirty: boolean) => void;
}

export function MetricsManager({ onDirtyChange }: MetricsManagerProps) {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const { status: autosaveStatus, clearDraft } = useAutosave({
    key: 'metrics-form',
    data: formData,
    onRecover: useCallback((data: typeof emptyForm) => { setFormData(data); }, []),
  });

  useEffect(() => {
    const hasContent = [formData.value, formData.label, formData.description].some(v => v.trim().length > 0);
    onDirtyChange?.(hasContent);
  }, [formData, onDirtyChange]);

  useEffect(() => { fetchMetrics(); }, []);

  const fetchMetrics = async () => {
    setIsLoading(true);
    setFetchError(false);
    const { data, error } = await supabase
      .from('impact_metrics')
      .select('*')
      .order('order_index', { ascending: true });
    if (error) { toast.error('Erro ao carregar métricas'); setFetchError(true); }
    setMetrics(data || []);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextOrderIndex = metrics.length > 0 ? Math.max(...metrics.map(m => m.order_index)) + 1 : 0;
    const dataToSubmit = {
      ...formData,
      order_index: editingId ? metrics.find(m => m.id === editingId)?.order_index || 0 : nextOrderIndex,
    };

    if (editingId) {
      const { error } = await supabase.from('impact_metrics').update(dataToSubmit).eq('id', editingId);
      if (error) { toast.error('Erro ao atualizar'); return; }
      toast.success('Métrica atualizada!');
    } else {
      const { error } = await supabase.from('impact_metrics').insert([dataToSubmit]);
      if (error) { toast.error('Erro ao criar'); return; }
      toast.success('Métrica criada!');
    }
    resetForm();
    fetchMetrics();
  };

  const handleEdit = (m: Metric) => {
    setEditingId(m.id);
    setFormData({ value: m.value, label: m.label, description: m.description, icon: m.icon, color: m.color });
  };

  const handleDuplicate = async (m: Metric) => {
    const nextOrderIndex = metrics.length > 0 ? Math.max(...metrics.map(x => x.order_index)) + 1 : 0;
    const { error } = await supabase.from('impact_metrics').insert([{
      value: m.value, label: `${m.label} (cópia)`, description: m.description,
      icon: m.icon, color: m.color, order_index: nextOrderIndex,
    }]);
    if (error) { toast.error('Erro ao duplicar'); return; }
    toast.success('Métrica duplicada!');
    fetchMetrics();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('impact_metrics').delete().eq('id', id);
    if (error) { toast.error('Erro ao excluir'); return; }
    toast.success('Métrica excluída!');
    fetchMetrics();
  };

  const handleToggleVisibility = async (m: Metric) => {
    const { error } = await supabase.from('impact_metrics').update({ is_visible: !m.is_visible }).eq('id', m.id);
    if (error) { toast.error('Erro ao alterar visibilidade'); return; }
    setMetrics(prev => prev.map(x => x.id === m.id ? { ...x, is_visible: !m.is_visible } : x));
  };

  const handleReorder = async (reordered: Metric[]) => {
    setMetrics(reordered);
    await Promise.all(
      reordered.map((item, index) =>
        supabase.from('impact_metrics').update({ order_index: index }).eq('id', item.id)
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
            <CardTitle>{editingId ? 'Editar' : 'Nova'} Métrica</CardTitle>
            <AutosaveIndicator status={autosaveStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="metric-value">Valor <span className="text-destructive" aria-hidden="true">*</span></Label>
                <Input id="metric-value" value={formData.value} onChange={e => setFormData({ ...formData, value: e.target.value })} placeholder="+40%" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metric-label">Label <span className="text-destructive" aria-hidden="true">*</span></Label>
                <Input id="metric-label" value={formData.label} onChange={e => setFormData({ ...formData, label: e.target.value })} placeholder="Redução Custos" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="metric-description">Descrição <span className="text-destructive" aria-hidden="true">*</span></Label>
              <Input id="metric-description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Contexto da métrica" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ícone</Label>
                <Select value={formData.icon} onValueChange={v => setFormData({ ...formData, icon: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map(icon => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Cor</Label>
                <Select value={formData.color} onValueChange={v => setFormData({ ...formData, color: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {COLOR_OPTIONS.map(c => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
            <Button variant="outline" size="sm" onClick={fetchMetrics}>Tentar novamente</Button>
          </div>
        ) : metrics.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-sm">Nenhuma métrica adicionada ainda. Adicione a primeira acima.</p>
        ) : (
          <SortableList
            items={metrics}
            onReorder={handleReorder}
            renderItem={(m) => (
              <Card className={`${editingId === m.id ? 'ring-2 ring-primary' : ''} ${!m.is_visible ? 'opacity-50' : ''}`}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-lg">{m.value}</span>
                      <span className="ml-2 text-muted-foreground">{m.label}</span>
                      <p className="text-sm text-muted-foreground">{m.description}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 ml-4 items-center">
                      <Switch checked={m.is_visible} onCheckedChange={() => handleToggleVisibility(m)} aria-label={`Visibilidade de ${m.label}`} />
                      <Button size="icon" variant="outline" onClick={() => handleDuplicate(m)} aria-label={`Duplicar ${m.label}`}><Copy className="h-4 w-4" /></Button>
                      <Button size="icon" variant="outline" onClick={() => handleEdit(m)} aria-label={`Editar ${m.label}`}><Pencil className="h-4 w-4" /></Button>
                      <DeleteConfirmButton itemName={`${m.value} ${m.label}`} onConfirm={() => handleDelete(m.id)} />
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
