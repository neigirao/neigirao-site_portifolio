
-- Add Case Study fields to projects table
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS context text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS challenge text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS solution text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS results text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS learnings text;
