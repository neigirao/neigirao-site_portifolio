-- Seed the 6 project case studies from the static site
-- Uses ON CONFLICT DO NOTHING so running multiple times is safe
INSERT INTO public.projects (title, slug, description, meta_description, brand, tags, order_index)
VALUES
  (
    'Meu TIM APP — Nota 1,5 → 4,5',
    'tim-app',
    'Reposicionamento do Meu TIM de nota 1,5 para 4,5 estrelas em 18 meses. Scrum/Kanban no time de releases, reconstrução dos fluxos de self-care.',
    'Reposicionamento do Meu TIM de nota 1,5 para 4,5 estrelas em 18 meses. Scrum/Kanban no time de releases, reconstrução dos fluxos de self-care.',
    'TIM',
    ARRAY['Mobile', 'Self-care', 'Scrum', 'App Store'],
    0
  ),
  (
    'Ecommerce Previdência Privada — Icatu',
    'icatu-prev',
    'Jornada digital end-to-end para Previdência Privada na Icatu Seguros, com calculadora de aposentadoria e funil instrumentado por perfil de investidor.',
    'Jornada digital end-to-end para Previdência Privada na Icatu Seguros, com calculadora de aposentadoria e funil instrumentado por perfil de investidor.',
    'ICATU',
    ARRAY['Ecommerce', 'Fintech', 'Conversão', 'Analytics'],
    1
  ),
  (
    'Ecommerce Seguro de Vida — Icatu',
    'icatu-vida',
    'Construção do ecommerce de Seguro de Vida da Icatu — discovery end-to-end, observabilidade com Dynatrace e +15% de conversão online.',
    'Construção do ecommerce de Seguro de Vida da Icatu — discovery end-to-end, observabilidade com Dynatrace e +15% de conversão online.',
    'ICATU',
    ARRAY['Ecommerce', 'Seguro de Vida', 'Dynatrace', 'Conversão'],
    2
  ),
  (
    'Minha Oi APP — Reposicionamento',
    'oi-app',
    'Liderança do reposicionamento do Minha Oi APP como canal principal de self-care, reduzindo 40% dos custos operacionais e aumentando satisfação do cliente.',
    'Liderança do reposicionamento do Minha Oi APP como canal principal de self-care, reduzindo 40% dos custos operacionais e aumentando satisfação do cliente.',
    'OI',
    ARRAY['Mobile', 'Self-care', 'Telecom', 'Redução de Custos'],
    3
  ),
  (
    'Joice · Assistente Virtual — Oi',
    'oi-joice',
    'Roadmap e operação da Joice, assistente virtual da Oi. Pipeline de intenções priorizada por dados, handoff inteligente para atendimento humano.',
    'Roadmap e operação da Joice, assistente virtual da Oi. Pipeline de intenções priorizada por dados, handoff inteligente para atendimento humano.',
    'OI',
    ARRAY['Chatbot', 'NLP', 'Assistente Virtual', 'Telecom'],
    4
  ),
  (
    'Globoesporte.com — Analytics & Roadmap',
    'globo-ge',
    'Análise de dados e roadmap de integração entre Globo.com e Globoesporte.com. Operação de transmissões ao vivo de eventos esportivos.',
    'Análise de dados e roadmap de integração entre Globo.com e Globoesporte.com. Operação de transmissões ao vivo de eventos esportivos.',
    'GLOBO',
    ARRAY['Analytics', 'Live Streaming', 'Sports', 'Data'],
    5
  )
ON CONFLICT (slug) DO NOTHING;
