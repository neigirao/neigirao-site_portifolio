/**
 * DynamicSchema - Schema.org JSON-LD Generator
 * 
 * Gera schemas dinâmicos baseados em dados do banco:
 * - Person schema com experiências e educação
 * - FAQPage schema
 * - WebSite schema
 * - BreadcrumbList schema
 * - ItemList schema para experiências e projetos
 * - Course schema para educação
 */

import { useExperiences, useSkills, useEducation, useProjects } from "@/hooks/usePortfolioData";
import { BASE_URL } from "@/config/constants";

interface SchemaProps {
  baseUrl?: string;
}

export function DynamicSchema({ baseUrl = BASE_URL }: SchemaProps) {
  const { experiences } = useExperiences();
  const { skills } = useSkills();
  const { education } = useEducation();
  const { projects } = useProjects();

  // Build Person schema with dynamic data
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nei Girão",
    "jobTitle": "Product Leader",
    "description": "Product Leader em Transformação Digital com +15 anos de experiência em produtos digitais, observabilidade e customer experience em Icatu, Oi, TIM e Globo",
    "url": baseUrl,
    "email": "neigirao@gmail.com",
    "telephone": "+5521989921711",
    "sameAs": [
      "https://linkedin.com/in/neigirao"
    ],
    "alumniOf": education.map(edu => ({
      "@type": "EducationalOrganization",
      "name": edu.institution,
      "description": edu.degree
    })),
    "worksFor": experiences.length > 0 ? {
      "@type": "Organization",
      "name": experiences[0].company
    } : undefined,
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Product Leader",
      "skills": skills.map(s => s.name).join(", "),
      "occupationLocation": {
        "@type": "City",
        "name": "Rio de Janeiro"
      }
    },
    "knowsAbout": skills.map(s => s.name)
  };

  // Build WebSite schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nei Girão - Portfolio",
    "url": baseUrl,
    "description": "Portfolio profissional de Nei Girão, Product Leader em Transformação Digital e Observabilidade",
    "author": {
      "@type": "Person",
      "name": "Nei Girão"
    }
  };

  // Build BreadcrumbList schema (only real indexable URLs)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${baseUrl}/` },
      { "@type": "ListItem", "position": 2, "name": "Sobre", "item": `${baseUrl}/sobre` },
      { "@type": "ListItem", "position": 3, "name": "Contato", "item": `${baseUrl}/contato` }
    ]
  };


  // Build ItemList schema for Experiences
  const experienceListSchema = experiences.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Experiências Profissionais de Nei Girão",
    "description": "Lista de experiências profissionais de Nei Girão como Product Manager",
    "numberOfItems": experiences.length,
    "itemListElement": experiences.map((exp, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": `${exp.role} - ${exp.company}`,
      "url": exp.slug ? `${baseUrl}/experiencia/${exp.slug}` : baseUrl
    }))
  } : null;

  // Build ItemList schema for Projects
  const projectListSchema = projects.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Projetos de Nei Girão",
    "description": "Principais projetos desenvolvidos por Nei Girão como Product Manager",
    "numberOfItems": projects.length,
    "itemListElement": projects.map((proj, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": proj.title,
      "url": proj.slug ? `${baseUrl}/projeto/${proj.slug}` : baseUrl
    }))
  } : null;

  // Build Course schema for Education entries
  const courseSchemas = education.map(edu => ({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": edu.degree,
    "provider": {
      "@type": "EducationalOrganization",
      "name": edu.institution
    },
    "description": edu.description?.replace(/<[^>]*>/g, '') || `${edu.degree} cursado em ${edu.institution}`,
    "temporalCoverage": edu.period,
    "educationalLevel": "Higher Education",
    "inLanguage": "pt-BR"
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {experienceListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(experienceListSchema) }}
        />
      )}
      {projectListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectListSchema) }}
        />
      )}
      {courseSchemas.map((schema, i) => (
        <script
          key={`course-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

