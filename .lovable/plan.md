
# Home 100% editável pelo CMS + limpeza do admin

## Objetivo

Permitir editar todos os textos da home editorial (`src/pages/Index.tsx`) pelo painel `/admin` e remover editores antigos do `SiteSettingsManager` que não impactam mais a home.

## Parte A — Tornar todos os textos editáveis

Adicionar leitura de `site_settings` (via `useSiteSettings`) e fallbacks em cada seção, e expor as chaves no `SiteSettingsManager` agrupadas por seção.

### Novas chaves em `site_settings`

**Masthead**
- `masthead_brand` (default: "Nei Girão")
- `masthead_edition` (default: "Edição 2026 · Vol. XV")
- `masthead_nav` (JSON: `[{label, href}]` — Cases/Experiência/Projetos/Contato)
- `masthead_cta_label` (default: "Baixar CV")

**Cover**
- `cover_issue_left` (default: "Perfil № 01")
- `cover_issue_center` (default: "— Um Product Leader, em quinze anos —")
- `cover_name` (default: "Nei Girão")
- `cover_stat_years_label` (default: "anos")
- `cover_stat_companies_label` (default: "companhias")
- `cover_email_prefix` (default: "Para conversar, escreva para")
- `cover_btn_primary` (default: "Falar comigo")
- `cover_btn_secondary` (default: "Baixar CV (.pdf)")
- `cover_btn_linkedin` (default: "LinkedIn ↗")

**Essay — sidebars**
- `essay_team_direct_label` (default: "diretos")
- `essay_team_squads_label` (default: "em squads")
- `essay_sectors` (JSON array de strings — Seguros, Telecom, Mídia…)
- `essay_domains` (JSON array — Ecommerce, Produto Digital, Dados, Observabilidade)
- `essay_location_lines` (JSON array — "Rio de Janeiro", "Brasil")
- `essay_languages` (JSON array — "PT · Nativo", "EN · Fluente")
- `essay_label_current` / `essay_label_team` / `essay_label_sectors` / `essay_label_domains` / `essay_label_location` / `essay_label_languages` (labels das colunas)

**Cases (Nº 01)**
- `cases_section_num` (default: "№ 01 — Cases selecionados")
- `cases_title_html` (default: "Histórias <em>com</em> resultado.")
- `cases_lead`

**Work (Nº 02)**
- `work_section_num`, `work_title_html`, `work_lead`

**Projects (Nº 03)**
- `projects_section_num`, `projects_title_html`, `projects_lead`

**Stack (Nº 04)**
- `stack_section_num`, `stack_title_html`, `stack_lead`
- `stack_category_labels` (JSON: `{product: "Produto", data: "Dados", ...}`)

**Credentials (Nº 05)**
- `cred_section_num`, `cred_title_html`, `cred_lead`
- `cred_label_education` / `cred_label_certs` / `cred_label_courses`
- `cred_courses` (JSON: `[{title, meta}]`) — substitui lista chumbada

**Contact (Nº 06)**
- `contact_section_num` (default: "№ 06 — Contato")
- `contact_title_html` (default: "Vamos <em>conversar</em>.")
- `contact_label_email` / `contact_label_linkedin` / `contact_label_whatsapp` / `contact_label_cv`
- `contact_linkedin_display` (default: "linkedin.com/in/neigirao")
- `contact_cv_value` (default: "Nei Girão · CV · 2026")

**Footer editorial**
- `footer_ed_left` (default: "© Nei Girão · 2026")
- `footer_ed_right` (default: "Direction C · Editorial")

### Sanitização

Onde o valor permite HTML (sufixo `_html`), renderizar com `SafeHTML` (DOMPurify) — segue regra do projeto. Demais campos como texto puro.

### Mudanças no `SiteSettingsManager.tsx`

Criar **um novo bloco "Home Editorial"** organizado em Cards, um por seção (Masthead, Cover, Essay, Cases, Work, Projects, Stack, Credentials, Contact, Footer). Inputs simples para texto, `Textarea` para leads, editor JSON (com botão + / ✕) para arrays (igual `hero_stats` já faz) — `essay_sectors`, `essay_domains`, `essay_languages`, `cred_courses`, `masthead_nav`, `stack_category_labels`.

## Parte B — Limpar editores obsoletos

A home editorial atual **não usa** mais: `HeroSection`, `AboutSection`, `ImpactMetrics`, `FAQSection`, `SkillsSection` legada, etc. Os seguintes blocos do `SiteSettingsManager` viram lixo visual e serão **removidos**:

- "Foto do Hero" → **manter** (ainda usada se Hero antigo voltar; mas hoje não aparece na home → remover para reduzir confusão; manter se outra rota usa)
- "Textos do Impacto Mensurável" → remover
- "Textos da Seção Sobre" → **manter** (página `/sobre` usa)
- "Hero Stats" → remover
- "Methodology Cards" → **manter** (página `/sobre` pode usar — verificar)
- "Hero Tags" → remover
- "Hero Textos" (subtitle/description) → remover
- "Subtítulos das Seções" (Experiência/Projetos/Skills/Education/Contato/FAQ) → remover

Antes de remover, faço grep para confirmar zero uso em rotas ativas (`/`, `/sobre`, `/contato`, `/artigos`). Se alguma chave ainda for usada em outra rota, mantenho.

## Detalhes técnicos

- Nada de migração de schema: tudo cabe em `site_settings` (KV existente).
- Não apago linhas antigas do banco (ficam órfãs inofensivas) — só removo os editores da UI.
- Helpers: criar `src/lib/siteSettingsHelpers.ts` com `parseJsonSetting(value, fallback)` para evitar try/catch repetidos.
- Acessibilidade: manter `<h2>`, `<h3>` semânticos; HTML só onde precisa (títulos com `<em>`).

## Arquivos afetados

- `src/components/sections/MastheadSection.tsx`
- `src/components/sections/CoverSection.tsx`
- `src/components/sections/EssaySection.tsx`
- `src/components/sections/CasesSection.tsx`
- `src/components/sections/WorkSection.tsx`
- `src/components/sections/ProjectsEditorialSection.tsx`
- `src/components/sections/StackSection.tsx`
- `src/components/sections/CredentialsSection.tsx`
- `src/components/sections/ContactEditorialSection.tsx`
- `src/components/sections/FooterEditorialSection.tsx`
- `src/components/admin/SiteSettingsManager.tsx` (grande refactor)
- `src/lib/siteSettingsHelpers.ts` (novo)

## Fora do escopo

- Não mexer em conteúdo gerenciado por tabelas próprias (experiences, projects, skills, education, certifications, articles).
- Não alterar visual/CSS — só substituir strings literais por leitura do CMS.
- Não criar migration nem alterar `site_settings` schema.

## Validação

1. Build sem erros TS.
2. Home renderiza idêntica ao atual (fallbacks = textos atuais).
3. Admin `/admin` → aba Configurações → editar uma chave de cada seção → salvar → home reflete.
