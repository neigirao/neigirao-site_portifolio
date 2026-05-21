import { lazy, Suspense, useEffect } from 'react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Skeleton } from "@/components/ui/skeleton";

// Eager load - critical path
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load - admin routes (heavy components)
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const SitemapRedirect = lazy(() => import("./pages/SitemapRedirect"));
const LlmsTxtRedirect = lazy(() => import("./pages/LlmsTxtRedirect"));
const AboutTxtRedirect = lazy(() => import("./pages/AboutTxtRedirect"));

// Lazy load - SEO standalone pages
const Sobre = lazy(() => import("./pages/Sobre"));
const Contato = lazy(() => import("./pages/Contato"));
const ArticlesListing = lazy(() => import("./pages/ArticlesListing"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));

// Lazy load - detail pages (SEO pages)
const ExperienceDetail = lazy(() => import("./pages/ExperienceDetail"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const SkillDetail = lazy(() => import("./pages/SkillDetail"));

function FaviconInjector() {
  const { settings } = useSiteSettings();
  useEffect(() => {
    const url = settings.favicon_url;
    if (!url) return;
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = url;
  }, [settings.favicon_url]);
  return null;
}

// Loading fallback for lazy routes
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="space-y-4 w-full max-w-md px-4">
      <Skeleton className="h-8 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
);

// Configure QueryClient with optimized defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <FaviconInjector />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sitemap.xml" element={<SitemapRedirect />} />
              <Route path="/llms.txt" element={<LlmsTxtRedirect />} />
              <Route path="/about.txt" element={<AboutTxtRedirect />} />
              
              {/* SEO Standalone Pages */}
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />

              {/* Articles / Blog */}
              <Route path="/artigos" element={<ArticlesListing />} />
              <Route path="/artigo/:slug" element={<ArticleDetail />} />

              {/* SEO Detail Pages */}
              <Route path="/experiencia/:slug" element={<ExperienceDetail />} />
              <Route path="/projeto/:slug" element={<ProjectDetail />} />
              <Route path="/skill/:slug" element={<SkillDetail />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
