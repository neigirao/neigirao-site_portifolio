/**
 * DynamicSchema - Schema.org JSON-LD Generator
 * 
 * Gera schemas dinâmicos baseados em dados do banco:
 * - Person schema com experiências e educação
 * - FAQPage schema
 * - WebSite schema
 * - BreadcrumbList schema
 */

import { useExperiences, useSkills, useEducation } from "@/hooks/usePortfolioData";

interface SchemaProps {
  baseUrl?: string;
}

export function DynamicSchema({ baseUrl = "https://neigirao.lovable.app" }: SchemaProps) {
  const { experiences } = useExperiences();
  const { skills } = useSkills();
  const { education } = useEducation();

  // Build Person schema with dynamic data
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nei Girão",
    "jobTitle": "Product Manager",
    "description": "Product Manager especializado em Observabilidade e Produtos Digitais com +15 anos de experiência liderando equipes em Icatu, Oi, TIM e Globo",
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
      "name": "Product Manager",
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
    "description": "Portfolio profissional de Nei Girão, Product Manager especializado em Observabilidade",
    "author": {
      "@type": "Person",
      "name": "Nei Girão"
    }
  };

  // Build BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${baseUrl}/` },
      { "@type": "ListItem", "position": 2, "name": "Resumo", "item": `${baseUrl}/#about` },
      { "@type": "ListItem", "position": 3, "name": "Skills", "item": `${baseUrl}/#skills` },
      { "@type": "ListItem", "position": 4, "name": "Experiência", "item": `${baseUrl}/#experience` },
      { "@type": "ListItem", "position": 5, "name": "Projetos", "item": `${baseUrl}/#projects` },
      { "@type": "ListItem", "position": 6, "name": "Contato", "item": `${baseUrl}/#contact` }
    ]
  };

  // Build FAQ schema dynamically
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quais são as principais habilidades de Nei Girão?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Nei Girão é especializado em ${skills.slice(0, 6).map(s => s.name).join(", ")}, e gestão de produtos digitais.`
        }
      },
      {
        "@type": "Question",
        "name": "Quantos anos de experiência Nei Girão possui?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Nei Girão possui mais de 15 anos de experiência em gestão de produtos digitais e observabilidade, tendo trabalhado em empresas como ${experiences.slice(0, 4).map(e => e.company).join(", ")}.`
        }
      },
      {
        "@type": "Question",
        "name": "Em quais empresas Nei Girão trabalhou?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Nei Girão trabalhou em grandes empresas como ${experiences.map(e => `${e.company} (${e.period})`).join(", ")}, liderando equipes e produtos digitais.`
        }
      },
      {
        "@type": "Question",
        "name": "Quais ferramentas de observabilidade Nei Girão domina?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nei Girão possui expertise em Dynatrace, Grafana, Azure Monitor e Google Analytics, utilizando essas ferramentas para implementar estratégias robustas de observabilidade e monitoramento."
        }
      },
      {
        "@type": "Question",
        "name": "Qual é a formação acadêmica de Nei Girão?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Nei Girão possui ${education.map(e => `${e.degree} pela ${e.institution} (${e.period})`).join(", ")}.`
        }
      }
    ]
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
