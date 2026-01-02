-- Criar bucket para imagens do portfolio
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true);

-- RLS para admins fazerem upload
CREATE POLICY "Admins can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio-images' AND has_role(auth.uid(), 'admin'::app_role));

-- RLS para admins atualizarem
CREATE POLICY "Admins can update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio-images' AND has_role(auth.uid(), 'admin'::app_role));

-- RLS para admins deletarem
CREATE POLICY "Admins can delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio-images' AND has_role(auth.uid(), 'admin'::app_role));

-- Todos podem ver imagens (bucket publico)
CREATE POLICY "Public can view portfolio images"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

-- Adicionar campos SEO a todas as tabelas de conteudo
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS meta_title text;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS meta_description text;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS slug text UNIQUE;

ALTER TABLE projects ADD COLUMN IF NOT EXISTS meta_title text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS meta_description text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug text UNIQUE;

ALTER TABLE skills ADD COLUMN IF NOT EXISTS meta_title text;
ALTER TABLE skills ADD COLUMN IF NOT EXISTS meta_description text;
ALTER TABLE skills ADD COLUMN IF NOT EXISTS slug text UNIQUE;

ALTER TABLE education ADD COLUMN IF NOT EXISTS meta_title text;
ALTER TABLE education ADD COLUMN IF NOT EXISTS meta_description text;
ALTER TABLE education ADD COLUMN IF NOT EXISTS slug text UNIQUE;

-- Funcao para gerar slug a partir de texto
CREATE OR REPLACE FUNCTION public.generate_slug(input_text text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN lower(regexp_replace(
    regexp_replace(
      regexp_replace(input_text, '[àáâãäå]', 'a', 'gi'),
      '[èéêë]', 'e', 'gi'
    ),
    '[^a-z0-9\s-]', '', 'gi'
  ));
END;
$$;