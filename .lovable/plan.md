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

## Pendentes
- FAQ editável via CMS (tabela `faqs` ou JSON em `site_settings`)
- Hero tags, subtitle e description editáveis via `site_settings`
- Subtítulos de seções editáveis via `site_settings`
- Footer description editável
- Navbar global em páginas standalone
- Scroll animations consistentes (Testimonials, Certifications)
- Project cards com imagem
- Admin: agrupar tabs em categorias
- Breadcrumb schema nas páginas de detalhe
- OG Image dinâmico nos artigos
- Formulário de contato real via edge function
- Admin: prevenção de navegação com alterações não salvas
- Admin: campo `is_visible` para experiences/skills/education
