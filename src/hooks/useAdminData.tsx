import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AdminContentItem {
  id: string;
  meta_title: string | null;
  meta_description: string | null;
  slug: string | null;
  logo_url?: string | null;
  image_url?: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface AdminExperience extends AdminContentItem {
  company: string;
  role: string;
  period: string;
  description: string;
  logo_url: string | null;
}

export interface AdminSkill extends AdminContentItem {
  name: string;
  category: string | null;
  logo_url: string | null;
}

export interface AdminEducation extends AdminContentItem {
  institution: string;
  degree: string;
  period: string;
  description: string | null;
}

export interface AdminProject extends AdminContentItem {
  title: string;
  description: string;
  image_url: string | null;
  link: string | null;
  tags: string[] | null;
}

const queryOptions = {
  staleTime: 1000 * 60 * 5, // 5 minutes
  gcTime: 1000 * 60 * 30, // 30 minutes
  refetchOnWindowFocus: true,
};

export function useAdminExperiences() {
  return useQuery({
    queryKey: ['admin-experiences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as AdminExperience[];
    },
    ...queryOptions,
  });
}

export function useAdminSkills() {
  return useQuery({
    queryKey: ['admin-skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as AdminSkill[];
    },
    ...queryOptions,
  });
}

export function useAdminEducation() {
  return useQuery({
    queryKey: ['admin-education'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as AdminEducation[];
    },
    ...queryOptions,
  });
}

export function useAdminProjects() {
  return useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as AdminProject[];
    },
    ...queryOptions,
  });
}

export function useAdminDashboardData() {
  const experiences = useAdminExperiences();
  const skills = useAdminSkills();
  const education = useAdminEducation();
  const projects = useAdminProjects();

  const isLoading = experiences.isLoading || skills.isLoading || education.isLoading || projects.isLoading;
  const hasError = experiences.error || skills.error || education.error || projects.error;

  return {
    experiences: experiences.data || [],
    skills: skills.data || [],
    education: education.data || [],
    projects: projects.data || [],
    isLoading,
    hasError,
    refetchAll: () => {
      experiences.refetch();
      skills.refetch();
      education.refetch();
      projects.refetch();
    },
  };
}
