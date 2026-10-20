-- GRANTs explícitos para o Data API (Supabase deixa de auto-conceder em 30/out/2026:
-- https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically).
-- Modelo do site: leitura pública (anon) + CMS admin (authenticated) + edge (service_role).
-- RLS segue sendo o porteiro (policies "Anyone can view" / has_role admin já existem).
GRANT SELECT ON public.articles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.articles TO authenticated;
GRANT ALL ON public.articles TO service_role;
GRANT SELECT ON public.certifications TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.certifications TO authenticated;
GRANT ALL ON public.certifications TO service_role;
GRANT SELECT ON public.companies TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.companies TO authenticated;
GRANT ALL ON public.companies TO service_role;
GRANT SELECT ON public.education TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.education TO authenticated;
GRANT ALL ON public.education TO service_role;
GRANT SELECT ON public.experiences TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.experiences TO authenticated;
GRANT ALL ON public.experiences TO service_role;
GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
GRANT SELECT ON public.impact_metrics TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.impact_metrics TO authenticated;
GRANT ALL ON public.impact_metrics TO service_role;
GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
GRANT SELECT ON public.skills TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.skills TO authenticated;
GRANT ALL ON public.skills TO service_role;
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
-- Formulário de contato: visitante (anon) só insere; leitura/gestão é do admin.
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
