ALTER TABLE public.experiences
  ADD COLUMN IF NOT EXISTS excerpt TEXT;
