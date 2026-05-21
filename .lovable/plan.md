
# Análise da aplicação — Portfolio Nei Girão

Li toda a documentação (`CLAUDE.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, `ROADMAP.md`, `docs/AI_MAINTENANCE_GUIDE.md`, `README.md`, `.lovable/plan.md`), os hooks principais, o schema (14 tabelas) e a configuração Supabase. Abaixo está o diagnóstico e a proposta de roadmap.

---

## 1. O que está sólido ✅

- **Arquitetura**: SPA React + Supabase com CMS completo e padrões consistentes (managers, autosave, undo, rollback de reorder, retry, ring de edição).
- **Segurança base**: RLS ativo em todas as tabelas, role `admin` via `has_role()` + auto-assign para `neigirao@gmail.com`, bucket `portfolio-images` público só para leitura.
- **SEO básico**: slug + meta_title + meta_description em quase todas as tabelas de conteúdo, sitemap/llms.txt/about.txt via edge functions, BreadcrumbSchema.
- **Performance**: React Query com staleTime, prefetch de rotas, Tiptap em chunk separado, lazy do AdminDashboard.
- **UX admin**: 23 managers padronizados, busca/filtro em alguns, validação de slug duplicado nos principais, completeness indicator existente.
- **Acessibilidade**: skip-to-content, ARIA, contraste WCAG AA.
- **Conteúdo**: site_settings como KV global, internal linking automatizado via `useRelatedContent`.

---

## 2. Lacunas e dívidas identificadas 🟡

### CMS — inconsistências entre managers
- `is_visible` ausente em `certifications` (sempre aparece) e ainda só parcialmente padronizado na UI (badge/opacity).
- `CompletenessIndicator` existe mas não é usado em todos os cards de lista.
- Validação SEO inline (≤60/≤160 + duplicidade) só cobre Experiences, Projects, Skills, Education — falta replicar em Articles/Certifications/Companies.
- Alt text do `ImageUploader` opcional → imagens sem alt no site público.
- `SiteSettingsManager` (491 linhas) tudo `textarea`, sem agrupamento por seção, sem reset, sem detecção de tipo (URL/cor/JSON).
- Bulk actions / duplicar 1-clique faltam na maioria.
- `DashboardStats` sem health checks (sem slug, sem meta, mensagens não lidas, slugs duplicados).

### Conteúdo e Redator
- `case_body`/`case_result` em Experiences ainda não validam quando `is_case = true`.
- Projects: `challenge`, `solution`, `results`, `learnings`, `context` são textarea — deveriam ser RichTextEditor.
- Articles: não há estado `draft`/`published` separado do Salvar, `reading_time_minutes` não é auto-calculado, sem agendamento.
- Testimonials: `quote` sem contador/limite de caracteres.
- Estrutura STAR (challenge/solution/result separados) prevista no ROADMAP ainda não implementada.

### Operação e auditoria
- Sem audit log e sem versionamento de edições (risco de perda em update acidental).
- Sem notificação por email quando entra nova mensagem em `contact_messages`.
- Tabela `contact_messages` sem `archived_at` nem `tag` (lead/spam/parceria).
- Sem command palette ⌘K e sem atalhos ⌘S/Esc nos forms.

### Segurança / boas práticas
- Policy "Users can view all profiles" → qualquer autenticado vê todos os profiles (revisar para `auth.uid() = user_id` ou admin-only).
- Uso de `from('site_settings' as any)` e `from('faqs' as any)` — types desatualizados.
- Funções Postgres com `SECURITY DEFINER` ok, mas vale auditar `search_path`.

### SEO e descoberta
- Schema.org Article ainda não aplicado em ArticleDetail.
- BreadcrumbList em todos os detalhes ainda parcial.
- Sem fallback de `meta_description` a partir de `value_pitch` global.

### Performance / DX
- Sem testes (Vitest), sem Storybook leve dos managers.
- Sem lint rule contra cores hardcoded.

---

## 3. Roadmap proposto

Quatro sprints curtos, cada um entregando valor isolado.

```text
Sprint 1 — Consistência do CMS (1 sessão)
  • is_visible em certifications (migration + toggle inline)
  • CompletenessIndicator em todos os cards de lista
  • Alt text obrigatório em ImageUploader quando público
  • Validação SEO inline universal (Articles, Companies, Certifications)
  • Atalhos ⌘S / Esc / "/" via hook useFormShortcuts
  • Duplicar 1-clique nos managers que faltam

Sprint 2 — Site Settings + Dashboard (1 sessão)
  • Agrupar SiteSettings por seção (Accordion: Cover, Masthead, Essay,
    Contact, Footer, SEO, Social, Analytics)
  • Detectar tipo (texto/URL/cor/JSON) e renderizar input apropriado
  • Reset para default por campo
  • DashboardStats: health checks + atividade recente cross-table
  • Quick actions ("+ Novo projeto/artigo") no dashboard

Sprint 3 — Redator e narrativa (1 sessão)
  • Migrations: case_challenge / case_solution / case_result em
    experiences e projects (STAR)
  • Renderizar STAR em ExperienceDetail e ProjectDetail
  • Projects: RichTextEditor nos campos longos + preview do card
  • Articles: estado draft/published separado + reading_time automático
    + agendamento
  • Testimonials: contador 240–400 chars + preview
  • Chave value_pitch como fallback de meta_description

Sprint 4 — Operação, auditoria e segurança (1–2 sessões)
  • Edge function: email de notificação de nova mensagem (Resend)
  • contact_messages: archived_at + tag (lead/spam/parceria)
  • audit_log (entity, action, diff_json) + trigger nas tabelas-chave
  • Snapshot simples antes de UPDATE (projects/experiences/articles/site_settings)
  • Bulk actions nas listas grandes
  • Command palette ⌘K
  • Revisar RLS de profiles + Article schema + BreadcrumbList completo
```

---

## 4. Detalhes técnicos por sprint

- **Sprint 1** é puro frontend + 1 migration trivial (`is_visible` em certifications). Baixo risco.
- **Sprint 2** mexe num arquivo grande (`SiteSettingsManager.tsx`, 491 linhas) — vale refatorar em sub-componentes por seção.
- **Sprint 3** tem 1 migration nova por tabela (STAR) + ajustes em pages de detalhe + RichTextEditor já existe.
- **Sprint 4** envolve edge function nova, secret `RESEND_API_KEY`, e triggers SQL.

---

## 5. Próximo passo

Confirma o que prefere:
1. Seguir **Sprint 1 → 2 → 3 → 4** na ordem?
2. Ou priorizar algum sprint específico (ex.: Sprint 4 pela notificação de email)?
3. Algum item para remover ou adicionar?

Assim que aprovar, começo pelo escolhido.
