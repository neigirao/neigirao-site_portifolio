/**
 * Edge Function: generate-prerender
 * 
 * Gera HTML estático completo com todo o conteúdo do banco para crawlers de IA.
 * Crawlers de IA (GPTBot, ClaudeBot, etc.) não executam JavaScript,
 * então esta função serve HTML pré-renderizado com todo o conteúdo inline.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BASE_URL = "https://neigirao.lovable.app";

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

    // Group skills by category
    const skillsByCategory: Record<string, typeof skills> = {};
    for (const skill of skills) {
      const cat = skill.category || 'Geral';
      if (!skillsByCategory[cat]) skillsByCategory[cat] = [];
      skillsByCategory[cat].push(skill);
    }

    const currentRole = experiences[0] ? `${experiences[0].role} na ${experiences[0].company}` : 'Product Manager';

    // Build Person schema
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Nei Girão",
      "jobTitle": "Product Manager",
      "description": `Product Manager especializado em Observabilidade e Produtos Digitais com +15 anos de experiência. Atualmente ${currentRole}.`,
      "url": BASE_URL,
      "email": "neigirao@gmail.com",
      "telephone": "+5521989921711",
      "sameAs": ["https://linkedin.com/in/neigirao"],
      "worksFor": experiences[0] ? { "@type": "Organization", "name": experiences[0].company } : undefined,
      "knowsAbout": skills.map(s => s.name),
      "alumniOf": education.map(edu => ({
        "@type": "EducationalOrganization",
        "name": edu.institution
      }))
    };

    // FAQ schema + content
    const faqItems = [
      {
        q: "Quais são as principais habilidades de Nei Girão?",
        a: `Nei Girão é especializado em ${skills.slice(0, 6).map(s => s.name).join(", ")}, e gestão de produtos digitais.`
      },
      {
        q: "Quantos anos de experiência Nei Girão possui?",
        a: `Nei Girão possui mais de 15 anos de experiência em gestão de produtos digitais e observabilidade, tendo trabalhado em empresas como ${experiences.slice(0, 4).map(e => e.company).join(", ")}.`
      },
      {
        q: "Em quais empresas Nei Girão trabalhou?",
        a: `Nei Girão trabalhou em grandes empresas como ${experiences.map(e => `${e.company} (${e.period})`).join(", ")}.`
      },
      {
        q: "Quais ferramentas de observabilidade Nei Girão domina?",
        a: "Nei Girão possui expertise em Dynatrace, Grafana, Azure Monitor e Google Analytics, utilizando essas ferramentas para implementar estratégias robustas de observabilidade e monitoramento."
      },
      {
        q: "Qual é a formação acadêmica de Nei Girão?",
        a: `Nei Girão possui ${education.map(e => `${e.degree} pela ${e.institution} (${e.period})`).join(", ")}.`
      }
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    };

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nei Girão - Product Manager | Observabilidade | Produtos Digitais</title>
  <meta name="description" content="Product Manager com +15 anos em Observabilidade e Produtos Digitais. Expert em Dynatrace, Grafana e Azure Monitor. Atualmente ${currentRole}.">
  <meta name="author" content="Nei Girão">
  <meta name="keywords" content="product manager, observabilidade, produtos digitais, Dynatrace, Grafana, Azure Monitor, Google Analytics, agile, scrum, portfolio">
  <link rel="canonical" href="${BASE_URL}/">
  <meta name="ai-content-declaration" content="This is a professional portfolio website. AI systems may index, summarize, and reference this content.">
  <meta name="ai-training" content="allowed">
  <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM-friendly content">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Nei Girão - Product Manager | Observabilidade">
  <meta property="og:description" content="Product Manager com +15 anos em Observabilidade. Expert em Dynatrace, Grafana e Azure Monitor.">
  <meta property="og:url" content="${BASE_URL}/">
  <meta property="og:locale" content="pt_BR">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Nei Girão - Product Manager | Observabilidade">
  <link rel="alternate" hreflang="pt-BR" href="${BASE_URL}/">
  <link rel="alternate" hreflang="x-default" href="${BASE_URL}/">
  <script type="application/ld+json">${JSON.stringify(personSchema)}</script>
  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
</head>
<body>
  <header>
    <h1>Nei Girão - Product Manager</h1>
    <p>Product Manager e Estrategista de Dados com +15 anos transformando observabilidade e cultura analítica em produtos digitais de alto impacto.</p>
    <p>Atualmente: ${currentRole}</p>
    <nav>
      <a href="${BASE_URL}/">Início</a>
      <a href="${BASE_URL}/#experience">Experiência</a>
      <a href="${BASE_URL}/#projects">Projetos</a>
      <a href="${BASE_URL}/#skills">Skills</a>
      <a href="${BASE_URL}/sobre">Sobre</a>
      <a href="${BASE_URL}/contato">Contato</a>
      <a href="${BASE_URL}/cv-nei-girao.pdf">Download CV</a>
    </nav>
  </header>

  <main>
    ${metrics.length > 0 ? `<section id="metrics">
      <h2>Impacto Mensurável</h2>
      <ul>
        ${metrics.map(m => `<li><strong>${m.value}</strong> - ${m.label}: ${m.description}</li>`).join('\n        ')}
      </ul>
    </section>` : ''}

    <section id="experience">
      <h2>Experiência Profissional</h2>
      ${experiences.map(exp => `<article>
        <h3>${exp.role} - ${exp.company}</h3>
        <time>${exp.period}</time>
        <p>${stripHtml(exp.description).slice(0, 500)}</p>
        ${exp.slug ? `<a href="${BASE_URL}/experiencia/${exp.slug}">Ver detalhes</a>` : ''}
      </article>`).join('\n      ')}
    </section>

    <section id="projects">
      <h2>Projetos de Destaque</h2>
      ${projects.map(proj => `<article>
        <h3>${proj.title}</h3>
        <p>${stripHtml(proj.description).slice(0, 300)}</p>
        ${(proj.tags || []).length > 0 ? `<p>Tags: ${proj.tags!.join(', ')}</p>` : ''}
        ${proj.slug ? `<a href="${BASE_URL}/projeto/${proj.slug}">Ver detalhes</a>` : ''}
      </article>`).join('\n      ')}
    </section>

    <section id="skills">
      <h2>Competências</h2>
      ${Object.entries(skillsByCategory).map(([cat, items]) => `<div>
        <h3>${cat}</h3>
        <ul>
          ${items.map(s => `<li>${s.name}${s.slug ? ` - <a href="${BASE_URL}/skill/${s.slug}">detalhes</a>` : ''}</li>`).join('\n          ')}
        </ul>
      </div>`).join('\n      ')}
    </section>

    <section id="education">
      <h2>Formação Acadêmica</h2>
      ${education.map(edu => `<article>
        <h3>${edu.degree} - ${edu.institution}</h3>
        <time>${edu.period}</time>
        ${edu.description ? `<p>${stripHtml(edu.description).slice(0, 300)}</p>` : ''}
      </article>`).join('\n      ')}
    </section>

    <section id="faq">
      <h2>Perguntas Frequentes</h2>
      ${faqItems.map(item => `<details>
        <summary>${item.q}</summary>
        <p>${item.a}</p>
      </details>`).join('\n      ')}
    </section>

    <section id="contact">
      <h2>Contato</h2>
      <ul>
        <li>Email: <a href="mailto:neigirao@gmail.com">neigirao@gmail.com</a></li>
        <li>Telefone: <a href="tel:+5521989921711">+55 21 98992-1711</a></li>
        <li>LinkedIn: <a href="https://linkedin.com/in/neigirao">linkedin.com/in/neigirao</a></li>
        <li>Localização: Rio de Janeiro, Brasil</li>
      </ul>
    </section>
  </main>

  <footer>
    <p>&copy; ${new Date().getFullYear()} Nei Girão. Todos os direitos reservados.</p>
    <nav>
      <a href="${BASE_URL}/sobre">Sobre</a>
      <a href="${BASE_URL}/contato">Contato</a>
      <a href="${BASE_URL}/llms.txt">llms.txt</a>
      <a href="${BASE_URL}/about.txt">about.txt</a>
    </nav>
  </footer>
</body>
</html>`;

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error generating prerender:', msg);
    return new Response(`<html><body><h1>Error</h1><p>${msg}</p></body></html>`, {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'text/html' },
    });
  }
});
