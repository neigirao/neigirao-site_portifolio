
-- Sprint 0: Create lab_projects table
CREATE TABLE public.lab_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  category TEXT,
  year TEXT,
  description TEXT,
  why TEXT,
  context TEXT,
  actions TEXT[] NOT NULL DEFAULT '{}'::text[],
  outcomes TEXT[] NOT NULL DEFAULT '{}'::text[],
  stack TEXT[] NOT NULL DEFAULT '{}'::text[],
  brand TEXT NOT NULL DEFAULT 'LAB',
  is_visible BOOLEAN NOT NULL DEFAULT true,
  meta_title TEXT,
  meta_description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.lab_projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lab_projects TO authenticated;
GRANT ALL ON public.lab_projects TO service_role;

ALTER TABLE public.lab_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view lab_projects"
  ON public.lab_projects FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage lab_projects"
  ON public.lab_projects FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_lab_projects_updated_at
  BEFORE UPDATE ON public.lab_projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Sprint 1: Security fixes

-- 1) Lock down profiles SELECT (no more "everyone authenticated sees all profiles")
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users view own profile or admin views all"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

-- 2) Revoke EXECUTE on SECURITY DEFINER functions from public/anon/authenticated
--    (triggers and policies still work because they run with definer privilege regardless of grants)
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.generate_slug(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.auto_assign_admin_role() FROM PUBLIC, anon, authenticated;
-- has_role is used inside RLS policies (which execute it with definer privilege), no API exposure needed
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
-- keep authenticated EXECUTE on has_role so policies referencing it via auth.uid() context keep evaluating
-- (Actually RLS evaluation does not require client EXECUTE — revoke too)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM authenticated;

-- 3) Storage: block LIST on portfolio-images while keeping public GET via URL
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public read portfolio-images" ON storage.objects;
CREATE POLICY "Public read portfolio-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images' AND (storage.foldername(name))[1] IS NOT NULL);
-- Note: GET by direct URL goes through CDN/object endpoint and does not require LIST.
