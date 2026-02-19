import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExperiencesManager } from '@/components/admin/ExperiencesManager';
import { ProjectsManager } from '@/components/admin/ProjectsManager';
import { SkillsManager } from '@/components/admin/SkillsManager';
import { EducationManager } from '@/components/admin/EducationManager';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { BulkSlugGenerator } from '@/components/admin/BulkSlugGenerator';
import { useAdminDashboardData } from '@/hooks/useAdminData';
import { LogOut, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { experiences, skills, education, projects, isLoading, refetchAll } = useAdminDashboardData();

  return (
    <div className="min-h-screen bg-background">
      {/* Skip link for accessibility */}
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
            <Button 
              onClick={refetchAll} 
              variant="ghost" 
              size="sm"
              aria-label="Atualizar dados"
            >
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
        {/* Dashboard Stats */}
        <section aria-labelledby="dashboard-heading" className="mb-8">
          <h2 id="dashboard-heading" className="sr-only">Estatísticas do Dashboard</h2>
          <DashboardStats
            experiences={experiences}
            skills={skills}
            education={education}
            projects={projects}
            isLoading={isLoading}
          />
        </section>

        <Tabs defaultValue="experiences" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8" aria-label="Gerenciar conteúdo">
            <TabsTrigger value="experiences" aria-controls="experiences-panel">
              Experiências
            </TabsTrigger>
            <TabsTrigger value="projects" aria-controls="projects-panel">
              Projetos
            </TabsTrigger>
            <TabsTrigger value="skills" aria-controls="skills-panel">
              Skills
            </TabsTrigger>
            <TabsTrigger value="education" aria-controls="education-panel">
              Educação
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="experiences" id="experiences-panel" role="tabpanel">
            <ExperiencesManager />
          </TabsContent>
          
          <TabsContent value="projects" id="projects-panel" role="tabpanel">
            <ProjectsManager />
          </TabsContent>
          
          <TabsContent value="skills" id="skills-panel" role="tabpanel">
            <SkillsManager />
          </TabsContent>
          
          <TabsContent value="education" id="education-panel" role="tabpanel">
            <EducationManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}