import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Skill {
  id: string;
  name: string;
  logo_url: string | null;
  category: string | null;
  order_index: number;
}

export function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    category: '',
    order_index: 0,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      toast.error('Erro ao carregar skills');
      return;
    }

    setSkills(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from('skills')
        .update(formData)
        .eq('id', editingId);

      if (error) {
        toast.error('Erro ao atualizar skill');
        return;
      }

      toast.success('Skill atualizada!');
    } else {
      const { error } = await supabase
        .from('skills')
        .insert([formData]);

      if (error) {
        toast.error('Erro ao criar skill');
        return;
      }

      toast.success('Skill criada!');
    }

    resetForm();
    fetchSkills();
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      logo_url: skill.logo_url || '',
      category: skill.category || '',
      order_index: skill.order_index,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta skill?')) return;

    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erro ao excluir skill');
      return;
    }

    toast.success('Skill excluída!');
    fetchSkills();
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      logo_url: '',
      category: '',
      order_index: 0,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Editar' : 'Nova'} Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="logo_url">URL do Logo</Label>
                <Input
                  id="logo_url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <Card key={skill.id}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <h3 className="font-semibold">{skill.name}</h3>
                {skill.category && (
                  <p className="text-sm text-muted-foreground">{skill.category}</p>
                )}
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => handleEdit(skill)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(skill.id)}>
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