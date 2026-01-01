import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Types for database data
interface DbExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  logo_url: string | null;
  order_index: number;
}

interface DbSkill {
  id: string;
  name: string;
  logo_url: string | null;
  category: string | null;
  order_index: number;
}

interface DbEducation {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string | null;
  order_index: number;
}

interface DbProject {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  link: string | null;
  tags: string[] | null;
  order_index: number;
}

// Hook for experiences
export function useExperiences() {
  const [experiences, setExperiences] = useState<DbExperience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;
        setExperiences(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar experiências');
      } finally {
        setIsLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  return { experiences, isLoading, error };
}

// Hook for skills
export function useSkills() {
  const [skills, setSkills] = useState<DbSkill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;
        setSkills(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar skills');
      } finally {
        setIsLoading(false);
      }
    }

    fetchSkills();
  }, []);

  return { skills, isLoading, error };
}

// Hook for education
export function useEducation() {
  const [education, setEducation] = useState<DbEducation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEducation() {
      try {
        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;
        setEducation(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar formação');
      } finally {
        setIsLoading(false);
      }
    }

    fetchEducation();
  }, []);

  return { education, isLoading, error };
}

// Hook for projects
export function useProjects() {
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar projetos');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, isLoading, error };
}
