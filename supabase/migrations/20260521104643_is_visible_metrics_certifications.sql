ALTER TABLE public.impact_metrics
  ADD COLUMN IF NOT EXISTS is_visible BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE public.certifications
  ADD COLUMN IF NOT EXISTS is_visible BOOLEAN NOT NULL DEFAULT true;
