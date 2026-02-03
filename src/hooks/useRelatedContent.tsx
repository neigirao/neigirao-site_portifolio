/**
 * Related Content Hook
 * 
 * Provides hooks for fetching related content between
 * experiences, skills, and projects for internal linking.
 */

import { useMemo } from 'react';
import { useExperiences, useSkills, useProjects } from './usePortfolioData';

interface RelatedItem {
  id: string;
  slug?: string | null;
  title: string;
  subtitle?: string;
  type: 'experience' | 'skill' | 'project';
}

// Keywords commonly associated with skills
const skillKeywords: Record<string, string[]> = {
  'Dynatrace': ['dynatrace', 'apm', 'monitoring', 'observability', 'performance'],
  'Grafana': ['grafana', 'dashboard', 'visualization', 'metrics'],
  'Azure Monitor': ['azure', 'monitor', 'cloud', 'microsoft'],
  'Google Analytics': ['analytics', 'ga', 'tracking', 'comportamento', 'conversão'],
  'Product Management': ['product', 'produto', 'roadmap', 'backlog', 'stakeholder'],
  'Agile/Scrum': ['agile', 'scrum', 'sprint', 'kanban', 'metodologia'],
  'Data Analysis': ['data', 'dados', 'análise', 'métricas', 'kpi'],
  'Observabilidade': ['observabilidade', 'observability', 'monitoring', 'logs', 'traces'],
};

/**
 * Find skills related to an experience based on description keywords
 */
export function useSkillsForExperience(experienceDescription: string) {
  const { skills } = useSkills();

  return useMemo(() => {
    if (!experienceDescription || !skills.length) return [];

    const descLower = experienceDescription.toLowerCase();
    const related: RelatedItem[] = [];

    skills.forEach(skill => {
      const keywords = skillKeywords[skill.name] || [skill.name.toLowerCase()];
      const matches = keywords.some(keyword => descLower.includes(keyword));

      if (matches) {
        related.push({
          id: skill.id,
          slug: skill.slug,
          title: skill.name,
          subtitle: skill.category || undefined,
          type: 'skill'
        });
      }
    });

    return related.slice(0, 4);
  }, [experienceDescription, skills]);
}

/**
 * Find projects related to a skill based on tags and description
 */
export function useProjectsForSkill(skillName: string) {
  const { projects } = useProjects();

  return useMemo(() => {
    if (!skillName || !projects.length) return [];

    const keywords = skillKeywords[skillName] || [skillName.toLowerCase()];
    const related: RelatedItem[] = [];

    projects.forEach(project => {
      const tagsLower = project.tags?.map(t => t.toLowerCase()) || [];
      const descLower = project.description.toLowerCase();

      const matches = keywords.some(keyword => 
        tagsLower.some(tag => tag.includes(keyword)) ||
        descLower.includes(keyword)
      );

      if (matches) {
        related.push({
          id: project.id,
          slug: project.slug,
          title: project.title,
          subtitle: project.tags?.slice(0, 2).join(', ') || undefined,
          type: 'project'
        });
      }
    });

    return related.slice(0, 4);
  }, [skillName, projects]);
}

/**
 * Find experiences related to a skill
 */
export function useExperiencesForSkill(skillName: string) {
  const { experiences } = useExperiences();

  return useMemo(() => {
    if (!skillName || !experiences.length) return [];

    const keywords = skillKeywords[skillName] || [skillName.toLowerCase()];
    const related: RelatedItem[] = [];

    experiences.forEach(exp => {
      const descLower = exp.description.toLowerCase();

      const matches = keywords.some(keyword => descLower.includes(keyword));

      if (matches) {
        related.push({
          id: exp.id,
          slug: exp.slug,
          title: exp.role,
          subtitle: `${exp.company} • ${exp.period}`,
          type: 'experience'
        });
      }
    });

    return related.slice(0, 4);
  }, [skillName, experiences]);
}

/**
 * Find experiences related to a project based on company or tags
 */
export function useExperiencesForProject(projectTags: string[] | null, projectDescription: string) {
  const { experiences } = useExperiences();

  return useMemo(() => {
    if (!experiences.length) return [];

    const tagsLower = projectTags?.map(t => t.toLowerCase()) || [];
    const descLower = projectDescription?.toLowerCase() || '';
    const related: RelatedItem[] = [];

    experiences.forEach(exp => {
      const expDescLower = exp.description.toLowerCase();

      // Check if any project tag or description keyword matches experience description
      const matches = tagsLower.some(tag => expDescLower.includes(tag)) ||
        (descLower && expDescLower.split(' ').some(word => 
          word.length > 4 && descLower.includes(word)
        ));

      if (matches) {
        related.push({
          id: exp.id,
          slug: exp.slug,
          title: exp.role,
          subtitle: `${exp.company} • ${exp.period}`,
          type: 'experience'
        });
      }
    });

    return related.slice(0, 3);
  }, [projectTags, projectDescription, experiences]);
}

/**
 * Find skills related to a project
 */
export function useSkillsForProject(projectTags: string[] | null, projectDescription: string) {
  const { skills } = useSkills();

  return useMemo(() => {
    if (!skills.length) return [];

    const tagsLower = projectTags?.map(t => t.toLowerCase()) || [];
    const descLower = projectDescription?.toLowerCase() || '';
    const related: RelatedItem[] = [];

    skills.forEach(skill => {
      const keywords = skillKeywords[skill.name] || [skill.name.toLowerCase()];

      const matches = keywords.some(keyword =>
        tagsLower.some(tag => tag.includes(keyword)) ||
        descLower.includes(keyword)
      );

      if (matches) {
        related.push({
          id: skill.id,
          slug: skill.slug,
          title: skill.name,
          subtitle: skill.category || undefined,
          type: 'skill'
        });
      }
    });

    return related.slice(0, 4);
  }, [projectTags, projectDescription, skills]);
}

/**
 * Combine multiple related items into a single "See Also" list
 */
export function useSeeAlso(
  items: RelatedItem[],
  maxItems: number = 5
): RelatedItem[] {
  return useMemo(() => {
    // Dedupe by id+type
    const seen = new Set<string>();
    const unique: RelatedItem[] = [];

    items.forEach(item => {
      const key = `${item.type}-${item.id}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    });

    return unique.slice(0, maxItems);
  }, [items, maxItems]);
}
