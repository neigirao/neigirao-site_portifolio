

## Plano de Melhorias - SEO, IA Search, CMS, Design e Engenharia de Software

Apos analise completa do codigo, identifico melhorias organizadas por area.

---

### 1. SEO - Otimizacao para Buscadores

**1.1 Sitemap Dinamico com lastmod real**
- O sitemap.xml atual e estatico com datas fixas (2025-10-26)
- Gerar sitemap dinamico via edge function usando `updated_at` de cada registro no banco
- Incluir paginas de detalhe (/experiencia/:slug, /skill/:slug, /projeto/:slug)

**1.2 Canonical URLs nas paginas de detalhe**
- ExperienceDetail, SkillDetail e ProjectDetail ja usam SEOHead com canonical, mas o dominio esta hardcoded
- Centralizar base URL em constante unica

**1.3 Hreflang e lang attributes**
- Adicionar `<link rel="alternate" hreflang="pt-BR">` para sinalizar idioma correto ao Google
- Falta `lang="pt-BR"` no html (ja existe no index.html, ok)

**1.4 Open Graph Images personalizadas**
- OG image atual e generica do Lovable (`lovable.dev/opengraph-image-p98pqg.png`)
- Gerar OG images dinamicas por pagina de detalhe via edge function (usando imagem/logo do item)

**1.5 Paginas de conteudo faltantes**
- Criar `/sobre` (pagina dedicada com biografia completa)
- Criar `/contato` (formulario dedicado)
- Estas paginas rankeiam melhor que hash anchors (#about, #contact)

---

### 2. IA Search - Otimizacao para Buscas por IA

**2.1 Atualizar llms.txt com dados dinamicos**
- O llms.txt atual e estatico e fica desatualizado
- Criar edge function que gera llms.txt dinamicamente a partir do banco

**2.2 Structured Data mais rico**
- DynamicSchema.tsx ja tem Person, WebSite, BreadcrumbList e FAQPage
- Adicionar `ItemList` schema para projetos e experiencias
- Adicionar `Review/Recommendation` schema (preparar para testimonials futuros)
- Adicionar `Course` schema para educacao

**2.3 about.txt dinamico**
- Similar ao llms.txt, gerar a partir dos dados do banco para manter sincronizado

**2.4 Content Freshness Signals**
- Adicionar `<meta name="date" content="...">` com data da ultima atualizacao real
- Adicionar `dateModified` nos schemas JSON-LD

---

### 3. CMS - Melhorias de Gestao de Conteudo

**3.1 Autosave com debounce**
- Salvar rascunho no localStorage a cada 5 segundos de inatividade
- Indicador visual "Salvando..." / "Salvo" no formulario
- Recuperar rascunho ao reabrir formulario

**3.2 Duplicar item**
- Botao "Duplicar" em cada item para criar copia rapida (util para experiencias similares)

**3.3 Bulk slug generation**
- Botao no dashboard para gerar slugs automaticamente para todos os itens sem slug

**3.4 Preview em nova aba**
- Alem do PreviewModal, permitir abrir preview real (pagina de detalhe) em nova aba

**3.5 Campo de "destaques/resultados"**
- Adicionar campo `highlights` (JSON) nas experiencias para armazenar metricas de impacto
- Ex: `[{"value": "+40%", "label": "Reducao de custos"}]`
- Renderizar automaticamente na pagina publica

---

### 4. Design - Melhorias Visuais

**4.1 IntersectionObserver para menu ativo**
- O `activeSection` nao sincroniza com scroll (so muda ao clicar)
- Implementar IntersectionObserver para destacar secao visivel no menu

**4.2 Animacoes de entrada com scroll**
- Cards de skills, experiencias e projetos aparecem sem animacao
- Adicionar fade-in-up ao entrar no viewport (IntersectionObserver + CSS)

**4.3 Footer mais completo**
- Footer atual e minimo (so copyright)
- Adicionar links rapidos, redes sociais e sitemap no footer

**4.4 Skeleton loading melhorado**
- Skeletons atuais sao retangulos simples
- Adicionar shimmer effect (animacao de brilho)

**4.5 Espacamento e tipografia mobile**
- No screenshot mobile, o hero tem espacamento excessivo
- Reduzir padding vertical no hero para mobile
- Ajustar tamanho do badge "Product Manager | Observabilidade"

---

### 5. Engenharia de Software

**5.1 Eliminar Index.tsx monolitico (513 linhas)**
- Extrair cada secao em componente separado:
  - `HeroSection.tsx`
  - `AboutSection.tsx`
  - `SkillsSection.tsx`
  - `EducationSection.tsx`
  - `ExperienceSection.tsx`
  - `ProjectsSection.tsx`
  - `FAQSection.tsx`
  - `ContactSection.tsx`
  - `NavigationBar.tsx`
- Index.tsx ficaria com ~50 linhas, apenas composicao

**5.2 Constantes centralizadas**
- URL base (`https://neigirao.lovable.app`) esta hardcoded em 6+ arquivos
- Criar `src/config/constants.ts` com `BASE_URL`, `SITE_NAME`, `AUTHOR` etc.

**5.3 Custom hooks para scroll behavior**
- Logica de scroll (progress, back-to-top, section tracking) esta inline no Index
- Extrair para `useScrollProgress()` e `useActiveSection()`

**5.4 Error Boundaries**
- Nao ha error boundaries - se um componente falha, toda a pagina quebra
- Adicionar `ErrorBoundary` wrapper nos componentes criticos

**5.5 Testes**
- Nenhum teste existe no projeto
- Adicionar testes para hooks criticos (`useRelatedContent`, `usePortfolioData`)
- Testar geracao de slug e keyword matching

**5.6 Tipagem mais forte**
- Interfaces duplicadas entre hooks e componentes (ex: `Project` em ProjectsManager vs `DbProject` em usePortfolioData)
- Centralizar tipos em `src/types/`

**5.7 Performance**
- FAQ section e hardcoded (400+ linhas de JSX) - mover para dados do banco ou array
- Reorder no CMS faz N requests sequenciais - usar batch update
- Adicionar `React.memo` nos cards que nao mudam frequentemente

---

### Priorizacao Sugerida

| # | Melhoria | Impacto | Esforco | Area |
|---|----------|---------|---------|------|
| 1 | Componentizar Index.tsx | Alto | Medio | Engenharia |
| 2 | IntersectionObserver menu | Alto | Baixo | Design |
| 3 | Constantes centralizadas | Medio | Baixo | Engenharia |
| 4 | Animacoes de scroll | Medio | Baixo | Design |
| 5 | Autosave no CMS | Alto | Medio | CMS |
| 6 | Sitemap dinamico com detalhe pages | Alto | Medio | SEO |
| 7 | llms.txt dinamico | Medio | Medio | IA Search |
| 8 | Schemas adicionais (ItemList, Course) | Medio | Baixo | SEO/IA |
| 9 | Error Boundaries | Alto | Baixo | Engenharia |
| 10 | Footer completo | Medio | Baixo | Design |
| 11 | Paginas /sobre e /contato | Alto | Medio | SEO |
| 12 | FAQ do banco de dados | Medio | Medio | CMS/Engenharia |

---

### Implementacao Recomendada

**Sprint 1 - Fundacao (Quick Wins)**
- Componentizar Index.tsx em secoes separadas
- Centralizar constantes (BASE_URL)
- IntersectionObserver para menu ativo
- Animacoes de entrada com scroll
- Error Boundaries

**Sprint 2 - SEO e IA**
- Sitemap dinamico incluindo paginas de detalhe
- Schemas adicionais (ItemList, Course)
- llms.txt dinamico via edge function
- Paginas /sobre e /contato

**Sprint 3 - CMS e Polish**
- Autosave com debounce
- Duplicar item
- Footer completo
- FAQ gerenciavel pelo banco
- Bulk slug generation

