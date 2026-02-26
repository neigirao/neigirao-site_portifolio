

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
| 4 | Adicionar metricas nos ProjectCards (ex: "-40% custos") | FEITO - campo highlight_metric na tabela + display no card |
| 5 | Destacar secao de Metricas (fundo escuro, numeros maiores) | FEITO |

### Prioridade Media

| # | Item | Status |
|---|------|--------|
| 6 | Variar layouts entre secoes (2 colunas About, cards horizontais Formacao) | PARCIAL |
| 7 | Reduzir padding vertical de py-24 para py-16 | FEITO |
| 8 | Melhorar badge do Hero (tags separadas com icones, font maior) | FEITO - 3 tags separadas com emojis |
| 9 | Adicionar secao de Certificacoes (badges visuais + tabela no banco) | FEITO - tabela + componente + admin manager |
| 10 | Adicionar secao de Depoimentos/Recomendacoes (quotes do LinkedIn) | FEITO - tabela + componente + admin manager |

### Prioridade Baixa

| # | Item | Status |
|---|------|--------|
| 11 | Versao bilingue (toggle PT/EN) | PENDENTE |
| 12 | Animacao de contagem (count-up nos numeros) | FEITO - useCountUp hook no Hero e ImpactMetrics |
| 13 | Melhorar transicao Hero modo claro | FEITO - Hero usa gradient fixo dark em ambos os modos |

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
| 9 | OG Image personalizada (imagem com nome, titulo e foto) | PENDENTE |
| 10 | Adicionar llms.txt e about.txt ao sitemap + remover hash fragments | FEITO |

---

## Resumo: 2 Itens Pendentes

1. **OG Image personalizada** - Substituir a imagem generica do Lovable por uma com nome, titulo profissional e foto.
2. **Versao bilingue** - Toggle PT/EN para alcance internacional.
