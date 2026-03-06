

# Correção: Seção de Experiência em Branco

## Causa raiz

A `ExperienceSection` usa `useScrollAnimation` que inicia com `opacity-0` e só muda para `opacity-100` quando o IntersectionObserver detecta a seção na viewport. Em certas condições (viewport pequeno, scroll rápido, iframe do preview), o observer não dispara e o conteúdo fica invisível mas ocupando espaço.

## Correção

Remover completamente o `useScrollAnimation` da `ExperienceSection.tsx`:
- Remover o import e uso do hook
- Remover as classes condicionais `opacity-0/opacity-100` e `translate-y-0/translate-y-8` do header e do Card
- O conteúdo ficará sempre visível imediatamente

| Arquivo | Ação |
|---------|------|
| `src/components/sections/ExperienceSection.tsx` | Remover useScrollAnimation, tornar conteúdo sempre visível |

