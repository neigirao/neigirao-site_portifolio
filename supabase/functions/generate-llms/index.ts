/**
 * Edge Function: generate-llms
 * 
 * Gera llms.txt dinâmico com conteúdo atualizado do banco de dados.
 * O arquivo llms.txt é usado por sistemas de IA para indexar conteúdo.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BASE_URL = "https://neigirao.lovable.app";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all portfolio data in parallel
    const [experiencesRes, skillsRes, educationRes, projectsRes] = await Promise.all([
      supabase.from('experiences').select('company, role, period, description').order('order_index'),
      supabase.from('skills').select('name, category').order('order_index'),
      supabase.from('education').select('degree, institution, period').order('order_index'),
      supabase.from('projects').select('title, description, tags').order('order_index'),
    ]);

    const experiences = experiencesRes.data || [];
    const skills = skillsRes.data || [];
    const education = educationRes.data || [];
    const projects = projectsRes.data || [];

    // Group skills by category
    const skillsByCategory: Record<string, string[]> = {};
    for (const skill of skills) {
      const cat = skill.category || 'Geral';
      if (!skillsByCategory[cat]) skillsByCategory[cat] = [];
      skillsByCategory[cat].push(skill.name);
    }

    const today = new Date().toISOString().split('T')[0];

    const skillsSection = Object.entries(skillsByCategory)
      .map(([cat, names]) => `### ${cat}\n${names.map(n => `- ${n}`).join('\n')}`)
      .join('\n\n');

    const experiencesSection = experiences.map((exp, i) =>
      `${i + 1}. **${exp.company}** - ${exp.role} (${exp.period})\n   ${exp.description?.replace(/<[^>]+>/g, '').slice(0, 200)}...`
    ).join('\n');

    const educationSection = education.map(edu =>
      `- ${edu.degree} - ${edu.institution} (${edu.period})`
    ).join('\n');

    const projectsSection = projects.map((proj, i) =>
      `${i + 1}. **${proj.title}**\n   ${proj.description?.replace(/<[^>]+>/g, '').slice(0, 200)}...\n   Tags: ${(proj.tags || []).join(', ')}`
    ).join('\n\n');

    const currentRole = experiences[0] ? `${experiences[0].role} na ${experiences[0].company}` : 'Product Manager';

    const llmsContent = `# Nei Girão - Product Manager

> Portfolio profissional de Nei Girão, Product Manager com +15 anos de experiência em Observabilidade e Produtos Digitais. Atualmente ${currentRole}.

## Sobre

Especialista em liderar equipes ágeis e implementar estratégias de observabilidade empresarial. Experiência comprovada em empresas como ${experiences.slice(0, 4).map(e => e.company).join(', ')}.

## Links Importantes

- [Informações Completas](/about.txt): Currículo detalhado em texto
- [CV PDF](/cv-nei-girao.pdf): Currículo em formato PDF
- [LinkedIn](https://linkedin.com/in/neigirao): Perfil profissional
- [Portfolio](${BASE_URL}): Site principal
- [Sobre](/sobre): Biografia completa
- [Contato](/contato): Formulário de contato

## Especialidades

${skillsSection}

## Experiência Profissional

${experiencesSection}

## Projetos de Destaque

${projectsSection}

## Formação

${educationSection}

## Contato

- **Email**: neigirao@gmail.com
- **Telefone**: +55 21 98992-1711
- **Localização**: Rio de Janeiro, Brasil
- **LinkedIn**: linkedin.com/in/neigirao

## Última Atualização

${today}
`;

    return new Response(llmsContent, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error generating llms.txt:', errorMessage);
    return new Response(`# Error\n${errorMessage}`, {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
    });
  }
});
