

# Auditoria Completa do Portfolio — 6 Perspectivas

---

## 1. ENGENHEIRO DE SOFTWARE (Código, Performance, Infraestrutura)

### Problemas Críticos
| # | Item | Impacto |
|---|------|---------|
| 1 | **Foto de perfil é placeholder** — Hero exibe ícone genérico `<User>` ao invés de foto real | Prejudica credibilidade em todas as perspectivas |
| 2 | **Logos de empresas não carregados** — `companies` todas com `logo_url: null`, exibem apenas texto "Icatu", "Oi", "TIM", "Globo" | Visual amador |
| 3 | **Logos de skills parciais** — 4 de 10 skills sem `logo_url`, usando fallback de letra/ícone genérico | Inconsistência visual |
| 4 | **Experiências sem logo** — todas 7 experiências com `logo_url: null` | Timeline visualmente pobre |
| 5 | **Certifications e Testimonials vazios** — tabelas criadas mas sem dados, seções não renderizam (`if (!length) return null`) | Features fantasma |
| 6 | **`highlight_metric` de todos projetos é null** — campo existe mas nenhum projeto foi populado | Feature implementada mas inútil |
| 7 | **OG Image genérica** — `https://lovable.dev/opengraph-image-p98pqg.png` no `index.html` e `SEOHead.tsx` | Link compartilhado mostra imagem do Lovable |
| 8 | **Sem favicon personalizado** — `public/favicon.ico` provavelmente padrão Lovable | Branding inconsistente na aba do browser |
| 9 | **Admin tabs overflow** — 8 tabs em `grid-cols-8` ficam apertadas em telas menores que 1200px | UX do CMS quebra |
| 10 | **ContactSection expõe telefone real** — número pessoal hardcoded no botão | Privacidade |

### Melhorias Técnicas
| # | Item |
|---|------|
| 11 | Implementar lazy loading de imagens com `loading="lazy"` nos logos de empresas/skills |
| 12 | Adicionar `ErrorBoundary` individual por seção (hoje wrapa tudo junto) |
| 13 | `ExperienceItem` faz `.split('. ')` para criar bullets — frágil com HTML rich text do CMS |
| 14 | `ProjectCard` não possui campo `company` no banco, só no componente — tag de empresa nunca renderiza |
| 15 | `Sobre.tsx` usa `dangerouslySetInnerHTML` na description sem sanitização (DOMPurify importado mas não usado aqui) |

---

## 2. UX DESIGNER (Usabilidade, Fluxo, Interação)

### Problemas Críticos
| # | Item |
|---|------|
| 16 | **Seção FAQ sem valor real** — perguntas autorreferenciais ("Quais habilidades de Nei Girão?") não ajudam o visitante humano |
| 17 | **Hero muito longo** — foto + 3 tags + nome + subtítulo + descrição + 2 botões + 4 stats + logos = requer scroll imediato antes de ver conteúdo real |
| 18 | **Sem micro-interações nos cards de projeto** — hover genérico, sem preview ou imagem |
| 19 | **Seção "Sobre" muito abaixo** — está depois de Skills, Certifications, Testimonials e FAQ; headhunters não scrollam tanto |
| 20 | **Botão WhatsApp flutuante com `animate-pulse` infinito** — distrai continuamente |
| 21 | **Nav ativa destaca "Contato" no footer** — a seção de contato é muito alta (py-28), distorce o highlight |
| 22 | **Scroll-to-section sem offset** — ao clicar na nav, o título da seção fica atrás da navbar fixa |
| 23 | **Cards de Educação sem link** — diferente de Experiências e Skills que têm páginas de detalhe |
| 24 | **Mobile: menu tem botão "Download CV" redundante** — já existe no Hero |

### Melhorias UX
| # | Item |
|---|------|
| 25 | Adicionar skeleton/loading state visível ao carregar dados iniciais (hoje carrega rápido mas pode flash) |
| 26 | Smooth scroll offset deveria compensar a altura da navbar (`scrollMarginTop` ou offset no `scrollIntoView`) |
| 27 | Adicionar breadcrumb visual nas páginas de detalhe (`/experiencia/:slug`, `/projeto/:slug`) |
| 28 | Footer poderia ter link para `/admin/login` discreto ou removê-lo completamente |

---

## 3. DESIGNER VISUAL (Estética, Consistência, Branding)

### Problemas Críticos
| # | Item |
|---|------|
| 29 | **Ícone genérico no lugar da foto** — o elemento mais importante de um portfolio pessoal não tem foto |
| 30 | **Sem imagens nos ProjectCards** — campo `image_url` existe mas está null; cards são 100% texto |
| 31 | **Paleta dark-mode only no Hero e ImpactMetrics** — seções claras entre duas escuras cria efeito "sanduíche" visual desconcertante |
| 32 | **Logos de empresas como texto puro** — "Icatu Oi TIM Globo" é visualmente fraco |
| 33 | **Seções de Certificações e Depoimentos invisíveis** — sem dados para renderizar |
| 34 | **Inconsistência de section headers** — Certificações e Depoimentos usam badge+titulo, outras usam titulo+divider+subtitulo |
| 35 | **Sem ilustrações/ícones diferenciadores** — todas as seções são texto+card, monótonas |

### Melhorias Visuais
| # | Item |
|---|------|
| 36 | Adicionar gradiente ou padrão sutil de background diferente em seções alternadas |
| 37 | Usar fotos/screenshots nos ProjectCards (`image_url`) para quebrar monotonia visual |
| 38 | Criar um favicon personalizado com as iniciais "NG" |
| 39 | Adicionar animação de entrada staggered nos cards de certificação/depoimento |

---

## 4. HEADHUNTER TECH / DIGITAL (Conteúdo, Credibilidade, Conversão)

### Problemas Críticos
| # | Item |
|---|------|
| 40 | **Sem foto profissional** — elimina credibilidade imediatamente; headhunters associam com perfil incompleto |
| 41 | **Sem métricas nos projetos** — `highlight_metric` null em todos; projetos sem números concretos não impressionam |
| 42 | **Sem certificações visíveis** — CSM, PSPO, Dynatrace, etc. não foram cadastradas; seção não renderiza |
| 43 | **Sem recomendações/depoimentos** — tabela vazia; social proof inexistente |
| 44 | **Sem "disponibilidade"** — badge "Aberto a oportunidades" foi removido do Hero; headhunter não sabe se está procurando |
| 45 | **Descrições de experiência muito longas** — bullets não são impactantes ("Mapeei KPIs para estratégia de precision marketing com Adobe SiteCatalyst, Ensighten e Responsys") — jargão técnico sem resultado |
| 46 | **Sem indicação de senioridade** — "Product Manager (PM)" e "Product Owner (PO)" não comunicam nível de senioridade |
| 47 | **Sem location/remote preference** — headhunters filtram por localização e modelo de trabalho |
| 48 | **Download CV leva para PDF estático** — pode estar desatualizado vs dados do site |

### Melhorias de Conversão
| # | Item |
|---|------|
| 49 | Adicionar badge de disponibilidade no Hero ("Aberto a novas oportunidades" ou "Disponível para projetos") configurável pelo CMS |
| 50 | Reformular bullets de experiência: iniciar com resultado quantificável, depois contexto |
| 51 | Adicionar link para PDF do CV direto no schema Person (`mainEntityOfPage`) |
| 52 | Adicionar campo `seniority_level` nas experiências (Junior/Pleno/Senior/Lead/Manager) |

---

## 5. REDATOR / COPYWRITER (Tom, Clareza, Persuasão)

### Problemas Críticos
| # | Item |
|---|------|
| 53 | **Subtítulo do Hero genérico** — "Liderança estratégica em produtos digitais, dados e transformação" é vago; não diferencia de milhares de PMs |
| 54 | **Descrição do Hero redundante com subtítulo** — "Product Manager e Estrategista de Dados com 15+ anos…" repete a mesma ideia |
| 55 | **FAQ autorreferencial** — "Quais são as principais habilidades de Nei Girão?" é SEO-bait, não conteúdo real para visitantes |
| 56 | **"Impacto Mensurável" sem contexto narrativo** — números soltos ("1.5 → 4.5", "+40%") sem explicar o quê, onde, quando |
| 57 | **Títulos de seção genéricos** — "Experiência Profissional", "Principais Projetos", "Habilidades" são boilerplate |
| 58 | **CTA "Entre em Contato" fraco** — não comunica benefício ou urgência |
| 59 | **Seção "Sobre" intitulada "Sobre"** — deveria ter headline de impacto, não label de navegação |
| 60 | **Texto do footer muito curto** — "Product Manager especializado em Observabilidade e Produtos Digitais" é repetitivo |

### Melhorias de Copy
| # | Item |
|---|------|
| 61 | Reescrever subtítulo do Hero com diferencial claro (ex: "Transformei a nota do Meu TIM de 1.5 para 4.5 na App Store") |
| 62 | Reformular FAQ para perguntas que um recrutador/cliente realmente faria |
| 63 | Adicionar micro-copy nos cards de métricas explicando o resultado |
| 64 | CTA primário deveria ser orientado a benefício ("Agendar Conversa" ou "Discutir seu Projeto") |

---

## 6. ESPECIALISTA EM SEO (Indexação, Schemas, Autoridade)

### Problemas Críticos
| # | Item |
|---|------|
| 65 | **OG Image genérica do Lovable** — CTR em redes sociais prejudicado; não personaliza o compartilhamento |
| 66 | **Canonical URL aponta para lovable.app** — se houver domínio custom, precisa atualizar `BASE_URL` |
| 67 | **Páginas de detalhe sem breadcrumb schema** — `/experiencia/:slug` não inclui `BreadcrumbList` individual |
| 68 | **Sitemap edge function** — precisa verificar se já removeu hash fragments e incluiu `/llms.txt`, `/about.txt` |
| 69 | **Sem `ProfilePage` schema** — para página `/sobre`, o tipo `Person` não indica que é uma página sobre |
| 70 | **Skills sem `meta_title` e `meta_description` populados** — páginas de detalhe podem ter SEO fraco |
| 71 | **Sem internal linking strategy** — experiências não linkam para projetos relacionados e vice-versa |
| 72 | **`/contato` sem form** — Google prefere páginas de contato com formulário; botões de link externo perdem authority |
| 73 | **Sem `lastmod` no sitemap** — sem data de última modificação nos URLs |

### Melhorias SEO
| # | Item |
|---|------|
| 74 | Criar OG Image personalizada com nome + título + foto |
| 75 | Adicionar `SeeAlso` / "Projetos Relacionados" nas páginas de detalhe |
| 76 | Popular `meta_title` e `meta_description` em todas as skills, experiências e projetos via CMS |
| 77 | Adicionar formulário de contato real na página `/contato` (pode usar edge function para enviar email) |
| 78 | Implementar `lastmod` no sitemap baseado em `updated_at` dos registros |

---

## RESUMO PRIORIZADO POR IMPACTO

### Prioridade 1 — Sem isto o portfolio prejudica mais do que ajuda
1. **Adicionar foto profissional real** no Hero (substituir ícone User)
2. **Popular Certificações** no banco (CSM, PSPO, Dynatrace, etc.)
3. **Popular Depoimentos** no banco (2-3 quotes do LinkedIn)
4. **Preencher `highlight_metric`** em todos os projetos
5. **Subir logos** de empresas e experiências

### Prioridade 2 — Diferenciação competitiva
6. Reescrever copy do Hero (subtítulo + descrição)
7. Adicionar badge de disponibilidade configurável
8. Popular `meta_title`/`meta_description` de todas as entidades
9. Criar OG Image personalizada
10. Adicionar imagens nos ProjectCards

### Prioridade 3 — Polimento profissional
11. Reformular FAQ para perguntas reais de recrutadores
12. Adicionar formulário de contato em `/contato`
13. Favicon personalizado "NG"
14. Corrigir scroll offset da navbar
15. Internal linking entre experiências/projetos/skills

### Prioridade 4 — Nice to have
16. Versão bilíngue (PT/EN)
17. Campo de senioridade nas experiências
18. Breadcrumbs visuais nas páginas de detalhe
19. `lastmod` no sitemap
20. Lazy loading de imagens

---

### O que o CMS precisa para funcionar (ações no admin, não no código)
- Upload de foto profissional (novo campo ou asset)
- Cadastrar 4-6 certificações com logos
- Cadastrar 2-3 depoimentos com fotos e links LinkedIn
- Preencher `highlight_metric` nos 6 projetos existentes
- Upload de logos para as 4 empresas
- Upload de logos para as 7 experiências
- Preencher `meta_title` e `meta_description` em skills, experiências e projetos

