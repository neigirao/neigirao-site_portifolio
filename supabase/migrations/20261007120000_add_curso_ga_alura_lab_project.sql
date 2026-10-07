-- Add Curso Google Analytics Alura lab project card
INSERT INTO public.lab_projects
  (title, slug, category, year, description, why, context, actions, outcomes, stack, url, brand, order_index, is_visible)
VALUES (
  'Curso de Google Analytics na Alura',
  'curso-google-analytics-alura',
  'Ensino · Web analytics',
  '2017',
  'Criei e gravei como instrutor da Alura um curso de introdução ao Google Analytics, com um negócio real como exemplo do começo ao fim.',
  'Explicar o básico e sempre dar algo a mais. Foi a regra de cada aula.',
  'Em 2017, propus e gravei o curso Google Analytics: Medindo o sucesso do seu site na Alura. O curso foi pensado para dois públicos — quem nunca usou a ferramenta e quem só conhecia o gráfico básico de visitantes — usando o MusicDot, um e-commerce real, como exemplo do início ao fim.',
  ARRAY[
    'Propus cinco cursos de Google Analytics para a Alura (da introdução ao avançado, KPIs, e-commerce e funis). Começamos pela introdução.',
    'Escrevi e revisei o roteiro em encontros presenciais com o coordenador didático da Alura, nascendo a regra do básico com algo a mais.',
    'Escolhemos o MusicDot, negócio real do cofundador da Alura, como exemplo único do curso inteiro — dando contexto real a cada relatório.',
    'Gravamos as aulas no estúdio da Alura no Rio de Janeiro e respondi dúvidas no fórum após o lançamento.'
  ],
  ARRAY[
    'Curso publicado na Alura em 2017',
    'Dois públicos atendidos na mesma aula: iniciantes e quem já conhecia a ferramenta',
    'Exemplo único e real (MusicDot) do começo ao fim'
  ],
  ARRAY['Google Analytics', 'Universal Analytics', 'Alura', 'MusicDot'],
  'https://cursos.alura.com.br/user/neigirao',
  'LAB',
  20,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  why = EXCLUDED.why,
  context = EXCLUDED.context,
  actions = EXCLUDED.actions,
  outcomes = EXCLUDED.outcomes,
  stack = EXCLUDED.stack,
  url = EXCLUDED.url,
  brand = EXCLUDED.brand,
  order_index = EXCLUDED.order_index,
  is_visible = true;
