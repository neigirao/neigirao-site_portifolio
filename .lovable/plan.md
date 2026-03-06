

# Diagnóstico: Espaço entre Impacto Mensurável e Principais Projetos

## O que está acontecendo

A ordem das seções na página é: **Hero → Impacto Mensurável → Experiência Profissional → Principais Projetos**. A seção de Experiência Profissional contém 7+ experiências com descrições longas, ocupando uma altura enorme (~4000px). Isso cria a sensação de um grande "vazio" entre Impacto e Projetos.

Além disso, é possível que a animação de scroll (`opacity-0` → `opacity-100`) não dispare corretamente em certas condições, fazendo o conteúdo da Experience section ficar invisível mas ocupando espaço no layout.

## Proposta de correção (2 ações)

### 1. Mover Projetos para logo após Impacto Mensurável

Reordenar em `Index.tsx`:
```
Hero → Impacto → Projetos → Experiência → Skills → ...
```
Isso coloca as duas seções de "resultados" juntas, criando um fluxo visual mais coeso.

### 2. Limitar experiências na home com "Ver todas"

Na `ExperienceSection`, mostrar apenas as 3-4 primeiras experiências e adicionar um botão "Ver todas as experiências" que expande a lista ou navega para uma página dedicada. Isso reduz drasticamente a altura da seção.

## Arquivos alterados

| Arquivo | Ação |
|---------|------|
| `src/pages/Index.tsx` | Reordenar seções (Projects antes de Experience) |
| `src/components/sections/ExperienceSection.tsx` | Limitar a 4 experiências com botão expandir |

