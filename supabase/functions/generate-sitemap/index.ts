/**
 * Edge Function: generate-sitemap
 * 
 * Gera sitemap.xml dinâmico com conteúdo do banco de dados.
 * Inclui automaticamente novas experiências, skills, educação e projetos.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BASE_URL = "https://neigirao.lovable.app";

// Helper to generate slug from text
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Generating dynamic sitemap...");

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all content from database
    const [experiencesRes, projectsRes, skillsRes, educationRes] = await Promise.all([
      supabase.from('experiences').select('id, company, slug, updated_at').order('order_index'),
      supabase.from('projects').select('id, title, slug, updated_at').order('order_index'),
      supabase.from('skills').select('id, name, slug, updated_at').order('order_index'),
      supabase.from('education').select('updated_at').order('updated_at', { ascending: false }).limit(1),
    ]);

    const experiences = experiencesRes.data || [];
    const projects = projectsRes.data || [];
    const skills = skillsRes.data || [];

    // Get the most recent update date across all tables
    const allDates = [
      ...experiences.map(e => e.updated_at),
      ...projects.map(p => p.updated_at),
      ...skills.map(s => s.updated_at),
      educationRes.data?.[0]?.updated_at,
    ].filter(Boolean);

    const mostRecentUpdate = allDates.length > 0 
      ? new Date(Math.max(...allDates.map(d => new Date(d).getTime()))).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    console.log(`Most recent content update: ${mostRecentUpdate}`);
    console.log(`Found: ${experiences.length} experiences, ${projects.length} projects, ${skills.length} skills`);

    // Generate individual page URLs
    const experienceUrls = experiences.map(exp => {
      const slug = exp.slug || generateSlug(exp.company);
      const lastmod = exp.updated_at?.split('T')[0] || mostRecentUpdate;
      return `
  <url>
    <loc>${BASE_URL}/experiencia/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }).join('');

    const projectUrls = projects.map(proj => {
      const slug = proj.slug || generateSlug(proj.title);
      const lastmod = proj.updated_at?.split('T')[0] || mostRecentUpdate;
      return `
  <url>
    <loc>${BASE_URL}/projeto/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }).join('');

    const skillUrls = skills.map(skill => {
      const slug = skill.slug || generateSlug(skill.name);
      const lastmod = skill.updated_at?.split('T')[0] || mostRecentUpdate;
      return `
  <url>
    <loc>${BASE_URL}/skill/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }).join('');

    // Build sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${mostRecentUpdate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Sobre / About Section -->
  <url>
    <loc>${BASE_URL}/#about</loc>
    <lastmod>${mostRecentUpdate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Skills Section -->
  <url>
    <loc>${BASE_URL}/#skills</loc>
    <lastmod>${skills[0]?.updated_at?.split('T')[0] || mostRecentUpdate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Formação / Education Section -->
  <url>
    <loc>${BASE_URL}/#education</loc>
    <lastmod>${educationRes.data?.[0]?.updated_at?.split('T')[0] || mostRecentUpdate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Experiência / Experience Section -->
  <url>
    <loc>${BASE_URL}/#experience</loc>
    <lastmod>${experiences[0]?.updated_at?.split('T')[0] || mostRecentUpdate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Projetos / Projects Section -->
  <url>
    <loc>${BASE_URL}/#projects</loc>
    <lastmod>${projects[0]?.updated_at?.split('T')[0] || mostRecentUpdate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- FAQ Section -->
  <url>
    <loc>${BASE_URL}/#faq</loc>
    <lastmod>${mostRecentUpdate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Contato / Contact Section -->
  <url>
    <loc>${BASE_URL}/#contact</loc>
    <lastmod>${mostRecentUpdate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- CV PDF -->
  <url>
    <loc>${BASE_URL}/cv-nei-girao.pdf</loc>
    <lastmod>${mostRecentUpdate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Individual Experience Pages -->${experienceUrls}
  
  <!-- Individual Project Pages -->${projectUrls}
  
  <!-- Individual Skill Pages -->${skillUrls}
</urlset>`;

    console.log("Sitemap generated successfully with individual pages");

    return new Response(sitemap, {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error generating sitemap:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
