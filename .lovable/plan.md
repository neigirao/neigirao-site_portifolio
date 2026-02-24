

# Analise de SEO e Descoberta por IA

## Estado Atual - O que ja esta bom

O site ja tem uma base solida:
- Schema.org JSON-LD dinamico (Person, WebSite, BreadcrumbList, FAQPage, ItemList, Course)
- Meta tags dinamicas com react-helmet-async (SEOHead)
- robots.txt com permissoes explicitas para 15+ crawlers de IA
- llms.txt dinamico via edge function
- about.txt com conteudo completo para crawlers
- Sitemap dinamico via edge function com paginas individuais
- Paginas dedicadas /sobre e /contato para SEO
- Paginas de detalhe para experiencias, projetos e skills com slugs
- Internal linking entre paginas de detalhe (SeeAlso, related content)
- Breadcrumbs em paginas de detalhe
- Meta tags de AI (ai-content-declaration, ai-training)

## Problemas Identificados

### 1. SPA sem SSR/Pre-rendering (CRITICO)

O site e uma Single Page Application React pura. Crawlers como Googlebot executam JavaScript, mas muitos crawlers de IA (GPTBot, ClaudeBot, PerplexityBot) **nao executam JavaScript**. Eles veem apenas o HTML inicial do `index.html`, que contem:
- Um titulo estatico
- Meta tags estaticas
- Um `<div id="root"></div>` vazio
- Nenhum conteudo real

Isso significa que **todo o conteudo dinamico (experiencias, skills, projetos, schemas JSON-LD) e invisivel** para a maioria dos crawlers de IA.

**Solucao viavel sem migrar para Next.js**: Criar uma edge function `generate-prerender` que gera HTML estatico com todo o conteudo do banco para crawlers. Detectar user-agent no edge e servir HTML pre-renderizado.

### 2. llms.txt nao esta acessivel na URL correta

O `robots.txt` referencia `https://neigirao.lovable.app/llms.txt` e o `index.html` tem `<link rel="alternate" href="/llms.txt">`. Porem:
- O `public/llms.txt` e um arquivo estatico desatualizado (data 2025-01-04)
- A edge function `generate-llms` gera conteudo dinamico mas esta em `/functions/v1/generate-llms`
- Nao ha rota no React ou redirect para servir o llms.txt dinamico na URL `/llms.txt`

Os crawlers de IA que acessam `/llms.txt` recebem o conteudo estatico desatualizado, nao o dinamico.

### 3. FAQPage schema sem FAQ real na pagina

O DynamicSchema gera um FAQPage schema com 5 perguntas, mas a secao `FAQSection` na pagina e sobre "Como Trabalho" (metodologia), nao um FAQ real. Isso e uma **violacao das diretrizes do Google** - o schema FAQPage deve corresponder a conteudo FAQ visivel na pagina.

### 4. BreadcrumbList aponta para anchors (#about, #skills)

O breadcrumb schema usa URLs com hash fragments (`/#about`, `/#skills`). Google nao indexa hash fragments como paginas separadas. Esses itens do breadcrumb nao levam a paginas reais.

### 5. Falta `hreflang` e `lang` dinamico

O site e em portugues mas nao tem `hreflang` tag. Para SEO regional (Brasil), isso ajuda o Google a mostrar o site para buscas em portugues.

### 6. Paginas de detalhe sem schema Article/CreativeWork

As paginas `/experiencia/:slug`, `/projeto/:slug` e `/skill/:slug` tem SEOHead com meta tags, mas nao tem JSON-LD schema especifico. Um schema `Article` ou `CreativeWork` para cada pagina de detalhe melhoraria a indexacao.

### 7. Sitemap nao referencia o llms.txt

O sitemap nao inclui referencia ao `llms.txt` ou `about.txt`, que sao recursos importantes para discovery.

### 8. about.txt desatualizado

O `about.txt` tem data de "2025-01-04" e conteudo estatico que pode estar desatualizado em relacao ao banco de dados.

### 9. Open Graph image generica

Todas as paginas usam `https://lovable.dev/opengraph-image-p98pqg.png` - uma imagem generica do Lovable, nao uma imagem personalizada de Nei Girao. Isso reduz CTR em redes sociais e previews de links.

### 10. Falta `.well-known/ai-plugin.json`

Padroes emergentes como `.well-known/ai-plugin.json` ajudam assistentes de IA a descobrir e entender o contexto do site.

---

## Plano de Melhorias

### Prioridade Alta

**1. Criar edge function de pre-rendering para crawlers de IA**

Nova edge function `generate-prerender` que:
- Detecta user-agents de crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, etc.)
- Gera HTML completo com todo o conteudo do banco inline (experiencias, skills, projetos, educacao)
- Inclui todos os schemas JSON-LD inline
- Inclui meta tags corretas
- Servido apenas para bots, usuarios normais continuam com a SPA

Isso resolve o problema mais critico: crawlers de IA nao veem conteudo algum hoje.

**2. Substituir llms.txt estatico por redirect para edge function**

- Atualizar `public/llms.txt` para conter apenas um redirect comment
- Criar rota `/llms.txt` no App.tsx que redireciona para a edge function `generate-llms`
- Ou: criar uma nova edge function que serve na raiz

**3. Corrigir FAQPage schema**

Duas opcoes:
- Opcao A: Adicionar uma secao FAQ real visivel na pagina com as mesmas perguntas do schema
- Opcao B: Remover o FAQPage schema e manter apenas os schemas validos

Recomendacao: Opcao A - adicionar FAQ visivel apos a secao "Como Trabalho". As perguntas ja existem no schema, basta renderiza-las.

**4. Criar edge function `generate-about` para about.txt dinamico**

Similar ao `generate-llms`, gerar `about.txt` dinamicamente do banco de dados para manter conteudo sempre atualizado.

### Prioridade Media

**5. Corrigir BreadcrumbList schema**

Remover itens com hash fragments. Manter apenas URLs reais:
- Home: `/`
- Sobre: `/sobre`
- Contato: `/contato`
- E breadcrumbs especificos nas paginas de detalhe

**6. Adicionar JSON-LD nas paginas de detalhe**

- `/experiencia/:slug`: Schema `Article` com author, datePublished, organization
- `/projeto/:slug`: Schema `CreativeWork` com author, tags, URL
- `/skill/:slug`: Schema `Article` com about, author

**7. Adicionar `hreflang` tags**

No SEOHead, adicionar:
```html
<link rel="alternate" hreflang="pt-BR" href="{canonicalUrl}" />
<link rel="alternate" hreflang="x-default" href="{canonicalUrl}" />
```

**8. Criar `.well-known/ai-plugin.json`**

Arquivo estatico em `public/.well-known/ai-plugin.json` descrevendo o site para assistentes de IA.

### Prioridade Baixa

**9. OG Image personalizada**

Criar uma imagem OG personalizada com nome, titulo e foto profissional para melhorar CTR.

**10. Adicionar about.txt e llms.txt ao sitemap**

Incluir esses recursos no sitemap dinamico como recursos alternativos.

---

## Resumo de Arquivos

| Arquivo | Acao |
|---------|------|
| `supabase/functions/generate-prerender/index.ts` | Novo - HTML pre-renderizado para crawlers |
| `supabase/functions/generate-about/index.ts` | Novo - about.txt dinamico |
| `src/pages/LlmsTxtRedirect.tsx` | Novo - redirect para llms.txt dinamico |
| `src/App.tsx` | Adicionar rota /llms.txt |
| `src/components/SEO/DynamicSchema.tsx` | Corrigir BreadcrumbList, adicionar FAQ visivel |
| `src/components/sections/FAQSection.tsx` | Adicionar FAQ real visivel na pagina |
| `src/components/SEO/SEOHead.tsx` | Adicionar hreflang tags |
| `src/pages/ExperienceDetail.tsx` | Adicionar JSON-LD Article schema |
| `src/pages/ProjectDetail.tsx` | Adicionar JSON-LD CreativeWork schema |
| `src/pages/SkillDetail.tsx` | Adicionar JSON-LD Article schema |
| `public/.well-known/ai-plugin.json` | Novo - AI plugin descriptor |
| `public/llms.txt` | Atualizar com redirect ou conteudo dinamico |

