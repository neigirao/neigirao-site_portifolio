# Pendências e Sugestões de Melhoria

## Do plano original (ainda pendentes)

1. **Envio de email via edge function** ao receber contato (Resend)
2. **Rate limiting no formulário de contato** (anti-spam)

## Da auditoria (ainda não implementados)

### Performance

3. **Lazy load de seções below-fold** -- todas as seções renderizam de uma vez; usar `React.lazy` + `IntersectionObserver` para carregar sob demanda
4. **Consolidar queries da home** -- ~10 requests paralelos ao Supabase no carregamento; agrupar via RPC ou reduzir waterfall

### SEO

5. **Internal linking nos artigos** -- componente `SeeAlso` existe mas não é usado no `ArticleDetail`; adicionar artigos relacionados por tags
6. **Verificar sitemap edge function** inclui artigos publicados dinamicamente
7. **Publicar os 3 artigos pillar** (ainda em draft)

### CMS

8. **Campo `is_read` em `contact_messages**` + badge de não lidas na tab Mensagens
9. **Busca/filtro** na lista de artigos e mensagens no admin
10. **Preview de artigos draft** (botão preview que abre modal com layout do ArticleDetail)
11. **Paginação nas mensagens de contato** (para escalar)

### Design

12. **Agrupar certificações por categoria** quando houver muitas
  &nbsp;

### Redação

14. **ContactSection subtitle** ainda tem fallback "Aberto a desafios" (linha 22) -- substituir por texto sem conotação de disponibilidade
15. **Enriquecer conteúdo dos 3 artigos SEO** com dados reais, cases e CTAs contextuais

---

## Recomendação de prioridade

```text
Impacto imediato (segurança + SEO):
├── Rate limiting no formulário (anti-spam)
├── Corrigir fallback "Aberto a desafios" na ContactSection
├── Publicar artigos pillar
└── SeeAlso / internal linking nos artigos

Valor alto, esforço médio:
├── Email notification via edge function
├── is_read + badge não lidas no admin
└── Preview de artigos draft

Nice to have:
├── Lazy load seções below-fold
├── Busca/filtro no admin
├── Paginação mensagens
├── Agrupar certificações
└── Consolidar queries
```

## Sugestão

Recomendo atacar primeiro o bloco "impacto imediato": rate limiting, corrigir o fallback de disponibilidade, publicar os artigos e adicionar internal linking. Quer que eu implemente esse bloco?