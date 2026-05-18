# CLAUDE.md — Guia para Claude Code e outras IAs

Leia este arquivo antes de qualquer ação no projeto.

## O que é este projeto

Portfolio profissional de **Nei Girão** (PM/estratégia digital). É uma SPA React com um CMS admin completo. Todo o conteúdo vem de um banco **Supabase** (PostgreSQL), não de arquivos estáticos.

Plataforma de hospedagem: **Lovable** (lovable.dev). Migrations Supabase são aplicadas automaticamente quando um PR é mergeado pelo Lovable.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Estilo | Tailwind CSS + shadcn-ui |
| Banco | Supabase (PostgreSQL + RLS) |
| Fetching | @tanstack/react-query |
| Routing | React Router v6 |
| Deploy | Lovable |

---

## Estrutura que importa

```
src/
├── pages/                    # 14 páginas
│   ├── Index.tsx             # Homepage — compõe as seções
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
│   ├── admin/                # 23 managers do CMS
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
│   │   ├── SiteSettingsManager.tsx  # Textos/configurações globais
│   │   ├── ContactMessagesManager.tsx
│   │   ├── DashboardStats.tsx
│   │   └── [utilitários]: ImageUploader, RichTextEditor, SEOFields,
│   │                        SortableList, DeleteConfirmButton,
│   │                        AutosaveIndicator, BulkSlugGenerator
│   │
│   └── sections/             # Seções do site público
│       ├── HeroSection, AboutSection, WorkSection
│       ├── ProjectsSection, ProjectsEditorialSection
│       ├── SkillsSection, StackSection
│       ├── EducationSection, CertificationsSection
│       ├── TestimonialsSection, FAQSection
│       ├── ContactSection, ContactEditorialSection
│       └── [editorial]: CoverSection, MastheadSection, EssaySection,
│                         PullQuoteSection, CasesSection, CredentialsSection
│
├── hooks/
│   ├── usePortfolioData.tsx   # Leitura pública (experiences, skills, etc.)
│   ├── useAdminData.tsx       # Leitura admin + refetch coordenado
│   ├── useSiteSettings.tsx    # Configurações globais (site_settings)
│   ├── usePortfolioDetail.tsx # Detalhe de item único por slug
│   ├── useRelatedContent.tsx  # Conteúdo relacionado em páginas de detalhe
│   ├── useArticles.tsx        # Artigos públicos
│   ├── useAuth.tsx            # Autenticação Supabase
│   ├── useAutosave.tsx        # Autosave com localStorage
│   └── useUnsavedChanges.tsx  # Aviso ao navegar com mudanças pendentes
│
├── integrations/supabase/
│   ├── client.ts             # Instância única do cliente Supabase
│   └── types.ts              # Tipos gerados do schema (não editar manualmente)
│
└── config/
    └── constants.ts          # BASE_URL e constantes globais

supabase/
└── migrations/               # Aplicadas automaticamente pelo Lovable no merge
```

---

## Banco de dados — tabelas

| Tabela | Conteúdo | Campos-chave |
|--------|----------|-------------|
| `experiences` | Experiências profissionais | role, company, slug, is_visible |
| `projects` | Projetos/cases | title, slug, tags, is_visible |
| `articles` | Artigos/blog | title, slug, status, published_at |
| `skills` | Habilidades técnicas | name, slug, category |
| `education` | Formação acadêmica | institution, degree, slug |
| `companies` | Empresas (logos) | name, abbr, logo_url, is_visible |
| `certifications` | Certificações | name, issuer, logo_url |
| `testimonials` | Depoimentos | author_name, content, is_visible |
| `metrics` | Métricas de impacto | value, label |
| `faqs` | Perguntas frequentes | question, answer, is_visible |
| `site_settings` | Configurações/textos globais | key (TEXT), value (TEXT) |
| `contact_messages` | Mensagens recebidas | name, email, message, read_at |

### site_settings — chaves importantes

Textos e configurações do site ficam como linhas `key/value` nesta tabela. Para mudar um texto do site, atualize o `value` da chave correspondente — via admin `/admin` → aba Configurações, ou via SQL.

Exemplos de chaves: `contact_pitch`, `about_bio`, `hero_tagline`, `masthead_title`, `footer_text`.

---

## Padrão de hooks de dados

### Leitura pública (site)
```tsx
// hooks/usePortfolioData.tsx
const { data: experiences } = useExperiences();   // tabela experiences
const { data: skills } = useSkills();             // tabela skills
// etc.
```

### Leitura admin
```tsx
// hooks/useAdminData.tsx
const {
  experiences, skills, education, projects, articles,
  testimonials, certifications, companies, metrics, faqs,
  isLoading, refetchAll,
} = useAdminDashboardData();
```

### Settings globais
```tsx
const settings = useSiteSettings(); // retorna objeto com todas as chaves
settings.contact_pitch  // valor da chave 'contact_pitch'
```

---

## Padrão dos managers (CMS)

Todos os managers seguem o mesmo padrão:

```tsx
export function XManager({ onDirtyChange }: { onDirtyChange?: (d: boolean) => void }) {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const { status: autosaveStatus, clearDraft } = useAutosave({ key: 'x-form', data: formData, onRecover });

  // fetch → handleSubmit → handleEdit → handleDelete → handleReorder
  // onDirtyChange(true) quando form tem conteúdo
  // useAutosave salva rascunho no localStorage automaticamente
}
```

Utilitários disponíveis para managers:
- `<ImageUploader>` — upload para Supabase Storage
- `<SEOFields>` — campos meta_title, meta_description, slug
- `<RichTextEditor>` — editor de texto rico
- `<SortableList>` — lista drag-and-drop (dnd-kit)
- `<DeleteConfirmButton>` — confirmação via AlertDialog
- `<AutosaveIndicator>` — feedback visual de autosave
- `<PreviewModal>` — prévia do conteúdo

---

## Migrations Supabase

Para alterar o schema ou dados iniciais:

1. Crie um arquivo em `supabase/migrations/` com o nome `YYYYMMDDHHMMSS_descricao.sql`
2. Escreva o SQL
3. Commite e suba para o PR
4. A migration é aplicada automaticamente quando o Lovable faz o merge

**Não** execute migrations manualmente em produção — o Lovable gerencia isso.

---

## Rotas

| Rota | Componente | Protegida |
|------|-----------|-----------|
| `/` | Index | Não |
| `/sobre` | Sobre | Não |
| `/contato` | Contato | Não |
| `/artigos` | ArticlesListing | Não |
| `/artigo/:slug` | ArticleDetail | Não |
| `/experiencia/:slug` | ExperienceDetail | Não |
| `/projeto/:slug` | ProjectDetail | Não |
| `/skill/:slug` | SkillDetail | Não |
| `/admin/login` | AdminLogin | Não |
| `/admin` | AdminDashboard | Sim (Supabase Auth) |
| `/sitemap.xml` | SitemapRedirect | Não |
| `/llms.txt` | LlmsTxtRedirect | Não |
| `/about.txt` | AboutTxtRedirect | Não |

---

## Regras importantes

### Nunca faça
- Hardcode de cores: `text-white`, `bg-blue-500`, `bg-[#012A4A]`
- Estilos inline: `style={{ color: '#fff' }}`
- Editar `src/components/ui/*` diretamente (componentes shadcn)
- Editar `src/integrations/supabase/types.ts` manualmente (gerado automaticamente)
- Commitar sem testar TypeScript (`npm run build`)

### Sempre faça
- Use tokens semânticos: `text-foreground`, `bg-primary`, `text-muted-foreground`
- Use componentes shadcn pelo import: `@/components/ui/button`
- Crie migrations para qualquer mudança de schema
- Exporte named exports nos managers: `export function XManager`
- Passe `onDirtyChange` nos managers novos e registre no `AdminDashboard`

---

## Como fazer tarefas comuns

### Adicionar novo tipo de conteúdo

1. Criar migration com a nova tabela
2. Criar hook em `src/hooks/useAdminData.tsx`
3. Criar manager em `src/components/admin/XManager.tsx`
4. Registrar no `AdminDashboard` (import + TabsContent + tabGroups)
5. Se público: criar seção em `src/components/sections/` e hook em `usePortfolioData`

### Mudar texto do site

- Via admin: `/admin` → aba Configurações → seção correspondente
- Via SQL: `UPDATE site_settings SET value = '...' WHERE key = 'chave';`
- Via migration: criar arquivo `.sql` na pasta `supabase/migrations/`

### Adicionar campo a uma tabela existente

```sql
-- supabase/migrations/YYYYMMDDHHMMSS_descricao.sql
ALTER TABLE public.tabela
  ADD COLUMN IF NOT EXISTS novo_campo TEXT;
```

Depois atualizar a interface TypeScript no manager correspondente.

### Depurar dados que não aparecem

1. Checar se `is_visible = true` no banco
2. Checar se o hook de leitura pública faz `eq('is_visible', true)`
3. Checar RLS: tabelas públicas precisam de policy `SELECT` para `anon`
4. Checar query no Supabase dashboard

---

## Git e PRs

- Branch de desenvolvimento: criada por sessão (`claude/nome-da-feature`)
- PRs são mergeados pelo usuário no Lovable
- Após merge, o Lovable aplica as migrations e faz redeploy automaticamente
- O hook de stop (`~/.claude/stop-hook-git-check.sh`) verifica commits não enviados — sempre fazer push e criar PR antes de encerrar

---

## Ambiente remoto (Claude Code na web)

Esta sessão roda em container isolado. A rede bloqueia conexões externas (Supabase, GitHub via git). Para operações que precisam de rede:

- **Supabase direto**: use o MCP do Supabase (se o projeto estiver na lista de acesso)
- **GitHub push**: use a GitHub REST API via `python3` com o PAT do usuário
- **Migrations urgentes**: crie o arquivo `.sql` e suba via PR — aplicado no merge

---

*Última atualização: 2026-05-18*
