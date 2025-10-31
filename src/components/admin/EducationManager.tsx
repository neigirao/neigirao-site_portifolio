import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string | null;
  order_index: number;
}

export function EducationManager() {
  const [education, setEducation] = useState<Education[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    period: '',
    description: '',
    order_index: 0,
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      toast.error('Erro ao carregar educação');
      return;
    }

    setEducation(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from('education')
        .update(formData)
        .eq('id', editingId);

      if (error) {
        toast.error('Erro ao atualizar educação');
        return;
      }

      toast.success('Educação atualizada!');
    } else {
      const { error } = await supabase
        .from('education')
        .insert([formData]);

      if (error) {
        toast.error('Erro ao criar educação');
        return;
      }

      toast.success('Educação criada!');
    }

    resetForm();
    fetchEducation();
  };

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      period: edu.period,
      description: edu.description || '',
      order_index: edu.order_index,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta educação?')) return;

    const { error } = await supabase
      .from('education')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erro ao excluir educação');
      return;
    }

    toast.success('Educação excluída!');
    fetchEducation();
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      institution: '',
      degree: '',
      period: '',
      description: '',
      order_index: 0,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Editar' : 'Nova'} Educação</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institution">Instituição</Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degree">Curso/Grau</Label>
                <Input
                  id="degree"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="period">Período</Label>
                <Input
                  id="period"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order_index">Ordem</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição (opcional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? 'Atualizar' : 'Criar'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {education.map((edu) => (
          <Card key={edu.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{edu.degree}</h3>
                  <p className="text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                  {edu.description && (
                    <p className="mt-2 text-sm">{edu.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => handleEdit(edu)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(edu.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}