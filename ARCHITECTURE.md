# Arquitetura do Projeto

Este documento descreve a arquitetura e os padrões de design utilizados no portfolio.

## 🏗️ Visão Geral da Arquitetura

### Padrão de Arquitetura

O projeto segue uma **arquitetura baseada em componentes** com separação clara de responsabilidades:

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  (src/pages/Index.tsx)              │
│  - Composição de seções             │
│  - Gerenciamento de estado local    │
│  - Navegação entre seções           │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│       Component Layer               │
│  (src/components/)                  │
│  - ExperienceItem                   │
│  - SkillCard                        │
│  - Icons                            │
│  - UI Components (shadcn)           │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│         Data Layer                  │
│  (src/data/portfolio.ts)            │
│  - Experiências profissionais       │
│  - Habilidades técnicas             │
│  - Fonte única de verdade           │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│         Type Layer                  │
│  (src/types/index.ts)               │
│  - Interfaces TypeScript            │
│  - Contratos de dados               │
└─────────────────────────────────────┘
```

## 📂 Estrutura de Pastas Detalhada

### `/src/components`

**Propósito**: Componentes React reutilizáveis

- **ExperienceItem.tsx**: Renderiza um item individual na timeline de experiências
  - Aceita um objeto `Experience`
  - Usa design de timeline com markers e linhas
  - Responsivo por padrão

- **SkillCard.tsx**: Card animado para exibir habilidades
  - Aceita um objeto `Skill` e um índice
  - Animação escalonada baseada no índice
  - Hover effects para interatividade

- **Icons.tsx**: Centralização de todos os ícones SVG
  - Todos os ícones são componentes React
  - Props padrão para customização
  - Facilita manutenção e reutilização

- **/ui**: Componentes shadcn-ui
  - ⚠️ Não editar diretamente
  - Regenerar usando CLI do shadcn se necessário

### `/src/data`

**Propósito**: Dados estáticos do portfolio

- **portfolio.ts**: Fonte única de verdade para conteúdo
  - Array `experiences`: Lista de experiências profissionais
  - Array `skills`: Lista de habilidades técnicas
  - Facilita edições de conteúdo sem tocar em componentes

### `/src/types`

**Propósito**: Definições TypeScript compartilhadas

- **index.ts**: Interfaces principais
  - `Experience`: Estrutura de experiência profissional
  - `Skill`: Estrutura de habilidade
  - `Education`: Estrutura de educação (para futuro uso)

### `/src/pages`

**Propósito**: Componentes de página

- **Index.tsx**: Página principal do portfolio
  - Composição de todas as seções
  - Gerenciamento de navegação smooth scroll
  - Estado local para seção ativa

- **NotFound.tsx**: Página 404
  - Tratamento de rotas inexistentes

## 🎨 Sistema de Design

### Hierarquia de Estilos

```
1. Design Tokens (src/index.css)
   ↓
2. Tailwind Config (tailwind.config.ts)
   ↓
3. Component Classes (className props)
```

### Variáveis CSS Customizadas

Todas as cores, gradientes e sombras são definidas como variáveis CSS em `src/index.css`:

```css
:root {
  /* Cores base */
  --primary: ...;
  --secondary: ...;
  
  /* Cores customizadas */
  --dark-navy: ...;
  --light-blue: ...;
  
  /* Gradientes */
  --gradient-primary: ...;
  
  /* Sombras */
  --shadow-elegant: ...;
}
```

### Modo Escuro

O projeto suporta modo escuro através da classe `.dark`:

```css
.dark {
  --background: ...;
  --foreground: ...;
  /* ... outras variáveis */
}
```

## 🔄 Fluxo de Dados

### Renderização de Dados

```
portfolio.ts (Data)
    ↓
Index.tsx (Page)
    ↓
map() → Components (ExperienceItem, SkillCard)
    ↓
Rendered UI
```

### Exemplo:

```typescript
// 1. Dados definidos em data/portfolio.ts
export const experiences: Experience[] = [...]

// 2. Importados na página
import { experiences } from '@/data/portfolio'

// 3. Renderizados com map
{experiences.map((exp, idx) => (
  <ExperienceItem key={idx} experience={exp} />
))}
```

## 🎯 Padrões de Código

### Nomenclatura de Componentes

- **PascalCase** para componentes: `ExperienceItem`, `SkillCard`
- **camelCase** para funções: `scrollToSection`, `handleClick`
- **kebab-case** para IDs HTML: `experience-section`, `contact-form`
- **SNAKE_CASE** para constantes: `API_URL`, `MAX_ITEMS`

### Estrutura de Componente

```typescript
/**
 * Descrição do componente
 * 
 * @param {Object} props - Props do componente
 * @param {Type} props.propName - Descrição da prop
 */
interface ComponentProps {
  propName: Type;
}

const Component: React.FC<ComponentProps> = ({ propName }) => {
  // 1. Hooks
  const [state, setState] = useState();
  
  // 2. Funções
  const handleAction = () => {};
  
  // 3. Effects
  useEffect(() => {}, []);
  
  // 4. Render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
};

export default Component;
```

### Design System Usage

❌ **Evite:**
```typescript
<button className="text-white bg-blue-500 hover:bg-blue-600">
```

✅ **Use:**
```typescript
<Button variant="primary" className="hover:opacity-90">
```

### Animações

❌ **Evite:**
```typescript
<div style={{ animation: 'fadeIn 0.5s' }}>
```

✅ **Use:**
```typescript
<div className="animate-fade-in-up">
```

## 🔌 Integrações

### shadcn-ui

- Componentes instalados sob demanda
- Customizados através de `src/components/ui`
- Tema controlado por variáveis CSS

### Tailwind CSS

- Config centralizado em `tailwind.config.ts`
- Extend do tema padrão
- Classes utilitárias customizadas

### React Router

- Routing simples com BrowserRouter
- Página 404 como catch-all

## 📊 Performance

### Otimizações Implementadas

1. **Code Splitting**: Componentes carregados sob demanda
2. **Lazy Loading**: Imagens e seções abaixo da dobra
3. **Tree Shaking**: Apenas ícones importados são incluídos
4. **CSS Purging**: Tailwind remove classes não utilizadas em produção

### Métricas Alvo

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Cumulative Layout Shift: < 0.1

## 🧪 Testing Strategy (Futuro)

Estrutura preparada para:

1. **Unit Tests**: Componentes individuais
2. **Integration Tests**: Fluxos de navegação
3. **E2E Tests**: Jornada completa do usuário

## 🚀 Deploy

### Build Process

```bash
npm run build
```

Gera:
- `dist/` - Arquivos estáticos otimizados
- Minificação de JS/CSS
- Hash de assets para cache busting

### Requisitos de Hospedagem

- Servidor de arquivos estáticos
- Suporte a SPA routing (rewrite para index.html)
- HTTPS recomendado

## 📝 Manutenção

### Adicionando Nova Seção

1. Defina dados em `src/data/` (se aplicável)
2. Crie componente em `src/components/` (se reutilizável)
3. Adicione seção em `src/pages/Index.tsx`
4. Adicione link de navegação
5. Atualize tipos em `src/types/` (se necessário)

### Atualizando Design System

1. Modifique variáveis em `src/index.css`
2. Atualize `tailwind.config.ts` se necessário
3. Teste em modo claro e escuro
4. Verifique acessibilidade de contraste

### Troubleshooting Comum

| Problema | Solução |
|----------|---------|
| Cores não aplicadas | Verificar se está usando `hsl(var(--color))` |
| Ícone não aparece | Verificar importação em `Icons.tsx` |
| Build falha | Limpar `node_modules` e reinstalar |
| Animação não funciona | Verificar se classe está em `index.css` |

## 🔐 Segurança

- Sem secrets no código frontend
- Sanitização de inputs (se formulários forem adicionados)
- HTTPS obrigatório em produção
- Headers de segurança recomendados

## 📚 Recursos Adicionais

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn-ui Docs](https://ui.shadcn.com)
