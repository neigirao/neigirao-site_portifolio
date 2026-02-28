

# Plano de Implementação — 6 Ações

---

## 1. Rodar Lighthouse / PageSpeed Insights

**Situação**: Não é possível rodar Lighthouse diretamente no ambiente Lovable. O que posso fazer:
- Usar o browser tool para navegar no site publicado e capturar screenshots
- Analisar manualmente o código para problemas de performance (imagens sem lazy loading, bundles grandes, etc.)
- Recomendar que você rode manualmente em https://pagespeed.web.dev com a URL publicada `https://neigirao.lovable.app`

**Alternativa implementável**: Posso criar uma seção no admin que exibe um link direto para o PageSpeed Insights com a URL do site pré-preenchida + um checklist de boas práticas já implementadas.

---

## 2. Upload de foto do Hero no Admin

**Situação atual**: O Hero exibe `<User>` icon placeholder (linha 53 do HeroSection). Não existe tabela `site_settings`.

**Implementação**:
- Criar tabela `site_settings` (key/value) com migration:
  ```sql
  CREATE TABLE site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
  );
  -- RLS: anyone can read, admins can write
  ```
- Criar componente `SiteSettingsManager` no admin com campo de upload para `hero_photo_url` e `cv_file_url`
- Criar hook `useSiteSettings()` que busca os settings
- Atualizar `HeroSection.tsx` para usar a foto do banco (fallback para `<User>` icon)
- Adicionar tab "Configurações" no AdminDashboard

---

## 3. Corrigir logos de empresas no Hero

**Situação atual**: As empresas TÊM `logo_url` populada no banco. O problema está no CSS:
```
className="h-8 w-auto object-contain brightness-0 invert opacity-50"
```
Os filtros `brightness-0 invert` transformam a imagem em branco (ok para fundo escuro), mas `opacity-50` torna muito transparente. Além disso, imagens JPG com fundo branco ficam invisíveis com `invert`.

**Implementação**:
- Remover `brightness-0 invert` e usar `filter: grayscale(1) brightness(2)` ou simplesmente exibir os logos com opacidade razoável
- Adicionar `loading="lazy"` e `onError` fallback para texto

---

## 4. Upload de CV no Admin

**Situação atual**: O botão "Download CV" aponta para `/cv-nei-girao.pdf` hardcoded (arquivo estático em `public/`).

**Implementação**:
- Adicionar campo `cv_file_url` na tabela `site_settings`
- No `SiteSettingsManager`, adicionar upload de PDF (aceitar `application/pdf`) para o bucket `portfolio-images` (pasta `cv/`)
- Atualizar `HeroSection.tsx` e `Sobre.tsx` para ler a URL do CV do banco (fallback para `/cv-nei-girao.pdf`)

---

## 5. Editar textos do "Impacto Mensurável" no CMS

**Situação atual**: Os textos do header da seção ("Impacto Mensurável", "Resultados concretos que demonstram...") estão HARDCODED no `ImpactMetrics.tsx`. Os cards individuais já são editáveis via `MetricsManager`.

**Implementação**:
- Adicionar campos na `site_settings`: `impact_title`, `impact_subtitle`, `impact_badge_text`
- Atualizar `ImpactMetrics.tsx` para ler esses textos do banco (fallback para valores atuais)
- Adicionar esses campos no `SiteSettingsManager`

---

## 6. Editar seção "Sobre" no CMS

**Situação atual**: Todo o texto da `AboutSection.tsx` é HARDCODED — resumo profissional, metodologia, nomes de empresas. A página `/sobre` (Sobre.tsx) também tem textos hardcoded.

**Implementação**:
- Adicionar campos na `site_settings`: `about_summary` (rich text), `about_subtitle`, `about_tools`
- Os 4 cards de metodologia podem virar uma tabela separada ou campos JSON na `site_settings`
- Atualizar `AboutSection.tsx` para ler do banco
- Adicionar campos editáveis no `SiteSettingsManager` com RichTextEditor para o resumo

---

## Resumo técnico de implementação

| Ação | Tipo | Arquivos afetados |
|------|------|-------------------|
| Tabela `site_settings` | Migration | Nova tabela + RLS |
| Foto do Hero | Admin + Frontend | `SiteSettingsManager.tsx` (novo), `HeroSection.tsx`, `AdminDashboard.tsx` |
| Logos empresas | Frontend | `HeroSection.tsx` (CSS fix) |
| Upload CV | Admin + Frontend | `SiteSettingsManager.tsx`, `HeroSection.tsx`, `Sobre.tsx` |
| Textos Impacto | Admin + Frontend | `SiteSettingsManager.tsx`, `ImpactMetrics.tsx` |
| Textos Sobre | Admin + Frontend | `SiteSettingsManager.tsx`, `AboutSection.tsx` |
| Hook | Frontend | `useSiteSettings.tsx` (novo), `usePortfolioData.tsx` |

Nova tab "Configurações" no admin centralizará: foto do Hero, CV, textos do Impacto e textos do Sobre.

