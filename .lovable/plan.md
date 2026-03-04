

# Plano: CMS Pendentes - FAQ, Hero, Subtítulos, Footer

## 1. FAQ Editável via Tabela `faqs`

**Database:** Criar tabela `faqs` com colunas:
- `id` (uuid, PK), `question` (text, NOT NULL), `answer` (text, NOT NULL), `order_index` (int, default 0), `is_visible` (bool, default true), `created_at`, `updated_at`

**RLS:** Public SELECT onde `is_visible = true` + admin ALL via `has_role()`

**Frontend:**
- Criar `src/components/admin/FAQsManager.tsx` - CRUD com reordenação, toggle visibilidade (padrão igual ao TestimonialsManager)
- Atualizar `FAQSection.tsx` - Fetch do banco via hook, remover dados hardcoded, fallback para dados estáticos se tabela vazia
- Criar hook `useFAQs()` em `usePortfolioData.tsx`
- Adicionar tab "FAQ" no `AdminDashboard.tsx`

## 2. Hero Tags, Subtitle e Description via `site_settings`

**Chaves novas em `site_settings`:**
- `hero_tags` - JSON array: `[{"label":"Product Management","icon":"🎯"}, ...]`
- `hero_subtitle` - texto HTML (ex: "Liderança estratégica em produtos digitais...")
- `hero_description` - texto plano

**Frontend:**
- `HeroSection.tsx` - Ler `hero_tags`, `hero_subtitle`, `hero_description` do `useSiteSettings()` com fallback para valores atuais
- `SiteSettingsManager.tsx` - Adicionar card "Hero Textos" com:
  - Editor de tags (JSON dinâmico: icon + label, adicionar/remover)
  - Input para subtitle
  - Textarea para description

## 3. Subtítulos de Seções Editáveis

**Chaves em `site_settings`:** `section_subtitle_experience`, `section_subtitle_projects`, `section_subtitle_skills`, `section_subtitle_education`, `section_subtitle_contact`, `section_subtitle_faq`

**Frontend:**
- Cada seção (`ExperienceSection`, `ProjectsSection`, `SkillsSection`, `EducationSection`, `ContactSection`, `FAQSection`) recebe o subtitle via props ou lê do `useSiteSettings()` com fallback para texto atual
- `SiteSettingsManager.tsx` - Adicionar card "Subtítulos das Seções" com inputs para cada seção

## 4. Footer Description Editável

**Chave:** `footer_description`

**Frontend:**
- `FooterSection.tsx` - Ler `footer_description` do `useSiteSettings()` com fallback para texto atual
- `SiteSettingsManager.tsx` - Adicionar input no card existente ou novo card "Footer"

## 5. Atualizar `plan.md`

Marcar estes 4 itens como concluídos.

---

## Arquivos Alterados

| Arquivo | Ação |
|---------|------|
| Migration SQL | Criar tabela `faqs` + RLS |
| `src/hooks/usePortfolioData.tsx` | Adicionar `useFAQs()` |
| `src/components/admin/FAQsManager.tsx` | Novo - CRUD FAQs |
| `src/components/sections/FAQSection.tsx` | Ler do banco |
| `src/components/sections/HeroSection.tsx` | Ler tags/subtitle/desc do settings |
| `src/components/sections/ExperienceSection.tsx` | Subtitle dinâmico |
| `src/components/sections/ProjectsSection.tsx` | Subtitle dinâmico |
| `src/components/sections/SkillsSection.tsx` | Subtitle dinâmico |
| `src/components/sections/EducationSection.tsx` | Subtitle dinâmico |
| `src/components/sections/ContactSection.tsx` | Subtitle dinâmico |
| `src/components/sections/FooterSection.tsx` | Description dinâmica |
| `src/components/admin/SiteSettingsManager.tsx` | Cards para hero textos, subtítulos, footer |
| `src/pages/AdminDashboard.tsx` | Tab FAQ |
| `.lovable/plan.md` | Atualizar status |

