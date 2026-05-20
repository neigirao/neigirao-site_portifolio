# Roadmap

Histórico de evoluções e próximos passos do portfolio de Nei Girão.

---

## Concluído

### CMS — Qualidade e estabilidade (Mai 2026)

- `DeleteConfirmButton` com AlertDialog em todos os managers
- `useAutosave` com rascunho em localStorage (5s debounce, recuperação automática)
- `useUnsavedChanges` guard com `beforeunload` e dialog ao trocar de aba
- Loading states e skeletons em todos os managers
- `Promise.all` para refetch coordenado no admin
- `onDirtyChange` padronizado em todos os managers
- Hook `useAdminDashboardData` expandido para 10 tipos de conteúdo

### CMS — Funcionalidades (Mai 2026)

- Visibilidade inline (Eye/EyeOff) padronizada em todos os managers
- `CompaniesManager`: campo `is_visible` + toggle (com migration)
- `FAQsManager`: toggle de visibilidade inline
- Barra flutuante de salvamento em `SiteSettingsManager`
- `DashboardStats`: contagem total de itens complementares visível
- Export JSON (backup completo com 1 clique)
- `BulkSlugGenerator`: gera slugs em lote para todos os managers

### CMS — Design e UX (Mai 2026, PR #14)

- Ícone do grupo "Complementar" corrigido para `LayoutList`
- Tooltips em todos os botões icon-only do header (Export, Refresh, Home)
- Indicador de grupo ativo quando collapsible está fechado
- Ordem de botões de ação padronizada: Eye → Copy → Pencil → Delete
- Label "Conteúdo Complementar" com contagem de itens visível

### CMS — UX heurísticas (alta prioridade, Mai 2026, PR #15)

- **Undo de deleção**: toast com botão "Desfazer" em todos os 10 managers
- **Rollback de reordenação**: reverte estado local se `Promise.all` falhar
- **Erros específicos**: todos os `toast.error` incluem `error.message` do Supabase
- **Validação de slug duplicado**: Experiences, Projects, Skills, Education, Articles

### CMS — UX heurísticas (média prioridade, Mai 2026, PR #16)

- **Destaque de edição**: `ring-2 ring-primary` no card sendo editado (todos os 10 managers)
- **Busca/filtro**: adicionado em ExperiencesManager e SkillsManager
- **AlertDialog**: substituído `window.confirm()` por dialog shadcn na troca de aba
- **Retry button**: botão "Tentar novamente" quando fetch da lista falha (todos os managers)

### Documentação (Mai 2026)

- `CLAUDE.md` criado — guia completo para IAs e desenvolvedores
- `README.md` reescrito para refletir arquitetura atual (Supabase, não arquivos estáticos)
- `CONTRIBUTING.md` reescrito com padrões atuais
- `docs/AI_MAINTENANCE_GUIDE.md` criado — referência rápida para IAs
- `ARCHITECTURE.md` reescrito (este arquivo era obsoleto)
- `ROADMAP.md` criado (este arquivo)

---

## Em aberto — prioridade alta

### Busca em ArticlesManager
- Filtro por título, tag ou status (publicado/rascunho)
- Pattern já existente em ProjectsManager e ExperiencesManager

### ContactMessagesManager — melhorias
- Marcar como lida / arquivar
- Notificação por email via Edge Function quando nova mensagem chega
- Exportar CSV

### DashboardStats — health checks
- Contar mensagens não lidas
- Contar artigos em rascunho
- Contar projetos ocultos
- Alertas para itens sem SEO ou sem slug

---

## Em aberto — prioridade média

### Bulk actions nos managers
- Seleção múltipla de itens
- Ocultar/mostrar/excluir em lote
- Útil quando há 20+ skills ou experiences

### Histórico simples de edições
- Snapshot do registro antes de cada update
- Tabela `edit_history` com `entity`, `entity_id`, `before`, `after`, `edited_at`
- Permite reverter edições acidentais

---

## Em aberto — prioridade baixa / próximas fases

### SEO e descoberta (site público)

- **Schema.org BreadcrumbList** em ProjectDetail e ExperienceDetail
- **Article schema** em ArticleDetail
- **OG image dinâmica** por projeto/case usando `cover_image_url`
- **"Related content"** em ArticleDetail e ExperienceDetail (hook `useRelatedContent` já existe)
- **Canonical URLs** validadas em todas as páginas de detalhe

### Performance (site público)

- `OptimizedImage` com `loading="lazy"` padronizado em todas as seções
- `fetchpriority="high"` no LCP do CoverSection
- ~~Prefetch de rotas ao hover em cards de projeto/experiência~~ ✅ `prefetchRoute` em `onMouseEnter` nos cards de artigos, experiências e skills
- ~~Mover `RichTextEditor` (Tiptap) para chunk separado — só carrega no admin~~ ✅ já configurado em `vite.config.ts` (`@tiptap → vendor-editor`) com `AdminDashboard` lazy

### Acessibilidade (site público)

- `:focus-visible` ring consistente em todos os links interativos
- `prefers-reduced-motion` respeitado em transições de EssaySection e PullQuoteSection
- Navegação por teclado no WorkSection (lista de experiências expandíveis)
- Revisão de densidade tipográfica em mobile 393px

### Segurança e robustez

- Auditoria de RLS — revisar policy "Users can view all profiles"
- Logs estruturados em Edge Functions
- Substituir `from('faqs' as any)` por tipos gerados (`supabase gen types`)
- Lint rule para proibir cores hardcoded fora dos tokens Tailwind

### DX e testes

- Smoke tests dos managers principais com Vitest + Testing Library
- Storybook leve para componentes UI do admin

---

## Notas de arquitetura

- Migrations são aplicadas automaticamente pelo Lovable no merge de PR — nunca executar manualmente em produção
- `src/integrations/supabase/types.ts` é gerado automaticamente — nunca editar manualmente
- `src/components/ui/` é shadcn — não editar diretamente
- Novo conteúdo sempre pelo admin `/admin`, nunca hardcoded

---

*Última atualização: 2026-05-21*
