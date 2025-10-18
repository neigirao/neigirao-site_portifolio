# Guia de Contribuição para IA

Este documento serve como guia para IAs que farão manutenção e evolução deste projeto.

## 🤖 Instruções para IA

### Princípios Fundamentais

1. **Preservar o Design System**: NUNCA adicione cores hardcoded
2. **Manter Consistência**: Siga os padrões estabelecidos
3. **Documentar Mudanças**: Atualize este documento ao fazer mudanças significativas
4. **Testar Responsividade**: Todas as mudanças devem funcionar em mobile e desktop

## 📋 Checklist para Modificações

### Antes de Fazer Qualquer Mudança

- [ ] Ler `README.md` para entender o projeto
- [ ] Ler `ARCHITECTURE.md` para entender a estrutura
- [ ] Identificar os arquivos que precisam ser modificados
- [ ] Verificar se há tipos TypeScript relacionados

### Ao Adicionar Novo Conteúdo

- [ ] Adicionar dados em `src/data/portfolio.ts`
- [ ] Criar ou atualizar interfaces em `src/types/index.ts`
- [ ] Criar componentes reutilizáveis se necessário
- [ ] Usar classes do design system existente
- [ ] Testar em diferentes tamanhos de tela

### Ao Modificar Estilos

- [ ] Modificar variáveis CSS em `src/index.css`
- [ ] Atualizar `tailwind.config.ts` se adicionar novas classes
- [ ] Testar modo claro e escuro
- [ ] Verificar contraste de cores (acessibilidade)
- [ ] Atualizar documentação de cores no README

### Ao Criar Novo Componente

- [ ] Criar arquivo em `src/components/`
- [ ] Adicionar interface TypeScript
- [ ] Documentar props com JSDoc
- [ ] Exportar corretamente
- [ ] Adicionar exemplos de uso em comentários

## 🎨 Guia de Estilos

### Cores

**SEMPRE USE TOKENS SEMÂNTICOS:**

```typescript
✅ CORRETO:
<div className="bg-primary text-primary-foreground">
<div className="bg-secondary text-secondary-foreground">
<div className="bg-accent text-accent-foreground">
<div className="text-foreground">
<div className="text-muted-foreground">
<div className="border-border">

❌ ERRADO:
<div className="bg-blue-500 text-white">
<div className="bg-[#012A4A] text-[#FFFFFF]">
<div className="text-gray-600">
```

### Gradientes

```typescript
✅ CORRETO:
<div className="bg-gradient-primary">
<div className="bg-gradient-hero">

❌ ERRADO:
<div className="bg-gradient-to-r from-blue-500 to-teal-400">
```

### Animações

```typescript
✅ CORRETO:
<div className="animate-fade-in-up">
<div className="hover:shadow-glow transition-all">

❌ ERRADO:
<div style={{ animation: 'fadeIn 0.5s' }}>
```

### Espaçamento e Layout

```typescript
✅ CORRETO:
<section className="py-20 px-6">
<div className="max-w-7xl mx-auto">
<div className="space-y-6">

✅ BOM PARA RESPONSIVIDADE:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## 📝 Padrões de Comentários

### Comentários em Componentes

```typescript
/**
 * Nome do Componente
 * 
 * Descrição breve do que o componente faz e quando usar.
 * 
 * @component
 * @example
 * ```tsx
 * <ComponentName prop1="value" prop2={123} />
 * ```
 */
interface ComponentNameProps {
  /** Descrição da prop */
  prop1: string;
  /** Descrição detalhada se necessário */
  prop2: number;
}

const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  // Lógica do componente
  return (
    <div>
      {/* Comentário sobre seção específica do JSX */}
    </div>
  );
};
```

### Comentários em Arquivos de Dados

```typescript
/**
 * Portfolio Data
 * 
 * Este arquivo contém todos os dados do portfolio.
 * Para atualizar o conteúdo do site, modifique os arrays abaixo.
 */

// Experiências Profissionais
// Adicione novas experiências no topo do array
export const experiences: Experience[] = [
  // Experiência mais recente primeiro
  {
    period: "2024-Presente",
    // ...
  }
];
```

## 🔧 Tarefas Comuns

### Como Adicionar Nova Experiência

```typescript
// 1. Abra src/data/portfolio.ts
// 2. Adicione no início do array experiences:

{
  period: "YYYY-YYYY",           // Ex: "2024-Presente"
  role: "Cargo",                 // Ex: "Senior Data Analyst"
  company: "Nome da Empresa",    // Ex: "Tech Corp"
  description: [                 // Array de strings
    "Responsabilidade 1",
    "Responsabilidade 2",
    "Conquista importante"
  ]
}
```

### Como Adicionar Nova Habilidade

```typescript
// 1. Se precisa de novo ícone, adicione em src/components/Icons.tsx:

export const NovoIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 24 24">
    {/* SVG paths */}
  </svg>
);

// 2. Importe em src/data/portfolio.ts:

import { NovoIcon } from '../components/Icons';

// 3. Adicione no array skills:

{
  name: "Nome da Skill",
  icon: NovoIcon
}
```

### Como Mudar Cor Principal

```css
/* src/index.css */

:root {
  /* Modifique os valores HSL */
  --primary: [H] [S%] [L%];      /* Ex: 203 100% 14% */
  --secondary: [H] [S%] [L%];    /* Ex: 199 100% 44% */
  
  /* Atualize gradientes se necessário */
  --gradient-primary: linear-gradient(
    135deg, 
    hsl([H] [S%] [L%]), 
    hsl([H] [S%] [L%])
  );
}

/* Repita para .dark se necessário */
```

### Como Adicionar Nova Seção

```typescript
// 1. Em src/pages/Index.tsx, adicione no array de navegação:

{["home", "about", "skills", "experience", "nova-secao", "contact"].map(...)}

// 2. Adicione a seção HTML:

<section id="nova-secao" className="py-20 bg-background">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
      Título da Seção
    </h2>
    {/* Conteúdo */}
  </div>
</section>

// 3. Se precisar de dados, adicione em src/data/portfolio.ts
// 4. Se precisar de tipos, adicione em src/types/index.ts
```

### Como Adicionar Novo Componente

```typescript
// 1. Crie arquivo src/components/NovoComponente.tsx

import React from 'react';
import type { TipoNecessario } from '../types';

/**
 * NovoComponente
 * 
 * Descrição do que faz
 */
interface NovoComponenteProps {
  /** Descrição da prop */
  prop1: string;
}

const NovoComponente: React.FC<NovoComponenteProps> = ({ prop1 }) => {
  return (
    <div className="...">
      {/* Conteúdo */}
    </div>
  );
};

export default NovoComponente;

// 2. Se precisar de novo tipo, adicione em src/types/index.ts
// 3. Use em src/pages/Index.tsx
```

## 🐛 Debugging

### Problemas Comuns e Soluções

#### Build Falha

```bash
# Limpar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install

# Limpar cache do Vite
rm -rf .vite
npm run dev
```

#### Estilos Não Aplicam

1. Verificar se está usando `hsl(var(--variavel))`
2. Verificar se variável existe em `src/index.css`
3. Limpar cache do navegador
4. Verificar se Tailwind está configurado corretamente

#### TypeScript Errors

1. Verificar se tipos estão importados
2. Verificar se interface está definida em `src/types/index.ts`
3. Executar `npm run build` para ver erros completos

#### Ícone Não Aparece

1. Verificar se ícone está em `src/components/Icons.tsx`
2. Verificar importação em `src/data/portfolio.ts`
3. Verificar se SVG tem viewBox correto

## 📊 Métricas de Qualidade

Ao fazer mudanças, garanta que:

- [ ] TypeScript não tem erros (`npm run build`)
- [ ] Código é responsivo (testar mobile e desktop)
- [ ] Cores usam design system
- [ ] Animações são suaves
- [ ] Contraste de cores é adequado (WCAG AA)
- [ ] Código está documentado

## 🚀 Deploy

Após fazer mudanças:

```bash
# 1. Testar localmente
npm run dev

# 2. Build de produção
npm run build

# 3. Testar build
npm run preview

# 4. Se tudo OK, commit e push
git add .
git commit -m "Descrição das mudanças"
git push
```

## 📚 Referências Rápidas

### Cores Disponíveis

- `primary` / `primary-foreground`
- `secondary` / `secondary-foreground`
- `accent` / `accent-foreground`
- `muted` / `muted-foreground`
- `dark-navy`, `light-blue`, `button-blue`, `grey-text`, `teal-accent`

### Animações Disponíveis

- `animate-fade-in-up`
- `animate-slide-in-left`
- `animate-float`

### Componentes shadcn Disponíveis

- Button, Card, Badge, Avatar
- Dialog, Sheet, Drawer
- Toast, Sonner
- Tabs, Accordion
- E mais...

## 🎓 Boas Práticas

1. **Sempre use TypeScript**: Defina tipos para tudo
2. **Componentes pequenos**: Máximo 200 linhas
3. **Props documentadas**: Use JSDoc
4. **Design system first**: Nunca hardcode estilos
5. **Responsivo por padrão**: Mobile-first
6. **Acessibilidade**: Sempre considere a11y
7. **Performance**: Evite re-renders desnecessários
8. **Semântica HTML**: Use tags corretas (section, article, nav)

## ❓ Quando em Dúvida

1. Consulte `README.md` para estrutura geral
2. Consulte `ARCHITECTURE.md` para padrões
3. Veja exemplos no código existente
4. Mantenha consistência com o código ao redor
5. Documente suas decisões em comentários
