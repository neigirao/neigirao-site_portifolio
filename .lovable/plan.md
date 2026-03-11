# Auditoria Completa: Performance, Redação, Design, SEO e CMS

## 1. PERFORMANCE

### Problemas identificados

- **Hero photo sem width/height** -- causa CLS (Cumulative Layout Shift)
- **Múltiplas queries paralelas na home** (experiences, skills, education, projects, companies, certifications, testimonials, articles, site_settings, FAQs) -- ~10 requests simultâneos no carregamento
- **animate-pulse nos blobs decorativos** -- animações CSS constantes consomem GPU desnecessariamente
- **Company logos sem dimensões fixas** -- layout shift quando carregam
- **Seções abaixo da dobra não são lazy loaded** -- todas as seções renderizam junto com dados

### Melhorias propostas

1. Adicionar `width`/`height` explícitos na hero photo e company logos para evitar CLS
2. Agrupar queries com uma única chamada RPC ou consolidar `useSiteSettings` + `useCompanies` para reduzir waterfall
3. Trocar `animate-pulse` dos blobs decorativos por animações com `will-change` ou removê-las (não agregam valor de UX)
4. Adicionar `fetchpriority="high"` na hero photo (LCP element)
5. Lazy load das seções abaixo da dobra com `React.lazy` + `IntersectionObserver` wrapper

---

## 2. REDAÇÃO (Perspectiva de Redator)

### Problemas identificados

- **Textos genéricos nos artigos SEO** -- os 3 drafts criados têm conteúdo placeholder que precisa ser revisado e enriquecido com dados reais e cases específicos
- **CTA "Agendar Conversa"** no hero não tem contexto sobre o que esperar
- **Footer description** é genérica ("Product Manager especializado...")

### Melhorias propostas

1. Remover todas as frases de disponibilidade ("Disponível para oportunidades", "Aberto a desafios") da /contato e ContactSection
2. Reformular CTA do hero para algo mais contextual: "Falar sobre Produto" ou "Conversar sobre Projetos"
3. Enriquecer conteúdo dos 3 artigos SEO com números reais, ferramentas específicas e resultados concretos
4. Adicionar call-to-action contextual no final de cada artigo (ex: "Quer implementar observabilidade? Vamos conversar")
5. Melhorar excerpt dos artigos para serem mais compelling e menos descritivos

---

## 3. DESIGN

### Problemas identificados

- **Mobile (393px viewport)**: Hero stats em grid 2x2 ficam apertados, textos cortam
- **Testimonials sem H2 semântico visível** -- usa badge "Recomendações" mas o H2 não tem keyword
- **Cards de certificação** são itens inline sem hierarquia visual clara para muitos itens
- **Sem dark mode toggle visível** na home -- ThemeToggle existe mas não está na nav principal
- **Footer repetitivo** -- links "Sobre" e "Contato" aparecem tanto na lista quanto no rodapé inferior

### Melhorias propostas

1. Adicionar ThemeToggle à NavigationBar principal
2. Melhorar responsividade dos hero stats no mobile (font-size menor, padding reduzido)
3. Remover links duplicados no footer inferior
4. Adicionar avatar/foto do autor no card de depoimentos para credibilidade
5. Agrupar certificações por categoria quando houver muitas (ex: Product, Tech, Leadership)

---

## 4. SEO

### Problemas identificados

- **Página /contato** não grava na `contact_messages`** -- usa mailto como fallback, perdendo dados e rastreabilidade
- **Art