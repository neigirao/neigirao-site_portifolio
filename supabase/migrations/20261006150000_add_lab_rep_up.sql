INSERT INTO public.lab_projects (
  title, slug, category, description, why, url, is_visible, order_index
)
VALUES (
  'Rep Up',
  'rep-up',
  'App iOS · Treino · Vibe code',
  'App gratuito de musculação para iPhone: treino em duas perguntas, funciona sem sinal e passou pela revisão da Apple.',
  'Dados não são um output: são uma feature do produto.',
  'https://apps.apple.com/br/app/rep-up/id6812042720',
  true,
  10
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  is_visible = true;
