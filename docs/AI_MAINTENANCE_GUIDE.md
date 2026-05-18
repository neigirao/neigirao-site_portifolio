# Guia de Manutenção para IA

Referência rápida para sistemas de IA que farão manutenção neste projeto.
Para a documentação completa, leia o **CLAUDE.md** na raiz do repositório.

---

## Arquitetura em uma frase

SPA React com CMS admin. Todo conteúdo vem do **Supabase** (PostgreSQL). Não existe `src/data/portfolio.ts` — isso foi a arquitetura antiga.

---

## Arquivos críticos — ordem de leitura

1. `CLAUDE.md` — arquitetura atual, tabelas, padrões, tarefas comuns
2. `src/hooks/usePortfolioData.tsx` — como o site lê os dados
3. `src/hooks/useAdminData.tsx` — como o admin lê e refaz fetch
4. `src/hooks/useSiteSettings.tsx` — configurações globais
5. `src/pages/AdminDashboard.tsx` — estrutura do painel admin
6. `src/integrations/supabase/client.ts` — instância do Supabase
7. `supabase/migrations/` — histórico de schema

---

## Regras invioláveis

```tsx
// ❌ NUNCA
<div className="text-white bg-blue-500">
<div style={{ color: '#fff' }}>
<div className="bg-[#012A4A]">
// Editar src/components/ui/* diretamente
// Editar src/integrations/supabase/types.ts manualmente

// ✅ SEMPRE
<div className="text-foreground bg-primary">
<div className="text-muted-foreground">
// Criar migrations para mudanças de schema
// Usar named exports nos managers
```

---

## Fluxo por tipo de tarefa

### Mudar texto do site
```
/admin → aba Configurações → seção correspondente → salvar
OU
UPDATE site_settings SET value = '...' WHERE key = 'chave';
OU
Criar migration em supabase/migrations/
```

### Adicionar conteúdo (ex: nova experiência)
```
/admin → aba Experiências → botão Nova Experiência → preencher → salvar
```

### Alterar schema do banco
```
1. Criar supabase/migrations/YYYYMMDDHHMMSS_descricao.sql
2. Escrever ALTER TABLE ou CREATE TABLE
3. Commitar e subir para PR
4. Lovable aplica no merge
```

### Adicionar tipo de conteúdo completamente novo
```
1. Migration: nova tabela
2. Hook em useAdminData.tsx
3. Manager em src/components/admin/XManager.tsx
4. Registrar no AdminDashboard (import + tabGroups + TabsContent)
5. Se público: seção em sections/ + hook em usePortfolioData.tsx
```

---

## Decision tree

```
Pedido de mudança
    │
    ├─ É texto ou configuração do site?
    │   └─→ site_settings via admin ou SQL
    │
    ├─ É conteúdo (experiência, projeto, artigo...)?
    │   └─→ Admin /admin, aba correspondente
    │
    ├─ É mudança de schema (nova coluna, tabela)?
    │   └─→ Criar migration SQL
    │
    ├─ É novo componente visual?
    │   └─→ src/components/ usando design system
    │
    └─ É nova funcionalidade complexa?
        └─→ Ler CLAUDE.md antes de começar
```

---

## Testes obrigatórios antes de commitar

```bash
npm run build    # zero erros TypeScript
```

Checar visualmente:
- [ ] Página afetada renderiza sem erros no console
- [ ] Responsivo (mobile + desktop)
- [ ] Admin funciona se a mudança afeta o CMS

---

## Debugging rápido

| Sintoma | Verifique |
|---------|-----------|
| Dado não aparece no site | `is_visible = true`? Hook faz `.eq('is_visible', true)`? |
| Imagem não carrega | URL no Storage público? Bucket com policy correta? |
| Build falha | Erro TypeScript — interface desatualizada após migration? |
| Admin não salva | RLS bloqueando? Usuário autenticado? |
| Texto do site não atualiza | `site_settings` tem a chave? `useSiteSettings` está sendo usado? |

---

## Commits e PRs

```
feat: adiciona X ao manager de Y
fix: corrige Z no componente W
migration: adiciona coluna X à tabela Y
```

Sempre criar PR após push. O Lovable faz o merge e aplica migrations automaticamente.

---

*Para contexto completo: leia CLAUDE.md*
*Última atualização: 2026-05-18*
