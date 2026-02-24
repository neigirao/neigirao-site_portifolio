/**
 * SEOHead - Dynamic Meta Tags Component
 * 
 * Gerencia meta tags dinâmicas para SEO:
 * - Title e description
 * - Open Graph tags
 * - Twitter Card tags
 * - Canonical URL
 */

import { Helmet } from "react-helmet-async";
import { BASE_URL } from "@/config/constants";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  keywords?: string[];
  author?: string;
  noIndex?: boolean;
}

const defaultMeta = {
  title: "Nei Girão - Product Manager | Observabilidade | Produtos Digitais",
  description: "Product Manager com +15 anos em Observabilidade e Produtos Digitais. Expert em Dynatrace, Grafana e Azure Monitor. Icatu, Oi, TIM, Globo.",
  ogImage: "https://lovable.dev/opengraph-image-p98pqg.png",
  author: "Nei Girão",
  keywords: [
    "product manager",
    "observabilidade",
    "produtos digitais",
    "Dynatrace",
    "Grafana",
    "Azure Monitor",
    "Google Analytics",
    "agile",
    "scrum",
    "portfolio",
    "Icatu",
    "Oi",
    "TIM",
    "Globo",
    "MBA",
    "gestão de produtos"
  ]
};

export function SEOHead({
  title = defaultMeta.title,
  description = defaultMeta.description,
  canonicalUrl = `${BASE_URL}/`,
  ogImage = defaultMeta.ogImage,
  ogType = "website",
  keywords = defaultMeta.keywords,
  author = defaultMeta.author,
  noIndex = false
}: SEOHeadProps) {
  const fullTitle = title === defaultMeta.title ? title : `${title} | Nei Girão`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="keywords" content={keywords.join(", ")} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Nei Girão - Portfolio" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="pt-BR" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Additional SEO tags */}
      <meta name="theme-color" content="#1e3a5f" />
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
}

// Pre-configured SEO heads for different pages
export function HomeSEOHead() {
  return <SEOHead />;
}

export function AdminSEOHead() {
  return (
    <SEOHead
      title="Área Administrativa"
      description="Painel de administração do portfolio de Nei Girão."
      noIndex={true}
    />
  );
}

export function NotFoundSEOHead() {
  return (
    <SEOHead
      title="Página não encontrada"
      description="A página que você procura não existe. Volte para o portfolio de Nei Girão."
      noIndex={true}
    />
  );
}
