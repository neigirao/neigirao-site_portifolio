# Nei Girão — Portfolio Profissional

Portfolio profissional de Nei Girão (estratégia digital e produto), construído com React + TypeScript + Supabase.

## Visão Geral

SPA React com CMS admin completo. Todo o conteúdo é gerenciado via painel administrativo em `/admin` e armazenado no Supabase. Hospedado no Lovable.

**Site público**: apresentação, experiências, projetos, skills, artigos, educação, depoimentos, contato.
**Painel admin**: CRUD completo para todos os tipos de conteúdo, configurações do site, mensagens de contato.

---

## Stack

- **React 18** + TypeScript + Vite
- **Tailwind CSS** + shadcn-ui
- **Supabase** (PostgreSQL + Auth + Storage)
- **@tanstack/react-query** para fetching
- **React Router v6** para navegação
- **Lovable** como plataforma de hospedagem e deploy

---

## Estrutura do Projeto

```
src/
├── pages/            # 14 páginas (Index, AdminDashboard, detalhes por slug, etc.)
├── components/
│   ├── admin/        # 23 managers do CMS admin
│   ├── sections/     # Seções do site público (~25 seções)
│   ├── SEO/          # SEOHead, BreadcrumbSchema, schemas JSON-LD
│   └── ui/           # Componentes shadcn (não editar diretamente)
├── hooks/            # 15 hooks (usePortfolioData, useAdminData, useSiteSettings, etc.)
├── integrations/
│   └── supabase/     # client.ts + types.ts (gerado automaticamente)
└── config/
    └── constants.ts  # BASE_URL e constantes

supabase/
└── migrations/       # SQL aplicado automaticamente pelo Lovable no merge
```

---

## Banco de Dados (Supabase)

10 tabelas de conteúdo + 2 de sistema:

| Tabela | Conteúdo |
|--------|---------|
| `experiences` | Experiências profissionais |
| `projects` | Projetos e cases |
| `articles` | Artigos/blog |
| `skills` | Habilidades técnicas |
| `education` | Formação acadêmica |
| `companies` | Empresas (logos para timeline) |
| `certifications` | Certificações |
| `testimonials` | Depoimentos |
| `metrics` | Métricas de impacto |
| `faqs` | Perguntas frequentes |
| `site_settings` | Textos e configurações globais (key/value) |
| `contact_messages` | Mensagens recebidas pelo formulário |

---

## Desenvolvimento Local

```bash
npm install
npm run dev       # http://localhost:8080
npm run build     # build de produção
npm run preview   # preview do build
```

Variáveis de ambiente: configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (já preenchidas na integração do Lovable).

---

## CMS Admin

Acesse `/admin` com as credenciais do Supabase Auth.

Seções do painel:
- **Portfólio**: Experiências, Projetos, Artigos, Skills, Educação
- **Complementar**: Métricas, Empresas, Certificações, Depoimentos, FAQ
- **Sistema**: Mensagens de contato, Configurações do site

---

## Design System

Cores, gradientes e animações definidos como variáveis CSS em `src/index.css`.

**Sempre use tokens semânticos — nunca hardcode cores:**

```tsx
// ✅ Correto
<div className="bg-primary text-primary-foreground">
<div className="text-muted-foreground">

// ❌ Errado
<div className="bg-blue-500 text-white">
<div className="bg-[#012A4A]">
```

---

## Para IAs e Desenvolvedores

Leia o `CLAUDE.md` na raiz — contém a arquitetura atual, padrões de código, tabelas do banco, e guia de tarefas comuns.

---

© 2026 Nei Girão. Todos os direitos reservados.
