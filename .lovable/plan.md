# Plano de revisão e melhorias — Site + CMS

Resultado de uma varredura na home editorial, páginas de detalhe, hooks de dados, autenticação e nos managers do admin. Abaixo, agrupei oportunidades por tema e priorizei em fases. Nada é aplicado ainda — é só para você aprovar/ajustar.

---

## 1. Site público

### 1.1 Performance e Core Web Vitals
- **Imagens**: padronizar uso do `OptimizedImage` (já existe) em todas as seções (`CasesSection`, `ProjectsEditorialSection`, `WorkSection`, `CredentialsSection`) com `width`/`height` explícitos e `loading="lazy"` exceto LCP.
- **LCP**: garantir que a imagem/título do `CoverSection` use `fetchpriority="high"` e preload da fonte display.
- **Prefetch de rotas**: pré-carregar `ProjectDetail` e `ExperienceDetail` ao passar o mouse nos cards (React Router `prefetch` via dynamic import).
- **Bundle**: auditar `framer-motion`, `tiptap` e ícones lucide para tree-shaking; mover `RichTextEditor` para chunk separado (só admin).

### 1.2 SEO e descoberta
- **Sitemap dinâmico**: confirmar que a edge function `generate-sitemap` inclui `projects`, `experiences (is_case)`, `articles published` e `skills` com `lastmod` correto.
- **Schema.org**: adicionar `BreadcrumbList` em `ProjectDetail`/`ExperienceDetail` (componente já existe — só plugar) e `Article` schema em `ArticleDetail`.
- **OG image dinâmica**: gerar OG por projeto/case usando `cover_image_url` ou fallback.
- **H1/H2**: revisar `EssaySection` e `MastheadSection` para garantir um H1 único na home.
- **Canonical**: validar canonical em `/projects/:slug`, `/experiences/:slug` e `/articles/:slug`.

### 1.3 UX e acessibilidade
- **Foco visível**: adicionar `:focus-visible` ring consistente em links da home editorial (hoje alguns somem).
- **Navegação por teclado** no `WorkSection` (lista de experiências expandíveis).
- **Reduced motion**: respeitar `prefers-reduced-motion` em transições do `EssaySection` e `PullQuoteSection`.
- **Mobile (viewport 393px)**: revisar densidade tipográfica no `CoverSection` e wrap de tags em `ProjectsEditorialSection`.
- **Empty states** para quando uma seção fica vazia (hoje sumimos a seção — ok — mas no admin precisa um aviso).

### 1.4 Conteúdo e conversão
- **CTA Contato**: o `ContactEditorialSection` poderia ter atalho direto para WhatsApp/Email com tracking GA.
- **"See also" / Related**: o `useRelatedContent` está pronto — usar em `ArticleDetail` e `ExperienceDetail` (hoje só `ProjectDetail` usa de forma completa).
- **Breadcrumbs visíveis** em páginas internas.
- **Página 404**: enriquecer `NotFound` com links para projetos em destaque.

---

## 2. CMS / Admin

### 2.1 Produtividade
- **Busca + filtros** em listas longas (`ProjectsManager`, `ExperiencesManager`, `ArticlesManager`): filtro por visibilidade, brand/empresa, status.
- **Bulk actions**: selecionar múltiplos itens para ocultar/mostrar/excluir.
- **Duplicar com 1 clique** já existe em FAQs — replicar em Projects/Experiences/Articles.
- **Preview lado a lado** (já há `PreviewModal`): expandir para Projects e Articles antes de salvar.
- **Atalhos de teclado** (⌘S salvar, Esc cancelar) nos formulários.

### 2.2 Qualidade de conteúdo
- **Indicador de completude** (`CompletenessIndicator` existe) — exibir em cada item da lista (meta title, meta description, slug, imagem, alt text).
- **Validação de SEO inline**: tamanho de `meta_title` (≤60), `meta_description` (≤160), aviso de duplicidade de slug.
- **Alt text obrigatório** no `ImageUploader`.
- **Rich text**: adicionar suporte a blocos de código e callouts no `RichTextEditor`; sanitização já está OK.

### 2.3 Site Settings
- **Agrupar por seção** (Cover, Essay, Contact, Footer, SEO global) no `SiteSettingsManager` — hoje é uma lista longa.
- **Preview ao vivo** ao editar um campo (renderizar a seção correspondente).
- **Reset para default** por campo.

### 2.4 Mensagens de contato
- **Marcar como lida / arquivar / responder** em `ContactMessagesManager` (hoje só lista + delete + CSV).
- **Notificação por email** (edge function) quando chega nova mensagem.
- **Anti-spam**: honeypot + rate limit por IP já existe; adicionar Turnstile/hCaptcha opcional.

### 2.5 Dashboard
- **DashboardStats**: incluir mensagens não lidas, projetos ocultos, artigos em rascunho, itens sem SEO/slug.
- **Atividade recente** (últimas edições).
- **Health checks**: links quebrados em projetos, imagens sem alt, slugs duplicados.

### 2.6 Operação
- **Histórico/versionamento** simples (snapshot do registro antes de update) para reverter edições.
- **Logs de auditoria** (quem editou o quê, quando) — tabela `audit_log` com `user_id`, `entity`, `action`, `diff`.
- **Backup export**: botão "Exportar tudo" gerando JSON do conteúdo público.

---

## 3. Backend / Segurança

- **Rodar `security--run_security_scan`** para checar RLS e funções com `SECURITY DEFINER`.
- **Profiles**: revisar policy "Users can view all profiles" — restringir a admins.
- **Storage**: confirmar que bucket `portfolio-images` tem políticas de upload restritas a admin (hoje é público para leitura — ok).
- **Edge functions**: adicionar logs estruturados e timeouts em `generate-*`.
- **Rate limit global** em `contact_messages` (já existe por IP — validar janela).

---

## 4. DX e manutenção

- **Storybook leve** ou playground para os managers (opcional).
- **Testes**: smoke tests do CMS (criar, editar, deletar) com Vitest + Testing Library nos managers principais.
- **Tipos**: substituir os `from('faqs' as any)` por tipos gerados — regenerar `types.ts` (Supabase faz automaticamente).
- **Lint/CI**: adicionar regra para proibir cores hardcoded fora dos tokens.

---

## 5. Roadmap sugerido (3 fases)

```text
Fase 1 — Quick wins (1 sessão)
  • Busca + filtros nos managers grandes
  • CompletenessIndicator nas listas + validação SEO inline
  • Alt text obrigatório no ImageUploader
  • Agrupar SiteSettings por seção
  • Marcar mensagem como lida + notificação por email

Fase 2 — UX/SEO do site (1–2 sessões)
  • Breadcrumb schema + Article schema
  • OG image dinâmica por projeto
  • Related content em Article/Experience detail
  • Focus-visible + reduced-motion
  • Prefetch de rotas internas

Fase 3 — Robustez (1–2 sessões)
  • Audit log + histórico simples
  • Dashboard de health checks
  • Bulk actions e duplicação universal
  • Security scan + ajustes de RLS
  • Testes dos managers principais
```

---

## Próximo passo

Me diga:
1. Quer seguir nessa ordem (Fase 1 → 2 → 3) ou priorizar algo específico?
2. Há algum item que devo remover ou que é prioridade absoluta?
3. Posso já começar pela **Fase 1** depois da sua aprovação?
