-- Seed: 4 projetos Lab do Nei Girão (dados de content.jsx)
INSERT INTO public.lab_projects
  (title, slug, category, year, description, why, context, actions, outcomes, stack, brand, order_index)
VALUES
(
  'Quem é o Tricolor?',
  'adivinha-flu',
  'Esporte · Jogo diário',
  '2025',
  'Jogo de adivinhação onde o usuário descobre qual jogador do Fluminense é o do dia com base em dicas progressivas. Inclui página de estatísticas e histórico de partidas.',
  'Estudo de mecânica daily-puzzle (estilo Wordle) aplicada a esporte.',
  'Apliquei a mecânica daily-puzzle (Wordle, Heardle) a um contexto de fandom esportivo. O usuário tem uma rodada por dia para acertar um jogador do Fluminense baseado em dicas progressivas — posição, idade, número de gols, foto pixelada. Inclui histórico de partidas e página de estatísticas do jogador revelado.',
  '["Defini o conjunto de dicas progressivas — da mais difícil pra mais óbvia — testando com torcedores reais.", "Construí um seed determinístico por data para garantir que todo mundo joga o mesmo jogador no mesmo dia.", "Integrei dados do jogador via API pública (ESPN, Globoesporte) para popular cards de estatística.", "Adicionei sistema de streak e compartilhamento estilo Wordle (emoji grid)."]'::jsonb,
  '["Daily puzzle funcional", "Streak + share grid implementados", "Base para jogadores de outros clubes"]'::jsonb,
  '["React", "Tailwind", "API ESPN", "Vite"]'::jsonb,
  'LAB',
  0
),
(
  'Snap Cards',
  'snap-cards',
  'Jogo · Card battle',
  '2025',
  'Clone do Marvel Snap com mecânica de cartas, locais aleatórios e turnos curtos. Foco em balanço de baralho e satisfação de partida.',
  'Estudo de game design e estados complexos de UI.',
  'Marvel Snap é um caso clássico de design de jogo competitivo curto (6 turnos, 3 locais aleatórios). Quis entender por dentro como o estado do jogo se mantém consistente quando cartas têm efeitos que disparam em ordens diferentes e locais mudam regras a cada partida.',
  '["Reimplementei a engine de turnos com fila de eventos e resolução determinística.", "Modelei locais e cartas como sistemas de efeitos plugáveis (cada um declara quando dispara).", "Construí um deck builder com balanceamento básico por curva de custo de energia.", "Adicionei animações de revelação de cartas que mantêm o ritmo do jogo original."]'::jsonb,
  '["Engine de turnos plugável", "Deck builder funcional", "20+ cartas + 8 locais implementados"]'::jsonb,
  '["React", "Zustand", "TypeScript", "Framer Motion"]'::jsonb,
  'LAB',
  1
),
(
  'Coaster Studio',
  'coaster-studio',
  'Jogo · Editor visual',
  '2025',
  'Editor de montanhas-russas onde o usuário desenha o traçado, escolhe vagões e simula a viagem com física básica em canvas.',
  'Estudo de física 2D e ferramenta de edição direta.',
  'Sempre quis entender melhor como editores diretos (Figma, Procreate) lidam com curvas suaves, controles de Bezier e interação ao vivo. Montanha-russa virou desculpa pra estudar curvas, física 2D simples e visualização em tempo real.',
  '["Implementei curvas de Bezier editáveis com pontos de controle arrastáveis.", "Apliquei física básica (gravidade, conservação de energia) para simular o vagão.", "Construí ferramenta de export do traçado como JSON para reabrir depois.", "Adicionei modo ''câmera 1ª pessoa'' — a visão do passageiro durante a simulação."]'::jsonb,
  '["Editor direto funcional", "Simulação física estável", "Export/import de traçados"]'::jsonb,
  '["Canvas API", "Matter.js", "React", "TypeScript"]'::jsonb,
  'LAB',
  2
),
(
  'Comida na Rua',
  'comida-na-rua',
  'Impacto social',
  '2024',
  'App para conectar voluntários e doadores ao trajeto de distribuição de comida para moradores de rua. Rotas, agendamento e relatos.',
  'Produto com uso real, fora do escopo de portfólio.',
  'Voluntários que distribuem comida para moradores de rua geralmente operam sem coordenação — duplicam trajetos, perdem voluntários por falta de informação, não conseguem mensurar impacto. O app tenta dar uma camada de coordenação leve, sem virar burocracia.',
  '["Mapeei o fluxo real de 2 grupos de voluntários no Rio de Janeiro.", "Modelei agendamento de trajeto, check-in de voluntário e registro de pontos atendidos.", "Construí MVP focado em mobile com mapa, lista de trajetos da semana e relatos pós-trajeto.", "Validei com 3 voluntários por 2 semanas de uso real."]'::jsonb,
  '["MVP em produção com 3 grupos piloto", "Trajetos cadastrados", "Aprendizado: simplicidade > features"]'::jsonb,
  '["React Native", "Firebase", "Mapbox", "Expo"]'::jsonb,
  'LAB',
  3
)
ON CONFLICT (slug) DO NOTHING;
