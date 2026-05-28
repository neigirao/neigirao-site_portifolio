import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AdminContentItem {
  id: string;
  meta_title: string | null;
  meta_description: string | null;
  slug: string | null;
  logo_url?: string | null;
  image_url?: string | null;
  cover_image_url?: string | null;
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
  is_visible: boolean;
  is_case: boolean;
  case_result: string | null;
  case_body: string | null;
  case_title: string | null;
  case_challenge: string | null;
  case_solution: string | null;
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

export interface AdminArticle extends AdminContentItem {
  title: string;
  status: string;
  cover_image_url: string | null;
  published_at: string | null;
}

export interface AdminCertification {
  id: string;
  name: string;
  issuer: string;
  logo_url: string | null;
  order_index: number;
}

export interface AdminTestimonial {
  id: string;
  author_name: string;
  author_role: string;
  author_photo_url: string | null;
  is_visible: boolean;
  order_index: number;
}

export interface AdminCompany {
  id: string;
  name: string;
  abbr: string;
  logo_url: string | null;
  order_index: number;
}

export interface AdminMetric {
  id: string;
  value: string;
  label: string;
  order_index: number;
}

export interface AdminFAQ {
  id: string;
  question: string;
  answer: string;
  is_visible: boolean;
  order_index: number;
}

export interface AdminLabProject {
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
  created_at: string;
  updated_at: string;
}

const queryOptions = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 30,
  refetchOnWindowFocus: false,
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

export function useAdminArticles() {
  return useQuery({
    queryKey: ['admin-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data as AdminArticle[];
    },
    ...queryOptions,
  });
}

export function useAdminCertifications() {
  return useQuery({
    queryKey: ['admin-certifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data as AdminCertification[];
    },
    ...queryOptions,
  });
}

export function useAdminTestimonials() {
  return useQuery({
    queryKey: ['admin-testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data as AdminTestimonial[];
    },
    ...queryOptions,
  });
}

export function useAdminCompanies() {
  return useQuery({
    queryKey: ['admin-companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data as AdminCompany[];
    },
    ...queryOptions,
  });
}

export function useAdminMetrics() {
  return useQuery({
    queryKey: ['admin-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('impact_metrics')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as AdminMetric[];
    },
    ...queryOptions,
  });
}

export function useAdminFAQs() {
  return useQuery({
    queryKey: ['admin-faqs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as AdminFAQ[];
    },
    ...queryOptions,
  });
}

export function useAdminLabProjects() {
  return useQuery({
    queryKey: ['admin-lab-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lab_projects')
        .select('*')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return (data || []).map(p => ({
        ...p,
        actions: Array.isArray(p.actions) ? p.actions : [],
        outcomes: Array.isArray(p.outcomes) ? p.outcomes : [],
        stack: Array.isArray(p.stack) ? p.stack : [],
      })) as AdminLabProject[];
    },
    ...queryOptions,
  });
}

export function useAdminDashboardData() {
  const experiences = useAdminExperiences();
  const skills = useAdminSkills();
  const education = useAdminEducation();
  const projects = useAdminProjects();
  const articles = useAdminArticles();
  const certifications = useAdminCertifications();
  const testimonials = useAdminTestimonials();
  const companies = useAdminCompanies();
  const metrics = useAdminMetrics();
  const faqs = useAdminFAQs();
  const labProjects = useAdminLabProjects();

  const isLoading =
    experiences.isLoading || skills.isLoading || education.isLoading ||
    projects.isLoading || articles.isLoading;

  const hasError =
    experiences.error || skills.error || education.error ||
    projects.error || articles.error;

  return {
    experiences: experiences.data || [],
    skills: skills.data || [],
    education: education.data || [],
    projects: projects.data || [],
    articles: articles.data || [],
    certifications: certifications.data || [],
    testimonials: testimonials.data || [],
    companies: companies.data || [],
    metrics: metrics.data || [],
    faqs: faqs.data || [],
    labProjects: labProjects.data || [],
    isLoading,
    hasError,
    refetchAll: () => {
      experiences.refetch();
      skills.refetch();
      education.refetch();
      projects.refetch();
      articles.refetch();
      certifications.refetch();
      testimonials.refetch();
      companies.refetch();
      metrics.refetch();
      faqs.refetch();
      labProjects.refetch();
    },
  };
}
