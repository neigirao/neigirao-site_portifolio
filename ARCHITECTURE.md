# Arquitetura do Projeto

Portfolio profissional de Nei Girão. SPA React com CMS admin completo alimentado por Supabase.

---

## Visão geral

```
┌─────────────────────────────────────────────────────┐
│                 Usuário / Admin                      │
└──────────────┬───────────────────┬──────────────────┘
               │                   │
     ┌─────────▼──────┐   ┌────────▼────────┐
     │  Site Público  │   │  Admin /admin   │
     │  (read-only)   │   │  (CRUD + auth)  │
     └─────────┬──────┘   └────────┬────────┘
               │                   │
     ┌─────────▼───────────────────▼──────────┐
     │            React 18 + Vite SPA         │
     │   React Router v6 · shadcn-ui          │
     │   @tanstack/react-query · Sonner       │
     └──────────────────┬─────────────────────┘
                        │
     ┌──────────────────▼─────────────────────┐
     │              Supabase                  │
     │  PostgreSQL · Auth · Storage · RLS     │
     └────────────────────────────────────────┘
```

Hospedagem e deploy: **Lovable** (lovable.dev). Migrations SQL aplicadas automaticamente no merge de PR.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Estilo | Tailwind CSS + shadcn-ui (tokens semânticos) |
| Banco | Supabase — PostgreSQL + RLS |
| Auth | Supabase Auth (email/password) |
| Storage | Supabase Storage (bucket `portfolio-images`) |
| Fetching | @tanstack/react-query |
| Routing | React Router v6 |
| Notificações | Sonner (toasts) |
| Rich text | Tiptap (RichTextEditor) |
| Drag-and-drop | dnd-kit (SortableList) |
| Deploy | Lovable |

---

## Estrutura de pastas

```
src/
├── pages/                    # Páginas roteadas
│   ├── Index.tsx             # Homepage — compõe todas as seções
│   ├── AdminDashboard.tsx    # Painel admin /admin
│   ├── AdminLogin.tsx        # Login /admin/login
│   ├── ExperienceDetail.tsx  # /experiencia/:slug
│   ├── ProjectDetail.tsx     # /projeto/:slug
│   ├── SkillDetail.tsx       # /skill/:slug
│   ├── ArticleDetail.tsx     # /artigo/:slug
│   ├── ArticlesListing.tsx   # /artigos
│   ├── Sobre.tsx             # /sobre
│   └── Contato.tsx           # /contato
│
├── components/
│   ├── admin/                # Managers do CMS (padrão uniforme)
│   │   ├── ExperiencesManager.tsx
│   │   ├── ProjectsManager.tsx
│   │   ├── ArticlesManager.tsx
│   │   ├── SkillsManager.tsx
│   │   ├── EducationManager.tsx
│   │   ├── CompaniesManager.tsx
│   │   ├── CertificationsManager.tsx
│   │   ├── TestimonialsManager.tsx
│   │   ├── MetricsManager.tsx
│   │   ├── FAQsManager.tsx
│   │   ├── SiteSettingsManager.tsx
│   │   ├── ContactMessagesManager.tsx
│   │   ├── DashboardStats.tsx
│   │   └── utilitários:
│   │       ImageUploader, RichTextEditor, SEOFields,
│   │       SortableList, DeleteConfirmButton,
│   │       AutosaveIndicator, BulkSlugGenerator,
│   │       PreviewModal, CompletenessIndicator
│   │
│   ├── sections/             # Seções do site público
│   │   ├── HeroSection, AboutSection, WorkSection
│   │   ├── ProjectsSection, ProjectsEditorialSection
│   │   ├── SkillsSection, StackSection
│   │   ├── EducationSection, CertificationsSection
│   │   ├── TestimonialsSection, FAQSection
│   │   ├── ContactSection, ContactEditorialSection
│   │   └── editorial:
│   │       CoverSection, MastheadSection, EssaySection,
│   │       PullQuoteSection, CasesSection, CredentialsSection
│   │
│   └── ui/                   # Componentes shadcn — não editar diretamente
│
├── hooks/
│   ├── usePortfolioData.tsx  # Leitura pública (experiences, skills, etc.)
│   ├── useAdminData.tsx      # Leitura admin + refetch coordenado
│   ├── useSiteSettings.tsx   # Configurações globais (site_settings)
│   ├── usePortfolioDetail.tsx# Detalhe de item único por slug
│   ├── useRelatedContent.tsx # Conteúdo relacionado em detalhe
│   ├── useArticles.tsx       # Artigos públicos
│   ├── useAuth.tsx           # Autenticação Supabase
│   ├── useAutosave.tsx       # Rascunho automático (localStorage, 5s debounce)
│   └── useUnsavedChanges.tsx # Guard de navegação (beforeunload)
│
├── integrations/supabase/
│   ├── client.ts             # Instância única do cliente Supabase
│   └── types.ts              # Gerado automaticamente — nunca editar
│
└── config/
    └── constants.ts          # BASE_URL e constantes globais

supabase/
└── migrations/               # SQL aplicado pelo Lovable no merge
```

---

## Banco de dados

### Tabelas de conteúdo

| Tabela | Descrição | Campos-chave |
|--------|-----------|-------------|
| `experiences` | Experiências profissionais | `role`, `company`, `slug`, `is_visible`, `is_case` |
| `projects` | Projetos e cases | `title`, `slug`, `tags[]`, `is_visible`, `brand` |
| `articles` | Artigos/blog | `title`, `slug`, `status`, `published_at` |
| `skills` | Habilidades técnicas | `name`, `slug`, `category`, `is_visible` |
| `education` | Formação acadêmica | `institution`, `degree`, `slug`, `is_visible` |
| `companies` | Empresas (logos) | `name`, `abbr`, `logo_url`, `is_visible` |
| `certifications` | Certificações | `name`, `issuer`, `logo_url` |
| `testimonials` | Depoimentos | `author_name`, `quote`, `is_visible` |
| `impact_metrics` | Métricas de impacto | `value`, `label`, `icon`, `color` |
| `faqs` | Perguntas frequentes | `question`, `answer`, `is_visible` |

### Tabelas de sistema

| Tabela | Descrição |
|--------|-----------|
| `site_settings` | Textos e configs globais (`key TEXT`, `value TEXT`) |
| `contact_messages` | Mensagens do formulário de contato |

### Chaves de `site_settings` (exemplos)

`hero_tagline`, `about_bio`, `masthead_title`, `essay_body`, `contact_pitch`, `footer_text`

Editar via `/admin → Configurações` ou via SQL/migration.

---

## Fluxo de dados

### Site público (leitura)

```
Supabase (PostgreSQL)
  └─ useQuery (React Query)
      └─ hook (usePortfolioData, useArticles, useSiteSettings)
          └─ componente de seção
              └─ renderização
```

### Admin (escrita)

```
Manager (formulário)
  └─ supabase.from('tabela').insert/update/delete
      └─ toast de feedback (Sonner)
          └─ fetchItems() — refaz leitura local
```

---

## Padrão dos managers (CMS)

Todos os managers seguem o mesmo padrão:

```tsx
export function XManager({ onDirtyChange }: { onDirtyChange?: (d: boolean) => void }) {
  const [items, setItems] = useState<Item[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const { status: autosaveStatus, clearDraft } = useAutosave({ key: 'x-form', data: formData, onRecover });

  // fetchItems → handleSubmit → handleEdit → handleDelete → handleReorder → resetForm
}
```

**Padrões obrigatórios nos managers:**
- `useAutosave` com rascunho em localStorage
- `useUnsavedChanges` guard via `onDirtyChange`
- `DeleteConfirmButton` (AlertDialog de confirmação)
- Undo de deleção via Sonner com botão "Desfazer"
- Rollback de reordenação se `Promise.all` falhar
- Mensagens de erro com `error.message` do Supabase
- `fetchError` + botão "Tentar novamente" quando lista falha
- Ring visual (`ring-2 ring-primary`) no card sendo editado

---

## Rotas

| Rota | Componente | Auth |
|------|-----------|------|
| `/` | Index | — |
| `/sobre` | Sobre | — |
| `/contato` | Contato | — |
| `/artigos` | ArticlesListing | — |
| `/artigo/:slug` | ArticleDetail | — |
| `/experiencia/:slug` | ExperienceDetail | — |
| `/projeto/:slug` | ProjectDetail | — |
| `/skill/:slug` | SkillDetail | — |
| `/admin/login` | AdminLogin | — |
| `/admin` | AdminDashboard | ✅ Supabase Auth |
| `/sitemap.xml` | SitemapRedirect | — |
| `/llms.txt` | LlmsTxtRedirect | — |

---

## Design system

**Regra inviolável: nunca hardcode cores.**

```tsx
// ✅ Correto
<div className="bg-primary text-primary-foreground">
<p className="text-muted-foreground">

// ❌ Errado
<div className="bg-blue-500 text-white">
<div className="bg-[#012A4A]">
<p style={{ color: '#fff' }}>
```

Tokens disponíveis: `primary`, `secondary`, `accent`, `muted`, `card`, `background`, `foreground`, `border`, `destructive`, `teal-accent`.

---

## Segurança

- **RLS ativo** em todas as tabelas — leitura pública (`anon`), escrita apenas autenticado
- **Storage**: bucket `portfolio-images` — leitura pública, upload restrito a admin
- **Auth**: Supabase Auth com sessão JWT. Rota `/admin` protegida por hook `useAuth`
- **Sem secrets no frontend**: variáveis Supabase são `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (seguras para client-side)

---

## Deploy e migrations

1. Toda mudança de schema vai em `supabase/migrations/YYYYMMDDHHMMSS_descricao.sql`
2. Commit + push → PR no GitHub
3. Lovable faz merge → aplica migrations automaticamente → redeploy

```sql
-- Exemplo de migration
ALTER TABLE public.tabela
  ADD COLUMN IF NOT EXISTS novo_campo TEXT;
```

---

*Última atualização: 2026-05-20*
