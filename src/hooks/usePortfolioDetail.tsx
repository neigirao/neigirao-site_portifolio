import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Generate slug from text (client-side fallback)
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Types
interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  logo_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  slug: string | null;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  link: string | null;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  slug: string | null;
  highlight_metric: string | null;
  context: string | null;
  challenge: string | null;
  solution: string | null;
  results: string | null;
  learnings: string | null;
  brand: string | null;
  project_subtitle: string | null;
}

interface Skill {
  id: string;
  name: string;
  logo_url: string | null;
  category: string | null;
  meta_title: string | null;
  meta_description: string | null;
  slug: string | null;
}

// Hook for single experience by slug or id
export function useExperienceDetail(slugOrId: string) {
  return useQuery({
    queryKey: ['experience', slugOrId],
    queryFn: async () => {
      // First try by slug
      let { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('slug', slugOrId)
        .maybeSingle();

      // If not found by slug, try by id
      if (!data && !error) {
        const result = await supabase
          .from('experiences')
          .select('*')
          .eq('id', slugOrId)
          .maybeSingle();
        data = result.data;
        error = result.error;
      }

      if (error) throw error;
      return data as Experience | null;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

// Hook for single project by slug or id
export function useProjectDetail(slugOrId: string) {
  return useQuery({
    queryKey: ['project', slugOrId],
    queryFn: async () => {
      let { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slugOrId)
        .maybeSingle();

      if (!data && !error) {
        const result = await supabase
          .from('projects')
          .select('*')
          .eq('id', slugOrId)
          .maybeSingle();
        data = result.data;
        error = result.error;
      }

      if (error) throw error;
      return data as Project | null;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

// Hook for single skill by slug or id
export function useSkillDetail(slugOrId: string) {
  return useQuery({
    queryKey: ['skill', slugOrId],
    queryFn: async () => {
      let { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('slug', slugOrId)
        .maybeSingle();

      if (!data && !error) {
        const result = await supabase
          .from('skills')
          .select('*')
          .eq('id', slugOrId)
          .maybeSingle();
        data = result.data;
        error = result.error;
      }

      if (error) throw error;
      return data as Skill | null;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

// Hook for related experiences (same company)
export function useRelatedExperiences(company: string, currentId: string) {
  return useQuery({
    queryKey: ['related-experiences', company, currentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select('id, role, company, period, slug')
        .eq('company', company)
        .neq('id', currentId)
        .order('order_index', { ascending: true })
        .limit(3);

      if (error) throw error;
      return data || [];
    },
    enabled: !!company && !!currentId,
    staleTime: 1000 * 60 * 10,
  });
}

// Hook for related projects (same tag)
export function useRelatedProjects(tags: string[] | null, currentId: string) {
  return useQuery({
    queryKey: ['related-projects', tags, currentId],
    queryFn: async () => {
      if (!tags || tags.length === 0) return [];

      const { data, error } = await supabase
        .from('projects')
        .select('id, title, description, slug, tags')
        .neq('id', currentId)
        .order('order_index', { ascending: true })
        .limit(6);

      if (error) throw error;
      
      // Filter by matching tags
      return (data || []).filter(project => 
        project.tags?.some(tag => tags.includes(tag))
      ).slice(0, 3);
    },
    enabled: !!tags && tags.length > 0 && !!currentId,
    staleTime: 1000 * 60 * 10,
  });
}
