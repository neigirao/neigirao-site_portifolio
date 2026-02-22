
## Plano: CMS Completo para Logos, Metricas e Projetos

### Contexto Atual

- **Skills**: 6 de 10 skills nao tem logo (Product Management, Observabilidade, Agile/Scrum, Data Analysis, Digital Products, Strategy). As 4 que tem usam SVGs locais (`/src/assets/`), que nao funcionam em producao.
- **Empresas no Hero**: Sao texto hardcoded ("Icatu", "Oi", "TIM", "Globo") - sem logos reais.
- **Experiencias**: Nenhuma tem `logo_url` preenchido no banco.
- **Metricas de Impacto**: Hardcoded em `ImpactMetrics.tsx` - nao editaveis pelo CMS.
- **Projetos**: Ja podem ser criados/editados pelo CMS, mas a pagina de detalhe (`ProjectDetail.tsx`) renderiza `description` como texto puro em vez de HTML rico.

---

### 1. Criar tabela `impact_metrics` no banco

Nova tabela para armazenar as metricas de impacto editaveis pelo CMS:

- `id` (uuid, PK)
- `value` (text) - ex: "+40%", "35+", "1.5 -> 4.5"
- `label` (text) - ex: "Reducao Custos"
- `description` (text) - ex: "Icatu - Otimizacao de infraestrutura"
- `icon` (text) - nome do icone Lucide (TrendingUp, Users, Star, Target)
- `color` (text) - classe CSS de cor (text-yellow-500, text-emerald-500)
- `order_index` (integer, default 0)
- `created_at`, `updated_at` (timestamps)

RLS: SELECT publico, ALL para admins.

Migrar os 4 valores hardcoded atuais como dados iniciais.

### 2. Criar tabela `companies` no banco

Nova tabela para as empresas que aparecem no Hero:

- `id` (uuid, PK)
- `name` (text) - nome completo
- `abbr` (text) - abreviacao
- `logo_url` (text, nullable) - URL da logo
- `order_index` (integer, default 0)
- `created_at` (timestamp)

RLS: SELECT publico, ALL para admins.

Migrar os 4 valores atuais (Icatu, Oi, TIM, Globo) como dados iniciais.

### 3. Componente CMS: MetricsManager

Novo arquivo `src/components/admin/MetricsManager.tsx`:

- Formulario com campos: value, label, description, icon (select com opcoes de icones Lucide), color (select com cores pre-definidas)
- Lista com drag-and-drop (SortableList)
- CRUD completo na tabela `impact_metrics`

### 4. Componente CMS: CompaniesManager

Novo arquivo `src/components/admin/CompaniesManager.tsx`:

- Formulario com campos: name, abbr, logo_url (ImageUploader)
- Lista com drag-and-drop
- CRUD completo na tabela `companies`

### 5. Atualizar AdminDashboard

- Adicionar 2 novas tabs: "Metricas" e "Empresas"
- Grid de tabs passa de 4 para 6 colunas

### 6. Atualizar ImpactMetrics.tsx

- Buscar dados da tabela `impact_metrics` em vez de hardcoded
- Mapear o campo `icon` (string) para componentes Lucide
- Manter layout e animacoes atuais

### 7. Atualizar HeroSection.tsx

- Buscar empresas da tabela `companies`
- Renderizar logos reais quando `logo_url` existir, fallback para texto `abbr`
- Receber dados como props do Index.tsx

### 8. Corrigir logo_url das Skills

- As 4 skills com logo apontam para `/src/assets/` (caminho local que nao funciona em build)
- Atualizar no banco para URLs publicas corretas (upload via CMS ou CDN logos)
- O CMS de Skills ja suporta ImageUploader para logo - basta o usuario fazer upload

### 9. Atualizar ProjectDetail.tsx para HTML rico

- A descricao dos projetos ja e editada com RichTextEditor no CMS
- Mas `ProjectDetail.tsx` renderiza como texto puro (`<p>{project.description}</p>`)
- Substituir por `SafeHTML` para renderizar HTML do editor rico
- Usar DOMPurify (ja instalado) para sanitizar

### 10. Atualizar Index.tsx

- Passar dados de `companies` e `impact_metrics` para os componentes
- Criar hooks `useCompanies()` e `useImpactMetrics()` em `usePortfolioData.tsx`

---

### Resumo de Arquivos

| Arquivo | Acao |
|---------|------|
| Migracao SQL | Criar tabelas `impact_metrics` e `companies`, inserir dados iniciais |
| `src/components/admin/MetricsManager.tsx` | Novo - CMS para metricas |
| `src/components/admin/CompaniesManager.tsx` | Novo - CMS para empresas |
| `src/pages/AdminDashboard.tsx` | Adicionar tabs Metricas e Empresas |
| `src/hooks/usePortfolioData.tsx` | Adicionar hooks `useCompanies` e `useImpactMetrics` |
| `src/hooks/useAdminData.tsx` | Adicionar `useAdminMetrics` e `useAdminCompanies` |
| `src/components/ImpactMetrics.tsx` | Buscar dados do banco em vez de hardcoded |
| `src/components/sections/HeroSection.tsx` | Buscar empresas do banco, renderizar logos |
| `src/pages/Index.tsx` | Conectar novos hooks aos componentes |
| `src/pages/ProjectDetail.tsx` | Renderizar descricao como HTML rico com SafeHTML |
