# Guia de Contribuição

Para IAs e desenvolvedores que vão evoluir este projeto.
Leia também o **CLAUDE.md** para contexto completo de arquitetura.

---

## Princípios

1. **Design system primeiro** — nunca hardcode cores ou estilos
2. **Migrations para schema** — qualquer mudança no banco vai em `supabase/migrations/`
3. **TypeScript rigoroso** — `npm run build` deve passar sem erros
4. **Consistência** — siga os padrões dos managers e hooks existentes
5. **Sem comentários óbvios** — só comente o "por quê", nunca o "o quê"

---

## Design System

### Cores — use sempre tokens semânticos

```tsx
// ✅ Correto
<div className="bg-primary text-primary-foreground">
<p className="text-muted-foreground">
<div className="border-border bg-card">

// ❌ Errado
<div className="bg-blue-500 text-white">
<div className="bg-[#012A4A]">
<p className="text-gray-500">
```

Tokens disponíveis: `primary`, `secondary`, `accent`, `muted`, `card`, `background`, `foreground`, `border`, `destructive`

### Gradientes

```tsx
// ✅ Correto
<div className="bg-gradient-primary">
<div className="bg-gradient-hero">

// ❌ Errado
<div className="bg-gradient-to-r from-blue-500 to-teal-400">
```

### Animações

```tsx
animate-fade-in-up    // fade com movimento para cima
animate-slide-in-left // slide da esquerda
animate-float         // flutuação contínua
hover:shadow-glow     // glow no hover
transition-all duration-300
```

---

## Padrão de Manager (CMS)

Todo manager segue esta estrutura:

```tsx
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAutosave } from '@/hooks/useAutosave';
import { DeleteConfirmButton } from './DeleteConfirmButton';
import { AutosaveIndicator } from './AutosaveIndicator';
import { SortableList } from './SortableList';
import { toast } from 'sonner';

interface Item { id: string; /* campos */ order_index: number; }
interface XManagerProps { onDirtyChange?: (dirty: boolean) => void; }

const emptyForm = { /* campos iniciais */ };

export function XManager({ onDirtyChange }: XManagerProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(true);

  const { status: autosaveStatus, clearDraft } = useAutosave({
    key: 'x-form',
    data: formData,
    onRecover: useCallback((data: typeof emptyForm) => setFormData(data), []),
  });

  useEffect(() => {
    const hasContent = Object.values(formData).some(v => String(v).trim().length > 0);
    onDirtyChange?.(hasContent);
  }, [formData, onDirtyChange]);

  // fetchItems, handleSubmit, handleEdit, handleDelete, handleReorder, resetForm
}
```

Registrar no `AdminDashboard`:
1. Import do manager
2. Entrada em `tabGroups`
3. `<TabsContent value="x"><XManager onDirtyChange={setIsDirty} /></TabsContent>`

---

## Padrão de Hook de Dados

### Leitura pública

```tsx
// src/hooks/usePortfolioData.tsx
export function useXItems() {
  return useQuery({
    queryKey: ['x-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('x_items')
        .select('*')
        .eq('is_visible', true)
        .order('order_index');
      if (error) throw error;
      return data;
    },
  });
}
```

### Leitura admin

```tsx
// src/hooks/useAdminData.tsx — adicionar ao useAdminDashboardData
export function useAdminXItems() {
  return useQuery({
    queryKey: ['admin-x-items'],
    queryFn: async () => {
      const { data, error } = await supabase.from('x_items').select('*').order('order_index');
      if (error) throw error;
      return data ?? [];
    },
  });
}
```

---

## Migrations

Nome do arquivo: `YYYYMMDDHHMMSS_descricao_curta.sql`

```sql
-- Adicionar coluna
ALTER TABLE public.tabela
  ADD COLUMN IF NOT EXISTS nova_coluna TEXT;

-- Criar tabela
CREATE TABLE IF NOT EXISTS public.nova_tabela (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campo TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS para tabela pública
ALTER TABLE public.nova_tabela ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON public.nova_tabela FOR SELECT USING (true);
CREATE POLICY "Auth write" ON public.nova_tabela FOR ALL USING (auth.role() = 'authenticated');
```

---

## Checklist antes de commitar

- [ ] `npm run build` sem erros
- [ ] Interface TypeScript atualizada se mudou o schema
- [ ] Migration criada para mudanças de banco
- [ ] Manager registrado no AdminDashboard se criou novo
- [ ] Sem cores hardcoded

---

## Checklist de PR

- [ ] Título descritivo (`feat:`, `fix:`, `migration:`)
- [ ] Descrição com o que mudou e como testar
- [ ] Migrations incluídas se necessário

---

*Última atualização: 2026-05-18*
