import { useEffect } from 'react';

/**
 * SitemapRedirect - Redirects to the dynamic sitemap edge function
 */
export default function SitemapRedirect() {
  useEffect(() => {
    // Redirect to the edge function that generates the dynamic sitemap
    window.location.href = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-sitemap`;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-muted-foreground">Redirecionando para sitemap.xml...</div>
    </div>
  );
}