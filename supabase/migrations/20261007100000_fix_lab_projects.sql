-- Fix: add url column and upsert all lab projects with correct TEXT[] types
ALTER TABLE public.lab_projects ADD COLUMN IF NOT EXISTS url TEXT;

-- Placeholder projects (adivinha-flu, snap-cards, coaster-studio, comida-na-rua)
INSERT INTO public.lab_projects
  (title, slug, category, year, description, why, context, actions, outcomes, stack, brand, order_index, is_visible)
VALUES
(
  'Quem é o Tricolor?',
  'adivinha-flu',
  'Esporte · Jogo diário',
  '2025',
  'Jogo de adivinhação onde o usuário descobre qual jogador do Fluminense é o do dia com base em dicas progressivas. Inclui página de estatísticas e histórico de partidas.',
  'Estudo de mecânica daily-puzzle (estilo Wordle) aplicada a esporte.',
  'Apliquei a mecânica daily-puzzle (Wordle, Heardle) a um contexto de fandom esportivo. O usuário tem uma rodada por dia para acertar um jogador do Fluminense baseado em dicas progressivas — posição, idade, número de gols, foto pixelada. Inclui histórico de partidas e página de estatísticas do jogador revelado.',
  ARRAY['Defini o conjunto de dicas progressivas — da mais difícil pra mais óbvia — testando com torcedores reais.', 'Construí um seed determinístico por data para garantir que todo mundo joga o mesmo jogador no mesmo dia.', 'Integrei dados do jogador via API pública (ESPN, Globoesporte) para popular cards de estatística.', 'Adicionei sistema de streak e compartilhamento estilo Wordle (emoji grid).'],
  ARRAY['Daily puzzle funcional', 'Streak + share grid implementados', 'Base para jogadores de outros clubes'],
  ARRAY['React', 'Tailwind', 'API ESPN', 'Vite'],
  'LAB',
  0,
  true
),
(
  'Snap Cards',
  'snap-cards',
  'Jogo · Card battle',
  '2025',
  'Clone do Marvel Snap com mecânica de cartas, locais aleatórios e turnos curtos. Foco em balanço de baralho e satisfação de partida.',
  'Estudo de game design e estados complexos de UI.',
  'Marvel Snap é um caso clássico de design de jogo competitivo curto (6 turnos, 3 locais aleatórios). Quis entender por dentro como o estado do jogo se mantém consistente quando cartas têm efeitos que disparam em ordens diferentes e locais mudam regras a cada partida.',
  ARRAY['Reimplementei a engine de turnos com fila de eventos e resolução determinística.', 'Modelei locais e cartas como sistemas de efeitos plugáveis (cada um declara quando dispara).', 'Construí um deck builder com balanceamento básico por curva de custo de energia.', 'Adicionei animações de revelação de cartas que mantêm o ritmo do jogo original.'],
  ARRAY['Engine de turnos plugável', 'Deck builder funcional', '20+ cartas + 8 locais implementados'],
  ARRAY['React', 'Zustand', 'TypeScript', 'Framer Motion'],
  'LAB',
  1,
  true
),
(
  'Coaster Studio',
  'coaster-studio',
  'Jogo · Editor visual',
  '2025',
  'Editor de montanhas-russas onde o usuário desenha o traçado, escolhe vagões e simula a viagem com física básica em canvas.',
  'Estudo de física 2D e ferramenta de edição direta.',
  'Sempre quis entender melhor como editores diretos (Figma, Procreate) lidam com curvas suaves, controles de Bezier e interação ao vivo. Montanha-russa virou desculpa pra estudar curvas, física 2D simples e visualização em tempo real.',
  ARRAY['Implementei curvas de Bezier editáveis com pontos de controle arrastáveis.', 'Apliquei física básica (gravidade, conservação de energia) para simular o vagão.', 'Construí ferramenta de export do traçado como JSON para reabrir depois.', 'Adicionei modo ''câmera 1ª pessoa'' — a visão do passageiro durante a simulação.'],
  ARRAY['Editor direto funcional', 'Simulação física estável', 'Export/import de traçados'],
  ARRAY['Canvas API', 'Matter.js', 'React', 'TypeScript'],
  'LAB',
  2,
  true
),
(
  'Comida na Rua',
  'comida-na-rua',
  'Impacto social',
  '2024',
  'App para conectar voluntários e doadores ao trajeto de distribuição de comida para moradores de rua. Rotas, agendamento e relatos.',
  'Produto com uso real, fora do escopo de portfólio.',
  'Voluntários que distribuem comida para moradores de rua geralmente operam sem coordenação — duplicam trajetos, perdem voluntários por falta de informação, não conseguem mensurar impacto. O app tenta dar uma camada de coordenação leve, sem virar burocracia.',
  ARRAY['Mapeei o fluxo real de 2 grupos de voluntários no Rio de Janeiro.', 'Modelei agendamento de trajeto, check-in de voluntário e registro de pontos atendidos.', 'Construí MVP focado em mobile com mapa, lista de trajetos da semana e relatos pós-trajeto.', 'Validei com 3 voluntários por 2 semanas de uso real.'],
  ARRAY['MVP em produção com 3 grupos piloto', 'Trajetos cadastrados', 'Aprendizado: simplicidade > features'],
  ARRAY['React Native', 'Firebase', 'Mapbox', 'Expo'],
  'LAB',
  3,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  actions = EXCLUDED.actions,
  outcomes = EXCLUDED.outcomes,
  stack = EXCLUDED.stack,
  is_visible = true;

-- Lendas do Flu
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
  ARRAY['Defini três modos de jogo: adivinhe o jogador, por década e quiz das camisas.', 'Instrumentei o produto desde o início: funil de eventos, GA4 e Core Web Vitals antes de qualquer dashboard.', 'Criei páginas especiais com metodologia aberta, votação da torcida e comparador cara a cara.', 'Publiquei as estatísticas do jogo em uma página pública e li os números como comportamento, não como métricas.', 'Construí um servidor MCP para deixar assistentes de IA consultarem os dados do jogo.', 'Documentei cada decisão de produto em ADRs e mantive uma esteira de qualidade com testes, lint e CI.'],
  ARRAY['417 partidas jogadas por 94 jogadores únicos', '86,9% de acerto global; 59,6% no quiz de camisas', 'Servidor MCP no ar: assistentes de IA consultam o Lendas do Flu', 'App no ar na web e no iPhone via Capacitor'],
  ARRAY['React 18 + TypeScript', 'Vite', 'Zustand', 'TanStack Query', 'Supabase', 'Capacitor · iOS', 'GA4', 'Sentry', 'Vitest', 'Playwright', 'Lighthouse', 'Vercel Speed Insights', 'MCP · Model Context Protocol'],
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
  is_visible = true;

-- Rep Up
INSERT INTO public.lab_projects
  (title, slug, category, year, description, why, url, is_visible, order_index)
VALUES (
  'Rep Up',
  'rep-up',
  'App iOS · Treino · Vibe code',
  '2026',
  'App gratuito de musculação para iPhone: treino em duas perguntas, funciona sem sinal e passou pela revisão da Apple.',
  'Dados não são um output: são uma feature do produto.',
  'https://apps.apple.com/br/app/rep-up/id6812042720',
  true,
  10
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  year = EXCLUDED.year,
  description = EXCLUDED.description,
  url = EXCLUDED.url,
  is_visible = true;
