

## Melhorias de Design - Portfolio Profissional para Recrutadores

Baseado em pesquisa de portfolios premiados de Product Managers (Aakash Gupta, Sitebuilder Report, CareerFoundry) e analise do site atual, aqui estao as melhorias para tornar o portfolio mais atraente para recrutadores de PM, Transformacao Digital e Dados.

---

### Problemas Identificados no Design Atual

1. **Sem foto profissional** - Recrutadores esperam ver o rosto; transmite confianca
2. **Badge limitado** - "Product Manager | Observabilidade" nao cobre vagas de Transformacao Digital nem Dados
3. **Botao "Admin" visivel** - Nao profissional; recrutadores nao devem ver isso
4. **Botao "Entre em Contato" invisivel** - CTA primario esta branco sobre fundo claro (contraste zero)
5. **FAQ generica** - Secao "Perguntas Frequentes" parece defensiva; melhor ser "Como Trabalho"
6. **Sem badge de disponibilidade** - AvailabilityBadge existe mas nao esta sendo usado no Hero
7. **Sem secao de logos** - Recrutadores querem ver rapidamente as empresas onde trabalhou
8. **Espacamento excessivo entre secoes** - Muito "ar" entre blocos, especialmente no dark mode

---

### Mudancas Planejadas

#### 1. Hero Section Redesign

- Adicionar foto profissional circular (placeholder ate upload real) com borda gradient
- Integrar AvailabilityBadge ("Aberto a novas oportunidades") abaixo do nome
- Atualizar badge para: "PRODUCT MANAGEMENT | TRANSFORMACAO DIGITAL | DADOS"
- Corrigir contraste do botao "Entre em Contato" (estava invisivel - branco sobre branco)
- Reduzir tamanho do nome (de 8xl para 6xl) para equilibrar com foto
- Adicionar barra de logos das empresas (Icatu, Oi, TIM, Globo) abaixo dos stats

**Arquivo:** `src/components/sections/HeroSection.tsx`

#### 2. Remover Admin da Navbar

- Remover botao "Admin" visivel na NavigationBar (desktop e mobile)
- Acesso continua disponivel via URL direta `/admin/login`

**Arquivo:** `src/components/sections/NavigationBar.tsx`

#### 3. Substituir FAQ por "Como Trabalho"

- Renomear secao de "Perguntas Frequentes" para "Como Trabalho"
- Substituir formato Q&A por 4 cards de metodologia:
  - "Data-Driven" - Decisoes baseadas em dados e metricas
  - "Agile Leadership" - Lideranca de squads ageis multidisciplinares
  - "Observabilidade" - Cultura de monitoramento e proatividade
  - "Discovery Continuo" - Validacao constante com usuarios e stakeholders
- Layout em grid 2x2 com icones e descricoes curtas

**Arquivo:** `src/components/sections/FAQSection.tsx` (renomear conteudo)

#### 4. Melhorar Skeleton Loading

- Adicionar animacao shimmer nos skeletons de carregamento
- CSS keyframe para efeito de brilho que percorre o skeleton

**Arquivo:** `src/index.css` (adicionar keyframe shimmer)

#### 5. Melhorar Secao de Contato

- Integrar AvailabilityBadge na secao de contato
- Hierarquia visual mais clara: Email como primario, LinkedIn secundario, WhatsApp terciario
- Adicionar texto "Disponivel para conversas sobre novas oportunidades"

**Arquivo:** `src/components/sections/ContactSection.tsx`

#### 6. Ajustes no Footer

- Integrar AvailabilityBadge no footer
- Remover link "Sitemap" (irrelevante para recrutadores)

**Arquivo:** `src/components/sections/FooterSection.tsx`

#### 7. Atualizar useActiveSection

- Adicionar "methodology" (antigo "faq") aos menuItems como "Como Trabalho"

**Arquivo:** `src/hooks/useActiveSection.tsx`

---

### Resumo de Arquivos Modificados

| Arquivo | Tipo de Mudanca |
|---------|----------------|
| `HeroSection.tsx` | Redesign com foto, badge atualizado, logos de empresas |
| `NavigationBar.tsx` | Remover botao Admin |
| `FAQSection.tsx` | Transformar em "Como Trabalho" com cards de metodologia |
| `ContactSection.tsx` | Adicionar AvailabilityBadge, melhorar hierarquia |
| `FooterSection.tsx` | AvailabilityBadge, limpar links |
| `useActiveSection.tsx` | Renomear FAQ para Como Trabalho no menu |
| `src/index.css` | Adicionar shimmer animation |

