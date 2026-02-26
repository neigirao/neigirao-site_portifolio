

# Levantamento: O Que Falta dos Planos Anteriores

Existiram dois planos principais na conversa. Aqui esta o status completo de cada item.

---

## Plano 1: Design / UX / Headhunter

### Prioridade Alta

| # | Item | Status |
|---|------|--------|
| 1 | Corrigir inconsistencia de anos (15 vs 7) | FEITO |
| 2 | Reorganizar hierarquia de secoes (Experience e Projects para cima) | FEITO |
| 3 | Reduzir nav de 8 para 6 itens | FEITO |
| 4 | Adicionar metricas nos ProjectCards (ex: "-40% custos") | PENDENTE |
| 5 | Destacar secao de Metricas (fundo escuro, numeros maiores) | FEITO |

### Prioridade Media

| # | Item | Status |
|---|------|--------|
| 6 | Variar layouts entre secoes (2 colunas About, cards horizontais Formacao) | PARCIAL - About tem 2 colunas, mas a variacao geral e limitada |
| 7 | Reduzir padding vertical de py-24 para py-16 | FEITO |
| 8 | Melhorar badge do Hero (tags separadas com icones, font maior) | PENDENTE - ainda e um pill com uppercase pequeno |
| 9 | Adicionar secao de Certificacoes (badges visuais + tabela no banco) | PENDENTE |
| 10 | Adicionar secao de Depoimentos/Recomendacoes (quotes do LinkedIn) | PENDENTE |

### Prioridade Baixa

| # | Item | Status |
|---|------|--------|
| 11 | Versao bilingue (toggle PT/EN) | PENDENTE |
| 12 | Animacao de contagem (count-up nos numeros) | PENDENTE |
| 13 | Melhorar transicao Hero modo claro | PENDENTE |

---

## Plano 2: SEO e Descoberta por IA

### Prioridade Alta

| # | Item | Status |
|---|------|--------|
| 1 | Edge function de pre-rendering para crawlers de IA | FEITO |
| 2 | llms.txt dinamico (redirect para edge function) | FEITO |
| 3 | FAQ real visivel na pagina (alinhado com FAQPage schema) | FEITO |
| 4 | about.txt dinamico (edge function generate-about) | FEITO |

### Prioridade Media

| # | Item | Status |
|---|------|--------|
| 5 | Corrigir BreadcrumbList (remover hash fragments) | FEITO |
| 6 | JSON-LD Article/CreativeWork nas paginas de detalhe | FEITO |
| 7 | Adicionar hreflang tags no SEOHead | FEITO |
| 8 | Criar .well-known/ai-plugin.json | FEITO |

### Prioridade Baixa

| # | Item | Status |
|---|------|--------|
| 9 | OG Image personalizada (imagem com nome, titulo e foto) | PENDENTE - ainda usa a imagem generica do Lovable |
| 10 | Adicionar llms.txt e about.txt ao sitemap | PENDENTE - sitemap ainda tem URLs com hash fragments (/#about, /#skills, etc.) que deveriam ser removidas |

---

## Resumo: 9 Itens Pendentes

### Alta prioridade (impacto direto na conversao)
1. **Metricas nos ProjectCards** - Exibir 1-2 resultados quantificaveis diretamente no card (ex: "-40% custos", "+15% conversao"). Requer campo no banco ou extrair do texto existente.

### Media prioridade (polimento e credibilidade)
2. **Melhorar badge do Hero** - Trocar o pill uppercase por tags separadas com icones ou font maior com case normal, para melhor legibilidade.
3. **Secao de Certificacoes** - Nova secao com badges visuais (CSM, Dynatrace, Google Analytics, etc.). Requer nova tabela no banco + componente + manager no admin.
4. **Secao de Depoimentos** - 2-3 quotes de colegas/gestores do LinkedIn com foto e cargo. Requer nova tabela no banco + componente + manager no admin.
5. **Limpar sitemap** - Remover URLs com hash fragments (/#about, /#skills, /#education, /#experience, /#projects, /#faq) e adicionar /llms.txt e /about.txt.

### Baixa prioridade (nice to have)
6. **OG Image personalizada** - Substituir a imagem generica do Lovable por uma com nome, titulo profissional e foto.
7. **Versao bilingue** - Toggle PT/EN para alcance internacional.
8. **Animacao de contagem** - Efeito count-up nos numeros do Hero e ImpactMetrics ao aparecerem na tela.
9. **Transicao Hero modo claro** - Adaptar o Hero para funcionar visualmente em ambos os temas sem desconexao abrupta.

---

### Arquivos Afetados Para Implementar os Pendentes

| Item | Arquivos |
|------|----------|
| Metricas nos ProjectCards | `ProjectCard.tsx`, possivelmente tabela `projects` (novo campo) |
| Badge do Hero | `HeroSection.tsx` |
| Certificacoes | Nova tabela + `CertificationsSection.tsx` + `CertificationsManager.tsx` + `Index.tsx` |
| Depoimentos | Nova tabela + `TestimonialsSection.tsx` + `TestimonialsManager.tsx` + `Index.tsx` |
| Limpar sitemap | `generate-sitemap/index.ts` |
| OG Image | Requer imagem personalizada em `/public/` + atualizacao em `SEOHead.tsx` e `index.html` |
| Count-up | `ImpactMetrics.tsx`, `HeroSection.tsx` |
| Hero modo claro | `HeroSection.tsx`, `index.css` |

