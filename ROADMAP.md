# Roadmap

Histórico de evoluções do portfolio de Nei Girão.

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
- `CompaniesManager`: campo `is_visible` + toggle
- `FAQsManager`: toggle de visibilidade inline
- Barra flutuante de salvamento em `SiteSettingsManager`
- `DashboardStats`: contagem total de itens complementares
- Export JSON (backup completo com 1 clique)
- `BulkSlugGenerator`: gera slugs em lote

### CMS — Design e UX (Mai 2026)
- Ícone do grupo "Complementar" corrigido para `LayoutList`
- Tooltips em todos os botões icon-only do header
- Indicador de grupo ativo quando collapsible está fechado
- Ordem de botões de ação padronizada: Eye → Copy → Pencil → Delete

### CMS — UX heurísticas (Mai 2026)
- **Undo de deleção**: toast com botão "Desfazer" em todos os managers
- **Rollback de reordenação**: reverte estado local se falhar
- **Erros específicos**: todos os `toast.error` incluem `error.message`
- **Validação de slug duplicado**: Experiences, Projects, Skills, Education, Articles
- **Destaque de edição**: `ring-2 ring-primary` no card sendo editado
- **Busca/filtro**: ExperiencesManager e SkillsManager
- **AlertDialog**: substituído `window.confirm()` em todas as trocas de aba
- **Retry button**: botão "Tentar novamente" quando fetch falha

### CMS — Upload de imagem com crop (Mai 2026)
- `ImageCropper.tsx`: modal com canvas interativo, drag, zoom (0.5×–3×), qualidade JPEG (60–100%), aspect ratios (Livre · 1:1 · 4:3 · 3:4 · 16:9)
- `ImageUploader.tsx`: limite ampliado para 10MB, compressão via `canvas.toBlob()`, saída máxima 1200px; mantém drag-drop, modo URL e alt text

### CMS — Case STAR (Mai 2026)
- Campos `case_title`, `case_challenge`, `case_solution` na tabela `experiences`
- `ExperiencesManager`: formulário STAR com Título do case, Desafio, Solução e Resultado
- `case_title` sobrescreve o cargo como título da história em "Cases selecionados"
- `CasesSection`: exibe blocos Desafio/Solução quando preenchidos; fallback para `case_body`
- `ExperienceDetail`: redesenhado para design editorial (`ed-mast`, `pp-hero`, `pp-body`); cards STAR quando campos preenchidos

### CMS — DashboardStats (Mai 2026)
- Badges de mensagens não lidas e artigos em rascunho no painel
- `DashboardStats`: alertas de saúde com slug, SEO e imagem faltando por categoria
- Export JSON inclui `lab_projects`
- `PreviewModal`: preview de cases STAR com blocos Desafio/Solução

### Site público — Lab (Mai 2026)
- Tabela `lab_projects` com RLS + seed com 4 projetos
- `LabSection.tsx`: grid de cards na homepage entre Credenciais e Contato
- `LabDetail.tsx`: página `/lab/:slug` com hero, contexto, ações numeradas, stack, outcomes, prev/next
- `LabManager.tsx`: manager completo no admin
- `BreadcrumbSchema` + JSON-LD `CreativeWork` em LabDetail

### Site público — Credenciais (Mai 2026)
- Colunas "Certificações" e "Cursos" unificadas em uma só coluna

### Site público — SEO e Schema.org (Mai 2026)
- `BreadcrumbSchema` em todas as páginas: ExperienceDetail, ProjectDetail, LabDetail, Sobre, Contato
- Article/CreativeWork JSON-LD em ExperienceDetail, ProjectDetail e LabDetail
- `FAQPage` schema dinâmico em `DynamicSchema.tsx` via `useFAQs()`
- OG image dinâmica em todas as páginas de detalhe
- `MastheadSection`: "Lab" adicionado ao nav padrão

### Site público — Conteúdo relacionado (Mai 2026)
- `useRelatedContent.tsx` com hooks: `useSkillsForExperience`, `useExperiencesForProject`, `useSkillsForProject`
- `SeeAlso` em ExperienceDetail
- Experiências + habilidades relacionadas em ProjectDetail (antes do CTA)

### Site público — UX (Mai 2026)
- Barra de progresso de leitura (`useScrollProgress`) em páginas de detalhe
- Sumário automático (TOC) em `ArticleDetail`
- `BackToTop` em ArticleDetail e ExperienceDetail
- "Copiar email" clipboard em `/contato`
- Busca de artigos por título/excerpt/tag em `/artigos`
- LinkedIn no navbar (`StandaloneNavbar`)
- Favicon dinâmico via CMS (`FaviconInjector`)
- Prefetch de rotas ao hover nos cards
- `RichTextEditor` (Tiptap) em chunk separado (lazy load, só no admin)

### Layout editorial — migração de páginas (Mai 2026)
- `Sobre.tsx`, `Contato.tsx`, `ArticlesListing.tsx`, `ArticleDetail.tsx`, `SkillDetail.tsx` migrados do layout antigo (shadcn Cards + bg-gradient-hero) para o design system editorial (`ed-root`, `pp-hero`, `pp-body`, `pp-grid`)
- Correção de rota `/admin` → redirect para `/admin/dashboard`

### Documentação (Mai 2026)
- `CLAUDE.md`, `README.md`, `CONTRIBUTING.md`, `ARCHITECTURE.md`, `docs/AI_MAINTENANCE_GUIDE.md`

### Excerpt e performance (Mai 2026)
- Campo `excerpt` em `experiences`: migration, types, interface, ExperiencesManager (textarea + char counter), ExperienceDetail (SEO description + pp-hero preview)
- `loading="lazy"` no logo de empresa em `ExperienceDetail`
- `fetchPriority` prop em `OptimizedImage`

---

*Última atualização: 2026-05-28*
