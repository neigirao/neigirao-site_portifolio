import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
import { useAdminDashboardData } from '@/hooks/useAdminData';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { LogOut, RefreshCw, Home, ChevronDown, Briefcase, Wrench, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    icon: Wrench,
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
      { value: 'settings', label: 'Configurações' },
    ],
  },
];

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { experiences, skills, education, projects, isLoading, refetchAll } = useAdminDashboardData();
  const [activeTab, setActiveTab] = useState('experiences');
  const [isDirty, setIsDirty] = useState(false);

  const { confirmNavigation } = useUnsavedChanges({ hasChanges: isDirty });

  const handleTabChange = (value: string) => {
    if (isDirty) {
      confirmNavigation(() => {
        setIsDirty(false);
        setActiveTab(value);
      });
    } else {
      setActiveTab(value);
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
            <BulkSlugGenerator onComplete={refetchAll} />
            <Button onClick={refetchAll} variant="ghost" size="sm" aria-label="Atualizar dados">
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Atualizar</span>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/" aria-label="Voltar ao site">
                <Home className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Voltar ao site</span>
              </Link>
            </Button>
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
          <DashboardStats experiences={experiences} skills={skills} education={education} projects={projects} isLoading={isLoading} />
        </section>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          {/* Grouped tabs navigation */}
          <div className="mb-8 space-y-3">
            {tabGroups.map((group) => (
              <Collapsible key={group.label} defaultOpen>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors w-full">
                  <group.icon className="h-4 w-4" />
                  {group.label}
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
            ))}
          </div>
          
          <TabsContent value="experiences">
            <ExperiencesManager onDirtyChange={setIsDirty} />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>
          <TabsContent value="articles">
            <ArticlesManager />
          </TabsContent>
          <TabsContent value="skills">
            <SkillsManager onDirtyChange={setIsDirty} />
          </TabsContent>
          <TabsContent value="education">
            <EducationManager onDirtyChange={setIsDirty} />
          </TabsContent>
          <TabsContent value="metrics">
            <MetricsManager />
          </TabsContent>
          <TabsContent value="companies">
            <CompaniesManager />
          </TabsContent>
          <TabsContent value="certifications">
            <CertificationsManager />
          </TabsContent>
          <TabsContent value="testimonials">
            <TestimonialsManager />
          </TabsContent>
          <TabsContent value="faqs">
            <FAQsManager />
          </TabsContent>
          <TabsContent value="settings">
            <SiteSettingsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
