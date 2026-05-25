-- Lab Projects: estudos pessoais do Nei Girão
CREATE TABLE IF NOT EXISTS public.lab_projects (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title            TEXT NOT NULL,
  slug             TEXT UNIQUE,
  category         TEXT,
  year             TEXT,
  description      TEXT,
  why              TEXT,
  context          TEXT,
  actions          JSONB DEFAULT '[]'::jsonb,
  outcomes         JSONB DEFAULT '[]'::jsonb,
  stack            JSONB DEFAULT '[]'::jsonb,
  brand            TEXT DEFAULT 'LAB',
  is_visible       BOOLEAN DEFAULT true,
  order_index      INTEGER DEFAULT 0,
  meta_title       TEXT,
  meta_description TEXT,
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.lab_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read lab_projects"
  ON public.lab_projects FOR SELECT USING (true);

CREATE POLICY "Authenticated write lab_projects"
  ON public.lab_projects FOR ALL USING (auth.role() = 'authenticated');
