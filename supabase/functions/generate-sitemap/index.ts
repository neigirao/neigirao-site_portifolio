/**
 * Edge Function: generate-sitemap
 * 
 * Gera sitemap.xml dinâmico com conteúdo do banco de dados.
 * Sem hash fragments, inclui llms.txt e about.txt.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BASE_URL = "https://neigirao.lovable.app";

function generateSlug(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

function urlEntry(loc: string, lastmod: string, freq: string, priority: string): string {
  return `\n  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!);

    const [experiencesRes, projectsRes, skillsRes, educationRes] = await Promise.all([
      supabase.from('experiences').select('id, company, slug, updated_at').order('order_index'),
      supabase.from('projects').select('id, title, slug, updated_at').order('order_index'),
      supabase.from('skills').select('id, name, slug, updated_at').order('order_index'),
      supabase.from('education').select('updated_at').order('updated_at', { ascending: false }).limit(1),
    ]);

    const experiences = experiencesRes.data || [];
    const projects = projectsRes.data || [];
    const skills = skillsRes.data || [];

    const allDates = [
      ...experiences.map(e => e.updated_at),
      ...projects.map(p => p.updated_at),
      ...skills.map(s => s.updated_at),
      educationRes.data?.[0]?.updated_at,
    ].filter(Boolean);

    const mostRecentUpdate = allDates.length > 0
      ? new Date(Math.max(...allDates.map(d => new Date(d).getTime()))).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    // Static pages (no hash fragments)
    const staticPages = [
      urlEntry(`${BASE_URL}/`, mostRecentUpdate, 'weekly', '1.0'),
      urlEntry(`${BASE_URL}/sobre`, mostRecentUpdate, 'monthly', '0.9'),
      urlEntry(`${BASE_URL}/contato`, mostRecentUpdate, 'monthly', '0.8'),
      urlEntry(`${BASE_URL}/cv-nei-girao.pdf`, mostRecentUpdate, 'monthly', '0.6'),
      urlEntry(`${BASE_URL}/llms.txt`, mostRecentUpdate, 'monthly', '0.5'),
      urlEntry(`${BASE_URL}/about.txt`, mostRecentUpdate, 'monthly', '0.5'),
    ].join('');

    // Dynamic pages
    const experienceUrls = experiences.map(e =>
      urlEntry(`${BASE_URL}/experiencia/${e.slug || generateSlug(e.company)}`, e.updated_at?.split('T')[0] || mostRecentUpdate, 'monthly', '0.7')
    ).join('');

    const projectUrls = projects.map(p =>
      urlEntry(`${BASE_URL}/projeto/${p.slug || generateSlug(p.title)}`, p.updated_at?.split('T')[0] || mostRecentUpdate, 'monthly', '0.7')
    ).join('');

    const skillUrls = skills.map(s =>
      urlEntry(`${BASE_URL}/skill/${s.slug || generateSlug(s.name)}`, s.updated_at?.split('T')[0] || mostRecentUpdate, 'monthly', '0.6')
    ).join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticPages}${experienceUrls}${projectUrls}${skillUrls}
</urlset>`;

    return new Response(sitemap, {
      headers: { ...corsHeaders, 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error generating sitemap:', msg);
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
