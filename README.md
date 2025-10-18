# Nei Girão - Portfolio Profissional

Portfolio profissional de Nei Girão, Data Analyst e Cloud Specialist, construído com React, TypeScript, e Tailwind CSS.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Design System](#design-system)
- [Componentes](#componentes)
- [Como Personalizar](#como-personalizar)
- [Desenvolvimento](#desenvolvimento)

## 🎯 Visão Geral

Este é um portfolio moderno e responsivo que apresenta:
- **Hero Section**: Apresentação com call-to-actions
- **About**: Informações sobre o profissional
- **Skills**: Habilidades técnicas com ícones customizados
- **Experience**: Linha do tempo de experiências profissionais
- **Contact**: Links para contato e redes sociais

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes React reutilizáveis
│   ├── ui/              # Componentes shadcn-ui (não modificar diretamente)
│   ├── ExperienceItem.tsx   # Item de experiência profissional
│   ├── SkillCard.tsx        # Card de habilidade
│   └── Icons.tsx            # Todos os ícones SVG do projeto
│
├── data/                # Dados do portfolio
│   └── portfolio.ts     # ⚠️ ARQUIVO PRINCIPAL PARA EDITAR CONTEÚDO
│
├── types/               # Definições TypeScript
│   └── index.ts         # Interfaces e tipos do projeto
│
├── pages/               # Páginas da aplicação
│   ├── Index.tsx        # Página principal do portfolio
│   └── NotFound.tsx     # Página 404
│
├── hooks/               # React hooks customizados
│   ├── use-mobile.tsx   # Hook para detectar mobile
│   └── use-toast.ts     # Hook para notificações
│
├── lib/                 # Utilitários
│   └── utils.ts         # Funções auxiliares
│
├── index.css           # ⚠️ DESIGN SYSTEM - Cores, gradientes, animações
└── App.tsx             # Configuração de rotas e providers
```

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utility-first
- **Vite** - Build tool e dev server
- **shadcn-ui** - Componentes UI acessíveis
- **React Router** - Navegação
- **Lucide React** - Ícones (opcional)

## 🎨 Design System

### Cores Principais

Todas as cores são definidas em `src/index.css` usando HSL:

```css
--dark-navy: 203 100% 14%      /* Azul escuro principal */
--light-blue: 199 100% 44%     /* Azul claro secundário */
--button-blue: 204 100% 31%    /* Azul para botões */
--grey-text: 210 7% 46%        /* Texto secundário */
--teal-accent: 168 76% 42%     /* Accent teal */
```

### Gradientes

```css
--gradient-primary: linear-gradient(135deg, hsl(199 100% 44%), hsl(168 76% 42%))
--gradient-hero: linear-gradient(180deg, hsl(203 100% 14%), hsl(204 100% 20%))
```

### Sombras

```css
--shadow-elegant: 0 10px 40px -10px hsl(203 100% 14% / 0.3)
--shadow-glow: 0 0 60px hsl(168 76% 42% / 0.2)
```

### Animações Disponíveis

- `animate-fade-in-up` - Fade in com movimento para cima
- `animate-slide-in-left` - Slide da esquerda
- `animate-float` - Efeito de flutuação contínua

## 🧩 Componentes

### ExperienceItem

Exibe um item de experiência profissional na timeline.

```typescript
interface ExperienceItemProps {
  experience: Experience;
}
```

**Props:**
- `experience`: Objeto com período, cargo, empresa e descrição

### SkillCard

Card animado para exibir habilidades.

```typescript
interface SkillCardProps {
  skill: Skill;
  index: number;
}
```

**Props:**
- `skill`: Objeto com nome e ícone
- `index`: Índice para delay de animação

### Icons

Todos os ícones SVG estão centralizados em `src/components/Icons.tsx`.

**Ícones disponíveis:**
- `BriefcaseIcon`, `LaptopIcon`, `BuildingIcon`, `LightbulbIcon`
- `DonutChartIcon`, `BarChartIcon`, `PercentageIcon`
- `CertificateIcon`, `EducationIcon`
- `DynatraceIcon`, `GoogleAnalyticsIcon`, `AzureIcon`, `GrafanaIcon`
- `MailIcon`, `LinkedInIcon`, `GithubIcon`, `CheckIcon`

## ✏️ Como Personalizar

### 1. Atualizar Conteúdo do Portfolio

Edite `src/data/portfolio.ts`:

```typescript
// Adicionar nova experiência
export const experiences: Experience[] = [
  {
    period: "2024-Presente",
    role: "Seu Cargo",
    company: "Sua Empresa",
    description: [
      "Responsabilidade 1",
      "Responsabilidade 2",
      "Responsabilidade 3"
    ]
  },
  // ... outras experiências
];

// Adicionar nova habilidade
export const skills: Skill[] = [
  { 
    name: "Nome da Skill", 
    icon: NomeDoIcon  // Certifique-se que o ícone existe em Icons.tsx
  },
  // ... outras skills
];
```

### 2. Modificar Cores do Design

Edite `src/index.css` na seção `:root`:

```css
:root {
  --primary: [H] [S%] [L%];  /* Use valores HSL */
  --secondary: [H] [S%] [L%];
  /* ... outras cores */
}
```

### 3. Adicionar Nova Seção

1. Adicione a seção em `src/pages/Index.tsx`
2. Adicione o link no menu de navegação
3. Adicione o ID da seção no array de navegação

```typescript
// No menu
{["home", "about", "skills", "experience", "nova-secao", "contact"].map((section) => (...))}

// Nova seção
<section id="nova-secao" className="py-20">
  {/* Conteúdo */}
</section>
```

### 4. Customizar Informações de Contato

Edite em `src/pages/Index.tsx` na seção Contact:

```typescript
// Email
onClick={() => window.location.href = "mailto:seu.email@exemplo.com"}

// LinkedIn
onClick={() => window.open("https://linkedin.com/in/seu-usuario", "_blank")}

// GitHub
onClick={() => window.open("https://github.com/seu-usuario", "_blank")}
```

### 5. Adicionar Novo Ícone

1. Adicione o SVG em `src/components/Icons.tsx`:

```typescript
export const NovoIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    {/* Paths do SVG */}
  </svg>
);
```

2. Importe e use em `src/data/portfolio.ts`

## 💻 Desenvolvimento

### Instalação

```bash
npm install
```

### Executar em desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:8080

### Build para produção

```bash
npm run build
```

### Preview do build

```bash
npm run preview
```

## 📝 Notas Importantes para IA

### ⚠️ Arquivos Críticos para Edição de Conteúdo

1. **src/data/portfolio.ts** - Experiências e habilidades
2. **src/index.css** - Todas as cores e estilos do design system
3. **src/pages/Index.tsx** - Estrutura e textos das seções

### ⚠️ Arquivos que NÃO devem ser editados diretamente

- `src/components/ui/*` - Componentes shadcn-ui (regenerar se necessário)
- `package.json` - Use ferramentas específicas para gerenciar dependências

### 🎯 Padrões de Código

1. **Use sempre o design system**: Nunca hardcode cores como `text-white` ou `bg-blue-500`
2. **Use tokens semânticos**: `text-foreground`, `bg-primary`, etc.
3. **Componentes devem ser TypeScript**: Com interfaces bem definidas
4. **Animações devem usar classes do Tailwind**: Definidas em `index.css`

### 🔍 Debugging

- Verifique o console do navegador para erros
- Use React DevTools para inspecionar componentes
- Tailwind DevTools para visualizar classes aplicadas

## 📄 Licença

© 2025 Nei Girão. Todos os direitos reservados.
