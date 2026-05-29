import { useState, useEffect, lazy, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
const ExperiencesManager = lazy(() => import('@/components/admin/ExperiencesManager').then(m => ({ default: m.ExperiencesManager })));
const ProjectsManager = lazy(() => import('@/components/admin/ProjectsManager').then(m => ({ default: m.ProjectsManager })));
const SkillsManager = lazy(() => import('@/components/admin/SkillsManager').then(m => ({ default: m.SkillsManager })));
const EducationManager = lazy(() => import('@/components/admin/EducationManager').then(m => ({ default: m.EducationManager })));
const MetricsManager = lazy(() => import('@/components/admin/MetricsManager').then(m => ({ default: m.MetricsManager })));
const CompaniesManager = lazy(() => import('@/components/admin/CompaniesManager').then(m => ({ default: m.CompaniesManager })));
const CertificationsManager = lazy(() => import('@/components/admin/CertificationsManager').then(m => ({ default: m.CertificationsManager })));
const TestimonialsManager = lazy(() => import('@/components/admin/TestimonialsManager').then(m => ({ default: m.TestimonialsManager })));
const FAQsManager = lazy(() => import('@/components/admin/FAQsManager').then(m => ({ default: m.FAQsManager })));
const LabManager = lazy(() => import('@/components/admin/LabManager').then(m => ({ default: m.LabManager })));
const DashboardStats = lazy(() => import('@/components/admin/DashboardStats').then(m => ({ default: m.DashboardStats })));
const BulkSlugGenerator = lazy(() => import('@/components/admin/BulkSlugGenerator').then(m => ({ default: m.BulkSlugGenerator })));
const SiteSettingsManager = lazy(() => import('@/components/admin/SiteSettingsManager').then(m => ({ default: m.SiteSettingsManager })));
const ArticlesManager = lazy(() => import('@/components/admin/ArticlesManager').then(m => ({ default: m.ArticlesManager })));
const ContactMessagesManager = lazy(() => import('@/components/admin/ContactMessagesManager').then(m => ({ default: m.ContactMessagesManager })));
import { useAdminDashboardData } from '@/hooks/useAdminData';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { LogOut, RefreshCw, Home, ChevronDown, Briefcase, LayoutList, Settings, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const tabGroups = [
  {
    label: 'Portfólio',
    icon: Briefcase,
    tabs: [
      { value: 'experiences', label: 'Experiências' },
      { value: 'projects', label: 'Projetos' },
      { value: 'articles', label: 'Artigos' },
      { value: 'lab', label: 'Lab' },
      { value: 'skills', label: 'Skills' },
      { value: 'education', label: 'Educação' },
    ],
  },
  {
    label: 'Complementar',
    icon: LayoutList,
    tabs: [
      { value: 'metrics', label: 'Métricas' },
      { value: 'companies', label: 'Empresas' },
      { value: 'certifications', label: 'Certificações' },
      { value: 'testimonials', label: 'Depoimentos' },
      { value: 'faqs', label: 'FAQ' },
    ],
  },
  {
    label: 'Sistema',
    icon: Settings,
    tabs: [
      { value: 'messages', label: 'Mensagens' },
      { value: 'settings', label: 'Configurações' },
    ],
  },
];

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const {
    experiences, skills, education, projects, articles,
    testimonials, certifications, companies, metrics, faqs,
    isLoading, refetchAll,
  } = useAdminDashboardData();
  const [activeTab, setActiveTab] = useState('experiences');
  const [isDirty, setIsDirty] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [pendingTab, setPendingTab] = useState<string | null>(null);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [draftArticles, setDraftArticles] = useState(0);

  useEffect(() => {
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).is('read_at', null)
      .then(({ count }) => setUnreadMessages(count || 0));
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'draft')
      .then(({ count }) => setDraftArticles(count || 0));
  }, []);

  useUnsavedChanges({ hasChanges: isDirty });

  const handleTabChange = (value: string) => {
    if (isDirty) {
      setPendingTab(value);
    } else {
      setActiveTab(value);
    }
  };

  const handleExportJSON = async () => {
    setIsExporting(true);
    try {
      const [exp, proj, sk, edu, art, cert, test, comp, met, faq, lab] = await Promise.all([
        supabase.from('experiences').select('*'),
        supabase.from('projects').select('*'),
        supabase.from('skills').select('*'),
        supabase.from('education').select('*'),
        supabase.from('articles').select('*'),
        supabase.from('certifications').select('*'),
        supabase.from('testimonials').select('*'),
        supabase.from('companies').select('*'),
        supabase.from('impact_metrics').select('*'),
        supabase.from('faqs').select('*'),
        supabase.from('lab_projects').select('*'),
      ]);

      const exportData = {
        exportedAt: new Date().toISOString(),
        experiences: exp.data,
        projects: proj.data,
        skills: sk.data,
        education: edu.data,
        articles: art.data,
        certifications: cert.data,
        testimonials: test.data,
        companies: comp.data,
        metrics: met.data,
        faqs: faq.data,
        lab_projects: lab.data,
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Backup exportado!');
    } catch {
      toast.error('Erro ao exportar dados');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Pular para o conteúdo principal
      </a>

      <header className="border-b bg-card" role="banner">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            <p className="text-sm text-muted-foreground">Olá, {user?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider delayDuration={300}>
              <Suspense fallback={null}><BulkSlugGenerator onComplete={refetchAll} /></Suspense>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleExportJSON} variant="ghost" size="sm" disabled={isExporting} aria-label="Exportar backup JSON">
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Exportar backup JSON</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={refetchAll} variant="ghost" size="sm" aria-label="Atualizar dados">
                    <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Atualizar dados</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/" aria-label="Voltar ao site">
                      <Home className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Voltar ao site</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button onClick={signOut} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main id="main-content" className="container mx-auto px-4 py-8" role="main">
        <section aria-labelledby="dashboard-heading" className="mb-8">
          <h2 id="dashboard-heading" className="sr-only">Estatísticas do Dashboard</h2>
          <Suspense fallback={null}>
            <DashboardStats
              experiences={experiences}
              skills={skills}
              education={education}
              projects={projects}
              articles={articles}
              testimonials={testimonials}
              certifications={certifications}
              companies={companies}
              metrics={metrics}
              faqs={faqs}
              unreadMessages={unreadMessages}
              draftArticles={draftArticles}
              isLoading={isLoading}
            />
          </Suspense>
        </section>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="mb-8 space-y-3">
            {tabGroups.map((group) => {
              const groupHasActiveTab = group.tabs.some(t => t.value === activeTab);
              return (
              <Collapsible key={group.label} defaultOpen={group.label === 'Portfólio'}>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors w-full">
                  <group.icon className="h-4 w-4" />
                  {group.label}
                  {groupHasActiveTab && (
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                  )}
                  <ChevronDown className="h-3 w-3 ml-auto transition-transform duration-200 [&[data-state=open]]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <TabsList className="mt-2 flex flex-wrap h-auto gap-1 bg-muted p-1">
                    {group.tabs.map((tab) => (
                      <TabsTrigger key={tab.value} value={tab.value} className="text-xs sm:text-sm">
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </CollapsibleContent>
              </Collapsible>
              );
            })}
          </div>

          <Suspense fallback={<div className="py-12 text-center text-muted-foreground text-sm">Carregando…</div>}>
            <TabsContent value="experiences">
              <ExperiencesManager onDirtyChange={setIsDirty} />
            </TabsContent>
            <TabsContent value="projects">
              <ProjectsManager onDirtyChange={setIsDirty} />
            </TabsContent>
            <TabsContent value="articles">
              <ArticlesManager onDirtyChange={setIsDirty} />
            </TabsContent>
            <TabsContent value="lab">
              <LabManager onDirtyChange={setIsDirty} />
            </TabsContent>
            <TabsContent value="skills">
              <SkillsManager onDirtyChange={setIsDirty} />
            </TabsContent>
            <TabsContent value="education">
              <EducationManager onDirtyChange={setIsDirty} />
            </TabsContent>
            <TabsContent value="metrics">
              <MetricsManager onDirtyChange={setIsDirty} />
            </TabsContent>
            <TabsContent value="companies">
              <CompaniesManager onDirtyChange={setIsDirty} />
            </TabsContent>
            <TabsContent value="certifications">
              <CertificationsManager onDirtyChange={setIsDirty} />
            </TabsContent>
            <TabsContent value="testimonials">
              <TestimonialsManager onDirtyChange={setIsDirty} />
            </TabsContent>
            <TabsContent value="faqs">
              <FAQsManager onDirtyChange={setIsDirty} />
            </TabsContent>
            <TabsContent value="messages">
              <ContactMessagesManager />
            </TabsContent>
            <TabsContent value="settings">
              <SiteSettingsManager />
            </TabsContent>
          </Suspense>
        </Tabs>
      </main>

      <AlertDialog open={pendingTab !== null} onOpenChange={(open) => { if (!open) setPendingTab(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alterações não salvas</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem alterações não salvas nesta seção. Se continuar, elas serão perdidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingTab(null)}>Ficar aqui</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              if (pendingTab) {
                setIsDirty(false);
                setActiveTab(pendingTab);
                setPendingTab(null);
              }
            }}>
              Continuar mesmo assim
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
