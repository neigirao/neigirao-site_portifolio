

# Levantamento de Pendencias e Melhorias

## Pendencias Confirmadas (do roadmap anterior)

### P0 - Criticas

1. **Sanitizar `dangerouslySetInnerHTML` no AboutSection.tsx (linha 69)**
   - Usa `dangerouslySetInnerHTML={{ __html: aboutSummary }}` sem sanitização com DOMPurify
   - O `SafeHTML` component já existe e é usado em outros lugares (ProjectDetail, ArticleDetail)
   - Corrigir: substituir por `<SafeHTML html={aboutSummary} />`

2. **Unificar CV URL via `useSiteSettings` em 3 locais que ainda estão hardcoded:**
   - `NavigationBar.tsx` linhas 65 e 100: `window.open("/cv-nei-girao.pdf")`
   - `ExperienceDetail.tsx` linha 237: `window.open('/cv-nei-girao.pdf')`
   - `FooterSection.tsx` linha 26: `href="/cv-nei-girao.pdf"`
   - Todos devem usar `useSiteSettings()` e ler `cv_file_url`

3. **Adicionar `highlight_metric` ao ProjectsManager**
   - O campo não existe na tabela `projects` nem no CMS
   - Permite ao usuário destacar uma metrica-chave por projeto (ex: "40% redução MTTR")

### P1 - Alto Impacto

4. **Template de Case Study para Projetos**
   - Adicionar campos na tabela `projects`: `context`, `challenge`, `solution`, `results`, `learnings`
   - Reformular `ProjectDetail.tsx` para exibir seções estruturadas (Contexto / Desafio / Solução / Resultados)
   - Adicionar campos correspondentes no `ProjectsManager`

5. **Página /sobre ainda com textos hardcoded (Sobre.tsx linhas 126-138)**
   - O `about_summary` da `site_settings` está vazio no banco
   - A página `/sobre` NÃO usa o `about_summary` do banco (usa texto hardcoded)
   - Deve ler do `site_settings` como o `AboutSection.tsx` já faz

6. **Seção de artigos recentes na Home**
   - Não existe link para `/artigos` na navegação principal nem na Home
   - Adicionar seção "Artigos Recentes" na Index com os últimos 3 artigos publicados
   - Adicionar "Artigos" no menu de navegação

### P2 - Polish

7. **heroStats hardcoded (HeroSection.tsx linhas 7-12)**
   - Os 4 cards de stats ("15+ Anos", "35+ Membros"...) não são editáveis via CMS
   - Devem ser configuráveis via `site_settings` ou tabela dedicada

8. **Methodology cards hardcoded (AboutSection.tsx linhas 19-40)**
   - Os 4 cards de metodologia são estáticos no código
   - Devem ser editáveis via CMS (JSON na `site_settings` ou tabela)

9. **SiteSettingsManager usa Textarea para about_summary em vez de RichTextEditor**
   - Linha 218: usa `<Textarea>` simples mas o front renderiza como HTML
   - Deve usar `<RichTextEditor>` para consistência

10. **llms.txt e about.txt estáticos em `public/`**
    - Edge functions existem para gerá-los dinamicamente, mas os arquivos estáticos em `public/` podem sobrescrevê-los
    - Verificar se as rotas apontam para as edge functions

---

## Resumo por Prioridade

| # | Item | Tipo | Esforço |
|---|------|------|---------|
| 1 | Sanitizar HTML no AboutSection | Bug/Security | 5 min |
| 2 | Unificar CV URL (3 arquivos) | Bug | 15 min |
| 3 | Campo highlight_metric em Projects | Feature | 30 min |
| 4 | Template Case Study (projects) | Feature | 1-2h |
| 5 | Sobre.tsx usar site_settings | Bug | 15 min |
| 6 | Artigos na Home + nav | Feature | 30 min |
| 7 | heroStats editáveis | Feature | 30 min |
| 8 | Methodology cards editáveis | Feature | 30 min |
| 9 | RichTextEditor no about_summary | UX fix | 10 min |
| 10 | Verificar llms.txt/about.txt routing | Config | 15 min |

