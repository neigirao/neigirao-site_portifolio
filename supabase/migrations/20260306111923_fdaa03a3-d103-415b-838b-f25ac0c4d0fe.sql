
ALTER TABLE public.experiences ADD COLUMN is_visible boolean NOT NULL DEFAULT true;
ALTER TABLE public.skills ADD COLUMN is_visible boolean NOT NULL DEFAULT true;
ALTER TABLE public.education ADD COLUMN is_visible boolean NOT NULL DEFAULT true;
