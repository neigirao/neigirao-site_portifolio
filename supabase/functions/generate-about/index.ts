/**
 * Edge Function: generate-about
 * 
 * Gera about.txt dinâmico com conteúdo atualizado do banco de dados.
 * Substitui o arquivo estático para garantir dados sempre atualizados.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function stripHtml(html: string): string {
  return (html || '').replace(/<[^>]+>/g, '').trim();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const [experiencesRes, skillsRes, educationRes, projectsRes, metricsRes] = await Promise.all([
      supabase.from('experiences').select('*').order('order_index'),
      supabase.from('skills').select('*').order('order_index'),
      supabase.from('education').select('*').order('order_index'),
      supabase.from('projects').select('*').order('order_index'),
      supabase.from('impact_metrics').select('*').order('order_index'),
    ]);

    const experiences = experiencesRes.data || [];
    const skills = skillsRes.data || [];
    const education = educationRes.data || [];
    const projects = projectsRes.data || [];
    const metrics = metricsRes.data || [];

    const skillsByCategory: Record<string, string[]> = {};
    for (const skill of skills) {
      const cat = skill.category || 'Geral';
      if (!skillsByCategory[cat]) skillsByCategory[cat] = [];
      skillsByCategory[cat].push(skill.name);
    }

    const currentRole = experiences[0] ? `${experiences[0].role} na ${experiences[0].company}` : 'Product Manager';
    const today = new Date().toISOString().split('T')[0];

    const content = `=====================================
NEI GIRÃO - CURRÍCULO PROFISSIONAL
=====================================
Última atualização: ${today}

RESUMO
------
Product Manager e Estrategista de Dados com +15 anos de experiência transformando observabilidade e cultura analítica em produtos digitais de alto impacto.

Atualmente: ${currentRole}

CONTATO
-------
Email: neigirao@gmail.com
Telefone: +55 21 98992-1711
LinkedIn: https://linkedin.com/in/neigirao
Website: https://neigirao.lovable.app
Localização: Rio de Janeiro, Brasil

${metrics.length > 0 ? `IMPACTO MENSURÁVEL
------------------
${metrics.map(m => `• ${m.value} - ${m.label}: ${m.description}`).join('\n')}
` : ''}
EXPERIÊNCIA PROFISSIONAL
------------------------
${experiences.map((exp, i) => `${i + 1}. ${exp.company} — ${exp.role}
   Período: ${exp.period}
   ${stripHtml(exp.description).slice(0, 400)}
`).join('\n')}

COMPETÊNCIAS
------------
${Object.entries(skillsByCategory).map(([cat, names]) => `${cat}: ${names.join(', ')}`).join('\n')}

PROJETOS DE DESTAQUE
--------------------
${projects.map((proj, i) => `${i + 1}. ${proj.title}
   ${stripHtml(proj.description).slice(0, 300)}
   ${(proj.tags || []).length > 0 ? `Tags: ${proj.tags!.join(', ')}` : ''}
`).join('\n')}

FORMAÇÃO ACADÊMICA
------------------
${education.map(edu => `• ${edu.degree} — ${edu.institution} (${edu.period})`).join('\n')}

=====================================
Documento gerado automaticamente em ${today}
Para mais informações: https://neigirao.lovable.app
=====================================
`;

    return new Response(content, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error generating about.txt:', msg);
    return new Response(`Error: ${msg}`, {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
    });
  }
});
