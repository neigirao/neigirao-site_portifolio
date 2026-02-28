
-- Create site_settings table (key/value store for configurable content)
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings
CREATE POLICY "Anyone can view site_settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Only admins can manage settings
CREATE POLICY "Admins can manage site_settings"
ON public.site_settings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default values
INSERT INTO public.site_settings (key, value) VALUES
  ('hero_photo_url', ''),
  ('cv_file_url', '/cv-nei-girao.pdf'),
  ('impact_title', 'Impacto Mensurável'),
  ('impact_subtitle', 'Resultados concretos que demonstram capacidade de entrega e liderança'),
  ('impact_badge_text', 'Resultados Comprovados'),
  ('about_summary', ''),
  ('about_subtitle', ''),
  ('about_methodology', '[]');
