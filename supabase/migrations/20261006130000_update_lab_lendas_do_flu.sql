-- Upsert the Lendas do Flu lab project entry
INSERT INTO public.lab_projects
  (title, slug, category, year, description, why, context, actions, outcomes, stack, url, brand, order_index, is_visible)
VALUES
(
  'Lendas do Flu',
  'lendas-do-flu',
  'Quiz · Fluminense · Dados',
  '2026',
  'Quiz sobre ídolos e camisas históricas do Fluminense, feito com vibe code. 417 partidas e 94 jogadores viraram um laboratório de comportamento.',
  'Dados não são um output: são uma feature do produto.',
  'O Lendas do Flu é um quiz em que o torcedor tenta acertar o nome do jogador e o ano da camisa. Fiz em poucas horas com vibe code. Por trás, ele virou um laboratório de comportamento — com ranking, especiais (Maior Atacante, Maior Treinador), admin completo com BI, monitoramento e um servidor MCP.',
  '["Defini três modos de jogo: adivinhe o jogador, por década e quiz das camisas.", "Instrumentei o produto desde o início: funil de eventos, GA4 e Core Web Vitals antes de qualquer dashboard.", "Criei páginas especiais com metodologia aberta, votação da torcida e comparador cara a cara.", "Publiquei as estatísticas do jogo em uma página pública e li os números como comportamento, não como métricas.", "Construí um servidor MCP para deixar assistentes de IA consultarem os dados do jogo.", "Documentei cada decisão de produto em ADRs e mantive uma esteira de qualidade com testes, lint e CI."]'::jsonb,
  '["417 partidas jogadas por 94 jogadores únicos", "86,9% de acerto global; 59,6% no quiz de camisas", "Servidor MCP no ar: assistentes de IA consultam o Lendas do Flu", "App no ar na web e no iPhone via Capacitor"]'::jsonb,
  '["React 18 + TypeScript", "Vite", "Zustand", "TanStack Query", "Supabase", "Capacitor · iOS", "GA4", "Sentry", "Vitest", "Playwright", "Lighthouse", "Vercel Speed Insights", "MCP · Model Context Protocol"]'::jsonb,
  'https://lendasdoflu.com.br',
  'LAB',
  0,
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
  is_visible = EXCLUDED.is_visible;
