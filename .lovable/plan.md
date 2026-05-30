
# Análise da aplicação — o que está errado e o que precisa evoluir

Rodei build/linter/schema. Abaixo o diagnóstico real (não suposições) e o plano para corrigir.

---

## 🔴 Bloqueadores (build quebrado agora)

1. **`LabManager` referencia tabela `lab_projects` que não existe no banco** — `SELECT to_regclass('public.lab_projects')` retorna `NULL`. Isso gera ~20 erros TypeScript em `LabManager.tsx` e `useAdminData.tsx` ("Argument of type 'lab_projects' is not assignable to parameter of type 'never'"). A app não compila.
2. **`LabManager` usa API antiga de componentes**:
   - `<SEOFields>` agora exige `slug` e `onSlugChange` — faltam.
   - `<DeleteConfirmButton>` exige `itemName` — falta.

## 🟠 Segurança (Supabase linter — 13 warnings)

3. **`profiles` RLS permissiva**: policy `SELECT` com `USING (true)` para qualquer autenticado vê e-mail de todos os perfis. Restringir a `auth.uid() = user_id` ou admin-only.
4. **Bucket público `portfolio-images` permite listing** — adicionar política que bloqueia `LIST` mantendo leitura por URL.
5. **5 funções `SECURITY DEFINER` executáveis por `anon`/`authenticated`** (`generate_slug`, `has_role`, `update_updated_at_column`, `handle_new_user`, `auto_assign_admin_role`). Revogar `EXECUTE` de `public` e conceder só ao que precisa (triggers rodam como owner).

## 🟡 Débitos do CMS

6. **`useSiteSettings` e outros usam `from('site_settings' as any)`** — types desatualizados (a tabela existe; basta remover o `as any` após regen).
7. **`SiteSettingsManager` com 513 linhas**, sem agrupamento por seção, sem detecção de tipo (URL/cor/JSON), sem reset por campo.
8. **`CompletenessIndicator` não é usado em todos os cards** (Companies, Certifications, FAQs, Testimonials, Metrics).
9. **Validação SEO inline** (≤60/≤160 + duplicidade) ainda falta em Articles, Companies, Certifications.
10. **`ImageUploader` alt text opcional** → imagens públicas sem alt.
11. **Atalhos ⌘S/Esc/"/"** (`useFormShortcuts`) só instalados em Articles — falta nos outros 12 managers.
12. **`is_visible` em `certifications` e `impact_metrics`** já existe no schema, mas a UI ainda não expõe toggle inline em todos.
13. **`contact_messages`** sem `archived_at`/`tag`, sem notificação por e-mail de nova mensagem.

## 🟡 Conteúdo / narrativa

14. **Projects**: `challenge`, `solution`, `results`, `learnings`, `context` são `textarea` puro — deveriam usar `RichTextEditor`.
15. **Experiences**: quando `is_case=true`, não valida que `case_challenge/solution/result` estejam preenchidos.
16. **Articles**: `reading_time_minutes` manual; não calcula a partir do `content`.
17. **Testimonials**: `quote` sem contador/limite (240–400 chars recomendado).
18. **Schema.org Article** ainda não aplicado em `ArticleDetail`. `BreadcrumbList` parcial.

## 🟡 Operação e auditoria

19. **Sem audit log** — qualquer UPDATE acidental sobrescreve sem histórico.
20. **Sem command palette ⌘K** no admin.
21. **Sem testes** (Vitest) e sem lint rule contra cores hardcoded.

---

## Plano em 4 sprints

```text
Sprint 0 — Desbloquear build (URGENTE, ~30 min)
  • Migration: criar tabela public.lab_projects (title, slug, category, year,
    description, why, context, actions text[], outcomes text[], stack text[],
    brand, is_visible, meta_title, meta_description, order_index, timestamps)
    + GRANTs (anon SELECT, authenticated CRUD, service_role ALL)
    + RLS (anyone SELECT, admin ALL)
  • Aguardar regen de types.ts
  • Ajustar LabManager: adicionar slug/onSlugChange ao <SEOFields>,
    itemName ao <DeleteConfirmButton>
  • Remover 'as any' de useSiteSettings após regen

Sprint 1 — Segurança (fix dos 13 warnings)
  • Migration: REVOKE EXECUTE ... FROM public, anon, authenticated nas
    5 funções SECURITY DEFINER (triggers continuam funcionando)
  • Migration: trocar policy "Users can view all profiles" por
    USING (auth.uid() = user_id OR has_role(auth.uid(),'admin'))
  • Migration: storage policy bloqueando LIST em portfolio-images
    (mantém GET por URL)

Sprint 2 — Consistência do CMS
  • CompletenessIndicator em todos os cards de lista
  • Validação SEO inline universal (Articles, Companies, Certifications)
  • Alt text obrigatório no ImageUploader quando contexto público
  • useFormShortcuts em todos os 13 managers + data-search-input nas buscas
  • Duplicar 1-clique nos managers que faltam
  • Toggle is_visible inline em Certifications e Metrics

Sprint 3 — SiteSettings + Dashboard + Narrativa
  • Refatorar SiteSettingsManager em sub-componentes por seção
    (Cover, Masthead, Essay, Contact, Footer, SEO, Social, Analytics)
  • Detectar tipo (texto/URL/cor/JSON) e renderizar input apropriado
  • DashboardStats: health checks (sem slug, sem meta, msgs não lidas,
    slugs duplicados) + atividade recente cross-table
  • Projects: RichTextEditor nos campos longos
  • Articles: reading_time_minutes auto-calculado
  • Testimonials: contador de chars 240–400
  • Experiences: validar STAR quando is_case=true
  • Schema.org Article + BreadcrumbList completos

Sprint 4 — Operação e auditoria
  • Edge function: notificação de e-mail nova mensagem (Resend)
  • contact_messages: archived_at + tag (lead/spam/parceria)
  • audit_log (entity, action, diff_json, actor) + triggers nas tabelas-chave
  • Command palette ⌘K
  • Bulk actions nas listas grandes
  • Vitest com smoke tests nos hooks principais
```

---

## Detalhes técnicos por sprint

- **Sprint 0**: 1 migration + edits em 2 arquivos. Sem risco, é só restaurar o que está quebrado.
- **Sprint 1**: 3 migrations curtas. As funções SECURITY DEFINER continuam rodando porque triggers executam com privilégio do owner; revogar `EXECUTE` de `public` só impede chamada direta via API.
- **Sprint 2**: puro frontend, sem migrations.
- **Sprint 3**: refatora arquivo grande (SiteSettingsManager) em sub-componentes; sem mudança de schema.
- **Sprint 4**: nova edge function (precisa secret `RESEND_API_KEY`), 2 migrations (contact_messages + audit_log + triggers).

---

## Próximo passo

Confirme o que prefere:

1. **Recomendado**: começar pelo **Sprint 0 + Sprint 1** juntos (build + segurança — risco baixo e crítico)
2. Só Sprint 0 (desbloquear build) e depois decidir
3. Outra ordem / remover algum item
