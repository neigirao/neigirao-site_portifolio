import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DbArticle {
  id: string;
  title: string;
  slug: string | null;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  tags: string[] | null;
  status: string;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  reading_time_minutes: number | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

const queryOptions = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 30,
  refetchOnWindowFocus: false,
  retry: 2,
};

// Public: only published articles
export function usePublishedArticles() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['articles-published'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      if (error) throw error;
      return data as DbArticle[];
    },
    ...queryOptions,
  });
  return { articles: data || [], isLoading, error: error?.message || null };
}

// Public: single article by slug
export function useArticleDetail(slug: string) {
  return useQuery({
    queryKey: ['article-detail', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();
      if (error) throw error;
      return data as DbArticle | null;
    },
    enabled: !!slug,
    ...queryOptions,
  });
}

// Estimate reading time from HTML content
export function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
