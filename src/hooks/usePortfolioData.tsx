import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Types for database data
export interface DbExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  logo_url: string | null;
  slug: string | null;
  order_index: number;
}

export interface DbSkill {
  id: string;
  name: string;
  logo_url: string | null;
  category: string | null;
  slug: string | null;
  order_index: number;
}

export interface DbEducation {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string | null;
  slug: string | null;
  order_index: number;
}

export interface DbProject {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  link: string | null;
  tags: string[] | null;
  slug: string | null;
  order_index: number;
}

// Shared query options for stale-while-revalidate pattern
const queryOptions = {
  staleTime: 1000 * 60 * 5, // 5 minutes - data considered fresh
  gcTime: 1000 * 60 * 30, // 30 minutes - keep in cache (formerly cacheTime)
  refetchOnWindowFocus: false,
  retry: 2,
};

// Hook for experiences with React Query
export function useExperiences() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as DbExperience[];
    },
    ...queryOptions,
  });

  return {
    experiences: data || [],
    isLoading,
    error: error?.message || null,
  };
}

// Hook for skills with React Query
export function useSkills() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as DbSkill[];
    },
    ...queryOptions,
  });

  return {
    skills: data || [],
    isLoading,
    error: error?.message || null,
  };
}

// Hook for education with React Query
export function useEducation() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['education'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as DbEducation[];
    },
    ...queryOptions,
  });

  return {
    education: data || [],
    isLoading,
    error: error?.message || null,
  };
}

// Hook for projects with React Query
export function useProjects() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as DbProject[];
    },
    ...queryOptions,
  });

  return {
    projects: data || [],
    isLoading,
    error: error?.message || null,
  };
}

// Prefetch function for critical data
export async function prefetchPortfolioData(queryClient: import('@tanstack/react-query').QueryClient) {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['experiences'],
      queryFn: async () => {
        const { data } = await supabase
          .from('experiences')
          .select('*')
          .order('order_index', { ascending: true });
        return data as DbExperience[];
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['skills'],
      queryFn: async () => {
        const { data } = await supabase
          .from('skills')
          .select('*')
          .order('order_index', { ascending: true });
        return data as DbSkill[];
      },
    }),
  ]);
}
