-- Add Observabilidade case to projects section
INSERT INTO public.projects (title, slug, description, meta_description, brand, tags, order_index, is_visible)
VALUES (
  'Observabilidade, Release e Delivery — Icatu',
  'nei-girao-observabilidade-icatu',
  'Criação da área de Observabilidade da Icatu Seguros: dashboards em tempo real no Grafana, ciclo de release padronizado e uma métrica única de disponibilidade das aplicações.',
  'Criação da área de Observabilidade da Icatu Seguros: dashboards em tempo real no Grafana, ciclo de release padronizado e uma métrica única de disponibilidade das aplicações.',
  'ICATU',
  ARRAY['Observabilidade', 'Grafana', 'Dynatrace', 'Release', 'Application Insights'],
  6,
  true
)
ON CONFLICT (slug) DO NOTHING;
