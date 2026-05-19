# Revisão do CMS — melhorias por categoria

Análise dos 23 managers do admin + dashboard + hooks. Agrupei oportunidades por categoria/manager e marquei prioridade (🔴 alta, 🟡 média, 🟢 baixa).

---

## 0. Melhorias transversais (afetam todos os managers)

🔴 **Padronizar `is_visible` em todas as listas**: hoje só alguns managers mostram badge/opacity quando oculto. Padronizar visual + toggle rápido (olhinho) em todas as listas.
🔴 **Indicador de completude por item** (`CompletenessIndicator` já existe): mostrar barra/percentual em cada card de lista (meta_title, meta_description, slug, imagem, alt text).
🔴 **Alt text obrigatório** no `ImageUploader` quando a imagem aparece no site público (logos de empresa/certificação podem ficar opcionais).
🔴 **Validação SEO inline universal**: `meta_title` ≤60, `meta_description` ≤160, slug duplicado entre registros da mesma tabela (já feito em Experiences, replicar em Projects, Articles, Skills, Education).
🟡 **Atalhos de teclado**: ⌘S salva, Esc cancela edição, `/` foca busca. Hook `useFormShortcuts` reaproveitável.
🟡 **Duplicar 1-clique universal**: hoje só Companies/FAQs têm. Adicionar em Projects, Experiences, Articles, Skills, Education, Testimonials, Certifications.
🟡 **Bulk actions**: checkbox de seleção + ocultar/mostrar/excluir em lote nas listas grandes (Projects, Experiences, Articles, Skills).
🟡 **Busca + filtros consistentes**: padrão já em Projects/Experiences/Articles → estender a Skills, Education, Testimonials, Certifications, Companies.
🟢 **PreviewModal** lado-a-lado em Projects e Articles antes de salvar (hoje só Experiences/FAQs usam).
🟢 **Skeleton states** consistentes (alguns managers só mostram "Carregando...").

---

## 1. Experiences Manager

🔴 Validar `is_case = true` exige `case_body` e `case_result` (hoje pode salvar case vazio).
🔴 Slug auto-gerado a partir de `role + company` quando vazio (BulkSlugGenerator já existe, plugar no submit).
🟡 Mostrar contagem "X de Y são cases" no topo da lista.
🟡 Botão "Ver no site" abrindo `/experiencia/:slug` em nova aba quando `is_case && is_visible`.

## 2. Projects Manager

🔴 Campos longos (`challenge`, `solution`, `results`, `learnings`, `context`) — usar RichTextEditor em vez de textarea (consistente com Articles).
🔴 `highlight_metric` ganha placeholder com exemplo e contador de chars (aparece no card da home).
🟡 Preview do card editorial (como aparece no site) ao lado do form.
🟡 Validar `tags` ≥1 e ≤5 (UX dos chips fica melhor).
🟡 Brand: select com lista das companies cadastradas + opção custom.

## 3. Articles Manager

🔴 Estado de publicação claro: `draft` / `published` com ação "Publicar" separada do botão Salvar.
🔴 Auto-calcular `reading_time_minutes` a partir do `content` (palavras/200).
🟡 Tags como combobox com sugestões das tags já usadas.
🟡 Agendar publicação (`published_at` futuro + filtro "Agendados").
🟢 Contador de palavras/caracteres no editor.

## 4. Skills Manager

🔴 Filtro por `category` + agrupamento visual por categoria na lista.
🔴 Slug + meta automáticos quando vazios.
🟡 Bulk import via CSV (nome, categoria, logo URL).

## 5. Education Manager

🟡 Validar formato de `period` (regex `YYYY – YYYY` ou "Atual").
🟡 Ordenar por data automaticamente (período mais recente primeiro).
🟢 Campo opcional `credential_url` (igual certifications).

## 6. Companies Manager

🟡 Detectar logos duplicados pelo hash da URL.
🟡 Mostrar quantos `experiences` usam cada `company` (com link para filtrar).
🟢 Sugerir `abbr` automaticamente a partir do `name`.

## 7. Certifications Manager

🟡 Validar `year` (4 dígitos, ≤ ano atual).
🟡 Adicionar `is_visible` (hoje não tem — sempre aparece).
🟢 Agrupar por `issuer` na lista.

## 8. Testimonials Manager

🔴 Limite de caracteres no `quote` (ideal 240–400) com contador.
🟡 Preview do card como aparece no site.
🟡 Validar `linkedin_url` (regex linkedin.com).

## 9. Metrics (Impact) Manager

🟡 Preview do ícone Lucide ao escolher (já é dropdown? validar live preview).
🟡 Validar `value` (aceita `+50%`, `1.5k`, etc. — mostrar formato).
🟢 Color picker com tokens do design system em vez de string Tailwind.

## 10. FAQs Manager

🟢 Já tem boa UX (duplicate, sortable, visible). Falta só: busca por texto da pergunta + preview do accordion.

## 11. Site Settings Manager (491 linhas — maior arquivo)

🔴 **Agrupar por seção** (Cover, Masthead, Essay, Contact, Footer, SEO global, Social, Analytics) com Accordion/Tabs.
🔴 Preview ao vivo da seção correspondente ao editar (split view).
🔴 Botão "Resetar para default" por campo (mantém um JSON de defaults).
🟡 Detectar tipo do valor (texto curto/longo/JSON/URL/cor) e renderizar input apropriado em vez de tudo textarea.
🟡 Histórico das últimas 5 edições por chave (snapshot em tabela `site_settings_history`).
🟢 Busca por chave/valor.

## 12. Contact Messages Manager

✅ Recém-refatorado (read/unread, CSV, mailto).
🔴 **Edge function de notificação por email** quando entra nova mensagem (Resend via Lovable AI / connector).
🟡 Arquivar (campo `archived_at`) + filtro Ativas/Arquivadas.
🟡 Tag/categorizar (`tag` ENUM: lead, spam, parceria, outro).
🟢 Resposta inline com template (mailto pré-preenchido).

## 13. Dashboard / Stats

🔴 **Health checks**: cards com "X projetos sem slug", "Y itens sem meta_description", "Z imagens sem alt", "W slugs duplicados", "V mensagens não lidas".
🔴 Atividade recente (últimos 10 `updated_at` cross-table).
🟡 Quick actions: "+ Novo projeto", "+ Novo artigo" direto do dashboard.
🟢 Mini-gráfico de mensagens recebidas por semana.

## 14. Infra do admin

🔴 **Audit log** (tabela `audit_log`: `user_id`, `entity`, `entity_id`, `action`, `diff_json`, `created_at`) + trigger genérico nas tabelas-chave.
🔴 **Histórico/versionamento simples**: snapshot do registro antes de UPDATE em `<entity>_history` (mín. Projects, Experiences, Articles, SiteSettings).
🟡 **Role-based UI**: hoje tudo é admin. Preparar para `editor` (sem deletar) usando `has_role`.
🟡 **Comando ⌘K** (Command palette) para navegar entre managers + criar item rápido.
🟢 Storybook leve dos managers para QA visual.

---

## Roadmap sugerido

```text
Sprint A — Consistência (1 sessão)
  • Transversal 0: is_visible padronizado + CompletenessIndicator nas listas
  • Validação SEO inline universal (Projects, Articles, Skills, Education)
  • Alt text obrigatório no ImageUploader
  • Duplicar 1-clique nos managers que faltam

Sprint B — Site Settings + Dashboard (1 sessão)
  • Agrupar SiteSettings por seção + tipo de input apropriado
  • Reset para default por campo
  • Health checks no DashboardStats + atividade recente

Sprint C — Conteúdo (1 sessão)
  • Projects: RichTextEditor nos campos longos + preview do card
  • Articles: estado de publicação + reading_time auto + agendar
  • Testimonials: limite de caracteres + preview

Sprint D — Operação (1–2 sessões)
  • Audit log + histórico simples (Projects/Experiences/Articles/SiteSettings)
  • Edge function de notificação de mensagem por email
  • Bulk actions nas listas grandes
  • Command palette ⌘K
```

---

## Próximo passo

Me confirma:
1. Quer seguir A → B → C → D ou priorizar um sprint específico?
2. Algum item para remover, ou prioridade absoluta (ex.: notificação por email da Sprint D)?
3. Posso começar pelo **Sprint A** assim que aprovar?