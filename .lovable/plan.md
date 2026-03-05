

# Plano: 3 Quick Wins Visuais

## 1. Navbar Global nas Páginas Standalone

Criar um componente `StandaloneNavbar` simplificado (logo + links de navegação para `/`, `/sobre`, `/contato`, `/artigos` + ThemeToggle + CV download) para usar nas páginas que não são a Index.

**Páginas afetadas:** `Sobre.tsx`, `Contato.tsx`, `ArticlesListing.tsx`, `ArticleDetail.tsx`, `ExperienceDetail.tsx`, `ProjectDetail.tsx`, `SkillDetail.tsx`

**Abordagem:** Não reutilizar `NavigationBar` diretamente (ela depende de scroll-to-section da Index). Criar um novo `StandaloneNavbar.tsx` com links `<Link to="/">` em vez de `scrollToSection()`. Remover os botões "Voltar" individuais de cada página (a navbar já permite navegar).

**Arquivo novo:** `src/components/sections/StandaloneNavbar.tsx`
- Logo "Nei Girão" → link para `/`
- Links: Início, Sobre, Artigos, Contato
- ThemeToggle + botão CV download
- Menu mobile via Sheet (mesmo padrão da NavigationBar)
- Scroll progress bar
- `useScrollProgress()` hook reutilizado

## 2. Scroll Animations em Testimonials e Certifications

Adicionar `useScrollAnimation` nas seções TestimonialsSection e CertificationsSection com staggered delays nos itens.

**Arquivos:** `TestimonialsSection.tsx`, `CertificationsSection.tsx`
- Wrap do container principal com `ref` do `useScrollAnimation`
- Header com fade-in
- Cada card/item com `transitionDelay` baseado no index (mesmo padrão de ProjectsSection)

## 3. Renderizar `image_url` nos Project Cards

Adicionar `image_url` à interface do `ProjectCard` e renderizar com `OptimizedImage` no topo do card quando disponível.

**Arquivos:** `ProjectCard.tsx`
- Adicionar `image_url?: string | null` à interface
- Renderizar `OptimizedImage` acima do conteúdo quando `image_url` existe
- Altura fixa (h-40) com object-cover

---

## Arquivos Alterados

| Arquivo | Ação |
|---------|------|
| `src/components/sections/StandaloneNavbar.tsx` | Novo - navbar para páginas standalone |
| `src/pages/Sobre.tsx` | Adicionar StandaloneNavbar, remover botão Voltar |
| `src/pages/Contato.tsx` | Adicionar StandaloneNavbar, remover botão Voltar |
| `src/pages/ArticlesListing.tsx` | Adicionar StandaloneNavbar, remover botão Voltar |
| `src/pages/ArticleDetail.tsx` | Adicionar StandaloneNavbar |
| `src/pages/ExperienceDetail.tsx` | Adicionar StandaloneNavbar |
| `src/pages/ProjectDetail.tsx` | Adicionar StandaloneNavbar |
| `src/pages/SkillDetail.tsx` | Adicionar StandaloneNavbar |
| `src/components/sections/TestimonialsSection.tsx` | Scroll animation |
| `src/components/sections/CertificationsSection.tsx` | Scroll animation |
| `src/components/ProjectCard.tsx` | Renderizar image_url |
| `src/components/sections/index.ts` | Export StandaloneNavbar |
| `.lovable/plan.md` | Marcar 3 itens como concluídos |

