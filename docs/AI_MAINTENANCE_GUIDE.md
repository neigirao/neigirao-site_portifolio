# Guia de Manutenção para IA

Este documento é especificamente para sistemas de IA que farão manutenção automática deste projeto.

## 🎯 Objetivo do Projeto

Portfolio profissional de Nei Girão, Data Analyst e Cloud Specialist.

## 📍 Arquivos Críticos

### Ordem de Importância para Leitura

1. **README.md** - Entenda o projeto completo
2. **ARCHITECTURE.md** - Entenda a estrutura
3. **CONTRIBUTING.md** - Guia de como fazer mudanças
4. **src/data/portfolio.ts** - CONTEÚDO principal
5. **src/index.css** - DESIGN SYSTEM

## 🚨 Regras Invioláveis

### NUNCA FAÇA ISSO

```typescript
// ❌ Cores hardcoded
<div className="text-white bg-blue-500">

// ❌ Estilos inline
<div style={{ color: '#fff', background: '#012A4A' }}>

// ❌ Valores mágicos
<div className="w-[437px] h-[283px]">

// ❌ Classes não semânticas
<div className="bg-[#012A4A]">
```

### SEMPRE FAÇA ISSO

```typescript
// ✅ Use design system
<div className="text-foreground bg-primary">

// ✅ Use tokens semânticos
<div className="bg-gradient-primary">

// ✅ Use classes Tailwind padrão
<div className="w-full h-auto">

// ✅ Use variáveis CSS
<div className="bg-dark-navy">
```

## 🔄 Fluxo de Trabalho

### Para Atualizar Conteúdo

```
1. Abrir src/data/portfolio.ts
   ↓
2. Modificar array experiences ou skills
   ↓
3. Salvar
   ↓
4. Testar: npm run dev
```

### Para Modificar Estilos

```
1. Abrir src/index.css
   ↓
2. Modificar variáveis CSS na seção :root
   ↓
3. Se necessário, atualizar tailwind.config.ts
   ↓
4. Salvar e testar
```

### Para Adicionar Componente

```
1. Criar src/components/NovoComponente.tsx
   ↓
2. Se necessário, adicionar tipo em src/types/index.ts
   ↓
3. Documentar com JSDoc
   ↓
4. Usar em src/pages/Index.tsx
```

## 📊 Decision Tree para Mudanças

```
Pedido de Mudança
    │
    ├─ É conteúdo (texto, experiências, skills)?
    │   └─→ Editar src/data/portfolio.ts
    │
    ├─ É cor ou estilo visual?
    │   └─→ Editar src/index.css
    │
    ├─ É novo componente visual?
    │   ├─→ Criar em src/components/
    │   └─→ Adicionar tipos em src/types/
    │
    ├─ É nova seção?
    │   ├─→ Adicionar em src/pages/Index.tsx
    │   ├─→ Adicionar no menu de navegação
    │   └─→ Adicionar dados em src/data/ se necessário
    │
    └─ É funcionalidade complexa?
        └─→ Consultar ARCHITECTURE.md primeiro
```

## 🧪 Testes Obrigatórios

Após qualquer mudança:

```bash
# 1. Verificar TypeScript
npm run build

# 2. Testar visualmente
npm run dev
# Abrir http://localhost:8080

# 3. Testar responsividade
# - Desktop (1920px)
# - Tablet (768px)
# - Mobile (375px)

# 4. Testar navegação
# - Clicar em todos os links do menu
# - Verificar smooth scroll
# - Testar botões de contato
```

## 🎨 Guia Rápido de Classes

### Layout
```
max-w-7xl mx-auto px-6       // Container padrão
py-20                         // Espaçamento vertical seção
space-y-6                     // Espaço entre elementos
```

### Grid Responsivo
```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
```

### Tipografia
```
text-foreground               // Texto principal
text-muted-foreground         // Texto secundário
text-4xl font-bold           // Título de seção
text-xl                      // Subtítulo
```

### Cores de Background
```
bg-background                // Fundo principal
bg-card                      // Fundo de card
bg-primary                   // Fundo primário
bg-gradient-hero             // Gradiente hero
bg-gradient-primary          // Gradiente primário
```

### Botões
```
// Use o componente Button com variantes
<Button variant="default">   // Botão primário
<Button variant="outline">   // Botão outline
<Button variant="secondary"> // Botão secundário
```

### Animações
```
animate-fade-in-up          // Fade in de baixo para cima
animate-slide-in-left       // Slide da esquerda
animate-float               // Flutuação contínua
hover:shadow-glow           // Glow no hover
transition-all duration-300 // Transição suave
```

## 🔍 Debugging Checklist

### Build Falha
- [ ] Executar `npm install`
- [ ] Limpar cache: `rm -rf node_modules .vite`
- [ ] Verificar erros TypeScript
- [ ] Verificar importações

### Estilos Não Aplicam
- [ ] Verificar uso de `hsl(var(--variavel))`
- [ ] Verificar se variável existe em index.css
- [ ] Verificar se está usando classes do Tailwind
- [ ] Limpar cache do navegador

### Componente Não Renderiza
- [ ] Verificar importação
- [ ] Verificar exportação (default vs named)
- [ ] Verificar props TypeScript
- [ ] Verificar console para erros

## 📝 Template de Commit

```
Tipo: Descrição curta

Detalhes da mudança:
- O que foi alterado
- Por que foi alterado
- Impacto da mudança

Arquivos modificados:
- src/data/portfolio.ts
- src/components/NovoComponente.tsx

Testado:
- [x] Build passa
- [x] Visual OK
- [x] Responsivo OK
```

## 🚀 Deploy Quick Check

Antes de deploy:

- [ ] `npm run build` sem erros
- [ ] Testar `npm run preview`
- [ ] Verificar responsividade
- [ ] Testar todos os links
- [ ] Verificar SEO tags (index.html)
- [ ] Verificar imagens carregam
- [ ] Testar modo claro/escuro (se implementado)

## 💡 Dicas para IA

1. **Sempre preserve o design system existente**
2. **Nunca delete código sem entender o impacto**
3. **Documente todas as mudanças não triviais**
4. **Teste em mobile E desktop**
5. **Use TypeScript rigorosamente**
6. **Mantenha componentes pequenos (<200 linhas)**
7. **Siga os padrões estabelecidos**
8. **Quando em dúvida, consulte ARCHITECTURE.md**

## 📞 Emergency Contacts

Se algo quebrar seriamente:

1. Reverter último commit: `git revert HEAD`
2. Voltar para versão estável: `git checkout [commit-hash]`
3. Rebuild completo:
   ```bash
   rm -rf node_modules package-lock.json .vite dist
   npm install
   npm run build
   ```

## 🎓 Recursos de Aprendizado

- [React Docs](https://react.dev) - Para lógica de componentes
- [TypeScript Docs](https://www.typescriptlang.org/docs) - Para tipos
- [Tailwind Docs](https://tailwindcss.com/docs) - Para classes CSS
- [shadcn-ui Docs](https://ui.shadcn.com) - Para componentes UI

---

**Última atualização**: 2025-01-01  
**Versão do projeto**: 1.0.0  
**Mantenedor**: Nei Girão
