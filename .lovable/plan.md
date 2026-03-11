# Plano de Melhorias - Site & CMS

## Concluídos ✅
- Sanitizar HTML no AboutSection (SafeHTML)
- Unificar CV URL via useSiteSettings
- Campo highlight_metric em Projects
- Template Case Study (projects)
- Sobre.tsx usar site_settings
- Artigos na Home + nav
- RichTextEditor no about_summary
- llms.txt e about.txt (rotas apontam para edge functions)
- heroStats editáveis via CMS (site_settings)
- Methodology cards editáveis via CMS (site_settings)
- Ocultar seções vazias quando sem dados
- Fix WhatsApp FAB vs Back to Top overlap no mobile
- Melhorar contrastes de acessibilidade (white/50→70, white/40→60)
- Adicionar skip-to-content na home
- Link "Artigos" no footer
- FAQ editável via CMS (tabela `faqs` com RLS)
- Hero tags, subtitle e description editáveis via `site_settings`
- Subtítulos de seções editáveis via `site_settings`
- Footer description editável via `site_settings`
- Navbar global em páginas standalone ✅
- Scroll animations consistentes (Testimonials, Certifications) ✅
- Project cards com imagem ✅
- Admin: agrupar tabs em categorias ✅
- Breadcrumb schema nas páginas de detalhe ✅
- OG Image dinâmico nos artigos ✅
- Admin: prevenção de navegação com alterações não salvas ✅
- Admin: campo `is_visible` para experiences/skills/education ✅
- Reordenar seções na perspectiva de recrutador ✅
- Separar Educação do AboutSection (seção independente na nav) ✅
- Formulário de contato real (tabela contact_messages + validação) ✅
- Fix seção Experiência em branco (remover scroll animation) ✅

## Pendentes
- Admin: visualizar mensagens de contato recebidas ✅
- Envio de email via edge function (Resend/SMTP) ao receber contato
- Rate limiting no formulário de contato (anti-spam)
- Admin: exportar mensagens de contato (CSV) ✅
