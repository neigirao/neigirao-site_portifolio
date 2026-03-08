

# Análise das Sugestões de SEO + Plano de Ação

## Validação das 8 Sugestões

### 1. Keyword principal — VÁLIDO, ação necessária
O site usa "Product Manager" como jobTitle em todo lugar. A sugestão de migrar para **"Product Leader em Transformação Digital"** é estrategicamente melhor — posiciona como liderança, não execução. Precisa atualizar: `SEOHead.tsx` defaults, `index.html` meta tags, `DynamicSchema.tsx` (Person.jobTitle), e `HeroSection` default subtitle.

### 2. Título SEO da home — VÁLIDO, ação necessária
Título atual: *"Nei Girão - Product Manager | Observabilidade | Produtos Digitais"*
Recomendado: *"Nei Girão | Product Leader em Transformação Digital, Observabilidade e Produtos Digitais"*
Atualizar em `SEOHead.tsx` (defaultMeta.title) e `index.html`.

### 3. Meta description — VÁLIDO, ação necessária
Description atual tem 140 chars mas foca em ferramentas. A sugestão foca em posicionamento executivo, que é melhor para CTR no Google. Atualizar em `SEOHead.tsx` e `index.html`.

### 4. Headings H1/H2 — PARCIALMENTE IMPLEMENTADO
- H1 atual é só "Nei Girão" (genérico). Deveria ser descritivo: "Nei Girão — Product Leader em Transformação Digital"
- H2s já existem nas seções mas os textos podem ser otimizados com keywords
- Renomear "Habilidades" → "Especialidades" (mais SEO-friendly e profissional)

### 5. Seção "Impacto em números" — JÁ EXISTE ✅
A seção `ImpactMetrics` já implementa exatamente isso. Nenhuma ação necessária.

### 6. Seção de especialidades — JÁ EXISTE (ajuste de nome)
`SkillsSection` cumpre este papel. Renomear o título de "Habilidades" para "Especialidades" é uma melhoria válida de SEO.

### 7. Texto SEO sobre carreira — JÁ EXISTE ✅
`AboutSection` já tem resumo profissional editável via CMS. Nenhuma ação de código necessária — o conteúdo pode ser ajustado pelo admin.

### 8. Schema.org — JÁ EXISTE ✅ (ajuste de jobTitle)
`DynamicSchema.tsx` já gera Person, WebSite, FAQPage, ItemList, Course schemas. Apenas atualizar `jobTitle` de "Product Manager" para "Product Leader".

### Páginas de conteúdo SEO (sugestão extra) — VÁLIDO, ação necessária
Criar 3 artigos/páginas de conteúdo é uma estratégia de SEO comprovada. O sistema de artigos já existe — basta criar os artigos pelo CMS. Nenhuma ação de código.

---

## Plano de Implementação (apenas código)

### Arquivos a alterar

| Arquivo | Alterações |
|---------|-----------|
| `index.html` | Atualizar title, description, og:title, og:description, keywords com novo posicionamento |
| `src/components/SEO/SEOHead.tsx` | Atualizar defaultMeta (title, description, keywords) |
| `src/components/SEO/DynamicSchema.tsx` | jobTitle → "Product Leader", descriptions atualizadas |
| `src/components/sections/HeroSection.tsx` | H1 de "Nei Girão" para "Nei Girão — Product Leader em Transformação Digital" (com estilização) |
| `src/components/sections/SkillsSection.tsx` | Renomear H2 "Habilidades" → "Especialidades" |
| `src/components/sections/ExperienceSection.tsx` | H2 com keyword: "Experiência Profissional em Produtos Digitais" |
| `src/components/sections/ProjectsSection.tsx` | H2 com keyword: "Projetos de Produtos Digitais" |

### Ações que NÃO precisam de código (fazer pelo CMS)
- Criar os 3 artigos SEO sugeridos (sistema de artigos já existe)
- Ajustar o texto "Sobre" no admin para incluir as keywords sugeridas
- Ajustar hero_subtitle e hero_description via site_settings

