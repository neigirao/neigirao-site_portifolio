
-- Create impact_metrics table
CREATE TABLE public.impact_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Star',
  color TEXT NOT NULL DEFAULT 'text-yellow-500',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.impact_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view impact_metrics"
  ON public.impact_metrics FOR SELECT USING (true);

CREATE POLICY "Admins can manage impact_metrics"
  ON public.impact_metrics FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_impact_metrics_updated_at
  BEFORE UPDATE ON public.impact_metrics
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial data
INSERT INTO public.impact_metrics (value, label, description, icon, color, order_index) VALUES
  ('1.5 → 4.5', 'Avaliação App', 'TIM Brasil - Melhoria na nota do app em 6 meses', 'Star', 'text-yellow-500', 0),
  ('+40%', 'Redução Custos', 'Icatu - Otimização de infraestrutura e processos', 'TrendingUp', 'text-emerald-500', 1),
  ('35+', 'Profissionais', 'Equipes gerenciadas em múltiplos projetos', 'Users', 'text-blue-500', 2),
  ('100%', 'Disponibilidade', 'SLA mantido em sistemas críticos', 'Target', 'text-purple-500', 3);

-- Create companies table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  abbr TEXT NOT NULL,
  logo_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view companies"
  ON public.companies FOR SELECT USING (true);

CREATE POLICY "Admins can manage companies"
  ON public.companies FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Seed initial data
INSERT INTO public.companies (name, abbr, order_index) VALUES
  ('Icatu Seguros', 'Icatu', 0),
  ('Oi', 'Oi', 1),
  ('TIM Brasil', 'TIM', 2),
  ('Globo', 'Globo', 3);
