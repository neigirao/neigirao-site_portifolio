

# Pendências Restantes

Do roadmap de 10 itens, **7 foram concluídos** e **3 ainda estão pendentes**:

## Concluídos
| # | Item | Status |
|---|------|--------|
| 1 | Sanitizar HTML no AboutSection (SafeHTML) | Feito |
| 2 | Unificar CV URL via useSiteSettings | Feito |
| 3 | Campo highlight_metric em Projects | Feito |
| 4 | Template Case Study (projects) | Feito |
| 5 | Sobre.tsx usar site_settings | Feito |
| 6 | Artigos na Home + nav | Feito |
| 9 | RichTextEditor no about_summary | Feito |
| 10 | llms.txt e about.txt (arquivos estáticos removidos, rotas apontam para edge functions) | Feito |

---

## Pendentes (3 itens)

### 7. heroStats hardcoded no HeroSection.tsx
Os 4 cards de stats ("15+ Anos", "35+ Membros", "6+ Produtos", "4 Grandes Empresas") estão fixos no código (linhas 7-12). Devem ser editáveis via CMS.

**Plano:** Armazenar como JSON na `site_settings` (chave `hero_stats`). Criar UI de edição no `SiteSettingsManager` com campos dinâmicos (valor + label). No `HeroSection`, ler do hook e usar fallback para os valores atuais.

### 8. Methodology cards hardcoded no AboutSection.tsx
Os 4 cards de metodologia (Data-Driven, Agile Leadership, Observabilidade, Discovery) estão fixos no código (linhas 20-41). Devem ser editáveis via CMS.

**Plano:** Armazenar como JSON na `site_settings` (chave `methodology_items`). Criar UI de edição no `SiteSettingsManager` com campos título + descrição + seletor de ícone. No `AboutSection`, ler do hook com fallback para os valores atuais.

### Adicional: Atualizar plan.md
Atualizar o arquivo `.lovable/plan.md` para refletir o estado atual (marcar concluídos, manter pendentes).

---

## Resumo de Implementação

| Item | Esforço |
|------|---------|
| heroStats editáveis via CMS | ~30 min |
| Methodology cards editáveis via CMS | ~30 min |
| Atualizar plan.md | 5 min |

Ambos seguem o mesmo padrão: JSON em `site_settings` + UI de edição no admin + leitura com fallback no front.

