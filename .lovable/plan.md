

# Plano: Ocultar seções vazias + Remover busca/filtro do roadmap

## 1. Ocultar seções vazias quando sem dados

As seções `CertificationsSection`, `TestimonialsSection` e `RecentArticlesSection` já retornam `null` quando vazias. As seguintes seções **não** fazem isso e precisam ser atualizadas:

- **ExperienceSection** - Adicionar `if (!isLoading && experiences.length === 0) return null;`
- **ProjectsSection** - Adicionar `if (!isLoading && projects.length === 0) return null;`
- **SkillsSection** - Adicionar `if (!isLoading && skills.length === 0) return null;`
- **EducationSection** - Adicionar `if (!isLoading && education.length === 0) return null;`
- **FAQSection** - Adicionar verificação similar (quando FAQ for dinâmico, se lista vazia, ocultar)

Padrão: antes do `return` principal, adicionar a guarda `if (!isLoading && items.length === 0) return null;`

## 2. Atualizar plan.md

- Remover o item "Busca/filtro no CMS" do roadmap de melhorias
- Adicionar item "Ocultar seções vazias" como pendente
- Marcar heroStats e methodology cards como concluídos (já foram implementados)

## Arquivos alterados
- `src/components/sections/ExperienceSection.tsx`
- `src/components/sections/ProjectsSection.tsx`
- `src/components/sections/SkillsSection.tsx`
- `src/components/sections/EducationSection.tsx`
- `src/components/sections/FAQSection.tsx`
- `.lovable/plan.md`

