

# Análise de Recrutador/RH + Plano de Melhorias

## Análise da Perspectiva de Recrutamento

### Ordem Atual
```
Hero → Impacto Mensurável → Projetos → Experiência → Skills → Certificações → Depoimentos → Artigos → FAQ → Sobre (Resumo + Metodologia + Educação) → Contato
```

### Problemas Identificados por um Recrutador

1. **"Sobre" está enterrado no final** — Recrutadores querem entender quem é o candidato logo após o Hero. O resumo profissional é uma das primeiras coisas que buscam.

2. **Experiência depois de Projetos é contra-intuitivo** — RH lê experiência cronológica antes de projetos. A trajetória profissional contextualiza os projetos.

3. **Certificações e Depoimentos separados de credenciais** — Certificações validam skills; depoimentos validam experiência. Devem estar próximos.

4. **FAQ antes do Sobre** — FAQ é informação auxiliar, não deveria preceder o resumo profissional.

5. **Falta de seção de Educação visível na nav** — Educação está escondida dentro do "Sobre", sem destaque próprio.

6. **Contato sem formulário real** — Apenas links mailto/WhatsApp/LinkedIn. Recrutadores preferem formulário direto.

7. **Navbar não reflete a nova ordem** — `useActiveSection` tem ordem hardcoded diferente do layout.

### Ordem Recomendada (Perspectiva RH)
```
Hero → Impacto Mensurável → Sobre (Resumo + Metodologia) → Experiência → Projetos → Skills → Certificações → Depoimentos → Artigos → Educação → FAQ → Contato
```

**Lógica**: Quem sou → O que fiz (carreira) → O que construí (projetos) → O que domino (skills + certificações) → O que dizem de mim → Conteúdo → Formação → Perguntas → Fale comigo.

---

## Plano de Implementação

### 1. Reordenar seções em `Index.tsx`
Nova sequência:
```
HeroSection → ImpactMetrics → AboutSection → ExperienceSection → ProjectsSection → SkillsSection → CertificationsSection → TestimonialsSection → RecentArticlesSection → EducationSection (nova seção separada) → FAQSection → ContactSection
```

### 2. Atualizar `useActiveSection.tsx`
- Ajustar `SECTION_IDS` e `menuItems` para refletir a nova ordem
- Adicionar "Educação" como item separado na nav se for extraída do About

### 3. Separar Educação do AboutSection
- Mover a renderização de Educação para fora do `AboutSection` no `Index.tsx` (já é passada como prop, basta renderizar em posição separada)
- `AboutSection` fica apenas com Resumo + Metodologia

### 4. Formulário de Contato real (item pendente do roadmap)
- Criar edge function `send-contact` que recebe nome, email, mensagem
- Adicionar formulário com validação na `ContactSection` (mantendo os botões atuais como alternativas)
- Usar Resend ou SMTP para enviar email

### 5. Atualizar `plan.md`
- Marcar formulário de contato como concluído
- Adicionar novos itens implementados

---

## Arquivos a Alterar

| Arquivo | Ação |
|---------|------|
| `src/pages/Index.tsx` | Reordenar seções, separar educação |
| `src/hooks/useActiveSection.tsx` | Atualizar ordem dos IDs e menu items |
| `src/components/sections/AboutSection.tsx` | Remover educação (manter resumo + metodologia) |
| `src/components/sections/EducationSection.tsx` | Já existe, usar diretamente no Index |
| `src/components/sections/ContactSection.tsx` | Adicionar formulário de contato |
| `supabase/functions/send-contact/index.ts` | Nova edge function para envio de email |
| `.lovable/plan.md` | Atualizar status |

