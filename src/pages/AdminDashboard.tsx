import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExperiencesManager } from '@/components/admin/ExperiencesManager';
import { ProjectsManager } from '@/components/admin/ProjectsManager';
import { SkillsManager } from '@/components/admin/SkillsManager';
import { EducationManager } from '@/components/admin/EducationManager';
import { LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            <p className="text-sm text-muted-foreground">Olá, {user?.email}</p>
          </div>
          <Button onClick={signOut} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="experiences" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="experiences">Experiências</TabsTrigger>
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Educação</TabsTrigger>
          </TabsList>
          
          <TabsContent value="experiences">
            <ExperiencesManager />
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>
          
          <TabsContent value="skills">
            <SkillsManager />
          </TabsContent>
          
          <TabsContent value="education">
            <EducationManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}