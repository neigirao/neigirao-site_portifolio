import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ExperiencesManager } from '@/components/admin/ExperiencesManager';
import { ProjectsManager } from '@/components/admin/ProjectsManager';
import { SkillsManager } from '@/components/admin/SkillsManager';
import { EducationManager } from '@/components/admin/EducationManager';
import { MetricsManager } from '@/components/admin/MetricsManager';
import { CompaniesManager } from '@/components/admin/CompaniesManager';
import { CertificationsManager } from '@/components/admin/CertificationsManager';
import { TestimonialsManager } from '@/components/admin/TestimonialsManager';
import { FAQsManager } from '@/components/admin/FAQsManager';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { BulkSlugGenerator } from '@/components/admin/BulkSlugGenerator';
import { SiteSettingsManager } from '@/components/admin/SiteSettingsManager';
import { ArticlesManager } from '@/components/admin/ArticlesManager';
import { ContactMessagesManager } from '@/components/admin/ContactMessagesManager';
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
      const [exp, proj, sk, edu, art, cert, test, comp, met, faq] = await Promise.all([
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
              <BulkSlugGenerator onComplete={refetchAll} />
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
            isLoading={isLoading}
          />
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

          <TabsContent value="experiences">
            <ExperiencesManager onDirtyChange={setIsDirty} />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectsManager onDirtyChange={setIsDirty} />
          </TabsContent>
          <TabsContent value="articles">
            <ArticlesManager onDirtyChange={setIsDirty} />
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
