
-- Create articles table for blog system
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  tags TEXT[] DEFAULT '{}'::TEXT[],
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMP WITH TIME ZONE,
  meta_title TEXT,
  meta_description TEXT,
  reading_time_minutes INTEGER DEFAULT 5,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Anyone can view published articles
CREATE POLICY "Anyone can view published articles"
ON public.articles
FOR SELECT
USING (status = 'published');

-- Admins can manage all articles
CREATE POLICY "Admins can manage articles"
ON public.articles
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Indexes
CREATE INDEX idx_articles_slug ON public.articles (slug);
CREATE INDEX idx_articles_status ON public.articles (status);
CREATE INDEX idx_articles_published_at ON public.articles (published_at DESC);

-- Trigger for updated_at
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
