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

const queryOptions = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 30,
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
    },
  };
}
