import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProjectDetail, useRelatedProjects, generateSlug } from '@/hooks/usePortfolioDetail';
import { useSkillsForProject, useExperiencesForProject, useSeeAlso } from '@/hooks/useRelatedContent';
import { SEOHead } from '@/components/SEO/SEOHead';
import { BreadcrumbSchema } from '@/components/SEO/BreadcrumbSchema';
import { BASE_URL } from '@/config/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { ExternalLink, Tag, ChevronRight, Lightbulb, Target, AlertTriangle, Wrench, BarChart3, BookOpen } from 'lucide-react';
import { StandaloneNavbar } from '@/components/sections/StandaloneNavbar';
import SeeAlso from '@/components/SeeAlso';
import { SafeHTML } from '@/components/admin/SafeHTML';

const CASE_STUDY_SECTIONS = [
  { key: 'context', label: 'Contexto', icon: Target },
  { key: 'challenge', label: 'Desafio', icon: AlertTriangle },
  { key: 'solution', label: 'Solução', icon: Wrench },
  { key: 'results', label: 'Resultados', icon: BarChart3 },
  { key: 'learnings', label: 'Aprendizados', icon: BookOpen },
] as const;

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading, error } = useProjectDetail(slug || '');
  const { data: relatedProjects } = useRelatedProjects(
    project?.tags || null,
    project?.id || ''
  );

  const relatedSkills = useSkillsForProject(project?.tags || null, project?.description || '');
  const relatedExperiences = useExperiencesForProject(project?.tags || null, project?.description || '');
  const seeAlsoItems = useSeeAlso([...relatedSkills, ...relatedExperiences], 5);

  const hasCaseStudy = project && CASE_STUDY_SECTIONS.some(s => (project as any)[s.key]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Skeleton className="h-8 w-48 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Projeto não encontrado</h1>
            <p className="text-muted-foreground mb-6">O projeto que você procura não existe ou foi removido.</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Portfolio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const canonicalSlug = project.slug || generateSlug(project.title);

  return (
    <>
      <SEOHead
        title={project.meta_title || project.title}
        description={project.meta_description || project.description.slice(0, 160)}
        canonicalUrl={`${BASE_URL}/projeto/${canonicalSlug}`}
        ogType="article"
        ogImage={project.image_url || undefined}
        keywords={[project.title, ...(project.tags || []), 'projeto', 'case', 'Nei Girão']}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.meta_description || project.description.slice(0, 160),
        "url": `${BASE_URL}/projeto/${canonicalSlug}`,
        "author": { "@type": "Person", "name": "Nei Girão", "url": BASE_URL },
        "datePublished": (project as any).created_at || undefined,
        "dateModified": (project as any).updated_at || undefined,
        ...(project.image_url ? { "image": project.image_url } : {}),
        ...(project.link ? { "mainEntityOfPage": project.link } : {}),
        ...(project.tags ? { "keywords": project.tags.join(", ") } : {})
      }) }} />
      <BreadcrumbSchema items={[
        { name: 'Início', url: '/' },
        { name: 'Projetos', url: '/#projects' },
        { name: project.title },
      ]} />

      <div className="min-h-screen bg-background">
        <header className="bg-gradient-hero pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
              <Link to="/" className="hover:text-white transition-colors">Início</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/#projects" className="hover:text-white transition-colors">Projetos</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{project.title}</span>
            </nav>

            <Button variant="outline" size="sm" onClick={() => navigate('/#projects')} className="mb-8 bg-white/10 text-white border-white/30 hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>

            {(project as any).highlight_metric && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-accent/20 backdrop-blur-sm rounded-full text-teal-accent font-semibold text-sm border border-teal-accent/30">
                  <BarChart3 className="w-4 h-4" />
                  {(project as any).highlight_metric}
                </span>
              </div>
            )}

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-12">
          {project.image_url && (
            <Card className="mb-8 overflow-hidden shadow-elegant">
              <OptimizedImage src={project.image_url} alt={project.title} className="w-full h-64 md:h-96" priority />
            </Card>
          )}

          {/* Description */}
          <Card className="shadow-elegant border-2 border-border/50 mb-8">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-xl font-semibold mb-4">Sobre o Projeto</h2>
              <SafeHTML html={project.description} className="text-muted-foreground leading-relaxed text-lg prose prose-lg max-w-none" />
              {project.link && (
                <div className="mt-8 pt-6 border-t border-border">
                  <Button onClick={() => window.open(project.link!, '_blank')} className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Ver Projeto
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Case Study Sections */}
          {hasCaseStudy && (
            <div className="space-y-6 mb-12">
              {CASE_STUDY_SECTIONS.map(({ key, label, icon: Icon }) => {
                const content = (project as any)[key];
                if (!content) return null;
                return (
                  <Card key={key} className="shadow-elegant border-2 border-border/50">
                    <CardContent className="p-8">
                      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Icon className="w-5 h-5 text-teal-accent" />
                        {label}
                      </h2>
                      <SafeHTML html={content} className="text-muted-foreground leading-relaxed prose max-w-none" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Related Skills */}
          {relatedSkills.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-teal-accent" />
                Habilidades Relacionadas
              </h2>
              <div className="flex flex-wrap gap-3">
                {relatedSkills.map((skill) => (
                  <Link key={skill.id} to={`/skill/${skill.slug || skill.id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-teal-accent/10 hover:text-teal-accent transition-colors">
                    <Lightbulb className="w-4 h-4" />
                    {skill.title}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Projects */}
          {relatedProjects && relatedProjects.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Projetos Relacionados</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedProjects.map((proj) => (
                  <Link key={proj.id} to={`/projeto/${proj.slug || proj.id}`} className="block">
                    <Card className="h-full hover:shadow-glow transition-all hover:border-teal-accent/30">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-foreground mb-2">{proj.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{proj.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <SeeAlso items={seeAlsoItems} title="Veja Também" />

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Quer saber mais sobre este ou outros projetos?</p>
            <Button onClick={() => navigate('/#contact')}>Entre em Contato</Button>
          </div>
        </main>
      </div>
    </>
  );
}
