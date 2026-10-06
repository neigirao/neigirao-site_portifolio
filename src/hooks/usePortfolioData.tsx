import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Types for database data
export interface DbExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  excerpt: string | null;
  logo_url: string | null;
  slug: string | null;
  order_index: number;
  is_visible?: boolean;
  is_case?: boolean;
  case_result?: string | null;
  case_body?: string | null;
  case_title?: string | null;
  case_challenge?: string | null;
  case_solution?: string | null;
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
  highlight_metric: string | null;
  brand?: string | null;
  project_subtitle?: string | null;
  is_visible?: boolean;
}

export interface DbCertification {
  id: string;
  name: string;
  issuer: string;
  year: string | null;
  logo_url: string | null;
  credential_url: string | null;
  order_index: number;
}

export interface DbTestimonial {
  id: string;
  author_name: string;
  author_role: string;
  author_company: string | null;
  author_photo_url: string | null;
  linkedin_url: string | null;
  quote: string;
  order_index: number;
  is_visible: boolean;
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
        .neq('is_visible', false)
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
        .neq('is_visible', false)
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

// Types for new tables
export interface DbCompany {
  id: string;
  name: string;
  abbr: string;
  logo_url: string | null;
  order_index: number;
}

export interface DbImpactMetric {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  order_index: number;
}

// Hook for companies
export function useCompanies() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data as DbCompany[];
    },
    ...queryOptions,
  });
  return { companies: data || [], isLoading, error: error?.message || null };
}

// Hook for impact metrics
export function useImpactMetrics() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['impact-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('impact_metrics')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data as DbImpactMetric[];
    },
    ...queryOptions,
  });
  return { metrics: data || [], isLoading, error: error?.message || null };
}

// Hook for certifications
export function useCertifications() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['certifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data as DbCertification[];
    },
    ...queryOptions,
  });
  return { certifications: data || [], isLoading, error: error?.message || null };
}

// Types for FAQs
export interface DbFAQ {
  id: string;
  question: string;
  answer: string;
  order_index: number;
  is_visible: boolean;
}

// Hook for FAQs
export function useFAQs() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_visible', true)
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data as unknown as DbFAQ[];
    },
    ...queryOptions,
  });
  return { faqs: data || [], isLoading, error: error?.message || null };
}

// Hook for testimonials
export function useTestimonials() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data as DbTestimonial[];
    },
    ...queryOptions,
  });
  return { testimonials: data || [], isLoading, error: error?.message || null };
}

// Lab Projects
export interface DbLabProject {
  id: string;
  title: string;
  slug: string | null;
  category: string | null;
  year: string | null;
  description: string | null;
  why: string | null;
  context: string | null;
  actions: string[];
  outcomes: string[];
  stack: string[];
  brand: string | null;
  is_visible: boolean;
  order_index: number;
  meta_title: string | null;
  meta_description: string | null;
  images: string[];
}

export function useLabProjects() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['lab-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lab_projects')
        .select('*')
        .neq('is_visible', false)
        .order('order_index', { ascending: true });
      if (error) throw error;
      return (data || []).map(p => ({
        ...p,
        actions: Array.isArray(p.actions) ? p.actions : [],
        outcomes: Array.isArray(p.outcomes) ? p.outcomes : [],
        stack: Array.isArray(p.stack) ? p.stack : [],
        images: Array.isArray((p as any).images) ? (p as any).images : [],
      })) as DbLabProject[];
    },
    ...queryOptions,
  });
  return { labProjects: data || [], isLoading, error: error?.message || null };
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
