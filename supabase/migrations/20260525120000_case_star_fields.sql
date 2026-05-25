-- Estrutura STAR para cases de experiência
ALTER TABLE public.experiences
  ADD COLUMN IF NOT EXISTS case_title     TEXT,
  ADD COLUMN IF NOT EXISTS case_challenge TEXT,
  ADD COLUMN IF NOT EXISTS case_solution  TEXT;
